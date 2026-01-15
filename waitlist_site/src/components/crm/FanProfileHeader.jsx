import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Gift, Star, Calendar, Heart } from 'lucide-react'
import { StatusBadge, ConnectionScoreBar, GlassCard } from '@/components/shared'

export default function FanProfileHeader({ fan }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const stats = [
    { label: 'Messages', value: fan.totalMessages, icon: MessageSquare },
    { label: 'Purchases', value: fan.totalPurchases, icon: Gift },
    { label: 'Level', value: fan.level, icon: Star },
    { label: 'Months', value: fan.subscriptionMonths, icon: Calendar },
  ]

  return (
    <GlassCard className="overflow-hidden" padding="p-0">
      {/* Background gradient */}
      <div className="h-24 bg-gradient-to-r from-altyr-magenta/30 via-altyr-purple/20 to-altyr-bg relative">
        <div className="absolute inset-0 bg-gradient-to-t from-altyr-bg to-transparent" />
      </div>

      <div className="px-6 pb-6 -mt-12 relative">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-altyr-magenta/50 to-altyr-purple/50 border-4 border-altyr-bg flex items-center justify-center text-3xl font-light text-white shadow-xl">
              {fan.initials}
            </div>
            {fan.subscriptionStatus && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-2 border-altyr-bg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
            )}
          </motion.div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl font-light text-white/90">{fan.name}</h1>
              <StatusBadge status={fan.status} size="md" />
              <StatusBadge status={fan.churnRisk} type="churn" size="sm" />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span>
                LTV: <span className="text-gradient font-medium">{formatCurrency(fan.ltv)}</span>
              </span>
              <span>•</span>
              <span>Last active: {fan.lastInteraction}</span>
              <span>•</span>
              <span>{fan.subscriptionStatus ? 'Active subscriber' : 'Not subscribed'}</span>
            </div>
          </div>

          {/* Connection Score - Large */}
          <div className="lg:w-48">
            <div className="text-center mb-2">
              <span className="text-4xl font-extralight text-gradient">{fan.connectionScore}</span>
              <span className="text-lg text-white/40">/100</span>
            </div>
            <ConnectionScoreBar score={fan.connectionScore} showLabel={false} size="lg" />
            <p className="text-xs text-white/40 text-center mt-2">Connection Depth</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/[0.08]">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-altyr-purple-light" />
              </div>
              <div>
                <div className="text-lg font-light text-white/90">{stat.value}</div>
                <div className="text-xs text-white/40">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Send Message
          </button>
          <button className="flex-1 py-3 rounded-xl glass-card hover:bg-white/[0.05] text-white/80 font-medium text-sm transition-all flex items-center justify-center gap-2">
            <Gift className="w-4 h-4" />
            Send Gift
          </button>
        </div>
      </div>
    </GlassCard>
  )
}

