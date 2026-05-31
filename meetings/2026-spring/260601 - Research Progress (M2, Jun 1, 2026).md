---
title: Research Progress — M2, June 1, 2026
type: progress-report
status: draft
created: 2026-06-01
updated: 2026-06-01
tags: [ddcm, weekly-report, progress, m2, nfxp, jsps, estimation, analytical-gradient]
related:
  - [[260511 - Research Progress (M2, May 11, 2026)]]
---

# Meeting Document

| Item | Content |
|------|---------|
| Name | Azwan Nazamuddin |
| Meeting Date | 2026/06/01 |
| Previous Meeting Date | 2026/05/11 |

---

## 1. What I Want to Discuss Today (Most Important)

1. **APTE paper revision (three reviewer points).** The conditional acceptance was received. I have response paragraphs ready for all three reviewer points and would like to confirm they are appropriate before re-submission.

   | Reviewer point | Revision made |
   |---|---|
   | Estimation stability of the NFXP run | Added a paragraph on convergence behaviour and BHHH standard errors |
   | Sensitivity to 15-minute temporal discretization | Added a short limitation paragraph; noted that finer resolution is feasible within the pipeline |
   | Limitations of the welfare interpretation | Added a paragraph on four assumptions: error-scale invariance, monetary conversion, fixed supply side, and distributional effects |

   On the estimation side: the full estimation pipeline is operational and has been run successfully as a target. The results are not yet at a stage ready for inclusion in the paper, so the revision keeps the original framing and does not update the estimation section.

2. **Thesis Chapter 2 outline.** Chapters 1 and 3 are drafted. I would like to review the §§2.1–2.6 structure before continuing to write.

   Planned sections: §2.1 Activity-Based Travel Demand Models · §2.2 DDCM Theory · §2.3 DDCMs in Transport · §2.4 Approaches to the Computational Curse · §2.5 Estimation Methods for DDCMs · §2.6 Research Gap Summary.

3. **The analytical gradient is now confirmed correct — K=11 estimation is unblocked.**
   No K=11 run converged: the log-likelihood went flat after a few iterations and the `mu_home` parameter jammed at its bound every time. This was finally traced to a bug in the gradient computation. The root cause has been isolated, confirmed on both MPS and CUDA, and the production estimation can now be launched with a correct analytical gradient.

---

## 2. Current Situation (Progress Since Last Meeting)

### 2.1 The gradient investigation — what happened and what was found

This period was dominated by a systematic investigation into why every K=11 analytical-gradient estimation run failed. The work took three phases over about two weeks.

**Phase 1 — Ruled out suspects (late May).** We first eliminated a long list of plausible causes: the per-edge utility features (confirmed correct to within 0.1%), the policy normalization (confirmed exact), the observed-path feature accumulation (confirmed within 2% of finite differences), telescoping from broken step-links (real but only 6% effect, not the cause). After each ruling-out the "GV undercount" remained at ~16–22%. The symptoms looked like a subtle mathematical error in the gradient backward recursion.

**Phase 2 — Localizing to the zone-batching path (June 1, MPS device).** The break came from a single controlled experiment. Holding the value function, the graph, the person, and the parameter fixed, and varying only *how many home zones are processed simultaneously in one GPU pass*, we got:

| Configuration | Gradient for mu_home | Error vs FD |
|---|---|---|
| Process **1 zone** at a time | +704.61 | **0.0%** — exact |
| Process **8 zones** at a time (default) | +436.24 | **38.1%** — wrong |
| CPU, **8 zones** at a time | +704.61 | **0.0%** — exact |

The gradient is exact when processing zones one at a time, and 38% wrong when batching them — but only on the Apple GPU (MPS backend). The CPU batched result is exact, which confirms the Python logic is correct. The defect is in the GPU kernel.

**Phase 3 — Confirming CUDA is clean (June 1, CUDA device).** Because the production estimation runs on the Linux server with an NVIDIA GPU (CUDA), we immediately ran the same discriminator test on CUDA:

| Configuration | Gradient for mu_home | Error vs FD |
|---|---|---|
| CUDA, **1 zone** at a time | +942.68 | **0.0%** |
| CUDA, **8 zones** at a time | +942.67 | **0.0%** |

**The bug is MPS-only. CUDA is confirmed clean.** The production estimation can launch immediately at the default `zone_batch_size=8` with no workaround.

**Why did this stay hidden?** Three reasons. First, a wrong gradient does not crash — it simply points the optimizer in the wrong direction, which looks exactly like a hard or flat optimization landscape. Second, every diagnostic run used the default `zone_batch_size=8`, so all measurements included the bug without knowing it. Third, the few CUDA diagnostic runs this spring happened to use a non-workers group with only one home zone — with one zone, zone-batching cannot trigger, so the CUDA tests showed a *different*, real bug (a wrong work-schedule fallback for non-workers) rather than the batching issue.

**What the mechanism is.** Micro-tests ruled out a simple operator error — the operations are individually correct on MPS at small scale. The corruption appears only at real graph scale, where the per-timestep element count `E × Z_b × P` exceeds ~2.15 billion (the int32 limit). This is an **int32 integer overflow** on MPS, the same family as prior MPS-specific failures in this codebase (`torch.unique` breaking past 17M rows, `torch.sort` on int64). CUDA and CPU use int64 indexing and never overflow.

### 2.2 Other gradient bugs fixed

In parallel with the zone-batch investigation, five smaller real bugs were found and fixed in the gradient code. Each was a genuine error but was not the primary cause of the sign flips:

1. **Work-schedule fallback for non-workers.** The gradient code was giving non-worker agents (who have no work schedule) a fake workers schedule `(480, 1020)`, causing the arrival-activity argmax to give HOME spurious credit for ~85 extra timesteps per agent. This produced a ~22% gradient overcount for non-workers. Fixed: pass `None` for non-workers consistently.
2. **Travel-edge arrival-step formula.** The gradient used `floor(t/Δt) + ceil(TT/Δt)` to find the arrival timestep, while the model uses `floor((t+TT)/Δt)`. These differ for non-integer travel times. Fixed.
3. **tp argmax masks not mutually exclusive.** When two non-WORK activities tied for the maximum arrival utility (common when shops are closed), both received gradient credit. The model only counts the maximum once. Fixed.
4. **Missing arguments in the edge-chunked gradient path.** When `--edge-chunk-size` is set, three mu-table arguments were missing from an internal function call. Fixed.
5. **Autograd NameError.** The autograd-based gradient (an alternative implementation) had a missing function-signature parameter. Fixed.

All five fixes are committed and the code is clean.

### 2.3 Infrastructure improvements

Two infrastructure problems that were causing estimation runs to fail on the CUDA server were also fixed:

- **Graph build out-of-memory.** The graph builder was trying to move a 1.86-billion-edge tensor to GPU memory at the end of Phase 1A, consuming ~15 GB. Fixed by keeping the tensor on CPU (it is only used in slices per iteration, which already move per-slice to GPU).
- **CUDA error cleanup.** When one graph build fails (OOM), the error handler now calls `gc.collect()` and `empty_cache()` before continuing to the next group, preventing memory fragmentation from cascading across subsequent builds.

### 2.4 What is delayed

- **Full mixed-sample estimation (workers + non-workers, CUDA).** Building all four graph variants (workers × non-workers × car-owned) sequentially on the 32 GB GPU still exceeds memory even with the graph-build fix — the first graph occupies ~20 GB of RAM and the second build cannot fit. The workaround is to run workers-only on CUDA (fits) and run the full mixed sample on the Mac (MPS, large unified memory, correct at `zone_batch_size=1` in the interim).
- **MPS local-dev fix.** The edge-chunking fix that would restore `zone_batch_size=8` on MPS is identified but not yet written. It is non-blocking for production estimation.
- **APTE paper Section 5 and K=11 results.** The K=11 estimation has not yet been launched (just now unblocked). The APTE revision keeps the original estimation framing rather than new results.

---

## 3. Definitions of Terms

