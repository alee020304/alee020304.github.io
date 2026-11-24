// An open book in a window, in front of a bakery-cafe. The whole thing fits the screen; the
// two pages scroll on their own. The tabs on the right switch the right-hand
// page. Old anchors (#experience, #case-adina, #range...) still land on the
// right tab.

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { INTRO } from "./data/work.js";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";
import Diary from "./components/Diary.jsx";
import Board from "./components/Board.jsx";
import Range from "./components/Range.jsx";
import Awards from "./components/Awards.jsx";
import Guestbook from "./components/Guestbook.jsx";
import { useSparkleTrail } from "./components/Sparkles.jsx";
import { ModeContext, useModeState } from "./mode.js";
import { ART } from "./art.js";

// The background is 640 x 400 pixel art. Scale it by the smallest whole
// number that covers the screen, so every pixel stays square.
export const TABS = [
  { id: "home", label: "Home", page: Home },
  { id: "profile", label: "Profile", page: Profile },
  { id: "diary", label: "Diary", page: Diary },
  { id: "board", label: "Board", page: Board },
  { id: "graph", label: "Graph", page: Range },
  { id: "awards", label: "Awards", page: Awards },
  { id: "guestbook", label: "Guestbook", page: Guestbook }
];

// Where an old or friendly anchor goes.
const ALIAS = {
  top: "home",
  forms: "home",
  experience: "diary",
  cases: "board",
  projects: "board",
  range: "graph",
  recognition: "awards",
  contact: "guestbook"
};

export function route(hash) {
  const raw = (hash || "").replace(/^#/, "");
  if (raw.startsWith("case-")) return { tab: "board", post: raw.slice(5) };
  const tab = ALIAS[raw] || raw;
  return { tab: TABS.some((t) => t.id === tab) ? tab : "home", post: null };
}

function useRoute() {
  const [r, setR] = useState(() => route(location.hash));
  useEffect(() => {
    const on = () => setR(route(location.hash));
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  return r;
}

export default function App() {
  const { tab, post } = useRoute();
  const current = TABS.find((t) => t.id === tab);
  const Page = current.page;
  useSparkleTrail();
  const [mode, toggleMode] = useModeState();
  const art = ART[mode];

  // The right page scrolls on its own; a new tab starts at its top.
  useEffect(() => {
    document.getElementById("page")?.scrollTo(0, 0);
  }, [tab]);

  return (
    <ModeContext.Provider value={mode}>
    <MotionConfig reducedMotion="user">
      <div className="sky" style={{ "--bg": `url(${art.bg})` }}>
        <div className="window-wrap">
        <div className="window" id="hompy">
          <div className="titlebar">
            <span className="titlebar-icon" aria-hidden="true" />
            <span className="titlebar-text">{INTRO.name}</span>
            <button type="button" className="mode-toggle" onClick={toggleMode} aria-pressed={mode === "eink"}>
              {mode === "color" ? "E-ink" : "Color"}
            </button>
          </div>
          <div className="frame">
            <div className="book">
              <Sidebar />

              <main className="page" id="page">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tab}
                  className="page-inner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.18 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >
                  <Page post={post} />
                </motion.div>
              </AnimatePresence>
              </main>
            </div>

            <nav className="tabs" aria-label="Pages">
              {TABS.map((t) => (
                <a
                  key={t.id}
                  className={"tab" + (t.id === tab ? " active" : "")}
                  href={`#${t.id}`}
                  aria-current={t.id === tab ? "page" : undefined}
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </div>

        </div>
        <img className="sticker balloon px" src={art.balloon} width="84" height="136" alt="" aria-hidden="true" />
        <img className="sticker flowers left px" src={art.flowers} width="80" height="48" alt="" aria-hidden="true" />
        <img className="sticker flowers right px" src={art.flowers} width="80" height="48" alt="" aria-hidden="true" />
        </div>
      </div>
    </MotionConfig>
    </ModeContext.Provider>
  );
}
