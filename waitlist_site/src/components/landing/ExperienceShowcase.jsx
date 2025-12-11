import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, MessageCircle, Crown, Gift, Play } from 'lucide-react';

const showcaseItems = [
  {
    title: "Creator Dashboard",
    description: "Analytics at a glance",
    gradient: "from-[#64109A]/40 to-[#AC0064]/20",
    icon: BarChart3,
    accentColor: "#AC0064"
  },
  {
    title: "Messaging",
    description: "Real-time conversations",
    gradient: "from-[#AC0064]/40 to-[#4D071C]/20",
    icon: MessageCircle,
    accentColor: "#AC0064"
  },
  {
    title: "Subscription Page",
    description: "Premium presentation",
    gradient: "from-[#4D071C]/40 to-[#64109A]/20",
    icon: Crown,
    accentColor: "#64109A"
  },
  {
    title: "Loyalty Rewards",
    description: "Gamified engagement",
    gradient: "from-[#B56A00]/30 to-[#FFAA34]/15",
    icon: Gift,
    accentColor: "#FFAA34"
  },
  {
    title: "Video Player",
    description: "True HD streaming",
    gradient: "from-[#64109A]/40 to-[#18021A]/40",
    icon: Play,
    accentColor: "#64109A"
  }
];

export default function ExperienceShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);

  return (
    <section ref={containerRef} className="relative py-16 md:py-20 overflow-hidden">
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 mb-16 md:mb-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64109A] via-[#AC0064] to-[#FFAA34]">
              ALTYR
            </span>
            {' '}Experience
          </h2>
          <p className="text-white/40 text-base md:text-lg font-light max-w-md mx-auto tracking-wide">
            Every detail crafted for premium performance.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll showcase */}
      <motion.div 
        className="flex gap-6 md:gap-8 pl-6 md:pl-[8%]"
        style={{ x }}
      >
        {showcaseItems.map((item, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-[280px] md:w-[360px] h-[380px] md:h-[460px] relative group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden relative border border-white/[0.06] transition-all duration-500 group-hover:border-white/[0.12] group-hover:shadow-[0_20px_60px_rgba(100,16,154,0.1)]">
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
              
              {/* Glass effect */}
              <div className="absolute inset-0 bg-[#18021A]/60 backdrop-blur-sm" />
              
              {/* Animated orb */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-50"
                style={{
                  background: item.gradient.includes('B56A00') 
                    ? 'radial-gradient(circle, rgba(181,106,0,0.3) 0%, transparent 60%)'
                    : 'radial-gradient(circle, rgba(100,16,154,0.3) 0%, transparent 60%)',
                  filter: 'blur(30px)',
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div 
                  className="relative p-6 md:p-8 rounded-2xl border border-white/[0.08] backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${item.accentColor}15 0%, transparent 60%)`,
                  }}
                >
                  <item.icon 
                    className="w-10 h-10 md:w-14 md:h-14 transition-transform duration-500 group-hover:scale-110" 
                    style={{ color: item.accentColor }}
                    strokeWidth={1.2}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
                <span className="text-white/30 text-xs tracking-widest uppercase mb-2">{item.description}</span>
                <h3 className="text-xl md:text-2xl font-light text-white/90 tracking-wide">{item.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Fade edges */}
      <div className="absolute top-0 left-0 w-24 md:w-40 h-full bg-gradient-to-r from-[#18021A] to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-24 md:w-40 h-full bg-gradient-to-l from-[#18021A] to-transparent pointer-events-none z-10" />
    </section>
  );
}