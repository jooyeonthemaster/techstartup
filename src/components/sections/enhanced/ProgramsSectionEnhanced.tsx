'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SectionTransition from '@/components/ui/section-transition'
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
  CheckCircle,
  Target,
  Zap,
  Award,
  TrendingUp,
  Building2,
  Globe2,
  Sparkles,
  PlayCircle,
  UserCheck,
  BookOpen,
  Lightbulb,
  Rocket
} from 'lucide-react'

export default function ProgramsSectionEnhanced() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [activeProgram, setActiveProgram] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const timelineY = useTransform(scrollYProgress, [0, 1], ['0px', '-50px'])

  const programs = [
    {
      id: 'startup-bootcamp',
      icon: Rocket,
      title: 'Tech Startup Bootcamp',
      subtitle: '기술 창업 집중 과정',
      level: '초급-중급',
      duration: '4주',
      participants: '20명',
      price: '무료',
      description: '4주간의 집중적인 기술 창업 교육으로, 아이디어부터 MVP 개발까지 전 과정을 실전 중심으로 학습합니다.',
      features: [
        { name: '실전 프로젝트', description: '실제 창업 아이디어로 진행', icon: Target },
        { name: '1:1 멘토링', description: '업계 전문가와 개별 상담', icon: UserCheck },
        { name: 'MVP 개발', description: '최소 실행 가능 제품 구현', icon: Building2 },
        { name: '투자자 피칭', description: '실제 투자자 앞에서 발표', icon: TrendingUp }
      ],
      curriculum: [
        { week: 1, title: '아이디어 검증', topics: ['시장 분석', '고객 인터뷰', '경쟁사 분석'] },
        { week: 2, title: 'MVP 설계', topics: ['기술 스택 선택', 'UI/UX 디자인', '개발 계획'] },
        { week: 3, title: 'MVP 개발', topics: ['프로토타입 구현', '사용자 테스트', '피드백 반영'] },
        { week: 4, title: '피칭 준비', topics: ['사업계획서', 'IR 데크', '투자자 발표'] }
      ],
      outcomes: {
        completion: '95%',
        funding: '65%',
        employment: '85%',
        satisfaction: '4.8/5'
      },
      status: '모집중',
      statusColor: 'bg-green-500/10 text-green-600 border-green-500/20',
      startDate: '2025.03.15',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      id: 'investment-readiness',
      icon: TrendingUp,
      title: 'Investment Readiness Program',
      subtitle: '투자 유치 준비 과정',
      level: '중급-고급',
      duration: '6주',
      participants: '15명',
      price: '50만원',
      description: '투자 유치를 위한 체계적인 준비 과정으로, 실제 투자자와의 만남부터 협상까지 실무 중심 교육을 제공합니다.',
      features: [
        { name: '실제 투자자 미팅', description: '현직 VC와 직접 만남', icon: Users },
        { name: '사업계획서 완성', description: '투자용 BP 작성 완료', icon: BookOpen },
        { name: '재무 모델링', description: '전문적인 재무 설계', icon: TrendingUp },
        { name: '법무 이슈 대응', description: '투자 계약서 검토', icon: CheckCircle }
      ],
      curriculum: [
        { week: 1, title: '투자 시장 이해', topics: ['투자 생태계', 'VC 분석', '투자 트렌드'] },
        { week: 2, title: '사업계획서', topics: ['BP 작성법', '재무 계획', '시장 전략'] },
        { week: 3, title: 'IR 피칭', topics: ['프레젠테이션', '스토리텔링', '질의응답'] },
        { week: 4, title: '재무 모델링', topics: ['밸류에이션', '수익 모델', '성장 계획'] },
        { week: 5, title: '법무 검토', topics: ['투자 계약', '지분 구조', '거버넌스'] },
        { week: 6, title: '실전 피칭', topics: ['투자자 미팅', '협상 전략', '후속 조치'] }
      ],
      outcomes: {
        completion: '88%',
        funding: '75%',
        avgAmount: '15억원',
        satisfaction: '4.9/5'
      },
      status: '진행중',
      statusColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      startDate: '2025.02.20',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      id: 'leadership-academy',
      icon: Award,
      title: 'Startup Leadership Academy',
      subtitle: '스타트업 리더십 아카데미',
      level: '고급',
      duration: '8주',
      participants: '12명',
      price: '100만원',
      description: '스타트업 CEO와 핵심 임원을 위한 리더십 개발 프로그램으로, 조직 관리와 전략적 사고력을 향상시킵니다.',
      features: [
        { name: '성공 CEO 멘토링', description: '유니콘 기업 CEO와 만남', icon: Award },
        { name: '케이스 스터디', description: '실제 사례 분석 및 토론', icon: BookOpen },
        { name: '조직 문화 설계', description: '스타트업 문화 구축법', icon: Users },
        { name: '위기 관리', description: '리스크 대응 전략 수립', icon: Target }
      ],
      curriculum: [
        { week: 1, title: '리더십 기초', topics: ['리더십 유형', '자기 진단', '목표 설정'] },
        { week: 2, title: '조직 관리', topics: ['팀 빌딩', '성과 관리', '소통 전략'] },
        { week: 3, title: '전략적 사고', topics: ['비즈니스 전략', '의사결정', '우선순위'] },
        { week: 4, title: '조직 문화', topics: ['문화 설계', '가치 정립', '변화 관리'] },
        { week: 5, title: '위기 관리', topics: ['리스크 관리', '위기 대응', '회복 전략'] },
        { week: 6, title: '성장 전략', topics: ['스케일업', '글로벌화', '지속성'] },
        { week: 7, title: '투자자 관계', topics: ['IR 관리', '거버넌스', '이해관계자'] },
        { week: 8, title: '실행 계획', topics: ['액션플랜', '모니터링', '피드백'] }
      ],
      outcomes: {
        completion: '92%',
        promotion: '60%',
        retention: '95%',
        satisfaction: '4.7/5'
      },
      status: '대기중',
      statusColor: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      startDate: '2025.04.10',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10'
    }
  ]

  const benefits = [
    {
      icon: Star,
      title: '전문가 네트워크',
      description: '업계 최고 전문가들의 직접 멘토링',
      stats: '500+'
    },
    {
      icon: Users,
      title: '평생 네트워크',
      description: '동기들과의 지속적인 관계 구축',
      stats: '2,000+'
    },
    {
      icon: Trophy,
      title: '성과 인증',
      description: '수료증 및 LinkedIn 인증 배지',
      stats: '100%'
    },
    {
      icon: CheckCircle,
      title: '사후 지원',
      description: '프로그램 종료 후 지속적 지원',
      stats: '6개월'
    }
  ]

  const testimonials = [
    {
      name: '김창업',
      company: '테크스타트업 CEO',
      program: 'Tech Startup Bootcamp',
      quote: '4주 만에 아이디어를 실제 제품으로 만들 수 있었습니다. 멘토링이 정말 도움이 되었어요.',
      rating: 5,
      image: '/api/placeholder/60/60'
    },
    {
      name: '이투자',
      company: '핀테크 스타트업 대표',
      program: 'Investment Readiness',
      quote: '프로그램 수료 후 3개월 만에 시리즈 A 투자를 성공적으로 유치했습니다.',
      rating: 5,
      image: '/api/placeholder/60/60'
    }
  ]

  return (
    <SectionTransition id="programs" className="py-32 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Floating Background Elements */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute top-40 left-16 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-16 w-80 h-80 bg-gradient-to-r from-green-500/10 to-purple-500/10 rounded-full blur-3xl" />
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
            <Badge variant="outline" className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 mr-2" />
              Premium Education Programs
            </Badge>
          </motion.div>
          
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              체계적인 교육으로
            </span>
            <span className="block bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
              성공을 가속화
            </span>
          </h2>
          
          <motion.p 
            className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            각 성장 단계에 맞춘 <span className="text-primary font-semibold">전문 교육 프로그램</span>을 통해 
            여러분의 비즈니스가 <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-semibold">한 단계 더 도약</span>할 수 있도록 지원합니다.
          </motion.p>
        </motion.div>

        {/* Program Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">2025년 프로그램 로드맵</h3>
            <p className="text-muted-foreground">연간 교육 일정과 프로그램별 진행 현황</p>
          </div>

          <motion.div 
            style={{ y: timelineY }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full" />
            
            <div className="space-y-16">
              {programs.map((program, index) => {
                const Icon = program.icon
                const isLeft = index % 2 === 0
                
                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                    className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className={`w-12 h-12 bg-gradient-to-r ${program.gradient} rounded-full flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                    
                    {/* Program Card */}
                    <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        onClick={() => setActiveProgram(index)}
                        className="cursor-pointer"
                      >
                        <Card className={`p-6 bg-gradient-to-br ${program.bgGradient} border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl relative overflow-hidden`}>
                          <div className="absolute top-2 right-2">
                            <Badge variant="outline" className={`${program.statusColor} text-xs`}>
                              {program.status}
                            </Badge>
                          </div>
                          
                          <h4 className="text-xl font-bold mb-2 text-foreground">{program.title}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{program.subtitle}</p>
                          
                          <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                              {program.duration}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-3 h-3 mr-1 text-muted-foreground" />
                              {program.participants}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1 text-muted-foreground" />
                              {program.startDate}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {program.description}
                          </p>
                          
                          <Button variant="ghost" size="sm" className="w-full">
                            자세히 보기
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Card>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Active Program Detail */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-20"
        >
          <motion.div
            key={activeProgram}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {programs.map((program, index) => {
              if (index !== activeProgram) return null
              const Icon = program.icon
              
              return (
                <Card key={program.id} className={`p-8 lg:p-12 bg-gradient-to-br ${program.bgGradient} border-border/50 backdrop-blur-sm relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px] opacity-30" />
                  
                  <div className="relative z-10">
                    <div className="grid lg:grid-cols-3 gap-12">
                      {/* Program Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center">
                            <div className={`w-16 h-16 bg-gradient-to-r ${program.gradient} rounded-2xl flex items-center justify-center mr-4`}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold text-foreground">{program.title}</h3>
                              <p className="text-sm text-muted-foreground">{program.subtitle}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className={`${program.statusColor}`}>
                            {program.status}
                          </Badge>
                        </div>
                        
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                          {program.description}
                        </p>

                        {/* Program Details */}
                        <div className="grid md:grid-cols-4 gap-4 mb-8">
                          <div className="text-center p-4 rounded-lg bg-background/30 backdrop-blur-sm">
                            <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <div className="font-semibold text-foreground">{program.duration}</div>
                            <div className="text-xs text-muted-foreground">기간</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-background/30 backdrop-blur-sm">
                            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <div className="font-semibold text-foreground">{program.participants}</div>
                            <div className="text-xs text-muted-foreground">정원</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-background/30 backdrop-blur-sm">
                            <GraduationCap className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <div className="font-semibold text-foreground">{program.level}</div>
                            <div className="text-xs text-muted-foreground">레벨</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-background/30 backdrop-blur-sm">
                            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <div className="font-semibold text-foreground">{program.price}</div>
                            <div className="text-xs text-muted-foreground">수강료</div>
                          </div>
                        </div>

                        {/* Curriculum */}
                        <div className="mb-8">
                          <h4 className="text-xl font-semibold mb-6 text-foreground">커리큘럼</h4>
                          <div className="space-y-4">
                            {program.curriculum.map((week, weekIndex) => (
                              <motion.div
                                key={weekIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: weekIndex * 0.1 }}
                                className="flex items-start space-x-4 p-4 rounded-lg bg-background/30 backdrop-blur-sm border border-border/20"
                              >
                                <div className={`w-8 h-8 bg-gradient-to-r ${program.gradient} rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                  {week.week}
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-medium text-foreground mb-1">{week.title}</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {week.topics.map((topic, topicIndex) => (
                                      <Badge key={topicIndex} variant="outline" className="text-xs">
                                        {topic}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="grid md:grid-cols-2 gap-4">
                          {program.features.map((feature, featureIndex) => {
                            const FeatureIcon = feature.icon
                            return (
                              <motion.div
                                key={featureIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + featureIndex * 0.1 }}
                                className="flex items-start space-x-3 p-4 rounded-lg bg-background/30 backdrop-blur-sm border border-border/20"
                              >
                                <FeatureIcon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-foreground">{feature.name}</div>
                                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Outcomes Panel */}
                      <div>
                        <Card className="p-6 bg-background/50 backdrop-blur-sm border-border/30 mb-6">
                          <h4 className="text-lg font-semibold mb-6 text-foreground flex items-center">
                            <Trophy className="w-5 h-5 mr-2" />
                            성과 지표
                          </h4>
                          <div className="space-y-4">
                            {Object.entries(program.outcomes).map(([key, value], statIndex) => (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + statIndex * 0.1 }}
                                className="flex justify-between items-center p-3 rounded-lg bg-accent/30"
                              >
                                <span className="text-sm text-muted-foreground capitalize">{key}</span>
                                <span className={`font-bold bg-gradient-to-r ${program.gradient} bg-clip-text text-transparent`}>
                                  {value}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </Card>

                        {/* Quick Apply */}
                        <Card className="p-6 bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
                          <h4 className="font-semibold mb-4 text-foreground">빠른 신청</h4>
                          <div className="space-y-3 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              시작: {program.startDate}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              온/오프라인 병행
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                              수료증 발급
                            </div>
                          </div>
                          <Button className={`w-full bg-gradient-to-r ${program.gradient} text-white`}>
                            <PlayCircle className="w-4 h-4 mr-2" />
                            지금 신청하기
                          </Button>
                        </Card>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">프로그램 참여 혜택</h3>
            <p className="text-muted-foreground">단순한 교육을 넘어 실질적인 성장을 위한 종합적인 지원</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Card className="p-6 text-center bg-gradient-to-br from-background/80 to-accent/20 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{benefit.description}</p>
                    <div className="text-lg font-bold text-primary">{benefit.stats}</div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">수강생 후기</h3>
            <p className="text-muted-foreground">실제 참여자들의 생생한 경험담</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.8 + index * 0.2, duration: 0.6 }}
              >
                <Card className="p-6 bg-gradient-to-br from-background/80 to-accent/10 border-border/50">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      <Badge variant="outline" className="text-xs mt-1">{testimonial.program}</Badge>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 border border-primary/20 backdrop-blur-sm relative overflow-hidden">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl"
            />
            
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block mb-6"
              >
                <Lightbulb className="w-12 h-12 text-primary mx-auto" />
              </motion.div>
              
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                지금 바로 신청하세요
              </h3>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                제한된 인원으로 진행되는 프리미엄 교육 프로그램입니다. 
                조기 마감될 수 있으니 서둘러 신청해주세요.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 text-primary-foreground px-8">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    프로그램 신청하기
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="px-8 backdrop-blur-sm">
                    <Calendar className="w-5 h-5 mr-2" />
                    설명회 참석하기
                  </Button>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </SectionTransition>
  )
}
