'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
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
const contactInfo = {
  address: '서울시 중구 퇴계로 36길 2, 충무로관 신관 B103호',
  phone: '02-336-0250',
  fax: '',
  email: 'tvs@techventure.co.kr',
  hours: '평일 09:00 - 18:00',
  kakao: '@기술벤처스타트업협회'
}

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
        </div>
      </section>
    </div>
  )
}