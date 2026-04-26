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

<!-- 5-move hourglass structure: societal (Move 1) → why timing/chaining (Move 2) → DDCM promise (Move 3) → computational barrier (Move 4, hourglass waist) → this thesis establishes feasibility. -->

TODO:
- **Have:** `MASTER_THESIS_OUTLINE.md` §1.1 now structured as 4-move runway into the waist.
- **Need:** One concrete Higashihiroshima policy example to anchor Move 1 locally (e.g. peak-hour congestion on Route 2, or ageing population transit access in outer zones).
- **Write:** ~2 pages following the 4-move structure below:

**Move 1 — Societal (½ page)**
Cities face welfare trade-offs in transport policy — congestion pricing, emissions, ageing populations, autonomous mobility. Planners need models that both predict behavioural response and measure welfare impact in monetary terms. Aggregate four-step models answer neither. [Cite: Vickrey 1969; Eliasson et al. 2009]

**Move 2 — Why timing and chaining (½ page)**
Policies work through *when* people travel and *which trips they chain*. Static models fail for three reasons (de Palma & Fosgerau 2011): departure time is endogenous; scheduling costs equal travel-time costs (empirically 0.5–1.5× value of time, Small 1982); time-varying policies have no static analogue. Trip-chaining — work, child drop-off, shopping — compounds the problem. [Cite: de Palma & Fosgerau 2011; Vickrey 1969 (bottleneck model); Small 1982 (schedule delay cost magnitudes — NOT Vickrey)]

**Move 3 — DDCM promise (½ page)**
Dynamic Discrete Choice Models (DDCMs) for activity-based travel demand (Västberg et al. 2020) answer both questions jointly: behavioural realism through dynamic utility maximisation, and a welfare measure through the log-sum value function (McFadden 1981; Small & Rosen 1981) — "a toll costs each household ¥X ± ¥Y per day". The model continues to be actively developed (McCarthy, Karlström & Västberg 2025). [Cite: Västberg et al. 2020; McFadden 1981; Small & Rosen 1981; McCarthy et al. 2025]

**Move 4 — Computational barrier (½ page)**
Exact computation requires backward induction through every reachable state. The state space grows exponentially: at Higashihiroshima scale, 146 million theoretical states, ~69 hours and 6.7 TB memory naive. At realistic city scale, Västberg et al. (2020) report ~1,000 CPU-days. Practitioners approximate — but approximation silently corrupts the welfare measure. This thesis demonstrates exact computation is achievable: reachability pruning reduces the state space by >99%, and GPU-accelerated backward induction completes in under 2 seconds at 1.5 million states. [Cite: Västberg et al. 2020]

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
| O1 | Develop a scalable computational framework for exact inference in activity-based DDCMs through reachability-based state pruning, sparse graph representation, and GPU-accelerated backward induction. |
| O2 | Demonstrate that city-scale DDCM is solvable exactly: implement NFXP estimation to convergence, recover coherent utility parameters, and characterise the identification structure of the estimated model. |

*O1 resolves Barrier 1. O2 resolves the core of Barrier 2 at master's scope — NFXP converges and parameters are recovered. Remaining open items (sandwich SEs, welfare gradient SE(CV)) are Phase B, documented in §5.6 as future work motivating the PhD.*

### 1.4 Scope and Contributions

- Geographic scope: Higashihiroshima, Japan (144 zones)
- Data: N=1,368 workers (current estimation subset), person-trip travel survey; full sample N≈3,000+ (pending expansion)
- Hardware: NVIDIA RTX 5090 32 GB (GPU estimation)

**Master contributions:**

1. **DAG framing** — DDCM as a Directed Acyclic Graph, enabling GPU-parallel level-by-level backward induction and shared-graph population handling.
2. **Reachability pruning** — forward BFS with Hägerstrand space-time prism constraints: 145M → 1.5M states (99% reduction), stored as CSR; exact, no approximation.
3. **μ(t) utility profiles** — time-varying marginal-utility specification (Supernak 1992; Joh et al. 2003) replacing hard time windows: activity timing and trip-making emerge from preference gradients, not model rules.
4. **Analytical gradient + NFXP estimation** — exact ∂ℓ/∂θ via second backward-induction pass; NFXP to convergence on city-scale data; identification analysis characterising the c_change likelihood ridge.

**Note:** RMDP abstraction was explored and dropped (see §4.5). The population-handling solution is the shared universal graph per activity-sequence group with individual constraints as masks (Contributions 1–2 jointly).

