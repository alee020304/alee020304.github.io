// The opening: a pile of papers, zoomed in and spread out, with my intro
// on the top sheet. Scrolling past the intro gathers the pile at the bottom
// of the screen. From then on, scroll only picks the section (the text);
// the paper plays on its own clock: the section's sheet rises from the pile
// (bottom up, like a new page), folds or is cut into its object, and stays
// finished until the next section sends it up and out.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, motionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { INTRO, SKILLS } from "../data/work.js";
import { SHEETS } from "./art/Sheets.jsx";

// Scroll timeline, in screen heights: a short intro, then one per section.
const INTRO_LEN = 0.7;
const SECTION_LEN = 1;
const TOTAL = INTRO_LEN + SKILLS.length * SECTION_LEN;

// Seconds. Each object takes the time its making deserves.
const RISE = 0.6;
const LEAVE = 0.45;
const MAKE = { crane: 3.6, earth: 3, house: 3.8, dolls: 4.2 };
const EASE = [0.22, 1, 0.36, 1];

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

// Pose of one pile sheet at gather progress z (0 spread out, 1 gathered).
function pilePose(entry, z, L) {
  const spread = lerp(1, 0.18, z);
  return {
    x: lerp(0, L.pile.x, z) + entry.x * L.w * spread,
    y: lerp(0, L.pile.y, z) + entry.y * L.h * spread,
    r: entry.r * lerp(1, 0.5, z),
    s: lerp(1.15, 0.7, z)
  };
}

// A section sheet rises from the pile to the stage, then leaves upward.
function sheetPose(entry, z, arrive, leave, L) {
  const pile = pilePose(entry, z, L);
  return {
    x: lerp(pile.x, L.stage.x, arrive),
    y: lerp(pile.y, L.stage.y, arrive) - leave * L.h * 0.85,
    r: lerp(pile.r, 0, arrive),
    s: lerp(pile.s, 1, arrive) * lerp(1, 0.85, leave),
    o: 1 - leave,
    // The arriving sheet sits above the one leaving; both above the pile.
    zi: arrive > 0 ? (leave > 0 ? 10 : 20) : 5 - entry.section
  };
}

function Sheet({ entry, z, m, L }) {
  const inputs = m ? [z, m.arrive, m.leave] : [z];
  const pose = ([zv, a = 0, l = 0]) =>
    m ? sheetPose(entry, zv, a, l, L) : { ...pilePose(entry, zv, L), o: 1, zi: 1 };
  const get = (k) => useTransform(inputs, (vals) => pose(vals)[k]);
  const style = {
    x: get("x"),
    y: get("y"),
    rotate: get("r"),
    scale: get("s"),
    opacity: get("o"),
    zIndex: get("zi"),
    width: L.size,
    height: L.size,
    marginLeft: -L.size / 2,
    marginTop: -L.size / 2
  };

  if (!m) return <motion.div className={`pile-sheet deco deco-${entry.deco}`} style={style} aria-hidden="true" />;
  const Art = SHEETS[SKILLS[entry.section].sheet];
  return (
    <motion.div className="pile-sheet" style={style}>
      <Art shape={m.shape} />
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
        <h1>{INTRO.name}</h1>
        <p className="hero-title">{INTRO.title}</p>
        <p className="hero-now">
          <span className="now-tag">Now</span> {INTRO.now}
        </p>
        <p className="lede">{INTRO.summary}</p>
        <p className="scroll-cue">Scroll</p>
      </motion.div>
    </div>
  );
}

// Plays the paper whenever the active section changes.
function usePaper(active) {
  const still = useReducedMotion();
  const [z] = useState(() => motionValue(0));
  const [sheets] = useState(() => SKILLS.map(() => ({ arrive: motionValue(0), shape: motionValue(0), leave: motionValue(0), runs: [] })));

  useEffect(() => {
    const run = (mv, to, opts) => (still ? (mv.set(to), { stop() {} }) : animate(mv, to, opts));
    const zRun = run(z, active >= 0 ? 1 : 0, { duration: 0.7, ease: EASE });
    sheets.forEach((m, i) => {
      if (i === active) {
        if (m.arrive.get() === 1 && m.leave.get() === 0) return;
        m.runs.forEach((r) => r.stop());
        m.arrive.set(0);
        m.shape.set(0);
        m.leave.set(0);
        const make = MAKE[SKILLS[i].sheet];
        m.runs = [
          run(m.arrive, 1, { duration: RISE, ease: EASE }),
          run(m.shape, 1, { delay: RISE * 0.8, duration: make, ease: "linear" })
        ];
      } else if (m.arrive.get() > 0 && m.leave.get() < 1) {
        // On stage (or on its way): send it up and out, never back down.
        m.runs.forEach((r) => r.stop());
        m.runs = [run(m.leave, 1, { duration: LEAVE, ease: "easeIn" })];
      }
    });
    return () => zRun.stop();
  }, [active, still, z, sheets]);

  return { z, sheets };
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
  const { z, sheets } = usePaper(active);

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
            <Sheet key={i} entry={entry} z={z} m={sheets[entry.section]} L={L} />
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
