'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Building2,
  Shield,
  Heart,
  Sparkles,
  Globe,
  Users,
  TrendingUp,
  Award,
  Briefcase,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Rocket,
  Target,
  Zap,
  Brain,
  HandshakeIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const memberCategories = [
  { id: 'all', label: '전체', count: 500 },
  { id: 'unicorn', label: '유니콘', count: 3 },
  { id: 'series-c', label: 'Series C+', count: 12 },
  { id: 'series-b', label: 'Series B', count: 45 },
  { id: 'series-a', label: 'Series A', count: 120 },
  { id: 'seed', label: 'Seed', count: 200 },
  { id: 'pre-seed', label: 'Pre-Seed', count: 120 }
]

const industries = [
  'AI/ML', 'Fintech', 'Healthcare', 'E-commerce', 'SaaS', 
  'Mobility', 'EdTech', 'Gaming', 'Blockchain', 'IoT'
]

const featuredMembers = [
  {
    id: 1,
    name: '테크유니콘',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop',
    category: 'unicorn',
    industry: 'AI/ML',
    description: 'AI 기반 자율주행 기술 선도 기업',
    founded: '2018',
    employees: '500+',
    funding: '1500억원',
    stage: 'Series D',
    location: '서울 강남',
    achievements: ['CES 2024 혁신상', '유니콘 기업 선정'],
    isUnicorn: true
  },
  {
    id: 2,
    name: '핀테크랩',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop',
    category: 'series-c',
    industry: 'Fintech',
    description: '블록체인 기반 디지털 자산 관리 플랫폼',
    founded: '2019',
    employees: '200+',
    funding: '500억원',
    stage: 'Series C',
    location: '서울 판교',
    achievements: ['핀테크 대상 수상', '글로벌 진출']
  },
  {
    id: 3,
    name: '헬스케어플러스',
    logo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
    category: 'series-b',
    industry: 'Healthcare',
    description: '원격 의료 및 헬스케어 솔루션',
    founded: '2020',
    employees: '100+',
    funding: '200억원',
    stage: 'Series B',
    location: '서울 성수',
    achievements: ['의료 혁신 대상', 'ISO 인증']
  }
]

const memberBenefits = [
  {
    icon: Rocket,
    title: '엑셀러레이팅',
    description: '3-6개월 집중 성장 프로그램',
    features: ['전문 멘토링', '오피스 공간', '데모데이']
  },
  {
    icon: Briefcase,
    title: '투자 연계',
    description: 'VC 및 엔젤 투자자 매칭',
    features: ['IR 컨설팅', '피칭 기회', '투자 중개']
  },
  {
    icon: Globe,
    title: '글로벌 진출',
    description: '해외 시장 진출 지원',
    features: ['현지화 지원', '파트너십', '마케팅']
  },
  {
    icon: Users,
    title: '네트워킹',
    description: '회원사 간 교류 활성화',
    features: ['정기 모임', '비즈니스 매칭', '커뮤니티']
  }
]

const membershipPlans = [
  {
    name: '스타터',
    price: '30만원',
    period: '/월',
    description: 'Pre-Seed ~ Seed 단계 스타트업',
    features: [
      '기본 네트워킹 이벤트 참가',
      '온라인 교육 프로그램',
      '월 1회 멘토링',
      '뉴스레터 구독',
      '회원 디렉토리 등록'
    ],
    color: 'from-gray-500 to-gray-600'
  },
  {
    name: '그로스',
    price: '50만원',
    period: '/월',
    description: 'Series A ~ B 단계 스타트업',
    features: [
      '모든 스타터 혜택 포함',
      'VIP 네트워킹 이벤트',
      '주 1회 멘토링',
      '투자자 매칭 서비스',
      '오피스 공간 할인',
      '법률/회계 자문'
    ],
    recommended: true,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: '엔터프라이즈',
    price: '맞춤형',
    period: '',
    description: 'Series C+ 및 대기업',
    features: [
      '모든 그로스 혜택 포함',
      '전용 계정 매니저',
      '무제한 멘토링',
      '우선 투자 연계',
      '글로벌 파트너십',
      '맞춤형 프로그램'
    ],
    color: 'from-purple-500 to-pink-500'
  }
]

const membershipProcess = [
  { step: '01', title: '가입 신청', desc: '온라인 신청서 작성' },
  { step: '02', title: '심사', desc: '자격 요건 검토' },
  { step: '03', title: '승인', desc: '회원 가입 승인' },
  { step: '04', title: '오리엔테이션', desc: '혜택 안내 및 소개' },
  { step: '05', title: '활동 시작', desc: '프로그램 참여' }
]

