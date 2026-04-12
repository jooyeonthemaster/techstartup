// ─────────────────────────────────────────────────────
// GET    /api/ai-evaluation/packages/[id]
// PATCH  /api/ai-evaluation/packages/[id]  (creates a new version)
// DELETE /api/ai-evaluation/packages/[id]  (soft delete)
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
// GET — single package + full version chain
// ────────────────────────────────────────────────────
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(req)
    const { id } = await context.params

    const snap = await adminDb.collection(COLLECTION).doc(id).get()
    if (!snap.exists) {
      return NextResponse.json(
        { error: '패키지를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }
    const pkg: EvaluationPackage = {
      id: snap.id,
      ...(snap.data() as Omit<EvaluationPackage, 'id'>),
    }

    // Walk up to the root (parentId == null), then fetch all descendants.
    const rootId = pkg.parentId ?? pkg.id
    const chainSnap = await adminDb
      .collection(COLLECTION)
      .where('parentId', '==', rootId)
      .orderBy('version', 'desc')
      .get()

    const rootSnap =
      pkg.parentId == null
        ? snap
        : await adminDb.collection(COLLECTION).doc(rootId).get()

    const versionHistory: EvaluationPackage[] = []
    if (rootSnap.exists) {
      versionHistory.push({
        id: rootSnap.id,
        ...(rootSnap.data() as Omit<EvaluationPackage, 'id'>),
      })
    }
    chainSnap.docs.forEach((d) => {
      versionHistory.push({
        id: d.id,
        ...(d.data() as Omit<EvaluationPackage, 'id'>),
      })
    })
    // Sort by version descending.
    versionHistory.sort((a, b) => b.version - a.version)

    return NextResponse.json({ package: pkg, versionHistory })
  } catch (err) {
    if (err instanceof AuthError) return authErrorResponse(err)
    console.error('[GET /packages/:id]', err)
    return NextResponse.json(
      { error: '패키지 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// ────────────────────────────────────────────────────
// PATCH — create a new version (prev deactivated)
// ────────────────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  let ctx
  try {
    ctx = await requireAdmin(req)
  } catch (err) {
    return authErrorResponse(err)
  }

  const { id } = await context.params

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

  try {
    const prevRef = adminDb.collection(COLLECTION).doc(id)
    const newRef = adminDb.collection(COLLECTION).doc()
    const now = new Date().toISOString()
    const n = validation.normalized

    const createdDoc = await adminDb.runTransaction(async (tx) => {
      const prevSnap = await tx.get(prevRef)
      if (!prevSnap.exists) {
        throw new Error('NOT_FOUND')
      }
      const prev = prevSnap.data() as Omit<EvaluationPackage, 'id'>

      const rootId = prev.parentId ?? prevRef.id
      const nextVersion = (prev.version ?? 0) + 1

      const newPackage: Omit<EvaluationPackage, 'id'> = {
        name: n.name,
        description: n.description,
        sharedPreamble: n.sharedPreamble,
        synthesisPrompt: n.synthesisPrompt,
        agents: n.agents,
        outputSchemaVersion: 'v2',
        version: nextVersion,
        parentId: rootId,
        isActive: true,
        isDefault: n.isDefault,
        createdBy: ctx!.uid,
        createdByEmail: ctx!.email ?? '',
        createdAt: now,
        updatedAt: now,
      }

      // Clear existing defaults if requested.
      if (newPackage.isDefault) {
        const defaultsSnap = await tx.get(
          adminDb.collection(COLLECTION).where('isDefault', '==', true)
        )
        defaultsSnap.docs.forEach((d) => {
          tx.update(d.ref, { isDefault: false, updatedAt: now })
        })
      }

      // Deactivate previous version.
      tx.update(prevRef, {
        isActive: false,
        isDefault: false,
        updatedAt: now,
      })

      tx.set(newRef, newPackage)
      return newPackage
    })

    return NextResponse.json({ package: { id: newRef.id, ...createdDoc } })
  } catch (err) {
    if (err instanceof Error && err.message === 'NOT_FOUND') {
      return NextResponse.json(
        { error: '패키지를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }
    console.error('[PATCH /packages/:id]', err)
    return NextResponse.json(
      { error: '패키지 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// ────────────────────────────────────────────────────
// DELETE — soft delete
// ────────────────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(req)
    const { id } = await context.params

    const ref = adminDb.collection(COLLECTION).doc(id)
    const snap = await ref.get()
    if (!snap.exists) {
      return NextResponse.json(
        { error: '패키지를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    await ref.update({
      isActive: false,
      isDefault: false,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof AuthError) return authErrorResponse(err)
    console.error('[DELETE /packages/:id]', err)
    return NextResponse.json(
      { error: '패키지 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
