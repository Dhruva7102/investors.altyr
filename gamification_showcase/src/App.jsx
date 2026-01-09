import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import XPSystem from './components/XPSystem'
import ProfileCustomization from './components/ProfileCustomization'
import BadgeSystem from './components/BadgeSystem'
import DailyLogin from './components/DailyLogin'
import UIMockups from './components/UIMockups'
import LaunchPlan from './components/LaunchPlan'
import SideNav from './components/SideNav'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  const sections = [
    { id: 'hero', label: 'Overview' },
    { id: 'xp-system', label: 'XP System' },
    { id: 'profile', label: 'Profile' },
    { id: 'badges', label: 'Badges' },
    { id: 'daily-login', label: 'Daily Login' },
    { id: 'mockups', label: 'UI Mockups' },
    { id: 'launch-plan', label: 'Launch Plan' },
  ]

  return (
    <div className="min-h-screen bg-altyr-bg">
      <SideNav sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        <Hero setActiveSection={setActiveSection} />
        <XPSystem setActiveSection={setActiveSection} />
        <ProfileCustomization setActiveSection={setActiveSection} />
        <BadgeSystem setActiveSection={setActiveSection} />
        <DailyLogin setActiveSection={setActiveSection} />
        <UIMockups setActiveSection={setActiveSection} />
        <LaunchPlan setActiveSection={setActiveSection} />
      </main>
    </div>
  )
}

export default App
