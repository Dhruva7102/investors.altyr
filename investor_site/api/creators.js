/**
 * Vercel Serverless Function: /api/creators
 *
 * Flow:
 * 1) Read creator handles from environment variable (comma-separated) or fallback to empty array
 * 2) Fetch user profile info from X API v2 for each handle
 * 3) Return normalized creator objects to the frontend
 *
 * Env Vars (Vercel Project → Settings → Environment Variables):
 * - X_BEARER_TOKEN (required)
 * - CREATOR_HANDLES (optional, comma-separated list like: "elonmusk,barackobama,@billgates")
 *   If not set, returns empty array (no creators shown)
 */

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function normalizeHandle(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  if (!s) return null;
  return s.startsWith("@") ? s.slice(1) : s;
}

function parseHandlesFromEnv(envString) {
  if (!envString) return [];
  return envString
    .split(",")
    .map((h) => normalizeHandle(h))
    .filter(Boolean);
}

async function fetchXUsersByUsernames({ bearerToken, usernames }) {
  if (!usernames.length) return [];
  
  // X API v2: up to 100 usernames per call.
  const chunks = [];
  for (let i = 0; i < usernames.length; i += 100) chunks.push(usernames.slice(i, i + 100));

  const results = [];
  for (const chunk of chunks) {
    const params = new URLSearchParams();
    params.set("usernames", chunk.join(","));
    params.set("user.fields", ["profile_image_url", "public_metrics", "verified", "name"].join(","));

    const url = `https://api.x.com/2/users/by?${params.toString()}`;
    const r = await fetch(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (!r.ok) {
      const text = await r.text().catch(() => "");
      throw new Error(`X API error ${r.status}: ${text || r.statusText}`);
    }

    const data = await r.json();
    if (Array.isArray(data?.data)) results.push(...data.data);
    if (data?.errors) {
      // Log errors but continue with valid users
      console.warn("X API errors:", data.errors);
    }
  }

  return results;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { error: "Method not allowed" });
  }

  try {
    const bearerToken = process.env.X_BEARER_TOKEN;
    const creatorHandlesEnv = process.env.CREATOR_HANDLES || "";

    if (!bearerToken) return json(res, 500, { error: "Missing env var: X_BEARER_TOKEN" });

    // Parse handles from environment variable (comma-separated)
    const handles = parseHandlesFromEnv(creatorHandlesEnv);

    if (!handles.length) {
      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
      return json(res, 200, []);
    }

    // Fetch user data from X API
    const users = await fetchXUsersByUsernames({ bearerToken, usernames: handles });

    const byUsername = new Map();
    for (const u of users) {
      if (!u?.username) continue;
      byUsername.set(String(u.username).toLowerCase(), u);
    }

    // Build response array matching handles order
    const out = handles
      .map((h) => {
        const u = byUsername.get(h.toLowerCase());
        if (!u) return null; // Skip if X API didn't return data for this handle
        return {
          handle: u.username,
          name: u.name || u.username,
          followers: u.public_metrics?.followers_count ?? 0,
          verified: !!u.verified,
          avatarUrl: u.profile_image_url
            ? String(u.profile_image_url).replace("_normal", "_bigger")
            : null,
        };
      })
      .filter(Boolean);

    // Cache server-side a bit to avoid rate-limits
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=900");
    return json(res, 200, out);
  } catch (e) {
    console.error("API error:", e);
    return json(res, 500, { error: e?.message || "Unknown error" });
  }
}
