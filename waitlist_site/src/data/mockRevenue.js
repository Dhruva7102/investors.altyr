// Mock revenue data demonstrating the 10% = 90% revenue concentration principle

export const revenueMetrics = {
  mrr: 12450,
  mrrGrowth: 12.5,
  mrrTrend: 'up',

  arpu: 89,
  arpuGrowth: 8.2,
  arpuTrend: 'up',

  ltv: 1240,
  ltvGrowth: 15.3,
  ltvTrend: 'up',

  // This is the key metric - top 10% = 90% of revenue
  superfanPercentage: 91,
  superfanRevenue: 11329,

  totalFans: 140,
  activeFans: 124,

  // Monthly metrics for charts
  monthlyData: [
    { month: 'Jul', mrr: 8200, fans: 85, arpu: 96 },
    { month: 'Aug', mrr: 9100, fans: 98, arpu: 93 },
    { month: 'Sep', mrr: 9800, fans: 108, arpu: 91 },
    { month: 'Oct', mrr: 10500, fans: 118, arpu: 89 },
    { month: 'Nov', mrr: 11200, fans: 128, arpu: 88 },
    { month: 'Dec', mrr: 11800, fans: 135, arpu: 87 },
    { month: 'Jan', mrr: 12450, fans: 140, arpu: 89 },
  ],
}

// Revenue by segment - demonstrating concentration
export const revenueBySegment = {
  superfans: {
    name: 'Superfans',
    description: 'Top 1-5% of fans',
    count: 7,
    percentage: 5,
    revenue: 8750,
    revenuePercentage: 70.3,
    avgLTV: 5200,
    color: '#FFD700',
  },
  coreSuppoters: {
    name: 'Core Supporters',
    description: 'Top 5-20% of fans',
    count: 21,
    percentage: 15,
    revenue: 2520,
    revenuePercentage: 20.2,
    avgLTV: 1890,
    color: '#A855F7',
  },
  regulars: {
    name: 'Regulars',
    description: '20-50% of fans',
    count: 42,
    percentage: 30,
    revenue: 890,
    revenuePercentage: 7.2,
    avgLTV: 620,
    color: '#3B82F6',
  },
  casuals: {
    name: 'Casuals',
    description: 'Bottom 50% of fans',
    count: 70,
    percentage: 50,
    revenue: 290,
    revenuePercentage: 2.3,
    avgLTV: 85,
    color: '#6B7280',
  },
}

// Cohort retention data
export const cohortData = [
  { cohort: 'Jul 2024', month1: 100, month2: 78, month3: 65, month4: 58, month5: 52, month6: 48 },
  { cohort: 'Aug 2024', month1: 100, month2: 82, month3: 68, month4: 61, month5: 55, month6: null },
  { cohort: 'Sep 2024', month1: 100, month2: 80, month3: 70, month4: 63, month5: null, month6: null },
  { cohort: 'Oct 2024', month1: 100, month2: 85, month3: 72, month4: null, month5: null, month6: null },
  { cohort: 'Nov 2024', month1: 100, month2: 83, month3: null, month4: null, month5: null, month6: null },
  { cohort: 'Dec 2024', month1: 100, month2: null, month3: null, month4: null, month5: null, month6: null },
]

// LTV progression by month
export const ltvProgression = [
  { month: 1, ltv: 45 },
  { month: 2, ltv: 120 },
  { month: 3, ltv: 220 },
  { month: 4, ltv: 340 },
  { month: 5, ltv: 480 },
  { month: 6, ltv: 620 },
  { month: 9, ltv: 980 },
  { month: 12, ltv: 1450 },
  { month: 18, ltv: 2800 },
  { month: 24, ltv: 4500 },
]

// Revenue concentration visualization data
export const revenueConcentration = [
  { fanPercentile: 1, revenuePercentile: 42 },
  { fanPercentile: 5, revenuePercentile: 70 },
  { fanPercentile: 10, revenuePercentile: 91 },
  { fanPercentile: 20, revenuePercentile: 95 },
  { fanPercentile: 50, revenuePercentile: 98 },
  { fanPercentile: 100, revenuePercentile: 100 },
]

export default revenueMetrics

