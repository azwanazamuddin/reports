---
title: DDCM Research Reports
type: index
status: active
created: 2026-04-19
updated: 2026-04-19
tags: [ddcm, reports, landing]
---

# DDCM Research Reports

A wrapper for my PhD research reports on **Dynamic Discrete Choice Models (DDCM)** for activity-based travel demand.

Each report here is a self-contained progress note. This README is the landing page — use the tables below to jump into a specific topic or semester.

---

## The big picture

I am building a **computational framework that makes activity-based DDCM estimation tractable at city scale**, and re-specifying its utility function so that **activity timing emerges from preferences** rather than from hard-coded rules.

Two things have been bottlenecks in activity-based demand modelling:

1. **State-space explosion** — a single city has ~145 million states when you multiply time, zone, activity, duration, mode, vehicle, and history. Estimating anything on that is a 1000-CPU-day / 6.7 TB problem.
2. **Timing is usually assumed, not estimated** — classic specs bolt hard time windows onto the model (e.g. "work happens 6 am–10 pm"). So behaviour is partly an *input*, not an *output*.

My contribution has three pieces:

| # | Piece | What it does |
|---|-------|--------------|
| 1 | **DDCM as a DAG** | Time only moves forward, so the state-transition graph has no cycles. Backward induction is a reverse topological sort over a DAG — which means a GPU can process each time level in one batched kernel. |
| 2 | **Reachability pruning** | A forward BFS from feasible starts, with Hägerstrand space-time-prism constraints, keeps only states an agent can actually reach. 145M → 1.5M (**~1%**), no approximation. |
| 3 | **μ(t) utility** | Each activity gets a time-varying marginal-utility profile μₐ(t). Trip-making emerges from the gradient. Timing becomes an output. |

End-to-end result so far: full pipeline **~69 hours → 105 seconds** (~2,400×), memory **6.7 TB → 6.5 GB**, on a 144-zone Higashi-Hiroshima city network.

---

## Current semester — M2 Spring 2026

Weekly / per-presentation progress reports. Each file captures one meeting or talk.

| Date | Report | Slides | Event / context |
|---|---|---|---|
| 2026-04-19 | [Master Thesis Progress (M2, April 2026)](m2-2026-spring/260419%20-%20Master%20Thesis%20Progress%20(M2,%20April%202026).md) | [April_Seminar_Presentation.pdf](m2-2026-spring/presentations/April_Seminar_Presentation.pdf) | M2 mid-semester progress presentation. Framework, μ(t), results, estimation diagnosis. |

---

## Last semester — Archive

Older reports kept for reference. These predate the DAG / reachability / μ(t) reframing and are **not** the current state of the work.

| Date | Report | Topic |
|---|---|---|
| 2025-10-08 | [PUMCM for Activity-Based Models](last-semester/251008%20-%20NOT%20USED%20-%20PUMCM%20for%20Activity-Based%20Models.md) | *Not used.* Early brainstorm on PUMCM. |
| 2025-10-15 | [Ideas on TD Estimation on DDCM](last-semester/251015%20-%20Ideas%20on%20TD%20Estimation%20on%20DDCM.md) | TD-learning ideas for DDC estimation. |
| 2025-11-04 | [Readings & Implementation Plans](last-semester/251104%20-%20Readings%20%26%20Implementation%20Plans.md) | Lit-review notes + implementation roadmap. |
| 2025-11-09 | [SMASO-X Presentation Summary](last-semester/251109%20-%20SMASO-X-Presentation-Summary.md) | Summary of the SMASO-X talk. |
| 2025-11-26 | [Tensor-Based Summary Update](last-semester/251126%20-%20SummaryUpdateTensorBased.md) | Early tensor-graph framework write-up. |
| 2025-12-15 | [Documentation & Re-framework](last-semester/251215%20-%20Progress%20on%20documentation%2C%20re-framework%20the%20algorithm.md) | Algorithmic re-framework progress. |
| 2025-12-24 | [Universal Graph & BI Optimization](last-semester/251224%20-%20Universal%20Graph%20and%20BI%20Optimization.md) | Shared-graph structure + BI tuning. |
| 2026-01-07 | [RMDP Theory & Implementation](last-semester/260107%20-%20RMDP%20Theory%20and%20Implementation.md) | Relational MDP theory + lifted solvers. |
| 2026-01-27 | [Progress on Validation Plan](last-semester/260127%20-%20Progress%20on%20validation%20plan.md) | Seven-layer validation framework. |

Slide decks and PDFs from last semester: [`last-semester/presentations/`](last-semester/presentations/).

---

## How to use this folder

- **Latest progress** → the most recent row in the *Current semester* table.
- **Presentation PDFs** → `m2-2026-spring/presentations/` (current) · `last-semester/presentations/` (archive).
- **The underlying slide source** (editable Slidev) → `4 - Projects/ddcm/ddcm_slides/slides.md`.
- **Figures** used across reports → `m2-2026-spring/figures/`.

## Related in the vault

- Research roadmap — `3 - Permanent Notes/research-plan/RESEARCH_PLAN.md`
- DDCM map of content — `5 - Indexes/index-ddcm.md`
- Active implementation — `4 - Projects/ddcm/`
