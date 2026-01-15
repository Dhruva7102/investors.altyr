import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, Gift, Users, TrendingUp } from 'lucide-react'

const BASE = '/demo/creators'

const actions = [
  {
    icon: MessageSquare,
    label: 'Message Top Fans',
    description: 'Send personalized message to VIPs',
    path: '/messaging',
    color: 'from-altyr-magenta to-altyr-purple',
  },
  {
    icon: Gift,
    label: 'Create Offer',
    description: 'Launch new campaign for fans',
    path: '/revenue',
    color: 'from-altyr-orange to-altyr-orange-light',
  },
  {
    icon: Users,
    label: 'Review At-Risk',
    description: 'Check fans needing attention',
    path: '/fan-crm',
    color: 'from-red-500 to-red-400',
  },
  {
    icon: TrendingUp,
    label: 'View Analytics',
    description: 'Deep dive into revenue data',
    path: '/revenue',
    color: 'from-altyr-purple-light to-altyr-purple',
  },
]

export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <div key={action.label}>
          <div onClick={() => navigate(`${BASE}${action.path}`)} className="glass-card-interactive rounded-xl p-4 h-full">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} bg-opacity-20 flex items-center justify-center mb-3`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-sm font-medium text-white/90 mb-1">{action.label}</h4>
            <p className="text-xs text-white/50">{action.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

