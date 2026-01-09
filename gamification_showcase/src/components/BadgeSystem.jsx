import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, MessageSquare, Eye, CreditCard, Users, Calendar, Star, Trophy } from 'lucide-react'

export default function BadgeSystem({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('badges')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('badges')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const badgeCategories = [
    {
      name: 'Engagement',
      icon: MessageSquare,
      badges: [
        { name: 'First Steps', rarity: 'bronze', requirement: 'Send first message' },
        { name: 'Chatter', rarity: 'silver', requirement: 'Send 50 messages' },
        { name: 'Conversationalist', rarity: 'gold', requirement: 'Send 500 messages' },
        { name: 'Viewer', rarity: 'bronze', requirement: 'View 100 posts' },
        { name: 'Binge Watcher', rarity: 'silver', requirement: 'View 1,000 posts' },
      ]
    },
    {
      name: 'Spending',
      icon: CreditCard,
      badges: [
        { name: 'Supporter', rarity: 'bronze', requirement: 'Spend $10 total' },
        { name: 'Patron', rarity: 'silver', requirement: 'Spend $100 total' },
        { name: 'Benefactor', rarity: 'gold', requirement: 'Spend $1,000 total' },
        { name: 'Philanthropist', rarity: 'platinum', requirement: 'Spend $10,000 total' },
      ]
    },
    {
      name: 'Subscriptions',
      icon: Users,
      badges: [
        { name: 'Loyal Fan', rarity: 'bronze', requirement: '3 months with 1 creator' },
        { name: 'Devoted', rarity: 'silver', requirement: '6 months with 1 creator' },
        { name: 'Dedicated', rarity: 'gold', requirement: '12 months with 1 creator' },
        { name: 'Multi-Fan', rarity: 'bronze', requirement: '5 simultaneous subscriptions' },
      ]
    },
    {
      name: 'Platform',
      icon: Star,
      badges: [
        { name: 'Early Adopter', rarity: 'gold', requirement: 'Join in first 30 days' },
        { name: 'Founding Member', rarity: 'platinum', requirement: 'Join in first week' },
        { name: 'Level 50', rarity: 'silver', requirement: 'Reach level 50' },
        { name: 'Level 100', rarity: 'gold', requirement: 'Reach level 100' },
      ]
    },
  ]

  const rarityColors = {
    bronze: { bg: 'bg-badge-bronze/20', border: 'border-badge-bronze/50', text: 'text-badge-bronze' },
    silver: { bg: 'bg-badge-silver/20', border: 'border-badge-silver/50', text: 'text-badge-silver' },
    gold: { bg: 'bg-badge-gold/20', border: 'border-badge-gold/50', text: 'text-badge-gold' },
    platinum: { bg: 'bg-badge-platinum/20', border: 'border-badge-platinum/50', text: 'text-badge-platinum' },
  }

  return (
    <section id="badges" className="relative py-24 md:py-32">
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
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">Badge System</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            Collectible <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            Five categories of badges with rarity tiers to showcase fan achievements
          </p>
        </motion.div>

        {/* Badge Categories */}
        <div className="space-y-12">
          {badgeCategories.map((category, catIndex) => {
            const Icon = category.icon
            return (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-altyr-magenta/20 border border-altyr-magenta/30">
                    <Icon className="w-6 h-6 text-altyr-magenta" />
                  </div>
                  <h3 className="text-2xl font-light text-white/90">{category.name} Badges</h3>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.badges.map((badge, badgeIndex) => {
                    const colors = rarityColors[badge.rarity]
                    return (
                      <motion.div
                        key={badgeIndex}
                        className={`glass-card glass-card-hover rounded-xl p-5 ${colors.bg} ${colors.border} border`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: (catIndex * 0.1) + (badgeIndex * 0.05) }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${colors.bg} ${colors.border} border`}>
                            <Award className={`w-5 h-5 ${colors.text}`} />
                          </div>
                          <div>
                            <div className={`font-semibold ${colors.text}`}>{badge.name}</div>
                            <div className="text-xs text-white/40 capitalize">{badge.rarity}</div>
                          </div>
                        </div>
                        <div className="text-sm text-white/60">{badge.requirement}</div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Rarity Legend */}
        <motion.div
          className="mt-16 glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-light text-white/90 mb-6 text-center">Rarity Tiers</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(rarityColors).map(([rarity, colors]) => (
              <div key={rarity} className="text-center">
                <div className={`w-16 h-16 rounded-full ${colors.bg} ${colors.border} border-2 mx-auto mb-3 flex items-center justify-center`}>
                  <Award className={`w-8 h-8 ${colors.text}`} />
                </div>
                <div className={`font-semibold capitalize ${colors.text} mb-1`}>{rarity}</div>
                <div className="text-xs text-white/40">
                  {rarity === 'bronze' && 'Common'}
                  {rarity === 'silver' && 'Uncommon'}
                  {rarity === 'gold' && 'Rare'}
                  {rarity === 'platinum' && 'Epic'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
