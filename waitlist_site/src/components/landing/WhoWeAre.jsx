import React from 'react';
import { motion } from 'framer-motion';

export default function WhoWeAre() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse, rgba(100,16,154,0.25) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#64109A]/10 border border-[#64109A]/20 mb-8">
            <span className="text-xs tracking-widest text-white/70 uppercase font-medium">Who We Are</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-extralight tracking-tight leading-relaxed mb-6">
            <span className="text-white/90">We're building the platform we always wished existed</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]">—one that treats creators like professionals and fans like VIPs.</span>
          </h3>
          
          <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
            ALTYR is a team of designers, engineers, and creators who believe the future of exclusive content should be beautiful, fast, and fair. We're here to raise the bar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}