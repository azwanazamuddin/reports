---
title: Research Progress — M2, June 23, 2026
type: progress-report
status: draft
created: 2026-06-23
updated: 2026-06-23
tags: [ddcm, weekly-report, progress, m2, nfxp, recovery, identification, sampling-of-alternatives, rl, approximation-error, estimation]
related:
  - [[260601 - Research Progress (M2, Jun 1, 2026)]]
---

# Meeting Document

| Item | Content |
|------|---------|
| Name | Azwan Nazamuddin |
| Meeting Date | 2026/06/23 |
| Previous Meeting Date | 2026/06/01 |

---

## 1. What I Want to Discuss Today (Most Important)

1. **Parameter recovery and identification on the synthetic network (Report 1).** The Exact NFXP recovers the known true parameters θ* on the small synthetic network in a controlled R=30 Monte Carlo experiment. The headline result is that the θ_travel identification problem we observed in earlier runs — where the transport-scale ridge caused a 13.8% bias — has been resolved, and the bias at the corrected warm-start is **0.8%**. The full Dekker (2025)-style coverage table, an N-sweep tracking the 1/√N reference line, profile-LL curves for all parameters, and BHHH standard errors are all included in the report. I would like to discuss whether this is publication-ready to anchor thesis Chapter 5 and the ICMC submission.

2. **Approximation-error experiments — Exact vs SA vs RL (Report 2).** The central question in this report is: how much error is introduced when the intractable log-sum normalizer $\bar{V}(x_0) = \log \sum \exp(U)$ is approximated? Two approximation strategies are compared against the Exact reference, and they have fundamentally different error structures.

   | Estimator | Error type | Finite-budget behaviour |
   |---|---|---|
   | Exact NFXP | finite-N noise only | reference (no approximation) |
   | SA (Västberg) | variance only (bias ≈ 0) | consistent — bias stays ~0 at every K |
   | RL (root-IS) | bias + variance | inconsistent — Jensen bias at finite B, both →0 only as B→∞ |

   The SA result is a confirmation of the McFadden consistency property. The RL result is a new finding: at finite rollout budget B, the log-of-average Monte Carlo estimator is Jensen-biased low, and the bias does not vanish without a correction. I would like to discuss whether this two-layer error framing (log-sum sampling error + value-function approximation error) is right for the hEART contribution, and whether R=30 is sufficient for these conclusions.

3. **HH full estimation run — current status.** The full Hiroshima Household survey estimation (5,218 persons, 14 graphs, 456,469 states) is running on the Mac Studio (MPS) since 2026-06-21. As of this morning the run has reached iteration 6 with best LL = −177,915.85 at iteration 5 (θ_travel ≈ 0.953). The pace is approximately **2.6 h/iter**; at the current rate the run will finish in roughly 6–7 days. There is no decision to make yet — this is a status report — but I want to flag that α/β (earliness and lateness penalties) are likely to remain weakly identified on the real data because the schedule window is constructed from each person's own observed work hours.

---

## 2. Current Situation (Progress Since Last Meeting)

### 2.1 Parameter recovery experiment — synthetic network (Report 1)

The synthetic recovery experiment uses a small network with controlled θ* and real-world Google Maps P_open profiles. The R=30 / N=200 Monte Carlo run confirmed that the Exact NFXP recovers θ* when the estimation is started from a proper warm-start (PT-reference mode constants and a multi-home-zone toy network that generates voluntary car↔PT switching). The transport-scale ridge that caused 13.8% bias in the K=10/single-zone version was eliminated once the toy network was corrected to include multiple home zones, so agents genuinely face a trade-off between driving and transit in the DGP.

The recovery report covers: a bias/SD/coverage table in the Dekker (2025) format for all identified parameters; an N-sweep (N = 50, 100, 200, 500, 1000) confirming √N-consistent standard errors; profile-LL curves showing that the likelihood surface is unimodal at the correct warm-start; BHHH standard errors matching the Monte Carlo SD; and behavioral validation (simulated activity sequences match the intended DGP). The α and β parameters are deliberately excluded from identification claims in this experiment — the DGP uses a late-shift schedule (t_e = 22:00) to force observable lateness penalties, which is not the natural Hiroshima schedule — and the report notes this explicitly.

