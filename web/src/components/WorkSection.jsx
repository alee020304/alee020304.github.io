import { useEffect, useState } from "react";
import WorkMap3D from "./WorkMap3D.jsx";
import { CATEGORIES } from "../data/work.js";

function readInitialCategories() {
  const params = new URLSearchParams(location.search);
  const ids = new Set(CATEGORIES.map((c) => c.id));
  return new Set(
    (params.get("categories") || "")
      .split(",")
      .filter((c) => ids.has(c))
  );
}

export default function WorkSection({ onSelect }) {
  const [activeCategories, setActiveCategories] = useState(() => readInitialCategories());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const next = new URLSearchParams();
    if (activeCategories.size) next.set("categories", [...activeCategories].join(","));
    const qs = next.toString();
    history.replaceState({}, "", `${location.pathname}${qs ? "?" + qs : ""}`);
  }, [activeCategories]);

  function toggleCategory(id) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function shareView() {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      prompt("Copy this link:", location.href);
    }
  }

  return (
    <section id="work" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>Work map</h2>
          <button className="cta" onClick={shareView}>
            {copied ? "Link copied" : "Share this view"}
          </button>
        </div>
        <p className="map-hint" style={{ marginTop: 0, marginBottom: 18 }}>
          Drag to orbit, scroll to zoom, click a satellite for the full story.
        </p>
        <div className="tag-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={"tag-filter" + (activeCategories.has(cat.id) ? " active" : "")}
              style={activeCategories.has(cat.id) ? { borderColor: cat.color, color: cat.color } : undefined}
              onClick={() => toggleCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="map-shell">
          <WorkMap3D activeCategories={activeCategories} onSelect={onSelect} />
        </div>
        <p className="map-hint">
          {CATEGORIES.map((cat) => (
            <span key={cat.id} style={{ marginRight: 16 }}>
              <span style={{ color: cat.color }}>●</span> {cat.label}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
