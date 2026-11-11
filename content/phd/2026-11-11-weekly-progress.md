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

**The overtime suspicion was confirmed and fixed. Every travel time coefficient is now negative, public transport included.** The last open sign, cost, was traced to commuters being charged money their employer pays. The model change was built, checked exactly against the old model on the full sample, and estimated. **In the new estimate (11 November) cost is negative and clearly identified: -0.00222 per yen, t -19.2** ([estimation report](/ddcm/estimate_20261111.html)).

| | 9 November | 10 November | 11 November |
|---|---|---|---|
| Cause of the positive public transport time | free overtime at work, under review | **confirmed** by two fixed-$\theta$ tests | |
| Fix | two options, (a) or (b) | **(a) chosen:** the work duration is exact | + commutes free of money cost, passengers free of fuel |
| Public transport time | positive | **-0.0366** (SE 0.0050) | **-0.0229** (SE 0.0048) |
| Cost | slightly positive | still **+0.0003** (SE 0.0002), t 1.9 | **-0.00222** (SE 0.00012), **t -19.2** |

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
| up to 3 November (car time **fixed** at -0.0133, a value carried over from earlier runs) | -0.0133 (fixed) | **+0.026 to +0.028** | **-0.0006 to -0.0013** |
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

## 6. The new estimate (11 November): commutes free

Converged on 11 November, 17:30; standard errors saved 20:09 ([full estimation report](/ddcm/estimate_20261111.html), every parameter against 10 November). Log-likelihood -34,414.82; 6,243 persons; 361,167 decisions. Standard errors from BHHH.

| | 10 November | 11 November | SE | t |
|---|---:|---:|---:|---:|
| Cost (per yen) | +0.00032 | **-0.00222** | 0.00012 | **-19.2** |
| Car time (per min) | -0.0795 | -0.0534 | 0.0045 | -12.0 |
| Public transport time | -0.0366 | -0.0229 | 0.0048 | -4.8 |
| Walk time | -0.0707 | -0.0684 | 0.0046 | -14.9 |
| Bicycle time | -0.0609 | -0.0563 | 0.0047 | -12.0 |
| Car passenger constant | -4.60 | -4.86 | 0.06 | |

- **The reading written before the run is met:** cost negative and more than 2 SE from zero. The commuting-allowance explanation holds in the DDCM itself, not only in the trip-level model (-0.00175 there).
- **Every travel time coefficient stays negative.** Car and public transport time are smaller in size than on 10 November: part of what they carried was money, and cost now takes its own share.
- The car passenger constant falls, as passengers no longer pay fuel and the constant carries their disadvantage alone.
- The largest moves elsewhere are the before-work shopping and leisure shifts and the constants for train and bus trips outside the city: the trips whose cost changed. The time-of-day profiles barely move.

**Value of time** (time coefficient over cost, yen per minute, delta-method SE):

| Car | Public transport | Walk | Bicycle |
|---:|---:|---:|---:|
| **24.1** (2.5) | **10.3** (2.3) | 30.8 (2.6) | 25.4 (2.5) |

- Commutes carry no cost in this model, so these are values for non-commute trips (shopping, leisure, errands).
- Benchmarks, checked: the MLIT rail evaluation manual (2012, as applied by Osaka City) uses **per person** 15.2 yen per minute for private trips, 12.2 school, 37.5 commute, 41.6 business; the MLIT road manual (2018) uses 45.15 yen per minute **per vehicle**, all purposes. Car and public transport lie in the range of the private-trip values. Public transport is about two thirds of the rail private-trip value, and less than half of car time; its time is door to door, including the walk to the station and the wait.
- An earlier draft of the check compared against "MLIT, about 40-44 yen per minute"; that figure is per vehicle and was quoted from memory. It is corrected here and in the summary script.

**Convergence:** 11 evaluations from the 10 November estimate. The exact Hessian at the start (4.8 hours) has all 76 eigenvalues positive and predicted a gain of 103 points; the run gained 175. Stopped on the gradient test (1.3e-6 against 1e-5); the BHHH information at the estimate is positive definite.

**The log-likelihoods of 10 and 11 November are not directly comparable:** paired trip scoring counts 183 fewer decisions.

**The simulation against the diary** (6,312 persons, 3 draws each; rerun after a labelling fix, see Error):

| | Diary | 10 November | 11 November |
|---|---:|---:|---:|
| Car passenger right after public transport | 1.5% | 0.4% | **0.2%** |
| Public transport days with only one public transport trip | 4.7% | 9.0% | 12.0% |
| Workers' public transport trips to work (per 1,000 worker-days) | 265 | | **249** |
| Workers home by public transport, 16-19h (per 1,000) | 150.2 | 139.8 | **145.8** |
| Workers' car (driver) trips (per 1,000) | 1,258 | 1,011 | 1,053 |
| Workers' car passenger trips (per 1,000) | 80 | 324 | **291** |
| Workers home as car passenger, 16-19h (per 1,000) | 14.5 | 86.2 | **72.4** |
| Non-workers' car passenger trips (per 1,000) | 183 | 153 | 184 |
| Non-workers' public transport trips (per 1,000) | 30.3 | | 53.0 |

