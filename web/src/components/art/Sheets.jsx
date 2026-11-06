// Square sheets that turn into objects. Each takes `shape`, a motion value
// from 0 (a flat sheet) to 1 (the finished object), driven by scroll.
// At 0 every sheet is a plain square, so it can sit in the pile.

import { motion, useTransform } from "framer-motion";
import EarthCut from "./EarthCut.jsx";
import { craneAt } from "./crane.js";

const VIEW = "-8 -8 116 116";
const smooth = (x) => x * x * (3 - 2 * x);
const clamp = (x) => Math.min(1, Math.max(0, x));
const ramp = (v, a, b) => smooth(clamp((v - a) / (b - a)));
const lerp = (a, b, t) => a + (b - a) * t;
const fmt = (pts) => pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

/* I. Crane: the sheet is turned and folded in half, then (skipping the
   steps in between) it opens out as the finished crane (see crane.js). */

const RED = { front: [194, 78, 51], back: [156, 54, 34], dark: [92, 30, 18] };
const mix = (a, b, t) => `rgb(${a.map((x, i) => Math.round(x + (b[i] - x) * t)).join(",")})`;
const fillOf = (l) => mix(l.face > 0 ? RED.front : RED.back, RED.dark, l.shade * 0.45);

const FIRST_STEPS = 2; // turn the square, fold it in half
const FOLD = [0, 0.5]; // share of the shaping spent on those
const SWAP = [0.5, 0.8]; // the half-folded sheet gives way to the crane
const CRANE = craneAt(1);
const FIRST_LAYERS = craneAt(1, FIRST_STEPS).length;

let last = { v: NaN, layers: [] };
const layersAt = (v) =>
  v === last.v ? last.layers : (last = { v, layers: craneAt(clamp((v - FOLD[0]) / (FOLD[1] - FOLD[0])), FIRST_STEPS) }).layers;

function Layer({ i, shape }) {
  const points = useTransform(shape, (v) => {
    const l = layersAt(v)[i];
    return l ? fmt(l.pts) : "0,0 0,0 0,0";
  });
  const fill = useTransform(shape, (v) => {
    const l = layersAt(v)[i];
    return l ? fillOf(l) : "none";
  });
  const opacity = useTransform(shape, (v) => (layersAt(v)[i] ? 1 : 0));
  return <motion.polygon points={points} fill={fill} style={{ opacity }} />;
}

export function CraneSheet({ shape }) {
  // Fold edges show once the paper is folded; the flat sheet has none.
  const strokeOpacity = useTransform(shape, [0, 0.05], [0, 1]);
  // The crane comes in a little ahead of the folded sheet going, so the
  // swap never looks see-through.
  const foldOpacity = useTransform(shape, [0.6, SWAP[1]], [1, 0]);
  const foldScale = useTransform(shape, SWAP, [1, 0.8]);
  const craneOpacity = useTransform(shape, [SWAP[0], 0.66], [0, 1]);
  const craneScale = useTransform(shape, (v) => lerp(0.8, 1, ramp(v, SWAP[0], 1)));
  return (
    <svg viewBox={VIEW} className="sheet-art" role="img" aria-label="A sheet of red paper folded into a crane">
      <g filter="url(#grain)" stroke="#7a2a1a" strokeWidth="0.35" strokeLinejoin="round">
        <motion.g style={{ opacity: foldOpacity, scale: foldScale, strokeOpacity }}>
          {Array.from({ length: FIRST_LAYERS }, (_, i) => (
            <Layer key={i} i={i} shape={shape} />
          ))}
        </motion.g>
        <motion.g style={{ opacity: craneOpacity, scale: craneScale }}>
          {CRANE.map((l, i) => (
            <polygon key={i} points={fmt(l.pts)} fill={fillOf(l)} />
          ))}
        </motion.g>
      </g>
    </svg>
  );
}

/* II. Earth: cut. A circle is cut, the offcut falls away, and the circle
   lifts off as the earth, its layers rising. */

const BLUE = "#5d7895";
const CIRCLE = "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10";

