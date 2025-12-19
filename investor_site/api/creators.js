/**
 * Vercel Serverless Function: /api/creators
 * 
 * TEMPORARILY DISABLED - X API integration commented out for now
 * Can be re-enabled in the future when ready to implement
 * 
 * Original Flow:
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

// TEMPORARILY DISABLED - Return empty array for now
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { error: "Method not allowed" });
  }

  // Return empty array - X API integration disabled
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
  return json(res, 200, []);
}

/* COMMENTED OUT - X API Integration Code (can be restored later)
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

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchXUsersByUsernames({ bearerToken, usernames }) {
  if (!usernames.length) return [];
  
  // X API v2: up to 100 usernames per call.
  const chunks = [];
  for (let i = 0; i < usernames.length; i += 100) chunks.push(usernames.slice(i, i + 100));

  const results = [];
  for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
    const chunk = chunks[chunkIdx];
    const params = new URLSearchParams();
    params.set("usernames", chunk.join(","));
    params.set("user.fields", ["profile_image_url", "public_metrics", "verified", "name"].join(","));

    const url = `https://api.x.com/2/users/by?${params.toString()}`;
    
    // Retry logic with exponential backoff for rate limits
    let retries = 3;
    let chunkSuccess = false;
    
    while (retries > 0) {
      try {
        const r = await fetch(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        // Handle rate limiting (429)
        if (r.status === 429) {
          const rateLimitReset = r.headers.get("x-rate-limit-reset");
          const resetTime = rateLimitReset ? parseInt(rateLimitReset, 10) * 1000 : null;
          const waitTime = resetTime 
            ? Math.max(0, resetTime - Date.now()) + 1000 // Add 1s buffer
            : Math.pow(2, 4 - retries) * 1000; // Exponential backoff: 16s, 8s, 4s
          
          retries--;
          
          if (retries === 0) {
            // If we have partial results, log warning and continue with next chunk
            if (results.length > 0) {
              console.warn(`X API rate limit exceeded for chunk ${chunkIdx + 1}. Returning partial results.`);
              chunkSuccess = true; // Mark as "handled" so we continue
              break;
            }
            throw new Error(`X API rate limit exceeded. Please try again later.`);
          }
          
          console.warn(`X API rate limited. Waiting ${Math.ceil(waitTime / 1000)}s before retry... (${retries} retries left)`);
          
          if (waitTime > 0 && waitTime < 300000) { // Don't wait more than 5 minutes
            await sleep(waitTime);
            continue;
          } else {
            // If we have partial results, log warning and continue
            if (results.length > 0) {
              console.warn(`X API rate limit exceeded for chunk ${chunkIdx + 1}. Returning partial results.`);
              chunkSuccess = true;
              break;
            }
            throw new Error(`X API rate limit exceeded. Please try again later.`);
          }
        }

        if (!r.ok) {
          const text = await r.text().catch(() => "");
          const errorData = text ? (() => {
            try { return JSON.parse(text); } catch { return { detail: text }; }
          })() : { detail: r.statusText };
          
          throw new Error(`X API error ${r.status}: ${errorData.detail || errorData.title || r.statusText}`);
        }

        const data = await r.json();
        if (Array.isArray(data?.data)) results.push(...data.data);
        if (data?.errors) {
          // Log errors but continue with valid users
          console.warn("X API errors:", data.errors);
        }
        
        // Success - break out of retry loop
        chunkSuccess = true;
        break;
      } catch (error) {
        retries--;
        
        // If it's not a rate limit error or we're out of retries, throw (unless we have partial results)
        if (!error.message?.includes("rate limit")) {
          // For non-rate-limit errors, throw immediately unless we have partial results
          if (results.length > 0) {
            console.warn(`X API error for chunk ${chunkIdx + 1}, but returning partial results:`, error.message);
            chunkSuccess = true;
            break;
          }
          throw error;
        }
        
        // Rate limit error and out of retries
        if (retries === 0) {
          // If we have partial results, log warning and continue
          if (results.length > 0) {
            console.warn(`X API rate limit exceeded for chunk ${chunkIdx + 1}. Returning partial results.`);
            chunkSuccess = true;
            break;
          }
          throw error;
        }
        
        // Exponential backoff for rate limit errors
        const backoffTime = Math.pow(2, 4 - retries) * 1000;
        console.warn(`X API request failed, retrying in ${backoffTime / 1000}s... (${retries} retries left)`, error.message);
        await sleep(backoffTime);
      }
    }
    
    // If chunk failed completely and we have no results at all, we would have thrown above
    // So if we get here, either the chunk succeeded or we're returning partial results
    
    // Add delay between chunks to avoid hitting rate limits
    // X API v2 free tier: 300 requests per 15 minutes
    // Adding 3s delay between chunks should keep us well under the limit
    if (chunkIdx < chunks.length - 1) {
      await sleep(3000);
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
    // Decode bearer token in case it's URL-encoded (Vercel env vars might encode it)
    let bearerToken = process.env.X_BEARER_TOKEN;
    if (bearerToken && bearerToken.includes('%')) {
      try {
        bearerToken = decodeURIComponent(bearerToken);
      } catch (e) {
        console.warn('Failed to decode bearer token, using as-is');
      }
    }
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
    
    // Handle rate limit errors with appropriate status code
    if (e?.message?.includes("rate limit") || e?.message?.includes("429")) {
      return json(res, 429, { 
        error: "X API rate limit exceeded. Please try again in a few minutes.",
        retryAfter: 300 // Suggest retrying after 5 minutes
      });
    }
    
    return json(res, 500, { error: e?.message || "Unknown error" });
  }
}
END OF COMMENTED CODE */
