import React from 'react';
import { motion } from 'framer-motion';
import { Store, BarChart3, Gamepad2 } from 'lucide-react';

const visionItems = [
  {
    icon: Store,
    title: "Creator Storefront",
    description: "A beautiful, modern platform with exceptional UX that converts fans and maximizes revenue."
  },
  {
    icon: BarChart3,
    title: "Business Command Center",
    description: "Real-time analytics, CRM, and revenue ops tools that let creators run their page like a business."
  },
  {
    icon: Gamepad2,
    title: "Live Game Economy",
    description: "Gamified mechanics that nudge fans toward deeper engagement and higher lifetime value."
  }
];

export default function VisionSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#18021A] py-24">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse, rgba(100,16,154,0.4) 0%, transparent 60%)',
          filter: 'blur(120px)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Vision</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Main vision statement */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight leading-relaxed text-white/90 tracking-wide mb-6">
            For Creators, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">Built With Creators</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/50 font-extralight max-w-4xl mx-auto leading-relaxed">
            Altyr is the modern home for serious earners—a platform that combines the best of creator tools with proven monetization mechanics from gaming and gambling.
          </p>
        </motion.div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {visionItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500">
                {/* Icon */}
                <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <item.icon className="w-6 h-6 text-[#AC0064]" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-light text-white/90 mb-3 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-white/50 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          className="text-center text-lg md:text-xl text-white/40 font-extralight mt-16 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Founding creators aren't just users—they're partners in designing the platform.
        </motion.p>
      </div>
    </section>
  );
}
