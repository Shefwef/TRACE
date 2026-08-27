# TRACE Consulting — Design Direction

## Three explored approaches

### 1. Civic Signal Field
**Very Brief Intro:** A cinematic public-systems narrative where trade, policy, labs, and digital infrastructure appear as connected flows. It feels authoritative, editorial, and forward-looking rather than technological for its own sake.

**Probability:** 0.07

### 2. Institutional Editorial Atelier
**Very Brief Intro:** A refined research-journal experience built around typography, documentary photography, and disciplined navigation. It emphasizes clarity, evidence, and human expertise.

**Probability:** 0.04

### 3. Soft-Industrial Observatory
**Very Brief Intro:** A bright, tactile systems workspace using paper textures, map contours, and data instruments. It feels practical, human, and crafted rather than corporate.

**Probability:** 0.09

## Selected approach — Civic Signal Field

### Design Movement
**Civic futurism with editorial documentary design.** The interface should resemble a living briefing on how an economy moves: policy becomes implementation, data becomes decisions, and expertise becomes durable institutions.

### Core Principles
1. **Evidence is visual.** Real policy, trade, laboratory, and institutional media leads the experience; abstract visual effects only clarify the system.
2. **One motion idea per section.** The hero has cinematic chapter transitions, Featured Insights has depth, the TRACE method has scroll-linked progress, and the content pages have restrained relational rails.
3. **Confidence over decoration.** Strong typography, intentional empty space, high-contrast calls to action, and concise headlines carry authority.
4. **Relationships are visible.** Services, projects, experts, insights, and innovations always reveal how they connect.

### Color Philosophy
The opening hero uses **midnight navy** as a cinematic reading surface, with a desaturated real-world documentary background beneath it. The main site then opens into a **warm paper-white** field to communicate transparency and research rigor. **Signal teal** represents evidence, systems, and direction. **Ember orange** is reserved for consequential actions—contact, start an enquiry, play a briefing, and current focus states. This palette is not “tech neon”; it is the visual language of reliable public infrastructure.

### Layout Paradigm
Use a **briefing sequence** rather than a card grid. The first 100vh is a concentrated statement of intent. Subsequent sections unfold as full-width scenes: proof band, scrollytelling method, systems map, active project rail, Depth Carousel, and expert network. Individual pages use editorial columns, evidence sidebars, and relationship rails instead of generic dashboard cards.

### Signature Elements
1. **Signal routes:** thin teal paths and small nodes that trace across media and continue between selected sections.
2. **Documentary vignette:** real institutional imagery treated with a navy gradient, grain, and a text-safe reading zone.
3. **Depth stages:** layered media objects with controlled scale and perspective, especially for Featured Insights and selected project stories.

### Interaction Philosophy
Interactions should reward exploration, not demand it. Focus, hover, or tap reveals a concise next layer—related project, expert, source, or action. The user should never need to decode a gesture. Click targets are explicit, keyboard-visible, and accompanied by conventional controls.

### Animation
Use Motion for React as the primary interaction layer. Hero media changes through short crossfades and low-amplitude directional movement; the text stack stays in the same text-safe zone. The Featured Insights Depth Carousel uses spring settling, scale, opacity, and depth—not a linear ticker. Scroll-linked effects are limited to the TRACE Method and selected visual details. Most UI interactions remain between 160–300ms. Every autoplay element pauses on hover, focus, touch, hidden tab, pause action, or reduced-motion preference.

### Typography System
**Manrope** is the display face: 800 for hero and section statements, 700 for key labels. **DM Sans** is the reading and interface face: 500–700 for controlled legibility. **IBM Plex Mono** is for metadata, project status, labels, and system notes. Headlines use tight tracking and a compact line height; body copy has more air. Never use Inter as a generic fallback visual identity.

### Brand Essence
**TRACE turns policy, trade, and technology into systems that move.**

Personality: **assured, observant, constructive.**

### Brand Voice
Headlines are direct, intelligent, and outcome-oriented. CTAs sound like a next step in a briefing rather than a sales prompt.

Examples: “See the systems behind the outcome.” and “Bring a complex mandate into motion.”

### Wordmark & Logo
Use a compact TRACE wordmark paired with a geometric signal-mark: a square field with an offset teal route and a small ember point. The mark must work at header scale, as a favicon, and as a section-navigation anchor; it must never depend on tiny decorative detail.

### Signature Brand Color
**Signal Teal — #0B9FA8.**

## Style Decisions

- The first viewport is a true `min-height: 100svh` cinematic hero with policy/trade/institutional media, never a mostly empty white canvas.
- Hero controls use arrows, dots, pause/play, swipe, keyboard, and accessible labels—never a visible `01 / 05` counter.
- Featured Insights is a dedicated section after the hero, using a 3D Depth Carousel inspired by the user-provided Coverflow reference: one dominant central thumbnail, layered neighboring items, and substantial media scale.
- The site is light-mode dominant after the hero. Darkness is reserved for immersive media, innovations, and selected closing moments.
- Do not overuse rounded cards, gradients, glowing effects, or persistent motion. Every visual device must reinforce the Civic Signal Field philosophy.

## Visual QA Notes

- The local homepage route renders with the cinematic hero image followed by the proof, services, Featured Insights, innovations, expertise, and enquiry sections. Visual screenshot capture was temporarily unavailable after an earlier transient parser error; the production build and TypeScript check both completed successfully after correction.
- Verified public routes: `/services/trade-facilitation` renders the service overview and `/contact` renders TRACE’s phone, email, office details, response commitment, and form structure. The remaining visual verification pass will focus on responsive presentation and the hero/Depth Carousel composition once screenshot capture is available.
