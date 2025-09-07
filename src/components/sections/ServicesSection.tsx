'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Rocket, 
  DollarSign, 
  Users, 
  BookOpen, 
  Shield, 
  Globe, 
  Lightbulb,
  TrendingUp,
  ArrowRight,
  Zap
} from 'lucide-react'

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['30px', '-30px'])

  const services = [
    {
      icon: Rocket,
      title: '기술 개발 지원',
      description: 'R&D 자금 지원, 기술 컨설팅, 특허 출원 지원을 통한 혁신 기술 개발',
      features: ['연구개발 자금 지원', '기술 멘토링', '특허 출원 컨설팅', '기술 사업화 지원'],
      gradient: 'from-blue-500/10 to-cyan-500/10',
      iconBg: 'from-blue-500 to-cyan-500'
    },
    {
      icon: DollarSign,
      title: '투자 유치 지원',
      description: '투자자 매칭, 사업계획서 작성, IR 피칭까지 투자 유치 전 과정 지원',
      features: ['투자자 네트워킹', 'IR 데크 제작', '투자 전략 수립', '후속 투자 연계'],
      gradient: 'from-green-500/10 to-emerald-500/10',
      iconBg: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: '네트워킹 지원',
      description: '업계 전문가, 동료 기업가들과의 네트워킹을 통한 협업 기회 창출',
      features: ['정기 네트워킹 행사', '업계 전문가 매칭', '파트너십 중개', '멘토링 프로그램'],
      gradient: 'from-purple-500/10 to-pink-500/10',
      iconBg: 'from-purple-500 to-pink-500'
    },
    {
      icon: BookOpen,
      title: '교육 프로그램',
      description: '창업부터 경영, 최신 기술 트렌드까지 체계적인 교육 과정 제공',
      features: ['창업 교육과정', '경영 역량 강화', '기술 트렌드 세미나', '리더십 개발'],
      gradient: 'from-orange-500/10 to-red-500/10',
      iconBg: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: '정책 지원',
      description: '정부 정책 정보 제공, 지원사업 신청 지원, 규제 개선 건의',
      features: ['정책 정보 제공', '지원사업 매칭', '규제 개선 건의', '정부 협력 사업'],
      gradient: 'from-indigo-500/10 to-blue-500/10',
      iconBg: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Globe,
      title: '글로벌 진출 지원',
      description: '해외 시장 진출을 위한 현지 파트너 연결 및 국제 전시회 참가 지원',
      features: ['해외 파트너 매칭', '국제 전시회 참가', '현지 법인 설립 지원', '글로벌 마케팅'],
      gradient: 'from-teal-500/10 to-green-500/10',
      iconBg: 'from-teal-500 to-green-500'
    }
  ]

  const stats = [
    { icon: TrendingUp, number: '95%', label: '성공률', description: '지원 기업 중 성장 달성' },
    { icon: Zap, number: '24시간', label: '응답시간', description: '평균 지원 요청 응답 시간' },
    { icon: Users, number: '500+', label: '전문가', description: '다양한 분야 멘토 풀' },
    { icon: Globe, number: '30+', label: '글로벌', description: '해외 진출 성공 사례' }
  ]

  return (
    <section id="services" ref={containerRef} className="py-24 bg-gradient-to-b from-accent/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-background/50 backdrop-blur-sm">
            <Lightbulb className="w-4 h-4 mr-2" />
            Services
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              전방위적 지원으로
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              성공을 가속화합니다
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            기술벤처스타트업의 성장 단계별 맞춤형 지원 서비스를 통해 
            여러분의 비즈니스 성공을 함께 만들어갑니다.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className={`p-8 h-full bg-gradient-to-br ${service.gradient} border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-xl relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-r ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-primary/10 transition-colors duration-300"
                    >
                      자세히 보기
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ y }}
          className="bg-gradient-to-r from-primary/5 via-background to-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/10"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              검증된 성과와 신뢰
            </h3>
            <p className="text-muted-foreground">
              숫자로 보는 우리의 성과와 여러분의 성공 스토리
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            지금 바로 시작하세요
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            여러분의 혁신적인 아이디어를 현실로 만들어드립니다. 
            전문가와의 상담을 통해 맞춤형 지원 방안을 확인해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 px-8">
                무료 상담 신청
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="px-8">
                서비스 자료 다운로드
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