export function EarthSheet({ shape }) {
  const cut = useTransform(shape, (v) => clamp((v - 0.04) / 0.46));
  const cutOpacity = useTransform(shape, [0.6, 0.7], [1, 0]);
  const discScale = useTransform(shape, (v) => 1 + ramp(v, 0.5, 0.62) * 0.04);
  const offY = useTransform(shape, (v) => ramp(v, 0.54, 0.8) * 50);
  const offRotate = useTransform(shape, (v) => ramp(v, 0.54, 0.8) * 12);
  const offOpacity = useTransform(shape, [0.6, 0.8], [1, 0]);
  const earthOpacity = useTransform(shape, [0.68, 0.84], [0, 1]);
  const lift = useTransform(shape, [0.84, 1], [0, 1]);
  return (
    <div className="sheet-stack">
      <svg viewBox={VIEW} className="sheet-art" role="img" aria-label="A circle is cut from a blue sheet and becomes the earth">
        <g filter="url(#grain)">
          <motion.path
            d="M0,0 H100 V100 H0 Z M50,10 A40,40 0 1,0 50.01,10 Z"
            fillRule="evenodd"
            fill={BLUE}
            style={{ y: offY, rotate: offRotate, opacity: offOpacity, transformOrigin: "50% 100%" }}
          />
          <motion.circle cx="50" cy="50" r="40" fill={BLUE} style={{ scale: discScale, transformOrigin: "50px 50px" }} />
        </g>
        <motion.path
         
          d={CIRCLE}
          fill="none"
          stroke="#f2e8d5"
          strokeWidth="0.7"
          style={{ pathLength: cut, opacity: cutOpacity }}
        />
      </svg>
      <motion.div className="sheet-earth" style={{ opacity: earthOpacity }}>
        <EarthCut lift={lift} />
      </motion.div>
    </div>
  );
}

/* III. House: a paper-house net is cut from the sheet, the offcut drops away,
   the walls fold up and the roof folds in. Real CSS 3D; sizes are in cqw,
   hundredths of the sheet. The paper's inner side is plain kraft; the outer
   side is printed with the roof, door and windows. */

// The net's outline, in sheet units: floor 38–62, walls 20 high, gables 10,
// roof panels 16 wide with a little overhang.
const NET =
  "M50,8 L62,18 L62,38 L82,38 L82,36 L98,36 L98,64 L82,64 L82,62 L62,62 L62,82 L50,92 L38,82 L38,62 L18,62 L18,64 L2,64 L2,36 L18,36 L18,38 L38,38 L38,18 Z";
const CREASES = "M38,38 H62 V62 H38 Z M18,38 V62 M82,38 V62";
const GABLE_DOWN = "polygon(0 0, 100% 0, 100% 66.67%, 50% 100%, 0 66.67%)";
const GABLE_UP = "polygon(50% 0, 100% 33.33%, 100% 100%, 0 100%, 0 33.33%)";

function Face({ box, origin, transform, out, clip, children, art }) {
  const [left, top, width, height] = box.map((n) => `${n}cqw`);
  return (
    <motion.div className="hf" style={{ left, top, width, height, transformOrigin: origin, transform }}>
      <div className="hf-in" style={{ clipPath: clip }} />
      <div className="hf-out" style={{ clipPath: clip, backgroundColor: out }}>
        {art}
      </div>
      {children}
    </motion.div>
  );
}

export function HouseSheet({ shape }) {
  const cut = useTransform(shape, (v) => clamp((v - 0.02) / 0.3));
  const cutOpacity = useTransform(shape, [0.36, 0.44], [1, 0]);
  const offOpacity = useTransform(shape, [0.32, 0.42], [1, 0]);
  const offY = useTransform(shape, (v) => `${ramp(v, 0.32, 0.46) * 6}cqw`);
  const creases = useTransform(shape, [0.36, 0.42, 0.5, 0.56], [0, 1, 1, 0]);
  // Front and back walls first, then the sides, then the roof.
  const ends = (v) => ramp(v, 0.46, 0.64) * 90;
  const sides = (v) => ramp(v, 0.56, 0.74) * 90;
  const roof = (v) => ramp(v, 0.72, 0.88) * 50;
  const rx = (sign) => useTransform(shape, (v) => `rotateX(${sign * ends(v)}deg)`);
  const ry = (sign, f = sides) => useTransform(shape, (v) => `rotateY(${sign * f(v)}deg)`);
  const board = useTransform(shape, (v) => {
    const t = ramp(v, 0.42, 0.92);
    return `translateY(${t * 12}cqw) scale(${1 + ramp(v, 0.46, 0.94) * 0.9}) rotateX(${t * 56}deg) rotateZ(${t * -34}deg)`;
  });
  const pane = (x, y, w, h) => <i className="hw" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} />;

  return (
    <div className="house-sq" role="img" aria-label="A kraft sheet cut and folded into a paper house">
      <motion.div className="house-board" style={{ transform: board }}>
        <motion.div className="house-offcut" style={{ opacity: offOpacity, y: offY }} />
        <Face box={[38, 38, 24, 24]} out="#c4a173">
          {/* Front wall: the hinge is the ground, the gable becomes the top. */}
          <Face
            box={[0, 24, 24, 30]}
            origin="top"
            transform={rx(1)}
            clip={GABLE_DOWN}
            out="#d9bb8b"
            art={
              <>
                <i className="hd" />
                {pane(10, 22, 18, 20)}
                {pane(72, 22, 18, 20)}
              </>
            }
          />
          <Face box={[0, -30, 24, 30]} origin="bottom" transform={rx(-1)} clip={GABLE_UP} out="#b8925f" />
          <Face box={[-20, 0, 20, 24]} origin="right" transform={ry(1)} out="#a8824f" art={pane(30, 30, 34, 40)}>
            <Face box={[-16, -2, 16, 28]} origin="right" transform={ry(1, roof)} out="#9a3a24" />
          </Face>
          <Face box={[24, 0, 20, 24]} origin="left" transform={ry(-1)} out="#bf9763" art={pane(36, 30, 34, 40)}>
            <Face box={[20, -2, 16, 28]} origin="left" transform={ry(-1, roof)} out="#b5452c" />
          </Face>
        </Face>
        <motion.svg viewBox="0 0 100 100" className="house-cuts" style={{ opacity: cutOpacity }}>
          <motion.path d={NET} fill="none" stroke="#3b2f22" strokeWidth="0.45" style={{ pathLength: cut }} />
          {/* Where it will fold. */}
          <motion.path d={CREASES} fill="none" stroke="#3b2f22" strokeWidth="0.35" strokeDasharray="1.4 1.2" style={{ opacity: creases }} />
        </motion.svg>
      </motion.div>
    </div>
  );
}

