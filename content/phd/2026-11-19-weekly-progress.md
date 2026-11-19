---
title: "Weekly progress: 12 to 19 November"
type: report
status: draft
created: 2026-11-19
updated: 2026-11-19
tags: [phd, weekly, paper-a, manuscript, learning, game-theory, isttt]
---

**Full weekly post.** It completes the [half-week post of 16 November](/phd/2026-11-16-weekly-progress), which reported every Paper A run as finished and the first full draft of the manuscript.

> [!note] Case study numbers kept internal (from 19 November)
> Paper A is now under review by my supervisor. While it is, the case study's estimates, policy results, accessibility maps, the estimation reports and the results deck are kept in internal notes. Earlier posts were edited the same way. Synthetic (toy) results stay public.

## 1. In short

| Lane | Status |
|---|---|
| Paper A runs | all finished (synthetic experiments, case study estimate, policy analysis) |
| Paper A manuscript | **full draft v1 frozen on 17 November and pushed to Overleaf on 18 November; now under supervisor review** |
| Learning, main lane | linear algebra (MML chapter 2), at §2.7 |
| Learning, game theory | Tadelis chapters 1-2 done with a reading guide and a deck; chapters 3-4 next |
| Learning, Paper A proofs | pulled forward for the review: a one-page summary of every result, and the proofs line by line |
| ISTTT | call format checked; one candidate hypothesis added |

## 2. Paper A

**Manuscript v1.** The whole paper exists as a first full version: abstract, seven sections and the proofs (Section 7 of the [16 November post](/phd/2026-11-16-weekly-progress) lists what changed in each part). On 18 November the case study section was completed with the zones, the destination utility as estimated, and the size of the shared graphs, and the draft was sent for review.

**What stays public and what does not.** The synthetic experiments of Section 5 are toy results and stay in the [16 November post](/phd/2026-11-16-weekly-progress). The case study (estimate, fit, accessibility) is kept internal until the review is done.

**Still to do on the manuscript:**
1. highlights and the end-of-paper declarations;
2. supplementary material for the figures taken out of the main text;
3. one case study page that holds only figures and a table;
4. match the persons of the diary comparison to those in the likelihood, person by person.

## 3. Learning

**Status: in progress, week 1 of 9 before the ISTTT deadline.**

### How the learning is organised now

The plan was revised twice this week.
- **16 November:** before each deadline, learn only what that deadline uses. The first version planned all of the mathematical foundations before the targets; on day 2 the first chapter was about 40% done at the depth that actually produces understanding, which would have needed about 31 hours a week. The parts that are skipped now are done first after 15 January.
- **18 November, one rule for what and when:** everything before a deadline is chosen backward from a target in my own work (the camp presentation, the Paper A proofs, the ISTTT question). The **order** is set by urgency:

| Situation | Order |
|---|---|
| there is time until the target | foundation first |
| someone is waiting now (a review, a meeting) | explain first, derive later |
| nothing is waiting | book order, after 15 January |

Gates stay blank-paper derivations, so that learning on my own work does not turn into copying it.

| | Date | Target |
|---|---|---|
| Game theory study camp | **Sat 12 December** | present and fully understand Young's "stochastic adaptive dynamics" (Durlauf and Blume 2010) |
| ISTTT extended abstract | **Fri 15 January** | constraints versus preferences in perturbed utility |

About 177 hours to 15 January, about 20 a week.

### Progress this week

| Lane | Done | Next |
|---|---|---|
| **Linear algebra** (MML chapter 2) | §§2.1-2.7.3: systems of equations, vector spaces, independence, basis and rank, linear mappings | Fri 20: the rest of §2.7 and §2.8 (affine spaces); weekend: eigenvalues and eigendecomposition (chapter 4, the part the camp uses) |
| **Game theory** (Tadelis) | chapters 1-2 with a section-by-section reading guide and a 50-slide deck that builds each decision tree click by click | weekend: chapters 3-4 (normal-form games, dominance) |
| **Paper A proofs** | pulled forward for the review (rule above): a one-page sheet with each result's claim, why it is exact, what breaks it, and the likely question; the proof notes placed in the schedule and the roadmap | tonight: the proofs line by line, with the small example by hand; deriving the main theorem on blank paper stays in week 5 |
| **ISTTT** | call format checked (2,000-3,000 words, at most 6 pages, no separate abstract); a candidate fifth hypothesis | readings from week 5, after the camp |

**One finding from the proofs.** The induction that proves the main theorem (backward from the end of the day) is the same induction that proves the chain rule of Shannon entropy over paths. It does not go through for Tsallis entropy, because the weights become $p_i^{\alpha}$ instead of $p_i$. This links the Paper A proofs to the ISTTT question, and is now the running example in both lanes. It is my reading, not yet a result.

**ISTTT, candidate hypothesis (17 November).** Recursive perturbed utility is invariant to how the day is staged only under Shannon entropy. It is open, and is decided with the other four at the gates on 27 December and 3 January.
