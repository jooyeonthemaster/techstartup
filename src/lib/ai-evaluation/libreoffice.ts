// ─────────────────────────────────────────────────────
// LibreOffice headless conversion helper.
//
// Converts HWP / HWPX / PPTX / PPT / DOCX / DOC → PDF using the
// `soffice` binary available inside the Trigger.dev container.
// The H2Orestart extension is pre-installed via aptGet (see
// `trigger.config.ts`) so HWP/HWPX files just need the correct
// `--infilter="Hwp2002_File"` flag.
//
// This module is server-only (uses Node child_process). Import it
// exclusively from Trigger tasks / API routes, NEVER from client code.
// ─────────────────────────────────────────────────────

import { execFile } from 'node:child_process'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { SourceFormat } from '@/types/ai-evaluation'

export class LibreOfficeError extends Error {
  constructor(
    message: string,
    public readonly stdout: string,
    public readonly stderr: string,
    public readonly exitCode: number | null
  ) {
    super(message)
    this.name = 'LibreOfficeError'
  }
}

export interface ConvertResult {
  pdfPath: string
  log: string
  durationMs: number
  converterUsed:
    | 'libreoffice'
    | 'libreoffice-h2orestart'
    | 'direct-pdf'
}

/**
 * Convert an input file (at `inputPath`) to PDF inside `outputDir`.
 * Returns the absolute path of the produced PDF, combined stdout/stderr log,
 * and wall-clock duration in ms.
 *
 * - HWP / HWPX: uses `--infilter="Hwp2002_File"` (routes through H2Orestart).
 * - PPTX / PPT / DOCX / DOC: no infilter, plain `--convert-to pdf`.
 * - PDF: short-circuits — just returns the original path.
 */
export async function convertToPdf(
  inputPath: string,
  outputDir: string,
  sourceFormat: SourceFormat
): Promise<ConvertResult> {
  if (sourceFormat === 'pdf') {
    return {
      pdfPath: inputPath,
      log: '[direct-pdf] skipping conversion',
      durationMs: 0,
      converterUsed: 'direct-pdf',
    }
  }

  await fs.mkdir(outputDir, { recursive: true })

  const needsHwpFilter = sourceFormat === 'hwp' || sourceFormat === 'hwpx'
  const converterUsed: ConvertResult['converterUsed'] = needsHwpFilter
    ? 'libreoffice-h2orestart'
    : 'libreoffice'

  const args: string[] = ['--headless', '--nologo', '--nofirststartwizard']
  if (needsHwpFilter) {
    args.push('--infilter=Hwp2002_File')
  }
  args.push('--convert-to', 'pdf:writer_pdf_Export', inputPath, '--outdir', outputDir)

  const started = Date.now()
  const { stdout, stderr, exitCode } = await runSoffice(args)
  const durationMs = Date.now() - started

  const log = [
    `[soffice] exit=${exitCode} duration=${durationMs}ms`,
    `[args] ${args.join(' ')}`,
    stdout && `[stdout]\n${stdout}`,
    stderr && `[stderr]\n${stderr}`,
  ]
    .filter(Boolean)
    .join('\n')

  // LibreOffice sometimes returns exit code 0 but fails to write the PDF.
  // Always verify the output file exists before declaring success.
  const baseName = path.basename(inputPath, path.extname(inputPath))
  const expectedPdf = path.join(outputDir, `${baseName}.pdf`)

  try {
    const stat = await fs.stat(expectedPdf)
    if (!stat.isFile() || stat.size === 0) {
      throw new LibreOfficeError(
        `LibreOffice 변환 결과가 비어 있습니다: ${expectedPdf}`,
        stdout,
        stderr,
        exitCode
      )
    }
  } catch (err) {
    if (err instanceof LibreOfficeError) throw err
    throw new LibreOfficeError(
      `LibreOffice 변환 결과 파일을 찾지 못했습니다: ${expectedPdf}. exitCode=${exitCode}`,
      stdout,
      stderr,
      exitCode
    )
  }

  if (exitCode !== 0) {
    // Rare case: exit nonzero but output file exists anyway. Log but accept.
    console.warn('[libreoffice] nonzero exit but output present', { exitCode })
  }

  return {
    pdfPath: expectedPdf,
    log,
    durationMs,
    converterUsed,
  }
}

/**
 * execFile wrapper that captures stdout/stderr and never throws on nonzero exit.
 * We handle exit code + output validation in `convertToPdf` to produce a
 * richer error object.
 */
function runSoffice(args: string[]): Promise<{
  stdout: string
  stderr: string
  exitCode: number | null
}> {
  return new Promise((resolve, reject) => {
    execFile(
      'soffice',
      args,
      {
        // 5 minutes hard wall for a single conversion.
        timeout: 5 * 60 * 1000,
        maxBuffer: 16 * 1024 * 1024,
        // Ensure UTF-8 locale for Korean file names.
        // JAVA_TOOL_OPTIONS: H2Orestart가 띄우는 JVM의 heap을 4GB로 제한해서
        // 컨테이너 전체 OOM을 방지한다 (large-1x 8GB RAM 중 절반).
        env: {
          ...process.env,
          LANG: 'ko_KR.UTF-8',
          LC_ALL: 'ko_KR.UTF-8',
          JAVA_TOOL_OPTIONS: '-Xmx4g -Xms512m',
        },
      },
      (err, stdout, stderr) => {
        if (err && typeof (err as NodeJS.ErrnoException).code === 'string') {
          // ENOENT = soffice not installed
          const errno = err as NodeJS.ErrnoException
          if (errno.code === 'ENOENT') {
            reject(
              new LibreOfficeError(
                'soffice 바이너리를 찾을 수 없습니다. Trigger.dev 이미지에 LibreOffice가 설치되었는지 확인하세요.',
                stdout?.toString() ?? '',
                stderr?.toString() ?? '',
                null
              )
            )
            return
          }
        }
        resolve({
          stdout: stdout?.toString() ?? '',
          stderr: stderr?.toString() ?? '',
          // execFile sets err.code to exit code when nonzero.
          exitCode:
            err && typeof (err as NodeJS.ErrnoException & { code: unknown }).code === 'number'
              ? ((err as unknown as { code: number }).code ?? null)
              : 0,
        })
      }
    )
  })
}
