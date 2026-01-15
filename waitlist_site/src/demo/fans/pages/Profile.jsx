import React, { useState } from 'react'
import { Paintbrush, Shield, Sparkles, Check } from 'lucide-react'
import { GlassCard, IconContainer } from '@/components/shared'
import { demoFanProfile } from '@/data/mockGamification'

const borders = [
  { id: 'gradient-magenta', label: 'Magenta Gradient' },
  { id: 'purple-glow', label: 'Purple Glow' },
  { id: 'gold-ring', label: 'Gold Ring' },
  { id: 'minimal', label: 'Minimal' },
]

const effects = [
  { id: 'glow', label: 'Glow' },
  { id: 'pulse', label: 'Pulse' },
  { id: 'none', label: 'None' },
]

export default function FanProfile() {
  const [border, setBorder] = useState(demoFanProfile.customization.avatarBorder)
  const [effect, setEffect] = useState(demoFanProfile.customization.usernameEffect)

  return (
    <div className="space-y-6">
      <GlassCard className="bg-gradient-to-r from-altyr-magenta/10 to-altyr-purple/5">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-altyr-magenta to-altyr-purple flex items-center justify-center text-white text-xl font-light">
            {demoFanProfile.level}
          </div>
          <div className="flex-1">
            <p className="text-sm text-white/50">Profile</p>
            <p className="text-xl font-light text-white/90">Customize your identity</p>
            <p className="text-xs text-white/40">Cosmetic unlocks are tied to level, streak, and badges.</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard padding="p-0">
          <div className="p-6 border-b border-white/[0.08] flex items-center gap-3">
            <IconContainer icon={Paintbrush} size="sm" />
            <div>
              <h3 className="text-lg font-light text-white/90">Appearance</h3>
              <p className="text-xs text-white/50">Unlocked cosmetic options</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <p className="text-xs text-white/50 mb-2">Avatar border</p>
              <div className="grid grid-cols-2 gap-2">
                {borders.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBorder(b.id)}
                    className={`
                      p-3 rounded-xl text-left border transition-all
                      ${border === b.id ? 'bg-white/[0.05] border-white/[0.18]' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80">{b.label}</span>
                      {border === b.id && <Check className="w-4 h-4 text-altyr-magenta" />}
                    </div>
                    <p className="text-[10px] text-white/40 mt-1">Requires Level {b.id === 'gold-ring' ? '50' : '10'}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-white/50 mb-2">Username effect</p>
              <div className="grid grid-cols-3 gap-2">
                {effects.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setEffect(e.id)}
                    className={`
                      px-3 py-2 rounded-xl border text-xs transition-all
                      ${effect === e.id ? 'bg-white/[0.05] border-white/[0.18] text-white' : 'bg-white/[0.02] border-white/[0.06] text-white/60 hover:bg-white/[0.04]'}
                    `}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard padding="p-0">
          <div className="p-6 border-b border-white/[0.08] flex items-center gap-3">
            <IconContainer icon={Shield} size="sm" variant="neutral" />
            <div>
              <h3 className="text-lg font-light text-white/90">Privacy</h3>
              <p className="text-xs text-white/50">What you share with creators</p>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <p className="text-sm text-white/85">Share preferences</p>
              <p className="text-xs text-white/50 mt-1">Allows creators to personalize rewards and offers.</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="px-2 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px]">Enabled</span>
                <span className="text-[10px] text-white/40">Recommended</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <p className="text-sm text-white/85">Hide purchase totals</p>
              <p className="text-xs text-white/50 mt-1">Keeps your exact spend private while still earning XP.</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.10] text-white/60 text-[10px]">Off</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-altyr-purple/10 to-altyr-magenta/5 border border-altyr-purple/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-altyr-purple-light" />
                <p className="text-sm text-white/85">Why this matters</p>
              </div>
              <p className="text-xs text-white/55">
                The platform is designed to reward depth, not just access. Sharing context improves personalization and recognition.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white text-sm font-medium hover:opacity-90 transition-opacity">
          Save (demo)
        </button>
      </div>
    </div>
  )
}

