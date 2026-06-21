import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Layers } from 'lucide-react';

const steps = [
  {
    icon: Building2,
    number: '01',
    title: 'Sign the agency',
    description:
      'Land top OF agencies with Altyr Pro — the operating system they already need. Recurring SaaS from day one, no consumer marketing required.',
  },
  {
    icon: Users,
    number: '02',
    title: 'They bring the roster',
    description:
      'Each agency connects its entire roster — 150+ creators and their fanbases — onto Altyr Pro. One signature lands hundreds of creators.',
  },
  {
    icon: Layers,
    number: '03',
    title: 'Monetize the whales',
    description:
      'Pro reveals the high-value fans. The Altyr platform monetizes them at 20% of GMV — the high-margin upside, with zero new acquisition spend.',
  },
];

export default function GoToMarketSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#18021A] py-20">
      {/* Subtle gradient accent */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(100,16,154,0.5) 0%, transparent 60%)',
          filter: 'blur(120px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Go-To-Market</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Intro */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-2xl md:text-3xl font-extralight leading-relaxed text-white/90 tracking-wide mb-4">
            Agency-led <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">land-and-expand</span>
          </h2>
          <div className="text-base text-white/60 font-light max-w-4xl mx-auto leading-relaxed space-y-2">
            <p className="text-lg md:text-xl font-extralight text-white/70 italic">
              No paid acquisition. No consumer marketing.
            </p>
            <p>
              We sign the <span className="text-white/80 font-medium">operators</span>, not the creators. Each agency brings its
              entire roster and fanbase with it — so distribution compounds with every contract.
            </p>
          </div>
        </motion.div>

        {/* Three-step flow */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative h-full p-6 pt-7 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500">
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-[#AC0064]/30 to-[#64109A]/30 border-2 border-[#AC0064]/50 flex items-center justify-center">
                  <span className="text-sm font-medium text-[#AC0064]">{step.number}</span>
                </div>
                <div className="flex items-center gap-3 mb-3 mt-2">
                  <div className="p-2 rounded-lg bg-[#AC0064]/10">
                    <step.icon className="w-5 h-5 text-[#AC0064]" />
                  </div>
                  <h3 className="text-lg font-light text-white/90 tracking-wide">{step.title}</h3>
                </div>
                <p className="text-sm text-white/60 font-light leading-relaxed">{step.description}</p>
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
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <p className="text-lg md:text-xl font-extralight text-white/80 leading-relaxed">
              Target: the top <span className="text-white/90 font-medium">15–20 agencies</span>, each managing{' '}
              <span className="text-white/90 font-medium">150+ creators</span>. A handful of signatures covers thousands of creators.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
