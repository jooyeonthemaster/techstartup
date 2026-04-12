'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  Loader2,
  X,
  FileText,
  ArrowUpRight,
  Clock,
  AlertCircle,
  Sparkles,
} from 'lucide-react'
import type { EvaluationDoc, EvaluationPackage } from '@/types/ai-evaluation'

/* ── Status → UI mapping ── */
const STAGE_MAP: Record<
  string,
  { label: string; color: string; bgTint: string }
> = {
  queued: { label: '대기 중', color: '#94a3b8', bgTint: 'rgba(148,163,184,0.06)' },
  uploading: { label: '업로드 중', color: '#0ea5e9', bgTint: 'rgba(14,165,233,0.06)' },
  converting: { label: '문서 변환 중', color: '#8b5cf6', bgTint: 'rgba(139,92,246,0.06)' },
  parsing: { label: '문서 파싱 중', color: '#8b5cf6', bgTint: 'rgba(139,92,246,0.06)' },
  analyzing: { label: '에이전트 분석 중', color: '#1a56db', bgTint: 'rgba(26,86,219,0.06)' },
  synthesizing: { label: '종합 리포트 합성', color: '#7c3aed', bgTint: 'rgba(124,58,237,0.06)' },
  finalizing: { label: '저장 중', color: '#059669', bgTint: 'rgba(5,150,105,0.06)' },
  ready: { label: '분석 완료', color: '#059669', bgTint: 'rgba(5,150,105,0.06)' },
  error: { label: '오류 발생', color: '#dc2626', bgTint: 'rgba(220,38,38,0.06)' },
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function AnalysisQueueCard({
  evaluation,
  pkg,
  elapsed,
  onOpenDetail,
}: {
  evaluation: EvaluationDoc
  pkg: EvaluationPackage | null
  /** Pre-computed elapsed string (updated by parent timer) */
  elapsed: string
  /** Open detail modal */
  onOpenDetail?: (evaluationId: string) => void
}) {
  const { status, progress, documentMeta } = evaluation
  const percent = Math.max(0, Math.min(100, Math.round(progress.percent ?? 0)))
  const stage = STAGE_MAP[status] ?? STAGE_MAP.queued
  const stageLabel = progress.stageLabel || stage.label

  const isComplete = status === 'ready'
  const isError = status === 'error'
  const isActive = !isComplete && !isError

  const overallScore = evaluation.synthesis?.overallScore ?? null
  const overallGrade = evaluation.synthesis?.overallGrade ?? null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div
        onClick={() => onOpenDetail?.(evaluation.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenDetail?.(evaluation.id) }}
        className={`relative bg-white/80 backdrop-blur-md rounded-3xl border transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full ${
          isComplete
            ? 'border-cyan-100 shadow-[0_4px_30px_rgba(6,182,212,0.1)] hover:shadow-[0_8px_40px_rgba(6,182,212,0.2)]'
            : isError
              ? 'border-red-100 shadow-[0_4px_30px_rgba(220,38,38,0.1)]'
              : 'border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
        }`}
      >
        {/* Top accent bar - animated progress */}
        {isActive && (
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-50 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${stage.color}, ${stage.color}dd)`,
              }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        )}
        
        <div className="p-6 md:p-8 flex flex-col flex-1">
          {/* Row 1: File info + status badge */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div className="min-w-0 flex-1">
              <p className="text-[17px] font-extrabold text-slate-800 truncate leading-snug tracking-tight">
                {documentMeta.originalName}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {formatFileSize(documentMeta.size)}
                </span>
                {pkg && (
                  <span className="text-[12px] text-slate-400 font-semibold tracking-tight truncate">
                    {pkg.name}
                  </span>
                )}
              </div>
            </div>

            {/* Status badge */}
            <div
              className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] shadow-sm ml-2"
              style={{
                color: stage.color,
                backgroundColor: stage.bgTint,
                border: `1px solid ${stage.color}20`
              }}
            >
              {isActive && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isComplete && <Check className="w-3.5 h-3.5" />}
              {isError && <X className="w-3.5 h-3.5" />}
              {stageLabel}
            </div>
          </div>

          {/* Row 2: Progress */}
          {isActive && (
            <div className="mb-6 flex-1">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${stage.color}cc, ${stage.color})`,
                    }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[14px] font-extrabold text-slate-400 tabular-nums w-12 text-right">
                  {percent}%
                </span>
              </div>
            </div>
          )}

          {/* Row 2 alt: Score display (when complete) */}
          {isComplete && overallScore !== null && (
            <div className="mb-4 flex-1">
              <div className="flex items-center gap-4 mb-6">
                {overallGrade && (
                  <div
                    className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-[24px] font-black text-white shadow-xl ${
                      overallGrade === 'S'
                        ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/25'
                        : overallGrade === 'A'
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/25'
                          : overallGrade === 'B'
                            ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/25'
                            : overallGrade === 'C'
                              ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/25'
                              : 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/25'
                    }`}
                  >
                    {overallGrade}
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <p className="text-[42px] font-black text-slate-900 leading-none tabular-nums tracking-tighter">
                    {overallScore}
                  </p>
                  <span className="text-[16px] font-bold text-slate-400 ml-1">점</span>
                </div>
              </div>
              
              {evaluation.synthesis?.verdict && (
                <div className="relative pl-5 py-2">
                   <div className="absolute top-0 left-0 bottom-0 w-[4px] rounded-full bg-gradient-to-b from-cyan-400 to-indigo-500" />
                   <p className="text-[13.5px] font-semibold text-slate-700 leading-[1.8] break-keep tracking-tight">
                     {evaluation.synthesis.verdict}
                   </p>
                </div>
              )}
            </div>
          )}

          {/* Row 2 alt: Error message */}
          {isError && evaluation.errorMessage && (
            <p className="text-[13px] text-red-500 font-bold leading-relaxed mb-6 flex-1 break-keep">
              {evaluation.errorMessage}
            </p>
          )}

          {/* Row 3: Footer */}
          <div className="flex items-center justify-between pt-5 mt-auto border-t border-slate-100/80">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold tracking-widest uppercase">
              <Clock className="w-3.5 h-3.5" />
              {elapsed}
            </div>

            {isComplete && (
              <button
                onClick={() => onOpenDetail?.(evaluation.id)}
                className="inline-flex items-center gap-1.5 text-[12px] font-extrabold text-cyan-600 hover:text-cyan-800 transition-colors group/link uppercase tracking-[0.1em]"
              >
                리포트 보기
                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </button>
            )}

            {isError && (
              <button
                onClick={() => onOpenDetail?.(evaluation.id)}
                className="inline-flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-slate-700 transition-colors uppercase tracking-[0.1em]"
              >
                상세 보기
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}

            {isActive && (
              <button
                onClick={() => onOpenDetail?.(evaluation.id)}
                className="inline-flex items-center gap-1.5 text-[12px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-[0.1em]"
              >
                전체 보기
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
