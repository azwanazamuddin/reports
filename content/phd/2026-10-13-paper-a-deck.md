---
title: "Paper A: the deck, and what stands behind it"
type: report
status: draft
created: 2026-10-13
updated: 2026-10-13
tags: [phd, paper-a, constraint-heterogeneity, slides]
---

**[Open the deck: 42 slides](/slides/constraint-framing/)**, built for a supervisor working session.
This page holds what the slides cannot: the decisions behind them, the corrections made while they
were built, and what is still open.

> [!warning] Pre-supervisor, 13 October 2026
> The deck and this page describe the argument as it stands in the working documents, before any of
> it has been taken to a supervisor session. It will be restated. Where this page and the working
> documents disagree, the working documents win.

## What Paper A is about

A day is assembled out of what is possible, not only out of what is wanted, and what is possible
differs from person to person. A model that cannot carry that difference **reads constraint as
preference**, and the error lands in accessibility and welfare. Models that can carry it exactly have
paid one value function per person, which is why that line of work turned to sampling alternatives and
gave up the full-support sum a welfare reading needs.

So constraint heterogeneity has been either misattributed or unaffordable. The paper is about removing
the second horn: **what does per-person feasibility actually cost, and which differences between
people genuinely need their own computation?**

**The working claim**, a draft not yet applied to the manuscript: constraint heterogeneity becomes a
*specification choice* rather than a computational concession. Which constraints a modeller can
individualise has been decided by computational budget rather than by behaviour. The paper shows that
the level at which a constraint is enforced is determined by that constraint's own arguments, gives the
operators that realise each level without loss, identifies the one class that does not factorise and
why, and individualises a constraint the model previously had to relax (the workplace).

## How the claim changed

Until the end of September this paper was a reduction technique, headlined as *exactness forces
reachability restriction*. A literature run on 1 October, set up as a novelty gate, returned a verdict
that the gate had fired:

- The claim that activity-based models had not treated constraints as proper model inputs is
  **false**. Recker (1995), Västberg et al. (2020) with Naqavi et al. (2023), and Pougala et al. (2023)
  each refute it.
- The planned fallback failed too. The dynamic-discrete-choice lineage already enforces constraints as
  exact zero-probability forms, per person.
- What survived is the **cost**: doing it at population scale without a value function per person,
  which is what forces either sampling of alternatives or a fitting method with no welfare measure.

On 5 October four dated scope guards were reopened and the paper was restructured rather than patched.
Two guards were kept on their own merits: "exact" stays out of the title, because all three reviewers
of the hEART submission read it as a claim about recovering true parameters rather than about the
computation; and the speed comparison against Västberg stays deleted, because it had factual defects.

## The deck

42 slides, down from 60. It frames Paper A as a constraint-heterogeneity paper and is built for a
working session, not a talk. The last full layout check was clean: 0 of 42 slides clipped or running
under the footer. A PDF export of the same 42 slides exists alongside the source.

| Part | What it argues |
|---|---|
| 1 · Why reframe (5 slides) | a day is built from what is possible, that differs by person, and a model that cannot carry it reads constraint as preference |
| 2 · Where we sit (18 slides) | the standard model, then the same model as a perturbed-utility problem, then the **two slots** (perturbation and domain), then the gap against Oyama and Hato and against Yao and Zhang |
| 3 · Embedding constraints (5 slides) | classify a constraint by what it reads, build versus mask, one sweep per distinct mask, with the concessions |
| 4 · Paper A (5 slides) | the nine-section outline, each section broken into points |
| 5 · Where it leads (2 slides) | two directions: coupling, and the feasible set as a measure |

### Main decisions

- **The positioning uses Yao and Zhang only.** An equation that used to appear in the deck was deleted
  because its only source was a photographed conference slide. The argument now runs through the two
  slots at one state, then Yao and Zhang's flow result (their Proposition 3, equation 18 and Lemma 3).
- **Our feasible set is defined inside the surplus.** The open actions $A_n(s)$ enter only through the
  domain, giving $\Delta(A_n(s))$, with the value and policy for person $n$ as the deck's new equation
  (9). Over flows it is $X_n$ in the new (10).
