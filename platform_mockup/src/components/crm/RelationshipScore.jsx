import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { GlassCard, IconContainer } from '@/components/shared'

const scoreFactors = [
  { name: 'Engagement Frequency', weight: 30, description: 'How often they interact' },
  { name: 'Interaction Quality', weight: 25, description: 'Depth of conversations' },
  { name: 'Financial Engagement', weight: 20, description: 'Spending patterns' },
  { name: 'Content Consumption', weight: 15, description: 'Views and time spent' },
  { name: 'Platform Tenure', weight: 10, description: 'Length of relationship' },
]

export default function RelationshipScore({ fan }) {
  // Calculate scores based on fan data (simplified calculation)
  const calculateFactorScore = (factor) => {
    switch (factor.name) {
      case 'Engagement Frequency':
        return Math.min(100, Math.round((fan.totalMessages / 300) * 100))
      case 'Interaction Quality':
        return fan.sentiment === 'positive' ? 85 : fan.sentiment === 'neutral' ? 60 : 40
      case 'Financial Engagement':
        return Math.min(100, Math.round((fan.ltv / 5000) * 100))
      case 'Content Consumption':
        return Math.min(100, Math.round((fan.totalPurchases / 50) * 100))
      case 'Platform Tenure':
        return Math.min(100, fan.subscriptionMonths * 8)
      default:
        return 50
    }
  }

  return (
    <GlassCard padding="p-0">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <IconContainer icon={TrendingUp} size="sm" />
          <div>
            <h3 className="text-lg font-light text-white/90">Relationship Score Breakdown</h3>
            <p className="text-xs text-white/50">What drives connection depth</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-extralight text-gradient">{fan.connectionScore}</span>
          <span className="text-sm text-white/40">/100</span>
        </div>
      </div>

      {/* Factors */}
      <div className="p-6 space-y-5">
        {scoreFactors.map((factor, index) => {
          const score = calculateFactorScore(factor)
          const weightedScore = (score * factor.weight) / 100
          
          return (
            <motion.div
              key={factor.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm text-white/80">{factor.name}</span>
                  <span className="text-xs text-white/40 ml-2">({factor.weight}% weight)</span>
                </div>
                <div className="text-sm">
                  <span className="text-white/60">{score}</span>
                  <span className="text-white/30">/100</span>
                </div>
              </div>
              
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-altyr-magenta to-altyr-purple rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                />
              </div>
              
              <p className="text-xs text-white/40 mt-1">{factor.description}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="p-6 border-t border-white/[0.08] bg-white/[0.02]">
        <p className="text-sm text-white/60">
          <span className="text-gradient font-medium">Insight:</span>{' '}
          {fan.connectionScore >= 80 
            ? 'Exceptional relationship depth. Prioritize personalized engagement.'
            : fan.connectionScore >= 60
            ? 'Strong connection. Focus on increasing interaction quality.'
            : fan.connectionScore >= 40
            ? 'Developing relationship. Encourage more frequent engagement.'
            : 'Early relationship stage. Focus on building trust and rapport.'
          }
        </p>
      </div>
    </GlassCard>
  )
}
