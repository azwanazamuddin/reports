---
title: DDCM Progress Report - Readings and Implementation Plans
type: report
status: complete
created: 2025-11-04
tags: [ddcm, progress-report, approximate-dp, reinforcement-learning, implementation-plan]
---
# DDCM Progress Report: Readings & Implementation Plans

> **Report Date:** 2025-11-04
> **Scope:** Summary of theoretical readings (Approximate DP, RL fundamentals) and implementation approaches (with/without post-decision states)

---

## Reading Progress Summary

### 1. Approximate Dynamic Programming
**Source:** Powell (2022) - *RL and Stochastic Optimization*
**Key Insights:**
- **Terminology alignment**: Field uses various names (forward DP, adaptive DP, reinforcement learning, neuro-dynamic programming) → converged to "approximate dynamic programming"
- **State-value vs action-value**: Different fields use different notations (MDP: S,a; control theory: x,u)
- **Forward simulation + VFA**: Alternative to backward induction for large state spaces
- **Main takeaway**: For DDCM with explicit utilities → use **TD(λ) for state-value learning**, not Q-learning

### 2. RL Fundamentals Review
**Focus:** MDP formulation and DDCM mapping
**Core Understanding:**
- **DDCM = MDP**: Daily activity-travel planning as episodic, finite-horizon MDP
- **Problem type**: Control problem (finding optimal policy, not just evaluation)
- **Model paradox**: DDCM is model-based (defined with transitions/utilities) BUT computationally infeasible to solve with traditional DP → use model-free RL algorithms
- **VFA necessity**: State space ~688K combinations requires function approximation
- **Policy learning**: Two options analyzed:
  1. **Action-value (Q-learning/Sarsa)**: Learn Q(s,a) when reward unknown
  2. **State-value + Actor-Critic**: Learn V(s) with policy gradient
**Key Decision:**
- DDCM has **known utility functions** → TD(λ) for V(s) is more efficient
- Logit policy provides natural exploration (no ε-greedy needed)

### 3. Review-RL Deep Dive
**Status:** In-progress refinement of approach
**Main Conclusions:**
- On-policy methods (Sarsa, Actor-Critic) considered but **not optimal for DDCM**
- Action-value learning unnecessary when utilities are explicit
- Credit assignment challenge in long episodes → eligibility traces (λ=0.7-0.9) essential
- Comparison to Västberg's FQI (batch off-policy) needed for validation

### 4. Why MCTS Approach Was Wrong
**Critical Issues Identified:**
**Problem 1: Not True Approximate DP**
- MCTS approach used behavioral cloning (supervised learning on backward induction results)
- This is NOT approximate dynamic programming per Powell's framework
- Creates circular dependency: needs backward induction to train, but goal is to avoid it

**Problem 2: No Value Function Approximation**
- MCTS doesn't learn generalizable value function across state space
- Each decision requires rebuilding search tree from scratch
- Neural networks only serve as priors, not true approximations
- Still requires full rollouts without bootstrapping

**Problem 3: Off-Policy Learning Issues**
- Training on backward induction results = off-policy
- Silver's Lecture 6: Off-policy TD with non-linear VFA has no convergence guarantees
- Distribution mismatch: training distribution ≠ execution distribution

**Problem 4: Computational Inefficiency**
- Training: O(budget × depth × |A|) ≈ 500K operations per decision
- Full rollouts to terminal states required (96 time steps)
- Tree search time: 2-5 seconds per individual
- Compare to TD: O(|A| × d) ≈ 1K operations, <0.1 seconds

**Problem 5: Overfitting Risk**
- Neural network: ~1000 parameters
- Training data: ~100 individuals × 10 transitions = 1000 examples
- Data-to-parameter ratio: 1:1 (Powell warns this causes overfitting)
- TD approach: 100-500 parameters with ~192K examples (400:1 ratio)

