# PMSG — Pain Management Support Group Platform

A non-pharmacologic chronic pain program and the software around it: an 8-week, 32-session curriculum combining pain neuroscience education, CBT, anti-inflammatory nutrition, and movement practice (Qi Gong, Tai Chi), with outcome tracking built on two validated instruments, the **Brief Pain Inventory (BPI-SF)** and the **Oswestry Disability Index (ODI)**.

Designed and built by **Darrell A. Hall, MD, MSCIS** (Empowered Disease Management Health Services, LLC), a residency-trained family physician and certified data scientist.

> **Data note.** All participant data in this repository is synthetic. Nothing here reports clinical outcomes; the analytics dashboard runs on simulated trajectories for demonstration.

---

## Quick start

```bash
cp .env.example .env            # set POSTGRES_PASSWORD
docker compose up --build       # Postgres + API + web
```

| URL | What |
|---|---|
| http://localhost:8080 | Program website (React) |
| http://localhost:8000/docs | Outcomes API, interactive OpenAPI docs (also proxied at `:8080/api/*`) |
| http://localhost:8081 | Curriculum hub |
| http://localhost:8082 | Curriculum site |
| http://localhost:8080/analytics/ | R Shiny analytics (with `--profile analytics`) |

```bash
docker compose --profile analytics up --build   # add the Shiny dashboard (large R image)
```

Try the scorer:

```bash
curl -s localhost:8000/score/bpi -H 'content-type: application/json' \
  -d '{"worst":8,"least":2,"average":5,"now":5,"mood":4,"sleep":5,"walking":7,"enjoyment":5}'
# {"severity": 5.0, "interference": 5.25, "interference_items_answered": 4}
```

## Architecture

```
            ┌──────────────── nginx (web) ────────────────┐
browser ──► │ :8080  React site   /api/* ─► api   /analytics/* ─► shiny
            │ :8081  curriculum hub      :8082 curriculum site
            └─────────────────────────────────────────────┘
                              │
                      api (FastAPI) ──► Postgres 16
                              │
                   seeds data/cohort_25.csv on first start
```

## What's in the repo

| Path | Status | Notes |
|---|---|---|
| `api/` | **Working, tested** | FastAPI service: BPI-SF and ODI scoring with the published missing-item rules, per-participant assessment history, change scores against MCID thresholds, cohort summary. 22 tests; CI on every push. |
| `web/` | **Working** | Public program site: React 18, React Router, Tailwind. Home, About, Meetings, Resources, Contact. |
| `curriculum/hub/` | Build artifact | Compiled bundle of the curriculum hub, identical to the deployment at edmhs-curriculum-pmsg.web.app. Its source is not in this repo. |
| `curriculum/site/` | **Working** | Lightweight static curriculum pages (HTML/CSS/JS). |
| `analytics/` | **Working demo** | R Shiny dashboard: trajectories, mean ± 95% CI, paired t-test, Cohen's d, CSV export, on **simulated** data. |
| `manual/` | In progress | R Bookdown technical manual. Introduction, clinical background and architecture chapters are written; chapters 4–18 are outlined. |
| `data/` | Synthetic | 25-person cohort used to seed the API. |
| `docker-compose.yml` | **Working** | Local stack; the API image honors `$PORT`, so it deploys to Cloud Run unchanged. |

## Scoring rules implemented

- **BPI-SF severity:** mean of worst/least/average/now (0–10); all four required.
- **BPI-SF interference:** mean of the 7 interference items; scored when ≥ 4 are answered.
- **ODI:** sum ÷ (5 × sections answered) × 100; one missing section tolerated. Bands: minimal, moderate, severe, crippled, bed-bound.
- **Meaningful change:** BPI ≥ 2 points or ≥ 30%; ODI ≥ 10 points. These are commonly cited thresholds, and a program protocol should set its own.

See [`api/app/scoring.py`](api/app/scoring.py).

## Roadmap

- [ ] Authentication and role-based access (facilitator, participant, admin)
- [ ] Session scheduling and attendance endpoints
- [ ] Wire the Shiny dashboard to the API instead of simulated data
- [ ] RAG knowledge base over the curriculum (ChromaDB + LangChain)
- [ ] Recover or rebuild the curriculum hub source
- [ ] Remaining manual chapters

## Development

```bash
cd api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements-dev.txt
pytest -q
uvicorn app.main:app --reload    # SQLite fallback when DATABASE_URL is unset
```

```r
# analytics
shiny::runApp("analytics/app.R")
# manual
setwd("manual"); bookdown::render_book("index.Rmd")
```

---

© Empowered Disease Management Health Services, LLC. Toledo, Ohio.
