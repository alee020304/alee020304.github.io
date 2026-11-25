// Board: starred posts (the two case studies) as cards at the top, then every
// other post in a table, the way boards were. A post opens on its own; #post-<file>
// opens one. Posts are Markdown files in ../posts.

import { useEffect, useRef, useState } from "react";
import { POSTS } from "../posts.js";

// Locally a missing photo shows a "Photograph to come" plate; in the
// published build a plate stays hidden until its photo has loaded.
const DEV = import.meta.env.DEV;

const fmt = (d) => {
  const t = new Date(d + "T00:00:00");
  return isNaN(t) ? d : t.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
};
const when = (p) => p.when || fmt(p.date);

const META = [
  ["Role", "role"],
  ["Where", "where"],
  ["When", "when"],
  ["Tools", "tools"]
];

function Post({ p, onBack }) {
  const body = useRef(null);

  // Mark each photo as loaded or missing, so CSS can show or hide its plate.
  useEffect(() => {
    body.current?.querySelectorAll(".plate img").forEach((img) => {
      const plate = img.parentElement;
      const ok = () => plate.classList.add("ok");
      const missing = () => plate.classList.add("missing");
      if (img.complete) (img.naturalWidth ? ok : missing)();
      else {
        img.addEventListener("load", ok, { once: true });
        img.addEventListener("error", missing, { once: true });
      }
    });
  }, [p]);

  // Footnote links jump within the post instead of changing the address.
  function onClick(ev) {
    const a = ev.target.closest("a[href^='#fn']");
    if (!a) return;
    ev.preventDefault();
    document.getElementById(a.getAttribute("href").slice(1))?.scrollIntoView({ block: "center" });
  }

  const meta = META.filter(([, k]) => p[k]);
  return (
    <article className="post">
      <header className="post-head">
        <h2>
          {p.title} {p.subtitle && <small>{p.subtitle}</small>}
        </h2>
        {meta.length || p.link ? (
          <dl className="post-meta">
            {meta.map(([label, k]) => (
              <div key={k}>
                <dt>{label}</dt>
                <dd>{p[k]}</dd>
              </div>
            ))}
            {p.link && (
              <div>
                <dt>Link</dt>
                <dd>
                  <a href={p.link} target="_blank" rel="noreferrer">
                    {p.linkLabel || p.link}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="essay-date">
            {fmt(p.date)}
            {p.draft && " (draft, only shown locally)"}
          </p>
        )}
      </header>
      <div
        ref={body}
        className={"essay" + (p.numbered ? " numbered" : "")}
        data-dev={DEV || undefined}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: p.html }}
      />
      <footer className="post-foot">
        <button className="pxbtn" onClick={onBack}>
          Back to list
        </button>
      </footer>
    </article>
  );
}

export default function Board({ post }) {
  const [openSlug, setOpenSlug] = useState(post);
  useEffect(() => setOpenSlug(post), [post]);
  const open = POSTS.find((p) => p.slug === openSlug);
  const starred = POSTS.filter((p) => p.starred);
  const rest = POSTS.filter((p) => !p.starred);

  function go(slug) {
    setOpenSlug(slug);
    history.replaceState(null, "", slug ? `#post-${slug}` : "#board");
    document.getElementById("page")?.scrollTo(0, 0);
  }

  return (
    <>
      <header className="page-title">
        <h1>Board</h1>
        <p className="page-url">projects and writing</p>
      </header>

      {open ? (
        <Post p={open} onBack={() => go(null)} />
      ) : (
        <>
          {starred.length > 0 && (
            <div className="cards">
              {starred.map((p) => (
                <button key={p.slug} className="card" onClick={() => go(p.slug)}>
                  <span className="card-top">
                    <span className="star" role="img" aria-label="starred" />
                    <span className="card-title">{p.title}</span>
                  </span>
                  {p.subtitle && <span className="card-sub">{p.subtitle}</span>}
                  <span className="card-meta">
                    {p.role && <span>{p.role}</span>}
                    <span>{when(p)}</span>
                  </span>
                  <span className="card-read">Read</span>
                </button>
              ))}
            </div>
          )}

          {rest.length > 0 && (
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
                  {rest.map((p, i) => (
                    <tr key={p.slug}>
                      <td className="num">{rest.length - i}</td>
                      <td>
                        <button className="post-link" onClick={() => go(p.slug)}>
                          {p.title}
                          {p.subtitle && `: ${p.subtitle}`}
                          {p.draft && " (draft)"}
                        </button>
                        {p.summary && <p className="essay-summary">{p.summary}</p>}
                      </td>
                      <td className="when">{when(p)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </>
      )}
    </>
  );
}
