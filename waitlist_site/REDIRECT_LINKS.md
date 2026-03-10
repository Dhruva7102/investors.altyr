# Redirect links (OnlyFans / Altyr)

Redirect links let creators share a single URL that shows an Altyr landing (“OnlyFans or Altyr?”) and then redirects to their OnlyFans or Altyr profile.

## URL format

Links use the **onlyfans** subdomain so when shared you see **onlyfans.altyr.com**:

- **Production:** `https://onlyfans.altyr.com/g/<slug>` (e.g. `https://onlyfans.altyr.com/g/7dzi5mov`)
- **Local dev:** `http://localhost:5173/g/<slug>` (waitlist app) and ensure the node-service API is on `http://localhost:3000/v1`

The default base URL is set to `https://onlyfans.altyr.com` in the backend; override with `REDIRECT_LANDING_BASE_URL` if you use a different host.

## DNS for onlyfans.altyr.com (Vercel)

The domain **onlyfans.altyr.com** is added to the **waitlist-altyr** project in Vercel. To make it live, add this record at your DNS provider (e.g. Cloudflare for altyr.com):

| Type | Name   | Content    |
|------|--------|------------|
| A    | onlyfans | 76.76.21.21 |

After the record propagates, Vercel will issue SSL and `https://onlyfans.altyr.com` will serve the same waitlist app (admin at `/admin.html`, redirect landing at `/g/:slug`).

## Why curl works but the browser (or dev) doesn’t

- **curl** hits the API **directly** (e.g. `curl http://5.78.146.122:3006/v1/redirect-links/resolve/r0od58cy`), so you get the JSON and the link “works.”
- **Browser** doesn’t call that URL by default. The redirect **page** (onlyfans.altyr.com or localhost:5173) runs JS that does a `fetch()` to whatever **API_BASE** was set at build/run time:
  - **Local dev (no env):** `API_BASE` = `http://localhost:3000/v1` → the page calls **your** machine. If node-service isn’t running on 3000 (or has different data), resolve fails → “invalid or expired.”
  - **Production (onlyfans.altyr.com):** built app uses `https://dev-api.altyr.com/v1` when env is unset; that host doesn’t have redirect-links yet → 404 → same error.

So the fix is: **the page must call the same API you use with curl** (the one that has the links).

**Fix for local dev (browser):**  
Point the redirect page at the same API as curl. In `waitlist_site` add a `.env` or `.env.local`:

```bash
VITE_REDIRECT_API_BASE=http://5.78.146.122:3006/v1
```

Restart the dev server (`npm run dev`). Then open `http://localhost:5173/g/<slug>` — the page will resolve via 5.78.146.122:3006, same as curl.

**Fix for production:**  
Set **`VITE_REDIRECT_API_BASE`** in Vercel to an **HTTPS** API that has redirect-links (e.g. when dev-api.altyr.com gets the routes, or an HTTPS proxy to the dev server), then redeploy.

## “This link is invalid or expired” on the redirect page

When you open `https://onlyfans.altyr.com/g/<slug>` and see this message, the **redirect landing page** is calling the wrong API (or one that doesn’t have redirect-links):

- The landing uses **`VITE_REDIRECT_API_BASE`** at build time. If unset, production builds use **`https://dev-api.altyr.com/v1`**; local dev uses **`http://localhost:3000/v1`**.
- If the API you use for creating links (e.g. `http://5.78.146.122:3006/v1`) is different from what the deployed page calls, resolve will fail and the page shows “invalid or expired”.

**Fix:**

1. **Same API for create and resolve**  
   Build the waitlist with the API that actually has the links. In Vercel, set **`VITE_REDIRECT_API_BASE`** to that base (e.g. `https://dev-api.altyr.com/v1` once redirect-links are deployed there, or an HTTPS URL that proxies to your dev node-service). Then redeploy the waitlist.
2. **Local testing**  
   Either run node-service on port 3000 and use the default, or set **`VITE_REDIRECT_API_BASE=http://5.78.146.122:3006/v1`** in `.env` / `.env.local` so the redirect page uses the same API as curl (see “Why curl works but the browser doesn’t” above).

## “Connection failed” on onlyfans.altyr.com

If `https://onlyfans.altyr.com/g/7dzi5mov` (or `https://go.altyr.com/...`) fails to load:

1. **Not deployed** — The host (onlyfans.altyr.com or go.altyr.com) must point to where the **waitlist app** is served (e.g. Vercel). Deploy the waitlist_site and point the subdomain to that deployment.
2. **DNS** — Add a CNAME (or A) for `onlyfans.altyr.com` (or `go.altyr.com`) to your hosting (e.g. Vercel alias).
3. **Local testing** — Use `http://localhost:5173/g/<slug>` with the waitlist dev server and node-service on port 3000. The generated link will still show `https://onlyfans.altyr.com/g/...` in the admin; that URL only works once that host is deployed and DNS is set.

## How to find the node-service (API) URL

If you don’t know the API base URL for the admin (e.g. for a deployed/staging node-service), you can infer it from the live app:

1. **Browser DevTools → Network**
   - Open the main Altyr app in the browser (e.g. dev.altyr.com or wherever the app that calls the API runs).
   - Open DevTools (F12 or right‑click → Inspect) → **Network** tab.
   - Filter by **Fetch/XHR** (or leave All).
   - Use the app (e.g. log in, load a page that fetches data). API requests will show up.
   - Click a request and check **Request URL**. The base is everything up to and including `/v1` (e.g. `https://dev-api.altyr.com/v1/...` → API base = `https://dev-api.altyr.com/v1`). Use that in the redirect admin **Settings → API base URL**.

