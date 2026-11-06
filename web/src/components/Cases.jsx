// Two projects, kept short: a title, a line and a button. The button (or a
// link to #case-<id>) unfolds the full case like a letter.

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CASES } from "../data/work.js";

// Locally, a missing photo shows a "Photograph to come" plate. In the
// published build, a plate stays hidden until its photo has loaded.
const SHOW_PLACEHOLDERS = import.meta.env.DEV;

function Plate({ plate, n }) {
  const [status, setStatus] = useState("loading");
  const hidden = !SHOW_PLACEHOLDERS && status !== "ok";
  return (
    <figure className="plate" hidden={hidden}>
      <div className="plate-mount">
        {status === "missing" ? (
          <div className="plate-empty">Photograph to come</div>
        ) : (
          <img src={plate.src} alt={plate.caption} onLoad={() => setStatus("ok")} onError={() => setStatus("missing")} />
        )}
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />
      </div>
      <figcaption>
        Plate {n}. {plate.caption}
      </figcaption>
    </figure>
  );
}

// The full case: a letter-folded sheet that opens as it appears.
function CaseSheet({ c }) {
  return (
    <motion.div
      className="case-sheet"
      initial={{ rotateX: -40 }}
      animate={{ rotateX: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <dl className="case-meta">
        {c.meta.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
        {c.links?.map((l) => (
          <div key={l.href}>
            <dt>Link</dt>
            <dd>
              <a className="text-link" href={l.href}>
                {l.label}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <div className="case-body">
        {c.sections.map((s) => (
          <section key={s.heading}>
            <h4>{s.heading}</h4>
            <p>{s.body}</p>
          </section>
        ))}
        {c.quote && <blockquote>{c.quote}</blockquote>}
        {c.figure && (
          <p className="case-figure">
            <span className="from">{c.figure.from}</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
            <span className="to">{c.figure.to}</span>
          </p>
        )}
        {c.reflection && (
          <aside className="reflection">
            <h4>What it meant for me</h4>
            <p className="reflection-lead">{c.reflection.lead}</p>
            {c.reflection.credit && <p className="reflection-credit">{c.reflection.credit}</p>}
            <p>{c.reflection.body}</p>
          </aside>
        )}
        <div className="plates">
          {c.plates.map((p, i) => (
            <Plate key={p.src} plate={p} n={i + 1} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Case({ c }) {
  const [open, setOpen] = useState(false);
  const id = `case-${c.id}`;
  useEffect(() => {
    const check = () => location.hash === `#${id}` && setOpen(true);
    check();
    addEventListener("hashchange", check);
    return () => removeEventListener("hashchange", check);
  }, [id]);
  const spotlight = c.size === "spotlight";

  return (
    <article id={id} className={spotlight ? "case spotlight" : "case"}>
      <div className="case-row">
        <header className="case-head">
          <p className="kicker">
            <span className="numeral">{c.numeral}</span> {spotlight ? "Spotlight" : "Case"}
          </p>
          <h3>{c.name}</h3>
          <p className="case-subtitle">{c.subtitle}</p>
        </header>
        <button className="case-toggle" aria-expanded={open} aria-controls={`${id}-body`} onClick={() => setOpen(!open)}>
          {open ? "Fold it back up" : spotlight ? "Read the spotlight" : "Read the case"}
          <span aria-hidden="true">{open ? "↑" : "↓"}</span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-body`}
            className="case-fold"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <CaseSheet c={c} />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function Cases() {
  return (
    <section id="cases" className="section cases">
      <div className="wrap">
        <div className="section-head">
          <h2>In depth.</h2>
          <p>Two projects, opened up: what I built, what I found, and what it meant for me.</p>
        </div>
        {CASES.map((c) => (
          <Case key={c.id} c={c} />
        ))}
      </div>
    </section>
  );
}
