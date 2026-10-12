---
title: "Master's work"
type: hub
status: complete
created: 2026-10-12
tags: [masters, hub]
---


The Master's programme at Hiroshima ran from October 2024 to September 2026. Its thesis, *A Scalable
Computational Framework for Activity-Based Dynamic Discrete Choice Models*, was defended on
10 August 2026 and is dated September 2026. This section is the record of how it was reached,
read in order as five questions, each answered by the next.

> [!warning] Figures are as of the week they were written
> The numbers in these notes and reports (state counts, run-times, memory, goodness-of-fit) come
> from that week's code and sample. Several were later superseded, and some — the headline
> state-space and memory figures in the April notes among them — are not the thesis's numbers.
> Where a note and the thesis disagree, the thesis wins.

## The arc

It began as a bet that the model could be **approximated**: reinforcement learning and
value-function approximation, so that a city-scale activity-scheduling model could be solved at
all. It ended with the opposite claim, that the model can be computed **exactly**, because a
log-sum adds up every feasible day, so nothing may be dropped for being unlikely, only for being
impossible.

What moved the work from one to the other was a change of representation, from a giant tensor to a
graph of reachable states. After that came a long and unglamorous stretch of finding out why an
exact estimator would not converge.

## Read in this order

1. [[01-approximation-first|Approximation first]] — *Can the model be approximated?* October–November 2025.
2. [[02-exact-tensor-computation|Exact computation on the GPU]] — *Can it be computed exactly instead?* November 2025–January 2026.
3. [[03-the-framework|The framework]] — *What is the model, once it is a graph?* April 2026.
4. [[04-making-estimation-work|Making estimation work]] — *Can it actually be estimated?* April–July 2026.
5. [[05-thesis-and-defense|The thesis]] — *What was finally claimed?* July–September 2026.

## Elsewhere in this section

- [DDCM implementation reports](/masters/ddcm/) — the 19 interactive reports as a plain list. Phase 4 groups them into [[04-making-estimation-work|seven investigations]].
- [[thesis-draft|The abandoned thesis scaffold]] — an April outline that was never finished and does not match what was defended.
- [The Master's-era site, frozen](/masters/legacy/) — the original landing page as it stood in August 2026.
- [Thesis defense deck](/slides/thesis/) — the public record of the defended thesis.

[Back to the PhD research page](/)
