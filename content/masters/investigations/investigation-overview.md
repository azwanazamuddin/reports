---
title: "Root-cause investigation overview (April–May 2026)"
type: investigation
status: complete
created: 2026-10-12
tags: [masters, investigation, estimation, bug]
---


**Report:** [DDCM Estimation Bug — Root Cause Investigation](https://azwanazamuddin.github.io/reports/masters/ddcm/investigation_overview.html), prepared as a meeting brief covering 20 April – 13 May 2026.

The question was why δ, the on-schedule utility parameter, stayed near zero, so that agents
preferred home to work.

## What it found

- **The cause was a zone-matching bug in the graph builder.** The graph was built using one
  person's home zone, so WORK states existed only there. For 701 of 702 workers the observed WORK
  steps were silently dropped from the observed-path utility, which left that term completely
  insensitive to δ.
- **The fix is a zone-agnostic graph.** On the test group the step-match rate reached 98.6%, with
  WORK states at all 144 zones. Re-estimation (v9) was running when the report was written, at
  iteration 4.
- **A separate, earlier bug is documented alongside.** `c_change` drifting to −∞ came from the
  forbidden-home-zone mask never being passed to backward induction in any pipeline call, so HOME
  was legal everywhere and agents looped between zones at no cost (about 25 simulated trips a day
  against about 3 observed). Fixing that settled `c_change` near −0.30.
- **Non-workers were excluded** as a methodology choice (a workers-only design), which the report
  calls a minor factor next to the zone bug.

## Read it with

- [[work-timing-analysis|The work-timing report]], which describes the symptom.
- [[profile-likelihood-scans|The profile scans]], one of which was the clue and one the confirmation.
- [[2026-05-11-k10-results-and-work-start-timing|The 11 May meeting note]], where the gap was posed as an open question.
- Hub: [[04-making-estimation-work|Phase 4]]