export default function MembersPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('directory')
  const router = useRouter()

  // Initialize tab from URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1) // Remove # from hash
    if (hash === 'benefits' || hash === 'join') {
      setActiveTab(hash)
    }
  }, [])

  // Handle tab change and update URL
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab)
    
    if (newTab === 'directory') {
      // For directory tab, remove hash from URL
      router.replace('/members', { scroll: false })
    } else {
      // For other tabs, set hash in URL
      router.replace(`/members#${newTab}`, { scroll: false })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-600/5 to-purple-600/5" />
          <div className="absolute top-20 -right-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute bottom-0 -left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <Building2 className="w-4 h-4 mr-2" />
              500+ 회원사
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              회원사 소개
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              대한민국을 대표하는 기술 스타트업들이 함께합니다<br />
              혁신과 성장의 여정을 함께하는 500개 이상의 회원사
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => handleTabChange('join')}
              >
                회원사 가입하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleTabChange('benefits')}
              >
                회원 혜택 보기
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Member Directory */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="directory">회원사 디렉토리</TabsTrigger>
              <TabsTrigger value="benefits">회원 혜택</TabsTrigger>
              <TabsTrigger value="join">가입 안내</TabsTrigger>
            </TabsList>

            {/* Directory Tab */}
            <TabsContent value="directory" className="mt-8">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="회원사 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    필터
                  </Button>
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-8">
                {memberCategories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                    <span className="ml-2 text-xs opacity-70">({category.count})</span>
                  </Badge>
                ))}
              </div>

              {/* Industry Filters */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">산업분야:</span>
                {industries.map((industry) => (
                  <Badge key={industry} variant="secondary" className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30">
                    {industry}
                  </Badge>
                ))}
              </div>

              {/* Featured Members */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">주요 회원사</h3>
                <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                  {featuredMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                        {member.isUnicorn && (
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-1 text-sm font-semibold">
                            🦄 유니콘 기업
                          </div>
                        )}
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src={member.logo}
                                  alt={member.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {member.name}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <MapPin className="w-3 h-3" />
                                  {member.location}
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline">{member.stage}</Badge>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {member.description}
                          </p>

                          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">설립</span>
                              <p className="font-semibold text-gray-900 dark:text-white">{member.founded}</p>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">직원수</span>
                              <p className="font-semibold text-gray-900 dark:text-white">{member.employees}</p>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">투자 유치</span>
                              <p className="font-semibold text-gray-900 dark:text-white">{member.funding}</p>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">산업</span>
                              <p className="font-semibold text-gray-900 dark:text-white">{member.industry}</p>
                            </div>
                          </div>

                          {member.achievements && member.achievements.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {member.achievements.map((achievement) => (
                                <Badge key={achievement} className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                  <Award className="w-3 h-3 mr-1" />
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Load More */}
              <div className="text-center">
                <Button variant="outline" size="lg">
                  더 많은 회원사 보기
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Benefits Tab */}
            <TabsContent value="benefits" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    회원사 전용 혜택
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    기술벤처스타트업협회 회원사만의 특별한 혜택을 누리세요
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {memberBenefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 mb-4">
                            <benefit.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {benefit.description}
                          </p>
                          <ul className="space-y-2">
                            {benefit.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Success Stories */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl p-8 mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                    회원사 성공 사례
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { company: '테크스타트', result: '시리즈 A 50억 투자 유치', icon: DollarSign },
                      { company: '이노베이션랩', result: '글로벌 5개국 진출 성공', icon: Globe },
                      { company: '퓨처테크', result: '매출 500% 성장 달성', icon: TrendingUp }
                    ].map((story, index) => (
                      <div key={index} className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-lg mb-4">
                          <story.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">{story.company}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{story.result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Join Tab */}
            <TabsContent value="join" className="mt-8">
              <div className="max-w-6xl mx-auto">
                {/* Membership Plans */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    회원 가입 플랜
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    스타트업의 성장 단계에 맞는 멤버십을 선택하세요
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {membershipPlans.map((plan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className={`h-full ${plan.recommended ? 'ring-2 ring-blue-600 shadow-2xl' : ''}`}>
                        {plan.recommended && (
                          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center py-2 text-sm font-semibold">
                            추천
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="text-2xl">{plan.name}</CardTitle>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                            <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{plan.description}</p>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {plan.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button className={`w-full mt-6 bg-gradient-to-r ${plan.color} text-white`}>
                            가입 신청
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Join Process */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                    가입 프로세스
                  </h3>
                  <div className="grid md:grid-cols-5 gap-4">
                    {membershipProcess.map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold mb-3">
                          {step.step}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              500개 스타트업과 함께 성장하세요
            </h2>
            <p className="text-xl text-white/90 mb-8">
              기술벤처스타트업협회 회원사가 되어<br />
              더 큰 성장의 기회를 만들어가세요
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
                onClick={() => handleTabChange('join')}
              >
                회원사 가입 신청
                <Shield className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10"
                onClick={() => handleTabChange('join')}
              >
                가입 상담 예약
                <HandshakeIcon className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}