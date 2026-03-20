import React from 'react';
import { motion } from 'framer-motion';
import {
  COMMISSION_RATE,
  FORECAST_MONTHS,
} from '@/lib/revenueCalculatorModel';

const formulas = [
  {
    title: 'Gross merchandise value (monthly)',
    lines: [
      'Sub GMV_m = S_m × (average subscription price)',
      'PPV GMV_m = S_m × (PPV spend per subscriber per month)',
      'GMV_m = Sub GMV_m + PPV GMV_m',
    ],
  },
  {
    title: 'Platform revenue (monthly)',
    lines: [
      `PlatformRev_m = GMV_m × ${(COMMISSION_RATE * 100).toFixed(0)}%`,
      'Take rate is net of payment processing (headline ~20% gross → ~15% net in this model).',
    ],
  },
  {
    title: 'Creators (month m)',
    lines: [
      'C_m = round(C_0 × (1 + r)^m)',
      'r = monthly creator growth rate (slider, e.g. 15% → 0.15)',
      'C_0 = creators on platform at month 0',
    ],
  },
  {
    title: 'Subscribers — churn + new supply (month m ≥ 1)',
    lines: [
      "S' = S_{m-1} × (1 − c)   (c = monthly subscriber churn)",
      'ΔC = C_m − C_{m−1}',
      "NewSubs = max(0, ΔC) × (avg subscribers per creator)",
      'S_m = round(S′ + NewSubs)',
      'Month 0: S_0 = round(C_0 × avg subscribers per creator)',
    ],
  },
];

export default function RevenueCalculatorMethodologySlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-y-auto bg-gradient-to-b from-[#18021A] to-[#0d0110] py-16 md:py-20">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[640px] opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(172,0,100,0.35) 0%, rgba(100,16,154,0.22) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 pb-8">
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">
            Appendix · Revenue calculator
          </span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
        >
          <h2 className="text-2xl md:text-3xl font-extralight text-white/90 tracking-wide mb-3">
            Assumptions & formulas
          </h2>
          <p className="text-base text-white/55 font-light max-w-2xl mx-auto leading-relaxed">
            The interactive slide uses the same definitions as this appendix. Horizon: {FORECAST_MONTHS} months.
            All currency is USD; subscription and PPV inputs are monthly.
          </p>
        </motion.div>

        <div className="space-y-5">
          <motion.div
            className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            <h3 className="text-sm tracking-[0.2em] text-[#AC0064]/85 uppercase font-medium mb-3">
              Inputs (sliders)
            </h3>
            <ul className="text-sm text-white/60 font-light space-y-2 leading-relaxed">
              <li>C_0 — creators on platform at month 0</li>
              <li>Avg subscribers per creator (assumed constant per creator)</li>
              <li>Average subscription price ($/month per paying fan)</li>
              <li>PPV spend per subscriber ($/month)</li>
              <li>r — monthly creator growth (MoM)</li>
              <li>c — monthly subscriber churn (share of prior-month subscribers who do not renew)</li>
            </ul>
          </motion.div>

          {formulas.map((block, idx) => (
            <motion.div
              key={block.title}
              className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 + idx * 0.05 }}
            >
              <h3 className="text-sm tracking-[0.2em] text-white/50 uppercase font-medium mb-3">
                {block.title}
              </h3>
              <ul className="font-mono text-xs md:text-sm text-white/70 font-light space-y-2 leading-relaxed">
                {block.lines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.p
            className="text-xs text-white/40 font-light leading-relaxed pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Illustrative model only—not a forecast of performance. Rounding on creators and subscribers
            introduces small discontinuities vs a continuous closed form.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
