---
title: Master's Thesis Draft
type: thesis-draft
status: draft
created: 2026-04-21
updated: 2026-04-21
tags: [thesis, ddcm, m2]
related:
  - [[../../../3 - Permanent Notes/research-plan/MASTER_THESIS_OUTLINE]]
  - [[../../../3 - Permanent Notes/research-plan/RESEARCH_PLAN]]
---

# Master's Thesis Draft

| Item | Content |
|------|---------|
| Name | Azwan Nazamuddin |
| Affiliation / Year | Graduate School of Innovation and Practice for Smart Society, Hiroshima University / M2 |
| Supervisor | Prof. Makoto Chikaraishi |
| Thesis Title (tentative) | A Scalable Computational Framework for Activity-Based Dynamic Discrete Choice Models: Reachability, GPU Acceleration, and Baseline Estimation |
| Target Length | ~80–100 pages (excluding appendices) |
| Last Updated | 2026/04/21 |

---

> **How to use this draft**
>
> - This draft doubles as the "Research Overview Document" submitted for each lab meeting. Per-meeting discussion docs live in `meetings/<semester>/`.
> - For unwritten parts, `TODO:` markers are used so it is clear at a glance which sections are still blank.
> - The detailed planning outline — with tables, equations, and expected results — is kept in `3 - Permanent Notes/research-plan/MASTER_THESIS_OUTLINE.md`. This draft is the prose version; the outline is the scaffold.
> - Update this draft before each meeting. Old versions are preserved through Git history.

---

## Chapter 1. Introduction (~10 pages)

### 1.1 Motivation

<!-- Activity-based travel demand modeling; computational gap in DDCMs at city scale; Västberg et al. (2020) benchmark; consequence: planners fall back to sequential static models. -->

TODO:
- **Have:** `MASTER_THESIS_OUTLINE.md` §1.1 framing; `260419 - Master Thesis Progress.md` §1 bullets.
- **Need:** One concrete policy example (e.g. Higashi-Hiroshima transport-demand context); Västberg (2020) benchmark citation resolved to `@vastberg...`.
- **Write:** ~2 pages. Policy case for activity-based demand → narrow to DDCMs → Västberg (2020) 10 s/agent / 1,000 CPU-day benchmark → "planners fall back to sequential static" consequence.

### 1.2 The Two Barriers

<!-- Frame two distinct problems. -->

- **Barrier 1 — Computational Intractability.** 8-dimensional state space ≈ 146M theoretical states; naive BI ≈ 69 h / 6.7 TB. Structural (curse of dimensionality), not hardware.
- **Barrier 2 — Estimation Difficulty.** Recovering θ requires repeatedly solving the DP. NFXP, MPEC, CCP, sampling each have limits at scale; no scalable method delivers analytical SEs without nested DP.

TODO:
- **Have:** Two-barrier framing already written as bullets; 146M / 6.7 TB / 69 h numbers from §3.1, §4; §2.5 comparison table (NFXP / MPEC / CCP / sampling / TD / PUM).
- **Need:** One-sentence preview for each estimation method so the reader understands the gap; reference for "no scalable method" claim.
- **Write:** Expand each bullet into ~1 page. Cross-reference §3.1 for state-space derivation. Close with the gap line as bridge into §1.3.

### 1.3 Research Objectives (Master Scope)

| # | Objective |
|---|-----------|
| O1 | Develop a scalable computational framework for large-scale DDCMs using reachability-based state pruning and GPU-accelerated dynamic programming. |
| O2 | Implement and evaluate a sampling-based estimation pipeline for activity-based DDCMs; characterise its performance and identify fundamental limitations. |

*O1 resolves Barrier 1. O2 addresses Barrier 2 partially, identifies remaining gaps, and motivates future work (PhD).*

### 1.4 Scope and Contributions

- Geographic scope: Higashihiroshima, Japan (144 zones)
- Data: N=200 persons (pilot) / N=3331 valid (K=8 model), person-trip travel survey
- Hardware: NVIDIA GTX 1080 Ti (commodity GPU)

**Master contributions:**

1. First integration of reachability analysis with DDCM backward induction.
2. GPU-accelerated DP via CSR sparse graph format.
3. RMDP abstraction reducing per-agent graph cost.
4. Empirical characterisation of identification limits in sampling-based DDCM estimation.

