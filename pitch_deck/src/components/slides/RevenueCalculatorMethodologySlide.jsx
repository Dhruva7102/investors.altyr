import React from 'react';
import { motion } from 'framer-motion';
import { FORECAST_MONTHS } from '@/lib/revenueCalculatorModel';

const formulas = [
  {
    title: 'SaaS revenue (Altyr Pro)',
    lines: [
      'SaaSRev_m = C_m × $250',
      'C_m = connected creators in month m',
    ],
  },
  {
    title: 'Whale GMV',
    lines: [
      'WhaleGMV_m = C_m × (~$7,800/mo) × penetration',
      'penetration = whale -> Altyr share (80% upside / 55% base)',
    ],
  },
  {
    title: 'Platform commission',
    lines: [
      'PlatformRev_m = WhaleGMV_m × 20%',
      'Creator keeps 80%; Altyr bears processing.',
    ],
  },
  {
    title: 'Net & total revenue',
    lines: [
      'Net = PlatformRev_m − processing(5.5%) − chargeback(1.5%) − infra',
      'TotalRev_m = SaaSRev_m + PlatformRev_m  (~83% / 17% mix)',
    ],
  },
];

export default function RevenueCalculatorMethodologySlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-y-auto bg-[#18021A] py-10 md:py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-[#18021A] via-[#120515] to-[#0d0110]" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(120vw,900px)] h-[400px] opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(172,0,100,0.45) 0%, rgba(100,16,154,0.25) 50%, transparent 72%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 md:px-10 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_-20px_rgba(0,0,0,0.65)] overflow-hidden"
        >
          <div className="px-6 md:px-10 pt-8 md:pt-10 pb-2 text-center border-b border-white/[0.06]">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#AC0064]/60" />
              <span className="text-[10px] md:text-xs tracking-[0.38em] text-[#AC0064]/90 uppercase font-medium">
                Appendix
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#AC0064]/60" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight text-white/95 tracking-tight mb-3">
              Revenue calculator — assumptions &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                formulas
              </span>
            </h2>
            <p className="text-sm md:text-base text-white/55 font-light max-w-2xl mx-auto leading-relaxed">
              Revenue stacks two lines per connected creator: a flat <span className="text-white/75">$250/mo Altyr Pro SaaS</span> fee,
              plus a <span className="text-white/75">20% commission</span> on whale GMV (~$7,800/mo per creator) scaled by
              whale-to-Altyr penetration. Platform revenue is shown <span className="text-white/75">net of payment processing,
              chargeback reserve, and infra</span> (see equations below).
            </p>
            <p className="text-xs text-white/40 font-light mt-4 mb-6">
              Horizon: {FORECAST_MONTHS} months · USD · all inputs are monthly
            </p>
          </div>

          <div className="px-6 md:px-10 py-6 md:py-8 space-y-4">
            <motion.div
              className="rounded-xl border border-[#AC0064]/25 bg-[#AC0064]/08 px-4 py-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-[11px] tracking-[0.22em] text-[#AC0064]/90 uppercase font-medium mb-2">
                Slider inputs
              </h3>
              <ul className="text-xs md:text-sm text-white/65 font-light grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                <li>C_0 — connected creators at month 0</li>
                <li>Altyr Pro SaaS fee ($/creator/mo)</li>
                <li>Whale GMV per creator ($/mo)</li>
                <li>Whale -> Altyr penetration (%)</li>
                <li>Platform commission rate (%)</li>
                <li>r — monthly creator growth (MoM)</li>
              </ul>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {formulas.map((block, idx) => (
                <motion.div
                  key={block.title}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + idx * 0.04 }}
                >
                  <h3 className="text-[10px] tracking-[0.2em] text-white/45 uppercase font-medium mb-2">
                    {block.title}
                  </h3>
                  <ul className="font-mono text-[11px] md:text-xs text-white/72 font-light space-y-1.5 leading-relaxed">
                    {block.lines.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <p className="text-[11px] text-white/38 font-light leading-relaxed text-center pt-2 border-t border-white/[0.05]">
              Illustrative only—not a performance forecast. Integer rounding on creators and subscribers creates
              small jumps vs a continuous model.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
