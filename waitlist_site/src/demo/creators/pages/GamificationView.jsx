import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Award, Calendar, Trophy, Eye, MessageSquare, CreditCard, Heart, Users, Star } from 'lucide-react'
import { PageHeader } from '@/components/layout'
import { GlassCard, IconContainer, StatusBadge } from '@/components/shared'
import { xpSources, levelRewards, badgeCategories, dailyLoginRewards, currentStreak, demoFanProfile } from '@/data/mockGamification'

const iconMap = {
  Zap,
  Eye,
  MessageSquare,
  Heart,
  Star,
  CreditCard,
  Users,
  Award,
}

const rarityColors = {
  bronze: { bg: 'bg-badge-bronze/20', border: 'border-badge-bronze/40', text: 'text-badge-bronze' },
  silver: { bg: 'bg-badge-silver/20', border: 'border-badge-silver/40', text: 'text-badge-silver' },
  gold: { bg: 'bg-badge-gold/20', border: 'border-badge-gold/40', text: 'text-badge-gold' },
  platinum: { bg: 'bg-badge-platinum/20', border: 'border-badge-platinum/40', text: 'text-badge-platinum' },
}

export default function GamificationView() {
  return (
    <div className="space-y-6">
      <PageHeader
        label="Fan Experience"
        title="Gamification System"
        subtitle="Reward fans for engagement. Transform passive consumers into active community members through progression, recognition, and rewards."
      />

      <GlassCard className="bg-gradient-to-r from-altyr-magenta/10 to-altyr-purple/5">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-altyr-magenta to-altyr-purple flex items-center justify-center text-3xl font-light text-white border-4 border-altyr-magenta/50">
              {demoFanProfile.level}
            </div>
            <div className="mt-3 px-3 py-1 rounded-full bg-altyr-bg border border-altyr-magenta/50 whitespace-nowrap">
              <span className="text-xs text-altyr-magenta font-medium whitespace-nowrap">Level {demoFanProfile.level}</span>
            </div>
          </div>

          <div className="flex-1 w-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
              <span className="text-sm text-white/60">Progress to Level {demoFanProfile.level + 1}</span>
              <span className="text-sm font-medium">
                <span className="text-gradient">{demoFanProfile.currentLevelXp}</span>
                <span className="text-white/40"> / {demoFanProfile.xpToNextLevel} XP</span>
              </span>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-altyr-magenta to-altyr-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(demoFanProfile.currentLevelXp / demoFanProfile.xpToNextLevel) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mt-3 text-xs text-white/40">
              <span>Total XP: {demoFanProfile.xp.toLocaleString()}</span>
              <span>{demoFanProfile.unlockedBadges} badges unlocked</span>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-light text-gradient">{currentStreak}</div>
              <div className="text-xs text-white/40">Day streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-white/90">{demoFanProfile.unlockedBadges}</div>
              <div className="text-xs text-white/40">Badges</div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard padding="p-0">
        <div className="p-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <IconContainer icon={Zap} size="sm" variant="warning" />
            <h3 className="text-lg font-light text-white/90">XP Sources</h3>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {xpSources.map((source, index) => {
            const Icon = iconMap[source.icon] || Zap
            return (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <IconContainer icon={Icon} size="sm" variant="default" />
                  <div>
                    <p className="text-sm font-medium text-white/90">{source.action}</p>
                    <p className="text-xs text-white/40">{source.cap}</p>
                  </div>
                </div>
                <div className="text-xl font-light text-gradient">+{source.xp} XP</div>
              </motion.div>
            )
          })}
        </div>
      </GlassCard>

      <GlassCard padding="p-0">
        <div className="p-6 border-b border-white/[0.08]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconContainer icon={Calendar} size="sm" />
              <h3 className="text-lg font-light text-white/90">Daily Login Rewards</h3>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-altyr-orange" />
              <span className="text-sm text-altyr-orange">{currentStreak} day streak</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {dailyLoginRewards.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  flex-shrink-0 w-20 p-4 rounded-xl text-center
                  ${day.claimed ? 'bg-gradient-to-br from-altyr-magenta/20 to-altyr-purple/10 border border-altyr-magenta/30' : 'bg-white/[0.02] border border-white/[0.08]'}
                `}
              >
                <p className="text-xs text-white/40 mb-1">Day {day.day}</p>
                <p className={`text-sm font-medium ${day.claimed ? 'text-gradient' : 'text-white/60'}`}>{day.reward}</p>
                {day.claimed && (
                  <div className="mt-2">
                    <span className="text-xs text-green-400">✓</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>

      <GlassCard padding="p-0">
        <div className="p-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <IconContainer icon={Award} size="sm" variant="warning" />
            <h3 className="text-lg font-light text-white/90">Badge Collection</h3>
          </div>
        </div>
        <div className="p-6 space-y-8">
          {badgeCategories.map((category, catIndex) => {
            const CategoryIcon = iconMap[category.icon] || Award
            return (
              <div key={category.name}>
                <div className="flex items-center gap-2 mb-4">
                  <CategoryIcon className="w-4 h-4 text-altyr-purple-light" />
                  <span className="text-sm font-medium text-white/80">{category.name}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {category.badges.map((badge, index) => {
                    const colors = rarityColors[badge.rarity]
                    return (
                      <motion.div
                        key={badge.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIndex * 0.1 + index * 0.05 }}
                        className={`
                          p-4 rounded-xl text-center
                          ${badge.unlocked ? `${colors.bg} border ${colors.border}` : 'bg-white/[0.02] border border-white/[0.06] opacity-50'}
                        `}
                      >
                        <div className={`text-2xl mb-2 ${badge.unlocked ? colors.text : 'text-white/20'}`}>🏆</div>
                        <p className={`text-xs font-medium mb-1 ${badge.unlocked ? 'text-white/90' : 'text-white/40'}`}>{badge.name}</p>
                        <StatusBadge status={badge.rarity} type="rarity" size="xs" />
                        <p className="text-[10px] text-white/30 mt-2">{badge.requirement}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </GlassCard>

      <GlassCard padding="p-0">
        <div className="p-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <IconContainer icon={Trophy} size="sm" />
            <h3 className="text-lg font-light text-white/90">Level Rewards</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {levelRewards.map((reward, index) => (
              <motion.div
                key={reward.level}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  p-4 rounded-xl flex items-center gap-4
                  ${reward.unlocked ? 'bg-gradient-to-r from-altyr-magenta/10 to-transparent border border-altyr-magenta/20' : 'bg-white/[0.02] border border-white/[0.06]'}
                `}
              >
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg font-light
                    ${reward.unlocked ? 'bg-gradient-to-br from-altyr-magenta to-altyr-purple text-white' : 'bg-white/[0.05] text-white/30'}
                  `}
                >
                  {reward.level}
                </div>
                <div>
                  <p className={`text-sm ${reward.unlocked ? 'text-white/90' : 'text-white/50'}`}>{reward.reward}</p>
                  {reward.unlocked && <p className="text-xs text-green-400">Unlocked ✓</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

