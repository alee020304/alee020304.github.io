// Board posts are Markdown files in ./posts, rendered at build time by
// ../markdown.js. Starred posts come first, then the rest, newest first.
// Drafts show only on the local dev server. See posts/README.md.

const files = import.meta.glob(["./posts/*.md", "!./posts/README.md"], { import: "default", eager: true });

const byDate = (a, b) => b.date.localeCompare(a.date);

export const POSTS = Object.values(files)
  .filter((p) => p && (import.meta.env.DEV || !p.draft))
  .sort((a, b) => b.starred - a.starred || byDate(a, b));

// Newest first, stars or not: for the home page.
export const LATEST = [...POSTS].sort(byDate);
