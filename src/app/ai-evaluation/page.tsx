'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FilePlus, History } from 'lucide-react'

function getSkipIntro() {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('skip') === '1'
}

export default function AIEvaluationLandingPage() {
  const router = useRouter()
  const [appState, setAppState] = useState<'locked' | 'opening' | 'idle'>(() => getSkipIntro() ? 'idle' : 'locked')

  const handleEnter = () => {
    setAppState('opening')
    setTimeout(() => setAppState('idle'), 1800)
  }

  const titleLines = [
    "사단법인 기술벤처 스타트업 협회",
    "AI 사업계획서 분석 에이전트"
  ]

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-x-hidden font-sans text-[#404040]">
      {/* ═══ INTRO: Spaceship Doors ═══ */}
      <AnimatePresence>
        {(appState === 'locked' || appState === 'opening') && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
            
            {/* Left Door */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: appState === 'opening' ? '-100%' : 0 }}
              transition={{ duration: 1.5, ease: [0.77, 0, 0.17, 1], delay: 0.2 }}
              className="absolute left-0 top-0 bottom-0 w-1/2 z-20 overflow-hidden bg-[#02040A] border-r border-cyan-500/50 shadow-[10px_0_40px_rgba(6,182,212,0.3)]"
            >
              {/* Full-width image carefully aligned to left */}
              <div className="absolute left-0 top-0 bottom-0 w-[100vw] bg-[url('https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-70 mix-blend-screen blur-[8px]" />
              {/* Techy overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-[#02040A]/50 to-transparent" />
              
              {/* Door mechanism edge */}
              <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_20px_#06b6d4]" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-48 bg-cyan-950/80 border border-cyan-400/50 flex flex-col justify-center items-center rounded-l-lg backdrop-blur-sm z-30">
                <div className="w-1 h-20 bg-cyan-300 shadow-[0_0_15px_#22d3ee] rounded-full" />
              </div>
            </motion.div>

            {/* Right Door */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: appState === 'opening' ? '100%' : 0 }}
              transition={{ duration: 1.5, ease: [0.77, 0, 0.17, 1], delay: 0.2 }}
              className="absolute right-0 top-0 bottom-0 w-1/2 z-20 overflow-hidden bg-[#02040A] border-l border-cyan-500/50 shadow-[-10px_0_40px_rgba(6,182,212,0.3)]"
            >
              {/* Full-width image carefully aligned to right */}
              <div className="absolute right-0 top-0 bottom-0 w-[100vw] bg-[url('https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-70 mix-blend-screen blur-[8px]" />
              {/* Techy overlays */}
              <div className="absolute inset-0 bg-gradient-to-l from-white/5 via-[#02040A]/50 to-transparent" />
              
              {/* Door mechanism edge */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_20px_#06b6d4]" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-48 bg-cyan-950/80 border border-cyan-400/50 flex flex-col justify-center items-center rounded-r-lg backdrop-blur-sm z-30">
                <div className="w-1 h-20 bg-cyan-300 shadow-[0_0_15px_#22d3ee] rounded-full" />
              </div>
            </motion.div>

            {/* Center Glowing White Tech Area */}
            <motion.div 
               initial={{ opacity: 1 }}
               animate={{ opacity: appState === 'opening' ? 0 : 1 }}
               transition={{ duration: 0.5 }}
               className="pointer-events-none absolute inset-0 z-25 flex justify-center items-center"
            >
              <div className="w-[100vw] h-[100vh] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08)_0%,_transparent_60%)] mix-blend-screen" />
            </motion.div>

            {/* Center content */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                opacity: appState === 'opening' ? 0 : 1,
                scale: appState === 'opening' ? 1.15 : 1,
              }}
              transition={{ duration: 1.2, ease: "easeIn" }}
              className="relative z-30 text-center flex flex-col items-center p-8 md:p-16 w-full max-w-5xl"
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mb-8 flex flex-col items-center"
              >
                <div className="w-20 h-[1px] bg-cyan-400 mb-6 shadow-[0_0_10px_#22d3ee]" />
                <span className="text-[12px] md:text-[14px] font-semibold uppercase tracking-[0.3em] text-cyan-200" style={{ textShadow: '0 0 10px rgba(103,232,249,0.5)' }}>
                  Business Plan Evaluation System
                </span>
              </motion.div>
              
              <h1 className="text-[28px] md:text-[42px] lg:text-[48px] font-extrabold text-white tracking-[-0.02em] leading-[1.4] mb-12 break-keep flex flex-col justify-center items-center gap-y-1 md:gap-y-3">
                {titleLines.map((line, lineIndex) => (
                  <div key={lineIndex} className="flex flex-wrap justify-center items-center gap-x-2">
                    {line.split(' ').map((word, wordIndex) => (
                      <span key={wordIndex} className="inline-flex overflow-hidden">
                        {word.split('').map((char, charIndex) => (
                          <motion.span 
                            key={`${lineIndex}-${wordIndex}-${charIndex}`}
                            initial={{ opacity: 0, y: 20, rotateX: 90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: 0.8 + (lineIndex * 0.4) + (wordIndex * 0.15) + (charIndex * 0.05),
                              type: "spring",
                              stiffness: 100
                            }}
                            style={{ display: 'inline-block', textShadow: '0 0 25px rgba(255,255,255,0.6)' }}
                          >
                            {char}
                          </motion.span>
                        ))}
                        &nbsp;
                      </span>
                    ))}
                  </div>
                ))}
              </h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 1 }}
                className="flex flex-col items-center"
              >
                <button
                  onClick={handleEnter}
                  className="group relative px-14 py-5 font-bold tracking-[0.25em] uppercase text-[15px] transition-all duration-500 bg-black/40 backdrop-blur-md text-white border border-cyan-400/60 hover:bg-cyan-900/60 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] overflow-hidden rounded-md"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10 flex items-center">
                    시스템 진입
                    <motion.span 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-block ml-4 text-cyan-300"
                    >
                      &rarr;
                    </motion.span>
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══ LANDING: Hero + CTAs ═══ */}
      {appState === 'idle' && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="min-h-screen relative flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden"
        >
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
             <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-cyan-200/40 blur-[120px] rounded-full mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
             <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-indigo-200/40 blur-[120px] rounded-full mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }} />
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
          </div>

          <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
            {/* Hero */}
            <div className="text-center mb-16 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-white/60 backdrop-blur-md mb-8 shadow-[0_4px_20px_rgba(6,182,212,0.1)]"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-700">
                  Business Plan Evaluation System
                </span>
              </motion.div>

              <h2 className="text-[42px] md:text-[56px] lg:text-[64px] font-extralight text-slate-800 tracking-[-0.03em] leading-[1.2] mb-8">
                AI 심사역이 당신의<br />
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">
                  사업계획서
                </span>를 평가합니다.
              </h2>
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8 opacity-60" />
              <p className="text-[15px] md:text-[17px] text-slate-500 font-normal leading-[1.8] max-w-2xl mx-auto break-keep">
                항목별 점수와 피드백, 구체적인 개선 방향까지.<br />
                <strong className="font-semibold text-slate-700">VC 심사 기준 기반</strong>으로 사업계획서의 작성 품질을 정밀하게 진단합니다.
              </p>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {/* 새 평가 시작 */}
              <motion.button
                onClick={() => router.push('/ai-evaluation/new')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/80 p-10 text-left transition-all duration-500 rounded-[2rem] hover:-translate-y-2 hover:bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.2)]"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                
                <div className="relative z-10 w-full">
                  <div className="w-14 h-14 rounded-2xl border-0 bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <FilePlus className="w-6 h-6 text-cyan-600 group-hover:text-cyan-500 transition-colors" />
                  </div>
                  <h3 className="text-[22px] font-bold tracking-tight text-slate-800 mb-4 flex items-center justify-between">
                    <span>새 평가 시작</span>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-[10px] font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">New</span>
                  </h3>
                  <p className="text-[14px] text-slate-500 font-normal leading-[1.7] mb-10 min-h-[48px] break-keep">
                    사업계획서 PDF를 업로드하면 1~3분 내에 항목별 상세 평가 보고서가 생성됩니다.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-cyan-600 group-hover:text-cyan-500 transition-colors">
                      시작하기
                    </span>
                    <span className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center group-hover:bg-cyan-100 transition-colors group-hover:translate-x-2 duration-300">
                       <span className="text-cyan-600 font-bold block transform group-hover:scale-110 transition-transform">&rarr;</span>
                    </span>
                  </div>
                </div>
              </motion.button>

               {/* 과거 평가 보기 */}
              <motion.button
                onClick={() => router.push('/ai-evaluation/history')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/80 p-10 text-left transition-all duration-500 rounded-[2rem] hover:-translate-y-2 hover:bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(99,102,241,0.2)]"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-500/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                
                <div className="relative z-10 w-full">
                  <div className="w-14 h-14 rounded-2xl border-0 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <History className="w-6 h-6 text-indigo-600 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <h3 className="text-[22px] font-bold tracking-tight text-slate-800 mb-4 flex items-center justify-between">
                    <span>과거 평가 보기</span>
                  </h3>
                  <p className="text-[14px] text-slate-500 font-normal leading-[1.7] mb-10 min-h-[48px] break-keep">
                    이전에 수행한 평가 보고서를 다시 열람하고, AI 어시스턴트에게 질문할 수 있습니다.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-indigo-600 group-hover:text-indigo-500 transition-colors">
                      히스토리
                    </span>
                    <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors group-hover:translate-x-2 duration-300">
                       <span className="text-indigo-600 font-bold block transform group-hover:scale-110 transition-transform">&rarr;</span>
                    </span>
                  </div>
                </div>
              </motion.button>
            </div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 1 }}
               className="mt-16 text-center"
            >
              <p className="text-[11px] text-slate-400 font-semibold tracking-[0.2em] uppercase">
                SIRIUS v2.4 &middot; Powered by Claude Sonnet 4.6
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

