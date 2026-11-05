import { CONTACT } from "../data/work.js";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <div className="envelope">
          <h2>Write to me.</h2>
          <p>
            My internship at PATRY Group ends in December, and I'm looking at what comes next in 2027. If your
            work calls for more than one form, I'd like to hear about it.
          </p>
          <p className="address">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
          <p className="links-row">
            {CONTACT.links.map((l) => (
              <a key={l.href} className="text-link" href={l.href}>
                {l.label}
              </a>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
