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
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
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
          <p className="text-xl md:text-2xl text-white/60 font-extralight">
            combined market value of top 5 platforms
          </p>
        </motion.div>

        {/* Context paragraphs */}
        <motion.div
          className="text-center text-lg md:text-xl text-white/60 font-light max-w-4xl mx-auto mb-16 leading-relaxed space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p>
            Subscription and adult content represent a massive, high-margin market. 
            OnlyFans generates billions in revenue with 20%+ commission rates—yet operates on outdated infrastructure that frustrates both creators and fans. 
            The gap between profitability and platform quality creates a clear opportunity.
          </p>
          <p>
            We leverage data-driven insights and proven gamification techniques from gaming, social media, and e-commerce to drive <span className="text-white/80 font-medium">more spend on platform</span>. 
            By incentivizing big spenders with progression systems, VIP tiers, and loss aversion mechanics, we don't just capture existing market share—we <span className="text-white/80 font-medium">expand the total addressable market</span> by making spending more engaging and rewarding.
          </p>
        </motion.div>

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
              <motion.div 
                className="relative h-full p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.12)',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {/* Subtle hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(172,0,100,0.08) 0%, transparent 50%)',
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative">
                  {/* Icon */}
                  <motion.div 
                    className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30"
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon className="w-6 h-6 text-[#AC0064]" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-light text-white/90 mb-3 tracking-wide group-hover:text-white transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-white/50 font-light leading-relaxed group-hover:text-white/60 transition-colors duration-200">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Competitive Analysis */}
        <motion.div
          className="text-center mt-16 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h3 className="text-xl md:text-2xl font-extralight text-white/80 mb-6 tracking-wide">
            Competitive Analysis
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="/onlyfans-analysis.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white/[0.05] border border-white/[0.15] hover:bg-white/[0.08] hover:border-white/[0.25] transition-all duration-300 text-white/90 font-light"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              OnlyFans Traffic Analysis
            </motion.a>
            <motion.a
              href="/fansly-analysis.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white/[0.05] border border-white/[0.15] hover:bg-white/[0.08] hover:border-white/[0.25] transition-all duration-300 text-white/90 font-light"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Fansly Traffic Analysis
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-xl md:text-2xl text-white/70 font-extralight italic max-w-4xl mx-auto leading-relaxed">
            Altyr captures the same proven economics—20% commission on a high-margin business—while delivering the modern platform experience creators and fans actually want.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

