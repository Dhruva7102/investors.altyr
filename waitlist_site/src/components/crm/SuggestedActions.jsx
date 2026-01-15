import React from 'react'
import { Sparkles, ArrowRight, MessageSquare, Gift, Award, RefreshCw } from 'lucide-react'
import { GlassCard, IconContainer } from '@/components/shared'
import { getSuggestedActions } from '@/data/mockInteractions'

const actionIcons = {
  'Send voice note': MessageSquare,
  'Send check-in message': MessageSquare,
  'Send personalized message': MessageSquare,
  'Offer early access to new content': Gift,
  'Offer exclusive discount': Gift,
  'Send re-engagement offer': Gift,
  'Acknowledge milestone': Award,
  'Ask for feedback': RefreshCw,
  'Share upcoming content preview': Gift,
}

export default function SuggestedActions({ fanId }) {
  const actions = getSuggestedActions(fanId)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'from-altyr-magenta to-altyr-purple'
      case 'medium':
        return 'from-altyr-purple-light to-altyr-purple'
      default:
        return 'from-white/20 to-white/10'
    }
  }

  return (
    <GlassCard padding="p-0">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <IconContainer icon={Sparkles} size="sm" variant="default" />
          <div>
            <h3 className="text-lg font-light text-white/90">AI Suggested Actions</h3>
            <p className="text-xs text-white/50">Recommended next steps</p>
          </div>
        </div>
        <span className="px-2 py-1 rounded-full bg-altyr-magenta/20 text-altyr-magenta text-xs font-medium border border-altyr-magenta/30">
          AI Powered
        </span>
      </div>

      {/* Actions */}
      <div className="p-6 space-y-3">
        {actions.map((action) => {
          const Icon = actionIcons[action.action] || MessageSquare

          return (
            <div key={action.id} className="group">
              <div
                className={`
                  p-4 rounded-xl
                  bg-gradient-to-r ${getPriorityColor(action.priority)} bg-opacity-10
                  border border-white/[0.08]
                  hover:border-altyr-magenta/30
                  cursor-pointer
                  transition-all duration-300
                `}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-altyr-magenta" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white/90">{action.action}</span>
                      {action.priority === 'high' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-altyr-magenta/20 text-altyr-magenta">Priority</span>
                      )}
                    </div>
                    <p className="text-xs text-white/50">{action.reason}</p>
                  </div>

                  <button className="p-2 rounded-lg opacity-0 group-hover:opacity-100 bg-altyr-magenta/20 transition-all">
                    <ArrowRight className="w-4 h-4 text-altyr-magenta" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.08] bg-white/[0.02]">
        <button className="w-full py-2 text-sm text-altyr-magenta hover:text-altyr-purple-light transition-colors flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh suggestions
        </button>
      </div>
    </GlassCard>
  )
}

