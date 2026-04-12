import { NextRequest } from 'next/server'
import { adminDb, adminStorage } from '@/lib/firebase/admin'
import { requireAuth, authErrorResponse } from '@/lib/ai-evaluation/auth'
import type { EvaluationDoc } from '@/types/ai-evaluation'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /api/ai-evaluation/evaluations/[id]/download
 *
 * 평가 원본 파일의 서명된 다운로드 URL을 반환한다.
 * - 인증 필수 (Authorization: Bearer {idToken})
 * - 소유자 또는 관리자만 접근 가능
 * - URL 만료: 10분
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // 1. Auth
  let ctx: Awaited<ReturnType<typeof requireAuth>>
  try {
    ctx = await requireAuth(req)
  } catch (err) {
    return authErrorResponse(err)
  }

  // 2. Param
  const { id } = await context.params
  if (!id) {
    return new Response(JSON.stringify({ error: 'evaluationId가 필요합니다.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // 3. Load evaluation
  let evalDoc: EvaluationDoc
  try {
    const snap = await adminDb.doc(`evaluations/${id}`).get()
    if (!snap.exists) {
      return new Response(JSON.stringify({ error: '평가를 찾을 수 없습니다.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    evalDoc = { id: snap.id, ...(snap.data() as Omit<EvaluationDoc, 'id'>) }
  } catch (err) {
    console.error('[download] load evaluation failed:', err)
    return new Response(
      JSON.stringify({ error: '평가 정보를 로드하지 못했습니다.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // 4. Ownership check
  if (evalDoc.createdBy !== ctx.uid && !ctx.isAdmin) {
    return new Response(JSON.stringify({ error: '접근 권한이 없습니다.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // 5. Validate storage path
  const storagePath = evalDoc.documentMeta?.sourceStoragePath
  if (!storagePath) {
    return new Response(
      JSON.stringify({ error: '원본 파일 경로가 없습니다.' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // 6. Generate signed URL
  try {
    const bucket = adminStorage.bucket()
    const file = bucket.file(storagePath)

    const [exists] = await file.exists()
    if (!exists) {
      return new Response(
        JSON.stringify({ error: '원본 파일을 찾을 수 없습니다.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 10 * 60 * 1000, // 10분
      responseDisposition: `attachment; filename="${encodeURIComponent(
        evalDoc.documentMeta.originalName
      )}"`,
    })

    return new Response(
      JSON.stringify({
        url,
        originalName: evalDoc.documentMeta.originalName,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('[download] signed url failed:', err)
    return new Response(
      JSON.stringify({ error: '다운로드 URL 생성에 실패했습니다.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
