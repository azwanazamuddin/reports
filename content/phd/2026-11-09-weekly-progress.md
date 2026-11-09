---
title: "Weekly progress: 5 to 9 November (half week)"
type: report
status: draft
created: 2026-11-09
updated: 2026-11-09
tags: [phd, weekly, estimation, public-transport, optimal-transport]
---

**Half-week post.** The full weekly progress follows on Wednesday, as last week.

> [!warning] Working material
> Every number comes from a run log, a sidecar or a script output. Readings marked as such are not yet tested.

## 1. Planned

**Re-estimate the latest model, changing public transport only.** Public transport supply should come from the timetable and the network
geometry alone. Every cap, temporary limit and value chosen to match the diary is removed. The diary is used to validate after estimation, never to tune.
Structural checks at a fixed $\theta$ come before any full run.

## 2. Done

### Public transport from the timetable

- **Service constraint.** Public transport is offered at a 15-minute step only if a journey departs in that step. Between departures there is no public transport option.
- **Time.** $T(t)=EA(t)-t$, where $EA(t)$ is the earliest arrival from the timetable. Waits are inside $T$, with one time coefficient and no separate wait parameter.
- **Observed trips on a closed step** move to the nearest open step. A person whose trip would move 45 minutes or more leaves the sample (about 0.3%).
- **Same-zone walk times.** Set per city from walk catchments, 7.7 to 38.3 minutes.
- **Normalisation.** Leisure at 14:00 is fixed at 0, and all time coefficients are free.
- **A stated limitation:** the survey is from 2012/2014 and the timetable from 2021-2025.

### The full run, and why it was stopped

The run started on 6 November. The memory guard stopped it in the first exact Hessian, at 12 parallel slots. With 8 slots the Hessian took about 3 hours, without trouble.
**The run was stopped the same afternoon**, because two signs stayed positive and the parameters had almost stopped moving:

| | Value at the stopped run's best point |
|---|---:|
| Log-likelihood | -39,078.56 |
| Public transport time | **+0.0072** |
| Cost | **+0.00012** |
| Car time | -0.0412 |

A trip-level logit on the same trips gives public transport time -0.025 and cost -0.00047, both negative.

### Two mechanisms found and acted on

- **Out by public transport, home as a car passenger.**
  - The model does this on 20-29% of public transport days; the diary on 1.5%.
  - Decision: forbid the switch inside a tour, and leave out the few diary persons who make it.
- **Passenger fuel.** It makes cost almost the same as car time (correlation 0.97). Zeroing it is kept as a second run, only if needed.

Run A, with the switch forbidden, is coded and checked: 1,228 tests, the gradient against finite differences, and an evaluation at a fixed $\theta$. **It has not been launched.**

## 3. Ongoing

**Today's independent audit found a deeper cause, so run A is on hold.**

- **Free overtime at work.** After the work duration is taken, the model still lets a worker stay at work at utility 0. The duration comes from the same diary day, so the diary never shows overtime.
- **The model uses it heavily.** Simulated overtime appears on 82% of worker-days at the start point and 51% at the stopped run's best point.
- **The run climbed along this level.** Its log-likelihood rose by 2,178 while every activity rate and every mode's travel utility per minute rose together by about +0.04. That joint rise is what turned public transport time and cost positive.
- **Non-workers cannot cause it.** For them such a shift is an exact normalisation, so the pull comes from workers.
- **The same structure is in Västberg et al. (2020).** McCarthy, Karlström and Västberg (2025) instead give work its own rate and let its duration be chosen.

**Two structural tests at a fixed $\theta$ come first.** L1 follows the log-likelihood of workers and non-workers along the level shift. L2 repeats it with staying at work removed.
L1 is being set up now, and there are no results yet.

After the tests, the model choice is:
- **(a) Exact work duration:** only departures after the duration is taken.
- **(b) A free work rate:** the duration is chosen, as in McCarthy et al.

## 4. Evaluate

- **Earlier reports read the sign as a public transport problem.** The two mechanisms are real misfits, but neither moves the level, so neither can fix both signs.
- **"Only differences are identified" was assumed, not checked.** It holds for non-workers only.
- **Uncertainty figures came from the start point, not the estimate.** Every standard error and correlation behind the earlier reasoning used a Hessian 2,188 log-likelihood units away from the estimate.
- **Run A would likely have made cost more positive.** Its own pre-check predicts about +0.0004.

## 5. Learning: optimal transport

**The target is optimal transport (OT) as a whole:**
- the problem and its dual;
- Wasserstein distances;
- computation;
- maps, geometry and statistics;
- the main branches.

Convex analysis and duality are learned when OT needs them. The link to my models is the last of nine phases, and it does not narrow what comes before it.
The material is a guide, a knowledge map, foundation and OT notes, and a 35-step reading curriculum with the sections to read.

**A provisional conclusion on the link to this work.** It is only partly tested.

| Link | Status |
|---|---|
| Logit is entropic OT with one margin fixed. With destination totals added, each row stays logit, and the destination potentials act as destination constants. Sinkhorn's algorithm is the Furness balancing of the gravity model | computed on toys |
| The log-sum and entropy form a conjugate pair, which is the duality inside DDCM. Static choice can be written as matching shocks to actions (Chiong, Galichon and Shum, 2016) | the paper read, pp. 1-30 |
| Recursive logit looks like a Schrödinger bridge whose end is left free | my reading, to check against the literature |
| Perturbed utility with a quadratic term looks like quadratically regularised OT, with sparse plans as with zero choice shares. Its route-choice form looks like a regularised Beckmann flow on a graph | my reading, to check |
| OT dual potentials are fixed only up to a constant, like the utility level in this week's estimation problem | an analogy, not a result |

## 6. Next steps

1. Run L1 and L2, with the reading of each written before it runs.
2. Choose (a) or (b), then code it with tests and a gradient check, and estimate after approval.
3. While that runs:
   - why the canonical graph encodes 11 more observed steps (this matters for "lossless" in the paper);
   - parking-off and fare-off checks at the new estimate;
   - the same-zone walk time sensitivity run.
4. Learning: phases 1 to 3 of the reading curriculum (the OT problem, the conjugate, duality).
