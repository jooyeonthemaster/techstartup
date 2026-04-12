// ─────────────────────────────────────────────────────
// Claude Tool-Use schemas for the v2 multi-agent pipeline.
//
// Two tools are defined:
//   1. submit_agent_perspective — dynamically built per analyst agent
//      (enum of focus areas reflects that agent's focusAreas list).
//   2. submit_synthesis          — static schema for the synthesis agent
//      that consolidates all perspectives.
//
// The Trigger.dev task forces Claude to call these tools via
// `tool_choice: { type: 'tool', name: '...' }`, guaranteeing
// structured JSON matching our TypeScript types.
// ─────────────────────────────────────────────────────

import type { AnalystAgent } from '@/types/ai-evaluation'

/**
 * Anthropic tool definition shape (matches Messages API).
 * Re-declared here to avoid pulling the full SDK types into this module.
 */
export interface AnthropicTool {
  name: string
  description: string
  input_schema: {
    type: 'object'
    properties: Record<string, unknown>
    required: string[]
    additionalProperties?: boolean
  }
}

// ────────────────────────────────────────────────────
// Shared sub-schemas
// ────────────────────────────────────────────────────

const FINDING_SCHEMA = {
  type: 'object' as const,
  properties: {
    headline: { type: 'string', description: '핵심 한 줄 요약 (40자 이내 권장)' },
    detail: { type: 'string', description: '상세 설명 (1~3문장)' },
    reference: {
      type: 'string',
      description: '문서 내 위치 힌트 (예: "재무 섹션, 12페이지"). 없으면 생략 가능',
    },
  },
  required: ['headline', 'detail'],
  additionalProperties: false,
}

const RECOMMENDATION_SCHEMA = {
  type: 'object' as const,
  properties: {
    priority: {
      type: 'string',
      enum: ['critical', 'high', 'medium', 'low'],
      description: '우선순위',
    },
    action: { type: 'string', description: '무엇을 해야 하는지 구체적 액션' },
    rationale: { type: 'string', description: '왜 이것이 중요한가' },
    expectedImpact: { type: 'string', description: '실행 시 기대 효과' },
  },
  required: ['priority', 'action', 'rationale', 'expectedImpact'],
  additionalProperties: false,
}

const CITATION_SCHEMA = {
  type: 'object' as const,
  properties: {
    page: { type: 'integer', minimum: 1, description: 'PDF 페이지 번호 (1-indexed)' },
    quote: { type: 'string', description: '해당 위치의 원문 인용' },
    relevance: { type: 'string', description: '이 인용이 평가에서 어떻게 쓰였는지' },
  },
  required: ['page', 'quote', 'relevance'],
  additionalProperties: false,
}

// ────────────────────────────────────────────────────
// submit_agent_perspective — dynamic per agent
// ────────────────────────────────────────────────────

/**
 * Build a `submit_agent_perspective` tool definition for a single analyst.
 * The detailedFindings.focusArea enum mirrors the agent's focusAreas list so
 * Claude cannot invent unrelated categories.
 *
 * NOTE: agentId / agentRole are injected server-side after Claude responds
 * — they are NOT part of the tool schema. This prevents prompt injection
 * where the document tries to spoof another agent's identity.
 */
export function buildAgentTool(agent: AnalystAgent): AnthropicTool {
  const focusEnum =
    agent.focusAreas.length > 0 ? agent.focusAreas : ['general']

  return {
    name: 'submit_agent_perspective',
    description: `${agent.role} 관점에서 사업계획서 평가 결과를 구조화하여 제출합니다. 반드시 이 도구를 호출해야 하며 자유 텍스트 응답은 허용되지 않습니다.`,
    input_schema: {
      type: 'object',
      properties: {
        score: {
          type: 'integer',
          minimum: 0,
          maximum: 100,
          description: `0~100 점수. 루브릭: ${agent.scoringRubric.replace(/\s+/g, ' ').trim().slice(0, 300)}`,
        },
        grade: {
          type: 'string',
          enum: ['S', 'A', 'B', 'C', 'D'],
          description: 'S(90+)/A(80-89)/B(70-79)/C(60-69)/D(60미만)',
        },
        gradeLabel: {
          type: 'string',
          description: '등급 설명 라벨 (예: "우수", "양호")',
        },
        verdict: {
          type: 'string',
          description: '한 문장 평가 요약 (예: "조건부 투자 검토 권고")',
        },
        summaryHighlights: {
          type: 'array',
          items: { type: 'string' },
          minItems: 2,
          maxItems: 4,
          description: `${agent.role} 관점의 핵심 요약 포인트 2~4개. 각 항목 40자 이내 한 문장.`,
        },
        keyIssue: {
          type: 'string',
          description: '이 관점에서 가장 심각한 이슈 한 줄 (30자 이내). 예: "재무 계획 사실상 전무"',
        },
        strengths: {
          type: 'array',
          minItems: 1,
          maxItems: 8,
          items: FINDING_SCHEMA,
          description: '잘한 점 2~5개 권장',
        },
        weaknesses: {
          type: 'array',
          minItems: 1,
          maxItems: 8,
          items: FINDING_SCHEMA,
          description: '문제점·리스크 2~5개 권장',
        },
        opportunities: {
          type: 'array',
          minItems: 0,
          maxItems: 8,
          items: FINDING_SCHEMA,
          description: '기회·잠재력',
        },
        recommendations: {
          type: 'array',
          minItems: 1,
          maxItems: 10,
          items: RECOMMENDATION_SCHEMA,
          description: '구체적 개선 액션 2~6개 권장',
        },
        detailedFindings: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              focusArea: {
                type: 'string',
                enum: focusEnum,
                description: '이 에이전트의 focusAreas 중 하나',
              },
              assessment: {
                type: 'string',
                description: '해당 focusArea에 대한 구체 코멘트',
              },
              score: {
                type: 'integer',
                minimum: 0,
                maximum: 100,
                description: '0~100 세부 점수',
              },
            },
            required: ['focusArea', 'assessment', 'score'],
            additionalProperties: false,
          },
          description: '각 focusArea별 세부 평가',
        },
        citations: {
          type: 'array',
          items: CITATION_SCHEMA,
          description: 'PDF 페이지 인용 (가능하면 포함)',
        },
        confidence: {
          type: 'integer',
          minimum: 0,
          maximum: 100,
          description: '이 평가에 대한 스스로의 확신도. 문서 정보가 부족하면 낮게 매기고 이유를 summary에 명시',
        },
      },
      required: [
        'score',
        'grade',
        'gradeLabel',
        'verdict',
        'summaryHighlights',
        'keyIssue',
        'strengths',
        'weaknesses',
        'opportunities',
        'recommendations',
        'detailedFindings',
        'confidence',
      ],
      additionalProperties: false,
    },
  }
}

