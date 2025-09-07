'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  GraduationCap, 
  Briefcase, 
  Users, 
  Trophy, 
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react'

export default function ProgramsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const programs = [
    {
      id: 'startup-bootcamp',
      title: 'Tech Startup Bootcamp',
      subtitle: '기술 창업 집중 과정',
      description: '4주간의 집중적인 기술 창업 교육 프로그램으로, 아이디어부터 MVP 개발까지 전 과정을 경험할 수 있습니다.',
      duration: '4주',
      participants: '20명',
      level: '초급-중급',
      features: [
        '실전 프로젝트 기반 학습',
        '1:1 멘토링 시스템',
        '투자자 피칭 기회',
        '네트워킹 이벤트'
      ],
      icon: GraduationCap,
      gradient: 'from-blue-500/10 to-cyan-500/10',
      iconBg: 'from-blue-500 to-cyan-500',
      status: '모집중',
      startDate: '2025.03.15'
    },
    {
      id: 'investment-readiness',
      title: 'Investment Readiness Program',
      subtitle: '투자 유치 준비 과정',
      description: '투자 유치를 위한 체계적인 준비 과정으로, IR 피칭부터 실제 투자 협상까지 실무 중심의 교육을 제공합니다.',
      duration: '6주',
      participants: '15명',
      level: '중급-고급',
      features: [
        '실제 투자자와의 만남',
        '사업계획서 완성',
        '재무 모델링 교육',
        '법무 이슈 대응'
      ],
      icon: Briefcase,
      gradient: 'from-green-500/10 to-emerald-500/10',
      iconBg: 'from-green-500 to-emerald-500',
      status: '진행중',
      startDate: '2025.02.20'
    },
    {
      id: 'leadership-academy',
      title: 'Startup Leadership Academy',
      subtitle: '스타트업 리더십 아카데미',
      description: '스타트업 CEO와 핵심 임원을 위한 리더십 개발 프로그램으로, 조직 관리와 전략적 사고력을 향상시킵니다.',
      duration: '8주',
      participants: '12명',
      level: '고급',
      features: [
        '성공한 CEO 멘토링',
        '케이스 스터디 분석',
        '조직 문화 구축',
        '위기 관리 전략'
      ],
      icon: Users,
      gradient: 'from-purple-500/10 to-pink-500/10',
      iconBg: 'from-purple-500 to-pink-500',
      status: '대기중',
      startDate: '2025.04.10'
    },
    {
      id: 'global-expansion',
      title: 'Global Expansion Accelerator',
      subtitle: '글로벌 진출 가속화 프로그램',
      description: '해외 시장 진출을 목표로 하는 스타트업을 위한 특별 프로그램으로, 현지 파트너십 구축을 지원합니다.',
      duration: '12주',
      participants: '10명',
      level: '고급',
      features: [
        '해외 시장 분석',
        '현지 파트너 매칭',
        '법인 설립 지원',
        '마케팅 현지화'
      ],
      icon: Trophy,
      gradient: 'from-orange-500/10 to-red-500/10',
      iconBg: 'from-orange-500 to-red-500',
      status: '모집예정',
      startDate: '2025.05.01'
    }
  ]

  const benefits = [
    {
      icon: Star,
      title: '전문가 멘토링',
      description: '업계 최고 전문가들의 1:1 멘토링'
    },
    {
      icon: Users,
      title: '네트워킹',
      description: '동기들과의 평생 네트워크 구축'
    },
    {
      icon: Trophy,
      title: '성과 인증',
      description: '프로그램 수료증 및 성과 인증'
    },
    {
      icon: CheckCircle,
      title: '사후 지원',
      description: '프로그램 종료 후 지속적인 지원'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case '모집중': return 'bg-green-500/10 text-green-600 border-green-500/20'
      case '진행중': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case '대기중': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
      case '모집예정': return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    }
  }

  return (
    <section id="programs" ref={containerRef} className="py-24 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-background/50 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4 mr-2" />
            Programs
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              체계적인 교육으로
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              성공을 가속화합니다
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            각 성장 단계에 맞춘 전문 교육 프로그램을 통해 
            여러분의 비즈니스가 한 단계 더 도약할 수 있도록 지원합니다.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {programs.map((program, index) => {
            const Icon = program.icon
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className={`p-8 h-full bg-gradient-to-br ${program.gradient} border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-xl relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 bg-gradient-to-r ${program.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(program.status)} backdrop-blur-sm`}
                      >
                        {program.status}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                      {program.title}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-4">
                      {program.subtitle}
                    </p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Program Details */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-lg bg-background/50 backdrop-blur-sm">
                      <div className="text-center">
                        <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">기간</div>
                        <div className="text-sm font-semibold text-foreground">{program.duration}</div>
                      </div>
                      <div className="text-center">
                        <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">인원</div>
                        <div className="text-sm font-semibold text-foreground">{program.participants}</div>
                      </div>
                      <div className="text-center">
                        <GraduationCap className="w-4 h-4 text-primary mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">레벨</div>
                        <div className="text-sm font-semibold text-foreground">{program.level}</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3">주요 특징</h4>
                      <ul className="space-y-2">
                        {program.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        시작: {program.startDate}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="group-hover:bg-primary/10 transition-colors duration-300"
                      >
                        자세히 보기
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary/5 via-background to-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/10 mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              프로그램 참여 혜택
            </h3>
            <p className="text-muted-foreground">
              단순한 교육을 넘어 실질적인 성장을 위한 종합적인 지원
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            지금 바로 신청하세요
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            제한된 인원으로 진행되는 프리미엄 교육 프로그램입니다. 
            조기 마감될 수 있으니 서둘러 신청해주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 px-8">
                프로그램 신청하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="px-8">
                <Calendar className="w-5 h-5 mr-2" />
                설명회 참석하기
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
