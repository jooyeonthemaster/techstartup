// ─────────────────────────────────────────────────────
// POST /api/ai-evaluation/analyze/commit
//
// Called after the client finishes uploading the source file to
// Firebase Storage. Fires the Trigger.dev task and returns immediately;
// the task streams progress back into Firestore for the client to
// subscribe to via onSnapshot.
//
// Request:  { evaluationId }
// Response: { evaluationId, triggerRunId, ok: true }
// ─────────────────────────────────────────────────────

import { NextRequest } from 'next/server'
import { tasks } from '@trigger.dev/sdk'
import {
  requireAuth,
  authErrorResponse,
  AuthError,
} from '@/lib/ai-evaluation/auth'
import { adminDb } from '@/lib/firebase/admin'
import type { EvaluationDoc } from '@/types/ai-evaluation'
import type { analyzeEvaluationTask } from '@/trigger/analyze-evaluation'

export const runtime = 'nodejs'

interface CommitRequestBody {
  evaluationId?: unknown
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await requireAuth(req)
    const body = (await req.json()) as CommitRequestBody

    if (typeof body.evaluationId !== 'string' || !body.evaluationId) {
      return Response.json(
        { error: 'evaluationId가 필요합니다.' },
        { status: 400 }
      )
    }
    const evaluationId = body.evaluationId

    const snap = await adminDb.doc(`evaluations/${evaluationId}`).get()
    if (!snap.exists) {
      return Response.json(
        { error: '평가를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }
    const doc = snap.data() as EvaluationDoc

    // Ownership / admin check.
    if (doc.createdBy !== ctx.uid && !ctx.isAdmin) {
      return Response.json({ error: 'forbidden' }, { status: 403 })
    }

    // Duplicate trigger guard.
    if (doc.status !== 'queued') {
      return Response.json(
        {
          error: '이미 분석이 진행 중이거나 완료되었습니다.',
          status: doc.status,
        },
        { status: 409 }
      )
    }

    // Fire-and-forget trigger. The task itself persists status/progress.
    const handle = await tasks.trigger<typeof analyzeEvaluationTask>(
      'analyze-evaluation',
      { evaluationId }
    )

    // Mark the evaluation with the trigger run id so admins can look it up.
    await adminDb.doc(`evaluations/${evaluationId}`).update({
      triggerRunId: handle.id,
      attemptCount: (doc.attemptCount ?? 0) + 1,
      updatedAt: new Date().toISOString(),
    })

    return Response.json({
      evaluationId,
      triggerRunId: handle.id,
      ok: true,
    })
  } catch (err) {
    if (err instanceof AuthError) return authErrorResponse(err)
    console.error('[analyze/commit] error:', err)
    return Response.json(
      {
        error:
          (err as Error).message || '분석 작업 시작 중 오류가 발생했습니다.',
      },
      { status: 500 }
    )
  }
}
