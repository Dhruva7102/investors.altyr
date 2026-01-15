import React from 'react'

export default function IconContainer({ icon: Icon, size = 'md', variant = 'default', className = '' }) {
  const sizeClasses = {
    sm: 'p-2 w-8 h-8',
    md: 'p-3 w-12 h-12',
    lg: 'p-4 w-14 h-14',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const variantClasses = {
    default: 'bg-gradient-to-br from-altyr-magenta/20 to-altyr-purple/20 border border-altyr-magenta/30',
    success: 'bg-green-500/20 border border-green-500/30',
    warning: 'bg-altyr-orange/20 border border-altyr-orange/30',
    danger: 'bg-red-500/20 border border-red-500/30',
    neutral: 'bg-white/10 border border-white/20',
  }

  const iconColors = {
    default: 'text-altyr-magenta',
    success: 'text-green-400',
    warning: 'text-altyr-orange',
    danger: 'text-red-400',
    neutral: 'text-white/60',
  }

  return (
    <div
      className={`
        inline-flex items-center justify-center
        rounded-xl
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <Icon className={`${iconSizes[size]} ${iconColors[variant]}`} />
    </div>
  )
}

