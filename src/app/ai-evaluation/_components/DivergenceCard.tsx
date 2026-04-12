'use client'

import { AlertTriangle } from 'lucide-react'
import type { AnalystAgent, Divergence } from '@/types/ai-evaluation'
import AgentAvatarBadge from './AgentAvatarBadge'

export default function DivergenceCard({
  divergence,
  agents,
}: {
  divergence: Divergence
  agents: AnalystAgent[]
}) {
  const agentMap = new Map(agents.map((a) => [a.id, a]))
  const positions = divergence.positions ?? []

  // 최소 1컬럼, 최대 3컬럼 (그 이상은 wrap)
  const colsClass =
    positions.length >= 3
      ? 'md:grid-cols-3'
      : positions.length === 2
        ? 'md:grid-cols-2'
        : 'md:grid-cols-1'

  return (
    <div className="border border-[#E5E5E5] bg-white">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#E5E5E5] bg-[#FAFAFA] flex items-start gap-3">
        <div className="w-8 h-8 border border-[#D97706] flex items-center justify-center shrink-0">
          <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-[15px] font-bold text-[#0A0A0A] leading-snug">
            {divergence.topic}
          </h4>
        </div>
      </div>

      {/* Positions grid with VS dividers */}
      <div className={`grid grid-cols-1 ${colsClass}`}>
        {positions.map((pos, idx) => {
          const agent = agentMap.get(pos.agentId)
          const accent = agent?.accentColor || '#737373'
          return (
            <div
              key={`${pos.agentId}-${idx}`}
              className="p-6 border-[#E5E5E5] border-t md:border-t-0 md:border-l first:md:border-l-0 relative"
            >
              {/* VS badge between columns (not on first) */}
              {idx > 0 && (
                <span
                  aria-hidden
                  className="hidden md:flex absolute -left-[14px] top-1/2 -translate-y-1/2 z-10 w-7 h-7 items-center justify-center bg-orange-100 border border-orange-300 text-[10px] font-extrabold text-orange-600 tracking-tight"
                >
                  VS
                </span>
              )}
              <span
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-[2px]"
                style={{ backgroundColor: accent }}
              />
              <div className="flex items-center gap-2.5 mb-4">
                {agent ? (
                  <AgentAvatarBadge agent={agent} size="sm" />
                ) : (
                  <div
                    className="w-6 h-6 flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    ?
                  </div>
                )}
                <p className="text-[11px] font-semibold tracking-[0.08em] text-[#0A0A0A] truncate">
                  {pos.agentRole}
                </p>
              </div>
              <p className="text-[13px] text-[#404040] leading-[1.75] whitespace-pre-wrap">
                {pos.stance}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
