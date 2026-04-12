'use client'

import {
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Target,
  Quote,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import type {
  AgentFinding,
  AgentPerspective,
  AgentRecommendation,
  AnalystAgent,
} from '@/types/ai-evaluation'
import {
  GRADE_CONFIG,
  PRIORITY_CONFIG,
  getGradeAccent,
  getScoreColor,
} from '../report-data'
import AgentAvatarBadge from './AgentAvatarBadge'
import { ScoreBar } from '../charts'

export default function PerspectivePanel({
  agent,
  perspective,
}: {
  agent: AnalystAgent
  perspective: AgentPerspective
}) {
  const scoreColor = getScoreColor(perspective.score)
  const gradeAccent = getGradeAccent(perspective.grade)
  const gradeLabel = GRADE_CONFIG[perspective.grade]?.label ?? perspective.gradeLabel

  // 구조화 필드 (v2.1) vs 레거시 fallback
  const hasStructured = !!(perspective.summaryHighlights?.length)
  const legacySummary = perspective.summary ?? ''

  return (
    <section
      id={`perspective-${agent.id}`}
      className="scroll-mt-[200px] py-12 border-t border-[#E5E5E5] first:border-t-0 first:pt-8"
    >
      {/* Accent rail */}
      <div
        className="h-[3px] w-full mb-10"
        style={{ backgroundColor: agent.accentColor || '#0A0A0A' }}
      />

      {/* ─── Header: agent info + score — 가로 배치 ─── */}
      <div className="bg-white border border-[#E5E5E5] p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <AgentAvatarBadge agent={agent} size="lg" showMeta />
          </div>

          {/* Score + Grade */}
          <div className="flex items-center gap-6 shrink-0">
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[52px] font-extrabold tabular-nums leading-none"
                style={{ color: scoreColor }}
              >
                {perspective.score}
              </span>
              <span className="text-[13px] text-[#A3A3A3] font-medium tabular-nums">/100</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className="px-2.5 py-1 text-[11px] font-bold tracking-[0.1em] text-white"
                style={{ backgroundColor: gradeAccent }}
              >
                {perspective.grade}
              </span>
              <span className="text-[10px] text-[#737373] font-medium">
                {gradeLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Verdict + Key Issue */}
        {(perspective.verdict || perspective.keyIssue) && (
          <div className="mt-6 pt-6 border-t border-[#E5E5E5] flex flex-col md:flex-row gap-6">
            {perspective.verdict && (
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold tracking-[0.1em] text-[#A3A3A3] mb-1.5">
                  종합 판정
                </p>
                <p className="text-[14px] font-bold text-[#0A0A0A] leading-snug">
                  {perspective.verdict}
                </p>
              </div>
            )}
            {perspective.keyIssue && (
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold tracking-[0.1em] text-[#B91C1C] mb-1.5">
                  핵심 이슈
                </p>
                <p className="text-[14px] font-bold text-[#B91C1C] leading-snug flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{perspective.keyIssue}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── Summary: structured or legacy ─── */}
      {hasStructured ? (
        <div className="bg-white border border-[#E5E5E5] px-8 py-6 mb-8">
          <p className="text-[10px] font-semibold tracking-[0.1em] text-[#A3A3A3] mb-4">
            분석 요약
          </p>
          <ul className="space-y-2.5">
            {perspective.summaryHighlights!.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-[7px] w-1.5 h-1.5 bg-[#0A0A0A] shrink-0" />
                <p className="text-[13px] text-[#404040] leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : legacySummary ? (
        <div className="bg-white border border-[#E5E5E5] px-8 py-6 mb-8">
          <p className="text-[10px] font-semibold tracking-[0.1em] text-[#A3A3A3] mb-3">
            분석 요약
          </p>
          <p className="text-[13px] text-[#404040] leading-[1.8] whitespace-pre-wrap">
            {legacySummary}
          </p>
        </div>
      ) : null}

      {/* ─── Findings: 강점/약점 2-column ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <FindingList
          icon={<TrendingUp className="w-3.5 h-3.5 text-[#047857]" />}
          label="강점"
          accent="#047857"
          findings={perspective.strengths}
        />
        <FindingList
          icon={<TrendingDown className="w-3.5 h-3.5 text-[#B91C1C]" />}
          label="약점"
          accent="#B91C1C"
          findings={perspective.weaknesses}
        />
      </div>

      {/* ─── 기회 요인 + 권고 사항 2-column ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <FindingList
          icon={<Lightbulb className="w-3.5 h-3.5 text-[#D97706]" />}
          label="기회 요인"
          accent="#D97706"
          findings={perspective.opportunities}
        />
        <RecommendationList recommendations={perspective.recommendations} />
      </div>

      {/* ─── Detailed findings — 세부 평가 항목 ─── */}
      {perspective.detailedFindings?.length > 0 && (
        <div className="mb-8">
          <p className="text-[10px] font-semibold tracking-[0.1em] text-[#A3A3A3] mb-4">
            세부 평가 항목
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {perspective.detailedFindings.map((finding, idx) => (
              <div
                key={`${finding.focusArea}-${idx}`}
                className="bg-white border border-[#E5E5E5] px-6 py-5"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h5 className="text-[13px] font-bold text-[#0A0A0A] tracking-tight leading-snug flex-1">
                    {finding.focusArea}
                  </h5>
                  <span
                    className="text-[18px] font-extrabold tabular-nums leading-none shrink-0"
                    style={{ color: getScoreColor(finding.score) }}
                  >
                    {finding.score}
                  </span>
                </div>
                <div className="mb-3">
                  <ScoreBar score={finding.score} height={2} />
                </div>
                <p className="text-[12px] text-[#404040] leading-[1.75]">
                  {finding.assessment.length > 150
                    ? finding.assessment.slice(0, 150) + '...'
                    : finding.assessment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Citations ─── */}
      {perspective.citations && perspective.citations.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold tracking-[0.1em] text-[#A3A3A3] mb-4">
            원문 인용
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {perspective.citations.map((citation, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E5E5E5] p-5 flex items-start gap-4"
              >
                <div className="w-9 h-9 border border-[#E5E5E5] flex items-center justify-center shrink-0">
                  <span className="text-[12px] font-bold tabular-nums text-[#0A0A0A]">
                    {citation.page}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1.5">
                    <Quote className="w-3 h-3 text-[#A3A3A3] mt-0.5 shrink-0" />
                    <p className="text-[11px] text-[#404040] leading-relaxed italic line-clamp-2">
                      &ldquo;{citation.quote}&rdquo;
                    </p>
                  </div>
                  {citation.relevance && (
                    <p className="text-[10px] text-[#737373] leading-relaxed pl-5">
                      {citation.relevance}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

// ─── Finding list (headline only — detail is already in detailedFindings) ───
function FindingList({
  icon,
  label,
  accent,
  findings,
}: {
  icon: React.ReactNode
  label: string
  accent: string
  findings: AgentFinding[]
}) {
  return (
    <div className="bg-white border border-[#E5E5E5] p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5]">
        <div
          className="w-6 h-6 border flex items-center justify-center shrink-0"
          style={{ borderColor: accent }}
        >
          {icon}
        </div>
        <p
          className="text-[11px] font-semibold tracking-[0.08em]"
          style={{ color: accent }}
        >
          {label}
        </p>
        <span className="text-[10px] font-medium text-[#A3A3A3] tabular-nums ml-auto">
          {findings.length}
        </span>
      </div>

      {findings.length === 0 ? (
        <p className="text-[11px] text-[#A3A3A3] italic">해당 항목이 없습니다.</p>
      ) : (
        <ul className="space-y-3 flex-1">
          {findings.map((finding, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className="mt-[6px] w-1.5 h-1.5 shrink-0"
                style={{ backgroundColor: accent }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-bold text-[#0A0A0A] leading-snug">
                  {finding.headline}
                </p>
                {finding.detail && (
                  <p className="text-[11px] text-[#737373] leading-relaxed mt-1">
                    {finding.detail}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Recommendation list ──────────────────────────────
function RecommendationList({
  recommendations,
}: {
  recommendations: AgentRecommendation[]
}) {
  return (
    <div className="bg-white border border-[#E5E5E5] p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5]">
        <div className="w-6 h-6 border border-[#0A0A0A] flex items-center justify-center shrink-0">
          <Target className="w-3.5 h-3.5 text-[#0A0A0A]" />
        </div>
        <p className="text-[11px] font-semibold tracking-[0.08em] text-[#0A0A0A]">
          권고 사항
        </p>
        <span className="text-[10px] font-medium text-[#A3A3A3] tabular-nums ml-auto">
          {recommendations.length}
        </span>
      </div>

      {recommendations.length === 0 ? (
        <p className="text-[11px] text-[#A3A3A3] italic">추천 사항이 없습니다.</p>
      ) : (
        <ul className="space-y-3 flex-1">
          {recommendations.map((rec, idx) => {
            const cfg = PRIORITY_CONFIG[rec.priority] ?? PRIORITY_CONFIG.medium
            return (
              <li
                key={idx}
                className="border-l-2 pl-4 py-1"
                style={{ borderColor: cfg.color }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="px-1.5 py-0.5 text-[9px] font-bold tracking-[0.06em] text-white"
                    style={{ backgroundColor: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                </div>
                <p className="text-[12px] font-bold text-[#0A0A0A] leading-snug mb-0.5 flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: cfg.color }} />
                  <span>{rec.action}</span>
                </p>
                {rec.expectedImpact && (
                  <p className="text-[10px] text-[#047857] font-medium leading-relaxed pl-5">
                    → {rec.expectedImpact}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
