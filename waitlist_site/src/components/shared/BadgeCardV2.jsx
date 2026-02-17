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
  Lock,
  MessageSquare,
  CreditCard,
  Users,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Badge configuration (mirrors website-frontend-service/components/badges/badgeConfig.js)
// ---------------------------------------------------------------------------

const BADGE_ICON_MAP = {
  Star, Heart, Bird, Eye, Sparkles, Flame, ShieldCheck, Gift, Sprout,
  HandCoins, Wallet, CalendarCheck, Award, MessageSquare, CreditCard, Users,
}

const RARITY_COLORS = {
  bronze:   { color: '#CD7F32', bg: 'bg-badge-bronze/20', border: 'border-badge-bronze/40', text: 'text-badge-bronze' },
  silver:   { color: '#C0C0C0', bg: 'bg-badge-silver/20', border: 'border-badge-silver/40', text: 'text-badge-silver' },
  gold:     { color: '#FFD700', bg: 'bg-badge-gold/20',   border: 'border-badge-gold/40',   text: 'text-badge-gold' },
  platinum: { color: '#E5E4E2', bg: 'bg-badge-platinum/20', border: 'border-badge-platinum/40', text: 'text-badge-platinum' },
}

const TIER_COLORS = {
  superfan:  { color: '#FFD700', icon: 'Star' },
  devotee:   { color: '#A855F7', icon: 'Heart' },
  angel:     { color: '#60A5FA', icon: 'Bird' },
  archangel: { color: '#E5E4E2', icon: 'Eye', glow: true },
  celestial: { color: '#8B5CF6', icon: 'Sparkles', gradient: ['#06B6D4', '#8B5CF6', '#EC4899'], animated: 'aurora' },
  seraph:    { color: '#EF4444', icon: 'Flame', gradient: ['#F59E0B', '#EF4444', '#AC0064'], animated: 'flame' },
}

const SPECIAL_COLORS = {
  founder:         { color: '#AC0064', borderColor: '#FFD700', icon: 'ShieldCheck' },
  anniversary:     { color: '#F59E0B', icon: 'Gift' },
  early_supporter: { color: '#10B981', icon: 'Sprout' },
}

/**
 * BadgeCardV2 – Production-quality badge card for collection grids.
 * Replaces the old emoji-based badge rendering.
 *
 * Props:
 *   name        – display label (e.g. "First Steps")
 *   rarity      – 'bronze' | 'silver' | 'gold' | 'platinum'
 *   requirement – text description of how to earn
 *   unlocked    – whether the user has earned this badge
 *   icon        – Lucide icon name key (optional, defaults based on rarity)
 *   tierId      – optional tier key for status badges (e.g. 'devotee')
 *   specialId   – optional special badge key (e.g. 'founder')
 *   earnedAt    – optional ISO date string
 *   className   – additional class names
 */
export default function BadgeCardV2({
  name,
  rarity,
  requirement,
  unlocked = false,
  icon: iconName,
  tierId,
  specialId,
  earnedAt,
  className = '',
}) {
  // Resolve color and icon based on badge type
  let accentColor = '#6B7280'
  let IconComponent = Award
  let hasGlow = false
  let isAnimated = null
  let gradient = null
  let borderOverride = null

  if (tierId && TIER_COLORS[tierId]) {
    const tier = TIER_COLORS[tierId]
    accentColor = tier.color
    IconComponent = BADGE_ICON_MAP[tier.icon] || Award
    hasGlow = tier.glow || false
    isAnimated = tier.animated || null
    gradient = tier.gradient || null
  } else if (specialId && SPECIAL_COLORS[specialId]) {
    const special = SPECIAL_COLORS[specialId]
    accentColor = special.color
    borderOverride = special.borderColor
    IconComponent = BADGE_ICON_MAP[special.icon] || Award
  } else if (rarity && RARITY_COLORS[rarity]) {
    accentColor = RARITY_COLORS[rarity].color
    IconComponent = iconName ? (BADGE_ICON_MAP[iconName] || Award) : Award
  }

  if (iconName && BADGE_ICON_MAP[iconName]) {
    IconComponent = BADGE_ICON_MAP[iconName]
  }

  const rarityLabel = rarity || (tierId ? 'status' : specialId ? 'special' : 'achievement')

  // Styles
  const iconBgStyle = gradient
    ? { background: `linear-gradient(135deg, ${gradient.map(c => c + '33').join(', ')})` }
    : { backgroundColor: `${accentColor}33` }

  const iconBorderColor = borderOverride || (gradient ? `${gradient[1]}4D` : `${accentColor}4D`)

  const animClass = unlocked && isAnimated === 'aurora'
    ? 'animate-badge-aurora'
    : unlocked && isAnimated === 'flame'
      ? 'animate-badge-flame'
      : ''

  const cardGlowStyle = unlocked && (hasGlow || isAnimated)
    ? { '--badge-glow-color': `${accentColor}30` }
    : {}

  return (
    <div
      className={`
        relative flex flex-col items-center text-center
        rounded-xl border p-5
        transition-all duration-300
        ${unlocked
          ? 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] backdrop-blur-sm'
          : 'bg-white/[0.01] border-dashed border-white/[0.06] opacity-40'
        }
        ${unlocked && (hasGlow || isAnimated) ? 'animate-badge-glow' : ''}
        ${animClass}
        ${className}
      `}
      style={cardGlowStyle}
    >
      {/* Icon circle */}
      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center
          border mb-3
          ${!unlocked ? 'grayscale' : ''}
        `}
        style={{ ...iconBgStyle, borderColor: iconBorderColor }}
      >
        <IconComponent
          className={`w-5 h-5 ${!unlocked ? 'text-white/20' : ''}`}
          style={unlocked ? { color: accentColor } : undefined}
        />
      </div>

      {/* Badge name */}
      <div className={`text-sm font-medium mb-1 ${unlocked ? 'text-white/90' : 'text-white/30'}`}>
        {name}
      </div>

      {/* Rarity / category tag */}
      <div
        className="text-[10px] uppercase tracking-wider font-medium mb-2"
        style={{ color: unlocked ? accentColor : '#6B728066' }}
      >
        {rarityLabel}
      </div>

      {/* Description */}
      {requirement && (
        <div className={`text-xs leading-relaxed ${unlocked ? 'text-white/50' : 'text-white/20'}`}>
          {requirement}
        </div>
      )}

      {/* Earned date */}
      {unlocked && earnedAt && (
        <div className="text-[10px] text-white/30 mt-2">
          {new Date(earnedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      )}

      {/* Locked indicator */}
      {!unlocked && (
        <div className="absolute top-2 right-2">
          <Lock className="w-3.5 h-3.5 text-white/20" />
        </div>
      )}
    </div>
  )
}
