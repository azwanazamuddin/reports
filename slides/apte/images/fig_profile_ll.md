# Fig (new) — Profile Log-Likelihood (identification)

**File:** `fig_profile_ll.png` · 2026-06-20
**Slide:** "Identification: Profile Log-Likelihood"

## What it shows
8 panels, one per free parameter. Each slides that parameter across a grid (others fixed at θ*)
and plots LL − max vs (θ−θ*)/half-width, so every panel peaks at (0,0). **All 8 are concave and
peaked exactly at θ*** ⇒ the likelihood genuinely responds to each parameter ⇒ identifiable.
A flat panel would flag non-identification (the failure mode of the earlier real-data run).
theta_travel, once a flat scale-vs-level ridge, is now cleanly concave (Option A single scale).

Source: `make_apte_figures.py` → `profile_ll_smallnet.json`.
