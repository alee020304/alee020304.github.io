// The pixel art, drawn at native size. CSS scales it by whole numbers with
// image-rendering: pixelated.

import bgDay from "./art/bg-page.png";
import bgEvening from "./art/bg-page-evening.png";
import roomDay from "./art/miniroom.png";
import roomEvening from "./art/miniroom-evening.png";
import minimiDay from "./art/minimi.png";
import minimiEvening from "./art/minimi-evening.png";
import balloonDay from "./art/deco-balloon-dog.png";
import balloonEvening from "./art/deco-balloon-dog-evening.png";
import flowersDay from "./art/deco-flowers.png";
import flowersEvening from "./art/deco-flowers-evening.png";

export const ART = {
  color: { bg: bgDay, room: roomDay, minimi: minimiDay, balloon: balloonDay, flowers: flowersDay },
  eink: { bg: bgEvening, room: roomEvening, minimi: minimiEvening, balloon: balloonEvening, flowers: flowersEvening }
};
