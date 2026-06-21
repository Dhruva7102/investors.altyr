import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, DollarSign, TrendingDown } from 'lucide-react';
import LineChart from '@/components/pitch/LineChart';

// Headline = upside case. Base case shown as the conservative floor.
// "users" = connected creators; revenue & expenses are monthly USD.
const scenarios = {
  upside: {
    name: 'Upside Case',
    color: '#FF8C42',
    description: 'Headline scenario - 80% whale->Altyr penetration. ~$28M annualized run-rate at M18.',
    users: [
      { month: 0, value: 0 },
      { month: 3, value: 300 },
      { month: 6, value: 700 },
      { month: 9, value: 1100 },
      { month: 12, value: 1400 },
      { month: 15, value: 1600 },
      { month: 18, value: 1700 },
    ],
    revenue: [
      { month: 0, value: 0 },
      { month: 3, value: 75000 },
      { month: 6, value: 260000 },
      { month: 9, value: 900000 },
      { month: 12, value: 1500000 },
      { month: 15, value: 2000000 },
      { month: 18, value: 2330000 },
    ],
    expenses: [
      { month: 0, value: 40000 },
      { month: 3, value: 120000 },
      { month: 6, value: 320000 },
      { month: 9, value: 760000 },
      { month: 12, value: 1080000 },
      { month: 15, value: 1330000 },
      { month: 18, value: 1484000 },
    ],
  },
  base: {
    name: 'Base Case (Floor)',
    color: '#9B4DCA',
    description: 'Conservative floor - 55% whale->Altyr penetration. ~$16M annualized run-rate at M18.',
    users: [
      { month: 0, value: 0 },
      { month: 3, value: 250 },
      { month: 6, value: 600 },
      { month: 9, value: 900 },
      { month: 12, value: 1150 },
      { month: 15, value: 1300 },
      { month: 18, value: 1400 },
    ],
    revenue: [
      { month: 0, value: 0 },
      { month: 3, value: 55000 },
      { month: 6, value: 180000 },
      { month: 9, value: 560000 },
      { month: 12, value: 900000 },
      { month: 15, value: 1180000 },
      { month: 18, value: 1350000 },
    ],
    expenses: [
      { month: 0, value: 40000 },
      { month: 3, value: 110000 },
      { month: 6, value: 250000 },
      { month: 9, value: 560000 },
      { month: 12, value: 820000 },
      { month: 15, value: 1010000 },
      { month: 18, value: 1094000 },
    ],
  },
};

export default function FinancialProjectionsSlide() {
  const [activeTab, setActiveTab] = useState('upside');
  const scenario = scenarios[activeTab];

  const usersData = scenario.users.map(d => ({ x: d.month, y: d.value }));
  const revenueData = scenario.revenue.map(d => ({ x: d.month, y: d.value }));
  const expensesData = scenario.expenses.map(d => ({ x: d.month, y: d.value }));

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-4">
      {/* Gradient accent */}
      <div 
        className="absolute top-1/3 right-1/4 w-[700px] h-[700px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(100,16,154,0.5) 0%, transparent 60%)',
          filter: 'blur(120px)',
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Financial Projections</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-2xl md:text-3xl font-extralight text-white/90 tracking-wide mb-1">
            18-Month <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">Financial Model</span>
          </h2>
          <p className="text-sm text-white/60 font-light">
            Connected creators, revenue, and expenses — upside headline vs base-case floor
          </p>
        </motion.div>

        {/* Scenario tabs */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {Object.entries(scenarios).map(([key, s]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                activeTab === key
                  ? 'bg-white/[0.08] border-2 border-white/[0.12] text-white'
                  : 'bg-white/[0.03] border border-white/[0.06] text-white/60 hover:bg-white/[0.05]'
              }`}
              style={{
                borderColor: activeTab === key ? s.color : undefined,
              }}
            >
              {s.name}
            </button>
          ))}
        </motion.div>

        {/* Scenario description */}
        <motion.div
          className="text-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs text-white/60 font-light">{scenario.description}</p>
        </motion.div>

        {/* Charts */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Charts row: creators + revenue + expenses side by side */}
            <div className="grid md:grid-cols-3 gap-3">
              {/* Users Growth */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                    <Users className="w-3.5 h-3.5 text-[#AC0064]" />
                  </div>
                  <h3 className="text-sm font-light text-white/90">Connected Creators</h3>
                </div>
                <LineChart
                  datasets={[{ label: 'Connected Creators', data: usersData, color: scenario.color }]}
                  config={{
                    width: 340,
                    height: 180,
                    showGrid: true,
                    yAxisLabel: 'Creators',
                    xAxisLabel: 'Month',
                    formatY: (val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toLocaleString(),
                    formatX: (val) => `M${val}`,
                  }}
                />
              </div>

              {/* Revenue */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                    <DollarSign className="w-3.5 h-3.5 text-[#AC0064]" />
                  </div>
                  <h3 className="text-sm font-light text-white/90">Monthly Revenue</h3>
                </div>
                <LineChart
                  datasets={[{ label: 'Total Revenue', data: revenueData, color: '#34D399' }]}
                  config={{
                    width: 340,
                    height: 180,
                    showGrid: true,
                    formatY: (val) => val >= 1000000 ? `$${(val / 1000000).toFixed(1)}M` : `$${(val / 1000).toFixed(0)}k`,
                    formatX: (val) => `M${val}`,
                  }}
                />
              </div>

              {/* Expenses */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                    <TrendingDown className="w-3.5 h-3.5 text-[#AC0064]" />
                  </div>
                  <h3 className="text-sm font-light text-white/90">Monthly Costs</h3>
                </div>
                <LineChart
                  datasets={[{ label: 'Total Costs', data: expensesData, color: '#EF4444' }]}
                  config={{
                    width: 340,
                    height: 180,
                    showGrid: true,
                    formatY: (val) => val >= 1000000 ? `$${(val / 1000000).toFixed(1)}M` : `$${(val / 1000).toFixed(0)}k`,
                    formatX: (val) => `M${val}`,
                  }}
                />
              </div>
            </div>

            {/* Headline metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(activeTab === 'upside'
                ? [
                    { label: 'Run-rate (M18)', value: '~$28M' },
                    { label: 'EBITDA Margin', value: '~36%' },
                    { label: 'Net Income (M18)', value: '~$634K/mo' },
                    { label: 'Ending Cash', value: '~$6.9M' },
                  ]
                : [
                    { label: 'Run-rate (M18)', value: '~$16M' },
                    { label: 'EBITDA Margin', value: '~19%' },
                    { label: 'Net Income (M18)', value: '~$196K/mo' },
                    { label: 'Ending Cash', value: '~$2.8M' },
                  ]
              ).map((m, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm text-center"
                >
                  <div className="text-xl font-light text-white/90 mb-0.5">{m.value}</div>
                  <div className="text-xs text-white/50 font-light">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Profitability note */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm text-center">
              <p className="text-xs text-white/70 font-light">
                <span className="text-white/90 font-medium">Path to profitability:</span> on $1.5M starting cash, the upside case turns cash-flow positive around Month 8. Altyr Pro is live from Month 3; Altyr Platform launches ~Month 7.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
