# cathalharte.com

A personal website — not a CV, not a portfolio. More a curated account of the work I find worth talking about: neurotechnology, nuclear medicine, and the odd essay.

Built as a pure static site (HTML, CSS, vanilla JS) with no framework and no build step. Deployed via GitHub Pages.

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
├── index.html       # Skeleton only — no content, no inline styles
├── content.js       # All text as plain data objects + render functions
├── style.css        # All visual decisions: colour, type, animation
├── scroll.js        # Scroll-driven behaviour: theme transitions, reveals, parallax
├── neurotech.html   # Brain-Spine Interface sub-page (static HTML)
├── nuclear.html     # Nuclear medicine sub-page (static HTML)
└── thoughts.html    # Writing sub-page (static HTML)
```

Sub-pages are fully static HTML — they share `style.css` and `scroll.js` but don't use `content.js`.

---

## Editing content

Open `content.js` and edit the `CV` object at the top. The render logic lives below a clear separator — no need to touch it.

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
