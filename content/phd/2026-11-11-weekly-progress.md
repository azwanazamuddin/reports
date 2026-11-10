---
title: "Weekly progress: 5 to 11 November"
type: report
status: draft
created: 2026-11-10
updated: 2026-11-11
tags: [phd, weekly, estimation, public-transport, work-duration, optimal-transport, game-theory]
---

**Full weekly post.** It completes the [half-week post of 9 November](/phd/2026-11-09-weekly-progress), which set out three suspicions about the positive public transport time coefficient.

> [!warning] Work in progress
> Every number comes from a run log or a script output. Checks still running are marked as such; their readings were written before they ran.

## 1. In short

**The overtime suspicion was confirmed and fixed. Every travel time coefficient is now negative, public transport included.** The last open sign, cost, was traced to commuters being charged money their employer pays; the model change is built and being checked before a new estimation.

| | 9 November | 11 November |
|---|---|---|
| Cause of the positive public transport time | free overtime at work, under review | **confirmed** by two fixed-$\theta$ tests |
| Fix | two options, (a) or (b) | **(a) chosen:** the work duration is exact |
| Public transport time | positive | **-0.0366** (SE 0.0050) |
| Cost | slightly positive | still **+0.0003** (SE 0.0002), t 1.9 |

## 2. The overtime test (L1 and L2)

**The question:** does the joint rise of every rate and time coefficient come from workers staying at work after the diary's work block?

Both tests ran at a fixed $\theta$ on the full sample. $c$ shifts every rate and time coefficient together, by the same amount.

| | $c=0$ | $c=-0.02$ | $c=-0.04$ |
|---|---:|---:|---:|
| L1, non-workers' log-likelihood | -28,794.06 | -28,794.06 | -28,794.06 |
| L1, workers' log-likelihood | -10,279.8 | -10,720.5 | -12,812.6 |
| L1, simulated overtime | 51% | 66% | 85% |
| L2, workers, with staying at work removed | -7,123.4 | | -7,099.8 |

**Reading:**
- non-workers are exactly unaffected by the shift, as expected;
- workers lose 2,533 log-likelihood points when the shift is reversed, because lower values bring the overtime back;
- **with staying at work removed (L2), that loss disappears:** the response becomes +24.

So the level pull came from the extra stay at work, at utility 0, which no diary can show. The public transport specification was not the cause; it was simply the coefficient closest to zero when everything rose together.

**The same structure appears in Västberg et al. (2020).** They also use a minimum-duration jump at work with work utility 0. McCarthy, Karlström and Västberg (2025) instead give work its own rate and let the duration be chosen.

## 3. The fix: an exact work duration

**Decision (option a):** the work block in the diary is a hard constraint. A worker who arrives at work leaves after exactly the observed duration, and the model chooses everything around it.

- The other option, a chosen work duration, needs data the survey does not have: no working hours and no flexibility field. **It is noted as a limitation and future work.**
- Implemented as one flag, with tests and a gradient check. The full test suite passes (1,237 tests).
- At a fixed $\theta$, simulated overtime falls to **0%**.

## 4. The new estimate (10 November)

Converged on 10 November, 09:23 ([full estimation report](/ddcm/estimate_20261110.html)). Log-likelihood -34,897.31; 6,245 persons; 361,350 observed steps. Standard errors from BHHH.

| Per minute | Estimate | SE |
|---|---:|---:|
| Public transport time | **-0.0366** | 0.0050 |
| Car time | -0.0795 | 0.0047 |
| Walk time | -0.0707 | 0.0045 |
| Bicycle time | -0.0609 | 0.0046 |
| Cost (per yen) | **+0.0003** | 0.0002 |

**Checks at this estimate:**
- **The trip-level mode choice model agrees:** public transport time there is -0.035, against -0.0366 here.
- **The net cost of travelling is positive** for every mode at every hour, except public transport at 11:00 (-0.003, within the SE).

