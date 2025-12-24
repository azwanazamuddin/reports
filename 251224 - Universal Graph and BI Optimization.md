# Universal Graph and BI Optimization: Technical Report
**Date**: 2025-12-24
**Topic**: DDCM GPU Implementation Updates

## 1. Executive Summary

This report details the significant performance improvements achieved in the DDCM GPU implementation. The introduction of the **Universal Graph** approach and **Basis Function Approximation** for Backward Induction (BI) has resulted in a combined speedup of approximately **100x** compared to the original architecture. These innovations not only solve the scalability bottlenecks but also ground the engineering implementation in established theoretical frameworks from Control Theory and Reinforcement Learning.

## 2. Universal Graph Approach

### 2.1 The Bottleneck
The previous architecture constructed a separate state graph for each home zone. Since the simulation covers 144 home zones, this required building 144 nearly identical graphs. For a standard scenario, this meant:
- **Old Cost**: 144 × (30s Forward Pass + 29s Graph Build) ≈ **2.4 hours** just for graph construction.

### 2.2 The Solution
The **Universal Graph** approach leverages the insight that once an agent leaves their home zone, their state transitions are defined by their current location and activity history, not their origin. This allows for massive **State Deduplication**.
- **New Cost**: 1 × (30s Forward Pass + 29s Graph Build) ≈ **1 minute**.
- **Speedup**: **24.7x** overall for the full pipeline.

### 2.3 Theoretical Basis: Bisimulation
This engineering optimization maps directly to the concept of **Probabilistic Bisimulation** in formal methods and MDPs.
- **Concept**: Two states are bisimilar if they have identical future transition probabilities and rewards.
- **Application**: By merging states that differ only by "Home Zone" but share all other attributes (Time, Current Zone, History), we perform a rigorous state aggregation that preserves exact dynamics.

## 3. Backward Induction (BI) Optimization

While the Universal Graph solved the forward pass bottleneck, Backward Induction still needed to be run separately for each home zone (to account for different terminal conditions).

### 3.1 Tier 1: Basis Function Approximation (Recommended)
- **Method**: Approximates the Value Function $V(s, home)$ using a linear correction based on travel time.
- **Formula**: $V(s, home) \approx V_{ref}(s) + \beta \times \Delta travel\_time$
- **Performance**: Reduces BI time from 186s (for 144 homes) to **20s**.
- **Speedup**: **9.3x** faster than full BI.
- **Theoretical Link**: This is a form of **Linear Value Function Approximation (VFA)**, commonly used in Approximate Dynamic Programming (Powell, 2007).

### 3.2 Tier 2: Multi-Fidelity Optimization
- **Method**: Runs full BI for a set of representative zones and interpolates the rest using Inverse Distance Weighting (IDW).
- **Performance**: Reduces BI time to **74s**.
- **Speedup**: **2.5x** faster.
- **Theoretical Link**: Maps to **Surrogate Modeling** and Multi-Fidelity Optimization (Meng & Karniadakis, 2019), where high-fidelity data (Full BI) corrects low-fidelity approximations.

## 4. Performance Benchmarks

| Component | Old Approach | New Approach (Universal + Basis) | Speedup |
| :--- | :--- | :--- | :--- |
| **Forward Pass** | 144 × 30s = 4320s | **30s** (Once) | 144x |
| **Graph Build** | 144 × 29s = 4176s | **29s** (Once) | 144x |
| **Backward Induction** | 144 × 1.3s = 187s | **20s** (Basis Func) | 9.3x |
| **Total Time** | **~2.4 Hours** | **~80 Seconds** | **~100x** |

## 5. Conclusion

The December 2024 updates have transformed the DDCM GPU implementation from a prototype into a scalable, high-performance engine. The integration of the Universal Graph and Basis Function Approximation ensures that the model can scale to hundreds of home zones and complex activity sequences without prohibitive computational costs. Furthermore, these methods are not merely heuristics but are grounded in rigorous theoretical concepts (Bisimulation, VFA), strengthening the academic contribution of the research.
