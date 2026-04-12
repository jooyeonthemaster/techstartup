'use client'

import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────
// Package meta fields
// name / description / isDefault / sharedPreamble / synthesisPrompt
// ─────────────────────────────────────────────────────

export interface PackageMeta {
  name: string
  description: string
  isDefault: boolean
  sharedPreamble: string
  synthesisPrompt: string
}

interface PackageMetaFieldsProps {
  value: PackageMeta
  onChange: (value: PackageMeta) => void
  disabled?: boolean
  errors?: Partial<Record<keyof PackageMeta, string>>
}

export default function PackageMetaFields({
  value,
  onChange,
  disabled,
  errors,
}: PackageMetaFieldsProps) {
  const set = <K extends keyof PackageMeta>(k: K, v: PackageMeta[K]) => {
    onChange({ ...value, [k]: v })
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-gray-800">
          패키지 기본 정보
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          패키지 이름·설명과 모든 에이전트가 공유하는 원칙을 정의합니다.
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* name */}
        <Field label="패키지 이름" required error={errors?.name}>
          <input
            type="text"
            value={value.name}
            disabled={disabled}
            onChange={(e) => set('name', e.target.value)}
            placeholder="예: KTVSA 표준 평가 패키지 v1"
            className={inputClass(!!errors?.name)}
          />
        </Field>

        {/* description */}
        <Field label="설명" required error={errors?.description}>
          <textarea
            value={value.description}
            disabled={disabled}
            onChange={(e) => set('description', e.target.value)}
            rows={2}
            placeholder="이 패키지가 어떤 관점에서, 누구를 위해 설계되었는지 간단히 설명하세요."
            className={textareaClass(!!errors?.description)}
          />
        </Field>

        {/* isDefault */}
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={value.isDefault}
            disabled={disabled}
            onChange={(e) => set('isDefault', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#004094] focus:ring-[#004094]/30"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              이 패키지를 기본값으로 설정
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              사용자가 새 평가를 시작할 때 기본 선택되는 패키지가 됩니다. (전체 1개만 가능)
            </p>
          </div>
        </label>

        {/* sharedPreamble */}
        <Field
          label="공통 전문(Shared Preamble)"
          required
          error={errors?.sharedPreamble}
          hint="모든 에이전트의 system prompt 상단에 자동 삽입되는 원칙입니다."
        >
          <textarea
            value={value.sharedPreamble}
            disabled={disabled}
            onChange={(e) => set('sharedPreamble', e.target.value)}
            rows={10}
            placeholder="# 공통 원칙&#10;1. 객관성 ...&#10;2. 정량성 ..."
            className={cn(textareaClass(!!errors?.sharedPreamble), 'font-mono text-xs leading-relaxed')}
          />
        </Field>

        {/* synthesisPrompt */}
        <Field
          label="종합 에이전트 프롬프트(Synthesis Prompt)"
          required
          error={errors?.synthesisPrompt}
          hint="각 에이전트의 결과를 종합 리포트로 합칠 때 사용됩니다."
        >
          <textarea
            value={value.synthesisPrompt}
            disabled={disabled}
            onChange={(e) => set('synthesisPrompt', e.target.value)}
            rows={8}
            placeholder="# 역할&#10;당신은 N명의 전문가 의견을 통합하는 수석 심사위원입니다..."
            className={cn(textareaClass(!!errors?.synthesisPrompt), 'font-mono text-xs leading-relaxed')}
          />
        </Field>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        {hint && (
          <span className="group relative inline-flex">
            <Info className="w-3.5 h-3.5 text-gray-400" />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 hidden group-hover:block z-10 whitespace-nowrap rounded bg-gray-900 text-white text-[11px] px-2 py-1 shadow-lg">
              {hint}
            </span>
          </span>
        )}
      </div>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-[#004094]/20 disabled:opacity-60 disabled:cursor-not-allowed',
    hasError
      ? 'border-red-300 focus:border-red-500'
      : 'border-gray-200 focus:border-[#004094]'
  )
}

function textareaClass(hasError: boolean) {
  return cn(
    'w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white transition-colors resize-y',
    'focus:outline-none focus:ring-2 focus:ring-[#004094]/20 disabled:opacity-60 disabled:cursor-not-allowed',
    hasError
      ? 'border-red-300 focus:border-red-500'
      : 'border-gray-200 focus:border-[#004094]'
  )
}
