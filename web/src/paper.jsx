// Shared paper geometry: seeded randomness, hand-cut edges, torn edges,
// and the SVG filters that give every illustration its grain.

export function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const fmt = ([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`;
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

// Smooth closed path through points (quadratic curves via midpoints).
function smoothClosed(pts) {
  const n = pts.length;
  let d = `M${fmt(mid(pts[n - 1], pts[0]))}`;
  for (let i = 0; i < n; i++) {
    d += ` Q${fmt(pts[i])} ${fmt(mid(pts[i], pts[(i + 1) % n]))}`;
  }
  return d + "Z";
}

// A circle cut by hand with scissors: slightly irregular radius.
export function cutCircle(cx, cy, r, { seed = 1, amp = 0.015, points = 44 } = {}) {
  const rand = rng(seed);
  const pts = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const rr = r * (1 + (rand() - 0.5) * 2 * amp);
    pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
  }
  return smoothClosed(pts);
}

// A straight-sided pie slice, angles in degrees (0 = right, clockwise).
export function sector(cx, cy, r, from, to) {
  const p = (deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
  const [x1, y1] = p(from);
  const [x2, y2] = p(to);
  const large = to - from > 180 ? 1 : 0;
  return `M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z`;
}

// CSS clip-path for a scrap torn by hand: ragged on every edge.
export function tornClip(seed, { depth = 1.6, steps = 14 } = {}) {
  const rand = rng(seed);
  const j = () => (rand() * depth).toFixed(2);
  const pts = [];
  for (let i = 0; i <= steps; i++) pts.push(`${((i / steps) * 100).toFixed(1)}% ${j()}%`);
  for (let i = 1; i <= steps; i++) pts.push(`${(100 - +j()).toFixed(2)}% ${((i / steps) * 100).toFixed(1)}%`);
  for (let i = steps - 1; i >= 0; i--) pts.push(`${((i / steps) * 100).toFixed(1)}% ${(100 - +j()).toFixed(2)}%`);
  for (let i = steps - 1; i >= 1; i--) pts.push(`${j()}% ${((i / steps) * 100).toFixed(1)}%`);
  return `polygon(${pts.join(", ")})`;
}

// Rendered once at the root; every illustration references these by id.
export function PaperDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        {/* Fine fibre grain, multiplied into whatever it's applied to. */}
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" result="grey" />
          <feComponentTransfer in="grey" result="soft">
            <feFuncR type="linear" slope="0.28" intercept="0.76" />
            <feFuncG type="linear" slope="0.28" intercept="0.76" />
            <feFuncB type="linear" slope="0.28" intercept="0.76" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="soft" mode="multiply" result="textured" />
          <feComposite in="textured" in2="SourceGraphic" operator="in" />
        </filter>
        {/* Grain plus the soft shadow of paper lifted off the board. */}
        <filter id="layer" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" result="grey" />
          <feComponentTransfer in="grey" result="soft">
            <feFuncR type="linear" slope="0.26" intercept="0.78" />
            <feFuncG type="linear" slope="0.26" intercept="0.78" />
            <feFuncB type="linear" slope="0.26" intercept="0.78" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="soft" mode="multiply" result="textured" />
          <feComposite in="textured" in2="SourceGraphic" operator="in" result="paper" />
          <feDropShadow in="paper" dx="1.5" dy="3" stdDeviation="2.6" floodColor="#2a1d12" floodOpacity="0.3" />
        </filter>
      </defs>
    </svg>
  );
}