**The simulation against the diary:**

| | Diary | Before the fix | Now |
|---|---:|---:|---:|
| Overtime on worker-days | none | 51% | **0%** |
| Car passenger after public transport | 1.5% | 22.8% | **0.4%** |
| Public transport days with only one public transport trip | 4.7% | 44.6% | **9.0%** |
| Workers home by public transport, 16-19h (per 1,000) | 150.2 | | 139.8 |

**Still off:**
- non-workers use public transport about 2.3 times as often as in the diary;
- workers come home as car passengers too often (86 against 15 per 1,000, 16-19h).

These are reported, not tuned away with constants.

## 5. The open sign: cost

### How cost became the open sign

| Estimate | Car time | Public transport time | Cost |
|---|---:|---:|---:|
| up to 3 November (car time **fixed** at the household mode-choice value) | -0.0133 (fixed) | **+0.026 to +0.028** | **-0.0006 to -0.0013** |
| 6 November (car time **free**, public transport from the timetable; stopped run) | -0.041 | +0.007 | +0.0001 |
| 10 November (+ exact work duration, no public transport ↔ car passenger switch) | -0.0795 | **-0.0366** | **+0.0003** |

- **Cost was negative only while car time was fixed.** Fuel moves almost exactly with car time, so with car time held still, cost carried "long car trips are disliked".
- **Once car time was freed, the two pulled against each other.** Car time went from -0.013 to -0.080 and took over the distance effect; what was left for cost (route speed, and the commute money that employers pay) pushed it slightly positive.
- So fixing public transport time did not break cost; cost's earlier negative sign rested on a fixed car time.

### Why cost is hard to identify here

- A car or car-passenger trip pays fuel at 15 yen per km, and car time also grows with distance: $R^2=0.96$ over diary trips. Once time is known, what is left in fuel is "how far you went in that time", which is route speed, not money.
- **91% of the cost coefficient's information is shared with other parameters** (variance inflation factor 11.5).
- Parking would separate cost from time, but it is only 3% of car cost.

### What did not explain it

| Check | Result |
|---|---|
| Removing one cost component at a time, at the estimate, read with the exact Hessian | no single component isolates cost: fares and driver fuel each push it positive, parking pushes it the right way, and every change drags the time coefficients along |
| Is the car skim wrong in a way that grows with distance? | yes, but the other way: longer car trips take **more** real time than the skim says, which would make cost more negative |
| Congested car times by time of day (MATSim) | no better than the static skim against the diary |
| Faster-than-linear disutility of long walks and bicycle trips | rejected (the extra term has the wrong sign) |
| Distance-band mode constants | halve the in-city positive, do not flip it |
| A passenger needs another driver in the household | would forbid 21.5% of observed passenger trips |

### What did explain it: commuters do not pay for their commute

- **In 2014, 91.7% of firms paid a commuting allowance** (通勤手当; MHLW 平成27年就労条件総合調査, table 18), for train, bus and car commuters alike.
- In the trip-level mode choice model, setting fuel, parking and fare to 0 on home ↔ work/school trips:

| | cost per yen (t) | log-likelihood |
|---|---|---|
| as estimated | -0.00039 (-3.9); in-city **+0.00225** | -11,517.3 |
| commute trips free | **-0.00175 (-14.1)**; in-city **-0.00164** | **-11,413.7** (+104, no extra parameter) |

- **Car passengers should not pay fuel either:** once commutes are free, charging passengers fuel costs 79 log-likelihood points. The driver pays the fuel.
- Car passengers stay in the model: 9% of travellers, 52% of passenger trips are by people who cannot drive, and the licence-return policy needs them.

### The change in the model

