import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Filter, TrendingUp, AlertTriangle, Zap, Target } from 'lucide-react'

export default function Segmentation({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('segmentation')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('segmentation')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const getSegmentClasses = (color) => {
    const segmentMap = {
      'status-casual': {
        border: 'border-status-casual/20',
        bg: 'bg-status-casual/20',
        borderIcon: 'border-status-casual/30',
        text: 'text-status-casual',
      },
      'status-regular': {
        border: 'border-status-regular/20',
        bg: 'bg-status-regular/20',
        borderIcon: 'border-status-regular/30',
        text: 'text-status-regular',
      },
      'status-vip': {
        border: 'border-status-vip/20',
        bg: 'bg-status-vip/20',
        borderIcon: 'border-status-vip/30',
        text: 'text-status-vip',
      },
      'status-superfan': {
        border: 'border-status-superfan/20',
        bg: 'bg-status-superfan/20',
        borderIcon: 'border-status-superfan/30',
        text: 'text-status-superfan',
      },
    }
    return segmentMap[color] || { border: 'border-white/20', bg: 'bg-white/20', borderIcon: 'border-white/30', text: 'text-white' }
  }

  const preBuiltSegments = [
    {
      name: 'High-Value VIPs',
      icon: Target,
      description: 'Top 10% by LTV, high connection score, increasing spend',
      fanCount: 285,
      color: 'status-superfan',
      metrics: { avgLTV: '$3,200', avgConnection: 85, growth: '+12%' },
    },
    {
      name: 'At-Risk Regulars',
      icon: AlertTriangle,
      description: 'Decreasing engagement, high churn risk',
      fanCount: 142,
      color: 'status-regular',
      metrics: { avgLTV: '$890', avgConnection: 48, growth: '-8%' },
    },
    {
      name: 'Growth Opportunities',
      icon: TrendingUp,
      description: 'Growing spend, ready for VIP tier',
      fanCount: 523,
      color: 'status-vip',
      metrics: { avgLTV: '$1,450', avgConnection: 65, growth: '+18%' },
    },
    {
      name: 'Dormant Fans',
      icon: Zap,
      description: 'No activity in 30+ days',
      fanCount: 897,
      color: 'status-casual',
      metrics: { avgLTV: '$320', avgConnection: 22, growth: '-5%' },
    },
  ]

  const customSegmentExample = {
    name: 'VIPs Needing Attention',
    rules: [
      { field: 'Connection Score', operator: '>=', value: '70' },
      { field: 'Spending Velocity', operator: '=', value: 'Decreasing' },
      { field: 'Last Interaction', operator: '>', value: '14 days ago' },
    ],
    fanCount: 67,
  }

  return (
    <section id="segmentation" className="relative py-24 md:py-32">
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
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">Fan Segmentation</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            Dynamic <span className="text-gradient">Segmentation</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            Automatically group fans with pre-built segments or create custom segments with rule-based filters
          </p>
        </motion.div>

        {/* Pre-built Segments */}
        <div className="mb-20">
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Pre-built Segments</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {preBuiltSegments.map((segment, index) => {
              const Icon = segment.icon
              return (
                <motion.div
                  key={index}
                  className={`glass-card glass-card-hover rounded-2xl p-6 ${getSegmentClasses(segment.color).border}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${getSegmentClasses(segment.color).bg} border ${getSegmentClasses(segment.color).borderIcon}`}>
                        <Icon className={`w-6 h-6 ${getSegmentClasses(segment.color).text}`} />
                      </div>
                      <div>
                        <h4 className="text-xl font-light text-white/90">{segment.name}</h4>
                        <p className="text-sm text-white/60">{segment.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-semibold text-gradient mb-1">{segment.fanCount}</div>
                    <div className="text-sm text-white/60">Fans in segment</div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-xs text-white/50 mb-1">Avg LTV</div>
                      <div className="text-sm font-medium text-white/90">{segment.metrics.avgLTV}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50 mb-1">Avg Connection</div>
                      <div className="text-sm font-medium text-white/90">{segment.metrics.avgConnection}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50 mb-1">Growth</div>
                      <div className={`text-sm font-medium ${segment.metrics.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {segment.metrics.growth}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Custom Segmentation Builder */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Filter className="w-6 h-6 text-altyr-magenta" />
            <h3 className="text-2xl font-light text-white/90">Custom Segment Builder</h3>
          </div>

          {/* Example Custom Segment */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-medium text-white/90">{customSegmentExample.name}</h4>
              <div className="text-lg font-semibold text-gradient">{customSegmentExample.fanCount} fans</div>
            </div>

            <div className="space-y-3 mb-6">
              {customSegmentExample.rules.map((rule, index) => (
                <div key={index} className="flex items-center gap-3 glass-card rounded-lg p-4">
                  <div className="text-sm text-white/70">{rule.field}</div>
                  <div className="px-3 py-1 rounded bg-altyr-purple/20 border border-altyr-purple/30 text-xs text-altyr-purple-light">
                    {rule.operator}
                  </div>
                  <div className="text-sm text-white/90">{rule.value}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>Updates automatically based on real-time data</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>

          {/* Builder Interface Mockup */}
          <div className="glass-card rounded-xl p-6">
            <h4 className="text-lg font-light text-white/90 mb-4">Create Custom Segment</h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60 mb-2 block">Segment Name</label>
                <input
                  type="text"
                  placeholder="Enter segment name..."
                  className="w-full px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">Add Rule</label>
                <div className="flex gap-2">
                  <select className="flex-1 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:border-white/20 focus:outline-none">
                    <option>Connection Score</option>
                    <option>LTV</option>
                    <option>Last Interaction</option>
                    <option>Spending Velocity</option>
                  </select>
                  <select className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:border-white/20 focus:outline-none">
                    <option>&gt;=</option>
                    <option>&lt;=</option>
                    <option>=</option>
                    <option>&gt;</option>
                    <option>&lt;</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Value"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
                  />
                  <button className="px-6 py-2 rounded-lg bg-altyr-magenta hover:bg-altyr-magenta/80 text-white font-medium transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
