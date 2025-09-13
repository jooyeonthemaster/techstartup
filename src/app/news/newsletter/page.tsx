'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Mail,
  Calendar,
  Download,
  Search,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Send,
  Users,
  Eye,
  CheckCircle,
  TrendingUp,
  Award,
  Newspaper,
  Bell
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

const newsletters = [
  {
    id: 1,
    title: '2024년 1월호 - 스타트업 생태계 전망',
    subtitle: '새해를 맞아 국내외 스타트업 트렌드와 전망을 살펴봅니다',
    date: '2024-01-15',
    issue: '2024-01',
    category: '월간',
    thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    subscribers: 15000,
    openRate: '45%',
    featured: true,
    topics: ['AI 스타트업', '투자 트렌드', '정책 변화', '글로벌 동향'],
    highlights: [
      'AI 스타트업 투자 300% 증가',
      '정부 창업 지원 정책 개편',
      '유니콘 기업 5개사 신규 등장'
    ]
  },
  {
    id: 2,
    title: '2023년 12월호 - 연말결산 특집',
    subtitle: '2023년 스타트업 생태계 성과와 2024년 계획을 공유합니다',
    date: '2023-12-15',
    issue: '2023-12',
    category: '월간',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    subscribers: 14500,
    openRate: '48%',
    featured: true,
    topics: ['연말결산', '성과분석', '2024 계획', '회원사 현황'],
    highlights: [
      '회원사 500개 돌파',
      '누적 투자 2조원 달성',
      '글로벌 진출 15개국 확대'
    ]
  },
  {
    id: 3,
    title: '2023년 11월호 - Demo Day 특집',
    subtitle: '제3회 스타트업 데모데이 성과와 참가기업 소개',
    date: '2023-11-15',
    issue: '2023-11',
    category: '월간',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    subscribers: 14200,
    openRate: '52%',
    featured: false,
    topics: ['Demo Day', '투자유치', '참가기업', '성공사례'],
    highlights: [
      '100개 기업 참가',
      '200억원 투자 약정',
      '미디어 주목도 최고'
    ]
  },
  {
    id: 4,
    title: '2023년 10월호 - 글로벌 진출 특집',
    subtitle: '해외 진출 성공 전략과 지원 프로그램 안내',
    date: '2023-10-15',
    issue: '2023-10',
    category: '월간',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop',
    subscribers: 13800,
    openRate: '44%',
    featured: false,
    topics: ['글로벌 진출', '해외 투자', '현지화', '성공사례'],
    highlights: [
      '동남아 5개국 진출',
      '해외 파트너십 확대',
      '글로벌 펀딩 성과'
    ]
  },
  {
    id: 5,
    title: '2023년 9월호 - ESG 스타트업 주목',
    subtitle: '환경·사회·지배구조를 고려한 스타트업 투자 동향',
    date: '2023-09-15',
    issue: '2023-09',
    category: '월간',
    thumbnail: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop',
    subscribers: 13500,
    openRate: '41%',
    featured: false,
    topics: ['ESG', '지속가능성', '그린테크', '임팩트 투자'],
    highlights: [
      'ESG 스타트업 30% 증가',
      '그린테크 투자 급증',
      '지속가능 비즈니스 모델'
    ]
  }
]

export default function NewsletterPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredNewsletters = newsletters.filter(newsletter =>
    newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    newsletter.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    newsletter.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const featuredNewsletters = filteredNewsletters.filter(newsletter => newsletter.featured)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubscribing(false)
    setIsSubscribed(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail('')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-blue-600/10 to-cyan-600/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-indigo-600 transition-colors">
                홈
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/news" className="hover:text-indigo-600 transition-colors">
                협회소식
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">뉴스레터</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  뉴스레터
                </h1>
                <p className="text-lg text-gray-600">
                  스타트업 생태계의 최신 소식을 정기적으로 받아보세요
                </p>
              </div>
            </div>

            {/* Newsletter Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">15,000+</div>
                <div className="text-sm text-gray-600">구독자</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">48%</div>
                <div className="text-sm text-gray-600">평균 오픈율</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">월간</div>
                <div className="text-sm text-gray-600">발행주기</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">무료</div>
                <div className="text-sm text-gray-600">구독료</div>
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

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">
                스타트업 소식을 가장 빠르게
              </h2>
              <p className="text-xl opacity-90">
                매월 셋째 주 화요일, 스타트업 생태계의 핵심 정보를 메일함으로 배달해드립니다
              </p>
            </div>

            {/* Subscription Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white text-gray-900 border-0"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubscribing}
                className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold"
              >
                {isSubscribing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mr-2" />
                    구독 중...
                  </>
                ) : isSubscribed ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    구독 완료!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    구독하기
                  </>
                )}
              </Button>
            </form>

            <p className="text-sm opacity-75 mt-4">
              언제든지 구독을 취소할 수 있습니다. 개인정보는 안전하게 보호됩니다.
            </p>

            {/* What's Included */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 mt-1 opacity-80" />
                <div>
                  <h3 className="font-semibold mb-2">시장 동향</h3>
                  <p className="text-sm opacity-80">최신 투자 트렌드와 시장 분석</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 mt-1 opacity-80" />
                <div>
                  <h3 className="font-semibold mb-2">성공 사례</h3>
                  <p className="text-sm opacity-80">주목할 만한 스타트업 성장 스토리</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bell className="w-6 h-6 mt-1 opacity-80" />
                <div>
                  <h3 className="font-semibold mb-2">정책 소식</h3>
                  <p className="text-sm opacity-80">창업 관련 정부 정책과 지원사업</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">뉴스레터 아카이브</h2>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="뉴스레터 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Newsletters */}
      {featuredNewsletters.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">최신 뉴스레터</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredNewsletters.map((newsletter, index) => (
                  <motion.div
                    key={newsletter.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <Image
                          src={newsletter.thumbnail}
                          alt={newsletter.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-indigo-600 text-white">
                            최신
                          </Badge>
                          <Badge variant="outline" className="bg-white/90">
                            {newsletter.issue}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                            {newsletter.category}
                          </Badge>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {newsletter.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {newsletter.subscribers.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
                          {newsletter.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {newsletter.subtitle}
                        </p>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {newsletter.topics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>

                        {/* Highlights */}
                        <div className="mb-4">
                          <h4 className="font-medium mb-2 text-sm text-gray-700">주요 내용</h4>
                          <ul className="space-y-1">
                            {newsletter.highlights.map((highlight, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            오픈율: <span className="font-medium text-indigo-600">{newsletter.openRate}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              미리보기
                            </Button>
                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                              <Download className="w-4 h-4 mr-1" />
                              다운로드
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Newsletters */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">전체 뉴스레터</h2>
              <p className="text-gray-600">
                총 <span className="font-semibold text-indigo-600">{filteredNewsletters.length}</span>개 이슈
              </p>
            </div>

            <div className="space-y-4">
              {filteredNewsletters.map((newsletter, index) => (
                <motion.div
                  key={newsletter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-32 h-24 relative overflow-hidden rounded-lg flex-shrink-0">
                          <Image
                            src={newsletter.thumbnail}
                            alt={newsletter.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                              {newsletter.issue}
                            </Badge>
                            <Badge variant="outline">
                              {newsletter.category}
                            </Badge>
                          </div>
                          
                          <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 transition-colors cursor-pointer">
                            {newsletter.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {newsletter.subtitle}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {newsletter.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {newsletter.subscribers.toLocaleString()}명
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                오픈율 {newsletter.openRate}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <ExternalLink className="w-4 h-4 mr-1" />
                                온라인 보기
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
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
        </div>
      </section>
    </div>
  )
}