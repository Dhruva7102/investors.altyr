import React, { useEffect, useState } from 'react';
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
  if (pct >= 28) return 'text-sm sm:text-[15px] md:text-base';
  if (pct >= 22) return 'text-xs sm:text-sm md:text-[15px]';
  return 'text-[11px] sm:text-xs md:text-sm';
}

/** Responsive donut diameter: large on desktop, scales down on narrow viewports */
function useDonutSize() {
  const [size, setSize] = useState(360);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const capByHeight = Math.min(520, Math.max(280, Math.round(h * 0.42)));
      let s;
      if (w >= 1536) s = Math.min(480, capByHeight);
      else if (w >= 1280) s = Math.min(440, capByHeight);
      else if (w >= 1024) s = Math.min(400, capByHeight);
      else if (w >= 640) s = Math.min(340, capByHeight);
      else s = Math.min(300, Math.max(248, w - 40));
      setSize(s);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

export default function RaiseSlide() {
  const donutSize = useDonutSize();

  return (
    <section className="relative w-full min-h-full bg-[#18021A] py-12 md:py-14 lg:py-16 pb-28 md:pb-32">
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 w-[min(120vw,900px)] h-[min(80vh,700px)] opacity-25"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(172,0,100,0.45) 0%, rgba(100,16,154,0.25) 45%, transparent 72%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-[10px] md:text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">
            The Ask
          </span>
          <span className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Wider left rail for hero + large donut; tighter right list */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-8 xl:gap-10 2xl:gap-14 items-start">
          {/* Left: ask + donut — horizontal band on xl saves vertical space */}
          <motion.div
            className="flex flex-col items-center xl:items-stretch min-w-0"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="w-full flex flex-col xl:flex-row xl:items-center xl:gap-8 2xl:gap-12">
              <div className="relative text-center xl:text-left shrink-0 xl:max-w-[min(100%,22rem)] 2xl:max-w-md">
                <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-[3.25rem] 2xl:text-7xl font-extralight text-white/90 leading-[1.05]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                    $1,500,000
                  </span>
                </h2>
                <motion.div
                  className="absolute -inset-8 -z-10 rounded-full opacity-30 blur-3xl pointer-events-none hidden xl:block"
                  style={{
                    background: 'linear-gradient(90deg, #AC0064, #9B4DCA, #64109A)',
                  }}
                  animate={{
                    opacity: [0.22, 0.38, 0.22],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <p className="text-base md:text-lg text-white/58 font-extralight mt-2 md:mt-3">via SAFE</p>
                <p className="text-xs md:text-sm text-white/45 font-light mt-1 leading-snug max-w-xs mx-auto xl:mx-0">
                  at 20% discount with $15M cap
                </p>
              </div>

              <div className="mt-8 xl:mt-0 flex flex-col items-center xl:items-center xl:flex-1 xl:min-w-0 min-w-0 w-full">
                <p className="text-[10px] tracking-[0.26em] uppercase text-[#AC0064]/70 font-medium mb-3 xl:mb-4 text-center">
                  Use of funds — at a glance
                </p>
                <div
                  className="flex justify-center xl:justify-center w-full [&_svg]:max-w-full"
                  style={{ maxWidth: donutSize + 48 }}
                >
                  <PieChart data={useOfFunds} size={donutSize} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: dense breakdown — fits common laptop heights */}
          <motion.div
            className="flex flex-col min-w-0 xl:pt-1"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.06 }}
          >
            <h3 className="text-lg md:text-xl font-extralight text-white/82 mb-4 md:mb-5">Use of funds</h3>
            <div className="space-y-2 md:space-y-2.5">
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
                    className="group rounded-lg md:rounded-xl bg-white/[0.032] border border-white/[0.07] hover:border-white/[0.11] transition-colors"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05 + 0.12,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <div className="flex gap-2 md:gap-2.5 p-2.5 md:p-3">
                      <div
                        className="w-0.5 md:w-1 self-stretch rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <Icon
                        className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-80"
                        style={{ color: item.color }}
                        aria-hidden
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                          <h4
                            className={`font-light text-white/90 leading-tight pr-1 ${titleScaleClass(item.value)}`}
                          >
                            {item.title}
                          </h4>
                          <div className="flex items-baseline gap-1.5 shrink-0 tabular-nums">
                            <span
                              className="font-medium text-white/88"
                              style={{
                                fontSize: `clamp(0.7rem, 0.6rem + ${item.value * 0.035}vw, 0.95rem)`,
                              }}
                            >
                              {item.value}%
                            </span>
                            <span className="text-white/28 text-[10px]">·</span>
                            <span className="text-[10px] md:text-xs text-white/50">{formattedAmount}</span>
                          </div>
                        </div>
                        <p
                          className="text-[10px] md:text-[11px] text-white/42 font-light mt-1 leading-snug line-clamp-2"
                          title={item.description}
                        >
                          {item.description}
                        </p>
                        <div className="mt-1.5 h-0.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${barPct}%` }}
                            transition={{
                              duration: 0.85,
                              delay: 0.2 + index * 0.05,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
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
