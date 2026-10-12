# Reports site: retire "archive", give the Master's work a spine, open the PhD record

**Date:** 2026-10-11
**Repo:** `azwanazamuddin/reports` (nested, gitignored, inside `remote_main`)
**Status:** design approved in chat 2026-10-11; implementation plan not yet written

---

## 1. Intent

Three things are wrong with the published site today, and one thing is missing.

1. **"Archive" is the wrong frame.** The Master's work is not deadwood to be filed away; it is
   the computational ground the PhD stands on. The word is in every URL under
   `/reports/archive/`.
2. **The Master's material has no readable spine.** Fourteen meeting notes sit in two semester
   folders, nine of them titled some variant of "Research Progress". A reader cannot tell which
   one matters or what order the ideas arrived in.
3. **The graph view draws nothing.** Measured from Quartz's own `contentIndex.json`: 47 nodes, of
   which 24 are generated `tags/*` pages and 6 are generated folder indexes, leaving 17 real
   notes; 10 edges, **every one of which dangles** on a passthrough target Quartz has no node for.
   Real note-to-note edges: **zero**. All 8 wikilinks on the site are in `related:` frontmatter,
   which Quartz does not crawl.
4. **There is no PhD record.** The landing page states the direction; nothing documents the first
   paper.

**Success looks like:** a visitor can read the Master's work as an argument from first ideas to
defended thesis; the graph view shows that argument as a connected chain with evidence hanging
off it; no URL says "archive"; nothing that was published 404s; and the first PhD report is up,
dated, and marked as pre-supervisor.

### Constraints carried in from earlier decisions

- `reports` stays nested and gitignored inside the vault. **No submodule.**
- Slidev decks are built with `--base /reports/slides/<name>/`. Their asset paths are baked in.
  **`slides/` does not move and is not rebuilt.**
- The build copies `archive/`, `slides/`, `ddcm/` from `git ls-files`, so a new file in those
  trees must be `git add`ed before it appears in a build.
- The Master's manuscript PDF is **not published** (decided 2026-10-08). The defense deck is the
  public record. Do not reintroduce a PDF link.
- Defense date is **10 August 2026**.

---

## 2. URL layout

```
/reports/                             PhD landing (exists, edited)
/reports/phd/                         NEW   PhD hub
/reports/phd/paper-a/                 NEW   first PhD report
/reports/masters/                     NEW   Master's hub            (replaces /archive/)
/reports/masters/01-…05-…             NEW   five phase hubs
/reports/masters/meetings/<date-slug> the 14 notes, renamed
/reports/masters/investigations/<slug> NEW  ~7 companion notes
/reports/masters/ddcm/<file>.html     the 19 Plotly reports, filenames unchanged
/reports/masters/thesis/thesis-draft  the abandoned draft scaffold
/reports/masters/legacy/              the frozen Master's-era landing page
/reports/slides/<name>/               4 decks, untouched
```

Two subtrees keep their existing filenames so the redirect is a pure prefix swap and so no
generated page can collide with a passthrough file: `masters/ddcm/*.html` (passthrough Plotly
output, underscored filenames) is disjoint from `masters/investigations/*` (generated from
markdown, hyphenated slugs).

### Redirects

**One rule added to `404.html`**, beside the existing spa-github-pages deck decoder:

```
/reports/archive/<rest>  →  /reports/masters/<rest>
```

This covers all ~38 previously published archive URLs — the index, 19 Plotly reports, 14 meeting
note slugs, the thesis draft, and the generated folder indexes — in one place.

The 7 existing stubs in `ddcm/` currently point at `/reports/archive/ddcm/<file>.html`. Repoint
them directly at `/reports/masters/ddcm/<file>.html` rather than letting them bounce through the
404 handler.

**Known limitation, accepted:** GitHub Pages cannot serve a 301. This is a client-side redirect
that returns HTTP 404 first, which search engines read as a soft 404. Accepted in exchange for
not carrying 38 stub files. The alternative (physical stubs) was offered and declined.

---

## 3. The Master's spine

Five phase hubs, each titled as the question it answered, numerically prefixed so Quartz's
explorer renders them in narrative rather than alphabetical order.

