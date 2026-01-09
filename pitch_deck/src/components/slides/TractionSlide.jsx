import React from 'react';
import { motion } from 'framer-motion';
import { Users, Scale, Code, Target, MessageSquare, UserCheck } from 'lucide-react';

const highlights = [
  {
    icon: Users,
    title: 'Industry Legends',
    description: 'Working with legends in the space like Max Konnor, Sean Ford, Hazel Hoffman',
  },
  {
    icon: Scale,
    title: 'Legal Team',
    description: 'Specialized Legal Advisor on board from day 1',
  },
  {
    icon: Code,
    title: 'Full Stack Team',
    description: 'Lean, off-shore dev team with deep experience in the product',
  },
  {
    icon: Target,
    title: 'Product Progress',
    description: 'Product 80% completed',
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
            Building with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]">Momentum</span>
          </h2>
          <p className="text-base text-white/60 font-light max-w-3xl mx-auto">
            Early traction demonstrates market validation and execution capability
          </p>
        </motion.div>

        {/* Key metrics */}
        <motion.div
          className="flex items-center justify-center gap-16 mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-extralight text-white/90 mb-2">15</div>
            <div className="text-sm text-white/50 font-light">Creators</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-extralight text-white/90 mb-2">12M</div>
            <div className="text-sm text-white/50 font-light">Total Followers</div>
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
                transition={{
                  duration: 0.7,
                  delay: 0.3 + index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="relative h-full p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                    <IconComponent className="w-5 h-5 text-[#AC0064]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-light text-[#AC0064] mb-2 tracking-wide">{highlight.title}</h3>
                  <p className="text-sm text-white/60 font-light leading-relaxed">{highlight.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