TODO:
- **Have:** Scope bullets (geography, data, hardware) and four contribution bullets already listed.
- **Need:** Decision — does the final thesis use classic Västberg utility or the μ(t) reframing from `260419` §3.3? Affects contribution wording and cross-chapter consistency.
- **Write:** 1–2 paragraphs linking the four contributions to Objectives (1–3 → O1; 4 → O2) and framing them as a pipeline: reachability (§4.2) → sparse graph (§4.3) → GPU BI (§4.4) → RMDP (§4.5), feeding Ch. 5 estimation, which exposes contribution 4.

### 1.5 Thesis Structure

TODO:
- **Have:** Chapter scaffold (this draft).
- **Need:** Stable chapter structure — wait until Ch. 4–6 first drafts are done.
- **Write:** One paragraph per chapter (~3 sentences). Template: "Chapter X develops [topic]; it [key method/result]; leading into Chapter X+1 which [next]." Finalise last.

---

## Chapter 2. Background and Literature Review (~15 pages)

### 2.1 Activity-Based Travel Demand Models

<!-- Why activity-based: derived demand, intertemporal consistency, welfare measurement. Hägerstrand (1970) → TRANSIMS/MATSim → sequential/simultaneous/DDC classification. Case for DDCMs. -->

TODO:
- **Have:** Reference list (Hägerstrand, TRANSIMS, MATSim) in `MASTER_THESIS_OUTLINE.md` §2.1.
- **Need:** Decide depth — full lit review or just enough context to motivate DDCMs.
- **Write:** ~2 pages. Close with one paragraph motivating the shift to DDCMs (welfare-consistent logsum is the payoff).

### 2.2 Dynamic Discrete Choice Models: Theory

<!-- Rust (1987); Bellman equation; logit DDCM (EV errors, logsum, softmax); NFXP; finite-horizon BI. -->

TODO:
- **Have:** Rust (1987), logit-DDCM derivation portable from APTE paper §2 (`4 - Projects/ddcm/`).
- **Need:** Confirm notation consistency with Ch. 4–5 (s, a, θ, V̄).
- **Write:** ~3 pages. Include Bellman equation and logit-DDCM derivation inline; reference Appendix A.1 for the full derivation.

### 2.3 DDCMs in Transport

<!-- Recursive logit (Fosgerau, Frejinger & Karlström 2013); Västberg et al. (2020) as direct predecessor (state space, utility, sampling methods 1 & 2, computational limits); Västberg (2024) duration-dependent utility. -->

TODO:
- **Have:** `@vastbergDynamicDiscreteChoice2020.md` paper note in `2 - Source Notes/Papers/`; Västberg (2024) notes; Fosgerau, Frejinger & Karlström (2013) recursive-logit reference.
- **Need:** Short summary of recursive logit to position Västberg (2020) against it.
- **Write:** ~3 pages. Dedicate ~1.5 pages to Västberg (2020): state space, utility spec, Methods 1 & 2, computational limits that motivate Ch. 4. Closest section to the contribution.

### 2.4 Approaches to the Computational Curse

<!-- ADP (Powell 2007); state aggregation; sparse/reachable-only computation; GPU acceleration in transport; reachability from control systems (Bansal et al. 2017) and transport (Oyama & Hato 2019). -->

TODO:
- **Have:** Powell (2007) ADP reference; Oyama & Hato (2019) reachability.
- **Need:** Bansal et al. (2017) reachability-in-control paper lookup; one existing transport-GPU reference.
- **Write:** ~2 pages. End with Oyama & Hato (2019) as the bridge into §4.2 (reachability pruning).

### 2.5 Estimation Methods for DDCMs

<!-- Comparison table: NFXP (Rust 1987), CCP (Hotz–Miller 1993), MPEC (Su & Judd 2012), Sampling (Västberg 2020), TD (Adusumilli & Eckardt 2025), PUM (Fosgerau et al. 2024). Gap: no scalable method for discrete DAG DDCMs with analytical SEs. -->

TODO:
- **Have:** Comparison-table rows sketched in `MASTER_THESIS_OUTLINE.md` §2.5 (NFXP / CCP / MPEC / Sampling / TD / PUM).
- **Need:** Short paper summary per row (especially Adusumilli & Eckardt 2025 TD, Fosgerau et al. 2024 PUM).
- **Write:** ~3 pages. Build the comparison table first (method | key paper | approach | limitation), then prose per row. Close with the gap Ch. 5 confronts and the PhD resolves.

