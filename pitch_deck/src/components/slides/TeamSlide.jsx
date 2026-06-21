import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const team = [
  {
    name: 'Dhruva Kolikineni',
    role: 'Chief Executive Officer',
    bullets: [
      'Graduated Magna Cum Laude, UCSD Machine Learning / AI in 2 years',
      'Ran AI infra consulting firm with multiple six-figure Fortune 500 contracts',
      'Ex-founder, Berkeley SkyDeck 2021 batch',
      'Full-stack developer',
    ],
    photo: '/team/dhruva.jpg',
    photoStyle: { objectPosition: 'center left', transform: 'scale(1.3)' },
    containerStyle: {},
  },
  {
    name: 'Solan Dennis',
    role: 'Chief Strategy Officer',
    bullets: [
      'Top 1% OnlyFans creator',
      'Hottest Studio newcomer nominee',
      'Deep relationships in the space',
      'Robust agency partnerships',
      'Cross-genre domain experience',
    ],
    photo: '/team/solan.jpg',
    photoStyle: { objectPosition: 'top left', transform: 'scale(1.15)' },
    containerStyle: {},
  },
];

export default function TeamSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-16 md:py-20">
      {/* Subtle gradient accent */}
      <div
        className="absolute top-1/2 left-1/4 w-[700px] h-[700px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(77,7,28,0.5) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight leading-relaxed text-white/90 tracking-wide mb-4">
            Why This Team
          </h2>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-3xl mx-auto">
            Deep technical infrastructure plus native access to the agency world. Altyr is built by an operator who
            solved stability at scale and a top creator who opens every agency door.
          </p>
        </motion.div>

        {/* Team members */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.div
                className="relative h-full p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.12)',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="relative">
                  {/* Photo */}
                  <motion.div
                    className="mb-6 w-24 h-32 rounded-xl overflow-hidden border-2 border-[#AC0064]/50 mx-auto bg-white/[0.05] flex items-center justify-center"
                    style={member.containerStyle}
                  >
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        style={member.photoStyle}
                      />
                    ) : (
                      <User className="w-10 h-10 text-[#AC0064]/80" />
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-light text-white/90 mb-1 tracking-wide">{member.name}</h3>
                    <p className="text-sm text-[#AC0064]/80 font-medium mb-5 uppercase tracking-wider">
                      {member.role}
                    </p>
                    <ul className="text-left text-sm md:text-base text-white/55 font-light leading-relaxed space-y-2.5 pl-1">
                      {member.bullets.map((line, i) => (
                        <li key={i} className="flex gap-2.5">
                          <span className="text-[#AC0064]/90 shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#AC0064]/70" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
