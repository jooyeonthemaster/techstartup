'use client'

import { motion } from 'framer-motion'
import { getScoreColor } from './report-data'

/* ═══════════════════════════════════════════════════
   Score Bar — 4px height, sharp edges, no rounding
   ═══════════════════════════════════════════════════ */
export function ScoreBar({ score, maxScore = 100, height = 4 }: { score: number; maxScore?: number; height?: number }) {
  const pct = (score / maxScore) * 100
  const color = getScoreColor(score)

  return (
    <div className="w-full overflow-hidden" style={{ height, backgroundColor: '#E5E5E5' }}>
      <motion.div
        className="h-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   Confidence Bar — minimal, editorial
   ═══════════════════════════════════════════════════ */
export function ConfidenceBar({ label, value }: { label: string; value: number }) {
  const color = value >= 80 ? "#047857" : value >= 65 ? "#1A56DB" : "#B45309"
  return (
    <div className="flex items-center gap-4">
      <span className="text-[11px] font-semibold tracking-[0.06em] text-[#A3A3A3] w-24 shrink-0">{label}</span>
      <div className="flex-1 h-[2px] bg-[#E5E5E5] overflow-hidden">
        <motion.div
          className="h-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <span className="text-[13px] font-bold tabular-nums w-10 text-right" style={{ color }}>{value}%</span>
    </div>
  )
}
