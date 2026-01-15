import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Scale, TrendingUp, Wrench } from 'lucide-react';
import BarChart from '@/components/pitch/BarChart';

const fixedCosts = [
  {
    icon: Code,
    category: 'Engineering',
    month1: 10000,
    month12: 15000,
    month18: 25000,
    description: 'Lead dev + junior/contractors',
    color: '#AC0064'
  },
  {
    icon: Server,
    category: 'Infrastructure & AI',
    month1: 3000,
    month12: 5000,
    month18: 7500,
    description: 'Server costs scale with traffic',
    color: '#9B4DCA'
  },
  {
    icon: Scale,
    category: 'Legal/Compliance',
    month1: 1000,
    month12: 1500,
    month18: 2000,
    description: 'Regulatory & risk management',
    color: '#64109A'
  },
  {
    icon: TrendingUp,
    category: 'Marketing (Fixed)',
    month1: 500,
    month12: 1000,
    month18: 2000,
    description: 'Guerrilla/Content creation',
    color: '#F59E0B'
  },
  {
    icon: Wrench,
    category: 'Misc/Operations',
    month1: 1000,
    month12: 1500,
    month18: 2000,
    description: 'General operations',
    color: '#34D399'
  },
];

const variableCosts = [
  {
    title: 'Marketing Spend (Variable)',
    description: 'Primary growth driver - scales from $3k/mo to ~$100k/mo by Month 18',
    amount: '~50% of total raise',
    color: '#EF4444'
  },
  {
    title: 'Payment Processing',
    description: '5% of GMV - pass-through cost to users',
    amount: 'Variable by volume',
    color: '#8B5CF6'
  },
];

export default function CostBreakdownSlide() {
  // Prepare data for bar chart
  const chartData = fixedCosts.map(cost => ({
    label: cost.category.split(' ')[0], // Shortened label
    values: [
      { label: 'Month 1', value: cost.month1, color: '#AC0064' },
      { label: 'Month 12', value: cost.month12, color: '#9B4DCA' },
      { label: 'Month 18', value: cost.month18, color: '#64109A' },
    ]
  }));

  // Calculate totals
  const totalMonth1 = fixedCosts.reduce((sum, cost) => sum + cost.month1, 0);
  const totalMonth12 = fixedCosts.reduce((sum, cost) => sum + cost.month12, 0);
  const totalMonth18 = fixedCosts.reduce((sum, cost) => sum + cost.month18, 0);

  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-y-auto bg-gradient-to-b from-[#18021A] to-[#0d0110] py-20">
      {/* Gradient accent */}
      <div 
        className="absolute top-1/4 right-1/4 w-[700px] h-[700px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(77,7,28,0.5) 0%, transparent 60%)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Appendix: Cost Breakdown</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">Operating Expenses</span> Breakdown
          </h2>
          <p className="text-base text-white/60 font-light">
            Fixed costs and variable growth spend over 18 months
          </p>
        </motion.div>

        {/* Fixed Costs Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-light text-white/90 mb-6 text-center">
            Fixed Costs (Operating Expenses)
          </h3>

          {/* Bar Chart */}
          <div className="flex justify-center mb-8">
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <BarChart
                data={chartData}
                config={{
                  width: 900,
                  height: 400,
                  orientation: 'vertical',
                  showGrid: true,
                  formatValue: (val) => `$${(val / 1000).toFixed(0)}k`,
                }}
              />
            </div>
          </div>

          {/* Fixed costs table */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fixedCosts.map((cost, index) => {
              const IconComponent = cost.icon;
              return (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {/* Icon and title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="p-2 rounded-lg border"
                      style={{
                        backgroundColor: `${cost.color}20`,
                        borderColor: `${cost.color}30`,
                      }}
                    >
                      <IconComponent 
                        className="w-4 h-4"
                        style={{ color: cost.color }}
                      />
                    </div>
                    <h4 className="text-sm font-light text-white/90">{cost.category}</h4>
                  </div>

                  {/* Costs */}
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/50">Month 1</span>
                      <span className="text-white/80 font-medium">
                        ${cost.month1.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/50">Month 12</span>
                      <span className="text-white/80 font-medium">
                        ${cost.month12.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/50">Month 18</span>
                      <span className="text-white/80 font-medium">
                        ${cost.month18.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-white/50 font-light">
                    {cost.description}
                  </p>
                </motion.div>
              );
            })}

            {/* Totals card */}
            <motion.div
              className="p-6 rounded-xl bg-gradient-to-br from-[#AC0064]/10 to-[#64109A]/10 border border-[#AC0064]/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + fixedCosts.length * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <h4 className="text-sm font-light text-[#AC0064] mb-4">Total Fixed Costs</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Month 1</span>
                  <span className="text-white/90 font-medium">
                    ${totalMonth1.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Month 12</span>
                  <span className="text-white/90 font-medium">
                    ${totalMonth12.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Month 18</span>
                  <span className="text-white/90 font-medium">
                    ${totalMonth18.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Variable Costs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl font-light text-white/90 mb-6 text-center">
            Variable Costs (Growth Engine)
          </h3>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {variableCosts.map((cost, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm"
              >
                <div 
                  className="mb-4 inline-flex p-3 rounded-lg border"
                  style={{
                    backgroundColor: `${cost.color}20`,
                    borderColor: `${cost.color}30`,
                  }}
                >
                  <div 
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: cost.color }}
                  />
                </div>
                <h4 className="text-lg font-light text-white/90 mb-2">{cost.title}</h4>
                <p className="text-sm text-white/60 font-light mb-4 leading-relaxed">
                  {cost.description}
                </p>
                <div className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]">
                  {cost.amount}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Use of Funds Summary */}
        <motion.div
          className="text-center max-w-4xl mx-auto mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            <h4 className="text-lg font-light text-white/90 mb-4">Use of Funds Allocation (18 months)</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-light text-white/90 mb-1">~50%</div>
                <div className="text-xs text-white/50">User Acquisition</div>
              </div>
              <div>
                <div className="text-2xl font-light text-white/90 mb-1">~35%</div>
                <div className="text-xs text-white/50">Product & Engineering</div>
              </div>
              <div>
                <div className="text-2xl font-light text-white/90 mb-1">~15%</div>
                <div className="text-xs text-white/50">Operations & Infra</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
