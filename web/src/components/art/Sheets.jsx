// Square sheets that turn into objects. Each takes `shape`, a motion value
// from 0 (a flat sheet) to 1 (the finished object), driven by scroll.
// At 0 every sheet is a plain square, so it can sit in the pile.

import { motion, useTransform } from "framer-motion";
import EarthCut from "./EarthCut.jsx";

const VIEW = "-8 -8 116 116";
const smooth = (x) => x * x * (3 - 2 * x);
const clamp = (x) => Math.min(1, Math.max(0, x));
const ramp = (v, a, b) => smooth(clamp((v - a) / (b - a)));
const lerp = (a, b, t) => a + (b - a) * t;
const fmt = (pts) => pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

/* I. Crane: folded. Square → diamond (the folded base) → crane. */

const RED = { sheet: "#c24e33", light: "#d4593b", mid: "#b5452c", dark: "#8c3020", deep: "#74281b" };

// The crane's facets, drawn back to front, in 400×300 drawing units.
const CRANE = [
  [[186, 168], [206, 168], [288, 34], "dark"],
  [[206, 168], [222, 168], [288, 34], "deep"],
  [[220, 172], [210, 190], [326, 92], "mid"],
  [[220, 172], [230, 174], [326, 92], "light"],
  [[180, 172], [192, 190], [78, 96], "mid"],
  [[180, 172], [170, 174], [78, 96], "light"],
  [[78, 96], [60, 117], [88, 105], "dark"],
  [[78, 96], [88, 105], [92, 100], "mid"],
  [[172, 174], [200, 160], [200, 206], "light"],
  [[200, 160], [228, 174], [200, 206], "mid"],
  [[176, 170], [204, 170], [128, 20], "light"],
  [[204, 170], [228, 170], [128, 20], "mid"]
].map(([a, b, c, tone]) => ({
  end: [a, b, c].map(([x, y]) => [(x - 48) * 0.3 + 7, (y - 20) * 0.3 + 22]),
  tone
}));

// The flat sheet, cut into a fan of twelve triangles around its centre.
const RIM = [[0, 0], [33, 0], [67, 0], [100, 0], [100, 33], [100, 67], [100, 100], [67, 100], [33, 100], [0, 100], [0, 67], [0, 33]];
const FAN = RIM.map((p, i) => [[50, 50], p, RIM[(i + 1) % RIM.length]]);
// The folded base: the same sheet, half size and turned 45°.
const toBase = ([x, y]) => {
  const dx = (x - 50) * 0.5;
  const dy = (y - 50) * 0.5;
  return [50 + dx * Math.SQRT1_2 - dy * Math.SQRT1_2, 50 + dx * Math.SQRT1_2 + dy * Math.SQRT1_2];
};

function Facet({ i, shape }) {
  const start = FAN[i];
  const mid = start.map(toBase);
  const end = CRANE[i].end;
  const points = useTransform(shape, (v) => {
    const [a, b, t] = v < 0.5 ? [start, mid, smooth(v / 0.5)] : [mid, end, smooth((v - 0.5) / 0.5)];
    return fmt(a.map((p, k) => [lerp(p[0], b[k][0], t), lerp(p[1], b[k][1], t)]));
  });
  const fill = useTransform(shape, [0, 0.5, 1], [RED.sheet, i % 2 ? RED.mid : RED.light, RED[CRANE[i].tone]]);
  return <motion.polygon points={points} fill={fill} />;
}

export function CraneSheet({ shape }) {
  return (
    <svg viewBox={VIEW} className="sheet-art" role="img" aria-label="A sheet of red paper folding into a crane">
      <g filter="url(#grain)">
        {CRANE.map((_, i) => (
          <Facet key={i} i={i} shape={shape} />
        ))}
      </g>
    </svg>
  );
}

/* II. Earth: cut. A circle is cut out, the offcut drops away, the earth appears. */

const BLUE = "#5d7895";

export function EarthSheet({ shape }) {
  const cut = useTransform(shape, (v) => ramp(v, 0.02, 0.4));
  const cutOpacity = useTransform(shape, [0.6, 0.7], [1, 0]);
  const offY = useTransform(shape, (v) => ramp(v, 0.42, 0.72) * 40);
  const offRotate = useTransform(shape, (v) => ramp(v, 0.42, 0.72) * 9);
  const offOpacity = useTransform(shape, [0.5, 0.72], [1, 0]);
  const earthOpacity = useTransform(shape, [0.62, 0.85], [0, 1]);
  const lift = useTransform(shape, [0.75, 1], [0, 1]);
  return (
    <div className="sheet-stack">
      <svg viewBox={VIEW} className="sheet-art" role="img" aria-label="A blue sheet with a circle cut from it">
        <g filter="url(#grain)">
          <circle cx="50" cy="50" r="40" fill={BLUE} />
          <motion.path
            d="M0,0 H100 V100 H0 Z M50,10 A40,40 0 1,0 50.01,10 Z"
            fillRule="evenodd"
            fill={BLUE}
            style={{ y: offY, rotate: offRotate, opacity: offOpacity, transformOrigin: "50% 100%" }}
          />
        </g>
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#f2e8d5"
          strokeWidth="0.8"
          style={{ pathLength: cut, opacity: cutOpacity }}
        />
      </svg>
      <motion.div className="sheet-earth" style={{ opacity: earthOpacity }}>
        <EarthCut lift={lift} />
      </motion.div>
    </div>
  );
}