### 2.6 Relational MDPs

<!-- Boutilier, Reiter & Price (2001); role abstraction; application to spatial heterogeneity. -->

TODO:
- **Have:** Boutilier, Reiter & Price (2001) reference.
- **Need:** None.
- **Write:** ~1.5 pages. Keep short — just enough to ground §4.5.

### 2.7 Research Gap Summary

<!-- Short table mapping each gap to the thesis chapter that addresses it. -->

TODO:
- **Have:** Nothing — depends on §2.1–§2.6.
- **Need:** Stable content in §2.1–§2.6.
- **Write:** ~0.5 page. Table: Gap | Addressed in | How. Write last.

---

## Chapter 3. Model Specification (~12 pages)

### 3.1 The Higashihiroshima DDCM

<!-- Study area: Higashi-Hiroshima, 144 zones (CZONE_1..144); OD LOS data; 8-dimensional state space (time 97 × zone 144 × activity 8 × duration 33 × mode 8 × car_avail 2 × motorcycle_avail 2 × mandatory_history 4 ≈ 146M). -->

TODO:
- **Have:** State-space table in `MASTER_THESIS_OUTLINE.md` §3.1; APTE paper draft has this content.
- **Need:** Zone map figure (if produced) or geographical prose description; explicit 146M product footnote.
- **Write:** ~3 pages. Port state-space table.

### 3.2 Action Space

<!-- Action = (destination zone, transport mode, next activity). Feasibility: duration min/max, time windows (work 6–10 AM; child dropoff 7:30–9; pickup 2–5 PM); mode transitions; vehicle ownership. Terminal constraint: s_T = (1440, home). -->

TODO:
- **Have:** Feasibility rules listed in `MASTER_THESIS_OUTLINE.md` §3.2.
- **Need:** None.
- **Write:** ~2 pages. Numbered enumeration, one subsection per rule family (duration / time-window / mode-transition / ownership / terminal). Cross-reference §4.2 where these become BFS constraints.

### 3.3 Utility Function Specification

<!-- u_travel, u_activity, u_start; staying vs moving step utility. Västberg (2020) base with duration-dependent extension. -->

TODO:
- **Have:** u_travel / u_activity / u_start equations from `MASTER_THESIS_OUTLINE.md` §3.3; μ(t) reframing in `260419` §3.3.
- **Need:** **Decision pending** — classic Västberg spec vs μ(t) reframing. Affects §5 and §6.
- **Write:** ~3 pages. Equations in display math with parameter glosses. Distinguish staying vs moving step utility clearly.

### 3.4 Data Description

<!-- Person-trip survey (N=4700 loaded, 3331 valid, 217,885 steps, 35 timing-window groups); ownership rates (car 27.9%, motorcycle 2.3%, bicycle 17.7%). OD LOS (144×144=20,736 pairs; train_time=0 for 99.6% — sentinel). Zone attractiveness (commercial/cultural/restaurant floor size). -->

TODO:
- **Have:** N=4700 loaded / 3331 valid / 217,885 steps / 35 timing groups; ownership rates (car 27.9%, motorcycle 2.3%, bicycle 17.7%); `train_time=0` sentinel note from r14 report; raw data at `data/OD_LOS_new.csv`, `data/zone_attractiveness_verified.csv`.
- **Need:** Compute summary-stats table; document preprocessing steps.
- **Write:** ~3 pages. Three subsections (survey / OD LOS / zone attractiveness). Call out `train_time=0` explicitly — it drives the train-share mismatch in §5.5 Finding 2.

### 3.5 Transition Function

<!-- Deterministic s' = T(s,a); stay vs move; TERMINAL_STATE if t' > 1440. -->

TODO:
- **Have:** Stay / move / terminal cases in `MASTER_THESIS_OUTLINE.md` §3.5.
- **Need:** None.
- **Write:** ~1 page. Formalise T(s,a) per case. Keep short — interesting structure is in §3.2.

---

## Chapter 4. Scalable Computational Framework (~18 pages)

> **Status:** Content complete. Core source: ICMC 2025 + APTE 2026. Writing status: first draft to be assembled from existing reports.

### 4.1 The Computational Problem

<!-- 146M states → ~69 h / 6.7 TB naive; ~1% of states are physically reachable. -->

