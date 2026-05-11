# Fig 1 — Marginal Utility Profiles and Activity Emergence

**File:** `fig1_utility.png`  
**Section:** §4.1 Behavioral Validation — Toy Case  
**Layout:** 3 columns × 2 rows

---

## What the Figure Shows

**Row 1 (top): Marginal utility Mu(t) over the day**  
Each panel shows the per-step utility of being in that activity at each hour, plotted against the HOME reservation floor (blue dashed line at μ_home × Δt = 0.12 × 15 = 1.8 utils/step). The shaded region above the HOME line marks when that activity is worth leaving home.

**Row 2 (bottom): Simulated agent fraction**  
Fraction of the 300-agent population in that activity at each time step. This is the *output* of the model — what actually happens when agents optimise against the Mu(t) profiles.

---

## Column-by-Column Interpretation

### Column 1 — Work

**Mu(t) panel:**  
Piecewise linear profile centred on the scheduled work window (8 am–5 pm, shaded orange). Three zones:
- *Before 8 am*: utility rises toward δ=0.15/min as the start time approaches (earliness penalty fades)
- *8 am–5 pm*: flat at δ=0.15/min (on-schedule, maximum utility)
- *After 5 pm*: utility falls as lateness penalty accumulates

The work Mu(t) exceeds the HOME floor (blue dashed) during approximately 7 am–6 pm — meaning agents have an incentive to be at work during that window.

**Simulation panel:**  
Virtually all workers are at work between 8 am and 5 pm. The orange block is crisp and time-consistent. This timing is *not imposed by a rule* — it emerges from the utility gradient alone. Agents depart when work utility exceeds home utility (accounting for travel overhead), and return when the lateness penalty erodes it below home.

**Key point:** The piecewise-linear schedule utility is the minimal specification that produces realistic, schedule-consistent commuting without any hard time-window constraint.

---

### Column 2 — Shopping

**Mu(t) panel:**  
Shopping utility is time-varying and zone-dependent:  
`μ(t, z) = β₁_shop × X[z] × P_open[z, t] + β₀_shop`

The P_open profile (Gaussian mixture) peaks in the mid-morning (~10 am) and late afternoon (~4 pm), reflecting typical retail opening hours. At baseline (β₁_shop=0.5, β₀_shop=−0.3), shopping utility rises above the HOME floor only during the opening-hour peaks.

**Simulation panel:**  
Shopping activity (red) appears in the late afternoon and evening — after workers return from work and when shops are still open. The fraction is modest (~40% of agents make at least one shopping trip) because the trip net value is only +0.23 — marginally positive. Any transport cost or time increase can suppress it.

**Key point:** Shopping timing is driven by two factors: (1) when P_open is high, and (2) when workers are free (after 5 pm). The model naturally produces the "after-work shopping" pattern without encoding it.

---

### Column 3 — Leisure (shown at β₁_leis = 0.65)

**Mu(t) panel:**  
This column uses a *raised* leisure parameter (β₁_leis=0.65) rather than the baseline (β₁_leis=0.4). At baseline, leisure Mu(t) stays *below* the HOME floor for the entire day — no leisure trips emerge. The raised beta is used deliberately to show what the leisure profile looks like when it is active, and to demonstrate emergent leisure trips.

The shaded green region shows where leisure utility exceeds home utility under β₁_leis=0.65. The shape follows P_open for leisure venues (similar Gaussian-mixture profile).

**Simulation panel:**  
With β₁_leis=0.65, leisure trips (green) appear in the afternoon and evening — short excursions when the leisure zone is open and utility exceeds the home floor.

**Key point:** This column demonstrates the *leisure activation* mechanism. At baseline (β₁_leis=0.4), leisure utility is too low to clear the home reservation floor — leisure is not suppressed by a rule but simply not worth the switching overhead. The threshold for activation is β₁_leis ≈ 0.525. The figure intentionally shows the above-threshold state to visualise what leisure looks like when activated.

**What this is NOT:** The leisure column does not represent baseline behaviour. It is a demonstration panel showing that the model *can* produce leisure trips when parameters are set above the activation threshold.

---

## Overall Interpretation

Figure 1 answers the most fundamental validation question: **does the utility specification produce internally consistent, realistic daily activity patterns without any hard constraints?**

The answer is yes:
- Work timing aligns with the schedule window — because Mu(t) is highest during scheduled hours
- Shopping occurs during open hours and after work — because P_open shapes the utility and workers are only free after 5 pm
- Leisure only appears when β₁_leis is above the activation threshold — because below it, the net trip value is negative

All three activity types produce timing that is a *consequence of preferences*, not a programmed rule. The HOME reservation floor (μ_home) acts as the universal threshold: any activity must beat it to be worth the switching cost.

---

## Baseline Parameters Used

| Parameter | Value |
|-----------|-------|
| δ | 0.15 |
| μ_home | 0.12 → HOME floor = 1.8 utils/step |
| β₁_shop | 0.5 |
| β₀_shop | −0.3 |
| β₁_leis (work/shop cols) | 0.4 (baseline) |
| β₁_leis (leisure col) | **0.65** (raised for demonstration) |
| c_change | −1.5 |

Agents: 300 workers, mandatory work zone 2, scheduled 8 am–5 pm.
