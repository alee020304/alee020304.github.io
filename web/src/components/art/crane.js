// The crane, folded the way you'd fold one by hand. A small flat-folding
// simulator: the paper is a stack of convex layers; each step cuts layers
// along a crease and swings the pieces on one side over it (or turns them,
// for the squash). Steps follow the usual diagrams, quickly through the
// early ones: turn the square, fold in half twice, squash to a square base,
// petal fold (bird base), narrow the legs, reverse-fold neck and tail, head.

const DEG = Math.PI / 180;
const K = 50 * Math.SQRT2; // half the square's diagonal
const C = [50, 50];
const L = [50 - K, 50];
const R = [50 + K, 50];
const B = [50, 50 + K];
const M = [50 - K / 2, 50 + K / 2]; // square base, left corner
const M2 = [50 + K / 2, 50 + K / 2]; // square base, right corner
const P = [100 - K, K]; // kite folds meet the square base's sides here
const P2 = [K, K];
const TOP = [50, K - 50]; // bird base, top point

const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, s) => [a[0] * s, a[1] * s];
const unit = (a) => mul(a, 1 / Math.hypot(a[0], a[1]));
const dir = (deg) => [Math.cos(deg * DEG), Math.sin(deg * DEG)];
const through = (p, deg) => [p, add(p, dir(deg))];
const cross = ([a, b], p) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
const centroid = (pts) => mul(pts.reduce(add, [0, 0]), 1 / pts.length);
const sideOf = (line, p) => Math.sign(cross(line, p));

function area(pts) {
  let s = 0;
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % pts.length];
    s += p[0] * q[1] - q[0] * p[1];
  });
  return Math.abs(s / 2);
}

// The part of a convex polygon on one side of a line.
function clip(pts, line, sign) {
  const out = [];
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % pts.length];
    const sp = cross(line, p) * sign;
    const sq = cross(line, q) * sign;
    if (sp >= 0) out.push(p);
    if ((sp > 0 && sq < 0) || (sp < 0 && sq > 0)) out.push(add(p, mul(sub(q, p), sp / (sp - sq))));
  });
  return out.length > 2 && area(out) > 0.01 ? out : null;
}

// Cut the layers that `pick` accepts along a line, keeping stacking order.
const cutBy = (line, pick = () => true) => (layers) =>
  layers.flatMap((l) => (pick(l) ? [1, -1].map((s) => clip(l.pts, line, s)).filter(Boolean).map((pts) => ({ ...l, pts })) : [l]));

// Swing a point over a crease: t = 1 is fully folded, flat on the other side.
function swing(p, [a, b], t) {
  const n = unit([a[1] - b[1], b[0] - a[0]]);
  const d = (p[0] - a[0]) * n[0] + (p[1] - a[1]) * n[1];
  return sub(p, mul(n, d * (1 - Math.cos(Math.PI * t))));
}

function turn(p, c, deg) {
  const [x, y] = sub(p, c);
  const [cs, sn] = dir(deg);
  return add(c, [cs * x - sn * y, sn * x + cs * y]);
}

const is = (...tags) => (l) => tags.includes(l.tag);
const onSide = (line, ref) => (l) => sideOf(line, centroid(l.pts)) === sideOf(line, ref);
const both = (f, g) => (l) => f(l) && g(l);

// A fold: the picked layers swing over `line` (amount < 1 stops partway).
const fold = (line, pick, { place = "top", tag, amount = 1 } = {}) => ({ kind: "fold", line, pick, place, tag, amount });
const spin = (c, deg, pick) => ({ kind: "turn", c, deg, pick, place: "keep" });

function applyOps(layers, ops, t) {
  const moved = ops.map(() => []);
  const stay = [];
  layers.forEach((l) => {
    const i = ops.findIndex((op) => op.pick(l));
    if (i < 0) return stay.push({ ...l, shade: 0 });
    const op = ops[i];
    if (op.kind === "turn") {
      return moved[i].push({ ...l, pts: l.pts.map((p) => turn(p, op.c, op.deg * t)), shade: 0 });
    }
    const a = op.amount * t;
    const c = Math.cos(Math.PI * a);
    moved[i].push({
      ...l,
      tag: op.tag && t === 1 ? op.tag : l.tag,
      pts: l.pts.map((p) => swing(p, op.line, a)),
      face: c < 0 ? -l.face : l.face,
      shade: 1 - Math.abs(c)
    });
  });
  // A folded stack lands upside down, so its order reverses.
  const stack = (i) => (ops[i].place === "keep" ? moved[i] : moved[i].slice().reverse());
  const below = ops.flatMap((op, i) => (op.place === "bottom" ? stack(i) : []));
  const keep = ops.flatMap((op, i) => (op.place === "keep" ? stack(i) : []));
  const above = ops.flatMap((op, i) => (op.place === "top" ? stack(i) : []));
  return [...below, ...stay, ...keep, ...above];
}

// Bisector crease from B that lays edge B→p onto the centre line, ending on
// edge p→q.
function narrowCrease(p, q) {
  const d = add(unit(sub(p, B)), unit(sub(C, B)));
  const line = [B, add(B, d)];
  const sp = cross(line, p);
  const sq = cross(line, q);
  return [B, add(p, mul(sub(q, p), sp / (sp - sq)))];
}

