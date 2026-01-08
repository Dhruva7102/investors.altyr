import React from 'react';
import { motion } from 'framer-motion';
import { Infinity, BadgeDollarSign, ShieldCheck } from 'lucide-react';

const points = [
  {
    icon: Infinity,
    title: 'Built to compound',
    description: 'A high-margin, commission-based business where monetization improvements compound with scale.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Dividend-first mindset',
    description: 'Long-term objective: return cash to investors via dividends over time—not just a single exit outcome.',
  },
  {
    icon: ShieldCheck,
    title: 'Aligned incentives',
    description: 'If creators earn more per fan, they stay. If they stay, revenue becomes durable. Durable revenue supports dividends.',
  },
];

export default function V2DividendsSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#18021A] py-20">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] opacity-22"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(172,0,100,0.30) 0%, rgba(100,16,154,0.22) 40%, transparent 70%)',
          filter: 'blur(150px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">
            Investor upside
          </span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide mb-4">
            We want to pay dividends to investors —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]">
              forever
            </span>
            .
          </h2>
          <p className="text-base md:text-lg text-white/60 font-light max-w-4xl mx-auto leading-relaxed">
            The goal is a durable, compounding cash-flow business where improvements in monetization and retention
            translate into long-term distributions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {points.map((point, idx) => {
            const IconComponent = point.icon;
            return (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: idx * 0.08 }}
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <IconComponent className="w-5 h-5 text-[#AC0064]" />
                </div>
                <h3 className="text-lg font-light text-white/90 tracking-wide mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">{point.title}</span>
                </h3>
                <p className="text-sm text-white/55 font-light leading-relaxed">{point.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

