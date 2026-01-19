import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import CreatorApp from '@/demo/creators/CreatorApp'
import { DemoStateProvider } from '@/components/demo/DemoState'
import DemoToasts from '@/components/demo/DemoToasts'
import DemoPrimaryCta from '@/components/demo/DemoPrimaryCta'

const DEMO_TOPBAR_OFFSET = 72

function DemoTopBar({ title }) {
  return (
    <div className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#18021A]/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Mobile: stacked layout, Desktop: grid layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Logo and title */}
          <div className="flex items-center justify-between sm:justify-start gap-3 min-w-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#AC0064] to-[#64109A] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-light text-sm sm:text-base">A</span>
              </div>
              <p className="text-sm text-white/90 font-light truncate">{title}</p>
            </div>
            {/* Back link - visible on mobile in header row */}
            <Link
              to="/"
              className="sm:hidden px-2 py-1.5 rounded-lg text-xs text-white/60 hover:text-white/85 hover:bg-white/[0.04] transition-colors whitespace-nowrap"
            >
              Back
            </Link>
          </div>

          {/* CTA and back link */}
          <div className="flex items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <DemoPrimaryCta to={createPageUrl('CreatorSignup')} tone="amber" className="text-sm sm:text-base">
              Join as Creator
            </DemoPrimaryCta>
            {/* Back link - hidden on mobile, visible on desktop */}
            <Link
              to="/"
              className="hidden sm:block px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white/85 hover:bg-white/[0.04] transition-colors whitespace-nowrap"
            >
              Back to ALTYR
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreatorDemoShell({ children }) {
  return (
    <DemoStateProvider>
      <div className="demo-root min-h-screen bg-[#18021A] text-white">
      <DemoTopBar title="Creator Demo" />

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
        <DemoToasts />
      </div>
    </DemoStateProvider>
  )
}

export default function CreatorDemo() {
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

