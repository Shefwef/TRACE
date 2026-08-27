# TRACE Consulting — Implementation and Component Guide

## Purpose

This document is the technical orientation file for a future developer or IDE assistant. It describes **where content lives, which components render each experience, and how to make safe changes without dismantling the approved TRACE visual system**.

## Technical baseline

| Concern | Current implementation |
|---|---|
| App framework | React 19 with TypeScript and Vite |
| Styling | Tailwind CSS 4 plus site tokens in `client/src/index.css` |
| Routing | Wouter, configured in `client/src/App.tsx` |
| Motion | Framer Motion and GSAP for selected gallery motion |
| Icons | Lucide React |
| Content model | `client/src/data/traceData.tsx` |
| Static build output | `dist/public` |
| Hosting configuration | `vercel.json` with SPA rewrite |

The project is currently a **static frontend**. Its `server/` directory is a compatibility placeholder; there is no production database, authentication, contact-email service, or protected API in the delivered site.

## Route map

| Route | Page component | Primary purpose |
|---|---|---|
| `/` | `pages/Home.tsx` | Cinematic hero, positioning, Services, Featured Projects, Insights, Innovations, people, partners, and office map. |
| `/about` | `pages/TracePages.tsx` → `AboutPage` | Firm profile, mission, commitments, working framework, distinction areas, and metrics. |
| `/services` and `/services/:slug` | `TracePages.tsx` | Service listings and contextual service briefings. |
| `/projects` and `/projects/:slug` | `TracePages.tsx` | Project filters, project briefings, facts, contributors, and related records. |
| `/team` | `components/TeamHierarchy.tsx` | Leadership hierarchy and expert directory. |
| `/team/:slug` | `TracePages.tsx` | Individual team profile. |
| `/insights` and `/insights/:slug` | `TracePages.tsx` | Curated source index and source-aware insight presentation. |
| `/innovations` | `TracePages.tsx` | Product and innovation records with restrained hover motion. |
| `/careers` | `TracePages.tsx` | Careers information. |
| `/contact` | `TracePages.tsx` | Contact information and frontend-only enquiry interface. |

## Core edit map

| File | Edit this for | Do not use it for |
|---|---|---|
| `client/src/data/traceData.tsx` | Services, projects, experts, insights, links, labels, office-adjacent source assets, and relationship arrays. | Structural page layout. |
| `client/src/pages/Home.tsx` | Homepage section order and the home-only Services, innovation, people, and proof sections. | Global color tokens. |
| `client/src/components/HomePositioning.tsx` | How TRACE Works, Integrated TRACE System, What Sets TRACE Apart, and homepage Services showcase. | Service-detail data. |
| `client/src/components/ProjectFocusStage.tsx` | Featured Projects accordion gallery. | Project source data. |
| `client/src/pages/TracePages.tsx` | About, services, projects, insights, innovations, careers, contact, and individual detail-page layouts. | Header behavior or route registration. |
| `client/src/components/TeamHierarchy.tsx` | Homepage People rail and Team directory page. | Team source details. |
| `client/src/components/LandingHero.tsx` | Hero transition behavior and headline presentation. | The approved six hero statements in `traceData.tsx`. |
| `client/src/App.tsx` | Route definitions and global route-change scroll-to-top behavior. | Per-page visual styling. |
| `client/src/index.css` | TRACE design tokens, typography, responsive scaling, rail animation, and reduced-motion rules. | Content copy. |

## Content relationships

`traceData.tsx` is the source of truth. It intentionally links content through slugs rather than duplicating it in several page files.

| Record | Relationship fields | Result in the interface |
|---|---|---|
| Service | `disciplines` | Service inclusions in service briefings. |
| Project | `serviceSlugs`, `teamSlugs` | Related services and contributors. |
| Team member | `serviceSlugs`, `projectSlugs` | Relevant expertise and project association. |
| Insight | `serviceSlugs`, `projectSlugs`, `teamSlugs`, `sourceUrl` | Connected records and original external-source action. |

When adding a new project, service, person, or insight, add the record first and then update the reciprocal relationships only where the connection is truly supported. Do not invent outcomes, clients, contributor roles, source dates, or customer testimonials.

## Approved visual system

| Token | Intent |
|---|---|
| Navy `#123D67` / `trace-navy` | Primary institutional field, headlines on dark areas, and consequential visual structure. |
| Ink `#082440` / `trace-ink` | High-contrast body and display text on light surfaces. |
| Turquoise `#009CA6` / `trace-teal` | Evidence, system, and interactive emphasis. |
| Mint `#D7F3F0` / `trace-mint` | Supporting contrast on navy. |
| Orange `#F47A20` / `trace-orange` | Reserved for consequential actions and small highlights. |
| Display font | Manrope, bold to black weights. |
| Body font | DM Sans. |
| Metadata font | IBM Plex Mono. |

The system uses pale paper surfaces, navy contrast chapters, turquoise top-and-left elevation rules, image-led cards, and restrained transform/opacity motion. Avoid default Inter typography, purple gradients, rounded SaaS cards, unverified impact claims, and new dark sections without a specific institutional reason.

## Motion and accessibility

All non-essential movement must honor `prefers-reduced-motion`. Keep hover motion under roughly 300ms and favor `transform` and `opacity`. The homepage has intentional behaviors: the people and partner rails pause on hover/focus, Featured Projects cycles with pause-aware interaction, the innovation panels expand on pointer/focus interaction, and the Integrated TRACE System entities use a modest lift.

Do not remove the global `RouteEntryReset` in `App.tsx`; it restores the scroll position to the top when a Wouter route changes. This prevents detail pages from opening at the previous page’s scroll offset.

## Media migration for GitHub and Vercel

The Manus preview uses some `/manus-storage/...` files. Before an independent Vercel launch, copy approved assets into `client/public/media/`, set `VITE_USE_LOCAL_MEDIA=true`, and update any remaining `/manus-storage/...` records in `traceData.tsx` to matching `/media/...` paths.

Use the following media structure:

```text
client/public/media/
├── brand/
├── hero/
├── team/
├── projects/
├── insights/
├── innovations/
├── partners/
└── about/
```

Use optimised WebP or AVIF for photographic images; use SVG or transparent PNG for marks. Keep raw footage, editable masters, and long videos outside the repository. For large video, use a managed host such as Vercel Blob, Cloudinary, Mux, Vimeo, or YouTube and store only the approved public URL in the data model.

## Production integrations to add later

The contact form must be connected through a server-side function, not a browser-exposed secret. A Vercel Function plus Resend is a suitable approach: validate fields, rate-limit requests, use `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` only in Vercel’s private environment settings, and have the frontend submit to `/api/contact`.

Do not place private email, CRM, database, analytics, or map credentials in `VITE_*` variables. Every `VITE_*` value is bundled into the browser.

## Required quality check

Run these commands before pushing a change:

```bash
pnpm check
pnpm build
```

Then check the homepage, the relevant listing, one relevant detail page, and a mobile viewport. Confirm external insight actions still lead to their original `sourceUrl`.
