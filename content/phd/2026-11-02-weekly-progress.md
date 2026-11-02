---
title: "Weekly progress, 26 October to 2 November 2026"
type: report
status: draft
unlisted: true
created: 2026-11-02
updated: 2026-11-02
tags: [phd, paper-a, weekly, estimation, constraint-heterogeneity]
---

Two lines of work ran this week. On the **estimation** side the re-specified model was estimated on the whole
sample, converged, and was checked against the diaries. On the **Paper A** side the formal backbone was settled, both
theorems were checked against their sources, the first of their implementations went into production, and the next
one was measured and prototyped. **[Open the Paper A deck](/slides/paper-a-progress/)** (43 slides, 2 November).

> [!warning] Working material
> Unlisted. The manuscript is not submitted, and the round 1 specification below is not yet estimated. Every number
> comes from a run log, a sidecar or a script output.

## 1. The final estimate

The re-specified model was estimated on all 9,077 diary files and **converged on 30 October**.

| Item | Value |
|---|---|
| Final log-likelihood | −42,462.12 (start −42,618.67) |
| Persons / scored steps | 6,487 / 376,773 |
| Parameters | 84, of which 76 free; 66 significant at 5% with robust standard errors |
| Convergence | 13 evaluations, trust-region Newton; Newton decrement 2.3e-07 on an exact positive definite Hessian |
| Hessian eigenvalues | 9.95 to 5.28e8, none non-positive |
| ρ² | 0.9477 against θ = 0 on the same graph (high mostly because that null is weak) |
| Wall time | about 8.3 hours, launch to standard errors |

Two engineering fixes made it possible. The exact Hessian had rebooted the machine on 28 October; the cause was the
edge chunk inside the Hessian, not the number of workers (a 2M chunk peaked at 50 GiB per worker, 250k at 15 GiB, same
wall time, Hessian equal to 1e-13). The run also used **canonical states** (section 3), which halves the graph.

Reports: [the final estimation report](/ddcm/final_estimation_report_20261030.html) and
[distribution figures in the style of Västberg et al. (2020)](/ddcm/behavioral_validation_20261030.html).

### What fits

| Quantity | Diary | Simulated |
|---|---|---|
| Mode share car / train / walk / bicycle / bus (%) | 69.3 / 13.5 / 8.8 / 7.4 / 1.0 | 69.5 / 14.4 / 8.1 / 7.1 / 1.0 |
| Time share home / work / leisure / shopping (%) | 72.5 / 21.5 / 4.1 / 1.9 | 73.0 / 21.1 / 4.3 / 1.6 |
| Tours per person-day | 0.752 | 0.736 |
| Work start (mean) | 8.34 h | 8.53 h |

New pre-work start constants closed the worker gap: simulated shopping and leisure starts before work went from 53
and 100 to 14 and 19, against 15 and 25 in the diary.

### What does not fit

1. **Duration.** Simulated shopping and leisure last about the same whatever the start hour; in the diary they
   shorten with it. The case study has no duration in the state.
2. **Chaining against tours.** Totals match, origins do not: too many starts from another activity, too few from home.
3. **Empty home-to-home trips.** Mostly a preprocessing artefact: short stops (pick-up, drop-off, quick shopping) fell
   between 15-minute slots and left a trip from home to home.

**Decision (30 October):** the current estimate serves Paper A's case study, with these gaps written as limitations,
while the specification keeps improving in parallel. No policy claim is made from it.

### Respecification round 1 (coded and verified, not estimated)

Leave out short pick-up/drop-off and hospital stops, recover short shopping and leisure stops, and forbid a tour that
leaves home and comes back with nothing done. Three switches, off by default. Gates: likelihood identical with the
switches off; with them on, canonical states equal to 2.7e-15; analytic gradient against central differences, ratio
1.0000. Next: an encoding audit on the full sample, then the estimate.

## 2. Paper A: the theory

**The backbone.** A person's day is a dynamic programme; its state transition graph is a weighted decision diagram
(Hooker 2013; Castro, Cire and Beck 2022). The preference side (recursive logit, the likelihood, the gradient) is
established and not claimed. The contribution is the domain side: how many people's feasible days are held on one
graph without changing anyone's likelihood.

| Result | What it says | Check |
|---|---|---|
| Theorem 1 | a person's own graph and the shared graph with that person's mask give the same value, probabilities, likelihood and gradient, when the map is one to one on the person's actions (E1), every other action is masked (E2), and the ends match (E3) | toy, the sharing gate on the production engine, the canonical-states gate |
| Theorem 2 | two classes of people can share one computation for every θ exactly when their lists of open days, counted by feature totals, are the same | random graphs, error 0 |
| Corollaries | one backward and one forward pass per class; a budget recorded as what is left is a start node (toy only: the case study has no budget-type constraint) | |

**Checked against the closest paper.** Tran, Mai and Hoang (2025), Theorem 2, extend the state by the accumulated
cost and map every path one to one, with equal probability: the mechanism of Theorem 1, for one decision maker and
one threshold. Theorem 1 extends it to a population on one shared graph, with conditions to check for any map. Their
Proposition 4 reaches the same triangular structure as the one-sweep proposition. The manuscript now says so.

**Learning series.** Seven notes take the theory from the basics: bijections and why they preserve a sum, the
log-sum and log *k*, recursive logit in network and matrix form, decision diagrams, Theorem 1, Theorem 2 through the
moment generating function, and the reductions. Slide 25 of the deck animates the moment generating function.

## 3. Paper A: from theory to code

| Change | Result | Status |
|---|---|---|
| **Canonical states**: erase duration and mode memory that no rule reads | likelihood equal to 2.7e-15, gradient to 6.4e-14, same observed steps; **42% of the edges, 2.3× less memory** | committed, used for the final estimate |
| **Live-region sweeps**: skip the states a group cannot be in | at full scale, 27% of the work (bound **3.7×**); backward induction on the live part equals the full graph exactly | prototype; production path next |
| Sharing the after-work part across workers | 83% of the work (1.8 worker columns per home) | deferred |
| Shift merge | small on top | research |

Canonical states are the first implementation of Theorem 2: two states that differ only in memory nothing reads have
the same list of open days without comparing them. The live region is the next: a mask matters only where a person
can be.

## 4. Next

1. Paper A: rewrite the formal section in the decision-diagram language and add the live-attribute and shift-merge
   statements; check that the final specification is linear in θ.
2. Live region: wire the prototype into the production objective and gradient, then the same gate as canonical states.
3. Round 1: full-sample encoding audit, review, then the estimate.
4. Paper A experiments: the pilot on synthetic networks; the case-study section from the final estimate.
