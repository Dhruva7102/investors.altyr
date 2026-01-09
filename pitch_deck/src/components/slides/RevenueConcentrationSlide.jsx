import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Heart, Target } from 'lucide-react';

export default function RevenueConcentrationSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0110] to-[#18021A] py-24">
      {/* Gradient accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.35) 0%, rgba(100,16,154,0.25) 40%, transparent 70%)',
          filter: 'blur(150px)',
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Why This Market Exists</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Headline */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight leading-relaxed text-white/90 tracking-wide mb-4">
            Revenue concentrates in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">relationship depth</span>, not transaction volume
          </h2>
        </motion.div>

        {/* Main stat */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="relative inline-block">
            <div className="text-4xl md:text-5xl font-extralight text-white/90 mb-3 leading-relaxed">
              <span className="text-white/60">Only </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                ~4.2%
              </span>
              <span className="text-white/60"> of OnlyFans subscribers pay for content</span>
            </div>
            <div className="text-3xl md:text-4xl font-extralight text-white/90 mb-2">
              <span className="text-white/60">A tiny </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                ~0.01%
              </span>
              <span className="text-white/60"> account for </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                ~20%
              </span>
              <span className="text-white/60"> of creator revenue</span>
            </div>
            <p className="text-sm text-white/40 font-light mt-3 italic">
              (OnlyGuider)
            </p>
          </div>
        </motion.div>

        {/* Supporting points */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="mb-4 inline-flex p-4 rounded-xl bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
              <Heart className="w-6 h-6 text-[#AC0064]" />
            </div>
            <p className="text-base text-white/70 font-light leading-relaxed">
              These fans pay for <span className="text-white/90 font-medium">emotional connection</span> and feeling closer to creators
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mb-4 inline-flex p-4 rounded-xl bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
              <Target className="w-6 h-6 text-[#AC0064]" />
            </div>
            <p className="text-base text-white/70 font-light leading-relaxed">
              OnlyFans tools optimize for <span className="text-white/90 font-medium">transactions</span>. They don't deepen connections.
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="mb-4 inline-flex p-4 rounded-xl bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
              <TrendingUp className="w-6 h-6 text-[#AC0064]" />
            </div>
            <p className="text-base text-white/70 font-light leading-relaxed">
              Deeper connections capture more revenue from the <span className="text-white/90 font-medium">fans who matter most</span>
            </p>
          </motion.div>
        </div>

        {/* Bottom statement */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <p className="text-lg md:text-xl font-extralight text-white/80 leading-relaxed italic">
              The market exists because people spend on <span className="text-white/90 font-medium">relationship depth</span>, not just content access. Current platforms leave that value on the table.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
