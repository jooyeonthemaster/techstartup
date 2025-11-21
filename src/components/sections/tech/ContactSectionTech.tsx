'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send
} from 'lucide-react'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactSectionTech() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '100px' })
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

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
  }

  const isFormValid = formData.name && formData.email && formData.subject && formData.message

  return (
    <section id="contact" className="py-24 mt-[500px] bg-muted/20 relative">
      <div ref={containerRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl lg:text-8xl font-bold mb-8 leading-[0.9] tracking-tight text-foreground font-mono">
            <span className="block text-foreground font-mono">
              CONTACT
            </span>
            <span className="block text-accent font-mono">
              US
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            기술벤처스타트업협회와 함께하세요. 전문가가 신속하게 답변드립니다.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="p-8 bg-card border-border">
              <h3 className="text-xl font-bold mb-6 text-foreground">문의하기</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300"
                      placeholder="홍길동"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      회사명
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300"
                      placeholder="(주)테크벤처"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300"
                      placeholder="contact@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      전화번호
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300"
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
                    className="w-full px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300"
                    required
                  >
                    <option value="">선택해주세요</option>
                    <option value="general">일반 문의</option>
                    <option value="membership">협회 가입</option>
                    <option value="program">프로그램 신청</option>
                    <option value="investment">투자 유치 지원</option>
                    <option value="tech">기술 개발 지원</option>
                    <option value="global">글로벌 진출 지원</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    문의 내용 *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 resize-none"
                    placeholder="문의하실 내용을 입력해주세요..."
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={!isFormValid || isFormSubmitting}
                  className={`w-full ${
                    isFormValid 
                      ? 'bg-foreground text-background hover:bg-foreground/90' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {isFormSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border border-background border-t-transparent rounded-full mr-2"
                      />
                      전송 중...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      문의 보내기
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Methods */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-bold mb-6 text-foreground">연락처 정보</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-muted/10 rounded border border-border/30">
                  <Phone className="w-5 h-5 text-foreground" />
                  <div>
                    <div className="font-medium text-foreground">02-336-0250</div>
                    <div className="text-sm text-muted-foreground">평일 09:00-18:00</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-muted/10 rounded border border-border/30">
                  <Mail className="w-5 h-5 text-foreground" />
                  <div>
                    <div className="font-medium text-foreground">tvs@techventure.co.kr</div>
                    <div className="text-sm text-muted-foreground">24시간 접수</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-muted/10 rounded border border-border/30">
                  <MapPin className="w-5 h-5 text-foreground" />
                  <div>
                    <div className="font-medium text-foreground">서울 강남구 테헤란로 123</div>
                    <div className="text-sm text-muted-foreground">강남역 3번 출구 도보 5분</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-muted/10 border-border">
              <h4 className="text-lg font-bold mb-4 text-foreground">빠른 연결</h4>
              <div className="space-y-3">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90 justify-start">
                  <Phone className="w-4 h-4 mr-3" />
                  전화 상담
                </Button>
                <Button variant="outline" className="w-full justify-start border-border hover:bg-muted">
                  <Mail className="w-4 h-4 mr-3" />
                  이메일 문의
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}