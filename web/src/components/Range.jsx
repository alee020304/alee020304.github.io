// Everything tried, pinned to a sheet of graph paper: how technical (x)
// against how creative (y). When the graph comes into view the axes are
// drawn, then the pins go in one by one. Hover, focus or tap a pin for what
// I did.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { KINDS, RANGE } from "../data/work.js";

// Pins far to the right hang their label on the left so it stays on the sheet.
const flips = (item) => item.x > 7.5;
const pos = (item) =>
  flips(item)
    ? { right: `${100 - item.x * 10}%`, bottom: `${item.y * 10}%` }
    : { left: `${item.x * 10}%`, bottom: `${item.y * 10}%` };

// The card opens away from the nearest edges of the sheet.
const tipPos = (item) => ({
  ...(item.x > 5 ? { right: `${100 - item.x * 10}%` } : { left: `${item.x * 10}%` }),
  ...(item.y > 5 ? { top: `calc(${100 - item.y * 10}% + 18px)` } : { bottom: `calc(${item.y * 10}% + 18px)` })
});

function Card({ item }) {
  const kind = KINDS.find((k) => k.id === item.kind).label;
  return (
    <>
      <p className="kicker">{kind}</p>
      <h3>{item.label}</h3>
      <p className="range-meta">{item.meta}</p>
      <p className="range-body">{item.body}</p>
      {item.caseId && (
        <a className="text-link" href={`#case-${item.caseId}`}>
          Read more
        </a>
      )}
      {item.href && (
        <a className="text-link" href={item.href}>
          View on GitHub
        </a>
      )}
    </>
  );
}

// Pins go in left to right, after the axes.
const AXES = 0.7;
const ORDER = RANGE.map((r) => r.id).sort((a, b) => RANGE.find((r) => r.id === a).x - RANGE.find((r) => r.id === b).x);
const pinDelay = (id) => AXES + 0.15 + ORDER.indexOf(id) * 0.07;

