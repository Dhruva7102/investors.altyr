import React from 'react';
import { motion } from 'framer-motion';
import SpreadsheetTable from '@/components/pitch/SpreadsheetTable';

const unitEconomicsColumns = [
  { key: 'item', label: 'Item' },
  { key: 'value', label: 'Value', align: 'right' },
  { key: 'notes', label: 'Notes' },
];

const unitEconomicsRows = [
  { item: 'Gross Revenue', value: '$14.00 / user', notes: '($10 Sub + $4 Tips)' },
  { item: 'Net Revenue', value: '$2.80 / user', notes: '20% Platform Take Rate' },
  { item: 'CAC (Initial)', value: '$25.00', notes: 'Paid acquisition cost' },
  { item: 'CAC (Blended)', value: '$15.00', notes: 'Targets organic/viral lift by Year 1' },
  { item: 'Churn', value: '10%', notes: 'Monthly user churn' },
];

const growthColumns = [
  { key: 'item', label: 'Item' },
  { key: 'base', label: 'Base Case', align: 'right' },
  { key: 'conservative', label: 'Conservative', align: 'right' },
  { key: 'optimistic', label: 'Optimistic', align: 'right' },
  { key: 'notes', label: 'Notes' },
];

const growthRows = [
  { item: 'Start Users', base: '500', conservative: '500', optimistic: '500', notes: 'Starting point' },
  { item: 'CAC (Initial)', base: '$25.00', conservative: '$50.00', optimistic: '$20.00', notes: 'Paid acquisition' },
  { item: 'CAC (Blended)', base: '$15.00', conservative: '$25.00', optimistic: '$10.00', notes: 'Organic lift' },
  { item: 'Churn', base: '10%', conservative: '15%', optimistic: '10%', notes: 'Monthly' },
  { item: 'CMGR', base: '~24%', conservative: '~24%', optimistic: '~30%', notes: 'Monthly growth' },
];

export default function FinancialAssumptionsSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-16">
      <div
        className="absolute top-1/3 left-1/4 w-[800px] h-[800px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(100,16,154,0.45) 0%, transparent 60%)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Appendix: Financial Model</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide mb-3">
            Model <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">Assumptions</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light">
            Revenue & unit economics + scenario assumptions (as modeled)
          </p>
        </motion.div>

        <div className="grid gap-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <SpreadsheetTable
              title="Revenue & Unit Economics"
              columns={unitEconomicsColumns}
              rows={unitEconomicsRows}
              note="Net Revenue is per user after applying platform take rate."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <SpreadsheetTable
              title="Growth Assumptions (Scenarios)"
              columns={growthColumns}
              rows={growthRows}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

