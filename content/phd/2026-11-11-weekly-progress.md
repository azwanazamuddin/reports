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
> While Paper A is under review, the estimates, standard errors, values of time, fit figures and the estimation reports of the case study are kept in internal notes and are no longer shown here. The reasoning and the decisions stay.

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

## 8. Status

### Done, in the order it happened

1. **Main cause of the positive public transport time found (9 November):** workers could stay at work after their diary work block at utility 0, which no diary shows. To suppress it, the likelihood raised every coefficient together, and public transport time, the one closest to zero, crossed into positive. Two tests at a fixed $\theta$ confirmed it (section 2).
2. **The fix (9 to 10 November):** the work block is taken exactly from the diary, and the public transport ↔ car passenger switch inside a tour was removed. The 10 November estimate converged with every travel time coefficient negative.
3. **The timetable data checked and cleared as a cause.** Since the 6 November estimate public transport comes from the full 2021-2025 timetable, through a **service constraint** (decided on 5 November):
   - public transport exists at a 15-minute step only if a journey actually leaves in that step; between departures there is no public transport option at all. This is a restriction on which choices exist, not a penalty;
   - the time of an open step is the timetable's earliest arrival minus the departure time, door to door, so waiting and transfers sit inside one time with one public transport coefficient: no separate wait parameter, no caps;
   - an observed trip that the diary puts on a closed step moves to the nearest open step (only forward when leaving work); a person whose trip would have to move 45 minutes or more leaves the sample (about 0.3%);
   - a commuter with a fixed work start may take an earlier journey and wait;
   - the walk from the last stop to an external zone is measured per city from building points;
   - checked at a fixed $\theta$ on the full sample before the run.
4. **Exact Hessian at the 10 November estimate:** all eigenvalues positive, a true optimum.
5. **Why cost turned positive, and its cause (section 5):** cost's earlier negative sign rested on a fixed car time; the cause of the positive sign is commute money that employers pay.
6. **The model change built:** commutes pay no money, passengers pay no fuel, trips leaving home or work split into "my commute" and "another trip". New tests on a small network pass, and the full test suite passes.
7. **The exactness check of the new graph, and two fixes it forced (10 to 11 November).** Full story under Error. The full-sample check then gave the same log-likelihood in both graphs, the same persons and decisions, and gradients equal to 8e-16.
8. **The new estimate converged (11 November, section 6),** with robust standard errors and the second-order check on 12 November.
9. **The memory guard now protects the estimation.** When memory runs short it first stops other large jobs of the same account, and stops the estimation only when nothing else is left.
10. **The simulation at the new estimate (section 6).**

### Doing
- Deciding the next step for workers' car passenger trips (a separate worker passenger constant or not).
- Learning optimal transport: the 27-lesson path in five parts, as preparation for the next paper after Paper A (TR Part B).
- Tadelis game theory reading guide (18 lessons), as preparation for the study camp.

### Error

**What the check is.** The model's actions are built in two steps: first where and how to travel, then, on arrival, what to do. That is the same model as Västberg et al.'s single choice of destination, mode and purpose, as long as travel cost does not depend on the purpose. Free commutes break that condition, so each trip leaving home (before work) or leaving work is now split into two versions: "my commute" and "another trip" (section 5). To test the split alone, there is a **check version** of the new graph: it has the two versions but still charges cost on both. That check version is, by construction, the old model in a different graph, so it must reproduce the old log-likelihood and gradient exactly. Only after that does "commute free" mean what it says.

**First failure (10 November evening).** On the full sample at the 10 November estimate, the check version gave a log-likelihood more than a hundred points away from the old one, with 3 persons and 20 observed decisions fewer. That gap is larger than the improvement the change is meant to bring, so it could not be ignored: it would be mixed into any new estimate.

- **The model itself was identical.** Every edge utility (70.6 million edges), every activity-state value (357,760 states, largest difference 2.5e-14), the set of states and the observed paths were all the same in both graphs. (An earlier version of this post guessed at edge utilities; that guess was wrong.)
- **The cause was which diary decisions are counted.** A trip is two steps: leaving (where and how) and arriving (what to do). When only one of the two can be matched to the graph, the old rule still counted the matched half. The old graph puts the purpose on the arrival, the new one on the departure for commutes, so the half that survives differs and the two graphs score different halves. One more case: a failed arrival at work left the following work steps counted, where the exact work duration makes them impossible.
- **Fix: paired trip scoring.** A trip's departure and arrival are counted together or not at all, and a failed arrival at work still skips the work block. With it, the 274-person check gives **identical** log-likelihoods (equal to 13 decimals), the same gradient, and the same 13,897 decisions; 8 steps of 25,672 (0.03%) are dropped with their trip partner.

**Second failure (11 November, 00:42).** On the full sample the two graphs were still 77 log-likelihood points and 11 decisions apart.

- **The matching was now identical:** an audit of every diary step found the same 366,988 matched steps in both graphs.
- **The cause:** 11 workers, one step each, leave work in the late afternoon or evening for a home arrival from which the model cannot complete the day. At each $\theta$ the likelihood leaves out steps the model finds impossible. In the old graph the departure could still lead elsewhere, so it was counted and only the arrival was dropped; in the new graph the departure already says "home" and was dropped too. 11 departures at about -7 points each make the 77-point gap.
- **Fix:** the pairing rule now also applies at that point: if either half of a trip is impossible, both are left out. It sits in the two functions every likelihood, gradient and standard-error path calls. Recomputed from the stored values, both graphs now count **361,167 decisions, with no group differing.**

**Third attempt (06:20) stopped by the memory guard, not by an error.** The two full-sample evaluations ran side by side, each holding its whole stored graph set in memory, and together they filled the machine. Run one after the other, **the check passed at 06:40**: the same log-likelihood in both graphs, identical persons and decisions, gradients equal to 8e-16.

**What this means for the method.** It is a rule about which observed decisions enter the likelihood, and it will be stated as such: a trip is one choice, so both of its steps are scored together or not at all. It changes the counted sample by about 0.05%, so the new log-likelihood is not exactly comparable to the 10 November one.

**The first attempt at the new estimation was stopped by the memory guard (11 November, 11:06), not by an error.** It was 3.5 hours into its first exact Hessian, holding about 420 GiB of 512, when another job started beside it. Nothing was lost but time: the optimizer had not yet moved. It was relaunched at 11:08 with fewer workers in the Hessian at once (6 instead of 8: safer, slower) and reused the stored graphs (a launcher bug had kept every timetable run since 5 November from finding them; fixed). The guard was also changed to protect the estimation first (Done 11).

**The first simulation at the new estimate mislabelled every commute (11 November, 21:10).** Workers showed only a fraction of the diary's car trips. The simulated choices were right; the file writer decided "trip or not" from the activity column alone, and a commute carries its target (work or home) there, so each commute was written as a work or home row with no mode. Fixed with the same rule as the rest of the code (a trip is any action with a mode) and rerun, with a check that fails on the mislabelled output.

### To do
1. **Workers' car passenger trips:** decide whether workers need their own car passenger constant, and test it at a fixed $\theta$ before any run.
2. The 11-step gap in the canonical graph; an outdated test fixture (the pool flow-gradient tests stop before reaching the code); documentation (module READMEs, the formulation with the factorization statement); commit.
3. **Finalize the manuscript (Paper A, TR Part B) after the estimation succeeds:** parameter tables, figures and results from the new estimate.
4. Learning: the first lessons of the OT path (basics), and the first chapters of Tadelis for the study camp.
