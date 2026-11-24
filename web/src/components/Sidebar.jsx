// The left page: visit counter, me, one line, and how to reach me. The
// counter counts this visitor's own visits, kept in their browser.

import { useEffect, useState } from "react";
import { CONTACT, INTRO } from "../data/work.js";
import { Minimi } from "./Miniroom.jsx";

function useVisits() {
  const [n, setN] = useState({ today: 1, total: 1 });
  useEffect(() => {
    try {
      const day = new Date().toISOString().slice(0, 10);
      const total = +(localStorage.getItem("hompy-total") || 0) + 1;
      const today = (localStorage.getItem("hompy-day") === day ? +(localStorage.getItem("hompy-today") || 0) : 0) + 1;
      localStorage.setItem("hompy-total", total);
      localStorage.setItem("hompy-day", day);
      localStorage.setItem("hompy-today", today);
      setN({ today, total });
    } catch {
      /* private window: show 1 and 1 */
    }
  }, []);
  return n;
}

export default function Sidebar() {
  const { today, total } = useVisits();
  return (
    <aside className="side">
      <p className="counter">
        <span>
          today <b>{today}</b>
        </span>
        <span className="counter-sep" aria-hidden="true">
          |
        </span>
        <span>
          total <b>{total.toLocaleString()}</b>
        </span>
      </p>

      <div className="photo">
        <div className="photo-mount">
          <Minimi className="photo-minimi" />
        </div>
        <p className="photo-name">{INTRO.name}</p>
        <p className="photo-line">{INTRO.title}</p>
      </div>

      <p className="side-intro">{INTRO.summary}</p>

      <dl className="side-facts">
        <div>
          <dt>now</dt>
          <dd>{INTRO.now}</dd>
        </div>
        <div>
          <dt>next</dt>
          <dd>Open to full-time roles from January 2027</dd>
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
