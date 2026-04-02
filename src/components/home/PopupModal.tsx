'use client'

import { useState, useEffect, useCallback } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import type { Popup } from '@/types/admin'

interface PopupModalProps {
  popups: Popup[]
}

const STORAGE_KEY = 'popup_hidden_date'

function getTodayString(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getAspectRatioClass(ratio: string): string {
  switch (ratio) {
    case '1/1':
      return 'aspect-square'
    case '4/5':
      return 'aspect-[4/5]'
    case '3/4':
      return 'aspect-[3/4]'
    case '16/9':
      return 'aspect-video'
    case '9/16':
      return 'aspect-[9/16]'
    default:
      return 'aspect-[4/5]'
  }
}

export default function PopupModal({ popups }: PopupModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hideToday, setHideToday] = useState(false)

  useEffect(() => {
    if (popups.length === 0) return

    try {
      const hiddenDate = localStorage.getItem(STORAGE_KEY)
      if (hiddenDate === getTodayString()) return
    } catch {
      // localStorage unavailable (SSR, private mode, etc.)
    }

    // Small delay so the page renders first
    const timer = setTimeout(() => setIsOpen(true), 500)
    return () => clearTimeout(timer)
  }, [popups.length])

  const handleClose = useCallback(() => {
    if (hideToday) {
      try {
        localStorage.setItem(STORAGE_KEY, getTodayString())
      } catch {
        // ignore
      }
    }
    setIsOpen(false)
  }, [hideToday])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? popups.length - 1 : prev - 1))
  }, [popups.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === popups.length - 1 ? 0 : prev + 1))
  }, [popups.length])

  if (popups.length === 0) return null

  const current = popups[currentIndex]
  const hasMultiple = popups.length > 1

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              onPointerDownOutside={handleClose}
              onEscapeKeyDown={handleClose}
            >
              <motion.div
                className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                    aria-label="닫기"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Image Area */}
                  {current.image_url && (
                    <div className={`relative w-full ${getAspectRatioClass(current.image_aspect_ratio)} bg-gray-100 overflow-hidden`}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={current.id}
                          className="absolute inset-0"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={current.image_url}
                            alt={current.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 448px"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Arrows */}
                      {hasMultiple && (
                        <>
                          <button
                            onClick={goToPrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                            aria-label="이전 팝업"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={goToNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                            aria-label="다음 팝업"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="p-5">
                    <Dialog.Title className="text-lg font-bold text-gray-900 leading-snug">
                      {current.title}
                    </Dialog.Title>
                    {current.description && (
                      <Dialog.Description className="mt-2 text-sm text-gray-600 leading-relaxed">
                        {current.description}
                      </Dialog.Description>
                    )}

                    {/* Link Button */}
                    {current.link_url && (
                      <a
                        href={current.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#ff6b00] hover:bg-[#e66000] text-white text-sm font-semibold rounded-lg transition-colors"
                      >
                        {current.link_text || '자세히 보기'}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* Dot Indicators */}
                    {hasMultiple && (
                      <div className="flex items-center justify-center gap-1.5 mt-4">
                        {popups.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === currentIndex
                                ? 'bg-[#004094] w-5'
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`팝업 ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer: Hide Today + Close */}
                  <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/80">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={hideToday}
                        onChange={(e) => setHideToday(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#004094] focus:ring-[#004094] accent-[#004094]"
                      />
                      <span className="text-xs text-gray-500">
                        오늘 하루 보지 않기
                      </span>
                    </label>
                    <button
                      onClick={handleClose}
                      className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors px-3 py-1.5"
                    >
                      닫기
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
