# Portfolio Integration Package for Claude Code

## What This Is
A complete 3D spiral cone gallery showcasing 45 ornamental artworks by Dalal Al-Kandari.
The gallery uses CSS 3D transforms to arrange artwork cards in a mesmerizing spiral helix
that auto-rotates, responds to mouse movement, drag, and scroll.

## Artist Info
- **Name**: Dalal Al-Kandari
- **Location**: Kuwait City, Kuwait
- **Style**: Outsider Art / Art Brut — self-taught, intuitive ornamental art
- **Method**: Hand draws without planning. Hand moves freely. "My Eye Brain"
- **Signature**: Heart motif appears across 30+ works
- **Score**: 90/100 — Professional-Ready Outsider Artist

## Files to Integrate

### Core 3D Gallery Component (MUST HAVE)
| File | Purpose |
|------|---------|
| `src/components/ConeCarousel.tsx` | The 3D spiral cone gallery — 45 cards in CSS 3D space |
| `src/data/artworks.ts` | All 45 artworks with metadata (title, category, description, image path, colors, style) |

### Supporting Components
| File | Purpose |
|------|---------|
| `src/components/Navbar.tsx` | Fixed header with bracket-links |
| `src/components/Footer.tsx` | Footer with copyright and social links |
| `src/pages/Home.tsx` | Full homepage with hero, cone, skills, marquees, contact, about me |
| `src/pages/ArtworkDetail.tsx` | Individual artwork detail page with prev/next navigation |
| `src/index.css` | All CSS including 3D cone styles, animations, marquee, dark theme |
| `src/App.tsx` | Router setup with HashRouter |

### Assets
| Path | Contents |
|------|----------|
| `public/artworks/` | 45 digital artwork PNG files (ornaments_1 through ornaments_45) |

## Dependencies to Install
```bash
npm install react-router-dom
```

## Key CSS (from index.css)
The 3D cone requires these critical CSS classes:
- `.cone-wrap` — perspective container
- `.cone-tilt` — tilt transform wrapper
- `.cone-spin` — rotation wrapper
- `.cone-card` — individual 3D card with backface-visibility
- `.overlay`, `.info`, `.info-cat`, `.info-title`, `.brackets` — hover effects

## 3D Cone Parameters
- TOTAL_CARDS: 45
- CARDS_PER_TURN: 15 (tight spiral, no gaps)
- TOP_RADIUS: 320
- BOTTOM_RADIUS: 220
- SPIRAL_HEIGHT: 750
- CARD_WIDTH: 148px (cards touch each other)
- CARD_ASPECT: 1.33
- AUTO_SPEED: 0.12 (continuous rotation)
- BASE_TILT: -12deg

## Integration Notes for Claude
1. The `ConeCarousel` component is vanilla-JS-style inside React (useRef + RAF loop)
2. Cards are positioned using `translate3d(x, y, z)` + `rotateY` in CSS transforms
3. All interaction (drag, tilt, scroll, hover) is handled via refs + event listeners
4. The artworks data array drives all 45 cards — each links to `#/artwork/{slug}`
5. ArtworkDetail reads the slug param and renders the matching artwork with prev/next nav
6. Images are referenced as `/artworks/ornaments_{N}_digital.png` from public folder

## About Me Text (for homepage)
"I never studied ornamental art. My hand moves without planning — my eye sees, my brain feels, and what emerges is pure intuition. 45 works of bold lines, vivid color, and hearts that appear unbidden. This is not technique. This is my eye brain."
