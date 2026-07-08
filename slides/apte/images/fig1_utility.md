# Fig 1 — Marginal Utility Profiles & Emergent Activity (flat-home K=10 spec)

**File:** `fig1_utility.png` · regenerated 2026-06-28 (K=10 flat-home, behaviorally-realistic params)
**Slide:** "How the Utility Curves Shape the Day"
**Source data:** `results/estimation_results/behavioral_smallnet_realistic.json` — the same params + 480-person
distribution behind the `daily_activity_K10_realistic_20260627.html` report. Behaviorally-sensible
params (δ=0.30, μ_home=0.10, c_change=−0.5), NOT the identification θ*: chosen so WORK fills the
scheduled day and μ_home pulls agents home in the evening → realistic HOME-night / WORK-day /
evening-discretionary rhythm.

## What it shows
- **Top:** marginal utility μ(t)·Δt over the day — WORK (piecewise δ/α/β around the scheduled
  window), SHOP and LEIS (`(β1·X·P_open + β0)·Δt`, best zone), drawn as **excess over the HOME
  floor** (activities measured relative to staying home, the spec convention).
- **Bottom:** emergent activity distribution by hour (stacked area) on the 6-zone small synthetic
  network — home overnight, morning work band, midday shopping, evening leisure. All timing is
  utility-emergent; no hard time-window constraints.

## Spec
Active flat-home K=10: all 10 parameters freely estimated (μ_home and c_change free, not pinned).
Regenerated via `estimation/experiments/make_apte_figures.py::fig1_utility` with the
`behavioral_smallnet_K10_freemu.json` θ*. Curves on the slide are framed as illustrative-but-realistic.
