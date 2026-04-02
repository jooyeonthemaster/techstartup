'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { NewsCategory, NewsArticleInput } from '@/types/admin'
import AdminHeader from '../../components/AdminHeader'
import ImageUploader from '../../components/ImageUploader'
import TiptapEditor from '../../components/TiptapEditor'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'

interface FormErrors {
  title?: string
  summary?: string
  content?: string
  category?: string
  source_name?: string
  source_url?: string
}

export default function NewsCreatePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // Form state
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<NewsCategory>('notice')
  const [summary, setSummary] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [sourceName, setSourceName] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [content, setContent] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [publishedAt, setPublishedAt] = useState('')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!title.trim()) {
      newErrors.title = '제목을 입력해주세요.'
    }
    if (!summary.trim()) {
      newErrors.summary = '요약을 입력해주세요.'
    }
    if (!content.trim() || content === '<p></p>') {
      newErrors.content = '내용을 입력해주세요.'
    }
    if (category === 'press') {
      if (!sourceName.trim()) {
        newErrors.source_name = '언론사명을 입력해주세요.'
      }
      if (sourceUrl.trim() && !/^https?:\/\/.+/i.test(sourceUrl.trim())) {
        newErrors.source_url = '올바른 URL을 입력해주세요. (https://...)'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePublishToggle = (checked: boolean) => {
    setIsPublished(checked)
    if (checked && !publishedAt) {
      // Auto-fill current datetime
      const now = new Date()
      const offset = now.getTimezoneOffset() * 60000
      const local = new Date(now.getTime() - offset)
      setPublishedAt(local.toISOString().slice(0, 16))
    }
  }

  const handleSave = async () => {
    if (!validate()) return

    setSaving(true)
    try {
      const now = new Date().toISOString()
      const data: NewsArticleInput = {
        title: title.trim(),
        content,
        summary: summary.trim(),
        category,
        image_url: imageUrl,
        source_name: category === 'press' ? sourceName.trim() || null : null,
        source_url: category === 'press' ? sourceUrl.trim() || null : null,
        is_published: isPublished,
        published_at: isPublished && publishedAt
          ? new Date(publishedAt).toISOString()
          : null,
      }

      await addDoc(collection(db, 'news'), {
        ...data,
        created_at: now,
        updated_at: now,
      })

      router.push('/admin/news')
    } catch (error) {
      console.error('뉴스 저장 실패:', error)
      alert('뉴스 저장에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setSaving(false)
    }
  }

  const CATEGORY_OPTIONS: { key: NewsCategory; label: string }[] = [
    { key: 'notice', label: '공지사항' },
    { key: 'press', label: '보도자료' },
    { key: 'event', label: '이벤트' },
  ]

  return (
    <div>
      {/* Back navigation */}
      <Link
        href="/admin/news"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        뉴스 목록으로 돌아가기
      </Link>

      <AdminHeader
        title="새 뉴스 작성"
        description="새로운 보도자료, 공지사항 또는 이벤트를 작성합니다."
      />

      <div className="max-w-4xl">
        <div className="space-y-8">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }))
              }}
              placeholder="뉴스 제목을 입력하세요"
              className={cn(
                'w-full px-4 py-3 text-sm border rounded-xl bg-white focus:outline-none focus:ring-1 transition-all',
                errors.title
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-200 focus:border-[#004094] focus:ring-[#004094]/20'
              )}
            />
            {errors.title && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              {CATEGORY_OPTIONS.map((opt) => (
                <label
                  key={opt.key}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 border rounded-xl cursor-pointer transition-all text-sm',
                    category === opt.key
                      ? 'border-[#004094] bg-[#004094]/5 text-[#004094] font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  )}
                >
                  <input
                    type="radio"
                    name="category"
                    value={opt.key}
                    checked={category === opt.key}
                    onChange={() => setCategory(opt.key)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                      category === opt.key ? 'border-[#004094]' : 'border-gray-300'
                    )}
                  >
                    {category === opt.key && (
                      <span className="w-2 h-2 rounded-full bg-[#004094]" />
                    )}
                  </span>
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
              요약 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => {
                setSummary(e.target.value)
                if (errors.summary) setErrors((prev) => ({ ...prev, summary: undefined }))
              }}
              placeholder="뉴스 요약을 입력하세요 (목록에 표시됩니다)"
              rows={3}
              className={cn(
                'w-full px-4 py-3 text-sm border rounded-xl bg-white focus:outline-none focus:ring-1 transition-all resize-none',
                errors.summary
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-200 focus:border-[#004094] focus:ring-[#004094]/20'
              )}
            />
            {errors.summary && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.summary}
              </p>
            )}
          </div>

          {/* Thumbnail image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              썸네일 이미지
            </label>
            <ImageUploader
              value={imageUrl}
              onChange={setImageUrl}
              folder="news"
              aspectRatio="16/9"
              placeholder="썸네일 이미지를 드래그하거나 클릭하여 업로드"
            />
          </div>

          {/* Press-specific fields */}
          {category === 'press' && (
            <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-5">
              <p className="text-sm font-medium text-blue-800">보도자료 정보</p>

              <div>
                <label htmlFor="sourceName" className="block text-sm font-medium text-gray-700 mb-2">
                  언론사명 <span className="text-red-500">*</span>
                </label>
                <input
                  id="sourceName"
                  type="text"
                  value={sourceName}
                  onChange={(e) => {
                    setSourceName(e.target.value)
                    if (errors.source_name) setErrors((prev) => ({ ...prev, source_name: undefined }))
                  }}
                  placeholder="예: 한국경제, 매일경제, 조선일보"
                  className={cn(
                    'w-full px-4 py-3 text-sm border rounded-xl bg-white focus:outline-none focus:ring-1 transition-all',
                    errors.source_name
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-200 focus:border-[#004094] focus:ring-[#004094]/20'
                  )}
                />
                {errors.source_name && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.source_name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="sourceUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  원문 링크
                </label>
                <input
                  id="sourceUrl"
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => {
                    setSourceUrl(e.target.value)
                    if (errors.source_url) setErrors((prev) => ({ ...prev, source_url: undefined }))
                  }}
                  placeholder="https://example.com/article"
                  className={cn(
                    'w-full px-4 py-3 text-sm border rounded-xl bg-white focus:outline-none focus:ring-1 transition-all',
                    errors.source_url
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-200 focus:border-[#004094] focus:ring-[#004094]/20'
                  )}
                />
                {errors.source_url && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.source_url}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Content - Tiptap Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              본문 <span className="text-red-500">*</span>
            </label>
            <TiptapEditor
              content={content}
              onChange={(html) => {
                setContent(html)
                if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }))
              }}
              placeholder="뉴스 본문을 작성하세요..."
            />
            {errors.content && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.content}
              </p>
            )}
          </div>

          {/* Publish settings */}
          <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-5">
            <p className="text-sm font-medium text-gray-800">게시 설정</p>

            {/* Published toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">게시 상태</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  게시로 설정하면 웹사이트에 공개됩니다.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isPublished}
                onClick={() => handlePublishToggle(!isPublished)}
                className={cn(
                  'relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                  isPublished ? 'bg-[#004094]' : 'bg-gray-200'
                )}
              >
                <span
                  className={cn(
                    'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                    isPublished ? 'translate-x-5' : 'translate-x-0'
                  )}
                />
              </button>
            </div>

            {/* Published at datetime picker */}
            {isPublished && (
              <div>
                <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700 mb-2">
                  게시 일시
                </label>
                <input
                  id="publishedAt"
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full max-w-xs px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-[#004094] focus:ring-1 focus:ring-[#004094]/20 transition-all"
                />
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-4 pb-8">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#004094] text-white text-sm font-medium rounded-xl hover:bg-[#004094]/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? '저장 중...' : '저장'}
            </button>
            <Link
              href="/admin/news"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              취소
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
