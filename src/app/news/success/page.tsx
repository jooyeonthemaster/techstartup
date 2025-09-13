'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Trophy,
  TrendingUp,
  DollarSign,
  Users,
  Search,
  Filter,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Award,
  Briefcase,
  Globe,
  Calendar,
  Target,
  Rocket
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

const successStories = [
  {
    id: 1,
    company: '테크유니콘',
    ceo: '김창업',
    sector: 'AI/ML',
    title: '협회 지원으로 유니콘 기업 달성',
    summary: '협회의 엑셀러레이팅 프로그램 참여 후 3년 만에 기업가치 1조원을 돌파하며 국내 대표 AI 유니콘으로 성장',
    achievementType: 'unicorn',
    funding: '1500억원',
    valuation: '1조원',
    employees: '500+',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    featured: true,
    programs: ['엑셀러레이팅', '투자연계', '글로벌진출'],
    metrics: {
      revenue: '300억원',
      growth: '500%',
      users: '100만명'
    }
  },
  {
    id: 2,
    company: '핀테크스타',
    ceo: '이혁신',
    sector: 'Fintech',
    title: '글로벌 시장 진출 성공',
    summary: '협회의 글로벌 진출 프로그램을 통해 동남아 5개국에 서비스 확장, 현지 투자 유치까지 성공',
    achievementType: 'global',
    funding: '200억원',
    valuation: '500억원',
    employees: '150+',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
    featured: true,
    programs: ['글로벌진출', '멘토링', '네트워킹'],
    metrics: {
      revenue: '50억원',
      growth: '300%',
      users: '50만명'
    }
  },
  {
    id: 3,
    company: '헬스케어플러스',
    ceo: '박의료',
    sector: 'Healthcare',
    title: 'Series B 투자 유치 성공',
    summary: '협회 투자연계 프로그램을 통해 대규모 Series B 투자를 유치하며 국내 헬스테크 선도기업으로 도약',
    achievementType: 'funding',
    funding: '300억원',
    valuation: '800억원',
    employees: '200+',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
    featured: false,
    programs: ['투자연계', '멘토링'],
    metrics: {
      revenue: '80억원',
      growth: '250%',
      users: '30만명'
    }
  },
  {
    id: 4,
    company: '에듀테크혁신',
    ceo: '최교육',
    sector: 'EdTech',
    title: '교육부 최우수 에듀테크 기업 선정',
    summary: '협회 교육 프로그램 참여 후 혁신적인 AI 학습 솔루션으로 교육부 최우수 기업 선정 및 공교육 도입',
    achievementType: 'award',
    funding: '100억원',
    valuation: '300억원',
    employees: '100+',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop',
    featured: false,
    programs: ['교육프로그램', '멘토링', '네트워킹'],
    metrics: {
      revenue: '30억원',
      growth: '200%',
      users: '20만명'
    }
  },
  {
    id: 5,
    company: '그린테크솔루션',
    ceo: '정환경',
    sector: 'CleanTech',
    title: 'IPO 성공적 완료',
    summary: '협회 지원으로 성장한 친환경 기술 기업이 코스닥 상장에 성공하며 ESG 투자 붐을 주도',
    achievementType: 'ipo',
    funding: '500억원',
    valuation: '1200억원',
    employees: '300+',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=100&h=100&fit=crop',
    featured: false,
    programs: ['엑셀러레이팅', '투자연계', '글로벌진출'],
    metrics: {
      revenue: '150억원',
      growth: '180%',
      users: '10만명'
    }
  }
]

const sectors = ['전체', 'AI/ML', 'Fintech', 'Healthcare', 'EdTech', 'CleanTech']
const achievementTypes = ['전체', 'unicorn', 'global', 'funding', 'award', 'ipo']

