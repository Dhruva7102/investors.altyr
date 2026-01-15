import React from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { TrendingUp, PieChart as PieIcon, Target, Calculator } from 'lucide-react'
import { PageHeader } from '@/components/layout'
import { GlassCard, IconContainer } from '@/components/shared'
import { revenueMetrics, revenueBySegment } from '@/data/mockRevenue'
import { getActiveOffers } from '@/data/mockOffers'

const segmentColors = ['#FFD700', '#A855F7', '#3B82F6', '#6B7280']

export default function RevenueDashboard() {
  const segments = Object.values(revenueBySegment)
  const activeOffers = getActiveOffers()

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card rounded-lg p-3 text-sm">
          <p className="text-white/80">{label}</p>
          <p className="text-gradient font-medium">${payload[0].value.toLocaleString()}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <PageHeader
        label="Revenue Analytics"
        title="Revenue Operations"
        subtitle="Understand your revenue dynamics. The top 10% of your fans generate 91% of revenue—focus your attention accordingly."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl bg-gradient-to-r from-altyr-magenta/20 to-altyr-purple/10 border border-altyr-magenta/30"
      >
        <div className="flex items-center gap-4">
          <div className="text-5xl font-extralight text-gradient">{revenueMetrics.whalePercentage}%</div>
          <div>
            <p className="text-lg text-white/90">of revenue from top 10% of fans</p>
            <p className="text-sm text-white/50">Focus on relationship depth with your most valuable supporters</p>
          </div>
        </div>
      </motion.div>

      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <IconContainer icon={TrendingUp} size="sm" />
          <h3 className="text-lg font-light text-white/90">Revenue Trend</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueMetrics.monthlyData}>
              <defs>
                <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#AC0064" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#AC0064" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="mrr" stroke="#AC0064" strokeWidth={2} fillOpacity={1} fill="url(#colorMrr)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <IconContainer icon={PieIcon} size="sm" />
            <h3 className="text-lg font-light text-white/90">Revenue by Segment</h3>
          </div>
          <div className="flex items-center gap-8">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={segments} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="revenue">
                    {segments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={segmentColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {segments.map((segment, index) => (
                <div key={segment.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segmentColors[index] }} />
                    <span className="text-sm text-white/70">{segment.name}</span>
                  </div>
                  <span className="text-sm text-white/90">{segment.revenuePercentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard padding="p-0">
          <div className="p-6 border-b border-white/[0.08]">
            <h3 className="text-lg font-light text-white/90">Segment Breakdown</h3>
          </div>
          <div className="p-4 space-y-2">
            {segments.map((segment, index) => (
              <motion.div
                key={segment.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: segmentColors[index] }} />
                    <span className="text-sm font-medium text-white/90">{segment.name}</span>
                  </div>
                  <span className="text-xs text-white/50">
                    {segment.count} fans ({segment.percentage}%)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Revenue: ${segment.revenue.toLocaleString()}</span>
                  <span className="text-white/40">Avg LTV: ${segment.avgLTV.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard padding="p-0">
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <IconContainer icon={Target} size="sm" />
            <h3 className="text-lg font-light text-white/90">Active Campaigns</h3>
          </div>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white text-sm font-medium">
            Create Offer
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left p-4 text-xs text-white/40 font-normal">Campaign</th>
                <th className="text-left p-4 text-xs text-white/40 font-normal">Target</th>
                <th className="text-right p-4 text-xs text-white/40 font-normal">Views</th>
                <th className="text-right p-4 text-xs text-white/40 font-normal">Purchases</th>
                <th className="text-right p-4 text-xs text-white/40 font-normal">Conv. Rate</th>
                <th className="text-right p-4 text-xs text-white/40 font-normal">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {activeOffers.map((offer) => (
                <tr key={offer.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="p-4">
                    <span className="text-sm text-white/90">{offer.name}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-white/60">{offer.targetSegment}</span>
                  </td>
                  <td className="p-4 text-right text-sm text-white/60">{offer.views}</td>
                  <td className="p-4 text-right text-sm text-white/60">{offer.purchases}</td>
                  <td className="p-4 text-right text-sm text-gradient">{offer.conversionRate}%</td>
                  <td className="p-4 text-right text-sm text-white/90">${offer.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <IconContainer icon={Calculator} size="sm" />
          <h3 className="text-lg font-light text-white/90">Revenue Scenario Simulator</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <p className="text-xs text-white/40 mb-2">If you re-engage top 5%</p>
            <p className="text-2xl text-gradient font-light">+$2,840</p>
            <p className="text-xs text-white/50 mt-1">potential monthly increase</p>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <p className="text-xs text-white/40 mb-2">If you convert 10% Casuals to Regulars</p>
            <p className="text-2xl text-gradient font-light">+$1,120</p>
            <p className="text-xs text-white/50 mt-1">potential monthly increase</p>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <p className="text-xs text-white/40 mb-2">If you reduce churn by 5%</p>
            <p className="text-2xl text-gradient font-light">+$3,200</p>
            <p className="text-xs text-white/50 mt-1">potential annual savings</p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

