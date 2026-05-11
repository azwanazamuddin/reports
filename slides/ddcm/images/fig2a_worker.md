# Fig 2a — Worker: Activity Patterns under Transport Stress

**File:** `fig2a_worker.png`  
**Section:** §4.1 Behavioral Validation — Toy Case  
**Layout:** 3 rows × 3 panels + 1 full-width V₀ panel

---

## What the Figure Shows

This figure answers: **what happens to a worker's daily activity pattern and welfare when transport becomes more expensive or slower?**

Two sensitivity dimensions are shown side by side:
- **Row 0 (top):** Cost sensitivity — baseline → cost ×1.58 → cost ×3.0
- **Row 1 (middle):** Time sensitivity — baseline → time ×1.20 → time ×2.0
- **Row 2 (bottom):** Combined V₀ welfare panel — both cost and time sweeps on one plot

All snapshots are from 300-agent simulations. Panel titles show V₀ (day welfare) and shop rate (fraction of agents making at least one shopping trip).

---

## Baseline Worker (col 0, both rows)

**Shop = 38%, V₀ = 177**

The baseline worker spends:
- Morning at home before 8 am
- Work 8 am–5 pm (orange block dominates)
- Brief shopping in the late afternoon/evening (small red band)
- Home by night

The shopping fraction (~38%) reflects the marginally positive net value of a shopping trip (+0.23 utils). This is a fragile equilibrium — small increases in transport cost or time will suppress it.

---

## Row 0 — Cost Sensitivity

### Cost ×1.58 (shop = 34%, V₀ = 177)

Travel costs increase by 58%. The shopping band shrinks slightly (38%→34%). The work block is unchanged — workers still commute. V₀ barely moves.

**Why:** The shopping trip has a net value of only +0.23. A 58% cost increase raises the round-trip travel overhead enough that the net value approaches zero — some agents stop shopping. But work, with a net value of +8.26, is unaffected.

**Tipping point:** Cost ×1.58 is the *shopping tipping point* — the level at which shopping net value hits zero. Above this, shopping becomes a net-negative activity for many agents.

### Cost ×3.0 (shop = 33%, V₀ = 175)

At triple the travel cost, shopping further drops (to 33%) but persists. The distribution looks visually similar to baseline because most of the agent population has heterogeneous shopping propensities — some have enough leisure time or proximity to sustain shopping even at high cost.

V₀ drops modestly from 177 to 175. Work is completely unaffected — the orange block is identical. The welfare loss comes entirely from suppressed discretionary activity.

**Key insight:** Workers are cost-resilient because the commute has a large positive net value. Travel cost increases primarily hurt discretionary trips (shopping), not mandatory ones (work). Cost is not the binding constraint for workers.

---

## Row 1 — Time Sensitivity

### Time ×1.20 (shop = 24%, V₀ = 175)

Travel times increase by 20%. Shopping drops sharply from 38%→24% — a much larger effect than cost ×1.58 (which only caused 38%→34%). The grey travel bands widen visibly.

**Why shopping is more sensitive to time than cost:** The shopping trip net value is driven more by time overhead than monetary cost. A 20% time increase erases more net utility than a 58% cost increase. This is because the K=9 utility specification is calibrated with relatively high travel time value.

**Tipping point:** Time ×1.20 is the *shopping time tipping point* — comparable to cost ×1.58 for shopping suppression but reached at a much smaller multiplier.

### Time ×2.0 (shop = 2%, V₀ = 167)

At double the travel time, shopping is almost entirely suppressed (2%). The grey travel bands are now clearly visible. Workers who do shop face much longer journeys — most agents rationally decide not to bother.

V₀ drops from 177 to 167 — a loss of 10 utils, far larger than any cost scenario. Workers are still commuting (orange block intact) but the commute now consumes significantly more of the day.

**Why V₀ drops more for time than cost:** The commute to work is non-negotiable for workers. When travel time doubles, the round-trip commute overhead doubles — this directly reduces the on-schedule work utility harvested per day. Cost increases have no such mechanism because transport monetary cost parameters are calibrated at lower levels.

**Work tipping point (time ×4.5):** Not shown in snapshots but marked in the V₀ panel. At ×4.5 travel time (+350%), even the commute net value (+8.26) goes negative — workers would prefer to stay home. This is the point at which the model predicts commute abandonment.

---

## Row 2 — Combined V₀ Panel

**x-axis:** % increase from baseline (0% = baseline multiplier ×1.0)  
**Solid lines:** Cost sensitivity  
**Dashed lines:** Time sensitivity  
**Orange:** Worker  
**Blue:** Non-worker (shown for comparison)

### Reading the Panel

**Orange solid (worker — cost):** Nearly flat across 0–500%. V₀ barely falls even at ×3.0 cost (+200%). Workers are cost-insensitive because the mandatory commute and shopping trip economics are dominated by time, not money.

**Orange dashed (worker — time):** Steep downward slope from +20% onward. By +350% (time ×4.5), worker V₀ has fallen ~50 units. Time is the binding transport constraint for workers — it directly increases commute overhead and suppresses discretionary trips.

**Blue solid/dashed (non-worker):** Both lines are nearly flat near 172.8 throughout. Non-worker welfare is home-dominant — transport changes barely affect it. This is the correct model prediction: non-workers have no mandatory transport exposure.

### Tipping Point Annotations

| Annotation | What it means |
|------------|---------------|
| shop time ×1.20 (20%) | Shopping net value hits zero under +20% travel time |
| shop cost ×1.58 (58%) | Shopping net value hits zero under +58% travel cost |
| work time ×4.5 (350%) | Commute net value hits zero under ×4.5 travel time |
| work cost ×11.3 (off scale) | Commute net value hits zero under ×11.3 travel cost — cost is very ineffective at suppressing work |

**The fundamental asymmetry:** Time stress is far more dangerous to welfare than cost stress at the same percentage change. Shopping is suppressed at +20% time vs +58% cost. The work tipping time multiplier (×4.5) is less than 1/2 of the cost equivalent (×11.3).

---

## Summary — Worker Story

1. **Mandatory work is robust.** A worker's commute survives large transport stress because its net value (+8.26) is far above zero.
2. **Shopping is fragile.** A net value of only +0.23 means shopping is the first casualty of any transport deterioration.
3. **Time matters more than cost.** For the same percentage increase, travel time suppresses activity more than monetary cost.
4. **Welfare (V₀) is the unified measure.** It correctly captures both effects — the cost-insensitivity of work and the time-sensitivity of the full daily pattern.
5. **Non-workers are unaffected.** The contrast (blue vs orange lines) shows that transport stress is a worker problem, not a population-wide welfare issue.
