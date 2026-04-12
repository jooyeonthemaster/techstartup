'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Sparkles } from 'lucide-react'
import type { AnalystAgent } from '@/types/ai-evaluation'
import { DEFAULT_AGENTS } from '@/lib/ai-evaluation/default-agents'
import AdminHeader from '../../../components/AdminHeader'
import PackageForm from '../_components/PackageForm'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────
// 새 패키지 생성
// 두 시작 모드 (empty / template) 탭 + PackageForm
// ─────────────────────────────────────────────────────

type StartMode = 'empty' | 'template'

export default function NewPackagePage() {
  const [mode, setMode] = useState<StartMode>('empty')
  const [formKey, setFormKey] = useState(0)

  // template 선택 시 DEFAULT_AGENTS 딥 카피
  const initialAgents: AnalystAgent[] =
    mode === 'template'
      ? DEFAULT_AGENTS.map((a, i) => ({
          ...a,
          focusAreas: [...a.focusAreas],
          criteria: a.criteria?.map((c) => ({ ...c })) ?? [],
          order: i,
        }))
      : []

  return (
    <div>
      <Link
        href="/admin/ai-evaluation/packages"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors mb-3"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        패키지 목록
      </Link>

      <AdminHeader
        title="새 패키지"
        description="분석가 에이전트 묶음을 새로 만들어 저장합니다."
      />

      {/* Start mode selector */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <ModeCard
          active={mode === 'empty'}
          onClick={() => {
            if (mode === 'empty') return
            setMode('empty')
            setFormKey((k) => k + 1)
          }}
          icon={<Plus className="w-5 h-5" />}
          title="빈 패키지로 시작"
          description="에이전트 없이 시작해 직접 한 명씩 작성합니다."
        />
        <ModeCard
          active={mode === 'template'}
          onClick={() => {
            if (mode === 'template') return
            const ok =
              window.confirm(
                '기본 7명 에이전트 구성으로 폼을 초기화합니다. 계속하시겠습니까?'
              )
            if (!ok) return
            setMode('template')
            setFormKey((k) => k + 1)
          }}
          icon={<Sparkles className="w-5 h-5" />}
          title="KTVSA 기본 7명으로 시작"
          description="지원사업 심사관·VC·마케팅 등 7인 구성이 미리 채워집니다."
        />
      </div>

      <PackageForm
        mode="create"
        initialAgents={initialAgents}
        formKey={formKey}
      />
    </div>
  )
}

function ModeCard({
  active,
  onClick,
  icon,
  title,
  description,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group text-left rounded-2xl p-5 border-2 transition-all',
        active
          ? 'border-[#004094] bg-[#004094]/5 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
            active
              ? 'bg-[#004094] text-white'
              : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
          )}
        >
          {icon}
        </div>
        <div>
          <h3
            className={cn(
              'text-sm font-semibold mb-0.5',
              active ? 'text-[#004094]' : 'text-gray-900'
            )}
          >
            {title}
          </h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  )
}
