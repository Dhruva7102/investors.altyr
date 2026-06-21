import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, TrendingUp, Target, Eye, ScanSearch } from 'lucide-react';

const risks = [
  {
    icon: AlertTriangle,
    title: "Platform & OFAPI Dependency",
    mitigation: "Altyr Pro is built on OFAPI and OnlyFans' terms of service. We architect around documented, ToS-compliant flows, keep an abstraction layer so we can swap integration providers, and stay close to OFAPI's roadmap to absorb changes quickly."
  },
  {
    icon: Target,
    title: "Agency Churn & Concentration",
    mitigation: "Early revenue comes from a few large agencies, modeled at 2%/mo churn. We mitigate with deep operational integration (chatters work inside Altyr daily), multi-seat lock-in, and a land-and-expand motion that grows creator count within each agency."
  },
  {
    icon: Shield,
    title: "Payment & Chargeback Risk",
    mitigation: "High-risk MCC category. Modeled at 5.5% processing on whale GMV plus a 1.5% chargeback/fraud reserve. We use high-risk-experienced processors, KYC, and active fraud monitoring, and Altyr (not the creator) bears processing on platform GMV."
  },
  {
    icon: TrendingUp,
    title: "Whale-Penetration Assumption",
    mitigation: "Platform upside depends on whale->Altyr penetration (80% upside / 55% base). We treat this as a model input, not a promise: the SaaS wedge is profitable on its own, and the base-case floor still reaches a ~$16M run-rate at lower penetration."
  },
  {
    icon: ScanSearch,
    title: "Content Moderation & Compliance",
    mitigation: "Adult category requires rigorous moderation. We pair AI and human review with KYC/age-verification from day one and budget content-moderation cost into the model rather than treating it as optional."
  },
  {
    icon: Eye,
    title: "Execution & Stability at Scale",
    mitigation: "Thousands of connected creators and real-time chatter workflows demand reliability. We ship the Pro wedge first (M3), launch Platform only once Pro is stable (~M7), and scale infra per-creator (~$46/mo) so cost tracks usage."
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
