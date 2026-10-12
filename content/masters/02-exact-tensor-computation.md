---
title: "Phase 2 · Nov 2025–Jan 2026 — Can it be computed exactly instead?"
type: hub
status: complete
created: 2026-10-12
tags: [masters, phase, gpu, graph]
---


**November 2025 – January 2026.** The attempt to make the exact model fast, in place of making an
approximate model good.

## What was built

- **A tensor implementation on the GPU**, in three phases: a forward pass that finds which states are
  reachable, backward induction over them, then simulation. Python objects were replaced with
  tensors so the work could run in parallel.
- **One "universal" graph in place of one per home zone.** Once an agent leaves home, their
  transitions depend on where they are and what they have done, not where they started, so 144
  nearly identical graphs collapse into one. The note frames this as probabilistic bisimulation.
- **A condition-based framework**, which moves from hard constraints to conditions in four tiers:
  global, group, individual and dynamic. Forward reachability is used to find each agent's
  feasible actions.

In hindsight that last item is the earliest written trace of the PhD question: feasibility that
differs by group and by individual.

## Two tracks that did not survive

- **Basis-function approximation for backward induction.** The 24 December note's "~100x" combines
  the universal graph with this approximate tier, which is where its backward-induction step gets
  its roughly 9x. The thesis solves exactly, so that figure is not a thesis result.
- **Relational MDPs**, an attempt to lift the model with first-order structure (Boutilier-style
  symbolic DP) and abstract over zones. The April note lists it under *what was dropped*.

## Notes in this phase

- [[2025-11-26-tensor-gpu-implementation|26 Nov — Tensor and GPU implementation]]: the three-phase algorithm.
- [[2025-12-15-documentation-and-reframework|15 Dec — Documentation and re-framework]]: the condition-based framework and a complexity analysis.
- [[2025-12-24-universal-graph-and-bi-optimization|24 Dec — Universal graph and BI optimization]]: one graph for all home zones, plus the approximate backward-induction tier.
- [[2026-01-07-rmdp-theory-and-implementation|7 Jan — RMDP theory and implementation]]: the relational track.
- [[2026-01-27-validation-plan|27 Jan — Validation plan]]: a layered framework for checking the algorithm, from theoretical correctness through to policy testing.

## Carried into the PhD

The shared graph is the "shared structure" ingredient in [[2026-10-13-paper-a-deck|Paper A]]'s argument, and the condition tiers above are an early version of its question about feasibility that differs by group and by individual.

The GPU implementation built in this phase was later replaced as the platform: the CUDA code paths
were deleted in October 2026 and the engine now runs on CPU, which made the gradient bitwise
reproducible. See [[2026-10-13-gradient-speedup|how the gradient is managed, and how it compares with these CUDA runs]].

---

**← Previous** [[01-approximation-first|Phase 1]] · **Next →** [[03-the-framework|Phase 3 — The framework]]
