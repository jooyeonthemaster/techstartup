'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { getDocs, type QueryDocumentSnapshot } from 'firebase/firestore'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { userEvaluationsQuery } from '@/lib/firebase/collections'
import type { EvaluationDoc, EvaluationStatus } from '@/types/ai-evaluation'

import HistoryHeader from './_components/HistoryHeader'
import HistoryFilterBar, {
  type StatusFilter,
  type SortMode,
  type ViewMode,
} from './_components/HistoryFilterBar'
import EvaluationCard from './_components/EvaluationCard'
import EvaluationRow from './_components/EvaluationRow'
import HistorySkeleton from './_components/HistorySkeleton'
import HistoryEmptyState from './_components/HistoryEmptyState'
import HistoryLoginPrompt from './_components/HistoryLoginPrompt'

const PAGE_SIZE = 20

const PROGRESS_STATUSES: EvaluationStatus[] = [
  'queued',
  'uploading',
  'converting',
  'parsing',
  'analyzing',
  'synthesizing',
  'finalizing',
]

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth()

  const [items, setItems] = useState<EvaluationDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [cursor, setCursor] = useState<QueryDocumentSnapshot | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortMode, setSortMode] = useState<SortMode>('recent')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // ─── Initial load ────────────────────────────────
  useEffect(() => {
    if (authLoading) return
    if (!user) {
      setLoading(false)
      return
    }

    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const q = userEvaluationsQuery(user.uid, undefined, PAGE_SIZE)
        const snap = await getDocs(q)
        if (cancelled) return
        const docs = snap.docs.map((d) => d.data() as EvaluationDoc)
        setItems(docs)
        setCursor(snap.docs[snap.docs.length - 1] ?? null)
        setHasMore(snap.docs.length === PAGE_SIZE)
      } catch (err) {
        if (!cancelled) {
          console.error('[history] load error', err)
          setError((err as Error).message || '평가 목록을 불러오지 못했습니다.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [user, authLoading])

  // ─── Load more ───────────────────────────────────
  const loadMore = useCallback(async () => {
    if (!user || !cursor || !hasMore || loadingMore) return
    setLoadingMore(true)
    setError(null)
    try {
      const q = userEvaluationsQuery(user.uid, cursor, PAGE_SIZE)
      const snap = await getDocs(q)
      const docs = snap.docs.map((d) => d.data() as EvaluationDoc)
      setItems((prev) => [...prev, ...docs])
      setCursor(snap.docs[snap.docs.length - 1] ?? null)
      setHasMore(snap.docs.length === PAGE_SIZE)
    } catch (err) {
      console.error('[history] loadMore error', err)
      setError((err as Error).message || '추가 데이터를 불러오지 못했습니다.')
    } finally {
      setLoadingMore(false)
    }
  }, [user, cursor, hasMore, loadingMore])

  // ─── Retry ───────────────────────────────────────
  const handleRetry = useCallback(() => {
    if (!user) return
    setItems([])
    setCursor(null)
    setHasMore(true)
    setError(null)
    setLoading(true)
    ;(async () => {
      try {
        const q = userEvaluationsQuery(user.uid, undefined, PAGE_SIZE)
        const snap = await getDocs(q)
        const docs = snap.docs.map((d) => d.data() as EvaluationDoc)
        setItems(docs)
        setCursor(snap.docs[snap.docs.length - 1] ?? null)
        setHasMore(snap.docs.length === PAGE_SIZE)
      } catch (err) {
        setError((err as Error).message || '평가 목록을 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  // ─── Stats ───────────────────────────────────────
  const stats = useMemo(() => {
    const ready = items.filter((i) => i.status === 'ready').length
    const inProgress = items.filter((i) => PROGRESS_STATUSES.includes(i.status)).length
    const errorCount = items.filter((i) => i.status === 'error').length
    return {
      total: items.length,
      ready,
      inProgress,
      error: errorCount,
    }
  }, [items])

  // ─── Filtered + sorted items ─────────────────────
  const visibleItems = useMemo(() => {
    let list = items

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter((i) =>
        i.documentMeta.originalName.toLowerCase().includes(q)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      list = list.filter((i) => {
        if (statusFilter === 'ready') return i.status === 'ready'
        if (statusFilter === 'error') return i.status === 'error'
        if (statusFilter === 'progress')
          return PROGRESS_STATUSES.includes(i.status)
        return true
      })
    }

    // Sort
    if (sortMode === 'score') {
      list = [...list].sort((a, b) => {
        const sa =
          a.status === 'ready' && a.synthesis ? a.synthesis.overallScore : -1
        const sb =
          b.status === 'ready' && b.synthesis ? b.synthesis.overallScore : -1
        return sb - sa
      })
    }
    // 'recent' is default server ordering — keep as-is

    return list
  }, [items, searchQuery, statusFilter, sortMode])

  const resetFilters = useCallback(() => {
    setSearchQuery('')
    setStatusFilter('all')
    setSortMode('recent')
  }, [])

  const hasActiveFilter = searchQuery.trim() !== '' || statusFilter !== 'all'

  // ─── Auth gates ──────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-[72px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-6 h-6 text-[#0A0A0A] animate-spin" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#737373]">
            Authenticating
          </span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <HistoryLoginPrompt />
  }

  // ─── Main render ─────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[72px]">
      <HistoryHeader stats={stats} />

      <HistoryFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortMode={sortMode}
        onSortChange={setSortMode}
        viewMode={viewMode}
        onViewChange={setViewMode}
        visibleCount={visibleItems.length}
        totalCount={items.length}
      />

      <main className="max-w-[1280px] mx-auto px-6 py-10">
        {/* Error banner */}
        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 p-4 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-red-700 uppercase tracking-[0.1em] mb-1">
                오류가 발생했습니다
              </p>
              <p className="text-[12px] text-red-600 leading-[1.6] break-words">{error}</p>
            </div>
            <button
              onClick={handleRetry}
              className="flex-shrink-0 px-4 py-2 bg-red-600 text-white text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-red-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && <HistorySkeleton view={viewMode} />}

        {/* Empty (no data at all) */}
        {!loading && items.length === 0 && !error && <HistoryEmptyState />}

        {/* Empty (filtered) */}
        {!loading && items.length > 0 && visibleItems.length === 0 && (
          <HistoryEmptyState filtered onReset={resetFilters} />
        )}

        {/* Data — Grid view */}
        {!loading && visibleItems.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleItems.map((evalDoc, i) => (
              <EvaluationCard key={evalDoc.id} evaluation={evalDoc} index={i} />
            ))}
          </div>
        )}

        {/* Data — Table view */}
        {!loading && visibleItems.length > 0 && viewMode === 'table' && (
          <div className="border border-[#E5E5E5] bg-white overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                <tr>
                  <th className="py-3 px-5 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A3A3A3]">
                    점수
                  </th>
                  <th className="py-3 px-5 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A3A3A3]">
                    문서
                  </th>
                  <th className="py-3 px-5 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A3A3A3]">
                    패키지
                  </th>
                  <th className="py-3 px-5 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A3A3A3]">
                    상태
                  </th>
                  <th className="py-3 px-5 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A3A3A3]">
                    날짜
                  </th>
                  <th className="py-3 px-5" aria-label="이동">
                    <span className="sr-only">이동</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((evalDoc) => (
                  <EvaluationRow key={evalDoc.id} evaluation={evalDoc} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Load more */}
        {!loading && hasMore && !hasActiveFilter && items.length > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-3 border border-[#0A0A0A] bg-white text-[#0A0A0A] px-8 py-4 hover:bg-[#0A0A0A] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
                    불러오는 중...
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
                    더 불러오기
                  </span>
                  <span>&darr;</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* End-of-list marker */}
        {!loading && !hasMore && items.length > 0 && !hasActiveFilter && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-[#E5E5E5]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A3A3A3]">
              End of History
            </span>
            <span className="w-8 h-px bg-[#E5E5E5]" />
          </div>
        )}

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-[10px] text-[#A3A3A3] font-normal tracking-wide uppercase">
            SIRIUS v2.4 &middot; Powered by Claude Sonnet 4.6
          </p>
        </div>
      </main>
    </div>
  )
}
