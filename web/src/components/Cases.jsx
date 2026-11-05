// Two projects opened up in full. Each case arrives folded like a letter
// and opens as it scrolls into view.

import { useState } from "react";
import { motion } from "framer-motion";
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

function Case({ c }) {
  return (
    <article id={`case-${c.id}`} className={c.size === "spotlight" ? "case spotlight" : "case"}>
      <header className="case-head">
        <p className="kicker">
          <span className="numeral">{c.numeral}</span> {c.size === "spotlight" ? "Spotlight" : "Case"}
        </p>
        <h3>{c.name}</h3>
        <p className="case-subtitle">{c.subtitle}</p>
      </header>

      <motion.div
        className="case-sheet"
        initial={{ rotateX: -78, opacity: 0.2 }}
        whileInView={{ rotateX: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
    </article>
  );
}

export default function Cases() {
  return (
    <section id="cases" className="section cases">
      <div className="wrap">
        <div className="section-head">
          <h2>In depth.</h2>
          <p>One full case and one spotlight: what I built, what I found, and what it meant for me.</p>
        </div>
        {CASES.map((c) => (
          <Case key={c.id} c={c} />
        ))}
      </div>
    </section>
  );
}
