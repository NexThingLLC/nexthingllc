# NexThing Site - Build Plan

## Overview

Static frontend-only business website for NexThing, LLC. Hosted on GitHub Pages. No backend. Modern, professional, and edgy design.

---

## Color Palette (derived from logo.png)

The logo features a cyan-to-blue gradient "N" with a purple orbital ring and sparkle elements on a dark navy wordmark.

| Role            | Color     | Hex       |
|-----------------|-----------|-----------|
| Primary cyan    | Bright cyan | `#00C4FF` |
| Primary blue    | Medium blue | `#3D7EFF` |
| Accent purple   | Violet     | `#7B2FBE` |
| Dark background | Deep navy  | `#0B0B1E` |
| Surface         | Dark navy  | `#12122A` |
| Text primary    | White      | `#FFFFFF` |
| Text secondary  | Light gray | `#A0AEC0` |

---

## File Structure

```
site/
├── index.html          # Single-page site
├── css/
│   └── styles.css      # Custom styles and brand theming
├── js/
│   └── main.js         # Scroll behavior, nav highlight, animations
├── logo.png            # NexThing logo (existing)
└── docs/
    └── PLAN.md         # This file
```

---

## Technology Choices

- **HTML5** - Semantic markup, single `index.html`
- **CSS3** - Custom properties, gradients, animations
- **Tailwind CSS** (CDN) - Utility-first layout and spacing
- **Vanilla JavaScript** - Smooth scroll, active nav state, simple animations
- No build tools, no frameworks, no backend

---

## Page Sections

### 1. Navigation (fixed top)
- NexThing logo (left)
- Nav links: About Us | Our Promise | Our Expertise | Contact Us
- Transparent on hero, opaque dark on scroll
- Mobile hamburger menu

### 2. Hero
- Full-viewport height
- Bold tagline headline (e.g., "Engineering What's Next")
- Sub-tagline describing NexThing's focus areas
- CTA button scrolling to Contact Us
- Background: dark navy with subtle gradient or particle effect

### 3. About Us
- Section heading
- 2-3 sentences introducing NexThing, LLC.
- Alan Turing quote (styled as a blockquote):
  > "We can only see a short distance ahead, but we can see plenty there that needs to be done."
- Professional, grounded tone

### 4. Our Promise
- Section heading
- 3-4 commitment statements (icon + short text cards)
- Examples: Clarity, Accountability, Results, Partnership
- Card layout with subtle border/glow using brand colors

### 5. Our Expertise
- Section heading
- 5 expertise areas, each as a card:
  1. Cloud
  2. Automation
  3. Site Reliability Engineering
  4. DevOps
  5. Agentic AI
- Cards with icon, title, 1-2 sentence description
- Hover effect: gradient border or lift

### 6. Contact Us
- Section heading
- Brief invite to connect
- Contact form: Name, Email, Message, Submit button
- Note: form submission via `mailto:` or a static form service (e.g., Formspree) - no backend required
- Social/contact links as appropriate

### 7. Footer
- Logo (small)
- Copyright: NexThing, LLC. 2026
- Quick nav links

---

## Design Approach

Revised 2026-10-31 (light theme) to move away from a "generic AI" look toward a technical, engineering-drawing style.

- **Quiet base**: light off-white backgrounds (`#F6F6F3` / `#EDEEEA` alternating), white panels, dark ink text (`#12151C`); no glows, no radial gradients, no gradient text
- **One brand color per section**, used as solid color only: About = cyan (`#0080B8`), Promise = blue (`#2F63E0`), Expertise = violet (`#6A2FCF`), Assessment = cyan, Contact = blue. These are deepened versions of the logo colors so they keep readable contrast on the light background.
- **Section header bars**: full-width bar with a colored `// 0N` tag, section name, a pipeline track (one node per section, current stage highlighted), and anchor path
- **Technical lines**: 1px hairlines, corner-bracket panels, square corners, divider with a terminal node, dashed list rules
- **Slashes**: `//` used for nav prefixes, card indexes, list bullets, separators, and the button suffix
- **Typography**: Archivo (headings/body) + JetBrains Mono (labels, prices, metadata)
- **Hero**: faint 48px engineering grid, left-aligned, block cursor after the headline
- **Hero pipeline visual** (added 2026-11-06): animated diagram on the right (ingest -> route -> AI agent or rules -> act, with an observe loop) and a rolling run log. Rules get about 65% of traffic to reinforce "More than just AI". Hidden below 980px; static when reduced motion is on.
- Scroll-triggered fade-in kept (respects `prefers-reduced-motion`)
- Tailwind CDN removed (no utility classes were in use)

---

## Voice (added 2026-10-31)

- **Company voice:** "NexThing" as the subject for services, the offer, and commitments
  ("NexThing builds...", "Every NexThing engagement..."). Do not use "we" to imply a team.
- **No first person:** no "I" on the site; NexThing is the subject everywhere, including
  About and Book a Call (changed 2026-11-06). About uses a spec-sheet panel, not a headshot.
- **Architect-led framing:** clients work directly with the architect who designs and builds
  the solution. Never describe the business as a one-person shop, and never imply a team
  that does not exist.
- **Allowed:** "Our Promise" (firm possessive) and the inclusive "we" meaning Bo plus the
  client ("together we will figure out...").

---

## Implementation Steps

1. Create `css/styles.css` with CSS custom properties and base styles
2. Create `js/main.js` with nav scroll behavior and IntersectionObserver animations
3. Build `index.html` with all sections wired to stylesheet and script
4. Test locally (browser open of index.html)
5. Verify GitHub Pages compatibility (all paths relative, no server-side deps)

---

## GitHub Pages Compatibility Checklist

- All asset paths are relative
- No server-side code or dependencies
- Single `index.html` at repo root (or `/docs` folder if configured)
- External libraries loaded via CDN
