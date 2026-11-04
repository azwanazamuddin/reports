---
title: "Weekly progress: Theorem 1, the latest estimate, what is next"
type: report
status: draft
created: 2026-11-04
updated: 2026-11-05
tags: [phd, paper-a, weekly, estimation, constraint-heterogeneity]
---

**[Open the Paper A progress deck](/slides/paper-a-progress/)** (42 slides, 5 November) ·
[learning deck](/slides/paper-a-learning/) ·
[full estimation report](/ddcm/round1_estimation_report_20261103.html)

> [!warning] Working material
> The manuscript is not submitted. Every number comes from a run log, a sidecar or a script output.

## 1. Done

### The constraint formulation

The new formulation takes "Constrained Recursive Logit for Route Choice Analysis" (Tran, Mai and Hoang, 2025) as its
starting point, and keeps their symbols where it is safe. Their paper covers one traveller and one bound. This one covers
a population whose constraints differ person by person.

- **One form for every kind of constraint:** a rule, a memory, and an end condition. The kind (institutional, capability,
  anchor, interdependent) says where the person's attributes enter, and that decides the cost.
- **Theorem 1, the one main result:** a person's own graph and the shared graph with that person's mask give the same value,
  choice probabilities, feasible days, likelihood and gradient, under three conditions (one to one on actions, every other
  action masked, matching ends).
- **Five corollaries:** one sweep per class; what splits a class; a rule on the person's own state; a budget as a start node;
  and two reductions, merging states and class pruning.
- **Two propositions that the theorem does not give:** one sweep each way (how fast a value is computed), and an interdependent
  rule does not reduce (where no embedding exists).
- **A cost formula** for how many graphs to build. The grouping changes the computation and never the model, so it is a question
  of cost. Prices are not measured yet.
- **Duration is in the state by default** in the general model. The case study is a special case whose utility does not read it.

### Part B paper

- **Sections 1 to 4** (introduction, literature review, model, constraint heterogeneity): first full draft, written up from the
  agreed points. Objectives reset to three and gaps to two. Section 5 is updated to the design below, still in points.
- **Section 6, case study, estimation part:** the latest estimate is the one the paper uses (next section). Its parameter and fit tables and its figures are now in the section; the comparison with and without
  constraints has not been run.

### Estimation reports

**[Full estimation report, latest estimate](/ddcm/round1_estimation_report_20261103.html)**. All validation is now on this one page; sections 11 and 12 give the distributions and averages in the form of Västberg et al. (2020).

The latest estimate finished after the 30 October estimate and replaces it. It changes three things and adds no parameter: no empty tours, short stops
kept, and unmodelled purposes left out. It has 6,299 scored persons and 76 free parameters, 69 of them significant with robust standard
errors. The log-likelihoods of the two runs are **not comparable**, because the persons and the encoding differ, so each run is compared with
its own diary.

| Per person-day, or trips per day | 30 Oct, observed | 30 Oct, simulated | Latest, observed | Latest, simulated |
|---|---:|---:|---:|---:|
| Tours per person-day | 0.677 | 0.587 | 0.696 | **0.696** |
| Share of days with no tour | 0.352 | 0.421 | 0.341 | **0.350** |
| Home to home, empty loop | 606 | 1,161 | 0 | **0** |
| Home to shopping | 748 | 442 | 752 | **764** |
| Leisure to home | 879 | 863 | 912 | 1,158 |

There is no re-estimation: this estimate stands. Its log-likelihood is -39,095.94 on 366,470 steps.

Class pruning (sweeping only the states a class can be in) is also on master: on the full sample the likelihood is unchanged and the gradient
agrees within 3.6e-15, at about 2.0× per evaluation. That is per evaluation and not per run, because phase 1 and the Hessian do not gain.

The gate also traced the states the origin cannot reach: 34 of 6,307 persons, 0.34% of the observed steps. For 25 of the 34 the first such step is the first step of the day, and
31 are workers. "Days not starting at home" is a reading, not proven.

### Section 5 design: numerical experiments and validation

Three experiments validate the constraint formulation on synthetic grids. The theorem proves the equality; these test the code and measure the cost.

| Experiment | Question |
|---|---|
| **Agreement** | Do all ways of computing give the same value, likelihood and gradient? It must fail when a mask is dropped |
| **Cost sweep** | How does the cost of one evaluation grow with zones, types, distinct masks, persons and tightness? |
| **What is lost** | With the truth known, how wrong are parameters, accessibility and policy response when constraints are ignored? |

## 2. Learning: how Theorem 1 breaks down

**[Open the learning deck](/slides/paper-a-learning/)**

This week also went into taking Theorem 1 apart: where each piece comes from, what the log-sum changes, and how each corollary follows. The route ran from the basics
(functions and bijections, the Gumbel log-sum, recursive logit, the day as a dynamic programme) to the theorem, its proof, and then the corollaries one at a time, with a small toy worked by hand.

### Where it comes from

| Idea | Source | What it gives | What Theorem 1 does differently |
|---|---|---|---|
| Bisimulation | Park (1981); Milner (1989); Larsen and Skou (1991); Givan, Dean and Greig (2003) | States that cannot be told apart have the same value, so they can be merged | Places a person's states on a bigger graph and masks the rest, instead of merging them |
| MDP homomorphism | Ravindran and Barto (2002, 2003), definition as restated in their 2004 paper | A map of states with a state-dependent map of actions, keeping rewards and transitions | Its action maps may be many to one, since a maximum ignores copies. A sum does not, so here they must be one to one |
| Reformulation | Hooker (2013); Castro, Cire and Beck (2022) | Solutions and trajectories one to one, with equal values, under a maximum | The same notion under the log-sum, for a population |
| Mask in the Bellman sum | Oyama and Hato (2019) | A value of $-\infty$ removes an action from the sum | Used per person on one shared graph |
| Path bijection under a state extension | Tran, Mai and Hoang (2025), Theorem 2 | The closest result: paths one to one, same probability, one person and one bound | Many persons on one graph, any map that passes a check, and what is left instead of what is used |

