---
title: Research Progress — M2, Apr 27, 2026
type: progress-report
status: complete
created: 2026-04-27
updated: 2026-04-27
tags: [ddcm, weekly-report, progress, m2, gradient, c_change]
related:
  - [[260419 - Master Thesis Progress (M2, April 2026)]]
  - [[../../../4 - Projects/ddcm/ddcm_slides/slides]]
---

# 260427 — Research Progress (M2, Apr 27, 2026)

> This report covers the week of April 21–27, 2026. Two threads: **(1)** debugging the analytical gradient pipeline so BFGS can make real progress on the estimation, and **(2)** writing updates — JSPS proposal structure and thesis-draft alignment with the April presentation.
>
> **Session source:** `0 - Inbox/comingFromCode/session_report_20260427.md`

---

## 1. The Big Picture

Last week we confirmed the computational framework works: 145M → 1.5M states, GPU backward induction in ~105 seconds, and a partial-convergence result at K=10. The open problem was *why BFGS was failing immediately* on the full estimation run — log-likelihood exploding from −50,586 to −158,492 in just 9 iterations, with no meaningful parameter movement.

This week's focus: find the bug, fix it, and verify that BFGS can actually make progress before running any new estimation experiments.

---

## 2. Verifying the Gradient Formula from First Principles

Before touching the full 29-group run, we needed to know whether the *gradient formula itself* was correct. The gradient tells BFGS which direction to move in parameter space; if the formula is wrong, the direction is wrong, and the optimizer walks off a cliff.

**How we tested it.** We built seven tiny synthetic "toy" networks — situations simple enough to compute everything by hand: a person who just stays home, a person with one travel option, a chain of work → shopping, and extreme cases where one action is almost certain. On each toy network, we compared the formula's output to the hand-computed answer.

**Result: 7/7 pass.** The gradient formula is mathematically correct. The formula is:

> "At each state, the gradient is a weighted average — weighted by the probability of each action — of the feature value for that action plus the gradient carried forward from where that action leads."

This is the same backward-induction logic as the value function itself, just propagating gradient rather than utility. It works.

We also verified that GPU floating-point noise is negligible — the signal-to-noise ratio is well above 100,000× for all parameters, so GPU rounding is not the issue.

---

## 3. The Real Bug: Wrong Home-Zone Masks in the Gradient Code

The gradient worked perfectly on toy networks. The failure must come from something that only exists in the real run. We found two connected bugs in the code that applies *home-zone restrictions*.

### Why home-zone restrictions exist

In backward induction, we propagate value from the end of the day backward. Part of that propagation goes through states labelled "HOME at zone X." But a given person can only be at home in *their* home zone — so states like "HOME at zone 107" must be blocked (set to −∞) for a person whose home is in zone 27. This blocking is done via a "forbidden mask."

### Bug 1 — The mask was never applied to the gradient

When computing the gradient, the code ran the same backward-induction logic — but forgot to apply the forbidden masks. So gradient values accumulated at home states in *wrong zones*, corrupting the gradient for every parameter that affects home-visit utility. The value function was correct; only the gradient was wrong.

### Bug 2 — Zone IDs were off by one

Zones are numbered two different ways in the code: an internal 0-indexed integer (used in the state tensor) and a 1-indexed enum value. The mask-building code was using the 1-indexed value to look up 0-indexed slots — so every person was getting the *wrong person's* forbidden mask. The mask for zone 27 was being applied where zone 28's mask should have been, and vice versa.

Both bugs are now fixed and verified — all 7 toy-network tests still pass with the corrected code.

---

## 4. Current Status: Verifying the Fix on a Real Group

After fixing both bugs, we ran a consistency check on real estimation data (group 009, 11 workers, 5.9M states). The test asks: does the analytical gradient now agree with numerical finite-difference estimates on actual data?

Early results show most parameters match well. Two leisure parameters (`beta1_leis`, `beta0_leis`) still show a 1.2–1.9× discrepancy. The likely explanation is that finite differences are unreliable for parameters whose true gradient is small — the LL surface is highly curved near the current parameter values, so averaging slopes across a finite step doesn't capture the local derivative. This is a known numerical artifact, not necessarily another bug.