### 2.2 Approximation-error experiments — Exact vs SA vs RL (Report 2)

Starting from the confirmed Exact reference established in Report 1, three additional experiments were run to quantify the approximation error introduced by each estimator.

**SA (Sampling-of-Alternatives, Västberg 2016):** A sweep over logsum size K = {5, 10, 50, 200} confirmed the McFadden consistency property. The extra variance relative to Exact (variance ratio SA/Exact) is already near 1× at K=5 (0.63–1.01×) and does not systematically grow or shrink across K, indicating the synthetic network concentrates probability on a small number of dominant paths. The per-parameter relative bias bars are indistinguishable from zero at every K. This is the expected result, but it is the first controlled quantification for this pipeline.

**RL (root-importance-sampling):** A sweep over rollout budget B = {10, 50, 200, 1000} showed that the estimator is inconsistent at finite B. The key finding is that the Jensen bias ($\mathbb{E}[\log \hat{V}] < \log \mathbb{E}[\hat{V}] = \log \bar{V}$) produces a downward-biased normalizer estimate, which in turn biases the likelihood and the recovered θ̂. Both the bias and the variance shrink as B increases, but neither reaches zero until B→∞, and no closed-form correction exists for the general case. An additional finding is that the proposal temperature τ is critical and horizon-dependent: τ=2 (appropriate for a 5-step oracle network) explodes importance-weight variance on the ~48-step small-network paths; the sweep used τ=1.5, and the production 96-step paths would need a lower τ or a better-adapted proposal distribution.

**§5 bit-level oracle (enumerable 32-path trellis):** To validate that the implementation is correct before drawing conclusions from the estimation experiments, three gates were checked on a tiny fully enumerable network where $\bar{V}$ and the exact MLE are closed-form. All three passed: (1) the soft-DP value function matches the brute-force enumeration to |Δ|<1e-9; (2) $\hat{V}_B \to \bar{V}$ as B grows at τ=1 (exact sampler); (3) the RL estimator recovers θ* as B→∞ (bias and variance both vanish at the exact oracle).

### 2.3 Full HH estimation run launched

The full Hiroshima Household Survey estimation was launched on 2026-06-21 after a silent crash of the first attempt (the original run used `--force-disk-mode` which was generating ~549 GB of memory-mapped writes per iteration; the relaunched run stays fully in RAM on the 512 GB unified memory system). The run uses the analytical (GV) gradient, which was definitively validated on all 11 parameters at ε=0.01/120-person oracle runs earlier this month (all params <1.6% relative to central FD). The BHHH SE block in the estimator runs automatically on any scipy return — whether gtol convergence or the max-iter cap — so the result θ̂±SE is guaranteed when the optimizer exits.

### 2.4 Vectorized-BI speedup built but deferred

The multi-home zone loop in backward induction (which processes ~91 home zones sequentially, one scatter-logsumexp per zone per timestep) was vectorized into a single batched Metal kernel call. The new path is bit-identical to the sequential path (4 exactness gates pass; 28 tests pass including grad and LL oracles). The speedup is flag-gated (`--vectorized-bi`, default OFF) and will be benchmarked on MPS and deployed on any re-run after the current estimation finishes. The MPS device cannot run a second large GPU job while the estimation is live, so the benchmark is blocked until convergence.

### 2.5 What is delayed

