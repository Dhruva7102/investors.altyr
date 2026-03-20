import React from 'react';
import { motion } from 'framer-motion';
import { Layers, BarChart, Users as UsersIcon, Shield, Target } from 'lucide-react';
import PieChart from '@/components/pitch/PieChart';

const RAISE_USD = 1_500_000;
const MAX_SLICE = 30;

const useOfFunds = [
  {
    icon: Target,
    shortLabel: 'Growth',
    title: 'Customer Acquisition Incentives',
    description:
      'Incentives for users and creators to drive early growth and network effects.',
    value: 30,
    color: '#AC0064',
  },
  {
    icon: Shield,
    shortLabel: 'Trust',
    title: 'Payments, Compliance, Legal & Risk',
    description:
      'Invest in robust payment infrastructure, compliance, legal, and risk systems appropriate for the category.',
    value: 25,
    color: '#9B4DCA',
  },
  {
    icon: BarChart,
    shortLabel: 'Product',
    title: 'Build Analytics, CRM & Gamification',
    description:
      'Develop creator-facing analytics dashboard, high-value fan CRM, and full gamification engine.',
    value: 15,
    color: '#64109A',
  },
  {
    icon: UsersIcon,
    shortLabel: 'Creators',
    title: 'Onboard Founding Creators',
    description:
      'Deeply support an Inner Circle of founding creators and early agency partners with white-glove service.',
    value: 15,
    color: '#7C3AED',
  },
  {
    icon: Layers,
    shortLabel: 'Platform',
    title: 'Finalize Core Platform',
    description:
      'Complete UX, discovery, and payout infrastructure for seamless creator and fan experience.',
    value: 15,
    color: '#A855F7',
  },
];

function titleScaleClass(pct) {
  if (pct >= 28) return 'text-[15px] sm:text-base md:text-[17px]';
  if (pct >= 22) return 'text-sm sm:text-[15px]';
  return 'text-xs sm:text-sm';
}

export default function RaiseSlide() {
  return (
    <section className="relative w-full min-h-screen overflow-y-auto bg-[#18021A] py-16 md:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,1000px)] h-[min(70vh,600px)] opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(172,0,100,0.5) 0%, rgba(100,16,154,0.3) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          className="flex items-center justify-center gap-5 md:gap-6 mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-14 md:w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">The Ask</span>
          <span className="w-14 md:w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* Left: raise + donut */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="relative mb-6 md:mb-8 w-full max-w-md lg:max-w-none">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.35rem] xl:text-7xl font-extralight text-white/90 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                  $1,500,000
                </span>
              </h2>
              <motion.div
                className="absolute -inset-6 -z-10 rounded-full opacity-35 blur-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, #AC0064, #9B4DCA, #64109A)',
                }}
                animate={{
                  opacity: [0.28, 0.42, 0.28],
                  scale: [1, 1.06, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <p className="text-lg md:text-xl text-white/60 font-extralight mt-3">via SAFE</p>
              <p className="text-sm md:text-base text-white/48 font-light mt-1">
                at 20% discount with $15M cap
              </p>
            </div>

            <p className="text-[11px] tracking-[0.28em] uppercase text-[#AC0064]/75 font-medium mb-4 lg:mb-5 w-full text-center lg:text-left">
              Use of funds — at a glance
            </p>
            <div className="w-full flex justify-center lg:justify-start">
              <PieChart data={useOfFunds} size={300} />
            </div>
          </motion.div>

          {/* Right: breakdown */}
          <motion.div
            className="flex flex-col min-w-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.06 }}
          >
            <h3 className="text-xl md:text-2xl font-extralight text-white/85 mb-6 md:mb-7">
              Use of funds
            </h3>
            <div className="space-y-3 md:space-y-3.5">
              {useOfFunds.map((item, index) => {
                const amount = (item.value / 100) * RAISE_USD;
                const formattedAmount = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(amount);
                const barPct = (item.value / MAX_SLICE) * 100;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    className="group relative rounded-xl bg-white/[0.035] border border-white/[0.07] overflow-hidden hover:border-white/[0.11] transition-colors"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.07 + 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <div className="relative p-3.5 md:p-4 flex gap-3">
                      <div
                        className="w-1 self-stretch rounded-full shrink-0 opacity-90"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2.5">
                          <div className="p-2 rounded-lg bg-black/25 border border-white/[0.08] shrink-0 mt-0.5">
                            <Icon className="w-3.5 h-3.5 text-white/70" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-light text-white/92 tracking-wide leading-snug ${titleScaleClass(item.value)}`}
                            >
                              {item.title}
                            </h4>
                            <p className="text-[11px] md:text-xs text-white/45 font-light mt-1.5 leading-relaxed line-clamp-2 md:line-clamp-none">
                              {item.description}
                            </p>
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mt-2.5">
                              <span
                                className="tabular-nums font-medium text-white/88"
                                style={{ fontSize: `clamp(0.8rem, 0.65rem + ${item.value * 0.04}vw, 1.05rem)` }}
                              >
                                {item.value}%
                              </span>
                              <span className="text-white/30 text-xs">·</span>
                              <span className="text-xs text-white/55 tabular-nums">{formattedAmount}</span>
                            </div>
                            <div className="mt-2 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: item.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${barPct}%` }}
                                transition={{
                                  duration: 0.9,
                                  delay: 0.25 + index * 0.07,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
