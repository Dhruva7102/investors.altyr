import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LineChart, Trophy, Target } from 'lucide-react';

const solutions = [
  {
    icon: Sparkles,
    title: "Modern Platform & Onboarding",
    points: [
      "Built with modern stack for fast uploads and smooth mobile UX",
      "White-glove onboarding: we set up profiles, pricing, and funnels",
      "Done-for-you content migration from existing platforms",
      "Manager-friendly flows for agencies operating multiple creators"
    ]
  },
  {
    icon: LineChart,
    title: "Creator-Grade Analytics & Revenue Ops",
    points: [
      "Real-time earnings broken down by content type, campaign, and fan cohort",
      "High-value fan CRM to identify and segment top 1%, 5%, 20% of fans",
      "Offer and campaign builder for promotions and limited-time events",
      "Predictive insights: what to post, when, and to whom"
    ]
  },
  {
    icon: Trophy,
    title: "Gamified Fan Experience",
    points: [
      "Progression & XP system: fans level up through engagement and spending",
      "Quests & challenges: time-bound missions that reward participation",
      "Streaks & retention mechanics with soft loss aversion",
      "VIP & tiered status with exclusive perks and recognition",
      "Badges and social proof for top supporters"
    ]
  }
];

export default function Solution() {
  return (
    <section id="solution" className="relative py-24 md:py-32">
      {/* Gradient accents */}
      <div 
        className="absolute top-1/4 left-0 w-[700px] h-[700px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(100,16,154,0.5) 0%, transparent 60%)',
          filter: 'blur(120px)',
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">The Altyr Solution</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Intro */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight leading-relaxed text-white/90 tracking-wide mb-4">
            A creator revenue platform that blends
          </h2>
          <p className="text-xl text-white/60 font-light">
            Modern tech + Creator-grade analytics + Gamified fan journeys
          </p>
        </motion.div>

        {/* Solution sections */}
        <div className="space-y-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ 
                duration: 0.9, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                    <solution.icon className="w-6 h-6 text-[#AC0064]" />
                  </div>
                  <h3 className="text-2xl font-light text-white/90 tracking-wide">
                    {solution.title}
                  </h3>
                </div>

                {/* Points */}
                <ul className="space-y-3 ml-2">
                  {solution.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 font-light">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#AC0064]/60 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key differentiator callout */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#AC0064]/10 to-[#64109A]/10 border-2 border-[#AC0064]/30 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#AC0064]/5 to-[#64109A]/5 blur-xl" />
            
            <div className="relative flex items-center gap-4 mb-4">
              <Target className="w-8 h-8 text-[#AC0064]" />
              <h3 className="text-2xl font-light text-white/90">Key Differentiator</h3>
            </div>
            
            <p className="relative text-xl md:text-2xl font-extralight text-white/80 leading-relaxed">
              We bring <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">casino-grade and game-grade monetization design</span> into the creator ecosystem—turning the standard 20% commission into a justified investment in technology that meaningfully grows creator revenue.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

