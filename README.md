# Personal Website — CV

A simple static website built as an online CV. No frameworks, no build step — just HTML, CSS, and vanilla JS. Intended as a clean starting point for experimenting with agentic coding: small enough to reason about completely, expressive enough to be worth building.

---

## Colour Scheme

| Role | Colour |
|---|---|
| Primary accent | Yellow / Gold |
| Secondary accent | Orange |
| Highlight / links | Sky blue |
| Deep accent | Sea blue |
| Body text | Black (light sections) / White (dark sections) |

The palette shifts across the page: light warm tones at the top, cool dark tones at the bottom. Accent colours adapt for legibility as the background changes.

---

## Intended Experience

### Scroll behaviour
- Elements move as the user scrolls — not just fade in, but shift, slide, and settle
- The page transitions from a **light** warm feel (hero) to a **dark** cool feel (contact) as the user scrolls down
- Key words and phrases light up in accent colours after their section fades in, drawing the eye

### Attention direction
- Important words within paragraphs are coloured (yellow, orange, sky, sea) rather than bolded
- Section reveals are staggered so the eye is drawn to the most important element first
- Hero content drifts slightly on parallax as you scroll away from it

---

## File Structure

Content and style are kept deliberately separate.

```
/
├── index.html    # Bare skeleton — loads assets, defines no content or styles
├── content.js    # All page text as plain data objects — edit your CV here
├── style.css     # All visual decisions: colours, typography, animation
├── scroll.js     # Scroll-driven behaviour: theme transitions, reveals, parallax
└── README.md
```

**To update your CV:** open `content.js` and edit the `CV` object at the top of the file. The render logic is below a clear separator — no need to touch it.

---

## Colour Markup

Inside any text field in `content.js`, you can colour individual words or phrases:

| Syntax | Colour |
|---|---|
| `{y:your text}` | Yellow / Gold |
| `{o:your text}` | Orange |
| `{s:your text}` | Sky blue |
| `{b:your text}` | Sea blue |

Example:
```
'I build {s:fast, accessible web applications} with a focus on {y:clean architecture}.'
```

---

## Agentic Coding Notes

This project is a good sandbox for agentic coding because:
- The scope is small and the output is immediately visual
- Design decisions (colour, timing, layout) are separable from content decisions
- Changes can be verified instantly in a browser preview
- There is no build pipeline to reason about
