// Profile: who I am, in four parts, each with the plain line and the evidence.

import { INTRO, SKILLS } from "../data/work.js";

export default function Profile() {
  return (
    <>
      <header className="page-title">
        <h1>Profile</h1>
        <p className="page-url">who lives here</p>
      </header>

      <section className="panel">
        <div className="panel-head">
          <h2>Basics</h2>
        </div>
        <dl className="profile-facts">
          <div>
            <dt>Name</dt>
            <dd>{INTRO.name}</dd>
          </div>
          <div>
            <dt>Studying</dt>
            <dd>{INTRO.title}</dd>
          </div>
          <div>
            <dt>Now</dt>
            <dd>{INTRO.now}</dd>
          </div>
        </dl>
      </section>

      {SKILLS.map((s) => (
        <section className="panel skill" key={s.id} id={s.id}>
          <div className="panel-head">
            <h2>
              <span className="numeral">{s.numeral}.</span> {s.heading}
            </h2>
            <a className="panel-more" href={s.link.href}>
              {s.link.label}
            </a>
          </div>
          <p className="trait">{s.trait}</p>
          <ul className="points">
            {s.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
