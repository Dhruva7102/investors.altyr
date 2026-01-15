import React from 'react'
import { motion } from 'framer-motion'

export default function SectionLabel({ 
  label, 
  centered = true,
  animate = true,
  className = '',
}) {
  const content = (
    <div className={`flex items-center gap-6 ${centered ? 'justify-center' : ''} ${className}`}>
      <span className="w-16 h-px bg-gradient-to-r from-transparent to-altyr-purple/50" />
      <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">
        {label}
      </span>
      <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}
