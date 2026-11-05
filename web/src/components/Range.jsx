// Everything tried, pinned to a sheet of graph paper: how technical (x)
// against how creative (y). Hover, focus or tap a pin for what I did.

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
          Read the case
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

export default function Range() {
  const [hoverId, setHoverId] = useState(null);
  const [pinnedId, setPinnedId] = useState(null);
  const [hidden, setHidden] = useState(() => new Set());
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
    <section id="range" className="section range">
      <div className="wrap">
        <div className="section-head">
          <h2>Where the work sits.</h2>
          <p>
            Fourteen roles and projects, placed by how technical and how creative each one was. Hover over a pin, or
            tap it, to see what I did.
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
          <div className="graph-plot" onMouseLeave={() => setHoverId(null)}>
            <span className="axis axis-x">more technical →</span>
            <span className="axis axis-y">more creative →</span>
            {RANGE.map((item) => {
              const off = hidden.has(item.kind);
              return (
                <motion.button
                  key={item.id}
                  className={
                    `pin pin-${item.kind}` + (flips(item) ? " flip" : "") + (item.id === openId ? " selected" : "")
                  }
                  style={pos(item)}
                  animate={{ opacity: off ? 0.12 : 1, scale: off ? 0.9 : 1 }}
                  transition={{ duration: 0.25 }}
                  onMouseEnter={() => !off && setHoverId(item.id)}
                  onFocus={() => setHoverId(item.id)}
                  onBlur={() => setHoverId(null)}
                  onClick={() => setPinnedId((id) => (id === item.id ? null : item.id))}
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
                  onMouseEnter={() => setHoverId(open.id)}
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
      </div>
    </section>
  );
}
