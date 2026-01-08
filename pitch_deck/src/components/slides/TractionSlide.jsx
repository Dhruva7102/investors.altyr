import React from 'react';
import { motion } from 'framer-motion';
import { Users, Scale, Code, CheckCircle2, MessageSquare, UserCheck } from 'lucide-react';

// Format follower count utility
function formatFollowerCount(count) {
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
}

// Metrics - these would ideally come from API/data
const metrics = {
  totalCreators: 15, // From investor site data
  totalFollowers: 12000000, // Approximate from sample data
};

const tractionPoints = [
  {
    icon: UserCheck,
    title: 'Industry Legends',
    description: 'Working with legends in the space like Max Konnor',
  },
  {
    icon: Scale,
    title: 'Legal Team',
    description: 'Legal team on board',
  },
  {
    icon: Code,
    title: 'Full Stack Team',
    description: 'Full stack development team',
  },
  {
    icon: CheckCircle2,
    title: 'Product Progress',
    description: 'Product 80% completed',
  },
  {
    icon: MessageSquare,
    title: 'Customer Discovery',
    description: 'Extensive customer discovery with both creators and users',
  },
  {
    icon: Users,
    title: 'Beta Testers',
    description: 'List of beta testers ready',
  },
];

export default function TractionSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-24">
      {/* Gradient accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.30) 0%, rgba(100,16,154,0.20) 40%, transparent 70%)',
          filter: 'blur(150px)',
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Traction</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Main heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-2xl md:text-3xl font-extralight text-white/90 tracking-wide mb-3">
            Building with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">Momentum</span>
          </h2>
          <p className="text-base text-white/60 font-light max-w-3xl mx-auto leading-relaxed">
            Early traction demonstrates market validation and execution capability
          </p>
        </motion.div>

        {/* Metrics Section */}
        <motion.div
          className="flex items-center justify-center gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {/* Total Creators */}
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-light mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]">
                {metrics.totalCreators}
              </span>
            </div>
            <div className="text-sm md:text-base text-white/50 font-light">
              Creators
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />

          {/* Total Followers */}
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-light mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]">
                {formatFollowerCount(metrics.totalFollowers)}
              </span>
            </div>
            <div className="text-sm md:text-base text-white/50 font-light">
              Total Followers
            </div>
          </div>
        </motion.div>

        {/* Traction Cards - 2x3 grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tractionPoints.map((point, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1 + 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative h-full p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300">
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                  <point.icon className="w-5 h-5 text-[#AC0064]" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-light text-white/90 mb-2 tracking-wide">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A] font-light">{point.title}</span>
                </h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
