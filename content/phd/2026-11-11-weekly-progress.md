---
title: "Weekly progress: 5 to 11 November"
type: report
status: draft
created: 2026-11-10
updated: 2026-11-19
tags: [phd, weekly, estimation, public-transport, work-duration, optimal-transport, game-theory]
---

**Full weekly post.** It completes the [half-week post of 9 November](/phd/2026-11-09-weekly-progress), which set out three suspicions about the positive public transport time coefficient.

> [!warning] Work in progress
> Every number comes from a run log or a script output. Checks still running are marked as such; their readings were written before they ran.

> [!note] Case study numbers kept internal (19 November)
> While the Part B paper is under review, the estimates, standard errors, values of time, fit figures and the estimation reports of the case study are kept in internal notes and are no longer shown here. The reasoning and the decisions stay.

## 1. In short

**The overtime suspicion was confirmed and fixed. Every travel time coefficient is now negative, public transport included.** The last open sign, cost, was traced to commuters being charged money their employer pays. The model change was built, checked exactly against the old model on the full sample, and estimated. **In the new estimate (11 November) cost is negative and clearly identified.**

| | 9 November | 10 November | 11 November |
|---|---|---|---|
| Cause of the positive public transport time | free overtime at work, under review | **confirmed** by two fixed-$\theta$ tests | |
| Fix | two options, (a) or (b) | **(a) chosen:** the work duration is exact | + commutes free of money cost, passengers free of fuel |
| Public transport time | positive | **negative** | **negative** |
| Cost | slightly positive | still slightly positive, not significant | **negative, significant** |

## 2. The overtime test (L1 and L2)

**The question:** does the joint rise of every rate and time coefficient come from workers staying at work after the diary's work block?

Both tests ran at a fixed $\theta$ on the full sample, shifting every rate and time coefficient together by the same amount.
- **L1:** non-workers' log-likelihood is exactly unaffected by the shift, as expected. Workers lose a large amount when the shift is reversed, because lower values bring the overtime back, and simulated overtime rises with it.
- **L2, with staying at work removed:** that loss disappears.

So the level pull came from the extra stay at work, at utility 0, which no diary can show. The public transport specification was not the cause; it was simply the coefficient closest to zero when everything rose together.

**The same structure appears in Västberg et al. (2020).** They also use a minimum-duration jump at work with work utility 0. McCarthy, Karlström and Västberg (2025) instead give work its own rate and let the duration be chosen.

## 3. The fix: an exact work duration

**Decision (option a):** the work block in the diary is a hard constraint. A worker who arrives at work leaves after exactly the observed duration, and the model chooses everything around it.

- The other option, a chosen work duration, needs data the survey does not have: no working hours and no flexibility field. **It is noted as a limitation and future work.**
- Implemented as one flag, with tests and a gradient check. The full test suite passes.
- At a fixed $\theta$, simulated overtime disappears.

## 4. The new estimate (10 November)

Converged on 10 November. Every travel time coefficient is negative, public transport included, and the trip-level mode choice model agrees on public transport time. Cost was still slightly positive and not significant. The switch from public transport out to car passenger home now happens about as rarely as in the diary. Still off: non-workers use public transport too often, and workers come home as car passengers too often. These are reported, not tuned away with constants.

## 5. The open sign: cost

- **Cost was negative only while car time was fixed** at a value carried over from earlier runs. Fuel moves almost exactly with car time, so with car time held still, cost carried "long car trips are disliked".
- **Once car time was freed, the two pulled against each other.** Car time took over the distance effect; what was left for cost (route speed, and the commute money that employers pay) pushed it slightly positive.
- **Cost is hard to identify here:** once time is known, what is left in fuel is "how far you went in that time", which is route speed, not money; most of the cost coefficient's information is shared with other parameters.

**What did not explain it:** removing one cost component at a time; errors in the car skim (they run the other way); congested car times from MATSim; faster-than-linear disutility of long walks and bicycle trips; distance-band mode constants; a rule that a passenger needs another driver in the household.

**What did explain it: commuters do not pay for their commute.** Most Japanese firms pay a commuting allowance (通勤手当; MHLW 平成27年就労条件総合調査, table 18), for train, bus and car commuters alike. In the trip-level mode choice model, making commute trips free turns cost clearly negative and improves the fit with no extra parameter. Once commutes are free, charging car passengers fuel also lowers the fit: the driver pays the fuel.

**The change in the model:**
- **Commute trips (home → work/school, work/school → home) pay no money, by any mode**, for people with a work or school block that day. Their other trips, and all non-workers' trips, pay as before.
- **Car passengers pay no fuel.**
- How it is built: the model picks where and how to travel first and what to do on arrival. Västberg et al. (2020) choose destination, mode and purpose together; the two forms are the same model only while travel cost does not depend on the purpose. So a trip leaving home (before work) or leaving work now comes in two versions, "my commute" (free, ends only at work or home) and "another trip" (paid, cannot end there). This is the same model as choosing the purpose with the trip, at **+21% edges** in the largest graph (measured), against about 20 times more for choosing everything jointly.

## 6. The new estimate (11 November): commutes free

Converged on 11 November, with robust standard errors (sandwich, exact Hessian at the estimate) computed on 12 November.

- **The reading written before the run is met:** cost is negative and more than 2 standard errors from zero. The commuting-allowance explanation holds in the DDCM itself, not only in the trip-level model.
- **Every travel time coefficient stays negative.** Car and public transport time are smaller in size than on 10 November: part of what they carried was money, and cost now takes its own share.
- **Values of time** for non-commute trips lie in the range of the MLIT private-trip values (rail evaluation manual, 2012).
- **Second-order check:** the exact Hessian at the estimate has all eigenvalues positive and a Newton decrement near zero, so the estimate is a maximum. Most parameters are significant with robust errors, and every time and cost coefficient stays far from zero.

**The simulation against the diary:** workers' public transport commute fits the diary closely, out and home; work and home start times and time at home and at work fit closely. **Still off:** workers go as car passengers too often (part of the gap is how the diary is encoded: a car-driver trip by someone without a car or licence is read as a passenger trip), non-workers use public transport too often, and too many simulated days return home just before midnight, where the model day ends. Reported, not tuned away.

## 7. Learning

### Optimal transport (in progress)

**Status: in progress, not finished.** The material was restructured this week into one linear path of **27 lessons in five parts:**
1. mathematical basics;
2. convex analysis;
3. the core of OT;
4. OT as a whole (maps, geometry, statistics, branches);
5. connections.

Each lesson names the exact sections to read, explains the ideas with derivations, works an example with computed numbers, and ends with a gate.

The working assumption from last time is unchanged and **still untested:** OT relates to logit, DDCM, recursive logit and perturbed utility through entropy and duality. Testing it is the last part of the path.

### Game theory (new, for the study camp)

A reading guide for Tadelis, *Game Theory: An Introduction* (2013), was set up: 18 lessons, one per chapter, in the same format. **It is preparation for the study camp, not part of my research;** an optional last lesson only maps where it meets discrete choice and traffic equilibrium.
