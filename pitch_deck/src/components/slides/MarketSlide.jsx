import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const opportunities = [
  {
    icon: TrendingUp,
    title: "Advanced monetization design",
    description: "Current platforms have proven demand but under-invest in systematic revenue optimization."
  },
  {
    icon: Users,
    title: "Modern creator tooling",
    description: "Serious earners need live-ops-grade analytics, CRM, and business intelligence."
  },
  {
    icon: DollarSign,
    title: "Deep creator partnerships",
    description: "Building with top creators creates a defensible moat and distribution network."
  }
];

export default function MarketSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0110] to-[#18021A] py-20">
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
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Market Opportunity</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Big stat */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-extralight text-white/90 mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                $50+ Billion
              </span>
            </h2>
            {/* Glow effect */}
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
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <p className="text-lg text-white/60 font-extralight">
            combined market value of top 5 platforms
          </p>
        </motion.div>

        {/* Context paragraph */}
        <motion.div
          className="text-center text-base text-white/60 font-light max-w-4xl mx-auto leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="mb-4">
            Subscription and adult content represent a massive, high-margin market. OnlyFans generates billions in revenue with 20%+ commission rates—yet operates on outdated infrastructure. We leverage data-driven insights and proven gamification techniques to <span className="text-white/80 font-medium">expand the total addressable market</span> by making spending more engaging and rewarding.
          </p>
          <p className="text-lg md:text-xl font-extralight text-white/70 italic">
            This is not a <span className="text-white/50">"winner-take-all"</span> consumer social bet.
          </p>
          <p className="text-base text-white/60 font-light mt-2">
            This is a <span className="text-white/80 font-medium">high-margin</span>, <span className="text-white/80 font-medium">commission-based</span>, <span className="text-white/80 font-medium">supply-driven marketplace</span>. Creators bring demand with them. When even a small percentage of top creators move, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">gravity does the rest</span>.
          </p>
        </motion.div>

        {/* Opportunity cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {opportunities.map((item, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative h-full p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300">
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <item.icon className="w-5 h-5 text-[#AC0064]" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-light text-white/90 mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
