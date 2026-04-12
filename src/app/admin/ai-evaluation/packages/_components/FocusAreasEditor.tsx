'use client'

import { Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────
// 에이전트 focusAreas 동적 리스트 편집
// ─────────────────────────────────────────────────────

interface FocusAreasEditorProps {
  value: string[]
  onChange: (next: string[]) => void
  disabled?: boolean
  error?: string
}

export default function FocusAreasEditor({
  value,
  onChange,
  disabled,
  error,
}: FocusAreasEditorProps) {
  const addOne = () => onChange([...(value ?? []), ''])
  const updateOne = (i: number, v: string) => {
    const next = (value ?? []).slice()
    next[i] = v
    onChange(next)
  }
  const removeOne = (i: number) =>
    onChange((value ?? []).filter((_, idx) => idx !== i))

  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
        집중 관점 (focusAreas) <span className="ml-1 text-red-500">*</span>
      </label>
      <div className="space-y-2">
        {(value ?? []).length === 0 && (
          <p className="text-xs text-gray-400 italic">
            최소 1개 이상의 관점을 추가해야 합니다.
          </p>
        )}
        {(value ?? []).map((area, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={area}
              disabled={disabled}
              onChange={(e) => updateOne(i, e.target.value)}
              placeholder="예: 시장 규모 및 성장성"
              className={cn(
                'w-full px-3 py-2 text-sm rounded-lg border bg-white transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-[#004094]/20 disabled:opacity-60 disabled:cursor-not-allowed',
                'border-gray-200 focus:border-[#004094]'
              )}
            />
            <button
              type="button"
              onClick={() => removeOne(i)}
              disabled={disabled}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              aria-label="관점 삭제"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addOne}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#004094] bg-white border border-dashed border-[#004094]/40 rounded-lg hover:bg-[#004094]/5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          관점 추가
        </button>
      </div>
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  )
}
