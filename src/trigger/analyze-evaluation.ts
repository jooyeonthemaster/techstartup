// ─────────────────────────────────────────────────────
// Trigger.dev task: analyze-evaluation (v2 multi-agent)
//
// This is the heart of Phase 8. Given an evaluationId, it:
//   1. Loads the Firestore evaluation doc + package.
//   2. Downloads the source file from Firebase Storage.
//   3. If non-PDF (HWP/HWPX/PPTX/DOCX/…), converts to PDF with LibreOffice
//      (H2Orestart extension is preinstalled via aptGet; see trigger.config.ts).
//   4. Uploads the PDF to Anthropic Files API → file_id (reusable across
//      parallel agent calls thanks to prompt caching).
//   5. Runs all N analyst agents in parallel (Promise.allSettled).
//   6. Runs the synthesis agent over the aggregated perspectives.
//   7. Writes tokenUsage, progress, and final status='ready' to Firestore.
//
// All state transitions update `evaluations/{id}` — the client subscribes
// to the doc via onSnapshot for real-time progress.
//
// NOTE: This file is ONLY loaded by the Trigger.dev runtime (Docker image
// built from trigger.config.ts). It MUST NOT be imported from Next.js
// server or client code — the LibreOffice binary is not available there.
// ─────────────────────────────────────────────────────

import { task } from '@trigger.dev/sdk'
import { adminDb, adminStorage } from '@/lib/firebase/admin'
import {
  uploadPdfToFilesApi,
  callAnalysisAgent,
  callSynthesisAgent,
  type ClaudeUsage,
} from '@/lib/ai-evaluation/claude-agent'
import { convertToPdf } from '@/lib/ai-evaluation/libreoffice'
import type {
  EvaluationDoc,
  EvaluationPackage,
  EvaluationProgress,
  EvaluationStatus,
  EvaluationTokenUsage,
  AgentPerspective,
  SourceFormat,
} from '@/types/ai-evaluation'

import * as fs from 'node:fs/promises'
import * as os from 'node:os'
import * as path from 'node:path'
import { randomUUID } from 'node:crypto'

