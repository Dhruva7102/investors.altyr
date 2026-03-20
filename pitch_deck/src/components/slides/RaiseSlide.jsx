import React from 'react';
import { motion } from 'framer-motion';
import { Layers, BarChart, Users as UsersIcon, Shield, Target, Sparkles } from 'lucide-react';
import PieChart from '@/components/pitch/PieChart';

const useOfFunds = [
  {
    icon: Target,
    shortTitle: 'Acquisition',
    title: 'Customer Acquisition Incentives',
    description: 'Incentives for users and creators to drive early growth and network effects.',
    value: 30,
    color: '#AC0064',
    subdivisions: [
      { value: 18, label: 'Creator incentives' },
      { value: 12, label: 'Fan growth & promos' },
    ],
  },
  {
    icon: Shield,
    shortTitle: 'Trust & rails',
    title: 'Payments, Compliance, Legal & Risk',
    description: 'Invest in robust payment infrastructure, compliance, legal, and risk systems appropriate for the category.',
    value: 25,
    color: '#9B4DCA',
    subdivisions: [
      { value: 15, label: 'Payments & payouts' },
      { value: 10, label: 'Compliance & legal' },
    ],
  },
  {
    icon: BarChart,
    shortTitle: 'CRM & XP',
    title: 'Build Analytics, CRM & Gamification',
    description: 'Develop creator-facing analytics dashboard, high-value fan CRM, and full gamification engine.',
    value: 15,
    color: '#64109A',
  },
  {
    icon: UsersIcon,
    shortTitle: 'Founding creators',
    title: 'Onboard Founding Creators',
    description: 'Deeply support an Inner Circle of founding creators and early agency partners with white-glove service.',
    value: 15,
    color: '#7C3AED',
  },
  {
    icon: Layers,
    shortTitle: 'Core platform',
    title: 'Finalize Core Platform',
    description: 'Complete UX, discovery, and payout infrastructure for seamless creator and fan experience.',
    value: 15,
    color: '#A855F7',
  },
];

const RAISE_USD = 1_500_000;

export default function RaiseSlide() {
  return (
    <section className="relative w-full min-h-screen overflow-x-hidden overflow-y-visible bg-[#18021A] py-16 md:py-20">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1000px,95vw)] h-[min(600px,70vh)] opacity-[0.28]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.5) 0%, rgba(100,16,154,0.28) 42%, transparent 72%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          className="flex items-center justify-center gap-5 md:gap-6 mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
        >
          <span className="w-14 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">The Ask</span>
          <span className="w-14 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* Left: amount + terms */}
          <motion.div
            className="text-left space-y-6 lg:pt-2"
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.35rem] xl:text-6xl font-extralight text-white/90 leading-[1.05] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                  $1,500,000
                </span>
              </h2>
              <motion.div
                className="absolute -inset-6 -z-10 blur-3xl opacity-35 rounded-full"
                style={{ background: 'linear-gradient(90deg, #AC0064, #9B4DCA, #64109A)' }}
                animate={{ opacity: [0.28, 0.42, 0.28], scale: [1, 1.06, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <div className="space-y-1">
              <p className="text-lg md:text-xl text-white/60 font-extralight">via SAFE</p>
              <p className="text-sm md:text-base text-white/48 font-light">20% discount · $15M cap</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 md:p-6">
              <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-[#AC0064]/85 font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                What this round funds
              </div>
              <ul className="space-y-3 text-sm md:text-[15px] text-white/55 font-light leading-relaxed">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-[#AC0064] to-[#9B4DCA]" />
                  <span>18–24 months of runway to scale founding creators, ship CRM depth, and harden payments.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-[#AC0064] to-[#9B4DCA]" />
                  <span>Incentives and onboarding that compound early liquidity on both sides of the marketplace.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-[#AC0064] to-[#9B4DCA]" />
                  <span>Compliance and legal capacity appropriate for regulated payments and adult-adjacent risk.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right: use of funds */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            <div>
              <h3 className="text-lg md:text-xl font-extralight text-white/85 tracking-wide">Use of funds</h3>
              <p className="text-xs text-white/40 font-light mt-1">Allocation reflects how we deploy the raise — not a day-by-day budget.</p>
            </div>

            <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8 xl:gap-6 overflow-visible">
              <div className="shrink-0 w-full max-w-[min(100%,420px)] xl:max-w-none flex justify-center overflow-visible px-1">
                <PieChart
                  data={useOfFunds}
                  size={280}
                  gapDeg={2.4}
                  centerTitle="$1.5M"
                  centerSubtitle="allocated"
                />
              </div>

              <div className="w-full max-w-md xl:max-w-none xl:flex-1 space-y-2.5">
                {useOfFunds.map((item, index) => {
                  const amount = (item.value / 100) * RAISE_USD;
                  const formattedAmount = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  }).format(amount);
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.08 * index + 0.2 }}
                    >
                      <div
                        className="rounded-xl border border-white/[0.07] bg-white/[0.025] overflow-hidden"
                        style={{
                          boxShadow: `inset 0 0 0 1px ${item.color}12`,
                        }}
                      >
                        <div className="p-3 md:p-3.5 flex gap-3">
                          <div
                            className="w-1 self-stretch rounded-full shrink-0"
                            style={{
                              background: `linear-gradient(180deg, ${item.color}, ${shadeForBar(item.color)})`,
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="p-1.5 rounded-lg bg-black/30 border border-white/[0.08] shrink-0">
                                  <Icon className="w-3.5 h-3.5 opacity-90" style={{ color: item.color }} />
                                </div>
                                <h4 className="text-[13px] md:text-sm font-light text-white/90 tracking-wide leading-snug">
                                  {item.title}
                                </h4>
                              </div>
                              <div className="text-right shrink-0">
                                <div
                                  className="text-base md:text-lg font-extralight tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-white/95 to-white/75"
                                  style={{ fontSize: `${Math.max(14, Math.min(20, 12 + item.value * 0.22))}px` }}
                                >
                                  {item.value}%
                                </div>
                                <div className="text-[10px] text-white/45 tabular-nums">{formattedAmount}</div>
                              </div>
                            </div>
                            <p className="text-[11px] text-white/42 font-light leading-relaxed mt-2 pl-[2.125rem]">
                              {item.description}
                            </p>
                            {item.subdivisions?.length ? (
                              <ul className="mt-2.5 pl-[2.125rem] space-y-1.5 border-t border-white/[0.05] pt-2.5">
                                {item.subdivisions.map((sub) => {
                                  const subAmt = (sub.value / 100) * RAISE_USD;
                                  const subFmt = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    maximumFractionDigits: 0,
                                  }).format(subAmt);
                                  return (
                                    <li
                                      key={sub.label}
                                      className="flex items-baseline justify-between gap-2 text-[10px] text-white/48"
                                    >
                                      <span className="font-light text-white/55">{sub.label}</span>
                                      <span className="tabular-nums shrink-0">
                                        <span className="text-white/40">{sub.value}%</span>
                                        <span className="text-white/25 mx-1">·</span>
                                        <span className="text-white/50">{subFmt}</span>
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function shadeForBar(hex) {
  return shadeColor(hex, 0.25);
}

function shadeColor(hex, amount) {
  const n = hex.replace('#', '');
  const num = parseInt(n, 16);
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;
  r = Math.round(r * (1 - amount));
  g = Math.round(g * (1 - amount));
  b = Math.round(b * (1 - amount));
  return `rgb(${r},${g},${b})`;
}
