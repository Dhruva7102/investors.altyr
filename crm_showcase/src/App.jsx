import React, { useState } from 'react'
import Hero from './components/Hero'
import QuickScanCRM from './components/QuickScanCRM'
import RelationshipScoring from './components/RelationshipScoring'
import Segmentation from './components/Segmentation'
import PredictiveAnalytics from './components/PredictiveAnalytics'
import UserProfiles from './components/UserProfiles'
import GamificationIntegration from './components/GamificationIntegration'
import AdvancedFeatures from './components/AdvancedFeatures'
import Roadmap from './components/Roadmap'
import SideNav from './components/SideNav'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  const sections = [
    { id: 'hero', label: 'Overview' },
    { id: 'quick-scan', label: 'Quick Scan' },
    { id: 'scoring', label: 'Scoring' },
    { id: 'segmentation', label: 'Segments' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'profiles', label: 'Profiles' },
    { id: 'gamification', label: 'Integration' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'roadmap', label: 'Roadmap' },
  ]

  return (
    <div className="min-h-screen bg-altyr-bg">
      <SideNav sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        <Hero setActiveSection={setActiveSection} />
        <QuickScanCRM setActiveSection={setActiveSection} />
        <RelationshipScoring setActiveSection={setActiveSection} />
        <Segmentation setActiveSection={setActiveSection} />
        <PredictiveAnalytics setActiveSection={setActiveSection} />
        <UserProfiles setActiveSection={setActiveSection} />
        <GamificationIntegration setActiveSection={setActiveSection} />
        <AdvancedFeatures setActiveSection={setActiveSection} />
        <Roadmap setActiveSection={setActiveSection} />
      </main>
    </div>
  )
}

export default App
