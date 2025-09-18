'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export default function SectionTransition({ children, className = '', id }: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.98, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.05, 0.98, 1], [0.95, 1, 1, 0.95])

  return (
    <motion.section
      ref={containerRef}
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        y,
        opacity,
        scale
      }}
    >
      {children}
    </motion.section>
  )
}

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  speed?: number
}

export function ParallaxSection({ children, className = '', id, speed = 0.5 }: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`])

  return (
    <motion.section
      ref={containerRef}
      id={id}
      className={`relative ${className}`}
      style={{ y }}
    >
      {children}
    </motion.section>
  )
}

interface SectionBackgroundProps {
  children: React.ReactNode
  id?: string
  className?: string
  // preset: 섹션별 명확한 배경 전환을 위한 프리셋 키
  preset?: 'hero' | 'purpose' | 'membership' | 'business' | 'fees' | 'contact'
}

export function SectionBackground({ children, id, className = '', preset = 'purpose' }: SectionBackgroundProps) {
  const base = 'relative overflow-hidden'

  const map: Record<string, string> = {
    hero: 'bg-[#0a0f1c] text-white',
    purpose: 'bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900',
    membership: 'bg-[radial-gradient(1200px_600px_at_50%_-10%,_hsl(var(--primary)/0.06),_transparent_60%)] dark:bg-[radial-gradient(1200px_600px_at_50%_-10%,_hsl(var(--primary)/0.12),_transparent_60%)]',
    business: 'bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/40 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20',
    fees: 'bg-slate-50 dark:bg-gray-950',
    contact: 'bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900'
  }

  return (
    <section id={id} className={`${base} ${map[preset]} ${className}`}>
      {/* Grain/Glow overlays for glass aesthetic */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,.8),transparent_75%)]" />
      {children}
    </section>
  )
}