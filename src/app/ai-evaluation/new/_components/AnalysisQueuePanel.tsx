'use client'

import { useEffect, useMemo, useState } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { AnimatePresence, motion } from 'framer-motion'
import { Activity, ChevronDown, ChevronUp } from 'lucide-react'

import { evaluationDoc } from '@/lib/firebase/collections'
import { fetchPackage } from '@/lib/ai-evaluation/client'
import type { EvaluationDoc, EvaluationPackage } from '@/types/ai-evaluation'

import AnalysisQueueCard from './AnalysisQueueCard'

export interface QueueItem {
  evaluationId: string
  packageId: string
  addedAt: number // Date.now() when queued
}

/**
 * Real-time analysis queue panel.
 * Subscribes to each evaluation's Firestore document via onSnapshot.
 * Shows a grid of compact progress cards.
 */
export default function AnalysisQueuePanel({
  items,
  onRemoveItem,
  onOpenDetail,
}: {
  items: QueueItem[]
  onRemoveItem?: (evaluationId: string) => void
  onOpenDetail?: (evaluationId: string) => void
}) {
  const [evaluations, setEvaluations] = useState<Record<string, EvaluationDoc>>({})
  const [packages, setPackages] = useState<Record<string, EvaluationPackage>>({})
  const [collapsed, setCollapsed] = useState(false)
  const [tick, setTick] = useState(0)

  // Tick every second for elapsed time display
  useEffect(() => {
    if (items.length === 0) return
    const iv = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(iv)
  }, [items.length])

  // Subscribe to each evaluation doc
  useEffect(() => {
    if (items.length === 0) return

    const unsubs = items.map((item) =>
      onSnapshot(
        evaluationDoc(item.evaluationId),
        (snap) => {
          if (!snap.exists()) return
          const data = snap.data() as EvaluationDoc
          setEvaluations((prev) => ({ ...prev, [item.evaluationId]: data }))
        },
        (err) => {
          console.error(`[queue] onSnapshot error for ${item.evaluationId}:`, err)
        }
      )
    )

    return () => unsubs.forEach((u) => u())
  }, [items])

  // Fetch packages (deduplicated)
  useEffect(() => {
    const uniquePkgIds = [...new Set(items.map((i) => i.packageId))]
    const missing = uniquePkgIds.filter((id) => !packages[id])
    if (missing.length === 0) return

    let cancelled = false
    missing.forEach((pkgId) => {
      fetchPackage(pkgId)
        .then((data) => {
          if (cancelled) return
          setPackages((prev) => ({ ...prev, [pkgId]: data.package }))
        })
        .catch((err) => {
          console.error(`[queue] fetchPackage error for ${pkgId}:`, err)
        })
    })
    return () => {
      cancelled = true
    }
  }, [items, packages])

  // Sort: active first (newest first), then completed (newest first)
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const evalA = evaluations[a.evaluationId]
      const evalB = evaluations[b.evaluationId]
      const aActive = evalA ? evalA.status !== 'ready' && evalA.status !== 'error' : true
      const bActive = evalB ? evalB.status !== 'ready' && evalB.status !== 'error' : true
      if (aActive !== bActive) return aActive ? -1 : 1
      return b.addedAt - a.addedAt
    })
  }, [items, evaluations])

  // Stats
  const activeCount = useMemo(
    () =>
      items.filter((i) => {
        const e = evaluations[i.evaluationId]
        return !e || (e.status !== 'ready' && e.status !== 'error')
      }).length,
    [items, evaluations]
  )
  const completedCount = items.length - activeCount

  if (items.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            {activeCount > 0 && (
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                {activeCount}
              </motion.div>
            )}
          </div>
          <div>
            <h3 className="text-[17px] font-extrabold text-slate-800 tracking-tight">
              분석 현황
            </h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              {activeCount > 0 && (
                <span className="text-cyan-600 font-bold">{activeCount}건 분석 중</span>
              )}
              {activeCount > 0 && completedCount > 0 && (
                <span className="mx-1 text-slate-200">|</span>
              )}
              {completedCount > 0 && (
                <span className="text-emerald-600 font-semibold">{completedCount}건 완료</span>
              )}
            </p>
          </div>
        </div>

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 transition-all"
        >
          {collapsed ? '펼치기' : '접기'}
          {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {sortedItems.map((item) => {
                  const evaluation = evaluations[item.evaluationId]
                  const pkg = packages[item.packageId] ?? null
                  if (!evaluation) {
                    // Skeleton while loading
                    return (
                      <motion.div
                        key={item.evaluationId}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl border border-slate-200/80 p-5 animate-pulse"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100" />
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-slate-100 rounded w-3/4" />
                            <div className="h-2.5 bg-slate-50 rounded w-1/2" />
                          </div>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full w-full" />
                      </motion.div>
                    )
                  }
                  const elapsedMs = Date.now() - item.addedAt
                  const secs = Math.floor(elapsedMs / 1000)
                  const elapsed =
                    secs < 60
                      ? `${secs}초`
                      : secs < 3600
                        ? `${Math.floor(secs / 60)}분 ${secs % 60}초`
                        : `${Math.floor(secs / 3600)}시간 ${Math.floor((secs % 3600) / 60)}분`

                  return (
                    <AnalysisQueueCard
                      key={item.evaluationId}
                      evaluation={evaluation}
                      pkg={pkg}
                      elapsed={elapsed}
                      onOpenDetail={onOpenDetail}
                    />
                  )
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
