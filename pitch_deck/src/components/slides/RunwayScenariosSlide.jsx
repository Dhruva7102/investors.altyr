import React from 'react';
import { motion } from 'framer-motion';
import SpreadsheetTable from '@/components/pitch/SpreadsheetTable';

const columns = [
  { key: 'period', label: 'Period' },
  { key: 'users', label: 'Users', align: 'right' },
  { key: 'rev', label: 'Rev', align: 'right' },
  { key: 'exp', label: 'Exp', align: 'right' },
  { key: 'net', label: 'Net', align: 'right' },
  { key: 'cash', label: 'Cash', align: 'right' },
];

const keepPeriods = new Set(['Start', 'Month 6', 'Month 12', 'Month 18']);

const conservativeFull = [
  { period: 'Start', users: '500', rev: '$0', exp: '$0', net: '$0', cash: '$1,500,000' },
  { period: 'Month 3', users: '~1,000', rev: '$2,800', exp: '$25,000', net: '($22,200)', cash: '$1,440,000' },
  { period: 'Month 6', users: '~1,900', rev: '$5,300', exp: '$35,000', net: '($29,700)', cash: '$1,350,000' },
  { period: 'Month 9', users: '~3,400', rev: '$9,500', exp: '$50,000', net: '($40,500)', cash: '$1,230,000' },
  { period: 'Month 12', users: '~5,800', rev: '$16,200', exp: '$75,000', net: '($58,800)', cash: '$1,050,000' },
  { period: 'Month 15', users: '~9,000', rev: '$25,200', exp: '$110,000', net: '($84,800)', cash: '$800,000' },
  { period: 'Month 18', users: '~13,500', rev: '$37,800', exp: '$150,000', net: '($112,200)', cash: '$460,000' },
];

const baseFull = [
  { period: 'Start', users: '0', rev: '$0', exp: '$0', net: '$0', cash: '$1,500,000' },
  { period: 'Month 3', users: '~900', rev: '$2,500', exp: '$22,500', net: '($20,000)', cash: '$1,440,000' },
  { period: 'Month 6', users: '~1,800', rev: '$5,000', exp: '$30,000', net: '($25,000)', cash: '$1,360,000' },
  { period: 'Month 9', users: '~3,500', rev: '$9,800', exp: '$45,000', net: '($35,200)', cash: '$1,250,000' },
  { period: 'Month 12', users: '~6,600', rev: '$18,500', exp: '$68,000', net: '($49,500)', cash: '$1,080,000' },
  { period: 'Month 15', users: '~12,500', rev: '$35,000', exp: '$110,000', net: '($75,000)', cash: '$800,000' },
  { period: 'Month 18', users: '~25,000', rev: '$70,000', exp: '$150,000', net: '($80,000)', cash: '$580,000' },
];

const optimisticFull = [
  { period: 'Start', users: '500', rev: '$0', exp: '$0', net: '$0', cash: '$1,500,000' },
  { period: 'Month 3', users: '~1,200', rev: '$3,300', exp: '$30,000', net: '($26,700)', cash: '$1,420,000' },
  { period: 'Month 6', users: '~2,800', rev: '$7,800', exp: '$35,000', net: '($27,200)', cash: '$1,330,000' },
  { period: 'Month 9', users: '~6,000', rev: '$16,800', exp: '$55,000', net: '($38,200)', cash: '$1,200,000' },
  { period: 'Month 12', users: '~12,500', rev: '$35,000', exp: '$45,000', net: '($10,000)', cash: '$1,080,000' },
  { period: 'Month 15', users: '~25,000', rev: '$70,000', exp: '$75,000', net: '($5,000)', cash: '$950,000' },
  { period: 'Month 18', users: '~50,000', rev: '$140,000', exp: '$120,000', net: '+$20,000', cash: '$850,000' },
];

function pickRows(full) {
  return full.filter((r) => keepPeriods.has(r.period));
}

const scenarios = [
  {
    key: 'b',
    kicker: 'Scenario B',
    title: 'Conservative',
    accent: 'from-[#9B4DCA]/90 to-[#64109A]/80',
    subtitle: 'Higher churn (15%) + higher blended CAC ($25)',
    rows: pickRows(conservativeFull),
    note: '~$460k cash at Month 18.',
  },
  {
    key: 'a',
    kicker: 'Scenario A',
    title: 'Base',
    accent: 'from-[#AC0064]/90 to-[#9B4DCA]/80',
    subtitle: 'Base growth toward Series A milestones',
    rows: pickRows(baseFull),
    note: '~$580k cash at Month 18; ~25k MAU, ~$70k net monthly rev.',
  },
  {
    key: 'c',
    kicker: 'Scenario C',
    title: 'Optimistic',
    accent: 'from-[#64109A]/90 to-[#AC0064]/70',
    subtitle: 'Lower CAC ($10) + viral loops + ~30% CMGR',
    rows: pickRows(optimisticFull),
    note: '~$850k cash at Month 18; profitability by tail.',
  },
];

export default function RunwayScenariosSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-y-auto bg-gradient-to-b from-[#18021A] to-[#0d0110] py-10 md:py-14">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,1100px)] h-[min(80vh,720px)] opacity-12 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(172,0,100,0.35) 0%, rgba(100,16,154,0.2) 45%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-6 pb-8">
        <motion.div
          className="flex items-center justify-center gap-5 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
        >
          <span className="w-12 md:w-14 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-[10px] md:text-xs tracking-[0.32em] text-[#AC0064]/80 uppercase font-medium">
            Appendix · Runway
          </span>
          <span className="w-12 md:w-14 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight text-white/90 tracking-wide mb-2">
            18-month runway —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
              three scenarios
            </span>
          </h2>
          <p className="text-xs md:text-sm text-white/50 font-light max-w-2xl mx-auto">
            Key checkpoints (Start, Month 6, 12, 18). Full month-by-month tables available in the model.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-5 items-start">
          {scenarios.map((s, idx) => (
            <motion.div
              key={s.key}
              className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-3 md:p-4 backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
            >
              <div className="mb-3 pb-3 border-b border-white/[0.07]">
                <div className="text-[10px] tracking-[0.22em] text-white/40 uppercase font-medium mb-1">
                  {s.kicker}
                </div>
                <div
                  className={`text-lg md:text-xl font-light text-transparent bg-clip-text bg-gradient-to-r ${s.accent}`}
                >
                  {s.title}
                </div>
                <p className="text-[11px] md:text-xs text-white/50 font-light mt-1.5 leading-snug">{s.subtitle}</p>
              </div>
              <SpreadsheetTable title={null} columns={columns} rows={s.rows} note={s.note} dense />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
