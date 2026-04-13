'use client'

import { motion } from 'framer-motion'
import { Check, Loader2, X, Clock, Hourglass, Upload, Sparkles } from 'lucide-react'
import type {
  EvaluationDoc,
  EvaluationPackage,
  EvaluationStatus,
} from '@/types/ai-evaluation'
import AgentAvatarBadge from './AgentAvatarBadge'
import type { AgentRunStatus } from '../report-data'

const STATUS_COPY: Record<
  EvaluationStatus,
  { label: string; helper: string; icon: typeof Loader2 }
> = {
  queued: {
    label: '대기 중',
    helper: '분석 큐에 등록되었습니다. 잠시만 기다려주세요...',
    icon: Clock,
  },
  uploading: {
    label: '파일 업로드 중',
    helper: '원본 파일을 서버에 업로드하고 있습니다.',
    icon: Upload,
  },
  converting: {
    label: '문서 변환 중',
    helper: 'HWP/PPTX 원본을 PDF로 변환하고 있습니다. 1~2분 소요될 수 있습니다.',
    icon: Hourglass,
  },
  parsing: {
    label: '문서 파싱 중',
    helper: 'Claude에 문서를 업로드하고 인덱싱하고 있습니다.',
    icon: Upload,
  },
  analyzing: {
    label: '에이전트 분석 중',
    helper: '여러 분석가가 병렬로 사업계획서를 평가하고 있습니다.',
    icon: Loader2,
  },
  synthesizing: {
    label: '종합 리포트 합성 중',
    helper: '종합 에이전트가 분석가들의 의견을 집계하고 있습니다.',
    icon: Sparkles,
  },
  finalizing: {
    label: '보고서 저장 중',
    helper: '결과를 저장하고 후처리 중입니다.',
    icon: Loader2,
  },
  ready: {
    label: '분석 완료',
    helper: '보고서가 생성되었습니다.',
    icon: Check,
  },
  error: {
    label: '오류 발생',
    helper: '분석 중 오류가 발생했습니다.',
    icon: X,
  },
}

export default function AnalyzingOverlay({
  evaluation,
  package: pkg,
}: {
  evaluation: EvaluationDoc
  package: EvaluationPackage | null
}) {
  const { status, progress } = evaluation
  const percent = Math.max(0, Math.min(100, Math.round(progress.percent ?? 0)))
  const copy = STATUS_COPY[status] ?? STATUS_COPY.queued
  const label = progress.stageLabel || copy.label

  const agents = pkg ? [...pkg.agents].sort((a, b) => a.order - b.order) : []
  const showAgentList =
    agents.length > 0 &&
    (status === 'analyzing' || status === 'synthesizing' || status === 'finalizing')

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl px-6"
      >
        <div className="bg-white border border-[#E5E5E5] p-12">
          {/* Stage label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 bg-[#1A56DB] animate-pulse" />
            <p className="text-[11px] font-semibold text-[#1A56DB] tracking-[0.2em] uppercase">
              {label}
            </p>
          </div>

          {/* Percent */}
          <div className="flex justify-start items-end gap-1 mb-8">
            <span className="text-[64px] font-extrabold text-[#0A0A0A] tabular-nums leading-none">
              {percent}
            </span>
            <span className="text-[18px] font-bold text-[#A3A3A3] pb-2">%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-[2px] bg-[#E5E5E5] overflow-hidden mb-8">
            <motion.div
              className="h-full bg-[#1A56DB]"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Helper text */}
          <p className="text-[12px] text-[#737373] font-normal leading-relaxed mb-6">
            {copy.helper}
          </p>

          {/* Agent checklist */}
          {showAgentList && (
            <div className="pt-6 border-t border-[#E5E5E5]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A3A3A3] mb-4">
                Analyst Agents
              </p>
              <ul className="space-y-3">
                {agents.map((agent) => {
                  const agentStatus: AgentRunStatus =
                    (progress.agentStatuses?.[agent.id] as AgentRunStatus | undefined) ??
                    'pending'
                  return (
                    <li key={agent.id} className="flex items-center gap-3">
                      <AgentAvatarBadge agent={agent} size="sm" />
                      <span className="text-[12px] font-semibold text-[#0A0A0A] truncate flex-1">
                        {agent.role}
                      </span>
                      <AgentStatusBadge status={agentStatus} />
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          <p className="mt-8 pt-6 border-t border-[#E5E5E5] text-[10px] text-[#A3A3A3] font-normal leading-relaxed">
            분석은 보통 2~5분이 소요됩니다.
            <br />
            페이지를 닫아도 분석은 서버에서 계속 진행됩니다.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function AgentStatusBadge({ status }: { status: AgentRunStatus }) {
  switch (status) {
    case 'running':
      return (
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1A56DB]">
          <Loader2 className="w-3 h-3 animate-spin" />
          분석 중
        </span>
      )
    case 'completed':
      return (
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#047857]">
          <Check className="w-3 h-3" />
          완료
        </span>
      )
    case 'failed':
      return (
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#B91C1C]">
          <X className="w-3 h-3" />
          실패
        </span>
      )
    case 'pending':
    default:
      return (
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#A3A3A3]">
          <span className="w-1.5 h-1.5 bg-[#E5E5E5]" />
          대기
        </span>
      )
  }
}
