# Fig 2a — Worker Activity Pattern (Option-A spec)

**File:** `fig2a_worker.png` · regenerated 2026-06-20
**Slide:** "Toy Case: Worker Activity Pattern"

## What it shows
Stacked agent-fraction by hour (fig3_hh_baseline style: Home=blue, Work=orange, Shopping=red,
Leisure=green, Travel=grey) for the **worker** archetype on the 6-zone small synthetic net at θ*.
Reads as a realistic worker day: home overnight → morning commute (travel) into work → midday
shopping → evening leisure → home. All timing utility-emergent (no hard windows).

## Change vs April version
Was a 3×3 transport-stress sensitivity grid (cost/time sweeps + V₀ welfare). Now a single clean
activity-distribution panel matching the city-scale Fig 3 style. Source:
`make_apte_figures.py` (behavioral_smallnet.json → `dist_star_by_arch['worker']`).
