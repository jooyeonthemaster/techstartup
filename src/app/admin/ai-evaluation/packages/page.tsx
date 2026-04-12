'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Plus,
  Loader2,
  Sparkles,
  AlertTriangle,
  ArrowLeft,
  Check,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import type { EvaluationPackage } from '@/types/ai-evaluation'
import AdminHeader from '../../components/AdminHeader'
import {
  PackageTable,
  PackageListEmptyState,
  PackageListSkeleton,
} from './_components/PackageListTable'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────
// Admin / AI Evaluation / Packages 목록
// ─────────────────────────────────────────────────────

type FilterMode = 'active' | 'all'

export default function PackageListPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const created = searchParams.get('created') === '1'
  const updated = searchParams.get('updated') === '1'

  const [filter, setFilter] = useState<FilterMode>('active')
  const [packages, setPackages] = useState<EvaluationPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [seeding, setSeeding] = useState(false)
  const [seedMessage, setSeedMessage] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const idToken = await user.getIdToken()
      const qs = filter === 'all' ? '?includeInactive=true' : ''
      const res = await fetch(`/api/ai-evaluation/packages${qs}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${idToken}` },
        cache: 'no-store',
      })
      const text = await res.text()
      let body: unknown = null
      if (text) {
        try {
          body = JSON.parse(text)
        } catch {
          body = null
        }
      }
      if (!res.ok) {
        const msg =
          (body as { error?: string } | null)?.error ??
          `패키지 목록을 불러오지 못했습니다. (${res.status})`
        throw new Error(msg)
      }
      const data = body as { packages?: EvaluationPackage[] } | null
      setPackages(data?.packages ?? [])
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류')
    } finally {
      setLoading(false)
    }
  }, [user, filter])

  useEffect(() => {
    if (authLoading) return
    if (!user) return
    load()
  }, [authLoading, user, load])

  const handleSeed = async () => {
    if (!user) return
    const ok = window.confirm(
      '기본 패키지(KTVSA 표준 7인 분석가)를 생성하시겠습니까?\n이미 기본 패키지가 존재하면 생성되지 않습니다.'
    )
    if (!ok) return

    setSeeding(true)
    setSeedMessage(null)
    try {
      const idToken = await user.getIdToken()
      const res = await fetch('/api/ai-evaluation/packages/seed', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      })
      const text = await res.text()
      let body: unknown = null
      if (text) {
        try {
          body = JSON.parse(text)
        } catch {
          body = null
        }
      }
      if (!res.ok) {
        const msg =
          (body as { error?: string } | null)?.error ??
          `시드 생성에 실패했습니다. (${res.status})`
        throw new Error(msg)
      }
      const data = body as { seeded?: boolean; packageId?: string } | null
      setSeedMessage(
        data?.seeded
          ? '기본 패키지를 생성했습니다.'
          : '이미 기본 패키지가 존재합니다.'
      )
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : '시드 생성 실패')
    } finally {
      setSeeding(false)
    }
  }

  const dismissFlag = () => {
    router.replace('/admin/ai-evaluation/packages')
  }

  return (
    <div>
      <Link
        href="/admin/ai-evaluation"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors mb-3"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        AI 평가 관리
      </Link>

      <AdminHeader
        title="에이전트 패키지 관리"
        description="재사용 가능한 분석가 에이전트 묶음(패키지)을 생성·편집하고 버전을 관리합니다."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSeed}
              disabled={seeding}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
            >
              {seeding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              기본 패키지 시드
            </button>
            <Link
              href="/admin/ai-evaluation/packages/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#004094] text-white text-sm font-medium rounded-xl hover:bg-[#004094]/90 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />새 패키지
            </Link>
          </div>
        }
      />

      {(created || updated) && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 flex items-start gap-3">
          <Check className="w-4 h-4 text-emerald-600 mt-0.5" />
          <div className="flex-1 text-sm text-emerald-700">
            {created && '새 패키지가 생성되었습니다.'}
            {updated && '패키지 새 버전이 저장되었습니다.'}
          </div>
          <button
            type="button"
            onClick={dismissFlag}
            className="text-xs text-emerald-600 hover:text-emerald-800"
          >
            닫기
          </button>
        </div>
      )}

      {seedMessage && (
        <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          {seedMessage}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex items-center gap-1 mb-6 p-1 bg-gray-100 rounded-xl w-fit">
        {(['active', 'all'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200',
              filter === f
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {f === 'active' ? '활성만' : '전체 (비활성 포함)'}
          </button>
        ))}
      </div>

      {loading ? (
        <PackageListSkeleton />
      ) : packages.length === 0 ? (
        <PackageListEmptyState onSeed={handleSeed} seeding={seeding} />
      ) : (
        <PackageTable packages={packages} />
      )}
    </div>
  )
}
