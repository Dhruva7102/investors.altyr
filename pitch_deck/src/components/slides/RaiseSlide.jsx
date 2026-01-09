import React from 'react';
import { motion } from 'framer-motion';
import { Layers, BarChart, Users as UsersIcon, Shield, Target } from 'lucide-react';
import PieChart from '@/components/pitch/PieChart';

const useOfFunds = [
  {
    icon: Target,
    title: "Customer Acquisition Incentives",
    description: "Incentives for users and creators to drive early growth and network effects.",
    value: 30, // 30% = $450k
    color: "#AC0064"
  },
  {
    icon: Shield,
    title: "Payments, Compliance, Legal & Risk",
    description: "Invest in robust payment infrastructure, compliance, legal, and risk systems appropriate for the category.",
    value: 25, // 25% = $375k
    color: "#9B4DCA"
  },
  {
    icon: BarChart,
    title: "Build Analytics, CRM & Gamification",
    description: "Develop creator-facing analytics dashboard, high-value fan CRM, and full gamification engine.",
    value: 15, // 15% = $225k
    color: "#64109A"
  },
  {
    icon: UsersIcon,
    title: "Onboard Founding Creators",
    description: "Deeply support an Inner Circle of founding creators and early agency partners with white-glove service.",
    value: 15, // 15% = $225k
    color: "#7C3AED"
  },
  {
    icon: Layers,
    title: "Finalize Core Platform",
    description: "Complete UX, discovery, and payout infrastructure for seamless creator and fan experience.",
    value: 15, // 15% = $225k
    color: "#A855F7"
  }
];

export default function RaiseSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#18021A] py-24">
      {/* Dramatic gradient accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.5) 0%, rgba(100,16,154,0.3) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">The Ask</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Big ask */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative inline-block mb-4">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white/90">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                $500,000
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
          <p className="text-xl md:text-2xl text-white/60 font-extralight mb-1">
            via SAFE
          </p>
          <p className="text-base text-white/50 font-light">
            at 20% discount with $15M cap
          </p>
        </motion.div>

        {/* Use of funds header */}
        <motion.h3
          className="text-xl md:text-2xl font-extralight text-white/80 text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Use of Funds
        </motion.h3>

        {/* Pie Chart and Breakdown */}
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          {/* Pie Chart */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <PieChart data={useOfFunds} size={280} />
          </motion.div>

          {/* Breakdown List - Compact version */}
          <div className="space-y-3">
            {useOfFunds.map((item, index) => {
              const amount = (item.value / 100) * 500000;
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
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.08 + 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <div className="relative p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div 
                          className="w-1 h-8 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-light text-white/90 tracking-wide truncate">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-white/50">
                            <span>{item.value}%</span>
                            <span>•</span>
                            <span className="font-medium text-white/70">{formattedAmount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
