'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, Loader2 } from 'lucide-react'
import { getDocs } from 'firebase/firestore'
import { evaluationChatsQuery } from '@/lib/firebase/collections'
import { useAuth } from '@/contexts/AuthContext'
import type { EvaluationChatMessage } from '@/types/ai-evaluation'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
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

export default function AiChatPanel({ evaluationId }: { evaluationId?: string } = {}) {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isStreaming])

  // 패널이 처음 열릴 때만 Firestore에서 chat 히스토리 로드
  useEffect(() => {
    if (!isOpen || !evaluationId || hasLoaded) return
    let cancelled = false
    setIsLoadingHistory(true)
    ;(async () => {
      try {
        const snap = await getDocs(evaluationChatsQuery(evaluationId, 50))
        if (cancelled) return
        const msgs: ChatMessage[] = snap.docs.map((d) => {
          const data = d.data() as EvaluationChatMessage
          return {
            id: data.id || d.id,
            role: data.role,
            content: data.content,
          }
        })
        setMessages(msgs)
        setHasLoaded(true)
      } catch (err) {
        console.error('[AiChatPanel] failed to load chats:', err)
        setHasLoaded(true) // 실패해도 빈 상태로 계속 진행
      } finally {
        if (!cancelled) setIsLoadingHistory(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [isOpen, evaluationId, hasLoaded])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isStreaming) return

      // evaluationId 없으면 전송 차단 (이 패널은 /ai-evaluation/[id]에서만 사용)
      if (!evaluationId) {
        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: 'assistant',
            content: '평가 컨텍스트가 없어 질문을 처리할 수 없습니다.',
          },
        ])
        return
      }

      // 로그인 토큰 획득
      let idToken: string | null = null
      try {
        idToken = user ? await user.getIdToken() : null
      } catch (err) {
        console.error('[AiChatPanel] getIdToken failed:', err)
      }

      if (!idToken) {
        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: 'assistant',
            content: '로그인이 필요합니다. 다시 로그인한 뒤 시도해주세요.',
          },
        ])
        return
      }

      const userMsg: ChatMessage = { id: makeId(), role: 'user', content: trimmed }
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
              m.id === assistantId
                ? { ...m, content: `오류가 발생했습니다.\n\n${errMsg}` }
                : m
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
            prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m))
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-trigger"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[70] group flex items-center gap-2 bg-[#0A0A0A] text-white pl-4 pr-5 py-3.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:bg-[#1A56DB] transition-colors"
            aria-label="AI 어시스턴트 열기"
          >
            <div className="relative">
              <Sparkles className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#1A56DB] group-hover:bg-white rounded-full animate-pulse" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">AI 어시스턴트</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 20, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-[70] w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-5rem)] bg-white border border-[#0A0A0A] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#0A0A0A] text-white border-b border-[#0A0A0A]">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#1A56DB]" />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold uppercase tracking-[0.15em]">AI 어시스턴트</span>
                  <span className="text-[10px] text-[#A3A3A3] font-medium">Claude Sonnet 4.6</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="닫기"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-[#FAFAFA]">
              {isLoadingHistory && messages.length === 0 && (
                <div className="flex items-center justify-center py-8 text-[11px] text-[#A3A3A3]">
                  <Loader2 className="w-3 h-3 animate-spin mr-2" />
                  이전 대화 불러오는 중...
                </div>
              )}

              {!isLoadingHistory && messages.length === 0 && (
                <div className="space-y-4">
                  <div className="border-l-2 border-[#1A56DB] pl-3">
                    <p className="text-[11px] font-semibold tracking-[0.06em] text-[#737373] mb-1">
                      무엇이든 물어보세요
                    </p>
                    <p className="text-[13px] text-[#0A0A0A] font-medium leading-[1.6]">
                      이 사업계획서의 평가 근거, 개념, 개선 방향에 대해 물어보세요.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold tracking-[0.08em] text-[#A3A3A3]">
                      추천 질문
                    </p>
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left text-[12px] text-[#404040] leading-[1.5] px-3 py-2.5 bg-white border border-[#E5E5E5] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors"
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
                    className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-[1.65] whitespace-pre-wrap break-words ${
                      m.role === 'user'
                        ? 'bg-[#0A0A0A] text-white'
                        : 'bg-white text-[#262626] border border-[#E5E5E5]'
                    }`}
                  >
                    {m.content || (
                      <span className="inline-flex items-center gap-2 text-[#737373]">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        생각 중...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-[#E5E5E5] bg-white p-3">
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
                  className="flex-1 resize-none text-[13px] text-[#0A0A0A] placeholder:text-[#A3A3A3] px-3 py-2.5 border border-[#E5E5E5] focus:border-[#0A0A0A] focus:outline-none disabled:bg-[#FAFAFA] min-h-[40px] max-h-[120px]"
                />
                <button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  className="h-[40px] w-[40px] flex items-center justify-center bg-[#0A0A0A] text-white hover:bg-[#1A56DB] disabled:bg-[#E5E5E5] disabled:text-[#A3A3A3] transition-colors"
                  aria-label="보내기"
                >
                  {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              <p className="mt-2 text-[10px] text-[#A3A3A3] leading-tight">
                Shift + Enter로 줄바꿈 · AI 답변은 참고용입니다
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
