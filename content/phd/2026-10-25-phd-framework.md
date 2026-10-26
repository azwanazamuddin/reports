---
title: "The PhD framework and Paper A: the lab seminar deck"
type: report
status: draft
created: 2026-10-25
updated: 2026-10-26
tags: [phd, plan, paper-a, slides, constraint-heterogeneity]
---

**[Open the deck](/slides/phd-framework/)**, made for Prof. Chikaraishi and the lab seminar. It sets out
the whole PhD first, then Paper A in full, then the plan for the later papers. The last section,
"Working notes", is the author's own planning (workflow, reading, schedule, open decisions).

> [!warning] A plan, not a result
> The deck states a research plan as of 25 October 2026. The literature behind its novelty claims was
> checked from abstracts and needs reading in full; slides marked "verify together" are the ones to
> discuss first.

## The deck in three parts

| Part | What it covers |
|---|---|
| 1 · The PhD research | people face different constraints; if ignored, they are read as preferences; the research question; five papers and how they connect; urban transformation as the long-term objective; the value of a constraint; perturbed utility as the lens across the papers |
| 2 · Paper A | the model, value and likelihood, the two parts of every choice, four kinds of constraint (capability in two forms), what each costs, one sweep, five propositions, experiments, case study |
| 3 · Next plan | Papers B, C, D and E, and how they make the thesis chapters |

Then references, and the working notes.

## The argument

**The motivation is constraint heterogeneity.** People face different constraints, and a model that
ignores the difference reads "could not" as "did not want to". That consequence is well known: Manski
(1977), Swait and Ben-Akiva (1987) and Scott and He (2012) already separate constraint from preference.
What is not yet done is doing it **exactly and affordably in a whole-day dynamic discrete choice model**,
for a whole population. That is Paper A.

## Five papers, joined by gaps

Each paper starts from a gap the previous one states in its own discussion. On the diagram the text on
each arrow is that gap.

- **A · represent.** Heterogeneous constraints on one shared graph, and what each kind costs.
- **C · learn.** Constraints are assumed known in A; C learns the ones that are not observed (latent
  constraint classes inside a dynamic model).
- **D · couple.** A constraint that reads another person's choice does not reduce; D models the household
  jointly.
- **B · use.** Simulation, policy and welfare, with MATSim.
- **E · locate.** Homes and jobs are fixed in B; E lets people choose where they work and live from the
  value of the day.

After the PhD: a bigger upper-level optimisation, such as the supply design response, beyond the travel
demand model itself.

## Perturbed utility: the lens across the papers

Every choice model has two parts: **the perturbation**, which says how probability spreads over the
options a person likes (Shannon entropy gives logit), and **the domain**, the feasible set, which says what
the person can do. Constraints live in the domain. Both parts can put zero probability on an option: the
domain because of a constraint, a sparse perturbation because of preference (Yao and Zhang 2026; Tan et
al.).

That is why perturbed utility runs through the whole plan rather than being one paper:

| Paper | Role of perturbed utility |
|---|---|
| A · represent | stated for the Shannon member, where every feasible option has positive probability, so **every zero is a constraint** and the value of the day reads cleanly |
| C · learn | the main home: a zero may come from a specified constraint, a latent one, or a sparse preference; also checks that sharing is not tied to logit |
| B · use | welfare as the surplus under the perturbation; a value is only a constraint value if the zeros are constraints |
| after the PhD | a general "beyond logit" account of sharing and welfare |

Two guardrails: sparse perturbations are not outside random utility, and any computational gain from
sparsity is measured, not claimed.

## The value of a constraint

The quantity that runs through the plan is how much a constraint costs one person:

$$
\Delta V_n(c) = V_n(x_0 \mid c \text{ relaxed}) - V_n(x_0) = -\log \Pr^{\text{relaxed}}_n(\text{the day respects } c) \ge 0 .
$$

A map of these values across people is what a design would act on: relax the constraints that cost most.
Naqavi et al. (2023) already value a known constraint per person (a car, a workplace) in the same family
of models. So the new parts are constraints that are not observed (C), joint household constraints (D),
all kinds at population scale, and location choice (E).

## Paper E: choosing one's constraints

Added on 25 October. In Naqavi et al. the constraints are fixed and the person only chooses a zone. In
Paper E the person **chooses their own constraints**:

1. **A job is a place and its hours.** Choosing it chooses a set of feasible days.
2. **Constraint or preference, in the long run.** Lift a constraint and recompute where people would work
   and live; the shift is the part of the location choice the constraint drives. This can test the
   household-responsibility hypothesis, on which the evidence is divided (Giménez-Nadal and Molina 2016
   for; Reuschke and Houston 2020 against).
3. **Both levels estimated together**, which Naqavi et al. leave open. Ben-Akiva and Bowman (1998) found
   the expected hierarchy rejected, so the nesting is tested, not assumed.

Home choice is possible only in a minimum form (home given the workplace, with a land-price proxy). It is
partly a different problem: homes were chosen years ago, prices come from a market, and the decision is
the household's.

## Open decisions

- Paper E as a fifth paper, or part of Paper B.
- Whether the survey records length of residence or a recent move.
- The relation of Paper A to constrained MDPs.
- Paper A's objectives and its experiment ranges.

Paper A's own state is on [[2026-10-25-paper-a-progress|its progress page]]. The results that motivate
the policy side are in the [[2026-10-23-sip-seminar|SIP seminar deck]].
