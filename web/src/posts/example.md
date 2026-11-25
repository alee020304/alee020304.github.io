---
title: How to write a post
date: 2026-11-23
summary: Every format a post can use, in one place.
draft: true
---

This file is a draft, so it only shows on the local dev server. Copy it, rename it (the file name becomes the address, e.g. `#post-example`), change the header and write. Set `draft: false` or delete the `draft` line to publish it.

## Sections

A line starting with `##` starts a section; `###` starts a subsection. They are numbered for you (1, 1.1, 1.2, 2...). To turn numbering off for a post, add `numbered: false` to the header.

### A subsection

Plain paragraphs are separated by a blank line. *Italic*, **bold**, `code` and [links](https://github.com/alee020304) work as usual.

## Notes and lists

A numbered note goes where you want the number, like this[^1], and its text goes anywhere below. Notes are numbered in the order they appear and collected at the end[^2].

1. Numbered lists
2. count themselves
3. even if every line starts with `1.`

- Bullet lists
- use a dash

> A quote is a line starting with `>`.

## Tables and images

| Bake | Hardest part |
| --- | --- |
| Macarons | the feet |
| Croquembouche | the caramel |

An image goes in `web/public/images/` and is shown with `![what it shows](/images/file.jpg)`. The description becomes its caption.

## Starring a post

Add `starred: true` to the header to pin a post to the top of the Board with a star. Case studies can also fill in `subtitle`, `role`, `where`, `when`, `tools`, `link` and `linkLabel`, which show as a table at the top (see `adina.md`).

[^1]: This is the first note.
[^2]: Notion can export a page as Markdown (… menu, Export, Markdown), so you can also draft there and drop the file here.
