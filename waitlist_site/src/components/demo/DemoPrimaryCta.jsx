import React from 'react'
import { Link } from 'react-router-dom'

const tones = {
  magenta: {
    button: 'from-[#AC0064] to-[#64109A] border-white/[0.14]',
    glow: 'from-[#AC0064]/40 via-[#64109A]/22 to-[#AC0064]/18',
    ring: 'focus-visible:ring-[#AC0064]/35',
  },
  amber: {
    button: 'from-[#D4740C] to-[#B56A00] border-white/[0.14]',
    glow: 'from-[#D4740C]/45 via-[#B56A00]/22 to-[#AC0064]/18',
    ring: 'focus-visible:ring-[#D4740C]/35',
  },
}

export default function DemoPrimaryCta({ to, children, tone = 'magenta', className = '' }) {
  const t = tones[tone] || tones.magenta

  return (
    <Link
      to={to}
      className={[
        'relative inline-flex items-center justify-center',
        'h-11 px-6 rounded-full',
        'text-sm font-semibold text-white',
        'bg-gradient-to-r',
        t.button,
        'border',
        'shadow-[0_14px_40px_rgba(0,0,0,0.35)]',
        'transition-[transform,filter,opacity] duration-200',
        'hover:brightness-[1.06] active:brightness-[1.02] active:translate-y-[0.5px]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#18021A]',
        t.ring,
        className,
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute -inset-3 -z-10 rounded-full',
          'bg-gradient-to-r',
          t.glow,
          'blur-2xl opacity-80',
        ].join(' ')}
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/[0.10]" />
      {children}
    </Link>
  )
}

