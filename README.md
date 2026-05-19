# Personal Website — CV

A simple static website built as an online CV. No frameworks, no build step — just HTML, CSS, and vanilla JS. Intended as a clean starting point for experimenting with agentic coding: small enough to reason about completely, expressive enough to be worth building.

---

## Colour Scheme

| Role | Colour |
|---|---|
| Primary accent | Yellow |
| Secondary accent | Orange |
| Highlight / links | Sky blue |
| Deep accent | Sea blue |
| Body text | Black / White |

---

## Intended Experience

### Scroll behaviour
- Elements move as the user scrolls — not just fade in, but shift, slide, and settle
- The page transitions from a **light** to a **dark** feel as the user scrolls down (or vice versa)
- Key words and phrases are pulled forward: different colours, earlier entrance timing, or subtle scale

### Attention direction
- Important words within paragraphs are coloured (yellow, orange, sky blue) rather than bolded
- Section reveals are staggered so the eye is drawn to the most important element first
- Scroll-linked parallax or transform effects give depth without being distracting

---

## File Structure

The goal is to keep **content** and **style** clearly separated so that writing or editing copy does not require touching layout or animation code.

```
/
├── index.html        # Structure only — semantic HTML, no inline styles
├── content.js        # All page text lives here as plain data objects
├── style.css         # All visual decisions: colours, typography, animation
├── scroll.js         # Scroll-driven behaviour: observers, parallax, transitions
└── README.md
```

> **Note:** The split into separate files is the target structure. The project currently lives in a single `index.html` and will be refactored toward this layout as it develops.

---

## Agentic Coding Notes

This project is a good sandbox for agentic coding because:
- The scope is small and the output is immediately visual
- Design decisions (colour, timing, layout) are separable from content decisions
- Changes can be verified instantly in a browser preview
- There is no build pipeline to reason about
