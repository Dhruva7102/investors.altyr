import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Award, ArrowRight } from 'lucide-react'
import { GlassCard, IconContainer } from '@/components/shared'
import { alerts } from '@/data/mockInteractions'

const alertTypeConfig = {
  risk: {
    icon: AlertTriangle,
    variant: 'danger',
    borderClass: 'border-l-red-500',
  },
  positive: {
    icon: CheckCircle,
    variant: 'success',
    borderClass: 'border-l-green-500',
  },
  milestone: {
    icon: Award,
    variant: 'warning',
    borderClass: 'border-l-badge-gold',
  },
}

export default function AlertsModule() {
  const navigate = useNavigate()
  const recentAlerts = alerts.slice(0, 5)

  return (
    <GlassCard className="h-full" padding="p-0" delay={0.5}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <IconContainer icon={AlertTriangle} size="sm" variant="danger" />
          <div>
            <h3 className="text-lg font-light text-white/90">Alerts & Signals</h3>
            <p className="text-xs text-white/50">Relationship intelligence</p>
          </div>
        </div>
        <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
          {alerts.filter(a => a.type === 'risk').length} urgent
        </span>
      </div>

      {/* Alert list */}
      <div className="p-4 space-y-3">
        {recentAlerts.map((alert, index) => {
          const config = alertTypeConfig[alert.type] || alertTypeConfig.risk
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              onClick={() => navigate(`/fan/${alert.fanId}`)}
              className={`
                p-3 rounded-lg 
                bg-white/[0.02] 
                border border-white/[0.06] 
                border-l-2 ${config.borderClass}
                hover:bg-white/[0.04] 
                cursor-pointer 
                transition-all duration-300
              `}
            >
              <div className="flex items-start gap-3">
                <config.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  alert.type === 'risk' ? 'text-red-400' :
                  alert.type === 'positive' ? 'text-green-400' :
                  'text-badge-gold'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80 font-medium truncate">
                    {alert.title}
                  </p>
                  <p className="text-xs text-white/50 truncate">
                    {alert.fanName} • {alert.description}
                  </p>
                </div>
              </div>
              
              {alert.suggestedAction && (
                <div className="mt-2 flex items-center gap-1 text-xs text-altyr-magenta">
                  <span>→ {alert.suggestedAction}</span>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </GlassCard>
  )
}
