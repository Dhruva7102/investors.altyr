import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, FileSignature, Code2, Rocket } from 'lucide-react';

const highlights = [
  {
    icon: Handshake,
    title: 'Top-10 agency signed',
    description: 'Co-developing Altyr Pro and helping sell it into their network.',
  },
  {
    icon: FileSignature,
    title: '3 additional LOIs',
    description: 'Signed letters of intent from three more agencies ready to onboard.',
  },
  {
    icon: Code2,
    title: 'Stability at scale solved',
    description: 'The hard technical problem — running every creator through OFAPI reliably — is done.',
  },
  {
    icon: Rocket,
    title: '~1 month to launch',
    description: 'Altyr Pro is in final testing; stable-at-scale with the full feature set is weeks away.',
  },
];

export default function TractionSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0110] to-[#18021A] py-20">
      {/* Gradient accent */}
      <div
        className="absolute top-1/3 left-1/4 w-[900px] h-[700px] opacity-18"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(172,0,100,0.30) 0%, rgba(100,16,154,0.20) 40%, transparent 70%)',
          filter: 'blur(150px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Traction</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Main title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide mb-3">
            Demand <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">before launch</span>
          </h2>
          <p className="text-base text-white/60 font-light max-w-3xl mx-auto">
            Agencies are signing to co-build the product — the strongest signal of real pull.
          </p>
        </motion.div>

        {/* Key metrics */}
        <motion.div
          className="flex items-center justify-center gap-12 md:gap-20 mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b8860b] mb-2">1</div>
            <div className="text-sm text-[#d4af37]/70 font-light">Top-10 agency signed</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-extralight text-white/90 mb-2">3</div>
            <div className="text-sm text-white/50 font-light">LOIs from agencies</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-extralight text-white/90 mb-2">600+</div>
            <div className="text-sm text-white/50 font-light">Creators in reach</div>
          </div>
        </motion.div>

        {/* Highlights grid */}
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="relative h-full p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                    <IconComponent className="w-5 h-5 text-[#AC0064]" />
                  </div>
                  <h3 className="text-lg font-light text-white/90 tracking-wide mb-1.5">{highlight.title}</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">{highlight.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
