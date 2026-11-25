// Turns a Board post (web/src/posts/*.md) into plain data plus HTML at build
// time, so the Markdown parser never ships to visitors.

import MarkdownIt from "markdown-it";
import footnote from "markdown-it-footnote";

const md = new MarkdownIt({ html: false, linkify: true, typographer: true }).use(footnote);

// Footnote markers read 1, 2, 3 rather than [1], [2], [3].
md.renderer.rules.footnote_caption = (tokens, idx) => {
  const { id, subId } = tokens[idx].meta;
  return String(id + 1) + (subId > 0 ? `:${subId}` : "");
};

// Links out of the site open in a new tab.
const linkOpen = md.renderer.rules.link_open || ((t, i, o, e, self) => self.renderToken(t, i, o));
md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
  if (/^https?:/.test(tokens[idx].attrGet("href") || "")) {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noreferrer");
  }
  return linkOpen(tokens, idx, opts, env, self);
};

// An image is a mounted photo, captioned with its description.
md.renderer.rules.image = (tokens, idx) => {
  const t = tokens[idx];
  const alt = md.utils.escapeHtml(t.content);
  const src = md.utils.escapeHtml(t.attrGet("src"));
  return `<span class="plate"><img src="${src}" alt="${alt}" loading="lazy"><span class="plate-cap">${alt}</span></span>`;
};

export function renderPost(slug, raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const meta = {};
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^(\w+):\s*(.*)$/);
      if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  return {
    ...meta,
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    starred: meta.starred === "true",
    draft: meta.draft === "true",
    numbered: meta.numbered !== "false",
    html: md.render(m ? raw.slice(m[0].length) : raw, { docId: slug })
  };
}

// Vite plugin: importing a .md file under src/posts gives the rendered post.
// In the published build a draft gives null, so it never ships.
export default function posts() {
  let build = false;
  return {
    name: "board-posts",
    configResolved(config) {
      build = config.command === "build";
    },
    transform(code, id) {
      if (!/[\\/]posts[\\/][^\\/]+\.md$/.test(id)) return null;
      const slug = id.split(/[\\/]/).pop().replace(/\.md$/, "");
      const post = renderPost(slug, code);
      return { code: `export default ${JSON.stringify(build && post.draft ? null : post)};`, map: null };
    }
  };
}
