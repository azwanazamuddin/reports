---
title: "Phase 1 · Oct–Nov 2025 — Can the model be approximated?"
type: hub
status: complete
created: 2026-10-12
tags: [masters, phase, approximation]
---


**October – November 2025.** The starting bet: a city-scale activity-scheduling model has too many
states to solve by enumeration, so learn an approximation of its value function instead.

## Where it started

The work began with ride-hailing driver decisions, and it was the attempt to model those with an
activity-based model and reinforcement learning that exposed the underlying problem, the curse of
dimensionality in dynamic discrete choice. The research then pivoted to that problem itself.

## What was tried

- **Monte Carlo tree search**, the AlphaGo approach. It failed, because it keeps no memory between
  simulations and so rebuilds its tree from scratch for every simulated day.
- **TD(λ) with value-function approximation**, proposed as the replacement. Rather than store a
  value per state, learn a function of state features. The readings concluded that, because the
  model is a model-based MDP with explicit utilities, the right tool was state-value TD(λ), not
  Q-learning.
- **TD estimation of the structural parameters**, a survey of semi-gradient and approximate
  value-iteration methods that avoid estimating transition densities, using CCP inversion.
- **A perturbed-utility derivation.** With a Shannon-entropy perturbation, the perturbed-utility
  model reproduces recursive logit. This is a result, not a failure: the original filename marked
  it *NOT USED*, and the note does not say why it was set aside.

## Notes in this phase

- [[2025-10-08-pumcm-perturbed-utility|8 Oct — PUMCM for activity-based models]]: the entropy-to-logit equivalence.
- [[2025-10-15-td-estimation-ideas|15 Oct — TD estimation ideas]]: TD methods for estimating DDC parameters.
- [[2025-11-04-readings-and-implementation-plans|4 Nov — Readings and implementation plans]]: approximate DP and RL readings, the TD(λ) decision, and why MCTS was wrong.
- [[2025-11-09-smaso-x-presentation|9 Nov — SMASO-X presentation]]: the talk that framed the bet, including the failed MCTS attempt.

## What this phase left open

It never measured what approximating the value function does to an estimate. Phase 4 does, though
not for TD(λ) itself. Its "RL" estimator is a rollout-based importance-sampling estimate of the
log-sum, a cousin of this phase's approach that asks the same question. See
[[exact-vs-sampling-vs-rl|Exact vs sampling vs RL]].

---

**Next →** [[02-exact-tensor-computation|Phase 2 — Can it be computed exactly instead?]]
