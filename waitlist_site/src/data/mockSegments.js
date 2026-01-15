// Mock segment definitions for fan categorization

export const segments = [
  {
    id: 'whales',
    name: 'Whales',
    description: 'Top 1-5% of fans by lifetime value',
    count: 7,
    percentageOfTotal: 5,
    totalRevenue: 8750,
    revenuePercentage: 70.3,
    avgLTV: 5200,
    avgConnectionScore: 88,
    characteristics: ['High engagement frequency', 'Regular custom content purchases', 'Strong emotional connection', 'Low churn risk'],
    recommendedActions: ['Prioritize personalized communication', 'Offer exclusive early access', 'Acknowledge milestones promptly', 'Request feedback on new content'],
    color: '#FFD700',
    bgColor: 'bg-status-superfan/20',
    borderColor: 'border-status-superfan/30',
    textColor: 'text-status-superfan',
  },
  {
    id: 'core-supporters',
    name: 'Core Supporters',
    description: 'Top 5-20% of fans',
    count: 21,
    percentageOfTotal: 15,
    totalRevenue: 2520,
    revenuePercentage: 20.2,
    avgLTV: 1890,
    avgConnectionScore: 72,
    characteristics: ['Consistent subscribers', 'Regular tippers', 'Moderate engagement', 'Potential to become whales'],
    recommendedActions: ['Nurture with regular communication', 'Offer VIP upgrade paths', 'Create exclusive tier benefits', 'Recognize loyalty milestones'],
    color: '#A855F7',
    bgColor: 'bg-status-vip/20',
    borderColor: 'border-status-vip/30',
    textColor: 'text-status-vip',
  },
  {
    id: 'regulars',
    name: 'Regulars',
    description: '20-50% of fans',
    count: 42,
    percentageOfTotal: 30,
    totalRevenue: 890,
    revenuePercentage: 7.2,
    avgLTV: 620,
    avgConnectionScore: 48,
    characteristics: ['Stable subscribers', 'Occasional purchases', 'Moderate engagement', 'Responsive to offers'],
    recommendedActions: ['Maintain regular content schedule', 'Segment for targeted campaigns', 'Identify upgrade potential', 'Use gamification incentives'],
    color: '#3B82F6',
    bgColor: 'bg-status-regular/20',
    borderColor: 'border-status-regular/30',
    textColor: 'text-status-regular',
  },
  {
    id: 'casuals',
    name: 'Casuals',
    description: 'Bottom 50% of fans',
    count: 70,
    percentageOfTotal: 50,
    totalRevenue: 290,
    revenuePercentage: 2.3,
    avgLTV: 85,
    avgConnectionScore: 25,
    characteristics: ['New or infrequent subscribers', 'Minimal purchases', 'Low engagement', 'High churn risk'],
    recommendedActions: ['Automate welcome sequences', 'Use mass messaging efficiently', 'Focus on conversion to Regular', 'Monitor for churn signals'],
    color: '#6B7280',
    bgColor: 'bg-status-casual/20',
    borderColor: 'border-status-casual/30',
    textColor: 'text-status-casual',
  },
]

// Get segment by ID
export const getSegmentById = (id) => segments.find((seg) => seg.id === id)

// Get segment for a fan based on their LTV
export const getSegmentForFan = (ltv) => {
  if (ltv >= 4000) return segments[0] // Whales
  if (ltv >= 1500) return segments[1] // Core Supporters
  if (ltv >= 400) return segments[2] // Regulars
  return segments[3] // Casuals
}

export default segments

