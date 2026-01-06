import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Shield, Sparkles, Timer, Trophy } from 'lucide-react';

const drivers = [
  {
    icon: HeartHandshake,
    title: 'Connection',
    description:
      'Fans pay for intimacy, attention, and parasocial closeness—not just content.',
  },
  {
    icon: Sparkles,
    title: 'Personalization',
    description:
      'Custom replies, tailored experiences, and “this is for me” moments convert at a premium.',
  },
  {
    icon: Trophy,
    title: 'Status',
    description:
      'Recognition and proximity matter—top supporters want visibility, tiers, and VIP treatment.',
  },
  {
    icon: Timer,
    title: 'Scarcity',
    description:
      'Limited-time drops and exclusive access create urgency and repeatable spend behavior.',
  },
  {
    icon: Shield,
    title: 'Privacy & convenience',
    description:
      'Discreet, frictionless purchasing enables consistent, predictable consumption.',
  },
];

export default function WhyPeopleSpendSlide() {
  return (
    <section className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0110] to-[#18021A] py-20">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] opacity-22"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(172,0,100,0.30) 0%, rgba(100,16,154,0.22) 40%, transparent 70%)',
          filter: 'blur(150px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#64109A]/50" />
          <span className="text-xs tracking-[0.35em] text-[#AC0064]/80 uppercase font-medium">
            Why the market exists
          </span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#64109A]/50" />
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-2xl md:text-3xl font-extralight text-white/90 tracking-wide mb-3">
            People don’t pay for “content.” They pay for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC0064] to-[#64109A]">
              an experience
            </span>
            .
          </h2>
          <p className="text-base text-white/60 font-light max-w-4xl mx-auto leading-relaxed">
            The underlying drivers are consistent and repeatable—when platforms make them visible and easy to activate.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {drivers.map((d, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: idx * 0.08 }}
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-[#AC0064]/20 to-[#64109A]/20 border border-[#AC0064]/30">
                <d.icon className="w-5 h-5 text-[#AC0064]" />
              </div>
              <h3 className="text-lg font-light text-white/90 tracking-wide mb-2">{d.title}</h3>
              <p className="text-sm text-white/55 font-light leading-relaxed">{d.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