- **Commute trips (home → work/school, work/school → home) pay no money, by any mode**, for people with a work or school block that day. Their other trips, and all non-workers' trips, pay as before.
- **Car passengers pay no fuel.**
- How it is built: the model picks where and how to travel first and what to do on arrival. Västberg et al. (2020) choose destination, mode and purpose together; the two forms are the same model only while travel cost does not depend on the purpose. So a trip leaving home (before work) or leaving work now comes in two versions, "my commute" (free, ends only at work or home) and "another trip" (paid, cannot end there). This is the same model as choosing the purpose with the trip, at **+21% edges** in the largest graph (measured), against about 20 times more for choosing everything jointly.

## 6. Learning

### Optimal transport (in progress)

**Status: in progress, not finished.** The material was restructured this week into one linear path of **27 lessons in five parts:**
1. mathematical basics;
2. convex analysis;
3. the core of OT;
4. OT as a whole (maps, geometry, statistics, branches);
5. connections.

Each lesson names the exact sections to read, explains the ideas with derivations, works an example with computed numbers, and ends with a gate.

The working assumption from last time is unchanged and **still untested:** OT relates to logit, DDCM, recursive logit and perturbed utility through entropy and duality. Testing it is the last part of the path.

### Game theory (new, for its own sake)

A reading guide for Tadelis, *Game Theory: An Introduction* (2013), was set up: 18 lessons, one per chapter, in the same format. **It is not tied to my research;** an optional last lesson only maps where it meets discrete choice and traffic equilibrium.

## 7. Status

### Done, in the order it happened

1. **Main cause of the positive public transport time found (9 November).**
   - Two tests at a fixed $\theta$ on the full sample (section 2): shifting every per-minute rate and travel-time coefficient together leaves non-workers' log-likelihood exactly unchanged, but costs workers 2,533 points.
   - The reason: workers could stay at work after their diary work block at utility 0, which no diary shows. The simulation put overtime on 51-82% of worker-days.
   - To suppress it, the likelihood raised every coefficient together, and public transport time, the one closest to zero, crossed into positive. With staying at work removed, the workers' response goes from -2,533 to +24.
2. **The fix (9 to 10 November).**
   - The work block is taken exactly from the diary: a worker leaves work after exactly the observed duration.
   - The public transport ↔ car passenger switch inside a tour was also removed (car passenger right after public transport: 22.8% to 0.4%, diary 1.5%).
   - The 10 November estimate converged: log-likelihood -34,897.31, 6,245 persons, 361,350 decisions. Every travel time coefficient is negative: public transport -0.0366 (SE 0.0050), car -0.0795, walk -0.0707, bicycle -0.0609. Simulated overtime is 0%. The trip-level mode choice model agrees on public transport time (-0.035).
3. **The timetable data checked and cleared as a cause.**
   - Public transport times have come from the GTFS-based transit schedule since the 19 October estimate: a door-to-door skim by origin and destination, with fares from Jorudan; before that, a station-to-station scrape that turned out to be broken.
   - Since the 6 November estimate they come from the full 2021-2025 timetable: time by the hour of departure, and no public transport choice on a step with no departure.
   - Checked: it is **not the cause** of either sign. The trip model with time by departure stays negative; the train skim's error is unrelated to the fare (so it cannot push cost positive); the 2900 terminal code and the 216 public transport trips with no timetable time are not causes either.
   - What remains is noise, not a sign problem: against the diary, the skim's public transport time has slope 0.37 and correlation 0.17, which weakens the coefficient. The timetable is also 7-13 years younger than the survey.
4. **Exact Hessian at the 10 November estimate:** all 76 eigenvalues positive, a true optimum.
5. **Why cost turned positive (section 5).**
   - Up to 3 November cost was negative (-0.0006 to -0.0013), but car time was fixed at -0.0133.
   - Fuel moves almost exactly with car time ($R^2=0.96$), so with car time fixed, cost carried "long car trips are disliked".
   - Once car time was freed it took that effect over (-0.080), and cost went slightly positive (+0.0003, t 1.9). Fixing public transport did not break cost; cost's earlier sign rested on a fixed car time.
