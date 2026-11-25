// The left page: me, my status, what I'm doing now and next, and how to
// reach me.

import { useEffect, useState } from "react";
import { CONTACT, INTRO } from "../data/work.js";
import { Minimi } from "./Miniroom.jsx";

// The status (a word or two) is read from /status.txt at the repo root, so it
// can be changed on GitHub without rebuilding the site. A line like
// 2026-11-24 is the date it was written.
function useStatus() {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    fetch("/status.txt", { cache: "no-cache" })
      .then((r) => (r.ok ? r.text() : ""))
      .then((raw) => {
        const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
        const date = lines.find((l) => /^\d{4}-\d{2}-\d{2}$/.test(l));
        const text = lines.filter((l) => l !== date).join(" ");
        if (text) setStatus({ text, date });
      })
      .catch(() => {});
  }, []);
  return status;
}

const fmt = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-CA", { month: "short", day: "numeric" });

export default function Sidebar() {
  const status = useStatus();
  const [degree, school] = INTRO.title.split(", ");
  return (
    <aside className="side">
      {status && (
        <p className="side-status">
          <span className="tag tag-status">status</span>
          <span className="side-status-text">{status.text}</span>
          {status.date && <time dateTime={status.date}>{fmt(status.date)}</time>}
        </p>
      )}

      <div className="photo">
        {/* A portrait: the minimi from the waist up, standing on the frame's edge. */}
        <div className="photo-mount">
          <span className="photo-crop">
            <Minimi className="photo-minimi" />
          </span>
        </div>
      </div>

      <p className="side-degree">
        <span>{degree}</span>
        <span className="side-school">{school}</span>
      </p>

      <dl className="side-facts">
        <div>
          <dt className="tag tag-now">now</dt>
          <dd>{INTRO.now}</dd>
        </div>
        <div>
          <dt className="tag tag-next">next</dt>
          <dd>{INTRO.next}</dd>
        </div>
      </dl>

      <p className="side-links">
        <a className="pxbtn" href={`mailto:${CONTACT.email}`}>
          Email
        </a>
        {CONTACT.links.map((l) => (
          <a key={l.href} className="pxbtn" href={l.href} target="_blank" rel="noreferrer">
            {l.label}
          </a>
        ))}
      </p>

      <p className="side-foot">© 2026 Ahreum Lee</p>
    </aside>
  );
}
