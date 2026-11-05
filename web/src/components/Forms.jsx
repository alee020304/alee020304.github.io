// The opening: a pile of papers, zoomed in and spread out, with my intro
// on the top sheet. Scrolling zooms out and gathers the pile at the bottom
// of the screen. Each section then lifts the next sheet up from the pile
// (bottom up, like a new page) and folds or cuts it into an object, while
// the previous object moves on up and out. Transitions are short; each
// finished object holds for most of its section.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { INTRO, SKILLS } from "../data/work.js";
import { SHEETS } from "./art/Sheets.jsx";

// Scroll timeline, in units: a short intro, then one long unit per section.
const INTRO_LEN = 0.7;
const SECTION_LEN = 1.4;
const TOTAL = INTRO_LEN + SKILLS.length * SECTION_LEN;
const ARRIVE = 0.14; // share of a section spent lifting the sheet into place
const SHAPE = [0.06, 0.36]; // share of a section spent folding or cutting
const LEAVE = 0.12; // share of the next section spent moving the old object out

const smooth = (x) => x * x * (3 - 2 * x);
const clamp = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, t) => a + (b - a) * t;

// Where each sheet lies in the spread-out pile: x, y as a share of the
// viewport, and rotation. Decorative sheets have a texture; section sheets
// have the index of their section.
const PILE = [
  { deco: "washi", x: -0.36, y: -0.3, r: -12 },
  { deco: "graph", x: 0.37, y: -0.28, r: 9 },
  { deco: "news", x: 0.4, y: 0.3, r: -6 },
  { deco: "kraft", x: -0.38, y: 0.3, r: 14 },
  { deco: "cotton", x: 0.04, y: 0.4, r: -3 },
  { section: 3, x: 0.2, y: 0.34, r: -15 },
  { section: 2, x: -0.12, y: 0.26, r: 5 },
  { section: 1, x: 0.3, y: 0.1, r: -9 },
  { section: 0, x: 0.22, y: -0.06, r: 7 }
];

function useViewport() {
  const [vp, setVp] = useState(() => ({ w: innerWidth, h: innerHeight }));
  useEffect(() => {
    const onResize = () => setVp({ w: innerWidth, h: innerHeight });
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  }, []);
  return vp;
}

// Layout that depends on the screen: sheet size, where objects sit, where
// the pile gathers.
function layout({ w, h }) {
  const narrow = w < 860;
  const size = narrow ? Math.min(w * 0.7, h * 0.36) : Math.min(w * 0.34, h * 0.56);
  return {
    w,
    h,
    size,
    stage: narrow ? { x: 0, y: -h * 0.2 } : { x: w * 0.2, y: h * 0.02 },
    pile: narrow ? { x: 0, y: h * 0.6 } : { x: w * 0.2, y: h * 0.66 }
  };
}

// Pose of one pile sheet at intro progress z (0 spread out, 1 gathered).
function pilePose(entry, z, L) {
  const spread = lerp(1, 0.18, z);
  return {
    x: lerp(0, L.pile.x, z) + entry.x * L.w * spread,
    y: lerp(0, L.pile.y, z) + entry.y * L.h * spread,
    r: entry.r * lerp(1, 0.5, z),
    s: lerp(1.15, 0.7, z)
  };
}

function sheetState(v, entry, L) {
  const u = v * TOTAL;
  const z = smooth(clamp(u / INTRO_LEN));
  const pile = pilePose(entry, z, L);
  if (entry.section === undefined) return { ...pile, o: 1, shape: 0, zi: 1 };

  const t = (u - INTRO_LEN - entry.section * SECTION_LEN) / SECTION_LEN;
  const arrive = smooth(clamp(t / ARRIVE));
  const shape = smooth(clamp((t - SHAPE[0]) / (SHAPE[1] - SHAPE[0])));
  const last = entry.section === SKILLS.length - 1;
  const leave = last ? 0 : smooth(clamp((t - 1) / LEAVE));
  return {
    x: lerp(pile.x, L.stage.x, arrive),
    y: lerp(pile.y, L.stage.y, arrive) - leave * L.h * 0.85,
    r: lerp(pile.r, 0, arrive),
    s: lerp(pile.s, 1, arrive) * lerp(1, 0.85, leave),
    o: 1 - leave,
    shape,
    // Lifted sheets sit above the pile, later sections above earlier ones.
    zi: arrive > 0 ? 10 + entry.section : 5 - entry.section
  };
}

