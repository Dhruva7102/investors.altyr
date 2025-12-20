import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Users, TrendingDown, Scale, Zap } from 'lucide-react';

const risks = [
  {
    icon: Shield,
    title: "Regulatory & Compliance",
    description: "Payment processing, content moderation, and age verification require ongoing compliance investment and may face regulatory changes."
  },
  {
    icon: Users,
    title: "Creator Acquisition",
    description: "Network effects favor established platforms. Success depends on attracting high-value creators who bring their audiences."
  },
  {
    icon: TrendingDown,
    title: "Competition",
    description: "Established players (OnlyFans, Fansly) have significant market share, brand recognition, and resources to compete."
  },
  {
    icon: Zap,
    title: "Payment Processing",
    description: "Payment processors may restrict or terminate services. Chargebacks and fraud require robust risk management."
  },
  {
    icon: Scale,
    title: "Content Moderation",
    description: "Balancing creator freedom with legal compliance and platform safety requires ongoing investment in moderation tools and processes."
  },
  {
    icon: AlertTriangle,
    title: "Platform Scaling",
    description: "Rapid growth could strain infrastructure, support capacity, and operational processes if not managed carefully."
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
            Risks we're <span className="text-white/60">actively managing</span>
          </h2>
          <p className="text-lg text-white/50 font-light max-w-3xl mx-auto">
            We acknowledge these challenges and have strategies to address them
          </p>
        </motion.div>

        {/* Risk cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {risks.map((risk, index) => (
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
              <motion.div 
                className="h-full p-6 rounded-xl bg-white/[0.02] border border-amber-500/20 backdrop-blur-sm cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(245, 158, 11, 0.4)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {/* Subtle hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 50%)',
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative">
                  {/* Icon */}
                  <motion.div 
                    className="mb-4 inline-flex p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <risk.icon className="w-5 h-5 text-amber-400/80" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-light text-white/90 mb-2 tracking-wide group-hover:text-white transition-colors duration-200">
                    {risk.title}
                  </h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed group-hover:text-white/60 transition-colors duration-200">
                    {risk.description}
                  </p>
                </div>
              </motion.div>
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
      </div>
    </section>
  );
}

