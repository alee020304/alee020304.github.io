import { AWARDS, CERTIFICATIONS } from "../data/work.js";

export default function Awards() {
  return (
    <section id="awards" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>Awards &amp; certification</h2>
        </div>
        <div className="ledger">
          {AWARDS.map((a) => (
            <div className="ledger-row" key={a.title}>
              <span className="title">{a.title}</span>
              <span className="meta">
                {a.issuer} · {a.year}
              </span>
            </div>
          ))}
        </div>
        <div className="ledger" style={{ marginTop: 36 }}>
          {CERTIFICATIONS.map((c) => (
            <div className="ledger-row" key={c.title}>
              <span className="title">{c.title}</span>
              <span className="meta">
                {c.issuer} · {c.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
