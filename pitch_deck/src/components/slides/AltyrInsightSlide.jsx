import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Gem } from 'lucide-react';

const steps = [
  {
    icon: Network,
    label: 'Step 1 — Wedge',
    title: 'Own the agency’s operating system',
    description:
      'Altyr Pro becomes the infrastructure every agency runs on — connecting every creator through OFAPI into one place agencies already need.',
  },
  {
    icon: Database,
    label: 'Step 2 — Data',
    title: 'See every fan relationship',
    description:
      'Running operations means we see who the whales are, which relationships drive revenue, and where the spend concentrates — data no one else has.',
  },
  {
    icon: Gem,
    label: 'Step 3 — Upside',
    title: 'Monetize the whales',
    description:
      'The Altyr platform turns that relationship and data into a premium destination for high-value fans — where we earn 20% of whale GMV.',
  },
];

export default function AltyrInsightSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#18021A] py-20">
      {/* Subtle gradient accent */}
      <div
        className="absolute top-1/4 left-0 w-[600px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(100,16,154,0.4) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Altyr&apos;s Insight</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Main insight */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight leading-relaxed text-white/90 tracking-wide">
            Sell agencies the tools they already need.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]">
              Then monetize the fans those tools reveal.
            </span>
          </h2>
        </motion.div>

        {/* Three-step flow */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
            >
              <div className="h-full p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500">
                <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <step.icon className="w-5 h-5 text-[#AC0064]" />
                </div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#AC0064]/80 font-medium mb-2">
                  {step.label}
                </div>
                <h3 className="text-lg font-light text-white/90 mb-2.5 tracking-wide">{step.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-[#AC0064]/40 text-xl z-10">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="text-center max-w-4xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            <p className="text-base md:text-lg font-extralight text-white/80 leading-relaxed">
              The SaaS wedge is the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A] font-light">
                distribution
              </span>
              . The platform commission is the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A] font-light">
                margin
              </span>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