| Hub file | Question | Period | Notes gathered |
|---|---|---|---|
| `01-approximation-first.md` | Can the model be approximated? | Oct–Nov 2025 | 4 |
| `02-exact-tensor-computation.md` | Can it be computed exactly instead? | Nov 2025–Jan 2026 | 5 |
| `03-the-framework.md` | The framework, in three contributions | Apr 2026 | 1 |
| `04-making-estimation-work.md` | Can it be estimated? | Apr–Jun 2026 | 4 + 19 reports |
| `05-thesis-and-defense.md` | The thesis | Jul–Sep 2026 | draft, decks |

**The arc is approximation abandoned for exactness.** Phase 1 records MCTS being tried and
rejected, TD(λ) with value-function approximation proposed, and the perturbed-utility route noted
and set aside. The thesis's central claim — *nothing may be discarded for being unlikely, only
for being impossible* — is precisely the rejection of Phase 1. Phase 1 therefore earns its place
in the record and is presented as the road not taken, not hidden.

Each hub carries: the question, what was tried, what was learned, what it cost, a one-line
annotation per note saying what that note found, and explicit prev/next links.

**Note bodies are not rewritten.** The hub supplies the "what this found" gloss; the historical
record stays as written. Only frontmatter is added and links are repaired.

### The 14 notes, renamed

Flat under `masters/meetings/`, date-prefixed `YYYY-MM-DD-slug`, dropping the `2025-fall` /
`2026-spring` folders (the phase hubs supersede semester grouping) and dropping the commas and
parentheses that currently appear in URLs.

| New name | Was |
|---|---|
| `2025-10-08-pumcm-perturbed-utility.md` | `251008 - NOT USED - PUMCM for Activity-Based Models.md` |
| `2025-10-15-td-estimation-ideas.md` | `251015 - Ideas on TD Estimation on DDCM.md` |
| `2025-11-04-readings-and-implementation-plans.md` | `251104 - Readings & Implementation Plans.md` |
| `2025-11-09-smaso-x-presentation.md` | `251109 - SMASO-X-Presentation-Summary.md` |
| `2025-11-26-tensor-gpu-implementation.md` | `251126 - SummaryUpdateTensorBased.md` |
| `2025-12-15-documentation-and-reframework.md` | `251215 - Progress on documentation, re-framework the algorithm.md` |
| `2025-12-24-universal-graph-and-bi-optimization.md` | `251224 - Universal Graph and BI Optimization.md` |
| `2026-01-07-rmdp-theory-and-implementation.md` | `260107 - RMDP Theory and Implementation.md` |
| `2026-01-27-validation-plan.md` | `260127 - Progress on validation plan.md` |
| `2026-04-19-thesis-progress-april.md` | `260419 - Master Thesis Progress (M2, April 2026).md` |
| `2026-04-27-gradient-masks-and-c-change.md` | `260427 - Research Progress (M2, Apr 27, 2026).md` |
| `2026-05-11-k10-results-and-work-start-timing.md` | `260511 - Research Progress (M2, May 11, 2026).md` |
| `2026-06-01-gradient-investigation-resolved.md` | `260601 - Research Progress (M2, Jun 1, 2026).md` |
| `2026-06-23-recovery-and-approximation-error.md` | `260623 - Research Progress (M2, Jun 23, 2026).md` |

`NOT USED` leaves the public URL. The fact that the PUMCM route was explored and set aside is
stated in Phase 1's hub and in the note's own frontmatter `status`, where it belongs.

Renames use `git mv` so history follows.

---

## 4. Making the graph real

Edges come from three sources, in order of how much they buy:

1. **Move all `related:` wikilinks into note bodies.** This is why the graph is empty. Three of
   the eight point outside the published site (`../../../3 - Permanent Notes/…`,
   `../../../4 - Projects/ddcm/ddcm_slides/slides`) and are **dropped, not rewritten** — they have
   been dead since they were written.
2. **Chain the hubs.** Each phase hub links prev/next and down to its notes; `masters/index`
   links all five. Quartz generates the backlinks.
3. **~7 companion notes**, one per *investigation* rather than one per file, each linking its
   Plotly outputs and back to its phase hub:

| Companion note | Covers |
|---|---|
| `gradient-bug-investigation.md` | `gradient_bug_investigation_20260601.html` |
| `profile-likelihood-scans.md` | `profile_ll_cchange_v7.html`, `profile_ll_delta_muhome.html` |
| `parameter-recovery.md` | `recovery_smallnet_R30_20260620`, `recovery_K10_freemu_20260627`, `recovery_cell2_freemode_robust_20260702` |
| `exact-vs-sampling-vs-rl.md` | `experiments_exact_sa_rl_20260621`, `…_20260624` |
| `behavioural-validation-series.md` | the 9 `behavioral_validation_*` runs |
| `work-timing-analysis.md` | `work_timing_analysis.html` |
| `investigation-overview.md` | `investigation_overview.html` |

