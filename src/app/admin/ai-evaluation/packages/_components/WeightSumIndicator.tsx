'use client'

import { AlertTriangle, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AnalystAgent } from '@/types/ai-evaluation'

// ─────────────────────────────────────────────────────
// Agent weight sum indicator
// 100/100 ✓ (green) or 95/100 (5 부족) (red) / 105/100 (5 초과) (red)
// ─────────────────────────────────────────────────────

interface WeightSumIndicatorProps {
  agents: Pick<AnalystAgent, 'weight'>[]
  /** 허용 오차 (합 = 100 ± tolerance) */
  tolerance?: number
  className?: string
}

export default function WeightSumIndicator({
  agents,
  tolerance = 0.5,
  className,
}: WeightSumIndicatorProps) {
  const sum = agents.reduce((s, a) => s + (Number(a.weight) || 0), 0)
  const rounded = Math.round(sum * 10) / 10
  const diff = 100 - rounded
  const isValid = Math.abs(diff) <= tolerance

  // progress bar (cap at 100)
  const pct = Math.min(Math.max(rounded, 0), 150)
  const pctDisplay = (pct / 150) * 100

  return (
    <div
      className={cn(
        'rounded-xl border p-4',
        isValid
          ? 'border-emerald-200 bg-emerald-50'
          : 'border-red-200 bg-red-50',
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isValid ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600" />
          )}
          <span
            className={cn(
              'text-sm font-semibold',
              isValid ? 'text-emerald-700' : 'text-red-700'
            )}
          >
            에이전트 가중치 합계
          </span>
        </div>
        <span
          className={cn(
            'text-sm font-mono font-bold tabular-nums',
            isValid ? 'text-emerald-700' : 'text-red-700'
          )}
        >
          {rounded} / 100
          {!isValid && (
            <span className="ml-2 text-xs font-normal">
              ({diff > 0 ? `${Math.abs(diff)} 부족` : `${Math.abs(diff)} 초과`})
            </span>
          )}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 rounded-full bg-white/60 overflow-hidden">
        <div
          className={cn(
            'absolute inset-y-0 left-0 transition-all duration-300',
            isValid ? 'bg-emerald-500' : 'bg-red-500'
          )}
          style={{ width: `${pctDisplay}%` }}
        />
        {/* 100% marker */}
        <div
          className="absolute inset-y-0 w-px bg-gray-700/30"
          style={{ left: `${(100 / 150) * 100}%` }}
          aria-hidden
        />
      </div>

      {!isValid && (
        <p className="mt-2 text-xs text-red-700">
          모든 에이전트의 weight 합이 정확히 100이 되어야 저장할 수 있습니다.
        </p>
      )}
    </div>
  )
}
