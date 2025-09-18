'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Calendar,
  Eye,
  Search,
  ChevronRight,
  FileText,
  TrendingUp,
  Megaphone
} from 'lucide-react'

const notices = [
  {
    id: 1,
    title: '[제8회 2025년 대한민국 강소기업 대상] 접수 안내',
    content: '2025년도 대한민국 강소기업 대상 접수가 시작되었습니다. 기술벤처스타트업 회원사 여러분의 많은 참여 바랍니다.',
    date: '2025-09-01',
    category: '행사',
    views: 3456,
    isPinned: true,
    isNew: true
  },
  {
    id: 2,
    title: '[강기업 사관학교] 멀티 관리자 기획력 향상 과정 모집',
    content: '강기업 사관학교에서 멀티 관리자 기획력 향상 과정 참가자를 모집합니다. 실무 중심의 교육 프로그램으로 구성되어 있습니다.',
    date: '2025-08-28',
    category: '교육',
    views: 2134,
    isPinned: true,
    isNew: true
  },
  {
    id: 3,
    title: '추석 선물세트 판매 안내',
    content: '2025년 추석 맞이 회원사 특별 할인 선물세트를 판매합니다. 회원사 간 상생협력의 일환으로 진행됩니다.',
    date: '2025-08-25',
    category: '일반',
    views: 1567,
    isPinned: false,
    isNew: true
  },
  {
    id: 4,
    title: '2025년 하반기 스타트업 지원사업 모집',
    content: '기술벤처스타트업을 위한 하반기 지원사업 모집이 시작됩니다. AI/DX 분야 우대지원 예정입니다.',
    date: '2025-08-20',
    category: '지원사업',
    views: 4892,
    isPinned: false,
    isNew: false
  },
  {
    id: 5,
    title: '협회 정기총회 개최 안내',
    content: '2025년 정기총회를 9월 15일 개최합니다. 회원사 대표님들의 참석을 부탁드립니다.',
    date: '2025-08-15',
    category: '행사',
    views: 2103,
    isPinned: false,
    isNew: false
  },
  {
    id: 6,
    title: '신규 회원사 가입 혜택 안내',
    content: '2025년 하반기 신규 회원사 가입 시 특별 혜택을 제공합니다. 네트워킹 프로그램 우선 참여 기회를 드립니다.',
    date: '2025-08-10',
    category: '일반',
    views: 1823,
    isPinned: false,
    isNew: false
  },
  {
    id: 7,
    title: 'AI 스타트업 액셀러레이팅 프로그램 참가자 모집',
    content: 'AI 분야 스타트업을 위한 전문 액셀러레이팅 프로그램을 운영합니다. 3개월 집중 육성 과정입니다.',
    date: '2025-08-05',
    category: '지원사업',
    views: 3421,
    isPinned: false,
    isNew: false
  }
]

const categories = [
  { id: 'all', label: '전체', icon: FileText },
  { id: '행사', label: '행사', icon: Megaphone },
  { id: '교육', label: '교육', icon: TrendingUp },
  { id: '지원사업', label: '지원사업', icon: TrendingUp },
  { id: '일반', label: '일반', icon: FileText }
]

export default function NoticePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Separate pinned and regular notices
  const pinnedNotices = filteredNotices.filter(n => n.isPinned)
  const regularNotices = filteredNotices.filter(n => !n.isPinned)
  
  const totalPages = Math.ceil(regularNotices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNotices = regularNotices.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Ultra Minimal Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-950/50" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto">
            {/* Minimal Header */}
            <div className="mb-12">
              <p className="text-xs font-bold tracking-[0.4em] text-gray-400 dark:text-gray-600 uppercase mb-4">
                Notice Board
              </p>
              <h1 className="text-4xl md:text-5xl font-extralight text-gray-900 dark:text-gray-100 mb-4">
                공지사항
              </h1>
              <p className="text-lg font-light text-gray-600 dark:text-gray-400">
                협회의 중요한 소식과 안내사항
              </p>
            </div>

            {/* Search Bar removed */}
          </div>
        </div>
      </section>

      {/* Category Tabs removed */}

      {/* Notice List - Modern Grid Layout */}
      <section className="py-16 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Results Count */}
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-500">
                총 <span className="font-bold text-gray-900 dark:text-gray-100">{filteredNotices.length}</span>개의 공지
              </p>
            </div>

            {/* Pinned Notices - Featured Style */}
            {pinnedNotices.length > 0 && (
              <div className="mb-8">
                <div className="grid gap-4">
                  {pinnedNotices.map((notice) => (
                    <Link 
                      key={notice.id} 
                      href={`/news/notice/${notice.id}`}
                      className="group relative block"
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50 p-6 transition-all duration-500 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700">
                        {/* Pin Badge */}
                        <div className="absolute top-6 right-6">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold">
                            PINNED
                          </span>
                        </div>

                        <div className="pr-24">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-wider">
                              {notice.category}
                            </span>
                            {notice.isNew && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold">
                                NEW
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-400 transition-all">
                            {notice.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                            {notice.content}
                          </p>

                          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{notice.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5" />
                              <span>{notice.views.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Hover Arrow */}
                          <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Notices - Clean List */}
            <div className="space-y-2">
              {paginatedNotices.map((notice, index) => (
                <Link 
                  key={notice.id} 
                  href={`/news/notice/${notice.id}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-900 bg-white/50 dark:bg-black/50 p-5 transition-all duration-500 hover:border-gray-200 dark:hover:border-gray-800 hover:bg-white dark:hover:bg-black hover:shadow-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em]">
                            {notice.category}
                          </span>
                          {notice.isNew && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400">
                              NEW
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1.5 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                          {notice.title}
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-3">
                          {notice.content}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-600">
                          <span>{notice.date}</span>
                          <span>조회 {notice.views.toLocaleString()}</span>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-gray-500 dark:group-hover:text-gray-500 group-hover:translate-x-1 transition-all mt-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination - Minimal Style */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  이전
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                        currentPage === page
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                          : 'text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  다음
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}