2. **Console snippet (same tab as the app)**
   - While on the Altyr app page, open the **Console** tab and run:
   ```js
   (function(){
     var orig = window.fetch;
     window.fetch = function(){
       var url = typeof arguments[0] === 'string' ? arguments[0] : (arguments[0] && arguments[0].url);
       if (url && url.includes('/v1/')) console.log('API base likely:', url.replace(/\/v1\/.*$/, '/v1'));
       return orig.apply(this, arguments);
     };
     console.log('Fetch logger active. Trigger some app actions, then check logs for "API base likely".');
   })();
   ```
   - Trigger some actions in the app (e.g. navigate, refresh). The console will log candidate API base URLs (the first part of any request that contains `/v1/`).

3. **Codebase / team**
   - Search the repo for `API_URL`, `dev-api`, `api.altyr.com`, or `baseURL` (e.g. in `website-frontend-service`, config files).  
   - Or ask the team for the “node-service” or “backend API” base URL (dev/staging).

## Testing the redirect flow (Basic auth at gateway)

After deploying API Gateway, node-service, and the waitlist (admin + landing), use these checks. All use **https://dev-api.altyr.com/v1** unless you override for local dev.

### 1. Public endpoints (no auth)

**Resolve a slug** (same as the redirect landing page):

```bash
curl -s "https://dev-api.altyr.com/v1/redirect-links/resolve/YOUR_SLUG"
```

- Success: JSON with `platform`, `targetUrl`, `slug`, etc.
- 404: no link for that slug or API not deployed.

**Record a click** (optional, for analytics):

```bash
curl -s -X POST "https://dev-api.altyr.com/v1/redirect-links/record-click" \
  -H "Content-Type: application/json" \
  -d '{"slug":"YOUR_SLUG"}'
```

### 2. Admin endpoints (Basic auth)

Gateway requires **Basic auth** for list and create. Credentials: **`altyr`** / **`admin@altyr.com`** (same as website-frontend-service).

**List links:**

```bash
curl -s -u "altyr:admin@altyr.com" "https://dev-api.altyr.com/v1/redirect-links/simple?skip=0&limit=10"
```

- Success: JSON array of links.
- 401: wrong/missing auth.

**Create a link:**

```bash
curl -s -X POST "https://dev-api.altyr.com/v1/redirect-links/simple" \
  -u "altyr:admin@altyr.com" \
  -H "Content-Type: application/json" \
  -d '{"platform":"onlyfans","targetUrl":"https://onlyfans.com/creator","slug":"mytest12"}'
```

- Success: JSON with the created link (including `slug`).
- 401: wrong/missing auth.
- 400/409: validation or slug already exists.

### 3. Admin UI (browser)

1. Open **https://onlyfans.altyr.com/admin.html** (or your waitlist deploy).
2. **Settings:** Leave **API base URL** blank → it uses **https://dev-api.altyr.com/v1**.
3. **Admin password:** Leave blank (not used with dev-api Basic auth).
4. **Save settings**, then:
   - **List links** – should show existing links (uses Basic auth under the hood).
   - **Create link** – fill platform, target URL, optional slug → Create. Should succeed and appear in the list.

If list/create fail with 401, the gateway may not be deployed with the Basic auth config for `/v1/redirect-links/simple`.

### 4. Redirect landing page (end-to-end)

1. Create a link in the admin (or via curl) and note the **slug**.
2. Open **https://onlyfans.altyr.com/g/<slug>** in a browser (or **http://localhost:5173/g/<slug>** if testing locally with the same API).
3. You should see the “OnlyFans or Altyr?” style landing, then (depending on the app) a redirect or link to the `targetUrl`.
4. If you see “This link is invalid or expired”, the page is calling an API that doesn’t have that slug (or the API base is wrong). Ensure the deployed waitlist uses **https://dev-api.altyr.com/v1** (default when `VITE_REDIRECT_API_BASE` is unset).

### Quick checklist

| Check | Command or action |
|-------|--------------------|
| Resolve (public) | `curl -s "https://dev-api.altyr.com/v1/redirect-links/resolve/SLUG"` |
| List (Basic auth) | `curl -s -u "altyr:admin@altyr.com" "https://dev-api.altyr.com/v1/redirect-links/simple?limit=5"` |
| Create (Basic auth) | `curl -s -X POST ... -u "altyr:admin@altyr.com" ... /v1/redirect-links/simple` |
| Admin UI | onlyfans.altyr.com/admin.html → List / Create with API base blank |
| Landing | onlyfans.altyr.com/g/SLUG → landing then redirect |

---

## Scaling: how many links?

- **No hard limit.** Each link is one document keyed by an 8-character alphanumeric slug.
- **Slug space:** 36^8 ≈ 2.8 trillion possible slugs; collision chance is negligible for millions of links.
- **Database:** The `redirectLinks` collection has a **unique index on `slug`**, so resolve and create-by-slug are single-doc lookups and scale to millions of links without issue.
- **API:** Resolve is a single find by slug; list is paginated (skip/limit). Both are easily supported at high volume.
