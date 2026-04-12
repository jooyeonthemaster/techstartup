'use client'

import { useRouter } from 'next/navigation'
import { FileText } from 'lucide-react'

export default function HistoryEmptyState({
  filtered = false,
  onReset,
}: {
  filtered?: boolean
  onReset?: () => void
}) {
  const router = useRouter()

  if (filtered) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-16 h-16 border border-[#E5E5E5] bg-white flex items-center justify-center mb-6">
          <FileText className="w-6 h-6 text-[#A3A3A3]" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#737373] mb-3">
          No Matches
        </span>
        <h3 className="text-[24px] font-extralight text-[#0A0A0A] tracking-[-0.02em] mb-3">
          검색 결과가 <span className="font-bold">없습니다</span>
        </h3>
        <p className="text-[13px] text-[#737373] font-normal leading-[1.7] max-w-sm mb-8">
          조건에 맞는 평가가 없습니다. 검색어나 필터를 조정해 보세요.
        </p>
        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] border border-[#0A0A0A] px-6 py-3 hover:bg-[#0A0A0A] hover:text-white transition-colors"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.15em]">필터 초기화</span>
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-20 h-20 border border-[#E5E5E5] bg-white flex items-center justify-center mb-8">
        <FileText className="w-8 h-8 text-[#A3A3A3]" />
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#737373] mb-4">
        Empty History
      </span>
      <h3 className="text-[32px] md:text-[40px] font-extralight text-[#0A0A0A] tracking-[-0.02em] leading-[1.1] mb-4">
        아직 평가한
        <br />
        <span className="font-bold">사업계획서</span>가 없습니다
      </h3>
      <div className="w-12 h-px bg-[#1A56DB] my-6" />
      <p className="text-[13px] text-[#737373] font-normal leading-[1.7] max-w-md mb-10">
        첫 평가를 시작하면 여기에 결과가 기록됩니다.
        <br />
        VC 심사 기준으로 사업계획서를 진단해 보세요.
      </p>
      <button
        onClick={() => router.push('/ai-evaluation/new')}
        className="group inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-8 py-4 hover:bg-[#1A56DB] transition-colors duration-300"
      >
        <span className="text-[12px] font-bold uppercase tracking-[0.15em]">
          첫 평가 시작하기
        </span>
        <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
          &rarr;
        </span>
      </button>
    </div>
  )
}
