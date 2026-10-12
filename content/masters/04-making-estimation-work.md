---
title: "Phase 4 · Apr–Jul 2026 — Can it actually be estimated?"
type: hub
status: complete
created: 2026-10-12
tags: [masters, phase, estimation]
---


**April – July 2026.** Having an exact, fast model was not the same as being able to estimate it.
This phase is mostly a record of finding out why the optimizer would not converge.

## The sequence

1. **Estimation failed at once** (27 April). BFGS blew the log-likelihood from −50,586 to −158,492 in
   nine iterations. Two gradient bugs were found: the forbidden-home-zone masks were never applied
   inside the gradient, and zone IDs were off by one.
2. **K=10 converged, with a puzzle** (11 May). All ten parameters were significant. But the model
   began work at about 14:51 against an observed 08:30, which the note poses as the central
   question for that meeting.
3. **The puzzle was a bug** (investigation, 20 April – 13 May). The graph had been built with one
   person's home zone only, so the observed work steps of almost every other worker were silently
   dropped from the likelihood. The 14:51 start was a symptom, not a finding about behaviour. See
   [[investigation-overview|the root-cause investigation]], [[work-timing-analysis|the work-timing report]]
   and [[profile-likelihood-scans|the profile scans]].
4. **The analytical gradient still failed** (1 June). The gradient was exact one zone at a time and
   38% wrong when eight zones were batched on the Apple GPU backend, with CUDA clean. See
   [[gradient-bug-investigation|the gradient investigation]].
5. **Recovery on synthetic data** (20 June – 2 July). Generate data from known parameters and see
   whether the estimator gets them back. A single-scale transport specification removed an
   identification ridge. See [[parameter-recovery|parameter recovery]].
6. **What does approximation cost?** (21–24 June.) Exact, sampling of alternatives and an RL-style
   estimator were compared on the same network. See [[exact-vs-sampling-vs-rl|Exact vs sampling vs RL]].
7. **Behavioural validation at scale** (24 June – 19 July). See
   [[behavioural-validation-series|the validation series]].

## Notes in this phase

- [[2026-04-27-gradient-masks-and-c-change|27 Apr — Gradient masks and c_change]]: the first two gradient bugs.
- [[2026-05-11-k10-results-and-work-start-timing|11 May — K=10 results and work-start timing]]: convergence, and the timing gap that turned out to be a bug.
- [[2026-06-01-gradient-investigation-resolved|1 Jun — Gradient investigation resolved]]: the GPU-batching defect, plus the APTE revision and the thesis Chapter 2 outline.
- [[2026-06-23-recovery-and-approximation-error|23 Jun — Recovery and approximation error]]: recovery on synthetic data, Exact vs SA vs RL, and the full-sample run.

## The seven investigations

Each groups one or more of the 19 interactive reports (a series counts as one investigation):

- [[investigation-overview|Root-cause investigation overview]] — the zone-matching bug.
- [[work-timing-analysis|Work-timing analysis]] — the 14:51 gap and why it was an artifact.
- [[profile-likelihood-scans|Profile-likelihood scans]] — two scans, before and after the fix.
- [[gradient-bug-investigation|Gradient bug investigation]] — the 38% error.
- [[parameter-recovery|Parameter recovery]] — three R=30 studies.
- [[exact-vs-sampling-vs-rl|Exact vs sampling vs RL]] — two versions of one experiment.
- [[behavioural-validation-series|Behavioural validation series]] — nine runs.

The plain list of all 19 is the [DDCM implementation reports](/masters/ddcm/) index.

## What was still open in these notes

As of May, only BHHH standard errors were available: three attempts at the full numerical Hessian
were killed by GPU out-of-memory errors on the shared machine. As of 23 June, a vectorized
backward-induction speed-up had been built and checked bit-identical against the sequential path,
then deferred. Standard errors, welfare confidence intervals and faster estimation are where the
thesis hands over to the PhD.

---

**← Previous** [[03-the-framework|Phase 3]] · **Next →** [[05-thesis-and-defense|Phase 5 — The thesis]]
