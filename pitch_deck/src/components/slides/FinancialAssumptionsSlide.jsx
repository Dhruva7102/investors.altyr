import React from 'react';
import { motion } from 'framer-motion';
import SpreadsheetTable from '@/components/pitch/SpreadsheetTable';

const unitEconomicsColumns = [
  { key: 'item', label: 'Item' },
  { key: 'value', label: 'Value', align: 'right' },
  { key: 'notes', label: 'Notes' },
];

const unitEconomicsRows = [
  { item: 'Altyr Pro SaaS', value: '$250 / creator / mo', notes: 'Per connected creator' },
  { item: 'Platform commission', value: '20% of whale GMV', notes: 'Creator keeps 80%; Altyr bears processing' },
  { item: 'Gross revenue / creator', value: '~$13,000 / mo', notes: 'Roster average (model input)' },
  { item: 'Whale share of revenue', value: '60%', notes: 'Model input' },
  { item: 'Whale GMV / creator', value: '~$7,800 / mo', notes: 'Gross, before commission' },
  { item: 'Altyr Pro infra cost', value: '$46 / creator / mo', notes: 'Plus ~$2,322/mo fixed baseline' },
  { item: 'Revenue mix at scale', value: '~83% / 17%', notes: 'Platform commission / SaaS' },
];

const growthColumns = [
  { key: 'item', label: 'Assumption' },
  { key: 'upside', label: 'Upside', align: 'right' },
  { key: 'base', label: 'Base (Floor)', align: 'right' },
  { key: 'notes', label: 'Notes' },
];

const growthRows = [
  { item: 'Whale -> Altyr penetration', upside: '80%', base: '55%', notes: 'Ramps to steady state over ~6 months' },
  { item: 'Creators per agency', upside: '150+', base: '150+', notes: 'Top ~15-20 agencies' },
  { item: 'Agency churn', upside: '2% / mo', base: '2% / mo', notes: 'Monthly' },
  { item: 'Payment processing', upside: '5.5%', base: '5.5%', notes: 'Of whale GMV (high-risk MCC)' },
  { item: 'Chargeback / fraud reserve', upside: '1.5%', base: '1.5%', notes: 'Of whale GMV' },
  { item: 'SaaS processing', upside: '3%', base: '3%', notes: 'Of SaaS revenue' },
  { item: 'Starting cash', upside: '$1.5M', base: '$1.5M', notes: 'Pre-seed SAFE' },
  { item: 'Tax rate', upside: '25%', base: '25%', notes: 'C-corp basis' },
  { item: 'DSO', upside: '20 days', base: '20 days', notes: 'Collections lag' },
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
              title="Revenue & Unit Economics (per connected creator)"
              columns={unitEconomicsColumns}
              rows={unitEconomicsRows}
              note="Two revenue lines: $250/mo SaaS + 20% of whale GMV. Whale figures are model inputs."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <SpreadsheetTable
              title="Model Assumptions (Upside vs Base Floor)"
              columns={growthColumns}
              rows={growthRows}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

