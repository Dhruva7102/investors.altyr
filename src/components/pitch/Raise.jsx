import React from 'react';
import { motion } from 'framer-motion';
import { Layers, BarChart, Users as UsersIcon, Shield } from 'lucide-react';
import PieChart from './PieChart';

const useOfFunds = [
  {
    icon: Layers,
    title: "Finalize Core Platform",
    description: "Complete UX, discovery, and payout infrastructure for seamless creator and fan experience.",
    value: 35, // 35% = $420k
    color: "#AC0064"
  },
  {
    icon: BarChart,
    title: "Build Analytics, CRM & Gamification",
    description: "Develop creator-facing analytics dashboard, high-value fan CRM, and full gamification engine.",
    value: 30, // 30% = $360k
    color: "#9B4DCA"
  },
  {
    icon: UsersIcon,
    title: "Onboard Founding Creators",
    description: "Deeply support an Inner Circle of founding creators and early agency partners with white-glove service.",
    value: 20, // 20% = $240k
    color: "#64109A"
  },
  {
    icon: Shield,
    title: "Payments, Compliance & Risk",
    description: "Invest in robust payment infrastructure, compliance, and risk systems appropriate for the category.",
    value: 15, // 15% = $180k
    color: "#7C3AED"
  }
];

export default function Raise() {
  return (
    <section id="raise" className="relative py-24 md:py-32">
      {/* Dramatic gradient accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.5) 0%, rgba(100,16,154,0.3) 40%, transparent 70%)',
          filter: 'blur(150px)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">The Ask</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Big ask */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="relative inline-block mb-6">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-extralight text-white/90">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                $1,200,000
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
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <p className="text-2xl md:text-3xl text-white/60 font-extralight mb-2">
            via SAFE
          </p>
          <p className="text-lg text-white/50 font-light">
            at 20% discount
          </p>
        </motion.div>

        {/* Use of funds header */}
        <motion.h3
          className="text-2xl md:text-3xl font-extralight text-white/80 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Use of Funds
        </motion.h3>

        {/* Pie Chart and Breakdown */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          {/* Pie Chart */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <PieChart data={useOfFunds} size={320} />
          </motion.div>

          {/* Breakdown List */}
          <div className="space-y-4">
            {useOfFunds.map((item, index) => {
              const amount = (item.value / 100) * 1200000;
              const formattedAmount = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(amount);
              
              return (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1 + 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <div className="relative p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500">
                    <div className="flex items-start gap-4">
                      {/* Color indicator */}
                      <div 
                        className="w-1 h-full rounded-full flex-shrink-0 mt-1"
                        style={{ backgroundColor: item.color }}
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                              <item.icon className="w-4 h-4 text-[#AC0064]" />
                            </div>
                            <h4 className="text-base font-light text-white/90 tracking-wide">
                              {item.title}
                            </h4>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-white/50 font-light">
                            {item.value}%
                          </span>
                          <span className="text-sm font-medium text-white/80">
                            {formattedAmount}
                          </span>
                        </div>
                        <p className="text-xs text-white/60 font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA feel */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="inline-block px-10 py-5 rounded-full bg-gradient-to-r from-[#AC0064]/20 to-[#64109A]/20 border-2 border-[#AC0064]/40">
            <p className="text-xl text-white/90 font-light">
              Building the future of creator monetization
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

