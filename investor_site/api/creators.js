/* global process */
/**
 * Vercel Serverless Function: /api/creators
 *
 * New Flow (Airtable-only):
 * 1) Fetch Creators records from Airtable
 * 2) Filter to records with an X handle
 * 3) Return normalized creator objects to the frontend
 *
 * Env Vars (Vercel Project → Settings → Environment Variables):
 * - AIRTABLE_API_KEY (required) - Airtable Personal Access Token
 * - AIRTABLE_BASE_ID (required)
 */

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

const AIRTABLE_CREATORS_TABLE_ID = "tblTYUu6019qDOoSQ";
const AIRTABLE_X_HANDLE_FIELD = "X.com";
const AIRTABLE_FOLLOWER_COUNT_FIELD = "follower count";

function normalizeXHandle(raw) {
  if (raw === undefined || raw === null) return null;
  let s = String(raw).trim();
  if (!s) return null;

  // Handle cases like full URLs: https://x.com/username or twitter.com/username
  s = s.replace(/^https?:\/\//i, "");
  s = s.replace(/^www\./i, "");
  s = s.replace(/^x\.com\//i, "");
  s = s.replace(/^twitter\.com\//i, "");

  // Strip leading @
  s = s.replace(/^@+/, "");

  // Strip query / fragments / trailing slashes
  s = s.split("?")[0].split("#")[0].replace(/\/+$/, "");

  return s || null;
}

function parseFollowerCount(value) {
  if (value === undefined || value === null || value === "") return 0;
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.floor(value));

  const s = String(value).trim().toUpperCase();
  if (!s) return 0;

  // Handle K/M/B suffixes (e.g., "590.8K" → 590800, "1.2M" → 1200000)
  if (s.endsWith('K')) {
    const num = parseFloat(s.slice(0, -1));
    return Number.isFinite(num) ? Math.round(num * 1000) : 0;
  }
  if (s.endsWith('M')) {
    const num = parseFloat(s.slice(0, -1));
    return Number.isFinite(num) ? Math.round(num * 1000000) : 0;
  }
  if (s.endsWith('B')) {
    const num = parseFloat(s.slice(0, -1));
    return Number.isFinite(num) ? Math.round(num * 1000000000) : 0;
  }

  // Plain number (remove commas)
  const cleaned = s.replace(/,/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0;
}

async function fetchAirtableAllRecords({ apiKey, baseId, tableId }) {
  const records = [];
  let offset = null;

  // Airtable returns up to 100 records per request by default.
  do {
    const url = new URL(`https://api.airtable.com/v0/${baseId}/${tableId}`);
    if (offset) url.searchParams.set("offset", offset);

    const r = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const data = await r.json().catch(() => null);
    if (!r.ok) {
      const msg =
        data?.error?.message ||
        data?.error ||
        data?.message ||
        `Airtable error ${r.status}`;
      throw new Error(msg);
    }

    if (Array.isArray(data?.records)) records.push(...data.records);
    offset = data?.offset || null;
  } while (offset);

  return records;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey) return json(res, 500, { error: "Missing env var: AIRTABLE_API_KEY" });
    if (!baseId) return json(res, 500, { error: "Missing env var: AIRTABLE_BASE_ID" });

    const records = await fetchAirtableAllRecords({
      apiKey,
      baseId,
      tableId: AIRTABLE_CREATORS_TABLE_ID,
    });

    const creators = records
      .map((record) => {
        const fields = record?.fields || {};
        const handle = normalizeXHandle(fields[AIRTABLE_X_HANDLE_FIELD]);
        if (!handle) return null;

        return {
          handle,
          followers: parseFollowerCount(fields[AIRTABLE_FOLLOWER_COUNT_FIELD]),
        };
      })
      .filter(Boolean);

    // Cache a bit (Airtable is stable enough for this UI)
    res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=600");
    return json(res, 200, { creators });
  } catch (e) {
    console.error("Airtable /api/creators error:", e);
    return json(res, 500, { error: e?.message || "Unknown error" });
  }
}
