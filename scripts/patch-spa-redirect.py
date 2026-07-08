#!/usr/bin/env python3
"""Inject the GitHub-Pages SPA-redirect decoder into a built Slidev index.html.

Pairs with the repo-root 404.html (https://github.com/rafgraph/spa-github-pages).
That 404 page redirects a missed deep-link like /reports/slides/apte/1 to
/reports/slides/apte/?p=/1 ; this snippet, inserted as the first thing in <head>,
restores the real path via history.replaceState before Vue Router boots, so the
app lands on the intended slide instead of slide 1.

Idempotent: safe to run on an already-patched file, and safe to re-run after every
`slidev build` (which regenerates index.html from scratch).

Usage: patch-spa-redirect.py <path/to/index.html> [more paths...]
"""
import sys

SNIPPET = """<script>
  // SPA GitHub Pages redirect decoder — pairs with the repo-root 404.html
  // (https://github.com/rafgraph/spa-github-pages). Restores the real path
  // before the router boots.
  (function(l) {
    if (l.search[1] === "/") {
      var decoded = l.search.slice(1).split("&").map(function(s) {
        return s.replace(/~and~/g, "&");
      }).join("?");
      window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
    }
  }(window.location));
</script>
"""
MARKER = "SPA GitHub Pages redirect decoder"


def patch(path):
    with open(path, encoding="utf-8") as f:
        html = f.read()
    if MARKER in html:
        print(f"already patched: {path}")
        return
    idx = html.index("<head>") + len("<head>")
    html = html[:idx] + "\n" + SNIPPET + html[idx:]
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"patched: {path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("usage: patch-spa-redirect.py <index.html> [...]")
    for p in sys.argv[1:]:
        patch(p)
