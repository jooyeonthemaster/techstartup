'use client'

import { use, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  AlertTriangle,
  History,
  Check,
  Loader2,
  RotateCcw,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import type { EvaluationPackage } from '@/types/ai-evaluation'
import AdminHeader from '../../../components/AdminHeader'
import PackageForm from '../_components/PackageForm'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────
// 패키지 편집 페이지
// 좌: PackageForm / 우: 버전 히스토리
// ─────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditPackagePage({ params }: PageProps) {
  const { id } = use(params)
  const { user, loading: authLoading } = useAuth()
  const searchParams = useSearchParams()
  const updated = searchParams.get('updated') === '1'

  const [pkg, setPkg] = useState<EvaluationPackage | null>(null)
  const [versionHistory, setVersionHistory] = useState<EvaluationPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formKey, setFormKey] = useState(0)
  const [restoredLabel, setRestoredLabel] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const idToken = await user.getIdToken()
      const res = await fetch(`/api/ai-evaluation/packages/${id}`, {
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
          `패키지를 불러오지 못했습니다. (${res.status})`
        throw new Error(msg)
      }
      const data = body as {
        package?: EvaluationPackage
        versionHistory?: EvaluationPackage[]
      } | null
      if (data?.package) setPkg(data.package)
      setVersionHistory(data?.versionHistory ?? [])
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류')
    } finally {
      setLoading(false)
    }
  }, [user, id])

  useEffect(() => {
    if (authLoading) return
    if (!user) return
    load()
  }, [authLoading, user, load])

  const handleRestore = (v: EvaluationPackage) => {
    const ok = window.confirm(
      `v${v.version} 내용으로 폼을 되돌립니다. (아직 저장되지 않습니다)`
    )
    if (!ok) return
    setPkg({
      ...v,
      // 편집 대상 id/version은 현재 활성 버전 유지
      id: pkg?.id ?? v.id,
      version: pkg?.version ?? v.version,
      isActive: pkg?.isActive ?? v.isActive,
    })
    setRestoredLabel(`v${v.version}`)
    setFormKey((k) => k + 1)
  }

  // ─── Render ────────────────────────────────────────
  if (loading) {
    return (
      <div>
        <BackLink />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#004094]" />
        </div>
      </div>
    )
  }

  if (error || !pkg) {
    return (
      <div>
        <BackLink />
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800">패키지를 불러올 수 없습니다</p>
            <p className="text-sm text-red-700 mt-1">{error ?? '존재하지 않거나 삭제된 패키지입니다.'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <BackLink />

      <AdminHeader
        title={pkg.name}
        description={pkg.description}
        actions={
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full',
                pkg.isActive
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-500'
              )}
            >
              v{pkg.version} {pkg.isActive ? '활성' : '비활성'}
            </span>
            {pkg.isDefault && (
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#004094]/10 text-[#004094]">
                기본
              </span>
            )}
          </div>
        }
      />

      {updated && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 flex items-start gap-3">
          <Check className="w-4 h-4 text-emerald-600 mt-0.5" />
          <p className="text-sm text-emerald-700">
            새 버전이 저장되었습니다.
          </p>
        </div>
      )}

      {restoredLabel && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
          <RotateCcw className="w-4 h-4 text-amber-600 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>{restoredLabel}</strong> 내용이 폼에 복원되었습니다. 저장 전까지는 반영되지 않습니다.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <PackageForm
          mode="edit"
          initial={pkg}
          formKey={`${pkg.id}-${formKey}`}
        />

        <aside className="lg:sticky lg:top-6 self-start">
          <VersionHistoryPanel
            history={versionHistory}
            currentId={pkg.id}
            onRestore={handleRestore}
          />
        </aside>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────

function BackLink() {
  return (
    <Link
      href="/admin/ai-evaluation/packages"
      className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors mb-3"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      패키지 목록
    </Link>
  )
}

function VersionHistoryPanel({
  history,
  currentId,
  onRestore,
}: {
  history: EvaluationPackage[]
  currentId: string
  onRestore: (v: EvaluationPackage) => void
}) {
  // Sort descending by version
  const sorted = [...history].sort((a, b) => b.version - a.version)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <History className="w-4 h-4 text-gray-500" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
          버전 히스토리
        </h3>
        <span className="ml-auto text-[11px] text-gray-400 tabular-nums">
          {sorted.length}개
        </span>
      </div>
      <div className="max-h-[60vh] overflow-y-auto">
        {sorted.length === 0 ? (
          <p className="p-5 text-xs text-gray-400 italic text-center">
            이전 버전이 없습니다.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {sorted.map((v) => {
              const isCurrent = v.id === currentId
              return (
                <li key={v.id} className="px-5 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-bold text-gray-900">
                          v{v.version}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            현재
                          </span>
                        )}
                        {v.isActive && !isCurrent && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            활성
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 tabular-nums">
                        {formatDateTime(v.updatedAt)}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                        {v.createdByEmail}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-1">
                        에이전트 {v.agents?.length ?? 0}명
                      </p>
                    </div>
                    {!isCurrent && (
                      <button
                        type="button"
                        onClick={() => onRestore(v)}
                        className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-[#004094] hover:bg-[#004094]/5 rounded-md transition-colors"
                        aria-label={`v${v.version} 복원`}
                      >
                        <RotateCcw className="w-3 h-3" />
                        복원
                      </button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return '-'
  try {
    const d = new Date(iso)
    return d.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return '-'
  }
}
