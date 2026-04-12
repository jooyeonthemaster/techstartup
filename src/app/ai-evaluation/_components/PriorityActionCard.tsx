'use client'

import { Target, TrendingUp } from 'lucide-react'
import type { AnalystAgent, PriorityAction } from '@/types/ai-evaluation'
import { PRIORITY_CONFIG } from '../report-data'
import AgentAvatarBadge from './AgentAvatarBadge'

export default function PriorityActionCard({
  action,
  agents,
  index,
}: {
  action: PriorityAction
  agents: AnalystAgent[]
  index?: number
}) {
  const cfg = PRIORITY_CONFIG[action.priority] ?? PRIORITY_CONFIG.medium
  const agentMap = new Map(agents.map((a) => [a.id, a]))
  const sourceAgents = (action.sourceAgents ?? [])
    .map((id) => agentMap.get(id))
    .filter((a): a is AnalystAgent => !!a)

  return (
    <div
      className="relative bg-white border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors"
      style={{ backgroundColor: cfg.bg }}
    >
      {/* Left accent bar */}
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: cfg.color }}
      />

      <div className="pl-8 pr-6 py-6">
        {/* Top row: index + priority */}
        <div className="flex items-center gap-3 mb-3">
          {typeof index === 'number' && (
            <span className="text-[11px] font-bold tabular-nums text-[#A3A3A3] tracking-[0.1em]">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          <span
            className="px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] text-white"
            style={{ backgroundColor: cfg.color }}
          >
            {cfg.label}
          </span>
        </div>

        {/* Action title */}
        <h4 className="text-[16px] font-bold text-[#0A0A0A] leading-snug mb-3 flex items-start gap-2">
          <Target className="w-4 h-4 mt-0.5 shrink-0" style={{ color: cfg.color }} />
          <span className="flex-1">{action.action}</span>
        </h4>

        {/* Rationale */}
        <p className="text-[13px] text-[#404040] leading-relaxed mb-4 pl-6">
          {action.rationale}
        </p>

        {/* Expected impact */}
        {action.expectedImpact && (
          <div className="pl-6 mb-4 flex items-start gap-2">
            <TrendingUp className="w-3.5 h-3.5 mt-0.5 text-[#047857] shrink-0" />
            <p className="text-[12px] text-[#047857] font-medium leading-relaxed">
              {action.expectedImpact}
            </p>
          </div>
        )}

        {/* Source agents */}
        {sourceAgents.length > 0 && (
          <div className="pl-6 pt-4 border-t border-[#E5E5E5] flex items-center gap-3 flex-wrap">
            <span className="text-[9px] font-semibold tracking-[0.12em] text-[#A3A3A3]">
              제안 분석가
            </span>
            <div className="flex items-center gap-1.5">
              {sourceAgents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-1.5">
                  <AgentAvatarBadge agent={agent} size="sm" />
                  <span className="text-[10px] font-semibold tracking-[0.08em] text-[#737373]">
                    {agent.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
