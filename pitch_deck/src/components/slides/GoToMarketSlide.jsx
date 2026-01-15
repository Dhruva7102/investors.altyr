import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Building2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Users,
    number: "01",
    title: "Inner Circle: Founding Creator Cohort",
    description: "Hand-selected top and rising creators receive white-glove setup, migration, direct roadmap access, and permanent Founder badges."
  },
  {
    icon: Target,
    number: "02",
    title: "Deep Implementation & Case Studies",
    description: "Focus on small initial cohort to demonstrate higher LTV per fan, more fans in VIP tiers, and improved retention and earnings stability."
  },
  {
    icon: Building2,
    number: "03",
    title: "Agencies & Managers",
    description: "Partner with managers and agencies to bring rosters of creators onto Altyr with minimal operational overhead."
  },
  {
    icon: Rocket,
    number: "04",
    title: "Product-Led Growth",
    description: "Use transparent analytics, public case studies, and creator testimonials to drive inbound interest from serious earners."
  }
];

export default function GoToMarketSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#18021A] py-20">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(100,16,154,0.5) 0%, transparent 60%)',
          filter: 'blur(120px)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Go-To-Market</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Intro */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-2xl md:text-3xl font-extralight leading-relaxed text-white/90 tracking-wide mb-4">
            A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">focused, high-touch</span> strategy
          </h2>
          <div className="text-base text-white/60 font-light max-w-4xl mx-auto leading-relaxed space-y-2">
            <p className="text-lg md:text-xl font-extralight text-white/70 italic">
              This is not a <span className="text-white/50">"winner-take-all"</span> consumer social bet.
            </p>
            <p>
              This is a <span className="text-white/80 font-medium">high-margin</span>, <span className="text-white/80 font-medium">commission-based</span>, <span className="text-white/80 font-medium">supply-driven marketplace</span>. Creators bring demand with them. When even a small percentage of top creators move, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">gravity does the rest</span>.
            </p>
          </div>
        </motion.div>

        {/* Timeline steps - 2 column grid on larger screens */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative h-full p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500">
                {/* Number badge */}
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-[#AC0064]/30 to-[#64109A]/30 border-2 border-[#AC0064]/50 flex items-center justify-center">
                  <span className="text-sm font-medium text-[#AC0064]">{step.number}</span>
                </div>

                {/* Icon and title */}
                <div className="flex items-center gap-3 mb-3 mt-2">
                  <div className="p-2 rounded-lg bg-[#AC0064]/10">
                    <step.icon className="w-5 h-5 text-[#AC0064]" />
                  </div>
                  <h3 className="text-lg font-light text-white/90 tracking-wide">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
