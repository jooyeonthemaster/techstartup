// ─────────────────────────────────────────────────────
// Claude Messages + Files API helpers for the v2 multi-agent pipeline.
//
// Responsibilities:
//   1. Upload PDF to Anthropic Files API (returns a reusable file_id).
//   2. Call a single analyst agent with a document block + tool_choice.
//   3. Call the synthesis agent with all perspectives as a text block.
//
// All calls are server-only. Import from Trigger tasks / API routes,
// never from client code.
//
// Key optimizations:
//   - Prompt caching (`cache_control: ephemeral`) on the document block:
//     the first agent pays cache-write cost, the remaining 6 agents read
//     from cache at 0.1x. Break-even after the 2nd call.
//   - Adaptive thinking ("medium" effort) tuned for Sonnet 4.6.
//   - Tool-use is forced (`tool_choice: { type: 'tool', name: '...' }`)
//     so Claude cannot return free-form text and break our parser.
// ─────────────────────────────────────────────────────

import type {
  AnalystAgent,
  AgentPerspective,
  EvaluationSynthesis,
} from '@/types/ai-evaluation'
import { buildAgentTool, SYNTHESIS_TOOL, type AnthropicTool } from './tool-schemas'

// ────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────

const MODEL_ID = 'claude-sonnet-4-6'
const ANTHROPIC_BASE = 'https://api.anthropic.com/v1'
const ANTHROPIC_VERSION = '2023-06-01'
const FILES_API_BETA = 'files-api-2025-04-14'

// Sonnet 4.6 pricing (USD per 1M tokens).
// See https://docs.anthropic.com/en/docs/about-claude/pricing
const PRICE_INPUT_PER_MTOK = 3.0
const PRICE_OUTPUT_PER_MTOK = 15.0
const CACHE_WRITE_MULTIPLIER = 1.25
const CACHE_READ_MULTIPLIER = 0.1

// ────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────

export interface ClaudeUsage {
  inputTokens: number
  outputTokens: number
  cacheCreationTokens: number
  cacheReadTokens: number
  costUsd: number
}

export interface AnalysisCallResult {
  perspective: AgentPerspective
  usage: ClaudeUsage
}

export interface SynthesisCallResult {
  synthesis: EvaluationSynthesis
  usage: ClaudeUsage
}

export interface FilesApiUploadResult {
  fileId: string
  filename: string
  mimeType: string
  sizeBytes: number
  createdAt: string
}

// ────────────────────────────────────────────────────
// Pricing helper
// ────────────────────────────────────────────────────

export function computeCostUsd(u: {
  inputTokens: number
  outputTokens: number
  cacheCreationTokens: number
  cacheReadTokens: number
}): number {
  const inputCost = (u.inputTokens / 1_000_000) * PRICE_INPUT_PER_MTOK
  const outputCost = (u.outputTokens / 1_000_000) * PRICE_OUTPUT_PER_MTOK
  const cacheWriteCost =
    (u.cacheCreationTokens / 1_000_000) * PRICE_INPUT_PER_MTOK * CACHE_WRITE_MULTIPLIER
  const cacheReadCost =
    (u.cacheReadTokens / 1_000_000) * PRICE_INPUT_PER_MTOK * CACHE_READ_MULTIPLIER
  return +(inputCost + outputCost + cacheWriteCost + cacheReadCost).toFixed(6)
}

function parseUsage(raw: unknown): ClaudeUsage {
  const r = (raw ?? {}) as Record<string, unknown>
  const inputTokens = Number(r.input_tokens ?? 0)
  const outputTokens = Number(r.output_tokens ?? 0)
  const cacheCreationTokens = Number(r.cache_creation_input_tokens ?? 0)
  const cacheReadTokens = Number(r.cache_read_input_tokens ?? 0)
  return {
    inputTokens,
    outputTokens,
    cacheCreationTokens,
    cacheReadTokens,
    costUsd: computeCostUsd({
      inputTokens,
      outputTokens,
      cacheCreationTokens,
      cacheReadTokens,
    }),
  }
}

// ────────────────────────────────────────────────────
// Files API upload
// ────────────────────────────────────────────────────

/**
 * Upload a PDF buffer to Anthropic Files API.
 * Returns a `file_id` that can be referenced from document blocks.
 * Files are retained by Anthropic for ~90 days (check `created_at`).
 */
