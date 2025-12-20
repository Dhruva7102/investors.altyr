import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Rocket, CheckCircle } from 'lucide-react';

const timeline = [
  {
    icon: Calendar,
    month: "January",
    event: "Round Opens",
    description: "Friends & Family SAFE round opens for investment."
  },
  {
    icon: CheckCircle,
    month: "March",
    event: "Round Closes",
    description: "Fundraising round closes. Begin platform development acceleration."
  },
  {
    icon: Rocket,
    month: "April/May",
    event: "Platform Launches",
    description: "Altyr platform launches with founding creator cohort."
  }
];

export default function LaunchTimeline() {
  return (
    <section id="timeline" className="relative py-24 md:py-32 bg-gradient-to-b from-[#18021A] to-[#0d0110] overflow-visible">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.3) 0%, rgba(100,16,154,0.2) 40%, transparent 70%)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Launch Timeline</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Intro */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight leading-relaxed text-white/90 tracking-wide mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">path to launch</span>
          </h2>
          <p className="text-lg text-white/50 font-light max-w-3xl mx-auto">
            Clear milestones from fundraising to platform launch
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="flex gap-6 items-start">
                {/* Month badge + Icon column */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3">
                  {/* Month badge */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/40 flex flex-col items-center justify-center">
                    <div className="p-2 rounded-lg bg-[#AC0064]/10 mb-1">
                      <item.icon className="w-4 h-4 text-[#AC0064]" />
                    </div>
                    <span className="text-xs font-light text-[#AC0064]">{item.month}</span>
                  </div>
                  
                  {/* Connecting line (except for last item) */}
                  {index < timeline.length - 1 && (
                    <div className="w-px h-24 bg-gradient-to-b from-[#AC0064]/40 to-transparent" />
                  )}
                </div>

                {/* Content card */}
                <div className="flex-1 pb-8">
                  <div className="relative p-6 md:p-8 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500">
                    <h3 className="text-xl font-light text-white/90 tracking-wide mb-2">
                      {item.event}
                    </h3>
                    <p className="text-white/60 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

