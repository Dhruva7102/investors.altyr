import React from 'react';
import { motion } from 'framer-motion';
import SpreadsheetTable from '@/components/pitch/SpreadsheetTable';

const fixedColumns = [
  { key: 'category', label: 'Cost Line' },
  { key: 'basis', label: 'Basis', align: 'right' },
  { key: 'type', label: 'Type', align: 'right' },
  { key: 'notes', label: 'Notes' },
];

const fixedRows = [
  { category: 'Payment processing', basis: '5.5% of whale GMV', type: 'Variable', notes: 'High-risk MCC; Altyr bears it on platform GMV' },
  { category: 'Chargeback / fraud reserve', basis: '1.5% of whale GMV', type: 'Variable', notes: 'Fraud & dispute provision' },
  { category: 'SaaS processing', basis: '3% of SaaS revenue', type: 'Variable', notes: 'On $250/creator/mo Altyr Pro fees' },
  { category: 'Content moderation', basis: 'Scales with GMV', type: 'Variable', notes: 'AI + human review' },
  { category: 'KYC / age verification', basis: 'Per onboarded user', type: 'Variable', notes: 'Compliance requirement' },
  { category: 'Altyr Pro infra', basis: '$46 / connected creator', type: 'Variable', notes: 'Tracks connected-creator count' },
  { category: 'Altyr Pro fixed baseline', basis: '~$2,322 / mo', type: 'Fixed', notes: 'Platform & integration baseline' },
  { category: 'People & Other OpEx', basis: 'Scales with stage', type: 'Fixed', notes: 'Team, legal/compliance, ops' },
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
            Variable cost lines + operating expense block (as modeled)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <SpreadsheetTable
            title="Cost Structure"
            columns={fixedColumns}
            rows={fixedRows}
            note="Variable costs scale with whale GMV and connected-creator count; fixed costs scale slowly with stage."
          />
        </motion.div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.10] p-4">
            <h3 className="text-sm sm:text-base font-light text-white/90 mb-2">Notes</h3>
            <ul className="text-[10px] sm:text-[11px] text-white/70 font-light leading-relaxed space-y-1">
              <li>- No paid acquisition: growth is agency-led land-and-expand, so there is no marketing/CAC cost line.</li>
              <li>- Processing (5.5%) + chargeback reserve (1.5%) apply to whale GMV; SaaS processing (3%) applies to Altyr Pro fees.</li>
              <li>- Altyr Pro infra is ~$46 per connected creator/mo on top of a ~$2,322/mo fixed baseline.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

