import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Clock, Target, CheckCircle } from 'lucide-react'

export default function Roadmap({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('roadmap')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('roadmap')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const phases = [
    {
      phase: 'Phase 1',
      title: 'Core CRM (MVP)',
      icon: Rocket,
      status: 'Launch',
      features: [
        'Basic fan database and tracking',
        'Relationship scoring engine',
        'Simple segmentation (pre-built segments)',
        'Basic analytics dashboard',
        'Fan list interface',
      ]
    },
    {
      phase: 'Phase 2',
      title: 'User Profiles',
      icon: Clock,
      status: 'Post-Launch',
      features: [
        'Public profile system',
        'Preference management',
        'Basic analytics profile generation',
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Advanced Features',
      icon: Target,
      status: 'Future',
      features: [
        'Predictive analytics (LTV, churn risk)',
        'Custom segmentation builder',
        'Automated recommendations',
        'Advanced analytics views',
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Intelligence Layer',
      icon: CheckCircle,
      status: 'Future',
      features: [
        'Automated action recommendations',
        'Campaign automation',
        'Relationship deepening tools',
        'Integration with messaging/gamification',
      ]
    },
  ]

  const successMetrics = [
    { metric: 'CRM Adoption Rate', target: '>80% of creators use it' },
    { metric: 'Average Relationship Depth', target: 'Increase over time' },
    { metric: 'Fan Retention', target: 'Improvement vs baseline' },
    { metric: 'LTV per Fan', target: 'Increase through better relationships' },
    { metric: 'Churn Prevention', target: 'Fans saved from leaving' },
  ]

  return (
    <section id="roadmap" className="relative py-24 md:py-32">
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
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">Implementation Roadmap</span>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {phases.map((phase, index) => {
            const Icon = phase.icon
            return (
              <motion.div
                key={index}
                className="glass-card glass-card-hover rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-altyr-magenta/20 border border-altyr-magenta/30">
                    <Icon className="w-6 h-6 text-altyr-magenta" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">{phase.phase}</div>
                    <div className="text-lg font-light text-white/90">{phase.title}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-altyr-purple/20 text-altyr-purple-light border border-altyr-purple/30">
                    {phase.status}
                  </span>
                </div>
                <ul className="space-y-2">
                  {phase.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-altyr-magenta mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Success Metrics */}
        <motion.div
          className="glass-card rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Success Metrics</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successMetrics.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-medium text-white/90 mb-1">{item.metric}</div>
                <div className="text-sm text-white/60">{item.target}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Principle */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-extralight text-white/80 leading-relaxed italic">
              This system is designed to help creators understand their fans at depth, identify high-value relationships, 
              and deepen connections that drive revenue. The focus is always on{' '}
              <span className="text-gradient">relationship depth over transaction volume</span>, which aligns with our 
              core insight that people pay for connection, not content.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
