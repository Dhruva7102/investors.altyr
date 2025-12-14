import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#18021A]">
        {/* Primary gradient orb - centered, elegant */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(100,16,154,0.25) 0%, rgba(172,0,100,0.12) 35%, transparent 65%)',
            filter: 'blur(100px)'
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />

        {/* Secondary accent - bottom left */}
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(77,7,28,0.4) 0%, transparent 55%)',
            filter: 'blur(80px)'
          }} />

        {/* Tertiary accent - top right */}
        <div
          className="absolute -top-32 -right-32 w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, rgba(100,16,154,0.2) 0%, transparent 55%)',
            filter: 'blur(80px)'
          }} />

        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
          }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo wordmark */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative inline-block">
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[0.12em]"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              <span className="bg-gradient-to-r from-[#9B4DCA] via-[#E85A24] to-[#FF8C42] bg-clip-text text-transparent">
                ALTYR
              </span>
            </h1>
            {/* Glow effect behind text */}
            <motion.div
              className="absolute inset-0 -z-10 blur-3xl opacity-50"
              style={{
                background: 'linear-gradient(90deg, #9B4DCA, #E85A24, #FF8C42)',
              }}
              animate={{
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-tight leading-[1.3] mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-white/90">Altyr, An Exclusive Content platform that finally feels</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 via-[#AC0064] to-[#64109A]">
            …pleasurable
          </span>
        </motion.h2>

        {/* Feature bullets */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center gap-3 text-white/70 font-light">
            <div className="w-1.5 h-1.5 rounded-full bg-[#AC0064]" />
            <span className="text-base md:text-lg">Modern and responsive UX</span>
          </div>
          <div className="flex items-center gap-3 text-white/70 font-light">
            <div className="w-1.5 h-1.5 rounded-full bg-[#AC0064]" />
            <span className="text-base md:text-lg">Extensive Business tooling</span>
          </div>
          <div className="flex items-center gap-3 text-white/70 font-light">
            <div className="w-1.5 h-1.5 rounded-full bg-[#AC0064]" />
            <span className="text-base md:text-lg">Rewarding, gamified fan experiences</span>
          </div>
        </motion.div>

        {/* SAFE callout */}
        <motion.div
          className="inline-block px-8 py-4 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-sm cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ 
            scale: 1.02,
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderColor: 'rgba(255,255,255,0.18)',
            transition: { duration: 0.2 }
          }}
        >
          <p className="text-white/80 text-lg font-light">
            Raising <span className="text-white font-medium">$1,200,000</span> via SAFE
            <span className="text-white/60 text-base ml-2">• Friends & Family Round</span>
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator - bottom center */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        onClick={() => {
          const visionSection = document.getElementById('vision');
          if (visionSection) {
            visionSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}>
        <span className="text-xs text-white/30 tracking-widest uppercase">Explore</span>
        <motion.div
          className="p-2 rounded-full border border-white/10"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

