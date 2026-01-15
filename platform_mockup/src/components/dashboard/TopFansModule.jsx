import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Crown, ArrowRight } from 'lucide-react'
import { GlassCard, FanListItem, IconContainer } from '@/components/shared'
import { getTopFansByLTV } from '@/data/mockFans'

export default function TopFansModule() {
  const navigate = useNavigate()
  const topFans = getTopFansByLTV(5)

  return (
    <GlassCard className="h-full" padding="p-0" delay={0.4}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <IconContainer icon={Crown} size="sm" variant="warning" />
          <div>
            <h3 className="text-lg font-light text-white/90">Top Fans</h3>
            <p className="text-xs text-white/50">By lifetime value</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/fans')}
          className="flex items-center gap-1 text-sm text-altyr-magenta hover:text-altyr-purple-light transition-colors"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Fan list */}
      <div className="p-4 space-y-2">
        {topFans.map((fan, index) => (
          <FanListItem
            key={fan.id}
            fan={fan}
            onClick={() => navigate(`/fan/${fan.id}`)}
            compact
            delay={0.5 + index * 0.1}
          />
        ))}
      </div>
    </GlassCard>
  )
}
