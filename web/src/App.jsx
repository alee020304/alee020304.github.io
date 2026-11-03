import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero3D from "./components/Hero3D.jsx";
import WorkSection from "./components/WorkSection.jsx";
import Awards from "./components/Awards.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Drawer from "./components/Drawer.jsx";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div id="top">
      <Header />
      <main>
        <section className="wrap hero">
          <div className="hero-text">
            <p className="kicker">Computer Science &amp; AI · McGill University</p>
            <h1>Building where code, terrain, and care meet.</h1>
            <p className="intro">
              Seismic-risk HPC, voice-AI care research, and field-built products —
              explore the map below to see how they connect.
            </p>
            <a className="cta" href="#work">
              See the work
            </a>
          </div>
          <div className="hero-scene">
            <Hero3D />
          </div>
        </section>

        <WorkSection onSelect={setSelectedId} />
        <Awards />
        <About />
        <Contact />
      </main>
      <footer>© 2026 Ahreum Lee</footer>
      <Drawer selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </div>
  );
}
