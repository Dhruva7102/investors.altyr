import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Eye, Target } from 'lucide-react';

export default function AltyrInsightSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#18021A] py-20">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/4 left-0 w-[600px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(100,16,154,0.4) 0%, transparent 60%)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Altyr's Insight</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Main insight */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl font-extralight leading-relaxed text-white/90 tracking-wide mb-6">
            Monetization is not a payment problem.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]">It is a design problem.</span>
          </h2>
        </motion.div>

        {/* The biggest creators need */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-lg text-white/70 font-light text-center mb-8">
            The biggest creators don't need another place to host content.
            <br />
            They need:
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                tools that increase spend per fan
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                <Target className="w-5 h-5 text-[#AC0064]" />
              </div>
              <p className="text-base text-white/80 font-light">
                systems that reward loyalty
              </p>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                <Eye className="w-5 h-5 text-[#AC0064]" />
              </div>
              <p className="text-base text-white/80 font-light">
                visibility into what actually drives revenue
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <p className="text-base md:text-lg font-extralight text-white/80 leading-relaxed">
              Altyr applies <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">game-grade monetization mechanics</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">business-grade tooling</span> to a category that has never had either.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
