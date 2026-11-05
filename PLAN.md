# Portfolio — plan v3: paper

Supersedes v2 (3D terrain + planet work map). Branch: `paper`.

## Idea

Recruiters want to know what kind of person this is, in plain words. The page opens
zoomed in on a pile of papers with a plain intro on the top sheet. Scrolling gathers
the pile, then each section lifts a sheet from it and folds or cuts it into an object:

| Section | Plain line | Sheet |
| --- | --- | --- |
| Working with AI | I check AI's work before anyone relies on it. | Red sheet folds into a crane |
| Data analysis & research | I go to the source before I trust a result. | Blue sheet: circle cut out, becomes the earth |
| Building software | I build things people keep using. | Kraft sheet folds into a house |
| Leadership | I find a way in, then bring people with me. | Indigo sheet folded, cut, opened into paper people |

Sheets only ever rise from the pile (no closing). Transitions are short; each finished
object holds for most of its section. Then: ADiNA case, OpenQuake spotlight, the range
graph, recognition, contact.

## Design

- Paper palette: cotton `#f8f5ee`, page `#f2ede3`, ink `#1f1a16`, vermilion `#b5452c`,
  indigo `#26344f`, kraft `#c4a173`, sage `#7f9670`.
- Type: Instrument Serif (display), Newsreader (text), Hanken Grotesk (labels).
- Textures are generated SVG noise (grain, washi fibres, kraft specks): no image files.
- Three.js removed. Bundle went from about 1.1 MB to about 290 KB.

## Photos to add (optional; plates show "Photograph to come" until then)

4:3, at least 1200×900, JPG, under 500 KB. No resident data, no PATRY internals.

| Case | Plate | Path |
| --- | --- | --- |
| ADiNA | System overview (architecture diagram) | `web/public/images/adina/overview.jpg` |
| ADiNA | Evaluation detail (a metric chart, anonymised) | `web/public/images/adina/detail.jpg` |
| OpenQuake | Hazard or exposure map | `web/public/images/openquake/data-map.jpg` |
| OpenQuake | The SURE poster | `web/public/images/openquake/poster.jpg` |
