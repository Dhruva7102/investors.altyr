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
    description: '20% of ~$7,800/mo whale GMV at 80% penetration (60% of $13k avg agency creator rev)',
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
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-4">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.4) 0%, rgba(100,16,154,0.3) 40%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <motion.div
          className="flex items-center justify-center gap-6 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Unit Economics</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-2xl md:text-3xl font-extralight text-white/90 tracking-wide mb-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">Unit Economics</span> & Model Assumptions
          </h2>
          <p className="text-sm text-white/60 font-light">
            Two revenue lines per connected creator: SaaS + platform commission
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-5 items-start">
          {/* Metrics grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm"
                >
                  <div
                    className="mb-2 inline-flex p-2 rounded-lg border"
                    style={{ backgroundColor: `${metric.color}20`, borderColor: `${metric.color}30` }}
                  >
                    <IconComponent className="w-4 h-4" style={{ color: metric.color }} />
                  </div>
                  <h3 className="text-xs text-white/50 font-light mb-1">{metric.title}</h3>
                  <div className="text-2xl font-light text-white/90 mb-0.5">{metric.value}</div>
                  <div className="text-[10px] text-white/40 font-light mb-1">{metric.subtitle}</div>
                  <p className="text-[11px] text-white/60 font-light leading-snug">{metric.description}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Per-creator table */}
          <motion.div
            className="w-72 shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <h3 className="text-base font-light text-white/90 mb-4 text-center">
                Per-Creator Economics
              </h3>
              <div className="space-y-2">
                {ltvCalculation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-white/[0.06] last:border-b-0">
                    <span className="text-xs text-white/70 font-light">{item.label}</span>
                    <span className="text-sm text-white/90 font-medium tabular-nums">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.08]">
                <p className="text-[11px] text-white/50 font-light text-center leading-relaxed">
                  $250 + ($7,800 × 80% × 20%) = <span className="text-white/80">$1,498/creator/mo</span>
                </p>
                <p className="text-[10px] text-white/35 font-light text-center leading-relaxed mt-2">
                  * $7,800 = 60% of ~$13k avg monthly creator GMV with an agency. Whales account for ~60% of creator revenue on the conservative end.
                </p>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <p className="text-[11px] text-white/60 font-light leading-relaxed text-center">
                <span className="text-white/80 font-medium">Key insight:</span> $1,498 revenue vs $46 variable infra. SaaS is profitable on its own; platform commission is pure upside.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
