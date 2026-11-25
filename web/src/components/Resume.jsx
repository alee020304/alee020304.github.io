// Resume: positions newest first, then extracurriculars and education.

import { EDUCATION, EXPERIENCE, EXTRACURRICULARS } from "../data/work.js";

function Entries({ items }) {
  return (
    <ol className="resume">
      {items.map((e) => (
        <li className="entry" key={e.org + e.when}>
          <div className="entry-date">
            <span className="entry-when">{e.when}</span>
          </div>
          <div className="entry-body">
            <h2>{e.role}</h2>
            <p className="entry-org">{e.place ? `${e.org}, ${e.place}` : e.org}</p>
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
  );
}

export default function Resume() {
  return (
    <>
      <header className="page-title">
        <h1>Resume</h1>
        <p className="page-url">where I've worked, newest first</p>
      </header>

      <Entries items={EXPERIENCE} />

      <h2 className="resume-head">Extracurriculars</h2>
      <Entries items={EXTRACURRICULARS} />

      <h2 className="resume-head">Education</h2>
      <Entries items={[{ role: EDUCATION.degree, org: EDUCATION.school, when: EDUCATION.when }]} />
    </>
  );
}
