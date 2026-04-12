// ─────────────────────────────────────────────────────
// AI 사업계획서 평가 시스템 — 타입 정의 v2
//
// 핵심 개념 전환 (v1 → v2):
//   v1: 프롬프트 1개 + criteria N개 → 단일 결과
//   v2: 패키지 1개 + 전문가 에이전트 N명 → 각자 관점의 리포트 N개 + 종합 리포트
//
// Firestore 컬렉션:
//   - evaluationPackages   (v1의 evaluationPrompts를 대체)
//   - evaluations          (기존 유지, 필드 확장)
//     ├ chats              (subcollection, 변경 없음)
//     └ artifacts          (subcollection, 변경 없음)
// ─────────────────────────────────────────────────────

// ════════════════════════════════════════
// 1. 분석가 에이전트 (AnalystAgent)
// ════════════════════════════════════════

/**
 * 한 명의 전문가 분석가를 표현.
 * 예: VC 투자심사역, 마케팅 전략가, 판로개척 전문가 등.
 *
 * 패키지 안에 여러 에이전트가 모여 같은 사업계획서를 병렬로 분석한다.
 */
export interface AnalystAgent {
  /** slug (예: "vc-analyst", "marketing-strategist") */
  id: string
  /** 화면에 표시되는 역할명 (예: "VC 투자심사역") */
  role: string
  /** 에이전트의 짧은 설명 (카드/목록용, 80자 내외) */
  tagline: string
  /** 상세 페르소나 (경력·관점·배경. 300~800자 권장) */
  persona: string
  /**
   * 이 에이전트의 풀 시스템 프롬프트.
   * Claude에 전달되며 페르소나·원칙·출력 규칙이 모두 포함됨.
   */
  systemPrompt: string
  /** 이 에이전트가 집중적으로 보는 관점/체크포인트 */
  focusAreas: string[]
  /** 0~100점 채점 루브릭 (자연어 설명) */
  scoringRubric: string
  /**
   * 종합 점수 계산 시 이 에이전트의 가중치.
   * 패키지 내 모든 에이전트의 weight 합 = 100.
   */
  weight: number
  /** 화면 표시 순서 */
  order: number
  /**
   * UI 색 힌트 (Tailwind-safe hex).
   * 에이전트별 뱃지/아이콘 색 구분용. 기본값은 관리자 편집기에서 자동 할당.
   */
  accentColor: string
  /**
   * 이 에이전트 전용 평가 기준 (optional).
   * 있으면 시스템 프롬프트에 추가 주입됨.
   */
  criteria?: AnalystCriterion[]
}

/**
 * 개별 에이전트 내부의 세부 평가 기준.
 * v1의 EvaluationCriterion을 축소·단순화한 버전.
 */
export interface AnalystCriterion {
  id: string
  label: string
  description: string
  /** 0~100 배점 */
  weight: number
}

// ════════════════════════════════════════
// 2. 평가 패키지 (EvaluationPackage)
// ════════════════════════════════════════

/**
 * 재사용 가능한 "에이전트 묶음".
 * 여러 사업계획서를 동일 패키지로 반복 평가할 수 있다.
 * 패키지 편집 시 새 버전으로 분기(parentId 체인).
 */
export interface EvaluationPackage {
  id: string
  name: string
  description: string
  /** 전체 패키지에 공통 적용되는 기본 원칙 (각 에이전트 systemPrompt 상단에 상속) */
  sharedPreamble: string
  /** 종합 에이전트가 사용할 합성 프롬프트 (convergence/divergence/top actions 생성) */
  synthesisPrompt: string
  /** 포함된 에이전트 목록 */
  agents: AnalystAgent[]
  /** v1 호환용 */
  outputSchemaVersion: 'v2'
  /** 1, 2, 3... */
  version: number
  /** 이전 버전 id (체인) */
  parentId: string | null
  /** 사용자가 선택 가능한 패키지인지 */
  isActive: boolean
  /** /new 진입 시 기본 선택 (전체에서 최대 1개) */
  isDefault: boolean
  createdBy: string
  createdByEmail: string
  createdAt: string
  updatedAt: string
}

// ════════════════════════════════════════
// 3. 에이전트별 분석 결과 (AgentPerspective)
// ════════════════════════════════════════

export type EvaluationGrade = 'S' | 'A' | 'B' | 'C' | 'D'

/**
 * 에이전트 한 명의 관점 리포트.
 * Claude가 Tool Use로 구조화 JSON으로 반환.
 */
