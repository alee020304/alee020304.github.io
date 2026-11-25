// The front page: where I am, and what's new.

import { EXPERIENCE } from "../data/work.js";
import { LATEST } from "../posts.js";
import { ART } from "../art.js";
import { useMode } from "../mode.js";

const latest = EXPERIENCE[0];

export default function Home() {
  const mode = useMode();
  return (
    <>
      <header className="page-title">
        <h1>
          Hi, come in <span className="deco">♡</span>
        </h1>
        <p className="page-url">https://alee020304.github.io</p>
      </header>

      <section className="panel">
        <div className="panel-head">
          <h2>Currently in: Kingston, Ontario</h2>
        </div>
        <img
          className="scene px"
          src={ART[mode].kingston}
          width="320"
          height="160"
          alt="Pixel drawing of me and my dog on Ontario Street in Kingston, by City Hall's clock tower, with patio umbrellas and a red trolley."
        />
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>New posts</h2>
          <a className="panel-more" href="#board">
            more
          </a>
        </div>
        <ul className="newposts">
          {LATEST.slice(0, 2).map((p) => (
            <li key={p.slug}>
              <a href={`#post-${p.slug}`}>
                {p.title}
                {p.subtitle && `: ${p.subtitle}`}
              </a>
              <span className="new" aria-label="new">
                N
              </span>
            </li>
          ))}
          <li>
            <a href="#resume">
              {latest.role}, {latest.org}
            </a>
            <span className="new" aria-label="new">
              N
            </span>
          </li>
        </ul>
      </section>
    </>
  );
}
