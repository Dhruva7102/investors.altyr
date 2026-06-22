import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareWarning, FileSpreadsheet, EyeOff } from 'lucide-react';

const broken = [
  {
    icon: FileSpreadsheet,
    title: 'Run on spreadsheets & Telegram',
    description:
      'Agencies manage 150+ creators and their fanbases across spreadsheets, chat apps, and disconnected tools. There is no purpose-built software for the people who actually operate the industry.',
  },
  {
    icon: MessageSquareWarning,
    title: 'Chatters with no oversight',
    description:
      'Revenue depends on chatters building relationships with fans — yet agencies have no live visibility into who performs, no standardized playbooks, and no way to coach at scale.',
  },
  {
    icon: EyeOff,
    title: 'Blind to what drives revenue',
    description:
      'Fan spend is wildly concentrated, but agencies can’t see which fans are whales, which relationships are at risk, or which actions actually grow earnings.',
  },
];

export default function ProblemSlide1() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18021A] to-[#0d0110] py-24">
      {/* Dramatic gradient accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(172,0,100,0.35) 0%, rgba(100,16,154,0.25) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">The Problem</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        {/* Big stat */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white/90 mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] via-[#9B4DCA] to-[#64109A]">
                $5B+ / year
              </span>
            </h2>
            <motion.div
              className="absolute inset-0 -z-10 blur-3xl opacity-40"
              style={{ background: 'linear-gradient(90deg, #AC0064, #9B4DCA, #64109A)' }}
              animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
              transition={{ duration: 3.2, repeat: 1, repeatType: 'mirror', ease: 'easeInOut' }}
            />
          </div>
          <p className="text-xs text-white/40 font-light italic mt-1">
            * paid to creators on OnlyFans annually — the top of it run by agencies on tooling that doesn&apos;t exist as software
            <span className="ml-1 not-italic">(OnlyFans, 2023)</span>
          </p>
        </motion.div>

        {/* Narrative */}
        <motion.div
          className="text-center text-base md:text-lg text-white/60 font-light max-w-4xl mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <p>
            The OnlyFans economy is enormous and growing — and its highest-earning creators are run by
            <span className="text-white/80"> professional agencies</span>. Those agencies are businesses doing millions in
            GMV with no real operating system.
          </p>
        </motion.div>

        {/* Broken-infrastructure cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {broken.map((item, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="h-full p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-300">
                <div className="relative">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                    <item.icon className="w-5 h-5 text-[#AC0064]" />
                  </div>
                  <h3 className="text-lg font-light text-white/90 mb-2 tracking-wide">{item.title}</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
