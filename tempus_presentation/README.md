# Tempus Presentation

A slideshow presentation for **Dhruva's Work** — architectures, cloud architectures, processes, and deployments. Built with React, Vite, Tailwind CSS, and Framer Motion.

## Slides

1. **Title** — Dhruva's Work / A non-exhaustive Body of Work (Knowledge Ingestion, Evaluation framework, Agent Starter Pack)
2. **Knowledge Ingestion** — title, process, architecture
3. **Evaluation framework** — title, architecture, process
4. **Agent Starter Pack** — title, process, architecture

## Development

```bash
npm install
npm run dev
```

Runs at [http://localhost:5176](http://localhost:5176). Use **← →** arrow keys or the on-screen controls to navigate.

## Build

```bash
npm run build
```

Output is in `dist/`.

---

## Deploy (preference 1): GitHub Pages

### This repo is the `altyr` / `investors.altyr` monorepo

A root workflow deploys only **`tempus_presentation/`**:

- [.github/workflows/deploy-tempus-presentation-pages.yml](../.github/workflows/deploy-tempus-presentation-pages.yml) (at repository root)

It runs on pushes to **`main`** that touch `tempus_presentation/**` (or the workflow file), and on **workflow_dispatch**.

1. **Settings → Pages → Build and deployment → Source:** **GitHub Actions**.
2. Push to **`main`** (change something under `tempus_presentation/` or run the workflow manually).
3. Site URL: **`https://dhruva7102.github.io/<repository-name>/`** (e.g. `https://Dhruva7102.github.io/investors.altyr/` — GitHub URLs are case-insensitive for the owner).

**One site per repository:** If [.github/workflows/deploy.yml](../.github/workflows/deploy.yml) already deploys **`investor_site`** to the same Pages environment, only one app can be live at a time. Either disable one workflow in the **Actions** tab, or put Tempus in its **own GitHub repository** (see below).

### Standalone repository (only this project)

If the repo root **is** `tempus_presentation` (copied contents only):

1. Use [tempus_presentation/.github/workflows/deploy-github-pages.yml](.github/workflows/deploy-github-pages.yml).
2. Pages source: **GitHub Actions**. Push to **`main`**.

`public/.nojekyll` is included so GitHub Pages does not treat the site as Jekyll.

---

## Deploy (preference 2): Vercel

1. Go to [vercel.com](https://vercel.com), sign in with GitHub as **dhruva7102** (or link that account).
2. **Add New Project** → import this repository.
3. **Framework preset:** Vite (or Other). **Root directory:** `tempus_presentation` if the repo is the monorepo root; leave blank if this repo is only this project.
4. **Build Command:** `npm run build`  
   **Output Directory:** `dist`  
   Do **not** set `VITE_BASE` on Vercel (keep `base` as `/` for the default `*.vercel.app` or custom domain at root).
5. [vercel.json](vercel.json) already includes SPA rewrites for client routing.

CLI alternative from this directory:

```bash
npx vercel
```

---

## Adding content

Edit the slide components in `src/components/slides/` to add architecture images, process flows, and extra slides. Add new slide components and register them in `src/App.jsx` in the `slides` array.
