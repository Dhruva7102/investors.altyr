import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Users, Zap, TrendingUp, Award, Star, Sparkles, ExternalLink } from 'lucide-react';
import { SHOWCASE_URLS } from '@/config/showcaseUrls';

export default function AltyrSolutionSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#18021A] py-20">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/4 right-0 w-[600px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(172,0,100,0.4) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Altyr's Solution</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* For creators */}
          <motion.div
            className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-light text-white/90 tracking-wide mb-6 text-center">
              For creators:
            </h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30 flex-shrink-0">
                  <BarChart className="w-4 h-4 text-[#AC0064]" />
                </div>
                <p className="text-sm text-white/70 font-light">Real-time revenue intelligence</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30 flex-shrink-0">
                  <Users className="w-4 h-4 text-[#AC0064]" />
                </div>
                <p className="text-sm text-white/70 font-light">Fan segmentation and CRM</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30 flex-shrink-0">
                  <Zap className="w-4 h-4 text-[#AC0064]" />
                </div>
                <p className="text-sm text-white/70 font-light">Campaigns, offers, and automation</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30 flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-[#AC0064]" />
                </div>
                <p className="text-sm text-white/70 font-light">Predictive guidance on what to post and when</p>
              </li>
            </ul>
            <a 
              href={SHOWCASE_URLS.crm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-[#AC0064]/10 to-[#64109A]/10 border border-[#AC0064]/40 text-sm text-white/80 font-light hover:border-[#AC0064]/70 hover:bg-[#AC0064]/20 transition-all duration-300 group"
            >
              <span>See CRM showcase</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </motion.div>

          {/* For fans */}
          <motion.div
            className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="text-xl font-light text-white/90 tracking-wide mb-6 text-center">
              For fans:
            </h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30 flex-shrink-0">
                  <Award className="w-4 h-4 text-[#AC0064]" />
                </div>
                <p className="text-sm text-white/70 font-light">Progression, status, and recognition</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30 flex-shrink-0">
                  <Star className="w-4 h-4 text-[#AC0064]" />
                </div>
                <p className="text-sm text-white/70 font-light">Clear paths from casual supporter → VIP</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-[#AC0064]" />
                </div>
                <p className="text-sm text-white/70 font-light">Engagement that feels rewarding, not transactional</p>
              </li>
            </ul>
            <a 
              href={SHOWCASE_URLS.gamification}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-[#AC0064]/10 to-[#64109A]/10 border border-[#AC0064]/40 text-sm text-white/80 font-light hover:border-[#AC0064]/70 hover:bg-[#AC0064]/20 transition-all duration-300 group"
            >
              <span>See gamification showcase</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>

        {/* Bottom statement */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <p className="text-base md:text-lg font-extralight text-white/80 leading-relaxed">
              All tied together with a modern platform built for fast uploads, smooth mobile UX, white-glove onboarding, and seamless content migration.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
