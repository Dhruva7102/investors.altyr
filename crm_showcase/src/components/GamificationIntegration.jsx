import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Award, TrendingUp, Gift, Target, Zap } from 'lucide-react'

export default function GamificationIntegration({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('gamification')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('gamification')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const integrations = [
    {
      title: 'Relationship Scores → Gamification Tiers',
      description: 'Connection depth score automatically determines fan tier level',
      flow: [
        { from: 'Connection Score: 0-30', to: 'Casual Tier', icon: Award },
        { from: 'Connection Score: 31-60', to: 'Regular Tier', icon: Award },
        { from: 'Connection Score: 61-80', to: 'VIP Tier', icon: Award },
        { from: 'Connection Score: 81-100', to: 'Superfan Tier', icon: Award },
      ],
    },
    {
      title: 'Financial Engagement → Progression Points',
      description: 'Spending patterns contribute to XP and level progression',
      flow: [
        { from: 'Consistent Spending', to: '+25% XP Bonus', icon: TrendingUp },
        { from: 'High-Value Transactions', to: 'Badge Eligibility', icon: Gift },
        { from: 'Subscription Renewals', to: 'Streak Multipliers', icon: Zap },
      ],
    },
    {
      title: 'Interaction History → Badge Eligibility',
      description: 'Message frequency and quality unlock achievement badges',
      flow: [
        { from: '500+ Messages', to: 'Conversationalist Badge', icon: Award },
        { from: '12 Month Subscription', to: 'Dedicated Badge', icon: Target },
        { from: 'Top 1% Supporter', to: 'VIP Badge', icon: Gift },
      ],
    },
    {
      title: 'Relationship Milestones → Special Rewards',
      description: 'Reaching relationship thresholds unlocks exclusive rewards',
      flow: [
        { from: 'Connection Score 50+', to: 'Unlock Profile Banner', icon: Gift },
        { from: 'VIP Status Reached', to: 'Exclusive Content Access', icon: Award },
        { from: 'Superfan Milestone', to: 'Legendary Badge', icon: Zap },
      ],
    },
  ]

  const dataFlow = [
    { step: 'Event Tracking', description: 'Views, messages, purchases, interactions' },
    { step: 'Analytics Profile', description: 'Aggregated insights generated' },
    { step: 'CRM Metrics', description: 'Relationship scores calculated' },
    { step: 'Gamification System', description: 'Tiers, badges, progression updated' },
    { step: 'User Profile', description: 'Badges and status displayed' },
    { step: 'CRM Updates', description: 'Relationship metrics refreshed' },
  ]

  return (
    <section id="gamification" className="relative py-24 md:py-32">
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
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">Gamification Integration</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            Systems That <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            CRM relationship intelligence powers gamification progression, creating deeper engagement and rewards
          </p>
        </motion.div>

        {/* Integration Examples */}
        <div className="space-y-12 mb-20">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-light text-white/90 mb-2">{integration.title}</h3>
              <p className="text-white/60 mb-6">{integration.description}</p>
              <div className="space-y-3">
                {integration.flow.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex-1 glass-card rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-altyr-magenta" />
                          <span className="text-white/70">{item.from}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-altyr-purple-light flex-shrink-0" />
                      <div className="flex-1 glass-card rounded-lg p-4 bg-altyr-purple/10 border-altyr-purple/30">
                        <span className="text-white/90 font-medium">{item.to}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two-Way Data Flow */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Two-Way Data Flow</h3>
          <div className="relative">
            {/* Flow Diagram */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {dataFlow.map((step, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    className="glass-card rounded-xl p-5 text-center min-w-[140px]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-sm font-medium text-white/90 mb-1">{step.step}</div>
                    <div className="text-xs text-white/60">{step.description}</div>
                  </motion.div>
                  {index < dataFlow.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-altyr-purple-light flex-shrink-0 rotate-90 md:rotate-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Reverse Flow Indicator */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Data flows both ways—gamification updates inform CRM insights</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
