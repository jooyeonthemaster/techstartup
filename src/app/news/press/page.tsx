'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ExternalLink,
  ChevronRight
} from 'lucide-react'

const pressReleases = [
  {
    id: 1,
    title: '기술벤처스타트업협회, 2025년 유니콘 기업 5개사 배출',
    summary: '협회 지원을 받은 스타트업 중 5개사가 유니콘 기업으로 성장',
    date: '2025-09-05',
    media: '벤처투데이',
    url: 'https://www.fntoday.co.kr/news/articleView.html?idxno=348741',
    views: 5234
  },
  {
    id: 2,
    title: '정부와 함께하는 글로벌 스타트업 진출 프로그램 론칭',
    summary: '중소벤처기업부와 협력하여 국내 스타트업의 해외 진출 지원',
    date: '2025-06-26',
    media: '머니투데이',
    url: 'https://www.mt.co.kr/future/2025/06/26/2025062618222495457',
    views: 3456
  },
  {
    id: 3,
    title: 'AI 기반 스타트업 투자 매칭 플랫폼 정식 오픈',
    summary: 'AI 기술을 활용한 투자자-스타트업 최적 매칭 서비스',
    date: '2025-07-07',
    media: '한국일보',
    url: 'https://www.hankookilbo.com/News/Read/A2025070713310002218',
    views: 2890
  },
  {
    id: 4,
    title: '제3회 K-스타트업 데모데이 성황리 개최',
    summary: '100개 스타트업이 참가한 데모데이에서 총 300억원 규모의 투자',
    date: '2025-01-22',
    media: '머니투데이',
    url: 'https://www.mt.co.kr/future/2025/01/22/2025012216325723187',
    views: 3234
  }
]

export default function PressPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

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
              <h1 className="text-4xl md:text-5xl font-bold text-[#005bac] mb-4">
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
                      ? 'bg-[#005bac] text-white' 
                      : 'text-gray-500 dark:text-gray-500'
                  }`}
                >
                  그리드
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'list' 
                      ? 'bg-[#005bac] text-white' 
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
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 dark:text-gray-500">
                총 <span className="font-bold text-[#005bac]">{pressReleases.length}</span>개의 보도자료
              </p>
            </div>

            {/* Press Releases */}
            <div>
              {viewMode === 'grid' ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {pressReleases.map((release) => (
                    <a 
                      key={release.id} 
                      href={release.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-all duration-300 hover:border-[#005bac] hover:shadow-lg h-full p-6">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-bold text-[#005bac] uppercase tracking-wider">
                              {release.media}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-[#005bac] transition-colors">
                            {release.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {release.summary}
                          </p>

                          <div className="flex items-center justify-end pt-4 border-t border-gray-100 dark:border-gray-900">
                            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#ff6600] transition-all" />
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {pressReleases.map((release) => (
                    <a 
                      key={release.id} 
                      href={release.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 transition-all duration-300 hover:border-[#005bac] hover:shadow-lg">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold text-[#005bac] uppercase tracking-wider">
                              {release.media}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#005bac] transition-colors">
                            {release.title}
                          </h3>

                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {release.summary}
                          </p>

                          <div className="flex items-center justify-end">
                            <div className="flex items-center gap-3">
                              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#ff6600]" />
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#005bac] group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
