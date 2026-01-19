/**
 * Lightweight Mixpanel wrapper.
 *
 * Important: We intentionally DO NOT import `mixpanel-browser` here to keep builds
 * working even when analytics deps are not installed (e.g. demo deploys).
 *
 * If `window.mixpanel` is present (loaded via script tag or another bundler entry),
 * we’ll call it. Otherwise we safely no-op.
 */

function getMixpanel() {
  // eslint-disable-next-line no-undef
  return typeof window !== 'undefined' ? window.mixpanel : null
}

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
    url: typeof window !== 'undefined' ? window.location.href : '',
    path: typeof window !== 'undefined' ? window.location.pathname : '',
  }
}

/**
 * Track a page view
 * @param {string} pageName - Name of the page
 * @param {object} properties - Additional properties to track
 */
export function trackPageView(pageName, properties = {}) {
  try {
    const eventProperties = {
      ...getDefaultProperties(),
      page_name: pageName,
      referrer: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
      ...properties,
    }

    const mp = getMixpanel()
    if (mp?.track) mp.track('Page Viewed', eventProperties)

    if (import.meta.env?.DEV) {
      console.log('Mixpanel: Page Viewed', eventProperties)
    }
  } catch (error) {
    console.error('Failed to track page view:', error)
  }
}

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {object} properties - Properties to track with the event
 */
export function trackEvent(eventName, properties = {}) {
  try {
    const eventProperties = {
      ...getDefaultProperties(),
      ...properties,
    }

    const mp = getMixpanel()
    if (mp?.track) mp.track(eventName, eventProperties)

    if (import.meta.env?.DEV) {
      console.log('Mixpanel: Event tracked', eventName, eventProperties)
    }
  } catch (error) {
    console.error('Failed to track event:', error)
  }
}

/**
 * Identify a user in Mixpanel
 * @param {string} userId - User identifier (typically email)
 * @param {object} properties - User properties to set
 */
export function identifyUser(userId, properties = {}) {
  const mp = getMixpanel()
  if (!mp) return

  if (mp.identify) mp.identify(userId)
  if (Object.keys(properties).length > 0 && mp.people?.set) {
    mp.people.set(properties)
  }

  trackEvent('User Identified', { user_id: userId, ...properties })
}

/**
 * Set user properties without identifying
 * @param {object} properties - User properties to set
 */
export function setUserProperties(properties) {
  const mp = getMixpanel()
  if (mp?.people?.set) mp.people.set(properties)
}

/**
 * Reset Mixpanel (for logout or anonymous sessions)
 */
export function reset() {
  const mp = getMixpanel()
  if (mp?.reset) mp.reset()
  if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('mixpanel_session_id')
}

/**
 * Register super properties (sent with every event)
 * @param {object} properties - Super properties to register
 */
export function registerSuperProperties(properties) {
  const mp = getMixpanel()
  if (mp?.register) mp.register(properties)
}

export default {
  trackPageView,
  trackEvent,
  identifyUser,
  setUserProperties,
  reset,
  registerSuperProperties,
}
