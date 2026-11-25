// The pixel art, drawn at native size. CSS scales it by whole numbers with
// image-rendering: pixelated. The bakery background is in styles.css.

import roomDay from "./art/miniroom.png";
import roomEvening from "./art/miniroom-evening.png";
import minimiDay from "./art/minimi.png";
import minimiEvening from "./art/minimi-evening.png";
import balloonDay from "./art/deco-balloon-dog.png";
import balloonEvening from "./art/deco-balloon-dog-evening.png";
import flowersDay from "./art/deco-flowers.png";
import flowersEvening from "./art/deco-flowers-evening.png";
import kingstonDay from "./art/kingston.png";
import kingstonEvening from "./art/kingston-evening.png";

export const ART = {
  color: { room: roomDay, minimi: minimiDay, balloon: balloonDay, flowers: flowersDay, kingston: kingstonDay },
  eink: { room: roomEvening, minimi: minimiEvening, balloon: balloonEvening, flowers: flowersEvening, kingston: kingstonEvening }
};
