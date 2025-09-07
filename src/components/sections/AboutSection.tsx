'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Target, Users, Lightbulb, TrendingUp, Award, Globe2 } from 'lucide-react'

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['50px', '-50px'])

  const values = [
    {
      icon: Target,
      title: '혁신 중심',
      description: '최첨단 기술과 창의적 아이디어를 바탕으로 한 혁신적 솔루션 개발'
    },
    {
      icon: Users,
      title: '협력 네트워크',
      description: '산학연 협력을 통한 강력한 생태계 구축 및 상호 성장'
    },
    {
      icon: Globe2,
      title: '글로벌 진출',
      description: '국내를 넘어 글로벌 시장에서 경쟁할 수 있는 역량 강화'
    },
    {
      icon: TrendingUp,
      title: '지속 성장',
      description: '단기적 성과가 아닌 장기적 관점에서의 지속가능한 성장'
    }
  ]

  const achievements = [
    { number: '1,500+', label: '회원사', suffix: '개' },
    { number: '750억+', label: '누적 투자유치', suffix: '원' },
    { number: '120+', label: '성공 사례', suffix: '건' },
    { number: '15+', label: '해외 진출', suffix: '개국' }
  ]

  return (
    <section id="about" ref={containerRef} className="py-24 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-background/50 backdrop-blur-sm">
            <Award className="w-4 h-4 mr-2" />
            About Us
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              기술 혁신의 중심에서
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              미래를 만들어갑니다
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            2010년 설립 이래, 대한민국 기술벤처스타트업 생태계의 핵심 허브로서 
            혁신적인 기업들의 성장과 발전을 지원해왔습니다.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y }}
          >
            <h3 className="text-3xl font-bold mb-6 text-foreground">
              혁신 생태계의 선도자
            </h3>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                사단법인 기술벤처스타트업협회는 <span className="text-foreground font-semibold">기술 혁신</span>을 
                통해 사회적 가치를 창출하고, 지속가능한 성장을 추구하는 기업들이 성공할 수 있도록 
                다양한 지원 프로그램과 서비스를 제공합니다.
              </p>
              <p>
                우리는 단순한 지원기관을 넘어, <span className="text-primary font-semibold">혁신적인 아이디어</span>가 
                현실이 될 수 있도록 돕는 <span className="text-foreground font-semibold">촉매 역할</span>을 하며, 
                기업가 정신을 바탕으로 한 건강한 창업 생태계 조성에 기여하고 있습니다.
              </p>
              <p>
                글로벌 경쟁력을 갖춘 <span className="text-primary font-semibold">World-Class 기업</span> 육성을 목표로, 
                산학연 협력 네트워크 강화와 정책 개선을 통해 우리나라가 
                <span className="text-foreground font-semibold">기술 강국</span>으로 발돋움할 수 있도록 노력하고 있습니다.
              </p>
            </div>
          </motion.div>

          {/* Right Content - Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-background to-accent/10 border border-border/50 backdrop-blur-sm"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">핵심 가치</h3>
            <p className="text-muted-foreground">우리가 추구하는 가치와 비전</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="p-6 h-full bg-gradient-to-br from-background to-accent/5 border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h4 className="text-lg font-semibold mb-3 text-foreground">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-primary/5 via-background to-primary/5 border border-primary/10">
            <Lightbulb className="w-12 h-12 text-primary mx-auto mb-6" />
            <blockquote className="text-2xl lg:text-3xl font-medium text-foreground leading-relaxed mb-4">
              "기술로 세상을 바꾸는 혁신가들과 함께, 
              <br className="hidden lg:block" />
              더 나은 미래를 만들어갑니다"
            </blockquote>
            <cite className="text-muted-foreground">- 사단법인 기술벤처스타트업협회</cite>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