6. **Cause of the positive cost found (section 5).**
   - Ruled out: removing one cost component at a time (each change also moves the time coefficients), skim errors (they run the other way), congested car times from MATSim (no better than the static skim), non-linear walking and cycling time, distance bands, and a rule that a passenger needs another driver in the household.
   - **The cause:** commute trips are charged fuel, fares and parking that employers pay (通勤手当, 91.7% of firms in 2014, MHLW). In the trip-level model, free commutes move cost from -0.00039 to -0.00175 (t -14), turn the in-city sign negative, and improve the log-likelihood by 104 with no extra parameter.
   - After that, charging passengers fuel costs 79 log-likelihood points, so passengers should not pay fuel either.
   - Car passengers stay in the model: 9% of travellers, 52% of passenger trips are by people who cannot drive, and the licence-return policy needs them.
7. **The model change built.**
   - Commute trips (home ↔ work/school) pay no money by any mode; passengers pay no fuel.
   - The model chooses the trip first and the activity on arrival, so a trip leaving home (before work) or leaving work is split into "my commute" and "another trip". That is the same model as Västberg's single choice of destination, mode and purpose, at +21% edges in the largest graph.
   - 8 new tests on a small network pass, and the full test suite passes (1,245 tests).
8. **A report page for the existing 10 November estimate** ([open](/ddcm/estimate_20261110.html)). No new estimation: the same results, written up with the specification in plain words, parameters with both standard errors (BHHH and the exact Hessian computed afterwards), time-of-day profiles, convergence and the fit to the diary.

### Doing
- Fixing the bug found by the full-sample check (see Error).
- Learning optimal transport: the 27-lesson path in five parts (mathematical basics, convex analysis, the core of OT, OT as a whole, connections), as preparation for the next paper after Paper A (TR Part B). The working assumption is unchanged and untested: OT relates to logit, the DDCM, recursive logit and perturbed utility through entropy and duality.
- Tadelis game theory reading guide (18 lessons), for its own sake.

### Error

**What the check is.** The model's actions are built in two steps: first where and how to travel, then, on arrival, what to do. That is the same model as Västberg et al.'s single choice of destination, mode and purpose, as long as travel cost does not depend on the purpose. Free commutes break that condition, so each trip leaving home (before work) or leaving work is now split into two versions: "my commute" and "another trip" (section 5). To test the split alone, there is a **check version** of the new graph: it has the two versions but still charges cost on both. That check version is, by construction, the old model in a different graph, so it must reproduce the old log-likelihood and gradient exactly. Only after that does "commute free" mean what it says.

**What it found.** On the full sample at the 10 November estimate, the check version gives -34,773.85 against the old -34,897.31, with 3 persons and 20 observed decisions fewer. A difference of 123 points is larger than the improvement the change is meant to bring (+104 in the trip model), so it cannot be ignored: it would be mixed into any new estimate.

**Narrowed so far.** A 274-person run shows the same kind of difference (0.06 points) with identical observed decisions; the activity states and the trip-to-work connections are identical between the old and the new graph. So the difference is in the utility of some edges, not in which paths exist. Being fixed; **the new estimation starts only after the check passes exactly.**

### To do
1. Find and fix the bug: compare edge utilities between the old and new graphs on the 274-person run; then rerun the full-sample check.
2. Evaluate the new model at the 10 November estimate: which way cost moves, whether every diary decision is still matched, and the size of the graph.
3. **New estimation** (commute trips free, passengers pay no fuel), warm start from the 10 November estimate.
4. Simulation at the new estimate: the sign of cost and the value of time (Västberg's definition, against MLIT's about 40-44 yen per minute); the open misfits (workers commute as car passengers 4 times as often as the diary; public transport time may become less negative; non-workers use public transport 2.3 times the diary).
5. Robust standard errors; the 11-step gap in the canonical graph; documentation (module READMEs, the formulation with the factorization statement); commit.
6. Learning: the first lessons of the OT path (basics), and the first chapters of Tadelis.
