import React from 'react'
import { Link, NavLink, Route, Routes, Navigate } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import FanHome from '@/demo/fans/pages/Home'
import FanRewards from '@/demo/fans/pages/Rewards'
import FanCreator from '@/demo/fans/pages/Creator'
import FanMessages from '@/demo/fans/pages/Messages'
import FanProfile from '@/demo/fans/pages/Profile'
import DemoControls from '@/components/demo/DemoControls'
import { DemoStateProvider } from '@/components/demo/DemoState'
import DemoToasts from '@/components/demo/DemoToasts'
import DemoPrimaryCta from '@/components/demo/DemoPrimaryCta'

function DemoTopBar({ title }) {
  return (
    <div className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#18021A]/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 items-center gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#AC0064] to-[#64109A] flex items-center justify-center">
              <span className="text-white font-light text-base">A</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-white/90 font-light truncate">{title}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <DemoPrimaryCta to={createPageUrl('FanSignup')} tone="magenta" className="h-12 px-7 text-[15px]">
            Join as Fan
          </DemoPrimaryCta>
        </div>
        <div className="flex items-center justify-end">
          <Link
            to="/"
            className="px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white/85 hover:bg-white/[0.04] transition-colors"
          >
            Back to ALTYR
          </Link>
        </div>
      </div>
    </div>
  )
}

function FanDemoShell({ children }) {
  const nav = [
    { to: '/demo/fans/home', label: 'Home' },
    { to: '/demo/fans/rewards', label: 'Rewards' },
    { to: '/demo/fans/creator', label: 'Creator' },
    { to: '/demo/fans/messages', label: 'Messages' },
    { to: '/demo/fans/profile', label: 'Profile' },
  ]

  return (
    <DemoStateProvider>
      <div className="demo-root min-h-screen bg-[#18021A] text-white">
        <DemoTopBar title="Fan Demo" />

        <div className="demo-container max-w-7xl mx-auto px-6 py-6">
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs text-white/50">Explore the fan progression, rewards, and messaging loop.</p>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {nav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        'px-3 py-2 rounded-full text-xs whitespace-nowrap transition-all',
                        isActive
                          ? 'bg-white/[0.08] border border-white/[0.14] text-white'
                          : 'text-white/60 hover:text-white/85 hover:bg-white/[0.04]',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="p-6">{children}</div>
          </div>
        </div>

        <DemoControls mode="fan" />
        <DemoToasts />

        {/* Background accents */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[800px]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(100,16,154,0.18) 0%, rgba(172,0,100,0.08) 35%, transparent 65%)',
              filter: 'blur(110px)',
            }}
          />
        </div>
      </div>
    </DemoStateProvider>
  )
}

export default function FanDemo() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" replace />} />
      <Route
        path="home"
        element={
          <FanDemoShell>
            <FanHome />
          </FanDemoShell>
        }
      />
      <Route
        path="rewards"
        element={
          <FanDemoShell>
            <FanRewards />
          </FanDemoShell>
        }
      />
      <Route
        path="creator"
        element={
          <FanDemoShell>
            <FanCreator />
          </FanDemoShell>
        }
      />
      <Route
        path="messages"
        element={
          <FanDemoShell>
            <FanMessages />
          </FanDemoShell>
        }
      />
      <Route
        path="profile"
        element={
          <FanDemoShell>
            <FanProfile />
          </FanDemoShell>
        }
      />
    </Routes>
  )
}

