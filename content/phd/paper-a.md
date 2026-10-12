---
title: "Paper A — what per-person feasibility costs"
type: report
status: draft
created: 2026-10-12
updated: 2026-10-12
tags: [phd, paper-a, constraint-heterogeneity]
---

> [!warning] Pre-supervisor draft, 12 October 2026
> This is the argument as it stands in the working documents, before any of it has been taken to a
> supervisor session. It will be restated. Where this page and the working documents disagree, the
> working documents win. The manuscript is being restructured to follow this argument and does not
> yet match it.

## What the paper asks

A day is assembled out of what is possible, not only out of what is wanted, and what is possible
differs from person to person. A model that cannot carry that difference **reads constraint as
preference**, and the error lands in accessibility and welfare. Models that can carry it exactly have
paid one value function per person, which is why that line of work turned to sampling alternatives
and gave up the full-support sum a welfare reading needs.

So constraint heterogeneity has been either misattributed or unaffordable. The paper is about
removing the second horn: **what does per-person feasibility actually cost, and which differences
between people genuinely need their own computation?**

**The working claim**, a draft not yet applied to the manuscript: constraint heterogeneity becomes a
*specification choice* rather than a computational concession. Which constraints a modeller can
individualise has been decided by computational budget rather than by behaviour. The paper shows that
the level at which a constraint is enforced is determined by that constraint's own arguments, gives
the operators that realise each level without loss, identifies the one class that does not
factorise and why, and individualises a constraint the model previously had to relax (the
workplace).

## How the claim changed

Until the end of September this paper was a reduction technique, headlined as *exactness forces
reachability restriction*. A literature run on 1 October, set up as a novelty gate, returned a
verdict that the gate had fired:

- The claim that activity-based models had not treated constraints as proper model inputs is
  **false**. Recker (1995), Västberg et al. (2020) with Naqavi et al. (2023), and Pougala et al.
  (2023) each refute it.
- The planned fallback failed too. The dynamic-discrete-choice lineage already enforces constraints as
  exact zero-probability forms, per person.
- What survived is the **cost**: doing it at population scale without a value function per person,
  which is what forces either sampling of alternatives or a fitting method with no welfare measure.

On 5 October four dated scope guards were reopened and the paper was restructured rather than
patched. Two guards were kept on their own merits: "exact" stays out of the title, because all three
reviewers of the hEART submission read it as a claim about recovering true parameters rather than
about the computation; and the speed comparison against Västberg stays deleted, because it had
factual defects.

## The argument, in ten links

The point of writing the chain down before the prose is that it can be read aloud and argued with.
Each link says what it claims, and what a referee will say.

**The problem**

1. **A day's value is the log of a sum over every feasible day.** Setup. Nobody will push on it.
2. **Because it is a sum and not a maximum, an alternative may not be discarded for being unlikely.**
   Dominance-style pruning certifies that something is never *best*, which is a statement about a
   maximum. The concession: bounded-error pruning exists and is routine, so the defensible claim is
   only that no *exact* dominance certificate exists.
3. **So the only licensed deletion is impossibility, and constraints become the instrument.** A hinge
   rather than a contribution; "you just use feasibility, as everyone does" is correct.