TODO:
- **Have:** Four contribution bullets resolved above.
- **Need:** None — utility spec decision resolved as μ(t).
- **Write:** 1–2 paragraphs linking the four contributions to Objectives (C1+C2+C3 → O1; C4 → O2) and framing them as a pipeline: DAG framing (§4.1) → reachability (§4.2) → sparse graph (§4.3) → GPU BI (§4.4) → μ(t) spec (§3.3), feeding Ch. 5 estimation.

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

<!-- Recursive logit (Fosgerau, Frejinger & Karlström 2013); Västberg et al. (2020) as direct predecessor (state space, utility, sampling methods 1 & 2, computational limits); McCarthy, Karlström & Västberg (2025) as most recent development — confirms research program is active and computational barrier remains open. -->

TODO:
- **Have:** `@vastbergDynamicDiscreteChoice2020.md` paper note; McCarthy et al. (2025) full paper at `ddcm-core/ddcm_duration.md`; Fosgerau, Frejinger & Karlström (2013) recursive-logit reference.
- **Need:** Short summary of recursive logit to position Västberg (2020) against it.
- **Write:** ~3 pages. Dedicate ~1.5 pages to Västberg (2020): state space, utility spec, Methods 1 & 2, computational limits that motivate Ch. 4. Add one paragraph on McCarthy et al. (2025) — confirms the KTH group is still actively developing SCAPER but the core computational barrier is unsolved. Closest section to the contribution.

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

### 2.6 Research Gap Summary

<!-- Short table mapping each gap to the thesis chapter that addresses it. -->

TODO:
- **Have:** Nothing — depends on §2.1–§2.5.
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

**Decision resolved: μ(t) is the thesis utility specification.** Classic Västberg schedule-delay penalties + hard time windows are described in §2.3 as the predecessor model. This thesis uses the μ(t) temporal profile framework.

**K=10 parameter set** (δ, α, β, β₁_shop, β₀_shop, β₁_leis, β₀_leis, c_change, μ_home, θ_travel). Full equations and profile types in `ddcm_slides/slides.md` §μ(t) and `260419` §3.3.

TODO:
- **Have:** Full μ(t) spec in `260419` §3.3; parameter table in `ddcm_slides/slides.md`.
- **Need:** None — spec is resolved.
- **Write:** ~3 pages. Four subsections: Home (flat floor), Work/School (piecewise δ/α/β), Shop/Leisure (P_open Gaussian-mixture), Travel (θ_travel scale). Display equations for each profile type. Close with the behavioural anchors (c_change and μ_home jointly set trip frequency). Grounded in Supernak (1992) and Joh et al. (2003) — do NOT frame as Västberg extension.

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

### 4.5 Shared Universal Graph and Population Handling

<!-- The RMDP abstraction track was explored and dropped (see 260419 §2, "What was dropped"). Current solution: shared universal DAG per activity-sequence group; individual constraints (home zone, work zone, diary windows) applied as masks at simulation time. -->

The naive approach builds one graph per agent (N separate graphs). The insight: agents of the same activity-sequence type (e.g. "worker with car") share the same feasibility rules and the same DAG structure. Individual constraints — home zone, diary time windows — are applied as **masks at simulation time**, not baked into the graph. Result: **one graph per activity-sequence group** covers the entire population. Four groups cover the Higashi-Hiroshima population.

**Note on RMDP.** A Relational MDP abstraction (Boutilier et al. 2001) with role-binding (HOME_ZONE as a runtime parameter) was explored as a more general formulation. It was dropped in favour of the simpler shared-graph-per-group approach: the RMDP formalism added theoretical overhead without changing the computational result.

TODO:
- **Have:** Shared-graph insight documented in `260419` §2 and §3.1; 4-group population structure in city-scale simulation.
- **Need:** Formal definition of activity-sequence group; enumeration of the 4 groups used for Higashi-Hiroshima.
- **Write:** ~1.5 pages. Frame the naive N-graphs problem, state the shared-graph insight, define the 4 groups, note masks. Keep RMDP as a brief footnote — do not build a section around it.

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

> **Status:** Phase A in progress (K=10, N=1,368 workers, BFGS + analytical gradient; best ℓ = −28,708.6, ‖∇ℓ‖∞ = 0.78 — partial convergence; c_change identification ridge under investigation). Phase B pending (sandwich SEs, welfare ∂V̄/∂θ, MaxEnt-IRL verification).

