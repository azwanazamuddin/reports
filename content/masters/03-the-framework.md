---
title: "Phase 3 — The framework"
type: hub
status: complete
created: 2026-10-12
tags: [masters, phase, framework]
---


**April 2026.** One note, and the hinge of the whole programme: the point at which the
approximation question became a graph question.

The 19 April progress note describes the shift in its own words, as stopping treating activity-based
DDCM as a giant tensor and starting to treat it as a graph problem. Two things followed from that
change of representation. The GPU could process one time level per kernel, and states nobody can
reach could simply be discarded.

## What changed since the autumn

- **State representation:** a tensor indexed by time, zone, activity, duration, mode, vehicle and
  history became a **DAG** of time-ordered levels of reachable states.
- **State-space control:** the full Cartesian product plus masks became **forward reachability
  pruning**, a breadth-first search under the Hägerstrand space-time prism. The note is explicit
  that this is exact.
- **Utility:** hard time windows became **μ(t)**, a time-varying marginal-utility profile, so that
  activity timing *emerges* from preferences instead of being an input.
- **Populations:** a shared graph per activity-sequence group, with masks applied per individual.
- **Gradient:** finite differences became an **analytical gradient** by a second backward-induction
  pass.

**Kept:** the NFXP estimation structure, the Bellman recursion, and the log-sum
consumer-surplus reading. **Dropped:** the relational-MDP track, finite-difference gradients, and
hard time windows as primitives.

Alongside the three contributions (the DAG, reachability pruning and μ(t)), the note carries
toy-case behavioural validation (activity emergence, and transport stress for workers and
non-workers) and a first city-scale run on Higashihiroshima.

> [!note] On this note's headline numbers
> The state, memory and run-time figures in the note's opening are that week's measurements. They
> are not the thesis's numbers.

## Notes in this phase

- [[2026-04-19-thesis-progress-april|19 Apr — Master's thesis progress (M2, April)]]: the framework in three contributions.

---

**← Previous** [[02-exact-tensor-computation|Phase 2]] · **Next →** [[04-making-estimation-work|Phase 4 — Making estimation work]]
