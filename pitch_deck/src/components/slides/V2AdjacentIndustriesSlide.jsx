import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

const examples = [
  {
    leftTitle: 'Myspace',
    rightTitle: 'Facebook',
    leftSubtitle: 'Discovery platform',
    rightSubtitle: 'Structured identity & engagement',
    takeaways: [
      { icon: Sparkles, text: 'Clean UX increased engagement' },
      { icon: Layers, text: 'Identity + graph enabled targeting' },
      { icon: TrendingUp, text: 'Monetization followed engagement' },
    ],
  },
  {
    leftTitle: 'Craigslist',
    rightTitle: 'Airbnb',
    leftSubtitle: 'Listings',
    rightSubtitle: 'Designed marketplace',
    takeaways: [
      { icon: ShieldCheck, text: 'Trust systems increased conversion' },
      { icon: Sparkles, text: 'Design drove usability and purchase intent' },
      { icon: TrendingUp, text: 'Monetization aligned incentives' },
    ],
  },
  {
    leftTitle: 'YouTube (early)',
    rightTitle: 'YouTube (modern)',
    leftSubtitle: 'Hosting',
    rightSubtitle: 'Monetization infrastructure',
    takeaways: [
      { icon: Layers, text: 'Creator Studio + analytics' },
      { icon: TrendingUp, text: 'Revenue predictability' },
      { icon: ShieldCheck, text: 'Business tooling became table stakes' },
    ],
  },
  {
    leftTitle: 'Early video platforms',
    rightTitle: 'Twitch',
    leftSubtitle: 'Entertainment',
    rightSubtitle: 'Live monetization design',
    takeaways: [
      { icon: Layers, text: 'Status, badges, recognition' },
      { icon: TrendingUp, text: 'VIP tiers + soft loss aversion' },
      { icon: Sparkles, text: 'Not better content—better mechanics' },
    ],
  },
  {
    leftTitle: 'Selling online (before)',
    rightTitle: 'Shopify',
    leftSubtitle: 'Websites + plugins',
    rightSubtitle: 'Running a business',
    takeaways: [
      { icon: Layers, text: 'Dashboards, analytics, funnels' },
      { icon: ShieldCheck, text: 'Apps, automation, reliability' },
      { icon: TrendingUp, text: 'Made merchants professional' },
    ],
  },
];

function ExampleCard({ ex, index }) {
  return (
    <motion.div
      className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.08 * index, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 mb-4">
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

        <div className="grid gap-2">
          {ex.takeaways.map((t, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm text-white/60 font-light"
            >
              <div className="mt-0.5 p-1.5 rounded-md bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/25">
                <t.icon className="w-3.5 h-3.5 text-[#AC0064]" />
              </div>
              <div className="leading-relaxed">{t.text}</div>
            </div>
          ))}
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
          <p className="text-base text-white/60 font-light max-w-4xl mx-auto leading-relaxed">
            When demand is real and margins are high, the winner isn’t “more expressive” — it’s more structured,
            more intentional, and more monetizable.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {examples.map((ex, idx) => (
            <ExampleCard key={idx} ex={ex} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

