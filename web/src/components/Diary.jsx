// Diary: every position, newest first, as dated entries.

import { EXPERIENCE } from "../data/work.js";

export default function Diary() {
  return (
    <>
      <header className="page-title">
        <h1>Diary</h1>
        <p className="page-url">where I have worked, newest first</p>
      </header>

      <ol className="diary">
        {EXPERIENCE.map((e) => (
          <li className="entry" key={e.org + e.when}>
            <div className="entry-date">
              <span className="entry-when">{e.when}</span>
            </div>
            <div className="entry-body">
              <h2>{e.role}</h2>
              <p className="entry-org">
                {e.org}, {e.place}
              </p>
              <p>{e.body}</p>
              {e.link && (
                <p className="entry-foot">
                  <a href={e.link.href}>{e.link.label}</a>
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