- **θ̂ ± SE for the full HH run** — the BHHH SE block has not yet run. It will do so automatically when the optimizer exits (estimated ~5–6 more days at ~2.6 h/iter). No action needed; just waiting.
- **α/β identification on real data** — on the Hiroshima diary data, α (earliness penalty) and β (lateness penalty) are structurally weakly identified because the schedule window is constructed from each person's own observed work hours: by construction, the observed arrival is on-schedule in the DGP. This is not a bug and cannot be fixed with more data; it is a limitation of using revealed-preference diaries without an experimental design. The recovery experiment used a late-shift DGP precisely to demonstrate that α/β *can* be identified — but only when the data contain observable schedule deviations.
- **MPS benchmark for vectorized-BI** — blocked until the current estimation is done (cannot run two large MPS jobs simultaneously on this hardware).

---

## 3. Definitions of Terms

| Term | Definition |
|------|------------|
| NFXP | Nested Fixed Point algorithm (Rust 1987): backward induction is solved exactly at every candidate parameter vector θ inside the outer maximum likelihood loop. No approximation of the value function. |
| Exact estimator | The NFXP LL using full backward induction to compute $\bar{V}(x_0) = \log \sum_{a,s} \exp(U)$ exactly. The reference against which SA and RL are compared. |
| SA (Sampling-of-Alternatives) | The Västberg (2016) estimator: draw K complete day-plans from an importance-sampling distribution, compute the McFadden-corrected logsum over them. Consistent: the McFadden correction removes the sampling bias exactly, so the extra error relative to Exact is variance-only. |
| RL value estimation | The root-importance-sampling estimator: approximate $\bar{V}$ by Monte-Carlo as $\log \hat{V}_B = \log(\frac{1}{B}\sum_b \frac{\exp(U_b)}{q_b})$. Inconsistent at finite B: by Jensen's inequality, $\mathbb{E}[\log \hat{V}_B] < \log \bar{V}$; the downward bias has no closed-form correction. |
| Two-layer error | The approximation error structure in the RL estimator: Layer 1 is the log-sum sampling error (shared with SA); Layer 2 is the value-function approximation error (the Jensen bias unique to the log-of-average estimator). SA has only Layer 1; RL has both. |
| Jensen bias | The systematic downward bias in $\mathbb{E}[\log X]$ relative to $\log \mathbb{E}[X]$ for a random variable X, by the concavity of log. Applies to the RL normalizer estimate. |
| CP | Coverage probability: the fraction of R=30 Monte Carlo replications in which the 95% confidence interval (θ̂ ± 1.96 × SE_BHHH) contains the true parameter θ*. Target is 95%. |
| BHHH SE | Berndt–Hall–Hall–Hausman outer-product-of-gradients standard error: SE = diag(B⁻¹)^{1/2} where B = Σ_n ∇ℓ_n ∇ℓ_n'. An asymptotically valid sandwich estimator for MLE. |
| Late-shift DGP | The data-generating process used in the recovery experiment: the work schedule end time is set to t_e = 22:00 so that agents frequently arrive late and the lateness penalty β is identifiable from observed deviations. |
| Transport-scale ridge | A near-collinearity between θ_travel and other parameters when all modes have the same relative attractiveness: if no agent switches mode in the DGP, the data cannot distinguish a high θ_travel from a globally unattractive travel. Eliminated by using a multi-home-zone toy network. |
| τ (proposal temperature) | The softmax temperature applied to the rollout proposal distribution in the RL sampler. τ=1: greedy follow-the-policy. Higher τ: more exploration but heavier importance-weight tails. The right τ depends on the path horizon; τ=2 is appropriate for 5-step networks but explodes for ~48-step day-plans. |
| GV (gradient of V) | $GV(s) = \partial \bar{V}(s)/\partial\theta$, computed by a second backward sweep. Used by the analytical gradient to avoid finite-difference approximation. Validated to <1.6% vs central FD at ε=0.01. |

---

## 4. My Own Thoughts

### On discussion item 1 (parameter recovery, Report 1)

