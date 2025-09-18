'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Calendar,
  Eye,
  Download,
  ChevronRight,
  ExternalLink,
  Share2
} from 'lucide-react'

const pressReleases = [
  {
    id: 1,
    title: '기술벤처스타트업협회, 2025년 유니콘 기업 5개사 배출',
    summary: '협회 지원을 받은 스타트업 중 5개사가 유니콘 기업으로 성장하며 국내 스타트업 생태계 발전에 기여',
    content: '기술벤처스타트업협회가 지원한 회원사 중 5개 기업이 2025년 유니콘 기업 반열에 올랐습니다. 이는 협회의 체계적인 지원 프로그램과 네트워킹 플랫폼이 스타트업 성장에 실질적인 도움을 주고 있음을 보여주는 성과입니다.',
    date: '2025-09-05',
    media: 'TechCrunch Korea',
    mediaLogo: '/images/media/techcrunch.png',
    category: '성과발표',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop',
    views: 5234,
    shares: 342,
    featured: true,
    tags: ['유니콘', '스타트업', '성장']
  },
  {
    id: 2,
    title: '정부와 함께하는 글로벌 스타트업 진출 프로그램 론칭',
    summary: '중소벤처기업부와 협력하여 국내 스타트업의 해외 진출을 위한 종합 지원 프로그램을 시작합니다',
    content: '기술벤처스타트업협회와 중소벤처기업부가 손을 잡고 국내 스타트업의 글로벌 진출을 지원하는 대규모 프로그램을 론칭했습니다. 이번 프로그램은 해외 시장 조사, 현지화 지원, 투자 유치 등 종합적인 지원을 제공합니다.',
    date: '2025-09-03',
    media: '연합뉴스',
    mediaLogo: '/images/media/yonhap.png',
    category: '사업발표',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop',
    views: 3456,
    shares: 234,
    featured: true,
    tags: ['글로벌', '정부지원', '해외진출']
  },
  {
    id: 3,
    title: 'AI 기반 스타트업 투자 매칭 플랫폼 정식 오픈',
    summary: 'AI 기술을 활용한 투자자-스타트업 최적 매칭 서비스를 통해 투자 효율성을 크게 향상',
    content: '협회가 개발한 AI 기반 투자 매칭 플랫폼이 정식 오픈했습니다. 이 플랫폼은 스타트업의 사업 모델, 성장 가능성, 투자자의 선호도를 분석하여 최적의 매칭을 제공합니다.',
    date: '2025-08-28',
    media: '이코노미스트',
    mediaLogo: '/images/media/economist.png',
    category: '서비스출시',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
    views: 2890,
    shares: 156,
    featured: false,
    tags: ['AI', '투자', '플랫폼']
  },
  {
    id: 4,
    title: '제3회 K-스타트업 데모데이 성황리 개최',
    summary: '100개 스타트업이 참가한 데모데이에서 총 300억원 규모의 투자 약정이 이뤄졌습니다',
    content: '기술벤처스타트업협회가 주최한 제3회 K-스타트업 데모데이가 성황리에 마무리되었습니다. 이번 행사에서는 100개의 유망 스타트업이 참가하여 투자자들에게 비즈니스 모델을 선보였습니다.',
    date: '2025-08-25',
    media: '벤처스퀘어',
    mediaLogo: '/images/media/venturesquare.png',
    category: '행사소식',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
    views: 3234,
    shares: 278,
    featured: false,
    tags: ['데모데이', '투자', '행사']
  },
  {
    id: 5,
    title: '대기업-스타트업 오픈이노베이션 프로그램 MOU 체결',
    summary: '삼성전자, LG, SK 등 주요 대기업과 스타트업 상생 협력을 위한 업무협약 체결',
    content: '기술벤처스타트업협회가 국내 주요 대기업들과 오픈이노베이션 프로그램 운영을 위한 MOU를 체결했습니다. 이를 통해 스타트업들은 대기업의 인프라와 네트워크를 활용할 수 있게 됩니다.',
    date: '2025-08-20',
    media: '조선비즈',
    mediaLogo: '/images/media/chosunbiz.png',
    category: '협력체결',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop',
    views: 2567,
    shares: 189,
    featured: false,
    tags: ['대기업', '협력', 'MOU']
  },
  {
    id: 6,
    title: '스타트업 세무·회계 지원 센터 개소',
    summary: '초기 스타트업을 위한 무료 세무·회계 컨설팅 서비스 제공 시작',
    content: '협회가 스타트업 전문 세무·회계 지원 센터를 개소했습니다. 회원사들은 무료로 전문가 상담을 받을 수 있으며, 세무 신고와 회계 처리를 지원받을 수 있습니다.',
    date: '2025-08-15',
    media: '매일경제',
    mediaLogo: '/images/media/mk.png',
    category: '서비스출시',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    views: 1923,
    shares: 98,
    featured: false,
    tags: ['세무', '회계', '지원']
  }
]

