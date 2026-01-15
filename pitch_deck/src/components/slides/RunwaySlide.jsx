import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, DollarSign, Calendar } from 'lucide-react';
import LineChart from '@/components/pitch/LineChart';

const runwayData = [
  { month: 0, cash: 1500000, label: 'Start' },
  { month: 3, cash: 1440000, label: 'M3' },
  { month: 6, cash: 1360000, label: 'M6' },
  { month: 9, cash: 1250000, label: 'M9' },
  { month: 12, cash: 1080000, label: 'M12' },
  { month: 15, cash: 800000, label: 'M15' },
  { month: 18, cash: 580000, label: 'M18' },
];

const keyMetrics = [
  {
    icon: DollarSign,
    title: 'Starting Capital',
    value: '$1.5M',
    description: 'Seed round raise amount'
  },
  {
    icon: Calendar,
    title: '18 Month Runway',
    value: '$580k',
    description: 'Cash remaining at Month 18'
  },
  {
    icon: TrendingDown,
    title: 'Monthly Burn',
    value: '~$50-80k',
    description: 'Scaling from M1 to M18'
  }
];

export default function RunwaySlide() {
  const chartData = runwayData.map(d => ({ x: d.month, y: d.cash }));

  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-20">
      {/* Gradient accent */}
      <div 
        className="absolute top-1/3 left-1/4 w-[700px] h-[700px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(172,0,100,0.4) 0%, transparent 60%)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Appendix: Runway</span>
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
            18-Month <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">Cash Runway</span>
          </h2>
          <p className="text-base text-white/60 font-light max-w-3xl mx-auto">
            Base Case scenario · Reaching Series A metrics at Month 18
          </p>
        </motion.div>

        {/* Key metrics cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {keyMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm"
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <IconComponent className="w-5 h-5 text-[#AC0064]" />
                </div>
                <h3 className="text-sm text-white/50 font-light mb-2">{metric.title}</h3>
                <div className="text-2xl font-light text-white/90 mb-1">{metric.value}</div>
                <p className="text-xs text-white/40 font-light">{metric.description}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Chart */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            <LineChart
              datasets={[
                {
                  label: 'Cash Balance',
                  data: chartData,
                  color: '#AC0064'
                }
              ]}
              config={{
                width: 900,
                height: 300,
                showGrid: true,
                yAxisLabel: 'Cash Balance ($)',
                xAxisLabel: 'Month',
                formatY: (val) => `$${(val / 1000000).toFixed(1)}M`,
                formatX: (val) => `M${val}`,
              }}
            />
          </div>
        </motion.div>

        {/* Spreadsheet Table */}
        <motion.div
          className="max-w-6xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.05]">
                  <th className="px-6 py-4 text-left font-light text-white/70">Month</th>
                  <th className="px-6 py-4 text-right font-light text-white/70">Cash Balance</th>
                  <th className="px-6 py-4 text-right font-light text-white/70">Monthly Burn</th>
                  <th className="px-6 py-4 text-right font-light text-white/70">Cumulative Burn</th>
                </tr>
              </thead>
              <tbody>
                {runwayData.map((row, index) => {
                  const previousCash = index > 0 ? runwayData[index - 1].cash : 1500000;
                  const monthlyBurn = previousCash - row.cash;
                  const cumulativeBurn = 1500000 - row.cash;
                  
                  return (
                    <tr key={index} className="border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-medium text-white/90">{row.label}</td>
                      <td className="px-6 py-4 text-right font-mono text-white/80">
                        ${row.cash.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-red-400/80">
                        {index > 0 ? `-$${monthlyBurn.toLocaleString()}` : '-'}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-white/60">
                        ${cumulativeBurn.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            <p className="text-sm text-white/70 font-light">
              📊 <span className="text-white/90 font-medium">Series A Target</span>: 25,000 MAU with ~$70k Net Monthly Revenue by Month 18
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
