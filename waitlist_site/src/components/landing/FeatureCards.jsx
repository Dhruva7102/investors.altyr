import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Zap, 
  Play, 
  Award, 
  Upload, 
  MessageSquare 
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Lower Fees, Faster Payouts",
    description: "Keep more of what you earn with competitive rates and near-instant settlement."
  },
  {
    icon: Users,
    title: "Integrated Creator CRM",
    description: "Manage your audience, segment fans, track purchases, and automate outreach."
  },
  {
    icon: Play,
    title: "Premium Streaming Quality",
    description: "True HD playback with instant loading and buttery-smooth navigation."
  },
  {
    icon: Award,
    title: "Fan Loyalty System",
    description: "Build deeper connections with levels, rewards, streaks, and exclusive perks."
  },
  {
    icon: Upload,
    title: "Optimized Upload Pipeline",
    description: "2-3× faster transcoding with sharper quality and premium delivery."
  },
  {
    icon: MessageSquare,
    title: "Modern Messaging",
    description: "Real-time chat, scheduled drops, and seamless fan interactions."
  }
];

export default function FeatureCards() {
  return (
    <section className="relative py-16 md:py-20">
      {/* Background accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse, rgba(100,16,154,0.2) 0%, transparent 55%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight mb-5">
            Core{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFAA34] to-[#B56A00]">
              Advantages
            </span>
          </h2>
          <p className="text-white/40 text-base md:text-lg font-light max-w-md mx-auto tracking-wide">
            Every feature designed with precision, built for performance.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative h-full p-7 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.08] hover:shadow-[0_8px_40px_rgba(100,16,154,0.08)]">
                {/* Hover glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(100,16,154,0.08) 0%, transparent 50%)',
                  }}
                />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-5 inline-flex p-3 rounded-xl bg-gradient-to-br from-[#64109A]/15 to-[#AC0064]/10 border border-[#64109A]/15 group-hover:border-[#64109A]/25 transition-colors duration-500">
                    <feature.icon className="w-5 h-5 text-[#AC0064]/80 group-hover:text-[#AC0064] transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-light mb-2.5 text-white/90 tracking-wide">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/40 font-light leading-relaxed text-[15px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}