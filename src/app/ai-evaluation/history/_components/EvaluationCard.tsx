'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronRight, FileText } from 'lucide-react'
import type { EvaluationDoc } from '@/types/ai-evaluation'
import { GRADE_CONFIG, getScoreColor, getGradeAccent } from '../../report-data'
import StatusBadge, { getStatusConfig } from './StatusBadge'

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return '-'
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}.${m}.${day}`
  } catch {
    return '-'
  }
}

export default function EvaluationCard({
  evaluation,
  index = 0,
}: {
  evaluation: EvaluationDoc
  index?: number
}) {
  const router = useRouter()
  const statusCfg = getStatusConfig(evaluation.status)
  const isReady = evaluation.status === 'ready' && !!evaluation.synthesis
  const isError = evaluation.status === 'error'
  const isProgress = statusCfg.group === 'progress' || statusCfg.group === 'queued'

  const score = isReady ? evaluation.synthesis!.overallScore : null
  const grade = isReady ? evaluation.synthesis!.overallGrade : null
  const gradeLabel = grade ? GRADE_CONFIG[grade]?.label ?? '' : ''
  const scoreColor = score !== null ? getScoreColor(score) : '#A3A3A3'
  const gradeAccent = getGradeAccent(grade)

  const handleClick = () => {
    router.push(`/ai-evaluation/${evaluation.id}`)
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col w-full text-left bg-white border border-[#E5E5E5] p-6 hover:border-[#0A0A0A] transition-colors duration-200"
    >
      {/* TOP — score block or status block */}
      <div className="flex items-start justify-between mb-5">
        {isReady && score !== null ? (
          <div className="flex items-baseline gap-2">
            <span
              className="text-[44px] font-extrabold tabular-nums leading-none"
              style={{ color: scoreColor }}
            >
              {score}
            </span>
            <span className="text-[12px] text-[#A3A3A3] font-medium tabular-nums">/100</span>
          </div>
        ) : isError ? (
          <div className="flex items-center gap-2 h-[44px]">
            <StatusBadge status={evaluation.status} size="md" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <StatusBadge status={evaluation.status} size="md" />
            <span className="text-[11px] text-[#737373] tabular-nums font-medium">
              {evaluation.progress?.percent ?? 0}%
            </span>
          </div>
        )}

        {/* Grade badge (top right) */}
        {grade && (
          <div className="flex flex-col items-end gap-1">
            <span
              className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white"
              style={{ backgroundColor: gradeAccent }}
            >
              {grade}
            </span>
            <span className="text-[10px] text-[#A3A3A3] font-medium tracking-[0.05em]">
              {gradeLabel}
            </span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      {isReady && score !== null ? (
        <div className="mb-5 h-[3px] bg-[#F5F5F5] relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0"
            style={{ width: `${Math.min(Math.max(score, 0), 100)}%`, backgroundColor: scoreColor }}
          />
        </div>
      ) : isProgress ? (
        <div className="mb-5 h-[3px] bg-[#F5F5F5] relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[#1A56DB]"
            style={{ width: `${Math.min(Math.max(evaluation.progress?.percent ?? 0, 0), 100)}%` }}
          />
        </div>
      ) : (
        <div className="mb-5 h-[3px] bg-[#F5F5F5]" />
      )}

      {/* Document name */}
      <div className="flex items-start gap-2 mb-2">
        <FileText className="w-3.5 h-3.5 text-[#A3A3A3] mt-[3px] flex-shrink-0" />
        <h3 className="text-[14px] font-semibold text-[#0A0A0A] leading-[1.5] line-clamp-2 break-all">
          {evaluation.documentMeta.originalName}
        </h3>
      </div>

      {/* Package name */}
      <p className="text-[11px] text-[#737373] font-medium tracking-[0.02em] mb-4 pl-[22px] truncate">
        {evaluation.packageName} v{evaluation.packageVersion}
      </p>

      {/* Error message (if error) */}
      {isError && evaluation.errorMessage && (
        <p className="text-[11px] text-[#B91C1C] font-medium leading-[1.6] pl-[22px] line-clamp-2 mb-4">
          {evaluation.errorMessage}
        </p>
      )}

      {/* Bottom meta row */}
      <div className="mt-auto pt-4 border-t border-[#F5F5F5] flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] text-[#A3A3A3] font-medium uppercase tracking-[0.1em] tabular-nums">
          <span>{formatDate(evaluation.createdAt)}</span>
          {evaluation.documentMeta.pageCount ? (
            <>
              <span className="text-[#E5E5E5]">·</span>
              <span>{evaluation.documentMeta.pageCount} pages</span>
            </>
          ) : isProgress ? (
            <>
              <span className="text-[#E5E5E5]">·</span>
              <span>{evaluation.progress?.stageLabel || '분석 중'}</span>
            </>
          ) : null}
        </div>

        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A0A0A] group-hover:text-[#1A56DB] transition-colors">
          {isReady ? '상세 보기' : isProgress ? '진행률' : '상세'}
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>

      {/* Left accent line */}
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          backgroundColor: isError
            ? '#B91C1C'
            : isReady
              ? scoreColor
              : '#1A56DB',
        }}
      />
    </motion.button>
  )
}
