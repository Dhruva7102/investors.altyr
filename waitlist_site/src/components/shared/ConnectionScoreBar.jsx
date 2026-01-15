import React from 'react'
import { motion } from 'framer-motion'

export default function ConnectionScoreBar({
  score,
  showLabel = true,
  size = 'md',
  animate = true,
  className = '',
}) {
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }

  const getScoreColor = (s) => {
    if (s >= 80) return 'from-altyr-magenta via-altyr-purple-light to-altyr-purple'
    if (s >= 60) return 'from-altyr-purple-light to-altyr-purple'
    if (s >= 40) return 'from-altyr-orange to-altyr-purple-light'
    return 'from-status-casual to-altyr-orange'
  }

  const bar = (
    <div className={`w-full ${heightClasses[size]} bg-white/10 rounded-full overflow-hidden`}>
      {animate ? (
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(score)}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      ) : (
        <div className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(score)}`} style={{ width: `${score}%` }} />
      )}
    </div>
  )

  if (!showLabel) {
    return <div className={className}>{bar}</div>
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/50">Connection</span>
        <span className="text-sm font-medium text-gradient">{score}</span>
      </div>
      {bar}
    </div>
  )
}

