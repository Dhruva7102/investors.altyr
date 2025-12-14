# Altyr Brand Book

**Version 1.0**  
**Last Updated:** December 2024

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Brand Voice & Tone](#brand-voice--tone)
5. [Design Principles](#design-principles)
6. [UI Components & Patterns](#ui-components--patterns)
7. [Animations & Interactions](#animations--interactions)
8. [Logo & Branding](#logo--branding)
9. [Usage Guidelines](#usage-guidelines)

---

## Brand Overview

### Mission
Altyr is an exclusive content platform that finally feels pleasurable. We're building the platform creators always wished existed—one that treats creators like professionals and fans like VIPs.

### Core Values
- **Modern & Responsive UX** - Beautiful, fast, intuitive experiences
- **Extensive Business Tooling** - Professional-grade analytics and tools
- **Rewarding, Gamified Fan Experiences** - Engaging interactions that drive value

### Brand Positioning
An exclusive content platform combining modern UX, serious business tooling, and gamified fan experiences to systematically grow creator revenue. We bring casino-grade and game-grade monetization design into the creator ecosystem.

---

## Color Palette

### Primary Colors

#### Dark Purple (Background)
- **Hex:** `#18021A`
- **RGB:** `rgb(24, 2, 26)`
- **Usage:** Primary background color across all platforms
- **Variations:**
  - Darker: `#0d0110` (for gradients and depth)
  - Lighter overlays: `rgba(24, 2, 26, 0.6)` with backdrop blur

#### Primary Accent (Magenta/Pink)
- **Hex:** `#AC0064`
- **RGB:** `rgb(172, 0, 100)`
- **Usage:** Primary CTA buttons, links, highlights, icons
- **Hover State:** `#C0007A`
- **Opacity Variations:**
  - `#AC0064/80` - Text and icons
  - `#AC0064/40` - Borders and subtle accents
  - `#AC0064/20` - Background overlays
  - `#AC0064/10` - Very subtle backgrounds

#### Secondary Accent (Deep Purple)
- **Hex:** `#64109A`
- **RGB:** `rgb(100, 16, 154)`
- **Usage:** Secondary accents, gradients, section dividers
- **Opacity Variations:**
  - `#64109A/50` - Borders and dividers
  - `#64109A/20` - Background overlays
  - `#64109A/10` - Subtle backgrounds

### Creator-Specific Colors (Orange/Gold)

#### Creator Primary
- **Hex:** `#B56A00`
- **RGB:** `rgb(181, 106, 0)`
- **Usage:** Creator-focused CTAs, badges, highlights
- **Hover State:** `#C97A00`

#### Creator Accent
- **Hex:** `#FFAA34`
- **RGB:** `rgb(255, 170, 52)`
- **Usage:** Creator icons, highlights, gradients
- **Variation:** `#E8840C` (darker for gradients)

### Gradient Palette

#### Primary Brand Gradient
- **From:** `#9B4DCA` (Purple)
- **Via:** `#E85A24` (Orange)
- **To:** `#FF8C42` (Light Orange)
- **Usage:** Logo text, hero headlines, major CTAs
- **Direction:** Horizontal (left to right)

#### Accent Gradient (Magenta to Purple)
- **From:** `#AC0064` (Magenta)
- **To:** `#64109A` (Deep Purple)
- **Usage:** Text highlights, section headers, card accents
- **Direction:** Horizontal (left to right)

#### Creator Gradient (Orange)
- **From:** `#FFAA34` (Light Orange)
- **To:** `#B56A00` (Dark Orange)
- **Usage:** Creator-specific CTAs and highlights
- **Direction:** Horizontal (left to right)

### Neutral Colors

#### Text Colors
- **Primary Text:** `white` or `white/90` (90% opacity)
- **Secondary Text:** `white/70` (70% opacity)
- **Tertiary Text:** `white/50` (50% opacity)
- **Muted Text:** `white/40` (40% opacity)
- **Very Muted:** `white/25` (25% opacity)

#### Border Colors
- **Primary Border:** `white/10` (10% opacity)
- **Accent Border:** `white/12` (12% opacity)
- **Hover Border:** `white/20` (20% opacity)
- **Accent Border (Magenta):** `#AC0064/30` or `#AC0064/40`

#### Background Overlays
- **Card Background:** `white/[0.02]` to `white/[0.05]`
- **Hover Background:** `white/[0.05]` to `white/[0.08]`
- **Gradient Overlays:** Various opacity levels (10-40%)

### Color Usage Guidelines

**Do:**
- Use primary magenta (`#AC0064`) for primary CTAs and important actions
- Use orange/gold palette for creator-specific features
- Maintain high contrast for readability (minimum 4.5:1)
- Use opacity variations for depth and hierarchy

**Don't:**
- Use pure white backgrounds (always use dark purple base)
- Mix creator and fan color palettes inappropriately
- Use colors at full opacity for large backgrounds (use opacity variations)
- Use more than 2-3 accent colors in a single component

---

## Typography

### Font Stack
```css
font-family: 'system-ui', '-apple-system', 'BlinkMacSystemFont', 
             '"Segoe UI"', 'sans-serif';
```

**Primary:** System fonts for performance and native feel

### Font Weights

#### Extralight (200)
- **Usage:** Large headlines, hero text, major statements
- **Example:** "an exclusive content platform that actually feels pleasurable"

#### Light (300)
- **Usage:** Body text, descriptions, secondary content
- **Example:** Section descriptions, card content

#### Medium (500)
- **Usage:** CTAs, buttons, emphasized text
- **Example:** Button labels, important callouts

#### Regular (400)
- **Usage:** Standard body text, form labels
- **Example:** Form inputs, general content

### Font Sizes

#### Headlines
- **Hero (Desktop):** `text-7xl` to `text-8xl` (4.5rem - 6rem)
- **Hero (Mobile):** `text-5xl` to `text-6xl` (3rem - 3.75rem)
- **Section Headers:** `text-5xl` to `text-7xl` (3rem - 4.5rem)
- **Subsection Headers:** `text-2xl` to `text-4xl` (1.5rem - 2.25rem)

#### Body Text
- **Large:** `text-lg` to `text-xl` (1.125rem - 1.25rem)
- **Standard:** `text-base` (1rem)
- **Small:** `text-sm` (0.875rem)
- **Extra Small:** `text-xs` (0.75rem)

### Letter Spacing

#### Wide Tracking
- **Usage:** Uppercase labels, section headers
- **Value:** `tracking-[0.35em]` to `tracking-[0.12em]`
- **Example:** "MARKET OPPORTUNITY", "ALTYR" logo

#### Standard Tracking
- **Usage:** Body text, most content
- **Value:** Default or `tracking-tight` for headlines

### Text Styles

#### Gradient Text
- **Usage:** Headlines, brand name, key phrases
- **Implementation:** `bg-gradient-to-r from-[#AC0064] to-[#64109A] bg-clip-text text-transparent`
- **Alternative:** `from-[#9B4DCA] via-[#E85A24] to-[#FF8C42]` for logo

#### Italic Text
- **Usage:** Emphasis, quotes, subtle emphasis
- **Example:** "actually" in hero headline

### Typography Guidelines

**Do:**
- Use extralight/light weights for elegance and sophistication
- Maintain generous line-height for readability (`leading-relaxed`)
- Use gradient text sparingly for maximum impact
- Ensure sufficient contrast (minimum 4.5:1)

**Don't:**
- Use heavy/bold weights (breaks elegant aesthetic)
- Overuse gradient text (reserve for key moments)
- Use more than 2-3 font sizes in a single section
- Compromise readability for style

---

## Brand Voice & Tone

### Voice Characteristics

#### Professional yet Approachable
- **Tone:** Confident, clear, and direct
- **Avoid:** Corporate jargon, overly casual language
- **Example:** "An exclusive content platform that actually feels pleasurable"

#### Creator-Focused
- **Perspective:** Built with creators, not just for them
- **Language:** Acknowledges creator expertise and needs
- **Example:** "We're building the platform creators always wished existed"

#### Data-Driven
- **Evidence-Based:** Use concrete numbers and facts
- **Transparent:** Clear about value proposition
- **Example:** "$50+ Billion combined market value of top 5 platforms"

### Tone by Context

#### Investor-Facing
- **Tone:** Professional, data-driven, opportunity-focused
- **Language:** Business terminology, market analysis, ROI focus
- **Example:** "20%+ commission rates on high-margin business"

#### Creator-Facing
- **Tone:** Empowering, supportive, professional
- **Language:** Acknowledges creator expertise, focuses on tools and growth
- **Example:** "Extensive Business tooling" for serious earners

#### Fan-Facing
- **Tone:** Engaging, exciting, rewarding
- **Language:** Emphasizes experience, gamification, rewards
- **Example:** "Rewarding, gamified fan experiences"

### Writing Guidelines

**Do:**
- Use active voice
- Be specific and concrete
- Focus on benefits, not just features
- Use "we" and "our" to show partnership
- Keep sentences concise and clear

**Don't:**
- Use vague marketing speak
- Overpromise or exaggerate
- Use passive voice unnecessarily
- Include unnecessary jargon
- Write in third person about the company

### Key Messaging

#### Value Propositions
1. **For Creators:** "Modern UX + Business Tooling + Gamified Experiences"
2. **For Fans:** "Rewarding, engaging platform experience"
3. **For Investors:** "High-margin business with proven economics"

#### Taglines
- "An exclusive content platform that actually feels pleasurable"
- "Built With Creators, Not Just For Them"
- "For Creators, Built Like a Game"

---

## Design Principles

### 1. Dark-First Design
- Always use dark purple (`#18021A`) as base
- Never use light backgrounds
- Maintain dark aesthetic across all touchpoints

### 2. Elegant Minimalism
- Generous white space
- Clean, uncluttered layouts
- Focus on essential elements

### 3. Sophisticated Gradients
- Use gradients for depth and visual interest
- Apply subtle opacity variations
- Create layered visual hierarchy

### 4. Glass Morphism
- Subtle backdrop blur effects
- Semi-transparent overlays
- Depth through layering

### 5. Micro-Interactions
- Smooth, purposeful animations
- Hover states on all interactive elements
- Feedback for user actions

### 6. Responsive & Accessible
- Mobile-first approach
- Touch-friendly targets (minimum 44x44px)
- High contrast for readability
- Smooth scrolling and transitions

### 7. Performance-Focused
- System fonts for speed
- Optimized animations
- Lazy loading where appropriate

---

## UI Components & Patterns

### Buttons

#### Primary CTA (Magenta)
```css
background: #AC0064
hover: #C0007A
shadow: rgba(172,0,100,0.3)
border-radius: 0.75rem to 1rem
padding: 0.875rem to 1.25rem
```

#### Creator CTA (Orange)
```css
background: #B56A00
hover: #C97A00
shadow: rgba(181,106,0,0.3)
```

#### Secondary Button
```css
background: white/[0.06]
border: white/[0.12]
hover: white/[0.08]
```

### Cards

#### Standard Card
- **Background:** `white/[0.02]` to `white/[0.05]`
- **Border:** `white/[0.08]` to `white/[0.12]`
- **Border Radius:** `rounded-xl` to `rounded-2xl` (0.75rem - 1rem)
- **Padding:** `p-6` to `p-8` (1.5rem - 2rem)
- **Hover:** Scale `1.02`, increased opacity, subtle glow

#### Feature Card
- **Icon Container:** Gradient background `from-[#AC0064]/20 to-[#64109A]/20`
- **Border:** `border-[#AC0064]/30`
- **Hover Effects:** Border color increase, background opacity increase

### Form Elements

#### Input Fields
- **Background:** `white/[0.03]`
- **Border:** `white/10`
- **Focus Border:** `white/20`
- **Text Color:** `white` with placeholder `white/30`
- **Border Radius:** `rounded-xl` (0.75rem)
- **Padding:** `h-14 px-5` (3.5rem height, 1.25rem horizontal)

#### Labels
- **Color:** `white/70` to `white/90`
- **Font:** Light weight, small to base size
- **Spacing:** `mb-2` below label

### Section Dividers

#### Decorative Lines
- **Style:** Horizontal lines with gradient fade
- **Implementation:** `bg-gradient-to-r from-transparent to-[#64109A]/50`
- **Width:** `w-16` (4rem)
- **Height:** `h-px` (1px)

#### Section Labels
- **Style:** Uppercase, wide tracking
- **Color:** `#AC0064/80`
- **Size:** `text-xs`
- **Tracking:** `tracking-[0.35em]`

### Badges & Tags

#### Status Badge
- **Background:** `#AC0064/10` to `#AC0064/15`
- **Border:** `border-[#AC0064]/20` to `border-[#AC0064]/25`
- **Text:** Uppercase, `text-xs`, wide tracking
- **Padding:** `px-4 py-2` to `px-5 py-2.5`
- **Border Radius:** `rounded-full`

### Navigation

#### Side Navigation
- **Position:** Fixed right side
- **Indicators:** Dots with connecting lines
- **Active State:** Gradient dot `from-[#AC0064] to-[#64109A]`
- **Hover:** Scale `1.1`, label appears
- **Label Background:** Gradient `from-[#AC0064]/20 to-[#64109A]/20`

---

## Animations & Interactions

### Animation Principles

#### Smooth & Purposeful
- **Duration:** 0.5s to 1s for major animations
- **Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (custom ease-out)
- **Purpose:** Every animation should have meaning

#### Scroll-Triggered
- **Trigger:** Intersection Observer API
- **Effect:** Fade in + slide up
- **Stagger:** 0.1s to 0.15s delay between items
- **Viewport:** `margin: "-60px"` to `"-80px"` for early trigger

### Common Animations

#### Fade In
```javascript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.8 }}
```

#### Slide Up
```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
```

#### Scale on Hover
```javascript
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.2 }}
```

#### Rotate on Hover
```javascript
whileHover={{ rotate: 3 }}
transition={{ duration: 0.3 }}
```

### Background Animations

#### Gradient Orbs
- **Type:** Radial gradients with blur
- **Animation:** Scale and opacity pulsing
- **Duration:** 10s infinite loop
- **Effect:** Subtle, ambient movement

#### Glow Effects
- **Type:** Box shadow or gradient overlay
- **Animation:** Opacity pulsing
- **Duration:** 4s infinite loop
- **Effect:** Breathing, living feel

### Interaction Patterns

#### Hover States
- **Buttons:** Scale, color change, shadow increase
- **Cards:** Scale, border/background opacity increase, glow
- **Links:** Color transition, underline (if applicable)
- **Icons:** Scale, rotate, color change

#### Loading States
- **Spinner:** Rotating icon (Loader2 from lucide-react)
- **Skeleton:** Subtle pulsing background
- **Progress:** Smooth transitions

#### Success States
- **Check Icon:** Scale animation on appear
- **Color:** Green or brand accent color
- **Message:** Fade in with slight delay

---

## Logo & Branding

### Logo Treatment

#### Wordmark
- **Text:** "ALTYR"
- **Style:** Uppercase, wide tracking (`tracking-[0.12em]`)
- **Gradient:** `from-[#9B4DCA] via-[#E85A24] to-[#FF8C42]`
- **Size:** Responsive, scales from `text-5xl` to `text-8xl`

#### Favicon
- **Style:** Liquid glass effect
- **Colors:** Gradient from purple to orange
- **Text:** Cursive "Altyr" centered
- **Format:** SVG for scalability

### Brand Name Usage

#### Standard
- **Format:** "Altyr" (capital A, lowercase rest)
- **Context:** General usage, body text

#### Emphasized
- **Format:** "ALTYR" (all caps)
- **Context:** Headlines, logo, major statements

#### With Tagline
- **Format:** "Altyr, An Exclusive Content platform..."
- **Context:** Hero sections, major introductions

### Color Variations

#### Light Background (Rare)
- Use dark purple logo on light backgrounds
- Maintain gradient treatment
- Ensure sufficient contrast

#### Dark Background (Standard)
- Gradient logo as standard
- White/light text for contrast
- Glow effects for emphasis

---

## Usage Guidelines

### Do's ✅

1. **Maintain Dark Aesthetic**
   - Always use `#18021A` as base background
   - Use opacity variations for depth
   - Never use pure white backgrounds

2. **Use Brand Colors Consistently**
   - Magenta (`#AC0064`) for primary actions
   - Orange (`#B56A00`) for creator features
   - Purple (`#64109A`) for secondary accents

3. **Apply Gradients Strategically**
   - Use for headlines and key moments
   - Don't overuse (maintain impact)
   - Ensure readability

4. **Maintain Typography Hierarchy**
   - Use extralight/light weights
   - Generous spacing and line-height
   - Clear size progression

5. **Animate Purposefully**
   - Every animation should have meaning
   - Keep durations smooth (0.5s-1s)
   - Use scroll triggers for engagement

6. **Design for Mobile First**
   - Touch-friendly targets
   - Responsive typography
   - Vertical layouts on mobile

### Don'ts ❌

1. **Don't Break the Dark Theme**
   - No light backgrounds
   - No high-contrast light elements
   - Maintain consistent dark aesthetic

2. **Don't Overuse Gradients**
   - Reserve for key moments
   - Don't apply to all text
   - Maintain readability

3. **Don't Use Heavy Font Weights**
   - Avoid bold/black weights
   - Breaks elegant aesthetic
   - Stick to extralight/light/medium

4. **Don't Clutter Interfaces**
   - Maintain generous white space
   - Focus on essential elements
   - Avoid information overload

5. **Don't Ignore Performance**
   - Optimize animations
   - Use system fonts
   - Lazy load where appropriate

6. **Don't Mix Color Palettes Inappropriately**
   - Keep creator and fan colors separate
   - Use magenta for general brand
   - Use orange only for creator features

### Accessibility

#### Contrast Ratios
- **Text on Background:** Minimum 4.5:1
- **Large Text:** Minimum 3:1
- **Interactive Elements:** Clear visual states

#### Touch Targets
- **Minimum Size:** 44x44px
- **Spacing:** Adequate padding between targets
- **Mobile:** Larger targets for thumb zones

#### Keyboard Navigation
- **Focus States:** Clear visual indicators
- **Tab Order:** Logical flow
- **Skip Links:** Where appropriate

### Responsive Breakpoints

#### Mobile
- **Max Width:** 640px (sm)
- **Layout:** Single column, vertical stacking
- **Typography:** Smaller sizes, adjusted spacing

#### Tablet
- **Width:** 641px - 1024px (md)
- **Layout:** 2-column grids, adjusted spacing
- **Typography:** Medium sizes

#### Desktop
- **Min Width:** 1025px (lg+)
- **Layout:** Multi-column, full width
- **Typography:** Full sizes, generous spacing

---

## Implementation Examples

### Hero Section
```jsx
// Background
bg-[#18021A]

// Headline
text-4xl md:text-6xl font-extralight
bg-gradient-to-r from-[#AC0064] to-[#64109A] bg-clip-text

// CTA Button
bg-[#AC0064] hover:bg-[#C0007A]
rounded-xl px-8 py-4
```

### Feature Card
```jsx
// Container
bg-white/[0.03] border border-white/[0.08]
rounded-2xl p-8
hover:bg-white/[0.05] hover:scale-[1.02]

// Icon
bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20
border border-[#AC0064]/30
```

### Section Divider
```jsx
// Lines
w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50

// Label
text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase
```

---

## Resources

### Design Files
- **Favicon:** `/public/favicon.svg` (both sites)
- **Color Palette:** See Color Palette section above
- **Component Library:** React components in `/src/components`

### Code References
- **Investor Site:** `/investor_site/src`
- **Waitlist Site:** `/waitlist_site/src`
- **Styling:** Tailwind CSS with custom colors

### External Resources
- **Icons:** Lucide React (`lucide-react`)
- **Animations:** Framer Motion (`framer-motion`)
- **Fonts:** System fonts (no external dependencies)

---

## Version History

- **v1.0** (December 2024) - Initial brand book creation

---

**Questions or Updates?**  
Contact the design team or refer to the codebase for implementation details.

---

*This brand book is a living document and will be updated as the brand evolves.*

