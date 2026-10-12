---
title: "Exact vs sampling of alternatives vs RL (June 2026)"
type: investigation
status: complete
created: 2026-10-12
tags: [masters, investigation, estimation, approximation-error, rl]
---


**Reports:** [21 June](https://azwanazamuddin.github.io/reports/masters/ddcm/experiments_exact_sa_rl_20260621.html) and a longer
[24 June version](https://azwanazamuddin.github.io/reports/masters/ddcm/experiments_exact_sa_rl_20260624.html) of the same experiment, run
on the same synthetic network, θ* and seeds as [[parameter-recovery|the recovery study]].

## The question

Scoring one observed day-plan means comparing it against every possible day-plan: the normalizer
V̄(x₀) = log Σ exp(U). That sum is intractable at scale, and each estimator is a different shortcut
for it.

| Estimator | How the normalizer is obtained | Approximation bias | Behaviour |
|---|---|---|---|
| Exact NFXP | full backward induction | none | the reference |
| SA (Västberg) | McFadden-corrected log-sum over K sampled paths | about 0 at every K | consistent; extra variance shrinks with K |
| RL (root importance sampling) | Monte Carlo estimate plugged into the log | non-zero at finite budget B | inconsistent; vanishes only as B → ∞ |

The RL result follows from Jensen's inequality. The log of a noisy average is biased low, and with
no correction the bias is removed only by spending more rollouts. The report decomposes the error
as squared approximation bias, plus sampling variance, plus approximation variance.

## Why it matters for the thesis

This is the measured version of the Phase 1 question. Sampling stays consistent but adds variance,
and the RL-style approximation costs bias. Read in hindsight, it is the empirical background to the
thesis's claim that exactness is worth having.

## Read it with

- [[2026-06-23-recovery-and-approximation-error|The 23 June meeting note]]
- [[01-approximation-first|Phase 1]], where approximation was the plan.
- Hub: [[04-making-estimation-work|Phase 4]]
