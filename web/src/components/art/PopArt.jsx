// Cut-paper pieces for the pop-up book. Each spread has a backdrop (the
// standing page) and layers that pop up off the floor page at a depth `z`.
// Sizes are in book pixels: a page is 560 wide, the standing page 340 tall.

import Crane from "./Crane.jsx";
import Collage from "./Collage.jsx";
import EarthCut from "./EarthCut.jsx";

const SAGE = "#9bab84";
const SAGE_DARK = "#7f9670";
const VERMILION = "#b5452c";
const INDIGO = "#26344f";
const KRAFT = "#c4a173";
const KRAFT_DARK = "#a8824f";
const CREAM = "#f5f0e7";
const AMBER = "#e2a94e";

const Svg = ({ w, h, children, label }) => (
  <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" aria-hidden={label ? undefined : true} role={label ? "img" : undefined} aria-label={label}>
    <g filter="url(#layer)">{children}</g>
  </svg>
);

/* I. The crane */

function Sun() {
  return (
    <Svg w={560} h={340}>
      <circle cx="430" cy="104" r="58" fill={VERMILION} />
      <path d="M0,340 L0,262 L70,226 L140,252 L230,206 L320,248 L410,214 L490,244 L560,222 L560,340 Z" fill="#c9d2c8" />
    </Svg>
  );
}

function Pines() {
  const pines = [40, 92, 470, 520];
  return (
    <Svg w={560} h={150}>
      <path d="M0,150 L0,96 L80,58 L170,104 L260,70 L330,112 L420,66 L500,98 L560,80 L560,150 Z" fill={SAGE} />
      {pines.map((x, i) => (
        <polygon key={x} points={`${x - 18},150 ${x},${70 + (i % 2) * 14} ${x + 18},150`} fill={SAGE_DARK} />
      ))}
    </Svg>
  );
}

function Waves() {
  let d = "M0,64 L0,30";
  for (let x = 0; x < 560; x += 40) d += ` Q${x + 20},6 ${x + 40},30`;
  d += " L560,64 Z";
  return (
    <Svg w={560} h={64}>
      <path d={d} fill={INDIGO} />
    </Svg>
  );
}

/* II. The newsstand */

function Kiosk() {
  const stripes = Array.from({ length: 8 }, (_, i) => i);
  return (
    <Svg w={300} h={240} label="A newsstand">
      <rect x="20" y="70" width="260" height="170" fill={KRAFT_DARK} />
      <rect x="0" y="40" width="300" height="34" fill={CREAM} />
      {stripes.map((i) => (
        <rect key={i} x={i * 37.5} y="40" width="18.75" height="34" fill={VERMILION} />
      ))}
      <path d={stripes.map((i) => `M${i * 37.5},74 q9.4,14 18.75,0 q9.4,14 18.75,0`).join(" ")} fill={CREAM} />
      <rect x="96" y="4" width="108" height="36" fill={INDIGO} />
      <text x="150" y="30" textAnchor="middle" fontFamily="Instrument Serif, Georgia, serif" fontSize="24" fill={CREAM}>
        News
      </text>
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <g key={`${r}${c}`} transform={`translate(${42 + c * 56} ${102 + r * 42})`}>
            <rect width="44" height="34" fill={CREAM} />
            <rect x="5" y="6" width="34" height="4" fill="#2b2722" opacity="0.7" />
            <rect x="5" y="15" width="30" height="2.5" fill="#2b2722" opacity="0.25" />
            <rect x="5" y="21" width="32" height="2.5" fill="#2b2722" opacity="0.25" />
          </g>
        ))
      )}
    </Svg>
  );
}

function Bundle() {
  return (
    <Svg w={220} h={80} label="A bundle of 2,100 articles">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={10 + i * 3} y={62 - i * 15} width="150" height="16" fill={i % 2 ? "#e6e1d5" : CREAM} />
      ))}
      <rect x="60" y="14" width="3" height="66" fill="#5a4630" />
      <rect x="110" y="14" width="3" height="66" fill="#5a4630" />
      <polygon points="168,30 214,30 214,56 168,56 160,43" fill="#efe2c6" />
      <text x="190" y="47" textAnchor="middle" fontFamily="Hanken Grotesk, Arial, sans-serif" fontWeight="600" fontSize="12" fill={INDIGO}>
        2,100+
      </text>
    </Svg>
  );
}

/* III. The earth */

function Stars() {
  const stars = [[60, 50], [130, 120], [200, 36], [380, 60], [470, 130], [520, 40], [300, 24], [90, 210], [490, 230]];
  return (
    <svg viewBox="0 0 560 340" width="100%" height="100%" aria-hidden="true">
      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 ? 1.6 : 2.4} fill="#efe6d4" opacity="0.8" />
      ))}
    </svg>
  );
}

