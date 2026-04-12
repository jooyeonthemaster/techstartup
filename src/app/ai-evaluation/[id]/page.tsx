'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { onSnapshot } from 'firebase/firestore'
import { Loader2 } from 'lucide-react'

import { evaluationDoc } from '@/lib/firebase/collections'
import { useAuth } from '@/contexts/AuthContext'
import { fetchPackage, ApiError } from '@/lib/ai-evaluation/client'
import type { EvaluationDoc, EvaluationPackage } from '@/types/ai-evaluation'

import ReportLayout from '../_components/ReportLayout'
import AnalyzingOverlay from '../_components/AnalyzingOverlay'
import ErrorState from '../_components/ErrorState'

export default function EvaluationDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [evaluation, setEvaluation] = useState<EvaluationDoc | null>(null)
  const [pkg, setPkg] = useState<EvaluationPackage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ── Firestore 실시간 구독 ────────────────────────
  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.replace('/ai-evaluation')
      return
    }
    if (!params?.id) return

    const unsub = onSnapshot(
      evaluationDoc(params.id),
      (snap) => {
        if (!snap.exists()) {
          setError('평가를 찾을 수 없습니다.')
          setLoading(false)
          return
        }
        setEvaluation(snap.data() as EvaluationDoc)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
    return unsub
  }, [params?.id, user, authLoading, router])

  // ── 패키지 로드 (평가 로드 후 한 번) ──────────────
  useEffect(() => {
    if (!evaluation?.packageId) return
    if (pkg?.id === evaluation.packageId) return

    let cancelled = false
    fetchPackage(evaluation.packageId)
      .then((data) => {
        if (cancelled) return
        setPkg(data.package)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const msg =
          err instanceof ApiError
            ? err.message
            : '평가 패키지를 불러오지 못했습니다.'
        console.error('[evaluation detail] fetchPackage failed:', err)
        setError((prev) => prev ?? msg)
      })
    return () => {
      cancelled = true
    }
  }, [evaluation?.packageId, pkg?.id])

  // ── Auth / 로딩 ──────────────────────────────────
  if (authLoading || loading) {
    return (
      <div className="min-h-[calc(100vh-72px)] mt-[72px] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#737373]" />
      </div>
    )
  }

  if (error || !evaluation) {
    return (
      <ErrorState
        errorMessage={error ?? '알 수 없는 오류가 발생했습니다.'}
        onNewEvaluation={() => router.push('/ai-evaluation/new')}
      />
    )
  }

  if (evaluation.status === 'error') {
    return (
      <ErrorState
        errorMessage={evaluation.errorMessage ?? '분석 중 오류가 발생했습니다.'}
        onNewEvaluation={() => router.push('/ai-evaluation/new')}
      />
    )
  }

  // 분석 중 (ready 이전 단계)
  if (evaluation.status !== 'ready' || !evaluation.synthesis) {
    return <AnalyzingOverlay evaluation={evaluation} package={pkg} />
  }

  // ready인데 패키지 정보가 아직 안 왔을 때 (짧은 시간)
  if (!pkg) {
    return (
      <div className="min-h-[calc(100vh-72px)] mt-[72px] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#737373]" />
      </div>
    )
  }

  if (!evaluation.perspectives) {
    return (
      <ErrorState
        errorMessage="평가는 완료되었으나 결과 데이터가 누락되었습니다. 다시 시도해주세요."
        onNewEvaluation={() => router.push('/ai-evaluation/new')}
      />
    )
  }

  return <ReportLayout evaluation={evaluation} package={pkg} />
}
