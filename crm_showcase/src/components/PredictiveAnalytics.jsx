import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, Lightbulb, BarChart3, DollarSign, Clock } from 'lucide-react'

export default function PredictiveAnalytics({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('analytics')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('analytics')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const ltvFactors = [
    { name: 'Current LTV', weight: 40, icon: DollarSign },
    { name: 'Spending Velocity Trend', weight: 30, icon: TrendingUp },
    { name: 'Relationship Depth Factor', weight: 20, icon: BarChart3 },
    { name: 'Churn Risk Adjustment', weight: 10, icon: AlertTriangle },
  ]

  const churnRiskFactors = [
    { name: 'Engagement Decline', weight: 35 },
    { name: 'Interaction Recency', weight: 25 },
    { name: 'Financial Stability', weight: 20 },
    { name: 'Relationship Depth Change', weight: 20 },
  ]

  const getChurnColorClasses = (color) => {
    const colorMap = {
      'green-400': 'bg-green-400',
      'yellow-400': 'bg-yellow-400',
      'orange-400': 'bg-orange-400',
      'red-400': 'bg-red-400',
    }
    return colorMap[color] || 'bg-white'
  }

  const churnDistribution = [
    { level: 'Low', count: 1847, percentage: 65, color: 'green-400' },
    { level: 'Medium', count: 712, percentage: 25, color: 'yellow-400' },
    { level: 'High', count: 213, percentage: 7, color: 'orange-400' },
    { level: 'Critical', count: 75, percentage: 3, color: 'red-400' },
  ]

  const actionRecommendations = [
    {
      fan: 'Alex M.',
      issue: 'Decreasing engagement',
      recommendation: 'Send personalized message with exclusive content',
      priority: 'High',
      icon: Lightbulb,
    },
    {
      fan: 'Jordan K.',
      issue: 'No interaction in 5 days',
      recommendation: 'Create limited-time offer to re-engage',
      priority: 'Medium',
      icon: Clock,
    },
    {
      fan: 'Casey R.',
      issue: 'High churn risk',
      recommendation: 'Invite to VIP tier with special benefits',
      priority: 'Critical',
      icon: AlertTriangle,
    },
  ]

  return (
    <section id="analytics" className="relative py-24 md:py-32">
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
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">Predictive Analytics</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            Predictive <span className="text-gradient">Intelligence</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            Forecast LTV and identify churn risk before it happens—then take action
          </p>
        </motion.div>

        {/* LTV Prediction */}
        <div className="mb-20">
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">LTV Prediction Model</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {ltvFactors.map((factor, index) => {
              const Icon = factor.icon
              return (
                <motion.div
                  key={index}
                  className="glass-card glass-card-hover rounded-xl p-5 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="p-3 rounded-xl bg-altyr-magenta/20 border border-altyr-magenta/30 w-fit mx-auto mb-3">
                    <Icon className="w-5 h-5 text-altyr-magenta" />
                  </div>
                  <div className="text-2xl font-semibold text-gradient mb-1">{factor.weight}%</div>
                  <div className="text-sm text-white/70">{factor.name}</div>
                </motion.div>
              )
            })}
          </div>

          {/* LTV Prediction Example */}
          <motion.div
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-light text-white/90 mb-1">Predicted LTV</h4>
                <p className="text-sm text-white/60">Based on current patterns and trends</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-semibold text-gradient">$3,450</div>
                <div className="text-sm text-green-400">+18% from current</div>
              </div>
            </div>
            <div className="w-full h-4 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-altyr-magenta to-altyr-purple"
                initial={{ width: 0 }}
                whileInView={{ width: '68%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-white/50">
              <span>$0</span>
              <span>$5,000</span>
            </div>
          </motion.div>
        </div>

        {/* Churn Risk Scoring */}
        <div className="mb-20">
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Churn Risk Scoring</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {churnRiskFactors.map((factor, index) => (
              <motion.div
                key={index}
                className="glass-card glass-card-hover rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-2xl font-semibold text-gradient mb-2">{factor.weight}%</div>
                <div className="text-sm text-white/70">{factor.name}</div>
              </motion.div>
            ))}
          </div>

          {/* Churn Distribution */}
          <motion.div
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-lg font-light text-white/90 mb-6">Churn Risk Distribution</h4>
            <div className="space-y-4">
              {churnDistribution.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getChurnColorClasses(item.color)}`} />
                      <span className="text-white/90 font-medium">{item.level} Risk</span>
                    </div>
                    <div className="text-white/70">
                      {item.count} fans ({item.percentage}%)
                    </div>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className={`h-full ${getChurnColorClasses(item.color)}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action Recommendations */}
        <div>
          <h3 className="text-2xl font-light text-white/90 mb-8 text-center">Smart Action Recommendations</h3>
          <div className="space-y-4">
            {actionRecommendations.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.div
                  key={index}
                  className="glass-card glass-card-hover rounded-xl p-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-altyr-magenta/20 border border-altyr-magenta/30">
                        <Icon className="w-5 h-5 text-altyr-magenta" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-medium text-white/90">{action.fan}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            action.priority === 'Critical' ? 'bg-red-400/20 text-red-400 border-red-400/30' :
                            action.priority === 'High' ? 'bg-orange-400/20 text-orange-400 border-orange-400/30' :
                            'bg-yellow-400/20 text-yellow-400 border-yellow-400/30'
                          } border`}>
                            {action.priority} Priority
                          </span>
                        </div>
                        <p className="text-sm text-white/60 mb-2">{action.issue}</p>
                        <p className="text-sm text-white/80 font-medium">{action.recommendation}</p>
                      </div>
                    </div>
                    <button className="px-6 py-2 rounded-lg bg-altyr-magenta hover:bg-altyr-magenta/80 text-white font-medium transition-colors ml-4">
                      Take Action
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
