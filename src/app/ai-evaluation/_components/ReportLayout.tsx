'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type {
  EvaluationDoc,
  EvaluationPackage,
  EvaluationSynthesis,
  AgentPerspective,
} from '@/types/ai-evaluation'

import ReportTopBar from './ReportTopBar'
import AgentTabs, { type AgentTabId } from './AgentTabs'
import SynthesisSection from './SynthesisSection'
import PerspectivePanel from './PerspectivePanel'
import AiChatPanel from '../AiChatPanel'

export default function ReportLayout({
  evaluation,
  package: pkg,
}: {
  evaluation: EvaluationDoc
  package: EvaluationPackage
}) {
  const router = useRouter()
  const synthesis = evaluation.synthesis as EvaluationSynthesis
  const perspectives = (evaluation.perspectives ?? {}) as Record<string, AgentPerspective>

  // 에이전트 목록 (order 순, perspective 존재하는 것만)
  const orderedAgents = useMemo(
    () =>
      [...pkg.agents]
        .sort((a, b) => a.order - b.order)
        .filter((agent) => !!perspectives[agent.id]),
    [pkg.agents, perspectives]
  )

  const [activeTab, setActiveTab] = useState<AgentTabId>('synthesis')
  // Scroll 애니메이션 중에는 IntersectionObserver가 탭을 바꾸지 않도록 락
  const scrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ─── Scroll Spy ───────────────────────────────────
  useEffect(() => {
    if (!synthesis) return
    const allIds: string[] = [
      'synthesis',
      ...orderedAgents.map((a) => `perspective-${a.id}`),
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const sorted = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )
        const topId = sorted[0].target.id
        if (topId === 'synthesis') {
          setActiveTab('synthesis')
        } else if (topId.startsWith('perspective-')) {
          setActiveTab(topId.replace('perspective-', ''))
        }
      },
      {
        rootMargin: '-220px 0px -60% 0px',
        threshold: 0.05,
      }
    )

    const timer = setTimeout(() => {
      allIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [synthesis, orderedAgents])

  // ─── Tab 선택 & 스크롤 ────────────────────────────
  const handleSelectTab = useCallback((tabId: AgentTabId) => {
    setActiveTab(tabId)
    scrollingRef.current = true

    const targetId = tabId === 'synthesis' ? 'synthesis' : `perspective-${tabId}`
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // 스크롤 애니메이션이 끝날 때까지 IntersectionObserver 업데이트 차단
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => {
      scrollingRef.current = false
    }, 800)
  }, [])

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  const handleReanalyze = useCallback(() => {
    router.push('/ai-evaluation/new')
  }, [router])

  if (!synthesis) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FAFAFA] relative overflow-x-hidden font-sans text-[#404040]"
    >
      <ReportTopBar
        evaluationId={evaluation.id}
        documentName={evaluation.documentMeta.originalName}
        packageName={evaluation.packageName}
        packageVersion={evaluation.packageVersion}
        onReanalyze={handleReanalyze}
      />

      <AgentTabs
        agents={orderedAgents}
        perspectives={perspectives}
        agentStatuses={evaluation.progress.agentStatuses}
        activeId={activeTab}
        onSelect={handleSelectTab}
      />

      <AiChatPanel evaluationId={evaluation.id} />

      <main className="max-w-[1400px] mx-auto px-8 pb-20 pt-[180px]">
        <SynthesisSection
          synthesis={synthesis}
          agents={pkg.agents}
          perspectives={perspectives}
          onSelectAgent={(id) => handleSelectTab(id)}
        />

        {orderedAgents.map((agent) => {
          const perspective = perspectives[agent.id]
          if (!perspective) return null
          return (
            <PerspectivePanel
              key={agent.id}
              agent={agent}
              perspective={perspective}
            />
          )
        })}

        <div className="py-12 border-t border-[#E5E5E5] text-center">
          <p className="text-[11px] text-[#A3A3A3] font-normal tracking-wide">
            {pkg.name} v{pkg.version} &middot;{' '}
            {evaluation.completedAt ?? evaluation.updatedAt} &middot; 본 보고서는
            AI 자동 평가 결과이며, 최종 판단은 전문가 검토를 권장합니다.
          </p>
        </div>
      </main>
    </motion.div>
  )
}
