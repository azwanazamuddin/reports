---
title: "Weekly progress, 2 to 4 November 2026"
type: report
status: draft
unlisted: true
created: 2026-11-04
updated: 2026-11-04
tags: [phd, paper-a, weekly, estimation, constraint-heterogeneity]
---

**[Open the Paper A progress deck](/slides/paper-a-progress/)** (41 slides, 4 November) ·
[full estimation report](/ddcm/round1_estimation_report_20261103.html) ·
[distribution figures](/ddcm/behavioral_validation_20261103.html)

> [!warning] Working material
> Unlisted. The manuscript is not submitted. Every number comes from a run log, a sidecar or a script output.

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
  agreed points. Objectives reset to three and gaps to two.
- **Section 6, case study, estimation part:** round 1 is the estimate the paper uses (next section). The results text of the section
  is still an outline.

### Estimation reports

**[Full estimation report, round 1](/ddcm/round1_estimation_report_20261103.html)** · [distribution figures](/ddcm/behavioral_validation_20261103.html)

Round 1 finished after the 30 October estimate and replaces it. It changes three things and adds no parameter: no empty tours, short stops
kept, and unmodelled purposes left out. It has 6,299 scored persons and 76 free parameters, 69 of them significant with robust standard
errors. The log-likelihoods of the two runs are **not comparable**, because the persons and the encoding differ, so each run is compared with
its own diary.

| Per person-day, or trips per day | 30 Oct, observed | 30 Oct, simulated | Round 1, observed | Round 1, simulated |
|---|---:|---:|---:|---:|
| Tours per person-day | 0.677 | 0.587 | 0.696 | **0.696** |
| Share of days with no tour | 0.352 | 0.421 | 0.341 | **0.350** |
| Home to home, empty loop | 606 | 1,161 | 0 | **0** |
| Home to shopping | 748 | 442 | 752 | **764** |
| Leisure to home | 879 | 863 | 912 | 1,158 |

Class pruning (sweeping only the states a class can be in) is also on master: on the full sample the likelihood is unchanged and the gradient
agrees within 3.6e-15, at about 2.0× per evaluation.

### Section 5 design: numerical experiments and validation

Three experiments validate the constraint formulation on synthetic grids. The theorem proves the equality; these test the code and measure the cost.

| Experiment | Question |
|---|---|
| **Agreement** | Do all ways of computing give the same value, likelihood and gradient? It must fail when a mask is dropped |
| **Cost sweep** | How does the cost of one evaluation grow with zones, types, distinct masks, persons and tightness? |
| **What is lost** | With the truth known, how wrong are parameters, accessibility and policy response when constraints are ignored? |

## 2. Doing

- **Section 5:** the numerical experiments, from the design above. A 60-person agreement gate exists; the rest has not been run.
- **Discussion and conclusion:** Sections 8 and 9 in the current numbering.

## 3. To do

- **Review the full paper with Sensei.**
- **Section 7, accessibility and welfare:** three policies at the frozen estimate, one per kind of constraint (later shop closing, shifted work start, older
  drivers giving up their licence). Not yet run.
- **Where to go next.** Since Paper A is very close to Tien Mai's work, going to their lab could be an option besides Rui's lab. Their focus is more on MDP
  formulation, which I think will help the constraint heterogeneity formulation in the future.
- **Prepare the next works on ISTTT:** latent constraints, another entropy inside this approach, or the coupling constraint.

## 4. Error

**Destination zones still differ between simulated and observed.** Totals match, but where people go does not, and round 1 did not change this.

| All persons | Dissimilarity, 30 Oct | Dissimilarity, round 1 | Correlation of log arrivals, round 1 | Zones per simulated day, against the diary |
|---|---:|---:|---:|---:|
| Shopping arrivals by zone | 26.2% | 27.6% | 0.74 | 84 against 68 |
| Leisure arrivals by zone | 30.5% | 30.4% | 0.72 | 124 against 114 |

Simulated days spread over more zones and concentrate less in the top ten. Part of this may be sampling noise, since there are only about 1,400 shopping and 1,600 leisure
arrivals across the zones; the two have not been separated. Dissimilarity is computed for this post from the data in the published report.

- **Other gaps from round 1:** chaining after the first stop, stop durations (non-worker shopping median 60 simulated against 30 observed), and a public transport time coefficient
  that is still positive.
- **Do we need to readjust the specification again?** I think we need to set out the limitations we have, especially regarding the data. Round 2 (duration in utility) is parked.
