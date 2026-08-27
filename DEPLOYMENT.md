# TRACE Consulting — Repository, Vercel, Media, and Integration Guide

## What the current project already does

The exported project is a **React 19 + Vite + TypeScript static frontend**. Its navigation, hero-slider transitions, click-to-focus Featured Insights Depth Carousel, responsive layouts, OpenStreetMap expansion, filters, relationship pages, and contact-form interface are browser-side interactions. Their visual motion is powered by `framer-motion`; Vercel serves the resulting static JavaScript and CSS, so moving the site to Vercel does **not** remove or degrade the animations.

The contact form currently provides a local success-state interaction only. It does **not** send email, save submissions, or connect to a CRM yet. Treat it as a designed frontend until a real endpoint is supplied.

## Recommended repository workflow

Initialize a new Git repository in the downloaded project folder, add the codebase, and commit the current baseline before making feature changes. Create a branch for each meaningful revision, such as `feature/contact-integration` or `content/team-portraits`, then test with `pnpm check` and `pnpm build` before merging.

```bash
pnpm install
cp ENVIRONMENT_TEMPLATE.txt .env.local
pnpm dev
pnpm check
pnpm build
```

The project uses `client/` as Vite’s root. Therefore the public media directory is `client/public/media/`, not a top-level `public/` directory.

## Media decision guide

| Asset type | Preferred location | Reference in code | Notes |
|---|---|---|---|
| Employee portraits, project covers, insight images, logos | `client/public/media/` | `/media/team/name.webp` | Optimize prior to commit. |
| Hero poster or thumbnail | `client/public/media/hero/` | `/media/hero/trace-hero-poster.webp` | Keep a text-safe region for hero copy. |
| Short looping hero film | Vercel Blob, Cloudinary, Mux, Vimeo, or YouTube | Full public playback URL | Include a still poster and reduced-motion fallback. |
| Raw footage, camera originals, editable source files | Do not commit | Store in cloud/DAM | Keep out of Git and Vercel build output. |

The present Manus-hosted image paths begin with `/manus-storage/`. They work in the Manus preview but should be replaced with your own `/media/...` paths or CDN URLs after export. Update `client/src/data/traceData.tsx` when your approved filenames are ready.

## Environment variables

Copy the provided `ENVIRONMENT_TEMPLATE.txt` lines into a new `.env.local` file locally. Do not commit `.env.local`. The static version does not require environment variables to render. `VITE_MEDIA_BASE_URL` is only useful if media is moved to a CDN. `VITE_CONTACT_FORM_ENDPOINT` must be a **public** submission endpoint; every `VITE_*` value is exposed to the browser at build time.

Keep credentials only in the environment variables of a server-side function or approved third-party provider. Never expose SMTP credentials, Resend API keys, database URLs, CRM private tokens, or cloud-storage secrets through `VITE_*` variables.

## Free office map

The homepage now uses an OpenStreetMap embed centered on the Mohakhali New DOHS office area. It requires **no Google Maps API key and no billing profile**. The embedded map includes an OpenStreetMap attribution link and an external OpenStreetMap location link. OpenStreetMap data is free to use, but the public tile service is best-effort and its usage policy requires clear attribution and responsible normal interactive use; do not add bulk-map prefetching or tile scraping. [3]

## Turning the enquiry form into a production integration

Choose one of these implementation paths before launch:

| Option | Suitable when | What Claude Code should add |
|---|---|---|
| Vercel Function + Resend | TRACE wants direct branded email with minimal infrastructure | An `/api/contact` function, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, input validation, rate limiting, and an updated form `fetch()` call. |
| Formspree / Basin | TRACE needs a managed form with the least custom code | A public form endpoint in `VITE_CONTACT_FORM_ENDPOINT`, privacy settings, spam protection, and success/error handling. |
| HubSpot / Salesforce / CRM webhook | TRACE needs qualified leads in an established business workflow | A server-side relay that keeps the CRM secret private, maps fields, validates input, and logs failures. |

Ask Claude Code to replace the current local success-state behavior only after an endpoint has been selected. The submission flow must render a loading state, surface a clear error with the office email fallback, and show success only after the endpoint returns a successful response.

For the recommended Vercel Function + Resend path, set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in **Vercel Project Settings → Environment Variables** for Development, Preview, and Production. Do not add those server secrets to `ENVIRONMENT_TEMPLATE.txt`, `.env.local` that is shared, or a `VITE_*` variable. The public frontend can submit to `/api/contact`, which needs no client-side API key.

## Vercel deployment

The included `vercel.json` defines the Vite build command, points Vercel to `dist/public`, and adds the SPA fallback required for direct visits to routes such as `/services/trade-facilitation`. Vercel’s Vite guidance explicitly recommends an `/index.html` rewrite for SPA deep linking. [1]

Import the repository into Vercel, retain `pnpm run build` as the Build Command, and set `dist/public` as the Output Directory if the dashboard does not read `vercel.json`. Add values from `ENVIRONMENT_TEMPLATE.txt` only when you actually use them. Vercel scopes variables to Development, Preview, and Production; a variable change applies to newly created deployments. [2]

Do not copy the Manus-only `BUILT_IN_FORGE_*`, `VITE_FRONTEND_FORGE_*`, `JWT_SECRET`, `OAUTH_SERVER_URL`, or analytics values into Vercel. They belong to the Manus environment and are not required by this static site. Replace Manus media URLs with your own assets before production.

## Animation preservation checklist

Vercel does not alter the client-side Motion code. To preserve the intended quality, keep `framer-motion` in `package.json`, serve optimized images, defer heavy video, retain `prefers-reduced-motion` handling, and avoid adding CSS properties that animate layout on every scroll. Confirm the hero, Depth Carousel, and map panel on a 14-inch laptop at 90% zoom, a wide desktop, a tablet, and a mobile device before releasing.

## References

[1] [Vite on Vercel — SPA deep linking and rewrite configuration](https://vercel.com/docs/frameworks/frontend/vite)

[2] [Vercel — Environment Variables](https://vercel.com/docs/environment-variables)

[3] [OpenStreetMap Foundation — Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/)
