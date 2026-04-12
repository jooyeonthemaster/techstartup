'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { onSnapshot, getDocs } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Loader2,
  Check,
  ExternalLink,
  FileText,
  Clock,
  Hourglass,
  Upload,
  Sparkles,
  ChevronLeft,
  Send,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import Link from 'next/link'

import { evaluationDoc, evaluationChatsQuery } from '@/lib/firebase/collections'
import { fetchPackage } from '@/lib/ai-evaluation/client'
import { useAuth } from '@/contexts/AuthContext'
import type {
  EvaluationDoc,
  EvaluationPackage,
  EvaluationSynthesis,
  AgentPerspective,
  EvaluationStatus,
  EvaluationChatMessage,
} from '@/types/ai-evaluation'
import { getRoleInitial } from '../../report-data'
import type { AgentRunStatus } from '../../report-data'

import SynthesisSection from '../../_components/SynthesisSection'
import PerspectivePanel from '../../_components/PerspectivePanel'

/* ── Status config ── */
const STATUS_CONF: Record<
  EvaluationStatus,
  { label: string; icon: typeof Loader2; color: string }
> = {
  queued: { label: '대기 중', icon: Clock, color: '#94a3b8' },
  uploading: { label: '파일 업로드 중', icon: Upload, color: '#0ea5e9' },
  converting: { label: '문서 변환 중', icon: Hourglass, color: '#8b5cf6' },
  parsing: { label: '문서 파싱 중', icon: Upload, color: '#8b5cf6' },
  analyzing: { label: '에이전트 분석 중', icon: Loader2, color: '#1a56db' },
  synthesizing: { label: '종합 리포트 합성 중', icon: Sparkles, color: '#7c3aed' },
  finalizing: { label: '보고서 저장 중', icon: Loader2, color: '#059669' },
  ready: { label: '분석 완료', icon: Check, color: '#059669' },
  error: { label: '오류 발생', icon: X, color: '#dc2626' },
}

const SUGGESTED_QUESTIONS = [
  '이 보고서의 종합 점수가 이렇게 나온 이유가 뭐야?',
  '가장 심각한 이슈 3가지와 개선 방향을 요약해줘',
  '보고서에서 가장 낮은 점수를 받은 항목이 뭐야?',
  'GTM 전략을 어떻게 보완해야 하는지 알려줘',
]

function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

/* ══════════════════════════════════════════════════
 * Modal component
 * ══════════════════════════════════════════════════ */
