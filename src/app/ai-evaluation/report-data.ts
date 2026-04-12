// ─────────────────────────────────────────────────────
// AI 사업계획서 평가 v2 — UI 헬퍼 (타입 shim 제거됨)
// 실제 데이터는 EvaluationDoc.synthesis / perspectives 참조.
// ─────────────────────────────────────────────────────

import type {
  AgentPerspective,
  AnalystAgent,
  EvaluationGrade,
} from '@/types/ai-evaluation'

/* ── Grade 설정 ── */
export const GRADE_CONFIG: Record<EvaluationGrade, { label: string; accent: string }> = {
  S: { label: '최우수', accent: '#7C3AED' },
  A: { label: '우수', accent: '#1A56DB' },
  B: { label: '양호', accent: '#047857' },
  C: { label: '보통', accent: '#B45309' },
  D: { label: '미흡', accent: '#B91C1C' },
}

export function getGradeAccent(grade: EvaluationGrade | null | undefined): string {
  if (!grade) return '#737373'
  return GRADE_CONFIG[grade]?.accent ?? '#737373'
}

/** 0~100 점수를 등급으로 변환 (백엔드가 채웠더라도 안전장치로 사용) */
export function getGradeFromScore(score: number): EvaluationGrade {
  if (score >= 90) return 'S'
  if (score >= 80) return 'A'
  if (score >= 70) return 'B'
  if (score >= 55) return 'C'
  return 'D'
}

/** 가중 평균 종합 점수 계산 (synthesis가 누락됐을 때 fallback) */
export function calculateWeightedScore(
  perspectives: Record<string, AgentPerspective>,
  agents: AnalystAgent[]
): number {
  if (!agents.length) return 0
  let totalWeight = 0
  let weightedSum = 0
  for (const agent of agents) {
    const perspective = perspectives[agent.id]
    if (!perspective) continue
    weightedSum += perspective.score * agent.weight
    totalWeight += agent.weight
  }
  if (totalWeight === 0) return 0
  return Math.round(weightedSum / totalWeight)
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#047857' // success green
  if (score >= 65) return '#1A56DB' // accent blue
  if (score >= 50) return '#B45309' // warning amber
  return '#B91C1C' // danger red
}

export function getScoreLabel(score: number): string {
  if (score >= 85) return '우수'
  if (score >= 70) return '양호'
  if (score >= 55) return '보통'
  return '미흡'
}

/* ── 우선순위 설정 ── */
export type PriorityKey = 'critical' | 'high' | 'medium' | 'low'

export const PRIORITY_CONFIG: Record<
  PriorityKey,
  { label: string; color: string; bg: string }
> = {
  critical: { label: '긴급', color: '#B91C1C', bg: 'rgba(185, 28, 28, 0.06)' },
  high: { label: '높음', color: '#D97706', bg: 'rgba(217, 119, 6, 0.06)' },
  medium: { label: '보통', color: '#1A56DB', bg: 'rgba(26, 86, 219, 0.06)' },
  low: { label: '낮음', color: '#737373', bg: 'rgba(115, 115, 115, 0.06)' },
}

/* ── Agent 상태 설정 ── */
export type AgentRunStatus = 'pending' | 'running' | 'completed' | 'failed'

export const AGENT_STATUS_CONFIG: Record<
  AgentRunStatus,
  { label: string; color: string }
> = {
  pending: { label: '대기', color: '#A3A3A3' },
  running: { label: '분석 중', color: '#1A56DB' },
  completed: { label: '완료', color: '#047857' },
  failed: { label: '실패', color: '#B91C1C' },
}

/* ── Evaluation 상태 설정 (v1 legacy getter 유지 — 문자열 기반) ── */
export function getStatusConfig(status: string) {
  switch (status) {
    case 'ready':
      return { label: '완료', color: '#047857', bg: 'bg-[#047857]' }
    case 'error':
      return { label: '실패', color: '#B91C1C', bg: 'bg-[#B91C1C]' }
    case 'queued':
      return { label: '대기', color: '#737373', bg: 'bg-[#737373]' }
    default:
      return { label: '분석 중', color: '#1A56DB', bg: 'bg-[#1A56DB]' }
  }
}

/** 두 글자 이니셜 추출 (한글/영문 대응) */
export function getRoleInitial(role: string): string {
  if (!role) return '?'
  const trimmed = role.trim()
  // 한글이면 첫 글자 1개, 영문이면 최대 2글자
  const isKorean = /[가-힣]/.test(trimmed[0])
  if (isKorean) return trimmed[0]
  const parts = trimmed.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return trimmed.slice(0, 2).toUpperCase()
}
