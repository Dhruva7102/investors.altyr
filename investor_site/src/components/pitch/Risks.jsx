import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Zap, Users, TrendingDown, Shield, AlertTriangle, ArrowRight } from 'lucide-react';
import CompetitiveLandscape from './CompetitiveLandscape';

const risks = [
  {
    icon: Scale,
    risk: "Legal & Regulatory",
    riskDescription: "Payment processing, content moderation, and age verification require ongoing compliance investment and may face regulatory changes.",
    mitigation: "We have legal counsel from day one, ensuring proactive compliance and risk management."
  },
  {
    icon: Zap,
    risk: "Platform Scaling",
    riskDescription: "Handling scaling content delivery systems is a strain on infrastructure as users grow.",
    mitigation: "We are building with scale in mind and are budgeting for bursts in infrastructure costs as users grow."
  },
  {
    icon: Shield,
    risk: "Payment Processors",
    riskDescription: "Payment processors may restrict or terminate services. Chargebacks and fraud require robust risk management.",
    mitigation: "We choose an adult-content-friendly payment processor. We are investigating ways to minimize chargebacks."
  },
  {
    icon: Users,
    risk: "Creator Acquisition",
    riskDescription: "Network effects favor established platforms. Success depends on attracting high-value creators who bring their audiences.",
    mitigation: "Our Inner Circle strategy focuses on high-touch onboarding of top creators, with direct founder relationships and white-glove service."
  },
  {
    icon: TrendingDown,
    risk: "Competition",
    riskDescription: "Established players (OnlyFans, Fansly) have significant market share, brand recognition, and resources to compete.",
    mitigation: "We differentiate through superior UX, creator-grade analytics/CRM tools, and gamified fan experiences that drive higher LTV."
  },
  {
    icon: AlertTriangle,
    risk: "Content Moderation",
    riskDescription: "Balancing creator freedom with legal compliance and platform safety requires ongoing investment in moderation tools and processes.",
    mitigation: "We're investing in automated moderation tools from day one and building clear policies with legal oversight."
  }
];

export default function Risks() {
  return (
    <section id="risks" className="relative py-24 md:py-32 bg-gradient-to-b from-[#0d0110] to-[#18021A] overflow-visible">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.3) 0%, rgba(100,16,154,0.2) 40%, transparent 70%)',
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
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Key Risks</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Intro text */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight leading-relaxed text-white/90 tracking-wide mb-4">
            Risks and <span className="text-white/60">our mitigations</span>
          </h2>
          <p className="text-lg text-white/50 font-light max-w-3xl mx-auto">
            We acknowledge these challenges and have concrete strategies to address them
          </p>
        </motion.div>

        {/* Risk → Mitigation cards */}
        <div className="space-y-6 mb-12">
          {risks.map((item, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  {/* Risk Section */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <item.icon className="w-4 h-4 text-amber-400/80" />
                      </div>
                      <h3 className="text-lg font-light text-white/90 tracking-wide">
                        {item.risk}
                      </h3>
                    </div>
                    <p className="text-sm text-white/50 font-light leading-relaxed">
                      {item.riskDescription}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <motion.div
                      className="p-2 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5 text-[#AC0064] md:block hidden" />
                      <ArrowRight className="w-5 h-5 text-[#AC0064] md:hidden rotate-90" />
                    </motion.div>
                  </div>

                  {/* Mitigation Section */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                        <Shield className="w-4 h-4 text-green-400/80" />
                      </div>
                      <h3 className="text-lg font-light text-white/90 tracking-wide">
                        Mitigation
                      </h3>
                    </div>
                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      {item.mitigation}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.1]">
            <p className="text-lg md:text-xl font-extralight text-white/70 leading-relaxed">
              We're building with these risks in mind—allocating resources to compliance, payment infrastructure, and creator acquisition from day one.
            </p>
          </div>
        </motion.div>

        {/* Competitive Landscape Section */}
        <div className="mt-20">
          <CompetitiveLandscape />
        </div>
      </div>
    </section>
  );
}
