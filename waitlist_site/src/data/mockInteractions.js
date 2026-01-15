// Mock interaction timeline data for fans

export const generateInteractions = (fanId) => {
  const interactionTemplates = {
    'fan-001': [
      { id: 1, type: 'message', timestamp: '2025-01-13T14:30:00', description: 'Sent personalized thank you for continued support', sentiment: 'positive', amount: null },
      { id: 2, type: 'tip', timestamp: '2025-01-13T12:15:00', description: 'Tip received', sentiment: 'positive', amount: 50 },
      { id: 3, type: 'purchase', timestamp: '2025-01-12T18:45:00', description: 'Purchased exclusive content bundle', sentiment: 'positive', amount: 75 },
      { id: 4, type: 'message', timestamp: '2025-01-12T10:20:00', description: 'Fan sent voice note expressing appreciation', sentiment: 'positive', amount: null },
      { id: 5, type: 'milestone', timestamp: '2025-01-11T09:00:00', description: 'Reached Level 87', sentiment: 'positive', amount: null },
      { id: 6, type: 'subscription', timestamp: '2025-01-10T00:00:00', description: 'Subscription renewed (18th month)', sentiment: 'positive', amount: 25 },
      { id: 7, type: 'purchase', timestamp: '2025-01-09T20:30:00', description: 'Custom content request fulfilled', sentiment: 'positive', amount: 150 },
      { id: 8, type: 'tip', timestamp: '2025-01-08T16:00:00', description: 'Generous tip on new content', sentiment: 'positive', amount: 100 },
      { id: 9, type: 'message', timestamp: '2025-01-07T11:30:00', description: 'Birthday wishes sent', sentiment: 'positive', amount: null },
      { id: 10, type: 'milestone', timestamp: '2025-01-05T09:00:00', description: 'Earned \"Philanthropist\" badge', sentiment: 'positive', amount: null },
    ],
    'fan-002': [
      { id: 1, type: 'message', timestamp: '2025-01-13T09:00:00', description: 'Morning check-in message', sentiment: 'positive', amount: null },
      { id: 2, type: 'purchase', timestamp: '2025-01-12T22:00:00', description: 'Purchased premium video', sentiment: 'positive', amount: 45 },
      { id: 3, type: 'tip', timestamp: '2025-01-11T15:30:00', description: 'Tip on live stream', sentiment: 'positive', amount: 35 },
      { id: 4, type: 'message', timestamp: '2025-01-10T20:15:00', description: 'Fan shared positive feedback', sentiment: 'positive', amount: null },
      { id: 5, type: 'subscription', timestamp: '2025-01-09T00:00:00', description: 'Subscription renewed (14th month)', sentiment: 'positive', amount: 25 },
      { id: 6, type: 'milestone', timestamp: '2025-01-08T09:00:00', description: 'Reached Level 72', sentiment: 'positive', amount: null },
    ],
    'fan-004': [
      { id: 1, type: 'message', timestamp: '2025-01-10T14:00:00', description: 'Sent re-engagement message', sentiment: 'neutral', amount: null },
      { id: 2, type: 'purchase', timestamp: '2025-01-08T19:30:00', description: 'Purchased content pack', sentiment: 'positive', amount: 30 },
      { id: 3, type: 'message', timestamp: '2025-01-05T10:00:00', description: 'Fan responded to check-in', sentiment: 'neutral', amount: null },
      { id: 4, type: 'subscription', timestamp: '2025-01-01T00:00:00', description: 'Subscription renewed (9th month)', sentiment: 'positive', amount: 25 },
    ],
    'fan-009': [
      { id: 1, type: 'message', timestamp: '2025-01-05T12:00:00', description: 'Sent welcome sequence message', sentiment: 'neutral', amount: null },
      { id: 2, type: 'subscription', timestamp: '2024-12-15T00:00:00', description: 'Initial subscription', sentiment: 'positive', amount: 15 },
    ],
  }

  return (
    interactionTemplates[fanId] || [
      { id: 1, type: 'subscription', timestamp: '2024-12-01T00:00:00', description: 'Subscription started', sentiment: 'positive', amount: 15 },
      { id: 2, type: 'message', timestamp: '2024-12-02T10:00:00', description: 'Welcome message sent', sentiment: 'positive', amount: null },
    ]
  )
}

