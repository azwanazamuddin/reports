---
title: Research Progress — M2, May 11, 2026
type: progress-report
status: draft
created: 2026-05-11
updated: 2026-05-11
tags: [ddcm, weekly-report, progress, m2, nfxp, jsps, estimation]
related:
  - [[260427 - Research Progress (M2, Apr 27, 2026)]]
---

# Meeting Document

| Item | Content |
|------|---------|
| Name | Azwan Nazamuddin |
| Meeting Date | 2026/05/11 |
| Previous Meeting Date | 2026/04/27 |

---

## 1. What I Want to Discuss Today (Most Important)

1. **K=10 estimation results and the work-start timing gap.** The full NFXP estimation has converged with all 10 parameters statistically significant (LL = −19,187). However, behavioral validation reveals that the model predicts agents begin work at approximately 14:51, whereas the observed average is approximately 8:30. I want to discuss whether this gap indicates a utility function misspecification that must be resolved before Phase B (welfare infrastructure), and what approach to take.

2. **JSPS proposal writing.** The 6-move hourglass narrative is finalized and all required citations are confirmed in the vault. I want to receive feedback on the overall argument and any content to expand or trim before final writing.

---

## 2. Current Situation (Progress Since Last Meeting)

### What I did

**Gradient debugging and bug fixes.** I identified and corrected two bugs in the NFXP analytical gradient computation. The first was the omission of forbidden-mask constraints from the gradient backward induction: states that are structurally impossible for a given agent (e.g., a home zone that is not theirs) were accumulating spurious gradient values. The second was a zone-ID indexing mismatch — the gradient code used 1-indexed activity-enum values to key the forbidden-mask dictionary, while the state tensor stores zone IDs as 0-indexed integers, causing the wrong home zone to be masked for every agent. Both bugs corrupted all gradient computations in every previous run. I validated the corrected gradient on 7 synthetic micro-graph test cases (7/7 pass).

**A3 diagnostic estimation.** With c_change fixed at −0.3 (the Hiroshima Household MNL prior), I estimated the remaining 9 parameters freely using BFGS with the corrected gradient. All 9 parameters converged to economically valid signs within 4 iterations (best LL = −35,584; delta = 0.041, mu_home = 0.062). This confirmed that the analytical gradient is working correctly.

**K=10 unconstrained estimation (BFGS).** Releasing c_change as a free parameter, I ran K=10 BFGS warm-started from the A3 best checkpoint. The key positive result: c_change found an interior MLE at −0.366, rather than drifting to −∞ as in all pre-fix runs. This confirms that the c_change identification failure was caused by the gradient bugs. The negative result: delta and mu_home both became negative at the best point (LL = −31,264), indicating the unconstrained optimizer entered an economically invalid region.

**K=10 L-BFGS-B estimation (final, bounded).** Switching to L-BFGS-B with lower bounds (delta ≥ 0, alpha ≥ 0, beta ≥ 0, mu_home ≥ 0; c_change ∈ [−5, 0.5]) and warm-starting from the A3 checkpoint, the optimizer converged in 18 iterations (LL = −19,187.07, 825 valid persons, 48,908 observed steps). BHHH standard errors were then computed from the analytical gradient scores. All 10 parameters are statistically significant (see Section 7).

