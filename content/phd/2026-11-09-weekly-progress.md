---
title: "Weekly progress: 5 to 9 November (half week)"
type: report
status: draft
created: 2026-11-09
updated: 2026-11-09
tags: [phd, weekly, estimation, public-transport, optimal-transport]
---

**Half-week post.** The full weekly progress follows on Wednesday, as last week.

> [!warning] Work in progress
> The review of the estimation is still going on. Every number comes from a run log or a script output. Readings marked as such are not yet tested.

## 1. The estimation, in short

The public transport time coefficient kept coming out positive, which says riders like longer public transport trips. The suspicion started with the public transport data, but the data turned out to be used properly.
The review then found two misfits specific to public transport, and these explain part of it. This week's audit points to a more general cause: how work duration is specified. It lifts the time coefficients of **all** modes, not only public transport.

| Step | What we thought | What we found |
|---|---|---|
| 1 | The timetable (GTFS) or the wait is wrong | Both are fine, and the sign stays positive with the real timetable |
| 2 | Public transport is used in the wrong way | True, and it explains part of it: public transport out, car passenger home. It also showed why cost and time pull against each other |
| 3 | Something lifts every mode's time | Free overtime at work. Still being tested |

## 2. Starting point

The latest estimate, reported last Thursday, had a **public transport time coefficient of +0.028**, with car time fixed at -0.0133. A positive value means a longer public transport trip
makes the trip more attractive, which no reviewer will accept.

## 3. First suspicion: the public transport data

**Is the timetable used properly?** Yes.
- The timetable is the transit schedule of our MATSim scenario, which was built from the GTFS feeds. The new design reads real departures from it directly.
- **Train wait levels match the diary** (582 train trips matched to the timetable):

| Train wait | Median | Mean |
|---|---:|---:|
| Recorded in the diary | 7 min | 8.9 min |
| Next departure in the timetable | 6.0 min | 7.2 min |
| Half the headway | 7.5 min | 8.1 min |

- **Ride times match too.** Diary medians to Hiroshima Station are 30, 36 and 40.5 minutes from three stations, against timetable medians of 30, 37 and 42.
- **Known limits:**
  - bus trips cannot be matched stop by stop, because the survey's bus stop codes have no table;
  - two Kure-line stations are missing from the schedule;
  - the survey is from 2012/2014 and the timetable from 2021-2025.

**Is the wait assumption the cause?** No, and it is already settled.
- In a trip-level mode choice model, public transport time is negative under every wait treatment we tried (-0.012 to -0.040 per minute). This includes capped, uncapped and separate wait terms.
- **Decision:** the wait sits inside public transport time, with one time coefficient and no separate wait parameter.
- **It is implemented:** $T(t)=EA(t)-t$, the time from the step $t$ to the earliest arrival in the timetable, so the wait is whatever the timetable gives at that clock.
- The old fixed waits (5 and 10 minutes) are gone, and public transport is offered only at steps with a departure.

**Result.** With the timetable in place, the full run of 6 November gave public transport time **+0.0072**, and cost turned slightly positive, **+0.00012**. Car time was now free and came out at -0.0412.
The run was stopped the same afternoon, because the signs stayed positive and the parameters had stopped moving. So the data were not the cause.

## 4. Second suspicion: how public transport is used

**Public transport out, car passenger home.**
- The model sends people out by public transport and brings them home as car passengers on 20-29% of public transport days. The diary does this on 1.5%.
- A ride home needs no timetable, so it is a cheap way out of a public transport tour.
- **Decision:** forbid this switch inside a tour, and leave out the few diary persons who make it.

**Why cost and time pull against each other.**
- A car passenger pays fuel, copied from the car, and fuel grows with car distance. So in the data, **cost moves almost exactly with car time** (correlation 0.97). One yen is worth about one tenth of a car minute.
- The model therefore has two nearly equal handles for "how bad is travelling": the time coefficients and the cost coefficient. Pushing on one releases the other:

| Change, at the stopped run's best point | Public transport time | Cost |
|---|---:|---:|
| Forbid the switch | about 0 | about +0.0005 |
| Also make passengers pay no fuel | about +0.018 | about -0.0013 |

- Fixing one sign breaks the other. These are rough shifts from one Newton step, not estimates. They show that the two coefficients sit on one ridge, and only a full estimation can settle where.

Run A, with the switch forbidden, is coded and checked, but not launched.

## 5. Third suspicion: free overtime at work (under review)

**What the audit found today.**
- In the model, a worker arrives at work and jumps ahead by the work duration. The duration is read from the same diary day.
- After that, the model still lets the worker **stay at work, at utility 0**. The diary can never show this extra stay, because its duration is the observed one.
- The model uses this option a lot. Simulated overtime appears on **82%** of worker-days at the start point, and on **51%** at the stopped run's best point.

**Why this lifts every mode, not only public transport.**
- The model can make leaving work on time more likely by raising the value of every other minute: every activity rate, and every travel minute with it.
- For non-workers, such a joint rise changes nothing, because everyone has the same day length. For workers it changes the balance against work at 0.
- That is what the run did. The log-likelihood rose by 2,178, while all of these rose together:

| Per minute, start point to stopped run's best point | Change |
|---|---:|
| Activity rates (average) | +0.040 |
| Car (time + cost, with cost at about 10 yen per minute) | +0.033 |
| Public transport | +0.039 |
| Walk | +0.041 |
| Bike | +0.040 |

- **Public transport and cost crossed zero only because they started closest to it.** Walk went from -0.067 to -0.027 and bike from -0.059 to -0.021, both pulled the same way.

**The same structure is in Västberg et al. (2020).** McCarthy, Karlström and Västberg (2025) instead give work its own utility rate and let the model choose the duration.

**Next, before any run:**
1. **L1:** follow the log-likelihood of workers and non-workers along this joint shift, at a fixed $\theta$. It is being set up now.
2. **L2:** the same, with staying at work removed.
3. **If both confirm, choose:**
   - (a) exact work duration: only departures after the work duration;
   - (b) a free work rate, with the duration chosen.

Run A waits until then.

## 6. Learning: optimal transport

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

## 7. Next steps

1. Run L1 and L2, with the expected reading of each written before it runs.
2. Choose (a) or (b), then code it with tests and a gradient check, and estimate after approval.
3. While that runs:
   - why the canonical graph encodes 11 more observed steps;
   - parking-off and fare-off checks at the new estimate;
   - the same-zone walk time sensitivity run.
4. Learning: phases 1 to 3 of the reading curriculum (the OT problem, the conjugate, duality).
