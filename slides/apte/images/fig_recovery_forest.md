# Fig (new) — Parameter Recovery Forest Plot

**File:** `fig_recovery_forest.png` · 2026-06-20
**Slide:** "Recovery: All Parameters Recover"

## What it shows
Per-parameter recovery from the R=30, N=200 Monte-Carlo study: each point is the standardized
bias (θ̂ − θ*)/SD with a ±1.96·SE/SD interval. The red dashed line is θ* (truth). All 8 free
params (delta, alpha, beta, beta1/0_shop, beta1/0_leis, theta_travel) sit within ~1 SD of truth;
95% intervals cover θ*. theta_travel recovers to +0.7%; mean coverage probability 97.5%.

beta's interval is wider (intrinsically the weakest-identified, but centered). Source:
`make_apte_figures.py` → `recovery_smallnet_R30_N200_v2lateshift.json`.
