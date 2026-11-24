// Graph: everything tried, pinned to graph paper. x is how technical, y how
// creative. Hover, focus or tap a pin for what I did.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { KINDS, RANGE } from "../data/work.js";

const flips = (item) => item.x > 7.5;
const pos = (item) =>
  flips(item)
    ? { right: `${100 - item.x * 10}%`, bottom: `${item.y * 10}%` }
    : { left: `${item.x * 10}%`, bottom: `${item.y * 10}%` };

const tipPos = (item) => ({
  ...(item.x > 5 ? { right: `${100 - item.x * 10}%` } : { left: `${item.x * 10}%` }),
  ...(item.y > 5 ? { top: `calc(${100 - item.y * 10}% + 16px)` } : { bottom: `calc(${item.y * 10}% + 16px)` })
});

function Card({ item }) {
  const kind = KINDS.find((k) => k.id === item.kind);
  return (
    <>
      <p className={`card-kind kind-${kind.id}`}>{kind.label}</p>
      <h3>{item.label}</h3>
      <p className="card-meta">{item.meta}</p>
      <p className="card-body">{item.body}</p>
      {item.caseId && <a href={`#case-${item.caseId}`}>Read the post</a>}
      {item.href && (
        <a href={item.href} target="_blank" rel="noreferrer">
          View on GitHub
        </a>
      )}
    </>
  );
}

const ORDER = RANGE.map((r) => r.id).sort((a, b) => RANGE.find((r) => r.id === a).x - RANGE.find((r) => r.id === b).x);
const pinDelay = (id) => 0.1 + ORDER.indexOf(id) * 0.06;

export default function Range() {
  const [hoverId, setHoverId] = useState(null);
  const [pinnedId, setPinnedId] = useState(null);
  const [hidden, setHidden] = useState(() => new Set());
  const plotRef = useRef(null);
  const drawn = useInView(plotRef, { once: true, amount: 0.3 });
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!drawn) return;
    const id = setTimeout(() => setSettled(true), (pinDelay(ORDER.at(-1)) + 0.4) * 1000);
    return () => clearTimeout(id);
  }, [drawn]);

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
    <>
      <header className="page-title">
        <h1>Graph</h1>
        <p className="page-url">fifteen roles and projects, by how technical and how creative</p>
      </header>

      <section className="panel">
        <div className="panel-head">
          <h2>Where the work sits</h2>
          <span className="panel-more">hover or tap a pin</span>
        </div>
        <p className="graph-why">
          For me, creativity is exploration. Sometimes it is a break from technical work, and sometimes it turns up an
          answer the technical work had not found.
        </p>

        <div className="kind-filters" role="group" aria-label="Show kinds of work">
          {KINDS.map((k) => (
            <button key={k.id} className={`kind kind-${k.id}`} aria-pressed={!hidden.has(k.id)} onClick={() => toggleKind(k.id)}>
              <span className="kind-chip" /> {k.label}
            </button>
          ))}
        </div>

        <div className="graph-plot" ref={plotRef} data-drawn={drawn || undefined}>
          <span className="axis axis-x">more technical →</span>
          <span className="axis axis-y">more creative →</span>
          {RANGE.map((item) => {
            const off = hidden.has(item.kind);
            return (
              <motion.button
                key={item.id}
                className={`pin pin-${item.kind}` + (flips(item) ? " flip" : "") + (item.id === openId ? " selected" : "")}
                style={pos(item)}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={drawn ? { opacity: off ? 0.15 : 1, scale: off ? 0.9 : 1 } : {}}
                transition={settled ? { duration: 0.2 } : { type: "spring", stiffness: 420, damping: 22, delay: pinDelay(item.id) }}
                onMouseEnter={() => !off && hover(item.id)}
                onMouseLeave={unhover}
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
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ duration: 0.15 }}
                onMouseEnter={() => hover(open.id)}
                onMouseLeave={unhover}
              >
                <Card item={open} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* On phones the card sits under the graph instead of over it. */}
        <div className="graph-note" aria-live="polite">
          {pinned ? <Card item={pinned} /> : <p className="graph-hint">Tap a pin to see what I did.</p>}
        </div>
      </section>
    </>
  );
}
