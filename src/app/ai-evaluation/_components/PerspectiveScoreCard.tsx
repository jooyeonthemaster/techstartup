'use client'

import { ArrowUpRight } from 'lucide-react'
import type { AgentPerspective, AnalystAgent } from '@/types/ai-evaluation'
import { GRADE_CONFIG, getGradeAccent, getScoreColor } from '../report-data'
import AgentAvatarBadge from './AgentAvatarBadge'

export default function PerspectiveScoreCard({
  agent,
  perspective,
  onClick,
}: {
  agent: AnalystAgent
  perspective: AgentPerspective
  onClick: () => void
}) {
  const scoreColor = getScoreColor(perspective.score)
  const gradeAccent = getGradeAccent(perspective.grade)
  const gradeLabel = GRADE_CONFIG[perspective.grade]?.label ?? perspective.gradeLabel

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col w-full text-left bg-white border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors h-full min-h-[200px]"
    >
      {/* Top accent bar */}
      <span
        aria-hidden
        className="absolute left-0 right-0 top-0 h-[3px]"
        style={{ backgroundColor: agent.accentColor || '#0A0A0A' }}
      />

      <div className="p-5 flex flex-col h-full">
        {/* Header: avatar + role */}
        <div className="flex items-start gap-3 mb-4">
          <AgentAvatarBadge agent={agent} size="md" />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-[#0A0A0A] tracking-tight leading-tight truncate">
              {agent.role}
            </p>
            <p className="text-[10px] text-[#A3A3A3] font-medium leading-snug mt-0.5 line-clamp-2">
              {agent.tagline}
            </p>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#0A0A0A] shrink-0" />
        </div>

        {/* Score + Grade */}
        <div className="flex items-end justify-between gap-2 mt-auto mb-3">
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-[40px] font-extrabold tabular-nums leading-none"
              style={{ color: scoreColor }}
            >
              {perspective.score}
            </span>
            <span className="text-[11px] text-[#A3A3A3] font-medium tabular-nums">/100</span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span
              className="px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-white"
              style={{ backgroundColor: gradeAccent }}
            >
              {perspective.grade}
            </span>
            <span className="text-[9px] text-[#A3A3A3] font-medium tracking-[0.05em]">
              {gradeLabel}
            </span>
          </div>
        </div>

        {/* Confidence bar */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-semibold tracking-[0.06em] text-[#A3A3A3] shrink-0">
            신뢰도
          </span>
          <div className="flex-1 h-[2px] bg-[#E5E5E5]">
            <div
              className="h-full bg-[#0A0A0A]"
              style={{ width: `${Math.min(100, Math.max(0, perspective.confidence))}%` }}
            />
          </div>
          <span className="text-[10px] font-bold tabular-nums text-[#0A0A0A] shrink-0">
            {perspective.confidence}%
          </span>
        </div>
      </div>
    </button>
  )
}
