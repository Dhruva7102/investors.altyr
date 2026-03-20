import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ShieldCheck, TrendingUp, Wrench } from 'lucide-react';

const statusQuo = [
  {
    icon: TrendingUp,
    title: 'Category scale & growth',
    description:
      'Leader-scale creator GMV is in the mid‑single‑digit billions; the category has compounded roughly ~10% CAGR (illustrative, public market commentary).',
  },
  {
    icon: ShieldCheck,
    title: 'Take-rate economics',
    description:
      '~20% headline platform take is the norm; net to the platform after processing is often ~15%—still high‑margin vs typical marketplaces.',
  },
  {
    icon: Building2,
    title: 'OnlyFans as anchor',
    description:
      'Public estimates put OnlyFans-scale platform revenue around ~$1B+ annually—proof of durable demand and payout velocity at scale.',
  },
  {
    icon: Wrench,
    title: 'Margins & product gap',
    description:
      'Mature players enjoy software-like gross margins at scale; yet UX, CRM, analytics, and monetization design remain first-generation.',
  },
];

export default function ProblemSlide1() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-24">
      {/* Dramatic gradient accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.35) 0%, rgba(100,16,154,0.25) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Status Quo</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Big stat */}
        <motion.div
          className="text-center mb-12 mt-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white/90 mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                $50+ Billion
              </span>
            </h2>
            <motion.div
              className="absolute inset-0 -z-10 blur-3xl opacity-40"
              style={{
                background: 'linear-gradient(90deg, #AC0064, #9B4DCA, #64109A)',
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3.2,
                repeat: 1,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />
          </div>
          <p className="text-xs text-white/40 font-light italic mt-1">
            * combined market value of top 5 platforms
          </p>
        </motion.div>

        {/* Narrative */}
        <motion.div
          className="text-center text-base md:text-lg text-white/60 font-light max-w-4xl mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <p>
            This is a large, high‑margin category growing at roughly ~10% a year—yet most platforms still tax
            ~20% while shipping first‑generation product. That mismatch will not hold.
          </p>
        </motion.div>

        {/* Status quo cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {statusQuo.map((item, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="h-full p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-300">
                <div className="relative">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                    <item.icon className="w-5 h-5 text-[#AC0064]" />
                  </div>

                  <h3 className="text-lg font-light text-white/90 mb-2 tracking-wide">{item.title}</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
