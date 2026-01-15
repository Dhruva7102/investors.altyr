import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown } from 'lucide-react'
import GlassCard from './GlassCard'
import IconContainer from './IconContainer'

export default function MetricCard({ 
  icon,
  label, 
  value, 
  suffix = '',
  prefix = '',
  change = null,
  trend = null,
  variant = 'default',
  animate = true,
  delay = 0,
  className = '',
}) {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return (val / 1000000).toFixed(1) + 'M'
      }
      if (val >= 1000) {
        return (val / 1000).toFixed(1) + 'K'
      }
      return val.toLocaleString()
    }
    return val
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-400'
      case 'down':
        return 'text-red-400'
      default:
        return 'text-white/50'
    }
  }

  return (
    <GlassCard animate={animate} delay={delay} className={className}>
      <div className="flex items-start justify-between mb-4">
        {icon && <IconContainer icon={icon} size="md" variant={variant} />}
        {change !== null && (
          <div className={`flex items-center gap-1 ${getTrendColor(trend)}`}>
            {trend === 'up' ? (
              <ArrowUp className="w-4 h-4" />
            ) : trend === 'down' ? (
              <ArrowDown className="w-4 h-4" />
            ) : null}
            <span className="text-sm font-medium">{change}%</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-3xl font-extralight text-white/90">
          <span className="text-gradient">
            {prefix}{formatValue(value)}{suffix}
          </span>
        </div>
        <div className="text-sm text-white/50 font-light">
          {label}
        </div>
      </div>
    </GlassCard>
  )
}
