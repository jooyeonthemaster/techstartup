'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronRight,
  Globe,
  Calendar,
  Users,
  Briefcase,
  HelpCircle,
  FileText,
  CheckCircle,
  ArrowRight,
  Building2,
  Sparkles,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  HeadphonesIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const contactInfo = {
  address: '서울특별시 강남구 테헤란로 123 테크빌딩 15층',
  phone: '02-1234-5678',
  fax: '02-1234-5679',
  email: 'info@ktvsa.or.kr',
  hours: '평일 09:00 - 18:00',
  kakao: '@기술벤처스타트업협회'
}

const departments = [
  {
    name: '회원 서비스팀',
    email: 'member@ktvsa.or.kr',
    phone: '02-1234-5678 (내선 1)',
    description: '회원 가입, 혜택 안내, 회원사 지원',
    icon: Users
  },
  {
    name: '투자 지원팀',
    email: 'investment@ktvsa.or.kr',
    phone: '02-1234-5678 (내선 2)',
    description: '투자 연계, IR 지원, 투자자 매칭',
    icon: Briefcase
  },
  {
    name: '교육 사업팀',
    email: 'education@ktvsa.or.kr',
    phone: '02-1234-5678 (내선 3)',
    description: '교육 프로그램, 멘토링, 워크샵',
    icon: FileText
  },
  {
    name: '글로벌 협력팀',
    email: 'global@ktvsa.or.kr',
    phone: '02-1234-5678 (내선 4)',
    description: '해외 진출 지원, 글로벌 파트너십',
    icon: Globe
  }
]

