'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ExternalLink, ChevronRight, Loader2 } from 'lucide-react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { NewsArticle } from '@/types/admin'
import { pressReleases } from '@/data/press'
import { format } from 'date-fns'

// Note: 'use client' pages do not support the `dynamic` route segment config.
// Data fetching happens client-side via useEffect, so no server caching applies.

interface DisplayArticle {
  id: string
  title: string
  summary: string
  date: string
  media: string | null
  url: string | null
  isFirestore: boolean
}

function mapFirestoreToDisplay(article: NewsArticle): DisplayArticle {
  return {
    id: article.id,
    title: article.title,
    summary: article.summary,
    date: article.published_at
      ? format(new Date(article.published_at), 'yyyy.MM.dd')
      : '',
    media: article.source_name,
    url: article.source_url,
    isFirestore: true,
  }
}

function mapHardcodedToDisplay(release: (typeof pressReleases)[number]): DisplayArticle {
  return {
    id: String(release.id),
    title: release.title,
    summary: release.summary,
    date: format(new Date(release.date), 'yyyy.MM.dd'),
    media: release.media,
    url: release.url,
    isFirestore: false,
  }
}

export default function PressPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [articles, setArticles] = useState<DisplayArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const snapshot = await getDocs(collection(db, 'news'))

        const firestoreArticles = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as NewsArticle))
          .filter((a) => a.category === 'press' && a.is_published)
          .sort((a, b) => (b.published_at || '').localeCompare(a.published_at || ''))
          .map(mapFirestoreToDisplay)

        if (firestoreArticles.length === 0) {
          setArticles(pressReleases.map(mapHardcodedToDisplay))
        } else {
          setArticles(firestoreArticles)
        }
      } catch (error) {
        console.error('Error fetching press articles:', error)
        // Fallback to hardcoded data on error
        setArticles(pressReleases.map(mapHardcodedToDisplay))
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  function getArticleHref(article: DisplayArticle): string {
    // For Firestore press articles with a source URL, link externally
    if (article.isFirestore && article.url) {
      return article.url
    }
    // For Firestore articles without source URL, link to detail page
    if (article.isFirestore) {
      return `/news/${article.id}`
    }
    // For hardcoded data, always link externally
    return article.url || '#'
  }

  function isExternal(article: DisplayArticle): boolean {
    const href = getArticleHref(article)
    return href.startsWith('http')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Clean Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-950/50" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-bold tracking-[0.4em] text-gray-400 dark:text-gray-600 uppercase mb-4">
                Press Releases
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#004094] mb-4">
                언론 보도
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                협회의 주요 활동과 성과를 언론을 통해 확인하세요
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#004094] text-white'
                      : 'text-gray-500 dark:text-gray-500'
                  }`}
                >
                  그리드
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'list'
                      ? 'bg-[#004094] text-white'
                      : 'text-gray-500 dark:text-gray-500'
                  }`}
                >
                  리스트
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Release Content */}
      <section className="py-16 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#004094] animate-spin" />
              </div>
            ) : (
              <>
                {/* Results Count */}
                <div className="mb-8">
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    총{' '}
                    <span className="font-bold text-[#004094]">
                      {articles.length}
                    </span>
                    개의 보도자료
                  </p>
                </div>

                {/* Press Releases */}
                <div>
                  {viewMode === 'grid' ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {articles.map((article) => {
                        const href = getArticleHref(article)
                        const external = isExternal(article)
                        const Wrapper = external ? 'a' : Link
                        const wrapperProps = external
                          ? {
                              href,
                              target: '_blank' as const,
                              rel: 'noopener noreferrer',
                            }
                          : { href }

                        return (
                          <Wrapper
                            key={article.id}
                            {...wrapperProps}
                            className="group block"
                          >
                            <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-all duration-300 hover:border-[#004094] hover:shadow-lg h-full p-6">
                              <div>
                                <div className="flex items-center gap-3 mb-3">
                                  {article.media && (
                                    <span className="text-xs font-bold text-[#004094] uppercase tracking-wider">
                                      {article.media}
                                    </span>
                                  )}
                                  {article.date && (
                                    <span className="text-xs text-gray-400">
                                      {article.date}
                                    </span>
                                  )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-[#004094] transition-colors line-clamp-2">
                                  {article.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                  {article.summary}
                                </p>

                                <div className="flex items-center justify-end pt-4 border-t border-gray-100 dark:border-gray-900">
                                  {external ? (
                                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#ff6b00] transition-all" />
                                  ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#004094] group-hover:translate-x-1 transition-all" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </Wrapper>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {articles.map((article) => {
                        const href = getArticleHref(article)
                        const external = isExternal(article)
                        const Wrapper = external ? 'a' : Link
                        const wrapperProps = external
                          ? {
                              href,
                              target: '_blank' as const,
                              rel: 'noopener noreferrer',
                            }
                          : { href }

                        return (
                          <Wrapper
                            key={article.id}
                            {...wrapperProps}
                            className="group block"
                          >
                            <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 transition-all duration-300 hover:border-[#004094] hover:shadow-lg">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  {article.media && (
                                    <span className="text-xs font-bold text-[#004094] uppercase tracking-wider">
                                      {article.media}
                                    </span>
                                  )}
                                  {article.date && (
                                    <span className="text-xs text-gray-400">
                                      {article.date}
                                    </span>
                                  )}
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#004094] transition-colors">
                                  {article.title}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                  {article.summary}
                                </p>

                                <div className="flex items-center justify-end">
                                  <div className="flex items-center gap-3">
                                    {external && (
                                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#ff6b00]" />
                                    )}
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#004094] group-hover:translate-x-1 transition-all" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Wrapper>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Empty state */}
                {articles.length === 0 && (
                  <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-16">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 mb-6">
                        <ExternalLink className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        등록된 보도자료가 없습니다
                      </h3>
                      <p className="text-gray-500 dark:text-gray-500">
                        새로운 보도자료가 등록되면 이곳에 표시됩니다.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
