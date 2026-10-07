#!/usr/bin/env bash
#
# Build the published site into public/.
#
# Quartz renders content/ into public/. Everything else that this site serves is
# pre-built static output that must reach public/ byte for byte:
#
#   slides/   four Slidev decks, each built with --base /reports/slides/<name>/.
#             Their asset paths are baked in, so they cannot move or be rewritten.
#   archive/  the Master's-era site: self-contained Plotly/KaTeX report pages, the
#             old landing page, meeting notes, the thesis draft.
#   ddcm/     redirect stubs holding the old public report URLs open.
#
# The 404 page has to do two jobs at once, so it is assembled here: Quartz's own
# 404 for missing notes, plus the spa-github-pages decoder that rescues deep links
# into the Slidev decks (/reports/slides/apte/7 and the like).
#
# Gotcha: those three trees are copied from `git ls-files`, so a newly added file
# in them has to be `git add`ed before it will appear in the build. That is
# deliberate — it makes a local build match what CI publishes from a clean
# checkout — but it does mean an untracked new report silently will not ship.

set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$PWD"
OUT="$ROOT/public"

echo "==> quartz build"
npx quartz build

echo "==> merging the SPA decoder into Quartz's 404"
python3 - "$ROOT/404.html" "$OUT/404.html" <<'PY'
import re, sys
decoder_src, target = sys.argv[1], sys.argv[2]

# Lift the <script> out of the hand-written 404 so the behaviour has exactly one
# definition and this stays correct if that file is edited.
m = re.search(r"<script>.*?</script>", open(decoder_src, encoding="utf-8").read(), re.S)
if not m:
    sys.exit("could not find the decoder <script> in %s" % decoder_src)
decoder = m.group(0)

html = open(target, encoding="utf-8").read()
if "spa-github-pages" in html:
    print("   already present, skipping")
else:
    # First thing in <head>: it must run before anything else loads.
    html = re.sub(r"(<head[^>]*>)", r"\1\n" + decoder, html, count=1)
    open(target, "w", encoding="utf-8").write(html)
    print("   injected")
PY

echo "==> copying static trees"
# Driven from git, not cp -R. slides/ddcm-codebase/ keeps a gitignored local
# node_modules of ~480 MB; copying the directory wholesale pulled 23,980 stray
# files into the artifact and took it to 568 MB. Using the tracked file list also
# makes a local build match exactly what CI publishes from a fresh checkout.
# Overlaid, not replaced. content/archive/*.md renders into public/archive/, so
# wiping public/archive first would delete the pages Quartz had just written.
# Quartz cleans public/ wholesale at the start of its build, so nothing is stale.
# Where both produce the same path — archive/index.html, the old landing page vs
# Quartz's generated folder listing — the hand-written one wins, by design.
for d in archive slides ddcm; do
  if [ -d "$ROOT/$d" ]; then
    n=$(git -C "$ROOT" ls-files -- "$d" | wc -l | tr -d ' ')
    if [ "$n" -gt 0 ]; then
      rsync -a --files-from=<(git -C "$ROOT" ls-files -- "$d") "$ROOT/" "$OUT/"
    fi
    echo "   $d ($n tracked files)"
  fi
done

# GitHub Pages runs Jekyll over the artifact unless told not to, which would strip
# the underscore-prefixed files in the Slidev builds (_plugin-vue_export-helper-*.js
# and friends) and leave the decks blank.
touch "$OUT/.nojekyll"

echo "==> done: $(find "$OUT" -type f | wc -l | tr -d ' ') files in public/"
