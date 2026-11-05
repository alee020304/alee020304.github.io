import { MotionConfig } from "framer-motion";
import Header from "./components/Header.jsx";
import Forms from "./components/Forms.jsx";
import Cases from "./components/Cases.jsx";
import Range from "./components/Range.jsx";
import Recognition from "./components/Recognition.jsx";
import Contact from "./components/Contact.jsx";
import { PaperDefs } from "./paper.jsx";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div id="top">
        <PaperDefs />
        <Header />
        <main>
          <Forms />
          <Cases />
          <Range />
          <Recognition />
          <Contact />
        </main>
        <footer className="wrap">© 2026 Ahreum Lee</footer>
      </div>
    </MotionConfig>
  );
}
