import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { 
  FanProfileHeader, 
  InteractionTimeline, 
  RelationshipScore,
  MemorySystem,
  SuggestedActions 
} from '@/components/crm'
import { getFanById } from '@/data/mockFans'

export default function FanProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fan = getFanById(id)

  if (!fan) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-white/60 mb-4">Fan not found</p>
        <button 
          onClick={() => navigate('/fans')}
          className="text-altyr-magenta hover:text-altyr-purple-light transition-colors"
        >
          Back to CRM
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Profile Header */}
      <FanProfileHeader fan={fan} />

      {/* Two column layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <InteractionTimeline fanId={fan.id} />
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          <RelationshipScore fan={fan} />
          <MemorySystem fan={fan} />
          <SuggestedActions fanId={fan.id} />
        </div>
      </div>
    </div>
  )
}