// Category UI removed; keep simple listing

export default function PressPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const itemsPerPage = 6

  const filteredReleases = pressReleases.filter(release => {
    const matchesCategory = selectedCategory === 'all' || release.category === selectedCategory
    const matchesSearch = release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         release.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Separate featured and regular releases
  const featuredReleases = filteredReleases.filter(r => r.featured)
  const regularReleases = filteredReleases.filter(r => !r.featured)
  
  const totalPages = Math.ceil(regularReleases.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReleases = regularReleases.slice(startIndex, startIndex + itemsPerPage)

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
                Press Releases
              </p>
              <h1 className="text-4xl md:text-5xl font-extralight text-gray-900 dark:text-gray-100 mb-4">
                보도자료
              </h1>
              <p className="text-lg font-light text-gray-600 dark:text-gray-400">
                협회의 주요 활동과 성과를 언론을 통해 확인하세요
              </p>
            </div>

            {/* View Mode Toggle only */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/50 backdrop-blur-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' 
                      : 'text-gray-500 dark:text-gray-500'
                  }`}
                >
                  그리드
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'list' 
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' 
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

      {/* Category Tabs removed */}

      {/* Press Release Content */}
      <section className="py-16 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Results Count */}
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-500">
                총 <span className="font-bold text-gray-900 dark:text-gray-100">{filteredReleases.length}</span>개의 보도자료
              </p>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-sm font-medium text-gray-600 dark:text-gray-400">
                <Download className="w-4 h-4" />
                전체 다운로드
              </button>
            </div>

            {/* Featured Releases - Card Style */}
            {featuredReleases.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xs font-bold tracking-[0.3em] text-gray-400 dark:text-gray-600 uppercase mb-6">
                  Featured Press
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredReleases.map((release) => (
                    <Link 
                      key={release.id} 
                      href={`/news/press/${release.id}`}
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50 transition-all duration-500 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700">
                        {/* Featured Badge */}
                        <div className="absolute top-6 right-6 z-10">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold">
                            FEATURED
                          </span>
                        </div>

                        {/* Image */}
                        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                          <Image
                            src={release.image}
                            alt={release.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-wider">
                              {release.category}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-600">
                              {release.media}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-400 transition-all">
                            {release.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                            {release.summary}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {release.tags.map((tag, idx) => (
                              <span key={idx} className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold rounded-md bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-900">
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{release.date}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5" />
                                <span>{release.views.toLocaleString()}</span>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Releases - Grid or List View */}
            <div>
              <h2 className="text-xs font-bold tracking-[0.3em] text-gray-400 dark:text-gray-600 uppercase mb-6">
                All Press Releases
              </h2>
              
              {viewMode === 'grid' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedReleases.map((release) => (
                    <Link 
                      key={release.id} 
                      href={`/news/press/${release.id}`}
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-900 bg-white/50 dark:bg-black/50 transition-all duration-500 hover:border-gray-200 dark:hover:border-gray-800 hover:bg-white dark:hover:bg-black hover:shadow-lg h-full">
                        {/* Image */}
                        <div className="relative aspect-video overflow-hidden bg-gray-50 dark:bg-gray-950">
                          <Image
                            src={release.image}
                            alt={release.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent dark:from-black/90" />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em]">
                              {release.category}
                            </span>
                            <span className="text-[10px] text-gray-400 dark:text-gray-600">•</span>
                            <span className="text-[10px] text-gray-400 dark:text-gray-600">
                              {release.media}
                            </span>
                          </div>

                          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                            {release.title}
                          </h3>

                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                            {release.summary}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-600">
                            <span>{release.date}</span>
                            <div className="flex items-center gap-3">
                              <span>조회 {release.views.toLocaleString()}</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedReleases.map((release) => (
                    <Link 
                      key={release.id} 
                      href={`/news/press/${release.id}`}
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-900 bg-white/50 dark:bg-black/50 p-6 transition-all duration-500 hover:border-gray-200 dark:hover:border-gray-800 hover:bg-white dark:hover:bg-black hover:shadow-lg">
                        <div className="flex gap-6">
                          {/* Thumbnail */}
                          <div className="relative w-40 h-24 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-950 flex-shrink-0">
                            <Image
                              src={release.image}
                              alt={release.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em]">
                                {release.category}
                              </span>
                              <span className="text-xs text-gray-400 dark:text-gray-600">
                                {release.media}
                              </span>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                              {release.title}
                            </h3>

                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                              {release.summary}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-600">
                                <span>{release.date}</span>
                                <span>조회 {release.views.toLocaleString()}</span>
                                <span>공유 {release.shares}</span>
                              </div>

                              <div className="flex items-center gap-3">
                                <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                                  <Share2 className="w-3.5 h-3.5 text-gray-400 dark:text-gray-600" />
                                </button>
                                <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 dark:text-gray-600" />
                                </button>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
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