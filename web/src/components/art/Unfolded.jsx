// IV. Unfolded: a blank square sheet carrying the crease pattern of a
// crane base. The creases draw themselves in; nothing is folded yet.

import { motion } from "framer-motion";

const S = 260;
const O = (400 - S) / 2;
const P = (x, y) => [O + x * S, O + y * S];
const C = P(0.5, 0.5);

// Eight facets around the centre, alternately catching the light.
const RING = [P(0, 0), P(0.5, 0), P(1, 0), P(1, 0.5), P(1, 1), P(0.5, 1), P(0, 1), P(0, 0.5)];
const SHADES = ["#f8f4ec", "#ede7dc", "#f5f0e7", "#e9e2d6", "#f8f4ec", "#ede7dc", "#f5f0e7", "#e9e2d6"];

// Kite creases: from each corner at ±22.5° off the diagonal, to the other diagonal.
const K = 0.293;
const KITES = [
  [P(0, 0), P(1 - K, K)], [P(0, 0), P(K, 1 - K)],
  [P(1, 0), P(K, K)], [P(1, 0), P(1 - K, 1 - K)],
  [P(1, 1), P(K, 1 - K)], [P(1, 1), P(1 - K, K)],
  [P(0, 1), P(1 - K, 1 - K)], [P(0, 1), P(K, K)]
];

const line = ([a, b]) => `M${a[0]},${a[1]} L${b[0]},${b[1]}`;

function Crease({ d, kind, i }) {
  return (
    <motion.path
      d={d}
      className={`crease crease-${kind}`}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 0.25 + i * 0.07, duration: 0.9, ease: "easeInOut" }}
    />
  );
}

export default function Unfolded() {
  const valleys = [line([P(0, 0), P(1, 1)]), line([P(1, 0), P(0, 1)])];
  const mountains = [line([P(0.5, 0), P(0.5, 1)]), line([P(0, 0.5), P(1, 0.5)])];
  return (
    <svg className="art unfolded" viewBox="0 0 400 400" role="img" aria-label="An unfolded square of paper showing only its creases">
      <g transform="rotate(-7 200 200)">
        <g filter="url(#layer)">
          {RING.map((p, i) => {
            const q = RING[(i + 1) % RING.length];
            return <polygon key={i} points={`${C} ${p} ${q}`} fill={SHADES[i]} />;
          })}
        </g>
        <g fill="none" strokeLinecap="round">
          {valleys.map((d, i) => (
            <Crease key={d} d={d} kind="valley" i={i} />
          ))}
          {mountains.map((d, i) => (
            <Crease key={d} d={d} kind="mountain" i={i + 2} />
          ))}
          {KITES.map((k, i) => (
            <Crease key={i} d={line(k)} kind="kite" i={i + 4} />
          ))}
        </g>
      </g>
    </svg>
  );
}
