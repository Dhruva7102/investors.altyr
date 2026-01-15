import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, DollarSign, TrendingDown } from 'lucide-react';
import LineChart from '@/components/pitch/LineChart';

const scenarios = {
  base: {
    name: 'Base Case',
    color: '#AC0064',
    description: '~24% CMGR, $15 blended CAC, 10% churn',
    users: [
      { month: 0, value: 0 },
      { month: 3, value: 900 },
      { month: 6, value: 1800 },
      { month: 9, value: 3500 },
      { month: 12, value: 6600 },
      { month: 15, value: 12500 },
      { month: 18, value: 25000 },
    ],
    revenue: [
      { month: 0, value: 0 },
      { month: 3, value: 2500 },
      { month: 6, value: 5000 },
      { month: 9, value: 9800 },
      { month: 12, value: 18500 },
      { month: 15, value: 35000 },
      { month: 18, value: 70000 },
    ],
    expenses: [
      { month: 0, value: 0 },
      { month: 3, value: 22500 },
      { month: 6, value: 30000 },
      { month: 9, value: 45000 },
      { month: 12, value: 68000 },
      { month: 15, value: 110000 },
      { month: 18, value: 150000 },
    ],
  },
  conservative: {
    name: 'Conservative',
    color: '#9B4DCA',
    description: '~24% CMGR, $25 blended CAC, 15% churn',
    users: [
      { month: 0, value: 500 },
      { month: 3, value: 1000 },
      { month: 6, value: 1900 },
      { month: 9, value: 3400 },
      { month: 12, value: 5800 },
      { month: 15, value: 9000 },
      { month: 18, value: 13500 },
    ],
    revenue: [
      { month: 0, value: 0 },
      { month: 3, value: 2800 },
      { month: 6, value: 5300 },
      { month: 9, value: 9500 },
      { month: 12, value: 16200 },
      { month: 15, value: 25200 },
      { month: 18, value: 37800 },
    ],
    expenses: [
      { month: 0, value: 0 },
      { month: 3, value: 25000 },
      { month: 6, value: 35000 },
      { month: 9, value: 50000 },
      { month: 12, value: 75000 },
      { month: 15, value: 110000 },
      { month: 18, value: 150000 },
    ],
  },
  optimistic: {
    name: 'Optimistic',
    color: '#64109A',
    description: '~30% CMGR, $10 blended CAC, 10% churn',
    users: [
      { month: 0, value: 500 },
      { month: 3, value: 1200 },
      { month: 6, value: 2800 },
      { month: 9, value: 6000 },
      { month: 12, value: 12500 },
      { month: 15, value: 25000 },
      { month: 18, value: 50000 },
    ],
    revenue: [
      { month: 0, value: 0 },
      { month: 3, value: 3300 },
      { month: 6, value: 7800 },
      { month: 9, value: 16800 },
      { month: 12, value: 35000 },
      { month: 15, value: 70000 },
      { month: 18, value: 140000 },
    ],
    expenses: [
      { month: 0, value: 0 },
      { month: 3, value: 30000 },
      { month: 6, value: 35000 },
      { month: 9, value: 55000 },
      { month: 12, value: 45000 },
      { month: 15, value: 75000 },
      { month: 18, value: 120000 },
    ],
  },
};

export default function FinancialProjectionsSlide() {
  const [activeTab, setActiveTab] = useState('base');
  const scenario = scenarios[activeTab];

  const usersData = scenario.users.map(d => ({ x: d.month, y: d.value }));
  const revenueData = scenario.revenue.map(d => ({ x: d.month, y: d.value }));
  const expensesData = scenario.expenses.map(d => ({ x: d.month, y: d.value }));

  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-y-auto bg-gradient-to-b from-[#18021A] to-[#0d0110] py-20">
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
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Appendix: Financial Projections</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide mb-4">
            18-Month <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">Growth Scenarios</span>
          </h2>
          <p className="text-base text-white/60 font-light">
            User growth, revenue, and expenses across three scenarios
          </p>
        </motion.div>

        {/* Scenario tabs */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {Object.entries(scenarios).map(([key, s]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-lg text-sm font-light transition-all duration-300 ${
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
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-white/60 font-light">{scenario.description}</p>
        </motion.div>

        {/* Charts */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Users Growth */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <Users className="w-5 h-5 text-[#AC0064]" />
                </div>
                <h3 className="text-lg font-light text-white/90">User Growth</h3>
              </div>
              <div className="flex justify-center">
                <LineChart
                  datasets={[
                    {
                      label: 'Monthly Active Users',
                      data: usersData,
                      color: scenario.color
                    }
                  ]}
                  config={{
                    width: 900,
                    height: 300,
                    showGrid: true,
                    yAxisLabel: 'Users',
                    xAxisLabel: 'Month',
                    formatY: (val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toLocaleString(),
                    formatX: (val) => `M${val}`,
                  }}
                />
              </div>
            </div>

            {/* Revenue & Expenses */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenue */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                    <DollarSign className="w-5 h-5 text-[#AC0064]" />
                  </div>
                  <h3 className="text-lg font-light text-white/90">Monthly Revenue (Net)</h3>
                </div>
                <div className="flex justify-center">
                  <LineChart
                    datasets={[
                      {
                        label: 'Net Revenue',
                        data: revenueData,
                        color: '#34D399'
                      }
                    ]}
                    config={{
                      width: 400,
                      height: 250,
                      showGrid: true,
                      formatY: (val) => `$${(val / 1000).toFixed(0)}k`,
                      formatX: (val) => `M${val}`,
                    }}
                  />
                </div>
              </div>

              {/* Expenses */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                    <TrendingDown className="w-5 h-5 text-[#AC0064]" />
                  </div>
                  <h3 className="text-lg font-light text-white/90">Monthly Expenses (Burn)</h3>
                </div>
                <div className="flex justify-center">
                  <LineChart
                    datasets={[
                      {
                        label: 'Monthly Burn',
                        data: expensesData,
                        color: '#EF4444'
                      }
                    ]}
                    config={{
                      width: 400,
                      height: 250,
                      showGrid: true,
                      formatY: (val) => `$${(val / 1000).toFixed(0)}k`,
                      formatX: (val) => `M${val}`,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
