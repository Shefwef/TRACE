# TRACE Consulting — What to Download and Push

## Download one complete code package

Download the latest **TRACE website project export**. Keep the project folder intact; it includes the working React app, routes, animations, Vercel configuration, and source data.

> Do not download isolated `client/src` files only. You need the full project root so `package.json`, `pnpm-lock.yaml`, `vercel.json`, and the app source remain aligned.

## Keep these files in your GitHub repository

```text
client/
server/
shared/
patches/
package.json
pnpm-lock.yaml
vite.config.ts
tsconfig.json
tsconfig.node.json
vercel.json
.gitignore
ENVIRONMENT_TEMPLATE.txt
DEPLOYMENT.md
FINAL_EXPORT_HANDOFF.md
DOWNLOAD_CHECKLIST.md
```

The `client/public/media/` folders should also be committed after you add your approved images, videos, and logos.

## Markdown and text handoff files

| File | Keep in GitHub? | Purpose |
|---|---:|---|
| `FINAL_EXPORT_HANDOFF.md` | Yes | Main setup, asset, Git, Vercel, and production-integration guide. |
| `DEPLOYMENT.md` | Yes | Contact-form, mail-provider, and deployment requirements. |
| `DOWNLOAD_CHECKLIST.md` | Yes | This short download and push reference. |
| `GIT_HANDOFF.md` | Optional | Older logical-commit reference; the final export handoff is the primary guide. |
| `ENVIRONMENT_TEMPLATE.txt` | Yes | Safe public environment-variable template. |

Keep the following design documents outside the deployed app or in a `/docs` folder if you want Claude Code to reference them:

```text
trace-futuristic-redesign-blueprint.md
trace_page_context_appendix.md
trace_redesign_findings_phase1.md
```

They contain design, content, and research context. They are optional for deployment but useful for future design changes.

## Add local assets before the first production deployment

Add approved files inside `client/public/media/`:

```text
brand/trace-consulting-wordmark-navy.webp
brand/trace-consulting-wordmark-white-header-final.png
team/               # named team portraits
hero/               # approved policy/trade video posters or optimized video files
projects/           # project covers
insights/           # article/video/publication thumbnails
innovations/        # product screenshots
partners/           # approved partner SVG/PNG logos
```

Then set the following in a local `.env.local` file and in Vercel project settings:

```env
VITE_USE_LOCAL_MEDIA=true
```

Create it from the template:

```bash
cp ENVIRONMENT_TEMPLATE.txt .env.local
```

Never commit `.env.local`, API keys, Resend keys, or other secrets.

## Minimal GitHub push sequence

Create an empty GitHub repository without a README, license, or `.gitignore`. In the downloaded project root, run:

```bash
pnpm install
pnpm check
pnpm build

git init
git branch -M main
git add .
git commit -m "feat: launch TRACE Consulting digital platform"
git remote add origin https://github.com/YOUR-USERNAME/trace-consulting-redesign.git
git push -u origin main
```

For small changes afterward:

```bash
git add client/src client/public/media
git commit -m "feat: refine TRACE homepage and content"
pnpm check && pnpm build
git push
```
