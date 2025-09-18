'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import SectionTransition from '@/components/ui/section-transition'
import { 
  Target, 
  Users, 
  TrendingUp, 
  Globe2,
  Building,
  Trophy,
  BarChart3,
  Zap
} from 'lucide-react'

export default function AboutSectionTech() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '1000px' })
  

  const coreValues = [
    {
      icon: Zap,
      title: '기술 혁신',
      code: 'TECH_INNOVATION',
      description: '최첨단 기술과 창의적 사고를 바탕으로 한 지속적 혁신 추진',
      metrics: {
        projects: 500,
        patents: 1200,
        success: 85
      }
    },
    {
      icon: Users,
      title: '협력 네트워크',
      code: 'COLLABORATION',
      description: '산학연 협력을 통한 강력한 생태계 구축 및 상호 성장 지원',
      metrics: {
        partners: 1200,
        events: 200,
        satisfaction: 95
      }
    },
    {
      icon: Globe2,
      title: '글로벌 확장',
      code: 'GLOBAL_REACH',
      description: '국경을 넘나드는 글로벌 경쟁력과 시장 확장 지원',
      metrics: {
        countries: 25,
        companies: 150,
        revenue: 300
      }
    },
    {
      icon: Target,
      title: '성장 가속',
      code: 'GROWTH_ACCEL',
      description: '빠르고 지속가능한 성장을 위한 체계적이고 전문적인 지원',
      metrics: {
        growth: 300,
        funding: 1200,
        success: 75
      }
    }
  ]

  const achievements = [
    {
      icon: Building,
      number: '2,500',
      label: '회원사',
      description: '국내외 혁신 기업',
      code: 'MEMBER_COMPANIES'
    },
    {
      icon: TrendingUp,
      number: '1,200억',
      label: '투자유치',
      description: '누적 자금 조달',
      code: 'TOTAL_FUNDING'
    },
    {
      icon: Trophy,
      number: '450',
      label: '성공사례',
      description: '검증된 성과',
      code: 'SUCCESS_CASES'
    },
    {
      icon: Globe2,
      number: '35',
      label: '글로벌진출',
      description: '해외 확장 성공',
      code: 'GLOBAL_EXPANSION'
    }
  ]

  return (
    <SectionTransition id="about" className="py-16 pb-64 bg-background relative">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tech Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.foreground)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.foreground)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative z-10"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block mb-8"
          >
            <Badge variant="outline" className="px-6 py-3 text-sm font-mono bg-muted/50 border-border">
              <BarChart3 className="w-4 h-4 mr-2" />
              INNOVATION_ECOSYSTEM_LEADER.exe
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-6xl lg:text-8xl font-bold mb-8 leading-[0.9] tracking-tight"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="block text-foreground font-mono">
              TECH
            </span>
            <span className="block text-foreground font-mono">
              INNOVATION
            </span>
            <span className="block text-accent font-mono">
              ECOSYSTEM
            </span>
          </motion.h2>
          
          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="bg-muted/30 p-6 rounded border border-border font-mono text-sm">
              <div className="text-muted-foreground mb-2">{`// 2025년 새롭게 출범한 혁신의 시작`}</div>
              <div className="text-foreground">
                <span className="text-accent">const</span> mission = {'{'}
                <br />
                &nbsp;&nbsp;ecosystem: <span className="text-accent">&quot;기술벤처스타트업 생태계의 핵심 허브&quot;</span>,
                <br />
                &nbsp;&nbsp;support: <span className="text-accent">&quot;혁신적인 기업들의 성장과 발전&quot;</span>,
                <br />
                &nbsp;&nbsp;vision: <span className="text-accent">&quot;글로벌 경쟁력을 갖춘 기술 강국&quot;</span>
                <br />
                {'}'}
              </div>
            </div>
          </motion.div>

          {/* Achievement Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto"
          >
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <motion.div
                  key={achievement.code}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group"
                >
                  <Card className="p-4 text-center bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-sm">
                    <div className="text-xs font-mono text-muted-foreground mb-2 opacity-60">
                      {achievement.code}
                    </div>
                    <Icon className="w-6 h-6 mx-auto mb-2 text-foreground group-hover:text-accent transition-colors duration-300" />
                    <div className="text-xl font-bold text-foreground mb-0.5 font-mono">
                      {achievement.number}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {achievement.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {achievement.description}
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Core Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mb-8 relative z-10"
        >
            <div className="text-center mb-8">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground font-mono tracking-tight">
              CORE_VALUES.system
            </h3>
            <div className="max-w-2xl mx-auto bg-muted/30 p-4 rounded border border-border">
              <code className="text-sm text-muted-foreground font-mono">
{`// 우리가 추구하는 가치와 비전으로 혁신의 미래를 구축`}
              </code>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.code}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.01, y: -4 }}
                  className="group"
                >
                  <Card className="p-4 h-full bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-sm relative overflow-hidden">
                    {/* Tech Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none -z-10">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.foreground)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.foreground)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    </div>

                    {/* Code Header */}
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <div className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                        {value.code}
                      </div>
                      <Icon className="w-8 h-8 text-foreground group-hover:text-accent transition-colors duration-300" />
                    </div>
                    
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold mb-2 text-foreground font-mono">
                        {value.title}
                      </h4>
                      
                      <p className="text-muted-foreground mb-3 leading-normal text-sm">
                        {value.description}
                      </p>

                      {/* Metrics Display */}
                      <div className="bg-muted/20 p-3 rounded border border-border/50">
                        <div className="text-xs font-mono text-muted-foreground mb-2">METRICS:</div>
                        <div className="space-y-1">
                          {Object.entries(value.metrics).map(([key, val]) => (
                            <div key={key} className="flex justify-between items-center text-sm">
                              <span className="font-mono text-muted-foreground">{key}:</span>
                              <span className="font-mono text-foreground font-bold">
                                {typeof val === 'number' && val > 100 ? `${val}+` : `${val}%`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* System Architecture Visualization */}
      </div>
    </SectionTransition>
  )
}
