import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, AlertCircle, TrendingUp, MessageSquare, Gift, ArrowUp, ArrowDown, Minus } from 'lucide-react'

export default function QuickScanCRM({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('quick-scan')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('quick-scan')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const getColorClasses = (color) => {
    const colorMap = {
      'altyr-purple-light': {
        bg: 'bg-altyr-purple-light/20',
        border: 'border-altyr-purple-light/30',
        text: 'text-altyr-purple-light',
      },
      'altyr-magenta': {
        bg: 'bg-altyr-magenta/20',
        border: 'border-altyr-magenta/30',
        text: 'text-altyr-magenta',
      },
      'altyr-orange': {
        bg: 'bg-altyr-orange/20',
        border: 'border-altyr-orange/30',
        text: 'text-altyr-orange',
      },
    }
    return colorMap[color] || { bg: 'bg-white/20', border: 'border-white/30', text: 'text-white' }
  }

  const getStatusClasses = (statusColor) => {
    const statusMap = {
      'status-casual': 'bg-status-casual/20 text-status-casual border-status-casual/30',
      'status-regular': 'bg-status-regular/20 text-status-regular border-status-regular/30',
      'status-vip': 'bg-status-vip/20 text-status-vip border-status-vip/30',
      'status-superfan': 'bg-status-superfan/20 text-status-superfan border-status-superfan/30',
    }
    return statusMap[statusColor] || 'bg-white/20 text-white border-white/30'
  }

  const quickStats = [
    { label: 'Total Fans', value: '2,847', icon: Users, color: 'altyr-purple-light' },
    { label: 'Avg Connection Depth', value: '62', suffix: '/100', icon: TrendingUp, color: 'altyr-magenta' },
    { label: 'Needs Attention', value: '23', icon: AlertCircle, color: 'altyr-orange', urgent: true },
  ]

  const sampleFans = [
    {
      name: 'Alex M.',
      status: 'VIP',
      statusColor: 'status-vip',
      connectionScore: 78,
      ltv: '$2,450',
      lastInteraction: '2 hours ago',
      healthTrend: 'up',
      needsAttention: false,
      churnRisk: 'Low',
    },
    {
      name: 'Jordan K.',
      status: 'Regular',
      statusColor: 'status-regular',
      connectionScore: 45,
      ltv: '$890',
      lastInteraction: '5 days ago',
      healthTrend: 'down',
      needsAttention: true,
      churnRisk: 'Medium',
    },
    {
      name: 'Sam T.',
      status: 'Superfan',
      statusColor: 'status-superfan',
      connectionScore: 92,
      ltv: '$5,200',
      lastInteraction: '1 hour ago',
      healthTrend: 'up',
      needsAttention: false,
      churnRisk: 'Low',
    },
    {
      name: 'Casey R.',
      status: 'Casual',
      statusColor: 'status-casual',
      connectionScore: 25,
      ltv: '$120',
      lastInteraction: '12 days ago',
      healthTrend: 'down',
      needsAttention: true,
      churnRisk: 'High',
    },
  ]

  const getHealthIcon = (trend) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-400" />
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-400" />
    return <Minus className="w-4 h-4 text-white/40" />
  }

  const getChurnColor = (risk) => {
    if (risk === 'Low') return 'text-green-400'
    if (risk === 'Medium') return 'text-yellow-400'
    if (risk === 'High') return 'text-red-400'
    return 'text-white/60'
  }

  return (
    <section id="quick-scan" className="relative py-24 md:py-32">
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
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">Quick-Scan CRM</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            See Your Audience <span className="text-gradient">at a Glance</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            Instantly understand fan types, identify who needs attention, and take action—no deep dive required
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                className={`glass-card glass-card-hover rounded-2xl p-6 ${stat.urgent ? 'border-altyr-orange/30' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${getColorClasses(stat.color).bg} border ${getColorClasses(stat.color).border}`}>
                    <Icon className={`w-6 h-6 ${getColorClasses(stat.color).text}`} />
                  </div>
                  {stat.urgent && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-altyr-orange/20 text-altyr-orange border border-altyr-orange/30">
                      Urgent
                    </span>
                  )}
                </div>
                <div className="text-3xl font-semibold text-white/90 mb-1">
                  {stat.value}
                  {stat.suffix && <span className="text-lg text-white/60 ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Fan List Mockup */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-light text-white/90">Fan Overview</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.12] text-white/70 text-sm hover:bg-white/[0.08] transition-colors">
                Filter
              </button>
              <button className="px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.12] text-white/70 text-sm hover:bg-white/[0.08] transition-colors">
                Sort
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {sampleFans.map((fan, index) => (
              <motion.div
                key={index}
                className={`glass-card glass-card-hover rounded-xl p-5 ${fan.needsAttention ? 'border-altyr-orange/30 bg-altyr-orange/5' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-altyr-magenta to-altyr-purple flex-shrink-0" />
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-medium text-white/90">{fan.name}</h4>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusClasses(fan.statusColor)}`}>
                          {fan.status}
                        </span>
                        {fan.needsAttention && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-altyr-orange/20 text-altyr-orange border border-altyr-orange/30 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Needs Attention
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>Connection: {fan.connectionScore}/100</span>
                        <span>LTV: {fan.ltv}</span>
                        <span>Last: {fan.lastInteraction}</span>
                      </div>
                    </div>

                    {/* Health Indicator */}
                    <div className="flex items-center gap-2">
                      {getHealthIcon(fan.healthTrend)}
                      <span className={`text-sm ${getChurnColor(fan.churnRisk)}`}>
                        {fan.churnRisk} Risk
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 rounded-lg bg-altyr-magenta/20 border border-altyr-magenta/30 hover:bg-altyr-magenta/30 transition-colors">
                      <MessageSquare className="w-4 h-4 text-altyr-magenta" />
                    </button>
                    <button className="p-2 rounded-lg bg-altyr-purple/20 border border-altyr-purple/30 hover:bg-altyr-purple/30 transition-colors">
                      <Gift className="w-4 h-4 text-altyr-purple-light" />
                    </button>
                  </div>
                </div>

                {/* Connection Score Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/50">Connection Depth</span>
                    <span className="text-xs text-white/70">{fan.connectionScore}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-altyr-magenta to-altyr-purple"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${fan.connectionScore}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Priority Indicators',
              description: 'Instantly see who needs attention with color-coded urgency flags',
              icon: AlertCircle,
            },
            {
              title: 'One-Click Actions',
              description: 'Message, create offers, or view details without leaving the list',
              icon: MessageSquare,
            },
            {
              title: 'Smart Sorting',
              description: 'Automatically surfaces most urgent fans first',
              icon: TrendingUp,
            },
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="glass-card glass-card-hover rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="p-3 rounded-xl bg-altyr-magenta/20 border border-altyr-magenta/30 w-fit mb-4">
                  <Icon className="w-6 h-6 text-altyr-magenta" />
                </div>
                <h4 className="text-lg font-light text-white/90 mb-2">{feature.title}</h4>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
