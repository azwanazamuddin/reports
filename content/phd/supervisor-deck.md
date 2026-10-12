---
title: "The supervisor deck: how Paper A is framed for a working session"
type: report
status: draft
created: 2026-10-13
updated: 2026-10-13
tags: [phd, paper-a, constraint-heterogeneity, slides]
---

> [!warning] Pre-supervisor, 13 October 2026
> Notes on the deck prepared for the supervisor session, not a result. Where this page and the
> working documents disagree, the working documents win.

## Status

The deck is **42 slides**, down from 60. It frames Paper A as a constraint-heterogeneity paper and is
built for a working session, not a talk. The last full layout check was clean: 0 of 42 slides clipped
or running under the footer. The PDF was re-exported on 13 October and is 42 pages.

## Structure

| Part | What it argues |
|---|---|
| 1 · Why reframe (5 slides) | a day is built from what is possible, that differs by person, and a model that cannot carry it reads constraint as preference |
| 2 · Where we sit (18 slides) | the standard model, then the same model as a perturbed-utility problem, then the **two slots** (perturbation and domain), then the gap against Oyama and Hato and against Yao and Zhang |
| 3 · Embedding constraints (5 slides) | classify a constraint by what it reads, build versus mask, one sweep per distinct mask, with the concessions |
| 4 · Paper A (5 slides) | the nine-section outline, each section broken into points |
| 5 · Where it leads (2 slides) | two directions: coupling, and the feasible set as a measure |

## Main decisions

- **The positioning uses Yao and Zhang only.** An equation that used to appear in the deck was deleted
  because its only source was a photographed conference slide. The argument now runs through the two
  slots at one state, then Yao and Zhang's flow result (their Proposition 3, equation 18 and Lemma 3).
- **Our feasible set is defined inside the surplus.** The open actions $A_n(s)$ enter only through the
  domain, giving $\Delta(A_n(s))$, with the value and policy for person $n$ as the deck's new
  equation (9). Over flows it is $X_n$ in the new (10).
- **A constraint is defined as a fact about the person**: attributes and a rule, fixed before
  estimation. It therefore belongs in the domain at any perturbation. Staying at Shannon is a separate
  choice, made for the welfare reading.
- **Scope cuts:** the case study, the backup, the measured-cost slides, the "classification
  generalises" and "fourth case" slides, Beyond Shannon, and the cyclic-networks direction.

## Findings and corrections

- **Yao and Zhang's feasible set is indexed by user class** (their section 4.1), so earlier wording
  that it had no index was wrong. The gap that holds is narrower: **nobody carries a mask per person
  on one shared structure**, or asks how many distinct masks a population needs. The research page
  was corrected the same day; it had cited a conference keynote that rests on a photographed slide.
- **The cyclic case is well posed** under their conditions B1 (reachability) and B2. What is open is
  the per-person cost of the solves. A mask can remove a state's only exit, so B1 has to be checked
  per person, which is what the backward cone does on the day graph.
- **Exact zeros and "every option counts" are one knob.** A finite slope at zero of the perturbation
  gives exact pruning but only weak option value. An infinite slope gives full support and the
  capability reading. Checked numerically on the Tsallis family.
- **Estimation.** For Shannon the Fenchel-Young loss equals our log-likelihood. Yao and Zhang's 2026
  paper has no estimation. Their 2025 abstract has a regression method that needs many observations
  per state, which our data does not have.
- **Notation made consistent.** $\Omega$ is the perturbation, $H_s$ the surplus, $z_n$ the
  attributes, $B$ the balance matrix, $X$ and $X_n$ the flow sets. $\alpha$ is reserved for the
  Tsallis exponent.

Every derivation lives in the working formulation document, and the slides never carry an argument
that document lacks.

## Evidence caveats

> [!warning] Before quoting anything from the case study
> The deck has **no measured figures** on its slides. The case-study numbers in the Paper A outline
> come from the draft and were not re-verified. No converged estimate exists for the current
> specification; see [[cpu-speedup|the CPU report]].

- The accessibility and welfare section **has no number yet**.
- Only the sweep result is a theorem. The losslessness of pruning is **tested**, not proved, and the
  simulated review flagged the missing proofs as critical.
- Two statements remain **unverified**: that a mask cannot make the recursion unsolvable, and that
  restricting the action set works for nested families.
- The hEART 2026 slides are photographs and **not citable**. The Tokyo keynote exists only as page
  images.

## Open items

1. **References.** Hofbauer and Sandholm (2002), Fosgerau and McFadden (2012), Tan et al. (2024, 2026)
   and Yao and Zhang (2026, arXiv 2607.09568) still have to be entered in Zotero; the bibliography has
   not been touched.
2. **Attribution wording** in two internal literature notes ("the perturbed-utility framing is
   theirs") has not been changed.
3. **Retired notation** survives in two internal working documents; the deck and the formulation are
   consistent.

See [[paper-a|Paper A]] for the argument this deck is built to discuss.