export default function SuccessPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedSector, setSelectedSector] = useState('전체')
  const [selectedType, setSelectedType] = useState('전체')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredStories = successStories.filter(story => {
    const matchesSector = selectedSector === '전체' || story.sector === selectedSector
    const matchesType = selectedType === '전체' || story.achievementType === selectedType
    const matchesSearch = story.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSector && matchesType && matchesSearch
  })

  const featuredStories = filteredStories.filter(story => story.featured)

  const getAchievementBadge = (type: string) => {
    switch (type) {
      case 'unicorn': return { label: '유니콘', color: 'bg-purple-100 text-purple-700', icon: Trophy }
      case 'global': return { label: '글로벌진출', color: 'bg-blue-100 text-blue-700', icon: Globe }
      case 'funding': return { label: '투자유치', color: 'bg-green-100 text-green-700', icon: DollarSign }
      case 'award': return { label: '수상', color: 'bg-yellow-100 text-yellow-700', icon: Award }
      case 'ipo': return { label: 'IPO', color: 'bg-red-100 text-red-700', icon: TrendingUp }
      default: return { label: '성공', color: 'bg-gray-100 text-gray-700', icon: Target }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 via-orange-600/10 to-red-600/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-orange-600 transition-colors">
                홈
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/news" className="hover:text-orange-600 transition-colors">
                협회소식
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">성공사례</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  성공사례
                </h1>
                <p className="text-lg text-gray-600">
                  협회와 함께 성장한 스타트업들의 성공 스토리
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">5개</div>
                <div className="text-sm text-gray-600">유니콘 기업</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">2조원</div>
                <div className="text-sm text-gray-600">누적 투자</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">15개국</div>
                <div className="text-sm text-gray-600">글로벌 진출</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">성공 기업</div>
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
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="flex justify-end">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="기업명, 제목으로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">분야:</span>
                <div className="flex gap-2">
                  {sectors.map((sector) => (
                    <Button
                      key={sector}
                      variant={selectedSector === sector ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSector(sector)}
                      className={selectedSector === sector ? 
                        "bg-orange-600 text-white" : 
                        "text-gray-600 hover:text-orange-600"
                      }
                    >
                      {sector}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">성과유형:</span>
                <div className="flex gap-2">
                  {achievementTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className={selectedType === type ? 
                        "bg-orange-600 text-white" : 
                        "text-gray-600 hover:text-orange-600"
                      }
                    >
                      {type === '전체' ? '전체' : 
                       type === 'unicorn' ? '유니콘' :
                       type === 'global' ? '글로벌' :
                       type === 'funding' ? '투자유치' :
                       type === 'award' ? '수상' :
                       type === 'ipo' ? 'IPO' : type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Featured Stories */}
            {featuredStories.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">주요 성공사례</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredStories.map((story, index) => {
                    const badge = getAchievementBadge(story.achievementType)
                    const BadgeIcon = badge.icon
                    
                    return (
                      <motion.div
                        key={story.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                          <div className="aspect-video relative overflow-hidden">
                            <Image
                              src={story.image}
                              alt={story.company}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                              <Badge className="bg-orange-600 text-white">
                                주요
                              </Badge>
                              <Badge className={badge.color}>
                                <BadgeIcon className="w-3 h-3 mr-1" />
                                {badge.label}
                              </Badge>
                            </div>
                            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1">
                                <Image
                                  src={story.logo}
                                  alt={story.company}
                                  width={40}
                                  height={40}
                                  className="rounded-full object-cover"
                                />
                              </div>
                              <div className="text-white">
                                <div className="font-bold">{story.company}</div>
                                <div className="text-xs opacity-90">{story.ceo} 대표</div>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="outline" className="text-orange-600 border-orange-200">
                                {story.sector}
                              </Badge>
                              <span className="text-sm text-gray-500">{story.year}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                              {story.title}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {story.summary}
                            </p>
                            
                            {/* Key Metrics */}
                            <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-orange-50 rounded-lg">
                              <div className="text-center">
                                <div className="text-lg font-bold text-orange-600">{story.metrics.revenue}</div>
                                <div className="text-xs text-gray-600">매출</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-orange-600">{story.metrics.growth}</div>
                                <div className="text-xs text-gray-600">성장률</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-orange-600">{story.metrics.users}</div>
                                <div className="text-xs text-gray-600">사용자</div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {story.programs.map((program) => (
                                <Badge key={program} variant="secondary" className="text-xs">
                                  {program}
                                </Badge>
                              ))}
                            </div>

                            <Button className="w-full bg-orange-600 hover:bg-orange-700">
                              상세 스토리 보기
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* All Stories */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">전체 성공사례</h2>
                <p className="text-gray-600">
                  총 <span className="font-semibold text-orange-600">{filteredStories.length}</span>개 사례
                </p>
              </div>

              <div className="space-y-6">
                {filteredStories.map((story, index) => {
                  const badge = getAchievementBadge(story.achievementType)
                  const BadgeIcon = badge.icon
                  
                  return (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300 group">
                        <CardContent className="p-6">
                          <div className="flex gap-6">
                            <div className="w-32 h-24 relative overflow-hidden rounded-lg flex-shrink-0">
                              <Image
                                src={story.image}
                                alt={story.company}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <Image
                                      src={story.logo}
                                      alt={story.company}
                                      width={32}
                                      height={32}
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <div className="font-bold">{story.company}</div>
                                    <div className="text-xs text-gray-500">{story.ceo} 대표</div>
                                  </div>
                                </div>
                                <Badge variant="outline" className="text-orange-600 border-orange-200">
                                  {story.sector}
                                </Badge>
                                <Badge className={badge.color}>
                                  <BadgeIcon className="w-3 h-3 mr-1" />
                                  {badge.label}
                                </Badge>
                                <span className="text-sm text-gray-500">{story.year}</span>
                              </div>
                              
                              <h3 className="text-lg font-bold mb-2 group-hover:text-orange-600 transition-colors cursor-pointer">
                                {story.title}
                              </h3>
                              
                              <p className="text-gray-600 mb-4 line-clamp-2">
                                {story.summary}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    투자 {story.funding}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    기업가치 {story.valuation}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    직원 {story.employees}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Button size="sm" variant="outline">
                                    자세히 보기
                                  </Button>
                                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}