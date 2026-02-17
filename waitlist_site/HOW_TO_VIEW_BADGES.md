# How to view the badge UI

The new badge components (Form A icon, Form B pill, Form C card) are wired into the **Fan Demo** in this repo.

## 1. Run the app locally

From the repo root:

```bash
cd waitlist_site
npm install   # if you haven’t already
npm run dev
```

Vite will start (usually at **http://localhost:5173**). Use the URL it prints in the terminal.

## 2. Open the Fan Demo

- Either go to the homepage and click **“For Fans”** (or the link that points to the fan demo).
- Or open directly:
  - **http://localhost:5173/demo/fans**
  - (Vite may redirect to `/demo/fans/home`.)

## 3. Where to see the badges

| Page | URL | What you’ll see |
|------|-----|------------------|
| **Home** | `/demo/fans/home` | **Form B (pills)** in the “Your status” card: Founder, Superfan, First Tip (and +N if more than 3). |
| **Profile** | `/demo/fans/profile` | **Form B (pills)** in the profile header under “Customize your identity”: same demo set. |
| **Rewards** | `/demo/fans/rewards` | **Form C (cards)** in the “Badge Collection” section: all badge categories with the new card design, locked vs unlocked states, and rarity/tier styling. |

Use the top nav in the Fan Demo (Home, Rewards, Creator, Messages, Profile) to switch between these pages.

## 4. Live deployment (Vercel)

The **waitlist** app (with the fan demo and badge UI) is deployed as the Vercel project **waitlist-altyr** at:

- **https://info.altyr.com**

So after your badge changes are deployed:

- **https://info.altyr.com/demo/fans/home** – pill badges on Home  
- **https://info.altyr.com/demo/fans/profile** – pill badges on Profile  
- **https://info.altyr.com/demo/fans/rewards** – card badges in Badge Collection  

**Note:** **dev.altyr.com** is a different app (website-frontend-service, Next.js). The fan demo and badge UI live on **info.altyr.com** (waitlist-altyr).

## 5. Production badge components (website-frontend-service)

The full badge system (BadgeIcon, BadgePill, BadgeCard, BadgeStack, BadgeTooltip) lives in:

**`website-frontend-service/components/badges/`**

Use those when you add badges to the main app (e.g. profile header, DMs, comments). The demo in `waitlist_site` uses matching “V2” components that rely on `lucide-react` and the same design tokens.
