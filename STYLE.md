# Style Reference

Design rationale and visual language for the site. Branch: `design/depth`.

---

## Mood

The site should feel like a piece of precision equipment — something built for a specific purpose, not decorated. References: CERN instrumentation photography, expedition safety gear, scientific journals. Not a portfolio, not a startup landing page.

The dominant feeling as you scroll is **descent**: light and warm at the top, dark and cool by the end. The darkness is not minimalism — it has texture, depth, and occasional light sources.

---

## Colour

| Role | Value | Notes |
|---|---|---|
| Orange | `#FF5500` | Primary accent. Uncompromising. Used for labels, borders, active states, CTAs. |
| Yellow | `#FFD100` | Secondary accent. Warm. Used for highlights, mailto links, education colours. |
| Sky blue | `#5BC0FF` | Tertiary. Cool contrast. Used for roles, subtitles on dark sections. |
| Sea blue | `#3090CC` | Deeper blue. Minimal use — structural accents on dark cards. |
| Navy | `#000D1C` | Tier 1 dark background. Project, Terapet sections. |
| Abyss | `#040608` | Tier 2 dark background. Writing section. Noticeably darker than navy. |
| Void | `#020304` | Contact. Near-black. |
| White | `#FFFFFF` | Hero and About sections. |
| Body text (light) | `#0A0A0A` | On white sections. |
| Body text (dark) | `#C8D0E0` | On navy sections. |
| Muted text (light) | `#4A4A4A` | Secondary text on white. |
| Muted text (dark) | `#4E6080` | Secondary text on navy. |

The two-tier dark system (`#000D1C` vs `#040608`) is intentional: the colour change is subtle but perceptible as you scroll deeper, reinforcing the descent without a hard cut.

---

## Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display headings | Source Serif 4 | 800 | Hero name, project names, page titles |
| Section headings | Source Serif 4 | 700 | h2 elements |
| Body | Inter | 400 | All prose |
| Labels | Inter | 600–700 | Uppercase tracked section labels, badges |
| Dates, notes | Inter | 400 | Monospaced feel via tight tracking |

Section labels use `letter-spacing: 0.2em` and `text-transform: uppercase` at `0.7rem` — they function as eyebrow text to orient the reader before the heading lands.

---

## Texture & Atmosphere

Each section background uses a layered `background-image`:

1. **SVG grain**: `feTurbulence` fractalNoise filter at `baseFrequency: 0.85`, rendered into a 200×200 tile, at 1.5–5% opacity depending on section. Adds tactility without pattern.
2. **Radial glow**: A large soft `radial-gradient` positioned off-centre, suggesting a distant light source. Orange glow on project sections, blue glow on press and Terapet, nothing on contact (pure void).

---

## Cards

Two card variants share the same structure (`.project-card`):

- **Orange (BSI)**: `rgba(255,85,0,0.06)` gradient, `rgba(255,85,0,0.22)` border. Corner glow via `::after` pseudo-element.
- **Blue (Nuclγscan)**: `rgba(91,192,255,0.05)` gradient, `rgba(91,192,255,0.16)` border. Same corner glow in blue.

Cards have `padding: 0` with an inner `.project-card-body` wrapper (`padding: 2.5rem`), so the video or bottom element can bleed to the card edge cleanly.

---

## Scroll Behaviour

### Theme transitions
The nav background, foreground colour, and muted colour are stored in a `THEMES` object keyed by section ID. An `IntersectionObserver` with `rootMargin: '-42% 0px -42% 0px'` fires when a section crosses the vertical centre of the viewport, triggering an instant CSS custom property swap. Transitions between themes are sharp (0.1s) — not a gentle fade.

### Reveal / stagger
Elements with `.reveal` animate in via `opacity 0 → 1` + `translateY(28px → 0)` as they enter the viewport. `.stagger` containers delay each child by 80ms increments. Exception: essay prose (`div.essay-prose`) does not carry `.reveal` — it renders immediately.

### Parallax
The hero inner block applies `translateY(scrollY * 0.32)` on scroll, creating a mild depth effect as you leave the hero. Capped to `scrollY < viewportHeight` so it doesn't affect lower sections.

### Progress bar
A 5px bar at the top of the viewport tracks scroll progress with a gradient from orange to yellow and a subtle orange glow.

---

## Navigation

Fixed nav, `backdrop-filter: blur(20px)`. The logo (`CH`) is always orange — the only element that doesn't shift with the theme. Nav link colours shift with the active section theme via CSS custom properties (`--fg`, `--muted`).

Active nav links are tracked by a separate observer with a tighter `rootMargin: '-44% 0px -44% 0px'`.

---

## Sub-pages

Sub-pages (`neurotech.html`, `nuclear.html`, `thoughts.html`) open with a white `#page-intro` section using the same grain texture as the home hero. They have a `← Home` back-link and a `.page-title` in Source Serif 4 at `clamp(2.5rem, 6vw, 4.5rem)`. From there they descend into dark sections using the same palette as the home page.
