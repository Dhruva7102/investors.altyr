import React, { useEffect } from 'react'
import { CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react'
import { useDemoState } from './DemoState'

function toneIcon(tone) {
  if (tone === 'success') return CheckCircle2
  if (tone === 'warning') return AlertTriangle
  return Sparkles
}

function toneClasses(tone) {
  if (tone === 'success') return 'border-green-500/30 bg-green-500/10'
  if (tone === 'warning') return 'border-amber-500/30 bg-amber-500/10'
  return 'border-white/[0.10] bg-white/[0.04]'
}

export default function DemoToasts() {
  const { toasts, clearToasts, tour, setTour } = useDemoState()

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== 'Escape') return
      // Escape should feel like a universal "clean up the screen" in demo mode.
      clearToasts()
      if (tour?.active) setTour({ active: false, stepIndex: 0 })
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [clearToasts, setTour, tour?.active])

  if (!toasts?.length) return null

  return (
    <div className="fixed bottom-5 left-5 z-50 pointer-events-none space-y-2">
      {toasts.map((t) => {
        const Icon = toneIcon(t.tone)
        return (
          <div
            key={t.id}
            className={[
              'w-[320px] rounded-2xl border backdrop-blur-md shadow-2xl overflow-hidden',
              toneClasses(t.tone),
            ].join(' ')}
          >
            <div className="px-4 py-3 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.10] flex items-center justify-center">
                <Icon className="w-4 h-4 text-white/80" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-white/90 font-medium">{t.title}</p>
                {t.message ? <p className="text-xs text-white/55 mt-0.5">{t.message}</p> : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

