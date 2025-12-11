import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Zap, Search, TrendingUp, Eye } from 'lucide-react';

const problems = [
  {
    icon: DollarSign,
    title: "High fees with limited value-add",
    description: "Creators pay 20%+ commission but get slow payouts, basic analytics, and little help growing revenue."
  },
  {
    icon: Zap,
    title: "Outdated UX and slow performance",
    description: "Clunky uploads, poor mobile experiences, and antiquated interfaces hurt conversion and retention."
  },
  {
    icon: Search,
    title: "Weak discovery and targeting",
    description: "Basic search and categories make it difficult for niche and emerging creators to reach the right fans."
  },
  {
    icon: TrendingUp,
    title: "Flat monetization flows",
    description: "Simple tip, subscribe, buy content—without designed paths from casual fan to VIP supporter."
  },
  {
    icon: Eye,
    title: "Creators fly blind on business decisions",
    description: "Limited real-time insight into what's working, who their best fans are, and how to activate them."
  }
];

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 md:py-32 bg-gradient-to-b from-[#18021A] to-[#0d0110]">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/3 right-0 w-[600px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(77,7,28,0.6) 0%, transparent 60%)',
          filter: 'blur(120px)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">The Problem</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Intro text */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight leading-relaxed text-white/90 tracking-wide mb-4">
            The market is proven—billions in revenue, strong margins—
            <br />
            <span className="text-white/60">but the platforms are broken</span>
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.div 
                className="h-full p-6 rounded-xl bg-white/[0.02] border border-red-500/20 backdrop-blur-sm cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(239, 68, 68, 0.4)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {/* Subtle hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(239,68,68,0.08) 0%, transparent 50%)',
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative">
                  {/* Icon */}
                  <motion.div 
                    className="mb-4 inline-flex p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <problem.icon className="w-5 h-5 text-red-400/80" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-light text-white/90 mb-2 tracking-wide group-hover:text-white transition-colors duration-200">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed group-hover:text-white/60 transition-colors duration-200">
                    {problem.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Quote callout */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.1]">
            <div className="absolute top-6 left-6 text-6xl text-[#AC0064]/20 font-serif">"</div>
            <p className="text-xl md:text-2xl font-extralight text-white/80 leading-relaxed italic">
              Despite generating billions in revenue, platforms like OnlyFans operate on infrastructure that looks and behaves like a 2016 web app—creating a massive opportunity for a modern alternative.
            </p>
            <div className="absolute bottom-6 right-6 text-6xl text-[#AC0064]/20 font-serif rotate-180">"</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