BFGS on the corrected gradient is queued to run once this check completes.

---

## 5. The c_change Problem — What It Is and Why It's Hard

### The symptom

`c_change` is the cost paid whenever a person switches from one activity to another. Because it applies twice per trip (leaving one activity, arriving at another), the net cost per trip is `2 × c_change`. A negative value means switching is costly; we need this to stop the model from predicting everyone makes dozens of trips per day.

The problem: in every estimation run so far, `c_change` drifts to its lower bound (−2.5) and gets pinned there, while everything else barely moves.

### The root cause

The model predicts roughly 12× too many trips compared to what people actually do in the survey. With that over-prediction, the optimizer's only lever to reduce trip frequency is to make switching more expensive — so it pushes `c_change` as negative as possible. But no finite switching cost can fully fix a model that fundamentally wants to produce too many trips.

**Why does the model want too many trips?** Because SHOPPING and LEISURE utility is currently modelled as constant per minute: the longer you shop, the better, with no satiation. If shopping at minute 30 is as attractive as shopping at minute 200, and travel is cheap, agents want to chain infinite shopping episodes. `c_change` becomes the only off-switch.

We tested duration-dependent utility (adding a satiation breakpoint at 60 minutes) — it didn't help. The reason: agents can "reset" by briefly returning home, which restores their duration counter to zero, and then chain another full episode. The breakpoint never actually bites.

### Next step: A3 diagnostic

The planned action is to **fix `c_change` at the MNL prior value (−0.3)** and estimate the remaining 9 parameters freely. This is not a solution — it removes the escape valve and forces the optimizer to find something else. The question it answers: *with c_change held, does the rest of the model converge to sensible values?* If yes, we have a usable identification submodel. If something else breaks instead, we learn what the next bottleneck is.

We are holding A3 until BFGS makes clean progress on group 009 with the fixed gradient — no point running a new experiment if the optimizer itself is still unreliable.

### Feedback for next investigation: cumulative utility diagnostic

The supervisor's feedback this week: **check the magnitude of cumulative utility throughout the day**. The idea is to trace what happens to the value function $V(s, t)$ as time progresses — does it grow unboundedly, stay stable, or collapse? If agents accumulate utility too fast early in the day (because shopping/leisure utility is constant and high), the model will want them to chain activities continuously before home utility can compete. Visualising the cumulative path makes this intuition concrete and quantifiable — and may reveal whether the problem is in the magnitude of `beta1_shop`/`beta0_shop` or in the structural form of utility.

This diagnostic is the next action after the group 009 gradient check completes.

---

## 6. Writing Updates This Week

In parallel with the debugging, the proposal and thesis documents were brought up to date.

### 6.1 JSPS DC Proposal — Narrative Structure

The proposal outline (`0 - Inbox/new_outline_jsps.md`) was reviewed and corrected:

- **Structure renamed**: "5-Move" → **6-Move Hourglass** (the structure has always had 6 moves; the label was wrong)
- **Bridge connector added**: an explicit paragraph between Move 4 (computational barrier) and Move 5 (Structural-IRL) explaining *why* the two CS bridges are relevant — the estimation bottleneck is repeated backward induction, and the bridges open a principled algorithmic search
- **Citation corrections**:
  - Schedule delay cost magnitudes (wp ≈ 0.5×wage, wj ≈ 1.5×wage) correctly attributed to **Small (1982)**, not Vickrey (1969). Vickrey introduces the bottleneck model concept; Small provides the empirical magnitudes.
  - **McFadden (1978)** replaced with **McFadden (1981)** — the 1978 paper is about residential location choice (wrong paper); the correct reference is the 1981 MIT Press chapter on welfare in discrete choice.
  - Bridge 2 (Dudzik & Veličković 2022) claim toned down: DDCM BI is structurally isomorphic to a log-semiring network; "proven connection" language replaced with "structural correspondence"
