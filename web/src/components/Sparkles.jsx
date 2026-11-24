// A short trail of four-point sparkles behind the pointer. Colors come from
// the stylesheet, so they follow Color and E-ink mode.

import { useEffect } from "react";

export function useSparkleTrail() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches) return;
    let last = 0;
    let n = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - last < 45) return;
      last = now;
      const s = document.createElement("i");
      const size = 7 + (n % 3) * 3;
      s.className = `sparkle trail c${n % 3}`;
      s.style.cssText = `left:${e.clientX + ((n * 7) % 16) - 8}px;top:${e.clientY + ((n * 5) % 16) - 2}px;width:${size}px;height:${size}px`;
      n++;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 700);
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => removeEventListener("pointermove", onMove);
  }, []);
}
