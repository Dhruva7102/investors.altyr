// Mock offer/campaign performance data

export const offers = [
  {
    id: 'offer-001',
    name: 'New Year VIP Bundle',
    type: 'PPV',
    status: 'active',
    targetSegment: 'Core Supporters',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    price: 49,
    views: 156,
    purchases: 28,
    conversionRate: 17.9,
    revenue: 1372,
    roi: 285,
  },
  {
    id: 'offer-002',
    name: 'Exclusive Content Pack',
    type: 'PPV',
    status: 'active',
    targetSegment: 'VIP',
    startDate: '2025-01-10',
    endDate: '2025-01-20',
    price: 75,
    views: 42,
    purchases: 12,
    conversionRate: 28.6,
    revenue: 900,
    roi: 340,
  },
  {
    id: 'offer-003',
    name: 'Re-engagement Special',
    type: 'Discount',
    status: 'active',
    targetSegment: 'Dormant',
    startDate: '2025-01-08',
    endDate: '2025-01-15',
    price: 15,
    views: 89,
    purchases: 8,
    conversionRate: 9.0,
    revenue: 120,
    roi: 45,
  },
  {
    id: 'offer-004',
    name: 'December Holiday Bundle',
    type: 'PPV',
    status: 'completed',
    targetSegment: 'All',
    startDate: '2024-12-15',
    endDate: '2024-12-31',
    price: 35,
    views: 312,
    purchases: 67,
    conversionRate: 21.5,
    revenue: 2345,
    roi: 410,
  },
  {
    id: 'offer-005',
    name: 'Custom Content Flash Sale',
    type: 'Custom',
    status: 'completed',
    targetSegment: 'Whales',
    startDate: '2024-12-20',
    endDate: '2024-12-25',
    price: 150,
    views: 18,
    purchases: 6,
    conversionRate: 33.3,
    revenue: 900,
    roi: 520,
  },
  {
    id: 'offer-006',
    name: "Valentine's Pre-Order",
    type: 'Subscription',
    status: 'scheduled',
    targetSegment: 'Core Supporters',
    startDate: '2025-02-01',
    endDate: '2025-02-14',
    price: 45,
    views: 0,
    purchases: 0,
    conversionRate: 0,
    revenue: 0,
    roi: 0,
  },
]

// Get offers by status
export const getOffersByStatus = (status) => offers.filter((offer) => offer.status === status)

// Get active offers
export const getActiveOffers = () => getOffersByStatus('active')

// Get top performing offers by ROI
export const getTopOffersByROI = (count = 3) =>
  [...offers].filter((o) => o.status === 'completed').sort((a, b) => b.roi - a.roi).slice(0, count)

export default offers

