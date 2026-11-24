# Portfolio — plan v4: minihompy

Supersedes v3 (paper). Branch: `paper`.

## Idea

An open book in a window, in front of a pixel bakery-cafe, in the spirit of a 2000s
minihompy. The window fills the screen and never scrolls; the two pages scroll
on their own. The left page is the owner's column (visit counter, minimi,
one-line intro, now/next, contact buttons). The right page is whichever tab is
open. Index tabs sit on the right edge, below a balloon sticker. The home tab opens on a pixel
miniroom. English only.

| Tab | What it holds |
| --- | --- |
| Home | Miniroom, notice, new posts |
| Profile | Facts, then the four traits with their evidence (`SKILLS`) |
| Diary | Every position, newest first (`EXPERIENCE`) |
| Board | The two case studies as posts (`CASES`); `#case-<id>` opens one |
| Graph | The range graph (`RANGE`) |
| Awards | `AWARDS` |
| Guestbook | Contact |

Old anchors still work: `#experience` → Diary, `#cases` → Board, `#range` → Graph,
`#recognition` → Awards, `#contact` → Guestbook.

## Design

- Two modes, switched from the title bar and remembered in the browser. Color:
  frame `#f4f1ec`, title bar `#786f68`, panels `#ffffff`, rules `#c8c0b6`, ink
  `#33302d`, labels `#5a524a`, one point colour `#b9625e` (the rug's dusty rose).
  E-ink: the same page in light greys, like an e-reader, for resting the eyes (frame `#eaeaea`, panels `#f4f4f4`,
  title bar `#6a6a6a`, ink `#2e2e2e`). Tokens live at the top of `styles.css`.
- Type: two pixel faces. Pixelify Sans (Google Fonts) for titles, tabs and
  buttons; Galmuri11 (OFL, bundled in `web/src/fonts`, cut to Latin) for
  everything you read. Nothing else.
- Dotted 1px rules, 1px solid frames, flat pixel buttons.
- Pixel art is PNG in `web/src/art`, drawn by the scripts in
  `ahreum-cyworld-design.zip`: the bakery background (640 × 400), the miniroom
  (300 × 222, shown at 2×), the minimi (24 × 37), a balloon and two flower
  stickers. Always scaled by whole numbers with `image-rendering: pixelated`;
  the background alone is stretched to cover the screen, so the whole bakery shows.
- Motion: a short sparkle trail behind the pointer, off under reduced motion.
- The visit counter counts the viewer's own visits in their browser.

## Photos to add (optional; plates show "Photograph to come" locally until then)

4:3, at least 1200×900, JPG, under 500 KB. No resident data, no PATRY internals.

| Case | Plate | Path |
| --- | --- | --- |
| ADiNA | System overview (architecture diagram) | `web/public/images/adina/overview.jpg` |
| ADiNA | Evaluation detail (a metric chart, anonymised) | `web/public/images/adina/detail.jpg` |
| OpenQuake | Hazard or exposure map | `web/public/images/openquake/data-map.jpg` |
| OpenQuake | The SURE poster | `web/public/images/openquake/poster.jpg` |
