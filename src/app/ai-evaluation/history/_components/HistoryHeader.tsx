'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus } from 'lucide-react'

interface HistoryStats {
  total: number
  ready: number
  inProgress: number
  error: number
}

export default function HistoryHeader({ stats }: { stats: HistoryStats }) {
  const router = useRouter()

  return (
    <header className="border-b border-[#E5E5E5] bg-white">
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        {/* Back */}
        <button
          onClick={() => router.push('/ai-evaluation')}
          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#737373] hover:text-[#0A0A0A] transition-colors mb-6"
        >
          <ArrowLeft className="w-3 h-3" />
          AI Evaluation
        </button>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Title + stats */}
          <div className="flex-1 min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#737373] mb-3">
              Evaluation History
            </span>
            <h1 className="text-[40px] md:text-[52px] font-extralight text-[#0A0A0A] tracking-[-0.03em] leading-[1] mb-6">
              AI 평가 <span className="font-bold">히스토리</span>
            </h1>
            <div className="w-12 h-px bg-[#1A56DB] mb-6" />

            {/* Stats row */}
            <div className="flex items-baseline gap-6 flex-wrap">
              <Stat label="전체" value={stats.total} color="#0A0A0A" />
              <Divider />
              <Stat label="완료" value={stats.ready} color="#047857" />
              <Divider />
              <Stat label="진행중" value={stats.inProgress} color="#1A56DB" />
              <Divider />
              <Stat label="실패" value={stats.error} color="#B91C1C" />
            </div>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <button
              onClick={() => router.push('/ai-evaluation/new')}
              className="group inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-7 py-4 hover:bg-[#1A56DB] transition-colors duration-300"
            >
              <Plus className="w-4 h-4" />
              <span className="text-[12px] font-bold uppercase tracking-[0.15em]">
                새 평가 시작
              </span>
              <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform duration-300">
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className="text-[24px] font-extrabold tabular-nums leading-none"
        style={{ color }}
      >
        {value}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#737373]">
        {label}
      </span>
    </div>
  )
}

function Divider() {
  return <span className="w-px h-4 bg-[#E5E5E5]" aria-hidden />
}
