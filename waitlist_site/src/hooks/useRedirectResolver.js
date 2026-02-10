import { useState, useEffect } from 'react';

// Build-time: set VITE_REDIRECT_API_BASE in Vercel (or .env) to the API that has redirect-links.
// When unset: dev (localhost) uses localhost:3000; production uses dev-api so links work once that API has the routes.
const API_BASE =
  import.meta.env.VITE_REDIRECT_API_BASE ||
  (import.meta.env.DEV ? 'http://localhost:3000/v1' : 'https://dev-api.altyr.com/v1');

export function useRedirectResolver(slug) {
  const [loading, setLoading] = useState(Boolean(slug));
  const [error, setError] = useState(false);
  const [onlyfansUrl, setOnlyfansUrl] = useState(null);
  const [altyrUrl, setAltyrUrl] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError(true);
      return;
    }

    let cancelled = false;

    fetch(`${API_BASE}/redirect-links/resolve/${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Resolve failed');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setOnlyfansUrl(data.onlyfansUrl ?? null);
          setAltyrUrl(data.altyrUrl ?? null);
          setError(false);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function recordClick(choice) {
    if (!slug) return;
    try {
      await fetch(`${API_BASE}/redirect-links/record-click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, choice }),
      });
    } catch (_) {
      // ignore; redirect anyway
    }
  }

  return {
    loading,
    error,
    onlyfansUrl,
    altyrUrl,
    recordClick,
  };
}