- **Current thought**: The recovery results look publication-ready for the purposes of thesis Chapter 5 and an ICMC-style technical paper. The coverage is at 97.5% for the well-identified parameters (CP is above the 95% nominal level, consistent with conservative BHHH SEs), the bias is sub-1% for θ_travel, and the 1/√N N-sweep confirms standard asymptotics. The explicit Dekker-style table makes the identification claims precise and comparable to prior literature.
- **Reasoning**: The critical earlier failure mode — the transport-scale ridge causing 13.8% bias — was traced to a DGP problem (single home zone, no genuine car↔PT variation) and is now fixed in the experiment design. The residual 0.8% θ_travel bias is well within Monte Carlo noise for R=30. The BHHH SEs are a conservative upper bound on variance; if anything they make the coverage slightly above nominal, not below it, which is the right direction for an SE that may be used in hypothesis tests.
- **Alternatives I considered**: Expanding R from 30 to 50 or 100 to reduce the Monte Carlo noise on the variance estimates themselves (~±25% at R=30). I chose not to for the meeting because the current results already convey the main message; a larger R run is a good investment if the results are challenged or if we need tighter SE estimates for the thesis. Also considered running the recovery on the real HH data to get empirical SEs, but that requires the full run to converge first.

### On discussion item 2 (approximation-error experiments, Report 2)

- **Current thought**: The Exact/SA/RL contrast is the right framing for the hEART contribution. The key claim — SA is consistent, RL is inconsistent at finite B — is now backed by controlled experiments with a validated oracle (§5 bit-level gates) and a sweep over the budget parameter. The τ-horizon sensitivity finding strengthens the case: even if RL could be made asymptotically consistent, adapting it to the 96-step production horizon would require an entirely different proposal strategy. The natural recommendation is to characterize RL's finite-B inconsistency as a negative result and recommend SA as the practical approximation for large horizons.
- **Reasoning**: RL's appeal in the literature is that it requires no full backward induction — rollouts replace BI. But the experiments show that at production-relevant budgets (B=200), the Jensen bias is still 4.8% (max over well-identified params) and optimizer convergence is only 80%. SA at K=50 or K=200 already reaches near-Exact variance at much lower computational cost (one BI + logsum correction), and it is provably consistent. On this evidence, SA dominates RL for this problem.
- **Alternatives I considered**: Running more budget levels (B=500, B=5000) to show the bias curve more completely, or trying a control-variate correction to reduce the Jensen bias. I deferred both: more B levels are informative but not essential for the hEART framing; the control-variate fix would be a significant research contribution in its own right and is better treated as future work.

### On discussion item 3 (HH full run, status)

- **Current thought**: The run is behaving as expected for a weakly-identified parameter space. The optimizer is accepting every second iteration (iters 3 and 5 are improvements; iters 2, 4, 6 are rejected probes), which is the BFGS line-search pattern on a flat-ish landscape. There is no cause for intervention; the run should be left to finish.
- **Reasoning**: The key guarantee is that the BHHH SE block runs unconditionally when scipy exits (whether at gtol convergence, max-iter, or any other exit condition). The only scenario where we would not get θ̂±SE is a crash before the optimizer returns, which is guarded against by the checkpoint mechanism (best LL = −177,915.85 is safe on disk). The ~2.6 h/iter pace is slow but finite; the mac is stable (RSS 70 GB, 300+ GB available, swap 0.09 GB).

---

## 5. Where I Am Stuck / What I Cannot Decide on My Own

- **R=30 vs R=50–100 for the variance experiments.** The current variance ratios (SA/Exact, RL/Exact) are themselves noisy at R=30 (~±25% on the ratio). The main qualitative claims (SA consistent, RL inconsistent) are robust, but the specific ratio numbers may not be stable. I cannot judge whether R=30 is sufficient for a conference submission without knowing how much the reviewer will scrutinize the ratio values vs the qualitative ordering.
- **How to present α/β weak identification in the HH results.** The correct framing is that α/β are structurally unidentified on revealed-preference Hiroshima diaries — not a bug, not a data quality problem. But this is a significant limitation to report. I am not sure how to position this relative to the recovery experiment (where the late-shift DGP shows α/β can in principle be identified). Is it better to frame α/β as "fixed at boundary by the data" or "not reported (weakly identified)" in the HH results table?
- **RL: report as a characterized negative result or invest in a correction?** My preference is to characterize RL's inconsistency precisely and recommend SA. But if the thesis reviewer or conference chair asks "can this be fixed?", I do not have a quantitative answer for the Jensen bias correction on a 96-step horizon with arbitrary utility structure.
- **Vectorized-BI re-run timing.** After the HH run converges, the natural next step is to benchmark the vectorized-BI speedup on MPS and re-run the estimation with it enabled. But the re-run can also be skipped if the current θ̂±SE is accepted as the final result. I cannot decide alone whether a re-run (for speed validation) is worth 2–3 more days of compute time.

