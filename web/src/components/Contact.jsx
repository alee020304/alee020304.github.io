import { CONTACT } from "../data/work.js";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <div className="envelope">
          <h2>Write to me.</h2>
          <p>
            Available for full-time roles from January 2027.
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
