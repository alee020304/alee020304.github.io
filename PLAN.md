# Portfolio rebuild — plan v2

Supersedes v1. You asked for a real rebuild, not additions to the current frame:
motion (Framer Motion) + Three.js, no backend/database. Confirmed with you:
**React + Vite + React Three Fiber + Framer Motion**, built output committed to
the repo (no CI), **3D hero scene + 3D work map**.

Facts still come only from `../reum/resume/versions/base/AhreumLee_Base.tex` and
`../reum/resume/bullet-bank.md`, skipping every TODO line. No student IDs, no
internal PATRY data/screenshots, no resident or care-home names.

## Architecture

```
alee020304.github.io/
  web/                    # Vite + React source (dev here)
    index.html            # Vite entry template
    src/
      main.jsx
      App.jsx
      data/work.js        # the WORK/EDGES facts, typed
      components/
        Hero3D.jsx         # R3F scene: terrain + pins
        WorkMap3D.jsx       # R3F scene: node graph
        Drawer.jsx          # Framer Motion slide-in case-study panel
        Awards.jsx, About.jsx, Contact.jsx, Header.jsx
    public/images/...      # case-study screenshots (copied as-is on build)
  index.html, assets/      # BUILT output — what GitHub Pages actually serves
  package.json, vite.config.js
  PLAN.md
```

- `vite.config.js` sets `root: "web"`, `build.outDir: ".."` (repo root),
  `emptyOutDir: false`, and fixed (non-hashed) output filenames
  (`assets/app.js`, `assets/app.css`) so rebuilds overwrite cleanly instead of
  accumulating hashed bundles.
- Workflow going forward: edit in `web/src`, run `npm run build`, commit the
  changed root files. No GitHub Actions, no server, no database — matches "no db."
- Old `script.js`, `style.css`, root `index.html`, and `projects/*.html` are
  removed — their content moves into the React app (see Content below).

## Design direction

Grounded in the actual subject matter: seismic-risk HPC (OpenQuake), geospatial
data, a voice-AI care-research prototype (ADiNA), and a literal "map of work."
Direction: **a field-survey / instrument-readout aesthetic** — topographic
terrain, pin markers, waveform traces — rather than a generic SaaS or
cream-and-serif AI-portfolio look.

- **Color** (dark, ink-toned — not flat near-black):
  `--ink #1C1815` (background), `--paper #EDE6D9` (text),
  `--surface #262019` (panels/drawer), `--brass #D7A24A` (primary accent —
  pins, active states), `--slate #5B8DB8` (secondary accent — graph edges/data),
  `--muted #9C9284` (secondary text).
- **Type**: "Instrument Serif" for headlines (display, a little idiosyncratic),
  "IBM Plex Sans" for everything else (body, nav, labels) — two clearly distinct
  families, no monospace labels, no tracked-out all-caps eyebrows.
- **Layout**: left-aligned, asymmetric — not centered-hero/centered-card. Hero
  splits text (left) against the 3D terrain scene (right). Section dividers are
  thin rules carrying real labels (org · dates), not decorative numbering.
- **Motion**: one orchestrated hero entrance (terrain resolves in, pins drop in
  sequence, headline follows) — not fade-up-on-scroll for every section. After
  that, motion only answers a click: opening a node's drawer, toggling a tag
  filter (nodes animate opacity/scale in the 3D scene), closing the drawer.

### Hero (wireframe)
```
┌──────────────────────────────────────────────────────────┐
│ Ahreum Lee                               Work  Awards     │
│                                                            │
│ Building where code,              ┌──────────────────┐    │
│ terrain, and care                 │  3D terrain mesh  │    │
│ meet.                             │  + pin markers    │    │
│                                    │  (orbit-able)      │    │
│ CS & AI, McGill. Seismic HPC,     └──────────────────┘    │
│ voice-AI care research, and                               │
│ field-built products.                                     │
│ [ See the work ]                                           │
└──────────────────────────────────────────────────────────┘
```

