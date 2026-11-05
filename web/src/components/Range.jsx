// Everything tried, pinned to a sheet of graph paper: how technical (x)
// against how creative (y). The empty corner is where I'm heading.

import { useState } from "react";
import { motion } from "framer-motion";
import { KINDS, RANGE } from "../data/work.js";

// Pins far to the right hang their label on the left so it stays on the sheet.
const flips = (item) => item.x > 7.5;
const pos = (item) =>
  flips(item)
    ? { right: `${100 - item.x * 10}%`, bottom: `${item.y * 10}%` }
    : { left: `${item.x * 10}%`, bottom: `${item.y * 10}%` };

export default function Range() {
  const [selectedId, setSelectedId] = useState("adina");
  const [hidden, setHidden] = useState(() => new Set());
  const selected = RANGE.find((r) => r.id === selectedId);

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
            Everything I've tried, placed by how technical and how creative it was. The placements are my own
            judgement. The empty corner is where I'd like to go next.
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

        <div className="range-layout">
          <div className="graph-sheet">
            <div className="graph-plot">
              <span className="axis axis-x">more technical →</span>
              <span className="axis axis-y">more creative →</span>
              <div className="next-zone" aria-hidden="true">
                <span>next</span>
              </div>
              {RANGE.map((item) => (
                <motion.button
                  key={item.id}
                  className={`pin pin-${item.kind}` + (flips(item) ? " flip" : "") + (item.id === selectedId ? " selected" : "")}
                  style={pos(item)}
                  animate={{ opacity: hidden.has(item.kind) ? 0.12 : 1, scale: hidden.has(item.kind) ? 0.9 : 1 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={item.id === selectedId}
                  tabIndex={hidden.has(item.kind) ? -1 : 0}
                >
                  <span className="pin-head" />
                  <span className="pin-label">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <aside className="range-note" aria-live="polite">
            {selected && (
              <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <p className="kicker">{KINDS.find((k) => k.id === selected.kind).label}</p>
                <h3>{selected.label}</h3>
                <p className="range-meta">{selected.meta}</p>
                <p>{selected.body}</p>
                {selected.caseId && (
                  <a className="text-link" href={`#case-${selected.caseId}`}>
                    Read the case
                  </a>
                )}
                {selected.href && (
                  <a className="text-link" href={selected.href}>
                    View on GitHub
                  </a>
                )}
              </motion.div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
