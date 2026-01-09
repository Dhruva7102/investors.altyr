import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'

export default function Hero({ setActiveSection }) {
  useEffect(() => {
    setActiveSection('hero')
  }, [setActiveSection])

  const scrollToNext = () => {
    document.getElementById('xp-system')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-altyr-bg">
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
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[0.12em] mb-4">
              <span className="text-gradient-logo">ALTYR</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-altyr-magenta">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm tracking-widest uppercase">Gamification System</span>
            </div>
          </div>
        </motion.div>

        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-tight leading-[1.3] mb-8 text-white/90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          Launch Features & Design Spec
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/60 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          A comprehensive overview of our gamification systems designed to feel natural and familiar, 
          introducing progression early while setting the foundation for future expansion.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 text-white/70 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-altyr-magenta" />
            <span>Global XP System</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-altyr-magenta" />
            <span>Profile Customization</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-altyr-magenta" />
            <span>Badge Collection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-altyr-magenta" />
            <span>Daily Login Rewards</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        onClick={scrollToNext}
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Explore</span>
        <motion.div
          className="p-2 rounded-full border border-white/10"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
