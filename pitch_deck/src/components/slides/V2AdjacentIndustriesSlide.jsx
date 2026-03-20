import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const examples = [
  {
    leftTitle: 'Craigslist',
    rightTitle: 'Airbnb',
    leftSubtitle: 'Listings',
    rightSubtitle: 'Designed marketplace',
    leftProved: ['Peer-to-peer commerce works', 'Supply creates its own demand'],
    leftLacked: ['Trust systems', 'UX', 'Monetization', 'Optimization'],
    rightWon: [
      'Design drove conversion',
      'Reputation systems increased trust',
      'Monetization aligned incentives',
      'Hosts became semi-professional businesses',
    ],
    note: null,
  },
  {
    leftTitle: 'YouTube (early)',
    rightTitle: 'YouTube (modern)',
    leftSubtitle: 'Hosting',
    rightSubtitle: 'Monetization infrastructure',
    leftProved: ['Upload videos', 'Get views'],
    leftLacked: ['No income clarity'],
    rightWon: ['Analytics', 'Creator Studio', 'Monetization tools', 'Revenue predictability'],
    note: null,
  },
  {
    leftTitle: 'Early video platforms',
    rightTitle: 'Twitch',
    leftSubtitle: 'Entertainment',
    rightSubtitle: 'Live monetization design',
    leftProved: ['Entertainment at scale', 'Creator communities form'],
    leftLacked: ['No designed monetization mechanics', 'No progression, status, or recognition loops'],
    rightWon: ['Subscriptions', 'Bits', 'Badges', 'Status', 'Parasocial incentives'],
    note: 'Not better content—better monetization mechanics. Close parallel to Altyr: status, progression, recognition, soft loss aversion. Adult platforms never fully adopted this playbook.',
  },
  {
    leftTitle: 'Selling online (before)',
    rightTitle: 'Shopify',
    leftSubtitle: 'Websites + plugins',
    rightSubtitle: 'Small business enablement',
    leftProved: ['Merchants want to sell online', 'Demand existed; tooling was fragmented'],
    leftLacked: ['Websites', 'Payments', 'Plugins', 'Chaos'],
    rightWon: ['Dashboards', 'Analytics', 'Funnels', 'Apps', 'Automation'],
    note: null,
  },
];

function ExampleCard({ ex, index }) {
  const isTwitch = ex.rightTitle === 'Twitch';

  return (
    <motion.div
      className="rounded-xl bg-white/[0.025] border border-white/[0.08] overflow-hidden hover:border-white/[0.11] transition-colors"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
    >
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
          <div className="min-w-0 flex-1">
            <div className="text-[15px] md:text-base font-light text-white/90 leading-tight">{ex.leftTitle}</div>
            <div className="text-[11px] text-white/40 font-light mt-0.5">{ex.leftSubtitle}</div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/30 shrink-0 mt-1" />
          <div className="min-w-0 flex-1 text-right">
            <div className="text-[15px] md:text-base font-light text-white/90 leading-tight">{ex.rightTitle}</div>
            <div className="text-[11px] text-white/40 font-light mt-0.5">{ex.rightSubtitle}</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <div className="text-[10px] tracking-[0.18em] text-white/40 uppercase mb-1.5">What it proved</div>
              <ul className="space-y-1">
                {ex.leftProved.map((item, i) => (
                  <li key={i} className="flex gap-2 text-xs text-white/55 font-light leading-snug">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/35 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.18em] text-white/40 uppercase mb-1.5">What it lacked</div>
              <ul className="space-y-1">
                {ex.leftLacked.map((item, i) => (
                  <li key={i} className="flex gap-2 text-xs text-white/50 font-light leading-snug">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/45 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.18em] text-[#AC0064]/75 uppercase mb-1.5">Why the winner won</div>
            <ul className="space-y-1">
              {ex.rightWon.map((item, i) => (
                <li key={i} className="flex gap-2 text-xs text-white/65 font-light leading-snug">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#AC0064]/55 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            {ex.note ? (
              <div
                className={
                  isTwitch
                    ? 'mt-3 p-2.5 rounded-lg bg-gradient-to-r from-[#E85A24]/12 to-[#FF8C42]/08 border border-[#FF8C42]/22'
                    : 'mt-3 pt-3 border-t border-white/[0.06]'
                }
              >
                <p
                  className={
                    isTwitch
                      ? 'text-[11px] text-white/78 font-light leading-relaxed'
                      : 'text-[11px] text-white/48 font-light leading-relaxed'
                  }
                >
                  {ex.note}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function V2AdjacentIndustriesSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-y-auto bg-gradient-to-b from-[#0d0110] to-[#18021A] py-12 md:py-16">
      <div
        className="absolute top-1/3 left-1/4 w-[900px] h-[640px] opacity-16 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(172,0,100,0.28) 0%, rgba(100,16,154,0.16) 45%, transparent 72%)',
          filter: 'blur(120px)',
        }}
      />

      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-5 md:px-8 pb-10">
        <motion.div
          className="flex items-center justify-center gap-5 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
        >
          <span className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-[10px] md:text-xs tracking-[0.32em] text-[#AC0064]/80 uppercase font-medium text-center">
            Appendix · Industry precedent
          </span>
          <span className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-extralight text-white/90 tracking-wide leading-snug mb-2">
            Every creator platform evolves into a business platform — or gets displaced
          </h2>
          <p className="text-sm text-white/48 font-light">
            Same pattern across categories: distribution first, then ops, trust, and monetization depth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4">
          {examples.map((ex, idx) => (
            <ExampleCard key={ex.leftTitle} ex={ex} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
