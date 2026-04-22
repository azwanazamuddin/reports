> 📊 Research Integration: This document demonstrates how temporal difference (TD) learning methods from reinforcement learning can be applied to estimate Dynamic Discrete Choice Models (DDCM) for activity-based travel demand, specifically addressing the computational challenges of high-dimensional state spaces in the Västberg model.

---

## Overview

Temporal-Difference estimation applies reinforcement learning techniques to estimate structural parameters in Dynamic Discrete Choice models, particularly when state spaces are continuous or high-dimensional, avoiding the need to estimate transition densities and repeatedly solve dynamic programming problems.

---

## Core Problem & Solution

### The Challenge

Traditional CCP methods require estimating transition density $K(x'|a,x)$ and choice probabilities $P(a|x)$, then solving Bellman equations to estimate $θ$, which is computationally prohibitive with continuous states.

### The TD Approach

Uses observed transitions $(x, a, x')$ to directly approximate value functions through two main methods:

- **Semi-gradient Method**: Fits linear model to TD errors (fast, closed-form)
- **Approximate Value Iteration (AVI)**: Iteratively improves approximations using any ML method (flexible)

---

## Mathematical Framework

### DDC Model Structure

**Utility Function**: $u(a, x, \theta) = z(a, x)'\theta + \varepsilon$

**Agent's Problem**: $\max_{\{a_t\}} \mathbb{E}\left[\sum_{t=1}^{\infty} \beta^t (z(x_{it}, a_{it})'\theta + \varepsilon_{it})\right]$

### CCP Inversion Theorem

**Proposition 1** establishes that the mapping from value function differences to choice probabilities is invertible: $v_j(H_t) - v_J(H_t) = Q^{-1}_j(p(H_t), H_t)$

This allows expressing value functions **without backward recursion**.

---

## TD Estimation Methods

### Method 1: Linear Semi-Gradient

**TD Error Definition**: $\delta(a, x, a', x'; f) = z(a, x)'\theta + \beta f(a', x') - f(a, x)$

**Functional Approximation**: $h(a, x) \approx \phi(a, x)'\alpha$

**Closed-Form Solution**: $\hat{\omega} = \underbrace{\mathbb{E}[\phi(a,x)(\phi(a,x) - \beta\phi(a',x'))']}{A}^{-1} \underbrace{\mathbb{E}[\phi(a,x)z(a,x)]}{b}$

**Advantages**:

- No transition density needed
- Simple computation (matrix inversion of dimension k × k)
- Fast closed-form solution

### Method 2: Approximate Value Iteration

**Iterative Formula**: $h^{(j+1)} = \arg\min_{f \in \mathcal{F}} \mathbb{E}_n\left[\left(z(a, x)'\theta + \beta h^{(j)}(a', x') - f(a, x)\right)^2\right]$

**Key Properties**:

- Can use any ML method (random forests, neural networks, LASSO)
- Each iteration is a standard prediction problem
- Convergence after J ≈ ln(n) iterations

---

## Locally Robust Estimation

### The Correction Term

To achieve √n-consistency, add correction terms that orthogonalize the estimating equation:

$$\psi_n(a, x, \theta, \hat{h}, \hat{g}) = m(a, x, \theta, \hat{h}, \hat{g}) + \hat{\omega}(a', x')[z(a, x)'\theta - \hat{h}(a, x) + \beta\hat{h}(a', x')] + \hat{\omega}(a', x')[\tilde{e}(a', x') - \hat{g}(a, x) + \beta\hat{g}(a', x')]$$

This ensures small errors in estimating h have no first-order effect on estimating θ.

---

## Application to Västberg DDCM

### Model Specifications

**State Space** (x_t):

- Current location: 1,240 locations in Stockholm
- Current time: continuous, discretized to 10-minute intervals
- Activity history
- Mode of last trip

**Action Space** (a_t = (d, l, m)):

- Activity type: home, work, shopping, social, travel
- Destination location
- Travel mode: walk, bike, car, PT

### Computational Advantages

**High-Dimensional State Spaces**:

- Basis functions automatically generalize across locations
- No need to visit every state in data
- Approximation quality depends on smoothness, not dimensionality

**Continuous Time**:

- Continuous basis functions naturally handle continuous time
- No discretization artifacts
- Captures smooth time-of-day variations

**No Transition Density Estimation**:

- Only requires observed (x, a, x') tuples
- Avoids parametric misspecification of transitions

---

## Basis Function Construction

### Spatial Component

$$\phi_{\text{spatial}}(l) = [\sin(2\pi \mathbf{w}_1 \cdot \mathbf{p}_l), \cos(2\pi \mathbf{w}_1 \cdot \mathbf{p}_l), \ldots]$$

### Temporal Component

$$\phi_{\text{time}}(t) = [1, t, t^2, \sin(2\pi t/24), \cos(2\pi t/24), \ldots]$$

### Combined Basis

$$\phi(a, x) = \phi_{\text{discrete}}(d, m) \otimes \phi_{\text{spatial}}(l) \otimes \phi_{\text{time}}(t)$$

With typical dimensions, total k = 20,000, requiring only one matrix inversion.

---

## Theoretical Guarantees

### Convergence Theorem (Semi-Gradient)

**Approximation Error**: $$|h(a, x) - \phi(a, x)^\top\omega^*|_2 \leq (1-\beta)^{-1}Ck^{-\alpha}$$

**Estimation Error**: $$|h(a, x) - \phi(a, x)^\top\hat{\omega}|_2 = O_p\left((1-\beta)^{-1}\left(\frac{k}{\sqrt{n}} + k^{-\alpha}\right)\right)$$

### Convergence Theorem (AVI)

After J iterations: $$\mathbb{E}[|h - \hat{h}^J|^2] \leq \frac{C(1-\beta^{J-1})}{1-\beta} n^{-c} + M_1\beta^{J-1}$$

---

## Two-Stage Estimation Procedure

### Stage 1: Estimate Value Functions

1. Collect data: {(a_i, x_i, a'_i, x'_i)}_{i=1}^n from travel diaries
2. Estimate ĥ(a, x) and ĝ(a, x) using semi-gradient or AVI
3. Compute v̂(a, x) = ĥ(a, x) + ĝ(a, x)

### Stage 2: Estimate Structural Parameters

Maximize pseudo-likelihood: $$\hat{\theta} = \arg\max_\theta \sum_{i=1}^n \log P(a_i|x_i; \theta, \hat{v})$$

where: $$P(a|x; \theta, \hat{v}) = \frac{\exp[\hat{v}(a, x; \theta)]}{\sum_{a'} \exp[\hat{v}(a', x; \theta)]}$$

---

## Extensions

### Unobserved Heterogeneity

Combine TD with EM algorithm to handle discrete heterogeneity in preferences, different discount factors, and unobserved activity constraints.

### Dynamic Games

Directly observe (a_i, a_{-i}, x, x') in data without need for integration over other players' actions.

### Computational Scalability

- Embarrassingly parallel: each observation contributes independently
- Online learning: can update estimates as new data arrives
- Near-linear speedup with number of processors

---

## Key Insight

The observed next state x' already contains information about both the transition density and choice probabilities; TD methods exploit this by using x' as a sample from K(·|a, x), avoiding explicit density estimation.