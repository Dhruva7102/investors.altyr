import React from 'react'
import { motion } from 'framer-motion'

export default function GlassCard({ 
  children, 
  className = '', 
  hover = true, 
  onClick = null,
  animate = true,
  delay = 0,
  padding = 'p-6',
}) {
  const baseClasses = `
    rounded-xl 
    bg-white/[0.03] 
    border border-white/[0.08] 
    backdrop-blur-sm
    ${hover ? 'hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${padding}
    ${className}
  `

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  )
}
