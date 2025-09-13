'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Building2,
  MapPin,
  Clock,
  Wifi,
  Coffee,
  Car,
  Users,
  Monitor,
  Phone,
  Shield,
  Zap,
  CheckCircle,
  ArrowLeft,
  ChevronRight,
  Calendar,
  DollarSign,
  Star,
  Camera,
  Mail,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const spaceTypes = [
  {
    id: 'coworking',
    title: '코워킹 스페이스',
    subtitle: '자유로운 업무 환경',
    price: '월 15만원',
    capacity: '1인',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    features: [
      '24시간 이용 가능',
      '고속 인터넷',
      '무료 커피',
      '프린터 사용',
      '라운지 이용'
    ],
    popular: false
  },
  {
    id: 'dedicated',
    title: '전용 데스크',
    subtitle: '개인 전용 공간',
    price: '월 25만원',
    capacity: '1인',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    features: [
      '개인 전용 책상',
      '사물함 제공',
      '24시간 접근',
      '회의실 할인',
      '우편물 수령'
    ],
    popular: true
  },
  {
    id: 'private',
    title: '프라이빗 오피스',
    subtitle: '독립적인 사무공간',
    price: '월 80만원부터',
    capacity: '2-10인',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
    features: [
      '독립된 사무실',
      '회사 간판 설치',
      '회의실 우선예약',
      '전용 전화번호',
      '맞춤형 인테리어'
    ],
    popular: false
  },
  {
    id: 'meeting',
    title: '회의실',
    subtitle: '다양한 크기의 회의공간',
    price: '시간당 2만원',
    capacity: '4-20인',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
    features: [
      '최신 AV장비',
      '화이트보드',
      '프로젝터',
      '화상회의 지원',
      '케이터링 서비스'
    ],
    popular: false
  }
]

const locations = [
  {
    id: 'gangnam',
    name: '강남센터',
    address: '서울시 강남구 테헤란로 123',
    floors: '15-17층',
    area: '1,200평',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    features: ['지하철 2호선 강남역', 'CVS', '카페', '주차장'],
    coworking: 80,
    dedicated: 40,
    private: 12,
    meeting: 6
  },
  {
    id: 'hongdae',
    name: '홍대센터',
    address: '서울시 마포구 홍익로 456',
    floors: '8-10층',
    area: '800평',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    features: ['지하철 6호선 홍대입구역', '카페거리', '주차장'],
    coworking: 50,
    dedicated: 25,
    private: 8,
    meeting: 4
  },
  {
    id: 'pangyo',
    name: '판교센터',
    address: '경기도 성남시 분당구 판교역로 789',
    floors: '12-14층',
    area: '1,000평',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop',
    features: ['신분당선 판교역', 'IT단지', '푸드코트', '주차장'],
    coworking: 60,
    dedicated: 30,
    private: 10,
    meeting: 5
  }
]

const amenities = [
  { icon: Wifi, title: '고속 인터넷', description: '기가급 무선/유선 인터넷' },
  { icon: Coffee, title: '무료 음료', description: '커피, 차, 생수 무제한' },
  { icon: Car, title: '주차 지원', description: '회원 할인 주차' },
  { icon: Monitor, title: 'IT 장비', description: '모니터, 프린터, 스캐너' },
  { icon: Phone, title: '전화 서비스', description: '국제전화, 팩스 가능' },
  { icon: Shield, title: '보안 시스템', description: '24시간 보안, 출입통제' },
  { icon: Users, title: '네트워킹', description: '정기 네트워킹 이벤트' },
  { icon: Zap, title: '비즈니스 지원', description: '법무, 회계, 마케팅 지원' }
]

const testimonials = [
  {
    company: '테크스타트업',
    ceo: '김대표',
    content: '협회 공간에서 시작해서 시리즈 A까지 성공했습니다. 네트워킹과 인프라가 정말 도움이 되었어요.',
    rating: 5
  },
  {
    company: '이노베이션랩',
    ceo: '이대표',
    content: '다른 스타트업들과의 교류가 활발하고, 시설도 깔끔해서 만족하고 있습니다.',
    rating: 5
  },
  {
    company: '퓨처테크',
    ceo: '박대표',
    content: '합리적인 가격에 좋은 환경을 제공해주셔서 초기 부담을 많이 줄일 수 있었습니다.',
    rating: 5
  }
]

