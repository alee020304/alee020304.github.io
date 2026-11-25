// My room: the miniroom, and what I do when I'm not working. Space-diary
// drawings are read from ../space-diary at build time.

import { ROOM } from "../data/work.js";
import Miniroom from "./Miniroom.jsx";

const images = import.meta.glob("../space-diary/*.{jpg,jpeg,png,webp}", { import: "default", eager: true });
const notes = import.meta.glob("../space-diary/*.txt", { query: "?raw", import: "default", eager: true });

const base = (path) => path.split("/").pop().replace(/\.[^.]+$/, "");
const DRAWINGS = Object.entries(images)
  .map(([path, src]) => {
    const name = base(path);
    const [title = "", ...rest] = (notes[`../space-diary/${name}.txt`] || "").split(/\r?\n/);
    return { name, src, title: title.trim(), note: rest.join(" ").trim() };
  })
  .sort((a, b) => b.name.localeCompare(a.name));

export default function MyRoom() {
  return (
    <>
      <header className="page-title">
        <h1>My room</h1>
        <p className="page-url">what I do when I&apos;m not working</p>
      </header>

      <section className="panel miniroom">
        <div className="panel-head">
          <h2>Miniroom</h2>
          <span className="panel-more">a room for late work</span>
        </div>
        <div className="miniroom-stage">
          <div className="miniroom-fit">
            <Miniroom />
            <p className="bubble">hi, come in!</p>
          </div>
        </div>
      </section>

      <div className="home-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>Running</h2>
          </div>
          <p className="room-text">{ROOM.running}</p>
        </section>
        <section className="panel">
          <div className="panel-head">
            <h2>Baking</h2>
          </div>
          <p className="room-text">{ROOM.baking}</p>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>Space diary</h2>
        </div>
        <p className="room-text">{ROOM.spaceDiary}</p>
        {DRAWINGS.length > 0 && (
          <div className="drawings">
            {DRAWINGS.map((d) => (
              <figure className="drawing" key={d.name}>
                <img src={d.src} alt={d.title ? `Drawing: ${d.title}` : "A space-diary drawing"} loading="lazy" />
                {(d.title || d.note) && (
                  <figcaption>
                    {d.title && <b>{d.title}</b>}
                    {d.note && <span>{d.note}</span>}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
