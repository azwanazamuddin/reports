---
title: "Weekly progress: 26 October to 2 November"
type: report
status: draft
created: 2026-11-02
updated: 2026-11-05
tags: [phd, paper-a, weekly, estimation, constraint-heterogeneity]
---

**[Open the Paper A deck](/slides/paper-a-progress/)** (current version; it had 43 slides when this was written) ·
[final estimation report](/ddcm/final_estimation_report_20261030.html) ·
[distribution figures](/ddcm/behavioral_validation_20261030.html)

> [!warning] Working material
> The manuscript is not submitted. Every number comes from a run log, a sidecar or a script output.

## 1. Planned

The plan for this week was to **finish the new formulation of Paper A**: the formal section rewritten on the
backbone settled on 28 October (a day as a dynamic programme whose state graph is a weighted decision diagram), with
the main theorem, its corollaries and the new results on live attributes, dead memory and the shift merge.

**Status: not finished today.** The backbone, the main theorem and its positioning against the literature are done;
the rewrite of the formal section in the manuscript is not. **Target: before this week's zemi.**

## 2. Done

### The latest estimate

The re-specified model was estimated on all 9,077 diary files and **converged on 30 October**.

| Item | Value |
|---|---|
| Final log-likelihood | −42,462.12 on 6,487 persons, 376,773 scored steps |
| Parameters | 84, of which 76 free; 66 significant at 5% with robust standard errors |
| Convergence | 13 evaluations, trust-region Newton, exact positive definite Hessian |
| Wall time | about 8.3 hours, launch to standard errors |

The simulation reproduces the diary at about the level Västberg et al. (2020) report:

| Quantity | Diary | Simulated |
|---|---|---|
| Mode share car / train / walk / bicycle / bus (%) | 69.3 / 13.5 / 8.8 / 7.4 / 1.0 | 69.5 / 14.4 / 8.1 / 7.1 / 1.0 |
| Time share home / work / leisure / shopping (%) | 72.5 / 21.5 / 4.1 / 1.9 | 73.0 / 21.1 / 4.3 / 1.6 |
| Tours per person-day | 0.752 | 0.736 |
| Work start (mean) | 8.34 h | 8.53 h |

Two engineering fixes made the run possible: the exact Hessian had rebooted the machine on 28 October (the cause was
the edge chunk inside the Hessian, now capped), and **canonical states** halved the graph (below).

### Paper A: outline and formulation progress

- **Backbone settled (28 Oct).** The preference side (recursive logit, likelihood, gradient) is established and not
  claimed; the contribution is the domain side: how many people's feasible days are held on one graph without
  changing anyone's likelihood.
- **One main theorem, with its corollaries** (decided 2 November, to keep the claim lean).
  - *Theorem 1:* a person's own graph and the shared graph with that person's mask give the same value, choice
    probabilities, likelihood and gradient, under three conditions (one to one on actions, every other action
    masked, matching ends).
  - *Corollaries:* each is Theorem 1 with a particular map, including the two reductions in the code
    (canonical states, the live region).
  - *A Remark (was Theorem 2):* classes with different open days cannot share a value for all θ, so one sweep per
    class is a real cost; it is not needed for any implemented result.
  - Also: one pass per class; a budget recorded as what is left becomes a start node (toy only).
- **Checked against the closest paper (2 Nov).** Tran, Mai and Hoang (2025), Theorem 2, is Theorem 1's path
  correspondence for one decision maker and one threshold; Theorem 1 extends it to a population on one shared graph.
  The manuscript now says so, and cites their Proposition 4 beside the one-sweep proposition.
- **Deck brought to 2 November**: one notation throughout, proofs step by step, the Remark, a live-region slide, and background in an appendix.
- **Learning series** of seven notes, from bijections and the log-sum to Theorem 1, its corollaries and the live region.

### From theory to code

| Change | Result | Status |
|---|---|---|
| **Canonical states**: erase memory that no rule reads | likelihood equal to 2.7e-15; **42% of the edges, 2.3× less memory** | committed, used for the final estimate |
| **Live-region sweeps**: skip the states a group cannot be in | 27% of the work at full scale (bound **3.7×**); backward induction exact on the live part | prototype |

### First respecification (coded and verified, not estimated)

Leave out short pick-up/drop-off and hospital stops, recover short shopping and leisure stops, and forbid a tour that
leaves home and comes back with nothing done. All gates passed (likelihood unchanged with the switches off; analytic
against numerical gradient, ratio 1.0000).

## 3. Ongoing

- **Formulation**: rewriting the formal section of the manuscript in the decision-diagram language; replacing the
  model-minimisation remark; adding the live-attribute and shift-merge statements.
- **Paper writing**: the case-study section from the final estimate, with its gaps written as limitations; the
  experiments section after the pilot.
- **Live region**: the prototype into the production objective and gradient.

## 4. Evaluate

- **The equations need more time to learn.** The theorems are checked, but being able to explain each step
  (bijections, the log-sum, the moment generating function, the reductions) is still in progress, through the
  learning series and the deck.
- **Respecify the estimation again?** The estimate fits totals well, but three gaps are hidden behind matching
  totals:
  1. *Duration*: simulated shopping and leisure last about the same whatever the start hour; in the diary they
     shorten with it. The case study has no duration in the state.
  2. *Chaining*: too many starts from another activity, too few from home.
  3. *Empty home-to-home trips*: mostly short stops lost between 15-minute slots.

  The first respecification addresses the third. A further one (duration with satiation) would address the first but reverses the
  28 October choice to keep duration only in the general formulation. **To decide.**

## 5. Next steps

1. **Finalise Paper A's formulation** before the zemi: the formal section, the new statements, and a check that the
   final specification is linear in θ (the Remark and the gradient as flows need it).
2. **New estimation?** For Paper A, the current estimate is enough (its claim is exact computation under
   constraints, not the best behavioural model). The first can run in parallel in under a day; the further one needs a
   decision first.
3. The experiments pilot on synthetic networks, then the case-study section.
4. The live-region gate (same likelihood and gradient, timing through the worker pool).
