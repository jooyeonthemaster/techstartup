import { NextRequest } from 'next/server'
import { adminAuth } from '@/lib/firebase/admin'
import type { DecodedIdToken } from 'firebase-admin/auth'

/**
 * 서버 API 라우트에서 사용하는 인증 결과.
 * `requireAuth` / `requireAdmin`의 반환값.
 */
export interface AuthContext {
  uid: string
  email: string | null
  isAdmin: boolean
  token: DecodedIdToken
}

/**
 * 인증 실패 시 던지는 에러. route.ts에서 잡아서 JSON 응답으로 변환.
 */
export class AuthError extends Error {
  constructor(
    public status: 401 | 403,
    public code: 'UNAUTHENTICATED' | 'FORBIDDEN' | 'INVALID_TOKEN',
    message: string
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

/**
 * 환경 변수 NEXT_PUBLIC_ADMIN_EMAILS 기반 이메일 화이트리스트.
 * 기존 `src/contexts/AuthContext.tsx`의 ADMIN_EMAILS 패턴을 그대로 재사용.
 */
function getAdminEmails(): string[] {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false
  return getAdminEmails().includes(email.toLowerCase())
}

/**
 * Authorization 헤더에서 Firebase ID token을 추출한다.
 * 형식: `Authorization: Bearer {idToken}`
 */
function extractIdToken(req: NextRequest): string | null {
  const header = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!header) return null
  const match = header.match(/^Bearer\s+(.+)$/i)
  return match ? match[1].trim() : null
}

/**
 * API 라우트에서 "로그인 필수" 엔드포인트 보호용.
 * 토큰이 없거나 검증 실패 시 AuthError를 throw한다.
 */
export async function requireAuth(req: NextRequest): Promise<AuthContext> {
  const idToken = extractIdToken(req)
  if (!idToken) {
    throw new AuthError(401, 'UNAUTHENTICATED', '로그인이 필요합니다.')
  }

  let decoded: DecodedIdToken
  try {
    decoded = await adminAuth.verifyIdToken(idToken)
  } catch {
    throw new AuthError(401, 'INVALID_TOKEN', '인증 토큰이 유효하지 않습니다.')
  }

  return {
    uid: decoded.uid,
    email: decoded.email ?? null,
    isAdmin: isAdminEmail(decoded.email),
    token: decoded,
  }
}

/**
 * API 라우트에서 "관리자 전용" 엔드포인트 보호용.
 * 로그인 + admin 이메일 화이트리스트 통과 시에만 AuthContext 반환.
 */
export async function requireAdmin(req: NextRequest): Promise<AuthContext> {
  const ctx = await requireAuth(req)
  if (!ctx.isAdmin) {
    throw new AuthError(403, 'FORBIDDEN', '관리자 권한이 필요합니다.')
  }
  return ctx
}

/**
 * AuthError를 JSON 응답으로 변환하는 헬퍼.
 * route.ts의 try/catch에서 사용.
 */
export function authErrorResponse(err: unknown): Response {
  if (err instanceof AuthError) {
    return new Response(JSON.stringify({ error: err.message, code: err.code }), {
      status: err.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return new Response(JSON.stringify({ error: '서버 오류가 발생했습니다.' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  })
}
