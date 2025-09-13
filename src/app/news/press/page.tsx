'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Newspaper,
  Calendar,
  Eye,
  Search,
  Download,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Share2,
  Clock,
  Building2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

const pressReleases = [
  {
    id: 1,
    title: '기술벤처스타트업협회, 2024년 유니콘 기업 5개사 배출',
    summary: '협회 지원을 받은 스타트업 중 5개사가 유니콘 기업으로 성장하며 국내 스타트업 생태계 발전에 기여',
    date: '2024-01-20',
    media: 'TechCrunch Korea',
    category: '성과발표',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=200&fit=crop',
    views: 2456,
    downloads: 156,
    featured: true
  },
  {
    id: 2,
    title: '정부와 함께하는 글로벌 스타트업 진출 프로그램 론칭',
    summary: '중소벤처기업부와 협력하여 국내 스타트업의 해외 진출을 위한 종합 지원 프로그램을 시작합니다',
    date: '2024-01-18',
    media: '연합뉴스',
    category: '사업발표',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=200&fit=crop',
    views: 1834,
    downloads: 98,
    featured: true
  },
  {
    id: 3,
    title: '스타트업 투자 매칭 플랫폼 정식 오픈',
    summary: 'AI 기반 투자자-스타트업 매칭 서비스를 통해 투자 효율성을 크게 향상시킬 것으로 기대',
    date: '2024-01-15',
    media: '이코노미스트',
    category: '서비스출시',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop',
    views: 1245,
    downloads: 67,
    featured: false
  },
  {
    id: 4,
    title: '제3회 스타트업 데모데이 성황리 개최',
    summary: '100개 스타트업이 참가한 데모데이에서 총 200억원 규모의 투자 약정이 이뤄졌습니다',
    date: '2024-01-12',
    media: '벤처스퀘어',
    category: '행사소식',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
    views: 1876,
    downloads: 234,
    featured: false
  },
  {
    id: 5,
    title: '협회-대기업 상생 협력 MOU 체결',
    summary: '대기업과의 오픈이노베이션 프로그램을 통해 스타트업 성장 기회를 확대합니다',
    date: '2024-01-10',
    media: '조선비즈',
    category: '협력체결',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop',
    views: 1567,
    downloads: 89,
    featured: false
  }
]

const categories = ['전체', '성과발표', '사업발표', '서비스출시', '행사소식', '협력체결']

export default function PressPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredReleases = pressReleases.filter(release => {
    const matchesCategory = selectedCategory === '전체' || release.category === selectedCategory
    const matchesSearch = release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         release.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalPages = Math.ceil(filteredReleases.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReleases = filteredReleases.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-red-600/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-purple-600 transition-colors">
                홈
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/news" className="hover:text-purple-600 transition-colors">
                협회소식
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">보도자료</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  보도자료
                </h1>
                <p className="text-lg text-gray-600">
                  협회의 주요 활동과 성과를 언론을 통해 확인하세요
                </p>
              </div>
            </div>

            {/* Back Button */}
            <Link href="/news">
              <Button variant="outline" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                협회소식으로 돌아가기
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category)
                    setCurrentPage(1)
                  }}
                  className={selectedCategory === category ? 
                    "bg-purple-600 text-white" : 
                    "text-gray-600 hover:text-purple-600"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="제목 또는 내용으로 검색..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Press Release Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600">
                총 <span className="font-semibold text-purple-600">{filteredReleases.length}</span>개의 보도자료
              </p>
              <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                <Download className="w-4 h-4 mr-2" />
                전체 다운로드
              </Button>
            </div>

            {/* Featured Release */}
            {paginatedReleases.some(release => release.featured) && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">주요 보도자료</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {paginatedReleases.filter(release => release.featured).map((release, index) => (
                    <motion.div
                      key={release.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                        <div className="aspect-video relative overflow-hidden">
                          <Image
                            src={release.image}
                            alt={release.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-purple-600 text-white">
                              주요
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <Badge variant="outline" className="text-purple-600 border-purple-200 mb-3">
                            {release.category}
                          </Badge>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                            {release.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {release.summary}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                {release.media}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {release.date}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Releases */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">전체 보도자료</h2>
              <div className="space-y-4">
                {paginatedReleases.map((release, index) => (
                  <motion.div
                    key={release.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="w-32 h-20 relative overflow-hidden rounded-lg flex-shrink-0">
                            <Image
                              src={release.image}
                              alt={release.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline" className="text-purple-600 border-purple-200">
                                {release.category}
                              </Badge>
                              <span className="text-sm text-gray-500">{release.media}</span>
                            </div>
                            
                            <h3 className="text-lg font-bold mb-2 group-hover:text-purple-600 transition-colors cursor-pointer">
                              {release.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {release.summary}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {release.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {release.views.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Download className="w-4 h-4" />
                                  {release.downloads}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline">
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  원문보기
                                </Button>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  이전
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-purple-600 text-white" : ""}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  다음
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}