export interface AgentPerspective {
  /** AnalystAgent.id 참조 */
  agentId: string
  /** denorm for UI */
  agentRole: string
  /** 0~100 */
  score: number
  grade: EvaluationGrade
  gradeLabel: string
  /** 한 문장 평가 요약 ("투자 검토 권고 (조건부)" 같은) */
  verdict: string
  /**
   * @deprecated v2.1에서 summaryHighlights/keyIssue로 대체.
   * 기존 데이터 fallback 전용.
   */
  summary?: string
  /** 핵심 요약 포인트 2~4개 (각 1문장, 40자 이내) */
  summaryHighlights: string[]
  /** 가장 심각한 이슈 한 줄 (30자 이내) */
  keyIssue: string
  /** 잘한 점 */
  strengths: AgentFinding[]
  /** 문제점·리스크 */
  weaknesses: AgentFinding[]
  /** 기회·잠재력 */
  opportunities: AgentFinding[]
  /** 구체적 개선 액션 아이템 */
  recommendations: AgentRecommendation[]
  /** 이 에이전트의 focusArea별 상세 코멘트 */
  detailedFindings: AgentDetailedFinding[]
  /**
   * Claude citations 기능으로 인용한 PDF 페이지 리스트 (optional).
   * 예: [{page: 5, quote: "..."}]
   */
  citations?: AgentCitation[]
  /**
   * 이 에이전트의 확신도 (Claude가 스스로 평가. 0~100).
   * 문서 정보가 부족해 확신하기 어려우면 낮게.
   */
  confidence: number
}

export interface AgentFinding {
  /** 핵심 한 줄 */
  headline: string
  /** 상세 설명 */
  detail: string
  /** 문서 내 위치 힌트 (optional. 예: "재무 섹션, 12페이지") */
  reference?: string
}

export interface AgentRecommendation {
  /** 우선순위 */
  priority: 'critical' | 'high' | 'medium' | 'low'
  /** 무엇을 해야 하는지 */
  action: string
  /** 왜 중요한가 */
  rationale: string
  /** 예상 효과 */
  expectedImpact: string
}

export interface AgentDetailedFinding {
  focusArea: string
  assessment: string
  /** 0~100, 이 focusArea만 봤을 때의 점수 */
  score: number
}

export interface AgentCitation {
  page: number
  quote: string
  /** Claude가 이 인용을 어디서 어떻게 사용했는지 */
  relevance: string
}

// ════════════════════════════════════════
// 4. 종합 리포트 (EvaluationSynthesis)
// ════════════════════════════════════════

/**
 * 모든 에이전트 결과를 집계한 최종 종합 리포트.
 * 별도의 "종합 에이전트" Claude 호출로 생성됨.
 */
export interface EvaluationSynthesis {
  /** 가중 평균 종합 점수 */
  overallScore: number
  overallGrade: EvaluationGrade
  overallGradeLabel: string
  /** 투자/심사 관점 최종 결론 */
  verdict: string
  /**
   * @deprecated v2.1에서 구조화 필드(conclusion, strengthHighlights 등)로 대체.
   * 기존 데이터 fallback 전용.
   */
  executiveSummary?: string
  /** 핵심 결론 한 줄 (30자 이내 권장) */
  conclusion: string
  /** 주요 강점 요약 (2~4개, 각 1문장) */
  strengthHighlights: string[]
  /** 주요 약점 요약 (2~4개, 각 1문장) */
  weaknessHighlights: string[]
  /** 개선 방향 (2~4개, 각 1~2문장) */
  improvementDirections: string[]
  /** 종합 판단 근거 (2~3문장) */
  verdictRationale: string
  /** @deprecated UI에서 삭제됨. 기존 데이터 호환용. */
  convergentStrengths?: string[]
  /** @deprecated UI에서 삭제됨. 기존 데이터 호환용. */
  convergentWeaknesses?: string[]
  /** 에이전트 간 의견이 엇갈린 지점 */
  divergences: Divergence[]
  /**
   * 최우선 실행 과제 (우선순위 순).
   * 각 항목은 어느 에이전트(들)로부터 파생됐는지 기록.
   */
  topPriorityActions: PriorityAction[]
  /** @deprecated UI에서 삭제됨. 기존 데이터 호환용. */
  bestScoreAgent?: string
  /** @deprecated UI에서 삭제됨. 기존 데이터 호환용. */
  worstScoreAgent?: string
  /** @deprecated UI에서 제거됨. 기존 데이터 호환용 optional. */
  averageConfidence?: number
}

export interface Divergence {
  topic: string
  /** 서로 다른 의견 묶음 */
  positions: {
    agentId: string
    agentRole: string
    stance: string
  }[]
}

export interface PriorityAction {
  priority: 'critical' | 'high' | 'medium' | 'low'
  action: string
  rationale: string
  /** 어느 에이전트에서 나온 추천인지 */
  sourceAgents: string[]
  /** 예상 효과 */
  expectedImpact: string
}

// ════════════════════════════════════════
// 5. 평가 문서 (Firestore evaluations/{id})
// ════════════════════════════════════════

