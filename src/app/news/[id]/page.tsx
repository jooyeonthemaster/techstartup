import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { NewsArticle, NEWS_CATEGORY_LABELS, NEWS_CATEGORY_COLORS } from '@/types/admin'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Calendar } from 'lucide-react'
import './news-content.css'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getArticle(id: string): Promise<NewsArticle | null> {
  try {
    const docRef = doc(db, 'news', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return null
    }

    const data = docSnap.data()
    return {
      id: docSnap.id,
      ...data,
    } as NewsArticle
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const article = await getArticle(id)

  if (!article) {
    return {
      title: '기사를 찾을 수 없습니다 | (사)기술벤처스타트업협회',
    }
  }

  return {
    title: `${article.title} | (사)기술벤처스타트업협회`,
    description: article.summary || article.title,
    openGraph: {
      title: article.title,
      description: article.summary || article.title,
      ...(article.image_url && { images: [{ url: article.image_url }] }),
    },
  }
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { id } = await params
  const article = await getArticle(id)

  if (!article) {
    notFound()
  }

  const categoryPath = article.category === 'event' ? 'events' : article.category
  const categoryLabel = NEWS_CATEGORY_LABELS[article.category]
  const categoryColor = NEWS_CATEGORY_COLORS[article.category]
  const publishedDate = article.published_at
    ? format(new Date(article.published_at), 'yyyy.MM.dd')
    : null

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Back link */}
        <nav className="mb-8">
          <Link
            href={`/news/${categoryPath}`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#004094] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>목록으로</span>
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${categoryColor}`}
            >
              {categoryLabel}
            </span>
            {publishedDate && (
              <time className="flex items-center gap-1.5 text-sm text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                {publishedDate}
              </time>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            {article.title}
          </h1>
        </header>

        {/* Thumbnail */}
        {article.image_url && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 bg-gray-100">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Source attribution for press articles */}
        {article.category === 'press' && article.source_name && (
          <div className="mb-8 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              출처:{' '}
              <span className="font-semibold text-gray-800">{article.source_name}</span>
            </p>
            {article.source_url && (
              <a
                href={article.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#004094] hover:text-[#ff6b00] transition-colors whitespace-nowrap"
              >
                원문 보기
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        {/* Content */}
        {article.content && (
          <div
            className="tiptap-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}

        {/* Footer divider and back link */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href={`/news/${categoryPath}`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#004094] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>목록으로 돌아가기</span>
          </Link>
        </div>
      </article>
    </div>
  )
}
