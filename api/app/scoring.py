"""Scoring for the two PMSG outcome instruments.

Brief Pain Inventory - Short Form (BPI-SF)
    Severity     = mean of items 3-6 (worst, least, average, now), each 0-10.
                   All four items are required.
    Interference = mean of the 7 interference items (9A-9G), each 0-10.
                   Scored when at least 4 of 7 items are answered
                   (the >50% rule in the BPI user guide); mean of answered items.

Oswestry Disability Index v2.1a (ODI)
    10 sections, each 0-5.
    Score (%) = sum / (5 x sections answered) x 100.
    One unanswered section is tolerated; with more missing, no score is returned.
    Bands: 0-20 minimal, 21-40 moderate, 41-60 severe, 61-80 crippled,
           81-100 bed-bound (or symptom magnification).

Clinically meaningful change thresholds used by `change()`:
    BPI severity / interference: >= 2 points or >= 30% reduction
    ODI: >= 10 percentage points
These are commonly cited MCIDs; programs should set their own in protocol.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Mapping, Optional

BPI_SEVERITY_ITEMS = ("worst", "least", "average", "now")
BPI_INTERFERENCE_ITEMS = (
    "general_activity",
    "mood",
    "walking",
    "normal_work",
    "relations",
    "sleep",
    "enjoyment",
)
ODI_SECTIONS = (
    "pain_intensity",
    "personal_care",
    "lifting",
    "walking",
    "sitting",
    "standing",
    "sleeping",
    "sex_life",
    "social_life",
    "travelling",
)

ODI_BANDS = (
    (20, "minimal"),
    (40, "moderate"),
    (60, "severe"),
    (80, "crippled"),
    (100, "bed-bound"),
)


class ScoringError(ValueError):
    """Responses cannot be scored (missing or out-of-range items)."""


def _check_range(name: str, value: Optional[int], lo: int, hi: int) -> None:
    if value is None:
        return
    if not isinstance(value, int) or isinstance(value, bool):
        raise ScoringError(f"{name} must be an integer")
    if not lo <= value <= hi:
        raise ScoringError(f"{name}={value} outside {lo}-{hi}")


def _reject_unknown(responses: Mapping[str, Optional[int]], allowed: tuple) -> None:
    unknown = set(responses) - set(allowed)
    if unknown:
        raise ScoringError(f"unknown item(s): {', '.join(sorted(unknown))}")


@dataclass(frozen=True)
class BPIScore:
    severity: float
    interference: Optional[float]
    interference_items_answered: int


@dataclass(frozen=True)
class ODIScore:
    percent: float
    band: str
    sections_answered: int


def score_bpi(responses: Mapping[str, Optional[int]]) -> BPIScore:
    allowed = BPI_SEVERITY_ITEMS + BPI_INTERFERENCE_ITEMS
    _reject_unknown(responses, allowed)
    for k, v in responses.items():
        _check_range(k, v, 0, 10)

    sev = [responses.get(k) for k in BPI_SEVERITY_ITEMS]
    if any(v is None for v in sev):
        missing = [k for k in BPI_SEVERITY_ITEMS if responses.get(k) is None]
        raise ScoringError(f"BPI severity needs all 4 items; missing: {', '.join(missing)}")
    severity = round(sum(sev) / 4, 2)

    answered = [responses[k] for k in BPI_INTERFERENCE_ITEMS if responses.get(k) is not None]
    interference = round(sum(answered) / len(answered), 2) if len(answered) >= 4 else None
    return BPIScore(severity, interference, len(answered))


def odi_band(percent: float) -> str:
    for upper, label in ODI_BANDS:
        if percent <= upper:
            return label
    return ODI_BANDS[-1][1]


def score_odi(responses: Mapping[str, Optional[int]]) -> ODIScore:
    _reject_unknown(responses, ODI_SECTIONS)
    for k, v in responses.items():
        _check_range(k, v, 0, 5)

    answered = [responses[k] for k in ODI_SECTIONS if responses.get(k) is not None]
    if len(answered) < len(ODI_SECTIONS) - 1:
        raise ScoringError(
            f"ODI needs at least 9 of 10 sections; got {len(answered)}"
        )
    percent = round(sum(answered) / (5 * len(answered)) * 100, 1)
    return ODIScore(percent, odi_band(percent), len(answered))


@dataclass(frozen=True)
class Change:
    baseline: float
    follow_up: float
    absolute: float
    percent: Optional[float]
    meaningful: bool


def change(instrument: str, baseline: float, follow_up: float) -> Change:
    """Improvement from baseline to follow-up (positive = better)."""
    absolute = round(baseline - follow_up, 2)
    percent = round(absolute / baseline * 100, 1) if baseline else None
    if instrument == "odi":
        meaningful = absolute >= 10
    elif instrument == "bpi":
        meaningful = absolute >= 2 or (percent is not None and percent >= 30)
    else:
        raise ScoringError(f"unknown instrument {instrument!r}")
    return Change(baseline, follow_up, absolute, percent, meaningful)
