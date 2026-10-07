---
title: Research Reports
---

Technical reports and research notes from my work at
[Hiroshima University](https://www.hiroshima-u.ac.jp/en), in the
[Urban and Transportation Planning Laboratory](https://home.hiroshima-u.ac.jp/~mkt682/)
under Prof. Makoto Chikaraishi.

> [!note] Nothing published here yet
> PhD reporting starts from a clean slate. The Master's work this site previously
> held is in [the archive](/archive/), and the introduction below recaps it.

## Where this starts

The subject is activity-based travel demand modelling with dynamic discrete
choice. A day is not one decision but a sequence of linked ones — what to do,
where, for how long, by which mode — and each choice changes what is still
possible afterwards. Leave for work at seven and the evening looks different
than leaving at nine.

Formally that is an activity-travel Markov decision process in the sense of
Västberg et al. (2020). A state carries everything needed to know what remains
possible: clock, location, current activity, time spent in it, mode, and which
mandatory activities are already done. Transitions are deterministic, and every
feasible action strictly advances the clock — so the state–action graph is
acyclic, graded by time, and a day is one path through it.

That structure is what makes the model worth the trouble. Because choice
probabilities come from a log-sum over whole days, the same quantity that
produces the likelihood also has a welfare reading, so a policy's effect can be
read off the model rather than inferred from a separate one.

## The computational problem

The value function has to be re-solved at every trial parameter vector, over a
state space that is a product: zones × activities × modes × clock × duration.
Stored densely, the transition structure runs to the order of 10¹² entries —
past what one machine holds — and a naive solve runs to tens of hours. Each
likelihood evaluation needs one such solve, and estimation needs hundreds.

This is why the exact route was set aside rather than refuted. Västberg et al.
put exact nested-fixed-point estimation of their own case study at roughly a
thousand CPU-days, and sampled daily travel patterns instead.

### The observation the thesis turns on

A log-sum adds up every feasible day, and it is strictly increasing in every
term. An unlikely day still contributes. So nothing may be discarded for being
*unlikely* — only for being *impossible*.

That distinction is the whole licence to prune. Almost none of the theoretical
states are ever visited on a feasible day: a person starting the morning at home
cannot be in a distant zone minutes later, cannot reach work before the network
can carry them there, cannot have completed a mandatory activity they have not
yet reached. Those states have well-defined values in principle, but they lie on
no feasible path, so they never enter the likelihood. Dropping them is exact —
it removes states that contribute nothing, not states that contribute a little.

Preferences never change the graph. They only reweight its edges.

## The objective

A scalable, welfare-consistent computational framework for solving the
activity-based travel demand DDCM **exactly** — with estimation fast enough to
actually run, simulation for a whole population at once rather than person by
person, heterogeneity at near-zero marginal cost per new type of person, and
policy effects read directly off the same computed value.

## Three contributions

**C1 — Reachability-based exact state-space reduction.** The scheduling problem
is cast as finite-horizon optimisation over a directed acyclic graph whose nodes
are states and whose edges are feasible transitions. A forward breadth-first
search under Hägerstrand's space-time prism keeps only the states a person can
physically reach in a day, cutting the theoretical state space by more than
ninety-nine percent. The DAG framing and the pruning are one package: the framing
is what makes the pruned graph solvable in a single non-iterative backward sweep
instead of by iterating to a fixed point, and the pruning is what makes that
sweep affordable.

**C2 — GPU-parallel exact backward induction.** Because the pruned graph has no
cycles, every state at a given time step depends only on values already solved
at later steps. An entire time layer therefore solves in one GPU scatter-reduce
call rather than state by state, taking a full solve from the order of tens of
hours to about a hundred seconds.

**C3 — Amortised reuse across the population.** Feasibility is shared where
preference is not, so one graph serves everyone who faces the same constraints,
and what is impossible for a particular person is masked on that shared graph.
Cost then scales with the number of activity-sequence groups — small and fixed —
rather than with the number of people, and per-person cost falls toward the
marginal cost of a single forward pass as the population grows.

Constraints land in one of three places, and which one is a property of the
constraint, not a modelling convenience: impossible for everyone, so never built;
the same for a whole group, so built once and shared; impossible for you, so
switched off on the shared graph.

## What it cost on a real network

Higashihiroshima, 144 zones, 7,376 valid persons from the travel diary, at
sixty-minute schedule rounding. The universal graph resolves into **four
topology groups** serving **259 evaluation contexts**.

| | Cost |
|---|---|
| Building the four shared graphs | **≈125 s total**, one-time, regardless of how many parameter guesses follow |
| Masking and solving one evaluation context | **1.56 s** on average |
| People served per build | **≈1,844** |
| States per topology-group build | 1.8–3.3 × 10⁵ |

The comparison against Västberg et al. (2020) is closer than network size
suggests. They report 4–10 seconds per individual for a *sampling-based*
evaluation on 1,240 zones against this thesis's 144 — apparently unfair in this
framework's favour. It is not, once the state spaces are compared directly:
their enumeration of 65 time steps × 1,240 locations, about 80,600 states, is
comparable to or smaller than one topology-group build here. The 1.56-second
figure solves a comparable-or-larger problem, exactly, faster than their
approximate one.

## The thesis

*A Scalable Computational Framework for Activity-Based Dynamic Discrete Choice
Models.* Master's thesis, Graduate School of Innovation and Practice for Smart
Society, Hiroshima University, September 2026. Supervised by Prof. Makoto
Chikaraishi. Defended 27 July 2026.

Seven chapters: Introduction; Background and Literature Review; Model
Specification; Scalable Computational Framework; What the Framework Makes
Possible — the Model on Higashihiroshima; Conclusion; Data Description.

Its own conclusion is where the PhD starts: standard errors, welfare confidence
intervals and faster estimation algorithms are named as open, and define the
programme the thesis initiates.

- [Manuscript (PDF, 67 pages)](/archive/thesis/nazamuddin-2026-masters-thesis.pdf)
- [Defense deck](/slides/thesis/) — July 2026
- [Master's archive](/archive/) — implementation reports, lab-meeting notes, decks

## Decks

Presentation decks keep their original addresses:

- [Master's thesis defense](/slides/thesis/) — July 2026
- [APTE 2026](/slides/apte/) — Jeju, July 2026
- [DDCM framework](/slides/ddcm/) — April 2026
- [Inside the DDCM engine](/slides/ddcm-codebase/) — codebase walkthrough, June 2026
