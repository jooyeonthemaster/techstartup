'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertTriangle, Loader2, Save } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import type { AnalystAgent, EvaluationPackage } from '@/types/ai-evaluation'
import PackageMetaFields, { type PackageMeta } from './PackageMetaFields'
import AgentListEditor from './AgentListEditor'
import WeightSumIndicator from './WeightSumIndicator'

// ─────────────────────────────────────────────────────
// 공용 패키지 폼 (create / edit)
// ─────────────────────────────────────────────────────

interface PackageFormProps {
  mode: 'create' | 'edit'
  /** 편집 모드 시 서버에서 받은 패키지 */
  initial?: EvaluationPackage
  /** 신규 모드에서 초기 에이전트 (예: DEFAULT_AGENTS) */
  initialAgents?: AnalystAgent[]
  /** 편집 모드에서 remount 트리거용 */
  formKey?: string | number
}

interface FieldErrors {
  meta: Partial<Record<keyof PackageMeta, string>>
  agents: Record<string, Partial<Record<keyof AnalystAgent, string>>>
  global?: string
}

const EMPTY_META: PackageMeta = {
  name: '',
  description: '',
  isDefault: false,
  sharedPreamble: '',
  synthesisPrompt: '',
}

export default function PackageForm({
  mode,
  initial,
  initialAgents,
  formKey,
}: PackageFormProps) {
  const router = useRouter()
  const { user } = useAuth()

  // ─── State ────────────────────────────────────────
  const [meta, setMeta] = useState<PackageMeta>(() => {
    if (initial) {
      return {
        name: initial.name,
        description: initial.description,
        isDefault: initial.isDefault,
        sharedPreamble: initial.sharedPreamble,
        synthesisPrompt: initial.synthesisPrompt,
      }
    }
    return EMPTY_META
  })

  const [agents, setAgents] = useState<AnalystAgent[]>(() => {
    if (initial) return cloneAgents(initial.agents)
    if (initialAgents) return cloneAgents(initialAgents)
    return []
  })

  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({ meta: {}, agents: {} })
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Known-id set for "isNew" detection on agent cards
  const initialAgentIds = useMemo(
    () => new Set((initial?.agents ?? []).map((a) => a.id)),
    [initial]
  )

  // ─── Validation ────────────────────────────────────
  const weightSum = useMemo(
    () => agents.reduce((s, a) => s + (Number(a.weight) || 0), 0),
    [agents]
  )
  const weightOk = Math.abs(100 - weightSum) <= 0.5
  const hasAgents = agents.length > 0 && agents.length <= 15

  function validateClient(): FieldErrors | null {
    const errs: FieldErrors = { meta: {}, agents: {} }

    if (!meta.name.trim()) errs.meta.name = '패키지 이름은 필수입니다.'
    if (!meta.description.trim()) errs.meta.description = '설명은 필수입니다.'
    if (!meta.sharedPreamble.trim())
      errs.meta.sharedPreamble = '공통 전문은 필수입니다.'
    if (!meta.synthesisPrompt.trim())
      errs.meta.synthesisPrompt = '종합 프롬프트는 필수입니다.'

    if (!hasAgents) {
      errs.global = '에이전트는 1~15명이 필요합니다.'
    }

    const idSet = new Set<string>()
    for (const agent of agents) {
      const ae: Partial<Record<keyof AnalystAgent, string>> = {}
      const slugOk = /^[a-z0-9][a-z0-9-]{0,60}$/.test(agent.id)
      if (!slugOk) ae.id = '소문자/숫자/하이픈으로 이루어진 slug여야 합니다.'
      if (idSet.has(agent.id)) ae.id = '중복된 에이전트 ID가 있습니다.'
      idSet.add(agent.id)
      if (!agent.role.trim()) ae.role = '역할명은 필수입니다.'
      if (!agent.tagline.trim()) ae.tagline = '한 줄 설명은 필수입니다.'
      if (!agent.persona.trim()) ae.persona = '페르소나는 필수입니다.'
      if (!agent.systemPrompt.trim())
        ae.systemPrompt = '시스템 프롬프트는 필수입니다.'
      if (!agent.scoringRubric.trim())
        ae.scoringRubric = '채점 루브릭은 필수입니다.'
      const cleanFocus = (agent.focusAreas ?? []).map((f) => f.trim()).filter(Boolean)
      if (cleanFocus.length === 0)
        (ae as Record<string, string>).focusAreas =
          '최소 1개 이상의 관점이 필요합니다.'

      if (Object.keys(ae).length > 0) errs.agents[agent.id] = ae
    }

    if (!weightOk) {
      errs.global =
        (errs.global ? errs.global + ' / ' : '') +
        `에이전트 가중치 합이 100이어야 합니다 (현재 ${Math.round(weightSum * 10) / 10}).`
    }

    const hasErr =
      Object.keys(errs.meta).length > 0 ||
      Object.keys(errs.agents).length > 0 ||
      !!errs.global
    return hasErr ? errs : null
  }

  const canSubmit =
    !submitting &&
    weightOk &&
    hasAgents &&
    !!meta.name.trim() &&
    !!meta.description.trim() &&
    !!meta.sharedPreamble.trim() &&
    !!meta.synthesisPrompt.trim()

  // ─── Submit ────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMsg(null)

    const err = validateClient()
    if (err) {
      setErrors(err)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setErrors({ meta: {}, agents: {} })

    if (!user) {
      setErrors({
        meta: {},
        agents: {},
        global: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
      })
      return
    }

    setSubmitting(true)
    try {
      const idToken = await user.getIdToken()
      const body = {
        name: meta.name.trim(),
        description: meta.description.trim(),
        isDefault: meta.isDefault,
        sharedPreamble: meta.sharedPreamble,
        synthesisPrompt: meta.synthesisPrompt,
        agents: agents.map((a, idx) => ({
          ...a,
          order: idx,
          focusAreas: (a.focusAreas ?? []).map((f) => f.trim()).filter(Boolean),
          criteria: (a.criteria ?? []).map((c) => ({
            ...c,
            label: c.label.trim(),
            description: c.description.trim(),
          })),
        })),
      }

      const url =
        mode === 'create'
          ? '/api/ai-evaluation/packages'
          : `/api/ai-evaluation/packages/${initial!.id}`

      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PATCH',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const text = await res.text()
      let json: unknown = null
      if (text) {
        try {
          json = JSON.parse(text)
        } catch {
          json = null
        }
      }

      if (!res.ok) {
        const payload = (json as {
          error?: string
          fieldErrors?: Record<string, string>
        } | null) ?? null
        setErrors({
          meta: {},
          agents: {},
          global: payload?.error ?? `저장에 실패했습니다. (${res.status})`,
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      const data = json as { package?: EvaluationPackage } | null
      const newPkg = data?.package

      if (mode === 'create') {
        router.push('/admin/ai-evaluation/packages?created=1')
      } else if (newPkg && newPkg.id !== initial?.id) {
        router.replace(
          `/admin/ai-evaluation/packages/${newPkg.id}?updated=1`
        )
      } else {
        setSuccessMsg('변경 사항이 저장되었습니다.')
        router.refresh()
      }
    } catch (e) {
      setErrors({
        meta: {},
        agents: {},
        global: e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  // ─── Render ────────────────────────────────────────
  return (
    <form
      key={formKey ?? 'default'}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {errors.global && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{errors.global}</p>
        </div>
      )}

      {successMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMsg}
        </div>
      )}

      {mode === 'edit' && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-amber-800">
            <strong className="font-semibold">편집 시 새 버전이 자동 생성됩니다.</strong>
            <br />
            과거 평가 결과는 당시 사용된 버전을 그대로 참조하므로 영향받지 않습니다.
          </div>
        </div>
      )}

      <PackageMetaFields
        value={meta}
        onChange={setMeta}
        disabled={submitting}
        errors={errors.meta}
      />

      <AgentListEditor
        agents={agents}
        initialAgentIds={initialAgentIds}
        onChange={setAgents}
        disabled={submitting}
        agentErrors={errors.agents}
      />

      <WeightSumIndicator agents={agents} />

      {/* Submit */}
      <div className="flex items-center justify-end gap-3 sticky bottom-4 z-10">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={submitting}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#004094] hover:bg-[#004094]/90 rounded-xl transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {mode === 'create' ? '패키지 생성' : '새 버전으로 저장'}
        </button>
      </div>
    </form>
  )
}

// ─────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────

function cloneAgents(src: AnalystAgent[]): AnalystAgent[] {
  return src.map((a, i) => ({
    ...a,
    focusAreas: [...(a.focusAreas ?? [])],
    criteria: (a.criteria ?? []).map((c) => ({ ...c })),
    order: typeof a.order === 'number' ? a.order : i,
  }))
}
