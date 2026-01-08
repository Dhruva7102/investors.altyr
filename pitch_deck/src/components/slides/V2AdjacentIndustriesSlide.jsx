import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const examples = [
  {
    leftTitle: 'Early video platforms',
    rightTitle: 'Twitch',
    leftSubtitle: 'Entertainment',
    rightSubtitle: 'Live monetization design',
    leftProved: ['Entertainment at scale', 'User-generated content works', 'Live streaming has demand'],
    leftLacked: ['No designed monetization mechanics', 'No progression systems', 'No status or recognition'],
    rightWon: ['Subscriptions', 'Bits (virtual currency)', 'Badges and status', 'Parasocial incentives', 'Progression mechanics'],
    note: 'Not better content—better monetization mechanics. Status, progression, recognition. Adult platforms never adopted this playbook.',
  },
  {
    leftTitle: 'Selling online (before)',
    rightTitle: 'Shopify',
    leftSubtitle: 'Websites + plugins',
    rightSubtitle: 'Small Business Enablement',
    leftProved: ['Merchants want to sell online', 'Peer-to-peer commerce works', 'Supply creates demand'],
    leftLacked: ['Fragmented tooling', 'No unified platform', 'Chaos of plugins and websites'],
    rightWon: ['Dashboards and analytics', 'Unified platform', 'Funnels and automation', 'App ecosystem', 'Business-grade tooling'],
    note: 'Shopify didn\'t create merchants. It made them professional.',
  },
];

function ExampleCard({ ex, index }) {
  const isTwitchExample = ex.rightTitle === 'Twitch';

  return (
    <motion.div
      className="relative rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-hidden backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="p-4">
        {/* Simplified header: single compact row */}
        <div className="flex items-center justify-between gap-4 mb-3 pb-3 border-b border-white/[0.08]">
          <div className="flex-1 min-w-0">
            <div className="text-lg font-light text-white/90 tracking-wide">
              {ex.leftTitle}
            </div>
            <div className="text-xs text-white/45 font-light mt-0.5">{ex.leftSubtitle}</div>
          </div>

          <div className="flex items-center justify-center flex-shrink-0 px-4">
            <ArrowRight className="w-4 h-4 text-white/40" />
          </div>

          <div className="flex-1 min-w-0 text-right">
            <div className="text-lg font-light text-white/90 tracking-wide">
              {ex.rightTitle}
            </div>
            <div className="text-xs text-white/45 font-light mt-0.5">{ex.rightSubtitle}</div>
          </div>
        </div>

        {/* Simplified 2-column layout */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left column: Proved + Lacked stacked */}
          <div className="space-y-2.5">
            <div>
              <div className="text-xs tracking-[0.2em] text-white/45 uppercase mb-1.5 font-medium">
                What {ex.leftTitle.split(' ')[0]} proved
              </div>
              <ul className="space-y-1">
                {ex.leftProved.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-white/70 font-light leading-normal">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#AC0064]/60 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs tracking-[0.2em] text-white/45 uppercase mb-1.5 font-medium">
                What it lacked
              </div>
              <ul className="space-y-1">
                {ex.leftLacked.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-white/60 font-light leading-normal">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: Why Won (full width) */}
          <div>
            <div className="text-xs tracking-[0.2em] text-[#AC0064]/80 uppercase mb-1.5 font-medium">
              Why {ex.rightTitle} won
            </div>
            <ul className="space-y-1 mb-3">
              {ex.rightWon.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/75 font-light leading-normal">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#AC0064]/80 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {ex.note && (
              <div
                className={
                  isTwitchExample
                    ? 'mt-3 p-2 rounded-lg bg-gradient-to-r from-[#E85A24]/15 to-[#FF8C42]/10 border border-[#FF8C42]/25'
                    : 'mt-3 pt-2 border-t border-white/[0.08]'
                }
              >
                <p
                  className={
                    isTwitchExample
                      ? 'text-[11px] text-white/80 font-light italic leading-normal'
                      : 'text-[11px] text-white/50 font-light italic leading-normal'
                  }
                >
                  {ex.note}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function V2AdjacentIndustriesSlide() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0110] to-[#18021A] py-6">
      {/* Gradient accent */}
      <div
        className="absolute top-1/3 left-1/4 w-[900px] h-[700px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.30) 0%, rgba(100,16,154,0.20) 40%, transparent 70%)',
          filter: 'blur(150px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col h-full justify-center">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">
            Adjacent industry precedents
          </span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Main heading */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-lg md:text-xl font-extralight text-white/90 tracking-wide mb-1.5">
            Every creator platform evolves into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">business platform</span> — or gets displaced
          </h2>
          <p className="text-xs text-white/60 font-light max-w-4xl mx-auto leading-normal">
            When demand is real and margins are high, the winner isn't "more expressive" — it's more structured,
            more intentional, and more monetizable.
          </p>
        </motion.div>

        {/* Vertical stack of cards with optimized spacing */}
        <div className="max-w-5xl mx-auto space-y-3">
          {examples.map((ex, idx) => (
            <ExampleCard key={idx} ex={ex} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
