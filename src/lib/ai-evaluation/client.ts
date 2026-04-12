'use client'

import { auth } from '@/lib/firebase/config'
import type { EvaluationPackage } from '@/types/ai-evaluation'

// ─────────────────────────────────────────────────────
// Admin + user API client for AI evaluation (v2: packages).
//
// All calls attach `Authorization: Bearer {idToken}` from `auth.currentUser`.
// Errors are thrown as `ApiError` with status + optional fieldErrors.
// ─────────────────────────────────────────────────────

export interface PackagePayload {
  name: string
  description: string
  sharedPreamble: string
  synthesisPrompt: string
  agents: EvaluationPackage['agents']
  isDefault?: boolean
}

export interface ApiErrorPayload {
  error: string
  fieldErrors?: Record<string, string>
  code?: string
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public fieldErrors?: Record<string, string>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function getAuthHeader(): Promise<Record<string, string>> {
  const u = auth.currentUser
  if (!u) throw new ApiError(401, '로그인이 필요합니다.')
  const token = await u.getIdToken()
  return { Authorization: `Bearer ${token}` }
}

async function parseResponse<T>(res: Response): Promise<T> {
  const text = await res.text()
  let body: unknown = null
  if (text) {
    try {
      body = JSON.parse(text)
    } catch {
      body = null
    }
  }

  if (!res.ok) {
    const payload = (body as ApiErrorPayload | null) ?? {
      error: `요청이 실패했습니다. (${res.status})`,
    }
    throw new ApiError(res.status, payload.error, payload.fieldErrors)
  }

  return body as T
}

// ────────────────────────────────────────────────────
// Packages
// ────────────────────────────────────────────────────

export async function fetchPackages(
  options: { includeInactive?: boolean } = {}
): Promise<EvaluationPackage[]> {
  const headers = await getAuthHeader()
  const qs = options.includeInactive ? '?includeInactive=true' : ''
  const res = await fetch(`/api/ai-evaluation/packages${qs}`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  })
  const data = await parseResponse<{ packages: EvaluationPackage[] }>(res)
  return data.packages
}

export async function fetchPackage(
  id: string
): Promise<{
  package: EvaluationPackage
  versionHistory: EvaluationPackage[]
}> {
  const headers = await getAuthHeader()
  const res = await fetch(`/api/ai-evaluation/packages/${id}`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  })
  return parseResponse(res)
}

export async function createPackage(
  payload: PackagePayload
): Promise<EvaluationPackage> {
  const headers = await getAuthHeader()
  const res = await fetch('/api/ai-evaluation/packages', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await parseResponse<{ package: EvaluationPackage }>(res)
  return data.package
}

export async function updatePackage(
  id: string,
  payload: PackagePayload
): Promise<EvaluationPackage> {
  const headers = await getAuthHeader()
  const res = await fetch(`/api/ai-evaluation/packages/${id}`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await parseResponse<{ package: EvaluationPackage }>(res)
  return data.package
}

export async function deletePackage(id: string): Promise<void> {
  const headers = await getAuthHeader()
  const res = await fetch(`/api/ai-evaluation/packages/${id}`, {
    method: 'DELETE',
    headers,
  })
  await parseResponse(res)
}

export async function seedDefaultPackage(): Promise<{
  seeded: boolean
  packageId?: string
  message?: string
}> {
  const headers = await getAuthHeader()
  const res = await fetch('/api/ai-evaluation/packages/seed', {
    method: 'POST',
    headers,
  })
  return parseResponse(res)
}
