import { AWARDS } from "../data/work.js";

export default function Recognition() {
  return (
    <section id="recognition" className="section recognition">
      <div className="wrap">
        <div className="section-head">
          <h2>Recognition</h2>
        </div>
        <ol className="ledger">
          {AWARDS.map((a) => (
            <li className="ledger-row" key={a.title}>
              <span className="title">{a.title}</span>
              <span className="meta">
                {a.issuer} · {a.year}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