const NECK = through([50, 74], -14);
const TAIL = through([50, 76], 24);
const NECK_TIP = swing(B, NECK, 1);
const neckBase = [50, 74];
const neckAngle = Math.atan2(NECK_TIP[1] - neckBase[1], NECK_TIP[0] - neckBase[0]) / DEG;
const HEAD = through(add(NECK_TIP, mul(sub(neckBase, NECK_TIP), 0.24)), (168 + neckAngle) / 2);
const HINGE = [P, P2];
const NARROW = narrowCrease(P, TOP);
const NARROW2 = narrowCrease(P2, TOP);

const front = is("F");
const back = is("B");

// Each step: optional cuts before it (instant, invisible), the moves, and
// how long it takes relative to the others.
const STEPS = [
  { w: 0.05, ops: [spin(C, 45, () => true)] },
  // Fold in half, top corner down to the bottom.
  { w: 0.12, cut: [cutBy([L, R])], ops: [fold([L, R], onSide([L, R], [50, 0]))] },
  // In half again, right corner onto the left. Front layers become "F".
  {
    w: 0.12,
    cut: [cutBy([C, B]), (ls) => ls.map((l) => ({ ...l, tag: "B" }))],
    ops: [fold([C, B], onSide([C, B], R), { tag: "F" })]
  },
  // Squash both flaps into a square base.
  {
    w: 0.22,
    cut: [cutBy([C, M])],
    ops: [spin(C, -90, both(front, onSide([C, M], L))), spin(C, -90, both(back, onSide([C, M], L)))]
  },
  // Petal fold, front and back (the kite creases are skipped): the bottom
  // point lifts and the sides fold in. Now a bird base.
  {
    w: 0.5,
    cut: [cutBy([B, P]), cutBy([B, P2]), cutBy(HINGE)],
    ops: [
      fold([B, P], both(front, onSide([B, P], M))),
      fold([B, P2], both(front, onSide([B, P2], M2))),
      fold(HINGE, both(front, onSide(HINGE, B))),
      fold([B, P], both(back, onSide([B, P], M)), { place: "bottom" }),
      fold([B, P2], both(back, onSide([B, P2], M2)), { place: "bottom" }),
      fold(HINGE, both(back, onSide(HINGE, B)), { place: "bottom" })
    ]
  },
  // Narrow the legs, front and back.
  {
    w: 0.25,
    cut: [cutBy(NARROW), cutBy(NARROW2)],
    ops: [
      fold(NARROW, both(front, onSide(NARROW, P))),
      fold(NARROW2, both(front, onSide(NARROW2, P2))),
      fold(NARROW, both(back, onSide(NARROW, P)), { place: "bottom" }),
      fold(NARROW2, both(back, onSide(NARROW2, P2)), { place: "bottom" })
    ]
  },
  // Reverse-fold one leg up into the neck, the other into the tail.
  {
    w: 0.45,
    cut: [cutBy(NECK, front), cutBy(TAIL, back)],
    ops: [
      fold(NECK, both(front, onSide(NECK, B)), { tag: "neck" }),
      fold(TAIL, both(back, onSide(TAIL, B)), { place: "bottom", tag: "tail" })
    ]
  },
  // The head.
  { w: 0.3, cut: [cutBy(HEAD, is("neck"))], ops: [fold(HEAD, both(is("neck"), onSide(HEAD, NECK_TIP)), { tag: "head" })] }
];

// Precompute the stack before each step (after its cuts) and after it.
const SQUARE = [{ pts: [[0, 0], [100, 0], [100, 100], [0, 100]], face: 1, tag: "F" }];
const BEFORE = [];
{
  let layers = SQUARE;
  STEPS.forEach((step, i) => {
    layers = (step.cut || []).reduce((ls, c) => c(ls), layers);
    BEFORE.push(layers);
    layers = applyOps(layers, step.ops, 1);
  });
}

const smooth = (x) => x * x * (3 - 2 * x);

// Layers at progress v through the first `upTo` steps (0 flat sheet, 1 those
// steps done; by default all of them, the finished crane), framed to fit a
// 100 × 100 box.
export function craneAt(v, upTo = STEPS.length) {
  let at = Math.min(1, Math.max(0, v)) * STEPS.slice(0, upTo).reduce((s, st) => s + st.w, 0);
  let i = 0;
  while (i < upTo - 1 && at > STEPS[i].w) at -= STEPS[i++].w;
  // Each step moves over its first 85% and rests briefly.
  let t = smooth(Math.min(1, at / (STEPS[i].w * 0.85)));
  const layers = v <= 0 ? SQUARE.map((l) => ({ ...l, shade: 0 })) : applyOps(BEFORE[i], STEPS[i].ops, t);

  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  layers.forEach((l) =>
    l.pts.forEach(([x, y]) => {
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x);
      y1 = Math.max(y1, y);
    })
  );
  const s = Math.min(100 / (x1 - x0), 100 / (y1 - y0), 1.25);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  return layers.map((l) => ({ ...l, pts: l.pts.map(([x, y]) => [50 + (x - cx) * s, 50 + (y - cy) * s]) }));
}
