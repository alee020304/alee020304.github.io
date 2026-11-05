# Ahreum Lee — Portfolio

A portfolio made of paper. Four scroll frames show four projects, each in a different
paper technique (folded crane, newsprint collage, cut-paper earth, an unfolded sheet).
Two case studies follow, then a graph of everything I've tried, plotted by how
technical and how creative it is. All textures and illustrations are SVG and CSS, so
there are no image files except case-study photos.

## Develop

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build & deploy

There's no backend or CI — GitHub Pages serves this repo's root directly, so the
production build is committed straight to it.

```bash
npm run build
git add index.html assets web package.json package-lock.json vite.config.js
git commit -m "..."
```

`vite.config.js` builds from `web/` (source) into the repo root (`index.html`,
`assets/`) with fixed filenames, so rebuilds overwrite cleanly instead of
accumulating hashed bundles.

## Project structure

- `web/src/data/work.js`: all text and facts: the four frames (`FORMS`), the case
  studies (`CASES`), and the graph (`RANGE`, where each item has `x` = technical and
  `y` = creative, from 0 to 10).
- `web/src/components/Forms.jsx`: the pinned scroll sequence.
- `web/src/components/art/`: the four paper illustrations.
- `web/src/paper.jsx`: shared geometry (hand-cut circles, torn edges) and SVG grain filters.
- `web/public/images/...`: case-study photos. A missing file shows a "Photograph to
  come" plate.
