This report demonstrates that the **Perturbed Utility Markovian Choice Model (PUMCM)** can be effectively applied to **Dynamic Discrete Choice Models (DDCM)** for activity-based travel demand modeling. The key finding is that **PUMCM and traditional logit models solve the same underlying problem** through their shared connection to **Shannon entropy** (Yao and Zhang, _Perturbed Utility Markovian Choice Model: Choice Probability Generation Function and Estimation_, 2025) , making PUMCM a natural extension of familiar discrete choice methods to sequential decision-making contexts.
**Main Result**: When the perturbation function is Shannon entropy, PUMCM recovers the recursive logit model, enabling both efficient parameter estimation and behavioral simulation.
## 1. Theoretical Foundation
### 1.1 The Shannon-Logit Connection
The fundamental insight is that **three seemingly different approaches produce identical choice probabilities**:
**A. Random Utility (McFadden, 1974)**
$$U(a) = v_a + \epsilon_a, \quad \epsilon_a \sim \text{Gumbel}$$
**B. Shannon Entropy Maximization (Jaynes, 1957)**
$$\max_{\pi} -\sum_a \pi(a) \ln(\pi(a)) \quad \text{s.t.} \quad \sum_a \pi(a) v_a = \bar{v}$$
**C. Perturbed Utility (Fosgerau & McFadden, 2012)**
$$\max_{p \in \Delta} {\sum_j p_j v_j - F(p)}$$
$$\max_{\pi} \sum_a \pi(a) v_a - \sum_a \pi(a) \ln(\pi(a))$$
**All three yield the multinomial logit formula:**
$$\pi(a) = \frac{\exp(v_a)}{\sum_{a'} \exp(v_{a'})}$$
**Proof (for C → Logit):**
Taking the first-order condition:
$$\mathcal{L}(p, \lambda) = \sum_j p_j v_j - F(p) - \lambda\left(\sum_j p_j - 1\right)$$
**First-order condition** for optimal $p^*$: $$\frac{\partial \mathcal{L}}{\partial p_j} = v_j - \frac{\partial F}{\partial p_j}(p^*) - \lambda = 0$$
$$\frac{\partial}{\partial \pi(a)}\left[\sum_a \pi(a)v_a - \sum_a \pi(a)\ln(\pi(a)) - \lambda\left(\sum_a \pi(a) - 1\right)\right] = 0$$
$$v_a - \ln(\pi(a)) - 1 - \lambda = 0$$
$$\pi(a) = \exp(v_a - \lambda - 1)$$
Using $\sum_a \pi(a) = 1$:
$$\pi(a) = \frac{\exp(v_a)}{\sum_{a'}\exp(v_{a'})} \quad$$
### 1.2 Extension to Markov Decision Processes
**PUMCM Framework** (Yao & Zhang, 2025): For an MDP with states $S$, actions $A_s$, transitions $P$, utilities $u$, and discount $\gamma$, the agent solves at each state:
$$\max_{\pi(\cdot|s)} \sum_{a \in A_s} Q(s,a) \pi(a|s) - F_s(\pi(\cdot|s))$$
where $Q(s,a) = u(s,a) + \gamma \sum_{s'} P(s'|s,a) V(s')$ is the Q-value function.

**Choice Probability Generation Function**:
$$H_s(Q) = \max_{\pi} \{Q^\top \pi - F_s(\pi)\}$$
**Key Property**: The optimal policy is the gradient:
$$\pi^*(a|s) = \nabla_a H_s(Q(s,\cdot))$$
**For Entropy** ($F_s = \sum_a \pi_a \ln \pi_a$):
$$H_s(Q) = \ln\left(\sum_a \exp(Q(s,a))\right)$$
$$\pi^*(a|s) = \frac{\exp(Q(s,a))}{\sum_{a'}\exp(Q(s,a'))}$$
This is the **recursive logit model** - a direct extension of multinomial logit to sequential choices.

## References

**Core PUMCM Papers**:
- Yao, R., & Zhang, K. (2025). Perturbed utility Markovian choice model. TRISTAN XII.
- Fosgerau, M., & McFadden, D. (2012). A theory of the perturbed consumer. NBER Working Paper.
- Fosgerau, M., et al. (2022). A perturbed utility route choice model. Transportation Research C, 136.

**Activity-Based Modeling**:
- Västberg, O., et al. (2020). A dynamic discrete choice activity-based travel demand model. Transportation Science, 54(1), 21-41.
- Rust, J. (1987). Optimal replacement of GMC bus engines. Econometrica, 55(5), 999-1033.

**Entropy and Discrete Choice**:
- Fosgerau, M., et al. (2020). Discrete choice and rational inattention: A general equivalence result. International Economic Review, 61(4), 1569-1589.
- McFadden, D. (1974). Conditional logit analysis of qualitative choice behavior.

**Information Theory**:
- Shannon, C. E. (1948). A mathematical theory of communication. Bell System Technical Journal.
- Jaynes, E. T. (1957). Information theory and statistical mechanics. Physical Review.