'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Bell,
  Calendar,
  Eye,
  Search,
  Filter,
  ChevronRight,
  ArrowLeft,
  Paperclip,
  Clock,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

const notices = [
  {
    id: 1,
    title: '2024년 스타트업 지원사업 모집 공고',
    content: '2024년도 기술벤처스타트업협회 주요 지원사업 모집을 시작합니다. 많은 참여 바랍니다.',
    date: '2024-01-15',
    category: '모집공고',
    views: 1234,
    important: true,
    hasAttachment: true
  },
  {
    id: 2,
    title: '협회 정기총회 개최 안내',
    content: '2024년 정기총회를 다음과 같이 개최하오니 회원사 여러분의 많은 참석 바랍니다.',
    date: '2024-01-12',
    category: '행사안내',
    views: 856,
    important: true,
    hasAttachment: false
  },
  {
    id: 3,
    title: '신규 회원사 가입 절차 변경 안내',
    content: '효율적인 회원사 관리를 위해 가입 절차가 일부 변경되었습니다.',
    date: '2024-01-10',
    category: '제도변경',
    views: 645,
    important: false,
    hasAttachment: true
  },
  {
    id: 4,
    title: '2024년 상반기 교육 프로그램 일정 안내',
    content: '2024년 상반기 스타트업 교육 프로그램 일정을 안내드립니다.',
    date: '2024-01-08',
    category: '교육안내',
    views: 432,
    important: false,
    hasAttachment: false
  },
  {
    id: 5,
    title: '협회 홈페이지 리뉴얼 완료',
    content: '더 나은 사용자 경험을 위해 홈페이지가 새롭게 단장되었습니다.',
    date: '2024-01-05',
    category: '시스템',
    views: 324,
    important: false,
    hasAttachment: false
  }
]

const categories = ['전체', '모집공고', '행사안내', '제도변경', '교육안내', '시스템']

export default function NoticePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = selectedCategory === '전체' || notice.category === selectedCategory
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNotices = filteredNotices.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-purple-600/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                홈
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/news" className="hover:text-blue-600 transition-colors">
                협회소식
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">공지사항</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  공지사항
                </h1>
                <p className="text-lg text-gray-600">
                  협회의 중요한 소식과 안내사항을 확인하세요
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
                    "bg-blue-600 text-white" : 
                    "text-gray-600 hover:text-blue-600"
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

      {/* Notice List */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                총 <span className="font-semibold text-blue-600">{filteredNotices.length}</span>개의 공지사항
              </p>
            </div>

            {/* Notice Cards */}
            <div className="space-y-4">
              {paginatedNotices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            {notice.important && (
                              <Badge className="bg-red-100 text-red-700 border-red-200">
                                중요
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {notice.category}
                            </Badge>
                            {notice.hasAttachment && (
                              <div className="flex items-center gap-1 text-gray-500">
                                <Paperclip className="w-4 h-4" />
                                <span className="text-xs">첨부파일</span>
                              </div>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors cursor-pointer">
                            {notice.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {notice.content}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {notice.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {notice.views.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
                    className={currentPage === page ? "bg-blue-600 text-white" : ""}
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