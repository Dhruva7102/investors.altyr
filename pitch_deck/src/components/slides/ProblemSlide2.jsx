import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Gem, ArrowRight } from 'lucide-react';

const products = [
  {
    icon: LayoutGrid,
    tag: 'Product 1 · The wedge',
    name: 'Altyr Pro',
    sub: 'The operating system for agencies',
    points: [
      'CRM + chatter management built on OFAPI',
      'Live performance visibility & AI coaching',
      'Fan tiers from new sub → whale',
    ],
    pricing: '$250 / connected creator / month',
    accent: '#AC0064',
  },
  {
    icon: Gem,
    tag: 'Product 2 · The upside',
    name: 'Altyr Platform',
    sub: 'Premium destination for whales',
    points: [
      'Launches after Pro establishes the relationship',
      'Monetizes the highest-value fans',
      'Creator keeps 80%; Altyr bears processing',
    ],
    pricing: '20% commission on whale GMV',
    accent: '#FF8C42',
  },
];

export default function ProblemSlide2() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0110] to-[#18021A] py-16 md:py-20">
      <div
        className="absolute top-1/3 left-0 w-[600px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(100,16,154,0.5) 0%, transparent 60%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">One Company, Two Products</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide mb-4">
            Sell the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">infrastructure</span>.
            {' '}Own the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E85A24] to-[#FF8C42] font-light">monetization</span>.
          </h2>
          <p className="text-base md:text-lg text-white/55 font-light max-w-3xl mx-auto leading-relaxed">
            Two products, staggered — the same agencies, the same creators, the same fans.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
          {products.map((p, index) => (
            <motion.div
              key={p.name}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="h-full p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-500">
                <div
                  className="mb-4 inline-flex p-3 rounded-lg border"
                  style={{ background: `${p.accent}22`, borderColor: `${p.accent}55` }}
                >
                  <p.icon className="w-5 h-5" style={{ color: p.accent }} />
                </div>
                <div className="text-[11px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: `${p.accent}cc` }}>
                  {p.tag}
                </div>
                <h3 className="text-2xl font-light text-white/90 tracking-wide">{p.name}</h3>
                <p className="text-sm text-white/50 font-light mb-5">{p.sub}</p>
                <ul className="space-y-2.5 mb-6">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm text-white/65 font-light leading-snug">
                      <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.accent }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div
                  className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium border"
                  style={{ background: `${p.accent}1a`, borderColor: `${p.accent}40`, color: '#fff' }}
                >
                  {p.pricing}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flow note */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-10 text-white/50 font-light text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-white/70">Altyr Pro lands the account</span>
          <ArrowRight className="w-4 h-4 text-[#AC0064]" />
          <span className="text-white/70">the platform monetizes the whales it reveals</span>
        </motion.div>
      </div>
    </section>
  );
}
