# Altyr Investor Pitch Deck

A single-page scrolling investor pitch deck website for Altyr, functioning as a digital replacement for a traditional pitch deck.

## Features

- **9 Sections**: Hero, Vision, Problem, Solution, Market, Go-to-Market, Team, Raise, and Contact
- **Side Navigation**: Fixed position navigation with scroll-based section tracking
- **Smooth Animations**: Framer Motion animations throughout
- **Dark Purple Aesthetic**: Matches Altyr.com brand colors (`#18021A`)
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React (icons)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The site will be available at `http://localhost:5174`

## Build

```bash
npm run build
```

## Structure

```
src/
├── components/
│   ├── pitch/
│   │   ├── Hero.jsx
│   │   ├── Vision.jsx
│   │   ├── Problem.jsx
│   │   ├── Solution.jsx
│   │   ├── Market.jsx
│   │   ├── GoToMarket.jsx
│   │   ├── Team.jsx
│   │   ├── Raise.jsx
│   │   └── Contact.jsx
│   └── SideNav.jsx
├── pages/
│   └── InvestorHome.jsx
├── lib/
│   └── utils.js
├── App.jsx
├── main.jsx
└── index.css
```

## Sections Overview

1. **Hero**: ALTYR wordmark, headline, SAFE raise callout
2. **Vision**: "For Creators, Built With Creators" + 3 pillars
3. **Problem**: 5 pain points in current platforms
4. **Solution**: Modern platform, analytics, gamification
5. **Market**: Creator economy opportunity
6. **Go-to-Market**: 4-step strategy
7. **Team**: 3 team members (Dhruva, Solan, Bib)
8. **Raise**: $1M SAFE + use of funds
9. **Contact**: Contact info and footer

## Side Navigation

- Fixed position on the right side (desktop only)
- Dots represent each section
- Active section highlighted with gradient
- Click to jump to section
- Auto-updates based on scroll position using Intersection Observer

## Design System

- **Background**: `#18021A` (dark purple)
- **Gradients**: Purple to orange (`#9B4DCA` → `#E85A24` → `#FF8C42`)
- **Accent Colors**: `#AC0064`, `#64109A`
- **Typography**: Extralight/light weights for elegance
- **Animations**: Fade-in, slide-up, scale effects on scroll

## License

© 2024 Altyr. All rights reserved.

