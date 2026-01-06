import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Zap, Search } from 'lucide-react';

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
  }
];

export default function ProblemSlide1() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-24">
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
          animate={{ opacity: 1 }}
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight leading-relaxed text-white/90 tracking-wide mb-4">
            The market is proven—billions in revenue, strong margins—
            <br />
            <span className="text-white/60">but the platforms are broken</span>
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.div 
                className="h-full p-6 rounded-xl bg-white/[0.02] border border-red-500/20 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(239, 68, 68, 0.4)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="relative">
                  {/* Icon */}
                  <motion.div 
                    className="mb-4 inline-flex p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                  >
                    <problem.icon className="w-5 h-5 text-red-400/80" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-light text-white/90 mb-2 tracking-wide">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
