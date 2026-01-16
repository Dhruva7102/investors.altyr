import React, { useMemo } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDemoState } from './DemoState'

export default function DemoTourOverlay({ mode = 'fan', steps = [] }) {
  const navigate = useNavigate()
  const { tour, setTour, pushToast } = useDemoState()

  const step = useMemo(() => {
    const idx = tour?.stepIndex || 0
    return steps[idx] || null
  }, [steps, tour?.stepIndex])

  if (!tour?.active || !step) return null

  const stepIndex = tour.stepIndex || 0
  const total = steps.length

  function goTo(idx) {
    const next = steps[idx]
    if (!next) return
    setTour({ active: true, stepIndex: idx })
    if (next.to) navigate(next.to)
    if (next.toast) pushToast(next.toast)
  }

  return (
    <div className="fixed left-1/2 top-[5.25rem] -translate-x-1/2 z-50 w-[min(560px,calc(100vw-2.5rem))]">
      <div className="rounded-2xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-md shadow-2xl overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.10]">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-white/40">
              {mode === 'creator' ? 'Creator tour' : 'Fan tour'} • Step {stepIndex + 1}/{total}
            </p>
            <p className="text-sm text-white/90 font-medium truncate">{step.title}</p>
          </div>
          <button
            onClick={() => setTour({ active: false, stepIndex: 0 })}
            className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.10] hover:bg-white/[0.06] flex items-center justify-center text-white/70"
            aria-label="End tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 py-3">
          <p className="text-sm text-white/65">{step.body}</p>
          {step.hint ? <p className="text-xs text-white/40 mt-2">{step.hint}</p> : null}
        </div>

        <div className="px-4 py-3 border-t border-white/[0.10] flex items-center justify-between gap-2">
          <button
            onClick={() => goTo(Math.max(0, stepIndex - 1))}
            disabled={stepIndex === 0}
            className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.10] text-xs text-white/75 disabled:opacity-40 hover:bg-white/[0.05] inline-flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <button
            onClick={() => {
              if (stepIndex >= total - 1) setTour({ active: false, stepIndex: 0 })
              else goTo(stepIndex + 1)
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-altyr-magenta to-altyr-purple text-white text-xs font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            {stepIndex >= total - 1 ? 'Finish' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

