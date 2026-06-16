# DDCM Codebase Walkthrough — Slidev Presentation

Slides for the end-to-end DDCM codebase walkthrough.

To start the slide show:

- `npm install`
- `npm run dev`
- visit http://localhost:3030

Edit the `slides.md` to see the changes.

## Build (static HTML for GitHub Pages)

```bash
npm run build -- --base /reports/slides/ddcm-codebase/
rsync -a --delete dist/ "../../../../3 - Permanent Notes/reports/slides/ddcm-codebase/"
```

Then commit/push the `reports` repo.
