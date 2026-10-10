---
title: Research Reports
---

PhD research at [Hiroshima University](https://www.hiroshima-u.ac.jp/en), in the
[Urban and Transportation Planning Laboratory](https://home.hiroshima-u.ac.jp/~mkt682/)
under Prof. Makoto Chikaraishi.

The work is about **constraint heterogeneity in dynamic choice models**. The object
is a Markov perturbed-utility model with heterogeneous feasible sets: one shared
state graph, a family of feasible sets over it, and the question of how many
distinct computations that family actually requires.

> [!note] Status
> The framing below is current as of October 2026 and is being taken to a
> supervisor session, not settled by it. The research directions at the end are
> themes to read into — they carry no ordering and no commitment. Where this page
> and the working documents disagree, the working documents win.

## A day is assembled out of what is possible

Not only out of what is wanted. Hägerstrand's capability, coupling and authority
constraints classify why a person cannot do something, treating constraints as the
subject rather than as a modelling nuisance.

And what is possible differs between people. Kwan (2000) finds gender differences
in the *fixity* of constraints — the empirical reason to treat constraints as
individual rather than uniform. Sen's **conversion factors** make the general
point: the same resource yields different achievable functionings for different
people, depending on the person, the society and the built environment. Transposed
here, **the same city yields different achievable days.** Same network, same
opening hours, different free time, because what you can convert the city into
depends on where you live, who you collect, and when you are due somewhere.

In the survey the diaries used here come from, 6,231 of 10,634 individuals have a
recorded workplace and 2,994 of 5,288 households have more than one member. Those
are survey-wide counts, not shares of the estimation sample.

## Why that matters for the model

There is a published path from the time-geographic prism to a money-valued
accessibility measure: Karlström (2005) put the prism inside a dynamic programme,
Jonsson et al. (2014) named the bridge in their own title, Västberg et al. (2020)
estimated the full model with constraints exact and per person, and Naqavi et al.
(2023) define spare-time accessibility directly as the value function and report it
in money.

So the value at the start of the day **is** the set of achievable days, priced.
Mis-specify the constraints and the number being reported is wrong, not merely
imprecise.

### The problem, in one sentence

A model that cannot carry per-person constraints **reads constraint as
preference**. A parent who never shops in the evening because of a pickup looks
like someone who dislikes evening shopping, and the error propagates into
accessibility, welfare, and who is said to gain from a policy.

Models that *can* carry it exactly pay one value function per person — which is why
that lineage turned to sampling alternatives, and gave up the full-support sum a
welfare reading needs.

**Constraint heterogeneity is therefore either misattributed or unaffordable.** The
work is about removing the second horn.

## Where the work sits

Perturbed utility splits a choice model in two: the **domain**, which is what is
available at all, and the **objective**, which is how probability spreads over what
is available. Written over flows, the penalty has one term for each.

Every neighbour in this literature works the objective — sparse perturbations,
generalised entropies, Fenchel-Young losses. Their domain is flow conservation:
network structure, identical for every traveller. The slot exists in their own
formulation and carries nothing personal.

This work varies the **domain** instead: one feasible set per person, built from
attributes that are not in the graph at all.

Representing that affordably needs three things at once — a shared structure many
people are solved against, a mask on it that depends on who is being solved, and
many such masks indexed by person. Pointing at where each is, or is missing, in a
neighbour's own notation is what makes this a position rather than a complaint:

| | shared structure | mask | many masks |
|---|---|---|---|
| **Västberg et al. (2020)** | — | n/a | ✓ |
| **Naqavi et al. (2023)** | — | n/a | ✓ |
| **Oyama & Hato (2019)** | ✓ | ✓ | — |
| **Fosgerau & Yao (2026)** | ✓ | — | n/a |

Västberg has the person index without a shared structure, so heterogeneity is
handled by replication and cost is linear in people. Oyama has the shared structure
*and* the mask — on a layered acyclic graph, with a reachability cone, introduced
for exactly this reason — but the context is a single origin–destination pair, and
his own footnote calls the per-pair version "a trade-off between computational
efficiency and realism" and declines it. Fosgerau and Yao have the sharing, and
their feasible set carries no person at all; their heterogeneity is in volume, not
in feasibility.

**Each has two of the three. Nobody has asked how many distinct masks a real
population needs.**

Two concessions belong with that table. Västberg's constraints are *exact*, not
soft — the shortfall is cost, not correctness. And sampling of alternatives is
*consistent* — the shortfall is efficiency plus the full-support sum, not validity.

## The organising question

What decides the cost is not which Hägerstrand type a constraint is, but **what it
reads** — and the decisive question is whether the thing it reads is itself a
choice.

Write each constraint as a rule reading some attributes and a state. Then it either
reads nothing about the person, so it is removed once for everybody; or reads an
attribute with few values, so it selects one of a handful of prebuilt structures;
or reads something nearly unique to the person, so it is switched off against a
structure everyone shares; or it reads **another person's day**, in which case it
is not a rule about this person at all.

That last case is the boundary, and it is a principled one rather than a practical
one. The work handles every constraint whose referent is *given* — including
coupling in Hägerstrand's sense, because an employer's schedule is given. What it
cannot handle is coupling whose counterpart is also optimising.

### What that costs, measured

7,468 real diaries need **four** structures. A synthetic population of **214,216**
people for the same city needs the same four. Separately, 8,031 people need
**3,096** solves rather than 8,031 — a 2.6× collapse. Per-person switching leaves
93.3–96.2% of states and 80.4–87.8% of edges live, so roughly a sixth of edge work
is swept and discarded in exchange for one batched solve instead of hundreds of
builds.

The reason the per-person case is affordable at all is the clock: every action
advances it, so the graph is acyclic and a solve is one backward sweep rather than
a linear system. That is a property of modelling a day, not an achievement. What it
buys is room — because solving is cheap, the question can move from *how do we
solve this at all* to *how do we embed constraints that differ person to person*.

## What is deliberately not claimed

Stated here because all of it has drifted into earlier drafts:

- Not that constraints exist in these models, or that they are per person
- Not that zero-probability enforcement is new
- Not that the layered acyclic graph, the reachability cone or an edge mask inside
  the sum is new — those are Oyama and Hato's, introduced for the same reason
- Not that the perturbed-utility formulation is ours; with entropy this is
  recursive logit, which is 2013
- Not that the value function as an accessibility measure is new — that is the
  published bridge above
- Not that schedulers cannot be estimated, and not that sampling is invalid
- **Not that the cost result transfers to cyclic models.** That is open, not
  claimed

The honest limits are stated too: value of time comes out at 193 yen per minute
against the reference model's own 44, because fuel-only car cost is proportional to
distance and the cost and time coefficients are collinear; one finite penalty
survives in the specification, on the lower bound of work start; household coupling
does not factorise; the modelled horizon is chosen rather than given; and three of
the five constraint sources need an exogeneity argument that has not yet been made.

## Where this goes

The classification cuts across Hägerstrand's three types, and two dropped
assumptions give the thesis its shape:

| | acyclic, a day | cyclic, a network |
|---|---|---|
| **reads given quantities** | **the first paper** | does masking admit a low-rank resolvent update? |
| **reads another's choice** | endogenous coupling, estimable and welfare-bearing | both at once |

The first paper is one cell. The rest is the same question with the acyclicity and
the given-referent assumptions dropped, rather than a new topic. Six directions are
currently written as themes to read into, not as papers: what per-person
feasibility costs when the clock condition fails; which shared representation is
best, and whether there is a principled way to choose one; constraints between
people, and where exactly the boundary is; constraints that change under a policy
scenario; constraints that are uncertain, which is flagged as outside the current
frame because it breaks the known-arrival assumption; and where constraints come
from, when feasibility must be inferred rather than read off.

Each carries an honest risk line — whether the machinery is so established that the
contribution would be the application rather than the method. The reading is what
settles that, and it has not happened yet.

---

## Where this comes from: the Master's framework

The computational ground this stands on was the Master's thesis, *A Scalable
Computational Framework for Activity-Based Dynamic Discrete Choice Models*
(Hiroshima University, September 2026; defended 10 August 2026).

Its problem was that the value function has to be re-solved at every trial
parameter vector, over a state space that is a product of zones, activities, modes,
clock and duration. Stored densely the transition structure runs to the order of
10¹² entries, and a naive solve runs to tens of hours. Västberg et al. put exact
nested-fixed-point estimation of their own case study at roughly a thousand
CPU-days and sampled instead.

The observation it turned on is the one the current work inherits: a log-sum adds up
every feasible day and is strictly increasing in every term, so **nothing may be
discarded for being unlikely — only for being impossible**. Three contributions
followed. A forward search under the space-time prism keeps only the states a
person can physically reach, cutting the theoretical state space by more than
ninety-nine percent, exactly rather than approximately. The pruned graph is
acyclic, so a whole time layer solves in one scatter-reduce call instead of state by
state. And because feasibility is shared where preference is not, one graph serves
everyone facing the same constraints.

On Higashihiroshima — 144 zones, 7,376 valid persons, four topology groups serving
259 evaluation contexts — building the shared graphs took about 125 s once, and
masking and solving one evaluation context took 1.56 s on average, about 1,844
people per build.

What the thesis left open is where the PhD starts: standard errors, welfare
confidence intervals, and faster estimation. The current frame is a different
question from that list, though — not how to compute the model faster, but what
per-person constraints *cost*, and what that implies about which differences
between people need their own computation.

- [Defense deck](/slides/thesis/) — August 2026
- [Master's archive](/archive/) — implementation reports, lab-meeting notes, decks

## Decks

- [Master's thesis defense](/slides/thesis/) — August 2026
- [APTE 2026](/slides/apte/) — Jeju, July 2026
- [DDCM framework](/slides/ddcm/) — April 2026
- [Inside the DDCM engine](/slides/ddcm-codebase/) — codebase walkthrough, June 2026
