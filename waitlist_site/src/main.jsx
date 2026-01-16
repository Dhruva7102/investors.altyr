import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { registerSuperProperties } from '@/lib/mixpanel'

// Initialize Mixpanel super properties
registerSuperProperties({
  app_name: 'altyr-waitlist',
  app_version: '1.0.0',
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
) 