export default function EvaluationDetailModal({
  evaluationId,
  onClose,
}: {
  evaluationId: string
  onClose: () => void
}) {
  const [evaluation, setEvaluation] = useState<EvaluationDoc | null>(null)
  const [pkg, setPkg] = useState<EvaluationPackage | null>(null)
  const [loading, setLoading] = useState(true)
  const [chatOpen, setChatOpen] = useState(true)

  // Subscribe to evaluation doc
  useEffect(() => {
    const unsub = onSnapshot(
      evaluationDoc(evaluationId),
      (snap) => {
        if (!snap.exists()) return
        setEvaluation(snap.data() as EvaluationDoc)
        setLoading(false)
      },
      (err) => {
        console.error('[modal] onSnapshot error:', err)
        setLoading(false)
      }
    )
    return unsub
  }, [evaluationId])

  // Fetch package
  useEffect(() => {
    if (!evaluation?.packageId) return
    if (pkg?.id === evaluation.packageId) return
    let cancelled = false
    fetchPackage(evaluation.packageId)
      .then((data) => {
        if (!cancelled) setPkg(data.package)
      })
      .catch(console.error)
    return () => {
      cancelled = true
    }
  }, [evaluation?.packageId, pkg?.id])

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  const isReady = evaluation?.status === 'ready' && evaluation.synthesis
  const isError = evaluation?.status === 'error'
  const isAnalyzing = evaluation && !isReady && !isError

  const modal = (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] flex"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Full-width panel */}
        <motion.div
          initial={{ y: '3%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '3%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative mx-auto my-4 w-[calc(100%-2rem)] max-w-[1600px] h-[calc(100%-2rem)] bg-[#FAFAFA] shadow-2xl flex flex-col rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Top bar ── */}
          <div className="shrink-0 h-13 bg-white border-b border-[#E5E5E5] px-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors shrink-0"
                title="닫기"
              >
                <ChevronLeft className="w-5 h-5 text-slate-500" />
              </button>
              <div className="w-px h-5 bg-slate-200 shrink-0" />
              
              <div className="flex items-center gap-2 min-w-0 flex-1 h-full">
                <FileText className="w-[18px] h-[18px] text-slate-400 shrink-0" />
                <p className="m-0 text-[14px] leading-none font-bold text-slate-800 truncate">
                  {evaluation?.documentMeta.originalName ?? '로딩 중...'}
                </p>
                <div className="flex items-center gap-2 shrink-0 ml-1">
                  {pkg && (
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 border border-slate-200 text-[10px] font-bold tracking-[0.06em] text-slate-500 rounded-md">
                      {pkg.name} v{pkg.version}
                    </span>
                  )}
                  {evaluation && !loading && (
                    <StatusPill status={evaluation.status} progress={evaluation.progress.percent} />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {/* Chat toggle */}
              {isReady && (
                <button
                  onClick={() => setChatOpen((v) => !v)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold border rounded-lg transition-colors ${
                    chatOpen
                      ? 'text-cyan-700 border-cyan-200 bg-cyan-50 hover:bg-cyan-100'
                      : 'text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700'
                  }`}
                >
                  {chatOpen ? <PanelLeftClose className="w-3.5 h-3.5" /> : <PanelLeftOpen className="w-3.5 h-3.5" />}
                  AI 챗
                </button>
              )}
              <Link
                href={`/ai-evaluation/${evaluationId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-slate-500 border border-slate-200 rounded-lg hover:border-slate-400 hover:text-slate-700 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                새 탭
              </Link>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
                title="닫기 (ESC)"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          {/* ── Body: Chat (left) + Content (right) ── */}
          <div className="flex-1 flex overflow-hidden">
            {/* Chat panel (left) — only when report is ready */}
            <AnimatePresence initial={false}>
              {isReady && chatOpen && (
                <motion.div
                  key="chat-sidebar"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 380, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="shrink-0 border-r border-slate-200 bg-white flex flex-col overflow-hidden"
                >
                  <ModalChatPanel evaluationId={evaluationId} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main content (right) */}
            <div className="flex-1 overflow-y-auto min-w-0">
              {loading && (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
              )}

              {isAnalyzing && evaluation && (
                <ModalAnalyzingView evaluation={evaluation} pkg={pkg} />
              )}

              {isError && evaluation && (
                <div className="flex items-center justify-center h-full p-12">
                  <div className="max-w-md text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-50 flex items-center justify-center">
                      <X className="w-7 h-7 text-red-500" />
                    </div>
                    <h3 className="text-[20px] font-bold text-slate-800 mb-3">오류 발생</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      {evaluation.errorMessage ?? '분석 중 알 수 없는 오류가 발생했습니다.'}
                    </p>
                  </div>
                </div>
              )}

              {isReady && evaluation && pkg && (
                <ModalReportView evaluation={evaluation} pkg={pkg} />
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  return createPortal(modal, document.body)
}

/* ── Status pill for top bar ── */
function StatusPill({ status, progress }: { status: EvaluationStatus; progress: number }) {
  const conf = STATUS_CONF[status] ?? STATUS_CONF.queued
  const isActive = status !== 'ready' && status !== 'error'
  return (
    <span
      className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.04em]"
      style={{
        color: conf.color,
        backgroundColor: `${conf.color}10`,
      }}
    >
      {isActive && <Loader2 className="w-3 h-3 animate-spin" />}
      {status === 'ready' && <Check className="w-3 h-3" />}
      {status === 'error' && <X className="w-3 h-3" />}
      {conf.label}
      {isActive && <span className="tabular-nums">{Math.round(progress)}%</span>}
    </span>
  )
}

/* ══════════════════════════════════════════════════
 * Chat panel — embedded in modal left column
 * ══════════════════════════════════════════════════ */
function ModalChatPanel({ evaluationId }: { evaluationId: string }) {
  const { user } = useAuth()

  type ChatMsg = { id: string; role: 'user' | 'assistant'; content: string }

  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isStreaming])

  // Load chat history
  useEffect(() => {
    if (hasLoaded) return
    let cancelled = false
    setIsLoadingHistory(true)
    ;(async () => {
      try {
        const snap = await getDocs(evaluationChatsQuery(evaluationId, 50))
        if (cancelled) return
        const msgs: ChatMsg[] = snap.docs.map((d) => {
          const data = d.data() as EvaluationChatMessage
          return { id: data.id || d.id, role: data.role, content: data.content }
        })
        setMessages(msgs)
        setHasLoaded(true)
      } catch (err) {
        console.error('[ModalChat] load failed:', err)
        setHasLoaded(true)
      } finally {
        if (!cancelled) setIsLoadingHistory(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [evaluationId, hasLoaded])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isStreaming) return

      let idToken: string | null = null
      try {
        idToken = user ? await user.getIdToken() : null
      } catch {
        /* */
      }
      if (!idToken) {
        setMessages((prev) => [
          ...prev,
          { id: makeId(), role: 'assistant', content: '로그인이 필요합니다.' },
        ])
        return
      }

      const userMsg: ChatMsg = { id: makeId(), role: 'user', content: trimmed }
      const assistantId = makeId()
      const nextMessages = [...messages, userMsg]
      setMessages([...nextMessages, { id: assistantId, role: 'assistant', content: '' }])
      setInput('')
      setIsStreaming(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
            evaluationId,
          }),
          signal: controller.signal,
        })

        if (!res.ok || !res.body) {
          const errText = await res.text().catch(() => '')
          let errMsg = res.statusText
          try {
            const parsed = JSON.parse(errText)
            errMsg = parsed.error || errMsg
          } catch {
            errMsg = errText.slice(0, 300) || res.statusText
          }
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: `오류: ${errMsg}` } : m
            )
          )
          return
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          if (!chunk) continue
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + chunk } : m
            )
          )
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: '네트워크 오류가 발생했습니다.' } : m
            )
          )
        }
      } finally {
        setIsStreaming(false)
        abortRef.current = null
      }
    },
    [messages, isStreaming, evaluationId, user]
  )

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="shrink-0 px-5 py-3.5 border-b border-slate-100 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center">
          <MessageSquare className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-[12px] font-bold text-slate-800">AI 어시스턴트</p>
          <p className="text-[10px] text-slate-400 font-medium">보고서에 대해 질문하세요</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50/50">
        {isLoadingHistory && messages.length === 0 && (
          <div className="flex items-center justify-center py-8 text-[11px] text-slate-400">
            <Loader2 className="w-3 h-3 animate-spin mr-2" />
            이전 대화 불러오는 중...
          </div>
        )}

        {!isLoadingHistory && messages.length === 0 && (
          <div className="space-y-4 pt-2">
            <div className="border-l-2 border-cyan-400 pl-3">
              <p className="text-[11px] font-bold tracking-[0.06em] text-slate-400 mb-1">
                무엇이든 물어보세요
              </p>
              <p className="text-[13px] text-slate-700 font-medium leading-[1.6]">
                이 사업계획서의 평가 근거, 개선 방향에 대해 물어보세요.
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold tracking-[0.08em] text-slate-300 mb-2">
                추천 질문
              </p>
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="w-full text-left text-[12px] text-slate-600 leading-[1.5] px-3 py-2.5 bg-white border border-slate-100 rounded-xl hover:border-cyan-300 hover:text-cyan-700 hover:bg-cyan-50/30 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[88%] px-3.5 py-2.5 text-[13px] leading-[1.65] whitespace-pre-wrap break-words rounded-2xl ${
                m.role === 'user'
                  ? 'bg-slate-800 text-white rounded-br-md'
                  : 'bg-white text-slate-700 border border-slate-100 rounded-bl-md shadow-sm'
              }`}
            >
              {m.content || (
                <span className="inline-flex items-center gap-2 text-slate-400">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  생각 중...
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-slate-100 bg-white p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage(input)
              }
            }}
            placeholder="보고서에 대해 물어보세요..."
            rows={1}
            disabled={isStreaming}
            className="flex-1 resize-none text-[13px] text-slate-800 placeholder:text-slate-400 px-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-100 disabled:bg-slate-50 min-h-[40px] max-h-[100px] transition-all"
          />
          <button
            type="button"
            onClick={() => sendMessage(input)}
            disabled={isStreaming || !input.trim()}
            className="h-[40px] w-[40px] flex items-center justify-center bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-xl hover:from-cyan-400 hover:to-indigo-400 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 transition-all shadow-sm"
            aria-label="보내기"
          >
            {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <p className="mt-1.5 text-[10px] text-slate-300 leading-tight px-1">
          Shift+Enter 줄바꿈 · AI 답변은 참고용
        </p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
 * Analyzing view (progress) — embedded in modal
 * ══════════════════════════════════════════════════ */
function ModalAnalyzingView({
  evaluation,
  pkg,
}: {
  evaluation: EvaluationDoc
  pkg: EvaluationPackage | null
}) {
  const { status, progress } = evaluation
  const percent = Math.max(0, Math.min(100, Math.round(progress.percent ?? 0)))
  const conf = STATUS_CONF[status] ?? STATUS_CONF.queued
  const stageLabel = progress.stageLabel || conf.label
  const agents = useMemo(
    () => (pkg ? [...pkg.agents].sort((a, b) => a.order - b.order) : []),
    [pkg]
  )
  const showAgents =
    agents.length > 0 &&
    ['analyzing', 'synthesizing', 'finalizing'].includes(status)

  return (
    <div className="flex items-center justify-center min-h-full py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm">
          {/* Stage label */}
          <div className="flex items-center gap-2 mb-8">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: conf.color }}
            />
            <p
              className="text-[11px] font-bold tracking-[0.1em]"
              style={{ color: conf.color }}
            >
              {stageLabel}
            </p>
          </div>

          {/* Percent */}
          <div className="flex items-end gap-1 mb-8">
            <motion.span
              key={percent}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[72px] font-black text-slate-800 tabular-nums leading-none tracking-tighter"
            >
              {percent}
            </motion.span>
            <span className="text-[20px] font-bold text-slate-300 pb-2">%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-8">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${conf.color}cc, ${conf.color})`,
              }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Helper */}
          <p className="text-[12px] text-slate-400 leading-relaxed mb-6">
            {conf.label} — 잠시만 기다려주세요.
          </p>

          {/* Agent checklist */}
          {showAgents && (
            <div className="pt-6 border-t border-slate-100">
              <p className="text-[10px] font-bold tracking-[0.08em] text-slate-300 mb-4">
                분석 에이전트
              </p>
              <div className="grid grid-cols-1 gap-2">
                {agents.map((agent) => {
                  const agentStatus =
                    (progress.agentStatuses?.[agent.id] as AgentRunStatus | undefined) ??
                    'pending'
                  const initial = getRoleInitial(agent.role)
                  return (
                    <div
                      key={agent.id}
                      className="flex items-center gap-3 py-2 px-3 rounded-xl bg-slate-50/50"
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0 transition-all ${
                          agentStatus === 'completed'
                            ? ''
                            : agentStatus === 'running'
                              ? 'animate-pulse'
                              : 'opacity-40 grayscale'
                        }`}
                        style={{ backgroundColor: agent.accentColor || '#64748b' }}
                      >
                        {agentStatus === 'completed' ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : agentStatus === 'running' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          initial
                        )}
                      </div>
                      <span className="text-[12px] font-semibold text-slate-700 flex-1 truncate">
                        {agent.role}
                      </span>
                      <AgentStatusLabel status={agentStatus} />
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <p className="mt-8 pt-5 border-t border-slate-100 text-[10px] text-slate-300 leading-relaxed">
            분석은 보통 2~5분이 소요됩니다. 이 창을 닫아도 분석은 계속 진행됩니다.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function AgentStatusLabel({ status }: { status: AgentRunStatus }) {
  switch (status) {
    case 'running':
      return (
        <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 tracking-[0.06em]">
          <Loader2 className="w-3 h-3 animate-spin" />
          분석 중
        </span>
      )
    case 'completed':
      return (
        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 tracking-[0.06em]">
          <Check className="w-3 h-3" />
          완료
        </span>
      )
    case 'failed':
      return (
        <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 tracking-[0.06em]">
          <X className="w-3 h-3" />
          실패
        </span>
      )
    default:
      return (
        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-300 tracking-[0.06em]">
          대기
        </span>
      )
  }
}

/* ══════════════════════════════════════════════════
 * Report view (completed) — embedded in modal
 * ══════════════════════════════════════════════════ */
function ModalReportView({
  evaluation,
  pkg,
}: {
  evaluation: EvaluationDoc
  pkg: EvaluationPackage
}) {
  const synthesis = evaluation.synthesis as EvaluationSynthesis
  const perspectives = (evaluation.perspectives ?? {}) as Record<string, AgentPerspective>

  const orderedAgents = useMemo(
    () =>
      [...pkg.agents]
        .sort((a, b) => a.order - b.order)
        .filter((agent) => !!perspectives[agent.id]),
    [pkg.agents, perspectives]
  )

  const [activeTab, setActiveTab] = useState<string>('synthesis')

  const handleSelectAgent = useCallback((agentId: string) => {
    setActiveTab(agentId)
    const el = document.getElementById(`modal-perspective-${agentId}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="relative">
      {/* Sticky tab bar inside modal */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4">
        <div className="flex items-stretch overflow-x-auto scrollbar-hide gap-0">
          <button
            onClick={() => {
              setActiveTab('synthesis')
              document
                .getElementById('modal-synthesis')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className={`relative h-11 px-4 flex items-center gap-2 text-[11px] font-bold tracking-[0.06em] shrink-0 transition-colors ${
              activeTab === 'synthesis'
                ? 'text-slate-800'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            종합 리포트
            {activeTab === 'synthesis' && (
              <motion.span
                layoutId="modal-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-800"
              />
            )}
          </button>

          {orderedAgents.map((agent) => {
            const p = perspectives[agent.id]
            return (
              <button
                key={agent.id}
                onClick={() => handleSelectAgent(agent.id)}
                className={`relative h-11 px-3 flex items-center gap-2 shrink-0 transition-colors ${
                  activeTab === agent.id
                    ? 'text-slate-800'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div
                  className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                  style={{ backgroundColor: agent.accentColor || '#64748b' }}
                >
                  {getRoleInitial(agent.role)}
                </div>
                <span className="text-[11px] font-bold tracking-[0.04em] whitespace-nowrap">
                  {agent.role}
                </span>
                {p && (
                  <span className="text-[10px] font-bold tabular-nums text-slate-400">
                    {p.score}
                  </span>
                )}
                {activeTab === agent.id && (
                  <motion.span
                    layoutId="modal-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-800"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Report content */}
      <div className="px-6 lg:px-10 pb-16 pt-6">
        <div id="modal-synthesis">
          <SynthesisSection
            synthesis={synthesis}
            agents={pkg.agents}
            perspectives={perspectives}
            onSelectAgent={handleSelectAgent}
          />
        </div>

        {orderedAgents.map((agent) => {
          const perspective = perspectives[agent.id]
          if (!perspective) return null
          return (
            <div key={agent.id} id={`modal-perspective-${agent.id}`}>
              <PerspectivePanel agent={agent} perspective={perspective} />
            </div>
          )
        })}

        <div className="py-10 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-400 font-normal tracking-wide">
            {pkg.name} v{pkg.version} &middot;{' '}
            {evaluation.completedAt ?? evaluation.updatedAt} &middot; AI 자동 평가
            결과이며 전문가 검토를 권장합니다.
          </p>
        </div>
      </div>
    </div>
  )
}