export default function SpacePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [selectedSpaceType, setSelectedSpaceType] = useState(spaceTypes[1])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 via-cyan-600/10 to-blue-600/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-teal-600 transition-colors">
                홈
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/startup" className="hover:text-teal-600 transition-colors">
                스타트업 지원
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">공간 지원</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  공간 지원
                </h1>
                <p className="text-lg text-gray-600">
                  성장하는 스타트업을 위한 최적의 업무 공간
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-1">3개</div>
                <div className="text-sm text-gray-600">센터 운영</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-1">300+</div>
                <div className="text-sm text-gray-600">입주기업</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-1">24/7</div>
                <div className="text-sm text-gray-600">이용가능</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-1">95%</div>
                <div className="text-sm text-gray-600">만족도</div>
              </div>
            </div>

            {/* Back Button */}
            <Link href="/startup">
              <Button variant="outline" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                스타트업 지원으로 돌아가기
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Space Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                다양한 공간 옵션
              </h2>
              <p className="text-lg text-gray-600">
                스타트업의 성장 단계와 규모에 맞는 최적의 공간을 선택하세요
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {spaceTypes.map((space, index) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedSpaceType(space)}
                  className="cursor-pointer"
                >
                  <Card className={`h-full hover:shadow-2xl transition-all duration-300 group ${
                    space.popular ? 'ring-2 ring-teal-600' : ''
                  } ${selectedSpaceType.id === space.id ? 'shadow-2xl ring-2 ring-teal-600' : ''}`}>
                    {space.popular && (
                      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-center py-2 text-sm font-semibold">
                        인기
                      </div>
                    )}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={space.image}
                        alt={space.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors">
                        {space.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{space.subtitle}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-teal-600">{space.price}</span>
                        <Badge variant="outline">{space.capacity}</Badge>
                      </div>
                      <ul className="space-y-2">
                        {space.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
                        {selectedSpaceType.id === space.id ? '선택됨' : '선택하기'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Space Details */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={selectedSpaceType.image}
                    alt={selectedSpaceType.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{selectedSpaceType.title}</h3>
                    {selectedSpaceType.popular && (
                      <Badge className="bg-teal-600 text-white">인기</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6">{selectedSpaceType.subtitle}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-sm text-gray-500">가격</span>
                      <div className="text-xl font-bold text-teal-600">{selectedSpaceType.price}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">수용인원</span>
                      <div className="text-xl font-bold text-gray-900">{selectedSpaceType.capacity}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">포함 서비스</h4>
                    <ul className="space-y-2">
                      {selectedSpaceType.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      견학 예약
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Mail className="w-4 h-4 mr-2" />
                      문의하기
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">센터 위치</h2>
              <p className="text-lg text-gray-600">서울 주요 업무지구에 위치한 3개 센터</p>
            </div>

            <Tabs defaultValue={locations[0].id} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                {locations.map((location) => (
                  <TabsTrigger key={location.id} value={location.id}>
                    {location.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {locations.map((location) => (
                <TabsContent key={location.id} value={location.id}>
                  <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={location.image}
                          alt={location.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">{location.name}</h3>
                        <div className="flex items-start gap-2 mb-4 text-gray-600">
                          <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <div>
                            <div>{location.address}</div>
                            <div className="text-sm">{location.floors} ({location.area})</div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">주변 편의시설</h4>
                          <div className="flex flex-wrap gap-2">
                            {location.features.map((feature) => (
                              <Badge key={feature} variant="secondary">{feature}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <span className="text-sm text-gray-500">코워킹</span>
                            <div className="text-lg font-bold text-teal-600">{location.coworking}석</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">전용데스크</span>
                            <div className="text-lg font-bold text-teal-600">{location.dedicated}석</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">프라이빗</span>
                            <div className="text-lg font-bold text-teal-600">{location.private}실</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">회의실</span>
                            <div className="text-lg font-bold text-teal-600">{location.meeting}실</div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                            <MapPin className="w-4 h-4 mr-2" />
                            지도보기
                          </Button>
                          <Button variant="outline">
                            <Camera className="w-4 h-4 mr-2" />
                            360° 투어
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">편의시설</h2>
              <p className="text-lg text-gray-600">업무 효율성을 높이는 다양한 서비스</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {amenities.map((amenity, index) => {
                const Icon = amenity.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-teal-100 to-cyan-100 mb-4">
                          <Icon className="w-6 h-6 text-teal-600" />
                        </div>
                        <h3 className="font-semibold mb-2 text-gray-900">{amenity.title}</h3>
                        <p className="text-sm text-gray-600">{amenity.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">입주기업 후기</h2>
              <p className="text-lg text-gray-600">실제 이용하고 있는 기업들의 생생한 후기</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                          {testimonial.ceo[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.ceo}</div>
                          <div className="text-sm text-gray-600">{testimonial.company}</div>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              성장하는 스타트업과 함께하세요
            </h2>
            <p className="text-xl text-white/90 mb-8">
              최고의 업무 환경에서 여러분의 아이디어를 현실로 만들어보세요.<br />
              지금 바로 견학을 예약하고 특별 할인 혜택을 받아보세요.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 shadow-lg">
                <Camera className="mr-2 h-5 w-5" />
                무료 견학 예약
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                <Mail className="mr-2 h-5 w-5" />
                상담 문의
              </Button>
            </div>
            <p className="text-white/75 text-sm mt-6">
              * 협회 회원사는 추가 10% 할인 혜택
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}