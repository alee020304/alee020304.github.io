import { useEffect, useState } from "react";
import WorkMap3D from "./WorkMap3D.jsx";
import { TAG_ORDER, VIEWS } from "../data/work.js";

function readInitialTags() {
  const params = new URLSearchParams(location.search);
  const view = params.get("view");
  if (view && VIEWS[view]) return new Set(VIEWS[view]);
  return new Set((params.get("tags") || "").split(",").filter(Boolean));
}

export default function WorkSection({ onSelect }) {
  const [activeTags, setActiveTags] = useState(() => readInitialTags());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const next = new URLSearchParams();
    if (activeTags.size) next.set("tags", [...activeTags].join(","));
    const qs = next.toString();
    history.replaceState({}, "", `${location.pathname}${qs ? "?" + qs : ""}`);
  }, [activeTags]);

  function toggleTag(tag) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
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
          Drag to orbit, scroll to zoom, click a node for the full story.
        </p>
        <div className="tag-filters">
          {TAG_ORDER.map((tag) => (
            <button
              key={tag}
              className={"tag-filter" + (activeTags.has(tag) ? " active" : "")}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="map-shell">
          <WorkMap3D activeTags={activeTags} onSelect={onSelect} />
        </div>
        <p className="map-hint">
          <span style={{ color: "var(--brass)" }}>●</span> experience{" "}
          <span style={{ color: "var(--slate)", marginLeft: 14 }}>●</span> project{" "}
          <span style={{ color: "var(--muted)", marginLeft: 14 }}>●</span> community
        </p>
      </div>
    </section>
  );
}
