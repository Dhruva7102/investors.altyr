import React from 'react';
import { motion } from 'framer-motion';

export default function ProblemSlide1() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-24">
      {/* Dramatic gradient accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.35) 0%, rgba(100,16,154,0.25) 40%, transparent 70%)',
          filter: 'blur(100px)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Status Quo</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Big stat */}
        <motion.div
          className="text-center mb-12 mt-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white/90 mb-2">
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
                duration: 3.2,
                repeat: 1,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />
          </div>
          <p className="text-xs text-white/40 font-light italic mt-1">
            * combined market value of top 5 platforms
          </p>
        </motion.div>

        {/* Narrative */}
        <motion.div
          className="text-center text-base md:text-lg text-white/60 font-light max-w-5xl mx-auto leading-relaxed space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <p>
            Creator monetization is already a multi-billion-dollar, high-margin industry—but it is still being run on first-generation infrastructure. That gap cannot persist. OnlyFans didn't invent creator monetization. It proved it at scale. What's speculative is the assumption that platforms can keep extracting 20% while offering outdated UX, no analytics, no CRM, and no monetization design.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