- **Workers' public transport commute fits the diary closely**, out and home, and 94% of their public transport days have two trips (diary 95%).
- **Still off: workers go as car passengers 3.6 times as often as the diary** (291 against 80), a little better than 10 November. With commutes free of cost and passengers free of fuel, only the passenger constant separates riding from driving on a commute. A separate worker passenger constant is the next question.
- Non-workers use public transport about 1.75 times as often as the diary, car owners most of all (45 against 18 per 1,000); their car passenger trips match in total but too many fall after 19:00 (27 against 6).
- Reported, not tuned away.

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
   - Since the 6 November estimate they come from the full 2021-2025 timetable, through a **service constraint** (decided on 5 November):
     - public transport exists at a 15-minute step only if a journey actually leaves in that step; between departures there is no public transport option at all. This is a restriction on which choices exist, not a penalty;
     - the time of an open step is the timetable's earliest arrival minus the departure time, door to door, so waiting and transfers sit inside one time with one public transport coefficient: no separate wait parameter, no caps;
     - an observed trip that the diary puts on a closed step moves to the nearest open step (only forward when leaving work), and the difference counts as time at the previous activity; a person whose trip would have to move 45 minutes or more leaves the sample (about 20 persons, 0.3%);
     - a commuter with a fixed work start may take an earlier journey and wait;
     - the walk from the last stop to an external zone is measured per city from building points (7.7 to 38.3 minutes, median 18.6), replacing a single 8.5 minutes set against the diary;
     - checked at a fixed $\theta$ on the full sample before the run: every graph's public transport edges, the fast gradient against the slow one, and the simulation with and without the constraint.
   - Checked: it is **not the cause** of either sign. The trip model with time by departure stays negative; the train skim's error is unrelated to the fare (so it cannot push cost positive); the 2900 terminal code and the 216 public transport trips with no timetable time are not causes either.
   - What remains is noise, not a sign problem: against the diary, the skim's public transport time has slope 0.37 and correlation 0.17, which weakens the coefficient. The timetable is also 7-13 years younger than the survey.
4. **Exact Hessian at the 10 November estimate:** all 76 eigenvalues positive, a true optimum.
5. **Why cost turned positive (section 5).**
   - Up to 3 November cost was negative (-0.0006 to -0.0013), but car time was fixed at -0.0133, a value carried over from earlier warm starts with no source of its own.
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

9. **The exactness check of the new graph, and two fixes it forced (10 to 11 November).** Full story under Error.
   - First fix: a trip's departure and arrival are counted together or not at all when the diary is matched to the graph. The 274-person check then gave the same log-likelihood to 13 decimals.
   - Second fix: the same rule applied again at each $\theta$, when steps the model finds impossible are left out. Recomputed from the stored values, both graphs now count the same 361,167 decisions in every group.
   - **Full-sample check passed (11 November, 06:40):** both graphs give log-likelihood -34,540.956941, the same 6,243 persons and 361,167 decisions, and gradients equal to 8e-16.

10. **The new estimate converged (11 November, section 6).** Commutes free, passengers free of fuel, paired trip scoring. Cost -0.00222 (t -19.2), every time coefficient negative, value of time 24 yen per minute by car and 10 by public transport. A report page with every parameter against 10 November ([open](/ddcm/estimate_20261111.html)).
11. **The memory guard now protects the estimation.** When memory runs short it first stops other large jobs of the same account, and stops the estimation only when nothing else is left. Before, it stopped the estimation (see Error).

12. **The simulation at the new estimate (section 6).** Workers' public transport commute fits the diary; workers' car passenger trips are still 3.6 times the diary.

### Doing
- Deciding the next step for workers' car passenger trips (a separate worker passenger constant or not).
- Learning optimal transport: the 27-lesson path in five parts (mathematical basics, convex analysis, the core of OT, OT as a whole, connections), as preparation for the next paper after Paper A (TR Part B). The working assumption is unchanged and untested: OT relates to logit, the DDCM, recursive logit and perturbed utility through entropy and duality.
- Tadelis game theory reading guide (18 lessons), as preparation for the study camp.

### Error

