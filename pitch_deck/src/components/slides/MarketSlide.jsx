import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const opportunities = [
  {
    icon: Users,
    title: "Concentrated, reachable buyers",
    description: "The top ~15-20 OnlyFans agencies each manage 150+ creators. Sign a handful and you reach thousands of connected creators with no paid acquisition."
  },
  {
    icon: TrendingUp,
    title: "Agencies run on spreadsheets",
    description: "These agencies coordinate chatters, scheduling, and CRM by hand. Altyr Pro is the operating system they're missing, at $250 / connected creator / month."
  },
  {
    icon: DollarSign,
    title: "Whale-concentrated GMV",
    description: "A small share of fans drive most spend. Altyr Platform captures that high-value GMV at a 20% commission, the real upside layered on top of the SaaS wedge."
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
                Agency-Managed GMV
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
            top ~15-20 OnlyFans agencies, 150+ creators each
          </p>
        </motion.div>

        {/* Context paragraph */}
        <motion.div
          className="text-center text-base text-white/60 font-light max-w-4xl mx-auto leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p>
            We target the OnlyFans agency industry, not individual fans. The serviceable opportunity is concrete: <span className="text-white/80 font-medium">$250 / connected creator / month</span> of SaaS across thousands of agency-managed creators, plus <span className="text-white/80 font-medium">20% of whale GMV</span> on Altyr Platform. Land a small number of large agencies and expand creator-by-creator, with no paid acquisition.
          </p>
        </motion.div>

        {/* TAM snapshot */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p className="text-sm text-white/45 font-light">
            Rough addressable SaaS revenue: <span className="text-white/70">~15–20 agencies × 150+ creators × $250/mo</span>
            {' '}≈ <span className="text-white/80 font-medium">$7–9M/yr</span> — before any platform commission.
            Platform GMV commission scales on top as whale spend migrates.
          </p>
        </motion.div>

        {/* Competitive context */}
        <motion.div
          className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <p className="text-sm text-white/55 font-light text-center leading-relaxed">
            <span className="text-white/80 font-medium">No purpose-built alternative exists.</span>{' '}
            The closest tools agencies use today — Telegram bots, Notion databases, custom spreadsheets — were built for entirely different problems. No software company has built an agency OS specifically for the OF ecosystem.
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
