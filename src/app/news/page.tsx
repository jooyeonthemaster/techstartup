'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Bell,
  Newspaper,
  Calendar,
  Award,
  Mail,
  TrendingUp,
  Users,
  Globe,
  ArrowRight,
  ChevronRight,
  Clock,
  Eye,
  Share2,
  Bookmark,
  Search,
  Filter,
  Tag,
  MessageCircle,
  ThumbsUp,
  Download,
  ExternalLink,
  FileText,
  Megaphone,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const newsCategories = [
  { id: 'all', label: '전체', count: 156 },
  { id: 'notice', label: '공지사항', count: 42, icon: Bell },
  { id: 'press', label: '보도자료', count: 38, icon: Newspaper },
  { id: 'event', label: '이벤트', count: 28, icon: Calendar },
  { id: 'success', label: '성공사례', count: 24, icon: Award },
  { id: 'newsletter', label: '뉴스레터', count: 24, icon: Mail }
]

const featuredNews = {
  id: 1,
  category: 'success',
  title: '회원사 테크스타트, 시리즈 B 200억원 투자 유치 성공',
  description: '협회 엑셀러레이팅 프로그램 졸업 기업인 테크스타트가 글로벌 VC로부터 200억원 규모의 시리즈 B 투자를 유치했습니다. 이번 투자를 통해 글로벌 시장 진출을 가속화할 계획입니다.',
  image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
  date: '2024.01.15',
  views: 5234,
  likes: 342,
  author: '협회 사무국',
  tags: ['투자유치', '시리즈B', '글로벌진출']
}

const recentNews = [
  {
    id: 2,
    category: 'notice',
    title: '2024년 상반기 스타트업 지원사업 공고',
    description: '2024년 상반기 스타트업 지원사업 참가 기업을 모집합니다. 최대 1억원의 지원금과 함께 멘토링, 투자 연계 등 다양한 혜택이 제공됩니다.',
    date: '2024.01.12',
    views: 3421,
    isNew: true,
    isPinned: true
  },
  {
    id: 3,
    category: 'event',
    title: '글로벌 스타트업 서밋 2024 개최',
    description: '오는 3월, 국내외 스타트업과 투자자가 한자리에 모이는 글로벌 스타트업 서밋이 개최됩니다.',
    date: '2024.01.10',
    views: 2156,
    isNew: true
  },
  {
    id: 4,
    category: 'press',
    title: '협회-중기부, 스타트업 육성 MOU 체결',
    description: '기술벤처스타트업협회와 중소벤처기업부가 스타트업 생태계 활성화를 위한 업무협약을 체결했습니다.',
    date: '2024.01.08',
    views: 1893
  },
  {
    id: 5,
    category: 'success',
    title: '회원사 3곳, CES 2024 혁신상 수상',
    description: '협회 회원사 3곳이 CES 2024에서 혁신상을 수상하며 한국 스타트업의 기술력을 입증했습니다.',
    date: '2024.01.05',
    views: 4567
  },
  {
    id: 6,
    category: 'newsletter',
    title: '1월 뉴스레터: 2024년 스타트업 트렌드 전망',
    description: '2024년 주목해야 할 스타트업 트렌드와 투자 동향을 정리한 1월 뉴스레터가 발행되었습니다.',
    date: '2024.01.02',
    views: 2341
  }
]

const upcomingEvents = [
  {
    title: '스타트업 네트워킹 데이',
    date: '2024.02.15',
    time: '14:00-18:00',
    location: '서울 강남',
    participants: 150
  },
  {
    title: 'AI 기술 트렌드 세미나',
    date: '2024.02.20',
    time: '10:00-12:00',
    location: '온라인',
    participants: 500
  },
  {
    title: '투자자 피칭 데이',
    date: '2024.02.28',
    time: '13:00-17:00',
    location: '서울 판교',
    participants: 80
  }
]

const resources = [
  {
    title: '2024 스타트업 생태계 리포트',
    type: 'PDF',
    size: '15.2MB',
    downloads: 1234,
    icon: FileText
  },
  {
    title: '투자 유치 가이드북',
    type: 'PDF',
    size: '8.5MB',
    downloads: 892,
    icon: FileText
  },
  {
    title: '글로벌 진출 전략 자료',
    type: 'PPT',
    size: '22.1MB',
    downloads: 567,
    icon: FileText
  }
]

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-600/5 to-purple-600/5" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <Megaphone className="w-4 h-4 mr-2" />
              협회 소식
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              협회소식 & 뉴스
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              스타트업 생태계의 최신 소식과 트렌드를 전해드립니다<br />
              협회의 다양한 활동과 회원사 성공 스토리를 만나보세요
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="뉴스 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-xl shadow-lg border-0 bg-white dark:bg-gray-800"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                검색
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="all" className="w-full">
            {/* Category Tabs */}
            <TabsList className="w-full justify-start mb-8 bg-transparent border-b rounded-none h-auto p-0">
              {newsCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-4"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center gap-2">
                    {category.icon && <category.icon className="w-4 h-4" />}
                    <span>{category.label}</span>
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Featured Article */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0">
                      <div className="relative h-64">
                        <Image
                          src={featuredNews.image}
                          alt={featuredNews.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="outline">
                            {newsCategories.find(c => c.id === featuredNews.category)?.label}
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {featuredNews.date}
                          </span>
                          <div className="flex items-center gap-4 ml-auto text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {featuredNews.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {featuredNews.likes}
                            </span>
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          {featuredNews.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {featuredNews.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {featuredNews.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="ghost" size="sm">
                            자세히 보기
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Recent News List */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">최신 소식</h3>
                    {recentNews.map((news, index) => (
                      <motion.div
                        key={news.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <Badge variant="outline">
                                  {newsCategories.find(c => c.id === news.category)?.label}
                                </Badge>
                                {news.isNew && (
                                  <Badge className="bg-red-500 text-white">New</Badge>
                                )}
                                {news.isPinned && (
                                  <Badge className="bg-yellow-500 text-white">중요</Badge>
                                )}
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {news.date}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                              {news.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                              {news.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {news.views.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <Bookmark className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Share2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Load More */}
                  <div className="text-center">
                    <Button variant="outline" size="lg">
                      더 많은 소식 보기
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Upcoming Events */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        예정된 이벤트
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="border-l-2 border-blue-600 pl-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {event.title}
                          </h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              {event.date} {event.time}
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="w-3 h-3" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3" />
                              {event.participants}명 참가 예정
                            </div>
                          </div>
                          <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                            참가 신청
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Newsletter Subscription */}
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-0">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Mail className="w-12 h-12 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                          뉴스레터 구독
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          매주 화요일, 스타트업 생태계의<br />
                          핵심 소식을 전해드립니다
                        </p>
                        <Input
                          type="email"
                          placeholder="이메일 주소"
                          className="mb-3"
                        />
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                          구독하기
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Resources */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        자료실
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <resource.icon className="w-8 h-8 text-gray-400" />
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                {resource.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {resource.type} • {resource.size}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        전체 자료 보기
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Popular Tags */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="w-5 h-5 text-blue-600" />
                        인기 태그
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {['투자유치', 'AI', '글로벌진출', '정부지원', '네트워킹', '멘토링', '엑셀러레이팅', '유니콘'].map((tag) => (
                          <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}