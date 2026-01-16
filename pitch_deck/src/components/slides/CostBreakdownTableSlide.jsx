import React from 'react';
import { motion } from 'framer-motion';
import SpreadsheetTable from '@/components/pitch/SpreadsheetTable';

const fixedColumns = [
  { key: 'category', label: 'Category' },
  { key: 'm1', label: 'Month 1', align: 'right' },
  { key: 'm12', label: 'Month 12', align: 'right' },
  { key: 'm18', label: 'Month 18', align: 'right' },
  { key: 'notes', label: 'Notes' },
];

const fixedRows = [
  { category: 'Engineering', m1: '$10,000', m12: '$15,000', m18: '$25,000', notes: 'Lead dev + junior/contractors' },
  { category: 'Infra & AI', m1: '$3,000', m12: '$5,000', m18: '$7,500', notes: 'Server costs scale with traffic' },
  { category: 'Legal/Compliance', m1: '$1,000', m12: '$1,500', m18: '$2,000', notes: '' },
  { category: 'Marketing (Fixed)', m1: '$500', m12: '$1,000', m18: '$2,000', notes: 'Guerrilla/Content creation' },
  { category: 'Misc/Ops', m1: '$1,000', m12: '$1,500', m18: '$2,000', notes: '' },
  { category: 'Total Fixed', m1: '$15,500', m12: '$24,000', m18: '$38,500', notes: '' },
];

export default function CostBreakdownTableSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-16">
      <div
        className="absolute top-1/3 left-1/4 w-[800px] h-[800px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(77,7,28,0.45) 0%, transparent 60%)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Appendix: Costs</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide mb-3">
            Detailed <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">Cost Breakdown</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light">
            Fixed costs table + variable cost notes (as modeled)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <SpreadsheetTable
            title="Fixed Costs (Operating Expenses)"
            columns={fixedColumns}
            rows={fixedRows}
            note="Fixed costs scale slowly with headcount and infrastructure."
          />
        </motion.div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.10] p-4">
            <h3 className="text-sm sm:text-base font-light text-white/90 mb-2">Variable Costs (Growth Engine)</h3>
            <ul className="text-[10px] sm:text-[11px] text-white/70 font-light leading-relaxed space-y-1">
              <li>- Marketing Spend: Scales from $3,000/mo to ~$100,000/mo by Month 18.</li>
              <li>- Payment Processing: 5% of GMV (pass-through cost).</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

