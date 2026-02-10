# How the rest of the web app talks to the node-service (redirect admin pattern)

## Pattern used by dev.altyr.com (website-frontend-service)

1. **Frontend** (dev.altyr.com) is the **website-frontend-service** (Next.js).
2. It never calls the node-service by IP or HTTP. It uses a single base URL:
   - **`API_URL = 'https://dev-api.altyr.com'`** (in `website-frontend-service/lib/config/creds.js` and `lib/config/index.js`).
3. All API calls go through **`getUrl(endpoint)`** in `lib/request.js`:
   - `API_HOST + "/v1" + endpoint` → **https://dev-api.altyr.com/v1/...**
4. **dev-api.altyr.com** is the **API Gateway** (KrakenD in **services/apigateway-service**).
5. The gateway routes requests to backends by config:
   - **config/settings/nodeApi.json** lists node-service endpoints (e.g. `/v1/agency`, `/v1/config`).
   - Each entry has `"host": ["node-service:3006"]` → gateway proxies to the **node-service** (port 3006).
6. So the flow is: **Browser (HTTPS) → https://dev-api.altyr.com/v1/... → Gateway (KrakenD) → node-service:3006**.

No separate “API gateway service” URL is used by the frontend; **dev-api.altyr.com is the gateway**. The frontend only knows that one HTTPS base URL.

## Applying the same pattern to redirect links

- **Admin** (onlyfans.altyr.com/admin.html) and the **redirect landing** page should use the **same** API base as the rest of the app: **`https://dev-api.altyr.com/v1`**.
- So:
  - **Admin “API base URL”**: set to **`https://dev-api.altyr.com/v1`** (or leave default when we make it the default for production).
  - **Redirect landing** (`useRedirectResolver.js`): already falls back to **`https://dev-api.altyr.com/v1`** in production when `VITE_REDIRECT_API_BASE` is unset.
- For that to work, the **gateway** must know how to route redirect-links to the node-service.

## What was done: redirect-links in the API gateway

- **services/apigateway-service/config/settings/nodeApi.json** was updated to add four routes that proxy to **node-service:3006** with **auth: false** (public or optional header auth handled by node-service):
  1. **GET /v1/redirect-links/resolve/{slug}** – resolve slug (public).
  2. **POST /v1/redirect-links/record-click** – record click (public).
  3. **GET /v1/redirect-links/simple** – list links (optional `X-Redirect-Admin-Secret`).
  4. **POST /v1/redirect-links/simple** – create link (optional `X-Redirect-Admin-Secret`).
- After the gateway is **rebuilt/redeployed** with this config, **https://dev-api.altyr.com/v1/redirect-links/...** will be served by the node-service that has the redirect-links feature (the same one behind the gateway in your deployment).

## Next steps for you

1. **Deploy the API gateway** (apigateway-service) with the updated **nodeApi.json** (build/config so that the new redirect-links entries are included).
2. Ensure the **node-service** that the gateway uses (e.g. `node-service:3006`) is the one that has the **redirect-links** routes and DB (e.g. the dev node-service that today is at 5.78.146.122:3006). If dev-api currently points at a different node-service, that backend must either have redirect-links deployed or the gateway must point to the instance that does.
3. Then:
   - Use the admin at **https://onlyfans.altyr.com/admin.html** with API base **`https://dev-api.altyr.com/v1`** (no mixed content).
   - Redirect landing at **https://onlyfans.altyr.com/g/<slug>** will resolve via **https://dev-api.altyr.com/v1** and work without any extra proxy.

## Summary

| Concern | How the rest of the app does it | Redirect admin/landing |
|--------|---------------------------------|-------------------------|
| API base URL | **https://dev-api.altyr.com** (hardcoded in website-frontend-service) | Use **https://dev-api.altyr.com/v1** |
| HTTP vs HTTPS | Always HTTPS to dev-api | Same; no HTTP API from the browser |
| Who routes to node? | API Gateway (KrakenD) via nodeApi.json | Same; redirect-links added to nodeApi.json |
| Where is node-service? | Gateway backend `node-service:3006` | Same; ensure that backend has redirect-links |
