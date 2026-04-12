import { NextRequest } from 'next/server'
import { adminDb } from '@/lib/firebase/admin'
import {
  requireAuth,
  authErrorResponse,
  AuthError,
} from '@/lib/ai-evaluation/auth'
import type {
  EvaluationDoc,
  EvaluationPackage,
  EvaluationChatMessage,
} from '@/types/ai-evaluation'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const MODEL = 'claude-sonnet-4-6'
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'

// ────────────────────────────────────────────────────
// System prompt builder (v2 — uses packageId + perspectives + synthesis)
// ────────────────────────────────────────────────────

function buildChatSystemPrompt(
  evalDoc: EvaluationDoc,
  pkg: EvaluationPackage
): string {
  const synthesis = evalDoc.synthesis
  const overall = synthesis
    ? `${synthesis.overallScore} / 100 (${synthesis.overallGrade} 등급)`
    : 'N/A'
  const verdict = synthesis?.verdict ?? 'N/A'

  const agentsBrief = pkg.agents
    .map((agent) => {
      const p = evalDoc.perspectives?.[agent.id]
      if (!p) {
        return `- ${agent.role} (${agent.id}): 결과 없음`
      }
      return `- ${agent.role} (${agent.id}): ${p.score}점 / ${p.grade} — ${p.verdict}`
    })
    .join('\n')

  // Separate perspectives and synthesis for a cleaner JSON block.
  const reportJson = JSON.stringify(
    {
      synthesis: evalDoc.synthesis,
      perspectives: evalDoc.perspectives,
    },
    null,
    2
  )

  return `당신은 KTVSA AI 평가 시스템의 심사역 어시스턴트입니다.

# 현재 평가 정보
- 문서: ${evalDoc.documentMeta.originalName}
- 평가 패키지: ${pkg.name} (v${pkg.version})
- 생성일: ${evalDoc.createdAt}
- 종합 점수: ${overall}
- 최종 평가: ${verdict}

# 참여한 전문가 에이전트 (${pkg.agents.length}명)
${agentsBrief}

# 이 사용자가 현재 보고 있는 평가 결과 (JSON)
\`\`\`json
${reportJson}
\`\`\`

# 답변 규칙
- 사용자가 보고서의 특정 항목·평가 근거·개선 방향에 대해 질문하면, 위 JSON 데이터를 정확히 인용해서 답하세요. 숫자·항목명을 만들어내지 마세요.
- "이 지표를 언급한 에이전트가 누구인지"를 물으면 perspectives의 agentId와 role을 명시하세요.
- 보고서에 포함되지 않은 내용을 물으면 "해당 내용은 이 평가에 포함되지 않았습니다"라고 명시한 뒤 일반론으로 보충하세요.
- 한국어로, 정중하지만 단호한 심사역 톤으로 답하세요.
- 핵심부터 먼저 말하고, 필요 시 번호나 줄바꿈으로 정리하세요. 불필요하게 장황하지 않게.
- 절대로 마크다운 문법(##, **, *, \`\`\`, |, >, - 등)을 사용하지 마세요. 이 채팅은 마크다운 렌더링을 지원하지 않으므로, 순수한 자연어 텍스트로만 답하세요.
- 강조가 필요하면 마크다운 대신 「이렇게」 또는 따옴표로 감싸세요.
- 목록이 필요하면 "1. 2. 3." 번호를 사용하세요. 대시(-) 불릿은 사용하지 마세요.
- 표(테이블)를 만들지 마세요. 표 대신 "항목: 값" 형태의 줄바꿈 텍스트로 정리하세요.`
}

// ────────────────────────────────────────────────────
// Firestore helpers
// ────────────────────────────────────────────────────

async function saveChatMessage(
  evaluationId: string,
  message: Omit<EvaluationChatMessage, 'id'> & { id?: string }
): Promise<string> {
  const chatsCol = adminDb
    .collection('evaluations')
    .doc(evaluationId)
    .collection('chats')
  const docRef = message.id ? chatsCol.doc(message.id) : chatsCol.doc()
  const payload: EvaluationChatMessage = {
    id: docRef.id,
    role: message.role,
    content: message.content,
    createdAt: message.createdAt,
    tokenUsage: message.tokenUsage ?? null,
    ...(message.isError ? { isError: true } : {}),
  }
  await docRef.set(payload)
  return docRef.id
}