### 5.1 Estimation Problem Setup

<!-- Given {y_n}_{n=1}^{N}, find θ* = argmax LL(θ); LL = Σ_n Σ_k log P(a_{n,k} | s_{n,k}; θ); V(s;θ) recomputed via BI for each θ candidate. -->

TODO:
- **Have:** LL objective formula in `MASTER_THESIS_OUTLINE.md` §5.1.
- **Need:** None.
- **Write:** ~2 pages. State LL with display equations. End on V(s;θ) pain point (recomputed per θ candidate) as motivation for §5.2.

### 5.2 Sampling of Alternatives (Västberg 2020 Method 2)

<!-- V̄ at reference θ₀; sample R=50 alternative paths via softmax(u+V̄); McFadden-corrected LL optimised with alternatives fixed. -->

TODO:
- **Have:** Method 2 algorithm in `MASTER_THESIS_OUTLINE.md` §5.2; McFadden (1981) correction reference.
- **Need:** McFadden correction derivation written out for Appendix A.2.
- **Write:** ~3 pages. Algorithm step-by-step. Close with caveats (frozen V̄ bias, sampling variance) that motivate NFXP (§5.3).

### 5.3 NFXP Implementation (K=10, μ(t))

<!-- Current spec: K=10 μ(t), N=1,368 workers, 29 activity-sequence groups, BFGS with analytical gradient. ~22–31 min/iter (~5.9M states/group, ~7 GB GPU). Partial convergence as of April 2026: best LL=−28,708.6, ‖∇ℓ‖∞=0.78, c_change hit lower bound. See 260419 §7 and ddcm_slides/slides.md. -->

**Pipeline.** Outer BFGS over K=10 parameters; inner backward induction on the pruned DAG for V̄(s;θ) and log-likelihood evaluation. Gradient via **analytical differentiation of the Bellman recursion** (Fosgerau et al. 2013): a second BI pass propagates ∂V̄/∂θ backward at the same cost order as the inner BI — exact, no finite differences.

**Current estimation status (April 2026, best checkpoint iter 19):**

| Parameter | Description | θ̂ |
|---|---|---|
| δ | On-schedule utility (per min) | 0.0266 |
| α | Earliness penalty rate | 0.00102 |
| β | Lateness penalty rate | 0.00300 |
| β₁_shop | Shop P_open sensitivity | 0.281 |
| β₀_shop | Shop base utility | −0.871 |
| β₁_leis | Leisure P_open sensitivity | 0.353 |
| β₀_leis | Leisure base utility | −0.162 |
| c_change | Activity-switching cost | **−2.500 ⚠ bound** |
| μ_home | Home floor utility | 0.102 |
| θ_travel | Travel disutility scale | 2.00 |

Best ℓ = −28,708.6 · ‖∇ℓ‖∞ = 0.78 (threshold 0.001) · **partial convergence** — BFGS terminated at iter 35 with precision-loss message; c_change pinned at lower bound. δ and μ_home carry the expected positive signs.

> **Status:** ⏳ Estimation pending full convergence. See §5.5 for identification diagnosis and §5.6 for pending items.

TODO:
- **Have:** K=10 parameter table from `260419` §7.2; pipeline description from `260419` §7.1 and `ddcm_slides/slides.md`.
- **Need:** Final converged parameter table (pending c_change resolution).
- **Write:** ~4 pages. Three subsections: (a) pipeline + BFGS + analytical gradient (why analytical: exact and same cost as inner BI); (b) current estimates with status; (c) convergence narrative. Replace this table with final converged estimates when available. Hardware details to Appendix C.

### 5.4 Behavioural Simulation Results

<!-- Mode shares (motorcycle 80%, bicycle 7%, car 5%, walk 5%, bus 2%); activity time (home 66%, work 20%, school 6%, leisure 5%). Key: HOME dominates; CHANGE=0 meaningful (timing constraints sub for mode-change penalties). -->

TODO:
- **Have:** Mode-share and activity-time simulation tables from `simulation_metrics_nfxp.csv`.
- **Need:** Observed columns alongside simulated columns for side-by-side comparison.
- **Write:** ~2 pages. Dedicated paragraph for the CHANGE=0 substantive finding — timing constraints absorb the role of explicit mode-change penalties. Do not bury as an aside.

### 5.5 Identification Analysis

