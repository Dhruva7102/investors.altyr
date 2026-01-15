import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ShoppingCart, Star, Award, Heart } from 'lucide-react'

const typeConfig = {
  message: {
    icon: MessageSquare,
    bg: 'bg-altyr-purple-light/20',
    border: 'border-altyr-purple-light/30',
    iconColor: 'text-altyr-purple-light',
  },
  tip: {
    icon: Heart,
    bg: 'bg-altyr-magenta/20',
    border: 'border-altyr-magenta/30',
    iconColor: 'text-altyr-magenta',
  },
  purchase: {
    icon: ShoppingCart,
    bg: 'bg-altyr-orange/20',
    border: 'border-altyr-orange/30',
    iconColor: 'text-altyr-orange',
  },
  subscription: {
    icon: Star,
    bg: 'bg-status-superfan/20',
    border: 'border-status-superfan/30',
    iconColor: 'text-status-superfan',
  },
  milestone: {
    icon: Award,
    bg: 'bg-badge-gold/20',
    border: 'border-badge-gold/30',
    iconColor: 'text-badge-gold',
  },
}

export default function TimelineItem({ interaction, animate = true, delay = 0, showConnector = true, className = '' }) {
  const config = typeConfig[interaction.type] || typeConfig.message
  const Icon = config.icon

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    })
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const content = (
    <div className={`flex gap-4 ${className}`}>
      {/* Icon and connector line */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg} border ${config.border}`}>
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        {showConnector && <div className="w-px flex-1 bg-gradient-to-b from-white/20 to-transparent min-h-[20px]" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <p className="text-sm text-white/80">{interaction.description}</p>
            </div>
            {interaction.amount && <span className="text-sm font-medium text-gradient">{formatAmount(interaction.amount)}</span>}
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>{formatTimestamp(interaction.timestamp)}</span>
            {interaction.sentiment && (
              <>
                <span>•</span>
                <span
                  className={
                    interaction.sentiment === 'positive'
                      ? 'text-green-400'
                      : interaction.sentiment === 'negative'
                        ? 'text-red-400'
                        : 'text-white/40'
                  }
                >
                  {interaction.sentiment}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}

