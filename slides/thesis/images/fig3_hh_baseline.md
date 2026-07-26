# Fig 3 — City-Scale Baseline: Higashihiroshima 144-zone Network

**File:** `fig3_hh_baseline.png`  
**Section:** §4.2 Computational Validation — Higashihiroshima Real Network  
**Layout:** 1 row × 2 panels + legend

---

## What the Figure Shows

This figure shows the **population-level daily activity distribution** for the Higashihiroshima (HH) city-scale simulation, loaded from a pre-computed baseline run. It is split by person type:

- **Left panel:** Workers (n=210)
- **Right panel:** Non-workers (n=90)

Each panel is a stacked area chart — at every 15-minute time step, the fraction of agents in each activity (home, work, shopping, leisure, travel) is shown as a colour band.

---

## Important Scope Note

**This figure is computational validation, not behavioral validation.**

The HH simulation uses the same K=9 parameters as the toy case, applied to the real 144-zone Higashihiroshima network. The purpose is to demonstrate that the framework *runs correctly at city scale*, not to interpret the behavioral results as definitive. Full behavioral interpretation of HH requires K=9 parameter estimation from real HH survey data (currently pending).

Think of this figure as proof that the engine works on real geography — not as a policy-ready model output.

---

## Left Panel — Workers (n=210)

**What you see:**
- Large orange (work) block dominating the mid-day period (~8 am to ~5 pm)
- Blue (home) filling the morning before work and evening after return
- Small amounts of red (shopping) in the late afternoon/evening
- Grey (travel) bands around the work block at morning departure and evening return
- Very little green (leisure)

**Interpretation:**

The work pattern is consistent with the toy case — workers commute to work near their scheduled start time and return after their scheduled end time. Timing is utility-emergent (Mu(t) piecewise linear around individual schedules).

Shopping appears in the late afternoon and evening — same pattern as the toy case. The 144-zone real network introduces heterogeneity in travel times and zone-level retail density (X[z]), so shopping rates vary by agent home zone and workplace zone. Agents closer to retail zones or with shorter travel times are more likely to shop.

Leisure is minimal, consistent with the toy case baseline (β₁_leis=0.4 is below the activation threshold ~0.525 at most zones).

**Difference from toy case:** The HH worker distribution is qualitatively similar to the 3-zone toy case but with smoother, more gradual transitions. This is because the 144-zone network has continuous variation in travel times — agents with nearby workplaces depart later, agents with distant workplaces depart earlier. The sharp on/off of the toy case becomes a smoother distribution over the population.

---

## Right Panel — Non-workers (n=90)

**What you see:**
- Almost entirely blue (home) for the full day
- Very small red (shopping) band — barely visible
- No visible work, leisure, or significant travel

**Interpretation:**

Non-workers in the real network behave the same way as in the toy case: home dominates because no discretionary activity reliably beats the home reservation utility (μ_home = 0.12/min) after accounting for switching overhead.

The real network adds zone-level heterogeneity — some non-workers live near retail zones with high X[z] and can shop profitably, while others live far from any discretionary activity zone. Aggregating across 90 non-workers produces the near-all-home pattern.

This matches the toy-case non-worker finding: V₀ ≈ μ_home × 1440 = 172.8 ≈ full-day home utility.

---

## Comparison to Toy Case

| Feature | Toy case (3 zones) | HH baseline (144 zones) |
|---------|-------------------|------------------------|
| Worker shopping rate | ~38% | Lower (varies by zone proximity) |
| Work block timing | Sharp 8–5 pm | Smoother distribution across agents |
| Non-worker pattern | ~100% home | ~100% home |
| Leisure | Not visible (β₁<threshold) | Not visible (same β₁) |
| Travel bands | Thin (short toy distances) | Slightly wider (real network distances) |

The qualitative story is the same: work structures the worker's day; non-workers are home-dominant; shopping is a marginal evening activity.

---

## What This Figure Does NOT Show

- **Behavioral interpretation of HH parameters:** The K=9 parameters here are from the toy case, not estimated from real HH survey data. Actual HH behavioral patterns may differ once proper estimation is complete.
- **Welfare analysis:** No policy scenarios or transport sensitivity shown — that is the toy case's role.
- **Individual trajectories:** The stacked distribution shows population fractions, not individual Gantt charts. Individual path heterogeneity is visible as smooth gradients (some workers still at work at 6 pm, etc.).

---

## What This Figure DOES Show

1. **The framework runs on a real 144-zone city network.** The graph construction, backward induction, and population simulation all complete successfully with real OD matrices and zone attributes.
2. **Population structure is preserved.** Worker vs non-worker heterogeneity is maintained through the activity-sequence partitioned universal graph.
3. **Qualitative patterns are plausible.** Work blocks, home dominance, and marginal shopping are all behaviorally consistent with known travel diary patterns, even without calibrated parameters.
4. **Scale is demonstrated.** n=300 agents across 144 zones with 5 transport modes — the same framework that handles 3 zones handles 144 zones without modification.

---

## Data Source

Loaded from: `results/whatif_hh/images/baseline_schedules.csv`  
Rows: 27,350 (step-level records across all agents)  
Columns: Step, StartTime, EndTime, Zone, Activity, Mode, Utility, V, ActivityHistory, person_type, home_zone

The CSV was generated by a prior `behavior_whatif_hh.py` baseline run on the real HH network.
