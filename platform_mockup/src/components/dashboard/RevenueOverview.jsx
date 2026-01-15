import React from 'react'
import { DollarSign, Users, TrendingUp, Crown } from 'lucide-react'
import { MetricCard } from '@/components/shared'
import { revenueMetrics } from '@/data/mockRevenue'

export default function RevenueOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon={DollarSign}
        label="Monthly Recurring Revenue"
        value={revenueMetrics.mrr}
        prefix="$"
        change={revenueMetrics.mrrGrowth}
        trend={revenueMetrics.mrrTrend}
        delay={0}
      />
      
      <MetricCard
        icon={Users}
        label="Average Revenue Per User"
        value={revenueMetrics.arpu}
        prefix="$"
        change={revenueMetrics.arpuGrowth}
        trend={revenueMetrics.arpuTrend}
        delay={0.1}
      />
      
      <MetricCard
        icon={TrendingUp}
        label="Lifetime Value"
        value={revenueMetrics.ltv}
        prefix="$"
        change={revenueMetrics.ltvGrowth}
        trend={revenueMetrics.ltvTrend}
        delay={0.2}
      />
      
      <MetricCard
        icon={Crown}
        label="Top 10% Revenue Share"
        value={revenueMetrics.whalePercentage}
        suffix="%"
        variant="warning"
        delay={0.3}
      />
    </div>
  )
}