- **A constraint is defined as a fact about the person**: attributes and a rule, fixed before
  estimation. It therefore belongs in the domain at any perturbation. Staying at Shannon is a separate
  choice, made for the welfare reading.
- **Scope cuts:** the case study, the backup, the measured-cost slides, the "classification
  generalises" and "fourth case" slides, Beyond Shannon, and the cyclic-networks direction.

### Findings and corrections

- **Yao and Zhang's feasible set is indexed by user class** (their section 4.1), so earlier wording
  that it had no index was wrong. The gap that holds is narrower: **nobody carries a mask per person
  on one shared structure**, or asks how many distinct masks a population needs. The research page was
  corrected the same day; it had cited a conference keynote that rests on a photographed slide.
- **The cyclic case is well posed** under their conditions B1 (reachability) and B2. What is open is
  the per-person cost of the solves. A mask can remove a state's only exit, so B1 has to be checked per
  person, which is what the backward cone does on the day graph.
- **Exact zeros and "every option counts" are one knob.** A finite slope at zero of the perturbation
  gives exact pruning but only weak option value. An infinite slope gives full support and the
  capability reading. Checked numerically on the Tsallis family.
- **Estimation.** For Shannon the Fenchel-Young loss equals our log-likelihood. Yao and Zhang's 2026
  paper has no estimation. Their 2025 abstract has a regression method that needs many observations per
  state, which our data does not have.
- **Notation made consistent.** $\Omega$ is the perturbation, $H_s$ the surplus, $z_n$ the
  attributes, $B$ the balance matrix, $X$ and $X_n$ the flow sets. $\alpha$ is reserved for the
  Tsallis exponent.

Every derivation lives in the working formulation document, and the slides never carry an argument that
document lacks.

## Evidence caveats

> [!warning] Before quoting anything from the case study
> The deck has **no measured figures** on its slides. The case-study numbers in the Paper A outline
> come from the draft and were not re-verified.

- **The case study is not current.** An earlier 38-parameter specification was estimated on 7,468
  persons to its gradient tolerance, with both standard-error families reported. That specification has
  since been superseded: the parameter vector went from 88 names to 75, and several defects in the
  gradient and the starting point were fixed. Those results have **not been re-verified**, and no run
  has yet converged for the current one. See [[2026-10-13-gradient-speedup|the gradient report]].
- **Dropped steps.** Between 23% and 28% of observed steps, depending on the graph, are dropped because
  they match no state or edge. That is selection on the chosen action, and whether it biases the
  estimates has not been measured.
- **No welfare number yet.** The accessibility and welfare section has none.
- **Proofs.** Only the sweep result is a theorem. The losslessness of pruning is **tested**, not
  proved, and the simulated review flagged the missing proofs as critical.
- **Two statements remain unverified**: that a mask cannot make the recursion unsolvable, and that
  restricting the action set works for nested families.
- **Citability.** The hEART 2026 slides are photographs and the Tokyo keynote exists only as page
  images, so neither can be cited. Only one source in the 1 October literature run was read in full,
  and most of the positioning rests on shallower reading.

## Still open

- **An exogeneity argument** for workplace, car access and the person's own schedule, currently
  uncited.
- **Within-sample shares** of the constraint counts on the research page, which are survey-wide.
- **The contribution paragraph** waits on explicit confirmation before it changes the manuscript's
  introduction, abstract and contribution list.
- **Three phrases that are not yet safe to write**: that no estimated model reports a random-utility
  welfare measure (an absence in a bounded search), a characterisation of PCATS that has not been read,
  and welfare from a frozen parameter vector (which rests on a secondary reading of Naqavi).
- **The cyclic case.** Whether per-person masking admits a cheap low-rank update when the graph is not
  acyclic is the open question the rest of the programme is built around.
- **References.** Hofbauer and Sandholm (2002), Fosgerau and McFadden (2012), Tan et al. (2024, 2026),
  Yao and Zhang (2026, arXiv 2607.09568) and Sen's conversion-factor work (1992) still have to be
  entered in Zotero; the bibliography has not been touched.
- **Attribution wording** in two internal literature notes ("the perturbed-utility framing is theirs")
  has not been changed, and retired notation survives in two internal working documents.

## Companion

[[2026-10-13-gradient-speedup|Why the estimator got faster: how the gradient is managed]] is the
computation the case study depends on.
