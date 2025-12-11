import React from 'react';
import { motion } from 'framer-motion';

const statements = [
  {
    text: "The industry leader stopped innovating.",
    accent: "stopped innovating",
    sub: "Outdated features, slow payouts, and a platform that prioritizes profits over people."
  },
  {
    text: "Creators deserve modern tools, faster payouts, and real transparency.",
    accent: "modern tools",
    sub: "No more waiting weeks for your earnings or dealing with clunky interfaces."
  },
  {
    text: "ALTYR is the premium platform built for the next generation.",
    accent: "next generation",
    sub: "Designed from the ground up with creators and fans at the center of everything."
  }
];

export default function WhyAltyr() {
  return (
    <section id="why-altyr" className="relative py-16 md:py-20">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(77,7,28,0.4) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
      />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Why ALTYR</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Statements */}
        <div className="space-y-14 md:space-y-20">
          {statements.map((statement, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ 
                duration: 0.9, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-extralight leading-relaxed text-white/70 tracking-wide mb-4">
                {statement.text.split(statement.accent).map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">
                        {statement.accent}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
              <p className="text-base md:text-lg text-white/40 font-light max-w-xl mx-auto">
                {statement.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}