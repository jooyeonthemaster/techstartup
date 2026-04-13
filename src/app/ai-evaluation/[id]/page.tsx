'use client'

import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'

import EvaluationDetailModal from '../new/_components/EvaluationDetailModal'

export default function EvaluationDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#737373]" />
      </div>
    )
  }

  if (!user) {
    router.replace('/ai-evaluation')
    return null
  }

  if (!params?.id) return null

  return (
    <EvaluationDetailModal
      evaluationId={params.id}
      onClose={() => router.push('/ai-evaluation/history')}
    />
  )
}