TODO:
- **Have:** 146M / 69 h / 6.7 TB numbers (derived in §3.1).
- **Need:** None.
- **Write:** ~1 page. State the naive budget; end with the insight that only ~1% are physically reachable. Motivates §4.2–§4.5.

### 4.2 Reachability-Based State Pruning

<!-- Algorithm 1: level-synchronous BFS from s₀ under feasibility rules. Connection to Hägerstrand space-time prism. Result: 146M → 1.5M states (99% reduction), 462M edges. -->

TODO:
- **Have:** Algorithm 1 pseudocode in `MASTER_THESIS_OUTLINE.md` §4.2; figures `forward_reachability_2d.png` and `forward_reachability_3d.png`; 146M → 1.5M / 462M edges result.
- **Need:** None.
- **Write:** ~3 pages. Include Algorithm 1. Discuss Hägerstrand space-time prism connection. Report the 99% reduction.

### 4.3 Sparse Graph Representation (CSR Format)

<!-- Dense 2.25×10¹² infeasible; avg ~300 outgoing edges per state → 462M edges. CSR arrays: edge_index, edge_next, edge_utility, state_offsets. Memory: 6.7 TB → 6.5 GB (fits GPU VRAM). -->

TODO:
- **Have:** CSR array layout in `MASTER_THESIS_OUTLINE.md` §4.3; memory numbers.
- **Need:** Small worked example (3–4 nodes) for illustration.
- **Write:** ~2 pages. Quantify dense 2.25×10¹² entries vs CSR 6.5 GB. End with "fits in GPU VRAM" as handoff to §4.4.

### 4.4 GPU-Accelerated Backward Induction

<!-- Algorithm 2: tensor BI over CSR. Gather V[s'], compute Q[e] = u[e]+V[s'] vectorised, logsumexp scatter-reduce. Embarrassingly parallel per edge/state. ~1.5 s per BI pass (GTX 1080 Ti). -->

TODO:
- **Have:** Algorithm 2 pseudocode in `MASTER_THESIS_OUTLINE.md` §4.4; ~1.5 s/BI-pass timing.
- **Need:** None.
- **Write:** ~3 pages. Include Algorithm 2. Explain gather → vectorised Q → scatter-reduce (logsumexp). Use "commodity GPU" in prose; move hardware brand details to Appendix C (writing-style rule).

### 4.5 RMDP Abstraction for Agent Heterogeneity

<!-- Problem: 144 home zones = 144 graphs. Insight: shared feasibility rules; home-zone is a role binding. Relational MDP: one universal graph, bind HOME_ZONE at runtime. Result: 144 → 1 graph. -->

TODO:
- **Have:** Role-binding insight in `MASTER_THESIS_OUTLINE.md` §4.5.
- **Need:** Short formalism for the role-binding operator.
- **Write:** ~2 pages. Frame the 144→144 naive problem, state the insight, report 144→1 graph. Note BI runs once; bindings apply at simulation time.

### 4.6 Optional Approximations

- **Linear VFA** — V(s) ≈ Φ(s)w; 9.1× speedup; error characterised.
- **Spatially Interpolated BI** — exact for subset, interpolate for others; 2.0× speedup.

TODO:
- **Have:** Linear VFA 9.1× and Interpolated BI 2.0× speedup numbers.
- **Need:** Specific error bounds (currently qualitative).
- **Write:** ~2 pages. Flag clearly as optional — default path (§4.2–§4.5) is exact. Qualitative language until error numbers are pinned down (avoid overclaiming).

### 4.7 Results

<!-- Table 4.1 (Computational Performance): 146M→1.5M states, 6.7 TB→6.5 GB memory, 69 h→105 s full pipeline (~2,400×), 121 ms→3.9 ms per-agent sim (31×). Table 4.2 (Approximation comparison). -->

TODO:
- **Have:** Table 4.1 rows in `MASTER_THESIS_OUTLINE.md` §4.7; Table 4.2 rows.
- **Need:** None.
- **Write:** ~2 pages with Tables 4.1 and 4.2. Lead with qualitative framing ("tractable at city scale"), then numbers (writing-style rule).

### 4.8 Behavioural Validation (Simulation Check)

<!-- 1,000 agents with mandatory WORK: 81% HOME at night; 43% at WORK 8–18h; mean 6.1 h work; 99.7% work starts within 6–10 AM; mean 3.25 trips/agent. -->

