// ─────────────────────────────────────────────────────
// POST /api/ai-evaluation/packages/seed
//
// One-shot bootstrap: creates the default 7-agent KTVSA package from
// `DEFAULT_PACKAGE_SEED`. Idempotent — returns `seeded:false` if any
// active package already exists.
//
// Admin only. Call once after first deploy (or via UI button).
// ─────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase/admin'
import {
  requireAdmin,
  authErrorResponse,
  AuthError,
} from '@/lib/ai-evaluation/auth'
import { DEFAULT_PACKAGE_SEED } from '@/lib/ai-evaluation/default-agents'
import type { EvaluationPackage } from '@/types/ai-evaluation'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const COLLECTION = 'evaluationPackages'

export async function POST(req: NextRequest) {
  let ctx
  try {
    ctx = await requireAdmin(req)
  } catch (err) {
    return authErrorResponse(err)
  }

  try {
    const existingSnap = await adminDb
      .collection(COLLECTION)
      .where('isActive', '==', true)
      .limit(1)
      .get()

    if (!existingSnap.empty) {
      return NextResponse.json({
        seeded: false,
        message: '이미 활성 패키지가 존재합니다.',
      })
    }

    const now = new Date().toISOString()
    const newRef = adminDb.collection(COLLECTION).doc()

    const packageData: Omit<EvaluationPackage, 'id'> = {
      name: DEFAULT_PACKAGE_SEED.name,
      description: DEFAULT_PACKAGE_SEED.description,
      sharedPreamble: DEFAULT_PACKAGE_SEED.sharedPreamble,
      synthesisPrompt: DEFAULT_PACKAGE_SEED.synthesisPrompt,
      agents: DEFAULT_PACKAGE_SEED.agents,
      outputSchemaVersion: 'v2',
      version: 1,
      parentId: null,
      isActive: true,
      isDefault: true,
      createdBy: ctx.uid,
      createdByEmail: ctx.email ?? '',
      createdAt: now,
      updatedAt: now,
    }

    await newRef.set(packageData)

    return NextResponse.json(
      { seeded: true, packageId: newRef.id },
      { status: 201 }
    )
  } catch (err) {
    if (err instanceof AuthError) return authErrorResponse(err)
    console.error('[POST /packages/seed]', err)
    return NextResponse.json(
      { error: '시드 패키지 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
