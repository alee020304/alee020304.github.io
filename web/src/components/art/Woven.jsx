// IV. Woven: paper weaving. Cream warp strips, with weft strips in three
// colours (three teams) sliding in over and under them.

import { motion } from "framer-motion";

const X0 = 96;
const Y0 = 64;
const W = 300;
const H = 272;
const WARPS = 9;
const WEFTS = 7;
const COLW = W / WARPS;
const ROWH = H / WEFTS;
const WARP_W = COLW - 5;
const WEFT_H = ROWH - 6;
const COLOURS = ["#b5452c", "#26344f", "#c4a173"];
const WARP = "#f5f0e7";

const warpX = (i) => X0 + i * COLW + 2.5;
const weftY = (j) => Y0 + j * ROWH + 3;

export default function Woven() {
  return (
    <svg className="art woven" viewBox="0 0 480 400" role="img" aria-label="Paper strips in three colours woven through cream strips">
      <g filter="url(#layer)">
        {Array.from({ length: WARPS }, (_, i) => (
          <rect key={i} x={warpX(i)} y={Y0 - 22} width={WARP_W} height={H + 44} fill={WARP} />
        ))}
      </g>

      {Array.from({ length: WEFTS }, (_, j) => (
        <motion.rect
          key={j}
          x={X0 - 34}
          y={weftY(j)}
          width={W + 68}
          height={WEFT_H}
          fill={COLOURS[j % 3]}
          filter="url(#layer)"
          initial={{ x: -480 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.15 + j * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Where the warp passes over the weft. */}
      <g filter="url(#grain)">
        {Array.from({ length: WARPS }, (_, i) =>
          Array.from({ length: WEFTS }, (_, j) =>
            (i + j) % 2 === 0 ? (
              <rect key={`${i}-${j}`} x={warpX(i)} y={weftY(j) - 1} width={WARP_W} height={WEFT_H + 2} fill={WARP} />
            ) : null
          )
        )}
      </g>
    </svg>
  );
}