| Term | Definition |
|------|------------|
| NFXP | Nested Fixed Point algorithm (Rust 1987): backward induction is solved exactly at every candidate parameter vector inside the outer maximum likelihood loop. No approximation of the value function. |
| Analytical gradient | The exact derivative of the log-likelihood, computed by a second backward pass ("gradient BI") that propagates per-edge utility features back through the policy-weighted recursion: `GV(s) = Σ_a P(a|s) × [F(s,a) + GV(dst)]`. Costs one extra backward sweep (~same as one likelihood evaluation). |
| Finite-difference (FD) gradient | Numerical approximation: `(ℓ(θ+ε) − ℓ(θ−ε)) / (2ε)`. Exact in principle but limited by float32 GPU noise at small ε. Reliable far from the optimum; degrades near it due to catastrophic cancellation. Used as a validation oracle. |
| zone_batch_size | Number of home-zone value functions processed simultaneously in one GPU pass during the gradient backward sweep. Default is 8; controls the peak GPU memory. The zone-batch bug makes this wrong on MPS at values > 1. |
| GV (gradient of V) | `GV(s) = ∂V(s)/∂θ`, the sensitivity of the value function to the parameters. The key object in the analytical gradient; computed by the gradient BI recursion. |
| obs_feat | Σ of per-edge utility gradient features along the observed path. Always correct; the bug was entirely in GV. |
| MPS | Metal Performance Shaders — Apple's GPU computing backend for PyTorch on Apple Silicon. Used for local development; known to have silent correctness failures on certain operations at large scale. |

---

## 4. My Own Thoughts

### On discussion item 1 (APTE revision)

- **Current thought**: The three response paragraphs are ready for review. Each is scoped as a minor addition to the discussion section and does not change the paper's core results or framing.
- **Reasoning**: The reviewer's points are clarification requests, not fundamental objections. Responding with focused additions to §5 (Discussion) is proportionate and keeps the paper within the conference format.
- **Alternatives I considered**: Expanding the methodology section to address estimation stability more formally; but this would lengthen the paper beyond the page limit and is better placed in the thesis.

### On discussion item 2 (Thesis Chapter 2 outline)

- **Current thought**: 
- **Reasoning**: 
- **Alternatives I considered**: 

### On discussion item 3 (gradient investigation)

The central lesson: **a wrong gradient does not crash; it masquerades as a hard optimization landscape.** Every time `mu_home` jammed at its bound, the natural interpretation was "the model is hard to identify" or "the warm-start is wrong." We tried all of those. None helped because the cause was never the landscape — it was that we were handing the optimizer a gradient pointing the wrong direction. The bug survived because every diagnostic used the same `zone_batch_size=8` that caused the corruption. The moment we compared batch=1 vs batch=8 vs FD — varying one knob — the problem resolved in a single line of output.

Now that CUDA is confirmed clean, the full K=11 analytical-gradient workers estimation can launch this week. I expect convergence in 10–30 L-BFGS-B iterations.

---

## 5. Where I Am Stuck / What I Cannot Decide on My Own

- Are the three APTE revision paragraphs appropriate for re-submission as written?
- Is the Chapter 2 outline structure (§§2.1–2.6) acceptable to proceed with drafting?
- Should the APTE revision keep the original K=10 framing, or wait for K=11 results now that the gradient is fixed? I cannot judge which matters more to the reviewer.
- Should I proceed with workers-only CUDA results for the thesis, or wait for the full mixed sample (which requires solving the CUDA memory problem or running on MPS at batch=1)?

---

## 6. Things I Want to Confirm

- Are the three APTE revision paragraphs appropriate for re-submission as written?
- Is the Chapter 2 outline structure (§§2.1–2.6) acceptable to proceed with drafting?

---

## 7. Results / Figures (links to code required)

### 7.1 Gradient validation — zone-batch discriminator

