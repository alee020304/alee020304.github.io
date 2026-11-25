# Board posts

Each `.md` file here is one post on the Board tab. Open `example.md` for every
format you can use (numbered sections, numbered notes, lists, quotes, tables,
images, links) and `adina.md` for a case study.

The header at the top of each file:

```
---
title: The title
date: 2026-11-23           (used for sorting)
summary: One line under the title in the list (optional)
starred: true              (optional: pinned at the top with a star)
draft: true                (optional: only shows on the local dev server)
numbered: false            (optional: turns off section numbers)
subtitle, role, where, when, tools, link, linkLabel   (optional: case-study details)
---
```

The file name is the post's address: `notes-on-sourdough.md` opens at
`#post-notes-on-sourdough`. Images go in `web/public/images/`.