<!-- K=10 μ(t) estimation: c_change identification ridge. Source: 260419 §7.3–7.4. -->

**Observed behaviour in current run.** $c_\text{change}$ is pinned at its lower bound (−2.500) from early iterations; the gradient w.r.t. $c_\text{change}$ remained negative throughout. BFGS plateaued for 13 consecutive iterations at $\ell \approx -28{,}709$ before the *"desired error not necessarily achieved due to precision loss"* termination at iter 35. Activity parameters ($\delta$, $\alpha$, $\beta$, activity intercepts) barely moved from warm-start values. $\theta_\text{travel}$ ran off to 2.0, roughly double the MNL-aligned prior.

**Suspected identification ridge.** The likelihood has a **shallow ridge along the $c_\text{change}$ direction**. Because $c_\text{change}$ enters twice per trip (once per leg of each activity switch), it controls trip frequency regardless of activity utility. When $|c_\text{change}|$ is large, inertia reproduces any observed schedule, absorbing the data's information about activity utilities into the switching cost — making those parameters weakly identified. This is an **identification issue, not an optimiser issue**: multi-start BFGS, tighter tolerances, or different step rules cannot fix a flat ridge.

**Three-step diagnosis (in progress):**

1. **Score-sign check.** Compute $\partial\ell/\partial c_\text{change}$ over a range of $c_\text{change}$ values; determine whether the gradient ever changes sign. If observed trip count exceeds predicted trip count at every reasonable $c_\text{change}$, the gradient is negative by construction and identification fails on structural grounds. Cost: design work only — no extra compute.
2. **Profile-likelihood sweep** over $c_\text{change} \in \{-2.5, -2.0, -1.5, -1.0, -0.5, -0.3, 0\}$: seven warm-started BFGS runs (≈1–2 h each) at fixed $c_\text{change}$ values. Directly visualises the ridge. If $\ell$ is flat across this range, $c_\text{change}$ is not separately identified. If $\ell$ has a clear peak, that value is the concentrated MLE.
3. **Paper-ready fallback:** fix $c_\text{change}$ at the MNL switching-cost prior (−0.3) and estimate the remaining 9 parameters. Yields a fully identified submodel, presented honestly as *"conditioning on the MNL switching-cost prior."* One overnight run.

**Structural interpretation.** If the ridge is confirmed, it is a **model-scope limitation** for the current data: the survey records individual trips but not the time-varying identity of co-travellers or chained-activity patterns that would separately pin the switching cost. Fixing $c_\text{change}$ does not bias the activity-utility parameters — it removes a degenerate basin from the search space and restores identifiability of the remaining nine parameters.

TODO:
- **Have:** Observed run behaviour and ridge diagnosis from `260419` §7.3–7.4; three-step plan.
- **Need:** Results of score-sign check (step 1) and profile-likelihood sweep (step 2) — expected within 2–3 weeks.
- **Write:** ~3 pages. Lead with the observed run behaviour (table of per-iteration LL if available), then explain the ridge mechanism, then present the diagnosis steps and results once available. Close with the structural interpretation — frame as model-scope limitation, not estimation failure.

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

<!-- Comparison table: frozen V̄ bias (eliminated), sampling variance (eliminated), McFadden correction (no longer needed), analytic gradient (implemented — Phase A), SEs (pending — Phase B0), welfare ∂V̄/∂θ (pending — Phase B1), MaxEnt-IRL check (pending — Phase B2). Motivates PhD Chapter 6. -->

TODO:
- **Have:** Comparison-table rows in `MASTER_THESIS_OUTLINE.md` §5.7.
- **Need:** None.
- **Write:** ~1.5 pages. Lead with the table (scannable), then short prose per row. Bridge to Ch. 6 — make "remaining gaps" column explicitly the PhD agenda.

---

## Chapter 6. Conclusion (~8 pages)

### 6.1 Summary of Contributions

