# Redirect Landing — Admin UI

Internal admin tool for managing Altyr URL redirect links (create + list). Deployed as a static site on Vercel.

> **Note (Apr 2026):** the public "OnlyFans vs Altyr" choice landing page has moved into [`website-frontend-service/pages/go/[slug].js`](../website-frontend-service/pages/go/%5Bslug%5D.js) and is served at `https://go.altyr.com/<slug>` (and `altyr.com/go/<slug>` as the canonical path). This repo now only hosts the admin UI. Any stale hits to `/g/:slug` are 301'd to `https://go.altyr.com/:slug` via `vercel.json`.

## Files

- `admin.html` / `admin.js` — Admin UI: set API base URL and JWT token (stored in sessionStorage), create links (creator name + OnlyFans URL), and list existing links.
- `styles.css` — Shared styling (legacy brand book; fine for an internal tool).
- `index.html` — Stub that redirects any stray hits to `go.altyr.com` (preserves the slug from `/g/:slug`).
- `vercel.json` — 301 `/g/:slug` → `https://go.altyr.com/:slug`.
- `logo.svg` — Altyr logo asset used by `admin.html`.

## Usage

1. Deploy to Vercel (or any static host).
2. Open `admin.html` (e.g. `https://onlyfans.altyr.com/admin.html`).
3. Set API base (e.g. `https://dev-api.altyr.com/v1`) and paste a valid admin/creator JWT.
4. Create a link (creator name + OnlyFans URL) or refresh the list.

## Local dev

```sh
npx serve . -p 5000
# → http://localhost:5000/admin.html
```

Point API base at a local node-service (`http://localhost:3000/v1`) and paste a token minted against that backend.

## Env (backend, for reference)

- `ALTYR_REDIRECT_BASE` — base for Altyr destination URL (default `https://dev.altyr.com`).
- `REDIRECT_LANDING_BASE_URL` — base for the short-link URL shown after creation (default `https://onlyfans.altyr.com`; can be flipped to `https://go.altyr.com` once the new domain is live).
