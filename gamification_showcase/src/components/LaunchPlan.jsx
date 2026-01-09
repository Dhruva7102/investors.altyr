import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Rocket, CheckCircle, Clock, Target } from 'lucide-react'

export default function LaunchPlan({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('launch-plan')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('launch-plan')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const phases = [
    {
      phase: 'Phase 1',
      title: 'Launch',
      icon: Rocket,
      status: 'Must Have',
      features: [
        'Basic XP system',
        'Level 1-100 progression',
        'Daily login rewards (basic streak)',
        '10-15 core badges',
        'Basic profile customization',
        '1 badge slot',
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Month 1',
      icon: Clock,
      status: 'Post-Launch',
      features: [
        'Additional badge slots (Level 15, 25)',
        'More badges (20-30 total)',
        'Profile banner customization',
        'Enhanced daily rewards (weekly bonuses)',
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Month 2-3',
      icon: Target,
      status: 'Future',
      features: [
        'Animated profile effects',
        'Premium themes',
        'Creator-specific badges',
        'Badge collection gallery',
        'Leaderboards (optional)',
      ]
    },
  ]

  const designPrinciples = [
    { icon: CheckCircle, text: 'Familiar patterns (Discord/gaming platforms)' },
    { icon: CheckCircle, text: 'Non-intrusive (optional, enhances experience)' },
    { icon: CheckCircle, text: 'Progressive unlocks (rewards feel meaningful)' },
    { icon: CheckCircle, text: 'Visual & beautiful (on-brand)' },
    { icon: CheckCircle, text: 'Meaningful (rewards real engagement)' },
  ]

  return (
    <section id="launch-plan" className="relative py-24 md:py-32">
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
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">Launch Strategy</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            Phased <span className="text-gradient">Rollout</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            Launch with core systems, expand based on user feedback and data
          </p>
        </motion.div>

        {/* Phases */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {phases.map((phase, index) => {
            const Icon = phase.icon
            return (
              <motion.div
                key={index}
                className="glass-card glass-card-hover rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-altyr-magenta/20 border border-altyr-magenta/30">
                    <Icon className="w-6 h-6 text-altyr-magenta" />
                  </div>
                  <div>
                    <div className="text-sm text-white/40 uppercase tracking-wider">{phase.phase}</div>
                    <div className="text-xl font-light text-white/90">{phase.title}</div>
                  </div>
                </div>
                <div className="mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-altyr-purple/20 text-altyr-purple-light border border-altyr-purple/30">
                    {phase.status}
                  </span>
                </div>
                <ul className="space-y-3">
                  {phase.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-altyr-magenta mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Design Principles */}
        <motion.div
          className="glass-card rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Design Principles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {designPrinciples.map((principle, index) => {
              const Icon = principle.icon
              return (
                <div key={index} className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-altyr-magenta flex-shrink-0" />
                  <span className="text-white/70 text-sm">{principle.text}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
