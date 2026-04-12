'use client'

import { Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AnalystCriterion } from '@/types/ai-evaluation'

// ─────────────────────────────────────────────────────
// 에이전트 내부 세부 criteria 편집
// 단순 CRUD + 가중치 합계 검증
// ─────────────────────────────────────────────────────

interface AgentCriterionEditorProps {
  criteria: AnalystCriterion[]
  onChange: (criteria: AnalystCriterion[]) => void
  disabled?: boolean
}

function makeId() {
  return `crit-${Math.random().toString(36).slice(2, 8)}`
}

export default function AgentCriterionEditor({
  criteria,
  onChange,
  disabled,
}: AgentCriterionEditorProps) {
  const sum = criteria.reduce((s, c) => s + (Number(c.weight) || 0), 0)
  const isValid = criteria.length === 0 || Math.abs(100 - sum) <= 0.5

  const add = () => {
    onChange([
      ...criteria,
      { id: makeId(), label: '', description: '', weight: 0 },
    ])
  }

  const update = (idx: number, patch: Partial<AnalystCriterion>) => {
    const next = criteria.slice()
    next[idx] = { ...next[idx], ...patch }
    onChange(next)
  }

  const remove = (idx: number) => {
    onChange(criteria.filter((_, i) => i !== idx))
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
            세부 평가 기준 (선택)
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5">
            에이전트 내부 루브릭을 더 세분화하려면 추가하세요.
          </p>
        </div>
        <button
          type="button"
          onClick={add}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#004094] bg-white border border-[#004094]/30 rounded-lg hover:bg-[#004094]/5 transition-colors disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5" />
          기준 추가
        </button>
      </div>

      {criteria.length === 0 ? (
        <p className="text-xs text-gray-400 italic py-3 text-center">
          등록된 세부 기준이 없습니다.
        </p>
      ) : (
        <div className="space-y-2">
          {criteria.map((c, idx) => (
            <div
              key={c.id}
              className="grid grid-cols-12 gap-2 items-start rounded-lg bg-white border border-gray-200 p-2.5"
            >
              <input
                type="text"
                value={c.label}
                disabled={disabled}
                onChange={(e) => update(idx, { label: e.target.value })}
                placeholder="기준명"
                className="col-span-3 px-2.5 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-[#004094]"
              />
              <input
                type="text"
                value={c.description}
                disabled={disabled}
                onChange={(e) => update(idx, { description: e.target.value })}
                placeholder="설명"
                className="col-span-6 px-2.5 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-[#004094]"
              />
              <div className="col-span-2 flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={c.weight}
                  disabled={disabled}
                  onChange={(e) =>
                    update(idx, { weight: Number(e.target.value) || 0 })
                  }
                  className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-[#004094] tabular-nums"
                />
                <span className="text-[11px] text-gray-400">%</span>
              </div>
              <button
                type="button"
                onClick={() => remove(idx)}
                disabled={disabled}
                className="col-span-1 inline-flex items-center justify-center w-7 h-7 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                aria-label="기준 삭제"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <div
            className={cn(
              'mt-2 px-3 py-2 rounded-lg text-xs font-mono tabular-nums',
              isValid
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-700'
            )}
          >
            criteria 가중치 합계: {Math.round(sum * 10) / 10} / 100{' '}
            {isValid ? '✓' : `(${Math.round((100 - sum) * 10) / 10} 차이)`}
          </div>
        </div>
      )}
    </div>
  )
}