export default function Range() {
  const [hoverId, setHoverId] = useState(null);
  const [pinnedId, setPinnedId] = useState(null);
  const [hidden, setHidden] = useState(() => new Set());
  // Watch the section, not the sheet: the sheet starts small and off to the
  // side, where it might never count as in view.
  const sectionRef = useRef(null);
  const arrived = useInView(sectionRef, { once: true, amount: 0.15 });
  const plotRef = useRef(null);
  // Drawing starts once the sheet has landed and the graph is in view.
  const [landed, setLanded] = useState(false);
  const drawn = useInView(plotRef, { once: true, amount: 0.5 }) && landed;
  // Once every pin is in, filtering should respond at once, not in sequence.
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!drawn) return;
    const id = setTimeout(() => setSettled(true), (pinDelay(ORDER.at(-1)) + 0.4) * 1000);
    return () => clearTimeout(id);
  }, [drawn]);

  // A hover card closes shortly after the pointer leaves the pin, unless it
  // moves onto the card. A clicked card stays until you click elsewhere or
  // press Escape.
  const leaveTimer = useRef(null);
  const hover = (id) => {
    clearTimeout(leaveTimer.current);
    setHoverId(id);
  };
  const unhover = () => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHoverId(null), 120);
  };
  useEffect(() => {
    if (!pinnedId) return;
    const onDown = (e) => !e.target.closest(".pin, .pin-card") && setPinnedId(null);
    const onKey = (e) => e.key === "Escape" && setPinnedId(null);
    addEventListener("pointerdown", onDown);
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("pointerdown", onDown);
      removeEventListener("keydown", onKey);
    };
  }, [pinnedId]);

  const openId = hoverId ?? pinnedId;
  const open = RANGE.find((r) => r.id === openId);
  const pinned = RANGE.find((r) => r.id === pinnedId);

  function toggleKind(id) {
    setHidden((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <section id="range" ref={sectionRef} className="section range">
      {/* The graph-paper sheet from the corner pile, now holding the graph. */}
      <motion.div
        className="wrap range-sheet"
        initial={{ x: "45vw", y: "35vh", rotate: 16, scale: 0.35, opacity: 0 }}
        animate={arrived ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => arrived && setLanded(true)}
      >
        <div className="section-head">
          <h2>Where the work sits.</h2>
          <p>
            Fourteen roles and projects, placed by how technical and how creative each one was. Hover over a pin, or
            tap it, to see what I did.
          </p>
          <p className="range-why">
            <span className="now-tag">Why creative</span> For me, creativity is exploration. Sometimes it is a break
            from technical work, and sometimes it turns up an answer the technical work had not found.
          </p>
        </div>

        <div className="kind-filters" role="group" aria-label="Show kinds of work">
          {KINDS.map((k) => (
            <button
              key={k.id}
              className={`kind kind-${k.id}`}
              aria-pressed={!hidden.has(k.id)}
              onClick={() => toggleKind(k.id)}
            >
              <span className="kind-chip" /> {k.label}
            </button>
          ))}
        </div>

        <div className="graph-sheet">
          <div className="graph-plot" ref={plotRef} data-drawn={drawn || undefined}>
            <motion.span
              className="axis-line axis-line-y"
              initial={{ scaleY: 0 }}
              animate={drawn ? { scaleY: 1 } : {}}
              transition={{ duration: AXES * 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
              className="axis-line axis-line-x"
              initial={{ scaleX: 0 }}
              animate={drawn ? { scaleX: 1 } : {}}
              transition={{ duration: AXES * 0.6, delay: AXES * 0.4, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
              className="axis axis-x"
              initial={{ opacity: 0 }}
              animate={drawn ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: AXES * 0.8 }}
            >
              more technical →
            </motion.span>
            <motion.span
              className="axis axis-y"
              initial={{ opacity: 0 }}
              animate={drawn ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: AXES * 0.5 }}
            >
              more creative →
            </motion.span>
            {RANGE.map((item) => {
              const off = hidden.has(item.kind);
              return (
                <motion.button
                  key={item.id}
                  className={
                    `pin pin-${item.kind}` + (flips(item) ? " flip" : "") + (item.id === openId ? " selected" : "")
                  }
                  style={pos(item)}
                  initial={{ opacity: 0, scale: 0.4, y: -14 }}
                  animate={drawn ? { opacity: off ? 0.12 : 1, scale: off ? 0.9 : 1, y: 0 } : {}}
                  transition={
                    settled ? { duration: 0.25 } : { type: "spring", stiffness: 420, damping: 22, delay: pinDelay(item.id) }
                  }
                  onMouseEnter={() => !off && hover(item.id)}
                  onMouseLeave={unhover}
                  // Only keyboard focus opens a card; a click's focus would
                  // otherwise keep it open after the pointer has gone.
                  onFocus={(e) => e.target.matches(":focus-visible") && hover(item.id)}
                  onBlur={() => setHoverId(null)}
                  onClick={() => {
                    setHoverId(null);
                    setPinnedId((id) => (id === item.id ? null : item.id));
                  }}
                  aria-expanded={item.id === openId}
                  tabIndex={off ? -1 : 0}
                >
                  <span className="pin-head" />
                  <span className="pin-label">
                    <span className="label-long">{item.label}</span>
                    <span className="label-short">{item.short}</span>
                  </span>
                </motion.button>
              );
            })}
            <AnimatePresence>
              {open && (
                <motion.div
                  key={open.id}
                  className="pin-card"
                  style={tipPos(open)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.18 }}
                  onMouseEnter={() => hover(open.id)}
                  onMouseLeave={unhover}
                >
                  <Card item={open} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* On phones the card sits under the graph instead of over it. */}
        <div className="range-note" aria-live="polite">
          {pinned ? <Card item={pinned} /> : <p className="range-hint">Tap a pin to see what I did.</p>}
        </div>
      </motion.div>
    </section>
  );
}
