'use client'

import { useState, useCallback, useRef } from 'react'
import { Upload, X, Loader2, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { uploadImage, deleteImage } from '@/lib/firebase/storage'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  value: string | null
  onChange: (url: string | null) => void
  folder: 'banners' | 'popups' | 'news'
  aspectRatio?: string
  className?: string
  placeholder?: string
}

export default function ImageUploader({
  value,
  onChange,
  folder,
  aspectRatio = '16/9',
  className,
  placeholder = '이미지를 드래그하거나 클릭하여 업로드',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('파일 크기는 10MB를 초과할 수 없습니다.')
      return
    }

    setError(null)
    setUploading(true)

    try {
      // 기존 이미지가 있으면 삭제
      if (value) {
        await deleteImage(value)
      }

      const url = await uploadImage(file, folder)
      onChange(url)
    } catch (err) {
      console.error('업로드 실패:', err)
      setError('이미지 업로드에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setUploading(false)
    }
  }, [value, onChange, folder])

  const handleRemove = useCallback(async () => {
    if (value) {
      try {
        await deleteImage(value)
      } catch {
        // ignore deletion errors
      }
    }
    onChange(null)
  }, [value, onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }, [handleUpload])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
    // reset input to allow re-upload of same file
    e.target.value = ''
  }, [handleUpload])

  return (
    <div className={cn('relative', className)}>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <div style={{ aspectRatio }} className="relative">
            <Image
              src={value}
              alt="업로드된 이미지"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 hover:bg-white rounded-lg text-xs font-medium text-gray-700 shadow-sm transition-colors"
          >
            변경
          </button>
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            'border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 flex flex-col items-center justify-center',
            dragOver ? 'border-[#004094] bg-[#004094]/5' : 'border-gray-300 hover:border-gray-400 bg-gray-50',
            uploading && 'cursor-not-allowed opacity-60'
          )}
          style={{ aspectRatio }}
        >
          {uploading ? (
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#004094] mx-auto mb-2" />
              <p className="text-sm text-gray-500">업로드 중...</p>
            </div>
          ) : (
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                {dragOver ? (
                  <Upload className="w-6 h-6 text-[#004094]" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <p className="text-sm text-gray-500 mb-1">{placeholder}</p>
              <p className="text-xs text-gray-400">PNG, JPG, WebP (최대 10MB)</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
