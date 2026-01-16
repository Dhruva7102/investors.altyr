import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const DemoStateContext = createContext(null)

function uid() {
  return Math.random().toString(36).slice(2)
}

export function DemoStateProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const [tour, setTour] = useState({ active: false, stepIndex: 0 })

  const toastTimeouts = useRef(new Map())

  const pushToast = useCallback((toast) => {
    const id = toast?.id || uid()
    const ttlMs = toast?.ttlMs ?? 2600
    const next = { id, title: toast?.title || 'Updated', message: toast?.message || '', tone: toast?.tone || 'neutral' }

    setToasts((prev) => [next, ...prev].slice(0, 4))

    if (toastTimeouts.current.has(id)) clearTimeout(toastTimeouts.current.get(id))
    toastTimeouts.current.set(
      id,
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
        toastTimeouts.current.delete(id)
      }, ttlMs),
    )

    return id
  }, [])

  const clearToasts = useCallback(() => {
    toastTimeouts.current.forEach((t) => clearTimeout(t))
    toastTimeouts.current.clear()
    setToasts([])
  }, [])

  const value = useMemo(
    () => ({
      toasts,
      pushToast,
      clearToasts,
      tour,
      setTour,
    }),
    [clearToasts, pushToast, toasts, tour],
  )

  return <DemoStateContext.Provider value={value}>{children}</DemoStateContext.Provider>
}

export function useDemoState() {
  const ctx = useContext(DemoStateContext)
  if (!ctx) throw new Error('useDemoState must be used within <DemoStateProvider />')
  return ctx
}