| Test | Device | zone_batch_size | GV[mu_home] | Error vs FD | Status |
|---|---|---|---|---|---|
| Smoking gun (MPS) | MPS | 1 | +704.61 | **0.0%** | ✓ Exact |
| Smoking gun (MPS) | MPS | 8 | +436.24 | **38.1%** | ✗ Wrong |
| Device discriminator | CPU | 8 | +704.61 | **0.0%** | ✓ Exact |
| Production check (CUDA) | CUDA | 1 | +942.68 | **0.0%** | ✓ Exact |
| Production check (CUDA) | CUDA | 8 | +942.67 | **0.0%** | ✓ Exact |

Code: `investigations/check_gv_order.py` · `investigations/check_zone_batch_device.py` · `cuda_check_zone_batch.py`
**Standalone report (HTML):** [`gradient_bug_investigation_20260601.html`](../../ddcm/gradient_bug_investigation_20260601.html)
Overview: [`gradient_investigation_overview_20260601.md`](../../../../0%20-%20Inbox/comingFromCode/gradient_investigation_overview_20260601.md)
Detailed theory: [`analytical_gradient_deep_research_20260601.md`](../../../../0%20-%20Inbox/comingFromCode/analytical_gradient_deep_research_20260601.md)
Narrative: [`mps_port_and_hidden_gradient_bug_story_20260601.md`](../../../../0%20-%20Inbox/comingFromCode/mps_port_and_hidden_gradient_bug_story_20260601.md)

### 7.2 K=11 warm-start parameters (last checkpoint before this session)

| Parameter | Value | Notes |
|---|---|---|
| delta | 0.00614 | Workers on-schedule utility |
| alpha | 0.00118 | Pre-schedule earliness penalty |
| beta | 0.00301 | Post-schedule lateness penalty |
| beta1_shop | 0.323 | SHOP attractiveness × P_open |
| beta0_shop | −0.791 | SHOP base utility |
| beta1_leis | 0.354 | LEIS attractiveness × P_open |
| beta0_leis | −0.331 | LEIS base utility |
| c_change | −0.416 | Trip switching cost |
| mu_home | −0.027 | HOME reservation threshold |
| theta_travel | 1.118 | Travel disutility scale |
| ASC_pt_adj | −0.015 | PT mode constant shift |

Source: `estimation_results/nfxp_checkpoint_20260525_190114.csv` (K=11, 11 params, workers-only, best LL = −3,981 on workers subset)

### 7.3 Writing deliverables

| Deliverable | Location | Status |
|---|---|---|
| APTE revision paragraphs (3 points) | `0 - Inbox/plan_20260522_apte_thesis.md` §1 | Draft ready |
| Thesis Ch1 (§§1.1–1.4) | `4 - Projects/thesis/main.tex` | Drafted |
| Thesis Ch3 (§§3.1–3.3, 3.5) | `4 - Projects/thesis/main.tex` | Drafted |
| Thesis Ch2 outline | `3 - Permanent Notes/research-plan/MASTER_THESIS_OUTLINE.md` | For review |

---

## 8. Supplementary Materials

**Session reports (gradient investigation):**
- `session_report_20260529.md` — v18 mixed-sample BFGS diagnosis
- `session_handoff_20260530.md` — gradient root cause identification (per-edge feature fix)
- `session_handoff_20260531.md` — FD vs analytical comparison; FD as safe fallback
- `session_report_20260531_gv_fix.md` — all five secondary bugs fixed; autograd confirmed wrong too
- `gradient_investigation_overview_20260601.md` — unified overview; zone-batch root cause
- `mps_port_and_hidden_gradient_bug_story_20260601.md` — narrative; why the bug was invisible
- `analytical_gradient_deep_research_20260601.md` — theory; literature grounding

**Links:**
- Thesis (Overleaf, read-only): [https://www.overleaf.com/read/tfvtfgnpjrrg#125dbf](https://www.overleaf.com/read/tfvtfgnpjrrg#125dbf)
- GitHub repo (estimation code): [https://github.com/azwanazamuddin/ddcm](https://github.com/azwanazamuddin/ddcm)

---

## Action Items for Next Meeting (fill in after the meeting)

- [ ] 
- [ ] 
- [ ] 
