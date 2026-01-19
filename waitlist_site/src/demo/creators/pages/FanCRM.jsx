import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Users } from 'lucide-react'
import { PageHeader } from '@/components/layout'
import { GlassCard, FanListItem } from '@/components/shared'
import { mockFans, getFansByStatus } from '@/data/mockFans'
import { trackPageView } from '@/lib/mixpanel'

const statusFilters = ['All', 'Superfan', 'VIP', 'Regular', 'Casual']

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function FanCRM() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    trackPageView('Creator Fan CRM', {
      demo_type: 'creator',
    })
  }, [])

  const filteredFans = useMemo(() => {
    return mockFans
      .filter((fan) => activeFilter === 'All' || fan.status === activeFilter)
      .filter((fan) => fan.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => (b.connectionScore || 0) - (a.connectionScore || 0))
  }, [activeFilter, searchQuery])

  const statusCounts = {
    All: mockFans.length,
    Superfan: getFansByStatus('Superfan').length,
    VIP: getFansByStatus('VIP').length,
    Regular: getFansByStatus('Regular').length,
    Casual: getFansByStatus('Casual').length,
  }

  return (
    <motion.div className="space-y-4 sm:space-y-6" variants={containerVariants} initial="hidden" animate="show">
      <PageHeader
        label="Fan CRM"
        title="Relationship Intelligence"
        subtitle="Understand each fan as an individual. Build deeper connections to capture more revenue from your top supporters."
      />

      <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search fans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/40 focus:outline-none focus:border-altyr-magenta/50 transition-colors"
          />
        </div>

        {/* Filter pills with improved touch targets */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 -mx-1 px-1 scrollbar-hide">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`
                px-4 py-2.5 rounded-lg text-sm font-light whitespace-nowrap flex-shrink-0
                transition-all duration-300
                ${activeFilter === status ? 'bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white' : 'glass-card hover:bg-white/[0.05] text-white/60'}
              `}
            >
              {status}
              <span className="ml-1.5 sm:ml-2 text-xs opacity-60">({statusCounts[status]})</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div variants={itemVariants}>
        <GlassCard padding="p-0">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 sm:gap-3">
              <Users className="w-5 h-5 text-altyr-magenta" />
              <span className="text-base sm:text-lg font-light text-white/90">{filteredFans.length} Fans</span>
            </div>
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg glass-card hover:bg-white/[0.05] text-sm text-white/60">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>

          <div className="p-3 sm:p-4 space-y-2 max-h-[500px] sm:max-h-[600px] overflow-y-auto">
            {filteredFans.length > 0 ? (
              filteredFans.map((fan, index) => (
                <FanListItem
                  key={fan.id}
                  fan={fan}
                  onClick={() => {
                    navigate(`/demo/creators/fans/${fan.id}`)
                    trackEvent('Fan Profile Viewed', {
                      fan_id: fan.id,
                      fan_status: fan.status,
                      demo_type: 'creator',
                      source: 'fan_crm_list',
                    })
                  }}
                  delay={index * 0.05}
                />
              ))
            ) : (
              <div className="text-center py-12 text-white/40">No fans match your search</div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}

