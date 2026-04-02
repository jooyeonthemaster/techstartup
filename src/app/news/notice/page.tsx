'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Calendar, ChevronRight, Loader2 } from 'lucide-react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { NewsArticle } from '@/types/admin'
import { format } from 'date-fns'

// Note: 'use client' pages do not support the `dynamic` route segment config.
// Data fetching happens client-side via useEffect, so no server caching applies.

interface NoticeItem {
  id: string
  title: string
  summary: string
  date: string
}

export default function NoticePage() {
  const [notices, setNotices] = useState<NoticeItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNotices() {
      try {
        const snapshot = await getDocs(collection(db, 'news'))

        const items: NoticeItem[] = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as NewsArticle))
          .filter((a) => a.category === 'notice' && a.is_published)
          .sort((a, b) => (b.published_at || '').localeCompare(a.published_at || ''))
          .map((data) => ({
            id: data.id,
            title: data.title,
            summary: data.summary,
            date: data.published_at
              ? format(new Date(data.published_at), 'yyyy.MM.dd')
              : '',
          }))

        setNotices(items)
      } catch (error) {
        console.error('Error fetching notices:', error)
        setNotices([])
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Clean Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-950/50" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-bold tracking-[0.4em] text-gray-400 dark:text-gray-600 uppercase mb-4">
                Notice Board
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#004094] mb-4">
                공지사항
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                협회의 중요한 소식과 안내사항
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notice List */}
      <section className="py-16 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#004094] animate-spin" />
              </div>
            ) : notices.length > 0 ? (
              <>
                {/* Results Count */}
                <div className="mb-8">
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    총{' '}
                    <span className="font-bold text-[#004094]">
                      {notices.length}
                    </span>
                    개의 공지사항
                  </p>
                </div>

                {/* Notice Items */}
                <div className="space-y-3">
                  {notices.map((notice, index) => (
                    <Link
                      key={notice.id}
                      href={`/news/${notice.id}`}
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 transition-all duration-300 hover:border-[#004094] hover:shadow-lg">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">
                                공지
                              </span>
                              {notice.date && (
                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                  <Calendar className="w-3 h-3" />
                                  {notice.date}
                                </span>
                              )}
                              {index === 0 && (
                                <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-red-500 text-white">
                                  NEW
                                </span>
                              )}
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1.5 group-hover:text-[#004094] transition-colors truncate">
                              {notice.title}
                            </h3>

                            {notice.summary && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {notice.summary}
                              </p>
                            )}
                          </div>

                          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#004094] group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-16">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 mb-6">
                    <FileText className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    등록된 공지사항이 없습니다
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    새로운 공지사항이 등록되면 이곳에 표시됩니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