Seven notes bring all 19 reports into the graph, **including the 7 orphans** (every
`behavioral_validation_*` except `20260624` and `20260719` is currently reachable only by typing
its URL). One note per file was rejected as 19 thin stubs; the grouping is faithful because those
files genuinely are series.

4. **Cross-era edges.** `phd/paper-a` links back to the Master's phases that produced its
   ingredients: C3's context sharing to Phase 2's universal-graph/bisimulation note, C1's
   exactness argument to Phase 1's abandoned approximation work. These are what make the graph
   show one research story rather than two disconnected blobs.

---

## 5. Hygiene

- **Add frontmatter to the 7 notes that have none** (`251008`, `251015`, `251126`, `251215`,
  `251224`, `260107`, `260127`). Without it Quartz has no title and falls back to the raw slug.
  Minimum: `title`, `type`, `status`, `created`, `tags`.
- **Fix the 8 broken links on the frozen landing page.** They point at
  `github.com/…/blob/master/archive/meetings/2025-fall/…`, a path the Quartz migration moved to
  `content/archive/…`. All 8 are 404 (verified). Repoint them at the published pages.
- **Keep the frozen Master's-era landing page**, moved to `masters/legacy/index.html` and linked
  once from the Master's hub as "the Master's-era site, as it stood in August 2026". It is not
  deleted — 801 hand-written lines with its own theme — and it does not compete with the new hub
  for the `/reports/masters/` URL.
- Quartz's citations plugin stays **disabled** (it errors with no `.bib` present).

---

## 6. The first PhD report