// Alerts and notifications
export const alerts = [
  {
    id: 'alert-001',
    type: 'risk',
    severity: 'high',
    fanId: 'fan-009',
    fanName: 'Quinn D.',
    title: 'High-value fan at risk',
    description: 'No interaction in 8 days. Engagement declining rapidly.',
    suggestedAction: 'Send personalized re-engagement message',
    timestamp: '2025-01-13T08:00:00',
  },
  {
    id: 'alert-002',
    type: 'risk',
    severity: 'high',
    fanId: 'fan-011',
    fanName: 'Drew C.',
    title: 'Subscription lapsed',
    description: 'Subscription expired 5 days ago. Win-back opportunity.',
    suggestedAction: 'Send special offer to re-subscribe',
    timestamp: '2025-01-13T08:00:00',
  },
  {
    id: 'alert-003',
    type: 'risk',
    severity: 'medium',
    fanId: 'fan-004',
    fanName: 'Sam R.',
    title: 'VIP engagement declining',
    description: 'VIP fan showing reduced activity over past week.',
    suggestedAction: 'Send exclusive content preview',
    timestamp: '2025-01-13T09:00:00',
  },
  {
    id: 'alert-004',
    type: 'positive',
    severity: 'low',
    fanId: 'fan-001',
    fanName: 'Marcus W.',
    title: 'Whale re-engaged',
    description: 'Top fan active again with $50 tip today.',
    suggestedAction: 'Send thank you message',
    timestamp: '2025-01-13T12:15:00',
  },
  {
    id: 'alert-005',
    type: 'milestone',
    severity: 'low',
    fanId: 'fan-005',
    fanName: 'Casey L.',
    title: 'Fan upgraded to VIP',
    description: 'Recently upgraded from Regular status.',
    suggestedAction: 'Acknowledge milestone with exclusive perk',
    timestamp: '2025-01-12T18:00:00',
  },
  {
    id: 'alert-006',
    type: 'milestone',
    severity: 'low',
    fanId: 'fan-003',
    fanName: 'Jordan K.',
    title: 'Approaching 1-year anniversary',
    description: 'Fan anniversary in 5 days.',
    suggestedAction: 'Prepare special anniversary message',
    timestamp: '2025-01-13T09:00:00',
  },
]

// Suggested actions for fan profiles
export const suggestedActions = {
  'fan-001': [
    { id: 1, action: 'Send voice note', reason: 'Fan responds well to personal messages', priority: 'high' },
    { id: 2, action: 'Offer early access to new content', reason: 'Top supporter deserves exclusivity', priority: 'medium' },
  ],
  'fan-004': [
    { id: 1, action: 'Send check-in message', reason: 'Engagement declining - needs attention', priority: 'high' },
    { id: 2, action: 'Offer exclusive discount', reason: 'May encourage renewed engagement', priority: 'medium' },
  ],
  'fan-009': [
    { id: 1, action: 'Send re-engagement offer', reason: 'At risk of churning', priority: 'high' },
    { id: 2, action: 'Ask for feedback', reason: 'Understand what would increase engagement', priority: 'high' },
  ],
  default: [
    { id: 1, action: 'Send personalized message', reason: 'Build relationship depth', priority: 'medium' },
    { id: 2, action: 'Share upcoming content preview', reason: 'Increase anticipation', priority: 'low' },
  ],
}

export const getSuggestedActions = (fanId) => suggestedActions[fanId] || suggestedActions.default

export default { generateInteractions, alerts, suggestedActions, getSuggestedActions }