**What the check is.** The model's actions are built in two steps: first where and how to travel, then, on arrival, what to do. That is the same model as Västberg et al.'s single choice of destination, mode and purpose, as long as travel cost does not depend on the purpose. Free commutes break that condition, so each trip leaving home (before work) or leaving work is now split into two versions: "my commute" and "another trip" (section 5). To test the split alone, there is a **check version** of the new graph: it has the two versions but still charges cost on both. That check version is, by construction, the old model in a different graph, so it must reproduce the old log-likelihood and gradient exactly. Only after that does "commute free" mean what it says.

**First failure (10 November evening).** On the full sample at the 10 November estimate, the check version gave -34,773.85 against the old -34,897.31, with 3 persons and 20 observed decisions fewer. A gap of 123 points is larger than the improvement the change is meant to bring (+104 in the trip model), so it could not be ignored: it would be mixed into any new estimate.

- **The model itself was identical.** Every edge utility (70.6 million edges), every activity-state value (357,760 states, largest difference 2.5e-14), the set of states and the observed paths were all the same in both graphs. (An earlier version of this post guessed at edge utilities; that guess was wrong.)
- **The cause was which diary decisions are counted.** A trip is two steps: leaving (where and how) and arriving (what to do). When only one of the two can be matched to the graph, the old rule still counted the matched half. The old graph puts the purpose on the arrival, the new one on the departure for commutes, so the half that survives differs and the two graphs score different halves. One more case: a failed arrival at work left the following work steps counted, where the exact work duration makes them impossible.
- **Fix: paired trip scoring.** A trip's departure and arrival are counted together or not at all, and a failed arrival at work still skips the work block. With it, the 274-person check gives **identical** log-likelihoods (-1,011.2757746103185 against -1,011.2757746103184), the same gradient, and the same 13,897 decisions; 8 steps of 25,672 (0.03%) are dropped with their trip partner.

**Second failure (11 November, 00:42).** On the full sample: -34,774.54 against -34,697.70, 11 decisions apart.

- **The matching was now identical:** an audit of every diary step found the same 366,988 matched steps in both graphs.
- **The cause:** 11 workers, one step each, leave work in the late afternoon or evening for a home arrival from which the model cannot complete the day. At each $\theta$ the likelihood leaves out steps the model finds impossible. In the old graph the departure could still lead elsewhere, so it was counted and only the arrival was dropped; in the new graph the departure already says "home" and was dropped too. 11 departures at about -7 points each make the 77-point gap.
- **Fix:** the pairing rule now also applies at that point: if either half of a trip is impossible, both are left out. It sits in the two functions every likelihood, gradient and standard-error path calls. Recomputed from the stored values, both graphs now count **361,167 decisions, with no group differing.**

**Third attempt (06:20) stopped by the memory guard, not by an error.** The two full-sample evaluations ran side by side, each holding its whole stored graph set in memory, and together they filled the machine. Run one after the other, **the check passed at 06:40**: log-likelihood -34,540.956941 in both graphs, identical persons and decisions, gradients equal to 8e-16.

**What this means for the method.** It is a rule about which observed decisions enter the likelihood, and it will be stated as such: a trip is one choice, so both of its steps are scored together or not at all. It changes the counted sample by about 0.05% (361,167 decisions against 361,350 on 10 November), so the new log-likelihood is not exactly comparable to the 10 November one.

**The first attempt at the new estimation was stopped by the memory guard (11 November, 11:06), not by an error.** It was 3.5 hours into its first exact Hessian, holding about 420 GiB of 512, when another job started beside it. Nothing was lost but time: the optimizer had not yet moved. It was relaunched at 11:08 with fewer workers in the Hessian at once (6 instead of 8: safer, slower) and reused the stored graphs (a launcher bug had kept every timetable run since 5 November from finding them; fixed). The guard was also changed to protect the estimation first (Done 11).

**The first simulation at the new estimate mislabelled every commute (11 November, 21:10).** Workers showed 176 car trips per 1,000 days against 1,258 in the diary. The simulated choices were right; the file writer decided "trip or not" from the activity column alone, and a commute carries its target (work or home) there, so each commute was written as a work or home row with no mode. Fixed with the same rule as the rest of the code (a trip is any action with a mode) and rerun, with a check that fails on the mislabelled output.

### To do
1. **Workers' car passenger trips** (3.6 times the diary): decide whether workers need their own car passenger constant, and test it at a fixed $\theta$ before any run.
2. Exact-Hessian standard errors at the new estimate, as for 10 November.
3. Robust standard errors; the 11-step gap in the canonical graph; an outdated test fixture (the pool flow-gradient tests stop before reaching the code); documentation (module READMEs, the formulation with the factorization statement); commit.
4. **Finalize the manuscript (Paper A, TR Part B) after the estimation succeeds:** parameter tables, figures and results from the new estimate.
5. Learning: the first lessons of the OT path (basics), and the first chapters of Tadelis for the study camp.
