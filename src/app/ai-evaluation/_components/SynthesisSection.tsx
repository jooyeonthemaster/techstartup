'use client'

import {
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from 'lucide-react'
import type {
  AgentPerspective,
  AnalystAgent,
  EvaluationSynthesis,
} from '@/types/ai-evaluation'
import { GRADE_CONFIG, getGradeAccent, getScoreColor } from '../report-data'
import PerspectiveScoreCard from './PerspectiveScoreCard'
import DivergenceCard from './DivergenceCard'
import PriorityActionCard from './PriorityActionCard'

export default function SynthesisSection({
  synthesis,
  agents,
  perspectives,
  onSelectAgent,
}: {
  synthesis: EvaluationSynthesis
  agents: AnalystAgent[]
  perspectives: Record<string, AgentPerspective>
  onSelectAgent: (agentId: string) => void
}) {
  const scoreColor = getScoreColor(synthesis.overallScore)
  const gradeAccent = getGradeAccent(synthesis.overallGrade)
  const gradeLabel =
    GRADE_CONFIG[synthesis.overallGrade]?.label ?? synthesis.overallGradeLabel

  // 에이전트를 order 순으로 정렬 + perspective가 존재하는 것만
  const agentList = [...agents]
    .sort((a, b) => a.order - b.order)
    .filter((agent) => !!perspectives[agent.id])

  // 구조화 필드 (v2.1) vs 레거시 fallback
  const hasStructured = !!synthesis.conclusion
  const legacyText = synthesis.executiveSummary ?? ''

  return (
    <section
      id="synthesis"
      className="scroll-mt-[200px] py-12 first:pt-8"
    >
      {/* ─── Hero: score + verdict (top) ─── */}
      <div className="bg-white border border-[#E5E5E5] mb-8">
        <div className="p-8 lg:p-10 flex flex-col md:flex-row md:items-center gap-8 relative">
          <span
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-[3px]"
            style={{ backgroundColor: scoreColor }}
          />

          {/* Score */}
          <div className="flex items-end gap-2 shrink-0">
            <span
              className="font-extrabold tabular-nums leading-none"
              style={{ color: scoreColor, fontSize: '64px' }}
            >
              {synthesis.overallScore}
            </span>
            <span className="text-[14px] text-[#A3A3A3] font-medium tabular-nums pb-2">
              /100
            </span>
          </div>

          {/* Grade badge */}
          <div className="flex flex-col gap-2 shrink-0">
            <div className="flex items-center gap-2.5">
              <span
                className="px-3 py-1 text-[12px] font-bold tracking-[0.1em] text-white"
                style={{ backgroundColor: gradeAccent }}
              >
                {synthesis.overallGrade}
              </span>
              <span className="text-[12px] text-[#737373] font-medium">
                {gradeLabel}
              </span>
            </div>
            <p className="text-[10px] font-semibold tracking-[0.1em] text-[#A3A3A3]">
              종합 점수
            </p>
          </div>

          {/* Verdict */}
          {synthesis.verdict && (
            <div className="md:border-l md:border-[#E5E5E5] md:pl-8 flex-1 min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.1em] text-[#A3A3A3] mb-1.5">
                종합 판정
              </p>
              <p className="text-[15px] font-bold text-[#0A0A0A] leading-snug">
                {synthesis.verdict}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ─── Structured summary (v2.1) or legacy fallback ─── */}
      {hasStructured ? (
        <div className="mb-12 space-y-4">
          {/* 핵심 결론 */}
          <div className="bg-white border border-[#E5E5E5] px-8 py-6">
            <p className="text-[10px] font-semibold tracking-[0.1em] text-[#A3A3A3] mb-2">
              핵심 결론
            </p>
            <p className="text-[16px] font-bold text-[#0A0A0A] leading-snug">
              {synthesis.conclusion}
            </p>
          </div>

          {/* 강점 / 약점 2-column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 강점 */}
            <div className="bg-white border border-[#E5E5E5] px-8 py-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5]">
                <TrendingUp className="w-3.5 h-3.5 text-[#047857]" />
                <p className="text-[11px] font-semibold tracking-[0.1em] text-[#047857]">
                  주요 강점
                </p>
              </div>
              <ul className="space-y-3">
                {synthesis.strengthHighlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-[7px] w-1.5 h-1.5 bg-[#047857] shrink-0" />
                    <p className="text-[13px] text-[#404040] leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* 약점 */}
            <div className="bg-white border border-[#E5E5E5] px-8 py-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5]">
                <TrendingDown className="w-3.5 h-3.5 text-[#B91C1C]" />
                <p className="text-[11px] font-semibold tracking-[0.1em] text-[#B91C1C]">
                  주요 약점
                </p>
              </div>
              <ul className="space-y-3">
                {synthesis.weaknessHighlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-[7px] w-1.5 h-1.5 bg-[#B91C1C] shrink-0" />
                    <p className="text-[13px] text-[#404040] leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 개선 방향 */}
          <div className="bg-white border border-[#E5E5E5] px-8 py-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5]">
              <ArrowRight className="w-3.5 h-3.5 text-[#1A56DB]" />
              <p className="text-[11px] font-semibold tracking-[0.1em] text-[#1A56DB]">
                개선 방향
              </p>
            </div>
            <ul className="space-y-3">
              {synthesis.improvementDirections.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-[7px] w-1.5 h-1.5 bg-[#1A56DB] shrink-0" />
                  <p className="text-[13px] text-[#404040] leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* 종합 판단 근거 */}
          {synthesis.verdictRationale && (
            <div className="bg-white border border-[#E5E5E5] px-8 py-6">
              <p className="text-[10px] font-semibold tracking-[0.1em] text-[#A3A3A3] mb-3">
                종합 판단 근거
              </p>
              <p className="text-[13px] text-[#404040] leading-[1.8]">
                {synthesis.verdictRationale}
              </p>
            </div>
          )}
        </div>
      ) : legacyText ? (
        /* 레거시 fallback: 기존 executiveSummary 텍스트 */
        <div className="bg-white border border-[#E5E5E5] px-8 lg:px-10 py-8 mb-12">
          <p className="text-[10px] font-semibold tracking-[0.1em] text-[#A3A3A3] mb-4">
            종합 요약
          </p>
          <p className="text-[13px] text-[#404040] leading-[1.85] whitespace-pre-wrap">
            {legacyText}
          </p>
        </div>
      ) : null}

      {/* ─── Per-agent score grid ─── */}
      <div className="mb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] text-[#A3A3A3] mb-1">
              분석가별 평가
            </p>
            <h3 className="text-[20px] font-bold text-[#0A0A0A] tracking-tight">
              {agentList.length}명의 분석가 평가
            </h3>
          </div>
          <p className="text-[11px] text-[#A3A3A3] font-medium hidden md:block">
            카드를 클릭하면 해당 분석가의 리포트로 이동합니다
          </p>
        </div>

        {/* Balanced grid: top row of 4, bottom row of 3 centered via flex */}
        <div className="flex flex-wrap justify-center gap-4">
          {agentList.map((agent) => {
            const perspective = perspectives[agent.id]
            if (!perspective) return null
            return (
              <div key={agent.id} className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] min-w-[260px]">
                <PerspectiveScoreCard
                  agent={agent}
                  perspective={perspective}
                  onClick={() => onSelectAgent(agent.id)}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── Divergences ─── */}
      {synthesis.divergences?.length > 0 && (
        <div className="mb-16">
          <div className="mb-6 flex items-start gap-4">
            <div className="w-10 h-10 border border-orange-300 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex flex-col justify-center min-h-[40px]">
              <p className="m-0 text-[10px] font-semibold tracking-[0.15em] text-orange-600 mb-1 leading-none">
                의견 분기
              </p>
              <h3 className="m-0 text-[20px] font-bold text-[#0A0A0A] tracking-tight leading-none">
                분석가 간 의견이 엇갈린 지점
              </h3>
            </div>
          </div>
          <div className="space-y-5">
            {synthesis.divergences.map((div, idx) => (
              <DivergenceCard key={idx} divergence={div} agents={agents} />
            ))}
          </div>
        </div>
      )}

      {/* ─── Top priority actions ─── */}
      {synthesis.topPriorityActions?.length > 0 && (
        <div className="mb-12">
          <div className="mb-6 flex items-start gap-4">
            <div className="w-10 h-10 border border-slate-300 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-slate-800" />
            </div>
            <div className="flex flex-col justify-center min-h-[40px]">
              <p className="m-0 text-[10px] font-semibold tracking-[0.15em] text-slate-500 mb-1 leading-none">
                실행 과제
              </p>
              <h3 className="m-0 text-[20px] font-bold text-[#0A0A0A] tracking-tight leading-none">
                최우선 실행 과제
              </h3>
            </div>
          </div>
          <div className="space-y-4">
            {synthesis.topPriorityActions.map((action, idx) => (
              <PriorityActionCard
                key={idx}
                action={action}
                agents={agents}
                index={idx}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

