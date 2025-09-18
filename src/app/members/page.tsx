'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Building2,
  Shield,
  Heart,
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
  MapPin,
  Calendar,
  DollarSign,
  Rocket,
  Zap,
  HandshakeIcon,
  Sparkles,
  Target,
  Brain,
  Activity,
  Layers
} from 'lucide-react'

const memberCategories = [
  { id: 'all', label: '전체', count: 500, icon: Layers },
  { id: 'unicorn', label: '유니콘', count: 3, icon: Sparkles },
  { id: 'series-c', label: 'Series C+', count: 12, icon: TrendingUp },
  { id: 'series-b', label: 'Series B', count: 45, icon: Activity },
  { id: 'series-a', label: 'Series A', count: 120, icon: Target },
  { id: 'seed', label: 'Seed', count: 200, icon: Brain },
  { id: 'pre-seed', label: 'Pre-Seed', count: 120, icon: Zap }
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
    achievements: ['CES 2025 혁신상', '유니콘 기업 선정', '글로벌 진출'],
    metrics: {
      growth: '+250%',
      revenue: '500억+',
      users: '1M+'
    },
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
    achievements: ['핀테크 대상', '글로벌 진출'],
    metrics: {
      growth: '+180%',
      revenue: '200억+',
      users: '500K+'
    }
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
    achievements: ['의료 혁신 대상', 'ISO 인증'],
    metrics: {
      growth: '+150%',
      revenue: '100억+',
      users: '200K+'
    }
  },
  {
    id: 4,
    name: '에듀테크솔루션',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop',
    category: 'series-a',
    industry: 'EdTech',
    description: 'AI 기반 맞춤형 교육 플랫폼',
    founded: '2021',
    employees: '50+',
    funding: '80억원',
    stage: 'Series A',
    location: '서울 역삼',
    achievements: ['에듀테크 혁신상'],
    metrics: {
      growth: '+120%',
      revenue: '50억+',
      users: '100K+'
    }
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
    name: 'STARTER',
    price: '30',
    unit: '만원',
    period: '/월',
    description: 'Pre-Seed ~ Seed 단계 스타트업',
    features: [
      '기본 네트워킹 이벤트 참가',
      '온라인 교육 프로그램',
      '월 1회 멘토링',
      '뉴스레터 구독',
      '회원 디렉토리 등록'
    ]
  },
  {
    name: 'GROWTH',
    price: '50',
    unit: '만원',
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
    recommended: true
  },
  {
    name: 'ENTERPRISE',
    price: '맞춤형',
    unit: '',
    period: '',
    description: 'Series C+ 및 대기업',
    features: [
      '모든 그로스 혜택 포함',
      '전용 계정 매니저',
      '무제한 멘토링',
      '우선 투자 연계',
      '글로벌 파트너십',
      '맞춤형 프로그램'
    ]
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
  // Tabs 제거 → 항상 directory 뷰
  const [activeTab, setActiveTab] = useState<'directory' | 'benefits' | 'join'>('directory')

  // Initialize tab from URL hash
  useEffect(() => {
    // no-op
  }, [])

  // Handle tab change and update URL
  const handleTabChange = (_newTab: string) => {
    setActiveTab('directory')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Ultra Minimal Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-950/50" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto">
            {/* Minimal Header */}
            <div className="mb-12 text-center">
              <p className="text-xs font-bold tracking-[0.4em] text-gray-400 dark:text-gray-600 uppercase mb-4">
                Member Companies
              </p>
              <h1 className="text-4xl md:text-5xl font-extralight text-gray-900 dark:text-gray-100 mb-4">
                회원사 <span className="font-normal">소개</span>
              </h1>
              <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                대한민국을 대표하는 500개 기술 스타트업과 함께하는 혁신의 생태계
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation removed */}

      {/* Content */}
      <section className="pt-0 pb-16 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Directory Tab */}
            {activeTab === 'directory' && (
              <div>
                {/* Search, Filter, View Mode removed */}

                {/* Category Filters removed */}

                {/* Industry Tags removed */}

                {/* Featured Members */}
                <div className="mb-12">
                  <h3 className="text-xs font-bold tracking-[0.3em] text-gray-400 dark:text-gray-600 uppercase mb-6">
                    Featured Members
                  </h3>
                  
                  <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                    {featuredMembers.map((member) => (
                      <Link key={member.id} href={`/members/${member.id}`} className="group block">
                        <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-900 bg-white/50 dark:bg-black/50 transition-all duration-500 hover:border-gray-200 dark:hover:border-gray-800 hover:bg-white dark:hover:bg-black hover:shadow-lg">
                          {member.isUnicorn && (
                            <div className="absolute top-4 right-4 z-10">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold">
                                UNICORN
                              </span>
                            </div>
                          )}
                          
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900">
                                  <Image
                                    src={member.logo}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-400 transition-all">
                                    {member.name}
                                  </h4>
                                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                                    <MapPin className="w-3 h-3" />
                                    {member.location}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                              {member.description}
                            </p>

                            <div className="grid grid-cols-3 gap-3 mb-4">
                              <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-1">Stage</p>
                                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">{member.stage}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-1">Industry</p>
                                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">{member.industry}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-1">Founded</p>
                                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">{member.founded}</p>
                              </div>
                            </div>

                            {/* Metrics */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-900">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3 text-gray-400" />
                                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{member.metrics.growth}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3 text-gray-400" />
                                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{member.metrics.users}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Load More */}
                <div className="text-center">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all text-sm font-medium text-gray-600 dark:text-gray-400">
                    더 많은 회원사 보기
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Benefits Tab */}
            {activeTab === 'benefits' && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-xs font-bold tracking-[0.3em] text-gray-400 dark:text-gray-600 uppercase mb-4">
                    Member Benefits
                  </h2>
                  <p className="text-2xl font-light text-gray-900 dark:text-gray-100">
                    회원사 전용 <span className="font-normal">혜택</span>
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {memberBenefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    return (
                      <div key={index} className="relative group">
                        <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-900 bg-white/50 dark:bg-black/50 p-6 transition-all duration-500 hover:border-gray-200 dark:hover:border-gray-800 hover:bg-white dark:hover:bg-black hover:shadow-lg h-full">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-900 mb-4">
                            <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          </div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                            {benefit.description}
                          </p>
                          <ul className="space-y-2">
                            {benefit.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                                <CheckCircle className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Success Stories */}
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white/80 to-gray-50/40 dark:from-gray-900/80 dark:to-gray-950/40 backdrop-blur-sm p-12 mb-16">
                  <h3 className="text-xs font-bold tracking-[0.3em] text-gray-400 dark:text-gray-600 uppercase text-center mb-8">
                    Success Stories
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      { company: '테크스타트', result: '시리즈 A 50억 투자 유치', metric: '+50억', icon: DollarSign },
                      { company: '이노베이션랩', result: '글로벌 5개국 진출 성공', metric: '5개국', icon: Globe },
                      { company: '퓨처테크', result: '매출 500% 성장 달성', metric: '+500%', icon: TrendingUp }
                    ].map((story, index) => (
                      <div key={index} className="text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 mb-4">
                          <story.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-2">{story.metric}</p>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{story.company}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{story.result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Join Tab */}
            {activeTab === 'join' && (
              <div>
                {/* Membership Plans */}
                <div className="text-center mb-12">
                  <h2 className="text-xs font-bold tracking-[0.3em] text-gray-400 dark:text-gray-600 uppercase mb-4">
                    Membership Plans
                  </h2>
                  <p className="text-2xl font-light text-gray-900 dark:text-gray-100">
                    성장 단계별 <span className="font-normal">멤버십</span>
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  {membershipPlans.map((plan, index) => (
                    <div key={index} className="relative group">
                      <div className={`relative overflow-hidden rounded-xl border ${
                        plan.recommended 
                          ? 'border-gray-900 dark:border-white' 
                          : 'border-gray-100 dark:border-gray-900'
                      } bg-white/50 dark:bg-black/50 transition-all duration-500 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg`}>
                        {plan.recommended && (
                          <div className="absolute top-0 right-0 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl">
                            Recommended
                          </div>
                        )}
                        <div className="p-8">
                          <h3 className="text-xs font-bold tracking-[0.3em] text-gray-400 dark:text-gray-600 uppercase mb-4">
                            {plan.name}
                          </h3>
                          <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-3xl font-light text-gray-900 dark:text-gray-100">{plan.price}</span>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{plan.unit}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-500">{plan.period}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                          
                          <ul className="space-y-3 mb-8">
                            {plan.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-3">
                                <CheckCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-gray-700 dark:text-gray-300">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <button className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
                            plan.recommended
                              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                              : 'border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
                          }`}>
                            가입 신청
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Join Process */}
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white/80 to-gray-50/40 dark:from-gray-900/80 dark:to-gray-950/40 backdrop-blur-sm p-12">
                  <h3 className="text-xs font-bold tracking-[0.3em] text-gray-400 dark:text-gray-600 uppercase text-center mb-8">
                    Join Process
                  </h3>
                  <div className="grid md:grid-cols-5 gap-6">
                    {membershipProcess.map((step, index) => (
                      <div key={index} className="text-center relative">
                        {index < membershipProcess.length - 1 && (
                          <div className="hidden md:block absolute top-6 left-[60%] w-full h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700" />
                        )}
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
                          {step.step}
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{step.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-[0.4em] text-gray-400 dark:text-gray-600 uppercase mb-4">
              Join Us
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight text-gray-900 dark:text-gray-100 mb-6">
              500개 스타트업과 함께 <span className="font-normal">성장</span>하세요
            </h2>
            <p className="text-lg font-light text-gray-600 dark:text-gray-400 mb-8">
              기술벤처스타트업협회 회원사가 되어 더 큰 성장의 기회를 만들어가세요
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => handleTabChange('join')}
                className="group px-8 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all text-sm font-medium"
              >
                회원사 가입 신청
                <Shield className="inline-block ml-2 h-4 w-4" />
              </button>
              <button 
                onClick={() => handleTabChange('join')}
                className="px-8 py-3 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                가입 상담 예약
                <HandshakeIcon className="inline-block ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}