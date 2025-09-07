'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  User,
  Building,
  ArrowRight,
  CheckCircle,
  Calendar
} from 'lucide-react'

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const contactInfo = [
    {
      icon: Phone,
      title: '전화 문의',
      content: '02-1234-5678',
      description: '평일 09:00 - 18:00',
      gradient: 'from-blue-500/10 to-cyan-500/10',
      iconBg: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: '이메일 문의',
      content: 'info@techventure.or.kr',
      description: '24시간 접수 가능',
      gradient: 'from-green-500/10 to-emerald-500/10',
      iconBg: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: '방문 상담',
      content: '서울특별시 강남구 테헤란로 123',
      description: '사전 예약 필수',
      gradient: 'from-purple-500/10 to-pink-500/10',
      iconBg: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      title: '운영 시간',
      content: '평일 09:00 - 18:00',
      description: '토/일/공휴일 휴무',
      gradient: 'from-orange-500/10 to-red-500/10',
      iconBg: 'from-orange-500 to-red-500'
    }
  ]

  const services = [
    { label: '일반 문의', value: 'general' },
    { label: '협회 가입', value: 'membership' },
    { label: '프로그램 신청', value: 'program' },
    { label: '투자 유치 지원', value: 'investment' },
    { label: '기술 개발 지원', value: 'tech' },
    { label: '글로벌 진출 지원', value: 'global' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 폼 제출 로직 구현
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" ref={containerRef} className="py-24 bg-gradient-to-b from-accent/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-background/50 backdrop-blur-sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              언제든지 연락주세요
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              성공을 함께 만들어갑니다
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            궁금한 점이 있으시거나 협회 가입을 원하신다면 언제든지 연락주세요. 
            전문가가 친절하게 상담해드립니다.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-foreground">연락처 정보</h3>
            <div className="grid gap-6 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="group"
                  >
                    <Card className={`p-6 bg-gradient-to-br ${info.gradient} border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg`}>
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${info.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                            {info.title}
                          </h4>
                          <p className="text-foreground font-medium mb-1">
                            {info.content}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-8 text-center border border-border/50"
            >
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">오시는 길</h4>
              <p className="text-muted-foreground mb-4">
                지하철 2호선 강남역 3번 출구에서 도보 5분<br />
                주차 공간이 제한되어 있으니 대중교통을 이용해주세요.
              </p>
              <Button variant="outline" size="sm">
                지도에서 보기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background to-accent/5 border-border/50 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-foreground">문의하기</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      이름 *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="홍길동"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      회사명
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="(주)테크벤처"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      이메일 *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="contact@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      연락처
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="010-1234-5678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    문의 유형 *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    required
                  >
                    <option value="">선택해주세요</option>
                    {services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    문의 내용 *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder="문의하실 내용을 자세히 적어주세요..."
                    required
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    문의 보내기
                  </Button>
                </motion.div>

                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>보통 24시간 이내에 답변드립니다</span>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-20 p-8 rounded-3xl bg-gradient-to-r from-primary/5 via-background to-primary/5 border border-primary/10"
        >
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            더 빠른 상담을 원하신다면?
          </h3>
          <p className="text-muted-foreground mb-6">
            전화 상담을 통해 즉시 전문가와 연결해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 px-8">
                <Phone className="w-5 h-5 mr-2" />
                지금 전화하기
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="px-8">
                <Calendar className="w-5 h-5 mr-2" />
                상담 예약하기
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
