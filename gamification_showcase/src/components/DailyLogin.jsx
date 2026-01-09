import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flame, Calendar, Gift, Shield } from 'lucide-react'

export default function DailyLogin({ setActiveSection }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('daily-login')
          }
        })
      },
      { threshold: 0.3 }
    )
    const element = document.getElementById('daily-login')
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [setActiveSection])

  const streakDays = [
    { day: 1, xp: 50, bonus: null },
    { day: 2, xp: 75, bonus: null },
    { day: 3, xp: 100, bonus: null },
    { day: 4, xp: 125, bonus: null },
    { day: 5, xp: 150, bonus: 'Profile Accent Color' },
    { day: 6, xp: 175, bonus: null },
    { day: 7, xp: 200, bonus: 'Weekly Bonus Badge' },
  ]

  return (
    <section id="daily-login" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-altyr-bg to-altyr-bg-dark" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-altyr-purple/50" />
            <span className="text-xs tracking-[0.35em] text-altyr-magenta/80 uppercase font-medium">Daily Login Rewards</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-altyr-purple/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 mb-4">
            Streak <span className="text-gradient">System</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
            Daily rewards that build habits and keep fans coming back
          </p>
        </motion.div>

        {/* Streak Calendar */}
        <motion.div
          className="glass-card rounded-2xl p-8 md:p-12 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Flame className="w-6 h-6 text-altyr-orange" />
            <h3 className="text-2xl font-light text-white/90">7-Day Streak Rewards</h3>
          </div>
          
          <div className="grid grid-cols-7 gap-4 max-w-4xl mx-auto">
            {streakDays.map((day, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className={`glass-card rounded-xl p-4 mb-2 ${index < 7 ? 'border-altyr-orange/50' : ''}`}>
                  <div className="text-2xl font-semibold text-gradient mb-1">Day {day.day}</div>
                  <div className="text-lg text-white/70 mb-1">+{day.xp} XP</div>
                  {day.bonus && (
                    <div className="text-xs text-altyr-orange/80 mt-2">
                      <Gift className="w-3 h-3 inline mr-1" />
                      {day.bonus}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Streak Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            className="glass-card glass-card-hover rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-altyr-orange/20 border border-altyr-orange/30">
                <Flame className="w-5 h-5 text-altyr-orange" />
              </div>
              <h4 className="text-lg font-light text-white/90">Streak Multiplier</h4>
            </div>
            <p className="text-white/60 text-sm">
              Day 8+: 200 XP + streak multiplier (1.1x to 2x at 30 days)
            </p>
          </motion.div>

          <motion.div
            className="glass-card glass-card-hover rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-altyr-purple/20 border border-altyr-purple/30">
                <Shield className="w-5 h-5 text-altyr-purple-light" />
              </div>
              <h4 className="text-lg font-light text-white/90">Streak Protection</h4>
            </div>
            <p className="text-white/60 text-sm">
              24-hour grace period + 1 streak freeze per month
            </p>
          </motion.div>

          <motion.div
            className="glass-card glass-card-hover rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-altyr-magenta/20 border border-altyr-magenta/30">
                <Calendar className="w-5 h-5 text-altyr-magenta" />
              </div>
              <h4 className="text-lg font-light text-white/90">Monthly Milestones</h4>
            </div>
            <p className="text-white/60 text-sm">
              Special badges for 7, 14, and 30-day streaks
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
