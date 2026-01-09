import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Image, Palette, Sparkles, Award } from 'lucide-react'

export default function ProfileCustomization({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('profile')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('profile')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const customizationFeatures = [
    {
      icon: User,
      title: 'Avatar Frame/Border',
      unlocks: [
        { level: 'Default', description: 'Simple circle/square' },
        { level: 'Level 10+', description: 'Colored borders (brand colors)' },
        { level: 'Level 20+', description: 'Gradient borders' },
        { level: 'Level 30+', description: 'Animated borders (pulse/glow)' },
        { level: 'Level 50+', description: 'Premium frames (unique designs)' },
      ]
    },
    {
      icon: Image,
      title: 'Profile Banner',
      unlocks: [
        { level: 'Default', description: 'Solid color or gradient' },
        { level: 'Level 20+', description: 'Custom banner upload' },
        { level: 'Level 30+', description: 'Animated banners' },
        { level: 'Level 50+', description: 'Premium banner templates' },
      ]
    },
    {
      icon: Palette,
      title: 'Accent Colors & Themes',
      unlocks: [
        { level: 'Level 5+', description: 'Accent color customization' },
        { level: 'Level 15+', description: 'Custom color picker' },
        { level: 'Level 30+', description: 'Theme presets' },
        { level: 'Level 50+', description: 'Exclusive themes' },
      ]
    },
    {
      icon: Sparkles,
      title: 'Username Effects',
      unlocks: [
        { level: 'Default', description: 'Standard text' },
        { level: 'Level 10+', description: 'Gradient text option' },
        { level: 'Level 25+', description: 'Glow effect' },
        { level: 'Level 50+', description: 'Animated effects' },
      ]
    },
    {
      icon: Award,
      title: 'Badge Display',
      unlocks: [
        { level: 'Level 10', description: 'Unlock first badge slot' },
        { level: 'Level 15', description: 'Unlock second badge slot' },
        { level: 'Level 25', description: 'Unlock third badge slot' },
      ]
    },
  ]

  return (
    <section id="profile" className="relative py-24 md:py-32">
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
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">Profile Customization</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            Discord-Style <span className="text-gradient">Customization</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            Progressive unlocks that let users express themselves as they level up
          </p>
        </motion.div>

        {/* Customization Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {customizationFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="glass-card glass-card-hover rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-altyr-magenta/20 border border-altyr-magenta/30">
                    <Icon className="w-6 h-6 text-altyr-magenta" />
                  </div>
                  <h3 className="text-2xl font-light text-white/90">{feature.title}</h3>
                </div>
                <div className="space-y-3">
                  {feature.unlocks.map((unlock, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-altyr-magenta/60 mt-2 flex-shrink-0" />
                      <div>
                        <div className="text-white/90 font-medium">{unlock.level}</div>
                        <div className="text-white/60 text-sm">{unlock.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Profile Mockup */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Profile Preview</h3>
          <div className="max-w-2xl mx-auto">
            {/* Banner */}
            <div className="h-32 rounded-t-2xl bg-gradient-to-r from-altyr-purple/20 via-altyr-magenta/20 to-altyr-orange/20 mb-4" />
            
            {/* Profile Info */}
            <div className="flex items-start gap-6 px-6 pb-6">
              {/* Avatar */}
              <div className="relative -mt-12">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-altyr-magenta to-altyr-purple border-4 border-altyr-bg" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-badge-gold border-2 border-altyr-bg flex items-center justify-center">
                  <span className="text-xs font-semibold text-altyr-bg">L25</span>
                </div>
              </div>
              
              {/* Info */}
              <div className="flex-1 pt-4">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl font-semibold text-white/90">Username</h4>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded bg-badge-gold/20 border border-badge-gold/50 flex items-center justify-center">
                      <Award className="w-3 h-3 text-badge-gold" />
                    </div>
                    <div className="w-6 h-6 rounded bg-badge-silver/20 border border-badge-silver/50 flex items-center justify-center">
                      <Award className="w-3 h-3 text-badge-silver" />
                    </div>
                    <div className="w-6 h-6 rounded bg-badge-bronze/20 border border-badge-bronze/50 flex items-center justify-center">
                      <Award className="w-3 h-3 text-badge-bronze" />
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-4">Online • Active 5 min ago</p>
                
                {/* XP Progress */}
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70">Level 25</span>
                    <span className="text-sm text-white/70">2,450 / 3,000 XP</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-altyr-magenta to-altyr-purple"
                      initial={{ width: 0 }}
                      whileInView={{ width: '82%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
