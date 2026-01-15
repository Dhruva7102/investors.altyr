import React from 'react'

const statusConfig = {
  Superfan: {
    bg: 'bg-status-superfan/20',
    border: 'border-status-superfan/40',
    text: 'text-status-superfan',
  },
  VIP: {
    bg: 'bg-status-vip/20',
    border: 'border-status-vip/40',
    text: 'text-status-vip',
  },
  Regular: {
    bg: 'bg-status-regular/20',
    border: 'border-status-regular/40',
    text: 'text-status-regular',
  },
  Casual: {
    bg: 'bg-status-casual/20',
    border: 'border-status-casual/40',
    text: 'text-status-casual',
  },
}

const churnConfig = {
  Low: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/40',
    text: 'text-green-400',
  },
  Medium: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/40',
    text: 'text-yellow-400',
  },
  High: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/40',
    text: 'text-red-400',
  },
}

const rarityConfig = {
  bronze: {
    bg: 'bg-badge-bronze/20',
    border: 'border-badge-bronze/40',
    text: 'text-badge-bronze',
  },
  silver: {
    bg: 'bg-badge-silver/20',
    border: 'border-badge-silver/40',
    text: 'text-badge-silver',
  },
  gold: {
    bg: 'bg-badge-gold/20',
    border: 'border-badge-gold/40',
    text: 'text-badge-gold',
  },
  platinum: {
    bg: 'bg-badge-platinum/20',
    border: 'border-badge-platinum/40',
    text: 'text-badge-platinum',
  },
}

export default function StatusBadge({ status, type = 'status', size = 'sm', className = '' }) {
  let config

  switch (type) {
    case 'churn':
      config = churnConfig[status] || churnConfig.Low
      break
    case 'rarity':
      config = rarityConfig[status] || rarityConfig.bronze
      break
    default:
      config = statusConfig[status] || statusConfig.Casual
  }

  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  }

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        border
        font-medium
        ${config.bg}
        ${config.border}
        ${config.text}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {status}
    </span>
  )
}