> **Amendment, 2026-10-12.** The contribution list below (C1-C4, with C1, "exactness forces
> reachability restriction", as the headline) was taken from the body of `OUTLINE.md` and is
> **stale**. A literature run on 2026-10-01 refuted C1, and the paper was restructured on
> 2026-10-05; `OUTLINE.md`'s own banner says C1 and C3 "move", which was visible and was missed.
> The published page follows the current `paper_a_argument.md` (8 October), a ten-link chain, and
> the 4 October recap's working claim: *constraint heterogeneity becomes a specification choice
> rather than a computational concession*, marked as a draft not yet applied to the manuscript.
> The numbers rules below stand. Two more conflicts surfaced while reading and are also not
> published: observed decision steps (406,381 in one source, 409,808 in another) and evaluation
> contexts (893 versus 972).

`content/phd/paper-a.md` → `/reports/phd/paper-a/`. The Paper A proposal as it stands after the
2026-10-05 reframe, carrying a dated status banner: pre-supervisor, to be restated, working
documents win where they disagree.

Sources: `paper_a/OUTLINE.md`, `FORMALISM.md`, `EVIDENCE.md`, and
`ddcm/docs/paper/decisions_reopened_20261005.md`.

Content:

- **The reframe.** Paper A's subject moved from a reduction technique to constraint
  heterogeneity. Four scope guards reopened, two kept on their own merits. Restructured, not
  patched.
- **C1 (headline).** Exactness *forces* reachability restriction rather than merely permitting
  it. Dominance and column generation certify "never in an optimal solution" — a statement about
  an argmax, which is the wrong certificate for a sum. A logsum gives a dominated day strictly
  positive mass. The only lossless reduction surviving the max-to-sum change is deleting states
  of exactly zero probability.
- **C2.** $(V, \nabla_\theta V)$ from one graph, one sweep, two semirings — with the honest cost
  attribution: the gradient is **83% of the DP computation and 49% of wall clock**, and **40% of
  that wall clock is `gc.collect()`**, which is runtime overhead and must not be presented as
  algorithmic cost.
- **C3.** Context sharing decouples population scale from problem scale. The graph depends only
  on the attributes entering *feasibility*, never on those entering *utility*, so utility
  heterogeneity is free and only feasibility heterogeneity costs a new graph.
- **C4.** Exact NFXP is affordable in the regime it was declared infeasible in — Västberg's own
  §4.1.6 costs it at ~1,000 single-core days for his case study. Stated as a consequence of
  C1–C3, never as the subject.
- **Positioning.** Rests on Västberg's own sentence, "because estimation is performed using
  sampling of alternatives, efficient estimates are not obtained" — **not** on his simulation
  accuracy, which he validated himself at 0.1%–1.7% aggregate deviation. Arguing there would mean
  arguing against a published measurement with no data of our own on his network.
- **What is open.** Sandwich standard errors have not reported. The production run's convergence.

### Numbers: what may and may not be published

Resolved against `EVIDENCE.md` during design, because three sources disagreed.

**Safe, and stable across every vintage:**
- **4 topology groups** — the C3 headline, unchanged under every spec checked.
- **7,468 real diaries** → 4 structures. Provenance is §11 B3, whose full sentence is "4 builds
  serve 893 groups, 7,468 people"; the people and build counts are publishable, the group count is
  not (see below).
- **214,216** WCTR synthetic population → the same 4 (§10).
- **8,031 people → 3,096 solves, a 2.6× collapse**; **93.3–96.2% of states** and **80.4–87.8% of
  edges** live under per-person masking. Source: `ddcm/constraint_framing_slides/slides.md`, the
  current framing. Already on the landing page; consistent.

**Must not be published:**
- **Any evaluation-context count.** Four exist (259, 848, 893, 972), they are spec-dependent, and
  two of them separately claim to supersede the third. `EVIDENCE.md` §2c's own instruction is
  that the count "must be restated with its spec, or dropped." **Dropped.**
- **"0.045 observations per state."** `EVIDENCE.md` §2c records it as derived from two different
  runs (gate 6c's 182,545 steps against §1's 4.06M states). It currently sits in `OUTLINE.md` and
  `MANUSCRIPT.md` and must not propagate to the site.
- **The raw 26.1% inconsistent-links figure.** `EVIDENCE.md` §11 caution 3: it mixes the
  step-link effect with other sources. The decomposed 109 of 3,049 may be used, labelled as one
  33-person worker group.
- **"One solve per person."** `constraint_framing_slides` is explicit: it understates the result
  by 2.6× and mis-describes the mechanism.
- Any figure from the retired landing page not traceable to the thesis or `EVIDENCE.md`.

`phd/index.md` is a thin hub: what the PhD concerns, a link to Paper A, a link to the Master's
spine.

---

## 7. Out of scope

No search or tag-taxonomy rework. No visual redesign. No touching or rebuilding the 4 decks. No
rewriting note bodies. No new reports beyond Paper A. No history rewrite. **No changes to
`azwanazamuddin.github.io`** — verified 2026-10-11 that nothing in it links into
`/reports/archive/`; its only `reports` links are `/reports/` and `/reports/slides/thesis/`,
both untouched by this work.

---

## 8. Verification

1. `bash scripts/build-site.sh` succeeds; `public/` file count is within ~10% of the current
   1,036 and contains **no** `node_modules`.
2. **Graph assertion:** parse `public/static/contentIndex.json` and assert (a) total internal
   edges **> 50**, up from 10, and (b) **no content note has zero in- and out-edges**, excluding
   generated `tags/*` and folder-index pages. (b) is the real quality bar — a high edge count
   concentrated in the hubs would still leave orphans. Design estimate is ~68 edges, so the
   floor of 50 leaves headroom without being vacuous.
3. Every one of the 14 renamed notes, 5 hubs, 7 companion notes and 2 PhD pages returns 200.
4. All 19 Plotly reports return 200 at their new `masters/ddcm/` URLs and still render Plotly.
5. A sample of old `/reports/archive/*` URLs redirects to the `masters` equivalent.
6. `/reports/slides/apte/7` still deep-links (the 404 decoder's deck branch is untouched).
7. `grep -r "archive" public/` finds no user-facing "archive" wording outside `masters/legacy/`.
8. No published page links the Master's manuscript PDF.
9. CI `Deploy site` and `Check for broken links` both pass; live spot-check after deploy.

## 9. Sequencing

Four commits, each independently reviewable and each leaving the site working:

1. **Move and rename.** `git mv` the trees to `masters/`, rename the 14 notes, add the 404
   redirect rule, repoint the 7 stubs, fix the 8 broken links. No new prose. Site works, new URLs.
2. **Frontmatter and body links.** Add frontmatter to the 7 bare notes, move `related:` wikilinks
   into bodies, drop the 3 vault-escaping links.
3. **The spine.** Five phase hubs, `masters/index`, 7 companion notes, landing-page edits.
4. **The PhD report.** `phd/index`, `phd/paper-a`.
