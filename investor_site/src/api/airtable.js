/**
 * Client-side API: Fetch creator profiles
 * 
 * Flow:
 * 1. Browser calls this function
 * 2. Hits serverless endpoint /api/creators (Vercel function)
 * 3. Server reads handles from Airtable
 * 4. Server fetches profiles from X API
 * 5. Returns real data to frontend
 * 
 * Airtable schema:
 * - Table: Creators
 * - Fields:
 *   - X.com (text, field ID: fldrBclz4LVKRnHpz) - X/Twitter handle
 *   - Name (text, optional) - Override display name
 *   - Category (text, optional) - Creator category
 */

export async function fetchCreators() {
  const res = await fetch('/api/creators', {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
    
    // Handle rate limit errors with a more user-friendly message
    if (res.status === 429) {
      throw new Error('X API rate limit exceeded. Profiles will load automatically once the limit resets.');
    }
    
    throw new Error(errorData.error || `API error: ${res.status}`);
  }

  const data = await res.json();
  
  if (!Array.isArray(data)) {
    throw new Error('Invalid API response format');
  }

  return data;
}


