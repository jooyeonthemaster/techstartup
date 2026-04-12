'use client'

import { useCallback, useRef, useState } from 'react'
import { FileText, Upload, X } from 'lucide-react'

// 30MB. Anthropic Files API의 PDF 제한이 32MB이므로 여유 2MB 확보.
const MAX_SIZE = 30 * 1024 * 1024
const MAX_SIZE_LABEL = '30MB'

const ACCEPTED_EXTENSIONS = ['.pdf', '.hwp', '.hwpx', '.pptx', '.ppt', '.docx', '.doc']

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function FileDropzone({
  file,
  onFileChange,
  disabled,
}: {
  file: File | null
  onFileChange: (file: File | null) => void
  disabled?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validate = useCallback((f: File): string | null => {
    const lower = f.name.toLowerCase()
    const hasValidExt = ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext))
    if (!hasValidExt) {
      return 'PDF, HWP, HWPX, PPTX, PPT, DOCX, DOC 파일만 업로드 가능합니다.'
    }
    if (f.size > MAX_SIZE)
      return `파일 크기가 ${MAX_SIZE_LABEL}를 초과합니다. (${formatSize(f.size)})`
    return null
  }, [])

  const handleFile = useCallback(
    (f: File | null) => {
      setError(null)
      if (!f) {
        onFileChange(null)
        return
      }
      const err = validate(f)
      if (err) {
        setError(err)
        onFileChange(null)
        return
      }
      onFileChange(f)
    },
    [onFileChange, validate]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (disabled) return
      const f = e.dataTransfer.files?.[0]
      if (f) handleFile(f)
    },
    [handleFile, disabled]
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragging(true)
    },
    [disabled]
  )

  const handleDragLeave = useCallback(() => setIsDragging(false), [])

  if (file) {
    return (
      <div className="border border-[#0A0A0A] bg-white p-6 flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-[#0A0A0A]" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#0A0A0A] truncate">{file.name}</p>
            <p className="text-[11px] text-[#737373] font-medium mt-0.5">{formatSize(file.size)}</p>
          </div>
        </div>
        <button
          onClick={() => handleFile(null)}
          disabled={disabled}
          className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors disabled:opacity-50"
          aria-label="파일 제거"
        >
          <X className="w-4 h-4 text-[#737373]" />
        </button>
      </div>
    )
  }

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed p-12 text-center cursor-pointer transition-colors ${
          disabled
            ? 'border-[#E5E5E5] bg-[#FAFAFA] cursor-not-allowed'
            : isDragging
              ? 'border-[#1A56DB] bg-[#1A56DB]/5'
              : 'border-[#E5E5E5] bg-white hover:border-[#0A0A0A]'
        }`}
      >
        <div className="w-12 h-12 mx-auto mb-5 border border-[#E5E5E5] flex items-center justify-center">
          <Upload className="w-5 h-5 text-[#A3A3A3]" />
        </div>
        <p className="text-[13px] font-semibold text-[#0A0A0A] mb-2">
          사업계획서를 여기에 드롭하거나 클릭하여 선택
        </p>
        <p className="text-[11px] text-[#737373] font-normal">
          PDF · HWP · HWPX · PPTX · DOCX 허용 · 최대 {MAX_SIZE_LABEL}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS.join(',')}
          className="hidden"
          disabled={disabled}
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
      </div>
      {error && (
        <p className="mt-3 text-[12px] text-[#B91C1C] font-medium">{error}</p>
      )}
    </div>
  )
}
