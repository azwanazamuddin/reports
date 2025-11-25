---
title: Summary of SMASO-X Presentation: Approximate DDCM
type: finding
status: complete
created: 2025-11-09
updated: 2025-11-09
tags: [ddcm, reinforcement-learning, td-estimation, presentation]
---

# Summary of SMASO-X Presentation: Approximate DDCM

**Date:** 2025-11-09

This document summarizes the key points from the SMASO-X webinar presentation titled "Approximate Dynamic Discrete Choice Activity-Based Travel Demand Model."

## 1. Research Problem & Motivation

The research initially focused on optimizing ride-hailing driver decisions using activity-based models and Reinforcement Learning (RL). However, this led to the discovery of a more fundamental challenge within the field: the **"Curse of Dimensionality"** in Dynamic Discrete Choice Models (DDCMs).

DDCMs are used to model the sequential daily decisions of individuals (e.g., when to work, where to shop). When applied to realistic, city-scale scenarios with many locations and choices, the number of possible states becomes computationally explosive, making traditional Dynamic Programming (DP) solutions like backward induction infeasible.

The research pivoted to solve this foundational barrier.

## 2. Research Objectives

The primary goal is to develop a **scalable solution for large-scale DDCMs**.

- **Algorithm:** Use Reinforcement Learning (RL), specifically value function approximation, to handle the large state space.
- **Validation:** Prove the method works mathematically and practically by being faster than traditional DP.
- **Application:** Test the model using a case study of Higashihiroshima, aiming for 85-95% similarity with real-world activity-travel data.

## 3. Methodology & Experiments

### Failed Attempt: Monte Carlo Tree Search (MCTS)

- **Idea:** Apply the successful approach from AlphaGo to activity planning.
- **Result:** Failed.
- **Reason:** MCTS lacks **memory and generalization** between simulations. It builds a new decision tree from scratch for each simulated day, preventing it from learning and remembering patterns across different simulations.

### Proposed Solution: TD(λ) with Value Function Approximation (VFA)

- **Concept:** Instead of storing a value for every state, this method learns a **function** that approximates state values based on a set of features.
- **Mechanism:**
    1. Generate simulations of daily activity patterns.
    2. Extract key features from each state (e.g., time of day, current location, activity history).
    3. Use Temporal Difference (TD) learning to train a model (e.g., a linear function) that predicts the value of a state based on its features.
- **Advantage:** This approach **generalizes** learned patterns. Similar states will have similar predicted values, overcoming the need to visit every state, thus solving the scalability problem.

## 4. Data & Future Work

- **Data:** The model is being developed and validated using real travel survey data from Higashihiroshima, which shows clear and predictable daily travel patterns (e.g., morning and evening commute peaks).
- **Next Steps:**
    - Design and engineer features for the value function approximation.
    - Experiment with advanced TD methods (e.g., least-squares TD, kernel-based methods).
    - Implement a "post-decision state" framework to improve model accuracy.
