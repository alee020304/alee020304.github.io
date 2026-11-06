// After the opening, the pile of papers stays with the reader, tucked into
// the bottom-right corner, where the opening left it. When the graph comes into view, the graph-paper
// sheet leaves the pile: it becomes the sheet the graph is drawn on.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Offsets match the opening's gathered pile.
const SHEETS = [
  { deco: "washi", x: -18, y: -11, r: -6 },
  { deco: "graph", x: 19, y: -10, r: 4.5 },
  { deco: "news", x: 20, y: 11, r: -3 },
  { deco: "kraft", x: -19, y: 11, r: 7 },
  { deco: "cotton", x: 2, y: 14, r: -1.5 }
];

export default function CornerPile() {
  const [show, setShow] = useState(false);
  const [graphOut, setGraphOut] = useState(false);
  useEffect(() => {
    const check = () => {
      const forms = document.getElementById("forms");
      const range = document.getElementById("range");
      if (!forms || !range) return;
      setShow(forms.getBoundingClientRect().bottom <= innerHeight + 1);
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
      transition={{ duration: 0.25 }}
    >
      {SHEETS.map((s) => {
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
