// Color or E-ink (soft greys, like an e-reader, for resting the eyes). The
// choice is kept in the visitor's browser and set on <html data-mode>, so the
// stylesheet swaps colors; components that show images read it from context.

import { createContext, useContext, useEffect, useState } from "react";

export const ModeContext = createContext("color");
export const useMode = () => useContext(ModeContext);

export function useModeState() {
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem("hompy-mode");
      return saved === "eink" || saved === "evening" ? "eink" : "color";
    } catch {
      return "color";
    }
  });
  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", mode === "eink" ? "#6a6a6a" : "#786f68");
    try {
      localStorage.setItem("hompy-mode", mode);
    } catch {
      /* private window: the choice lasts for this visit */
    }
  }, [mode]);
  return [mode, () => setMode((m) => (m === "color" ? "eink" : "color"))];
}
