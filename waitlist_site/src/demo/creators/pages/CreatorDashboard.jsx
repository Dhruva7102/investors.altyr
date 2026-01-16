import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/layout'
import { RevenueOverview, TopFansModule, AlertsModule, QuickActions } from '@/components/dashboard'
import { trackPageView } from '@/lib/mixpanel'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function CreatorDashboard() {
  useEffect(() => {
    trackPageView('Creator Dashboard', {
      demo_type: 'creator',
    })
  }, [])

  return (
    <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="show">
      <PageHeader
        label="Dashboard"
        title="Welcome back, Creator"
        subtitle="Here's your relationship intelligence at a glance. Focus on your top fans—they drive 90% of your revenue."
      />

      <motion.section variants={itemVariants}>
        <h2 className="text-lg font-light text-white/70 mb-4">Revenue Overview</h2>
        <RevenueOverview />
      </motion.section>

      <motion.section variants={itemVariants} className="grid lg:grid-cols-2 gap-6">
        <TopFansModule />
        <AlertsModule />
      </motion.section>

      <motion.section variants={itemVariants}>
        <h2 className="text-lg font-light text-white/70 mb-4">Quick Actions</h2>
        <QuickActions />
      </motion.section>
    </motion.div>
  )
}

