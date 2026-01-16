import React from 'react';
import { motion } from 'framer-motion';
import SpreadsheetTable from '@/components/pitch/SpreadsheetTable';

const columns = [
  { key: 'period', label: 'Period' },
  { key: 'users', label: 'Users (End)', align: 'right' },
  { key: 'rev', label: 'Monthly Revenue (Net)', align: 'right' },
  { key: 'exp', label: 'Monthly Expenses (Burn)', align: 'right' },
  { key: 'net', label: 'Net Burn', align: 'right' },
  { key: 'cash', label: 'Cash Balance', align: 'right' },
];

const rows = [
  { period: 'Start', users: '0', rev: '$0', exp: '$0', net: '$0', cash: '$1,500,000' },
  { period: 'Month 3', users: '~900', rev: '$2,500', exp: '$22,500', net: '($20,000)', cash: '$1,440,000' },
  { period: 'Month 6', users: '~1,800', rev: '$5,000', exp: '$30,000', net: '($25,000)', cash: '$1,360,000' },
  { period: 'Month 9', users: '~3,500', rev: '$9,800', exp: '$45,000', net: '($35,200)', cash: '$1,250,000' },
  { period: 'Month 12', users: '~6,600', rev: '$18,500', exp: '$68,000', net: '($49,500)', cash: '$1,080,000' },
  { period: 'Month 15', users: '~12,500', rev: '$35,000', exp: '$110,000', net: '($75,000)', cash: '$800,000' },
  { period: 'Month 18', users: '~25,000', rev: '$70,000', exp: '$150,000', net: '($80,000)', cash: '$580,000' },
];

export default function BaseCaseRunwaySlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-16">
      <div
        className="absolute top-1/3 right-1/4 w-[800px] h-[800px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(172,0,100,0.4) 0%, transparent 60%)',
          filter: 'blur(110px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          className="flex items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Appendix: Scenario A</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide mb-3">
            Base Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">18-Month Runway</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light">
            Cash balance over 18 months (reaching Series A metrics)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <SpreadsheetTable
            title="Scenario A: Base Case Growth"
            columns={columns}
            rows={rows}
            note="Status at Month 18: ~$580k cash remaining (requires Series A close)."
          />
        </motion.div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <div className="inline-block px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            <p className="text-xs sm:text-sm text-white/70 font-light">
              Target outcome: 25,000 MAU and ~$70k net monthly revenue by Month 18.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

