import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, ArrowDown } from 'lucide-react';

const points = [
  {
    icon: TrendingUp,
    title: "High-margin",
    description: "20%+ commission rates on proven, repeatable revenue streams"
  },
  {
    icon: DollarSign,
    title: "Commission-based",
    description: "Revenue scales with creator success—aligned incentives"
  },
  {
    icon: Users,
    title: "Supply-driven marketplace",
    description: "Creators bring demand with them. When top creators move, gravity does the rest"
  }
];

export default function MarketRealitySlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-24">
      {/* Gradient accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.4) 0%, rgba(100,16,154,0.3) 40%, transparent 70%)',
          filter: 'blur(150px)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Market Reality</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Headline */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight leading-relaxed text-white/90 tracking-wide mb-4">
            This is not a <span className="text-white/60 italic">"winner-take-all"</span> consumer social bet.
          </h2>
          <p className="text-xl md:text-2xl font-extralight text-white/70">
            This is a:
          </p>
        </motion.div>

        {/* Points */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {points.map((point, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative h-full p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300">
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <point.icon className="w-5 h-5 text-[#AC0064]" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-light text-white/90 mb-2 tracking-wide">
                  {point.title}
                </h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="p-6 rounded-xl bg-gradient-to-br from-[#AC0064]/10 to-[#64109A]/10 border-2 border-[#AC0064]/30">
            <p className="text-lg md:text-xl font-extralight text-white/90 leading-relaxed">
              Creators bring demand with them. When even a small percentage of top creators move, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">gravity does the rest</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
