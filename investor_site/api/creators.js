/**
 * Vercel Serverless Function: /api/creators
 *
 * Flow:
 * 1) Read creator handles from Airtable (server-side).
 * 2) Fetch user profile info from X API v2.
 * 3) Return normalized creator objects to the frontend.
 *
 * Env Vars (Vercel Project → Settings → Environment Variables):
 * - X_BEARER_TOKEN
 * - AIRTABLE_API_KEY
 * - AIRTABLE_BASE_ID
 * - AIRTABLE_CREATORS_TABLE (optional, default: "Creators")
 * - AIRTABLE_CREATORS_VIEW (optional)
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

function pickHandle(fields) {
  // Be tolerant to whatever you name the Airtable column.
  return (
    // Your current Creators table field id for X.com:
    // fldrBclz4LVKRnHpz
    fields?.fldrBclz4LVKRnHpz ??
    fields?.["X.com"] ??
    fields?.Handle ??
    fields?.handle ??
    fields?.Username ??
    fields?.username ??
    fields?.X ??
    fields?.x ??
    fields?.Twitter ??
    fields?.twitter ??
    fields?.["X Handle"] ??
    fields?.["Twitter Handle"] ??
    null
  );
}

async function fetchAirtableHandles({ apiKey, baseId, tableName, view, tokenDebug = "" }) {
  const params = new URLSearchParams();
  params.set("pageSize", "50");
  // Try without returnFieldsByFieldId first (works with field names)
  // If that fails, we'll fall back to field IDs
  if (view) params.set("view", view);

  let url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?${params.toString()}`;
  let r = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  // If 403, try with returnFieldsByFieldId (might need different permissions)
  if (!r.ok && r.status === 403) {
    params.set("returnFieldsByFieldId", "true");
    url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?${params.toString()}`;
    r = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
  }

  if (!r.ok) {
    const text = await r.text().catch(() => "");
    // Include base ID, table, and token prefix in error for debugging (safe to expose)
    const debugInfo = ` (baseId: ${baseId.substring(0, 8)}..., table: ${tableName}${tokenDebug})`;
    throw new Error(`Airtable error ${r.status}: ${text || r.statusText}${debugInfo}`);
  }

  const data = await r.json();
  const records = Array.isArray(data?.records) ? data.records : [];

  const handles = [];
  const metaByHandle = new Map();

  for (const rec of records) {
    const fields = rec?.fields || {};
    const handle = normalizeHandle(pickHandle(fields));
    if (!handle) continue;
    handles.push(handle);
    metaByHandle.set(handle.toLowerCase(), {
      // Optional: allow Airtable to override name/category/etc.
      name: fields?.Name ?? fields?.name ?? null,
      category: fields?.Category ?? fields?.category ?? null,
    });
  }

  // Deduplicate while preserving order
  const uniq = [];
  const seen = new Set();
  for (const h of handles) {
    const key = h.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    uniq.push(h);
  }

  return { handles: uniq, metaByHandle };
}

async function fetchXUsersByUsernames({ bearerToken, usernames }) {
  // X API v2: up to 100 usernames per call.
  const chunks = [];
  for (let i = 0; i < usernames.length; i += 100) chunks.push(usernames.slice(i, i + 100));

  const results = [];
  for (const chunk of chunks) {
    const params = new URLSearchParams();
    params.set("usernames", chunk.join(","));
    params.set("user.fields", ["profile_image_url", "public_metrics", "verified"].join(","));

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
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTable = process.env.AIRTABLE_CREATORS_TABLE || "Creators";
    const airtableView = process.env.AIRTABLE_CREATORS_VIEW || "";

    if (!bearerToken) return json(res, 500, { error: "Missing env var: X_BEARER_TOKEN" });
    if (!airtableApiKey) return json(res, 500, { error: "Missing env var: AIRTABLE_API_KEY" });
    if (!airtableBaseId) return json(res, 500, { error: "Missing env var: AIRTABLE_BASE_ID" });

    // Debug: Verify token prefix (safe - only shows first 8 chars)
    const tokenPrefix = airtableApiKey ? airtableApiKey.substring(0, 8) : "MISSING";
    const expectedPrefix = "patp3YH0"; // First 8 chars of new token
    const tokenDebug = tokenPrefix !== expectedPrefix 
      ? ` [Token prefix: ${tokenPrefix}... (expected: ${expectedPrefix}...)]`
      : ` [Token prefix: ${tokenPrefix}... ✓]`;

    const { handles, metaByHandle } = await fetchAirtableHandles({
      apiKey: airtableApiKey,
      baseId: airtableBaseId,
      tableName: airtableTable,
      view: airtableView || undefined,
      tokenDebug, // Pass debug info for error messages
    });

    if (!handles.length) {
      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
      return json(res, 200, []);
    }

    const users = await fetchXUsersByUsernames({ bearerToken, usernames: handles });

    const byUsername = new Map();
    for (const u of users) {
      if (!u?.username) continue;
      byUsername.set(String(u.username).toLowerCase(), u);
    }

    const out = handles
      .map((h) => {
        const u = byUsername.get(h.toLowerCase());
        if (!u) return null;
        const meta = metaByHandle.get(h.toLowerCase()) || {};
        return {
          handle: u.username,
          name: meta.name || u.name || u.username,
          followers: u.public_metrics?.followers_count ?? 0,
          verified: !!u.verified,
          avatarUrl: u.profile_image_url
            ? String(u.profile_image_url).replace("_normal", "_bigger")
            : null,
          category: meta.category || null,
        };
      })
      .filter(Boolean);

    // Cache server-side a bit to avoid rate-limits
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=900");
    return json(res, 200, out);
  } catch (e) {
    return json(res, 500, { error: e?.message || "Unknown error" });
  }
}


