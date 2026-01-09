import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Zap, MessageSquare, Heart, CreditCard, Star, Eye } from 'lucide-react'

export default function XPSystem({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('xp-system')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('xp-system')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const xpSources = [
    { icon: Zap, action: 'Daily Login', xp: 50, cap: 'Once per day', color: 'altyr-orange' },
    { icon: Eye, action: 'View Content', xp: 5, cap: 'Max 10/day (50 XP)', color: 'altyr-purple-light' },
    { icon: MessageSquare, action: 'Send Message', xp: 10, cap: 'Max 5/day (50 XP)', color: 'altyr-magenta' },
    { icon: Heart, action: 'Tip/Custom Request', xp: 25, cap: 'Unlimited', color: 'altyr-magenta' },
    { icon: Star, action: 'Subscribe', xp: 100, cap: 'One-time per creator', color: 'badge-gold' },
    { icon: CreditCard, action: 'Purchase Content', xp: 15, cap: 'Unlimited', color: 'altyr-purple' },
  ]

  const levelProgression = [
    { range: '1-10', xp: 100, description: 'Quick early wins' },
    { range: '11-25', xp: 200, description: 'Steady progression' },
    { range: '26-50', xp: 300, description: 'Mid-tier rewards' },
    { range: '51-75', xp: 400, description: 'Advanced levels' },
    { range: '76-100', xp: 500, description: 'Elite status' },
    { range: '100+', xp: 600, description: 'Infinite progression' },
  ]

  const levelRewards = [
    { level: 5, reward: 'Unlock profile customization' },
    { level: 10, reward: 'Unlock first badge slot' },
    { level: 15, reward: 'Unlock second badge slot' },
    { level: 20, reward: 'Unlock profile banner' },
    { level: 25, reward: 'Unlock third badge slot' },
    { level: 30, reward: 'Unlock animated effects' },
    { level: 50, reward: 'Unlock exclusive theme' },
    { level: 100, reward: 'Unlock legendary status' },
  ]

  return (
    <section id="xp-system" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-altyr-bg-dark to-altyr-bg" />
      
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
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">XP & Leveling System</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            Global <span className="text-gradient">XP System</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            A weighted progression system that rewards meaningful engagement and spending
          </p>
        </motion.div>

        {/* XP Sources */}
        <div className="mb-20">
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">XP Sources</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {xpSources.map((source, index) => {
              const Icon = source.icon
              return (
                <motion.div
                  key={index}
                  className="glass-card glass-card-hover rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${
                      source.color === 'altyr-orange' ? 'bg-altyr-orange/20 border-altyr-orange/30' :
                      source.color === 'altyr-purple-light' ? 'bg-altyr-purple-light/20 border-altyr-purple-light/30' :
                      source.color === 'altyr-magenta' ? 'bg-altyr-magenta/20 border-altyr-magenta/30' :
                      source.color === 'badge-gold' ? 'bg-badge-gold/20 border-badge-gold/30' :
                      'bg-altyr-purple/20 border-altyr-purple/30'
                    } border`}>
                      <Icon className={`w-6 h-6 ${
                        source.color === 'altyr-orange' ? 'text-altyr-orange' :
                        source.color === 'altyr-purple-light' ? 'text-altyr-purple-light' :
                        source.color === 'altyr-magenta' ? 'text-altyr-magenta' :
                        source.color === 'badge-gold' ? 'text-badge-gold' :
                        'text-altyr-purple'
                      }`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-light text-white/90">{source.action}</h4>
                      <p className="text-sm text-white/40">{source.cap}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-semibold text-gradient">
                    +{source.xp} XP
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Level Progression */}
        <div className="mb-20">
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Level Progression</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {levelProgression.map((tier, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-xl p-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-2xl font-semibold text-gradient mb-2">{tier.range}</div>
                <div className="text-lg text-white/70 mb-1">{tier.xp} XP</div>
                <div className="text-xs text-white/40">{tier.description}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Level Rewards */}
        <div>
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Level Rewards</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {levelRewards.map((reward, index) => (
              <motion.div
                key={index}
                className="glass-card glass-card-hover rounded-xl p-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl font-semibold text-gradient mb-2">Level {reward.level}</div>
                <div className="text-white/70 font-light">{reward.reward}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

