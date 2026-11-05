// A pop-up book on a stack of papers. The book is open at ninety degrees:
// a standing page (the leaf) and a floor page. Scrolling raises each leaf
// and its pop-ups, then folds them flat again before the next spread.
//
// `progress` is the scroll progress (0–1) across all spreads.

import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { FORMS } from "../data/work.js";
import { SPREADS, EarthCut } from "./art/PopArt.jsx";

const W = 560; // page width
const H = 340; // standing page height
const D = 230; // floor page depth
const TILT = -32; // how far we look down on the book, in degrees

const smooth = (x) => x * x * (3 - 2 * x);

// How open spread i is (0 closed, 1 fully open) at scroll progress v.
export function openness(v, i, n) {
  const t = v * n - i;
  const start = i === 0 ? 0.12 : 0;
  const rise = 0.26;
  if (t < start) return 0;
  if (t < start + rise) return smooth((t - start) / rise);
  if (i === n - 1) return 1;
  if (t < 1 - rise) return 1;
  if (t < 1) return smooth((1 - t) / rise);
  return 0;
}

function Layer({ layer, k, open }) {
  // Back layers rise first, front layers last.
  const a = 0.08 + k * 0.12;
  const rotateX = useTransform(open, [a, Math.min(1, a + 0.6)], [-90, 0], { clamp: true });
  // Hidden while nearly flat, so pieces never poke out past a closing page.
  const opacity = useTransform(open, [0.3, 0.45], [0, 1], { clamp: true });
  return (
    <motion.div
      className="pop-layer"
      style={{
        left: layer.left,
        top: H - layer.height,
        width: layer.width,
        height: layer.height,
        z: layer.z,
        rotateX,
        opacity
      }}
    >
      {layer.el === "earth" ? <EarthCut lift={open} /> : layer.el}
    </motion.div>
  );
}

function Spread({ id, index, open }) {
  const spread = SPREADS[id];
  const rotateX = useTransform(open, [0, 1], [-89.5, 0]);
  return (
    <>
      <motion.div className={`leaf leaf-${id}`} style={{ rotateX }}>
        <div className="leaf-front">{spread.backdrop}</div>
        <div className="leaf-back">
          {index === 0 && <span className="ribbon" />}
          {index === 0 ? (
            <div className="cover">
              <span className="cover-name">Ahreum Lee</span>
              <span className="cover-sub">Selected work, 2023–2026</span>
            </div>
          ) : (
            <span className="leaf-numeral">{FORMS[index].numeral}</span>
          )}
        </div>
      </motion.div>
      {spread.layers.map((layer, k) => (
        <Layer key={k} layer={layer} k={k} open={open} />
      ))}
    </>
  );
}

// Scales the fixed-size book to fit its box.
function useFit() {
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.min(width / (W + 120), height / (H + D + 30)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, scale];
}

export default function Book({ progress, active }) {
  const n = FORMS.length;
  const open = useTransform(progress, (v) => openness(v, Math.min(n - 1, Math.floor(v * n)), n));
  const [fitRef, scale] = useFit();
  const id = FORMS[active].id;

  return (
    <div className="book-fit" ref={fitRef}>
      <div className="book-scene" style={{ transform: `scale(${scale})` }}>
        <div className="book" style={{ width: W, height: H, transform: `rotateX(${TILT}deg)` }}>
          <div className={`floor floor-${id}`} style={{ top: H, width: W, height: D }}>
            <span className="sheet loose-1" />
            <span className="sheet loose-2" />
            <span className="sheet loose-3" />
            <div className="floor-page" />
          </div>
          <div className="stack-edge" style={{ top: H, width: W, transform: `translateZ(${D}px)` }} />
          <Spread key={id} id={id} index={active} open={open} />
        </div>
      </div>
    </div>
  );
}
