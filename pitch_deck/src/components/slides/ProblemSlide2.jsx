import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, Users } from 'lucide-react';

const problems = [
  {
    icon: Users,
    title: 'No creator CRM or basic revenue tooling',
  },
  {
    icon: TrendingUp,
    title: 'Flat monetization flows',
  },
  {
    icon: Eye,
    title: 'Creators fly blind on business decisions',
  },
];

export default function ProblemSlide2() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0110] to-[#18021A] py-16 md:py-20">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/3 left-0 w-[600px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(77,7,28,0.6) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">First-generation infrastructure</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide mb-4">
            Creators have professionalized. Platforms have not.
          </h2>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-4xl mx-auto leading-relaxed">
            Top creators think in funnels, segmentation, and LTV—yet platforms still offer uploads, subscriptions, and tips.
            That mismatch isn’t stable.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
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
                className="h-full p-7 rounded-xl bg-white/[0.02] border border-white/[0.08]"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(255,255,255,0.12)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="relative">
                  {/* Icon */}
                  <motion.div 
                    className="mb-5 inline-flex p-3.5 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30"
                  >
                    <problem.icon className="w-6 h-6 text-[#AC0064]" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-light text-white/90 tracking-wide leading-snug">
                    {problem.title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Quote callout */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative p-8 md:p-11 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.1]">
            <p className="text-xl md:text-2xl font-extralight text-white/80 leading-relaxed">
              Despite generating billions in revenue, the category is still missing the tooling that every other creator economy now considers table stakes: analytics, CRM, automation, and monetization design.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
