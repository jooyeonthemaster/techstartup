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
