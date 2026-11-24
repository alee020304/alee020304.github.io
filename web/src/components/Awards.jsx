import { AWARDS } from "../data/work.js";

export default function Awards() {
  return (
    <>
      <header className="page-title">
        <h1>Awards</h1>
        <p className="page-url">things on the shelf</p>
      </header>
      <section className="panel">
        <table className="list">
          <thead>
            <tr>
              <th>Year</th>
              <th>Award</th>
              <th>From</th>
            </tr>
          </thead>
          <tbody>
            {AWARDS.map((a) => (
              <tr key={a.title}>
                <td className="year">{a.year}</td>
                <td>
                  <span className="trophy" aria-hidden="true" /> {a.title}
                </td>
                <td className="from">{a.issuer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
