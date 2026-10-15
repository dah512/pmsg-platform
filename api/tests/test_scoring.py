import pytest

from app.scoring import ScoringError, change, odi_band, score_bpi, score_odi

FULL_BPI = dict(worst=8, least=2, average=5, now=5,
                general_activity=6, mood=4, walking=7, normal_work=6,
                relations=2, sleep=5, enjoyment=5)


def test_bpi_full():
    r = score_bpi(FULL_BPI)
    assert r.severity == 5.0
    assert r.interference == pytest.approx(35 / 7, abs=0.01)
    assert r.interference_items_answered == 7


def test_bpi_interference_needs_four_items():
    sev = dict(worst=6, least=2, average=4, now=4)
    assert score_bpi({**sev, "mood": 3, "sleep": 5, "walking": 4}).interference is None
    assert score_bpi({**sev, "mood": 3, "sleep": 5, "walking": 4, "enjoyment": 4}).interference == 4.0


def test_bpi_severity_requires_all_items():
    with pytest.raises(ScoringError, match="now"):
        score_bpi(dict(worst=6, least=2, average=4))


@pytest.mark.parametrize("bad", [{"worst": 11}, {"worst": -1}, {"worst": True}, {"bogus": 3}])
def test_bpi_rejects_bad_input(bad):
    with pytest.raises(ScoringError):
        score_bpi({**dict(worst=5, least=2, average=4, now=4), **bad})


def test_odi_full_and_band():
    r = score_odi({k: 2 for k in ("pain_intensity", "personal_care", "lifting", "walking", "sitting",
                                  "standing", "sleeping", "sex_life", "social_life", "travelling")})
    assert r.percent == 40.0 and r.band == "moderate" and r.sections_answered == 10


def test_odi_one_missing_section_uses_45_denominator():
    resp = {k: 3 for k in ("pain_intensity", "personal_care", "lifting", "walking", "sitting",
                           "standing", "sleeping", "social_life", "travelling")}
    r = score_odi(resp)
    assert r.percent == pytest.approx(27 / 45 * 100, abs=0.1)


def test_odi_two_missing_is_rejected():
    with pytest.raises(ScoringError):
        score_odi({k: 1 for k in ("pain_intensity", "personal_care", "lifting", "walking",
                                  "sitting", "standing", "sleeping", "social_life")})


@pytest.mark.parametrize("pct,band", [(0, "minimal"), (20, "minimal"), (20.1, "moderate"),
                                      (60, "severe"), (61, "crippled"), (100, "bed-bound")])
def test_odi_bands(pct, band):
    assert odi_band(pct) == band


def test_change_thresholds():
    assert change("odi", 44, 30).meaningful is True
    assert change("odi", 44, 38).meaningful is False
    assert change("bpi", 6.0, 4.0).meaningful is True          # 2 points
    assert change("bpi", 3.0, 2.0).meaningful is True          # 33% reduction
    assert change("bpi", 7.0, 6.0).meaningful is False
