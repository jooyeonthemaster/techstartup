'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Building2,
  User,
  Sparkles,
  CheckCircle,
  Globe,
  ArrowRight,
  Loader2,
  Star,
  Navigation
} from 'lucide-react'

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const validateField = (name: string, value: string) => {
    const errors: {[key: string]: string} = {}
    
    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        errors.email = '올바른 이메일 형식이 아닙니다'
      }
    }
    
    if (name === 'phone' && value) {
      const phoneRegex = /^[0-9-]+$/
      if (!phoneRegex.test(value)) {
        errors.phone = '숫자와 하이픈(-)만 입력 가능합니다'
      }
    }
    
    setFormErrors(prev => ({ ...prev, ...errors, [name]: errors[name] || '' }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: '전화 문의',
      content: '02-1234-5678',
      subContent: '평일 09:00 - 18:00',
      color: 'from-blue-500 to-cyan-600',
      delay: 0
    },
    {
      icon: Mail,
      title: '이메일',
      content: 'info@techventure.or.kr',
      subContent: '24시간 접수 가능',
      color: 'from-purple-500 to-pink-600',
      delay: 100
    },
    {
      icon: MapPin,
      title: '오시는 길',
      content: '서울특별시 강남구',
      subContent: '테헤란로 123, 15층',
      color: 'from-green-500 to-emerald-600',
      delay: 200
    },
    {
      icon: Clock,
      title: '운영 시간',
      content: '평일 09:00 - 18:00',
      subContent: '토/일/공휴일 휴무',
      color: 'from-orange-500 to-red-600',
      delay: 300
    }
  ]

  const quickLinks = [
    { icon: MessageCircle, label: '카카오톡 상담', badge: '실시간' },
    { icon: Building2, label: '오프라인 미팅', badge: '예약' },
    { icon: Globe, label: '화상 회의', badge: 'Zoom' }
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            CONTACT US
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            언제든지 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">문의하세요</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            협회 가입 및 프로그램 참여에 대해 궁금하신 점이 있으시면 언제든지 문의해주세요
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {quickLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <button
                key={index}
                className="group flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <Icon className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
                <span className="font-medium">{link.label}</span>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 text-xs">
                  {link.badge}
                </Badge>
              </button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {/* Enhanced Contact Form - only form remains */}
          <div className="lg:col-span-1">
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`} style={{ transitionDelay: '400ms' }}>
              <Card className="relative overflow-hidden p-10 bg-white rounded-2xl border border-gray-200 shadow-md">
                {/* Success Overlay */}
                {isSubmitted && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur z-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">문의가 접수되었습니다!</h3>
                      <p className="text-muted-foreground">24시간 이내에 답변드리겠습니다.</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">문의 양식</h3>
                  <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
                    평균 응답시간 2시간
                  </Badge>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        이름 *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                            focusedField === 'name' 
                              ? 'border-blue-500 ring-4 ring-blue-500/10' 
                              : 'border-gray-300 hover:border-gray-400'
                          } focus:outline-none bg-white`}
                          placeholder="홍길동"
                          required
                        />
                        <User className={`absolute right-3 top-3.5 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-blue-500' : 'text-gray-400'}`} />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        회사명
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${focusedField === 'company' ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-gray-300 hover:border-gray-400'} focus:outline-none bg-white`}
                          placeholder="(주)테크벤처"
                        />
                        <Building2 className={`absolute right-3 top-3.5 w-5 h-5 transition-colors ${focusedField === 'company' ? 'text-blue-500' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        이메일 *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                            formErrors.email 
                              ? 'border-red-500 ring-4 ring-red-500/10' 
                              : focusedField === 'email' 
                                ? 'border-blue-500 ring-4 ring-blue-500/10' 
                                : 'border-gray-300 hover:border-gray-400'
                          } focus:outline-none bg-white`}
                          placeholder="email@example.com"
                          required
                        />
                        <Mail className={`absolute right-3 top-3.5 w-5 h-5 transition-colors ${formErrors.email ? 'text-red-500' : focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'}`} />
                      </div>
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        연락처
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                            formErrors.phone 
                              ? 'border-red-500 ring-4 ring-red-500/10' 
                              : focusedField === 'phone' 
                                ? 'border-blue-500 ring-4 ring-blue-500/10' 
                                : 'border-gray-300 hover:border-gray-400'
                          } focus:outline-none bg-white`}
                          placeholder="010-1234-5678"
                        />
                        <Phone className={`absolute right-3 top-3.5 w-5 h-5 transition-colors ${formErrors.phone ? 'text-red-500' : focusedField === 'phone' ? 'text-blue-500' : 'text-gray-400'}`} />
                      </div>
                      {formErrors.phone && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      문의 유형 *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${focusedField === 'subject' ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-gray-300 hover:border-gray-400'} focus:outline-none appearance-none bg-white cursor-pointer`}
                      required
                    >
                      <option value="">선택해주세요</option>
                      <option value="general">일반 문의</option>
                      <option value="membership">협회 가입</option>
                      <option value="program">프로그램 신청</option>
                      <option value="partnership">파트너십</option>
                      <option value="other">기타</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      문의 내용 *
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={6}
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none ${focusedField === 'message' ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-gray-300 hover:border-gray-400'} focus:outline-none bg-white`}
                        placeholder="문의하실 내용을 자세히 적어주세요..."
                        required
                      />
                      <MessageCircle className={`absolute right-3 top-3 w-5 h-5 transition-colors ${focusedField === 'message' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formData.message.length}/500자
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-lg bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        전송 중...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        문의 보내기
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">보통 24시간 내 응답합니다</p>
                </form>
              </Card>
            </div>
          </div>
        </div>

      {/* Map section removed as requested */}
      </div>
    </section>
  )
}