**Theoretical Contradiction:**
- Powell (Ch. 16-18) defines ADP as learning value functions from experience online
- MCTS with behavioral cloning = supervised learning + tree search (not RL)
- No bootstrapping: V(s) not used to estimate V(s'), requires full Monte Carlo
- Powell classifies MCTS as "Direct Lookahead (DLA)", not VFA policy

**Correct Classification:**

| Method             | Is it ADP?                | Convergence Guarantee?         | Planning Cost  |
|:-------------------|:--------------------------|:-------------------------------|:---------------|
| **MCTS approach**  | NO (behavioral cloning)   | NO (off-policy + non-linear)   | O(500K) ops    |
| **TD(λ) approach** | YES (Forward ADP II)      | YES (on-policy + linear)       | O(1K) ops      |

**Verdict:** Abandoned MCTS in favor of proven TD(λ) approach with linear VFA.

---

## Implementation Plans Overview

### Approach 1: Standard TD(λ) (PRIMARY)

**Priority:** Implement this first

**Core Strategy:**
```
State: S_t = (time, zone, activity, τ, mode, h)
Value: V(S_t; w) = w^T φ(S_t)
Update: δ_t = r_t + γV(S_t+1) - V(S_t)
Policy: P(a|S_t) ∝ exp{u(S_t,a) + γV(S_t+1)}
```

**Key Features:**
- Linear function approximation (~120 features)
- Episodic batch updates (maintains trace structure)
- Generalized harmonic stepsize: α_n = a/(a+n-1)^b
- Target: 85-95% of Västberg optimal, ~1500 episodes

**Feature Design:**
- Time (24): Periodic (sin/cos) + RBF kernels + polynomial
- Space (14): Zone one-hot
- Activity (16): Type + duration features
- Mode (8): One-hot encoding
- History (6): Activity count + progression
- Interactions (48): Time×activity, time×zone, duration×activity

**Training Strategy:**
- Buffer 100 episodes, update every 10 episodes
- 3 epochs per batch (maintains temporal order)
- Expected: 4-6 hours training, 1000-1500 episodes to convergence

### Approach 2: TD(λ) with Post-Decision States (ADVANCED)

**Priority:** Implement AFTER standard approach works

**Core Innovation:**
```
Post-decision: S_t^x = (time, zone, activity, τ, mode, h)  [no errors!]
Value: V̄(S_t^x; w) = w^T φ(S_t^x)
Update: δ_t = r_t + γV̄(S_t+1^x) - V̄(S_t^x)
```

**Why Post-Decision:**
- Removes Gumbel error terms from state → deterministic
- Smoother value function → better generalization
- Lower variance updates → faster convergence
- Perfect fit: DDCM has "decision → randomness → outcome" structure

**Expected Improvements:**
- 1.2-1.5× faster convergence (empirical from Powell 2022)
- +2-5% higher final performance
- 10-20% lower TD error variance
- Better stability across random seeds

**Implementation Differences:**
- Store post-decision states in trajectories
- Features identical structure, but no error-dependent features
- Add car constraint features (2 dims)
- Same hyperparameters for fair comparison

---
## Theoretical Foundation

**Why TD(λ) for DDCM:**

| Component | DDCM Reality | Implication |
|-----------|--------------|-------------|
| Rewards | Known utilities u(s,a) | Learn V(s), not Q(s,a) |
| Policy | Logit over {u + γV} | Natural exploration |
| Episodes | Long (~15-30 decisions) | Need eligibility traces |
| State space | ~688K combinations | Need function approximation |
| Transitions | Deterministic given action | Fits post-decision formulation |

**Algorithm Selection Logic:**
- Unknown rewards + unknown policy → Q-learning/Sarsa
- Known rewards + deterministic policy → DP/backward induction
- **Known rewards + need learning → TD(λ) for V(s)** [CHECK] DDCM case

---

## Next Actions

1. [DONE] Complete theoretical review (Approximate DP, RL fundamentals)
2. [TODO] Implement standard TD(λ) approach (Phase 1)
3. [TODO] Validate against Västberg baseline
4. [TODO] If successful: implement post-decision variant
5. [TODO] Comparative analysis and documentation

---