export async function uploadPdfToFilesApi(
  buffer: Buffer,
  filename: string
): Promise<FilesApiUploadResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY 가 설정되지 않았습니다.')

  const form = new FormData()
  const blob = new Blob([new Uint8Array(buffer)], { type: 'application/pdf' })
  form.append('file', blob, filename)

  const res = await fetch(`${ANTHROPIC_BASE}/files`, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
      'anthropic-beta': FILES_API_BETA,
    },
    body: form,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(
      `Anthropic Files API 업로드 실패 (${res.status}): ${text.slice(0, 500)}`
    )
  }

  const json = (await res.json()) as {
    id: string
    filename: string
    mime_type: string
    size_bytes: number
    created_at: string
  }

  return {
    fileId: json.id,
    filename: json.filename,
    mimeType: json.mime_type,
    sizeBytes: json.size_bytes,
    createdAt: json.created_at,
  }
}

// ────────────────────────────────────────────────────
// Messages call — single analyst agent
// ────────────────────────────────────────────────────

interface CallAnalystArgs {
  agent: AnalystAgent
  sharedPreamble: string
  claudeFileId: string
  originalFilename: string
}

/**
 * Call a single analyst agent. Returns a fully-typed `AgentPerspective`
 * (with agentId/agentRole server-injected from the agent definition).
 */
export async function callAnalysisAgent(
  args: CallAnalystArgs
): Promise<AnalysisCallResult> {
  const { agent, sharedPreamble, claudeFileId, originalFilename } = args

  const tool = buildAgentTool(agent)

  // Compose system prompt — shared preamble first, then agent-specific.
  // If the agent's systemPrompt already contains the preamble (as the default
  // seed does), we still repeat it at the top for robustness; Claude dedup
  // is fine and the extra tokens hit the cache anyway.
  const systemBlocks = [
    { type: 'text' as const, text: sharedPreamble },
    { type: 'text' as const, text: agent.systemPrompt },
  ]

  const body = {
    model: MODEL_ID,
    max_tokens: 8192,
    system: systemBlocks,
    // NOTE: `thinking`은 `tool_choice`로 도구 사용을 강제할 때 공존 불가
    // ("Thinking may not be enabled when tool_choice forces tool use").
    // 우리 파이프라인은 구조화 출력이 필수이므로 thinking을 포기한다.
    tools: [tool],
    tool_choice: { type: 'tool' as const, name: tool.name },
    messages: [
      {
        role: 'user' as const,
        content: [
          {
            type: 'document' as const,
            source: { type: 'file' as const, file_id: claudeFileId },
            title: originalFilename,
            citations: { enabled: true },
            // Cache the document block — 7 agents share the same PDF.
            cache_control: { type: 'ephemeral' as const },
          },
          {
            type: 'text' as const,
            text: `위 사업계획서를 당신(${agent.role})의 전문 관점에서 평가하고, 반드시 \`${tool.name}\` 도구를 호출해 구조화 JSON으로 제출하세요. 자유 텍스트 응답은 허용되지 않습니다.`,
          },
        ],
      },
    ],
  }

  const res = await callMessages(body)

  // Find the tool_use block matching our tool name.
  const toolBlock = (res.content as unknown[]).find(
    (b): b is { type: 'tool_use'; name: string; input: Record<string, unknown> } =>
      typeof b === 'object' &&
      b !== null &&
      (b as { type?: string }).type === 'tool_use' &&
      (b as { name?: string }).name === tool.name
  )

  if (!toolBlock) {
    throw new Error(
      `에이전트 "${agent.id}" Claude 응답에서 ${tool.name} tool_use 블록을 찾지 못했습니다. stop_reason=${res.stop_reason}`
    )
  }

  // Server-side injection: agentId/agentRole MUST NOT come from Claude.
  const perspective: AgentPerspective = {
    ...(toolBlock.input as unknown as Omit<AgentPerspective, 'agentId' | 'agentRole'>),
    agentId: agent.id,
    agentRole: agent.role,
  }

  return { perspective, usage: parseUsage(res.usage) }
}

// ────────────────────────────────────────────────────
// Messages call — synthesis agent
// ────────────────────────────────────────────────────

interface CallSynthesisArgs {
  synthesisPrompt: string
  agents: AnalystAgent[]
  perspectives: Record<string, AgentPerspective>
}

/**
 * Call the synthesis agent with all analyst perspectives embedded as JSON
 * inside a text block. Returns a structured EvaluationSynthesis.
 *
 * Server also independently computes the weighted overall score; if
 * Claude's answer differs by more than 5 points, the server value wins.
 */