function Strata() {
  // Two halves of cut ground, split by a zigzag fault.
  const crack = "280,0 268,18 286,34 272,52 284,72";
  const bands = [
    [0, 14, SAGE],
    [14, 32, KRAFT],
    [32, 52, VERMILION],
    [52, 72, AMBER]
  ];
  return (
    <Svg w={560} h={72}>
      <defs>
        <clipPath id="strata-left">
          <polygon points={`0,0 ${crack} 0,72`} />
        </clipPath>
        <clipPath id="strata-right">
          <polygon points={`${crack.split(" ").map((p) => p.split(",").map(Number)).map(([x, y]) => `${x + 16},${y}`).join(" ")} 560,72 560,0`} />
        </clipPath>
      </defs>
      {["strata-left", "strata-right"].map((id, k) => (
        <g key={id} clipPath={`url(#${id})`} transform={k ? "translate(0 6)" : undefined}>
          {bands.map(([y0, y1, c]) => (
            <rect key={c} x="0" y={y0} width="560" height={y1 - y0} fill={c} />
          ))}
        </g>
      ))}
    </Svg>
  );
}

/* IV. The building */

function City() {
  const blocks = [[20, 150, 60], [90, 120, 50], [150, 170, 70], [400, 140, 60], [470, 110, 70]];
  return (
    <svg viewBox="0 0 560 340" width="100%" height="100%" aria-hidden="true">
      {blocks.map(([x, h, w]) => (
        <rect key={x} x={x} y={340 - h} width={w} height={h} fill="#a9b8c8" />
      ))}
    </svg>
  );
}

function Apartment() {
  const lit = new Set([2, 5, 7, 12, 14, 19, 21]);
  return (
    <Svg w={230} h={270} label="An apartment building">
      <rect x="10" y="20" width="210" height="250" fill={KRAFT} />
      <rect x="0" y="8" width="230" height="16" fill={INDIGO} />
      {Array.from({ length: 24 }, (_, i) => {
        const c = i % 4;
        const r = Math.floor(i / 4);
        return <rect key={i} x={30 + c * 46} y={40 + r * 34} width="30" height="22" fill={lit.has(i) ? AMBER : CREAM} />;
      })}
      <rect x="95" y="232" width="40" height="38" fill={INDIGO} />
    </Svg>
  );
}

function House() {
  return (
    <Svg w={140} h={150} label="A house">
      <polygon points="0,64 70,8 140,64" fill={VERMILION} />
      <rect x="14" y="62" width="112" height="88" fill={CREAM} />
      <rect x="28" y="80" width="30" height="26" fill={AMBER} />
      <rect x="80" y="96" width="28" height="54" fill={INDIGO} />
    </Svg>
  );
}

function Mailbox() {
  let hedge = "M0,80 L0,40";
  for (let x = 0; x < 560; x += 35) hedge += ` Q${x + 17.5},${x % 70 ? 14 : 20} ${x + 35},40`;
  hedge += " L560,80 Z";
  return (
    <Svg w={560} h={80} label="A mailbox in front of a hedge">
      <path d={hedge} fill={SAGE_DARK} />
      <rect x="116" y="34" width="6" height="46" fill="#5a4630" />
      <path d="M92,10 h54 v28 h-54 z M92,10 a27,10 0 0 1 54,0" fill={INDIGO} />
      <rect x="100" y="2" width="30" height="16" fill={CREAM} transform="rotate(-8 115 10)" />
      <rect x="146" y="6" width="4" height="22" fill={VERMILION} />
      <rect x="146" y="6" width="14" height="8" fill={VERMILION} />
    </Svg>
  );
}

// Spread definitions, in book order. `floor` is printed on the floor page.
export const SPREADS = {
  folded: {
    backdrop: <Sun />,
    layers: [
      { z: 60, left: 0, width: 560, height: 150, el: <Pines /> },
      { z: 140, left: 100, width: 360, height: 270, el: <Crane /> },
      { z: 200, left: 0, width: 560, height: 64, el: <Waves /> }
    ]
  },
  collage: {
    backdrop: <Collage />,
    layers: [
      { z: 110, left: 130, width: 300, height: 240, el: <Kiosk /> },
      { z: 196, left: 300, width: 220, height: 80, el: <Bundle /> }
    ]
  },
  cut: {
    backdrop: <Stars />,
    layers: [
      { z: 100, left: 130, width: 300, height: 300, el: "earth" },
      { z: 196, left: 0, width: 560, height: 72, el: <Strata /> }
    ]
  },
  woven: {
    backdrop: <City />,
    layers: [
      { z: 80, left: 120, width: 230, height: 270, el: <Apartment /> },
      { z: 140, left: 370, width: 140, height: 150, el: <House /> },
      { z: 200, left: 0, width: 560, height: 80, el: <Mailbox /> }
    ]
  }
};

export { EarthCut };
