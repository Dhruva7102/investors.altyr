import React from 'react'
import {
  Star,
  Heart,
  Bird,
  Eye,
  Sparkles,
  Flame,
  ShieldCheck,
  Gift,
  Sprout,
  HandCoins,
  Wallet,
  CalendarCheck,
  Award,
} from 'lucide-react'

// Badge pill configuration (mirrors the production badgeConfig.js)

const BADGE_ICON_MAP = {
  Star, Heart, Bird, Eye, Sparkles, Flame, ShieldCheck, Gift, Sprout,
  HandCoins, Wallet, CalendarCheck, Award,
}

const BADGE_DEFS = {
  superfan:        { label: 'Superfan',        icon: 'Star',          color: '#FFD700' },
  devotee:         { label: 'Devotee',         icon: 'Heart',         color: '#A855F7' },
  angel:           { label: 'Angel',           icon: 'Bird',          color: '#60A5FA' },
  archangel:       { label: 'Archangel',       icon: 'Eye',           color: '#E5E4E2', glow: true },
  celestial:       { label: 'Celestial',       icon: 'Sparkles',      color: '#8B5CF6', gradient: ['#06B6D4', '#8B5CF6', '#EC4899'], animated: 'aurora' },
  seraph:          { label: 'Seraph',          icon: 'Flame',         color: '#EF4444', gradient: ['#F59E0B', '#EF4444', '#AC0064'], animated: 'flame' },
  founder:         { label: 'Founder',         icon: 'ShieldCheck',   color: '#AC0064', borderColor: '#FFD700' },
  anniversary:     { label: 'Anniversary',     icon: 'Gift',          color: '#F59E0B' },
  early_supporter: { label: 'Early Supporter', icon: 'Sprout',        color: '#10B981' },
  first_tip:       { label: 'First Tip',       icon: 'HandCoins',     color: '#CD7F32' },
  ten_tips:        { label: '10 Tips',         icon: 'HandCoins',     color: '#C0C0C0' },
  hundred_spend:   { label: '$100 Spend',      icon: 'Wallet',        color: '#FFD700' },
  three_month:     { label: '3-Month Sub',     icon: 'CalendarCheck', color: '#FFD700' },
}

/**
 * BadgePillV2 – Pill-shaped badge with icon + label.
 * For use in profile headers and badge showcases.
 *
 * Props:
 *   badgeId   – key from BADGE_DEFS
 *   size      – 'sm' (24px height) | 'md' (28px height)
 *   primary   – adds subtle glow ring
 *   className – additional class names
 */
export default function BadgePillV2({ badgeId, size = 'sm', primary = false, className = '' }) {
  const cfg = BADGE_DEFS[badgeId]
  if (!cfg) return null

  const Icon = BADGE_ICON_MAP[cfg.icon] || Award
  const color = cfg.color
  const gradient = cfg.gradient
  const accentColor = gradient ? gradient[1] : color
  const isAurora = cfg.animated === 'aurora'
  const isFlame = cfg.animated === 'flame'
  const hasGlow = cfg.glow || cfg.animated || primary

  const iconPx = size === 'sm' ? 14 : 16
  const heightClass = size === 'sm' ? 'h-6' : 'h-7'
  const textClass = size === 'sm' ? 'text-[11px]' : 'text-xs'

  const containerStyle = {
    backgroundColor: gradient ? `${gradient[1]}26` : `${color}26`,
    borderColor: cfg.borderColor || (gradient ? `${gradient[1]}4D` : `${color}4D`),
    '--badge-glow-color': `${accentColor}40`,
  }

  if (hasGlow && !isAurora && !isFlame) {
    containerStyle.boxShadow = `0 0 8px 0 ${accentColor}26`
  }

  const animClass = isAurora
    ? 'animate-badge-aurora'
    : isFlame
      ? 'animate-badge-flame'
      : ''

  const labelStyle = gradient
    ? {
        background: `linear-gradient(90deg, ${gradient.join(', ')})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }
    : { color: accentColor }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        ${heightClass} px-2.5
        rounded-full border
        font-medium
        transition-all duration-300
        hover:brightness-125
        ${animClass}
        ${className}
      `}
      style={containerStyle}
    >
      <Icon
        className="shrink-0"
        style={{ color: accentColor, width: iconPx, height: iconPx }}
      />
      <span className={`${textClass} leading-none whitespace-nowrap`} style={labelStyle}>
        {cfg.label}
      </span>
    </span>
  )
}

/**
 * BadgeStackV2 – Composites multiple badge pills with overflow.
 *
 * Props:
 *   badgeIds  – array of badge ID strings
 *   max       – maximum badges to display (default 3)
 *   size      – forwarded to BadgePillV2
 *   className – additional class names
 */
export function BadgeStackV2({ badgeIds = [], max = 3, size = 'sm', className = '' }) {
  if (!badgeIds.length) return null

  const visible = badgeIds.slice(0, max)
  const overflow = Math.max(0, badgeIds.length - max)

  return (
    <span className={`inline-flex items-center gap-2 flex-wrap ${className}`}>
      {visible.map((id, i) => (
        <BadgePillV2 key={id} badgeId={id} size={size} primary={i === 0} />
      ))}
      {overflow > 0 && (
        <span className="inline-flex items-center justify-center rounded-full bg-white/[0.06] text-white/50 border border-white/[0.08] text-[10px] h-5 px-2 font-medium tabular-nums">
          +{overflow}
        </span>
      )}
    </span>
  )
}
