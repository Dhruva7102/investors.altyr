# Redirect Landing (Option 4)

Minimal static landing for the Altyr URL redirect tool. When users click a creator's proxy link (e.g. `https://onlyfans.altyr.com/g/xyz`), they see an Altyr-branded page asking "OnlyFans or Altyr?" and are redirected after their choice.

## Setup

1. Set the API base URL before loading the page. Either:
   - In `index.html`, set `window.REDIRECT_API_BASE` to your node-service (or API gateway) base. If the API is under a version path, include it (e.g. `https://dev-api.altyr.com/v1` or `http://localhost:3000/v1`), or
   - Deploy with an env that injects it (e.g. Vercel build env or a small serverless rewrite that injects a script).

2. Deploy to Vercel (or any static host). The `vercel.json` rewrites `/g/:slug` to `/index.html` so the single page can read the slug from the path.

## Local dev

Serve the folder with any static server. For path `/g/xyz` to work you need to either:

- Serve with a server that rewrites `/g/*` to `/index.html`, or
- Open `index.html` and test with a fake path by setting `window.location.pathname` in the console, or use a local server like `npx serve -s .` and hit `http://localhost:3000/g/testslug` (serve may not rewrite; then use Vercel dev or similar).

To test against a local node-service (default in index.html is `http://localhost:3000/v1`):

1. Start node-service (with MongoDB and env set).
2. Seed a test link: from `services/node-service` run `npm run seed:redirect-link` (requires `MONGODB_URL` in env or `.env`). This inserts a link with slug `test` pointing at onlyfans.com and dev.altyr.com.
3. Serve redirect-landing (e.g. `npx serve redirect-landing -p 5000`) and open `http://localhost:5000/g/test`.
4. Or use the admin page: open `http://localhost:5000/admin.html`, set API base to `http://localhost:3000/v1` and paste a valid JWT, then create a link or refresh the list.

## Admin page

- **`admin.html`** — Admin UI: set API base URL and JWT token (stored in sessionStorage), create links (creator name + OnlyFans URL), and list existing links. Auth is via the token you paste; the create and list APIs require a valid user or admin JWT from your auth server.
- **`admin.js`** — Handles create (POST) and list (GET) with the token in the `Authorization` header.

Open `admin.html` (e.g. `https://onlyfans.altyr.com/admin.html` or `http://localhost:5000/admin.html`), set API base and token, then create or list links.

## Files

- `index.html` — Single page; loading, error, and choice screens.
- `redirect.js` — Reads slug from path, calls resolve API, renders buttons, calls record-click then redirects.
- `admin.html` / `admin.js` — Admin page (create + list links; token auth).
- `styles.css` — Altyr brand (BRAND_BOOK).
- `vercel.json` — Rewrites for `/g/:slug`.

## Env (backend)

Backend (node-service) can use:

- `ALTYR_REDIRECT_BASE` — Base for Altyr destination URL (default `https://dev.altyr.com`).
- `REDIRECT_LANDING_BASE_URL` — Base for proxy URL shown when creating links (default `https://onlyfans.altyr.com`).
