'use client'

import { Check, Users } from 'lucide-react'
import type { EvaluationPackage } from '@/types/ai-evaluation'

export default function PackagePicker({
  packages,
  selectedId,
  onSelect,
}: {
  packages: EvaluationPackage[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  if (packages.length === 0) {
    return (
      <div className="border border-[#E5E5E5] bg-white p-12 text-center">
        <p className="text-[13px] text-[#737373]">
          활성 패키지가 없습니다. 관리자에게 문의해주세요.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {packages.map((pkg) => {
        const isSelected = pkg.id === selectedId
        const agents = [...(pkg.agents ?? [])].sort((a, b) => a.order - b.order)

        return (
          <button
            key={pkg.id}
            onClick={() => onSelect(pkg.id)}
            className={`text-left border transition-colors ${
              isSelected
                ? 'border-[#0A0A0A] bg-white shadow-[0_2px_16px_-6px_rgba(0,0,0,0.18)]'
                : 'border-[#E5E5E5] bg-white hover:border-[#737373]'
            }`}
          >
            {/* ── Header ── */}
            <div className="p-6 pb-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-[16px] font-bold text-[#0A0A0A] tracking-tight">
                      {pkg.name}
                    </h3>
                    {pkg.isDefault && (
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] bg-[#1A56DB] text-white">
                        기본
                      </span>
                    )}
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#A3A3A3] tabular-nums">
                      v{pkg.version}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-[#525252] leading-[1.65]">
                    {pkg.description}
                  </p>
                </div>

                <div
                  className={`w-5 h-5 flex items-center justify-center shrink-0 border transition-colors ${
                    isSelected
                      ? 'bg-[#0A0A0A] border-[#0A0A0A]'
                      : 'bg-white border-[#D4D4D4]'
                  }`}
                  aria-hidden
                >
                  {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
              </div>
            </div>

            {/* ── Agents ── */}
            <div className="border-t border-[#F0F0F0] px-6 py-5 bg-[#FAFAFA]">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-3 h-3 text-[#A3A3A3]" strokeWidth={2.5} />
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A3A3A3]">
                  Analyst Agents
                </p>
                <span className="text-[10px] font-bold text-[#525252] tabular-nums">
                  {agents.length}
                </span>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {agents.map((agent, idx) => {
                  const num = String(idx + 1).padStart(2, '0')
                  return (
                    <li
                      key={agent.id}
                      className="flex items-start gap-3 min-w-0 py-1"
                    >
                      {/* 순번 + 컬러 바 */}
                      <div className="flex items-center gap-2 shrink-0 pt-0.5">
                        <span className="text-[10px] font-bold text-[#A3A3A3] tabular-nums leading-none">
                          {num}
                        </span>
                        <span
                          className="w-[3px] h-4 shrink-0"
                          style={{ backgroundColor: agent.accentColor || '#0A0A0A' }}
                          aria-hidden
                        />
                      </div>

                      {/* 텍스트 블록 */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <p className="text-[12px] font-bold text-[#0A0A0A] tracking-tight leading-none">
                            {agent.role}
                          </p>
                          <span className="text-[9px] font-semibold text-[#A3A3A3] tabular-nums leading-none">
                            {agent.weight}%
                          </span>
                        </div>
                        <p className="text-[10.5px] text-[#737373] font-normal leading-[1.55] line-clamp-2">
                          {agent.tagline}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </button>
        )
      })}
    </div>
  )
}
