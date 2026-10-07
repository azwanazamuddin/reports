---
layout: default
title: DDCM Implementation Reports
type: index
status: archived
created: 2026-05-10
updated: 2026-06-21
tags: [ddcm, reports, implementation]
---

# DDCM Implementation Reports

Technical progress reports from the [`ddcm`](https://github.com/azwanazamuddin/ddcm)
implementation — estimation runs, simulation results, diagnostic analyses.

**These are Master's-era reports, archived.** They were generated in the `ddcm`
repo and published here between May and August 2026.

---

## Current deliverables (synthetic-data methodology)

| Report | Topic | Date |
|--------|-------|------|
| [recovery_smallnet_R30_20260620.html](recovery_smallnet_R30_20260620.html) | **Report 1 · Parameter Recovery & Identification** — Exact NFXP recovers known parameters: Part I production-fidelity single-transport-scale confirmation (transport-scale ridge broken, 13.8%→0.8% bias); Part II controlled R=30 Dekker table, N-sweep (√N), profile-LL, behavioral validation, BHHH SEs | 2026-06-20 |
| [experiments_exact_sa_rl_20260621.html](experiments_exact_sa_rl_20260621.html) | **Report 2 · Approximation-Error Experiments** — Exact vs Sampling-of-Alternatives vs RL value estimation: SA is consistent (variance only, McFadden); RL is inconsistent at finite budget (bias + variance, no correction). Variance/bias panels + per-parameter densities + bit-level oracle | 2026-06-21 |

---

## Earlier reports

| Report | Topic | Date |
|--------|-------|------|
| [profile_ll_cchange_v7.html](profile_ll_cchange_v7.html) | **Profile LL: c_change sweep** (v7 zone-agnostic, 569 persons): interior MLE at −0.615; checkpoint (−0.756) confirmed near-optimal; HH prior (−0.301) firmly rejected | 2026-05-13 |
| [investigation_overview.html](investigation_overview.html) | **Root cause investigation**: zone-matching bug caused δ to be unidentified in all prior runs (v1–v5); fix implemented; re-estimation running | 2026-05-12 |
| [profile_ll_delta_muhome.html](profile_ll_delta_muhome.html) | K=10 profile LL scan (δ × μ_home): confirms U_obs was δ-invariant (symptom of zone bug); interactive heatmap + slices | 2026-05-12 |
| [gradient_bug_investigation_20260601.html](gradient_bug_investigation_20260601.html) | **Gradient bug investigation** — analytical gradient diagnosed against finite differences | 2026-06-01 |
| [work_timing_analysis.html](work_timing_analysis.html) | K=10 NFXP: why simulated work start is ~14:51 vs observed ~8:30; interactive utility plots + simulation validation (N=934) | 2026-05-10 |

---

## How reports are generated

HTML reports are self-contained (Plotly CDN + embedded images + hardcoded data).
They are generated in `ddcm/docs/` and copied here for publication.

The workflow that produced them is recorded in `REPORTING.md` in the private
`remote_main` vault; it is not published here.

---

## Unlinked snapshots

Committed 2026-08-04 but never added to any index. Kept for the record.

| Report | Topic |
|--------|-------|
| [behavioral_validation_20260624.html](behavioral_validation_20260624.html) through [behavioral_validation_20260719.html](behavioral_validation_20260719.html) | Nine behavioural-validation snapshots, 24 Jun – 19 Jul 2026, including `20260714_baseline` |
| [experiments_exact_sa_rl_20260624.html](experiments_exact_sa_rl_20260624.html) | Second Exact/SA/RL experiment run |
| [recovery_K10_freemu_20260627.html](recovery_K10_freemu_20260627.html) | K=10 recovery, free μ |
| [recovery_cell2_freemode_robust_20260702.html](recovery_cell2_freemode_robust_20260702.html) | Cell-2 free-mode robustness recovery |
