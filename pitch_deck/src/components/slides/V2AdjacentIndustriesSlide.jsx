import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/** Appendix: shorter precedents — Craigslist→Airbnb, early YouTube → modern YouTube */
const pairs = [
  {
    before: 'Craigslist',
    after: 'Airbnb',
    beforePt: 'Listings worked; supply showed up.',
    afterPts: ['Trust & reputation', 'Designed conversion', 'Hosts as businesses'],
  },
  {
    before: 'YouTube (early)',
    after: 'YouTube (today)',
    beforePt: 'Uploads and views at scale.',
    afterPts: ['Creator Studio & analytics', 'Monetization stack', 'Revenue clarity'],
  },
];

export default function V2AdjacentIndustriesSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0110] to-[#18021A] py-16 md:py-20">
      <div
        className="absolute top-1/3 left-1/4 w-[800px] h-[560px] opacity-18"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(172,0,100,0.28) 0%, rgba(100,16,154,0.18) 40%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8">
        <motion.div
          className="flex items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">
            Appendix · Industry precedent
          </span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
        >
          <h2 className="text-2xl md:text-3xl font-extralight text-white/90 tracking-wide mb-3 leading-snug">
            Every creator platform evolves into a business platform — or gets displaced
          </h2>
          <p className="text-base text-white/50 font-light max-w-2xl mx-auto">
            Mature categories don’t stay “dumb pipes.” The winner adds ops, data, and monetization design.
          </p>
        </motion.div>

        <div className="space-y-5">
          {pairs.map((p, idx) => (
            <motion.div
              key={p.before}
              className="p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: idx * 0.08 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <div className="text-lg font-light text-white/90">{p.before}</div>
                  <div className="text-sm text-white/45 font-light mt-1">{p.beforePt}</div>
                </div>
                <div className="flex items-center gap-2 text-white/35 shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-lg font-light text-white/90">{p.after}</div>
                  <div className="text-xs tracking-[0.2em] text-[#AC0064]/75 uppercase mt-1">What changed</div>
                </div>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60 font-light">
                {p.afterPts.map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#AC0064]/70 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
