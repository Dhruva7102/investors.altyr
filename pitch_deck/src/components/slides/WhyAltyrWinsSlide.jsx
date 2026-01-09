import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function WhyAltyrWinsSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#18021A] py-20">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.35) 0%, rgba(100,16,154,0.25) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Why Altyr Wins</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Main comparison */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <h3 className="text-xl font-light text-white/60 mb-2">OnlyFans</h3>
              <p className="text-lg text-white/80 font-light">monetizes access</p>
            </div>
            <ArrowRight className="w-6 h-6 text-white/40" />
            <div className="text-center">
              <h3 className="text-xl font-light text-[#AC0064] mb-2">Altyr</h3>
              <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">monetizes engagement</p>
            </div>
          </div>
          <p className="text-lg md:text-xl font-extralight text-white/70 italic">
            That distinction matters because:
          </p>
        </motion.div>

        {/* Three key points */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <motion.div
            className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
              <TrendingUp className="w-5 h-5 text-[#AC0064]" />
            </div>
            <p className="text-base text-white/80 font-light">
              engagement scales LTV
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
              <DollarSign className="w-5 h-5 text-[#AC0064]" />
            </div>
            <p className="text-base text-white/80 font-light">
              LTV compounds platform value
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
              <Users className="w-5 h-5 text-[#AC0064]" />
            </div>
            <p className="text-base text-white/80 font-light">
              creators follow the platform where they earn more per fan
            </p>
          </motion.div>
        </div>

        {/* Bottom statement */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <p className="text-base md:text-lg font-extralight text-white/80 leading-relaxed">
              Once a creator sees higher income with the same audience, switching stops being risky—<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">it becomes irresponsible</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