// ────────────────────────────────────────────────────
// POST /api/chat
// ────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Auth
  let ctx: Awaited<ReturnType<typeof requireAuth>>
  try {
    ctx = await requireAuth(req)
  } catch (err) {
    return authErrorResponse(err)
  }

  // 2. API key check
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // 3. Body parse
  let body: { messages?: ChatMessage[]; evaluationId?: string }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const evaluationId = body.evaluationId?.trim()
  if (!evaluationId) {
    return new Response(
      JSON.stringify({ error: 'evaluationId가 필요합니다.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const messages = (body.messages ?? []).filter(
    (m): m is ChatMessage =>
      !!m &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      m.content.trim().length > 0
  )

  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages가 비어 있습니다.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')
  if (!lastUserMessage) {
    return new Response(
      JSON.stringify({ error: '사용자 메시지가 필요합니다.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // 4. Load evaluation + package (v2)
  let evalDoc: EvaluationDoc
  let pkg: EvaluationPackage
  try {
    const evalSnap = await adminDb.doc(`evaluations/${evaluationId}`).get()
    if (!evalSnap.exists) {
      return new Response(JSON.stringify({ error: '평가를 찾을 수 없습니다.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    evalDoc = {
      id: evalSnap.id,
      ...(evalSnap.data() as Omit<EvaluationDoc, 'id'>),
    }

    if (evalDoc.createdBy !== ctx.uid && !ctx.isAdmin) {
      return new Response(JSON.stringify({ error: '접근 권한이 없습니다.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (evalDoc.status !== 'ready') {
      return new Response(
        JSON.stringify({ error: '아직 분석이 완료되지 않았습니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const pkgSnap = await adminDb
      .doc(`evaluationPackages/${evalDoc.packageId}`)
      .get()
    if (!pkgSnap.exists) {
      return new Response(
        JSON.stringify({ error: '평가 패키지를 찾을 수 없습니다.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }
    pkg = {
      id: pkgSnap.id,
      ...(pkgSnap.data() as Omit<EvaluationPackage, 'id'>),
    }
  } catch (err) {
    if (err instanceof AuthError) return authErrorResponse(err)
    console.error('[api/chat] load evaluation failed:', err)
    return new Response(
      JSON.stringify({ error: '평가 정보를 로드하지 못했습니다.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // 5. Save user message (pre-stream)
  const nowIso = () => new Date().toISOString()
  try {
    await saveChatMessage(evaluationId, {
      role: 'user',
      content: lastUserMessage.content,
      createdAt: nowIso(),
      tokenUsage: null,
    })
  } catch (err) {
    console.error('[api/chat] save user message failed:', err)
    // 저장 실패는 치명적이지 않음 — 스트림은 계속 진행
  }

  // 6. Call Anthropic API (streaming)
  const systemPrompt = buildChatSystemPrompt(evalDoc, pkg)

  const anthropicRes = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2048,
      stream: true,
      system: systemPrompt,
      messages,
    }),
  })

  if (!anthropicRes.ok || !anthropicRes.body) {
    const errText = await anthropicRes.text().catch(() => '')
    try {
      await saveChatMessage(evaluationId, {
        role: 'assistant',
        content: `Anthropic API 호출 실패: ${errText.slice(0, 300)}`,
        createdAt: nowIso(),
        tokenUsage: null,
        isError: true,
      })
    } catch {
      /* ignore */
    }
    return new Response(
      JSON.stringify({
        error: 'Anthropic API 호출 실패',
        detail: errText.slice(0, 500),
      }),
      {
        status: anthropicRes.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  // Usage tracking (Anthropic SSE event parsing)
  let inputTokens: number | null = null
  let outputTokens: number | null = null
  let assistantContent = ''

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = anthropicRes.body!.getReader()
      let buffer = ''
      try {
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })

          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const payload = line.slice(6).trim()
            if (!payload) continue
            try {
              const evt = JSON.parse(payload)
              if (
                evt.type === 'content_block_delta' &&
                evt.delta?.type === 'text_delta'
              ) {
                const text: string = evt.delta.text ?? ''
                if (text) {
                  assistantContent += text
                  controller.enqueue(encoder.encode(text))
                }
                continue
              }
              if (evt.type === 'message_start' && evt.message?.usage) {
                inputTokens = evt.message.usage.input_tokens ?? inputTokens
                outputTokens = evt.message.usage.output_tokens ?? outputTokens
                continue
              }
              if (evt.type === 'message_delta' && evt.usage) {
                outputTokens = evt.usage.output_tokens ?? outputTokens
                continue
              }
            } catch {
              // ignore malformed chunk
            }
          }
        }
        controller.close()

        // Stream done — persist assistant message.
        try {
          const usage =
            inputTokens !== null && outputTokens !== null
              ? { input: inputTokens, output: outputTokens }
              : null
          await saveChatMessage(evaluationId, {
            role: 'assistant',
            content: assistantContent,
            createdAt: nowIso(),
            tokenUsage: usage,
          })
        } catch (saveErr) {
          console.error('[api/chat] save assistant message failed:', saveErr)
        }
      } catch (err) {
        console.error('[api/chat] stream error:', err)
        try {
          await saveChatMessage(evaluationId, {
            role: 'assistant',
            content: assistantContent || '스트림 오류가 발생했습니다.',
            createdAt: nowIso(),
            tokenUsage: null,
            isError: true,
          })
        } catch {
          /* ignore */
        }
        controller.error(err)
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  })
}
