# Fig (new) — Recovered Model Reproduces Behavior

**File:** `fig_behavior_match.png` · 2026-06-20
**Slide:** "Recovered Model Reproduces Behavior"

## What it shows
Two grouped-bar panels comparing the θ* (truth, blue) population vs a forward-simulation from a
**recovered θ̂** (orange): mode share (of trips) and activity-step share. The bars match closely,
and trips/person is 5.13 (θ*) vs 5.16 (θ̂). The estimation round-trips: data → recovered estimates
→ realistic, behaviourally-consistent schedules. This is the "simulate from recovered θ̂ →
realistic schedules emerge" deliverable.

Source: `make_apte_figures.py` → `behavioral_smallnet.json` (rep used = representative R=30 N=200 rep).
