// Every position, newest first, for anyone reading the page as a resume.

import { EXPERIENCE } from "../data/work.js";

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="wrap">
        <div className="section-head">
          <h2>Experience.</h2>
        </div>
        <ol className="positions">
          {EXPERIENCE.map((e) => (
            <li className="position" key={e.org + e.when}>
              <p className="position-when">{e.when}</p>
              <div>
                <h3>{e.role}</h3>
                <p className="position-org">
                  {e.org} · {e.place}
                </p>
                <p className="position-body">{e.body}</p>
                {e.link && (
                  <a className="text-link" href={e.link.href}>
                    {e.link.label}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
