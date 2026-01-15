import React from 'react';
import { motion } from 'framer-motion';
import SpreadsheetTable from '@/components/pitch/SpreadsheetTable';

const columns = [
  { key: 'category', label: 'Category' },
  { key: 'percent', label: 'Allocation', align: 'right' },
  { key: 'amount', label: 'Amount (Approx.)', align: 'right' },
  { key: 'notes', label: 'Notes' },
];

const rows = [
  { category: 'User Acquisition (Marketing)', percent: '~50%', amount: '$500k', notes: 'Primary growth engine' },
  { category: 'Product & Engineering', percent: '~35%', amount: '$350k', notes: 'Core platform + game engine' },
  { category: 'Operations, Legal & Infra', percent: '~15%', amount: '$150k', notes: 'Ops, compliance, infrastructure' },
];

export default function UseOfFundsSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-16">
      <div
        className="absolute top-1/3 right-1/4 w-[800px] h-[800px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(172,0,100,0.35) 0%, transparent 60%)',
          filter: 'blur(110px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          className="flex items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Appendix: Use of Funds</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide mb-3">
            Use of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">Funds</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light">
            Rough approximation of total 18-month spend (as modeled)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <SpreadsheetTable
            title="Allocation Summary"
            columns={columns}
            rows={rows}
            note="Allocation reflects the modeled 18-month operating plan."
          />
        </motion.div>
      </div>
    </section>
  );
}

