import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users, Target, BarChart, Percent } from 'lucide-react';

const metrics = [
  {
    icon: DollarSign,
    title: 'Altyr Pro SaaS',
    value: '$250',
    subtitle: 'per connected creator/mo',
    description: 'Flat operating-system + chatter-management fee',
    color: '#9B4DCA'
  },
  {
    icon: TrendingUp,
    title: 'Platform Commission',
    value: '$1,248',
    subtitle: 'per connected creator/mo',
    description: '20% of ~$7,800/mo whale GMV at 80% penetration',
    color: '#FF8C42'
  },
  {
    icon: BarChart,
    title: 'Blended Revenue',
    value: '$1,498',
    subtitle: 'per connected creator/mo',
    description: 'SaaS + platform commission combined',
    color: '#34D399'
  },
  {
    icon: Target,
    title: 'Altyr Pro Infra Cost',
    value: '$46',
    subtitle: 'per connected creator/mo',
    description: 'Variable infra; plus ~$2,322/mo fixed baseline',
    color: '#AC0064'
  },
  {
    icon: Percent,
    title: 'Revenue Mix',
    value: '83 / 17',
    subtitle: 'platform / SaaS',
    description: 'At-scale mix once Altyr Platform is live',
    color: '#64109A'
  },
  {
    icon: Users,
    title: 'Acquisition',
    value: '$0',
    subtitle: 'paid acquisition',
    description: 'Agency-led land-and-expand, no ad spend',
    color: '#FF8C42'
  },
];

const ltvCalculation = [
  { label: 'Altyr Pro SaaS', value: '$250/mo' },
  { label: 'Whale GMV per creator', value: '~$7,800/mo' },
  { label: 'Platform commission (20% x 80% penetration)', value: '$1,248/mo' },
  { label: 'Blended revenue / connected creator', value: '$1,498/mo' },
];

export default function UnitEconomicsSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-20">
      {/* Gradient accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.4) 0%, rgba(100,16,154,0.3) 40%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Appendix: Unit Economics</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">Unit Economics</span> & Model Assumptions
          </h2>
          <p className="text-base text-white/60 font-light">
            Two revenue lines per connected creator: SaaS + platform commission
          </p>
        </motion.div>

        {/* Metrics grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={index}
                className="relative p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Icon */}
                <div 
                  className="mb-4 inline-flex p-3 rounded-lg border"
                  style={{
                    backgroundColor: `${metric.color}20`,
                    borderColor: `${metric.color}30`,
                  }}
                >
                  <IconComponent 
                    className="w-5 h-5"
                    style={{ color: metric.color }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm text-white/50 font-light mb-2">{metric.title}</h3>

                {/* Value */}
                <div className="text-3xl font-light text-white/90 mb-1">
                  {metric.value}
                </div>

                {/* Subtitle */}
                <div className="text-xs text-white/40 font-light mb-3">
                  {metric.subtitle}
                </div>

                {/* Description */}
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  {metric.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* LTV Calculation */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            <h3 className="text-xl font-light text-white/90 mb-6 text-center">
              Per-Connected-Creator Economics
            </h3>
            <div className="space-y-4">
              {ltvCalculation.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-b-0"
                >
                  <span className="text-sm text-white/70 font-light">{item.label}</span>
                  <span className="text-lg text-white/90 font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Formula explanation */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <p className="text-sm text-white/60 font-light text-center leading-relaxed">
                <span className="text-white/80 font-medium">Formula:</span> $250 SaaS + (Whale GMV x penetration x 20% commission)
                <br />
                <span className="text-xs text-white/40">$250 + ($7,800 x 80% x 20%) = $250 + $1,248 = $1,498 / creator / mo</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="text-center max-w-4xl mx-auto mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            <p className="text-sm text-white/70 font-light">
              <span className="text-white/90 font-medium">Key Insight:</span> ~$1,498 revenue against ~$46 variable infra per connected creator. The SaaS wedge is profitable on its own; the 20% platform commission is the upside that drives the ~83% / 17% mix at scale.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
