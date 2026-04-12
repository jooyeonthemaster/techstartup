'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Loader2, Upload, Check } from 'lucide-react'
import { ref as storageRef, uploadBytesResumable } from 'firebase/storage'

import { useAuth } from '@/contexts/AuthContext'
import { storage } from '@/lib/firebase/config'
import { fetchPackages, ApiError } from '@/lib/ai-evaluation/client'
import type { EvaluationPackage } from '@/types/ai-evaluation'

import PackagePicker from './_components/PackagePicker'
import FileDropzone from './_components/FileDropzone'
import AnalysisQueuePanel, { type QueueItem } from './_components/AnalysisQueuePanel'
import EvaluationDetailModal from './_components/EvaluationDetailModal'

type Step = 'package' | 'file' | 'uploading'

const QUEUE_STORAGE_KEY = 'ai-eval-queue'

function loadQueue(): QueueItem[] {
  try {
    const raw = sessionStorage.getItem(QUEUE_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as QueueItem[]
  } catch {
    return []
  }
}

function saveQueue(items: QueueItem[]) {
  try {
    sessionStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(items))
  } catch { /* quota exceeded etc */ }
}

export default function NewEvaluationPage() {
  const { user, loading: authLoading, signInWithGoogle, signInAsGuest } = useAuth()

  const [step, setStep] = useState<Step>('package')
  const [packages, setPackages] = useState<EvaluationPackage[]>([])
  const [packagesLoading, setPackagesLoading] = useState(true)
  const [packagesError, setPackagesError] = useState<string | null>(null)
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null)

  const [file, setFile] = useState<File | null>(null)

  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStage, setUploadStage] = useState('준비 중...')
  const [submitError, setSubmitError] = useState<string | null>(null)

  // ── Analysis Queue (persisted to sessionStorage) ──
  const [queueItems, setQueueItems] = useState<QueueItem[]>(() => loadQueue())
  const queueRef = useRef<HTMLDivElement>(null)

  // ── Detail Modal ──
  const [modalEvalId, setModalEvalId] = useState<string | null>(null)

  // Sync queue to sessionStorage on change
  useEffect(() => {
    saveQueue(queueItems)
  }, [queueItems])

  // 패키지 로드
  useEffect(() => {
    if (authLoading) return
    if (!user) return
    let cancelled = false
    setPackagesLoading(true)
    fetchPackages({ includeInactive: false })
      .then((list) => {
        if (cancelled) return
        setPackages(list)
        const def = list.find((p) => p.isDefault) ?? list[0] ?? null
        setSelectedPackageId(def?.id ?? null)
        // 활성 패키지가 1개뿐이면 Step 1 스킵하고 바로 파일 업로드로
        if (list.length === 1) {
          setStep('file')
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const msg =
          err instanceof ApiError ? err.message : '평가 패키지 목록을 불러오지 못했습니다.'
        setPackagesError(msg)
      })
      .finally(() => {
        if (!cancelled) setPackagesLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [user, authLoading])

  // 현재 선택된 패키지
  const selectedPackage = packages.find((p) => p.id === selectedPackageId) ?? null

  const handleStart = useCallback(async () => {
    if (!user || !selectedPackageId || !file) return
    setStep('uploading')
    setSubmitError(null)
    setUploadProgress(0)
    setUploadStage('평가 문서 생성 중...')

    try {
      const idToken = await user.getIdToken()

      // 1) prepare: Firestore에 evaluation 문서 생성
      const prepRes = await fetch('/api/ai-evaluation/analyze/prepare', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: selectedPackageId,
          originalName: file.name,
          contentType: file.type || inferContentType(file.name),
          size: file.size,
        }),
      })

      if (!prepRes.ok) {
        const text = await prepRes.text().catch(() => '')
        throw new Error(`prepare 실패: ${text || prepRes.statusText}`)
      }

      const prepJson = (await prepRes.json()) as {
        evaluationId: string
        sourceStoragePath?: string
        storagePath?: string
      }
      const { evaluationId } = prepJson
      const uploadPath = prepJson.sourceStoragePath ?? prepJson.storagePath
      if (!uploadPath) {
        throw new Error('업로드 경로를 확인할 수 없습니다.')
      }

      // 2) Storage 업로드
      setUploadStage('파일 업로드 중...')
      const fileRef = storageRef(storage, uploadPath)
      const task = uploadBytesResumable(fileRef, file, {
        contentType: file.type || inferContentType(file.name),
      })

      await new Promise<void>((resolve, reject) => {
        task.on(
          'state_changed',
          (snap) => {
            const pct = (snap.bytesTransferred / snap.totalBytes) * 100
            setUploadProgress(pct)
          },
          (err) => reject(err),
          () => resolve()
        )
      })

      // 3) commit (fire-and-forget)
      setUploadStage('분석 시작 중...')
      setUploadProgress(100)

      const freshToken = await user.getIdToken()
      fetch('/api/ai-evaluation/analyze/commit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${freshToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ evaluationId }),
      }).catch((err) => {
        console.error('[ai-evaluation] commit failed in background:', err)
      })

      // ── 리다이렉트 대신 큐에 추가 ──
      setQueueItems((prev) => [
        {
          evaluationId,
          packageId: selectedPackageId,
          addedAt: Date.now(),
        },
        ...prev,
      ])

      // Reset form for next upload
      setFile(null)
      setStep('file')
      setUploadProgress(0)
      setUploadStage('준비 중...')

      // Scroll to queue panel
      setTimeout(() => {
        queueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 400)
    } catch (err) {
      const msg = err instanceof Error ? err.message : '알 수 없는 오류'
      setSubmitError(msg)
      setStep('file')
    }
  }, [user, selectedPackageId, file])

  // ── 로딩/로그인 가드 ───────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-[calc(100vh-72px)] mt-[72px] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#737373]" />
      </div>
    )
  }

  if (!user) {
    return <GuestGate onGoogle={signInWithGoogle} onGuest={signInAsGuest} />
  }

  const canGoToFile = !!selectedPackageId
  const canStart = !!selectedPackageId && !!file && step !== 'uploading'

  const hasMultiplePackages = packages.length > 1
  const stepsData: { id: string; label: string }[] = []
  if (hasMultiplePackages) stepsData.push({ id: 'package', label: '평가 패키지 선택' })
  stepsData.push({ id: 'file', label: '사업계획서 업로드' })
  stepsData.push({ id: 'uploading', label: '스마트 분석 진행' })

  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] relative overflow-x-hidden bg-slate-50 font-sans pb-24">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-cyan-200/40 blur-[120px] rounded-full mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-indigo-200/40 blur-[120px] rounded-full mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 pt-10">
        <Link
          href="/ai-evaluation"
          className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-slate-500 hover:text-cyan-600 transition-colors mb-8 bg-white/50 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          평가 홈으로
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Info & Stepper */}
          <div className="lg:col-span-4 lg:pr-8 flex flex-col pt-4">
            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-extrabold tracking-[-0.03em] text-slate-800 mb-6 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600 leading-[1.1]">
              새 사업계획서 평가
            </h1>
            <p className="text-[15px] lg:text-[16px] text-slate-500 font-normal leading-[1.8] mb-16 break-keep max-w-[90%]">
              평가 패키지를 선택하고 사업계획서를 업로드하면, <br className="hidden lg:block"/>
              AI 전문가 에이전트들이 각자의 관점(투자, 기술, 시장 등)에서 다차원적으로 검토한 <strong className="font-bold text-cyan-600">프리미엄 리포트</strong>를 생성합니다.
            </p>

            {/* Vertical Stepper */}
            <div className="flex flex-col gap-2">
              {stepsData.map((s, i) => {
                const number = i + 1;
                const isActive = step === s.id;
                const stepIndex = stepsData.findIndex(x => x.id === step);
                const isDone = stepIndex > i;

                return (
                  <div key={s.id} className="flex flex-col">
                     <div className="flex items-center gap-5">
                       <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-[16px] transition-all duration-500 flex-shrink-0 ${isActive ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] ring-4 ring-cyan-100 scale-110' : isDone ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-200 text-slate-400'}`}>
                         {isDone ? <Check className="w-6 h-6" /> : number}
                       </div>
                       <div>
                         <p className={`text-[17px] xl:text-[19px] font-bold tracking-tight transition-colors ${isActive ? 'text-slate-800' : isDone ? 'text-cyan-700' : 'text-slate-400'}`}>{s.label}</p>
                       </div>
                     </div>
                     {/* connector line */}
                     {i < stepsData.length - 1 && (
                       <div className="w-[2px] h-14 ml-[23px] my-2 bg-gradient-to-b from-slate-200 to-slate-100 overflow-hidden relative">
                         {isDone && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: '100%' }}
                              className="w-full absolute top-0 left-0 bg-cyan-400"
                            />
                         )}
                       </div>
                     )}
                  </div>
                )
              })}
            </div>

            {/* Queue count indicator in sidebar */}
            {queueItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 px-5 py-4 bg-white/70 backdrop-blur-md rounded-2xl border border-cyan-100 shadow-sm"
              >
                <button
                  onClick={() => queueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="w-full flex items-center gap-3 text-left group"
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center">
                      <span className="text-[12px] font-black text-white">{queueItems.length}</span>
                    </div>
                    {queueItems.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
                    )}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-slate-700 group-hover:text-cyan-700 transition-colors">
                      분석 현황 보기
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      아래로 스크롤
                    </p>
                  </div>
                </button>
              </motion.div>
            )}
          </div>

          {/* Right Column: Interaction Card */}
          <div className="lg:col-span-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-3xl rounded-[2.5rem] border border-white shadow-[0_20px_60px_-15px_rgba(6,182,212,0.15)] flex flex-col p-8 lg:p-12 h-full min-h-[600px] overflow-hidden">
               {/* Decorative light glow inside the card */}
               <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-400/20 blur-[60px] rounded-full pointer-events-none" />
               <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-400/10 blur-[60px] rounded-full pointer-events-none" />

               <div className="relative z-10 flex flex-col h-full w-full">
                 <AnimatePresence mode="wait">
                    {step === 'package' && (
                      <motion.div
                        key="package"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full w-full"
                      >
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold">1</div>
                          <h2 className="text-[22px] font-bold text-slate-800">평가 패키지 선택</h2>
                        </div>

                        <div className="flex-1 w-full bg-white/50 backdrop-blur-md rounded-2xl border border-white p-6 overflow-y-auto">
                           {packagesLoading ? (
                             <div className="h-full flex items-center justify-center min-h-[200px]">
                               <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
                             </div>
                           ) : packagesError ? (
                             <div className="h-full flex items-center justify-center p-8 text-center text-red-500 font-medium bg-red-50 rounded-xl min-h-[200px]">
                               {packagesError}
                             </div>
                           ) : (
                             <PackagePicker
                               packages={packages}
                               selectedId={selectedPackageId}
                               onSelect={setSelectedPackageId}
                             />
                           )}
                        </div>

                        <div className="mt-8 flex justify-end">
                          <button
                            onClick={() => setStep('file')}
                            disabled={!canGoToFile}
                            className="group px-8 py-4 bg-slate-800 text-white hover:bg-cyan-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300 rounded-xl text-[14px] font-bold uppercase tracking-[0.1em] flex items-center gap-3 shadow-lg hover:shadow-cyan-500/25"
                          >
                            다음 단계
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 'file' && (
                      <motion.div
                        key="file"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full w-full"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold">
                            {packages.length > 1 ? '2' : '1'}
                          </div>
                          <h2 className="text-[22px] font-bold text-slate-800">사업계획서 업로드</h2>
                        </div>

                        {selectedPackage && (
                          <div className="mb-8 bg-indigo-50/50 border border-indigo-100/50 rounded-2xl px-6 py-5 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 backdrop-blur-sm">
                            <div className="flex-1">
                              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-2">
                                 Selected Package
                              </p>
                              <div className="flex items-center gap-3 mb-1 flex-wrap">
                                <p className="text-[16px] font-extrabold text-slate-800 tracking-tight">
                                  {selectedPackage.name}
                                </p>
                                <span className="px-2 py-0.5 rounded-full bg-slate-200/50 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                                  v{selectedPackage.version}
                                </span>
                                <span className="text-[12px] text-slate-500 font-medium hidden sm:inline-block">
                                  전문 분석 에이전트 {selectedPackage.agents.length}기
                                </span>
                              </div>
                            </div>
                            {packages.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setStep('package')}
                                className="text-[12px] font-bold uppercase tracking-[0.1em] text-indigo-600 hover:text-indigo-800 px-4 py-2 border border-indigo-200 bg-white/60 rounded-lg transition-all hover:bg-white shrink-0"
                              >
                                변경하기
                              </button>
                            )}
                          </div>
                        )}

                        <div className="flex-1 w-full text-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white/50 backdrop-blur-sm min-h-[200px]">
                           <FileDropzone file={file} onFileChange={setFile} />
                        </div>

                        {submitError && (
                          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[14px] font-medium flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                             {submitError}
                          </div>
                        )}

                        <div className="mt-8 flex items-center justify-between">
                          {packages.length > 1 ? (
                            <button
                              onClick={() => setStep('package')}
                              className="px-6 py-4 text-[14px] font-bold uppercase tracking-[0.1em] text-slate-500 hover:bg-slate-100/80 rounded-xl transition-colors flex items-center gap-2"
                            >
                              <ArrowLeft className="w-5 h-5" />
                              이전
                            </button>
                          ) : <div />}

                          <button
                            onClick={handleStart}
                            disabled={!canStart}
                            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:from-cyan-400 hover:to-indigo-400 disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 rounded-xl text-[14px] font-bold uppercase tracking-[0.1em] flex items-center gap-3 shadow-[0_10px_30px_rgba(99,102,241,0.3)] w-full sm:w-auto justify-center"
                          >
                            <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                            스마트 분석 시작
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 'uploading' && (
                      <motion.div
                        key="uploading"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center justify-center h-full w-full py-12"
                      >
                        <div className="relative w-32 h-32 mb-10 flex items-center justify-center shrink-0">
                           <motion.div
                             className="absolute inset-0 bg-cyan-400/20 rounded-full"
                             animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                           />
                           <motion.div
                             className="absolute inset-0 bg-indigo-400/20 rounded-full"
                             animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                           />

                           <div className="relative z-10 w-20 h-20 bg-white/90 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center border border-white">
                             <Upload className="w-8 h-8 text-cyan-600" />
                             <motion.div
                               className="absolute inset-1 rounded-full border border-dashed border-cyan-300"
                               animate={{ rotate: 360 }}
                               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                             />
                           </div>
                        </div>

                        <h2 className="text-[28px] font-extrabold text-slate-800 tracking-tight mb-3">
                           AI 기술검증 에이전트 가동 중
                        </h2>
                        <p className="text-[14px] font-bold text-cyan-600 tracking-[0.2em] uppercase mb-12 animate-pulse">
                          {uploadStage}
                        </p>

                        <div className="w-full max-w-sm bg-white/80 border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col items-center backdrop-blur-md">
                           <div className="flex items-baseline gap-2 mb-6">
                             <span className="text-[72px] font-black text-slate-800 tabular-nums leading-none tracking-tighter drop-shadow-sm">
                               {Math.round(uploadProgress)}
                             </span>
                             <span className="text-[24px] font-bold text-slate-400">%</span>
                           </div>

                           <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner flex relative">
                             <motion.div
                               className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                               animate={{ width: `${uploadProgress}%` }}
                               transition={{ duration: 0.3 }}
                             />
                           </div>
                        </div>
                      </motion.div>
                    )}
                 </AnimatePresence>
               </div>
            </div>
          </div>
        </div>

        {/* ── Analysis Queue Panel ── */}
        {queueItems.length > 0 && (
          <div ref={queueRef} className="mt-16 pt-12 border-t border-slate-200/50">
            <AnalysisQueuePanel
              items={queueItems}
              onRemoveItem={(id) =>
                setQueueItems((prev) => prev.filter((q) => q.evaluationId !== id))
              }
              onOpenDetail={(id) => setModalEvalId(id)}
            />
          </div>
        )}
      </div>

      {/* ── Detail Modal ── */}
      {modalEvalId && (
        <EvaluationDetailModal
          evaluationId={modalEvalId}
          onClose={() => setModalEvalId(null)}
        />
      )}
    </div>
  )
}

const GUEST_PIN = '0000'

function GuestGate({
  onGoogle,
  onGuest,
}: {
  onGoogle: () => Promise<void>
  onGuest: () => Promise<void>
}) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (pin !== GUEST_PIN) {
      setError('비밀번호가 올바르지 않습니다.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await onGuest()
    } catch (err) {
      setError('접속에 실패했습니다. 다시 시도해주세요.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] flex items-center justify-center bg-[#FAFAFA]">
      <div className="w-full max-w-sm px-6">
        <div className="bg-white border border-[#E5E5E5] p-10">
          <h3 className="text-[18px] font-bold text-[#0A0A0A] mb-2 text-center">
            AI 사업계획서 평가
          </h3>
          <p className="text-[13px] text-[#737373] leading-relaxed mb-8 text-center">
            접속 비밀번호를 입력하세요.
          </p>

          <input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError('') }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
            placeholder="비밀번호"
            autoFocus
            className="w-full px-4 py-3 border border-[#E5E5E5] text-[14px] text-center tracking-[0.3em] font-bold text-[#0A0A0A] placeholder:text-[#A3A3A3] placeholder:tracking-normal placeholder:font-normal focus:border-[#0A0A0A] focus:outline-none transition-colors mb-3"
          />

          {error && (
            <p className="text-[12px] text-[#B91C1C] text-center mb-3">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !pin}
            className="w-full px-6 py-3 bg-[#0A0A0A] text-white hover:bg-[#1A56DB] disabled:bg-[#A3A3A3] disabled:cursor-not-allowed transition-colors text-[13px] font-semibold tracking-[0.05em] mb-6"
          >
            {loading ? '접속 중...' : '접속하기'}
          </button>

          <div className="border-t border-[#E5E5E5] pt-5">
            <button
              onClick={() => onGoogle().catch(console.error)}
              className="w-full px-4 py-2.5 border border-[#E5E5E5] text-[12px] font-medium text-[#737373] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors"
            >
              Google 계정으로 로그인
            </button>
          </div>

          <Link
            href="/ai-evaluation"
            className="block mt-4 text-center text-[11px] text-[#A3A3A3] font-medium hover:text-[#0A0A0A] transition-colors"
          >
            돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}

function inferContentType(filename: string): string {
  const lower = filename.toLowerCase()
  if (lower.endsWith('.pdf')) return 'application/pdf'
  if (lower.endsWith('.hwp')) return 'application/x-hwp'
  if (lower.endsWith('.hwpx')) return 'application/vnd.hancom.hwpx'
  if (lower.endsWith('.pptx'))
    return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  if (lower.endsWith('.ppt')) return 'application/vnd.ms-powerpoint'
  if (lower.endsWith('.docx'))
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  if (lower.endsWith('.doc')) return 'application/msword'
  return 'application/octet-stream'
}