---

## 6. Things I Want to Confirm

- Is the R=30 Dekker-style table in Report 1 sufficient to claim identification for the thesis and ICMC, or do we need R=50+?
- Is "α/β structurally unidentified on revealed-preference data" the right language, or is there a more precise way to state this for a Japanese transport audience?
- Is it acceptable to characterize RL's finite-B inconsistency as a negative result for hEART, without providing a correction?
- Should I plan a vectorized-BI re-run after the current HH run finishes, or treat the current run's θ̂ as the final estimate?

---

## 7. Computational Results / Figures (links to code required)

### 7.1 Report 1 — Parameter recovery & identification (R=30, N=200, synthetic network)

| Result | Link to Code | Link to Report | Notes |
|--------|--------------|----------------|-------|
| Dekker-style coverage table (bias, SD, CP) | `estimation/experiments/recovery_small_net.py` | [`recovery_smallnet_R30_20260620.html`](../../ddcm/recovery_smallnet_R30_20260620.html) | All well-id params CP ≈ 97.5%; α/β excluded from coverage claims |
| N-sweep (N=50,100,200,500,1000) | `estimation/experiments/recovery_small_net.py` | same | Tracks 1/√N reference line; θ_travel SD = 0.076→0.030 |
| θ_travel ridge resolution | `estimation/experiments/recovery_small_net.py` | same | Bias 13.8% (single-zone) → 0.8% (multi-zone, PT-reference ASCs) |
| Profile-LL curves | `estimation/experiments/profile_ll_smallnet.py` | same | Unimodal at θ*; α/β one-sided (steep below θ*, flat above) |
| BHHH standard errors | `estimation/experiments/recovery_report.py` (report generator) | same | SEs conservative; √N-consistent confirmed |
| Behavioral validation | `estimation/experiments/behavioral_smallnet.py` | same | Simulated activity sequences match DGP; mode-share check |

### 7.2 Report 2 — Approximation-error experiments (Exact vs SA vs RL, R=30)

**SA sweep (K = 5, 10, 50, 200):**

| K | Variance ratio SA/Exact (median, well-id) | Max |bias| | Notes |
|---|---|---|---|
| 5 | ≈ 0.63× | ≈ 0% | Near-Exact already at K=5 |
| 10 | ≈ 1.01× | ≈ 0% | McFadden correction holds |
| 50 | ≈ 0.63× | ≈ 0% | No systematic trend with K |
| 200 | ≈ 0.90× | ≈ 0% | Confirming consistency |

**RL sweep (B = 10, 50, 200, 1000, τ = 1.5):**

| B | Convergence rate | Median Var_RL/Var_E | Max \|bias\| (well-id) |
|---|---|---|---|
| 10 | 37% | 3.4 × 10¹³× | ~4.5 × 10⁷% (blow-up) |
| 50 | 77% | 5.4× | 8.9% |
| 200 | 80% | 1.1× | 4.8% |
| 1000 | 93% | 0.5× | 4.4% |

**§5 bit-level oracle (32-path enumerable trellis):**

