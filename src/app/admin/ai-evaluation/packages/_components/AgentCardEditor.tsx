'use client'

import { useState } from 'react'
import {
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Trash2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AnalystAgent, AnalystCriterion } from '@/types/ai-evaluation'
import AgentCriterionEditor from './AgentCriterionEditor'
import FocusAreasEditor from './FocusAreasEditor'

// ─────────────────────────────────────────────────────
// 단일 에이전트 편집 카드 (접힘/펼침)
// ─────────────────────────────────────────────────────

interface AgentCardEditorProps {
  agent: AnalystAgent
  index: number
  total: number
  /** 신규 에이전트(id 편집 가능) 여부 */
  isNew: boolean
  disabled?: boolean
  onChange: (agent: AnalystAgent) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  errors?: Partial<Record<keyof AnalystAgent, string>>
}

export default function AgentCardEditor({
  agent,
  index,
  total,
  isNew,
  disabled,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  errors,
}: AgentCardEditorProps) {
  const [expanded, setExpanded] = useState(false)
  const [criteriaOpen, setCriteriaOpen] = useState(false)

  const set = <K extends keyof AnalystAgent>(k: K, v: AnalystAgent[K]) => {
    onChange({ ...agent, [k]: v })
  }

  const setCriteria = (criteria: AnalystCriterion[]) => {
    set('criteria', criteria)
  }

  return (
    <div
      className={cn(
        'rounded-xl border bg-white transition-all',
        expanded ? 'border-gray-300 shadow-sm' : 'border-gray-200',
        disabled && 'opacity-60'
      )}
    >
      {/* Collapsed header */}
      <div className="flex items-center gap-3 p-4">
        <div
          className="w-1 h-10 rounded-full flex-shrink-0"
          style={{ backgroundColor: agent.accentColor || '#94a3b8' }}
          aria-hidden
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-900 truncate">
              {agent.role || '(역할명 미입력)'}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 flex-shrink-0">
              #{index + 1}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 tabular-nums flex-shrink-0">
              {Math.round((agent.weight || 0) * 10) / 10}%
            </span>
          </div>
          {agent.tagline && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {agent.tagline}
            </p>
          )}
        </div>

        {/* Move up/down */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={disabled || index === 0}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="위로 이동"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={disabled || index === total - 1}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="아래로 이동"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            disabled={disabled}
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            aria-label={expanded ? '접기' : '펼치기'}
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={disabled}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-40"
            aria-label="에이전트 삭제"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-gray-100 p-5 space-y-4 bg-gray-50/40">
          {/* id + accentColor row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <MiniField label="에이전트 ID (slug)" required error={errors?.id}>
              <input
                type="text"
                value={agent.id}
                disabled={disabled || !isNew}
                onChange={(e) =>
                  set(
                    'id',
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, '-')
                      .replace(/-+/g, '-')
                  )
                }
                placeholder="vc-analyst"
                className={inputClass(!!errors?.id)}
              />
              {!isNew && (
                <p className="mt-1 text-[11px] text-gray-400">
                  기존 에이전트의 ID는 변경할 수 없습니다.
                </p>
              )}
            </MiniField>

            <MiniField label="가중치 (%)" required error={errors?.weight}>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.5}
                  value={agent.weight}
                  disabled={disabled}
                  onChange={(e) => set('weight', Number(e.target.value) || 0)}
                  className={cn(inputClass(false), 'w-20 tabular-nums')}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.5}
                  value={agent.weight}
                  disabled={disabled}
                  onChange={(e) => set('weight', Number(e.target.value) || 0)}
                  className="flex-1 accent-[#004094]"
                />
              </div>
            </MiniField>

            <MiniField label="강조 색상">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={agent.accentColor || '#94a3b8'}
                  disabled={disabled}
                  onChange={(e) => set('accentColor', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer bg-white"
                />
                <input
                  type="text"
                  value={agent.accentColor || ''}
                  disabled={disabled}
                  onChange={(e) => set('accentColor', e.target.value)}
                  placeholder="#0369A1"
                  className={cn(inputClass(false), 'flex-1 font-mono text-xs')}
                />
              </div>
            </MiniField>
          </div>

          {/* role + tagline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <MiniField label="역할명 (role)" required error={errors?.role}>
              <input
                type="text"
                value={agent.role}
                disabled={disabled}
                onChange={(e) => set('role', e.target.value)}
                placeholder="VC 투자심사역"
                className={inputClass(!!errors?.role)}
              />
            </MiniField>
            <MiniField label="한 줄 설명 (tagline)" required error={errors?.tagline}>
              <input
                type="text"
                value={agent.tagline}
                disabled={disabled}
                onChange={(e) => set('tagline', e.target.value.slice(0, 120))}
                maxLength={120}
                placeholder="시드~시리즈B 투자심사 경험이 풍부한 벤처캐피털 심사역"
                className={inputClass(!!errors?.tagline)}
              />
            </MiniField>
          </div>

          {/* persona */}
          <MiniField label="상세 페르소나 (persona)" required error={errors?.persona}>
            <textarea
              value={agent.persona}
              disabled={disabled}
              onChange={(e) => set('persona', e.target.value)}
              rows={6}
              placeholder="10년차 VC 심사역. 주로 B2B SaaS, AI/ML 딥테크, 헬스케어 분야를..."
              className={cn(textareaClass(!!errors?.persona), 'text-xs')}
            />
          </MiniField>

          {/* systemPrompt */}
          <MiniField
            label="시스템 프롬프트 (systemPrompt)"
            required
            error={errors?.systemPrompt}
          >
            <textarea
              value={agent.systemPrompt}
              disabled={disabled}
              onChange={(e) => set('systemPrompt', e.target.value)}
              rows={16}
              placeholder="# 당신의 임무&#10;..."
              className={cn(
                textareaClass(!!errors?.systemPrompt),
                'font-mono text-[11px] leading-relaxed'
              )}
            />
          </MiniField>

          {/* focusAreas */}
          <FocusAreasEditor
            value={agent.focusAreas ?? []}
            onChange={(next) => set('focusAreas', next)}
            disabled={disabled}
            error={errors?.focusAreas as string | undefined}
          />

          {/* scoringRubric */}
          <MiniField
            label="채점 루브릭 (scoringRubric)"
            required
            error={errors?.scoringRubric}
          >
            <textarea
              value={agent.scoringRubric}
              disabled={disabled}
              onChange={(e) => set('scoringRubric', e.target.value)}
              rows={6}
              placeholder="- 90-100 (S): ...&#10;- 80-89 (A): ..."
              className={cn(
                textareaClass(!!errors?.scoringRubric),
                'font-mono text-xs'
              )}
            />
          </MiniField>

          {/* criteria (optional, collapsible) */}
          <div>
            <button
              type="button"
              onClick={() => setCriteriaOpen((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
            >
              {criteriaOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
              세부 평가 기준 ({(agent.criteria ?? []).length})
            </button>
            {criteriaOpen && (
              <div className="mt-3">
                <AgentCriterionEditor
                  criteria={agent.criteria ?? []}
                  onChange={setCriteria}
                  disabled={disabled}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────

function MiniField({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full px-3 py-2 text-sm rounded-lg border bg-white transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-[#004094]/20 disabled:opacity-60 disabled:cursor-not-allowed',
    hasError
      ? 'border-red-300 focus:border-red-500'
      : 'border-gray-200 focus:border-[#004094]'
  )
}

function textareaClass(hasError: boolean) {
  return cn(
    'w-full px-3 py-2 text-sm rounded-lg border bg-white transition-colors resize-y',
    'focus:outline-none focus:ring-2 focus:ring-[#004094]/20 disabled:opacity-60 disabled:cursor-not-allowed',
    hasError
      ? 'border-red-300 focus:border-red-500'
      : 'border-gray-200 focus:border-[#004094]'
  )
}
