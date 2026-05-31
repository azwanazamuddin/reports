# Meeting Document

| Item | Content |
|------|---------|
| Name | Azwan Nazamuddin |
| Meeting Date | 2026/06/01 |
| Previous Meeting Date | 2026/04/27 |

---

> **Notes on preparing this document**
>
> - **Write in proper sentences as much as possible.** Do not rely on bullet points alone; use prose where explanation is needed. If you cannot put something into clear sentences, there is a good chance you have not yet organized your own thinking well enough.
> - **Define the terms you use strictly.** Starting a discussion with ambiguous terms often leads to apparent agreement that turns out to be a misunderstanding. Always give explicit definitions for terms introduced for the first time, terms you define yourself, and terms that are used differently from prior work.
> - **When you include calculation or analysis results, upload the corresponding code separately to GitHub and provide a reference link in this document.** Without the code, the reproducibility and reliability of the results cannot be verified. Every figure, table, and numerical result must be accompanied by a link to the script that generated it.

---
%%
These instruction not spesificly only for this minutes. But for revise the index for other can be easily understand the "timeline":
- update the index.html to more be general friendly so all of lab members can understand easily. Show my current research title, brief introduction, and objectives. Setup also one section that show summary of progress that include: thesis draft status, technical prorgess (coding, estimation, stufff), papers/conferences/presentations
- for the contexts of conferences papers (APTE, ICMC), also positioning of both on my master thesis, include future plan based on JSPS proposal, please create "timline view" but it is not about timeline, it is just show phasing, that APTE and ICMC is focus on simulation algorithm, hEART (4 - Projects/heart) most of it have same level with master thesis, and the extension plan is JSPS proposal.
- after all of those section,  we can put all reports. Please show with "intuitive story", not very techinal even though it is techinal reports.
- and lets also move this report to the 3 - Permanent Notes/reports to show it on my reports webpage. For technical progress, i'll update again later let them blanks
-
%% 
## 1. What I Want to Discuss Today (Most Important)

1. **APTE paper revision** — The paper received a conditional acceptance. The reviewer raised three clarification points, and I have already drafted a response to each as minor additions to the discussion section. I would like to present the revisions and confirm they are appropriate before re-submission.

   | Reviewer point | Revision made |
   |---|---|
   | Estimation stability of the NFXP run | Added a paragraph on convergence behaviour and BHHH standard errors |
   | Sensitivity to 15-minute temporal discretization | Added a short limitation paragraph; noted that finer resolution is feasible within the pipeline |
   | Limitations of the welfare interpretation | Added a paragraph on four assumptions: error-scale invariance, monetary conversion, fixed supply side, and distributional effects |

   On the estimation side: the full estimation pipeline is operational and has been run successfully as a target. The results are not yet at a stage ready for inclusion in the paper, so the revision keeps the original framing and does not update the estimation section.

2. **Thesis Chapter 2 outline** — Chapters 1 and 3 are drafted. Chapter 2 (Background and Literature Review) is in progress. I would like to review the outline together to confirm the structure and depth before continuing to write.

   Planned sections: §2.1 Activity-Based Travel Demand Models · §2.2 DDCM Theory · §2.3 DDCMs in Transport · §2.4 Approaches to the Computational Curse · §2.5 Estimation Methods for DDCMs · §2.6 Research Gap Summary.

## 2. Current Situation (Progress Since Last Meeting)

### Writing and papers

- Received a conditional acceptance for the APTE conference paper. The reviewer raised three clarification points; I drafted response paragraphs for all three and have them ready for review.
- Drafted Chapters 1 and 3 of the master's thesis. Chapter 3 covers the model specification: state space, action space, utility specification, and transition function. Chapter 1 covers the motivation, the two computational barriers, research objectives, and scope and contributions.

### Writing — what is delayed

- Chapter 2 (Background and Literature Review, §§2.1–2.5) is in progress but not yet drafted.
- Chapter 3, §3.4 (Data Description) is blocked: summary statistics from the Higashihiroshima person-trip survey are still needed.

### Technical progress — to be filled 2026-05-31

> **D-1 placeholder.** Insert the latest estimation results from the remote device here before the meeting.

- *(estimation run status, parameters, LL — fill 2026-05-31)*

### Technical — what is delayed

- *(fill 2026-05-31)*

## 3. Definitions of Terms

| Term | Definition |
|------|------------|
| NFXP | Nested Fixed Point algorithm (Rust 1987): backward induction is solved exactly at every candidate parameter vector inside the outer maximum likelihood loop. |
| BHHH SE | Berndt–Hall–Hall–Hausman standard errors: the inverse of the outer product of individual score vectors, used as an alternative to the numerical Hessian. |

## 4. My Own Thoughts

### On discussion item 1 (APTE revision)

- **Current thought**: The three response paragraphs are ready for review. Each is scoped as a minor addition to the discussion section and does not change the paper's core results or framing.
- **Reasoning**: The reviewer's points are clarification requests, not fundamental objections. Responding with focused additions to §5 (Discussion) is proportionate and keeps the paper within the conference format.
- **Alternatives I considered**: Expanding the methodology section to address estimation stability more formally; but this would lengthen the paper beyond the page limit and is better placed in the thesis.

### On discussion item 2 (Thesis Chapter 2 outline)

- **Current thought**: 
- **Reasoning**: 
- **Alternatives I considered**: 

## 5. Where I Am Stuck / What I Cannot Decide on My Own

- *(technical — fill 2026-05-31)*

## 6. Things I Want to Confirm

- Are the three APTE revision paragraphs appropriate for re-submission as written?
- Is the Chapter 2 outline structure (§§2.1–2.6) acceptable to proceed with drafting?

## 7. Results / Figures (links to code required)

### 7.1 Writing deliverables

| Deliverable | Location | Status |
|---|---|---|
| APTE revision paragraphs (3 points) | `0 - Inbox/plan_20260522_apte_thesis.md` §1 | Draft ready |
| Thesis Ch1 (§§1.1–1.4) | `4 - Projects/thesis/main.tex` | Drafted |
| Thesis Ch3 (§§3.1–3.3, 3.5) | `4 - Projects/thesis/main.tex` | Drafted |
| Thesis Ch2 outline | `3 - Permanent Notes/research-plan/MASTER_THESIS_OUTLINE.md` | For review |

### 7.2 Technical update — fill on 2026-05-31

> **D-1 placeholder.** Insert the latest estimation report and any new figures here before the meeting. Include the session report path and code links.

| Result | Link to Code | Notes |
|--------|--------------|-------|
| *(latest run: parameters, LL, convergence status)* | *(link)* | *(fill 2026-05-31)* |
| *(BHHH SEs or Hessian status)* | *(link)* | *(fill 2026-05-31)* |
| *(any new diagnostic figures)* | *(link)* | *(fill 2026-05-31)* |

## 8. Supplementary Materials

- Session report 2026-05-07: `6 - Archives/2026/session-reports/session_report_20260507.md`
- Work plan 2026-05-22: `0 - Inbox/plan_20260522_apte_thesis.md`
- Master thesis outline: `3 - Permanent Notes/research-plan/MASTER_THESIS_OUTLINE.md`

---

## Action Items for Next Meeting (fill in after the meeting)

- [ ] 
- [ ] 
- [ ] 
