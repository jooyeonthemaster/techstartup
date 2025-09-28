'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
  className?: string
  once?: boolean
}

export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  distance = 30,
  className = '',
  once = true
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-100px' })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance }
      case 'down': return { opacity: 0, y: -distance }
      case 'left': return { opacity: 0, x: distance }
      case 'right': return { opacity: 0, x: -distance }
      default: return { opacity: 0, y: distance }
    }
  }

  const getFinalPosition = () => {
    switch (direction) {
      case 'up': return { opacity: 1, y: 0 }
      case 'down': return { opacity: 1, y: 0 }
      case 'left': return { opacity: 1, x: 0 }
      case 'right': return { opacity: 1, x: 0 }
      default: return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? getFinalPosition() : getInitialPosition()}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxScrollProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxScroll({ children, speed = 0.5, className = '' }: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface FadeInWhenVisibleProps {
  children: React.ReactNode
  threshold?: number
  className?: string
}

export function FadeInWhenVisible({ children, threshold = 0.1, className = '' }: FadeInWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}





