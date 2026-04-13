'use client'

import { useCallback, useState } from 'react'
import { RefreshCw, Download, FileDown, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function ReportTopBar({
  evaluationId,
  documentName,
  packageName,
  packageVersion,
  onReanalyze,
}: {
  evaluationId?: string
  documentName: string
  packageName?: string
  packageVersion?: number
  onReanalyze?: () => void
}) {
  const { user } = useAuth()
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const handleDownloadOriginal = useCallback(async () => {
    if (!evaluationId || isDownloading) return
    setIsDownloading(true)
    setDownloadError(null)

    try {
      const idToken = user ? await user.getIdToken() : null
      if (!idToken) {
        setDownloadError('로그인이 필요합니다.')
        return
      }

      const res = await fetch(
        `/api/ai-evaluation/evaluations/${evaluationId}/download`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${idToken}` },
        }
      )

      if (!res.ok) {
        let msg = '다운로드에 실패했습니다.'
        try {
          const data = await res.json()
          msg = data.error || msg
        } catch {
          /* ignore */
        }
        setDownloadError(msg)
        return
      }

      const data = (await res.json()) as { url: string; originalName: string }

      // 숨겨진 anchor 트리거로 다운로드
      const a = document.createElement('a')
      a.href = data.url
      a.download = data.originalName
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (err) {
      console.error('[ReportTopBar] download failed:', err)
      setDownloadError('다운로드 중 오류가 발생했습니다.')
    } finally {
      setIsDownloading(false)
      // 에러 메시지는 5초 후 자동 해제
      if (downloadError) {
        setTimeout(() => setDownloadError(null), 5000)
      }
    }
  }, [evaluationId, user, isDownloading, downloadError])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-[#E5E5E5] h-14">
      <div className="h-full max-w-[1400px] mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">
          <h1 className="text-[14px] font-bold text-[#0A0A0A] tracking-tight shrink-0">
            AI 사업계획서 평가 보고서
          </h1>
          <span className="hidden sm:inline text-[11px] text-[#A3A3A3] font-medium truncate">
            {documentName}
          </span>
          {packageName && (
            <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 border border-[#E5E5E5] text-[10px] font-semibold tracking-[0.06em] text-[#737373] shrink-0">
              {packageName}
              {typeof packageVersion === 'number' && (
                <span className="text-[#A3A3A3]">v{packageVersion}</span>
              )}
            </span>
          )}
          {downloadError && (
            <span className="hidden lg:inline text-[10px] text-[#B91C1C] font-medium">
              {downloadError}
            </span>
          )}
        </div>
        <div className="flex gap-2 shrink-0">
          {onReanalyze && (
            <button
              onClick={onReanalyze}
              className="px-3 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-[#737373] border border-[#E5E5E5] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-3 h-3" /> 재분석
            </button>
          )}
          {evaluationId && (
            <button
              onClick={handleDownloadOriginal}
              disabled={isDownloading}
              className="px-3 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-[#737373] border border-[#E5E5E5] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              title="원본 사업계획서 파일 다운로드"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" /> 준비 중
                </>
              ) : (
                <>
                  <FileDown className="w-3 h-3" /> 원본
                </>
              )}
            </button>
          )}
          <button
            disabled
            className="px-3 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-white bg-[#0A0A0A] hover:bg-[#1A56DB] transition-colors flex items-center gap-2 disabled:bg-[#A3A3A3] disabled:cursor-not-allowed"
            title="보고서 PDF 내보내기 (준비 중)"
          >
            <Download className="w-3 h-3" /> PDF (준비 중)
          </button>
        </div>
      </div>
    </div>
  )
}
