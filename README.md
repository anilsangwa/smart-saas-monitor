# Smart SaaS Monitor

Lightweight monorepo containing a Next.js frontend, a NestJS backend, and a small monitoring agent.

## Table of contents
- Quick start
- Project structure
- Running (development)
- Ports and environment
- Notes about recent changes
- Troubleshooting

## Quick start

1. Install dependencies (from repo root):

```powershell
npm install
```

2. Start all dev services in parallel (uses Turbo):

```powershell
npm run dev
```

This runs `npx turbo run dev --parallel` which starts the `frontend`, `backend`, and `monitoring-agent` packages.

## Project structure

- `apps/frontend` — Next.js app (Turbopack). Use `npm run dev` inside the folder to start only the frontend.
- `apps/backend` — NestJS API server. Use `npm run dev` inside the folder to start only the backend (watch mode).
- `apps/monitoring-agent` — Small Node agent that samples CPU metrics.
- `turbo.json` — Turbo task configuration.
- Root `package.json` — Workspaces + turbo dev script.

## Running (development)

- Start everything (recommended):

```powershell
npm run dev
```

- Run a single app (example: frontend):

```powershell
# from repo root
npx --workspace=frontend npm run dev
# or from inside the folder
cd apps/frontend; npm run dev
```

## Ports and environment

- Frontend (Next.js): localhost:3000
- Backend (NestJS): defaults to localhost:4000 (can be overridden with `PORT`)
- Monitoring agent: runs locally and prints metrics to stdout every 5s

To change a port, set the `PORT` environment variable for the package (e.g., `PORT=5000 npm run dev`).

## Notes about recent changes

While verifying the dev run, the following adjustments were made for smoother local development:

- Added `workspaces` to root `package.json` and a root `dev` script (`npx turbo run dev --parallel`).
- Added `packageManager: "npm@10.9.3"` to root and package-level `package.json` files to satisfy Turbo's check.
- Renamed `pipeline` → `tasks` in `turbo.json` (Turbo v2 schema change).
- Added `dev` scripts where missing:
	- `apps/backend`: `dev` -> `npm run start:dev`
	- `apps/monitoring-agent`: `dev` -> `node src/index.js`
- Monitoring agent fixes:
	- Marked `apps/monitoring-agent` as ESM (`type: "module"`) and implemented an async `getCpuLoad` sampler.
- Backend default port changed from `3000` → `4000` and it will now try subsequent ports if the first is in use (useful when frontend uses 3000).

If you prefer different defaults (e.g., make backend fail fast on port conflict or pin ports in `.env`), I can update that.

## Troubleshooting

- Turbo complains about `packageManager` — ensure root `package.json` has a `packageManager` field (we set it to your npm version).
- `next` not found during `npx turbo run dev` — run `npm install` at repo root to install workspace dependencies.
- Backend port in use — either stop the other service using the port or set `PORT` for the backend before starting.
