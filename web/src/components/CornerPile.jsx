// After the opening, the pile of papers stays with the reader, tucked into
// the bottom-left corner. When the graph comes into view, the graph-paper
// sheet leaves the pile: it becomes the sheet the graph is drawn on.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SHEETS = [
  { deco: "kraft", x: 0, y: 26, r: 14 },
  { deco: "washi", x: 30, y: 6, r: -9 },
  { deco: "news", x: 6, y: 14, r: 4 },
  { deco: "graph", x: 40, y: 30, r: -16 },
  { deco: "cotton", x: 16, y: 40, r: -3 }
];

export default function CornerPile() {
  const [show, setShow] = useState(false);
  const [graphOut, setGraphOut] = useState(false);
  useEffect(() => {
    const check = () => {
      const forms = document.getElementById("forms");
      const range = document.getElementById("range");
      if (!forms || !range) return;
      setShow(forms.getBoundingClientRect().bottom < innerHeight * 0.9);
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
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 80 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {SHEETS.map((s) => {
        const out = s.deco === "graph" && graphOut;
        return (
          <motion.div
            key={s.deco}
            className={`corner-sheet deco deco-${s.deco}`}
            initial={false}
            animate={{
              x: out ? 260 : s.x,
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
