import os
from pathlib import Path

os.environ["DATABASE_URL"] = "sqlite:///./test_pmsg.db"
os.environ["SEED_CSV"] = str(Path(__file__).resolve().parents[2] / "data" / "cohort_25.csv")

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from app.db import Base, engine  # noqa: E402
from app.main import app  # noqa: E402


@pytest.fixture(scope="module")
def client():
    Base.metadata.drop_all(engine)
    with TestClient(app) as c:
        yield c
    Base.metadata.drop_all(engine)
    Path("test_pmsg.db").unlink(missing_ok=True)


def test_health(client):
    assert client.get("/health").json()["ok"] is True


def test_seeded_cohort(client):
    ps = client.get("/participants").json()
    assert len(ps) == 25
    assert client.get("/participants/1").json()["primary_pain_condition"]


def test_stateless_scoring(client):
    r = client.post("/score/bpi", json=dict(worst=8, least=2, average=5, now=5))
    assert r.status_code == 200 and r.json()["severity"] == 5.0
    assert client.post("/score/odi", json={"walking": 9}).status_code == 422


def test_assessment_roundtrip_and_change(client):
    odi = lambda v: {k: v for k in ("pain_intensity", "personal_care", "lifting", "walking", "sitting",
                                    "standing", "sleeping", "sex_life", "social_life", "travelling")}
    assert client.post("/participants/1/assessments", json={"instrument": "odi", "week": 0, "responses": odi(3)}).status_code == 201
    r = client.post("/participants/1/assessments", json={"instrument": "odi", "week": 8, "responses": odi(1)})
    assert r.json()["odi_percent"] == 20.0 and r.json()["odi_band"] == "minimal"
    c = client.get("/participants/1/change", params={"instrument": "odi"}).json()
    assert c["absolute"] == 40.0 and c["meaningful"] is True
    s = client.get("/cohort/summary").json()
    assert s["participants"] == 25 and s["assessments"] == 2


def test_unknown_participant(client):
    assert client.post("/participants/999/assessments",
                       json={"instrument": "bpi", "week": 0, "responses": {}}).status_code == 404
