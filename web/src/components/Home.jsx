// The front page: the miniroom, a notice, and what's new.

import { CASES, EXPERIENCE, INTRO } from "../data/work.js";
import Miniroom from "./Miniroom.jsx";

const latest = EXPERIENCE[0];

export default function Home() {
  return (
    <>
      <header className="page-title">
        <h1>
          Welcome to my room <span className="deco">♡</span>
        </h1>
        <p className="page-url">https://alee020304.github.io</p>
      </header>

      <section className="panel miniroom">
        <div className="panel-head">
          <h2>Miniroom</h2>
          <span className="panel-more">a room for late work</span>
        </div>
        <div className="miniroom-stage">
          <div className="miniroom-fit">
            <Miniroom />
            <p className="bubble">hi, come in!</p>
          </div>
        </div>
      </section>

      <div className="home-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>Notice</h2>
          </div>
          <ul className="notice">
            <li>
              <b>Now.</b> {INTRO.now}.
            </li>
            <li>
              <b>Next.</b> Open to full-time roles from January 2027.
            </li>
          </ul>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>New posts</h2>
            <a className="panel-more" href="#board">
              more
            </a>
          </div>
          <ul className="newposts">
            {CASES.map((c) => (
              <li key={c.id}>
                <a href={`#case-${c.id}`}>
                  {c.name}: {c.subtitle}
                </a>
                <span className="new" aria-label="new">
                  N
                </span>
              </li>
            ))}
            <li>
              <a href="#diary">
                {latest.role}, {latest.org}
              </a>
              <span className="new" aria-label="new">
                N
              </span>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
