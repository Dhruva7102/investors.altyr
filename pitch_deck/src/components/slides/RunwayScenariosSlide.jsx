import React from 'react';
import { motion } from 'framer-motion';
import SpreadsheetTable from '@/components/pitch/SpreadsheetTable';

const columns = [
  { key: 'period', label: 'Period' },
  { key: 'users', label: 'Creators', align: 'right' },
  { key: 'rev', label: 'Revenue', align: 'right' },
  { key: 'exp', label: 'Costs', align: 'right' },
  { key: 'net', label: 'Net', align: 'right' },
  { key: 'cash', label: 'Cash', align: 'right' },
];

const keepPeriods = new Set(['Start', 'Month 6', 'Month 12', 'Month 18']);

// Conservative: single-agency ramp, SaaS-only through M9, platform launches late
const conservativeFull = [
  { period: 'Start',    users: '0',      rev: '$0',      exp: '$40k',    net: '($40k)',   cash: '$1,500k' },
  { period: 'Month 6',  users: '~100',   rev: '$25k',    exp: '$75k',    net: '($50k)',   cash: '$1,180k' },
  { period: 'Month 12', users: '~300',   rev: '$75k',    exp: '$110k',   net: '($35k)',   cash: '$970k'   },
  { period: 'Month 18', users: '~500',   rev: '$185k',   exp: '$150k',   net: '+$35k',    cash: '$800k'   },
];

// Base: matches FinancialProjectionsSlide base case (55% penetration)
const baseFull = [
  { period: 'Start',    users: '0',      rev: '$0',      exp: '$40k',    net: '($40k)',   cash: '$1,500k' },
  { period: 'Month 6',  users: '~600',   rev: '$180k',   exp: '$250k',   net: '($70k)',   cash: '$1,100k' },
  { period: 'Month 12', users: '~1,150', rev: '$900k',   exp: '$820k',   net: '+$80k',    cash: '$1,100k' },
  { period: 'Month 18', users: '~1,400', rev: '$1.35M',  exp: '$1.09M',  net: '+$260k',   cash: '$2,400k' },
];

// Upside: matches FinancialProjectionsSlide headline case (80% penetration)
const upsideFull = [
  { period: 'Start',    users: '0',      rev: '$0',      exp: '$40k',    net: '($40k)',   cash: '$1,500k' },
  { period: 'Month 6',  users: '~700',   rev: '$260k',   exp: '$320k',   net: '($60k)',   cash: '$1,100k' },
  { period: 'Month 12', users: '~1,400', rev: '$1.5M',   exp: '$1.08M',  net: '+$420k',   cash: '$2,800k' },
  { period: 'Month 18', users: '~1,700', rev: '$2.33M',  exp: '$1.48M',  net: '+$850k',   cash: '$6,900k' },
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
    subtitle: 'Single-agency ramp · SaaS-led · ~500 connected creators at M18',
    rows: pickRows(conservativeFull),
    note: '~$800k cash at M18. Altyr Pro SaaS is profitable standalone; platform upside is additive.',
  },
  {
    key: 'a',
    kicker: 'Scenario A',
    title: 'Base',
    accent: 'from-[#AC0064]/90 to-[#9B4DCA]/80',
    subtitle: 'Multi-agency expansion · 55% whale→Altyr penetration · ~1,400 creators at M18',
    rows: pickRows(baseFull),
    note: '~$2.4M cash at M18; cash-flow positive ~M10. Matches base-case financial model.',
  },  {
    key: 'c',
    kicker: 'Scenario C',
    title: 'Upside',
    accent: 'from-[#64109A]/90 to-[#AC0064]/70',
    subtitle: 'Rapid agency ramp · 80% whale→Altyr penetration · ~1,700 creators at M18',
    rows: pickRows(upsideFull),
    note: '~$6.9M cash at M18; cash-flow positive ~M8. Matches headline financial model.',
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
            Key checkpoints (Start, M6, M12, M18) across three B2B agency-ramp scenarios. Revenue = SaaS + platform commission. Full monthly model available on request.
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
