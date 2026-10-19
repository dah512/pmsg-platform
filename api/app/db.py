import csv
import os
from datetime import date, datetime, timezone
from pathlib import Path

from sqlalchemy import (
    JSON,
    Boolean,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    create_engine,
    func,
    select,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, relationship, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./pmsg.db")
# Synthetic cohort shipped inside the package so the container seeds itself on
# Cloud Run; docker-compose overrides SEED_CSV to the mounted data/ copy.
SEED_CSV = Path(os.getenv("SEED_CSV", str(Path(__file__).resolve().parent / "seed" / "cohort_25.csv")))

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


class Participant(Base):
    __tablename__ = "participants"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    age: Mapped[int] = mapped_column(Integer)
    gender: Mapped[str] = mapped_column(String(40))
    primary_pain_condition: Mapped[str] = mapped_column(String(120))
    medications: Mapped[str] = mapped_column(String(400), default="")
    pain_level_nrs: Mapped[int] = mapped_column(Integer)
    sleep_hours: Mapped[float] = mapped_column(Float)
    fatigue_level: Mapped[int] = mapped_column(Integer)
    anxiety_level: Mapped[int] = mapped_column(Integer)
    activity_limitation: Mapped[str] = mapped_column(String(200), default="")
    consent_given: Mapped[bool] = mapped_column(Boolean, default=False)
    consent_date: Mapped[date | None] = mapped_column(Date, nullable=True)

    assessments: Mapped[list["Assessment"]] = relationship(
        back_populates="participant", cascade="all, delete-orphan", order_by="Assessment.week"
    )


class Assessment(Base):
    __tablename__ = "assessments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    participant_id: Mapped[int] = mapped_column(ForeignKey("participants.id", ondelete="CASCADE"), index=True)
    instrument: Mapped[str] = mapped_column(String(8))  # "bpi" | "odi"
    week: Mapped[int] = mapped_column(Integer)  # 0 = baseline, 1-8 program weeks
    responses: Mapped[dict] = mapped_column(JSON)
    bpi_severity: Mapped[float | None] = mapped_column(Float, nullable=True)
    bpi_interference: Mapped[float | None] = mapped_column(Float, nullable=True)
    odi_percent: Mapped[float | None] = mapped_column(Float, nullable=True)
    odi_band: Mapped[str | None] = mapped_column(String(20), nullable=True)
    taken_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    participant: Mapped[Participant] = relationship(back_populates="assessments")


def init_db() -> None:
    Base.metadata.create_all(engine)
    with SessionLocal() as s:
        if s.scalar(select(func.count()).select_from(Participant)) == 0 and SEED_CSV.exists():
            seed_participants(s, SEED_CSV)


def seed_participants(s: Session, path: Path) -> int:
    with path.open(newline="", encoding="utf-8") as fh:
        rows = list(csv.DictReader(fh))
    for r in rows:
        s.add(
            Participant(
                id=int(r["id"]),
                name=r["name"],
                age=int(r["age"]),
                gender=r["gender"],
                primary_pain_condition=r["primary_pain_condition"],
                medications=r.get("medications", ""),
                pain_level_nrs=int(r["pain_level_nrs"]),
                sleep_hours=float(r["sleep_hours"]),
                fatigue_level=int(r["fatigue_level"]),
                anxiety_level=int(r["anxiety_level"]),
                activity_limitation=r.get("activity_limitation", ""),
                consent_given=r.get("consent_given", "").strip().lower() == "true",
                consent_date=date.fromisoformat(r["consent_date"]) if r.get("consent_date") else None,
            )
        )
    s.commit()
    return len(rows)


def get_session():
    with SessionLocal() as s:
        yield s
