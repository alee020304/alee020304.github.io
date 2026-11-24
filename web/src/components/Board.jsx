// Board: the two projects as posts. The list is a table, as boards were;
// a post opens under it. #case-<id> opens that post.

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CASES } from "../data/work.js";

// Locally, a missing photo shows a "Photograph to come" plate. In the
// published build, a plate stays hidden until its photo has loaded.
const SHOW_PLACEHOLDERS = import.meta.env.DEV;

function Plate({ plate }) {
  const [status, setStatus] = useState("loading");
  const hidden = !SHOW_PLACEHOLDERS && status !== "ok";
  return (
    <figure className="plate" hidden={hidden}>
      {status === "missing" ? (
        <div className="plate-empty">Photograph to come</div>
      ) : (
        <img src={plate.src} alt={plate.caption} onLoad={() => setStatus("ok")} onError={() => setStatus("missing")} />
      )}
      <figcaption>{plate.caption}</figcaption>
    </figure>
  );
}

const metaOf = (c, k) => c.meta.find(([key]) => key === k)?.[1];

function Post({ c, onClose }) {
  return (
    <motion.article
      className="post"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <header className="post-head">
        <h2>
          {c.name} <small>{c.subtitle}</small>
        </h2>
        <dl className="post-meta">
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
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="post-body">
        {c.sections.map((s) => (
          <section key={s.heading}>
            <h3>{s.heading}</h3>
            <p>{s.body}</p>
          </section>
        ))}
        {c.quote && <blockquote>{c.quote}</blockquote>}
        {c.reflection && (
          <aside className="reflection">
            <h3>What it taught me</h3>
            <p>
              <b>{c.reflection.lead}</b>
              {c.reflection.credit && <span className="credit"> {c.reflection.credit}</span>}
            </p>
            <p>{c.reflection.body}</p>
          </aside>
        )}
        <div className="plates">
          {c.plates.map((p) => (
            <Plate key={p.src} plate={p} />
          ))}
        </div>
      </div>

      <footer className="post-foot">
        <button className="pxbtn" onClick={onClose}>
          Back to list
        </button>
      </footer>
    </motion.article>
  );
}

export default function Board({ post }) {
  const [openId, setOpenId] = useState(post);
  useEffect(() => setOpenId(post), [post]);
  const open = CASES.find((c) => c.id === openId);

  function toggle(id) {
    const next = openId === id ? null : id;
    setOpenId(next);
    history.replaceState(null, "", next ? `#case-${next}` : "#board");
  }

  return (
    <>
      <header className="page-title">
        <h1>Board</h1>
        <p className="page-url">two projects worth a closer look</p>
      </header>

      <section className="panel">
        <table className="list board-list">
          <thead>
            <tr>
              <th className="num">No.</th>
              <th>Title</th>
              <th className="when">When</th>
            </tr>
          </thead>
          <tbody>
            {CASES.map((c, i) => (
              <tr key={c.id} className={c.id === openId ? "open" : ""} id={`case-${c.id}`}>
                <td className="num">{CASES.length - i}</td>
                <td>
                  <button className="post-link" aria-expanded={c.id === openId} onClick={() => toggle(c.id)}>
                    [{metaOf(c, "Role")}] {c.name}: {c.subtitle}
                  </button>
                </td>
                <td className="when">{metaOf(c, "When")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <AnimatePresence mode="wait" initial={false}>
        {open && <Post key={open.id} c={open} onClose={() => toggle(open.id)} />}
      </AnimatePresence>
    </>
  );
}
