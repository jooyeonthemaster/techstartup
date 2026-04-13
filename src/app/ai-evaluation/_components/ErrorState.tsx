'use client'

import { AlertTriangle, RefreshCw, FilePlus } from 'lucide-react'

export default function ErrorState({
  errorMessage,
  onRetry,
  onNewEvaluation,
}: {
  errorMessage: string
  onRetry?: () => void
  onNewEvaluation: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="w-full max-w-md text-center px-6">
        <div className="bg-white border border-[#B91C1C] p-12">
          <div className="w-12 h-12 mx-auto mb-6 border border-[#B91C1C] flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-[#B91C1C]" />
          </div>
          <h3 className="text-[16px] font-bold uppercase tracking-[0.15em] text-[#B91C1C] mb-3">
            분석 실패
          </h3>
          <p className="text-[13px] text-[#737373] font-normal leading-relaxed mb-10 whitespace-pre-wrap">
            {errorMessage}
          </p>
          <div className="flex flex-col gap-2">
            {onRetry && (
              <button
                onClick={onRetry}
                className="w-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> 재시도
              </button>
            )}
            <button
              onClick={onNewEvaluation}
              className="w-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] text-white bg-[#0A0A0A] hover:bg-[#1A56DB] transition-colors flex items-center justify-center gap-2"
            >
              <FilePlus className="w-3.5 h-3.5" /> 새 평가 시작
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
