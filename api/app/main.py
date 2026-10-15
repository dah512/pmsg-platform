"""PMSG outcomes API: score BPI-SF and ODI, store them per participant, summarize the cohort."""

import os
from contextlib import asynccontextmanager
from statistics import mean
from typing import Literal, Optional

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from . import scoring
from .db import Assessment, Participant, get_session, init_db


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="PMSG Outcomes API",
    version="0.1.0",
    description="Scoring and longitudinal tracking for the Pain Management Support Group "
    "(BPI-SF and Oswestry Disability Index). Seed data is synthetic.",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o for o in os.getenv("CORS_ORIGINS", "http://localhost:8080").split(",") if o],
    allow_methods=["*"],
    allow_headers=["*"],
)

Item = Optional[int]


class BPIIn(BaseModel):
    worst: Item = None
    least: Item = None
    average: Item = None
    now: Item = None
    general_activity: Item = None
    mood: Item = None
    walking: Item = None
    normal_work: Item = None
    relations: Item = None
    sleep: Item = None
    enjoyment: Item = None


class ODIIn(BaseModel):
    pain_intensity: Item = None
    personal_care: Item = None
    lifting: Item = None
    walking: Item = None
    sitting: Item = None
    standing: Item = None
    sleeping: Item = None
    sex_life: Item = None
    social_life: Item = None
    travelling: Item = None


class AssessmentIn(BaseModel):
    instrument: Literal["bpi", "odi"]
    week: int = Field(ge=0, le=8, description="0 = baseline, 1-8 = program week")
    responses: dict[str, Optional[int]]


class AssessmentOut(BaseModel):
    id: int
    participant_id: int
    instrument: str
    week: int
    bpi_severity: Optional[float]
    bpi_interference: Optional[float]
    odi_percent: Optional[float]
    odi_band: Optional[str]

    model_config = {"from_attributes": True}


class ParticipantOut(BaseModel):
    id: int
    name: str
    age: int
    gender: str
    primary_pain_condition: str
    pain_level_nrs: int
    consent_given: bool

    model_config = {"from_attributes": True}


def _score_or_422(fn, responses):
    try:
        return fn(responses)
    except scoring.ScoringError as e:
        raise HTTPException(status_code=422, detail=str(e)) from e


@app.get("/health")
def health():
    return {"ok": True, "service": "pmsg-api"}


@app.post("/score/bpi")
def score_bpi(body: BPIIn):
    return _score_or_422(scoring.score_bpi, body.model_dump(exclude_none=True)).__dict__


@app.post("/score/odi")
def score_odi(body: ODIIn):
    return _score_or_422(scoring.score_odi, body.model_dump(exclude_none=True)).__dict__


@app.get("/participants", response_model=list[ParticipantOut])
def list_participants(s: Session = Depends(get_session)):
    return s.scalars(select(Participant).order_by(Participant.id)).all()


@app.get("/participants/{pid}", response_model=ParticipantOut)
def get_participant(pid: int, s: Session = Depends(get_session)):
    p = s.get(Participant, pid)
    if not p:
        raise HTTPException(404, "participant not found")
    return p


@app.post("/participants/{pid}/assessments", response_model=AssessmentOut, status_code=201)
def add_assessment(pid: int, body: AssessmentIn, s: Session = Depends(get_session)):
    if not s.get(Participant, pid):
        raise HTTPException(404, "participant not found")
    a = Assessment(participant_id=pid, instrument=body.instrument, week=body.week, responses=body.responses)
    if body.instrument == "bpi":
        r = _score_or_422(scoring.score_bpi, body.responses)
        a.bpi_severity, a.bpi_interference = r.severity, r.interference
    else:
        r = _score_or_422(scoring.score_odi, body.responses)
        a.odi_percent, a.odi_band = r.percent, r.band
    s.add(a)
    s.commit()
    return a


@app.get("/participants/{pid}/assessments", response_model=list[AssessmentOut])
def list_assessments(pid: int, s: Session = Depends(get_session)):
    if not s.get(Participant, pid):
        raise HTTPException(404, "participant not found")
    return s.scalars(
        select(Assessment).where(Assessment.participant_id == pid).order_by(Assessment.week, Assessment.id)
    ).all()


def _metric(a: Assessment) -> Optional[float]:
    return a.bpi_severity if a.instrument == "bpi" else a.odi_percent


@app.get("/participants/{pid}/change")
def participant_change(pid: int, instrument: Literal["bpi", "odi"], s: Session = Depends(get_session)):
    rows = [
        a
        for a in s.scalars(
            select(Assessment)
            .where(Assessment.participant_id == pid, Assessment.instrument == instrument)
            .order_by(Assessment.week, Assessment.id)
        )
        if _metric(a) is not None
    ]
    if len(rows) < 2:
        raise HTTPException(409, "need a baseline and at least one follow-up")
    c = scoring.change(instrument, _metric(rows[0]), _metric(rows[-1]))
    return {"instrument": instrument, "from_week": rows[0].week, "to_week": rows[-1].week, **c.__dict__}


@app.get("/cohort/summary")
def cohort_summary(s: Session = Depends(get_session)):
    participants = s.scalars(select(Participant)).all()
    assessments = s.scalars(select(Assessment)).all()
    by_week: dict[tuple[str, int], list[float]] = {}
    for a in assessments:
        v = _metric(a)
        if v is not None:
            by_week.setdefault((a.instrument, a.week), []).append(v)
    return {
        "data_note": "Seed cohort is synthetic; values are not clinical outcomes.",
        "participants": len(participants),
        "consented": sum(p.consent_given for p in participants),
        "baseline_nrs_mean": round(mean(p.pain_level_nrs for p in participants), 2) if participants else None,
        "assessments": len(assessments),
        "weekly_means": [
            {"instrument": k[0], "week": k[1], "n": len(v), "mean": round(mean(v), 2)}
            for k, v in sorted(by_week.items())
        ],
    }
