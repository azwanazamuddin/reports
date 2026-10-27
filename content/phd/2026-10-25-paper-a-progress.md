---
title: "Paper A progress: where the manuscript stands"
type: report
status: draft
draft: true
created: 2026-10-25
updated: 2026-10-27
tags: [phd, paper-a, constraint-heterogeneity, manuscript]
---

Paper A is the foundation of the PhD and becomes thesis Chapter 4. This page records where the
manuscript stands on 25 October 2026. It replaces nothing: [[2026-10-13-paper-a-deck|the 13 October
page]] keeps the history of how the framing changed. The argument is presented in full in the
[[2026-10-25-phd-framework|PhD framework deck]], Part 2.

> [!warning] Working draft
> The manuscript has not been submitted or shared. The propositions are drafted and not yet read by the
> author. Literature checks marked provisional were made from abstracts and have to be read in full
> before they are cited.

## The paper in three sentences

1. **Question.** When can people whose constraints differ share one graph exactly, and what does each kind
   of constraint cost?
2. **Answer.** It depends on what the constraint reads. There are four mechanisms: drop the option once,
   build one graph per kind, mask each distinct pattern, or give a bound that is used up along the day
   (a time budget, for example) a different start node. A history axis covers constraints that need memory,
   and one kind does not reduce: a constraint that reads another person's choice. Heterogeneity is kept
   in full, commonality decides the cost, and nothing is approximated.
3. **Why it matters.** Without per-person feasibility a model reads "could not" as "did not want to". With
   it, at a cost that grows with the kinds of constraint and not with the number of people, accessibility
   and welfare per person become readable.

## What is not Paper A's

The paper builds on these and credits them:

| Mechanism | Owner |
|---|---|
| Layered acyclic graph, prism cone, mask inside the Bellman sum | Oyama and Hato (2019) |
| Feasible alternatives as paths with logit equivalence, one pass per tier, for one decision maker | Tran and Mai (2024) |
| Lossless exclusion; a state extension for constraints that depend on history, one threshold for everyone | Tran, Mai and Hoang (2025, arXiv) |
| Domain and objective, the feasible-set slot | Yao and Zhang (2026) |
| Accessibility as the value of the day, conditional on home and work | Naqavi et al. (2023) |

The relation to constrained MDPs (Altman 1999, expected-cost constraints) is **open, to discuss**: Paper A
restricts the domain, and whether the two connect is undecided.

Two boundaries were checked on 25 October (provisional, from abstracts):

- **Constraint versus preference is not an open question in general.** Manski (1977), Swait and Ben-Akiva
  (1987), Scott and He (2012) and Thorhauge, Vij and Cherchi (2021) already separate them. The misreading
  is therefore the motivation, not the novelty. The novelty is doing it exactly and affordably in a whole-day
  dynamic model.
- **Naqavi et al. (2023), read in full**, already compute the value of the day per person for every
  workplace zone and value a car per person. Paper A is not redundant with it: Paper A is about what the
  heterogeneity costs and how to classify it. Their own footnote on the cost of computing every zone
  supports Paper A's affordability problem. Paper A's welfare section must not repeat their exercise.

## Manuscript status, section by section

| Section | State |
|---|---|
| 1 Introduction | points; written last |
| 2 Constraints in activity-travel behaviour: a review | prose |
| 3 Dynamic discrete choice models: review, gap and objectives | prose for 3.1 to 3.7, with Tran and Mai and Tran, Mai and Hoang now cited; 3.8 objectives await the author's decision |
| 4 Model | prose. The classification table has **four kinds** (institutional, capability, anchor, interdependent), with capability in two forms: the means a person holds, and a budget used up during the day. A paragraph covers the memory axis |
| 5 Constraint heterogeneity and what it costs | 5.1, 5.2 and 5.4 prose; 5.3 points until the household toy exists |
| 6 Numerical experiments | points; the sweep ranges and axes await the author's decision |
| 7 Case study | waits for the re-estimate |
| 8 Accessibility and welfare | waits for the re-estimate |
| 9 Discussion | points; will state the gaps that start the next papers |
| Statements and proofs | **five propositions drafted with proofs**, to be read by the author |

The five propositions:

1. lossless masking on a shared graph;
2. one backward and one forward sweep per class;
3. the number of solves equals the number of distinct classes;
4. a bound used up along the day needs a different start node;
5. an interdependent constraint does not reduce (a counterexample).

## Gates before anything is written as a result

1. **Sharing gate** in the code: shared graph with masks against one graph per person, compared by logsum
   and gradient, on a fixture where the masks really differ.
2. **Start-node check**, if any case-study constraint is a budget (the second form of capability).
3. **Household toy**: two members, one car, as a joint graph; measures the growth and confirms that the
   interdependent kind does not reduce.
4. **Re-count** of distinct classes on the current specification.

## The case study's estimate

The model used for the [[2026-10-23-sip-seminar|SIP seminar]] was re-specified on 24 October: a new
public transport skim with an access-mode model, public transport time estimated rather than fixed,
constants for external public transport, shuttle-bus users dropped, and a repair to the diary clock. The
new estimate is running. Sections 7 and 8 wait for it, and no case-study figure enters the paper before
then.

## Next

1. Zotero entries for the new citations, then the scope paragraph on constraint versus choice in Section 4.
2. The sharing gate and the household toy in code.
3. The author's decisions on the objectives (3.8) and the experiment ranges (6), then run Section 6.
4. After the re-estimate: Sections 7 and 8, then the gate 4 count.
5. Section 9, the Introduction and the abstract, in that order.
