# TRACE Consulting — GitHub Push Guide

Use this file after downloading the complete repository. For Vercel settings and environment guidance, use `VERCEL_GITHUB_QUICKSTART.md`.

## Create the GitHub repository

Create a new GitHub repository as **empty**: do not create a README, `.gitignore`, or license through GitHub. Then open a terminal at the root of the downloaded `trace-consulting-redesign` folder.

## Install and verify first

```bash
pnpm install
cp ENVIRONMENT_TEMPLATE.txt .env.local
pnpm check
pnpm build
```

Review `client/public/media/README.md` before enabling local media. If the repository has all approved `/media/...` assets in place, keep `VITE_USE_LOCAL_MEDIA=true` in `.env.local`; otherwise replace remaining preview-only asset paths in `client/src/data/traceData.tsx` before independent deployment.

## First commit and push

Replace the GitHub URL only in the `git remote add` command.

```bash
git init
git branch -M main
git add .
git commit -m "feat: launch TRACE Consulting digital platform"

git remote add origin https://github.com/YOUR-USERNAME/trace-consulting-redesign.git
git push -u origin main
```

If asked to authenticate over HTTPS, use GitHub’s browser sign-in, GitHub CLI, or a Personal Access Token. Do not place a GitHub token in this project’s source code or environment files.

## Later changes

Use focused commits after each tested change. These examples are safe to copy and adapt:

```bash
# Visual, interaction, route, or content-model updates
git add client/src
git commit -m "feat: refine TRACE website experience"

# Approved images or logo updates
git add client/public/media client/src/data/traceData.tsx
git commit -m "assets: add approved TRACE visual media"

# Deployment and handoff documentation updates
git add README.md IMPLEMENTATION_GUIDE.md VERCEL_GITHUB_QUICKSTART.md \
  ENVIRONMENT_TEMPLATE.txt VERCEL_ENVIRONMENT_VARIABLES.txt vercel.json
git commit -m "docs: update TRACE deployment handoff"

pnpm check
pnpm build
git push
```

## Do not commit

Do not add `.env.local`, `node_modules/`, `dist/`, raw video files, editable design masters, access tokens, mail credentials, CRM keys, or other private material. The included `.gitignore` excludes the standard local environment and build files.
