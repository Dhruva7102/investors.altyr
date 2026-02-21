# DEPRECATED - waitlist_site

**This directory is deprecated as of February 2026.**

All content from the waitlist site has been migrated to `website-frontend-service`, which serves `dev.altyr.com`.

## What moved where

| Feature | Old Location (waitlist_site) | New Location |
|---|---|---|
| Landing page (Home, Hero, etc.) | `src/pages/Home.jsx`, `src/components/landing/` | `website-frontend-service/src/pages/Home.jsx`, `src/components/landing/` |
| Creator & Fan Signup | `src/pages/CreatorSignup.jsx`, `FanSignup.jsx` | `website-frontend-service/src/pages/` |
| Creator Demo | `src/pages/CreatorDemo.jsx`, `src/demo/creators/` | `website-frontend-service/src/pages/CreatorDemo.jsx`, `src/demo/creators/` |
| Fan Demo | `src/pages/FanDemo.jsx`, `src/demo/fans/` | `website-frontend-service/src/pages/FanDemo.jsx`, `src/demo/fans/` |
| Redirect Links (landing + admin) | `src/pages/RedirectLanding.jsx`, `public/admin.html` | `website-frontend-service/src/pages/RedirectLanding.jsx`, `public/admin.html` |
| UI Components (shadcn) | `src/components/ui/` | `website-frontend-service/src/components/ui/` |
| Shared Components | `src/components/shared/` | `website-frontend-service/src/components/shared/` |
| Mock Data | `src/data/` | `website-frontend-service/src/data/` |
| Airtable API | `src/api/airtable.js` | `website-frontend-service/src/api/airtable.js` |
| Privacy & Terms | `src/pages/Privacy.jsx`, `Terms.jsx` | `website-frontend-service/src/pages/` |

## Domain changes

- `info.altyr.com` - can be decommissioned; all content now served from `dev.altyr.com`
- `onlyfans.altyr.com` - redirect links now served from `dev.altyr.com/g/:slug` and admin at `dev.altyr.com/admin.html`

## Still active in this repo

- `pitch_deck/` - Investor slide deck, serves `investors.altyr.com` (unchanged)
- `investor_site/` - Investor single-page site, serves `investors.altyr.com` (unchanged)