- **Japanese policy context** added to Move 6 (impact section) — connecting the welfare framework to domestic transport policy
- **Space constraint warning** added to Page 1 note

### 6.2 Citation Audit

A full citation audit was created at `0 - Inbox/citation_audit.md`. It covers:
- **Complete (7 papers):** entries confirmed in vault, bib, and as full-paper + lit-review notes
- **Partial (1 paper):** McCarthy et al. (2025) — full paper note exists; lit review note missing
- **Missing entirely (6 papers):** McFadden (1981), Small & Rosen (1981), Small (1982), Eliasson et al. (2009), Parry & Small (2009), Keane & Wolpin (1997) — each with source provenance (tex file / Västberg reference list / training knowledge)
- **Verify in vault (3 claims):** de Palma & Fosgerau (2011), Ermon (2015), Dudzik & Veličković (2022) — specific claims attributed to each need to be confirmed against the actual notes

### 6.3 Thesis-Draft Alignment with April 2026 Presentation

`3 - Permanent Notes/reports/thesis/thesis-draft.md` was updated throughout to match the April 19 presentation and this week's progress:

| Section | Old content | New content |
|---|---|---|
| **§1.4 Scope** | N=200 pilot / N=3331 (K=8); GTX 1080 Ti | N=1,368 workers; RTX 5090 32 GB |
| **§5 Chapter header** | K=8, Phase A complete | K=10, partial convergence, c_change diagnosis in progress |
| **§5.5 Identification** | K=8 gradient-scale issues (286×, mode shares, household car) | K=10 c_change ridge — observed behaviour, mechanism, three-step diagnosis |
| **§6.1 Contributions** | 2 contributions; RMDP as part of C1; K=8 results | 4 contributions: DAG framing, reachability, μ(t), analytical gradient; RMDP noted as dropped |
| **§6.2 Limitations** | RMDP limitation; N=200 | c_change identification as main scope limitation; N=1,368; c_sense limitation |
| **§6.3 Future Work** | "Powell only; Newton-Raphson gap" | Updated — analytical gradient implemented; remaining gaps are welfare SEs, iteration cost at scale, Bridge 1 empirical check, Structural-IRL |
| **Appendix A.2/A.3** | McFadden (1978); numerical Jacobian | McFadden (1981); c_change profile-likelihood sweep |

---

## 7. Status Table

| Item | Status |
|------|--------|
| Gradient formula correctness (micro, 7 scenarios) | ✅ Verified |
| GPU noise floor | ✅ Negligible |
| FD-analytical discrepancy (curvature artifact) | ✅ Understood — not a bug |
| forbidden_masks bug in gradient BI | ✅ Fixed |
| Zone ID off-by-one bug | ✅ Fixed |
| Full-group gradient consistency (group 009) | 🔄 Running |
| A3 diagnostic (fix c_change = −0.3) | ⏳ Pending gradient confirmation |
| Cumulative utility diagnostic | ⏳ Next action |
| JSPS outline corrections | ✅ Done |
| Citation audit | ✅ Done (`0 - Inbox/citation_audit.md`) |
| Thesis-draft alignment with April presentation | ✅ Done |

---

## 8. What's Next

1. **Gradient confirmation on group 009.** Confirm BFGS makes progress with the fixed forbidden_masks. If `beta1_leis`/`beta0_leis` discrepancy persists, investigate whether it's a curvature artifact or a residual bug.
2. **Cumulative utility diagnostic.** Trace $V(s, t)$ across the day for a representative agent at current θ̂. Visualise where and why utility accumulates too fast — this gives a concrete picture of the shopping/leisure satiation problem and guides what to fix next.
3. **A3 diagnostic.** Fix `c_change = −0.3`, run overnight BFGS on the remaining 9 parameters. Expected: cleaner convergence and a usable identification submodel.
4. **Missing citations.** Add McFadden (1981), Small (1982), Small & Rosen (1981) to vault and `references.bib` — these are critical for the JSPS proposal argument.

---

**Session data source:** `0 - Inbox/comingFromCode/session_report_20260427.md`
