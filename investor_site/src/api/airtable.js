// NOTE: This is a placeholder API layer.
// Today: we simulate async fetches (no keys / no backend).
// Soon: swap `fetchCreators()` to read from Airtable (or a serverless proxy) using creator handles.
//
// Expected Airtable schema (suggested):
// - Table: Creators
// - Fields:
//   - Handle (text)              e.g. "sophiarose"
//   - Name (text)                e.g. "Sophia Rose"
//   - Followers (number)         e.g. 487000
//   - Verified (checkbox/bool)   e.g. true
//   - AvatarUrl (url)            e.g. https://...
//
// IMPORTANT:
// - Do NOT call Airtable directly from the browser with a secret key.
// - If/when we integrate Airtable, use a serverless function (Vercel/Cloudflare) to keep secrets private.

import { creators as fallbackCreators } from '@/data/creators';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Dummy async fetch that mimics a real network call.
 * Later: replace with a serverless endpoint or Airtable proxy.
 */
export async function fetchCreators() {
  // Simulate network + parsing latency
  await sleep(250);

  // In the near future, this might look like:
  // const res = await fetch('/api/creators');
  // return await res.json();

  return fallbackCreators.map((c) => ({
    ...c,
    avatarUrl: c.avatarUrl ?? null,
  }));
}


