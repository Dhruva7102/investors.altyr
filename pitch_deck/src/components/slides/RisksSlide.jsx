import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, TrendingUp, Users, Target, Eye } from 'lucide-react';

const risks = [
  {
    icon: AlertTriangle,
    title: "Regulatory Uncertainty",
    mitigation: "Working with legal and risk advisors from day one. Focused on compliance from the start, modeling after established platforms."
  },
  {
    icon: Shield,
    title: "Payment Processing Challenges",
    mitigation: "Partnering with payment providers experienced in high-risk verticals. Exploring multiple redundant solutions."
  },
  {
    icon: TrendingUp,
    title: "Creator Retention & Competition",
    mitigation: "Deeply integrating creator feedback into the product roadmap and offering exclusive tools and insights they can't get elsewhere."
  },
  {
    icon: Users,
    title: "Male Skewed Gender Imbalance",
    mitigation: "We recognise our most network is most powerful in Gay Male space. We are pursuing every venue to diversify into female creators"
  },
  {
    icon: Target,
    title: "Reputational Challenges",
    mitigation: "Building with transparency, strong moderation policies, and partnerships to manage brand and perception from the outset."
  },
  {
    icon: Eye,
    title: "Incumbents Copy Gamification Features",
    mitigation: "Our edge is the entire package—modern UX, deep creator tooling, and fast iteration—not any single feature."
  }
];

export default function RisksSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-20">
      {/* Gradient accent */}
      <div 
        className="absolute top-1/3 right-1/4 w-[700px] h-[700px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(77,7,28,0.6) 0%, transparent 60%)',
          filter: 'blur(80px)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Risks & Mitigations</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Intro */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-2xl md:text-3xl font-extralight leading-relaxed text-white/90 tracking-wide">
            We're <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">transparent</span> about the challenges
          </h2>
        </motion.div>

        {/* Risk cards - 3 column grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {risks.map((risk, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative h-full p-5 rounded-xl bg-white/[0.02] border border-orange-500/20 hover:bg-white/[0.03] hover:border-orange-500/30 transition-all duration-500">
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4 inline-flex p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <risk.icon className="w-4 h-4 text-orange-400/80" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-base font-light text-white/90 mb-2 tracking-wide">
                    {risk.title}
                  </h3>
                  
                  <div className="pt-2 border-t border-white/[0.08]">
                    <div className="text-xs tracking-[0.2em] text-white/45 uppercase mb-1.5">
                      Mitigation
                    </div>
                    <p className="text-xs text-white/60 font-light leading-relaxed">
                      {risk.mitigation}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="max-w-4xl mx-auto p-6 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <p className="text-base md:text-lg font-extralight text-white/80 leading-relaxed italic">
              We acknowledge the challenges and have structured the business to tackle them systematically—starting small, shipping fast, and iterating with real creator feedback.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