export const analyzeEvaluationTask = task({
  id: 'analyze-evaluation',
  maxDuration: 900, // 15 minutes (conversion + 7 parallel agents + synthesis)
  // LibreOffice + H2Orestart(Java JVM) + 큰 HWP(이미지 많음)는 소화하려면
  // 2GB로 부족 → 실제 OOM 확인 후 large-1x(4 vCPU / 8GB)로 상향.
  machine: { preset: 'large-1x' },
  retry: {
    maxAttempts: 2,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 30000,
    factor: 2,
  },
  run: async (payload: { evaluationId: string }, { ctx }) => {
    const { evaluationId } = payload
    const evalRef = adminDb.doc(`evaluations/${evaluationId}`)

    // Persist trigger run id immediately for debugging.
    await evalRef.update({
      triggerRunId: ctx.run.id,
      updatedAt: new Date().toISOString(),
    })

    // Temp workspace — always cleaned in finally.
    const workDir = path.join(os.tmpdir(), `ktvsa-eval-${randomUUID()}`)
    await fs.mkdir(workDir, { recursive: true })

    try {
      // ── 1. Load evaluation + package ────────────────
      await updateProgress(evalRef, 'converting', {
        percent: 5,
        stageLabel: '평가 정보 로드 중',
      })

      const evalSnap = await evalRef.get()
      if (!evalSnap.exists) {
        throw new Error(`evaluation ${evaluationId} not found`)
      }
      const evalDoc = evalSnap.data() as EvaluationDoc

      const pkgSnap = await adminDb
        .doc(`evaluationPackages/${evalDoc.packageId}`)
        .get()
      if (!pkgSnap.exists) {
        throw new Error(
          `package ${evalDoc.packageId} not found (evaluation ${evaluationId})`
        )
      }
      const pkg = {
        id: pkgSnap.id,
        ...(pkgSnap.data() as Omit<EvaluationPackage, 'id'>),
      }

      if (!pkg.agents || pkg.agents.length === 0) {
        throw new Error(`package ${pkg.id} has no agents`)
      }

      // ── 2. Download source file from Firebase Storage ──
      await updateProgress(evalRef, 'converting', {
        percent: 10,
        stageLabel: '원본 파일 다운로드 중',
      })

      const bucket = adminStorage.bucket()
      const sourcePath = evalDoc.documentMeta.sourceStoragePath
      if (!sourcePath) {
        throw new Error('documentMeta.sourceStoragePath 가 비어 있습니다.')
      }
      const sourceFormat: SourceFormat = evalDoc.documentMeta.sourceFormat
      const localSourcePath = path.join(
        workDir,
        `source.${sourceFormat}`
      )

      const [sourceBuffer] = await bucket.file(sourcePath).download()
      await fs.writeFile(localSourcePath, sourceBuffer)

      // ── 3. LibreOffice conversion (if needed) ─────
      let localPdfPath = localSourcePath
      let conversionLog = '[direct-pdf] already PDF'
      let conversionDurationMs = 0
      let pdfStoragePath = evalDoc.documentMeta.pdfStoragePath

      if (sourceFormat !== 'pdf') {
        await updateProgress(evalRef, 'converting', {
          percent: 15,
          stageLabel: `${sourceFormat.toUpperCase()} → PDF 변환 중 (LibreOffice)`,
        })

        const result = await convertToPdf(
          localSourcePath,
          path.join(workDir, 'converted'),
          sourceFormat
        )
        localPdfPath = result.pdfPath
        conversionLog = result.log
        conversionDurationMs = result.durationMs

        // Upload converted PDF to Storage.
        pdfStoragePath = `evaluations/${evaluationId}/converted.pdf`
        const pdfBuf = await fs.readFile(localPdfPath)
        await bucket.file(pdfStoragePath).save(pdfBuf, {
          contentType: 'application/pdf',
          metadata: {
            metadata: {
              convertedFrom: sourceFormat,
              conversionDurationMs: String(conversionDurationMs),
            },
          },
        })

        await evalRef.update({
          'documentMeta.pdfStoragePath': pdfStoragePath,
          updatedAt: new Date().toISOString(),
        })
      }

      // Record conversion artifact (always).
      try {
        await evalRef.collection('artifacts').add({
          conversionLog,
          converterUsed:
            sourceFormat === 'pdf'
              ? 'direct-pdf'
              : sourceFormat === 'hwp' || sourceFormat === 'hwpx'
                ? 'libreoffice-h2orestart'
                : 'libreoffice',
          conversionDurationMs,
          pdfPageCount: null,
          extractedTextSample: null,
          createdAt: new Date().toISOString(),
        })
      } catch (artifactErr) {
        console.warn('[analyze] failed to write artifact', artifactErr)
      }

      // ── 4. Upload PDF to Anthropic Files API ──────
      await updateProgress(evalRef, 'parsing', {
        percent: 25,
        stageLabel: 'Claude Files API에 PDF 업로드 중',
      })

      const pdfBuf = await fs.readFile(localPdfPath)
      const uploaded = await uploadPdfToFilesApi(
        pdfBuf,
        evalDoc.documentMeta.originalName.replace(/[^\w.\-]+/g, '_') ||
          'document.pdf'
      )

      // Anthropic retains files for ~90 days; store an expiry hint.
      const expiresIso = new Date(
        Date.now() + 90 * 24 * 60 * 60 * 1000
      ).toISOString()

      await evalRef.update({
        'documentMeta.claudeFileId': uploaded.fileId,
        'documentMeta.claudeFileExpiresAt': expiresIso,
        updatedAt: new Date().toISOString(),
      })

      // ── 5. Analyst agents in parallel ─────────────
      const agentStatuses: Record<
        string,
        'pending' | 'running' | 'completed' | 'failed'
      > = {}
      for (const a of pkg.agents) agentStatuses[a.id] = 'running'

      await updateProgress(evalRef, 'analyzing', {
        percent: 30,
        stageLabel: `${pkg.agents.length}명의 에이전트 병렬 분석 시작`,
        agentStatuses,
      })

      const perspectives: Record<string, AgentPerspective> = {}
      const usageByAgent: EvaluationTokenUsage['byAgent'] = {}
      // Full raw usage per agent, retained for accurate total aggregation.
      const rawUsageByAgent: Record<string, ClaudeUsage> = {}

      let completedCount = 0
      const totalAgents = pkg.agents.length

      const agentResults = await Promise.allSettled(
        pkg.agents.map(async (agent) => {
          try {
            const result = await callAnalysisAgent({
              agent,
              sharedPreamble: pkg.sharedPreamble,
              claudeFileId: uploaded.fileId,
              originalFilename: evalDoc.documentMeta.originalName,
            })
            return { agentId: agent.id, result }
          } catch (err) {
            throw Object.assign(err as Error, { agentId: agent.id })
          } finally {
            completedCount += 1
            // Per-agent progress update (one Firestore write per agent).
            const pctRange = 85 - 30
            const percent = 30 + Math.round((completedCount / totalAgents) * pctRange)
            // NOTE: We don't await this intentionally? Actually we do — need
            // ordered visibility. It's cheap (~1 write / agent).
            try {
              await evalRef.update({
                'progress.percent': percent,
                'progress.stageLabel': `에이전트 분석 ${completedCount}/${totalAgents}`,
                'progress.updatedAt': new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              })
            } catch (updateErr) {
              console.warn('[analyze] progress update failed', updateErr)
            }
          }
        })
      )

      for (let i = 0; i < agentResults.length; i++) {
        const r = agentResults[i]
        const agent = pkg.agents[i]
        if (r.status === 'fulfilled') {
          perspectives[agent.id] = r.value.result.perspective
          rawUsageByAgent[agent.id] = r.value.result.usage
          usageByAgent[agent.id] = {
            inputTokens: r.value.result.usage.inputTokens,
            outputTokens: r.value.result.usage.outputTokens,
            cacheReadTokens: r.value.result.usage.cacheReadTokens,
            costUsd: r.value.result.usage.costUsd,
          }
          agentStatuses[agent.id] = 'completed'
          // Individual perspective Firestore write (dotpath).
          try {
            await evalRef.update({
              [`perspectives.${agent.id}`]: r.value.result.perspective,
              [`progress.agentStatuses.${agent.id}`]: 'completed',
              updatedAt: new Date().toISOString(),
            })
          } catch (err) {
            console.warn(`[analyze] perspective write failed for ${agent.id}`, err)
          }
        } else {
          agentStatuses[agent.id] = 'failed'
          console.error(`[analyze] agent ${agent.id} failed:`, r.reason)
          try {
            await evalRef.update({
              [`progress.agentStatuses.${agent.id}`]: 'failed',
              updatedAt: new Date().toISOString(),
            })
          } catch {
            /* ignore */
          }
        }
      }

      const successCount = Object.keys(perspectives).length
      // 실패 에이전트의 실제 에러 메시지를 수집 (디버깅용).
      const failureReasons: string[] = []
      for (let i = 0; i < agentResults.length; i++) {
        const r = agentResults[i]
        if (r.status === 'rejected') {
          const err = r.reason as Error & { agentId?: string }
          const agentId = err?.agentId ?? pkg.agents[i]?.id ?? 'unknown'
          const msg = (err?.message ?? String(err)).slice(0, 300)
          failureReasons.push(`[${agentId}] ${msg}`)
        }
      }
      if (successCount === 0) {
        throw new Error(
          `모든 에이전트가 실패했습니다. (${agentResults.length}/${agentResults.length})\n` +
            failureReasons.join('\n')
        )
      }
      const failureCount = agentResults.length - successCount
      // Hard fail threshold: more than half failed OR <2 remain.
      if (failureCount * 2 > agentResults.length || successCount < 2) {
        throw new Error(
          `너무 많은 에이전트가 실패했습니다. 성공 ${successCount}, 실패 ${failureCount}\n` +
            failureReasons.join('\n')
        )
      }

      // ── 6. Synthesis ──────────────────────────────
      await updateProgress(evalRef, 'synthesizing', {
        percent: 90,
        stageLabel: '종합 에이전트가 최종 리포트 작성 중',
        agentStatuses,
      })

      const synthesisResult = await callSynthesisAgent({
        synthesisPrompt: pkg.synthesisPrompt,
        agents: pkg.agents,
        perspectives,
      })

      // ── 7. Aggregate token usage + finalize ───────
      await updateProgress(evalRef, 'finalizing', {
        percent: 95,
        stageLabel: '결과 저장 중',
        agentStatuses,
      })

      const tokenUsage = buildTotalUsage(
        usageByAgent,
        rawUsageByAgent,
        synthesisResult.usage
      )
      const nowIso = new Date().toISOString()

      await evalRef.update({
        status: 'ready' as EvaluationStatus,
        perspectives,
        synthesis: synthesisResult.synthesis,
        progress: {
          percent: 100,
          stageLabel: '완료',
          agentStatuses,
          updatedAt: nowIso,
        } satisfies EvaluationProgress,
        tokenUsage,
        completedAt: nowIso,
        updatedAt: nowIso,
        errorMessage: null,
        errorStack: null,
      })

      return {
        ok: true,
        evaluationId,
        agentSuccess: successCount,
        agentFailed: failureCount,
        tokenUsage,
      }
    } catch (err) {
      const e = err as Error
      console.error('[analyze-evaluation] FATAL', e)

      try {
        await evalRef.update({
          status: 'error' as EvaluationStatus,
          errorMessage: e.message ?? '알 수 없는 오류',
          errorStack: e.stack ?? null,
          'progress.stageLabel': `오류: ${e.message?.slice(0, 120) ?? ''}`,
          'progress.updatedAt': new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      } catch (updateErr) {
        console.error('[analyze-evaluation] failed to write error state', updateErr)
      }

      throw e
    } finally {
      // Cleanup temp workspace.
      await fs.rm(workDir, { recursive: true, force: true }).catch(() => {})
    }
  },
})

// ────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────

async function updateProgress(
  evalRef: FirebaseFirestore.DocumentReference,
  status: EvaluationStatus,
  progress: Partial<EvaluationProgress> & { percent: number; stageLabel: string }
): Promise<void> {
  const nowIso = new Date().toISOString()
  await evalRef.update({
    status,
    progress: {
      percent: progress.percent,
      stageLabel: progress.stageLabel,
      ...(progress.currentAgent ? { currentAgent: progress.currentAgent } : {}),
      ...(progress.agentStatuses ? { agentStatuses: progress.agentStatuses } : {}),
      updatedAt: nowIso,
    },
    updatedAt: nowIso,
  })
}

function buildTotalUsage(
  byAgent: EvaluationTokenUsage['byAgent'],
  rawByAgent: Record<string, ClaudeUsage>,
  synthesisUsage: ClaudeUsage
): EvaluationTokenUsage {
  let inputTokens = synthesisUsage.inputTokens
  let outputTokens = synthesisUsage.outputTokens
  let cacheCreationTokens = synthesisUsage.cacheCreationTokens
  let cacheReadTokens = synthesisUsage.cacheReadTokens
  let estimatedCostUsd = synthesisUsage.costUsd

  // Aggregate from the raw per-agent usage so cacheCreationTokens
  // (paid by the first agent to populate the cache) is not lost.
  for (const agentId of Object.keys(rawByAgent)) {
    const u = rawByAgent[agentId]
    inputTokens += u.inputTokens
    outputTokens += u.outputTokens
    cacheCreationTokens += u.cacheCreationTokens
    cacheReadTokens += u.cacheReadTokens
    estimatedCostUsd += u.costUsd
  }

  return {
    inputTokens,
    outputTokens,
    cacheCreationTokens,
    cacheReadTokens,
    estimatedCostUsd: +estimatedCostUsd.toFixed(6),
    byAgent,
  }
}
