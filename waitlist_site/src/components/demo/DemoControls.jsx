import React, { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, ArrowUpRight, ArrowUp, Users, User } from 'lucide-react'

const creatorLinks = [
  { label: 'Dashboard', to: '/demo/creators/dashboard' },
  { label: 'Fan CRM', to: '/demo/creators/fan-crm' },
  { label: 'Revenue', to: '/demo/creators/revenue' },
  { label: 'Gamification', to: '/demo/creators/gamification' },
  { label: 'Messaging', to: '/demo/creators/messaging' },
]

const fanLinks = [
  { label: 'Home', to: '/demo/fans/home' },
  { label: 'Rewards', to: '/demo/fans/rewards' },
  { label: 'Creator', to: '/demo/fans/creator' },
  { label: 'Messages', to: '/demo/fans/messages' },
  { label: 'Profile', to: '/demo/fans/profile' },
]

export default function DemoControls({ mode = 'auto' }) {
  const location = useLocation()
  const navigate = useNavigate()

  const inferredMode = useMemo(() => {
    if (mode !== 'auto') return mode
    if (location.pathname.startsWith('/demo/creators')) return 'creator'
    if (location.pathname.startsWith('/demo/fans')) return 'fan'
    return 'fan'
  }, [location.pathname, mode])

  const links = inferredMode === 'creator' ? creatorLinks : fanLinks

  const [open, setOpen] = useState(true)

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="w-[280px] rounded-2xl bg-white/[0.05] border border-white/[0.10] backdrop-blur-md shadow-2xl overflow-hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-altyr-magenta to-altyr-purple flex items-center justify-center">
              {inferredMode === 'creator' ? <Users className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
            </div>
            <div className="text-left">
              <p className="text-xs text-white/70">Demo Controls</p>
              <p className="text-sm text-white/90">{inferredMode === 'creator' ? 'Creator' : 'Fan'} view</p>
            </div>
          </div>
          {open ? <ChevronDown className="w-4 h-4 text-white/60" /> : <ChevronUp className="w-4 h-4 text-white/60" />}
        </button>

        {open && (
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-white/40">Quick jump</p>
              <div className="flex flex-wrap gap-2">
                {links.map((l) => {
                  const isActive = location.pathname === l.to
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                        isActive ? 'bg-white/[0.06] border-white/[0.18] text-white' : 'bg-white/[0.02] border-white/[0.08] text-white/65 hover:bg-white/[0.04]'
                      }`}
                    >
                      {l.label}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] text-xs text-white/70 flex items-center justify-center gap-2"
              >
                <ArrowUp className="w-4 h-4" />
                Top
              </button>
              <button
                onClick={() => navigate(inferredMode === 'creator' ? '/demo/fans/home' : '/demo/creators/dashboard')}
                className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Swap
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

