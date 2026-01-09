import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, TrendingUp, Gift, User } from 'lucide-react'

export default function UIMockups({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('mockups')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('mockups')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  return (
    <section id="mockups" className="relative py-24 md:py-32">
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
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">UI Mockups</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            Visual <span className="text-gradient">Design Patterns</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            How gamification elements appear throughout the platform
          </p>
        </motion.div>

        {/* Profile Mockup */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-light text-white/90 mb-6 text-center">Profile Display</h3>
          <div className="glass-card rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
            {/* Banner */}
            <div className="h-32 rounded-t-2xl bg-gradient-to-r from-altyr-purple/30 via-altyr-magenta/30 to-altyr-orange/30 mb-6" />
            
            {/* Profile Info */}
            <div className="flex items-start gap-6 px-4">
              {/* Avatar */}
              <div className="relative -mt-16">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-altyr-magenta to-altyr-purple border-4 border-altyr-bg relative">
                  <div className="absolute inset-0 rounded-full border-2 border-badge-gold/50" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-badge-gold to-badge-bronze border-2 border-altyr-bg flex items-center justify-center">
                  <span className="text-xs font-semibold text-altyr-bg">L25</span>
                </div>
              </div>
              
              {/* Info */}
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-2xl font-semibold text-white/90">Username</h4>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-7 h-7 rounded bg-badge-gold/20 border border-badge-gold/50 flex items-center justify-center">
                        <Award className="w-4 h-4 text-badge-gold" />
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-4">Online • Active 5 min ago</p>
                
                {/* XP Progress */}
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70">Level 25</span>
                    <span className="text-sm text-white/70">2,450 / 3,000 XP</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-altyr-magenta to-altyr-purple"
                      initial={{ width: 0 }}
                      whileInView={{ width: '82%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Level Up Animation Mockup */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-light text-white/90 mb-6 text-center">Level Up Animation</h3>
          <div className="flex justify-center">
            <motion.div
              className="glass-card rounded-2xl p-12 max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  🎉
                </motion.div>
                <h4 className="text-3xl font-extralight text-gradient mb-2">LEVEL UP!</h4>
                <p className="text-xl text-white/70 mb-6">You reached Level 25</p>
                <div className="space-y-2 mb-6">
                  <div className="text-white/60">+50 XP Bonus</div>
                  <div className="text-altyr-orange">Unlocked: Profile Banner</div>
                </div>
                <button className="px-8 py-3 rounded-full bg-altyr-magenta hover:bg-altyr-magenta/80 text-white font-medium transition-colors">
                  Continue
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Badge Display Mockup */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-light text-white/90 mb-6 text-center">Badge Display</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Benefactor', rarity: 'gold', requirement: 'Spend $1,000 total' },
              { name: 'Early Adopter', rarity: 'gold', requirement: 'Join in first 30 days' },
              { name: 'Dedicated', rarity: 'silver', requirement: '12 months subscription' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                className="glass-card glass-card-hover rounded-xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-badge-gold/20 border-2 border-badge-gold/50 mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-8 h-8 text-badge-gold" />
                </div>
                <h4 className="text-lg font-semibold text-badge-gold mb-2">{badge.name}</h4>
                <p className="text-sm text-white/60 mb-2 capitalize">{badge.rarity}</p>
                <p className="text-xs text-white/40">{badge.requirement}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Daily Login Modal Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-light text-white/90 mb-6 text-center">Daily Login Reward</h3>
          <div className="flex justify-center">
            <motion.div
              className="glass-card rounded-2xl p-10 max-w-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🔥</div>
                <h4 className="text-2xl font-light text-white/90 mb-2">Daily Reward</h4>
                <div className="text-3xl font-semibold text-gradient mb-4">Day 7</div>
                <div className="space-y-3 mb-6">
                  <div className="text-xl text-white/70">+200 XP</div>
                  <div className="flex items-center justify-center gap-2 text-altyr-orange">
                    <Gift className="w-5 h-5" />
                    <span>Weekly Bonus!</span>
                  </div>
                </div>
                <div className="text-sm text-white/60 mb-6">🔥 7 Day Streak</div>
                <button className="w-full px-6 py-3 rounded-full bg-altyr-magenta hover:bg-altyr-magenta/80 text-white font-medium transition-colors">
                  Claim Reward
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