| Gate | Test | Result |
|---|---|---|
| G1 Telescoping | Soft-DP $\bar{V}$ vs brute-force enumeration | \|Δ\| < 1e-9 ✓ |
| G2 $\hat{V}_B \to \bar{V}$ | τ=1 perfect-sampler exact at any B; τ=2 Jensen bias → 0 as B grows | ✓ |
| G3 Recovery | Exact recovers θ*; RL bias B=10 → B=10⁴ both →0 | ✓ |

Code links:

| Script | Role |
|---|---|
| `estimation/experiments/sa_sequence_smallnet.py` | SA path-sampling sweep |
| `estimation/experiments/rl_value_smallnet.py` | RL rollout sweep |
| `estimation/experiments/rl_oracle.py` | §5 bit-level oracle (32-path trellis) |
| `estimation/experiments/experiments_report.py` | HTML report generator |
| `docs/estimation/reports/rl_value_estimation_landscape.md` | RL landscape theory + framing |

Report: [`experiments_exact_sa_rl_20260621.html`](../../ddcm/experiments_exact_sa_rl_20260621.html)

### 7.3 HH full estimation run — current state (as of 2026-06-22 morning)

Run command: `estimate.py --p-open-source real --scheduling-preferences --jac analytical --device mps --max-persons 6948 --normative-schedule --fix-mu-home 0 --fix-c-change 0 --timing-round 30 --min-group-size 5 --gtol 5e-4 --max-iter 80`

| Metric | Value |
|---|---|
| Persons | 5,218 (of 6,948 requested, after min-group filter) |
| Graphs | 14 |
| States per eval | 456,469 |
| Best LL | −177,915.8489 |
| Best at iteration | 5 |
| Wall time to iter 6 | 200.6 min (~3.3 h) |
| Pace | ~2.6 h/iter |
| RAM (RSS) | ~70 GB |
| System available | ~300 GB |
| Swap | 0.09 GB |

Current best checkpoint (θ̂ at iter 5):

| Parameter | Value | Fixed? |
|---|---|---|
| delta | 0.0488 | — |
| alpha | 0.0006 | — |
| beta | 0.00044 | — |
| beta1_shop | 0.291 | — |
| beta0_shop | −0.377 | — |
| beta1_leis | 0.313 | — |
| beta0_leis | −0.344 | — |
| c_change | 0.000 | ✓ (fixed = 0) |
| mu_home | 0.000 | ✓ (fixed = 0) |
| theta_travel | 0.953 | — |

Live log: `results/estimation_results/hh_full_20260621_2117.log`
Checkpoint: `results/estimation_results/nfxp_checkpoint_20260621_222439.csv`
Dashboard: [http://localhost:8090](http://localhost:8090) (Tailscale: http://100.125.24.104:8090)

---

## 8. Supplementary Materials

**Reports:**
- Report 1 (recovery): [`recovery_smallnet_R30_20260620.html`](../../ddcm/recovery_smallnet_R30_20260620.html)
- Report 2 (experiments): [`experiments_exact_sa_rl_20260621.html`](../../ddcm/experiments_exact_sa_rl_20260621.html)
- Report index: [`index.html`](../../ddcm/index.html)

**Session handoffs (since last meeting):**
- `session_handoff_20260621.md` — HH full run launch, crash investigation, relaunch without disk-mode
- `cuda_device_handoff_20260622.md` — RTX 5090 readiness assessment (in `docs/estimation/reports/`)
- `session_plan_20260621.md` — normative schedule, mu_home normalization, analytical gradient validation

**Links:**
- GitHub repo (estimation code): [https://github.com/azwanazamuddin/ddcm](https://github.com/azwanazamuddin/ddcm)
- Thesis (Overleaf, read-only): [https://www.overleaf.com/read/tfvtfgnpjrrg#125dbf](https://www.overleaf.com/read/tfvtfgnpjrrg#125dbf)
- Live dashboard: [http://100.125.24.104:8090](http://100.125.24.104:8090) (Tailscale, phone-accessible)

---

## Action Items for Next Meeting (fill in after the meeting)

- [ ] 
- [ ] 
- [ ] 
