---
title: "Profile-likelihood scans (May 2026)"
type: investigation
status: complete
created: 2026-10-12
tags: [masters, investigation, estimation, identification]
---


Two scans run a day apart. One was the clue that exposed the zone bug; the other, after the fix,
showed the parameter was identified.

## 12 May — the clue: δ × μ_home

**Report:** [2D profile log-likelihood, δ × μ_home](https://azwanazamuddin.github.io/reports/masters/ddcm/profile_ll_delta_muhome.html). It is flagged as a diagnostic run on the buggy v4/v5 estimates.

The surface had **no interior maximum**. The log-likelihood fell monotonically as either parameter
rose, peaking at the smallest values tested. The report traces this to the observed-path utility
not responding to δ at all, which is exactly what you would see if the observed WORK steps were
being dropped. Following that lead is what led to the zone bug.

## 13 May — after the fix: c_change

**Report:** [Profile log-likelihood, c_change (v7, zone-agnostic)](https://azwanazamuddin.github.io/reports/masters/ddcm/profile_ll_cchange_v7.html), a 16-point grid on [−2.5, −0.05] with the other nine parameters held at the v7 checkpoint.

- A clear **interior maximum at −0.615**, so `c_change` is identified from the data.
- The optimizer had stopped at −0.756, 1.6 log-likelihood units below the peak, a mild undershoot.
- The Hiroshima Household MNL prior of −0.301 was **rejected**, sitting 99.9 log-likelihood units
  below the peak.
- 569 of 702 workers contributed; 133 (19%) were skipped.

Read together, the two scans show the same kind of picture before and after the fix: a surface with
no peak that points at a bug, then a surface with a clean peak.

## Read it with

- [[investigation-overview|The investigation overview]]
- Hub: [[04-making-estimation-work|Phase 4]]