export async function callSynthesisAgent(
  args: CallSynthesisArgs
): Promise<SynthesisCallResult> {
  const { synthesisPrompt, agents, perspectives } = args

  // Build a deterministic summary section grouped by agent.
  const agentSections = agents
    .map((agent) => {
      const p = perspectives[agent.id]
      if (!p) {
        return `<agent id="${agent.id}" role="${agent.role}" weight="${agent.weight}" status="missing" />`
      }
      return [
        `<agent id="${agent.id}" role="${agent.role}" weight="${agent.weight}">`,
        JSON.stringify(p, null, 2),
        `</agent>`,
      ].join('\n')
    })
    .join('\n\n')

  const userText = `다음은 ${agents.length}명의 전문가 에이전트가 제출한 관점 리포트입니다.
각 <agent> 태그 안의 JSON은 해당 에이전트의 AgentPerspective입니다. weight는 종합 점수 계산용 가중치(합 100)입니다.

${agentSections}

모든 관점을 종합해 ${SYNTHESIS_TOOL.name} 도구를 호출하세요. 반드시 도구 호출만 하고 자유 텍스트는 응답하지 마세요.`

  const body = {
    model: MODEL_ID,
    max_tokens: 8192,
    system: synthesisPrompt,
    // thinking은 tool_choice와 공존 불가 (analyst agent 참고). 제거.
    tools: [SYNTHESIS_TOOL],
    tool_choice: { type: 'tool' as const, name: SYNTHESIS_TOOL.name },
    messages: [
      {
        role: 'user' as const,
        content: [{ type: 'text' as const, text: userText }],
      },
    ],
  }

  const res = await callMessages(body)

  const toolBlock = (res.content as unknown[]).find(
    (b): b is { type: 'tool_use'; name: string; input: Record<string, unknown> } =>
      typeof b === 'object' &&
      b !== null &&
      (b as { type?: string }).type === 'tool_use' &&
      (b as { name?: string }).name === SYNTHESIS_TOOL.name
  )

  if (!toolBlock) {
    throw new Error(
      `종합 에이전트 응답에서 ${SYNTHESIS_TOOL.name} tool_use 블록을 찾지 못했습니다. stop_reason=${res.stop_reason}`
    )
  }

  const synthesis = toolBlock.input as unknown as EvaluationSynthesis

  // Independent server-side verification of the weighted score.
  const serverOverall = computeWeightedOverall(agents, perspectives)
  if (Math.abs((synthesis.overallScore ?? 0) - serverOverall) > 5) {
    console.warn('[synthesis] overallScore mismatch — server value wins', {
      claude: synthesis.overallScore,
      server: serverOverall,
    })
    synthesis.overallScore = serverOverall
    synthesis.overallGrade = scoreToGrade(serverOverall)
  }

  return { synthesis, usage: parseUsage(res.usage) }
}

function computeWeightedOverall(
  agents: AnalystAgent[],
  perspectives: Record<string, AgentPerspective>
): number {
  let weightedSum = 0
  let totalWeight = 0
  for (const agent of agents) {
    const p = perspectives[agent.id]
    if (!p) continue
    weightedSum += (p.score ?? 0) * agent.weight
    totalWeight += agent.weight
  }
  if (totalWeight === 0) return 0
  return +(weightedSum / totalWeight).toFixed(1)
}

function scoreToGrade(score: number): 'S' | 'A' | 'B' | 'C' | 'D' {
  if (score >= 90) return 'S'
  if (score >= 80) return 'A'
  if (score >= 70) return 'B'
  if (score >= 60) return 'C'
  return 'D'
}

// ────────────────────────────────────────────────────
// Shared Messages API transport
// ────────────────────────────────────────────────────

interface ClaudeMessagesResponse {
  id: string
  type: 'message'
  role: 'assistant'
  content: unknown[]
  model: string
  stop_reason: string
  stop_sequence: string | null
  usage: unknown
}

async function callMessages(body: unknown): Promise<ClaudeMessagesResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY 가 설정되지 않았습니다.')

  const res = await fetch(`${ANTHROPIC_BASE}/messages`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
      // Files API beta header is only strictly required for /v1/files,
      // but Claude accepts it on /messages as well and we use document
      // blocks with file sources.
      'anthropic-beta': FILES_API_BETA,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(
      `Anthropic Messages API 실패 (${res.status}): ${text.slice(0, 800)}`
    )
  }

  return (await res.json()) as ClaudeMessagesResponse
}

// Exported for tests / external accounting.
export { MODEL_ID }
export type { AnthropicTool }
