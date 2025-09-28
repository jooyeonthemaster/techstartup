'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SectionTransition from '@/components/ui/section-transition'
import { 
  Target, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  Award, 
  Globe2,
  Zap,
  Rocket,
  Star,
  ArrowRight,
  Building,
  Trophy,
  CheckCircle,
  Sparkles
} from 'lucide-react'

export default function AboutSectionEnhanced() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const floatingY = useTransform(scrollYProgress, [0, 1], ['0px', '-100px'])

  const coreValues = [
    {
      icon: Zap,
      title: '혁신 DNA',
      description: '최첨단 기술과 창의적 사고를 바탕으로 한 지속적 혁신',
      stats: '500+',
      statsLabel: '혁신 프로젝트',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      icon: Users,
      title: '협력 생태계',
      description: '산학연 협력을 통한 강력한 네트워크와 상호 성장',
      stats: '1,200+',
      statsLabel: '파트너사',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10'
    },
    {
      icon: Globe2,
      title: '글로벌 비전',
      description: '국경을 넘나드는 글로벌 경쟁력과 시장 확장',
      stats: '25+',
      statsLabel: '진출 국가',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      icon: Rocket,
      title: '성장 가속',
      description: '빠르고 지속가능한 성장을 위한 체계적 지원',
      stats: '300%',
      statsLabel: '평균 성장률',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10'
    }
  ]

  const achievements = [
    {
      icon: Building,
      number: '2,500+',
      label: '회원사',
      description: '국내외 혁신 기업들',
      color: 'text-blue-500'
    },
    {
      icon: Trophy,
      number: '1,200억+',
      label: '누적 투자유치',
      description: '성공적인 자금 조달',
      color: 'text-green-500'
    },
    {
      icon: Star,
      number: '450+',
      label: '성공 사례',
      description: '검증된 성과',
      color: 'text-purple-500'
    },
    {
      icon: Globe2,
      number: '35+',
      label: '해외 진출',
      description: '글로벌 확장 성공',
      color: 'text-orange-500'
    }
  ]

  return (
    <SectionTransition id="about" className="py-32 bg-gradient-to-b from-background via-accent/5 to-background">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Background Elements */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative z-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-6"
          >
            <Badge variant="outline" className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 mr-2" />
              Innovation Ecosystem Leader
            </Badge>
          </motion.div>
          
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              기술 혁신의
            </span>
            <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent">
              중심에서 함께
            </span>
          </h2>
          
          <motion.p 
            className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            2025년 <span className="text-primary font-semibold">새롭게 출범한</span> 기술벤처스타트업협회는 
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold"> 혁신의 중심</span>에서 
            기술 스타트업의 성장과 글로벌 진출을 선도하고 있습니다.
          </motion.p>

          {/* Achievement Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative"
                >
                  <Card className="p-6 text-center bg-gradient-to-br from-background/80 to-accent/20 border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <Icon className={`w-8 h-8 mx-auto mb-3 ${achievement.color} group-hover:scale-110 transition-transform duration-300`} />
                      <div className={`text-2xl lg:text-3xl font-bold ${achievement.color} mb-1`}>
                        {achievement.number}
                      </div>
                      <div className="font-semibold text-foreground mb-1">
                        {achievement.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.description}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Core Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mb-24 relative z-10"
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                핵심 가치
              </span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              우리가 추구하는 가치와 비전으로 혁신의 미래를 만들어갑니다
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  className="group relative"
                >
                  <Card className={`p-8 h-full bg-gradient-to-br ${value.bgGradient} border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating Icon */}
                    <motion.div
                      style={{ y: floatingY }}
                      className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    >
                      <Icon className="w-24 h-24" />
                    </motion.div>

                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h4 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                        {value.title}
                      </h4>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {value.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border/30">
                        <div>
                          <div className={`text-2xl font-bold bg-gradient-to-r ${value.gradient} bg-clip-text text-transparent`}>
                            {value.stats}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {value.statsLabel}
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ArrowRight className="w-6 h-6 text-primary" />
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-center relative z-10"
        >
          <Card className="max-w-5xl mx-auto p-12 bg-gradient-to-br from-primary/5 via-background to-blue-500/5 border border-primary/20 backdrop-blur-sm relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5" />
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
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full blur-3xl"
            />
            
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block mb-8"
              >
                <Lightbulb className="w-16 h-16 text-primary mx-auto" />
              </motion.div>
              
              <blockquote className="text-3xl lg:text-4xl font-bold text-foreground leading-relaxed mb-8">
                <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  "기술로 세상을 바꾸는 혁신가들과 함께,
                </span>
                <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-green-500 via-blue-500 to-primary bg-clip-text text-transparent">
                  더 나은 미래를 만들어갑니다"
                </span>
              </blockquote>
              
              <cite className="text-lg text-muted-foreground font-medium">
                - 사단법인 기술벤처스타트업협회
              </cite>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-blue-500 text-primary-foreground px-8">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    협회 가입하기
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="px-8 backdrop-blur-sm">
                    자세히 알아보기
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





