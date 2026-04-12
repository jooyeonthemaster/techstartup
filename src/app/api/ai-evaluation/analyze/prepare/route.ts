// ─────────────────────────────────────────────────────
// POST /api/ai-evaluation/analyze/prepare
//
// Called BEFORE the client uploads a file. Creates an evaluation
// document stub and returns the Firebase Storage upload path.
//
// Request:  { packageId, originalName, contentType, size }
// Response: { evaluationId, sourceStoragePath }
//
// v2 changes vs v1:
//   - Accepts HWP/HWPX/PPTX/PPT/DOCX/DOC in addition to PDF.
//   - Source format is auto-detected from contentType (+ extension fallback).
//   - `documentMeta.pdfStoragePath` is pre-filled only for PDF; conversion
//     tasks in Trigger.dev populate it for other formats.
// ─────────────────────────────────────────────────────

import { NextRequest } from 'next/server'
import {
  requireAuth,
  authErrorResponse,
  AuthError,
} from '@/lib/ai-evaluation/auth'
import { adminDb } from '@/lib/firebase/admin'
import type {
  EvaluationDoc,
  EvaluationPackage,
  SourceFormat,
} from '@/types/ai-evaluation'

export const runtime = 'nodejs'

// 30MB. Anthropic Files API PDF 제한이 32MB이므로 LibreOffice 변환 후
// 오버헤드를 고려해 여유를 두고 30MB로 설정한다.
const MAX_SIZE = 30 * 1024 * 1024

interface PrepareRequestBody {
  packageId?: unknown
  originalName?: unknown
  contentType?: unknown
  size?: unknown
}

// MIME → SourceFormat mapping (extended by extension fallback below).
const MIME_TO_FORMAT: Record<string, SourceFormat> = {
  'application/pdf': 'pdf',
  // HWP / HWPX — many viewers send custom MIME; we also check extension.
  'application/x-hwp': 'hwp',
  'application/haansofthwp': 'hwp',
  'application/vnd.hancom.hwp': 'hwp',
  'application/vnd.hancom.hwpx': 'hwpx',
  'application/vnd.hancom.hwp+zip': 'hwpx',
  // Microsoft Office
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'pptx',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
  'application/msword': 'doc',
}

const EXT_TO_FORMAT: Record<string, SourceFormat> = {
  pdf: 'pdf',
  hwp: 'hwp',
  hwpx: 'hwpx',
  pptx: 'pptx',
  ppt: 'ppt',
  docx: 'docx',
  doc: 'doc',
}

function detectSourceFormat(
  contentType: string,
  originalName: string
): SourceFormat | null {
  const byMime = MIME_TO_FORMAT[contentType.toLowerCase()]
  if (byMime) return byMime
  // Extension fallback (Korean file uploads frequently have 'application/octet-stream').
  const extMatch = originalName.toLowerCase().match(/\.([a-z0-9]+)$/)
  const ext = extMatch?.[1]
  if (ext && EXT_TO_FORMAT[ext]) return EXT_TO_FORMAT[ext]
  return null
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await requireAuth(req)
    const body = (await req.json()) as PrepareRequestBody

    // ── Input validation ───────────────────────────
    if (typeof body.packageId !== 'string' || !body.packageId) {
      return fail(400, 'packageId가 필요합니다.', 'VALIDATION')
    }
    if (typeof body.originalName !== 'string' || !body.originalName) {
      return fail(400, 'originalName이 필요합니다.', 'VALIDATION')
    }
    if (typeof body.contentType !== 'string' || !body.contentType) {
      return fail(400, 'contentType이 필요합니다.', 'VALIDATION')
    }
    if (typeof body.size !== 'number' || body.size <= 0 || body.size > MAX_SIZE) {
      return fail(
        400,
        `파일 크기는 1바이트 이상 ${Math.floor(MAX_SIZE / 1024 / 1024)}MB 이하여야 합니다.`,
        'SIZE_LIMIT'
      )
    }

    const packageId = body.packageId
    const originalName = body.originalName
    const contentType = body.contentType
    const size = body.size

    const sourceFormat = detectSourceFormat(contentType, originalName)
    if (!sourceFormat) {
      return fail(
        400,
        'PDF / HWP / HWPX / PPT / PPTX / DOC / DOCX 형식만 지원됩니다.',
        'UNSUPPORTED_FORMAT'
      )
    }

    // ── Package existence / active check ──────────
    const pkgSnap = await adminDb.doc(`evaluationPackages/${packageId}`).get()
    if (!pkgSnap.exists) {
      return fail(404, '평가 패키지를 찾을 수 없습니다.', 'PACKAGE_NOT_FOUND')
    }
    const pkg = pkgSnap.data() as EvaluationPackage
    if (!pkg.isActive) {
      return fail(400, '비활성 패키지는 사용할 수 없습니다.', 'PACKAGE_INACTIVE')
    }

    // ── Create evaluation stub ─────────────────────
    const docRef = adminDb.collection('evaluations').doc()
    const evaluationId = docRef.id
    const sourceStoragePath = `evaluations/${evaluationId}/source.${sourceFormat}`

    const nowIso = new Date().toISOString()
    const doc: EvaluationDoc = {
      id: evaluationId,
      packageId,
      packageName: pkg.name,
      packageVersion: pkg.version,
      documentMeta: {
        originalName,
        size,
        contentType,
        sourceFormat,
        pageCount: null,
        sourceStoragePath,
        pdfStoragePath: sourceFormat === 'pdf' ? sourceStoragePath : null,
        downloadURL: null,
        claudeFileId: null,
        claudeFileExpiresAt: null,
      },
      status: 'queued',
      progress: {
        percent: 0,
        stageLabel: '업로드 대기',
        updatedAt: nowIso,
      },
      perspectives: null,
      synthesis: null,
      errorMessage: null,
      errorStack: null,
      attemptCount: 0,
      createdBy: ctx.uid,
      createdByEmail: ctx.email ?? '',
      createdAt: nowIso,
      updatedAt: nowIso,
      completedAt: null,
      tokenUsage: null,
      triggerRunId: null,
      isArchived: false,
    }

    await docRef.set(doc)

    return Response.json({ evaluationId, sourceStoragePath })
  } catch (err) {
    if (err instanceof AuthError) return authErrorResponse(err)
    console.error('[analyze/prepare] error:', err)
    return Response.json(
      { error: (err as Error).message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

function fail(status: number, message: string, code?: string) {
  return Response.json({ error: message, code }, { status })
}
