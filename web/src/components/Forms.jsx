// The opening: one pinned stage holding the pop-up book. Scrolling turns the
// book's pages and swaps the text beside it; the closed cover is the hero.

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FORMS } from "../data/work.js";
import Book from "./Book.jsx";

const sheet = {
  initial: { opacity: 0, y: 28, rotate: 1.5 },
  animate: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -18, rotate: -1, transition: { duration: 0.35, ease: "easeIn" } }
};

function FormLink({ form }) {
  if (form.caseId) return <a className="text-link" href={`#case-${form.caseId}`}>Read the case</a>;
  if (form.rangeId) return <a className="text-link" href="#range">See it on the graph</a>;
  return null;
}

export default function Forms() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [cover, setCover] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = FORMS.length;
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n))));
    // The hero text stays until the cover is most of the way open.
    setCover(p * n < 0.24);
  });

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
            <motion.div key={cover ? "cover" : form.id} {...sheet}>
              {cover ? (
                <>
                  <p className="kicker">Ahreum Lee</p>
                  <h1>One sheet, folded many ways.</h1>
                  <p className="lede">
                    Computer science and AI are my material. What I make from them changes with the problem:
                    an evaluation for an AI nurse, a study of 2,100 news articles, an open-source seismic risk engine,
                    and tools that a property company's staff use every day.
                  </p>
                  <p className="scroll-cue">Scroll to open the book</p>
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

        <figure className="board">
          <Book progress={scrollYProgress} active={active} />
          <figcaption>
            {cover ? (
              <span className="caption-note">A pop-up book of selected work.</span>
            ) : (
              <>
                <span className="numeral">{form.numeral}</span>
                <span className="caption-technique">{form.technique}.</span> {form.caption}
                {form.note && <span className="caption-note">{form.note}</span>}
              </>
            )}
          </figcaption>
        </figure>

        <nav className="swatches" aria-label="Pages">
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
