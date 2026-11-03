# Ahreum Lee — Portfolio

A 3D, motion-driven portfolio: an interactive node graph of my work (React Three
Fiber) with case-study drawers (Framer Motion), and shareable filter URLs.

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

- `web/src/data/work.js` — all experience/project/community facts, tags, and the
  3D node positions and connections.
- `web/src/components/Hero3D.jsx`, `WorkMap3D.jsx` — the two R3F scenes.
- `web/src/components/Drawer.jsx` — the case-study/detail panel.
- `web/public/images/...` — case-study screenshots (falls back to an "Image
  coming soon" placeholder when a path doesn't resolve).

## Shareable views

Examples:

- `/?view=software-engineering`
- `/?view=machine-learning`
- `/?view=hci`
- `/?view=product`
- `/?tags=AI,Research`

Views and tag order live in `web/src/data/work.js`.
