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

export default function Market() {
  return (
    <section id="market" className="relative py-24 md:py-32 bg-gradient-to-b from-[#0d0110] to-[#18021A]">
      {/* Dramatic gradient accent */}
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
          className="flex items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Market Opportunity</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Big stat */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white/90 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                Hundreds of Billions
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
          <p className="text-2xl md:text-3xl text-white/60 font-extralight">
            projected in the creator economy
          </p>
        </motion.div>

        {/* Context paragraph */}
        <motion.p
          className="text-center text-lg md:text-xl text-white/60 font-light max-w-4xl mx-auto mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Subscription and adult content make up a large, under-optimized niche. 
          Platforms like OnlyFans have proven demand and willingness to pay at 20%+ commission—but have stalled on innovation.
        </motion.p>

        {/* Opportunity cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {opportunities.map((item, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative h-full p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500">
                {/* Icon */}
                <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <item.icon className="w-6 h-6 text-[#AC0064]" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-light text-white/90 mb-3 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-white/50 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-xl md:text-2xl text-white/70 font-extralight italic max-w-4xl mx-auto leading-relaxed">
            Altyr aims to be the modern, creator-aligned alternative—turning a standard 20% commission into value that creators can feel.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

