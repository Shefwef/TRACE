# TRACE Consulting — Future Change Brief Template

Copy this file, complete the empty fields, and give it to Claude Code or another IDE assistant before asking for a new change. The context at the top prevents accidental replacement of the approved design system.

## Project context — keep this block

```text
Project: TRACE Consulting public institutional website
Stack: React 19, Vite, TypeScript, Tailwind CSS 4, Wouter, Framer Motion, GSAP, Lucide
Primary content source: client/src/data/traceData.tsx
Routes and global scroll reset: client/src/App.tsx
Global design system: client/src/index.css
Home composition: client/src/pages/Home.tsx
Home positioning / Services showcase: client/src/components/HomePositioning.tsx
About, Services, Projects, Insights, Innovations, Careers, Contact: client/src/pages/TracePages.tsx
Team hierarchy and People rail: client/src/components/TeamHierarchy.tsx

Brand rules:
- Light institutional background system; navy #123D67, ink #082440, turquoise #009CA6, mint #D7F3F0, orange #F47A20 only for consequential action.
- Manrope display, DM Sans body, IBM Plex Mono metadata.
- Keep motion restrained, GPU-friendly, pause-aware where relevant, and accessible through prefers-reduced-motion.
- Preserve scroll-to-top behavior on all Wouter route changes.
- Do not fabricate projects, team bios, clients, outcomes, dates, testimonials, or external source links.
- Do not put keys or secrets in VITE_* variables. The current contact form is frontend-only unless a server-side integration is implemented.
```

## Change request — fill in

| Field | Your details |
|---|---|
| Goal | `[Describe the visitor-facing result.]` |
| Scope | `[Routes and components to change.]` |
| Files / assets supplied | `[List exact filenames and intended locations.]` |
| Source of factual copy | `[Approved webpage, document, or company sign-off.]` |
| Exact copy to add or change | `[Paste approved wording.]` |
| Interaction behavior | `[Hover, click, keyboard, mobile behavior.]` |
| What must not change | `[Existing sections, copy, routes, colors, animations, etc.]` |
| Acceptance check | `[What should be tested at desktop and mobile.]` |

## Required implementation standards

```text
1. Inspect the named files before editing them.
2. Keep source data in traceData.tsx when changing services, projects, people, insights, or relationships.
3. Use real existing data only; state uncertainty instead of inventing content.
4. Use direct sourceUrl actions for external Insight records.
5. Keep new image assets under client/public/media/ in the exported repository, reference them as /media/... paths, and optimize them.
6. Preserve keyboard access, visible focus, responsive layout, and prefers-reduced-motion support.
7. Run pnpm check and pnpm build after the change.
8. Test the changed route on desktop and mobile, and confirm direct route entry starts at page top.
```

## Handoff requested from the coding assistant

```text
- List each file changed and the purpose of the change.
- State whether any public data, source URLs, or relationships were added or changed.
- Report pnpm check and pnpm build results.
- Flag production limitations honestly, especially contact-form delivery or media hosting.
- Do not include private keys in code, documentation, or commits.
```
