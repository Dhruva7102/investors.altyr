# Redirect links (OnlyFans / Altyr)

Redirect links let creators share a single URL that shows an Altyr landing (“OnlyFans or Altyr?”) and then redirects to their OnlyFans or Altyr profile.

## URL format

Links use the **onlyfans** subdomain so when shared you see **onlyfans.altyr.com**:

- **Production:** `https://onlyfans.altyr.com/g/<slug>` (e.g. `https://onlyfans.altyr.com/g/7dzi5mov`)
- **Local dev:** `http://localhost:5173/g/<slug>` (waitlist app) and ensure the node-service API is on `http://localhost:3000/v1`

The default base URL is set to `https://onlyfans.altyr.com` in the backend; override with `REDIRECT_LANDING_BASE_URL` if you use a different host.

## DNS for onlyfans.altyr.com (Vercel)

The domain **onlyfans.altyr.com** is added to the **waitlist-altyr** project in Vercel. To make it live, add this record at your DNS provider (e.g. Cloudflare for altyr.com):

| Type | Name   | Content    |
|------|--------|------------|
| A    | onlyfans | 76.76.21.21 |

After the record propagates, Vercel will issue SSL and `https://onlyfans.altyr.com` will serve the same waitlist app (admin at `/admin.html`, redirect landing at `/g/:slug`).

## “Connection failed” on onlyfans.altyr.com

If `https://onlyfans.altyr.com/g/7dzi5mov` (or `https://go.altyr.com/...`) fails to load:

1. **Not deployed** — The host (onlyfans.altyr.com or go.altyr.com) must point to where the **waitlist app** is served (e.g. Vercel). Deploy the waitlist_site and point the subdomain to that deployment.
2. **DNS** — Add a CNAME (or A) for `onlyfans.altyr.com` (or `go.altyr.com`) to your hosting (e.g. Vercel alias).
3. **Local testing** — Use `http://localhost:5173/g/<slug>` with the waitlist dev server and node-service on port 3000. The generated link will still show `https://onlyfans.altyr.com/g/...` in the admin; that URL only works once that host is deployed and DNS is set.

## Scaling: how many links?

- **No hard limit.** Each link is one document keyed by an 8-character alphanumeric slug.
- **Slug space:** 36^8 ≈ 2.8 trillion possible slugs; collision chance is negligible for millions of links.
- **Database:** The `redirectLinks` collection has a **unique index on `slug`**, so resolve and create-by-slug are single-doc lookups and scale to millions of links without issue.
- **API:** Resolve is a single find by slug; list is paginated (skip/limit). Both are easily supported at high volume.
