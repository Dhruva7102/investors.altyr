# Vienna Valentine — link hub

A single-page link hub for Vienna Valentine. Static HTML/CSS/JS, no build step,
no dependencies, no framework. Drop it on Vercel and it's live.

The job of this page is narrow: take someone who tapped a link in an Instagram
bio and get them to the VIP page in as few taps as possible, while keeping the
Instagram-facing surface of the site clean.

---

## Run it locally

```sh
cd vienna-valentine-linkhub
npx serve .          # or: python3 -m http.server 8000
```

Open `http://localhost:3000` (serve) or `http://localhost:8000` (python).

There is nothing to install and nothing to compile.

---

## Deploy to Vercel

The repo root is a monorepo, so point Vercel at this folder.

1. In Vercel → **Add New… → Project** → import this repository.
2. **Root Directory**: `vienna-valentine-linkhub`
3. **Framework Preset**: *Other*
4. Leave Build Command empty and Output Directory empty. It's a static folder.
5. Deploy, then attach the domain under **Settings → Domains**.

`vercel.json` in this folder handles clean URLs (`/vip`, not `/vip/index.html`),
caching, and the security headers.

### One edit after the domain is attached

In `index.html`, change `og:image` and `twitter:image` from `/og.png` to the
absolute URL (`https://yourdomain.com/og.png`). Some link-preview scrapers
won't resolve a relative image path, and the preview card is the first thing
anyone sees when the link gets shared.

---

## Files

```
index.html          The link hub itself
vip/index.html      Age gate — the only page that knows the VIP destination
404.html            Fallback, routes back to /
css/style.css       Everything visual. One file.
js/config.js        The VIP destination (base64) — the file you'll edit most
js/main.js          Entrance animation, avatar fallback, year stamp
js/vip.js           Decodes the destination after a tap and hands off
img/                Drop avatar.jpg here — see img/README.md
og.png              1200×630 link preview card
favicon.svg         VV monogram
apple-touch-icon.png
robots.txt          Allows /, disallows /vip
vercel.json         Clean URLs, cache policy, security headers
.vercelignore       Keeps the markdown out of the deployment
```

`.vercelignore` matters more than it looks. A static host serves every file you
hand it, including `README.md` — and this README names the destination in plain
text. Leave those two entries in place.

---

## How the Instagram-facing side is kept clean

Instagram's automated checks look at the URL in a bio and at the page behind
it. Four things are deliberate here:

1. **No platform name in the served HTML.** `index.html`, the `<title>`, the
   meta description, and every OG tag are brand-neutral. Nothing on the
   landing page names an adult platform.
2. **No outbound adult link in the markup.** The primary CTA points at `/vip`,
   a path on your own domain. There is no `onlyfans.com` href anywhere in the
   HTML a crawler receives.
3. **The destination is decoded on tap, not on load.** `js/config.js` stores
   it base64-encoded; `js/vip.js` decodes it inside the click handler. A
   crawler that fetches the page and stops there never resolves it.
4. **`/vip` is `noindex, nofollow, noarchive` and `no-store`,** set both in the
   page's meta and as an `X-Robots-Tag` header in `vercel.json`, and
   `Referrer-Policy: no-referrer` means the destination never sees where the
   traffic came from.

### What this does not do

Be clear-eyed about this: it raises the effort required to detect the link
automatically, it does not make the link undetectable. Base64 is trivially
reversible by anything that decides to look, a headless browser that clicks
the button will resolve the destination, and none of it changes Instagram's
actual policy — a manual report or a human review will find it. Treat it as
friction against automated scanning, not as a guarantee, and keep the domain
disposable enough that losing one isn't a crisis.

The age gate is the load-bearing part, and it's worth keeping for its own sake:
it's a genuine 18+ interstitial, and it happens to be the thing bots don't get
past.

---

## Editing it

### Change the VIP destination

```sh
node -e "console.log(Buffer.from('https://onlyfans.com/newhandle').toString('base64'))"
```

Paste the output into `vip` in `js/config.js`. Don't write the plain URL into a
comment there — `js/config.js` is served publicly, exactly like the HTML is.
To read the current value back:

```sh
node -e "console.log(Buffer.from(process.argv[1],'base64').toString())" '<paste the value>'
```

It currently points at `onlyfans.com/vienavalentine`.

### Add or remove a link

`index.html` holds the cards as plain markup — no config file to keep in sync,
no flash of empty content on load. There's a commented-out template card at the
bottom of the `<nav>`: copy it, swap the `href`, the icon SVG, and the two
lines of text. Keep the `data-i` values sequential so the entrance stagger
stays in order.

Order matters for conversion. The VIP card is first on purpose.

### Add the photo

Drop a square `avatar.jpg` into `img/`. Until then the page shows the gold
**VV** monogram — that's a designed fallback, not a broken image, so the site
is presentable with no photo at all. See `img/README.md`.

### Change the copy

Name, handle, and one-line bio are in the `<header class="hero">` block.
The bio is set in italic Cormorant Garamond and looks best at six to eight
words.

---

## Design notes

- **Palette**: wine-black ground (`#0B0507`), rose (`#E0526E`), champagne gold
  (`#DDB878`), cream text. All tokens live at the top of `css/style.css`.
- **Type**: Cormorant Garamond for display, Inter for UI. Loaded from Google
  Fonts with `display=swap`.
- **Background**: three blurred colour blobs on slow drift, plus an SVG grain
  overlay — the grain is what stops it reading as a flat CSS gradient.
- **Motion**: staggered rise on load, sheen sweep and lift on card hover. All
  of it collapses under `prefers-reduced-motion: reduce`.
- **Accessibility**: visible focus rings, real `<a>` and `<button>` elements,
  labelled nav, and a `prefers-contrast: more` block that lifts the muted
  greys.
- **Mobile first.** Nearly all traffic arrives from a phone via the Instagram
  in-app browser, so that's the case the layout is tuned for.

---

## Analytics

None is wired up, deliberately — a third-party script is one more thing that
can name the destination. If you want click data, Vercel Analytics is the
cleanest fit: enable it in the project settings and add

```html
<script defer src="/_vercel/insights/script.js"></script>
```

to `index.html`. It's first-party, so it needs no change to the CSP in
`vercel.json`.
