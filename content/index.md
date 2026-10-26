---
title: Research Reports
---

PhD research at [Hiroshima University](https://www.hiroshima-u.ac.jp/en), in the
[Urban and Transportation Planning Laboratory](https://home.hiroshima-u.ac.jp/~mkt682/)
under Prof. Makoto Chikaraishi.

The work is about **constraint heterogeneity in dynamic discrete choice models**:
people face different constraints, and a model of the whole day has to carry them
exactly, for a whole population, at a cost that grows with the kinds of constraint
rather than with the number of people. The object is a Markov perturbed-utility
model with heterogeneous feasible sets: one shared state graph, a family of feasible
sets over it, and the question of how many distinct computations that family
actually requires.

> [!note] Status, 26 October 2026
> The framing below follows the PhD plan presented at the lab seminar on 25 October:
> five papers joined by gaps, with Paper A as the foundation. It is a plan, not a
> result, and the literature behind it is still being read in full. Where this page
> and the working documents disagree, the working documents win.

## Reports and decks, newest first

- **25 Oct 2026** · [The PhD framework and Paper A](/slides/phd-framework/). The lab seminar deck: five
  papers joined by gaps, Paper A in full, the next plan. [What it argues and what is open](/phd/2026-10-25-phd-framework/).
- **25 Oct 2026** · [Paper A progress](/phd/2026-10-25-paper-a-progress/). Where the manuscript stands,
  section by section.
- **23 Oct 2026** · [SIP seminar](/slides/sip-seminar/). The stakeholder talk with the first full-sample
  results. [PDF, handouts and how it was made](/phd/2026-10-23-sip-seminar/).
- **13 Oct 2026** · [Paper A: the deck](/slides/constraint-framing/). 42 slides for the supervisor working
  session. [Decisions, corrections and what is still open](/phd/2026-10-13-paper-a-deck/).
- **13 Oct 2026** · [Why the estimator got faster: how the gradient is managed](/phd/2026-10-13-gradient-speedup/).
  A 16.7× speed-up with identical results, compared with the old CUDA runs. No estimation result yet.
- **29 Sep 2026** · [hEART 2026](/slides/heart/). Paris, 29 September to 1 October: *Reachability-Based
  Sparse Computation for Activity-Based Dynamic Discrete Choice Models*, the computational framing of
  Paper A before the 1 October reframe to constraint heterogeneity.
- **Aug 2026** · [Master's thesis defense](/slides/thesis/). The deck for the defended thesis.
- **Jul 2026** · [APTE 2026](/slides/apte/). Jeju Island, 8–10 July.
- **Jun 2026** · [Inside the DDCM engine](/slides/ddcm-codebase/). A codebase walkthrough.
- **Apr 2026** · [DDCM framework](/slides/ddcm/).

The Master's work, from first ideas to the defended thesis, is in [five phases](/masters/).

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

The first horn is not new on its own. Separating constraint from preference is an
old question in choice modelling (Manski 1977; Swait and Ben-Akiva 1987; Scott and
He 2012; Thorhauge, Vij and Cherchi 2021). What is open is doing it exactly and
affordably inside a whole-day dynamic discrete choice model.

## Where the work sits

Perturbed utility splits a choice model in two: the **domain**, which is what is
available at all, and the **objective**, which is how probability spreads over what
is available. Written over flows, the penalty has one term for each. That split is
Yao and Zhang's, not ours; what is ours is only what goes in the second slot.

Every neighbour in this literature works the objective — sparse perturbations,
generalised entropies, Fenchel-Young losses. Their domain is flow conservation:
network structure, shared by every traveller, or at most one feasible set per user
class. The slot exists in their own formulation and carries nothing personal.

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
| **Yao & Zhang (2026)** | ✓ | per class | classes only |
| **Tran & Mai (2024)** | — | n/a | ✓ |
| **Tran, Mai & Hoang (2025)** | ✓ | ✓ | one threshold for everyone |

Västberg has the person index without a shared structure, so heterogeneity is
handled by replication and cost is linear in people. Oyama has the shared structure
*and* the mask — on a layered acyclic graph, with a reachability cone, introduced
for exactly this reason — but the context is a single origin–destination pair, and
his own footnote calls the per-pair version "a trade-off between computational
efficiency and realism" and declines it. Yao and Zhang have the sharing, and
a feasible set per user class, solved class by class; that is a handful of masks by
replication, not one per person.

Tran and Mai build one graph per decision maker; Tran, Mai and Hoang prove lossless
exclusion and extend the state for constraints that depend on history, with one
threshold for everyone. Both rows are from a first reading and are still to be
checked in full.

**Each has two of the three. Nobody carries a mask per person on one shared
structure, or has asked how many distinct masks a real population needs.**

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
or reads an amount used up along the day against the person's own bound, such as a
time or money budget, so each person is a different start node on one extended
graph; or reads something nearly unique to the person, so it is switched off against
a structure everyone shares; or it reads **another person's day**, in which case it
is not a rule about this person at all.

Named by what they say about a person's life, these are four kinds: **institutional**
(the same for everyone), **capability** in two forms (the means a person holds, and
a budget used up during the day; the prism itself is bounded by a time budget),
**anchor** (where and when one must be) and **interdependent** (set by another
person). The two forms of capability share a meaning but not a mechanism.

That last case is the boundary, and it is a principled one rather than a practical
one. The work handles every constraint whose referent is *given* — including
coupling in Hägerstrand's sense, because an employer's schedule is given. What it
cannot handle is coupling whose counterpart is also optimising.

### What that costs, measured

These counts are from 6 October and will be re-counted on the current specification.
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
  recursive logit, which is 2013. Nor that its two-slot split is ours
  (Yao and Zhang's), only what goes in the second slot
- Not that the value function as an accessibility measure is new — that is the
  published bridge above
- Not that schedulers cannot be estimated, and not that sampling is invalid
- Not that separating constraint from preference is new (Manski 1977; Swait and
  Ben-Akiva 1987), nor that lossless exclusion or a state extended for history is new
  (Tran, Mai and Hoang 2025)
- Not that valuing a known constraint per person is new: Naqavi et al. (2023) value
  car access per person and evaluate a workplace in every zone
- **Not that the cost result transfers to cyclic models.** That is open, not
  claimed

The honest limits are stated too. The estimate shown at the
[SIP seminar](/phd/2026-10-23-sip-seminar/) is one estimation round, with public
transport time fixed from a trip-level model; the model was re-specified on 24
October and is being re-estimated. Each person is observed on one weekday, work
duration is taken from the diary, shopping destinations do not fit, household
coupling does not factorise, and the constraint sources still need an argument that
they are exogenous.

## Where this goes

Five papers, each starting from a gap the previous one states in its own discussion.
The [lab seminar deck](/slides/phd-framework/) sets them out, and
[its notes](/phd/2026-10-25-phd-framework/) say what is open.

| Paper | Question | Gap it starts from |
|---|---|---|
| **A · represent** | when can people whose constraints differ share one graph exactly, and what does each kind cost? | the foundation |
| **C · learn** | where do the zeros come from: a specified constraint, a latent one, or a sparse preference? | A assumes constraints are known |
| **D · couple** | how to estimate constraints set by another household member's choice | A shows them only on a toy |
| **B · use** | buildings, the MATSim loop and the welfare diagnosis | A works with zones and fixed travel times |
| **E · locate** | where people work and live, read from the value of the day, as a choice of one's own constraints | B keeps homes and jobs fixed |

**Perturbed utility is the lens across all five.** A choice model has a perturbation,
which spreads probability over what a person likes, and a domain, which is what the
person can do. Under the Shannon member every zero is a constraint, so the value of
the day and the value of a constraint read cleanly; under a sparse perturbation a zero
may be preference. Paper A states its results for the Shannon member, and Paper C
asks which zeros are which.

The quantity that runs through the plan is the **value of a constraint** to one person:
what they would gain if it were lifted, with everything else unchanged. After the PhD,
the long-term objective is urban transformation: a bigger upper-level optimisation,
such as the supply design response, beyond the travel demand model itself.

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
- [Master's work](/masters/) — the path from first ideas to the defended thesis, in five phases
