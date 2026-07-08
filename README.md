---
title: DDCM Research Reports
type: index
status: active
created: 2026-04-19
updated: 2026-05-11
tags: [ddcm, reports, landing]
---

# DDCM Research Reports

**Web view (GitHub Pages):** [https://azwanazamuddin.github.io/reports/](https://azwanazamuddin.github.io/reports/)

A wrapper for my PhD research reports on **Dynamic Discrete Choice Models (DDCM)** for activity-based travel demand.

The folder follows the [HIIRM lab meeting template](https://github.com/hiirm2017/hiirm/tree/master/lab_rule/meeting_templete): each lab meeting has (1) a rolling **thesis draft** as the research overview document and (2) a per-meeting **discussion doc** in `meetings/<semester>/`.

---

## Folder layout

```
reports/
├── README.md                              ← this file (landing page)
├── templates/                             ← HIIRM meeting templates (English)
│   ├── instructions.md                       how the meeting process works
│   ├── meeting-template.md                   blank meeting-day document
│   └── thesis-template.md                    blank thesis draft
├── thesis/                                ← rolling Master thesis draft
│   └── thesis-draft.md                       single source of truth — update before each meeting
├── slides/                                ← interactive presentation decks (Slidev, built static HTML)
│   ├── ddcm/                                 main DDCM research deck — rebuild with: slidev build --base /reports/slides/ddcm/
│   └── apte/                                 APTE 2026 conference talk — rebuild with: slidev build --base /reports/slides/apte/
├── ddcm/                                  ← standalone HTML reports (see ddcm/index.md)
│   ├── recovery_smallnet_R30_20260620.html      Report 1 · parameter recovery & identification
│   ├── experiments_exact_sa_rl_20260621.html    Report 2 · Exact vs SA vs RL (approximation error)
│   └── …                                         earlier reports (profile-LL, work-timing, …)
├── meetings/                              ← per-meeting discussion docs
│   ├── 2025-fall/                            M1 Fall 2025 (archive)
│   │   ├── *.md                              meeting docs
│   │   └── presentations/*.pdf               slide exports for that semester
│   └── 2026-spring/                          M2 Spring 2026 (current)
│       ├── *.md                              meeting docs
│       ├── figures/*.png                     figures used in meeting docs
│       └── presentations/*.pdf               slide exports for that semester
```

**Updating the slides deck:** The `slides/ddcm/` folder is a built Slidev output (not source). To rebuild after editing `4 - Projects/ddcm/ddcm_slides/slides.md`:

```bash
cd "4 - Projects/ddcm/ddcm_slides"
npx slidev build --base /reports/slides/ddcm/
rsync -a --delete dist/ "../../../3 - Permanent Notes/reports/slides/ddcm/"
```

Then commit and push the updated `slides/ddcm/` folder in the reports repo.

Same pattern for the APTE deck — source at `4 - Projects/ddcm/apte_slides/slides.md`:

```bash
cd "4 - Projects/ddcm/apte_slides"
npx slidev build --base /reports/slides/apte/
rsync -a --delete dist/ "../../../3 - Permanent Notes/reports/slides/apte/"
```

Then commit and push the updated `slides/apte/` folder in the reports repo.

**Two documents per meeting** (HIIRM convention):

1. **Research overview** → always `thesis/thesis-draft.md`. Do not duplicate per meeting — update the single draft, Git history preserves versions.
2. **Meeting-day discussion doc** → a new file in `meetings/<semester>/`, based on `templates/meeting-template.md`. Concise: what to discuss, current situation, stuck points, confirmations.

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

Per-meeting discussion docs. Update `thesis/thesis-draft.md` before each meeting; add a new meeting doc per session.

| Date | Meeting Doc | Slides | Event / context |
|---|---|---|---|
| 2026-06-23 | [Research Progress (M2, Jun 23, 2026)](meetings/2026-spring/260623%20-%20Research%20Progress%20(M2,%20Jun%2023,%202026).md) | — | Parameter recovery (R=30, θ_travel bias 13.8%→0.8%), Exact/SA/RL approximation-error experiments (SA consistent, RL Jensen-biased at finite B), HH full run status (iter 6, best LL=−177,916). |
| 2026-06-01 | [Research Progress (M2, Jun 1, 2026)](meetings/2026-spring/260601%20-%20Research%20Progress%20(M2,%20Jun%201,%202026).md) | — | Analytical gradient confirmed correct (GV zone-batch MPS int32 overflow root cause, CUDA clean); NFXP estimation unblocked; APTE revision paragraphs; Thesis Ch2 outline. |
| 2026-05-11 | [Research Progress (M2, May 11, 2026)](meetings/2026-spring/260511%20-%20Research%20Progress%20(M2,%20May%2011,%202026).md) | — | Weekly progress. K=10 L-BFGS-B convergence (LL=−19,187, BHHH SEs), work timing gap analysis, 11 new lit reviews, JSPS outline finalized. |
| 2026-04-27 | [Research Progress (M2, Apr 27, 2026)](meetings/2026-spring/260427%20-%20Research%20Progress%20(M2,%20Apr%2027,%202026).md) | — | Weekly progress. Gradient bug fixes (forbidden_masks, zone ID), c_change ridge diagnosis, cumulative utility diagnostic planned; JSPS/thesis writing updates. |
| 2026-04-19 | [Master Thesis Progress (M2, April 2026)](meetings/2026-spring/260419%20-%20Master%20Thesis%20Progress%20(M2,%20April%202026).md) | [April_Seminar_Presentation.pdf](meetings/2026-spring/presentations/April_Seminar_Presentation.pdf) | M2 mid-semester progress presentation. Framework, μ(t), results, estimation diagnosis. |

Thesis draft (research overview document): [`thesis/thesis-draft.md`](thesis/thesis-draft.md).

---

## Last semester — Archive (M1 Fall 2025)

Older reports kept for reference. These predate the DAG / reachability / μ(t) reframing and are **not** the current state of the work.

| Date | Report | Topic |
|---|---|---|
| 2025-10-08 | [PUMCM for Activity-Based Models](meetings/2025-fall/251008%20-%20NOT%20USED%20-%20PUMCM%20for%20Activity-Based%20Models.md) | *Not used.* Early brainstorm on PUMCM. |
| 2025-10-15 | [Ideas on TD Estimation on DDCM](meetings/2025-fall/251015%20-%20Ideas%20on%20TD%20Estimation%20on%20DDCM.md) | TD-learning ideas for DDC estimation. |
| 2025-11-04 | [Readings & Implementation Plans](meetings/2025-fall/251104%20-%20Readings%20%26%20Implementation%20Plans.md) | Lit-review notes + implementation roadmap. |
| 2025-11-09 | [SMASO-X Presentation Summary](meetings/2025-fall/251109%20-%20SMASO-X-Presentation-Summary.md) | Summary of the SMASO-X talk. |
| 2025-11-26 | [Tensor-Based Summary Update](meetings/2025-fall/251126%20-%20SummaryUpdateTensorBased.md) | Early tensor-graph framework write-up. |
| 2025-12-15 | [Documentation & Re-framework](meetings/2025-fall/251215%20-%20Progress%20on%20documentation%2C%20re-framework%20the%20algorithm.md) | Algorithmic re-framework progress. |
| 2025-12-24 | [Universal Graph & BI Optimization](meetings/2025-fall/251224%20-%20Universal%20Graph%20and%20BI%20Optimization.md) | Shared-graph structure + BI tuning. |
| 2026-01-07 | [RMDP Theory & Implementation](meetings/2025-fall/260107%20-%20RMDP%20Theory%20and%20Implementation.md) | Relational MDP theory + lifted solvers. |
| 2026-01-27 | [Progress on Validation Plan](meetings/2025-fall/260127%20-%20Progress%20on%20validation%20plan.md) | Seven-layer validation framework. |

Slide decks and PDFs from last semester: [`meetings/2025-fall/presentations/`](meetings/2025-fall/presentations/).

---

## How to prepare for a meeting (HIIRM workflow)

1. **Update the thesis draft** (`thesis/thesis-draft.md`) to reflect current progress. Mark unwritten parts with `TODO:`.
2. **Write a meeting-day doc** — copy `templates/meeting-template.md` into `meetings/<semester>/YYMMDD - <short title>.md` and fill in:
   - What you want to discuss today (1–3 items)
   - Current situation (what you did / what slipped)
   - Definitions of any new terms
   - Your own thoughts on each discussion item
   - Where you are stuck
   - Things to confirm
   - Computational results, each with a link back to the generating code
3. **Commit and push** to `azwanazamuddin/reports` (this repo).
4. In the meeting, spend the first few minutes reading silently — no verbal explanation needed up front.
5. **After the meeting**, fill in the "Action Items for Next Meeting" block at the bottom of the meeting doc.

Full instructions: [`templates/instructions.md`](templates/instructions.md).

---

## Related in the vault

- Master thesis detailed outline — `3 - Permanent Notes/research-plan/MASTER_THESIS_OUTLINE.md`
- Research roadmap — `3 - Permanent Notes/research-plan/RESEARCH_PLAN.md`
- DDCM map of content — `5 - Indexes/index-ddcm.md`
- Active implementation — `4 - Projects/ddcm/`
- Editable slide source (Slidev) — `4 - Projects/ddcm/ddcm_slides/slides.md`
