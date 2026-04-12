'use client'

import { useState } from 'react'
import { Plus, Users, Sparkles } from 'lucide-react'
import type { AnalystAgent } from '@/types/ai-evaluation'
import { DEFAULT_AGENTS } from '@/lib/ai-evaluation/default-agents'
import AgentCardEditor from './AgentCardEditor'
import AgentTemplatePicker from './AgentTemplatePicker'

// ─────────────────────────────────────────────────────
// 에이전트 목록 편집기
// 추가 / 삭제 / 순서 / 가중치 / 기본 7명 로드
// ─────────────────────────────────────────────────────

interface AgentListEditorProps {
  agents: AnalystAgent[]
  /** 신규 모드에서 추가된 에이전트인지 판단용 */
  initialAgentIds?: Set<string>
  onChange: (agents: AnalystAgent[]) => void
  disabled?: boolean
  agentErrors?: Record<string, Partial<Record<keyof AnalystAgent, string>>>
}

const MAX_AGENTS = 15

function makeEmptyAgent(order: number): AnalystAgent {
  const rand = Math.random().toString(36).slice(2, 8)
  return {
    id: `agent-${rand}`,
    role: '',
    tagline: '',
    persona: '',
    systemPrompt: '',
    focusAreas: [''],
    scoringRubric: '',
    weight: 0,
    order,
    accentColor: '#004094',
    criteria: [],
  }
}

/** Normalize order numbers 0..n-1 based on array index */
function reorder(agents: AnalystAgent[]): AnalystAgent[] {
  return agents.map((a, i) => ({ ...a, order: i }))
}

export default function AgentListEditor({
  agents,
  initialAgentIds,
  onChange,
  disabled,
  agentErrors,
}: AgentListEditorProps) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const knownIds = initialAgentIds ?? new Set<string>()

  const addAgent = () => {
    if (agents.length >= MAX_AGENTS) return
    onChange(reorder([...agents, makeEmptyAgent(agents.length)]))
  }

  const updateAgent = (idx: number, next: AnalystAgent) => {
    const arr = agents.slice()
    arr[idx] = next
    onChange(arr)
  }

  const deleteAgent = (idx: number) => {
    onChange(reorder(agents.filter((_, i) => i !== idx)))
  }

  const moveUp = (idx: number) => {
    if (idx === 0) return
    const arr = agents.slice()
    ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
    onChange(reorder(arr))
  }
  const moveDown = (idx: number) => {
    if (idx === agents.length - 1) return
    const arr = agents.slice()
    ;[arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
    onChange(reorder(arr))
  }

  const loadDefault = () => {
    // deep clone
    const next: AnalystAgent[] = DEFAULT_AGENTS.map((a, i) => ({
      ...a,
      focusAreas: [...a.focusAreas],
      criteria: a.criteria?.map((c) => ({ ...c })) ?? [],
      order: i,
    }))
    onChange(next)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-gray-800">
            분석가 에이전트
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            에이전트 <span className="font-semibold text-gray-800">{agents.length}명</span>
            {agents.length >= MAX_AGENTS && (
              <span className="ml-2 text-amber-600">(최대 {MAX_AGENTS}명)</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            disabled={disabled}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#004094] bg-white border border-[#004094]/30 rounded-lg hover:bg-[#004094]/5 transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            기본 7명 로드
          </button>
          <button
            type="button"
            onClick={addAgent}
            disabled={disabled || agents.length >= MAX_AGENTS}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#004094] hover:bg-[#004094]/90 rounded-lg transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-3.5 h-3.5" />
            에이전트 추가
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {agents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
            <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-gray-300" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              에이전트가 없습니다
            </h4>
            <p className="text-xs text-gray-500 mb-5 text-center">
              새 에이전트를 직접 추가하거나 KTVSA 기본 7명 구성을 불러오세요.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                disabled={disabled}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#004094] bg-white border border-[#004094]/30 rounded-lg hover:bg-[#004094]/5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                기본 7명 로드
              </button>
              <button
                type="button"
                onClick={addAgent}
                disabled={disabled}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#004094] hover:bg-[#004094]/90 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                빈 에이전트 추가
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {agents.map((agent, idx) => (
              <AgentCardEditor
                key={`${agent.id}-${idx}`}
                agent={agent}
                index={idx}
                total={agents.length}
                isNew={!knownIds.has(agent.id)}
                disabled={disabled}
                onChange={(next) => updateAgent(idx, next)}
                onDelete={() => deleteAgent(idx)}
                onMoveUp={() => moveUp(idx)}
                onMoveDown={() => moveDown(idx)}
                errors={agentErrors?.[agent.id]}
              />
            ))}
          </div>
        )}
      </div>

      {/* Template picker modal */}
      <AgentTemplatePicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onLoad={loadDefault}
        willReplace={agents.length > 0}
      />
    </div>
  )
}
