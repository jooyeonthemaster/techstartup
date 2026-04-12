'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Brain,
  Loader2,
  Sparkles,
  ArrowRight,
  Users,
  ShieldCheck,
  Layers,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import type { EvaluationPackage } from '@/types/ai-evaluation'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────
// AI 평가 관리 허브 (v2)
// 통계 카드 + Quick Action (에이전트 패키지 관리)
// ─────────────────────────────────────────────────────

interface Stats {
  totalPackages: number
  activePackages: number
  todayEvaluations: number
}

const INITIAL_STATS: Stats = {
  totalPackages: 0,
  activePackages: 0,
  todayEvaluations: 0,
}

export default function AiEvaluationHub() {
  const { user, isAdmin, loading: authLoading } = useAuth()
  const [stats, setStats] = useState<Stats>(INITIAL_STATS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return
    if (!user) return

    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const idToken = await user.getIdToken()
        const qs = isAdmin ? '?includeInactive=true' : ''
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
            `통계 로드 실패 (${res.status})`
          throw new Error(msg)
        }
        const data = body as { packages?: EvaluationPackage[] } | null
        const pkgs = data?.packages ?? []
        if (cancelled) return
        setStats({
          totalPackages: pkgs.length,
          activePackages: pkgs.filter((p) => p.isActive).length,
          todayEvaluations: 0,
        })
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : '통계 로드 실패')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [authLoading, user, isAdmin])

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#1A56DB]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#1A56DB]">
            AI Evaluation
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">AI 평가 관리</h1>
        <p className="text-sm text-gray-500 mt-1">
          사업계획서 AI 평가 에이전트 패키지와 평가 기록을 관리합니다.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="전체 패키지"
          value={stats.totalPackages}
          loading={loading}
          icon={<Layers className="w-5 h-5" />}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="활성 패키지"
          value={stats.activePackages}
          loading={loading}
          icon={<ShieldCheck className="w-5 h-5" />}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="오늘 생성된 평가"
          value={stats.todayEvaluations}
          loading={loading}
          icon={<Brain className="w-5 h-5" />}
          color="bg-purple-50 text-purple-600"
          hint="Phase 9+ 예정"
        />
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Quick Actions */}
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/ai-evaluation/packages"
          className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#1A56DB]/40 hover:shadow-lg transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900">
              에이전트 패키지
            </h3>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1A56DB] group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-sm text-gray-500">
            재사용 가능한 분석가 에이전트 묶음을 생성·편집하고 버전을 관리합니다.
          </p>
        </Link>

        <div
          className="relative bg-white rounded-2xl p-6 border border-gray-200 opacity-60 cursor-not-allowed"
          aria-disabled="true"
        >
          <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
            준비 중
          </span>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            평가 현황
          </h3>
          <p className="text-sm text-gray-500">
            사용자 평가 기록 및 분석 대시보드 (Phase 9+)
          </p>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  loading,
  icon,
  color,
  hint,
}: {
  label: string
  value: number
  loading: boolean
  icon: React.ReactNode
  color: string
  hint?: string
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center',
            color
          )}
        >
          {icon}
        </div>
        {hint && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            {hint}
          </span>
        )}
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <div className="mt-1 h-9 flex items-center">
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin text-gray-300" />
        ) : (
          <p className="text-3xl font-bold text-gray-900 tabular-nums">
            {value.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  )
}
