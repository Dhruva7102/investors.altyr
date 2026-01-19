import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Users, TrendingUp, Gamepad2, MessageSquare, Settings, LogOut, X } from 'lucide-react'
import { trackEvent } from '@/lib/mixpanel'

const navItems = [
  { segment: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { segment: 'fan-crm', icon: Users, label: 'Fan CRM' },
  { segment: 'revenue', icon: TrendingUp, label: 'Revenue' },
  { segment: 'gamification', icon: Gamepad2, label: 'Gamification' },
  { segment: 'messaging', icon: MessageSquare, label: 'Messaging' },
]

function SidebarContent({ basePath, topOffset, onNavClick }) {
  const location = useLocation()

  return (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-altyr-magenta to-altyr-purple flex items-center justify-center">
            <span className="text-white font-light text-lg">A</span>
          </div>
          <div>
            <h1 className="text-lg font-light tracking-[0.12em] text-gradient-logo">ALTYR</h1>
            <p className="text-[10px] text-white/40 tracking-wider">CREATOR PLATFORM</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const itemPath = `${basePath}/${item.segment}`
          const isFanDetail = item.segment === 'fan-crm' && location.pathname.startsWith(`${basePath}/fans/`)
          const isActive = location.pathname === itemPath || isFanDetail

          return (
            <NavLink
              key={item.segment}
              to={itemPath}
              onClick={() => {
                if (!isActive) {
                  trackEvent('Navigation Clicked', {
                    navigation_type: 'sidebar',
                    target: itemPath,
                    label: item.label,
                    demo_type: 'creator',
                  })
                }
                onNavClick?.()
              }}
              className="block"
            >
              <div
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-300
                  ${isActive ? 'bg-gradient-to-r from-altyr-magenta/20 to-altyr-purple/10 border border-altyr-magenta/30' : 'hover:bg-white/[0.03] border border-transparent'}
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-altyr-magenta' : 'text-white/50'}`} />
                <span className={`text-sm font-light ${isActive ? 'text-white' : 'text-white/60'}`}>{item.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-altyr-magenta to-altyr-purple rounded-r-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            </NavLink>
          )
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass-card mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-altyr-magenta/40 to-altyr-purple/40 border border-altyr-magenta/50 flex items-center justify-center text-white font-medium">
            CR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/90 truncate">Creator Account</p>
            <p className="text-xs text-white/40">Pro Plan</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-colors text-white/50 hover:text-white/70">
            <Settings className="w-4 h-4" />
            <span className="text-xs">Settings</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-colors text-white/50 hover:text-white/70">
            <LogOut className="w-4 h-4" />
            <span className="text-xs">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

// Mobile drawer sidebar
export function MobileSidebar({ isOpen, onClose, basePath = '/demo/creators', topOffset = 0 }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            style={{ top: topOffset }}
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 w-72 bg-altyr-bg-dark border-r border-white/[0.08] z-[70] flex flex-col lg:hidden"
            style={{
              top: topOffset,
              height: `calc(100vh - ${topOffset}px)`,
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-white/50 hover:text-white/70"
            >
              <X className="w-5 h-5" />
            </button>
            
            <SidebarContent basePath={basePath} topOffset={topOffset} onNavClick={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

// Desktop fixed sidebar
export default function Sidebar({ basePath = '/demo/creators', topOffset = 0 }) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 bg-altyr-bg-dark border-r border-white/[0.08] z-50 hidden lg:flex flex-col"
      style={
        topOffset
          ? {
              top: `${topOffset}px`,
              height: `calc(100vh - ${topOffset}px)`,
            }
          : undefined
      }
    >
      <SidebarContent basePath={basePath} topOffset={topOffset} />
    </aside>
  )
}