- **Contribution 1 — DDCM as a DAG (Theoretical Framework).** Reformulated activity-based DDCM as computation on a time-ordered directed acyclic graph. Each time level is an independent layer; backward induction is a forward pass over the DAG. This framing makes GPU parallelism structurally natural and opens the door to the two PhD-direction bridges (GNN and RL).
- **Contribution 2 — Reachability-Based State-Space Pruning (Computational).** Forward BFS with Hägerstrand space-time prism constraints removes states no feasible itinerary can reach. Applied to a 144-zone Higashi-Hiroshima network: 145M → 1.5M states (99% reduction), 6.7 TB → 6.5 GB memory, ~69 h → ~105 s wall time. Stored as a CSR sparse graph; one universal DAG per activity-sequence group, with individual reachability as a mask.
- **Contribution 3 — μ(t) Smooth Utility Profiles (Behavioural Specification).** Replaced hard time-window rules with continuous marginal-utility profiles μₐ(t), grounded in Supernak (1992) and Joh et al. (2003). K=10 parameters; activity timing, duration, and trip chaining emerge endogenously from preference comparison. Simulated agents reproduce work peak timing, leisure spreading, and home dominance without any hard scheduling rules.
- **Contribution 4 — Analytical Gradient + NFXP (Estimation).** Implemented the analytical score ∂ℓ/∂θ via a second backward-induction pass (Fosgerau et al. 2013), replacing finite differences or derivative-free search. Outer BFGS drives convergence; each gradient evaluation costs 2× BI, not 20×. Current run (K=10, N=1,368 workers): partial convergence at ℓ = −28,708.6 with c_change identification issue under active diagnosis.

TODO:
- **Have:** Four contribution bullets, aligned with April 2026 presentation and `260419`.
- **Need:** Final converged estimates (pending c_change resolution) to update C4 status line.
- **Write:** ~2 pages. One paragraph per contribution — what was achieved, how, why it matters. Do not re-state full numbers (those belong in Ch. 4/5). Note explicitly that RMDP was explored during framework design and dropped in favour of the shared-graph-per-group approach.

### 6.2 Limitations

- N=1,368 workers; behavioural simulation and model validation are qualitative at this stage. Welfare estimates pending SE computation.
- Transport LOS parameters (travel time, cost) are locally estimated from Higashi-Hiroshima MNL mode choice data (unpublished); treated as fixed in NFXP estimation — constrained estimation loses mode-preference variance.
- GPU implementation targets CUDA (NVIDIA RTX 5090); portability to AMD or Apple hardware requires kernel re-implementation.
- $c_\text{change}$ identification: switching cost is not separately identified from activity utilities under the current survey structure; diagnosis and paper-ready fallback are in progress (§5.5).

TODO:
- **Have:** Four limitation bullets, updated to K=10/current status.
- **Need:** None.
- **Write:** ~2 pages. Honest framing — each limitation as *scope*, not fatal flaw. The c_change identification issue is the most substantive; give it a dedicated paragraph, framing it as a data-structure limitation (no within-person mode-switching variation to pin the cost) rather than a model failure.

### 6.3 Future Work: Toward Scalable Welfare-Preserving Estimation (PhD Direction)

<!-- NFXP baseline is exact and welfare-valid but ~14 h. Two bridges: Bridge 1 (Ermon 2015) MaxEnt IRL ≡ logit DDC MLE; Bridge 2 (Dudzik & Veličković 2022) DDCM BI ≡ 96-layer network over log-semiring. PhD builds Structural-IRL. Welfare preservation as hard constraint. -->

**Remaining gaps motivating the PhD:**

1. Welfare SEs not yet computed: sandwich SEs require ∂V̄/∂θ (Phase B1, one extra BI pass ≈1.5 s) and SE sandwich matrix (Phase B0 — debug run needed). Without these, CV confidence intervals are unavailable.
2. NFXP iteration cost ~22–31 min: each BFGS step requires two full backward-induction passes over 1.5M states. Acceptable at K=10 but will not scale to the full population (N≈3,000+) or to policy-counterfactual sensitivity analysis.
3. Bridge 1 (Ermon 2015: MaxEnt IRL ≡ logit DDC) verified theoretically; empirical verification at 1.5M-state scale with the DDCM likelihood still needed (Phase B2). Until verified, Structural-IRL remains grounded in theory alone.
4. Structural-IRL algorithm not yet built: Phase C is the PhD research direction — a welfare-preserving faster-than-NFXP algorithm derived from the two bridges (GNN backward pass via Bridge 2; MaxEnt RL objective via Bridge 1) with Z(θ) = exp(V̄(s₀;θ)) kept intact as a hard constraint.

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
- A.2 McFadden (1981) correction for sampled alternatives
- A.3 c_change identification diagnostic: score-sign check and profile-likelihood sweep

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

**Estimation Theory.** McFadden (1981); Su & Judd (2012); Fosgerau, Paulsen & Rasmussen (2022); Adusumilli & Eckardt (2025).

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
