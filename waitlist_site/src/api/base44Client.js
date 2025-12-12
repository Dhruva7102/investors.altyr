import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client without requiring authentication (for fallback only)
// We're moving off Base44, so auth is disabled
export const base44 = createClient({
  appId: import.meta.env.VITE_BASE44_APP_ID || "692eafcbaaa1898a7dd3af41", 
  requiresAuth: false // Disabled - we're using Airtable as primary storage
});
