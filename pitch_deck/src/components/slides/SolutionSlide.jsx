import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LineChart, Trophy, Target } from 'lucide-react';

const platformPoints = [
  "Built with modern stack for fast uploads and smooth mobile UX",
  "White-glove onboarding: we set up profiles, pricing, and funnels",
  "Done-for-you content migration from existing platforms",
  "Manager-friendly flows for agencies operating multiple creators"
];

const analyticsPoints = [
  "Real-time earnings broken down by content type, campaign, and fan cohort",
  "High-value fan CRM to identify and segment top 1%, 5%, 20% of fans",
  "Offer and campaign builder for promotions and limited-time events",
  "Predictive insights: what to post, when, and to whom"
];

const gamificationPoints = [
  "Progression & XP system: fans level up through engagement and spending",
  "Quests & challenges: time-bound missions that reward participation",
  "Streaks & retention mechanics with soft loss aversion",
  "VIP & tiered status with exclusive perks and recognition",
  "Badges and social proof for top supporters"
];

export default function SolutionSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#18021A] py-20">
      {/* Gradient accents */}
      <div 
        className="absolute top-1/4 left-0 w-[700px] h-[700px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(100,16,154,0.5) 0%, transparent 60%)',
          filter: 'blur(120px)',
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">The Altyr Solution</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Intro */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-2xl md:text-3xl font-extralight leading-relaxed text-white/90 tracking-wide mb-2">
            A creator revenue platform that blends
          </h2>
          <p className="text-lg text-white/60 font-light">
            Modern tech + Creator-grade analytics + Gamified fan journeys
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Left column - Platform & Analytics */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Modern Platform & Onboarding */}
            <div className="relative p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <Sparkles className="w-5 h-5 text-[#AC0064]" />
                </div>
                <h3 className="text-lg font-light text-white/90 tracking-wide">
                  Modern Platform & Onboarding
                </h3>
              </div>
              <ul className="space-y-2">
                {platformPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60 font-light">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#AC0064]/60 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Analytics & Revenue Ops */}
            <div className="relative p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <LineChart className="w-5 h-5 text-[#AC0064]" />
                </div>
                <h3 className="text-lg font-light text-white/90 tracking-wide">
                  Creator-Grade Analytics & Revenue Ops
                </h3>
              </div>
              <ul className="space-y-2">
                {analyticsPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60 font-light">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#AC0064]/60 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right column - Gamification */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <Trophy className="w-5 h-5 text-[#AC0064]" />
                </div>
                <h3 className="text-lg font-light text-white/90 tracking-wide">
                  Gamified Fan Experience
                </h3>
              </div>
              <ul className="space-y-2">
                {gamificationPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60 font-light">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#AC0064]/60 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Key differentiator callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="relative p-6 md:p-8 rounded-xl bg-gradient-to-br from-[#AC0064]/10 to-[#64109A]/10 border-2 border-[#AC0064]/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#AC0064]/5 to-[#64109A]/5 blur-xl" />
            
            <div className="relative flex items-center gap-3 mb-3">
              <Target className="w-6 h-6 text-[#AC0064]" />
              <h3 className="text-xl font-light text-white/90">Key Differentiator</h3>
            </div>
            
            <p className="relative text-base md:text-lg font-extralight text-white/80 leading-relaxed">
              We bring <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">casino-grade and game-grade monetization design</span> into the creator ecosystem—paired with modern creator tooling (CRM, analytics, revenue ops) so the standard 20% commission becomes a justified investment in technology that meaningfully grows creator revenue.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
