# Report: Documentation Updates (Last 2 Weeks)

This report details the changes made to the documentation in the last 14 days, based on `git diff` analysis. The updates represent a significant effort to document the **theoretical and architectural underpinnings** of the GPU implementation.

## 1. New Theoretical & Research Documents

### [NEW] `docs/condition-based-simulation-framework.md`
**Status**: Created
**Content**: A comprehensive research proposal for moving from "Hard Constraints" to "Flexible Conditions".
*   **Key Innovation**: Proposes using **Forward Reachability** to dynamically identify feasible action spaces for agents.
*   **Structure**: Defines a 4-tier condition architecture (Global, Group, Individual, Dynamic) and outlines the mathematical integration into the Bellman equation.

### [NEW] `planning/complexity_analysis.md`
**Status**: Created
**Content**: A mathematical justification for the GPU approach.
*   **Space Complexity**: Contrasts the **Naive State Space** ($1.92 \times 10^9$ states) with the **Reachable State Space** ($10^5$ states), demonstrating a 10,000x reduction.
*   **Time Complexity**: Formally derives the $O(T)$ complexity for the GPU implementation vs. $O(N \times B)$ for sequential CPU execution.

---

## 2. Major Architectural Deep Dives

Existing documentation was significantly expanded to explain *why* the system is built this way.

### `planning/csr_graph_structure.md`
**Status**: Major Rewrite
**Key Additions**:
*   **Implicit vs. Explicit CSR**: Added a detailed comparison explaining why we use a **Sorted Edge List** (Implicit CSR) instead of the standard `row_ptr` approach.
    *   *Reason*: Faster build time on GPU (`torch.sort` is optimized) vs. complex prefix-sum calculations.
*   **Visual Examples**: Added concrete step-by-step traces of how the graph is built from raw discovery data.
*   **R Prototype Comparison**: Added a section contrasting the **Dense Tensor** approach of the R prototype (CSC, memory explosive) with the **Sparse Graph** approach of the Python implementation (CSR, memory efficient).

### `planning/backward_induction_details.md`
**Status**: Updated
**Key Additions**:
*   **CPU vs. GPU Execution Trace**: Added a side-by-side comparison of the algorithm execution.
    *   *CPU*: Loop-based, state-centric.
    *   *GPU*: Edge-centric, using `scatter_logsumexp`.
*   **The "Max Trick"**: Added the mathematical derivation for the LogSumExp numerical stability trick used in the kernel.

### `core/readme.md`
**Status**: Updated
**Key Additions**:
*   **Deduplication Logic**: Added a "Deep Dive" explaining how `torch.unique` turns the execution tree into a DAG (Directed Acyclic Graph) by merging identical states (e.g., waiting 15m vs 30m to arrive at the same 9:00 AM state).
*   **State Compression**: Detailed the 8-integer state encoding schema.

### `model/readme.md`
**Status**: Updated
**Key Additions**:
*   **Vectorized Lookup**: Explored how `ConstraintMasks` (boolean matrices) allow for O(1) constraint checking.
*   **Data Tables**: Added visualization tables for `activity_start_allowed` and `mode_transitions` masks.

---

## 3. Presentation & Slides Overhaul

### `docs/presentations/slides.md`
**Status**: Massive Update
**Key Additions**:
*   **Literature Comparison**: Added a new section comparing our **Level-Synchronous BFS** approach with seminal papers:
    *   *Tithi et al. (2022)*: S3BFS (Work-adaptive).
    *   *Merrill et al. (2012)*: Scalable GPU Graph Traversal (Prefix Sums).
*   **Code Snippets**: Embedded actual Python/PyTorch code for every phase (Forward Pass, Graph Build, Backward Induction).
*   **CSR Visualization**: Added slides explaining the "Row-based" memory access pattern required by the "Forward-Looking" Bellman equation.
*   **Algorithm Traces**: Added step-by-step execution flows for the `scatter_logsumexp` kernel.

---

## 4. Summary of Changes

| File | Status | Focus |
| :--- | :--- | :--- |
| `docs/condition-based-simulation-framework.md` | **New** | Research / Future Framework |
| `planning/complexity_analysis.md` | **New** | Math / Complexity Theory |
| `planning/csr_graph_structure.md` | **Rewrite** | Data Structures / R Comparison |
| `docs/presentations/slides.md` | **Rewrite** | Academic Context / Code Viz |
| `planning/backward_induction_details.md` | **Update** | Numerical Stability / Kernels |
| `core/readme.md` | **Update** | Deduplication / Encoding |
| `model/readme.md` | **Update** | Constraints / Masks |
