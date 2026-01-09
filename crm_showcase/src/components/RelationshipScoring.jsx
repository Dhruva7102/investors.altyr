import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, TrendingUp, Heart, Eye, Clock, BarChart3 } from 'lucide-react'

export default function RelationshipScoring({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('scoring')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('scoring')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const connectionDepthFactors = [
    { name: 'Engagement Frequency', weight: 30, icon: TrendingUp, description: 'Messages, interactions per month' },
    { name: 'Interaction Quality', weight: 25, icon: Heart, description: 'Response rate, message depth, conversation quality' },
    { name: 'Financial Engagement', weight: 20, icon: Target, description: 'Consistent spending patterns, not just total' },
    { name: 'Content Consumption', weight: 15, icon: Eye, description: 'Views, time spent, engagement depth' },
    { name: 'Platform Tenure', weight: 10, icon: Clock, description: 'Relationship duration and stability' },
  ]

  const relationshipHealthFactors = [
    { name: 'Connection Trend', weight: 40, description: 'Is relationship deepening or weakening?' },
    { name: 'Engagement Stability', weight: 30, description: 'Consistent or volatile engagement?' },
    { name: 'Financial Consistency', weight: 20, description: 'Steady spending or erratic?' },
    { name: 'Interaction Recency', weight: 10, description: 'How recent was last interaction?' },
  ]

  const getTierClasses = (color) => {
    const tierMap = {
      'status-casual': {
        bg: 'bg-status-casual/20',
        border: 'border-status-casual/50',
        text: 'text-status-casual',
      },
      'status-regular': {
        bg: 'bg-status-regular/20',
        border: 'border-status-regular/50',
        text: 'text-status-regular',
      },
      'status-vip': {
        bg: 'bg-status-vip/20',
        border: 'border-status-vip/50',
        text: 'text-status-vip',
      },
      'status-superfan': {
        bg: 'bg-status-superfan/20',
        border: 'border-status-superfan/50',
        text: 'text-status-superfan',
      },
    }
    return tierMap[color] || { bg: 'bg-white/20', border: 'border-white/50', text: 'text-white' }
  }

  const statusTiers = [
    { name: 'Casual', range: '0-30', color: 'status-casual', description: 'New or occasional fans' },
    { name: 'Regular', range: '31-60', color: 'status-regular', description: 'Active, engaged fans' },
    { name: 'VIP', range: '61-80', color: 'status-vip', description: 'High-value relationships' },
    { name: 'Superfan', range: '81-100', color: 'status-superfan', description: 'Deepest connections' },
  ]

  return (
    <section id="scoring" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-altyr-bg to-altyr-bg-dark" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-altyr-purple/50" />
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">Relationship Intelligence</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            Relationship <span className="text-gradient">Scoring</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            Automatic calculation of relationship depth and health to understand your fans at a deeper level
          </p>
        </motion.div>

        {/* Connection Depth Score */}
        <div className="mb-20">
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Connection Depth Score (0-100)</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {connectionDepthFactors.map((factor, index) => {
              const Icon = factor.icon
              return (
                <motion.div
                  key={index}
                  className="glass-card glass-card-hover rounded-xl p-5 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="p-3 rounded-xl bg-altyr-magenta/20 border border-altyr-magenta/30 w-fit mx-auto mb-3">
                    <Icon className="w-5 h-5 text-altyr-magenta" />
                  </div>
                  <div className="text-2xl font-semibold text-gradient mb-1">{factor.weight}%</div>
                  <div className="text-sm font-medium text-white/90 mb-1">{factor.name}</div>
                  <div className="text-xs text-white/50">{factor.description}</div>
                </motion.div>
              )
            })}
          </div>

          {/* Visual Breakdown */}
          <motion.div
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-lg font-light text-white/90 mb-6">Score Calculation Example</h4>
            <div className="space-y-4">
              {connectionDepthFactors.map((factor, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-white/70">{factor.name}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/50">{factor.weight}% weight</span>
                      <span className="text-xs text-white/70">Example: 85/100</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-altyr-magenta to-altyr-purple"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${factor.weight}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-sm text-white/70 text-right">
                    {Math.round(85 * (factor.weight / 100))} pts
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-24 text-sm font-medium text-white/90">Total Score</div>
                <div className="flex-1" />
                <div className="w-16 text-lg font-semibold text-gradient text-right">78/100</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Relationship Health Score */}
        <div className="mb-20">
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Relationship Health Score (0-100)</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {relationshipHealthFactors.map((factor, index) => (
              <motion.div
                key={index}
                className="glass-card glass-card-hover rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-2xl font-semibold text-gradient mb-2">{factor.weight}%</div>
                <div className="text-sm font-medium text-white/90 mb-2">{factor.name}</div>
                <div className="text-xs text-white/50">{factor.description}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Status Tier Mapping */}
        <div>
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Relationship Status Tiers</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {statusTiers.map((tier, index) => (
              <motion.div
                key={index}
                className="glass-card glass-card-hover rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-full ${getTierClasses(tier.color).bg} border-2 ${getTierClasses(tier.color).border} mx-auto mb-4 flex items-center justify-center`}>
                  <BarChart3 className={`w-8 h-8 ${getTierClasses(tier.color).text}`} />
                </div>
                <div className={`text-xl font-semibold mb-1 ${getTierClasses(tier.color).text}`}>{tier.name}</div>
                <div className="text-sm text-white/70 mb-2">{tier.range} Connection Score</div>
                <div className="text-xs text-white/50">{tier.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
