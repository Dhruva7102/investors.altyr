import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Send, Zap, Download, Upload, Settings, BarChart3, Filter } from 'lucide-react'

export default function AdvancedFeatures({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('advanced')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('advanced')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const bulkActions = [
    {
      name: 'Bulk Messaging',
      icon: Send,
      description: 'Send messages to entire segments with personalization',
      example: 'Message all 285 High-Value VIPs with personalized content',
    },
    {
      name: 'Targeted Offers',
      icon: Zap,
      description: 'Create and send offers to specific segments',
      example: 'Create limited-time offer for At-Risk Regulars',
    },
    {
      name: 'VIP Invitations',
      icon: Users,
      description: 'Invite fans to VIP tiers in bulk',
      example: 'Invite all Growth Opportunities to VIP tier',
    },
    {
      name: 'Campaign Launch',
      icon: BarChart3,
      description: 'Launch relationship deepening campaigns',
      example: 'Start engagement campaign for Dormant Fans',
    },
  ]

  const teamFeatures = [
    {
      name: 'Team Collaboration',
      icon: Users,
      description: 'Multiple team members can manage fans with role-based permissions',
    },
    {
      name: 'Export/Import',
      icon: Download,
      description: 'Export fan data, import from other platforms, CSV support',
    },
    {
      name: 'Advanced Filters',
      icon: Filter,
      description: 'Complex filtering with multiple criteria and saved filter sets',
    },
    {
      name: 'Custom Views',
      icon: Settings,
      description: 'Create custom dashboard views for different team members',
    },
  ]

  return (
    <section id="advanced" className="relative py-24 md:py-32">
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
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">Advanced Features</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            For Teams & <span className="text-gradient">Growing Businesses</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            Comprehensive tools for creators with teams, agencies, and meticulous fan management needs
          </p>
        </motion.div>

        {/* Bulk Actions */}
        <div className="mb-20">
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Bulk Actions & Automation</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {bulkActions.map((action, index) => {
              const Icon = action.icon
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
                    <h4 className="text-xl font-light text-white/90">{action.name}</h4>
                  </div>
                  <p className="text-white/60 mb-4">{action.description}</p>
                  <div className="glass-card rounded-lg p-3">
                    <div className="text-xs text-white/50 mb-1">Example:</div>
                    <div className="text-sm text-white/80">{action.example}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Team Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Team & Enterprise Tools</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="glass-card glass-card-hover rounded-xl p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="p-3 rounded-xl bg-altyr-purple/20 border border-altyr-purple/30 w-fit mb-4">
                    <Icon className="w-5 h-5 text-altyr-purple-light" />
                  </div>
                  <h4 className="text-lg font-light text-white/90 mb-2">{feature.name}</h4>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Advanced Dashboard Mockup */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Advanced Analytics Dashboard</h3>
          
          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Fans', value: '2,847', trend: '+12%' },
              { label: 'Avg Connection', value: '62', trend: '+3%' },
              { label: 'Total LTV', value: '$1.2M', trend: '+18%' },
              { label: 'At Risk', value: '288', trend: '-5%' },
            ].map((stat, index) => (
              <div key={index} className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-semibold text-white/90 mb-1">{stat.value}</div>
                <div className="text-xs text-white/60 mb-1">{stat.label}</div>
                <div className="text-xs text-green-400">{stat.trend}</div>
              </div>
            ))}
          </div>

          {/* Charts Placeholder */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="glass-card rounded-xl p-6 h-48 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-altyr-magenta/30 mx-auto mb-2" />
                <div className="text-sm text-white/50">Relationship Depth Distribution</div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6 h-48 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-altyr-purple-light/30 mx-auto mb-2" />
                <div className="text-sm text-white/50">LTV Prediction Timeline</div>
              </div>
            </div>
          </div>

          {/* Advanced Table */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-light text-white/90">Fan List (Advanced View)</h4>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg bg-white/[0.06] border border-white/[0.12] text-white/70 text-xs hover:bg-white/[0.08] transition-colors">
                  Export CSV
                </button>
                <button className="px-3 py-1 rounded-lg bg-white/[0.06] border border-white/[0.12] text-white/70 text-xs hover:bg-white/[0.08] transition-colors">
                  Save View
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-xs text-white/60 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 font-medium">Connection</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 font-medium">LTV</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 font-medium">Churn Risk</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 font-medium">Segment</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Alex M.', status: 'VIP', connection: 78, ltv: '$2,450', risk: 'Low', segment: 'High-Value VIPs' },
                    { name: 'Jordan K.', status: 'Regular', connection: 45, ltv: '$890', risk: 'Medium', segment: 'At-Risk' },
                    { name: 'Sam T.', status: 'Superfan', connection: 92, ltv: '$5,200', risk: 'Low', segment: 'High-Value VIPs' },
                  ].map((fan, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 text-sm text-white/90">{fan.name}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-xs bg-status-vip/20 text-status-vip border border-status-vip/30">
                          {fan.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-white/70">{fan.connection}/100</td>
                      <td className="py-3 px-4 text-sm text-white/70">{fan.ltv}</td>
                      <td className="py-3 px-4">
                        <span className="text-xs text-yellow-400">{fan.risk}</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-white/60">{fan.segment}</td>
                      <td className="py-3 px-4">
                        <button className="text-xs text-altyr-magenta hover:text-altyr-magenta/80 transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
