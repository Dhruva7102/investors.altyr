# Altyr Brand Book

**Version 1.0** | Last Updated: December 2024

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Brand Voice & Tone](#brand-voice--tone)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Design Principles](#design-principles)
6. [UI Patterns & Components](#ui-patterns--components)
7. [Logo & Branding](#logo--branding)
8. [Content Guidelines](#content-guidelines)
9. [Animation & Motion](#animation--motion)
10. [Implementation Examples](#implementation-examples)

---

## Brand Overview

### Mission
Altyr is an exclusive content platform that finally feels pleasurable. We combine modern UX, extensive business tooling, and rewarding, gamified fan experiences to systematically grow creator revenue.

### Brand Positioning
- **For Creators**: Built with creators, not just for them
- **For Fans**: Rewarding, engaging, pleasurable experiences
- **For Investors**: High-margin business with proven economics and modern platform quality

### Core Values
1. **Creator-First**: Everything we build prioritizes creator success and autonomy
2. **Modern Excellence**: We reject outdated infrastructure in favor of cutting-edge UX
3. **Gamification**: Proven techniques from gaming and social media to drive engagement
4. **Data-Driven**: Leverage insights to expand the market, not just capture it
5. **Pleasure-Focused**: Every interaction should feel delightful, not transactional

---

## Brand Voice & Tone

### Voice Characteristics

**Modern & Sophisticated**
- Use contemporary language that feels fresh, not corporate
- Avoid jargon unless it adds clarity
- Speak to creators as peers, not customers

**Direct & Confident**
- Be clear about what we do and why it matters
- No hedging or apologetic language
- Own our position in the market

**Creator-Focused**
- Always center creators in our messaging
- Acknowledge their expertise and agency
- Build with them, not for them

**Pleasure-Oriented**
- Emphasize experience over features
- Use sensory, emotional language where appropriate
- Make the platform feel desirable, not just functional

### Tone Guidelines

**Do:**
- "An exclusive content platform that actually feels pleasurable"
- "Built with creators, not just for them"
- "Rewarding, gamified fan experiences"
- "Modern and responsive UX"
- "Extensive business tooling"

**Don't:**
- Corporate speak ("leverage," "synergy," "optimize" without context)
- Apologetic language ("we try to," "we hope to")
- Feature lists without benefit ("we have X, Y, Z")
- Generic platitudes ("the best platform," "revolutionary")

### Messaging Pillars

1. **Pleasure & Experience**: The platform should feel good to use
2. **Creator Partnership**: We build with creators, not for them
3. **Modern Infrastructure**: We reject outdated platforms
4. **Gamification & Rewards**: Proven techniques to drive engagement
5. **Business Intelligence**: Serious tooling for serious earners

---

## Color Palette

### Primary Colors

#### Background
- **Primary Background**: `#18021A` (Deep Purple-Black)
  - Main background for all pages
  - Creates depth and premium feel
  - RGB: `rgb(24, 2, 26)`

- **Secondary Background**: `#0d0110` (Darker Purple)
  - Used for section transitions
  - RGB: `rgb(13, 1, 16)`

#### Brand Colors

**Magenta/Pink** - Primary Brand Color
- **Primary Magenta**: `#AC0064`
  - Main brand accent
  - Used for CTAs, highlights, icons
  - RGB: `rgb(172, 0, 100)`
  - Usage: Buttons, links, active states, brand elements

**Purple** - Secondary Brand Color
- **Deep Purple**: `#64109A`
  - Secondary accent
  - Used in gradients and complementary elements
  - RGB: `rgb(100, 16, 154)`
  - Usage: Gradients, borders, secondary highlights

- **Light Purple**: `#9B4DCA`
  - Tertiary accent
  - Used in multi-color gradients
  - RGB: `rgb(155, 77, 202)`
  - Usage: Gradient transitions, logo effects

#### Accent Colors

**Orange/Amber** - Warm Accents
- **Orange**: `#E85A24`
  - Warm accent for variety
  - RGB: `rgb(232, 90, 36)`
  - Usage: Gradient transitions, special highlights

- **Light Orange**: `#FF8C42`
  - Lighter warm accent
  - RGB: `rgb(255, 140, 66)`
  - Usage: Gradient highlights

- **Amber/Brown**: `#B56A00`
  - Creator-focused accent
  - RGB: `rgb(181, 106, 0)`
  - Usage: Creator-specific CTAs, special sections

### Text Colors

**White Variations** (on dark background)
- **Primary Text**: `white` or `white/90` (90% opacity)
  - Main body text, headings
  - RGB: `rgb(255, 255, 255)` with 90% opacity

- **Secondary Text**: `white/60` (60% opacity)
  - Supporting text, descriptions
  - RGB: `rgb(255, 255, 255)` with 60% opacity

- **Tertiary Text**: `white/40` (40% opacity)
  - Subtle text, captions
  - RGB: `rgb(255, 255, 255)` with 40% opacity

- **Muted Text**: `white/25` (25% opacity)
  - Footer text, disclaimers
  - RGB: `rgb(255, 255, 255)` with 25% opacity

### Glass Effects

**Glassmorphism Colors**
- **Card Background**: `rgba(255, 255, 255, 0.03)` to `rgba(255, 255, 255, 0.06)`
  - Semi-transparent white for cards
  - Creates depth with backdrop blur

- **Card Borders**: `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.12)`
  - Subtle borders for definition
  - Hover: `rgba(255, 255, 255, 0.18)`

- **Hover States**: `rgba(255, 255, 255, 0.05)` to `rgba(255, 255, 255, 0.08)`
  - Interactive feedback

### Gradient Combinations

**Primary Gradient** (Logo/Brand)
```
from-[#9B4DCA] via-[#E85A24] to-[#FF8C42]
```
- Used for: Logo text, major brand elements

**Secondary Gradient** (Text Highlights)
```
from-[#AC0064] via-[#9B4DCA] to-[#64109A]
```
- Used for: Headlines, important text

**Background Gradients** (Orbs/Glows)
```
radial-gradient(ellipse at center, rgba(100,16,154,0.25) 0%, rgba(172,0,100,0.12) 35%, transparent 65%)
```
- Used for: Background atmosphere, depth

**Card Gradients** (Hover Effects)
```
radial-gradient(circle at 50% 0%, rgba(172,0,100,0.08) 0%, transparent 50%)
```
- Used for: Interactive elements, hover states

### Color Usage Guidelines

1. **Primary Background**: Always use `#18021A` as the base
2. **Brand Accents**: Use `#AC0064` for primary actions and highlights
3. **Gradients**: Use multi-color gradients for premium feel
4. **Glass Effects**: Maintain subtle transparency (3-12% white)
5. **Text Hierarchy**: Use opacity variations for visual hierarchy
6. **Hover States**: Increase opacity/brightness by 20-30%

---

## Typography

### Font Stack

**Primary Font Family**
```
system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

- Native system fonts for performance and familiarity
- Ensures consistent rendering across platforms
- No external font loading required

### Font Weights

- **Extralight** (`font-extralight` / 200): Large headlines, hero text
- **Light** (`font-light` / 300): Body text, descriptions
- **Regular** (`font-normal` / 400): Default weight
- **Medium** (`font-medium` / 500): Emphasis, CTAs
- **Semibold** (`font-semibold` / 600): Strong emphasis, logos

### Font Sizes

**Headlines**
- Hero: `text-5xl` to `text-8xl` (48px - 96px)
- Section Headlines: `text-4xl` to `text-6xl` (36px - 60px)
- Subheadings: `text-2xl` to `text-4xl` (24px - 36px)

**Body Text**
- Large Body: `text-lg` to `text-xl` (18px - 20px)
- Body: `text-base` (16px)
- Small: `text-sm` (14px)
- Extra Small: `text-xs` (12px)

### Letter Spacing

- **Wide** (`tracking-wide`): Headlines, brand elements
- **Extra Wide** (`tracking-[0.12em]`): Logo text (ALTYR)
- **Normal**: Body text, descriptions

### Line Height

- **Tight** (`leading-tight`): Headlines (1.2-1.3)
- **Relaxed** (`leading-relaxed`): Body text (1.5-1.6)
- **Normal**: Default (1.5)

### Text Styles

**Gradient Text**
```css
text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]
```
- Used for: Important headlines, brand elements

**Italic Text**
- Use sparingly for emphasis
- Example: "an exclusive content platform that *actually* feels pleasurable"

**Uppercase**
- Use for: Section labels, small text, navigation
- Always with `tracking-wider` or `tracking-[0.35em]`

---

## Design Principles

### 1. Dark-First Design
- Always design for dark backgrounds
- Use high contrast for readability
- Leverage depth through layering

### 2. Glassmorphism
- Semi-transparent cards with backdrop blur
- Subtle borders for definition
- Creates premium, modern feel

### 3. Depth Through Layers
- Multiple gradient orbs for atmosphere
- Z-index layering for hierarchy
- Subtle shadows and glows

### 4. Microinteractions
- Hover effects on all interactive elements
- Smooth transitions (200-500ms)
- Scale transforms (1.01-1.02x)
- Color transitions on hover

### 5. Spacious Layouts
- Generous padding and margins
- Breathing room between elements
- Focus on key content

### 6. Premium Aesthetics
- Rounded corners (xl, 2xl, 3xl)
- Smooth gradients
- Subtle animations
- High-quality visual effects

### 7. Responsive & Mobile-First
- Vertical layouts on mobile
- Horizontal layouts on desktop
- Touch-friendly interactions
- Readable text at all sizes

---

## UI Patterns & Components

### Cards

**Standard Card**
```css
bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm rounded-2xl
```

**Hover State**
```css
hover:bg-white/[0.05] hover:border-white/[0.12] hover:scale-[1.02]
```

**With Glow Effect**
```css
radial-gradient(circle at 50% 0%, rgba(172,0,100,0.08) 0%, transparent 50%)
```

### Buttons

**Primary Button (Creator)**
```css
bg-[#B56A00] hover:bg-[#C97A00] hover:shadow-[0_0_40px_rgba(181,106,0,0.3)]
```

**Primary Button (Fan/General)**
```css
bg-[#AC0064] hover:bg-[#C0007A] hover:shadow-[0_0_40px_rgba(172,0,100,0.3)]
```

**Button Characteristics**
- Rounded: `rounded-xl`
- Padding: `px-6 py-3` or `h-14`
- Smooth transitions: `transition-all duration-500`
- Scale on hover: `hover:scale-[1.01]`

### Input Fields

**Standard Input**
```css
bg-white/[0.03] border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-white/20
```

**Characteristics**
- Semi-transparent background
- Subtle borders
- Clear focus states
- High contrast text

### Section Dividers

**Label with Lines**
```css
flex items-center gap-6
```
- Left line: `bg-gradient-to-r from-transparent to-[#64109A]/50`
- Label: `text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase`
- Right line: `bg-gradient-to-l from-transparent to-[#64109A]/50`

### Gradient Orbs

**Primary Orb**
```css
radial-gradient(ellipse at center, rgba(100,16,154,0.25) 0%, rgba(172,0,100,0.12) 35%, transparent 65%)
filter: blur(100px)
```

**Usage**
- Background atmosphere
- Animated (scale, opacity)
- Multiple layers for depth

---

## Logo & Branding

### Logo Treatment

**Wordmark**
- Text: "ALTYR"
- Font: System sans-serif, semibold
- Letter spacing: `tracking-[0.12em]`
- Gradient: `from-[#9B4DCA] via-[#E85A24] to-[#FF8C42]`

**Favicon**
- Liquid glass effect
- Cursive "Altyr" text
- Centered, gradient background
- SVG format for scalability

### Brand Name Usage

- **Always**: "Altyr" (capital A, lowercase rest)
- **Logo**: "ALTYR" (all caps, wide tracking)
- **Tagline**: "An exclusive content platform that actually feels pleasurable"

### Brand Colors in Logo

- Primary gradient: Purple → Orange → Light Orange
- Alternative: Magenta → Purple gradient
- Always use gradients, never flat colors

---

## Content Guidelines

### Headlines

**Hero Headlines**
- Short, impactful
- Focus on benefit/feeling
- Use gradient text for emphasis
- Example: "an exclusive content platform that actually feels pleasurable"

**Section Headlines**
- Clear, descriptive
- Can use gradient or solid color
- Support with subheadings

### Body Copy

**Tone**
- Direct and confident
- Creator-focused language
- Avoid corporate jargon
- Emphasize experience over features

**Structure**
- Short paragraphs (2-3 sentences)
- Clear hierarchy
- Use bullets for lists
- Generous spacing

### CTAs (Call-to-Actions)

**Language**
- Action-oriented: "Get Early Access," "Join the Waitlist"
- Benefit-focused: "Claim Your Gift," "Start Creating"
- Clear and direct

**Placement**
- Prominent but not overwhelming
- Clear visual hierarchy
- Smooth hover effects

### Feature Descriptions

**Format**
- Title: Clear, benefit-focused
- Description: 1-2 sentences explaining value
- Use icons for visual interest

**Example**
- Title: "Modern and responsive UX"
- Description: "An interface that feels as premium as the content"

---

## Animation & Motion

### Principles

1. **Smooth & Subtle**: Never jarring or distracting
2. **Purposeful**: Every animation serves a function
3. **Fast**: 200-500ms for interactions
4. **Easing**: Use `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for natural feel

### Common Animations

**Fade In**
```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
```

**Scale on Hover**
```javascript
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.2 }}
```

**Gradient Pulse**
```javascript
animate={{
  opacity: [0.3, 0.5, 0.3],
  scale: [1, 1.1, 1],
}}
transition={{
  duration: 4,
  repeat: Infinity,
  ease: 'easeInOut',
}}
```

**Scroll Reveal**
```javascript
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.8, delay: index * 0.15 }}
```

### Animation Timing

- **Micro-interactions**: 200ms
- **Hover effects**: 200-300ms
- **Page transitions**: 500-800ms
- **Background animations**: 4-10s (slow, continuous)

---

## Implementation Examples

### Color Usage in Code

**Tailwind Classes**
```jsx
// Background
bg-[#18021A]

// Brand colors
bg-[#AC0064] text-[#AC0064] border-[#AC0064]/30

// Gradients
bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]

// Text opacity
text-white/90 text-white/60 text-white/40

// Glass effects
bg-white/[0.03] border-white/[0.08]
```

**Inline Styles**
```jsx
// Gradients
background: 'radial-gradient(ellipse at center, rgba(100,16,154,0.25) 0%, transparent 65%)'

// Glows
boxShadow: '0_0_40px_rgba(172,0,100,0.3)'
```

### Typography in Code

```jsx
// Hero headline
className="text-5xl md:text-7xl font-extralight tracking-tight"

// Body text
className="text-lg text-white/60 font-light leading-relaxed"

// Gradient text
className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]"

// Uppercase label
className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase"
```

### Component Examples

**Card Component**
```jsx
<div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500">
  {/* Content */}
</div>
```

**Button Component**
```jsx
<button className="px-8 py-4 rounded-xl bg-[#AC0064] text-white font-medium hover:bg-[#C0007A] hover:shadow-[0_0_40px_rgba(172,0,100,0.3)] transition-all duration-500 hover:scale-[1.01]">
  Get Early Access
</button>
```

---

## Quick Reference

### Primary Colors
- Background: `#18021A`
- Primary: `#AC0064` (Magenta)
- Secondary: `#64109A` (Purple)
- Accent: `#9B4DCA` (Light Purple)
- Warm: `#E85A24` (Orange), `#FF8C42` (Light Orange), `#B56A00` (Amber)

### Typography
- Font: System fonts
- Weights: Extralight, Light, Medium, Semibold
- Tracking: Wide for headlines, normal for body

### Spacing
- Cards: `p-6` to `p-10` (24px - 40px)
- Sections: `py-24 md:py-32` (96px - 128px)
- Gaps: `gap-4` to `gap-12` (16px - 48px)

### Border Radius
- Small: `rounded-xl` (12px)
- Medium: `rounded-2xl` (16px)
- Large: `rounded-3xl` (24px)
- Full: `rounded-full` (for pills, buttons)

### Shadows & Glows
- Card hover: `shadow-[0_8px_40px_rgba(100,16,154,0.08)]`
- Button hover: `shadow-[0_0_40px_rgba(172,0,100,0.3)]`
- Text glow: `filter: blur(3xl)` with gradient background

---

## Brand Voice Checklist

When creating content, ensure it:

- [ ] Feels modern and sophisticated, not corporate
- [ ] Centers creators in the narrative
- [ ] Emphasizes experience and pleasure
- [ ] Uses direct, confident language
- [ ] Avoids jargon and generic platitudes
- [ ] Highlights benefits over features
- [ ] Maintains consistent tone across channels

---

## Design Checklist

When designing, ensure:

- [ ] Dark background (`#18021A`)
- [ ] Brand colors used appropriately
- [ ] Glassmorphism effects on cards
- [ ] Smooth animations and transitions
- [ ] Generous spacing and breathing room
- [ ] Mobile-responsive layout
- [ ] High contrast for readability
- [ ] Gradient accents for premium feel
- [ ] Microinteractions on interactive elements

---

**End of Brand Book**

For questions or updates, contact the design team.