**Work timing analysis.** I produced an interactive HTML report analyzing why the model predicts a substantially later work-start time than observed. The report includes per-parameter utility plots and simulation validation and is available at: [work_timing_analysis.html](https://azwanazamuddin.github.io/reports/ddcm/work_timing_analysis.html)

**Literature reviews.** I completed 11 new literature reviews, covering papers for JSPS proposal Moves 1–3 and background for Phase B. These are listed in Section 8.

**JSPS proposal outline.** The 6-move hourglass narrative structure is finalized. All papers cited in Moves 1–5 are now in the vault with full literature review notes. The LaTeX proposal is on Overleaf: [JSPS DC Proposal (read-only)](https://www.overleaf.com/read/bvjwznrzzrmp#d856a7)

**Thesis writing approach.** The `3 - Permanent Notes/reports/thesis` folder is now for research plans, writing notes, and TODOs only. Actual thesis writing has moved to Overleaf: [Thesis (read-only)](https://www.overleaf.com/read/tfvtfgnpjrrg#125dbf)

### What I could not do / What is delayed

**Full numerical Hessian.** Three attempts to compute the full numerical Hessian were killed by GPU out-of-memory errors from an external process on the shared machine. Only BHHH standard errors are available. The full Hessian (~9 hours, 66 evaluations) has not been reattempted.

**Behavioral validation.** The work timing analysis reveals a substantial discrepancy: the model predicts agents begin work at ~14:51, while the observed average is ~8:30. The source of this discrepancy — whether it is utility function misspecification, a data coverage issue, or an interaction between schedule-constraint parameters — has not yet been identified.

**Phase B (welfare infrastructure).** Phase B has not been started. It was held pending confirmation that the K=10 results are behaviorally valid. Whether to proceed to Phase B now or first resolve the timing gap is the central question for today's meeting.

---

## 3. Definitions of Terms

| Term | Definition |
|------|------------|
| NFXP | Nested Fixed-Point estimation: the full backward induction over the state space is solved exactly at every likelihood evaluation during optimization. No approximation of the value function. |
| L-BFGS-B | A bounded variant of the limited-memory BFGS quasi-Newton optimizer. "Bounded" means it enforces box constraints on parameters, used here to impose economic sign restrictions (e.g., delta ≥ 0). |
| BHHH | Berndt-Hall-Hall-Hausman standard error estimator. Approximates the Fisher information matrix as the outer product of individual score vectors. Used here as a substitute for the full numerical Hessian when GPU memory prevents the latter. |
| Forbidden masks | In backward induction: constraints that prevent agents from occupying structurally impossible home-zone states. Without these, invalid states accumulate spurious value-function contributions that corrupt the gradient. |
| Schedule delay cost | The disutility incurred when an agent arrives at work earlier (penalized at rate α per min²) or later (penalized at rate β per min²) than their scheduled start/end time. |
| Phase B | The welfare infrastructure phase: deriving and implementing the log-sum compensating variation measure from the DDCM value function (McFadden 1981; Small & Rosen 1981). |

---

## 4. My Own Thoughts

### On discussion item 1 — K=10 results and the work-start timing gap

**Current thought:** The work-start timing gap is a structural misspecification of the utility function. The estimated pre-schedule earliness penalty (α = 0.0011/min²) implies that working is worthwhile starting δ/α = 37 minutes before the scheduled start. However, the home reservation utility (μ_home = 0.062/min) is large relative to the net expected utility of departing for work in the early morning — accounting for travel cost and the pre-schedule penalty while the schedule has not yet started. The model therefore finds it rational for agents to stay home until much later in the day, when the on-schedule reward δ dominates.

**Reasoning:** This is structurally analogous to the c_change identification problem from earlier in estimation. Just as constant-marginal-utility SHOP/LEIS had no satiation mechanism to stop over-chaining, the current morning utility structure has no mechanism to make early departure attractive. A time-of-day preference component, or a richer representation of the morning congestion window, could address this.

**Alternatives I considered:** (a) Add a time-of-day attractiveness shifter for the commute-to-work morning period. (b) Revise how travel times are represented in the morning peak. (c) Accept the timing gap as a known limitation and proceed with Phase B, documenting it clearly in any paper. Option (c) is the fastest path forward, but risks building a welfare measure on a model that is qualitatively wrong on the most directly observable behavior.

### On discussion item 2 — JSPS proposal

**Current thought:** The 6-move hourglass is coherent and all citations are in place. The main remaining challenge is space: Moves 1–3 (background) must be tight enough to leave adequate room for Moves 4–5, where the originality of the contribution lies. Currently the document has detailed content for every move; the writing task is condensing, not expanding.

**Reasoning:** The JSPS committee evaluates (a) societal and academic significance, (b) originality, and (c) feasibility. Moves 1–2 address (a); Move 5 (welfare preservation criterion, Structural-IRL) addresses (b); the master thesis result (>99% state pruning, exact GPU BI) addresses (c). The bridge connector between Moves 4 and 5 is the hardest to write concisely but is the most distinctive part of the argument.

**Alternatives I considered:** (a) Trim Move 1 to one sentence and expand Move 5. (b) Collapse Move 2's three-point list to one sentence if the figure is reinstated. (c) Write the proposal in Japanese throughout — pending confirmation of language requirements.

---

## 5. Where I Am Stuck / What I Cannot Decide on My Own

- **Timing gap vs. Phase B priority.** I cannot determine on my own what degree of behavioral fit is required before the welfare measure is reliable. If the model mispredicts work-start timing by ~6 hours, any Phase B welfare estimate for a peak-hour congestion policy could be systematically wrong. Fixing the utility structure means another full estimation cycle — potentially weeks. I need the supervisor's judgment on whether Phase B can proceed with the current model (with the limitation documented), or whether the utility structure must be corrected first.

- **JSPS page allocation.** I cannot determine the right balance between accessible societal motivation (Moves 1–2) and technical depth (Move 4–5) without knowing the committee's expected reading focus. A transport economics committee would expect more Move 2 detail; a computational or CS-oriented committee would expect more Move 5 depth.

---

## 6. Things I Want to Confirm

- Is the BHHH standard error acceptable as the primary SE report for the hEART short paper, given that the full numerical Hessian was not computed?
- What is the submission deadline for the JSPS DC proposal, and should it be written in English or Japanese?

---

## 7. Computational Results / Figures

| Result | Link | Notes |
|--------|------|-------|
| Work timing analysis | [work_timing_analysis.html](https://azwanazamuddin.github.io/reports/ddcm/work_timing_analysis.html) | Model predicts work start ~14:51; observed ~8:30. Interactive utility plots. Code: private `ddcm` repo. |
| K=10 parameter estimates + BHHH SEs | Table below | LL = −19,187.07; 825 valid persons; 48,908 steps; 28 graph groups |

**K=10 Converged Parameters — L-BFGS-B, Analytical Gradient:**

| Parameter | Description | Estimate | SE (BHHH) | t-stat |
|-----------|-------------|----------|-----------|--------|
| δ | WORK on-schedule marginal utility (per min) | 0.04078 | 0.00030 | 136.5 *** |
| α | Pre-schedule earliness penalty | 0.00110 | 0.00036 | 3.1 ** |
| β | Post-schedule lateness penalty | 0.00301 | 0.00004 | 68.6 *** |
| β₁\_shop | SHOP attractiveness × P_open coefficient | 0.32328 | 0.01158 | 27.9 *** |
| β₀\_shop | SHOP base marginal utility (per min) | −0.79548 | 0.00271 | −293.3 *** |
| β₁\_leis | LEIS attractiveness × P_open coefficient | 0.39185 | 0.00104 | 377.4 *** |
| β₀\_leis | LEIS base marginal utility (per min) | −0.26516 | 0.00098 | −271.4 *** |
| c_change | Switching cost (per departure + arrival) | −0.30132 | 0.02842 | −10.6 *** |
| μ\_home | HOME reservation threshold (per min) | 0.06175 | 0.00018 | 342.8 *** |
| θ\_travel | Travel time cost scaling | 1.03633 | 0.01665 | 62.2 *** |

\*\*\*: \|t\| > 2.576 (1%), \*\*: \|t\| > 1.960 (5%)

---

## 8. Supplementary Materials

**New literature reviews this week:**

| Paper | Topic | Used for |
|-------|-------|----------|
| Eliasson et al. (2009) | Stockholm congestion trial: 22% traffic reduction, public opinion reversal after living experience | JSPS Move 1 — societal motivation |
| Small (1982) | Empirical schedule delay costs: w_p ≈ 0.5×wage, w_j ≈ 1.5×wage | JSPS Move 2 — why timing matters |
| McFadden (1981) | Log-sum welfare measure — Williams-Daly-Zachary theorem | JSPS Move 3 + Phase B welfare foundation |
| Small & Rosen (1981) | Compensating variation for discrete choice goods | JSPS Move 3 + Phase B welfare foundation |
| Keane & Wolpin (1994) | Value-function interpolation (simulation + interpolation) | Background — positioning against approximate methods |
| Rust (1997) | Randomization to break the curse of dimensionality | Background — DDCM computational complexity framing |
| Kalouptsidi (2021) | Identification of counterfactuals in DDCM | Phase B — partial identification of welfare measures |
| Bajari, Benkard & Levin (2007) | Two-step estimation for dynamic games | Background — two-step vs. NFXP strategies |
| Tsitsiklis & Van Roy (1997) | TD learning convergence with function approximation | Phase C background — Bridge 1 theoretical foundation |
| Van Hulsel et al. (2009) | RL-based activity-travel simulation (pre-MaxEnt IRL era) | Phase C background — Bridge 1 historical context |
| Fosgerau et al. (2024) | Estimating PUM route choice with individual-level data | Phase B/C background — individual-level estimation |

**Links:**

- JSPS proposal (Overleaf, read-only): [https://www.overleaf.com/read/bvjwznrzzrmp#d856a7](https://www.overleaf.com/read/bvjwznrzzrmp#d856a7)
- Thesis (Overleaf, read-only): [https://www.overleaf.com/read/tfvtfgnpjrrg#125dbf](https://www.overleaf.com/read/tfvtfgnpjrrg#125dbf)
- Session reports: [`session_report_20260427.md`](../../../../0%20-%20Inbox/comingFromCode/session_report_20260427.md) · [`session_report_20260430.md`](../../../../0%20-%20Inbox/comingFromCode/session_report_20260430.md) · [`session_report_20260507.md`](../../../../0%20-%20Inbox/comingFromCode/session_report_20260507.md)

---

## Action Items for Next Meeting (fill in after the meeting)

- [ ] 
- [ ] 
- [ ] 
