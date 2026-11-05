// I. Folded: an origami crane in flight over a pencilled flight path.
// Each wing is two facets folding at the shoulder line.

const LIGHT = "#d4593b";
const MID = "#b5452c";
const DARK = "#8c3020";
const DEEP = "#74281b";

export default function Crane() {
  return (
    <svg className="art crane" viewBox="0 0 400 300" role="img" aria-label="A red origami crane in flight">
      <path
        className="flight-path"
        d="M-20,266 C60,262 100,222 136,204 S196,186 212,190"
        fill="none"
        stroke="#7d7466"
        strokeWidth="1.1"
        strokeDasharray="2 5"
        strokeLinecap="round"
      />
      <ellipse className="crane-shadow" cx="206" cy="276" rx="70" ry="6" fill="#3b3125" opacity="0.12" />

      <g className="crane-body" filter="url(#layer)">
        <g className="wing wing-far">
          <polygon points="186,168 206,168 288,34" fill={DARK} />
          <polygon points="206,168 222,168 288,34" fill={DEEP} />
        </g>
        <polygon points="220,172 210,190 326,92" fill={MID} />
        <polygon points="220,172 230,174 326,92" fill={LIGHT} />
        <polygon points="180,172 192,190 78,96" fill={MID} />
        <polygon points="180,172 170,174 78,96" fill={LIGHT} />
        <polygon points="78,96 60,117 88,105" fill={DARK} />
        <polygon points="172,174 200,160 200,206" fill={LIGHT} />
        <polygon points="200,160 228,174 200,206" fill={MID} />
        <g className="wing wing-near">
          <polygon points="176,170 204,170 128,20" fill={LIGHT} />
          <polygon points="204,170 228,170 128,20" fill={MID} />
        </g>
      </g>
    </svg>
  );
}
