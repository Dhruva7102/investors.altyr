/**
 * Client-side API: Fetch creator handles + follower counts.
 *
 * Source of truth is Airtable (via our serverless endpoint `/api/creators`).
 */

export async function fetchCreators() {
  const res = await fetch('/api/creators', {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = data?.error || data?.message || `API error: ${res.status}`;
    throw new Error(msg);
  }

  const creators = data?.creators;
  if (!Array.isArray(creators)) {
    throw new Error('Invalid API response format');
  }

  return creators;
}
