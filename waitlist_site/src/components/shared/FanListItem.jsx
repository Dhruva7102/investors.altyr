import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown, Minus, MessageSquare, Gift, Eye } from 'lucide-react'
import StatusBadge from './StatusBadge'
import ConnectionScoreBar from './ConnectionScoreBar'

export default function FanListItem({
  fan,
  onClick,
  showActions = true,
  compact = false,
  animate = true,
  delay = 0,
  className = '',
}) {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-400" />
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-400" />
      default:
        return <Minus className="w-4 h-4 text-white/40" />
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const content = (
    <div
      className={`
        glass-card-interactive rounded-xl
        ${compact ? 'p-3' : 'p-4'}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className={`
              ${compact ? 'w-10 h-10' : 'w-12 h-12'}
              rounded-full
              bg-gradient-to-br from-altyr-magenta/40 to-altyr-purple/40
              border-2 border-altyr-magenta/50
              flex items-center justify-center
              text-white font-medium
              ${compact ? 'text-sm' : 'text-base'}
            `}
          >
            {fan.initials}
          </div>
          {/* Health trend indicator */}
          <div className="absolute -bottom-1 -right-1">{getTrendIcon(fan.healthTrend)}</div>
        </div>

        {/* Fan info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-medium text-white/90 truncate ${compact ? 'text-sm' : ''}`}>{fan.name}</span>
            <StatusBadge status={fan.status} size="xs" />
          </div>

          {!compact && (
            <div className="flex items-center gap-4 text-xs text-white/50">
              <span>LTV: {formatCurrency(fan.ltv)}</span>
              <span>{fan.lastInteraction}</span>
            </div>
          )}
        </div>

        {/* Connection score */}
        <div className={`flex-shrink-0 ${compact ? 'w-16' : 'w-24'}`}>
          <ConnectionScoreBar score={fan.connectionScore} showLabel={!compact} size={compact ? 'sm' : 'md'} animate={animate} />
        </div>

        {/* Quick actions */}
        {showActions && !compact && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" onClick={(e) => { e.stopPropagation() }}>
              <MessageSquare className="w-4 h-4 text-white/50 hover:text-altyr-magenta" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" onClick={(e) => { e.stopPropagation() }}>
              <Gift className="w-4 h-4 text-white/50 hover:text-altyr-magenta" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" onClick={(e) => { e.stopPropagation() }}>
              <Eye className="w-4 h-4 text-white/50 hover:text-altyr-magenta" />
            </button>
          </div>
        )}
      </div>
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}

