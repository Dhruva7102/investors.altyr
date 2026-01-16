import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Crown, Gift, Sparkles, Ticket, ArrowRight, ShoppingBag } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { GlassCard, IconContainer, StatusBadge } from '@/components/shared'
import { demoCreator, demoOffers, demoStoreItems } from '@/data/mockFanLoop'
import { demoCreatorStore } from '@/data/mockCreatorStore'
import { useDemoState } from '@/components/demo/DemoState'

export default function FanCreator() {
  const location = useLocation()
  const { pushToast } = useDemoState()

  useEffect(() => {
    if (location.hash !== '#store') return
    const t = setTimeout(() => {
      document.getElementById('store')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
    return () => clearTimeout(t)
  }, [location.hash])

  return (
    <div className="space-y-6">
      <GlassCard className="overflow-hidden" padding="p-0">
        <div className="h-28 bg-gradient-to-r from-altyr-magenta/30 via-altyr-purple/20 to-altyr-bg relative">
          <div className="absolute inset-0 bg-gradient-to-t from-altyr-bg to-transparent" />
        </div>
        <div className="px-6 pb-6 -mt-10 relative">
          <div className="flex flex-col md:flex-row md:items-end gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-altyr-magenta/50 to-altyr-purple/50 border-2 border-altyr-bg flex items-center justify-center text-white text-2xl font-light shadow-xl">
              {demoCreator.name.split(' ').map((s) => s[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl font-light text-white/90">{demoCreator.name}</h2>
                <span className="text-sm text-white/40">{demoCreator.handle}</span>
                <StatusBadge status={demoCreator.tier} type="rarity" size="sm" />
              </div>
              <p className="text-sm text-white/55 max-w-2xl">{demoCreator.tagline}</p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Upgrade
            </button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-white/50">Tier progress</span>
              <span className="text-white/70">{Math.round(demoCreator.tierProgress * 100)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-altyr-orange to-altyr-magenta rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${demoCreator.tierProgress * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard padding="p-0">
        <div id="store" className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconContainer icon={ShoppingBag} size="sm" variant="warning" />
            <div>
              <h3 className="text-lg font-light text-white/90">Store</h3>
              <p className="text-xs text-white/50">Browse content and buy instantly</p>
            </div>
          </div>
        </div>
        <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoCreatorStore.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.03] transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white/90">{item.title}</p>
                  <p className="text-xs text-white/50 mt-1">{item.description}</p>
                </div>
                <span className="flex-shrink-0 text-[10px] px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/55">
                  {item.tag}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-white/40">{item.type}</span>
                <span className="text-sm text-gradient font-medium">${item.priceUsd}</span>
              </div>

              <button
                onClick={() => {
                  pushToast({ title: 'Purchased', message: `${item.title} (+$${item.priceUsd})`, tone: 'success' })
                }}
                className="mt-3 w-full px-3 py-2 rounded-xl bg-gradient-to-r from-altyr-magenta/25 to-altyr-purple/15 border border-white/[0.12] text-xs text-white/85 hover:bg-white/[0.06] transition-colors"
              >
                Buy now
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard padding="p-0">
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconContainer icon={Sparkles} size="sm" />
              <div>
                <h3 className="text-lg font-light text-white/90">Perks</h3>
                <p className="text-xs text-white/50">Why fans keep coming back</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-3">
            {demoCreator.perks.map((perk) => (
              <div key={perk} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <span className="text-sm text-white/80">{perk}</span>
                <ArrowRight className="w-4 h-4 text-white/30" />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="p-0">
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconContainer icon={Gift} size="sm" variant="warning" />
              <div>
                <h3 className="text-lg font-light text-white/90">Offers</h3>
                <p className="text-xs text-white/50">Designed conversion moments</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-3">
            {demoOffers.map((offer) => (
              <div key={offer.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/90">{offer.title}</p>
                    <p className="text-xs text-white/50 mt-1">{offer.details}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gradient font-medium">${offer.price}</p>
                    <button
                      onClick={() => {
                        pushToast({ title: 'Purchased', message: `${offer.title} (+$${offer.price})`, tone: 'success' })
                      }}
                      className="mt-2 px-3 py-1.5 rounded-lg bg-altyr-magenta/20 border border-altyr-magenta/30 text-altyr-magenta text-xs hover:bg-altyr-magenta/25"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard padding="p-0">
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconContainer icon={Ticket} size="sm" variant="warning" />
            <div>
              <h3 className="text-lg font-light text-white/90">Reward Store</h3>
              <p className="text-xs text-white/50">Spend points to change your experience</p>
            </div>
          </div>
        </div>
        <div className="p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {demoStoreItems.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <p className="text-sm font-medium text-white/90">{item.name}</p>
              <p className="text-xs text-white/50 mt-1">{item.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-white/40">{item.type}</span>
                <span className="text-sm text-gradient font-medium">{item.price} pts</span>
              </div>
              <button className="mt-3 w-full px-3 py-2 rounded-lg glass-card hover:bg-white/[0.05] text-xs text-white/70">
                Redeem
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

