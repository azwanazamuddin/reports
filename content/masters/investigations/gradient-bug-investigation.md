---
title: "Analytical gradient investigation (June 2026)"
type: investigation
status: complete
created: 2026-10-12
tags: [masters, investigation, estimation, gradient, gpu]
---


**Report:** [Analytical Gradient Investigation — June 2026](https://azwanazamuddin.github.io/reports/masters/ddcm/gradient_bug_investigation_20260601.html).

No estimation run using the analytical gradient had truly converged: the log-likelihood went flat
after a few iterations and the `mu_home` parameter jammed against its bound every time.

## The decisive experiment

Hold the value function, the graph, the person and the parameter fixed, and vary only how many home
zones are processed in one GPU pass:

- **One zone at a time:** gradient +704.61, **0.0%** error against finite differences.
- **Eight zones at a time (the default), Apple GPU:** +436.24, **38.1%** wrong.
- **Eight zones, CPU:** +704.61, exact.

So the mathematics and the Python logic were right, and the defect was in the GPU backend. The
report's best explanation is an int32 integer overflow at real graph scale, the same family as three
earlier failures on that backend. Stated as most likely, not proven.

## Consequence

The production estimator runs on a Linux server with an NVIDIA GPU. The same test there showed
batch 8, batch 1 and finite differences all agreeing, so production was unaffected and launched
without a workaround. The defect is a local-development matter on the Mac.

## Read it with

- [[2026-06-01-gradient-investigation-resolved|The 1 June meeting note]]
- [[2026-04-27-gradient-masks-and-c-change|The 27 April note]], which covers two earlier, different gradient bugs.
- Hub: [[04-making-estimation-work|Phase 4]]
