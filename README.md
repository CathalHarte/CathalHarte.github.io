# cathalharte.ch

A personal website
Built as a pure static site (HTML, CSS, vanilla JS) with no framework and no build step. Deployed via GitHub Pages.

---

## AI assistance policy

Only **Claude Opus 4.8 at effort level high or above** is accepted for AI-assisted
work in this repository. Lower-effort models or settings are not to be used.

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — intro, Brain-Spine Interface, Nuclγscan, writing |
| `neurotech.html` | Brain-Spine Interface — quote, press, links |
| `nuclear.html` | Nuclear medicine — Nuclγscan & Qualγscan (in progress) |
| `thoughts.html` | Writing — essays hub (in progress) |

---

## File Structure

Content, style, and behaviour are kept in separate files.

```
/
├── index.html       # Skeleton + content pre-rendered from content.js (don't hand-edit <main>)
├── content.js       # All text as plain data objects + render functions
├── style.css        # All visual decisions: colour, type, animation
├── scroll.js        # Scroll-driven behaviour: theme transitions, reveals, parallax
├── tools/prerender.mjs  # Bakes content.js into index.html for crawlers
├── neurotech.html   # Brain-Spine Interface sub-page (static HTML)
├── nuclear.html     # Nuclear medicine sub-page (static HTML)
└── thoughts.html    # Writing sub-page (static HTML)
```

Sub-pages are fully static HTML — they share `style.css` and `scroll.js` but don't use `content.js`.

---

## Editing content

Open `content.js` and edit the `CV` object at the top. The render logic lives below a clear separator — no need to touch it.

Then run:

```bash
node tools/prerender.mjs
```

This bakes the rendered content (plus `schema.org` Person data) into `index.html`,
so search engines and AI assistants — which read raw HTML and don't run
JavaScript — can see who the site is about. CI fails if you forget
(`node tools/prerender.mjs --check`). No dependencies; just Node.

### Search & AI discoverability

| File | Purpose |
|---|---|
| `robots.txt` | Allows all crawlers, AI ones named explicitly; points to the sitemap |
| `sitemap.xml` | Public pages only — add each new essay |
| `llms.txt` | Plain-text summary of the site for LLMs — add each new essay |
| `<head>` of each page | Description, canonical URL, Open Graph, JSON-LD |

### Colour markup

Inside any text field in `content.js`, individual words or phrases can be coloured:

| Syntax | Colour |
|---|---|
| `{y:your text}` | Yellow / gold |
| `{o:your text}` | Orange |
| `{s:your text}` | Sky blue |
| `{b:your text}` | Sea blue |

Example: `'I read {s:Noema} and {y:Equator} via newsletters.'`

---

## Design

See [`STYLE.md`](STYLE.md) for the full design rationale and visual language.

---

## Sources

See [`SOURCES.md`](SOURCES.md) for traceability of all factual claims on the site.
