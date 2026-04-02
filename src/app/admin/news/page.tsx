'use client'

import { useState, useEffect, useMemo } from 'react'
import { onSnapshot, deleteDoc, updateDoc, collection, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { newsDoc } from '@/lib/firebase/collections'
import { deleteImage } from '@/lib/firebase/storage'
import type { NewsArticle, NewsCategory } from '@/types/admin'
import { NEWS_CATEGORY_LABELS, NEWS_CATEGORY_COLORS } from '@/types/admin'
import AdminHeader from '../components/AdminHeader'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  Newspaper,
  FileText,
} from 'lucide-react'

type FilterCategory = 'all' | NewsCategory

const CATEGORY_TABS: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'notice', label: '공지사항' },
  { key: 'press', label: '보도자료' },
  { key: 'event', label: '이벤트' },
]

export default function NewsListPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [togglingPublish, setTogglingPublish] = useState<string | null>(null)

  // Real-time listener
  useEffect(() => {
    // 단순 전체 fetch → JS 필터 (복합 인덱스 불필요)
    const q = query(collection(db, 'news'), orderBy('created_at', 'desc'))
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as NewsArticle))
        if (activeCategory !== 'all') {
          data = data.filter((a) => a.category === activeCategory)
        }
        setArticles(data)
        setLoading(false)
      },
      (error) => {
        console.error('뉴스 데이터 로드 실패:', error)
        setLoading(false)
      }
    )
    return () => unsubscribe()
  }, [activeCategory])

  // Client-side search filter
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles
    const query = searchQuery.toLowerCase()
    return articles.filter((article) =>
      article.title.toLowerCase().includes(query)
    )
  }, [articles, searchQuery])

  // Delete handler
  const handleDelete = async (article: NewsArticle) => {
    const confirmed = window.confirm(
      `"${article.title}" 뉴스를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`
    )
    if (!confirmed) return

    setDeleting(article.id)
    try {
      // Delete associated image if exists
      if (article.image_url) {
        await deleteImage(article.image_url)
      }
      await deleteDoc(newsDoc(article.id))
    } catch (error) {
      console.error('뉴스 삭제 실패:', error)
      alert('뉴스 삭제에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setDeleting(null)
    }
  }

  // Toggle publish status
  const handleTogglePublish = async (article: NewsArticle) => {
    setTogglingPublish(article.id)
    try {
      const newPublished = !article.is_published
      const updateData: Record<string, unknown> = {
        is_published: newPublished,
        updated_at: new Date().toISOString(),
      }

      // Auto-fill published_at when publishing for the first time
      if (newPublished && !article.published_at) {
        updateData.published_at = new Date().toISOString()
      }

      await updateDoc(newsDoc(article.id), updateData)
    } catch (error) {
      console.error('게시 상태 변경 실패:', error)
      alert('게시 상태 변경에 실패했습니다.')
    } finally {
      setTogglingPublish(null)
    }
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    } catch {
      return '-'
    }
  }

  return (
    <div>
      <AdminHeader
        title="뉴스 관리"
        description="보도자료, 공지사항, 이벤트를 등록하고 관리합니다."
        actions={
          <Link
            href="/admin/news/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#004094] text-white text-sm font-medium rounded-xl hover:bg-[#004094]/90 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            새 뉴스 작성
          </Link>
        }
      />

      {/* Category filter tabs */}
      <div className="flex items-center gap-1 mb-6 p-1 bg-gray-100 rounded-xl w-fit">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveCategory(tab.key)
              setLoading(true)
            }}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              activeCategory === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="제목으로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-[#004094] focus:ring-1 focus:ring-[#004094]/20 transition-all"
        />
      </div>

      {/* Content area */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#004094]" />
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            {activeCategory === 'all' ? (
              <Newspaper className="w-8 h-8 text-gray-300" />
            ) : (
              <FileText className="w-8 h-8 text-gray-300" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {searchQuery
              ? '검색 결과가 없습니다'
              : activeCategory === 'all'
                ? '등록된 뉴스가 없습니다'
                : `등록된 ${CATEGORY_TABS.find((t) => t.key === activeCategory)?.label}가 없습니다`}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {searchQuery
              ? '다른 검색어로 시도해보세요.'
              : '새 뉴스를 작성하여 시작하세요.'}
          </p>
          {!searchQuery && (
            <Link
              href="/admin/news/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#004094] text-white text-sm font-medium rounded-xl hover:bg-[#004094]/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              새 뉴스 작성
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[100px_1fr_100px_120px_100px] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div>카테고리</div>
            <div>제목</div>
            <div className="text-center">상태</div>
            <div className="text-center">게시일</div>
            <div className="text-center">관리</div>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-gray-100">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="grid grid-cols-[100px_1fr_100px_120px_100px] gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors"
              >
                {/* Category badge */}
                <div>
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                      NEWS_CATEGORY_COLORS[article.category]
                    )}
                  >
                    {NEWS_CATEGORY_LABELS[article.category]}
                  </span>
                </div>

                {/* Title */}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {article.title}
                  </p>
                  {article.summary && (
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {article.summary}
                    </p>
                  )}
                </div>

                {/* Published status toggle */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(article)}
                    disabled={togglingPublish === article.id}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
                      article.is_published
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    )}
                  >
                    {togglingPublish === article.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : article.is_published ? (
                      <Eye className="w-3 h-3" />
                    ) : (
                      <EyeOff className="w-3 h-3" />
                    )}
                    {article.is_published ? '게시' : '비공개'}
                  </button>
                </div>

                {/* Published date */}
                <div className="text-center text-xs text-gray-500">
                  {formatDate(article.published_at)}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-1">
                  <Link
                    href={`/admin/news/${article.id}/edit`}
                    className="p-2 text-gray-400 hover:text-[#004094] hover:bg-[#004094]/5 rounded-lg transition-colors"
                    title="수정"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(article)}
                    disabled={deleting === article.id}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="삭제"
                  >
                    {deleting === article.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
