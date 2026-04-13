'use client'

import { useEffect, useRef } from 'react'
import { Check, Loader2, X, LayoutGrid } from 'lucide-react'
import type { AgentPerspective, AnalystAgent } from '@/types/ai-evaluation'
import type { AgentRunStatus } from '../report-data'

export type AgentTabId = 'synthesis' | string

export default function AgentTabs({
  agents,
  perspectives,
  agentStatuses,
  activeId,
  onSelect,
}: {
  agents: AnalystAgent[]
  perspectives: Record<string, AgentPerspective>
  agentStatuses?: Record<string, AgentRunStatus>
  activeId: AgentTabId
  onSelect: (id: AgentTabId) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 활성 탭을 가로 스크롤 가운데로 유지
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const el = container.querySelector<HTMLButtonElement>(`[data-tab-id="${activeId}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeId])

  const sortedAgents = [...agents].sort((a, b) => a.order - b.order)

  return (
    <div className="fixed top-[56px] left-0 right-0 z-[55] bg-white border-b border-[#E5E5E5] h-[52px]">
      <div
        ref={containerRef}
        className="h-full overflow-x-auto scrollbar-hide flex items-stretch"
      >
        {/* 종합 탭 */}
        <SynthesisTab
          active={activeId === 'synthesis'}
          onClick={() => onSelect('synthesis')}
        />

        {/* 에이전트 탭 */}
        {sortedAgents.map((agent) => {
          const perspective = perspectives[agent.id]
          const status: AgentRunStatus =
            agentStatuses?.[agent.id] ??
            (perspective ? 'completed' : 'pending')
          return (
            <AgentTab
              key={agent.id}
              agent={agent}
              perspective={perspective}
              status={status}
              active={activeId === agent.id}
              onClick={() => onSelect(agent.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

// ─── Synthesis tab ───────────────────────────────────
function SynthesisTab({
  active,
  onClick,
}: {
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      data-tab-id="synthesis"
      onClick={onClick}
      className={`relative h-full px-5 flex items-center gap-2 border-r border-[#E5E5E5] transition-colors shrink-0 ${
        active ? 'bg-[#FAFAFA]' : 'bg-white hover:bg-[#FAFAFA]'
      }`}
    >
      <div className="w-5 h-5 border border-[#0A0A0A] flex items-center justify-center shrink-0">
        <LayoutGrid className="w-2.5 h-2.5 text-[#0A0A0A]" />
      </div>
      <span className="text-[11px] font-bold tracking-[0.06em] text-[#0A0A0A]">
        종합
      </span>
      {active && (
        <span
          aria-hidden
          className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#0A0A0A]"
        />
      )}
    </button>
  )
}

// ─── Agent tab ───────────────────────────────────────
function AgentTab({
  agent,
  perspective,
  status,
  active,
  onClick,
}: {
  agent: AnalystAgent
  perspective?: AgentPerspective
  status: AgentRunStatus
  active: boolean
  onClick: () => void
}) {
  const score = perspective?.score
  const accent = agent.accentColor || '#0A0A0A'

  return (
    <button
      type="button"
      data-tab-id={agent.id}
      onClick={onClick}
      disabled={status === 'pending' && !perspective}
      className={`relative h-full px-4 flex items-center gap-3 border-r border-[#E5E5E5] transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed ${
        active ? 'bg-[#FAFAFA]' : 'bg-white hover:bg-[#FAFAFA]'
      }`}
    >
      {/* Left accent bar */}
      <span
        aria-hidden
        className="absolute left-0 top-2 bottom-2 w-[2px]"
        style={{ backgroundColor: accent }}
      />

      <div className="flex flex-col items-start gap-0.5 ml-2">
        <span className="text-[11px] font-bold tracking-[0.04em] text-[#0A0A0A] whitespace-nowrap">
          {agent.role}
        </span>
        <div className="flex items-center gap-2">
          {typeof score === 'number' ? (
            <span className="text-[12px] font-bold tabular-nums text-[#737373] leading-none">
              {score}
              <span className="text-[9px] text-[#A3A3A3] ml-0.5">/100</span>
            </span>
          ) : (
            <span className="text-[9px] font-medium text-[#A3A3A3] tracking-[0.06em] leading-none">
              {statusLabel(status)}
            </span>
          )}
          <StatusIcon status={status} />
        </div>
      </div>

      {active && (
        <span
          aria-hidden
          className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#0A0A0A]"
        />
      )}
    </button>
  )
}

function StatusIcon({ status }: { status: AgentRunStatus }) {
  switch (status) {
    case 'running':
      return <Loader2 className="w-3 h-3 text-[#1A56DB] animate-spin" />
    case 'completed':
      return <Check className="w-3 h-3 text-[#047857]" />
    case 'failed':
      return <X className="w-3 h-3 text-[#B91C1C]" />
    case 'pending':
    default:
      return <span className="w-1.5 h-1.5 bg-[#E5E5E5]" />
  }
}

function statusLabel(status: AgentRunStatus): string {
  switch (status) {
    case 'running':
      return '분석 중'
    case 'completed':
      return '완료'
    case 'failed':
      return '실패'
    case 'pending':
    default:
      return '대기'
  }
}
