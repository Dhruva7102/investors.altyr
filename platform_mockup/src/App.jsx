import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Sidebar } from '@/components/layout'

// Pages
import CreatorDashboard from '@/pages/CreatorDashboard'
import FanCRM from '@/pages/FanCRM'
import FanProfile from '@/pages/FanProfile'
import RevenueDashboard from '@/pages/RevenueDashboard'
import GamificationView from '@/pages/GamificationView'
import Messaging from '@/pages/Messaging'

export default function App() {
  return (
    <div className="min-h-screen bg-altyr-bg">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<CreatorDashboard />} />
            <Route path="/fans" element={<FanCRM />} />
            <Route path="/fans/:id" element={<FanProfile />} />
            <Route path="/revenue" element={<RevenueDashboard />} />
            <Route path="/gamification" element={<GamificationView />} />
            <Route path="/messaging" element={<Messaging />} />
          </Routes>
        </div>
      </main>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Primary gradient orb */}
        <div 
          className="absolute top-1/4 right-1/4 w-[800px] h-[800px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(100,16,154,0.08) 0%, transparent 50%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Secondary orb */}
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
