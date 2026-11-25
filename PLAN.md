# Portfolio — plan v4: minihompy

Supersedes v3 (paper). Branch: `paper`.

## Idea

An open book in a window, in front of a pixel bakery-cafe, in the spirit of a 2000s
minihompy. The window fills the screen and never scrolls; the two pages scroll
on their own. The left page is the owner's column (minimi, name,
now/next, contact buttons). The right page is whichever tab is
open. On phones the owner's column comes first, then the tabs, then the page. Index tabs sit on the right edge, below a balloon sticker. The pixel miniroom opens
the My room tab. English only.

| Tab | What it holds |
| --- | --- |
| Home | Kingston street scene (where I am now) and new posts |
| Journey | Four chapters in the order they started, each with what it taught me (`JOURNEY`), then the graph of technical vs creative (`RANGE`) |
| Resume | Positions newest first (`EXPERIENCE`), extracurriculars (`EXTRACURRICULARS`), education |
| Board | Every post, one Markdown file each in `web/src/posts/`; `starred: true` shows a post as a card above the list (the two case studies). `#post-<file>` opens one |
| Awards | `AWARDS` |
| My room | The miniroom, running, baking (`ROOM`) and the space diary: drawings from `web/src/space-diary/` |

Old anchors still work: `#profile`, `#graph`, `#range` → Journey; `#diary`, `#experience` → Resume; `#cases`, `#writing`, `#case-<id>`, `#writing-<id>` → Board,
`#recognition` → Awards, `#guestbook` → My room, `#contact` → Home.

## Design

- Two modes, switched from the title bar and remembered in the browser. Color:
  frame `#f4f1ec`, title bar `#786f68`, panels `#ffffff`, rules `#c8c0b6`, ink
  `#33302d`, labels `#5a524a`, one point colour `#b9625e` (the rug's dusty rose).
  E-ink: the same page in dim greys, like an e-reader with the light turned down, for
  resting the eyes (frame `#aaaaaa`, panels `#c4c4c4`, title bar `#4a4a4a`, ink `#1c1c1c`;
  the bakery and pixel art are dimmed to match). Tokens live at the top of `styles.css`.
- Type: two pixel faces. Pixelify Sans (Google Fonts) for titles, tabs and
  buttons; Galmuri11 (OFL, bundled in `web/src/fonts`, cut to Latin) for
  everything you read. Nothing else.
- Dotted 1px rules, 1px solid frames, flat pixel buttons.
- Pixel art is PNG in `web/src/art`, drawn by the scripts in
  `ahreum-cyworld-design.zip`: the bakery background, the miniroom
  (300 × 222), the minimi (24 × 39), a balloon and two flower
  stickers. Always scaled by whole numbers with `image-rendering: pixelated`;
  the bakery background is built from tiling pieces (`web/src/art/cafe`, drawn at 2×,
  shown 1:1) so it fills any screen; the side pieces hide under 1336px wide.
- Motion: a short sparkle trail behind the pointer, off under reduced motion.

## Photos to add (optional; plates show "Photograph to come" locally until then)

4:3, at least 1200×900, JPG, under 500 KB. No resident data, no PATRY internals.

| Case | Plate | Path |
| --- | --- | --- |
| ADiNA | System overview (architecture diagram) | `web/public/images/adina/overview.jpg` |
| ADiNA | Evaluation detail (a metric chart, anonymised) | `web/public/images/adina/detail.jpg` |
| OpenQuake | Hazard or exposure map | `web/public/images/openquake/data-map.jpg` |
| OpenQuake | The SURE poster | `web/public/images/openquake/poster.jpg` |
