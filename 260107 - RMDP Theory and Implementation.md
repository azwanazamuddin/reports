# Relational Markov Decision Processes: Theory and Implementation for DDCM

> **Abstract**: This report presents a comprehensive overview of Relational Markov Decision Processes (RMDPs) and their practical application to the Dynamic Discrete Choice Model (DDCM) for activity-based travel demand modeling. We bridge the theoretical foundations from Boutilier et al.'s seminal work on Symbolic Dynamic Programming with a practical GPU-accelerated implementation that achieves ~20,000× speedup for population-scale simulations.

---

## 1. Introduction: The Curse of Dimensionality in Standard MDPs

In a standard Markov Decision Process (MDP), you must explicitly enumerate every possible state and action. For travel demand modeling, this creates a fundamental scaling problem:

**Example**: For a logistics or travel problem with 144 zones, if each agent has a unique (home, work) configuration:
- **Unique graphs needed**: 144 × 144 = 20,736 graphs
- **Graph build time**: ~55 seconds each
- **Total time**: 20,736 × 55s ≈ **316 hours (13 days)**

This exponential explosion—the "curse of dimensionality"—makes standard MDPs impractical for real-world applications involving many locations, agents, or time periods.

---

## 2. Theoretical Foundations of RMDPs

### 2.1 From Propositional to First-Order Logic

RMDPs solve the dimensionality problem by borrowing ideas from **First-Order Logic (FOL)**. Instead of a flat list of states, RMDPs describe the world using:

| Component | Description | Example |
|-----------|-------------|---------|
| **Objects & Classes** | General categories rather than specific individuals | `Box`, `Truck`, `City`, `Zone` |
| **Relations (Fluents)** | Predicates describing state that change over time | `On(box, truck)`, `In(truck, city)` |
| **Action Schemas** | Templates that apply to any objects | `drive(truck, city_a, city_b)` |

### 2.2 The Power of Quantifiers

First-Order Logic provides two quantifiers that enable abstraction:

- **Universal Quantifier (∀)**: "For all"
  - Example: ∀b, ¬On(b, Truck1, s) means "Truck 1 is empty"
  
- **Existential Quantifier (∃)**: "There exists"
  - Example: ∃b, In(b, Paris, s) means "At least one box is in Paris"

**Key Insight**: A single logical formula can describe policy for any number of objects:

$$\exists b, \text{On}(b, \text{Truck1}) \implies \text{Drive to Paris}$$

This applies whether you have 5 boxes or 500 boxes.

---

## 3. Symbolic Dynamic Programming (Boutilier et al., 2001)

### 3.1 Core Problem Addressed

Traditional MDP algorithms become impractical when:
- State spaces grow exponentially with domain features
- Problems involve relational fluents between objects
- Domains contain unbounded or infinite numbers of objects
- Quantification is needed (e.g., "there exists some box in Paris")

### 3.2 Key Innovation: Situation Calculus

Boutilier's approach uses **situation calculus** as the representational language:

| Element | Notation | Example |
|---------|----------|---------|
| **Actions** | First-order terms | `putTable(b)` |
| **Situations** | Action sequences via `do(action, s)` | `do(stack(A,B), S₀)` |
| **Fluents** | Relations varying by situation | `BIn(b, Paris, s)` |

### 3.3 Decomposing Stochastic Actions

A critical trick: decompose stochastic actions into deterministic primitives with probabilistic outcomes:

```
Stochastic load(b,t) becomes:
  - loadS(b,t) — successful load (probability 0.9)
  - loadF(b,t) — failed load (probability 0.1)
```

### 3.4 Case Notation for Value Functions

Value functions are represented without state enumeration using **case notation**:

```
V(s) = case {
   ∃b. BIn(b, Rome, s) → 10,    // If any box is in Rome, value = 10
   ¬∃b. BIn(b, Rome, s) → 0     // Otherwise, value = 0
}
```

This applies regardless of how many boxes exist—a **universal description**.

### 3.5 First-Order Decision-Theoretic Regression (FODTR)

The core algorithm computes Q-functions symbolically:

$$Q^V(A(x), s) = R(s) + \gamma \sum_j \text{prob}(n_j(x) | A(x), s) \times V(do(n_j(x), s))$$

**Key steps**:
1. Substitute case statements for R(s), prob(·), and V(·)
2. Apply regression to move from future situation back to current
3. Combine results using case operators

### 3.6 Dual Abstraction: States AND Actions

A crucial advantage is **action abstraction**. A single condition like:

```
On(b,t,s) ∧ TIn(t, Paris, s) ∧ ¬∃b'. BIn(b', Paris, s)
```

describes when to execute `unload(b,t)` for **any** box b and truck t satisfying these conditions—no enumeration needed.

---

## 4. Our RMDP Implementation: Zone Abstraction

### 4.1 Design Philosophy: Grounded RMDP with Parameterized State Abstraction

Our implementation achieves the practical benefits of RMDPs without the complexity of full symbolic logic operations:

| Aspect | Boutilier SDP | Our RMDP Approach |
|--------|---------------|-------------------|
| **State Representation** | First-order logic formulas | Integer tensor (N, 8) |
| **Value Function** | Logical case statements | 1D numerical tensor |
| **Computation** | Sequential symbolic ops | GPU-parallel numerical |
| **Scalability** | Infinite domains | Fixed at 144 zones |
| **Implementation** | Complex symbolic stack | Standard DP |

