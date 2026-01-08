import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, Users } from 'lucide-react';

const problems = [
  {
    icon: Users,
    title: "No creator CRM or basic revenue tooling",
    description: "No CRM to segment and engage top fans, no workflows, no automation—so creators run their business in spreadsheets and DMs."
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

export default function ProblemSlide2() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0110] to-[#18021A] py-24">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/3 left-0 w-[600px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(77,7,28,0.6) 0%, transparent 60%)',
          filter: 'blur(80px)',
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
          <h2 className="text-2xl md:text-3xl font-extralight text-white/90 tracking-wide mb-3">
            Creators have professionalized. Platforms have not.
          </h2>
          <p className="text-base text-white/60 font-light max-w-4xl mx-auto leading-relaxed">
            Top creators think in funnels, segmentation, and LTV—yet platforms still offer uploads, subscriptions, and tips.
            That mismatch isn’t stable.
          </p>
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
                className="h-full p-6 rounded-xl bg-white/[0.02] border border-white/[0.08]"
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
                    className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30"
                  >
                    <problem.icon className="w-5 h-5 text-[#AC0064]" />
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

        {/* Quote callout */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.1]">
            <div className="absolute top-6 left-6 text-6xl text-[#AC0064]/20 font-serif">"</div>
            <p className="text-xl md:text-2xl font-extralight text-white/80 leading-relaxed italic">
              Despite generating billions in revenue, the category is still missing the tooling that every other creator economy now considers table stakes: analytics, CRM, automation, and monetization design.
            </p>
            <div className="absolute bottom-6 right-6 text-6xl text-[#AC0064]/20 font-serif rotate-180">"</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
