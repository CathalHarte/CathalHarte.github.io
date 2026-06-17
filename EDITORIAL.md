# Editorial process

How a plaintext draft becomes a published essay on this blog. Three roles do the
work. The north star for all of them is a single test:

> **Does this promote human flourishing?** If a piece doesn't, it doesn't run.

---

## Roles

### Author — Cathal (human)

Writes essays in plaintext, usually on a phone, and sends them into the chat as
app-to-app copy-paste. Drafts often allude *sloppily* to a source — "that Nature
paper on narcissism", "Noema's piece on attention" — and expect those to become
hyperlinks. The Author has final say on everything.

### Secretary — AI agent (`.claude/agents/secretary.md`)

Turns an approved plaintext draft into a publishable page:

1. **Dates** the essay (today's date unless the draft states one).
2. **Light grammar / typo fixes only** — never changes voice, argument, or
   wording of substance. When in doubt, leaves it and flags it.
3. **Sources the allusions** — finds the real URL behind each sloppy reference
   via web search, confirms it's the correct source, and turns the phrase into a
   link. Lists every allusion → chosen URL for the Author to confirm before
   publishing. Never invents a link.
4. **Converts to HTML** matching the site's structure and styling (below).
5. **Updates the indexes** so "Most recent" and "More thoughts" point to the new
   piece, and the previous latest essay drops into the archive.
6. **Stages a PR** — never pushes straight to the live branch.

### Editor in Chief — AI agent (`.claude/agents/editor-in-chief.md`)

Guards quality. Reads a draft (or the staged PR) and checks it is:

- **Factual** — claims hold up; flags anything unsupported or wrong.
- **Original** — adds something; not a rehash.
- **On theme** — in keeping with promoting flourishing.

Does **not** rewrite the Author's work. Reports back to the Author and may
suggest specific articles or papers worth reading to deepen or sharpen the
piece. Advisory, not authoritative — the Author decides.

---

## Recommended flow

```
Author drafts
   │
   ├─►  Editor in Chief   developmental review: theme / originality / facts,
   │                      suggested reading  ──►  back to Author to revise
   │
   ▼
Author approves
   │
   ▼
Secretary    date · grammar · source links · HTML · index updates · stage PR
   │
   ▼
Editor in Chief   (optional) final pass on the staged PR
   │
   ▼
Author merges
```

Either agent can be engaged on its own — send a draft straight to the Secretary
to publish, or to the Editor first for feedback.

---

## Plaintext conventions

The Author writes naturally; the Secretary interprets:

- **First line** = the title.
- If the **next line is a date** (`17 June 2026` or `June 2026`), it's the
  publish date; otherwise today's date is used.
- **Blank line** = paragraph break.
- `## Heading` = section heading (`<h2>`).
- Lines beginning `> ` = a blockquote; a trailing `— Source` line becomes the
  citation.
- An **aside in the Author's own voice** (the dark "interruption" panels on the
  site) can be fenced between lines of `---`, ending with `— CH`. Optional and
  stylistic.
- **Source allusions** are written however is natural; the Secretary finds and
  attaches the real link.

---

## HTML structure (what the Secretary produces)

New file: `essay-{slug}.html`. The slug is the title lowercased, apostrophes
dropped, non-alphanumerics collapsed to hyphens
(e.g. "On being wrong" → `essay-on-being-wrong.html`).

**Copy the frame from `essay-template.html`** — do not hand-rebuild it — so
design changes to the template propagate automatically. The frame:

- `<head>`: title `{Title} — Cathal Harte`, the Google Fonts links, `style.css`.
- `#progress`, `#nav` (logo `CH`; links: All writing → / Comments / Contact).
- `<main>`:
  - `#page-intro` → `.section-label` = date, `.page-title` = title.
  - Body in `<section id="essay-body" class="essay-section">` with
    `.section-inner > .essay-prose.reveal` holding `<p>`, `<h2>`, and
    `<blockquote><p>…</p><cite>…</cite></blockquote>`.
  - Each aside breaks the body: close the current body section, emit
    `<section id="essay-int-N" class="essay-interruption">`
    (→ `.interruption-inner.reveal` → `p.interruption-text` +
    `span.interruption-attr` "— CH"), then continue in a new
    `<section id="essay-body-2">`, `-3`, etc.
  - `.essay-archive-nav` ("All writing →"), then the static `#comments` and
    `#contact` sections, copied verbatim from the template.
- `<script src="scroll.js">`.

Links: `<a href="URL" target="_blank" rel="noopener">text</a>`.

Worked examples: `essay-on-attention.html` (multiple interruptions),
`essay-raised-by-wolves.html` (single section).

---

## Index updates (make the new piece "latest" everywhere)

1. **`thoughts.html`**
   - Move the current `#latest` `<a class="essay-card">` to the top of the
     `#archive` `<ol>` as `<li><a class="essay-archive-item">…</a></li>`
     (date as "Month YYYY", title text only).
   - Insert the new essay-card in `#latest`: date ("Month YYYY"), title, a
     one–two sentence excerpt (usually from the opening paragraph), "Read →".
2. **`content.js`** — update the `interests.more` entry (the "More thoughts →"
   card on the home page) so its `url` is the new `essay-{slug}.html`.

---

## Staging the PR

Never push to the live branch directly:

1. Branch off the current working branch: `git checkout -b publish/{slug}`.
2. Stage the new essay, `thoughts.html`, and `content.js`.
3. Commit: `publish: {Title}`.
4. Push and open a PR for the Author to review and merge.
