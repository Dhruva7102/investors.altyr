import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { registerSuperProperties, trackEvent } from '@/lib/mixpanel'

// Initialize Mixpanel super properties
registerSuperProperties({
  app_name: 'altyr-waitlist',
  app_version: '1.0.0',
})

// Track app initialization (helps verify Mixpanel is working)
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  setTimeout(() => {
    trackEvent('App Initialized', {
      timestamp: new Date().toISOString(),
    })
  }, 100)
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
) 