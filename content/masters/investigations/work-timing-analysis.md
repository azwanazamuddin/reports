---
title: "Work-timing analysis: why agents started work at 14:51"
type: investigation
status: complete
created: 2026-10-12
tags: [masters, investigation, estimation, bug]
---


**Report:** [DDCM Work Timing: Why Agents Delay Work](https://azwanazamuddin.github.io/reports/masters/ddcm/work_timing_analysis.html), 10 May 2026.

The K=10 estimates made agents start work at about **14:51** in simulation, against an observed
**08:30**. The report works out the mechanism: the home-utility parameter μ_home (0.0617 per
minute) exceeded the on-schedule parameter δ (0.0408 per minute), so agents earned more per minute
at home than at work.

## The report's own conclusion

It carries a banner reading *Based on v4/v5 estimates with zone bug*, and concludes that the
simulation is correct but the parameters are artifacts. δ was suppressed by the zone-matching bug
described in [[investigation-overview|the investigation overview]], so the 14:51 start is "a symptom
of that bug, not a finding about behaviour". The timing results were expected to change once the
fixed estimation converged.

That makes this a useful report to read for the mechanism and a poor one to cite for the number.

## Read it with

- [[2026-05-11-k10-results-and-work-start-timing|The 11 May meeting note]], which presented the gap before the cause was known.
- Hub: [[04-making-estimation-work|Phase 4]]
