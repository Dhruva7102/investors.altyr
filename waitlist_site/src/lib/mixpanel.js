import mixpanel from 'mixpanel-browser'

const MIXPANEL_PROJECT_ID = '48f34ae8d16e5cb787cfce136cbdbbf7'

// Initialize Mixpanel
mixpanel.init(MIXPANEL_PROJECT_ID, {
  debug: import.meta.env.DEV,
  track_pageview: false, // We'll track page views manually
  persistence: 'localStorage',
})

// Generate or retrieve session ID
function getSessionId() {
  let sessionId = sessionStorage.getItem('mixpanel_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('mixpanel_session_id', sessionId)
  }
  return sessionId
}

// Get default properties for all events
function getDefaultProperties() {
  return {
    session_id: getSessionId(),
    timestamp: new Date().toISOString(),
    url: window.location.href,
    path: window.location.pathname,
  }
}

/**
 * Track a page view
 * @param {string} pageName - Name of the page
 * @param {object} properties - Additional properties to track
 */
export function trackPageView(pageName, properties = {}) {
  const eventProperties = {
    ...getDefaultProperties(),
    page_name: pageName,
    referrer: document.referrer || 'direct',
    ...properties,
  }

  mixpanel.track('Page Viewed', eventProperties)
}

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {object} properties - Properties to track with the event
 */
export function trackEvent(eventName, properties = {}) {
  const eventProperties = {
    ...getDefaultProperties(),
    ...properties,
  }

  mixpanel.track(eventName, eventProperties)
}

/**
 * Identify a user in Mixpanel
 * @param {string} userId - User identifier (typically email)
 * @param {object} properties - User properties to set
 */
export function identifyUser(userId, properties = {}) {
  mixpanel.identify(userId)
  
  if (Object.keys(properties).length > 0) {
    mixpanel.people.set(properties)
  }
  
  // Track identification event
  trackEvent('User Identified', {
    user_id: userId,
    ...properties,
  })
}

/**
 * Set user properties without identifying
 * @param {object} properties - User properties to set
 */
export function setUserProperties(properties) {
  mixpanel.people.set(properties)
}

/**
 * Reset Mixpanel (for logout or anonymous sessions)
 */
export function reset() {
  mixpanel.reset()
  sessionStorage.removeItem('mixpanel_session_id')
}

/**
 * Register super properties (sent with every event)
 * @param {object} properties - Super properties to register
 */
export function registerSuperProperties(properties) {
  mixpanel.register(properties)
}

export default {
  trackPageView,
  trackEvent,
  identifyUser,
  setUserProperties,
  reset,
  registerSuperProperties,
}
