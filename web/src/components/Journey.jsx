// Journey: how I got here, one chapter for each thing I picked up, in the
// order they started. The graph of everything I've done closes the page.

import { JOURNEY } from "../data/work.js";
import Range from "./Range.jsx";

export default function Journey() {
  return (
    <>
      <header className="page-title">
        <h1>Journey</h1>
        <p className="page-url">how I got here, in the order it happened</p>
      </header>

      <ol className="journey">
        {JOURNEY.map((c) => (
          <li className="chapter" key={c.id} id={c.id}>
            <p className="chapter-since">since {c.since}</p>
            <section className="panel">
              <div className="panel-head">
                <h2>{c.heading}</h2>
                {c.link && (
                  <a className="panel-more" href={c.link.href}>
                    {c.link.label}
                  </a>
                )}
              </div>
              <p className="trait">{c.lesson}</p>
              <ul className="points">
                {c.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
          </li>
        ))}
      </ol>

      <Range />
    </>
  );
}
