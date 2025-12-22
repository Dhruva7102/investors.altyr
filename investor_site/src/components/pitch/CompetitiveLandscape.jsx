import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp } from 'lucide-react';

const competitors = [
  {
    name: "OnlyFans",
    url: "https://onlyfans.com",
    tagline: "The market leader with ~80% share",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30"
  },
  {
    name: "Fansly",
    url: "https://fansly.com",
    tagline: "Multi-tier subscription model",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30"
  },
  {
    name: "JustForFans",
    url: "https://justfor.fans",
    tagline: "LGBTQ+ focused community",
    color: "from-pink-500/20 to-red-500/20",
    borderColor: "border-pink-500/30"
  },
  {
    name: "ManyVids",
    url: "https://manyvids.com",
    tagline: "Video marketplace model",
    color: "from-red-500/20 to-orange-500/20",
    borderColor: "border-red-500/30"
  },
  {
    name: "FanCentro",
    url: "https://fancentro.com",
    tagline: "Premium social feed access",
    color: "from-orange-500/20 to-yellow-500/20",
    borderColor: "border-orange-500/30"
  },
  {
    name: "Fanvue",
    url: "https://fanvue.com",
    tagline: "UK-based OF alternative",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30"
  },
  {
    name: "LoyalFans",
    url: "https://loyalfans.com",
    tagline: "Live streaming focus",
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-500/30"
  },
  {
    name: "AVN Stars",
    url: "https://stars.avn.com",
    tagline: "Backed by AVN Media",
    color: "from-indigo-500/20 to-purple-500/20",
    borderColor: "border-indigo-500/30"
  },
  {
    name: "Clips4Sale",
    url: "https://clips4sale.com",
    tagline: "Clip store marketplace",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30"
  },
  {
    name: "IsMyGirl",
    url: "https://ismygirl.com",
    tagline: "Mobile-first platform",
    color: "from-fuchsia-500/20 to-pink-500/20",
    borderColor: "border-fuchsia-500/30"
  },
  {
    name: "Unfiltrd",
    url: "https://unfiltrd.com",
    tagline: "Uncensored content focus",
    color: "from-rose-500/20 to-red-500/20",
    borderColor: "border-rose-500/30"
  },
  {
    name: "Patreon",
    url: "https://patreon.com",
    tagline: "General creators + adult",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30"
  }
];

export default function CompetitiveLandscape() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <TrendingUp className="w-5 h-5 text-[#AC0064]/60" />
            <h3 className="text-2xl md:text-3xl font-extralight text-white/90 tracking-wide">
              Competitive <span className="text-white/60">Landscape</span>
            </h3>
          </div>
          <p className="text-base text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
            The market is crowded with platforms offering similar features. Most struggle with poor UX, 
            limited creator tools, and basic fan engagement—opportunities for us to excel.
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0d0110] to-transparent z-10 pointer-events-none" />
          
          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0d0110] to-transparent z-10 pointer-events-none" />
          
          {/* Scrollable competitors */}
          <div className="overflow-x-auto scrollbar-hide px-6">
            <motion.div 
              className="flex gap-4 pb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {competitors.map((competitor, index) => (
                <motion.a
                  key={competitor.name}
                  href={competitor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-shrink-0 w-64"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <div className="relative h-full p-5 rounded-xl border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300">
                    {/* External Link Icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-3.5 h-3.5 text-white/40" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <h4 className="text-lg font-medium text-white/90 mb-2 group-hover:text-white transition-colors pr-6">
                        {competitor.name}
                      </h4>
                      <p className="text-sm text-white/50 font-light leading-relaxed">
                        {competitor.tagline}
                      </p>
                    </div>

                    {/* Subtle gradient accent */}
                    <div 
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${competitor.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                      style={{ mixBlendMode: 'screen' }}
                    />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          className="text-center mt-8 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <p className="text-sm md:text-base font-light text-white/60 leading-relaxed max-w-3xl mx-auto">
            <span className="text-[#AC0064]/80 font-normal">The opportunity:</span> While competitors are established, 
            their platforms are dated, clunky, and lack the sophisticated tools creators need to maximize revenue.
            We're building the platform creators <em className="text-white/70">wish</em> existed.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

