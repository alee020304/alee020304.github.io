// The miniroom and the minimi (the little me), as pixel art in Color and
// E-ink versions.

import { ART } from "../art.js";
import { useMode } from "../mode.js";

export default function Miniroom() {
  const mode = useMode();
  return (
    <img
      className="miniroom-img px"
      src={ART[mode].room}
      width="300"
      height="222"
      alt="My miniroom: a bed with a nightstand on each side, a desk with a computer, a bookshelf, lots of plants, a rose rug, my white dog on her cushion, and me."
    />
  );
}

export function Minimi({ className = "" }) {
  const mode = useMode();
  return <img className={"px " + className} src={ART[mode].minimi} width="24" height="37" alt="" />;
}
