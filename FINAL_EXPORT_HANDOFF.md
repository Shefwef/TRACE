# TRACE Consulting — Final Export, Git, and Vercel Handoff

This guide applies to the **portrait-backed final code export**. Download the latest project checkpoint, unzip it, and open the project root in your IDE or terminal.

## 1. Keep these source files

Keep the entire downloaded project, especially the following files and folders:

| Keep | Why it matters |
|---|---|
| `client/src/` | React pages, components, animations, routes, and content model. |
| `client/public/media/` | The location for your approved team, brand, project, partner, hero, and insight assets. |
| `package.json` and `pnpm-lock.yaml` | Required dependency and package-lock definition. |
| `vercel.json` | Single-page-app rewrite and deployment configuration. |
| `ENVIRONMENT_TEMPLATE.txt` | Safe reference for browser-visible environment settings. |
| `DEPLOYMENT.md` | Contact form and production integration requirements. |
| `GIT_HANDOFF.md` | Earlier commit grouping reference. This document supersedes it for the final clean export. |

Do **not** upload or commit `.env.local`, `node_modules/`, `dist/`, private API keys, raw camera footage, editable design files, or internal notes.

## 2. Add the provided brand and portrait files

Copy the supplied files into the downloaded codebase using these exact locations and filenames:

```text
client/public/media/brand/trace-consulting-wordmark-navy.webp
client/public/media/brand/trace-consulting-wordmark-white-header-final.png

client/public/media/team/abu-saleh-muhammad-saifullah.png
client/public/media/team/ahmed-julker-nine.png
client/public/media/team/fuad-m-khalid-hossen.png
client/public/media/team/mimma-afrin.png
client/public/media/team/moudud-ahmmed-sujan.png
client/public/media/team/nabeel-khan.png
client/public/media/team/recardo-saurav-antor-halder.png
client/public/media/team/rubayat-e-shams-anik.jpg
client/public/media/team/tahsina-shiva.png
client/public/media/team/tanvir-kabir.jpg
client/public/media/team/umme-mahmuda-tama.jpg
```

The code now shows **only these portrait-backed profiles** in public team interfaces. The CEO, **Fuad M Khalid Hossen**, is featured first in the leadership hierarchy.

The hero, project, insight, innovation, and partner visuals still need your approved replacements before Vercel production deployment. Place them under `client/public/media/` using clear folders such as `hero/`, `projects/`, `insights/`, `innovations/`, and `partners/`, then replace the corresponding preview paths in `client/src/data/traceData.tsx`.

## 3. Local environment file

Copy the template into a new file called `.env.local`:

```bash
cp ENVIRONMENT_TEMPLATE.txt .env.local
```

Confirm this setting is present:

```env
VITE_USE_LOCAL_MEDIA=true
```

This setting instructs the website to use the logo and team portraits placed in `client/public/media/` instead of preview-only hosted paths. Never put email, Resend, or other private API keys in a variable beginning with `VITE_`.

## 4. Run it locally

```bash
pnpm install
pnpm dev
```

Open the local URL Vite prints in the terminal. Before proceeding, check the homepage, `/team`, one team detail route, `/projects`, `/insights`, `/contact`, and mobile responsiveness.

## 5. Create an empty repository and push

Create an **empty** GitHub repository without a README, `.gitignore`, or license. Then run the following at the downloaded project root. Replace the final URL with your repository’s HTTPS URL.

```bash
git init
git branch -M main
git add .
git commit -m "feat: launch TRACE Consulting digital platform"

git remote add origin https://github.com/YOUR-USERNAME/trace-consulting-redesign.git
git push -u origin main
```

Use these future commit messages as you revise the project:

```bash
git add client/public/media client/src/data/traceData.tsx
git commit -m "assets: add approved TRACE visual media"

git add client/src
git commit -m "feat: refine TRACE website experiences"

git add ENVIRONMENT_TEMPLATE.txt VERCEL_ENVIRONMENT_VARIABLES.txt DEPLOYMENT.md vercel.json
git commit -m "chore: update deployment configuration"
```

Before each push, run:

```bash
pnpm check
pnpm build
git push
```

## 6. Deploy with Vercel

Import the GitHub repository into Vercel. The included `vercel.json` supports the React/Wouter single-page app.

| Vercel setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `pnpm run build` |
| Install Command | `pnpm install` |
| Output Directory | `dist/public` |
| Node version | 22 or later |

Add the public variables from `.env.local` to Vercel only if they are still needed. Set `VITE_USE_LOCAL_MEDIA=true` in Vercel so the build uses the `client/public/media/` assets. The motion system is browser-side React/Framer Motion, so it will remain intact on Vercel.

## 7. Important production functionality still to connect

The **Send Message** interface currently does not send an email. It needs a server-side endpoint such as `/api/contact` plus a mail provider. A recommended configuration is Vercel Functions plus Resend:

```env
RESEND_API_KEY=your_private_key
CONTACT_TO_EMAIL=team@yourdomain.com
CONTACT_FROM_EMAIL=TRACE Website <website@yourdomain.com>
```

Set those as encrypted Vercel environment variables only. They must never appear in `.env.local` committed to Git, browser code, or a `VITE_*` variable.

The office map uses OpenStreetMap and does not require a Google Maps API key or billing account. For high-traffic usage, follow the OpenStreetMap tile policy or choose a suitable hosted tile provider.