### 4.2 Abstract Zone Roles

Instead of encoding **concrete zones** in the state, we use **abstract roles** resolved at runtime:

| ZoneID | Value | Type | Description |
|--------|-------|------|-------------|
| `HOME` | 0 | Abstract | Agent's home zone |
| `WORK` | 1 | Abstract | Agent's work zone |
| `SCHOOL` | 2 | Abstract | Agent's school zone |
| `ZONE_1...144` | 3-146 | Concrete | Direct mapping to CZONE |

**Key Insight**: The decision structure is **identical** for all agents—only travel times differ. These are resolved at runtime via agent-specific `ZoneBinding`.

### 4.3 ZoneBinding: Runtime Resolution

```python
# Alice's binding
alice_binding = ZoneBinding(
    home=Zone.CZONE_10,
    work=Zone.CZONE_50,
    school=None
)

# Bob's binding
bob_binding = ZoneBinding(
    home=Zone.CZONE_25,
    work=Zone.CZONE_73,
    school=None
)

# Same graph, different concrete zones at runtime
alice_binding.resolve(ZoneID.HOME)  # → Zone.CZONE_10
bob_binding.resolve(ZoneID.HOME)    # → Zone.CZONE_25
```

### 4.4 How RMDP Preserves Optimality

1. **Decision Structure**: Actions available are identical for all agents
2. **Abstract Roles**: Mandatory zones (HOME, WORK, SCHOOL) use abstract roles during planning
3. **Runtime Binding**: Actual travel times resolved at simulation time
4. **Shared V-function**: All agents use the same value function

---

## 5. Implementation Architecture

### 5.1 New Modules Created

| File | Purpose |
|------|---------|
| `core/zone_abstraction.py` | ZoneID enum, ZoneBinding class |
| `core/state_rmdp.py` | StateRMDP, StateEncoderRMDP |
| `planning/forward_pass_rmdp.py` | RMDP Forward Pass |
| `planning/backward_induction_rmdp.py` | RMDP Backward Induction |
| `planning/simulate_rmdp.py` | RMDP Simulation with binding resolution |

### 5.2 Pipeline Timing (Full Day, 1440 minutes)

| Step | Time | Output |
|------|------|--------|
| RMDP Forward Pass | ~8.4s | 418,210 states, 21.8M edges |
| Graph Build (CSR) | ~0.2s | Sparse format, 6.7 MB |
| Backward Induction | ~0.2s | 81.6% valid states |
| **Total** | **~8.7s** | Works for ALL (home, work) combos |

---

## 6. Performance Comparison

| Approach | Graph Builds | BI Runs | Total Time (144×144) | Speedup |
|----------|-------------|---------|----------------------|---------|
| **Baseline (No Pruning)** | 20,736 | 20,736 | 71.1h × 20,736 ⚠️ | 1× |
| Standard GPU | 20,736 | 20,736 | ~316 hours | varies |
| Universal Graph | 144 | 144 × 144 | ~14 hours | 23× |
| Universal + Basis Function | 144 | 144 × 8 | ~1.5 hours | 210× |
| **RMDP Zone Abstraction** | **1** | **1** | **~50 seconds** | **29,382×** |

### 6.1 Resource Savings

| Metric | Before RMDP | After RMDP | Improvement |
|--------|-------------|------------|-------------|
| Graphs needed | 20,736 | **1** | 20,736× |
| Build time (worst case) | 316 hours | **8.7 seconds** | ~131,000× |
| Memory | 621 GB | **30 MB** | 20,736× |

---

## 7. Theoretical Connection: Boutilier → Our Implementation

| Our Approach | RMDP Concept |
|--------------|--------------|
| Abstract zone roles (HOME, WORK) | First-order predicates |
| Zone bindings | Instantiating quantified variables |
| Universal graph | Case-statement partitioning of state space |
| Parameterized travel times | Symbolic value terms in case expressions |

**Key Finding**: Our approach achieves the **practical benefits** of RMDP (~20,000× speedup) **without** the implementation complexity of full symbolic logic operations.

---

## 8. Conclusion

RMDP Zone Abstraction represents the **most impactful optimization** in the DDCM project:

1. **~20,000× speedup** for population-scale simulations
2. **One universal graph** for all (home, work, school) combinations
3. **Runtime binding** resolves abstract zones to concrete zones
4. **Exact solutions** maintained (same optimality as per-agent graphs)
5. **Simple implementation** compared to full Symbolic Dynamic Programming

This enables simulating entire populations (thousands of agents with diverse home/work zones) in **seconds rather than weeks**.

---

## References

1. **Boutilier, C., Reiter, R., & Price, B. (2001)**. Symbolic Dynamic Programming for First-Order MDPs. *IJCAI*.

2. **Powell, W.B.** Reinforcement Learning and Stochastic Optimization.

3. **McCarthy et al. (2025)**. Activity-duration-dependent utility in a dynamic scheduling model.

4. **Västberg et al. (2020)**. A Dynamic Discrete Choice Activity-Based Travel Demand Model.

---

*Last Updated: January 7, 2026*
