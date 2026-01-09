# Altyr Gamification Showcase

A comprehensive website showcasing the gamification features planned for Altyr's launch. This site visualizes all gamification systems, UI mockups, and implementation plans.

## Features

- **Global XP System**: Weighted progression system with level rewards
- **Profile Customization**: Discord-style customization with progressive unlocks
- **Badge System**: Five categories of collectible achievements
- **Daily Login Rewards**: Streak system with protection mechanisms
- **UI Mockups**: Visual representations of all gamification elements
- **Launch Plan**: Phased rollout strategy

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React (icons)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Design System

All components follow Altyr's brand guidelines:

- **Background**: `#18021A` (Deep Purple-Black)
- **Primary**: `#AC0064` (Magenta)
- **Secondary**: `#64109A` (Deep Purple)
- **Accent**: `#E85A24` (Orange)

See `ALTYR_BRAND_BOOK.md` for complete design specifications.

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx
│   ├── XPSystem.jsx
│   ├── ProfileCustomization.jsx
│   ├── BadgeSystem.jsx
│   ├── DailyLogin.jsx
│   ├── UIMockups.jsx
│   ├── LaunchPlan.jsx
│   └── SideNav.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Sections

1. **Hero**: Overview and introduction
2. **XP System**: Global XP sources and level progression
3. **Profile Customization**: Discord-style customization features
4. **Badge System**: All badge categories and rarity tiers
5. **Daily Login**: Streak system and rewards
6. **UI Mockups**: Visual design patterns
7. **Launch Plan**: Phased rollout strategy

## Sharing

This site can be deployed to:
- Vercel
- Netlify
- Any static hosting service

Simply build the project and deploy the `dist` folder.

---

**Last Updated**: January 2025
