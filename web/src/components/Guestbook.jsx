// Guestbook: the way to reach me.

import { CONTACT, INTRO } from "../data/work.js";
import { Minimi } from "./Miniroom.jsx";

export default function Guestbook() {
  return (
    <>
      <header className="page-title">
        <h1>Guestbook</h1>
        <p className="page-url">leave a note on your way out</p>
      </header>

      <section className="panel guest">
        <div className="guest-who">
          <Minimi className="guest-minimi" />
          <span>{INTRO.name}</span>
          <span className="guest-date">owner</span>
        </div>
        <div className="guest-text">
          <p>Thanks for visiting. I&apos;m available for full-time roles from January 2027, and happy to talk before then.</p>
          <p>
            The fastest way is email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
          <p className="guest-cta">
            <a className="pxbtn big" href={`mailto:${CONTACT.email}?subject=Hello%20from%20your%20homepage`}>
              Write to {INTRO.name.split(" ")[0]}
            </a>
            {CONTACT.links.map((l) => (
              <a key={l.href} className="pxbtn" href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </p>
        </div>
      </section>
    </>
  );
}
