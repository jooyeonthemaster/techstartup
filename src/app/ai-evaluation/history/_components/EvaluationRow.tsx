'use client'

import { useRouter } from 'next/navigation'
import { ChevronRight, FileText } from 'lucide-react'
import type { EvaluationDoc } from '@/types/ai-evaluation'
import { GRADE_CONFIG, getScoreColor, getGradeAccent } from '../../report-data'
import StatusBadge from './StatusBadge'

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

export default function EvaluationRow({ evaluation }: { evaluation: EvaluationDoc }) {
  const router = useRouter()
  const isReady = evaluation.status === 'ready' && !!evaluation.synthesis
  const score = isReady ? evaluation.synthesis!.overallScore : null
  const grade = isReady ? evaluation.synthesis!.overallGrade : null
  const gradeLabel = grade ? GRADE_CONFIG[grade]?.label ?? '' : ''
  const scoreColor = score !== null ? getScoreColor(score) : '#A3A3A3'
  const gradeAccent = getGradeAccent(grade)

  return (
    <tr
      onClick={() => router.push(`/ai-evaluation/${evaluation.id}`)}
      className="group border-b border-[#E5E5E5] hover:bg-[#FAFAFA] cursor-pointer transition-colors"
    >
      {/* Score */}
      <td className="py-5 px-5 align-middle w-[140px]">
        {isReady && score !== null ? (
          <div className="flex items-baseline gap-2">
            <span
              className="text-[22px] font-extrabold tabular-nums leading-none"
              style={{ color: scoreColor }}
            >
              {score}
            </span>
            {grade && (
              <span
                className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white"
                style={{ backgroundColor: gradeAccent }}
                title={gradeLabel}
              >
                {grade}
              </span>
            )}
          </div>
        ) : (
          <span className="text-[14px] text-[#A3A3A3] font-medium tabular-nums">—</span>
        )}
      </td>

      {/* Document */}
      <td className="py-5 px-5 align-middle">
        <div className="flex items-start gap-2 min-w-0">
          <FileText className="w-3.5 h-3.5 text-[#A3A3A3] mt-[3px] flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#0A0A0A] truncate max-w-[340px]">
              {evaluation.documentMeta.originalName}
            </p>
            {evaluation.documentMeta.pageCount ? (
              <p className="text-[10px] text-[#A3A3A3] font-medium uppercase tracking-[0.1em] tabular-nums mt-1">
                {evaluation.documentMeta.pageCount} pages
              </p>
            ) : null}
          </div>
        </div>
      </td>

      {/* Package */}
      <td className="py-5 px-5 align-middle w-[220px]">
        <p className="text-[12px] text-[#404040] font-medium truncate max-w-[200px]">
          {evaluation.packageName}
        </p>
        <p className="text-[10px] text-[#A3A3A3] font-medium tracking-[0.05em] mt-1">
          v{evaluation.packageVersion}
        </p>
      </td>

      {/* Status */}
      <td className="py-5 px-5 align-middle w-[130px]">
        <StatusBadge status={evaluation.status} />
      </td>

      {/* Date */}
      <td className="py-5 px-5 align-middle w-[140px]">
        <span className="text-[11px] text-[#737373] font-medium tabular-nums tracking-[0.05em]">
          {formatDate(evaluation.createdAt)}
        </span>
      </td>

      {/* Arrow */}
      <td className="py-5 px-5 align-middle w-[44px]">
        <ChevronRight className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-all" />
      </td>
    </tr>
  )
}