### What the log-sum changes

The value is a sum over a person's days: $e^{V(o)}=\sum_p e^{u(p)}$. A sum is preserved by a bijection with equal terms, and only by that. Merging two of a person's actions loses a term
($\log 2$ when the two are equal), so "each option once" becomes a condition. That gives the three conditions on a map $\varphi$ of states and maps $\psi_s$ of actions:

- **E1, one to one on actions:** each action of the person goes to a distinct open action of the shared graph, with the same utility for every $\theta$ and the corresponding successor.
- **E2, closure:** every other action at those states is masked, so it adds $e^{-\infty}=0$.
- **E3, ends:** end states correspond, with the same end values.

### The proof in five steps

1. Go through the states from the end of the day backwards.
2. **Base:** at an end state both values equal the end value (E3).
3. **Step:** at a state, masked actions add 0 (E2), and the open actions are the person's, each once (E1), leading to states whose values are already equal. So the two sums match.
4. **Probabilities and paths:** the policy uses only equal pieces, and a path with finite weight uses only open actions, so it comes from a day of the person.
5. **Likelihood and gradient:** a sum of equal log-probabilities, equal as functions of $\theta$, so the derivatives are equal too.

**On the toy:** $V=5.1328$ on both graphs, and forgetting one mask gives $5.1908$, which is why a gate must fail when a mask is dropped.

### The corollaries: each answers "which map?"

| Result | The map $\varphi$ | What it says |
|---|---|---|
| **Corollary 1**, classes | None new; it uses the theorem, with Proposition 1 for the count | Same mask, end values and context: same values, so one backward and one forward pass per class and not per person |
| **Corollary 2**, what splits a class | None new | More feasible paths means a strictly higher value; persons can share a pass when one mask agrees on the states each can reach |
| **Corollary 3**, a rule on the person's own state | Identity, with a mask | If rules read only $(z_n,s,a)$ and the transition and end states are common, identity plus mask is an embedding |
| **Corollary 4**, a budget | $(s,C)\mapsto(s,\alpha_n-C)$ | Record what is left. A larger budget is only a higher start node, and no mask is needed, provided utility does not read it |
| **Corollary 5 (i)**, memory nothing reads | $\kappa$, to a representative state | Merging is many to one on states but one to one on each state's actions, so it is allowed |
| **Corollary 5 (ii)**, class pruning | Identity into the kept subgraph | Every state of every feasible day is kept, so no image is lost |

**Two propositions do not follow from the theorem.** Proposition 1 (one sweep each way) is about how fast a value is computed. Proposition 2 is the theorem's limit: when a person's feasible set depends on another person's choice,
no mask and no embedding exist, and an exact representation is the product graph.

**Borrowed, established, new.** Mapping one model into another is borrowed, and so is the mask in the Bellman sum. The path bijection for one person and one bound is established (Tran, Mai and Hoang). This paper adds the extension to a population on one
shared graph, with a condition that can be checked, equal likelihood and gradient for every $\theta$, and the cost of each kind of constraint. The proof of Corollary 5 (ii) is reasoned and has not been machine-checked.

## 3. Doing

- **Section 5:** the numerical experiments, from the design above. A 60-person agreement gate exists; the rest had not started at the 5 November handoff, and nothing is running.
- **Discussion and conclusion:** Sections 8 and 9 in the current numbering.

## 4. To do

- **Review the full paper with Sensei.**
- **Section 7, accessibility and welfare:** three policies at the frozen estimate, one per kind of constraint (later shop closing, shifted work start, older
  drivers giving up their licence). Not yet run.
- **Where to go next.** Since Paper A is very close to Tien Mai's work, going to their lab could be an option besides Rui's lab. Their focus is more on MDP
  formulation, which I think will help the constraint heterogeneity formulation in the future.
- **Prepare the next works on ISTTT:** latent constraints, another entropy inside this approach, or the coupling constraint.

## 5. Error

**Destination zones still differ between simulated and observed.** Totals match, but where people go does not, and the latest estimate did not change this.

| All persons | Dissimilarity, 30 Oct | Dissimilarity, latest | Correlation of log arrivals, latest | Zones per simulated day, against the diary |
|---|---:|---:|---:|---:|
| Shopping arrivals by zone | 26.2% | 27.6% | 0.74 | 84 against 68 |
| Leisure arrivals by zone | 30.5% | 30.4% | 0.72 | 124 against 114 |

Simulated days spread over more zones and concentrate less in the top ten. Part of this may be sampling noise, since there are only about 1,400 shopping and 1,600 leisure
arrivals across the zones; the two have not been separated. Dissimilarity is computed for this post from the data in the published report.

- **Other gaps from the latest estimate:** chaining after the first stop, stop durations (non-worker shopping median 60 simulated against 30 observed; worker shopping mean 75 against 44), late evening (shopping starts after 21:00 are 7.7% against 0.7%,
  leisure 3.9% against 0.8%, returns home 19.6% against 11.6%), and a public transport time coefficient that is still positive (+0.028). The requirement that each day ends at home may link to the late evening; that is a reading, not a test.
- **Do we need to readjust the specification again?** I think we need to set out the limitations we have, especially regarding the data. A further respecification (duration in utility) is parked.
