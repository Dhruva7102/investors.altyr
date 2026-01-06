import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const team = [
  {
    name: "Dhruva Kolikineni",
    role: "CEO",
    bio: "Second-time founder and DevOps engineer, ex-Berkeley SkyDeck, experienced in building and operating scalable products. Full-Stack Developer."
  },
  {
    name: "Solan",
    role: "Chief Strategy Officer",
    bio: "Top OnlyFans creator with direct experience of current platform pain points and deep relationships with high-earning creators and agencies."
  }
];

export default function TeamSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-24">
      {/* Subtle gradient accent */}
      <div 
        className="absolute top-1/2 left-1/4 w-[700px] h-[700px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(77,7,28,0.5) 0%, transparent 60%)',
          filter: 'blur(120px)',
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">Team</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Intro */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight leading-relaxed text-white/90 tracking-wide mb-4">
            Why This Team
          </h2>
          <p className="text-lg text-white/50 font-light max-w-3xl mx-auto">
            Platforms fail when built for creators instead of with them. Altyr's founding creators are users, partners, and distribution.
          </p>
        </motion.div>

        {/* Team members */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.div 
                className="relative h-full p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.12)',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="relative">
                  {/* Avatar placeholder */}
                  <motion.div 
                    className="mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#AC0064]/30 to-[#64109A]/30 border-2 border-[#AC0064]/50 flex items-center justify-center mx-auto"
                  >
                    <User className="w-10 h-10 text-[#AC0064]/80" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-light text-white/90 mb-1 tracking-wide">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[#AC0064]/80 font-medium mb-4 uppercase tracking-wider">
                      {member.role}
                    </p>
                    <p className="text-sm text-white/50 font-light leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="inline-block px-8 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <p className="text-white/70 font-light italic">
              Technical execution + creator credibility is the minimum bar—not a nice-to-have—in this category.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
