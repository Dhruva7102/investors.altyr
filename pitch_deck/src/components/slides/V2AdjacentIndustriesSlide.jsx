import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const examples = [
  {
    leftTitle: 'Craigslist',
    rightTitle: 'Airbnb',
    leftSubtitle: 'Listings',
    rightSubtitle: 'Designed marketplace',
    leftProved: [
      'Peer-to-peer commerce works',
      'Supply creates its own demand',
    ],
    leftLacked: [
      'Trust systems',
      'UX',
      'Monetization',
      'Optimization',
    ],
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
    leftProved: [
      'Upload videos',
      'Get views',
    ],
    leftLacked: [
      'No income clarity',
    ],
    rightWon: [
      'Analytics',
      'Creator Studio',
      'Monetization tools',
      'Revenue predictability',
    ],
    note: null,
  },
  {
    leftTitle: 'Early video platforms',
    rightTitle: 'Twitch',
    leftSubtitle: 'Entertainment',
    rightSubtitle: 'Live monetization design',
    leftProved: [
      'Entertainment at scale',
      'Creator communities form',
    ],
    leftLacked: [
      'No designed monetization mechanics',
      'No progression, status, or recognition loops',
    ],
    rightWon: [
      'Subscriptions',
      'Bits',
      'Badges',
      'Status',
      'Parasocial incentives',
    ],
    note: 'Not better content—better monetization mechanics. This is one of the closest parallels to Altyr: Status, Progression, Recognition, Soft loss aversion. Adult platforms never adopted this playbook.',
  },
  {
    leftTitle: 'Selling online (before)',
    rightTitle: 'Shopify',
    leftSubtitle: 'Websites + plugins',
    rightSubtitle: 'Small Business Enablement',
    leftProved: [
      'Merchants want to sell online',
      'Demand exists, but tooling was fragmented',
    ],
    leftLacked: [
      'Websites',
      'Payments',
      'Plugins',
      'Chaos',
    ],
    rightWon: [
      'Dashboards',
      'Analytics',
      'Funnels',
      'Apps',
      'Automation',
    ],
    note: null,
  },
];

function ExampleCard({ ex, index }) {
  const isTwitchExample = ex.rightTitle === 'Twitch';
  const leftProved = ex.leftProved ?? [];
  const leftLacked = ex.leftLacked ?? [];
  const rightWon = ex.rightWon ?? [];

  return (
    <motion.div
      className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.08 * index, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="min-w-0">
            <div className="text-lg md:text-xl font-light text-white/90 tracking-wide truncate">
              {ex.leftTitle}
            </div>
            <div className="text-xs text-white/45 font-light truncate">{ex.leftSubtitle}</div>
          </div>

          <div className="flex items-center gap-2 text-white/40 flex-shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>

          <div className="min-w-0 text-right">
            <div className="text-lg md:text-xl font-light text-white/90 tracking-wide truncate">
              {ex.rightTitle}
            </div>
            <div className="text-xs text-white/45 font-light truncate">{ex.rightSubtitle}</div>
          </div>
        </div>

        {/* Two-column layout: left = context, right = why winner won */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            {/* What [left] proved */}
            <div className="mb-4">
              <div className="text-xs tracking-[0.22em] text-white/45 uppercase mb-1.5">
                What {ex.leftTitle} proved
              </div>
              {leftProved.length > 0 ? (
                <ul className="space-y-1">
                  {leftProved.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60 font-light">
                      <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-white/35 font-light">—</div>
              )}
            </div>

            {/* What [left] lacked */}
            <div className="mb-2">
              <div className="text-xs tracking-[0.22em] text-white/45 uppercase mb-1.5">
                What it lacked
              </div>
              {leftLacked.length > 0 ? (
                <ul className="space-y-1">
                  {leftLacked.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60 font-light">
                      <span className="mt-1 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-white/35 font-light">—</div>
              )}
            </div>
          </div>

          <div>
            {/* Why [right] won (moved to right column) */}
            <div className="mb-3">
              <div className="text-xs tracking-[0.22em] text-[#AC0064]/80 uppercase mb-1.5">
                Why {ex.rightTitle} won
              </div>
              {rightWon.length > 0 ? (
                <ul className="space-y-1">
                  {rightWon.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70 font-light">
                      <span className="mt-1 w-1 h-1 rounded-full bg-[#AC0064]/60 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-white/35 font-light">—</div>
              )}
            </div>

            {/* Note (highlight Twitch note) */}
            {ex.note && (
              <div
                className={
                  isTwitchExample
                    ? 'mt-3 p-3 rounded-xl bg-gradient-to-r from-[#E85A24]/15 to-[#FF8C42]/10 border border-[#FF8C42]/25'
                    : 'mt-3 pt-3 border-t border-white/[0.08]'
                }
              >
                <p
                  className={
                    isTwitchExample
                      ? 'text-xs text-white/80 font-light italic leading-relaxed'
                      : 'text-xs text-white/50 font-light italic leading-relaxed'
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
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0110] to-[#18021A] py-20">
      <div
        className="absolute top-1/3 left-1/4 w-[900px] h-[700px] opacity-18"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.30) 0%, rgba(100,16,154,0.20) 40%, transparent 70%)',
          filter: 'blur(150px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
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

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-2xl md:text-3xl font-extralight text-white/90 tracking-wide mb-3">
            Every creator platform evolves into a business platform — or gets displaced
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {examples.map((ex, idx) => (
            <ExampleCard key={idx} ex={ex} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
