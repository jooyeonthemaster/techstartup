'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LogIn, ShieldAlert, Loader2, Mail, Chrome } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, signInWithGoogle, signInWithEmail } = useAuth()
  const [loginMode, setLoginMode] = useState<'select' | 'email'>('select')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)

  async function handleGoogleLogin() {
    setLoginError(null)
    setLoginLoading(true)
    try {
      await signInWithGoogle()
    } catch (err: any) {
      setLoginError(err?.message || '로그인에 실패했습니다.')
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setLoginError('이메일과 비밀번호를 입력해주세요.')
      return
    }
    setLoginError(null)
    setLoginLoading(true)
    try {
      await signInWithEmail(email, password)
    } catch (err: any) {
      const code = err?.code || ''
      if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) {
        setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.')
      } else {
        setLoginError(err?.message || '로그인에 실패했습니다.')
      }
    } finally {
      setLoginLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#004094] mx-auto mb-4" />
          <p className="text-gray-500 text-sm">인증 확인 중...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#004094]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-8 h-8 text-[#004094]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">관리자 로그인</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              기술벤처스타트업협회 관리자 페이지
            </p>
          </div>

          {loginMode === 'select' ? (
            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                disabled={loginLoading}
                className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all disabled:opacity-50"
              >
                {loginLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Chrome className="w-5 h-5" />
                )}
                Google 계정으로 로그인
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-400">또는</span>
                </div>
              </div>

              <button
                onClick={() => setLoginMode('email')}
                className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-[#004094] hover:bg-[#003378] text-white font-semibold rounded-xl transition-colors"
              >
                <Mail className="w-5 h-5" />
                이메일로 로그인
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoFocus
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#004094]/20 focus:border-[#004094] transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#004094] hover:bg-[#003378] text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {loginLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <LogIn className="w-5 h-5" />
                )}
                로그인
              </button>
              <button
                type="button"
                onClick={() => { setLoginMode('select'); setLoginError(null) }}
                className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors py-2"
              >
                ← 다른 방법으로 로그인
              </button>
            </form>
          )}

          {loginError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-red-600 text-center">{loginError}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">접근 권한 없음</h1>
          <p className="text-gray-500 mb-4 text-sm leading-relaxed">
            <span className="font-medium text-gray-700">{user.email}</span><br />
            이 계정은 관리자 권한이 없습니다.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
