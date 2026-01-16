import React from 'react'
import { Flame, Crown, RotateCcw, TrendingUp } from 'lucide-react'
import { GlassCard, IconContainer } from '@/components/shared'
import { opportunities } from '@/data/mockOpportunities'
import { useDemoState } from '@/components/demo/DemoState'

function typeIcon(type) {
  if (type === 'vip') return Crown
  if (type === 'winback') return RotateCcw
  if (type === 'repeat') return TrendingUp
  return Flame
}

function typeVariant(type) {
  if (type === 'vip') return 'warning'
  if (type === 'winback') return 'danger'
  if (type === 'repeat') return 'success'
  return 'danger'
}

export default function OpportunitiesModule() {
  const { pushToast } = useDemoState()

  return (
    <GlassCard padding="p-0" delay={0.2} className="overflow-hidden">
      <div className="p-6 border-b border-white/[0.08] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <IconContainer icon={Flame} size="sm" variant="warning" />
          <div>
            <h3 className="text-lg font-light text-white/90">Today’s Opportunities</h3>
            <p className="text-xs text-white/50">Signals → action → outcome</p>
          </div>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] uppercase tracking-wider text-white/50">
          {opportunities.length} live
        </div>
      </div>

      <div className="p-6 grid lg:grid-cols-2 gap-4">
        {opportunities.map((opp) => {
          const Icon = typeIcon(opp.type)
          const variant = typeVariant(opp.type)
          return (
            <div key={opp.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.03] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <IconContainer icon={Icon} size="sm" variant={variant} />
                    <p className="text-sm font-medium text-white/90 truncate">{opp.title}</p>
                  </div>
                  <p className="text-xs text-white/45 mt-1">
                    <span className="text-white/70">{opp.fanName}</span> • {opp.summary}
                  </p>
                </div>
                <button
                  onClick={() => {
                    pushToast(opp.toast)
                  }}
                  className="flex-shrink-0 px-3 py-2 rounded-xl bg-gradient-to-r from-altyr-magenta/25 to-altyr-purple/15 border border-white/[0.12] text-xs text-white/85 hover:bg-white/[0.06] transition-colors"
                >
                  {opp.actionLabel}
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {opp.why.map((w) => (
                  <span
                    key={w}
                    className="text-[10px] px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/55"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}

