'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Bookmark,
  Share2,
  ChevronLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

const events = [
  {
    id: 1,
    title: '2024 스타트업 Demo Day',
    description: '100개 스타트업이 투자자들에게 선보이는 대규모 데모데이',
    date: '2024-02-15',
    time: '14:00 - 18:00',
    location: '코엑스 컨벤션센터',
    type: '데모데이',
    status: 'upcoming',
    participants: 500,
    price: '무료',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
    featured: true,
    tags: ['투자', '네트워킹', 'Demo']
  },
  {
    id: 2,
    title: 'AI 스타트업 컨퍼런스',
    description: '인공지능 분야 전문가들과 함께하는 기술 트렌드 세미나',
    date: '2024-02-20',
    time: '10:00 - 17:00',
    location: '서울 드래곤시티',
    type: '컨퍼런스',
    status: 'upcoming',
    participants: 300,
    price: '5만원',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop',
    featured: true,
    tags: ['AI', '기술', '세미나']
  },
  {
    id: 3,
    title: '스타트업 네트워킹 나이트',
    description: '창업가들의 자유로운 네트워킹과 협업 기회 모색',
    date: '2024-02-25',
    time: '19:00 - 22:00',
    location: '강남 르메르디앙 호텔',
    type: '네트워킹',
    status: 'upcoming',
    participants: 150,
    price: '3만원',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=200&fit=crop',
    featured: false,
    tags: ['네트워킹', '창업', '협업']
  },
  {
    id: 4,
    title: '투자 유치 전략 워크샵',
    description: 'VC 투자 유치를 위한 실전 전략과 IR 피칭 노하우',
    date: '2024-03-05',
    time: '13:00 - 18:00',
    location: '협회 교육장',
    type: '워크샵',
    status: 'upcoming',
    participants: 80,
    price: '10만원',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop',
    featured: false,
    tags: ['투자', '교육', 'IR']
  },
  {
    id: 5,
    title: '글로벌 진출 세미나',
    description: '해외 시장 진출을 위한 전략과 성공 사례 공유',
    date: '2024-01-30',
    time: '14:00 - 17:00',
    location: '여의도 IFC몰',
    type: '세미나',
    status: 'completed',
    participants: 200,
    price: '무료',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=200&fit=crop',
    featured: false,
    tags: ['글로벌', '진출', '세미나']
  }
]

const eventTypes = ['전체', '데모데이', '컨퍼런스', '네트워킹', '워크샵', '세미나']
const statusTypes = ['전체', 'upcoming', 'completed']

export default function EventsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedType, setSelectedType] = useState('전체')
  const [selectedStatus, setSelectedStatus] = useState('전체')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === '전체' || event.type === selectedType
    const matchesStatus = selectedStatus === '전체' || event.status === selectedStatus
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesStatus && matchesSearch
  })

  const upcomingEvents = filteredEvents.filter(event => event.status === 'upcoming')
  const featuredEvents = filteredEvents.filter(event => event.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-600/10 to-teal-600/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-green-600 transition-colors">
                홈
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/news" className="hover:text-green-600 transition-colors">
                협회소식
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">이벤트</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  이벤트
                </h1>
                <p className="text-lg text-gray-600">
                  협회에서 주최하는 다양한 행사와 프로그램에 참여하세요
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
          <div className="flex flex-col gap-6">
            {/* View Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">보기 방식:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-green-600 text-white' : ''}
                  >
                    목록형
                  </Button>
                  <Button
                    variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('calendar')}
                    className={viewMode === 'calendar' ? 'bg-green-600 text-white' : ''}
                  >
                    달력형
                  </Button>
                </div>
              </div>

              {/* Search */}
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="이벤트 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">유형:</span>
                <div className="flex gap-2">
                  {eventTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className={selectedType === type ? 
                        "bg-green-600 text-white" : 
                        "text-gray-600 hover:text-green-600"
                      }
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">상태:</span>
                <div className="flex gap-2">
                  {statusTypes.map((status) => (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatus(status)}
                      className={selectedStatus === status ? 
                        "bg-green-600 text-white" : 
                        "text-gray-600 hover:text-green-600"
                      }
                    >
                      {status === '전체' ? '전체' : status === 'upcoming' ? '예정' : '완료'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Featured Events */}
            {featuredEvents.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">주요 이벤트</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                        <div className="aspect-video relative overflow-hidden">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <Badge className="bg-green-600 text-white">
                              주요
                            </Badge>
                            <Badge variant="outline" className={
                              event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                            }>
                              {event.status === 'upcoming' ? '예정' : '완료'}
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white">
                              <Bookmark className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              {event.type}
                            </Badge>
                            <span className="text-sm text-green-600 font-medium">{event.price}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {event.description}
                          </p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="w-4 h-4" />
                              {event.participants}명 참가 예정
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {event.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 mt-4">
                            <Button className="flex-1 bg-green-600 hover:bg-green-700">
                              {event.status === 'upcoming' ? '참가 신청' : '후기 보기'}
                            </Button>
                            <Button variant="outline" size="icon">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* All Events List */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedStatus === 'upcoming' ? '예정된 이벤트' : 
                   selectedStatus === 'completed' ? '지난 이벤트' : '전체 이벤트'}
                </h2>
                <p className="text-gray-600">
                  총 <span className="font-semibold text-green-600">{filteredEvents.length}</span>개 이벤트
                </p>
              </div>

              <div className="space-y-4">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="w-24 h-24 relative overflow-hidden rounded-lg flex-shrink-0">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline" className="text-green-600 border-green-200">
                                {event.type}
                              </Badge>
                              <Badge variant="outline" className={
                                event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                              }>
                                {event.status === 'upcoming' ? '예정' : '완료'}
                              </Badge>
                              <span className="text-sm text-green-600 font-medium">{event.price}</span>
                            </div>
                            
                            <h3 className="text-lg font-bold mb-2 group-hover:text-green-600 transition-colors cursor-pointer">
                              {event.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {event.description}
                            </p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {event.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {event.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {event.participants}명
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                {event.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline">
                                  {event.status === 'upcoming' ? '신청하기' : '후기보기'}
                                </Button>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
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
        </div>
      </section>
    </div>
  )
}