TODO:
- **Have:** 1,000-agent WORK simulation numbers (81% HOME at night; 43% at WORK 8–18h; mean 6.1 h work; 99.7% work starts 6–10 AM; mean 3.25 trips/agent).
- **Need:** None.
- **Write:** ~1.5 pages. Frame as simulation-level sanity check, not validation against observed survey (that is §5.4). Use "sanity check", not "validation".

---

## Chapter 5. Estimation — Baseline and Identification Analysis (~18 pages)

> **Status:** Phase A complete (NFXP r14 converged 2026-03-31, K=8, N=3331, LL=−159,560.31). Phase B pending (sandwich SEs, welfare ∂V̄/∂θ, MaxEnt-IRL verification).

### 5.1 Estimation Problem Setup

<!-- Given {y_n}_{n=1}^{N}, find θ* = argmax LL(θ); LL = Σ_n Σ_k log P(a_{n,k} | s_{n,k}; θ); V(s;θ) recomputed via BI for each θ candidate. -->

TODO:
- **Have:** LL objective formula in `MASTER_THESIS_OUTLINE.md` §5.1.
- **Need:** None.
- **Write:** ~2 pages. State LL with display equations. End on V(s;θ) pain point (recomputed per θ candidate) as motivation for §5.2.

### 5.2 Sampling of Alternatives (Västberg 2020 Method 2)

<!-- V̄ at reference θ₀; sample R=50 alternative paths via softmax(u+V̄); McFadden-corrected LL optimised with alternatives fixed. -->

TODO:
- **Have:** Method 2 algorithm in `MASTER_THESIS_OUTLINE.md` §5.2; McFadden (1978) reference.
- **Need:** McFadden correction derivation written out for Appendix A.2.
- **Write:** ~3 pages. Algorithm step-by-step. Close with caveats (frozen V̄ bias, sampling variance) that motivate NFXP (§5.3).

### 5.3 NFXP Implementation (r14)

<!-- GPU pipeline (K=8, N=3331): 30-min graph load (208.9 GB RAM, 35 groups); ~3.4s BI/group; ~208s/iter; Powell optimiser (gradient-free, handles GPU noise floor 0.012); 244 iters × 208s ≈ 14 h. Parameter estimates table (WORK 0.131, SCHOOL 0.113, SHOPPING +0.022, LEISURE 0.064, CHILD_DROPOFF −0.084, CHILD_PICKUP 0.131, HOME 0.100, CHANGE 0.000). Convergence: r12 → r13 → r14 (LL=−159,560.31). -->

TODO:
- **Have:** r14 parameter-estimate table (WORK 0.131, SCHOOL 0.113, SHOPPING +0.022, LEISURE 0.064, CHILD_DROPOFF −0.084, CHILD_PICKUP 0.131, HOME 0.100, CHANGE 0.000); convergence history r12→r13→r14, LL=−159,560.31; pipeline timings (~3.4 s BI/group, ~208 s/iter, ~14 h total).
- **Need:** None.
- **Write:** ~4 pages. Three subsections: (a) pipeline + Powell choice (*why* Powell: GPU noise floor 0.012 hides small gradients); (b) K=8 estimate table with interpretations; (c) convergence narrative. Qualitative framing first, numbers after. Hardware details to Appendix C.

### 5.4 Behavioural Simulation Results

<!-- Mode shares (motorcycle 80%, bicycle 7%, car 5%, walk 5%, bus 2%); activity time (home 66%, work 20%, school 6%, leisure 5%). Key: HOME dominates; CHANGE=0 meaningful (timing constraints sub for mode-change penalties). -->

TODO:
- **Have:** Mode-share and activity-time simulation tables from `simulation_metrics_nfxp.csv`.
- **Need:** Observed columns alongside simulated columns for side-by-side comparison.
- **Write:** ~2 pages. Dedicated paragraph for the CHANGE=0 substantive finding — timing constraints absorb the role of explicit mode-change penalties. Do not bury as an aside.

### 5.5 Identification Analysis

<!-- Novel contribution. Gradient diagnostic at θ*: -->

- **Finding 1 — Gradient scale disparity (286× ratio).** |∂LL/∂θ_activity| ~ 700–2400 vs |∂LL/∂θ_mode| ~ 5–8 → derivative-free optimisers terminate before mode constants converge.
- **Finding 2 — Mode diversity mismatch.** Observed vs alternative shares for CAR, TRAIN, BICYCLE; train_time=0 sentinel bug fix; residual car under-representation.
- **Finding 3 — Household car sharing not captured.** 72.1% non-car-owners, 37.5% of whom use car (household-level access not in individual data).