4. **Constraints differ between people, and here they are observed.** In the survey these diaries
   come from, 6,231 of 10,634 individuals have a recorded workplace and 2,994 of 5,288 households have
   more than one member, as survey-wide counts rather than shares of the estimation sample. The
   objection is that an unchosen alternative may simply not have been considered; the defence is that
   the constraints are observed, and it must still be argued for three of the five sources
   (workplace, car access, the person's own schedule).
5. **Representing that per person has been the cost.** Västberg costs exact estimation of his own
   case study at roughly a thousand CPU-days and adopts sampling instead. The network-route line
   shares structure and gives up per-context realism. Sampling of alternatives is consistent, and the
   paper must concede that plainly: the cost is efficiency, and sampled alternatives do not directly
   give the full-support sum a welfare reading needs.

**The claim**

6. **Which differences need their own computation is decided by what each constraint reads.** A rule
   that reads nothing about the person is removed once for everybody; one that reads an attribute
   with few values selects among a handful of prebuilt structures; one that reads something nearly
   unique to the person is switched off against a structure everyone shares; one that reads
   *another person's day* is not a rule about this person at all. The dangerous objection is Oyama
   and Hato (2019), who already mask per context on a shared layered graph, and the paper has to say
   so first. Their contexts are origin-destination pairs and their restriction is network geometry;
   ours are people, and the restriction comes from attributes that are not in the graph at all.
7. **In this setting the expensive case is free, and that is a property of the setting.** The clock
   makes the graph acyclic, so a solve is one backward sweep. That is a property of modelling a day,
   not an achievement, and the paper concedes it. The layered acyclic space and the reachability cone
   are Oyama and Hato's too. The horizon is chosen, not given. The classification is general, but the
   cost result is not claimed for cyclic models.
8. **The fourth case genuinely does not reduce.** A constraint that reads another person's day is not
   a function of this person's state. Household vehicle sharing was formulated exactly in 1995 as a
   mixed-integer program, and "intractable" overreaches: household sizes are small, so standard
   graphical-model machinery may solve it. It is stated as a characterisation problem, not an
   impossibility.

**The evidence**

9. **The case study shows scale, and nothing more.** 7,468 persons estimated, with both
   standard-error families reported; the median ratio of robust to outer-product errors is 1.48, and
   two coefficients change significance under robust inference. The reference implementation is
   stated without reference to hardware and runs on CPU. The GPU is a case study in acceleration that
   costs a property the rest of the paper rests on: its gradient is not a function of the parameters.
   The fair objection is "this shows it runs, not that it is useful", and it has to be answered with
   a welfare number.

**The limits**

10. **Stated by us.** Value of time comes out at 193 yen per minute against the reference model's 44,
    because fuel-only car cost is proportional to distance and so collinear with time. One finite
    penalty survives in the specification, on the lower bound of work start. Household coupling does
    not factorise. The horizon is chosen. Three of the five constraint sources need an exogeneity
    argument that has not yet been made.

## What was measured

7,468 real diaries need **four** shared structures; a synthetic population of **214,216** people for
the same city needs the same four. Separately, 8,031 people need **3,096** solves rather than 8,031,
a 2.6× collapse. Per-person switching leaves 93.3–96.2% of states and 80.4–87.8% of edges live, so
roughly a sixth of edge work is swept and discarded in exchange for one batched solve instead of
hundreds of builds.

Individualising the workplace on one shared graph costs about 1.11× the value-function columns and
takes the live fraction from 95.4% to 79.4% of states.

## How big a claim each piece can carry

| Claim | Strength available |
|---|---|
| Constraints differ per person, and the difference is observable | **Strong**: measured, and supported by Kwan (2000) |
| A model that cannot carry the difference reads constraint as preference | **Structural**: follows from the likelihood |
| The classification by what a constraint reads | **General**: a definition and a composition rule, not a theorem |
| Per-person masking costs one solve per distinct mask, not per person | **Measured**: 8,031 to 3,096 |
| The clock makes the expensive case cost what the cheap one does | **A theorem**, standard once stated, and conceded |
| The cost result transfers to cyclic models | **Not available**: named as open |
| The framework handles every type of constraint | Every constraint whose referent is *given*; the endogenous-coupling cell is missing |
| The case study shows behavioural or policy value | **Not available**: it shows scale |
| The method is faster than the alternatives | **Not available as stated**, and the wrong axis |

The discipline in one line: the paper may claim the *question* is general, and must claim the
*answer* only for the setting it demonstrates.

## What is open

- **A welfare number**, to answer "it runs, but is it useful".
- **An exogeneity argument** for workplace, car access and the person's own schedule, currently
  uncited.
- **Within-sample shares** of the constraint counts above, which are survey-wide.
- **The contribution paragraph** is a draft that waits on explicit confirmation before it changes the
  manuscript's introduction, abstract and contribution list.
- **Three phrases that are not yet safe to write**: that no estimated model reports a random-utility
  welfare measure (an absence in a bounded search), a characterisation of PCATS that has not been
  read, and welfare from a frozen parameter vector (which rests on a secondary reading of Naqavi).
- **Evidence depth in the literature run**: only one source was read in full, and most of the
  positioning rests on shallower reading. Two citations for Sen's conversion factors are also still
  missing from the bibliography.
- **The cyclic case**: whether per-person masking admits a cheap low-rank update when the graph is
  not acyclic is the open question the rest of the programme is built around.

## Where the ingredients came from

- The **shared structure** is the [[02-exact-tensor-computation|universal graph]] of the Master's
  second phase, and its early condition tiers (global, group, individual, dynamic) are the first
  written form of the per-person feasibility question.
- The refusal to discard alternatives in link 2 has an empirical background in
  [[exact-vs-sampling-vs-rl|what approximating the log-sum was measured to cost]].
- The reachability machinery is [[03-the-framework|the framework phase]], and the
  [[05-thesis-and-defense|defended thesis]] is what this paper stands on.

[Doctoral research](/phd/) · [The research page](/)