export type EvaluationStatus =
  | 'queued' // 문서 스텁 생성 직후
  | 'uploading' // 클라이언트 업로드 진행 중
  | 'converting' // HWP → PDF 변환 중 (LibreOffice)
  | 'parsing' // PDF 파싱 / Files API 업로드
  | 'analyzing' // Claude 에이전트 병렬 호출 중
  | 'synthesizing' // 종합 에이전트 호출 중
  | 'finalizing' // 후처리·저장
  | 'ready'
  | 'error'

export interface EvaluationProgress {
  /** 0~100 */
  percent: number
  /** "HWP를 PDF로 변환 중..." */
  stageLabel: string
  /** 현재 분석 중인 에이전트 id (optional) */
  currentAgent?: string
  /**
   * 에이전트별 완료 상태.
   * 예: { "vc-analyst": "completed", "marketing-strategist": "running", ... }
   */
  agentStatuses?: Record<string, 'pending' | 'running' | 'completed' | 'failed'>
  updatedAt: string
}

export type SourceFormat = 'pdf' | 'hwp' | 'hwpx' | 'pptx' | 'ppt' | 'docx' | 'doc'

export interface EvaluationDocumentMeta {
  originalName: string
  size: number
  contentType: string
  sourceFormat: SourceFormat
  pageCount: number | null
  /** 원본 파일 (HWP 그대로 또는 PDF 원본) */
  sourceStoragePath: string
  /** HWP/PPTX 등 → PDF 변환본 (PDF 원본인 경우 sourceStoragePath와 동일) */
  pdfStoragePath: string | null
  downloadURL: string | null
  /** Claude Files API에 업로드한 뒤의 file_id (재호출 시 캐싱) */
  claudeFileId: string | null
  claudeFileExpiresAt: string | null
}

export interface EvaluationTokenUsage {
  inputTokens: number
  outputTokens: number
  cacheCreationTokens: number
  cacheReadTokens: number
  estimatedCostUsd: number
  /** 에이전트별 breakdown */
  byAgent: Record<
    string,
    {
      inputTokens: number
      outputTokens: number
      cacheReadTokens: number
      costUsd: number
    }
  >
}

export interface EvaluationDoc {
  id: string
  /** 평가 당시 사용된 패키지 id */
  packageId: string
  /** denorm for UI */
  packageName: string
  packageVersion: number
  documentMeta: EvaluationDocumentMeta
  status: EvaluationStatus
  progress: EvaluationProgress
  /**
   * 에이전트별 관점 리포트.
   * 키: AnalystAgent.id, 값: AgentPerspective (부분 완료 상태도 허용).
   */
  perspectives: Record<string, AgentPerspective> | null
  /** 최종 종합 리포트 (status === 'ready' 시에만 채워짐) */
  synthesis: EvaluationSynthesis | null
  errorMessage: string | null
  errorStack: string | null
  /**
   * 재시도 카운터. 에이전트 일부만 실패한 경우 부분 재실행 허용용.
   */
  attemptCount: number
  createdBy: string
  createdByEmail: string
  createdAt: string
  updatedAt: string
  completedAt: string | null
  tokenUsage: EvaluationTokenUsage | null
  /** Trigger.dev run id (디버깅/관리자 추적용) */
  triggerRunId: string | null
  /** 소프트 삭제 */
  isArchived: boolean
}

// ════════════════════════════════════════
// 6. 챗 서브컬렉션 (변경 없음)
// ════════════════════════════════════════

export interface EvaluationChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
  tokenUsage: { input: number; output: number } | null
  isError?: boolean
}

// ════════════════════════════════════════
// 7. Artifacts (원본 추출/변환 흔적)
// ════════════════════════════════════════

export interface EvaluationSourceArtifact {
  id: string
  /** 변환/파싱 과정 중의 자연어 로그 */
  conversionLog: string
  /** 사용된 변환 방법 */
  converterUsed: 'libreoffice' | 'libreoffice-h2orestart' | 'hwpjs-fallback' | 'direct-pdf'
  /** 변환 소요 시간(ms) */
  conversionDurationMs: number
  /** 결과 PDF 페이지 수 */
  pdfPageCount: number | null
  /** 텍스트 추출 백업 (디버깅용) */
  extractedTextSample: string | null
  createdAt: string
}

// ════════════════════════════════════════
// 8. v1 호환 shim (점진 마이그레이션)
// ════════════════════════════════════════

/**
 * v1 외부 코드가 참조하던 `REPORT` 형태의 결과 shape.
 * @deprecated v2에서는 EvaluationSynthesis + perspectives 조합 사용.
 */
export type LegacyReportShape = {
  overall: EvaluationSynthesis
  perspectives: Record<string, AgentPerspective>
}