/* IV. Paper people: the sheet is folded like an accordion, a figure is
   drawn on top and cut out, the scraps fall away, and the chain opens out,
   hand in hand. */

const INDIGO = "#2f4366";
const INDIGO_FOLD = "#3b5279";
// One figure, head included, in a 25-wide panel. The hands reach both edges,
// so the cut figures stay joined.
const DOLL =
  "M0,36 L9.5,36 L9.5,31.5 A8,8 0 1,1 15.5,31.5 L15.5,36 L25,36 L25,44 L18,44 L18,62 L22,96 L14,96 L12.5,72 L11,96 L3,96 L7,62 L7,44 L0,44 Z";

// How folded the accordion is: closes, stays shut for the cut, opens.
const folded = (v) => (v < 0.24 ? ramp(v, 0, 0.22) : v < 0.74 ? 1 : 1 - ramp(v, 0.74, 1));

function Panel({ i, shape }) {
  // Stacked panels sit a hair apart so the folds show.
  const x = useTransform(shape, (v) => lerp(i * 25, 37.5 + (i - 1.5) * 0.5, folded(v)));
  const sheetOpacity = useTransform(shape, [0.63, 0.64], [1, 0]);
  const dollOpacity = useTransform(shape, [0.63, 0.64], [0, 1]);
  const fill = i % 2 ? INDIGO_FOLD : INDIGO;
  return (
    <motion.g style={{ x }}>
      <motion.rect width="25" height="100" fill={fill} style={{ opacity: sheetOpacity }} />
      <motion.path d={DOLL} fill={fill} style={{ opacity: dollOpacity }} />
    </motion.g>
  );
}

export function DollSheet({ shape }) {
  const pencil = useTransform(shape, [0.22, 0.3, 0.6, 0.64], [0, 1, 1, 0]);
  const cut = useTransform(shape, (v) => clamp((v - 0.32) / 0.3));
  const cutOpacity = useTransform(shape, [0.31, 0.32, 0.62, 0.65], [0, 1, 1, 0]);
  const scrapY = useTransform(shape, (v) => ramp(v, 0.63, 0.8) * 44);
  const scrapRotate = useTransform(shape, (v) => ramp(v, 0.63, 0.8) * -10);
  const scrapOpacity = useTransform(shape, [0.62, 0.64, 0.72, 0.8], [0, 1, 1, 0]);
  return (
    <svg viewBox={VIEW} className="sheet-art" role="img" aria-label="An indigo sheet folded, cut and opened into a chain of paper people">
      <g filter="url(#grain)">
        {[3, 2, 1, 0].map((i) => (
          <Panel key={i} i={i} shape={shape} />
        ))}
        <motion.path
          d={`M0,0 H25 V100 H0 Z ${DOLL}`}
          fillRule="evenodd"
          fill={INDIGO}
          transform="translate(38.25 0)"
          style={{ y: scrapY, rotate: scrapRotate, opacity: scrapOpacity, transformOrigin: "50% 100%" }}
        />
      </g>
      <g transform="translate(38.25 0)">
        <motion.path d={DOLL} fill="none" stroke="#e8e2d6" strokeWidth="0.4" strokeDasharray="1 1" style={{ opacity: pencil }} />
        <motion.path d={DOLL} fill="none" stroke="#f2e8d5" strokeWidth="0.6" style={{ pathLength: cut, opacity: cutOpacity }} />
      </g>
    </svg>
  );
}

export const SHEETS = { crane: CraneSheet, earth: EarthSheet, house: HouseSheet, dolls: DollSheet };
