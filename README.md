# Ahreum Lee — Portfolio

A portfolio in the shape of an open book, in the spirit of a 2000s minihompy: a
window in front of a pixel bakery-cafe that fits the screen, a profile page on
the left, index tabs on the right, and a pixel miniroom on the My room tab, in Color
and E-ink (soft grey) versions. The tabs hold a journey (with a graph of
everything tried), a resume, a board of posts (the two case studies starred at the
top), awards and my room (running, baking, a space diary). The pixel art is PNG in `web/src/art`; the fonts are Pixelify Sans and Galmuri11.

## Develop

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Status line

The status in the left column comes from `status.txt` at the root of this repo.
GitHub Pages serves that file as is, so you can change it straight on GitHub
(open the file, click the pencil, commit) and the live site shows it within a
minute, with no rebuild. Write the status (a word or two) on the first line and
the date on the second:

```
Baking
2026-11-24
```

Leave the file empty to hide the status.

## Build & deploy

There's no backend or CI — GitHub Pages serves this repo's root directly, so the
production build is committed straight to it.

```bash
npm run build
git add index.html assets web status.txt package.json package-lock.json vite.config.js
git commit -m "..."
```

`vite.config.js` builds from `web/` (source) into the repo root (`index.html`,
`assets/`) with fixed filenames, so rebuilds overwrite cleanly instead of
accumulating hashed bundles.

## Project structure

- `web/src/data/work.js`: all text and facts: the intro, the journey chapters
  (`JOURNEY`), positions (`EXPERIENCE`), extracurriculars, education, the graph
  (`RANGE`, where each item has `x` = technical and `y` = creative, from 0 to 10),
  awards and contact.
- `web/src/App.jsx`: the window, the frame, the tabs and hash routing.
- `web/src/components/Sidebar.jsx`: the owner's column.
- `web/src/components/Miniroom.jsx`: the pixel room and the minimi.
- `web/src/components/{Home,Journey,Resume,Board,Awards,MyRoom}.jsx`: one
  file per tab (`Range.jsx` is the graph inside Journey).
- `web/src/posts/*.md`: Board posts in Markdown, turned into HTML at build time
  by `web/markdown.js`. `adina.md` and `openquake.md` are the starred case
  studies; `example.md` (a draft) shows every format; `README.md` there explains
  the header.
- `web/src/space-diary/`: space-diary drawings for My room; a `.txt` with the
  same name adds the realization under it (see the README there).
- `web/public/images/...`: post photos. Locally a missing file shows a
  "Photograph to come" plate; in the build the plate is hidden until the photo loads.
