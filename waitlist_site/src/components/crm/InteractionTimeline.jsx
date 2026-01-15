import React from 'react'
import { Clock } from 'lucide-react'
import { GlassCard, TimelineItem, IconContainer } from '@/components/shared'
import { generateInteractions } from '@/data/mockInteractions'

export default function InteractionTimeline({ fanId }) {
  const interactions = generateInteractions(fanId)

  return (
    <GlassCard padding="p-0">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <IconContainer icon={Clock} size="sm" />
          <div>
            <h3 className="text-lg font-light text-white/90">Interaction Timeline</h3>
            <p className="text-xs text-white/50">Recent relationship activity</p>
          </div>
        </div>
        <span className="text-sm text-white/40">{interactions.length} interactions</span>
      </div>

      {/* Timeline */}
      <div className="p-6">
        {interactions.length > 0 ? (
          interactions.map((interaction, index) => (
            <TimelineItem
              key={interaction.id}
              interaction={interaction}
              delay={index * 0.1}
              showConnector={index < interactions.length - 1}
            />
          ))
        ) : (
          <div className="text-center py-8 text-white/40">No interactions yet</div>
        )}
      </div>
    </GlassCard>
  )
}