// ────────────────────────────────────────────────────
// submit_synthesis — static
// ────────────────────────────────────────────────────

export const SYNTHESIS_TOOL: AnthropicTool = {
  name: 'submit_synthesis',
  description:
    '여러 전문가 에이전트의 관점을 종합하여 최종 경영진 리포트를 제출합니다. 반드시 이 도구를 호출해야 합니다.',
  input_schema: {
    type: 'object',
    properties: {
      overallScore: {
        type: 'number',
        minimum: 0,
        maximum: 100,
        description: '가중 평균 종합 점수 (각 에이전트 score × weight / 100 합)',
      },
      overallGrade: {
        type: 'string',
        enum: ['S', 'A', 'B', 'C', 'D'],
      },
      overallGradeLabel: { type: 'string' },
      verdict: {
        type: 'string',
        description: '투자/심사 관점 최종 결론 (1~2문장)',
      },
      conclusion: {
        type: 'string',
        description: '핵심 결론 한 줄 (30자 이내). 예: "기술 잠재력은 있으나 사업화 준비 전면 미흡"',
      },
      strengthHighlights: {
        type: 'array',
        items: { type: 'string' },
        minItems: 2,
        maxItems: 4,
        description: '주요 강점 요약 2~4개. 각 항목 1문장(40자 이내). 에이전트들이 공통으로 인정한 핵심만.',
      },
      weaknessHighlights: {
        type: 'array',
        items: { type: 'string' },
        minItems: 2,
        maxItems: 4,
        description: '주요 약점 요약 2~4개. 각 항목 1문장(40자 이내). 가장 치명적인 것부터.',
      },
      improvementDirections: {
        type: 'array',
        items: { type: 'string' },
        minItems: 2,
        maxItems: 4,
        description: '개선 방향 2~4개. 각 항목 1~2문장. "~하면 ~가 개선될 것" 형태의 구체적 방향.',
      },
      verdictRationale: {
        type: 'string',
        description: '종합 판단 근거 (2~3문장). 왜 이 점수/등급인지 핵심 논거만 압축.',
      },
      divergences: {
        type: 'array',
        description: '에이전트 간 의견이 엇갈린 지점',
        items: {
          type: 'object',
          properties: {
            topic: { type: 'string' },
            positions: {
              type: 'array',
              minItems: 2,
              items: {
                type: 'object',
                properties: {
                  agentId: { type: 'string' },
                  agentRole: { type: 'string' },
                  stance: { type: 'string' },
                },
                required: ['agentId', 'agentRole', 'stance'],
                additionalProperties: false,
              },
            },
          },
          required: ['topic', 'positions'],
          additionalProperties: false,
        },
      },
      topPriorityActions: {
        type: 'array',
        minItems: 1,
        maxItems: 10,
        description: '모든 에이전트의 권고를 통합·재정렬한 최우선 실행 과제',
        items: {
          type: 'object',
          properties: {
            priority: {
              type: 'string',
              enum: ['critical', 'high', 'medium', 'low'],
            },
            action: { type: 'string' },
            rationale: { type: 'string' },
            sourceAgents: {
              type: 'array',
              items: { type: 'string' },
              description: '이 권고의 원천 에이전트 id 목록',
            },
            expectedImpact: { type: 'string' },
          },
          required: [
            'priority',
            'action',
            'rationale',
            'sourceAgents',
            'expectedImpact',
          ],
          additionalProperties: false,
        },
      },
    },
    required: [
      'overallScore',
      'overallGrade',
      'overallGradeLabel',
      'verdict',
      'conclusion',
      'strengthHighlights',
      'weaknessHighlights',
      'improvementDirections',
      'verdictRationale',
      'divergences',
      'topPriorityActions',
    ],
    additionalProperties: false,
  },
}
