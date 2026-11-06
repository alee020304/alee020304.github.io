// Once the opening has gathered the pile into the bottom-right corner, this
// fixed copy takes over its decorative sheets, so the pile stays put for the
// rest of the page. When the graph comes into view, the graph-paper sheet
// leaves the pile: it becomes the sheet the graph is drawn on.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GATHERED, PILE } from "./Forms.jsx";

// Laid out exactly as the opening gathers them (see pilePose).
const sheetsFor = (w, h) =>
  PILE.filter((e) => e.deco).map((e) => ({ deco: e.deco, x: e.x * w * 0.04, y: e.y * h * 0.04, r: e.r * 0.5 }));

export default function CornerPile() {
  const [show, setShow] = useState(false);
  const [graphOut, setGraphOut] = useState(false);
  const [vp, setVp] = useState(() => [innerWidth, innerHeight]);
  useEffect(() => {
    const check = () => {
      const forms = document.getElementById("forms");
      const range = document.getElementById("range");
      if (!forms || !range) return;
      const scrolled = -forms.getBoundingClientRect().top / (forms.offsetHeight - innerHeight);
      // Slightly early, so it is in place before the opening's copy goes.
      setShow(scrolled >= GATHERED * 0.97);
      setVp([innerWidth, innerHeight]);
      setGraphOut(range.getBoundingClientRect().top < innerHeight * 0.75);
    };
    check();
    addEventListener("scroll", check, { passive: true });
    addEventListener("resize", check);
    return () => {
      removeEventListener("scroll", check);
      removeEventListener("resize", check);
    };
  }, []);

  return (
    <motion.div
      className="corner-pile"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0 }}
    >
      {sheetsFor(...vp).map((s) => {
        const out = s.deco === "graph" && graphOut;
        return (
          <motion.div
            key={s.deco}
            className={`corner-sheet deco deco-${s.deco}`}
            initial={false}
            animate={{
              x: out ? -260 : s.x,
              y: out ? -320 : s.y,
              rotate: out ? 0 : s.r,
              scale: out ? 1.6 : 1,
              opacity: out ? 0 : 1
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
    </motion.div>
  );
}
