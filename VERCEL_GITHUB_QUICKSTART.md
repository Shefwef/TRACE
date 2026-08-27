# TRACE Consulting — GitHub and Vercel Quick Start

## A. Download and prepare locally

Download the **complete project export**. Do not download only `client/src`; Vercel requires `package.json`, `pnpm-lock.yaml`, `vercel.json`, `vite.config.ts`, TypeScript configuration, and the rest of the repository alongside it.

```bash
cd path/to/trace-consulting-redesign
pnpm install
cp ENVIRONMENT_TEMPLATE.txt .env.local
pnpm check
pnpm build
pnpm dev
```

The project builds to `dist/public`. The site is ready for a static frontend deployment once preview-only visual paths have been replaced by approved local `/media/...` paths or your own CDN paths.

## B. Add approved media before independent production launch

Copy the approved assets to `client/public/media/` using the subfolders described in `client/public/media/README.md`. Keep the current filenames where `traceData.tsx` already references them, or update the matching records in `traceData.tsx` at the same time.

| Asset family | Local folder | Notes |
|---|---|---|
| TRACE wordmarks and mark | `client/public/media/brand/` | Keep dark and white variants. |
| Hero scenes | `client/public/media/hero/` | Keep a readable text-safe region. |
| Portraits | `client/public/media/team/` | Preserve supplied faces and use stable lowercase filenames. |
| Project, insight, innovation images | their matching folders | Use optimized photographs or source-approved graphics. |
| Partner marks | `client/public/media/partners/` | Prefer transparent SVG; confirm names before publishing. |

Set the following **only if all referenced local assets are present**:

```env
VITE_USE_LOCAL_MEDIA=true
```

## C. Create and push an empty GitHub repository

Create a GitHub repository with **no README, licence, or `.gitignore`**. Then run the following from the downloaded project folder. Replace the URL only in the `git remote add` line.

```bash
git init
git branch -M main
git add .
git commit -m "feat: launch TRACE Consulting digital platform"

git remote add origin https://github.com/YOUR-USERNAME/trace-consulting-redesign.git
git push -u origin main
```

For later changes, use this routine:

```bash
pnpm check
pnpm build
git add client/src client/public/media ENVIRONMENT_TEMPLATE.txt README.md IMPLEMENTATION_GUIDE.md
git commit -m "feat: refine TRACE website experience"
git push
```

Keep `.env.local`, `node_modules/`, `dist/`, raw videos, design-source files, and all secrets uncommitted. The provided `.gitignore` already excludes local environment files.

## D. Deploy in Vercel

Import the GitHub repository in the Vercel dashboard and retain the provided `vercel.json`.

| Vercel setting | Required value |
|---|---|
| Framework Preset | Vite |
| Install Command | `pnpm install` |
| Build Command | `pnpm run build` |
| Output Directory | `dist/public` |
| Node.js | 22 or newer |

`vercel.json` provides the SPA rewrite necessary for direct links such as `/projects/national-tariff-modernization` and `/services/trade-facilitation`.

### Safe Vercel environment variables

For the current static frontend, **no Vercel environment variables are required** unless you are using local asset paths. If needed, add this public setting in Vercel for Production and Preview:

```env
VITE_USE_LOCAL_MEDIA=true
```

The `VITE_OFFICE_MAP_EMBED_URL` setting is optional. Leave it blank to use the built-in free OpenStreetMap embed centered on the supplied office location, **23.784148, 90.392863**.

Do not copy any Manus-only environment variables, including `BUILT_IN_FORGE_*`, `VITE_FRONTEND_FORGE_*`, `JWT_SECRET`, or `OAUTH_SERVER_URL`, into Vercel. They are not required for the standalone static site.

## E. Contact form before public launch

The visible contact form currently does not send email. Choose a server-side integration before telling visitors that contact requests are delivered.

| Option | Required private settings | Result |
|---|---|---|
| Vercel Function + Resend | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Direct branded email workflow. |
| Form service | Provider-specific endpoint and dashboard configuration | Managed submission workflow. |
| CRM webhook via server relay | CRM secret held server-side | Qualified lead hand-off. |

Never put those private values in `.env.example`, `VITE_*` variables, browser code, or a public GitHub repository.

## F. Final pre-launch check

Confirm that all routes, external source links, mobile navigation, office map, hero carousel, people rail, partner rail, and contact fallback content work at the production URL. Vercel will preserve the React/Framer Motion animation system because it serves the same compiled frontend assets.
