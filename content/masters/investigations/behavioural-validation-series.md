---
title: "Behavioural validation series (June–July 2026)"
type: investigation
status: complete
created: 2026-10-12
tags: [masters, investigation, estimation, validation]
---


Nine runs of the same report, in the style of Västberg §4.4: simulate R paths per person at the
estimated parameters and compare mode and activity shares with the observed diaries. Each is named
by date.

- [24 Jun](https://azwanazamuddin.github.io/reports/masters/ddcm/behavioral_validation_20260624.html): 2 workers, R=5, 10 paths, 8 free parameters. A smoke test; goodness-of-fit not computed.
- [25 Jun](https://azwanazamuddin.github.io/reports/masters/ddcm/behavioral_validation_20260625.html): 3,015 workers, R=3, 9,045 paths, 8 parameters, ρ² 0.786.
- [29 Jun](https://azwanazamuddin.github.io/reports/masters/ddcm/behavioral_validation_20260629.html): 3,015 workers, R=200, 603,000 paths, 16 parameters, ρ² 0.897.
- [1 Jul](https://azwanazamuddin.github.io/reports/masters/ddcm/behavioral_validation_20260701.html): 3,120 workers, R=200, 624,000 paths, 22 parameters, ρ² 0.926.
- [6 Jul](https://azwanazamuddin.github.io/reports/masters/ddcm/behavioral_validation_20260706.html): 2,393 workers, R=200, 1,138,000 paths, 24 parameters, ρ² 0.930.
- [9 Jul](https://azwanazamuddin.github.io/reports/masters/ddcm/behavioral_validation_20260709.html): 3,120 workers, R=200, 1,478,000 paths, 25 parameters, ρ² 0.930.
- [14 Jul, baseline](https://azwanazamuddin.github.io/reports/masters/ddcm/behavioral_validation_20260714_baseline.html): 357 workers, R=30, 33,990 paths, 20 parameters, ρ² 0.920.
- [15 Jul](https://azwanazamuddin.github.io/reports/masters/ddcm/behavioral_validation_20260715.html): 357 workers, R=50, 56,650 paths, 21 parameters, ρ² 0.907.
- [19 Jul](https://azwanazamuddin.github.io/reports/masters/ddcm/behavioral_validation_20260719.html): 3,120 workers, R=200, 1,478,000 paths, 23 parameters, ρ² 0.913.

## Reading the numbers

- **Not a progress curve.** The number of free parameters changes from 8 to 25 as the specification
  evolved, and the sample changes between runs, so these ρ² values are not a series of
  improvements.
- **Not a conventional ρ².** The null sets the estimated parameters to zero while keeping the fixed
  household-MNL mode constants. It is not the uniform-path null, so the values are not comparable
  with ρ² from an ordinary choice model.
- **Path counts.** In the 9 and 19 July runs the path count is all 7,390 persons, workers and
  non-workers, times 200; the workers column counts workers only.

## Read it with

- [[2026-06-23-recovery-and-approximation-error|The 23 June meeting note]], which records the full-sample run being launched.
- Hub: [[04-making-estimation-work|Phase 4]]
