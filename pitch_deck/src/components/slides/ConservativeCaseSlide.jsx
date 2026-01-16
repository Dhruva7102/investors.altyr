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
  { period: 'Start', users: '500', rev: '$0', exp: '$0', net: '$0', cash: '$1,500,000' },
  { period: 'Month 3', users: '~1,000', rev: '$2,800', exp: '$25,000', net: '($22,200)', cash: '$1,440,000' },
  { period: 'Month 6', users: '~1,900', rev: '$5,300', exp: '$35,000', net: '($29,700)', cash: '$1,350,000' },
  { period: 'Month 9', users: '~3,400', rev: '$9,500', exp: '$50,000', net: '($40,500)', cash: '$1,230,000' },
  { period: 'Month 12', users: '~5,800', rev: '$16,200', exp: '$75,000', net: '($58,800)', cash: '$1,050,000' },
  { period: 'Month 15', users: '~9,000', rev: '$25,200', exp: '$110,000', net: '($84,800)', cash: '$800,000' },
  { period: 'Month 18', users: '~13,500', rev: '$37,800', exp: '$150,000', net: '($112,200)', cash: '$460,000' },
];

export default function ConservativeCaseSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-16">
      <div
        className="absolute top-1/3 left-1/4 w-[800px] h-[800px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(155,77,202,0.45) 0%, transparent 60%)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Appendix: Scenario B</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide mb-3">
            Conservative <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">18-Month Runway</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light">
            Higher churn (15%) + higher blended CAC ($25)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <SpreadsheetTable
            title="Scenario B: Conservative Growth"
            columns={columns}
            rows={rows}
            note="Status at Month 18: ~$460k cash remaining (conservative case)."
          />
        </motion.div>
      </div>
    </section>
  );
}

