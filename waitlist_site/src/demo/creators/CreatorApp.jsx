import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar, MobileSidebar } from '@/components/layout'

import CreatorDashboard from './pages/CreatorDashboard'
import FanCRM from './pages/FanCRM'
import FanProfile from './pages/FanProfile'
import RevenueDashboard from './pages/RevenueDashboard'
import GamificationView from './pages/GamificationView'
import Messaging from './pages/Messaging'
import DemoControls from '@/components/demo/DemoControls'

const DEMO_TOPBAR_OFFSET = 72

export default function CreatorApp({ topOffset = DEMO_TOPBAR_OFFSET, mobileMenuOpen = false, setMobileMenuOpen }) {
  return (
    <div className="demo-root min-h-dvh bg-altyr-bg text-white" style={{ paddingTop: `${topOffset}px` }}>
      {/* Desktop Sidebar */}
      <Sidebar topOffset={topOffset} />
      
      {/* Mobile Sidebar Drawer */}
      <MobileSidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen?.(false)} 
        topOffset={topOffset}
      />

      <main className="lg:ml-64 min-h-dvh">
        <div className="p-4 lg:p-8">
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
