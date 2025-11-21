'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SectionTransition from '@/components/ui/section-transition'
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
  Calendar,
  Zap,
  Globe,
  Sparkles,
  MessageCircle,
  PhoneCall,
  Navigation,
  Wifi,
  Shield,
  Star,
  Headphones,
  Video,
  Bot,
  TrendingUp
} from 'lucide-react'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactSectionEnhanced() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [activeContact, setActiveContact] = useState(0)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const floatingY = useTransform(scrollYProgress, [0, 1], ['0px', '-100px'])

  useEffect(() => {
    setIsMounted(true)
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const contactMethods = [
    {
      id: 'phone',
      icon: Phone,
      title: '전화 상담',
      subtitle: 'Instant Call Support',
      value: '02-336-0250',
      description: '즉시 전문가와 연결',
      availability: '평일 09:00 - 18:00',
      responseTime: '즉시 연결',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      isOnline: true,
      priority: 'high'
    },
    {
      id: 'email',
      icon: Mail,
      title: '이메일 문의',
      subtitle: '24/7 Email Support',
      value: 'tvs@techventure.co.kr',
      description: '24시간 접수 가능',
      availability: '연중무휴',
      responseTime: '평균 2시간',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      isOnline: true,
      priority: 'medium'
    },
    {
      id: 'visit',
      icon: MapPin,
      title: '방문 상담',
      subtitle: 'On-site Consultation',
      value: '서울 강남구 테헤란로 123',
      description: '직접 방문 상담',
      availability: '사전 예약 필수',
      responseTime: '예약 후 방문',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      isOnline: false,
      priority: 'medium'
    },
    {
      id: 'chat',
      icon: MessageCircle,
      title: '실시간 채팅',
      subtitle: 'Live Chat Support',
      value: '온라인 상담원 대기중',
      description: '즉시 답변 가능',
      availability: '평일 09:00 - 22:00',
      responseTime: '평균 30초',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
      isOnline: true,
      priority: 'high'
    }
  ]

  const services = [
    { label: '일반 문의', value: 'general', icon: MessageSquare },
    { label: '협회 가입', value: 'membership', icon: User },
    { label: '프로그램 신청', value: 'program', icon: Calendar },
    { label: '투자 유치 지원', value: 'investment', icon: TrendingUp },
    { label: '기술 개발 지원', value: 'tech', icon: Zap },
    { label: '글로벌 진출 지원', value: 'global', icon: Globe }
  ]

  const officeFeatures = [
    { icon: Wifi, label: '고속 인터넷', description: '기가비트 전용선' },
    { icon: Shield, label: '보안 시설', description: '24시간 보안 시스템' },
    { icon: Video, label: '화상 회의실', description: '최신 AV 장비 완비' },
    { icon: Bot, label: 'AI 안내 시스템', description: '스마트 빌딩 솔루션' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsFormSubmitting(true)
    
    // 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsFormSubmitting(false)
    // 성공 처리 로직
  }

  const isFormValid = formData.name && formData.email && formData.subject && formData.message

  return (
    <SectionTransition id="contact" className="py-32 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Floating Background Elements */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute top-32 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-green-500/10 to-orange-500/10 rounded-full blur-3xl" />
          
          {/* Floating Icons */}
          <motion.div
            style={{ y: floatingY }}
            className="absolute top-1/4 left-1/4"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center opacity-20"
            >
              <Phone className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.div
            style={{ y: floatingY }}
            className="absolute top-1/3 right-1/3"
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="w-6 h-6 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg flex items-center justify-center opacity-20"
            >
              <Mail className="w-3 h-3 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-6"
          >
            <Badge variant="outline" className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 mr-2" />
              24/7 Professional Support
            </Badge>
          </motion.div>
          
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              언제든지 연결되는
            </span>
            <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent">
              스마트 소통
            </span>
          </h2>
          
          <motion.p 
            className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            궁금한 점이 있으시거나 협회 가입을 원하신다면 <span className="text-primary font-semibold">언제든지</span> 연락주세요. 
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold"> 전문가</span>가 친절하게 상담해드립니다.
          </motion.p>

          {/* Real-time Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center justify-center space-x-6 text-sm"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-muted-foreground">온라인 상담원 대기중</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {isMounted && currentTime ? currentTime.toLocaleTimeString('ko-KR', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                }) : '로딩중...'}
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center space-x-2">
              <Headphones className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">평균 응답시간 30초</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setActiveContact(index)}
                  className="cursor-pointer group"
                >
                  <Card className={`p-6 h-full bg-gradient-to-br ${method.bgGradient} border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl relative overflow-hidden ${activeContact === index ? 'ring-2 ring-primary/20 border-primary/50' : ''}`}>
                    {/* Status Indicator */}
                    <div className="absolute top-3 right-3">
                      <div className={`w-3 h-3 rounded-full ${method.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                    </div>
                    
                    {/* Priority Badge */}
                    {method.priority === 'high' && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="outline" className="text-xs bg-red-500/10 text-red-600 border-red-500/20">
                          우선
                        </Badge>
                      </div>
                    )}
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className={`w-12 h-12 bg-gradient-to-r ${method.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                        {method.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3">{method.subtitle}</p>
                      
                      <p className="text-sm font-medium text-foreground mb-2">
                        {method.value}
                      </p>
                      
                      <p className="text-xs text-muted-foreground mb-3">
                        {method.description}
                      </p>
                      
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {method.availability}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Zap className="w-3 h-3 mr-1" />
                          {method.responseTime}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Card className="p-8 bg-gradient-to-br from-background/80 to-accent/10 border-border/50 backdrop-blur-sm relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 opacity-50" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">스마트 문의하기</h3>
                    <p className="text-muted-foreground">AI 기반 실시간 응답 시스템</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-600">실시간 처리</span>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        이름 *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                        placeholder="홍길동"
                        required
                      />
                      {formData.name && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-3 top-10"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </motion.div>
                      )}
                    </motion.div>
                    
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <Building className="w-4 h-4 inline mr-2" />
                        회사명
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                        placeholder="(주)테크벤처"
                      />
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        이메일 *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                        placeholder="contact@example.com"
                        required
                      />
                      {formData.email && formData.email.includes('@') && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-3 top-10"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </motion.div>
                      )}
                    </motion.div>
                    
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        연락처
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                        placeholder="010-1234-5678"
                      />
                    </motion.div>
                  </div>

                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      문의 유형 *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                      required
                    >
                      <option value="">선택해주세요</option>
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      문의 내용 *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
                      placeholder="문의하실 내용을 자세히 적어주세요..."
                      required
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                    whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                  >
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={!isFormValid || isFormSubmitting}
                      className={`w-full py-4 relative overflow-hidden transition-all duration-300 ${
                        isFormValid 
                          ? 'bg-gradient-to-r from-primary to-blue-500 text-primary-foreground hover:shadow-lg' 
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      {isFormSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          AI 분석 중...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          스마트 전송
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>AI가 자동으로 적절한 담당자에게 전달합니다</span>
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>

          {/* Office Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Office Details */}
            <Card className="p-8 bg-gradient-to-br from-background/80 to-accent/10 border-border/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center">
                <Building className="w-6 h-6 mr-2" />
                스마트 오피스
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">본사 위치</h4>
                    <p className="text-muted-foreground mb-2">서울특별시 강남구 테헤란로 123</p>
                    <p className="text-sm text-muted-foreground">지하철 2호선 강남역 3번 출구 도보 5분</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">운영 시간</h4>
                    <p className="text-muted-foreground mb-1">평일: 09:00 - 18:00</p>
                    <p className="text-sm text-muted-foreground">토요일: 10:00 - 15:00 (사전 예약)</p>
                    <p className="text-sm text-muted-foreground">일요일 및 공휴일: 휴무</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">교통 안내</h4>
                    <p className="text-muted-foreground mb-1">🚇 지하철: 강남역 3번 출구</p>
                    <p className="text-muted-foreground mb-1">🚌 버스: 146, 240, 401, 472</p>
                    <p className="text-sm text-muted-foreground">🚗 주차: 건물 지하 1-3층 (2시간 무료)</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Office Features */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20 backdrop-blur-sm">
              <h4 className="text-lg font-semibold mb-6 text-foreground">스마트 오피스 시설</h4>
              <div className="grid grid-cols-2 gap-4">
                {officeFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-background/30 backdrop-blur-sm"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm font-medium text-foreground">{feature.label}</div>
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Card>

            {/* Interactive Map Placeholder */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            >
              <Card className="p-8 text-center bg-gradient-to-br from-green-500/5 to-blue-500/5 border-green-500/20 backdrop-blur-sm relative overflow-hidden">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg"
                />
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-block mb-4"
                  >
                    <Globe className="w-12 h-12 text-green-500 mx-auto" />
                  </motion.div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">인터랙티브 지도</h4>
                  <p className="text-muted-foreground mb-4">
                    실시간 교통 정보와 함께<br />
                    최적의 경로를 확인하세요
                  </p>
                  <Button variant="outline" size="sm">
                    지도에서 보기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/5 via-background to-blue-500/5 border border-primary/20 backdrop-blur-sm relative overflow-hidden">
            {/* Background Effects */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full blur-3xl"
            />
            
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block mb-6"
              >
                <Zap className="w-12 h-12 text-primary mx-auto" />
              </motion.div>
              
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                더 빠른 연결을 원하신다면?
              </h3>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                AI 기반 실시간 상담 시스템으로 즉시 전문가와 연결해보세요. 
                평균 30초 이내 응답을 보장합니다.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-blue-500 text-primary-foreground px-8">
                    <PhoneCall className="w-5 h-5 mr-2" />
                    지금 전화하기
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="px-8 backdrop-blur-sm">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    실시간 채팅 시작
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="px-8 backdrop-blur-sm">
                    <Calendar className="w-5 h-5 mr-2" />
                    상담 예약하기
                  </Button>
                </motion.div>
              </div>
              
              <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>평균 만족도 4.9/5</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>24시간 이내 100% 응답</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </SectionTransition>
  )
}