**Structural interpretation.** Mode constants not recoverable from N=200 individual paths: near-zero within-person mode variation; mode-constant identification needs cross-person variation under controlled conditions; LL landscape near-degenerate in mode-constant directions. **Implication:** data structure limitation, not model limitation. Fixing mode constants at reference values does not bias activity parameters.

TODO:
- **Have:** Three findings with numbers (286× gradient ratio; mode-diversity mismatch CAR 63.2%/15.0%, TRAIN 13.2%/48.4% pre-fix; household car-share 72.1% non-owners / 37.5% using car).
- **Need:** Gradient-diagnostic procedure written formally for Appendix A.3.
- **Write:** ~4 pages — **novel empirical contribution** of the thesis. One subsection per finding with figure/table. Finding 3 needs careful framing: honest "data structure limitation", not "model failure".

### 5.6 Standard Errors and Welfare ⏳ Pending

- **Sandwich SEs (Phase B0):** computation attempted (`nfxp_se_20260330_233406.csv`); SE values empty — rerun/debug needed.
- **Welfare measure V̄(s₀):** available from r14 BI at θ̂; not yet reported.
- **Welfare gradient ∂V̄/∂θ (Phase B1):** not yet computed. One additional backward pass (~1.5 s). Required for SE(CV) via delta method.
- **MaxEnt-IRL ≡ DDC-MLE verification (Phase B2):** not yet done. Would confirm Bridge 1 at 1.5M-state scale.

TODO:
- **Have:** r14 BI V̄(s₀) available but not reported; SE attempt file `nfxp_se_20260330_233406.csv` with empty values.
- **Need:** (1) Sandwich SE rerun/debug; (2) welfare gradient ∂V̄/∂θ (Phase B1, one extra BI pass ~1.5 s); (3) MaxEnt-IRL ≡ DDC-MLE check (Phase B2).
- **Write:** Blocked on Phase B. Leave section as ⏳ Pending until results land — makes missing content obvious.

### 5.7 NFXP: What Was Eliminated vs What Remains

<!-- Comparison table: frozen V̄ bias (eliminated), sampling variance (eliminated), McFadden correction (no longer needed), mode non-identification (unchanged — K=8 timing-pref spec bypasses), analytic gradient (gap), SEs (pending), welfare (pending). Motivates PhD Chapter 6. -->

TODO:
- **Have:** Comparison-table rows in `MASTER_THESIS_OUTLINE.md` §5.7.
- **Need:** None.
- **Write:** ~1.5 pages. Lead with the table (scannable), then short prose per row. Bridge to Ch. 6 — make "remaining gaps" column explicitly the PhD agenda.

---

## Chapter 6. Conclusion (~8 pages)

### 6.1 Summary of Contributions

- **Contribution 1 (Computational).** Reachability-based state-space pruning + GPU-accelerated DP: 146M → 1.5M states, 6.7 TB → 6.5 GB, 69 h → 105 s (~2,400×). Sparse graph + RMDP generalise to any finite-horizon DDCM with similar structure.
- **Contribution 2 (Empirical).** First end-to-end GPU NFXP estimation for a city-scale activity-based DDCM converged at 1.5M-state scale (K=8, N=3331, LL=−159,560.31). Individual timing windows eliminate need for explicit mode-change penalties. Behavioural simulation confirms sign-coherent recovery. SEs and welfare pending (Phase B).

TODO:
- **Have:** Contribution 1 and 2 bullet summaries.
- **Need:** None.
- **Write:** ~2 pages. One paragraph per contribution — what was achieved, how, why it matters. Do not re-state full numbers (those belong in Ch. 4/5).

### 6.2 Limitations

- N=200 small for a model with 24+ parameters; behavioural validation is qualitative.
- Constrained estimation (transport parameters fixed) loses mode-preference information.
- GPU implementation is NVIDIA-bound; portability limited.
- RMDP assumes exchangeable roles; does not capture within-zone heterogeneity.

TODO:
- **Have:** Four limitation bullets.
- **Need:** None.
- **Write:** ~2 pages. Honest framing — each limitation as *scope*, not fatal flaw. Data-structure limitation (N=200, household car-sharing) is most substantive; give it a dedicated paragraph rather than a single bullet.

### 6.3 Future Work: Toward Scalable Welfare-Preserving Estimation (PhD Direction)

