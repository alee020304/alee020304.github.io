// Two projects opened up in full. Each case arrives folded like a letter
// and opens as it scrolls into view.

import { useState } from "react";
import { motion } from "framer-motion";
import { CASES } from "../data/work.js";

function Plate({ plate, n }) {
  const [missing, setMissing] = useState(false);
  return (
    <figure className="plate">
      <div className="plate-mount">
        {missing ? (
          <div className="plate-empty">Photograph to come</div>
        ) : (
          <img src={plate.src} alt={plate.caption} loading="lazy" onError={() => setMissing(true)} />
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
    <article id={`case-${c.id}`} className="case">
      <header className="case-head">
        <p className="kicker">
          <span className="numeral">{c.numeral}</span> Case
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
          <h2>Two, in depth.</h2>
          <p>How the question was set, what I built, and what I found.</p>
        </div>
        {CASES.map((c) => (
          <Case key={c.id} c={c} />
        ))}
      </div>
    </section>
  );
}
