# Fig 2b — Non-worker: Activity Patterns under Transport Stress

**File:** `fig2b_nonworker.png`  
**Section:** §4.1 Behavioral Validation — Toy Case  
**Layout:** 3 rows × 3 panels + 1 full-width V₀ panel (identical structure to Fig 2a)

---

## What the Figure Shows

This figure answers: **what happens to a non-worker's daily activity pattern and welfare when transport becomes more expensive or slower?**

The answer, strikingly, is: **almost nothing.**

Same layout as Fig 2a (worker):
- **Row 0 (top):** Cost sensitivity — baseline → cost ×1.58 → cost ×3.0
- **Row 1 (middle):** Time sensitivity — baseline → time ×1.20 → time ×2.0
- **Row 2 (bottom):** Combined V₀ welfare panel (cost solid, time dashed)

All snapshots from 300 non-worker agents (no mandatory activity).

---

## Baseline Non-worker (col 0, both rows)

**Shop = 1–3%, V₀ = 172.8**

The baseline non-worker spends essentially the entire day at home. The distribution is almost entirely blue (home). Only a very small sliver of red (shopping) is visible — approximately 1–3% of agents make at least one shopping trip.

**Why so little shopping?**  
Non-workers have no scheduled destination forcing them outside. The *only* reason to leave home is if a discretionary activity (shopping or leisure) offers utility above the HOME floor (μ_home = 0.12/min). At baseline, shopping net value is +0.23 — technically positive, but very thin. And unlike workers, non-workers have no pent-up trip demand after returning from work. They start at home, stay at home.

**V₀ = 172.8:** This value is almost exactly equal to μ_home × Δt × 96 steps = 0.12 × 15 × 96 = **172.8**. In other words, non-worker welfare equals the utility of spending the *entire day at home*. Discretionary trips contribute <0.1% to V₀.

---

## Row 0 — Cost Sensitivity

### Cost ×1.58 (shop = 1%, V₀ = 173)

The distribution looks identical to baseline. Shopping barely changes (3%→1%). V₀ unchanged.

**Why:** With only +0.23 net value and essentially no mandatory exposure, the transport cost increase simply erases the already marginal shopping incentive. But since non-workers weren't shopping much to begin with, there is nothing to lose.

### Cost ×3.0 (shop = 0%, V₀ = 173)

Shopping completely disappears (0%). The distribution is entirely home. V₀ unchanged at 173.

**Why V₀ doesn't fall:** Non-worker welfare is entirely in home utility. When shopping disappears, the 0.23-per-trip welfare contribution (which was already negligible) is lost, but the rounding leaves V₀ unchanged. The welfare loss is real but sub-rounding-precision small.

**Key insight:** For non-workers, transport cost is irrelevant to welfare. They don't have to go anywhere, and the small incentive they had to shop was already barely positive.

---

## Row 1 — Time Sensitivity

### Time ×1.20 (shop = 1%, V₀ = 173)

Identical to baseline. No visible change in the distribution.

### Time ×2.0 (shop = 0%, V₀ = 173)

Shopping disappears, distribution fully home. V₀ unchanged.

**Same conclusion as cost:** Time sensitivity for non-workers is negligible. They have no mandatory travel, so worsening travel time only further discourages the already-rare discretionary trip. Welfare (V₀) is unaffected because it was already equal to full-day home utility.

---

## Row 2 — Combined V₀ Panel

**x-axis:** % increase from baseline  
**Solid lines:** Cost | **Dashed lines:** Time  
**Blue lines:** Non-worker (this figure's perspective)  
**Orange lines:** Worker (shown for comparison)

### Reading the Panel

**Blue solid (non-worker — cost):** Flat line near 172.8 from 0% to 500%. Cost has zero effect on non-worker welfare.

**Blue dashed (non-worker — time):** Also flat near 172.8. Time has zero effect on non-worker welfare.

**Orange lines (worker):** Visible only for reference. Orange dashed (worker time) drops steeply — the contrast with the flat blue lines makes the worker's transport exposure immediately visible.

### Why Both Blue Lines are Flat

Non-worker V₀ ≈ μ_home × 1440 = **home utility for the full day**. There is no mandatory transport exposure to deteriorate, and the discretionary trip contribution to V₀ is negligible. No matter how bad transport gets, a non-worker can simply stay home and lose almost nothing.

This is the *correct* welfare prediction from a DDCM with a proper reservation utility. Non-workers are not "stuck" by transport — they are *free* of it.

### Tipping Points Shown

| Annotation | What it means for non-workers |
|------------|-------------------------------|
| shop time ×1.20 (20%) | Shopping tipping point — but non-workers barely shop anyway |
| shop cost ×1.58 (58%) | Shopping tipping point — again, negligible welfare consequence |
| (no work tipping points) | Non-workers have no mandatory travel — work tipping points do not apply |

The annotation in the bottom-right corner of the panel: *"non-worker welfare ≈ home utility (transport changes negligible)"* — this is the core takeaway.

---

## Contrast with Fig 2a (Worker)

| | Worker | Non-worker |
|-|--------|------------|
| Baseline shop rate | 38–41% | 1–3% |
| Baseline V₀ | 177 | 172.8 |
| Cost ×3.0 shop rate | 33% | 0% |
| Time ×2.0 shop rate | 2% | 0% |
| V₀ drop at time ×2.0 | −10 (177→167) | ~0 (172.8→172.8) |
| Work tipping point | time ×4.5, cost ×11.3 | N/A |
| Transport exposure | High (mandatory commute) | None |

The gap in V₀ between worker (177) and non-worker (172.8) represents the *value of work itself* — having something productive to do outside the home adds +4.2 utils per day at baseline. Under extreme transport stress, workers can fall *below* non-worker welfare if the commute burden exceeds the work utility gain.

---

## Summary — Non-worker Story

1. **Home is the dominant activity.** Non-workers spend nearly the entire day at home because no discretionary activity can reliably beat the home reservation utility.
2. **Shopping is marginal and rare.** Only 1–3% make a trip. Net value (+0.23) is too thin to generate consistent departure decisions.
3. **Transport stress has no welfare impact.** V₀ ≈ 172.8 regardless of cost or time multiplier. Non-worker welfare is home utility, not transport-dependent utility.
4. **This is a correct prediction, not a failure.** A non-worker who faces expensive or slow transport simply doesn't travel — and since they didn't need to, they lose nothing. The DDCM captures this rational adaptation correctly.
5. **Policy implication:** Transport improvement policies targeted at non-workers will have near-zero welfare impact in this model. Benefits accrue primarily to workers who face mandatory travel exposure.