const faqCategories = [
  {
    category: '회원 가입',
    icon: Users,
    faqs: [
      {
        question: '회원 가입 자격은 어떻게 되나요?',
        answer: '기술 기반 스타트업으로서 사업자등록증을 보유한 기업이면 가입 가능합니다. Pre-Seed부터 Series C+ 단계까지 모든 성장 단계의 스타트업을 환영합니다.'
      },
      {
        question: '회원 가입 절차는 어떻게 되나요?',
        answer: '온라인 신청서 작성 → 서류 심사 (3-5일) → 승인 통보 → 회비 납부 → 오리엔테이션 참석의 순서로 진행됩니다.'
      },
      {
        question: '회비는 얼마인가요?',
        answer: '스타터 플랜 월 30만원, 그로스 플랜 월 50만원, 엔터프라이즈 플랜은 맞춤형 견적으로 제공됩니다. 연간 일시납 시 10% 할인이 적용됩니다.'
      }
    ]
  },
  {
    category: '지원 프로그램',
    icon: Briefcase,
    faqs: [
      {
        question: '엑셀러레이팅 프로그램 지원 자격은?',
        answer: 'Seed ~ Series A 단계의 스타트업으로, 혁신적인 기술과 비즈니스 모델을 보유한 기업이면 지원 가능합니다.'
      },
      {
        question: '투자 연계 서비스는 어떻게 이용하나요?',
        answer: '회원사는 IR 자료 작성 지원, 투자자 매칭, 피칭 데이 참가 등의 서비스를 이용할 수 있습니다. 담당 매니저가 1:1로 지원합니다.'
      },
      {
        question: '멘토링은 어떻게 신청하나요?',
        answer: '회원 포털에서 원하는 멘토와 일정을 선택하여 신청할 수 있습니다. 스타터 플랜은 월 1회, 그로스 플랜은 주 1회 무료입니다.'
      }
    ]
  },
  {
    category: '시설 이용',
    icon: Building2,
    faqs: [
      {
        question: '코워킹 스페이스는 어디에 있나요?',
        answer: '서울 강남, 판교, 성수 등 10개 지점을 운영하고 있으며, 회원사는 할인된 가격으로 이용 가능합니다.'
      },
      {
        question: '회의실 예약은 어떻게 하나요?',
        answer: '회원 포털 또는 모바일 앱을 통해 실시간으로 예약 가능합니다. 회원 등급에 따라 무료 이용 시간이 제공됩니다.'
      }
    ]
  }
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [selectedCategory, setSelectedCategory] = useState('회원 가입')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

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
              <HeadphonesIcon className="w-4 h-4 mr-2" />
              언제든 문의하세요
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              문의하기
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              기술벤처스타트업협회가 여러분의 성공을 위해 함께합니다<br />
              궁금한 점이 있으시면 언제든 연락 주세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="contact">문의하기</TabsTrigger>
              <TabsTrigger value="faq">자주 묻는 질문</TabsTrigger>
              <TabsTrigger value="location">오시는 길</TabsTrigger>
            </TabsList>

            {/* Contact Tab */}
            <TabsContent value="contact" className="mt-8">
              <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <Card className="shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl">문의 남기기</CardTitle>
                      <p className="text-gray-600 dark:text-gray-400">
                        아래 양식을 작성해 주시면 빠른 시일 내에 답변 드리겠습니다
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">이름 *</label>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              placeholder="홍길동"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">회사명</label>
                            <Input
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="테크스타트"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">이메일 *</label>
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              placeholder="email@example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">연락처</label>
                            <Input
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="010-1234-5678"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">문의 유형</label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                            name="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          >
                            <option value="">선택해주세요</option>
                            <option value="membership">회원 가입 문의</option>
                            <option value="program">프로그램 문의</option>
                            <option value="investment">투자 연계 문의</option>
                            <option value="partnership">파트너십 제안</option>
                            <option value="other">기타 문의</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">문의 내용 *</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                            placeholder="문의하실 내용을 자세히 작성해 주세요"
                          />
                        </div>

                        <div className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" required />
                          <label className="text-sm text-gray-600 dark:text-gray-400">
                            개인정보 수집 및 이용에 동의합니다. 수집된 정보는 문의 답변 용도로만 사용됩니다.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                        >
                          문의 전송
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Info Sidebar */}
                <div className="space-y-6">
                  {/* Quick Contact */}
                  <Card className="shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl">연락처 정보</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <p className="font-medium">주소</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {contactInfo.address}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <p className="font-medium">전화</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {contactInfo.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <p className="font-medium">이메일</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {contactInfo.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                        <div>
                          <p className="font-medium">운영 시간</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {contactInfo.hours}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-yellow-500 mt-1" />
                        <div>
                          <p className="font-medium">카카오톡</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {contactInfo.kakao}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Department Contacts */}
                  <Card className="shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl">부서별 연락처</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {departments.map((dept, index) => (
                        <div key={index} className="border-l-2 border-blue-600 pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <dept.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <h4 className="font-semibold">{dept.name}</h4>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            {dept.description}
                          </p>
                          <div className="text-sm space-y-1">
                            <p className="text-gray-700 dark:text-gray-300">
                              📧 {dept.email}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              ☎️ {dept.phone}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Social Links */}
                  <Card className="shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-0">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 text-center">소셜 미디어</h3>
                      <div className="flex justify-center gap-3">
                        {socialLinks.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all duration-300"
                            aria-label={link.label}
                          >
                            <link.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="mt-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    자주 묻는 질문
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    회원님들이 자주 문의하시는 내용을 정리했습니다
                  </p>
                </div>

                {/* FAQ Categories */}
                <div className="flex justify-center gap-2 mb-8">
                  {faqCategories.map((cat) => (
                    <Badge
                      key={cat.category}
                      variant={selectedCategory === cat.category ? 'default' : 'outline'}
                      className="cursor-pointer px-4 py-2"
                      onClick={() => setSelectedCategory(cat.category)}
                    >
                      <cat.icon className="w-4 h-4 mr-2" />
                      {cat.category}
                    </Badge>
                  ))}
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                  {faqCategories
                    .find(cat => cat.category === selectedCategory)
                    ?.faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                              <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                  {faq.question}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    원하는 답변을 찾지 못하셨나요?
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    1:1 문의하기
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="mt-8">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    오시는 길
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    기술벤처스타트업협회 본사 위치 안내
                  </p>
                </div>

                <Card className="overflow-hidden shadow-xl">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                    {/* Map placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                        <p className="text-gray-600 dark:text-gray-400">지도 영역</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3">주소</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {contactInfo.address}
                        </p>
                        <Button variant="outline" className="mb-4">
                          <MapPin className="mr-2 h-4 w-4" />
                          네이버 지도로 보기
                        </Button>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3">대중교통</h3>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <p>🚇 지하철: 2호선 강남역 3번 출구 도보 5분</p>
                          <p>🚌 버스: 간선 140, 144, 145 / 지선 3412, 4412</p>
                          <p>🚗 주차: 건물 내 주차장 이용 (2시간 무료)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
              언제든 연락 주세요
            </h2>
            <p className="text-xl text-white/90 mb-8">
              기술벤처스타트업협회는 항상 열려있습니다<br />
              여러분의 성공을 위해 최선을 다하겠습니다
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
                상담 예약하기
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                카카오톡 문의
                <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}