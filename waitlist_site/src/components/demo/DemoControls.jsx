import React, { useMemo, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, ArrowUpRight, ArrowUp, Users, User, Sparkles } from 'lucide-react'
import { useDemoState } from '@/components/demo/DemoState'
import DemoTourOverlay from '@/components/demo/DemoTourOverlay'

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
  const { setTour, pushToast } = useDemoState()

  const inferredMode = useMemo(() => {
    if (mode !== 'auto') return mode
    if (location.pathname.startsWith('/demo/creators')) return 'creator'
    if (location.pathname.startsWith('/demo/fans')) return 'fan'
    return 'fan'
  }, [location.pathname, mode])

  const links = inferredMode === 'creator' ? creatorLinks : fanLinks

  // Collapse by default on mobile, open on desktop
  const [open, setOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768
    }
    return true
  })

  const tourSteps = useMemo(() => {
    if (inferredMode === 'creator') {
      return [
        {
          to: '/demo/creators/dashboard',
          title: 'Start with signals and opportunities',
          body: 'This is the “what to do today” view: at-risk fans, conversion windows, and repeat spend moments.',
          hint: 'Click any action in Today’s Opportunities to see an outcome toast.',
        },
        {
          to: '/demo/creators/fan-crm',
          title: 'Fan CRM: see the relationship at a glance',
          body: 'Segment fans by relationship strength and spot who needs attention right now.',
          toast: { title: 'CRM lens applied', message: 'Filtered to high-signal fans.', tone: 'neutral' },
        },
        {
          to: '/demo/creators/messaging',
          title: 'Messaging: convert warmth into revenue',
          body: 'Send timely messages and offers based on signals—without guessing.',
          toast: { title: 'Offer sent', message: 'Limited-time offer queued (+$35)', tone: 'success' },
        },
        {
          to: '/demo/creators/gamification',
          title: 'Gamification: keep fans coming back',
          body: 'Progression, quests, and perks increase engagement—and make spending feel fun.',
          toast: { title: 'Milestone unlocked', message: 'VIP tier moment created (+1 VIP)', tone: 'success' },
        },
        {
          to: '/demo/creators/revenue',
          title: 'Revenue: see outcomes and attribution',
          body: 'Track what worked and double down on the loops that drive repeat spend.',
          toast: { title: 'Revenue attributed', message: 'Repeat spend loop +$75', tone: 'success' },
        },
      ]
    }

    return [
      {
        to: '/demo/fans/home',
        title: 'Home: your loop in one glance',
        body: 'Quests and streaks create habit. Points turn engagement into perks.',
        hint: 'Click a quest to “complete” it and feel the progression.',
      },
      {
        to: '/demo/fans/rewards',
        title: 'Rewards: badges and level-ups',
        body: 'Status makes fans feel seen, while giving creators a lever for upgrades.',
        toast: { title: 'Status moment', message: 'VIP moment created (+1 VIP)', tone: 'success' },
      },
      {
        to: '/demo/fans/creator#store',
        title: 'Creator store: buy content and perks',
        body: 'Fans can browse content and purchase directly—plus redeem perks that change their experience.',
        toast: { title: 'Purchased', message: 'Content purchased (+$29)', tone: 'success' },
      },
      {
        to: '/demo/fans/messages',
        title: 'Messages: the relationship layer',
        body: 'Perks and status change messaging priority and access.',
        toast: { title: 'Message sent', message: 'Reply queued (+1)', tone: 'neutral' },
      },
    ]
  }, [inferredMode])

  return (
    <div className="fixed bottom-4 sm:bottom-5 right-3 sm:right-5 z-50 max-w-[calc(100vw-24px)]">
      <div className="w-[260px] sm:w-[280px] rounded-2xl bg-white/[0.05] border border-white/[0.10] backdrop-blur-md shadow-2xl overflow-hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-altyr-magenta to-altyr-purple flex items-center justify-center flex-shrink-0">
              {inferredMode === 'creator' ? <Users className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
            </div>
            <div className="text-left min-w-0">
              <p className="text-[10px] sm:text-xs text-white/70">Demo Controls</p>
              <p className="text-xs sm:text-sm text-white/90">{inferredMode === 'creator' ? 'Creator' : 'Fan'} view</p>
              <p className="text-[9px] sm:text-[10px] text-white/40 truncate">Interactive preview</p>
            </div>
          </div>
          {open ? <ChevronDown className="w-4 h-4 text-white/60 flex-shrink-0" /> : <ChevronUp className="w-4 h-4 text-white/60 flex-shrink-0" />}
        </button>

        {open && (
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-white/40">Guided tour</p>
              <button
                onClick={() => {
                  setTour({ active: true, stepIndex: 0 })
                  const first = tourSteps[0]
                  if (first?.to) navigate(first.to)
                  pushToast({ title: 'Tour started', message: 'Use Next/Prev to move through the loop.', tone: 'neutral' })
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Start 45s tour
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/90" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-white/40">Quick jump</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {links.map((l) => {
                  const isActive = location.pathname === l.to
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs border transition-colors ${
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
                className="flex-1 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] text-xs text-white/70 flex items-center justify-center gap-2"
              >
                <ArrowUp className="w-4 h-4" />
                Top
              </button>
              <button
                onClick={() => navigate(inferredMode === 'creator' ? '/demo/fans/home' : '/demo/creators/dashboard')}
                className="flex-1 px-3 py-2.5 rounded-xl bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Swap
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <DemoTourOverlay mode={inferredMode} steps={tourSteps} />
    </div>
  )
}

