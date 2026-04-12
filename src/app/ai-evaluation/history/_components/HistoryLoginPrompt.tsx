'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Chrome, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function HistoryLoginPrompt() {
  const router = useRouter()
  const { signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithGoogle()
    } catch (err) {
      setError((err as Error).message || '로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[72px] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-[#E5E5E5] p-10 md:p-12">
        {/* Back */}
        <button
          onClick={() => router.push('/ai-evaluation')}
          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#737373] hover:text-[#0A0A0A] transition-colors mb-10"
        >
          <ArrowLeft className="w-3 h-3" />
          AI Evaluation
        </button>

        {/* Icon */}
        <div className="w-14 h-14 border border-[#E5E5E5] flex items-center justify-center mb-8">
          <Lock className="w-5 h-5 text-[#0A0A0A]" />
        </div>

        <span className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#737373] mb-4">
          Authentication Required
        </span>

        <h1 className="text-[32px] md:text-[40px] font-extralight text-[#0A0A0A] tracking-[-0.03em] leading-[1.05] mb-5">
          히스토리를 보려면
          <br />
          <span className="font-bold">로그인</span>이 필요합니다
        </h1>

        <div className="w-12 h-px bg-[#1A56DB] mb-6" />

        <p className="text-[13px] text-[#737373] font-normal leading-[1.8] mb-10">
          본인이 실행한 평가만 열람할 수 있도록, 각 평가는 Google 계정에 귀속됩니다.
          로그인 후 과거 평가 결과와 AI 어시스턴트 대화를 다시 볼 수 있습니다.
        </p>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 p-3">
            <p className="text-[11px] text-red-600 font-medium">{error}</p>
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="group w-full inline-flex items-center justify-center gap-3 bg-[#0A0A0A] text-white py-4 hover:bg-[#1A56DB] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Chrome className="w-4 h-4" />
          <span className="text-[12px] font-bold uppercase tracking-[0.15em]">
            {loading ? '로그인 중...' : 'Google로 로그인'}
          </span>
        </button>

        <p className="mt-6 text-[10px] text-[#A3A3A3] font-normal tracking-wide uppercase text-center">
          SIRIUS v2.4 &middot; Secured by Firebase Auth
        </p>
      </div>
    </div>
  )
}
