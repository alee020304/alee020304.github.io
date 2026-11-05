// II. Collage: newsprint clippings torn and taped onto kraft board.
// Words are the study's own: the reform, and the regional split it found.

import { motion } from "framer-motion";
import { rng, tornClip } from "../../paper.jsx";

const CLIPPINGS = [
  { head: "Healthcare reform", style: "masthead", x: 6, y: 8, w: 50, rot: -4, lines: 10, cols: 2, seed: 11 },
  { head: "Federal", style: "italic", x: 55, y: 5, w: 36, rot: 5, lines: 5, seed: 23, tape: "tr" },
  { head: "Provincial", style: "bold", x: 59, y: 41, w: 34, rot: -6, lines: 6, seed: 31 },
  { head: "The Maritimes", style: "italic", x: 10, y: 55, w: 36, rot: 3, lines: 4, seed: 47, tape: "tl" }
];

function Lines({ n, seed }) {
  const rand = rng(seed);
  return Array.from({ length: n }, (_, i) => (
    <span key={i} className="np-line" style={{ width: `${i === n - 1 ? 40 + rand() * 30 : 86 + rand() * 14}%` }} />
  ));
}

function Heatmap() {
  const rand = rng(5);
  return (
    <div className="heatmap">
      {Array.from({ length: 30 }, (_, i) => (
        <span key={i} style={{ opacity: 0.15 + rand() * 0.85 }} />
      ))}
    </div>
  );
}

const settle = (i, rot) => ({
  initial: { opacity: 0, y: -24, rotate: rot + (i % 2 ? 9 : -9), scale: 1.04 },
  animate: { opacity: 1, y: 0, rotate: rot, scale: 1 },
  transition: { delay: 0.08 + i * 0.09, type: "spring", stiffness: 120, damping: 16 }
});

export default function Collage() {
  return (
    <div className="art collage" role="img" aria-label="A collage of torn newspaper clippings about healthcare reform">
      {CLIPPINGS.map((c, i) => (
        <motion.div
          key={c.head}
          className={`clipping np-${c.style}`}
          style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%` }}
          {...settle(i, c.rot)}
        >
          <div className="clipping-paper" style={{ clipPath: tornClip(c.seed) }}>
            <p className="np-head">{c.head}</p>
            <div className={c.cols === 2 ? "np-cols" : undefined}>
              <div>
                <Lines n={c.lines} seed={c.seed} />
              </div>
              {c.cols === 2 && (
                <div>
                  <Lines n={c.lines - 2} seed={c.seed + 1} />
                </div>
              )}
            </div>
          </div>
          {c.tape && <span className={`tape tape-${c.tape}`} />}
        </motion.div>
      ))}

      <motion.div className="clipping scrap" style={{ left: "45%", top: "67%", width: "25%" }} {...settle(4, -2)}>
        <div className="clipping-paper" style={{ clipPath: tornClip(61, { depth: 2.4 }) }}>
          <Heatmap />
        </div>
        <span className="tape tape-tr" />
      </motion.div>

      <motion.div className="tag" style={{ left: "72%", top: "79%" }} {...settle(5, 7)}>
        2,100+ articles
      </motion.div>
    </div>
  );
}
