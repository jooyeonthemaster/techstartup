'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SectionTransition from '@/components/ui/section-transition'
import { 
  Rocket, 
  DollarSign, 
  Users, 
  BookOpen, 
  Shield, 
  Globe,
  ArrowRight,
  TrendingUp,
  Zap,
  Target,
  CheckCircle,
  Star,
  BarChart3,
  Network,
  Lightbulb,
  Award,
  Building2,
  Sparkles
} from 'lucide-react'

export default function ServicesSectionEnhanced() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [activeService, setActiveService] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const floatingY = useTransform(scrollYProgress, [0, 1], ['0px', '-80px'])

  const services = [
    {
      id: 'tech-development',
      icon: Rocket,
      title: '기술 개발 지원',
      subtitle: 'Technology Development Support',
      description: 'R&D 자금부터 기술 사업화까지, 혁신 기술 개발의 전 과정을 체계적으로 지원합니다.',
      features: [
        { name: 'R&D 자금 지원', value: '최대 5억원', icon: DollarSign },
        { name: '기술 멘토링', value: '1:1 전담 멘토', icon: Users },
        { name: '특허 출원 지원', value: '100% 비용 지원', icon: Shield },
        { name: '기술 사업화', value: '시장 진입 지원', icon: Target }
      ],
      stats: {
        projects: '500+',
        funding: '200억원+',
        patents: '1,200+',
        success: '85%'
      },
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      process: [
        { step: '기술 평가', icon: BarChart3 },
        { step: 'R&D 지원', icon: Lightbulb },
        { step: '특허 출원', icon: Shield },
        { step: '사업화 지원', icon: Rocket }
      ]
    },
    {
      id: 'investment',
      icon: TrendingUp,
      title: '투자 유치 지원',
      subtitle: 'Investment Attraction Support',
      description: '투자자 매칭부터 IR 피칭까지, 성공적인 투자 유치를 위한 전방위적 지원을 제공합니다.',
      features: [
        { name: '투자자 네트워킹', value: '500+ 투자자 풀', icon: Network },
        { name: 'IR 데크 제작', value: '전문가 1:1 지원', icon: Building2 },
        { name: '투자 전략 수립', value: '맞춤형 전략', icon: Target },
        { name: '후속 투자 연계', value: '지속적 지원', icon: TrendingUp }
      ],
      stats: {
        companies: '300+',
        funding: '800억원+',
        investors: '500+',
        success: '75%'
      },
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      process: [
        { step: '투자 준비', icon: Building2 },
        { step: '투자자 매칭', icon: Network },
        { step: 'IR 피칭', icon: Target },
        { step: '투자 유치', icon: TrendingUp }
      ]
    },
    {
      id: 'networking',
      icon: Users,
      title: '네트워킹 지원',
      subtitle: 'Networking Support',
      description: '업계 최고 전문가들과의 네트워킹을 통해 비즈니스 기회를 확장하고 협업을 촉진합니다.',
      features: [
        { name: '정기 네트워킹', value: '월 4회 이상', icon: Users },
        { name: '전문가 매칭', value: '1,000+ 전문가', icon: Award },
        { name: '파트너십 중개', value: '비즈니스 연결', icon: Network },
        { name: '멘토링 프로그램', value: '장기 관계 구축', icon: Lightbulb }
      ],
      stats: {
        events: '200+',
        experts: '1,000+',
        partnerships: '500+',
        satisfaction: '95%'
      },
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      process: [
        { step: '네트워크 분석', icon: BarChart3 },
        { step: '매칭 서비스', icon: Users },
        { step: '관계 구축', icon: Network },
        { step: '협업 촉진', icon: Award }
      ]
    }
  ]

  const globalStats = [
    { icon: Building2, number: '2,500+', label: '지원 기업', color: 'text-blue-500' },
    { icon: TrendingUp, number: '1,200억+', label: '투자 유치', color: 'text-green-500' },
    { icon: Award, number: '95%', label: '성공률', color: 'text-purple-500' },
    { icon: Globe, number: '35+', label: '글로벌 진출', color: 'text-orange-500' }
  ]

  return (
    <SectionTransition id="services" className="py-32 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Floating Background Elements */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute top-32 left-20 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
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
            <Badge variant="outline" className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-primary/10 to-green-500/10 border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 mr-2" />
              Comprehensive Support Services
            </Badge>
          </motion.div>
          
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              전방위적 지원으로
            </span>
            <span className="block bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              성공을 가속화
            </span>
          </h2>
          
          <motion.p 
            className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            기술벤처스타트업의 성장 단계별 <span className="text-primary font-semibold">맞춤형 지원 서비스</span>를 통해 
            여러분의 비즈니스가 <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent font-semibold">성공</span>할 수 있도록 함께합니다.
          </motion.p>

          {/* Global Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {globalStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Card className="p-4 text-center bg-gradient-to-br from-background/80 to-accent/20 border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                    <div className={`text-xl font-bold ${stat.color} mb-1`}>
                      {stat.number}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Services Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mb-20"
        >
          {/* Service Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-4 p-2 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.button
                    key={service.id}
                    onClick={() => setActiveService(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      activeService === index 
                        ? `bg-gradient-to-r ${service.gradient} text-white shadow-lg` 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{service.title}</span>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Active Service Detail */}
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {services.map((service, index) => {
              if (index !== activeService) return null
              const Icon = service.icon
              
              return (
                <Card key={service.id} className={`p-8 lg:p-12 bg-gradient-to-br ${service.bgGradient} border-border/50 backdrop-blur-sm relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px] opacity-30" />
                  
                  {/* Floating Icon */}
                  <motion.div
                    style={{ y: floatingY }}
                    className="absolute top-8 right-8 opacity-10"
                  >
                    <Icon className="w-32 h-32" />
                  </motion.div>

                  <div className="relative z-10">
                    <div className="grid lg:grid-cols-3 gap-12">
                      {/* Service Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mr-4`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-foreground">{service.title}</h3>
                            <p className="text-sm text-muted-foreground">{service.subtitle}</p>
                          </div>
                        </div>
                        
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Process Flow */}
                        <div className="mb-8">
                          <h4 className="text-xl font-semibold mb-6 text-foreground">지원 프로세스</h4>
                          <div className="flex flex-wrap gap-4">
                            {service.process.map((step, stepIndex) => {
                              const StepIcon = step.icon
                              return (
                                <motion.div
                                  key={stepIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: stepIndex * 0.2 }}
                                  className="flex items-center space-x-3 bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/30"
                                >
                                  <div className={`w-8 h-8 bg-gradient-to-r ${service.gradient} rounded-lg flex items-center justify-center`}>
                                    <StepIcon className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-sm font-medium text-foreground">{step.step}</span>
                                  {stepIndex < service.process.length - 1 && (
                                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                          {service.features.map((feature, featureIndex) => {
                            const FeatureIcon = feature.icon
                            return (
                              <motion.div
                                key={featureIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + featureIndex * 0.1 }}
                                className="flex items-center space-x-3 p-4 rounded-lg bg-background/30 backdrop-blur-sm border border-border/20"
                              >
                                <FeatureIcon className={`w-5 h-5 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`} />
                                <div>
                                  <div className="font-medium text-foreground">{feature.name}</div>
                                  <div className="text-sm text-muted-foreground">{feature.value}</div>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Stats Panel */}
                      <div>
                        <Card className="p-6 bg-background/50 backdrop-blur-sm border-border/30">
                          <h4 className="text-lg font-semibold mb-6 text-foreground flex items-center">
                            <BarChart3 className="w-5 h-5 mr-2" />
                            성과 지표
                          </h4>
                          <div className="space-y-4">
                            {Object.entries(service.stats).map(([key, value], statIndex) => (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + statIndex * 0.1 }}
                                className="flex justify-between items-center p-3 rounded-lg bg-accent/30"
                              >
                                <span className="text-sm text-muted-foreground capitalize">{key}</span>
                                <span className={`font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                                  {value}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/5 via-background to-green-500/5 border border-primary/20 backdrop-blur-sm relative overflow-hidden">
            {/* Background Effects */}
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
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-full blur-3xl"
            />
            
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block mb-6"
              >
                <Zap className="w-12 h-12 text-primary mx-auto" />
              </motion.div>
              
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                지금 바로 시작하세요
              </h3>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                여러분의 혁신적인 아이디어를 현실로 만들어드립니다. 
                전문가와의 상담을 통해 맞춤형 지원 방안을 확인해보세요.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-green-500 text-primary-foreground px-8">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    무료 상담 신청
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="px-8 backdrop-blur-sm">
                    서비스 자료 다운로드
                    <ArrowRight className="w-5 h-5 ml-2" />
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





