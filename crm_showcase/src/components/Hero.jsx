import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Users, TrendingUp, Sparkles, Heart } from 'lucide-react'

export default function Hero({ setActiveSection }) {
  useEffect(() => {
    setActiveSection('hero')
  }, [setActiveSection])

  const scrollToNext = () => {
    document.getElementById('quick-scan')?.scrollIntoView({ behavior: 'smooth' })
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
              <Users className="w-5 h-5" />
              <span className="text-sm tracking-widest uppercase">CRM System & User Profiles</span>
            </div>
          </div>
        </motion.div>

        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-tight leading-[1.3] mb-8 text-white/90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          Relationship Intelligence <span className="text-gradient">for Creators</span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/60 font-light max-w-3xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Quick insights for busy creators. Deep analytics for growing businesses.
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-white/50 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          A relationship-first CRM that helps you understand, segment, and deepen connections with your fans—not just track transactions.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 text-white/70 font-light mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-altyr-magenta" />
            <span>Relationship-first approach</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-altyr-magenta" />
            <span>Predictive analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-altyr-magenta" />
            <span>Gamification integrated</span>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="glass-card glass-card-hover rounded-2xl p-6">
            <h3 className="text-xl font-light text-white/90 mb-2">Quick-Scan Mode</h3>
            <p className="text-white/60 text-sm">
              See your audience at a glance. Know who needs attention. Take action instantly.
            </p>
          </div>
          <div className="glass-card glass-card-hover rounded-2xl p-6">
            <h3 className="text-xl font-light text-white/90 mb-2">Deep Analytics</h3>
            <p className="text-white/60 text-sm">
              Comprehensive insights for teams. Custom segmentation. Predictive intelligence.
            </p>
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
