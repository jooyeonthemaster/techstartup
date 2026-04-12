// ─────────────────────────────────────────────────────
// GET  /api/ai-evaluation/packages
// POST /api/ai-evaluation/packages
//
// v2 replacement for the legacy /api/ai-evaluation/prompts endpoint.
// Stores multi-agent packages in Firestore collection `evaluationPackages`.
// ─────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase/admin'
import {
  requireAuth,
  requireAdmin,
  authErrorResponse,
  AuthError,
} from '@/lib/ai-evaluation/auth'
import { validatePackageInput } from '@/lib/ai-evaluation/validatePackage'
import type { EvaluationPackage } from '@/types/ai-evaluation'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const COLLECTION = 'evaluationPackages'

// ────────────────────────────────────────────────────
// GET — list packages (active only for normal users)
// ────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAuth(req)
    const { searchParams } = new URL(req.url)
    const includeInactive =
      searchParams.get('includeInactive') === 'true' && ctx.isAdmin

    const baseCol = adminDb.collection(COLLECTION)
    const snap = includeInactive
      ? await baseCol.orderBy('createdAt', 'desc').get()
      : await baseCol
          .where('isActive', '==', true)
          .orderBy('createdAt', 'desc')
          .get()

    const packages: EvaluationPackage[] = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<EvaluationPackage, 'id'>),
    }))

    return NextResponse.json({ packages })
  } catch (err) {
    if (err instanceof AuthError) return authErrorResponse(err)
    console.error('[GET /packages]', err)
    return NextResponse.json(
      { error: '패키지 목록을 불러오지 못했습니다.' },
      { status: 500 }
    )
  }
}

// ────────────────────────────────────────────────────
// POST — create a new package (version=1, parentId=null)
// ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let ctx
  try {
    ctx = await requireAdmin(req)
  } catch (err) {
    return authErrorResponse(err)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: '잘못된 JSON 형식입니다.' },
      { status: 400 }
    )
  }

  const validation = validatePackageInput(body)
  if (!validation.valid || !validation.normalized) {
    return NextResponse.json(
      { error: '입력값을 확인해주세요.', fieldErrors: validation.fieldErrors },
      { status: 400 }
    )
  }

  const now = new Date().toISOString()
  const n = validation.normalized

  const packageData: Omit<EvaluationPackage, 'id'> = {
    name: n.name,
    description: n.description,
    sharedPreamble: n.sharedPreamble,
    synthesisPrompt: n.synthesisPrompt,
    agents: n.agents,
    outputSchemaVersion: 'v2',
    version: 1,
    parentId: null,
    isActive: true,
    isDefault: n.isDefault,
    createdBy: ctx.uid,
    createdByEmail: ctx.email ?? '',
    createdAt: now,
    updatedAt: now,
  }

  try {
    const newDocRef = adminDb.collection(COLLECTION).doc()

    await adminDb.runTransaction(async (tx) => {
      if (packageData.isDefault) {
        const defaultsSnap = await tx.get(
          adminDb.collection(COLLECTION).where('isDefault', '==', true)
        )
        defaultsSnap.docs.forEach((d) => {
          tx.update(d.ref, { isDefault: false, updatedAt: now })
        })
      }
      tx.set(newDocRef, packageData)
    })

    return NextResponse.json(
      { package: { id: newDocRef.id, ...packageData } },
      { status: 201 }
    )
  } catch (err) {
    console.error('[POST /packages]', err)
    return NextResponse.json(
      { error: '패키지 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
