---
title: DDCM Implementation Reports
type: index
status: active
created: 2026-05-10
updated: 2026-05-12
tags: [ddcm, reports, implementation]
---

# DDCM Implementation Reports

Technical progress reports from the [`ddcm`](https://github.com/azwanazamuddin/ddcm)
implementation — estimation runs, simulation results, diagnostic analyses.
Reports are generated in the `ddcm` repo and published here.

---

## Reports

| Report | Topic | Date |
|--------|-------|------|
| [investigation_overview.html](investigation_overview.html) | **Root cause investigation**: zone-matching bug caused δ to be unidentified in all prior runs (v1–v5); fix implemented; re-estimation running | 2026-05-12 |
| [profile_ll_delta_muhome.html](profile_ll_delta_muhome.html) | K=10 profile LL scan (δ × μ_home): confirms U_obs was δ-invariant (symptom of zone bug); interactive heatmap + slices | 2026-05-12 |
| [work_timing_analysis.html](work_timing_analysis.html) | K=10 NFXP: why simulated work start is ~14:51 vs observed ~8:30; interactive utility plots + simulation validation (N=934) | 2026-05-10 |

---

## How reports are generated

HTML reports are self-contained (Plotly CDN + embedded images + hardcoded data).
They are generated in `ddcm/docs/` and copied here for publication.

See [`REPORTING.md`](../../../../REPORTING.md) at the vault root for the full workflow.
