// Some of my work: a card per project, each with a button (or a link to
// #case-<id>) that opens the full write-up under the cards.

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

const metaOf = (c, k) => c.meta.find(([key]) => key === k)?.[1];

// A short card: what it was, my role, and a button for the full write-up.
function Card({ c, open, onToggle }) {
  return (
    <article id={`case-${c.id}`} className={"work-card" + (open ? " open" : "")}>
      <p className="work-card-meta">
        {metaOf(c, "Role")} · {metaOf(c, "When")}
      </p>
      <h3>{c.name}</h3>
      <p className="work-card-sub">{c.subtitle}</p>
      <button className="case-toggle" aria-expanded={open} aria-controls="case-body" onClick={onToggle}>
        {open ? "Close" : "Read more"}
        <span aria-hidden="true">{open ? "↑" : "↓"}</span>
      </button>
    </article>
  );
}

export default function Cases() {
  const [openId, setOpenId] = useState(null);
  useEffect(() => {
    const check = () => {
      const c = CASES.find((c) => location.hash === `#case-${c.id}`);
      if (c) setOpenId(c.id);
    };
    check();
    addEventListener("hashchange", check);
    return () => removeEventListener("hashchange", check);
  }, []);
  const open = CASES.find((c) => c.id === openId);

  return (
    <section id="cases" className="section cases">
      <div className="wrap">
        <div className="section-head">
          <h2>Some of my work.</h2>
          <p>Two projects worth a closer look.</p>
        </div>
        <div className="work-cards">
          {CASES.map((c) => (
            <Card key={c.id} c={c} open={c.id === openId} onToggle={() => setOpenId(c.id === openId ? null : c.id)} />
          ))}
        </div>
        <AnimatePresence initial={false} mode="wait">
          {open && (
            <motion.div
              key={open.id}
              id="case-body"
              className={"case-fold" + (open.size === "spotlight" ? " spotlight" : "")}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <CaseSheet c={open} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
