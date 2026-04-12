'use client'

import { Check, Loader2, Clock, X } from 'lucide-react'
import type { EvaluationStatus } from '@/types/ai-evaluation'

interface StatusConfig {
  label: string
  color: string
  bgColor: string
  borderColor: string
  Icon: typeof Check
  group: 'done' | 'progress' | 'queued' | 'error'
}

export function getStatusConfig(status: EvaluationStatus): StatusConfig {
  switch (status) {
    case 'ready':
      return {
        label: '완료',
        color: '#047857',
        bgColor: 'rgba(4, 120, 87, 0.08)',
        borderColor: '#047857',
        Icon: Check,
        group: 'done',
      }
    case 'queued':
      return {
        label: '대기',
        color: '#737373',
        bgColor: 'rgba(115, 115, 115, 0.08)',
        borderColor: '#737373',
        Icon: Clock,
        group: 'queued',
      }
    case 'uploading':
    case 'converting':
    case 'parsing':
    case 'analyzing':
    case 'synthesizing':
    case 'finalizing':
      return {
        label: '분석 중',
        color: '#1A56DB',
        bgColor: 'rgba(26, 86, 219, 0.08)',
        borderColor: '#1A56DB',
        Icon: Loader2,
        group: 'progress',
      }
    case 'error':
      return {
        label: '실패',
        color: '#B91C1C',
        bgColor: 'rgba(185, 28, 28, 0.08)',
        borderColor: '#B91C1C',
        Icon: X,
        group: 'error',
      }
    default:
      return {
        label: '-',
        color: '#737373',
        bgColor: 'rgba(115, 115, 115, 0.08)',
        borderColor: '#737373',
        Icon: Clock,
        group: 'queued',
      }
  }
}

export default function StatusBadge({
  status,
  size = 'sm',
}: {
  status: EvaluationStatus
  size?: 'sm' | 'md'
}) {
  const cfg = getStatusConfig(status)
  const { Icon } = cfg
  const isProgress = cfg.group === 'progress'

  const padding = size === 'md' ? 'px-3 py-1.5' : 'px-2 py-1'
  const fontSize = size === 'md' ? 'text-[11px]' : 'text-[10px]'
  const iconSize = size === 'md' ? 'w-3 h-3' : 'w-2.5 h-2.5'

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${padding} ${fontSize} font-semibold uppercase tracking-[0.15em] border`}
      style={{
        color: cfg.color,
        backgroundColor: cfg.bgColor,
        borderColor: cfg.borderColor,
      }}
    >
      <Icon className={`${iconSize} ${isProgress ? 'animate-spin' : ''}`} />
      {cfg.label}
    </span>
  )
}
