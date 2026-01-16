import React, { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Sparkles, Trophy, Gift, CheckCircle2 } from 'lucide-react'
import { GlassCard, IconContainer } from '@/components/shared'
import { demoFanProfile, currentStreak } from '@/data/mockGamification'
import { demoCreator, demoQuests, demoStoreItems } from '@/data/mockFanLoop'
import { trackPageView } from '@/lib/mixpanel'

export default function FanHome() {
  const [completed, setCompleted] = useState(() => new Set())

  useEffect(() => {
    trackPageView('Fan Home', {
      demo_type: 'fan',
    })
  }, [])

  const completedCount = completed.size
  const totalCount = demoQuests.length

  const pointsBalance = useMemo(() => {
    // Lightweight "soft currency" derived from level + streak for demo
    return Math.round(demoFanProfile.level * 120 + currentStreak * 45)
  }, [])

  const nextSuggested = useMemo(() => demoStoreItems[2], [])

  return (
    <div className="space-y-6">
      <GlassCard className="bg-gradient-to-r from-altyr-magenta/10 to-altyr-purple/5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-altyr-magenta to-altyr-purple flex items-center justify-center text-white text-xl font-light">
              {demoFanProfile.level}
            </div>
            <div>
              <p className="text-sm text-white/50">Your status</p>
              <p className="text-xl font-light text-white/90">Level {demoFanProfile.level} • {demoCreator.tier}</p>
              <p className="text-xs text-white/40">{demoCreator.name} • {demoCreator.tagline}</p>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-white/60">Progress to Level {demoFanProfile.level + 1}</span>
              <span className="font-medium">
                <span className="text-gradient">{demoFanProfile.currentLevelXp}</span>
                <span className="text-white/40"> / {demoFanProfile.xpToNextLevel} XP</span>
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-altyr-magenta to-altyr-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(demoFanProfile.currentLevelXp / demoFanProfile.xpToNextLevel) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-white/40">
              <span>Streak: {currentStreak} days</span>
              <span>Badges: {demoFanProfile.unlockedBadges}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:w-[320px]">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2">
                <IconContainer icon={Zap} size="sm" variant="warning" />
                <span className="text-xs text-white/60">Points</span>
              </div>
              <div className="text-2xl font-light text-gradient">{pointsBalance}</div>
              <div className="text-xs text-white/40">Spend on perks</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2">
                <IconContainer icon={Trophy} size="sm" />
                <span className="text-xs text-white/60">Quest</span>
              </div>
              <div className="text-2xl font-light text-white/90">{completedCount}/{totalCount}</div>
              <div className="text-xs text-white/40">Today</div>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2" padding="p-0">
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconContainer icon={Sparkles} size="sm" />
              <div>
                <h3 className="text-lg font-light text-white/90">Daily Quests</h3>
                <p className="text-xs text-white/50">Build habit and deepen connection</p>
              </div>
            </div>
            <span className="text-xs text-white/50">{completedCount}/{totalCount} complete</span>
          </div>
          <div className="p-6 space-y-3">
            {demoQuests.map((q) => {
              const isDone = completed.has(q.id)
              return (
                <div
                  key={q.id}
                  className={`
                    p-4 rounded-xl border transition-all cursor-pointer
                    ${isDone ? 'bg-white/[0.03] border-white/[0.10]' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'}
                  `}
                  onClick={() => {
                    const wasCompleted = completed.has(q.id)
                    setCompleted((prev) => {
                      const next = new Set(prev)
                      if (next.has(q.id)) next.delete(q.id)
                      else next.add(q.id)
                      return next
                    })
                    trackEvent('Quest Toggled', {
                      quest_id: q.id,
                      quest_title: q.title,
                      quest_category: q.category,
                      is_completed: !wasCompleted,
                      demo_type: 'fan',
                    })
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {isDone ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <div className="w-4 h-4 rounded-full border border-white/20" />}
                        <p className="text-sm font-medium text-white/90 truncate">{q.title}</p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50 border border-white/[0.08]">
                          {q.category}
                        </span>
                      </div>
                      <p className="text-xs text-white/50">{q.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm text-gradient font-medium">+{q.xp} XP</div>
                      <div className="text-[10px] text-white/40">{q.reward}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>

        <GlassCard padding="p-0">
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconContainer icon={Gift} size="sm" variant="warning" />
              <div>
                <h3 className="text-lg font-light text-white/90">Suggested Perk</h3>
                <p className="text-xs text-white/50">Spend points for momentum</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <p className="text-sm text-white/90">{nextSuggested.name}</p>
              <p className="text-xs text-white/50 mt-1">{nextSuggested.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-white/50">Cost</span>
                <span className="text-sm text-gradient font-medium">{nextSuggested.price} pts</span>
              </div>
            </div>
            <button className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white text-sm font-medium hover:opacity-90 transition-opacity">
              Redeem (demo)
            </button>
            <p className="text-[10px] text-white/35">
              In production, this would mint a perk token and change your messaging priority.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

