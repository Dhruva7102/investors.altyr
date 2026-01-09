import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, BarChart3, Eye, EyeOff, Shield, Settings, Award } from 'lucide-react'

export default function UserProfiles({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('profiles')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('profiles')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const publicProfileFeatures = [
    { icon: User, text: 'Username and display name' },
    { icon: Eye, text: 'Bio (optional, user-written)' },
    { icon: Eye, text: 'Profile and cover images' },
    { icon: Eye, text: 'Location (privacy-controlled)' },
    { icon: Eye, text: 'Interests (user-selected tags)' },
    { icon: Award, text: 'Public badges (earned progression)' },
    { icon: Eye, text: 'Social links (optional)' },
  ]

  const privatePreferences = [
    { category: 'Notifications', icon: Settings, items: ['What to receive', 'How to receive', 'Frequency'] },
    { category: 'Privacy', icon: Lock, items: ['Who can message', 'Activity visibility', 'Profile visibility', 'Data sharing'] },
    { category: 'Content', icon: Eye, items: ['Preferred types', 'Maturity ratings', 'Discovery preferences'] },
    { category: 'Payment', icon: Shield, items: ['Payment methods', 'Purchase notifications'] },
  ]

  const analyticsProfile = [
    { metric: 'Connection Depth Score', value: '78/100', visible: true },
    { metric: 'Engagement Frequency', value: '12/month', visible: true },
    { metric: 'Response Rate', value: '85%', visible: true },
    { metric: 'Relationship LTV', value: '$2,450', visible: true },
    { metric: 'Spending Velocity', value: 'Increasing', visible: true },
    { metric: 'Churn Risk', value: 'Low', visible: true },
    { metric: 'Personal Email', value: 'Hidden', visible: false },
    { metric: 'Other Creator Spending', value: 'Hidden', visible: false },
  ]

  return (
    <section id="profiles" className="relative py-24 md:py-32">
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
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">User Profiles System</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            Three-Layer <span className="text-gradient">Profile System</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            Public profiles, private preferences, and analytics insights—all with user control and privacy boundaries
          </p>
        </motion.div>

        {/* Three-Panel Comparison */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Public Profile */}
          <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-altyr-purple-light/20 border border-altyr-purple-light/30">
                <User className="w-5 h-5 text-altyr-purple-light" />
              </div>
              <h3 className="text-xl font-light text-white/90">Public Profile</h3>
            </div>
            <p className="text-sm text-white/60 mb-4">User-controlled, visible to creators</p>
            <div className="space-y-2">
              {publicProfileFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-center gap-2 text-sm text-white/70">
                    <Icon className="w-4 h-4 text-altyr-purple-light" />
                    <span>{feature.text}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Private Preferences */}
          <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-altyr-magenta/20 border border-altyr-magenta/30">
                <Lock className="w-5 h-5 text-altyr-magenta" />
              </div>
              <h3 className="text-xl font-light text-white/90">Private Preferences</h3>
            </div>
            <p className="text-sm text-white/60 mb-4">User-controlled, never shared</p>
            <div className="space-y-3">
              {privatePreferences.map((pref, index) => {
                const Icon = pref.icon
                return (
                  <div key={index}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-3 h-3 text-altyr-magenta" />
                      <span className="text-xs font-medium text-white/80">{pref.category}</span>
                    </div>
                    <div className="ml-5 space-y-1">
                      {pref.items.map((item, i) => (
                        <div key={i} className="text-xs text-white/60">• {item}</div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Analytics Profile */}
          <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-altyr-orange/20 border border-altyr-orange/30">
                <BarChart3 className="w-5 h-5 text-altyr-orange" />
              </div>
              <h3 className="text-xl font-light text-white/90">Analytics Profile</h3>
            </div>
            <p className="text-sm text-white/60 mb-4">Platform-generated, creator-visible</p>
            <div className="space-y-2">
              {analyticsProfile.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {item.visible ? (
                      <Eye className="w-3 h-3 text-green-400" />
                    ) : (
                      <EyeOff className="w-3 h-3 text-white/30" />
                    )}
                    <span className={item.visible ? 'text-white/70' : 'text-white/40 line-through'}>
                      {item.metric}
                    </span>
                  </div>
                  {item.visible && (
                    <span className="text-white/90 font-medium">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Privacy Boundaries */}
        <motion.div
          className="glass-card rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-altyr-magenta" />
            <h3 className="text-2xl font-light text-white/90">Privacy Boundaries</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-white/90 mb-3">What Creators Can See</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Public profile information (what users share)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Relationship metrics (with this creator only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Aggregated behavioral insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Financial insights (relationship LTV only)</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-white/90 mb-3">What's Always Private</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Personal information not shared publicly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Cross-creator financial data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Raw transaction details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Private preference settings</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
