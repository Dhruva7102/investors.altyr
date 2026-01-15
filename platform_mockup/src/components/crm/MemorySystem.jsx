import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Heart, Calendar, AlertCircle, Edit2 } from 'lucide-react'
import { GlassCard, IconContainer } from '@/components/shared'

export default function MemorySystem({ fan }) {
  const { preferences } = fan

  return (
    <GlassCard padding="p-0">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <IconContainer icon={Brain} size="sm" variant="default" />
          <div>
            <h3 className="text-lg font-light text-white/90">Memory System</h3>
            <p className="text-xs text-white/50">What you know about this fan</p>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <Edit2 className="w-4 h-4 text-white/50" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Preferences - Likes */}
        {preferences.likes && preferences.likes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-altyr-magenta" />
              <span className="text-sm font-medium text-white/80">Preferences</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferences.likes.map((like, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 rounded-full text-xs bg-altyr-magenta/20 text-altyr-magenta border border-altyr-magenta/30"
                >
                  {like}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Boundaries */}
        {preferences.boundaries && preferences.boundaries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-altyr-orange" />
              <span className="text-sm font-medium text-white/80">Boundaries</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferences.boundaries.map((boundary, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 rounded-full text-xs bg-altyr-orange/20 text-altyr-orange border border-altyr-orange/30"
                >
                  {boundary}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Important Dates */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-altyr-purple-light" />
            <span className="text-sm font-medium text-white/80">Important Dates</span>
          </div>
          <div className="space-y-2">
            {preferences.birthday && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Birthday</span>
                <span className="text-white/80">{preferences.birthday}</span>
              </div>
            )}
            {preferences.anniversaryDate && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Subscription Anniversary</span>
                <span className="text-white/80">
                  {new Date(preferences.anniversaryDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
            {!preferences.birthday && !preferences.anniversaryDate && (
              <p className="text-sm text-white/40">No dates recorded</p>
            )}
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white/80">Creator Notes</span>
            <button className="text-xs text-altyr-magenta hover:text-altyr-purple-light transition-colors">
              Edit
            </button>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <p className="text-sm text-white/60 leading-relaxed">
              {preferences.notes || 'No notes yet. Add notes about this fan to remember important details.'}
            </p>
          </div>
        </motion.div>
      </div>
    </GlassCard>
  )
}
