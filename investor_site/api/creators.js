/**
 * Vercel Serverless Function: /api/creators
 * 
 * Fetches creator data from Airtable
 * 
 * Env Vars (Vercel Project → Settings → Environment Variables):
 * - AIRTABLE_API_KEY (required)
 * - AIRTABLE_BASE_ID (required)
 * - AIRTABLE_CREATORS_TABLE (required)
 */

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

/**
 * Parse Airtable's K/M notation to actual numbers
 * Examples: "196K" → 196000, "1.2M" → 1200000, "805.5K" → 805500
 * @param {string|number} value - The value to parse
 * @returns {number} Parsed number or 0 if invalid
 */
function parseFollowerNotation(value) {
  // If already a number, return it
  if (typeof value === 'number') {
    return value;
  }
  
  // If not a string, try to convert to number
  if (typeof value !== 'string') {
    return Number(value) || 0;
  }
  
  // Trim whitespace
  const str = value.trim();
  
  // If empty, return 0
  if (!str) {
    return 0;
  }
  
  // Check for K/k notation (thousands)
  const kMatch = str.match(/^([\d.]+)\s*[Kk]$/);
  if (kMatch) {
    const num = parseFloat(kMatch[1]);
    return Math.round(num * 1000);
  }
  
  // Check for M/m notation (millions)
  const mMatch = str.match(/^([\d.]+)\s*[Mm]$/);
  if (mMatch) {
    const num = parseFloat(mMatch[1]);
    return Math.round(num * 1000000);
  }
  
  // Check for B/b notation (billions) - just in case
  const bMatch = str.match(/^([\d.]+)\s*[Bb]$/);
  if (bMatch) {
    const num = parseFloat(bMatch[1]);
    return Math.round(num * 1000000000);
  }
  
  // If no notation found, try to parse as regular number
  const num = parseFloat(str);
  return isNaN(num) ? 0 : Math.round(num);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { error: "Method not allowed" });
  }

  try {
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_CREATORS_TABLE = process.env.AIRTABLE_CREATORS_TABLE;

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_CREATORS_TABLE) {
      console.error("Missing Airtable environment variables");
      return json(res, 500, { error: "Server configuration error" });
    }

    // Fetch all records from Airtable
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_CREATORS_TABLE}`;
    
    const response = await fetch(airtableUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Airtable API error:", response.status, errorText);
      return json(res, 500, { error: "Failed to fetch creator data" });
    }

    const data = await response.json();
    
    if (!data.records || !Array.isArray(data.records)) {
      console.error("Invalid Airtable response format");
      return json(res, 500, { error: "Invalid data format" });
    }

    // Transform Airtable records to creator objects
    const creators = data.records
      .map(record => {
        const fields = record.fields;
        
        // Log available fields for debugging (only log first record)
        if (data.records.indexOf(record) === 0) {
          console.log('Available Airtable fields:', Object.keys(fields));
        }
        
        // Get the handle from X.com field (field ID: fldrBclz4LVKRnHpz)
        const handle = fields['X.com'] || fields.handle || fields.Handle;
        
        if (!handle) return null;

        // Get followers count - field name is 'follower count' in Airtable
        let followers = fields['follower count']
          || fields['Follower Count']
          || fields['follower_count'] 
          || fields.follower_count
          || fields.Followers 
          || fields.followers 
          || fields['X Followers']
          || fields['x_followers']
          || 0;
        
        // Log the first record's follower value for debugging
        if (data.records.indexOf(record) === 0) {
          console.log('First record followers value (raw):', followers, 'Type:', typeof followers);
          console.log('follower count field value:', fields['follower count']);
        }
        
        // Parse the follower count (handles K/M notation from Airtable)
        followers = parseFollowerNotation(followers);
        
        // Log parsed value for debugging
        if (data.records.indexOf(record) === 0) {
          console.log('First record followers value (parsed):', followers);
        }

        return {
          handle: handle.replace('@', ''), // Remove @ if present
          name: fields.Name || fields.name || handle,
          avatarUrl: fields.Avatar || fields.avatar || fields['Profile Image'] || null,
          followers: followers,
          verified: fields.Verified || fields.verified || false,
          category: fields.Category || fields.category || null,
        };
      })
      .filter(Boolean); // Remove null entries

    // Cache for 5 minutes
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=900");
    return json(res, 200, creators);

  } catch (e) {
    console.error("API error:", e);
    return json(res, 500, { error: e?.message || "Unknown error" });
  }
}