### Work map + drawer (wireframe)
```
closed:                                opened (click a node):
┌───────────────────────────┐          ┌───────────────┬─────────────┐
│  3D node graph, full width │          │ graph (dimmed) │ ADiNA        │
│  tag filters along top     │   →      │                │ Research... │
│                              │          │                │ case study   │
└───────────────────────────┘          └───────────────┴─────────────┘
```
Clicking replaces hover-tooltips (hover doesn't work on touch/phone anyway).
OpenQuake and ADiNA open a full case-study drawer (gallery + "things I worked
on" notes, same content as today's pages). Every other node (PATRY, Complex
Collaboration, Reconstruct, Nauly, Building Characteristics Generator, ED
Block, GDG, AKCSE, CHI) opens a short drawer: title/org/dates/tags + 1–2
sentences + an outbound link where one exists (GitHub/Devpost) — no fabricated
case studies for roles the source doesn't elaborate on.

## Content (unchanged from v1, same facts)

- **Experience nodes**: rename `imsf` → **Complex Collaboration Lab** (Python/
  Selenium/Pandas pipelines, 2,100+ articles, BERTopic, validated trends for a
  skeptical supervisor); add **PATRY Group** (Property Inbox + LTB tracker on
  Yardi data; tenant maintenance bot in progress — no metrics, those are TODO
  in your source); update **ADiNA**'s case study to add the finding currently
  missing everywhere: most-factual agent was least engaging with distressed
  residents → 3 care-home visits shaped a split-memory design.
- **Project nodes**: add **Nauly** (McHacks 2026, PM role, team of 4/24h,
  Gumloop, linked to its confirmed Devpost page) and **Building Characteristics
  Generator** (address → building dimensions/energy metrics, linked to its
  GitHub repo).
- **New Awards & Certification section** (ledger-style list, not cards): Best
  SURE Poster Award – General (2026); NSERC USRA (2025); CKC 2025 Best Young
  Generation Chapter Award; CKC 2025 Best Volunteer Award; ACM CHI 2025
  Volunteer T-Shirt Design Winner; WinterHacks 2024 2nd Place & Best UI; and
  Certification: Claude Certified Developer – Foundations (CCDV-F), Anthropic,
  2026.

## Photo checklist (unchanged spots, new paths)

Same 6 screenshots as v1, now living in `web/public/images/...` (Vite copies
`public/` verbatim into the build). 4:3 ratio, ≥1200×900px, JPG/PNG, <500KB:

| Drawer | Spot | What would work | Path |
|---|---|---|---|
| OpenQuake | Overview | Diagram/screenshot of the calc pipeline (engine → HPC/SLURM → outputs) | `web/public/images/openquake/overview.jpg` |
| OpenQuake | Data/map | Hazard/exposure map or raster output | `web/public/images/openquake/data-map.jpg` |
| OpenQuake | Research material | Photo or scan of the Best SURE Poster Award poster | `web/public/images/openquake/poster.jpg` |
| ADiNA | Overview | Architecture diagram (voice → RAG/Weaviate → LLM → DeepEval) | `web/public/images/adina/overview.jpg` |
| ADiNA | Interface | Screenshot of the chat/voice UI with placeholder input — no real resident data | `web/public/images/adina/interface.jpg` |
| ADiNA | Detail | Close-up of the memory-store split or a DeepEval metric chart, anonymized | `web/public/images/adina/detail.jpg` |

Placeholders: any slot you skip keeps a dashed "Image coming soon" box in the
drawer — tell me which ones to leave that way.

## Testing & commit

- `webapp-testing` skill: desktop width and phone width, covering hero 3D load,
  node-graph interaction + drawer open/close on both pointer and touch, tag
  filters, reduced-motion behavior, and the awards/about/contact sections.
- Commit to `portfolio-refresh` only. No push, no merge.

---
Waiting on your go-ahead on this plan, then I'll wait for photos (or your
placeholder calls) before building.
