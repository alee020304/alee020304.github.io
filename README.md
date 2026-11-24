# Ahreum Lee — Portfolio

A portfolio in the shape of an open book, in the spirit of a 2000s minihompy: a
window in front of a pixel bakery-cafe that fits the screen, a profile page on
the left, index tabs on the right, and a pixel miniroom on the home page, in Color
and E-ink (soft grey) versions. The tabs hold a profile, a diary of positions, a
board with two case studies, a graph of everything tried, awards and a
guestbook. The pixel art is PNG in `web/src/art`; the fonts are Pixelify Sans and Galmuri11.

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

- `web/src/data/work.js`: all text and facts: the intro, the four traits
  (`SKILLS`), positions (`EXPERIENCE`), case studies (`CASES`), the graph
  (`RANGE`, where each item has `x` = technical and `y` = creative, from 0 to 10),
  awards and contact.
- `web/src/App.jsx`: the window, the frame, the tabs and hash routing.
- `web/src/components/Sidebar.jsx`: the owner's column.
- `web/src/components/Miniroom.jsx`: the pixel room and the minimi.
- `web/src/components/{Home,Profile,Diary,Board,Range,Awards,Guestbook}.jsx`: one
  file per tab.
- `web/public/images/...`: case-study photos. Locally a missing file shows a
  "Photograph to come" plate; in the build the plate is hidden until the photo loads.
