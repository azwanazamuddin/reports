# Fig (new) — Sampling Variance vs N (√N-consistency)

**File:** `fig_nsweep.png` · 2026-06-20
**Slide:** "√N-Consistency: Sampling Variance vs N"

## What it shows
Across N ∈ {50,100,200,500,1000}, each parameter's empirical SD (across the 30 reps), normalized
to its value at N=50, on log–log axes. All 8 params share one black dashed **1/√N** reference;
theta_travel is highlighted. Curves tracking the dashed line ⇒ SD ∝ 1/√N with bias ≈ 0 — the
√N-consistency of a correct MLE. This is the **Exact-estimator reference** the approximation
methods (sampling-of-alternatives, RL) will be measured against (their SD lies above it).

Source: `make_apte_figures.py` → `recovery_smallnet_R30_N{50,100,200,500,1000}_v2lateshift.json`.
