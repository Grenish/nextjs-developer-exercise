<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a single Next.js 16 app (npm; Node 20+ recommended). No database or external services are configured in the starter repo.

- **Install:** `npm ci` (lockfile-driven; run from repo root)
- **Dev server:** `npm run dev -- --hostname 0.0.0.0 --port 3000` — also started automatically via the environment `start` script
- **Lint / build:** `npm run lint`, `npm run build`
- **Tests:** none configured yet

When implementing the blogging exercise, add a database and any required env vars; update `.cursor/environment.json` `install`/`start` accordingly.