/* III. House: folded. Top corners fold behind, a roof goes on, windows are cut. */

const KRAFT = "#c4a173";
const KRAFT_BACK = "#a8824f";

function Flap({ shape, corner, edge }) {
  // `corner` folds across the line through the two `edge` points.
  const [p, q] = edge;
  const mirror = [p[0] + q[0] - corner[0], p[1] + q[1] - corner[1]];
  const points = useTransform(shape, (v) => {
    const t = ramp(v, 0, 0.4);
    return fmt([p, q, [lerp(corner[0], mirror[0], t), lerp(corner[1], mirror[1], t)]]);
  });
  // Visible while it swings up to edge-on; after that it's behind the sheet.
  const opacity = useTransform(shape, [0.18, 0.21], [1, 0]);
  const fill = useTransform(shape, [0, 0.2], [KRAFT, KRAFT_BACK]);
  return <motion.polygon points={points} fill={fill} style={{ opacity }} />;
}

export function HouseSheet({ shape }) {
  const roofOpacity = useTransform(shape, [0.42, 0.58], [0, 1]);
  const roofY = useTransform(shape, (v) => (1 - ramp(v, 0.42, 0.62)) * -14);
  const lines = useTransform(shape, (v) => ramp(v, 0.6, 0.82));
  const holes = useTransform(shape, [0.8, 0.95], [0, 1]);
  const windows = [
    [16, 52, 22, 18],
    [62, 52, 22, 18]
  ];
  return (
    <svg viewBox={VIEW} className="sheet-art" role="img" aria-label="A kraft sheet folding into a house">
      <g filter="url(#grain)">
        <polygon points="0,100 0,40 40,0 60,0 100,40 100,100" fill={KRAFT} />
        <Flap shape={shape} corner={[0, 0]} edge={[[0, 40], [40, 0]]} />
        <Flap shape={shape} corner={[100, 0]} edge={[[60, 0], [100, 40]]} />
        <motion.polygon
          points="-7,44 40,-4 60,-4 107,44 100,50 58,8 42,8 0,50"
          fill="#b5452c"
          style={{ opacity: roofOpacity, y: roofY }}
        />
        <motion.g style={{ opacity: holes }}>
          {windows.map(([x, y, w, h]) => (
            <rect key={x} x={x} y={y} width={w} height={h} fill="#e2a94e" />
          ))}
          <rect x="40" y="66" width="20" height="34" fill="#26344f" />
        </motion.g>
      </g>
      <g fill="none" stroke="#3b2f22" strokeWidth="0.5">
        {[...windows, [40, 66, 20, 34]].map(([x, y, w, h]) => (
          <motion.path key={x} d={`M${x},${y} h${w} v${h} h${-w} Z`} style={{ pathLength: lines, opacity: lines }} />
        ))}
      </g>
    </svg>
  );
}

/* IV. Paper people: folded like an accordion, cut once, opened into a chain. */

const INDIGO = "#2f4366";
const INDIGO_FOLD = "#3b5279";
const DOLL = "M0,36 L25,36 L25,44 L18,44 L18,62 L22,96 L14,96 L12.5,72 L11,96 L3,96 L7,62 L7,44 L0,44 Z";

function Panel({ i, shape }) {
  const x = useTransform(shape, (v) => {
    const folded = v < 0.3 ? ramp(v, 0, 0.3) : v < 0.62 ? 1 : 1 - ramp(v, 0.62, 1);
    return lerp(i * 25, 37.5, folded);
  });
  const sheetOpacity = useTransform(shape, [0.59, 0.61], [1, 0]);
  const dollOpacity = useTransform(shape, [0.59, 0.61], [0, 1]);
  const fill = i % 2 ? INDIGO_FOLD : INDIGO;
  return (
    <motion.g style={{ x }}>
      <motion.rect width="25" height="100" fill={fill} style={{ opacity: sheetOpacity }} />
      <motion.g style={{ opacity: dollOpacity }} fill={fill}>
        <circle cx="12.5" cy="24" r="8" />
        <path d={DOLL} />
      </motion.g>
    </motion.g>
  );
}

export function DollSheet({ shape }) {
  const cut = useTransform(shape, (v) => ramp(v, 0.32, 0.58));
  const cutOpacity = useTransform(shape, [0.3, 0.32, 0.6, 0.64], [0, 1, 1, 0]);
  return (
    <svg viewBox={VIEW} className="sheet-art" role="img" aria-label="An indigo sheet cut into a chain of paper people">
      <g filter="url(#grain)">
        {[3, 2, 1, 0].map((i) => (
          <Panel key={i} i={i} shape={shape} />
        ))}
      </g>
      <motion.g transform="translate(37.5 0)" fill="none" stroke="#f2e8d5" strokeWidth="0.6" style={{ opacity: cutOpacity }}>
        <motion.circle cx="12.5" cy="24" r="8" style={{ pathLength: cut }} />
        <motion.path d={DOLL} style={{ pathLength: cut }} />
      </motion.g>
    </svg>
  );
}

export const SHEETS = { crane: CraneSheet, earth: EarthSheet, house: HouseSheet, dolls: DollSheet };
