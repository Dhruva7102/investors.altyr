import React, { useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import CreatorApp from '@/demo/creators/CreatorApp'
import { trackEvent } from '@/lib/mixpanel'

const DEMO_TOPBAR_OFFSET = 72

function DemoTopBar({ title, subtitle }) {
  return (
    <div className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#18021A]/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#AC0064] to-[#64109A] flex items-center justify-center">
              <span className="text-white font-light text-base">A</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-white/90 font-light truncate">{title}</p>
              <p className="text-xs text-white/40 truncate">{subtitle}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            onClick={() => {
              trackEvent('Demo Exited', {
                demo_type: 'creator',
                exit_point: 'back_to_home',
              })
            }}
            className="px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white/85 hover:bg-white/[0.04] transition-colors"
          >
            Back to ALTYR
          </Link>
          <Link
            to={createPageUrl('CreatorSignup')}
            onClick={() => {
              trackEvent('Join Waitlist Clicked', {
                demo_type: 'creator',
                source: 'demo_topbar',
              })
            }}
            className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#D4740C] to-[#B56A00] hover:opacity-90 transition-opacity text-white"
          >
            Join waitlist
          </Link>
        </div>
      </div>
    </div>
  )
}

function CreatorDemoShell({ children }) {
  return (
    <div className="demo-root min-h-screen bg-[#18021A] text-white">
      <DemoTopBar title="Creator Demo" subtitle="Clickable sandbox of the ALTYR creator operating system" />

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[800px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(212,116,12,0.14) 0%, rgba(172,0,100,0.10) 30%, rgba(100,16,154,0.12) 55%, transparent 70%)',
            filter: 'blur(110px)',
          }}
        />
      </div>

      {children}
    </div>
  )
}

export default function CreatorDemo() {
  useEffect(() => {
    trackEvent('Demo Started', {
      demo_type: 'creator',
      entry_point: 'route',
    })
  }, [])

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <CreatorDemoShell>
            <CreatorApp topOffset={DEMO_TOPBAR_OFFSET} />
          </CreatorDemoShell>
        }
      />
    </Routes>
  )
}

