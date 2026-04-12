'use client'

import { X, Users, Check } from 'lucide-react'
import { DEFAULT_AGENTS } from '@/lib/ai-evaluation/default-agents'

// ─────────────────────────────────────────────────────
// "기본 7명 로드" 모달
// DEFAULT_AGENTS 카드 그리드 + 전체 로드 버튼
// ─────────────────────────────────────────────────────

interface AgentTemplatePickerProps {
  open: boolean
  onClose: () => void
  onLoad: () => void
  /** 기존 에이전트가 있으면 경고 표시 */
  willReplace: boolean
}

export default function AgentTemplatePicker({
  open,
  onClose,
  onLoad,
  willReplace,
}: AgentTemplatePickerProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[10005] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-[#004094]" />
              <h2 className="text-lg font-bold text-gray-900">
                기본 7명 에이전트 불러오기
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              KTVSA가 설계한 표준 7인 분석가 구성을 그대로 로드합니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {willReplace && (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <strong className="font-semibold">주의:</strong>{' '}
              현재 작성 중인 에이전트가 모두 삭제되고 기본 7명으로 교체됩니다.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DEFAULT_AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="rounded-xl border border-gray-200 p-4 bg-white hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-1 self-stretch rounded-full flex-shrink-0"
                    style={{ backgroundColor: agent.accentColor }}
                    aria-hidden
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {agent.role}
                      </h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 tabular-nums">
                        {agent.weight}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {agent.tagline}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {agent.focusAreas.slice(0, 3).map((fa, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600"
                        >
                          {fa}
                        </span>
                      ))}
                      {agent.focusAreas.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-400">
                          +{agent.focusAreas.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            총 <span className="font-semibold text-gray-800">{DEFAULT_AGENTS.length}명</span> ·
            가중치 합계{' '}
            <span className="font-mono font-semibold text-gray-800">
              {DEFAULT_AGENTS.reduce((s, a) => s + a.weight, 0)}%
            </span>
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg transition-colors"
            >
              취소
            </button>
            <button
              type="button"
              onClick={() => {
                onLoad()
                onClose()
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#004094] hover:bg-[#004094]/90 rounded-lg transition-colors shadow-sm"
            >
              <Check className="w-4 h-4" />
              이 구성으로 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
