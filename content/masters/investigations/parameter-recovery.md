---
title: "Parameter recovery on a synthetic network (June–July 2026)"
type: investigation
status: complete
created: 2026-10-12
tags: [masters, investigation, estimation, identification, recovery]
---


Generate data from known parameters θ*, estimate, and see whether θ* comes back. The reports
describe this as the identification diagnostic the hEART reviewers asked for. All three use a small
synthetic network, R=30 replications and N=200 person-days.

The three reports share one title, so tell them apart by date.

- [20 June](https://azwanazamuddin.github.io/reports/masters/ddcm/recovery_smallnet_R30_20260620.html): 8 free parameters. `theta_travel` = 1.0051 against a true 1.000. Coverage 97.5%, and mean standard error to empirical SD of 1.16. **Only 20 of 30 replications converged.** The report's headline is that the standard error of β fell to 0.0008 from 3.98 once a late-shift problem was fixed.
- [27 June](https://azwanazamuddin.github.io/reports/masters/ddcm/recovery_K10_freemu_20260627.html): the K=10 free-μ variant. `theta_travel` = 0.9975 (bias −0.0025), β standard error 0.0007.
- [2 July](https://azwanazamuddin.github.io/reports/masters/ddcm/recovery_cell2_freemode_robust_20260702.html): a free-mode specification with `theta_travel` pinned at 1 and the four mode constants, β_time and β_cost estimated (15 free parameters), robust standard errors, **30 of 30 converged**, coverage 96.2%. One parameter, `asc_car`, is only weakly identified, with a bias of −0.2578 (34.8% absolute percent bias).

## Why the single-scale specification mattered

The old specification had a transport scale (`theta_travel`) and a level (`ASC_pt_adj`) that were
jointly unidentified: a logit separates a slope from an intercept only weakly, so the estimator
slid along a ridge. The single-scale specification puts one inclusive-value scale on the whole mode
utility and retires `ASC_pt_adj`, which removes the ridge.

## Read it with

- [[2026-06-23-recovery-and-approximation-error|The 23 June meeting note]]
- [[exact-vs-sampling-vs-rl|Exact vs sampling vs RL]], which starts from this recovery study's exact reference.
- Hub: [[04-making-estimation-work|Phase 4]]
