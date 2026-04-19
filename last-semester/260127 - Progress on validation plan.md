# DDCM Validation Framework Summary

**Source**: `0 - Inbox/drafts/new materials for DDCM (condition)/validation_process.md`
**Date**: 2026-01-27

## Overview
This document summarizes the framework for the algorithm implementation. The framework integrates academic standards (Västberg et al., 2020), Approximate Dynamic Programming (ADP) validation (Powell, 2011), and Relational MDP (RMDP) verification.

**Validation Philosophy**: 
Theoretical Correctness → Approximation Quality → Empirical Validation → Predictive Performance → Policy Testing

## Validation Components

### 1. Theoretical Validation (Algorithm Correctness)
*   **Objective**: Verify the core Dynamic Programming (DP) algorithm follows theory.
*   **Key Tests**:
    *   **Bellman Equation**: Verify log-sum-exp computation and terminal boundary conditions.
    *   **Choice Probabilities**: Ensure probabilities sum to 1.0 and satisfy IIA.
    *   **Value Function Properties**: Check for monotonicity (value decreases as time runs out) and boundedness.

### 2. ADP Approximation Validation
*   **Objective**: Assess accuracy of approximate value functions ($\tilde{V}$) compared to optimal ($V^*$).
*   **Key Tests**:
    *   **Small Problem Comparison**: Compare approximate vs. exact solutions on small state spaces (Target: Relative Error < 5%).
    *   **Basis Function Validation**: Check coefficient magnitudes, feature correlations, and residual analysis.
    *   **Optimality Gap**: Estimate the gap between approximate and optimal policies (Target: < 5%).

### 3. Relational MDP (RMDP) Validation
*   **Objective**: Validate lifted representations and state abstractions used to handle large state spaces.
*   **Key Tests**:
    *   **Correctness (Formal Verification)**: Compare lifted solution to grounded solution on small instances (Value Error $\approx$ 0).
    *   **Scalability**: Confirm computational time grows polynomially, not exponentially, with the number of objects/zones.
    *   **Abstraction Validity**: Verify that objects treated as indistinguishable are truly equivalent (Partition Equivalence Test).
    *   **Markov Property**: Ensure the relational abstraction preserves the Markov property.

### 4. Empirical Validation
*   **Objective**: Match observed data used for estimation (Within-Sample).
*   **Benchmarks**:
    *   **Mode shares**: < 2% absolute error (Chi-square test).
    *   **Trips/day**: < 5% relative error (MAPE).
    *   **Activity start times**: p > 0.05 (KS Test).
*   **Statistical Tests**: Chi-Square for categorical outcomes, KS Test for continuous distributions.

### 5. Predictive Validation
*   **Objective**: Assess generalization to unseen data (Out-of-Sample).
*   **Key Tests**:
    *   **Holdout Validation**: 70/30 train/test split. Target: Test Error < 1.5 × Train Error.
    *   **Cross-Validation**: 5-Fold CV. Target: Parameter CV < 10%.
    *   **Sensitivity Analysis**: Parameter sensitivity and discretization robustness.

### 6. Computational Validation
*   **Objective**: Ensure numerical accuracy and implementation correctness.
*   **Key Tests**:
    *   **CPU-GPU Consistency**: Verify results match within numerical precision (diff < 1e-5).
    *   **Numerical Stability**: Test log-sum-exp and ensure no NaN/Inf values.
    *   **Implementation Verification**: Unit tests (> 90% coverage) and integration tests.

### 7. Reporting Standards
*   **Requirements**:
    *   Standardized tables for model specification, parameter estimates, and validation metrics.
    *   Completion of a comprehensive validation checklist before submission.

## Key Success Criteria Summary

| Category | Metric | Target |
| :--- | :--- | :--- |
| **Theoretical** | Probability Sum | 1.0 ± 1e-6 |
| **ADP** | Approximation RMSE | < 5% of $|V^*|$ |
| **RMDP** | Grounded vs Lifted Error | $\approx$ 0 |
| **Empirical** | Mode Share Error | < 2% |
| **Empirical** | Trip Frequency Error | < 5% |
| **Predictive** | Parameter CV | < 10% |
| **Computational** | CPU-GPU Diff | < 1e-5 |
