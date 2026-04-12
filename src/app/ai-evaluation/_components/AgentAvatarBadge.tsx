'use client'

import type { AnalystAgent } from '@/types/ai-evaluation'
import { getRoleInitial } from '../report-data'

type Size = 'sm' | 'md' | 'lg'

const SIZE_MAP: Record<
  Size,
  {
    box: string
    font: string
    tagline: boolean
  }
> = {
  sm: { box: 'w-6 h-6', font: 'text-[10px]', tagline: false },
  md: { box: 'w-10 h-10', font: 'text-[14px]', tagline: false },
  lg: { box: 'w-[72px] h-[72px]', font: 'text-[22px]', tagline: true },
}

export default function AgentAvatarBadge({
  agent,
  size = 'md',
  showMeta = false,
}: {
  agent: AnalystAgent
  size?: Size
  /** lg 사이즈에서 우측에 role + tagline 표시 */
  showMeta?: boolean
}) {
  const cfg = SIZE_MAP[size]
  const initial = getRoleInitial(agent.role)

  if (size === 'lg' && showMeta) {
    return (
      <div className="flex items-center gap-4">
        <div
          className={`${cfg.box} flex items-center justify-center font-bold tracking-tight text-white shrink-0`}
          style={{ backgroundColor: agent.accentColor || '#0A0A0A' }}
          aria-label={agent.role}
        >
          <span className={cfg.font}>{initial}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.1em] text-[#A3A3A3] mb-1">
            분석가
          </p>
          <h3 className="text-[18px] font-bold text-[#0A0A0A] tracking-tight leading-tight">
            {agent.role}
          </h3>
          {agent.tagline && (
            <p className="text-[12px] text-[#737373] font-normal leading-relaxed mt-1 line-clamp-2">
              {agent.tagline}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${cfg.box} flex items-center justify-center font-bold tracking-tight text-white shrink-0`}
      style={{ backgroundColor: agent.accentColor || '#0A0A0A' }}
      title={agent.role}
      aria-label={agent.role}
    >
      <span className={cfg.font}>{initial}</span>
    </div>
  )
}
