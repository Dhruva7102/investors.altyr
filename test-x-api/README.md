# X API Test App (throwaway)

This is a tiny local test app to verify X API v2 profile lookup works (avatar + follower counts) before integrating it into the main product.

## Why there’s a server

Browsers commonly block direct calls to `https://api.x.com` due to **CORS**.  
So this includes a minimal local proxy (`server.js`) that forwards requests to X.

## Run it

From the repo root:

```bash
cd test-x-api
node server.js
```

Then open:

- `test-x-api/index.html` (double-click, or drag into browser)

## Use it

- Paste your **Bearer token** into the UI
- Enter a username like `edgerxnyc` or `@edgerxnyc`
- Click **Fetch profile**

It will display:
- Avatar
- Name
- Verified
- Followers / Following / Posts

## Notes

- The bearer token is **not** stored to disk by the UI.
- If you hit **429 Too Many Requests**, wait for the rate limit window to reset and retry.

## Endpoints (proxy)

- `GET http://localhost:8787/health`
- `GET http://localhost:8787/profile?username=edgerxnyc`


