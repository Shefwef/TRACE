# TRACE Consulting Digital Platform

This repository contains the TRACE Consulting public website: a **React 19, Vite, TypeScript, Tailwind CSS, Wouter, and Framer Motion** single-page application designed for institutional audiences. It includes the home experience, About, Services, Projects, Team, Insights, Innovations, Careers, and Contact routes.

## Start here

Download the complete project folder rather than individual source files. Then review the following handoff files in this order.

| File | Purpose |
|---|---|
| `IMPLEMENTATION_GUIDE.md` | Component map, routes, data model, design system, media migration, and safe editing locations. |
| `VERCEL_GITHUB_QUICKSTART.md` | Copy-ready GitHub and Vercel deployment process. |
| `ENVIRONMENT_TEMPLATE.txt` | Safe public environment-variable template. Copy to `.env.local` for local use. |
| `VERCEL_ENVIRONMENT_VARIABLES.txt` | Copy-ready public Vercel variables, with private values explicitly excluded. |
| `CLAUDE_CODE_CHANGE_BRIEF_TEMPLATE.md` | Fill-in template for future code changes with Claude Code or another IDE assistant. |
| `client/public/media/README.md` | Exact media folder convention for logos, portraits, projects, insights, and partners. |
| `FINAL_EXPORT_HANDOFF.md` | Detailed media, local-running, and production-contact guidance. |

## Local run

```bash
pnpm install
cp ENVIRONMENT_TEMPLATE.txt .env.local
pnpm dev
```

Open the URL printed by Vite. Before every deployment, run:

```bash
pnpm check
pnpm build
```

> The current Contact form is **frontend-only**. It does not send email or save a submission until a real server-side endpoint is implemented. Do not represent it as a live enquiry service before that integration is complete.

## Deployment summary

The project already includes `vercel.json` for Vite output and Wouter deep-link rewrites. Vercel will preserve the client-side animation system because Framer Motion, CSS, and image assets are compiled into the frontend build. See `VERCEL_GITHUB_QUICKSTART.md` for the exact sequence.
