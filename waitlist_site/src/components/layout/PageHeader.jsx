import React from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/shared'

export default function PageHeader({ label, title, subtitle, actions, className = '' }) {
  return (
    <motion.div
      className={`mb-8 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {label && (
        <div className="mb-4">
          <SectionLabel label={label} centered={false} />
        </div>
      )}

      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extralight text-white/90 tracking-wide mb-2">{title}</h1>
          {subtitle && <p className="text-base text-white/50 font-light max-w-2xl">{subtitle}</p>}
        </div>

        {actions && <div className="flex items-center gap-3 flex-shrink-0">{actions}</div>}
      </div>
    </motion.div>
  )
}