function Sheet({ entry, progress, L }) {
  const get = (k) => (v) => sheetState(v, entry, L)[k];
  const x = useTransform(progress, get("x"));
  const y = useTransform(progress, get("y"));
  const rotate = useTransform(progress, get("r"));
  const scale = useTransform(progress, get("s"));
  const opacity = useTransform(progress, get("o"));
  const zIndex = useTransform(progress, get("zi"));
  const shape = useTransform(progress, get("shape"));
  const half = -L.size / 2;
  const style = { x, y, rotate, scale, opacity, zIndex, width: L.size, height: L.size, marginLeft: half, marginTop: half };

  if (entry.section === undefined) {
    return <motion.div className={`pile-sheet deco deco-${entry.deco}`} style={style} aria-hidden="true" />;
  }
  const Art = SHEETS[SKILLS[entry.section].sheet];
  return (
    <motion.div className="pile-sheet" style={style}>
      <Art shape={shape} />
    </motion.div>
  );
}

function HeroSheet({ progress, L }) {
  const z = (v) => smooth(clamp((v * TOTAL) / INTRO_LEN));
  const y = useTransform(progress, (v) => -z(v) * L.h * 0.9);
  const rotate = useTransform(progress, (v) => -2 - z(v) * 6);
  const opacity = useTransform(progress, (v) => 1 - clamp(z(v) * 1.4 - 0.2));
  return (
    <div className="hero-place">
      <motion.div className="hero-sheet" style={{ y, rotate, opacity }}>
        <p className="kicker">{INTRO.kicker}</p>
        <h1>{INTRO.name}</h1>
        <p className="hero-role">{INTRO.role}</p>
        <p className="lede">{INTRO.summary}</p>
        <p className="scroll-cue">Scroll</p>
      </motion.div>
    </div>
  );
}

export default function Forms() {
  const ref = useRef(null);
  const L = layout(useViewport());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const u = v * TOTAL - INTRO_LEN + 0.06;
    setActive(u < 0 ? -1 : Math.min(SKILLS.length - 1, Math.floor(u / SECTION_LEN)));
  });

  function goTo(i) {
    const el = ref.current;
    const u = INTRO_LEN + i * SECTION_LEN + SECTION_LEN * 0.5;
    scrollTo({ top: el.offsetTop + (u / TOTAL) * (el.offsetHeight - innerHeight), behavior: "smooth" });
  }

  const skill = SKILLS[active];

  return (
    <section id="forms" ref={ref} className="forms" style={{ height: `${TOTAL * 100}svh` }}>
      <div className="forms-stage">
        <div className="pile">
          {PILE.map((entry, i) => (
            <Sheet key={i} entry={entry} progress={scrollYProgress} L={L} />
          ))}
        </div>

        <HeroSheet progress={scrollYProgress} L={L} />

        <div className="wrap skill-wrap">
          <AnimatePresence mode="wait">
            {skill && (
              <motion.div
                key={skill.id}
                className="skill-text"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.18 } }}
              >
                <p className="kicker">
                  <span className="numeral">{skill.numeral}</span> {skill.heading}
                </p>
                <h2>{skill.trait}</h2>
                <ul className="skill-points">
                  {skill.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <a className="text-link" href={skill.link.href}>
                  {skill.link.label}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="wrap swatches" aria-label="Sections" data-hidden={active < 0 || undefined}>
          {SKILLS.map((s, i) => (
            <button
              key={s.id}
              className={"swatch" + (i === active ? " active" : "")}
              onClick={() => goTo(i)}
              aria-current={i === active ? "step" : undefined}
            >
              <span className="numeral">{s.numeral}</span> <span>{s.heading}</span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
