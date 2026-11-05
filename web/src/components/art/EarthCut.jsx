// III. Cut: the earth in layered cut paper, with one wedge cut away to
// show crust, mantle and core. Waves ripple out from an epicentre.
// `lift` (0–1, from scroll) raises the inner layers off the board.

import { motion, useTransform } from "framer-motion";
import { cutCircle, sector } from "../../paper.jsx";

const CX = 200;
const CY = 205;
const R = 150;

const LAYERS = [
  { r: 150, fill: "#cfae7f", seed: 2 }, // crust
  { r: 136, fill: "#b9472f", seed: 4 }, // mantle
  { r: 84, fill: "#df9f46", seed: 6 }, // outer core
  { r: 46, fill: "#f2e8d5", seed: 8 } // inner core
];

const CONTINENTS = [
  { x: 132, y: 246, r: 46, seed: 12 },
  { x: 208, y: 312, r: 34, seed: 17 },
  { x: 100, y: 168, r: 28, seed: 21 },
  { x: 262, y: 262, r: 30, seed: 29 },
  { x: 168, y: 92, r: 22, seed: 33 }
];

const EPI = { x: CX + R * Math.cos((150 * Math.PI) / 180), y: CY + R * Math.sin((150 * Math.PI) / 180) };

function ripple(r) {
  const a1 = (110 * Math.PI) / 180;
  const a2 = (190 * Math.PI) / 180;
  const p = (a) => `${(EPI.x + r * Math.cos(a)).toFixed(1)},${(EPI.y + r * Math.sin(a)).toFixed(1)}`;
  return `M${p(a1)} A${r},${r} 0 0 1 ${p(a2)}`;
}

function Layer({ layer, i, lift }) {
  const dx = useTransform(lift, [0, 1], [0, -i * 2.2]);
  const dy = useTransform(lift, [0, 1], [0, -i * 3.2]);
  return (
    <motion.path
      d={cutCircle(CX, CY, layer.r, { seed: layer.seed, amp: 0.012 })}
      fill={layer.fill}
      filter="url(#layer)"
      style={{ x: dx, y: dy }}
    />
  );
}

export default function EarthCut({ lift }) {
  return (
    <svg className="art earth" viewBox="0 0 400 400" role="img" aria-label="The earth in cut paper, with a wedge removed to show its layers">
      <defs>
        <clipPath id="globe">
          <circle cx={CX} cy={CY} r={R} />
        </clipPath>
        <clipPath id="wedge">
          <path d={sector(CX, CY, R + 6, -90, 0)} />
        </clipPath>
        <mask id="not-wedge">
          <rect width="400" height="400" fill="#fff" />
          <path d={sector(CX, CY, R + 6, -90, 0)} fill="#000" />
        </mask>
      </defs>

      <g className="ripples" fill="none" stroke="#efe6d4" strokeWidth="2.2" strokeLinecap="round">
        {[24, 40, 56].map((r, i) => (
          <path key={r} d={ripple(r)} style={{ animationDelay: `${i * 0.5}s` }} />
        ))}
      </g>

      {/* The surface: ocean with cut-paper continents, minus the wedge. */}
      <g mask="url(#not-wedge)">
        <path d={cutCircle(CX, CY, R, { seed: 1, amp: 0.012 })} fill="#5d7895" filter="url(#layer)" />
        <g clipPath="url(#globe)" filter="url(#grain)">
          {CONTINENTS.map((c) => (
            <path key={c.seed} d={cutCircle(c.x, c.y, c.r, { seed: c.seed, amp: 0.3, points: 11 })} fill="#9bab84" />
          ))}
        </g>
      </g>

      {/* Inside the wedge: the layers, each a separate sheet. */}
      <g clipPath="url(#wedge)">
        {LAYERS.map((layer, i) => (
          <Layer key={layer.seed} layer={layer} i={i} lift={lift} />
        ))}
      </g>

      <circle cx={EPI.x} cy={EPI.y} r="4" fill="#efe6d4" />
    </svg>
  );
}
