import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Sidebar, MobileSidebar } from '@/components/layout'

import CreatorDashboard from './pages/CreatorDashboard'
import FanCRM from './pages/FanCRM'
import FanProfile from './pages/FanProfile'
import RevenueDashboard from './pages/RevenueDashboard'
import GamificationView from './pages/GamificationView'
import Messaging from './pages/Messaging'
import DemoControls from '@/components/demo/DemoControls'

const DEMO_TOPBAR_OFFSET = 72

export default function CreatorApp({ topOffset = DEMO_TOPBAR_OFFSET }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="demo-root min-h-screen bg-altyr-bg text-white" style={{ paddingTop: `${topOffset}px` }}>
      {/* Desktop Sidebar */}
      <Sidebar topOffset={topOffset} />
      
      {/* Mobile Sidebar Drawer */}
      <MobileSidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        topOffset={topOffset}
      />

      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-altyr-bg-dark/80 backdrop-blur-md border-b border-white/[0.08]" style={{ top: topOffset }}>
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-white/[0.05] transition-colors text-white/70 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-altyr-magenta to-altyr-purple flex items-center justify-center">
              <span className="text-white font-light text-sm">A</span>
            </div>
            <span className="text-sm font-light text-white/80">Creator Dashboard</span>
          </div>
        </div>
      </div>

      <main className="lg:ml-64 min-h-screen">
        {/* Add top padding on mobile to account for fixed mobile header */}
        <div className="p-4 pt-16 lg:p-8 lg:pt-8">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<CreatorDashboard />} />
            <Route path="fan-crm" element={<FanCRM />} />
            <Route path="fans/:id" element={<FanProfile />} />
            <Route path="revenue" element={<RevenueDashboard />} />
            <Route path="gamification" element={<GamificationView />} />
            <Route path="messaging" element={<Messaging />} />
          </Routes>
        </div>
      </main>

      <DemoControls mode="creator" />

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute top-1/4 right-1/4 w-[800px] h-[800px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(100,16,154,0.08) 0%, transparent 50%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.06) 0%, transparent 50%)',
            filter: 'blur(80px)',
          }}
        />
      </div>
    </div>
  )
}
