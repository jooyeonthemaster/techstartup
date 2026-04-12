'use client'

import Link from 'next/link'
import {
  Plus,
  Loader2,
  Sparkles,
  Users,
  ShieldCheck,
} from 'lucide-react'
import type { EvaluationPackage } from '@/types/ai-evaluation'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────
// Presentational helpers for the packages list page
// ─────────────────────────────────────────────────────

export function PackageTable({ packages }: { packages: EvaluationPackage[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-5 py-3">이름 / 구성</th>
              <th className="px-5 py-3 text-center">에이전트</th>
              <th className="px-5 py-3 text-center">버전</th>
              <th className="px-5 py-3 text-center">기본</th>
              <th className="px-5 py-3 text-center">상태</th>
              <th className="px-5 py-3">수정일</th>
              <th className="px-5 py-3 w-20" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {packages.map((p) => (
              <PackageRow key={p.id} pkg={p} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PackageRow({ pkg }: { pkg: EvaluationPackage }) {
  const roles = pkg.agents?.slice(0, 7).map((a) => a.role).join(' · ') ?? ''
  return (
    <tr
      className={cn(
        'relative hover:bg-gray-50/60 transition-colors',
        !pkg.isActive && 'opacity-60'
      )}
    >
      {pkg.isDefault && (
        <td
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-1 bg-[#004094]"
        />
      )}
      <td className="px-5 py-4">
        <Link
          href={`/admin/ai-evaluation/packages/${pkg.id}`}
          className="block group"
        >
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 group-hover:text-[#004094] transition-colors">
              {pkg.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
              {pkg.description}
            </p>
            {roles && (
              <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                {roles}
                {pkg.agents.length > 7 && ` +${pkg.agents.length - 7}`}
              </p>
            )}
          </div>
        </Link>
      </td>
      <td className="px-5 py-4 text-center">
        <span className="inline-flex items-center gap-1 text-xs font-mono text-gray-700">
          <Users className="w-3.5 h-3.5 text-gray-400" />
          {pkg.agents?.length ?? 0}
        </span>
      </td>
      <td className="px-5 py-4 text-center">
        <span className="text-xs font-mono font-semibold text-gray-700">
          v{pkg.version}
        </span>
      </td>
      <td className="px-5 py-4 text-center">
        {pkg.isDefault ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-[#004094]/10 text-[#004094]">
            <ShieldCheck className="w-3 h-3" />
            기본
          </span>
        ) : (
          <span className="text-gray-300">—</span>
        )}
      </td>
      <td className="px-5 py-4 text-center">
        <span
          className={cn(
            'inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full',
            pkg.isActive
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-gray-100 text-gray-500'
          )}
        >
          {pkg.isActive ? '활성' : '비활성'}
        </span>
      </td>
      <td className="px-5 py-4 text-xs text-gray-500 tabular-nums whitespace-nowrap">
        {formatDate(pkg.updatedAt)}
      </td>
      <td className="px-5 py-4 text-right whitespace-nowrap">
        <Link
          href={`/admin/ai-evaluation/packages/${pkg.id}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#004094] hover:bg-[#004094]/5 rounded-lg transition-colors"
        >
          편집
        </Link>
      </td>
    </tr>
  )
}

export function PackageListEmptyState({
  onSeed,
  seeding,
}: {
  onSeed: () => void
  seeding: boolean
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mb-5">
          <Users className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          첫 패키지를 만들어보세요
        </h3>
        <p className="text-sm text-gray-500 max-w-md mb-6">
          KTVSA가 설계한 기본 7명 구성으로 바로 시작하거나, 직접 커스텀 패키지를 만들 수 있습니다.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#004094] bg-white border border-[#004094]/30 rounded-xl hover:bg-[#004094]/5 transition-colors disabled:opacity-50"
          >
            {seeding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            시드로 시작
          </button>
          <Link
            href="/admin/ai-evaluation/packages/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#004094] hover:bg-[#004094]/90 rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            직접 생성
          </Link>
        </div>
      </div>
    </div>
  )
}

export function PackageListSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-100">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="px-5 py-5 flex items-center gap-4 animate-pulse"
          >
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-gray-100 rounded" />
              <div className="h-3 w-2/3 bg-gray-100 rounded" />
              <div className="h-3 w-1/2 bg-gray-100 rounded" />
            </div>
            <div className="h-6 w-12 bg-gray-100 rounded" />
            <div className="h-6 w-12 bg-gray-100 rounded" />
            <div className="h-6 w-16 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '-'
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  } catch {
    return '-'
  }
}
