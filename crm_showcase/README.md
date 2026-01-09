# Altyr CRM Showcase

A comprehensive website showcasing the ALTYR CRM System & User Profiles. This site visualizes how the relationship-first CRM works for both casual creators (quick-scan mode) and professional creators/teams (deep analytics).

## Features

- **Quick-Scan CRM**: At-a-glance dashboards for busy creators
- **Relationship Intelligence**: Connection depth and health scoring
- **Fan Segmentation**: Pre-built and custom segments
- **Predictive Analytics**: LTV prediction and churn risk scoring
- **User Profiles**: Three-layer profile system (public, private, analytics)
- **Gamification Integration**: How CRM powers progression systems
- **Advanced Features**: Team tools and enterprise capabilities
- **Implementation Roadmap**: Phased rollout strategy

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
- **Status Colors**: Casual (gray), Regular (blue), VIP (purple), Superfan (gold)

See `ALTYR_BRAND_BOOK.md` for complete design specifications.

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx
│   ├── QuickScanCRM.jsx
│   ├── RelationshipScoring.jsx
│   ├── Segmentation.jsx
│   ├── PredictiveAnalytics.jsx
│   ├── UserProfiles.jsx
│   ├── GamificationIntegration.jsx
│   ├── AdvancedFeatures.jsx
│   ├── Roadmap.jsx
│   └── SideNav.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Sections

1. **Hero**: Overview and relationship-first positioning
2. **Quick-Scan CRM**: At-a-glance dashboard for basic users
3. **Relationship Scoring**: Connection depth and health algorithms
4. **Segmentation**: Pre-built and custom segment builder
5. **Predictive Analytics**: LTV and churn risk predictions
6. **User Profiles**: Three-layer profile system
7. **Gamification Integration**: How systems work together
8. **Advanced Features**: Team and enterprise tools
9. **Roadmap**: Implementation phases

## Key Concepts

### Relationship-First Approach
- Focus on connection depth, not transaction volume
- Emotional intelligence over financial tracking
- Proactive insights for relationship growth

### Dual User Experience
- **Quick-Scan**: Visual dashboards, priority indicators, one-click actions
- **Advanced**: Deep analytics, custom segmentation, predictive intelligence

### Gamification Integration
- Relationship scores map to gamification tiers
- Financial engagement contributes to progression
- Interaction history determines badge eligibility

## Sharing

This site can be deployed to:
- Vercel
- Netlify
- Any static hosting service

Simply build the project and deploy the `dist` folder.

---

**Last Updated**: January 2025
