/**
 * Minimal local proxy for X API v2 to avoid browser CORS restrictions.
 *
 * Why: Browsers typically block direct requests to https://api.x.com via CORS.
 * This server forwards requests from the local HTML page to X API.
 *
 * Usage:
 *   cd test-x-api
 *   node server.js
 *
 * Then open index.html and set Proxy base URL to http://localhost:8787
 */

import http from "node:http";
import { URL } from "node:url";

const PORT = Number(process.env.PORT || 8787);

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Content-Length", Buffer.byteLength(payload));
  res.end(payload);
}

function setCors(res) {
  // Local tool only; allow all origins.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type,Accept");
  res.setHeader("Access-Control-Max-Age", "86400");
}

function normalizeHandle(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  return s.startsWith("@") ? s.slice(1) : s;
}

function decodeIfEncoded(token) {
  const t = String(token || "").trim();
  if (!t) return "";
  if (!t.includes("%")) return t;
  try {
    return decodeURIComponent(t);
  } catch {
    return t;
  }
}

function getBearerFromAuthHeader(authHeader) {
  const h = String(authHeader || "").trim();
  if (!h) return "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : "";
}

async function fetchXUser({ bearerToken, username }) {
  const params = new URLSearchParams();
  params.set("usernames", username);
  params.set("user.fields", ["profile_image_url", "public_metrics", "verified", "name"].join(","));

  const url = `https://api.x.com/2/users/by?${params.toString()}`;

  const r = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      Accept: "application/json",
    },
  });

  const text = await r.text().catch(() => "");
  const contentType = r.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const body = isJson
    ? (() => {
        try {
          return text ? JSON.parse(text) : null;
        } catch {
          return { detail: text };
        }
      })()
    : { detail: text || r.statusText };

  if (!r.ok) {
    const msg = body?.detail || body?.title || r.statusText || "Request failed";
    return {
      ok: false,
      status: r.status,
      body: { error: msg, ...body },
    };
  }

  const user = Array.isArray(body?.data) ? body.data[0] : null;
  if (!user) {
    return {
      ok: false,
      status: 404,
      body: { error: "User not found" },
    };
  }

  return {
    ok: true,
    status: 200,
    body: {
      handle: user.username,
      name: user.name || user.username,
      verified: !!user.verified,
      avatarUrl: user.profile_image_url
        ? String(user.profile_image_url).replace("_normal", "_bigger")
        : null,
      public_metrics: user.public_metrics || {},
      raw: user, // useful for debugging while testing
    },
  };
}

const server = http.createServer(async (req, res) => {
  setCors(res);

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  if (url.pathname === "/health") {
    return sendJson(res, 200, { ok: true });
  }

  if (url.pathname !== "/profile") {
    return sendJson(res, 404, { error: "Not found. Use /profile?username=..." });
  }

  const username = normalizeHandle(url.searchParams.get("username"));
  if (!username) return sendJson(res, 400, { error: "Missing query param: username" });

  const bearerToken = decodeIfEncoded(getBearerFromAuthHeader(req.headers.authorization));
  if (!bearerToken) return sendJson(res, 401, { error: "Missing Authorization Bearer token" });

  try {
    const out = await fetchXUser({ bearerToken, username });
    return sendJson(res, out.status, out.body);
  } catch (e) {
    return sendJson(res, 500, { error: e?.message || "Unknown server error" });
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[x-api-test] proxy running on http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`[x-api-test] endpoints: GET /health, GET /profile?username=...`);
});


