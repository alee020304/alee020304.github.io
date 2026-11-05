// The opening: one pinned stage, four sheets. Scrolling swaps the sheet on
// the board and the text beside it; the first sheet doubles as the hero.

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { FORMS } from "../data/work.js";
import Crane from "./art/Crane.jsx";
import Collage from "./art/Collage.jsx";
import EarthCut from "./art/EarthCut.jsx";
import Woven from "./art/Woven.jsx";

const sheet = {
  initial: { opacity: 0, y: 28, rotate: 1.5 },
  animate: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -18, rotate: -1, transition: { duration: 0.35, ease: "easeIn" } }
};

function Art({ id, lift }) {
  if (id === "folded") return <Crane />;
  if (id === "collage") return <Collage />;
  if (id === "cut") return <EarthCut lift={lift} />;
  return <Woven />;
}

function FormLink({ form }) {
  if (form.caseId) return <a className="text-link" href={`#case-${form.caseId}`}>Read the case</a>;
  if (form.rangeId) return <a className="text-link" href="#range">See it on the graph</a>;
  return null;
}

export default function Forms() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = FORMS.length;
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n))));
  });
  // The earth's layers lift as you scroll through its frame.
  const lift = useTransform(scrollYProgress, [2 / n, 3 / n], [0, 1]);

  const form = FORMS[active];

  function goTo(i) {
    const el = ref.current;
    const top = el.offsetTop + (i + 0.5) * ((el.offsetHeight - innerHeight) / n);
    scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section id="forms" ref={ref} className="forms" style={{ height: `${n * 100 + 20}svh` }}>
      <div className="forms-stage wrap">
        <div className="forms-text">
          <AnimatePresence mode="wait">
            <motion.div key={form.id} {...sheet}>
              {active === 0 ? (
                <>
                  <p className="kicker">Ahreum Lee</p>
                  <h1>One sheet, folded many ways.</h1>
                  <p className="lede">
                    Computer science and AI are my material. What I make from them changes with the problem:
                    an evaluation for an AI nurse, a study of 2,100 news articles, seismic risk calculations cut
                    from four days to thirty hours, and tools that a property company's staff use every day.
                  </p>
                  <p className="scroll-cue">Scroll through four forms</p>
                </>
              ) : (
                <>
                  <p className="kicker">
                    <span className="numeral">{form.numeral}</span> {form.technique}
                  </p>
                  <h2>{form.title}</h2>
                  <p className="lede">{form.body}</p>
                  <FormLink form={form} />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <figure className={`board board-${form.id}`}>
          <AnimatePresence mode="wait">
            <motion.div key={form.id} className="board-sheet" {...sheet}>
              <Art id={form.id} lift={lift} />
            </motion.div>
          </AnimatePresence>
          <figcaption>
            <span className="numeral">{form.numeral}</span>
            <span className="caption-technique">{form.technique}.</span> {form.caption}
            {active === 0 && (
              <>
                {" "}
                <FormLink form={form} />
              </>
            )}
            {form.note && <span className="caption-note">{form.note}</span>}
          </figcaption>
        </figure>

        <nav className="swatches" aria-label="Forms">
          {FORMS.map((f, i) => (
            <button
              key={f.id}
              className={`swatch swatch-${f.id}` + (i === active ? " active" : "")}
              onClick={() => goTo(i)}
              aria-current={i === active ? "step" : undefined}
            >
              <span className="numeral">{f.numeral}</span> {f.technique}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