<!-- NFXP baseline is exact and welfare-valid but ~14 h. Two bridges: Bridge 1 (Ermon 2015) MaxEnt IRL ≡ logit DDC MLE; Bridge 2 (Dudzik & Veličković 2022) DDCM BI ≡ 96-layer network over log-semiring. PhD builds Structural-IRL. Welfare preservation as hard constraint. -->

**Remaining gaps motivating the PhD:**

1. No analytic gradient → Powell only; Newton-Raphson with exact Fisher information would be more efficient.
2. No welfare SE(CV) → requires ∂V̄/∂θ (Phase B1) and sandwich SEs (Phase B0).
3. NFXP ~14 h → Phase C targets a welfare-preserving algorithm orders of magnitude faster.
4. Bridge 1 verified theoretically; empirical verification at 1.5M-state scale still needed (Phase B2).

TODO:
- **Have:** Four remaining-gaps list; Bridge 1 (Ermon 2015) and Bridge 2 (Dudzik & Veličković 2022) references.
- **Need:** Short framing of Structural-IRL and welfare-preservation as hard constraint.
- **Write:** ~3 pages. Introduce both bridges at conceptual level — keep heavy math out. Emphasise welfare consistency as a *hard constraint*, not an ergonomic preference (this is the contribution over the ML/AI-in-transport literature).

### 6.4 Concluding Remarks

TODO:
- **Have:** Nothing yet.
- **Need:** None.
- **Write:** ~1 page. Short closer: what was shown (city-scale DDCM is tractable without sacrificing welfare interpretation), what it enables (policy simulation, structural identification), what's next (PhD). No new numbers, no new citations.

---

## Appendices

### Appendix A. Mathematical Derivations

- A.1 Logit Bellman equation derivation
- A.2 McFadden (1978) correction for sampled alternatives
- A.3 Gradient diagnostic procedure (numerical Jacobian)

### Appendix B. Data Description

- B.1 Person-trip survey: sampling, variables
- B.2 OD Level of Service: sources, preprocessing
- B.3 Zone attractiveness: variables and summary stats
- B.4 Mode-ownership distribution by person

### Appendix C. Computational Details

- C.1 GPU implementation: PyTorch tensor ops used
- C.2 CSR construction algorithm
- C.3 Runtime profiling by pipeline stage
- C.4 Reproduction instructions (code and data)

### Appendix D. Estimation Details

- D.1 All estimation runs: parameters, LL trajectories
- D.2 Full gradient diagnostic output at K=24
- D.3 Sensitivity analysis: varying R (number of alternatives)
- D.4 Bug history and fixes

---

## References (Selected)

**Foundational DDCM.** Rust (1987); Hotz & Miller (1993); Västberg et al. (2020); Västberg (2024).

**Computational Methods.** Hägerstrand (1970); Oyama & Hato (2019); Boutilier, Reiter & Price (2001); Powell (2007).

**Estimation Theory.** McFadden (1978); Su & Judd (2012); Fosgerau, Paulsen & Rasmussen (2022); Adusumilli & Eckardt (2025).

Full reference list: `3 - Permanent Notes/research-plan/MASTER_THESIS_OUTLINE.md` § References.

---

## Appendix: Writing Status (Where I Am Now)

<!-- Status examples: Not started / Drafting ideas / Writing / First draft done / Revising / Finalized -->

| Chapter | Status | Notes |
|---------|--------|-------|
| Ch. 1 Introduction | Not started | Scaffold only. Fill 1.1 Motivation first. |
| Ch. 2 Background & Literature Review | Not started | Scaffold only. |
| Ch. 3 Model Specification | Not started | Scaffold only. Ch. 3 content available in APTE paper draft. |
| Ch. 4 Scalable Computational Framework | Drafting — content complete | Ch. 4 content fully available (ICMC 2025 + APTE 2026). Port into prose. |
| Ch. 5 Estimation — Phase A | Drafting — content complete | NFXP r14 results in hand. § 5.1–5.5 portable from Phase A reports. |
| Ch. 5 Estimation — Phase B | Not started | Sandwich SEs + welfare ∂V̄/∂θ pending. |
| Ch. 6 Conclusion | Not started | Depends on § 5.6 results. |

Phase-level status is tracked in `3 - Permanent Notes/research-plan/MASTER_THESIS_OUTLINE.md` § Current Status.
