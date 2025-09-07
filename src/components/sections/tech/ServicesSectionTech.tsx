'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import SectionTransition from '@/components/ui/section-transition'
import { 
  Rocket, 
  TrendingUp, 
  Users, 
  Shield, 
  Globe,
  BarChart3,
  Terminal,
  Code,
  Database,
  Cpu,
  Network,
  Target,
  CheckCircle
} from 'lucide-react'

export default function ServicesSectionTech() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '1500px' })
  const [activeService, setActiveService] = useState(0)
  

  const services = [
    {
      id: 'tech-development',
      icon: Rocket,
      title: 'TECH_DEVELOPMENT',
      subtitle: '기술 개발 지원',
      description: 'R&D부터 기술 사업화까지 혁신 기술 개발의 전체 파이프라인을 체계적으로 지원',
      process: [
        { step: 'ANALYZE', description: '기술 평가 및 분석', icon: BarChart3 },
        { step: 'DEVELOP', description: 'R&D 자금 지원', icon: Code },
        { step: 'PROTECT', description: '특허 출원 지원', icon: Shield },
        { step: 'DEPLOY', description: '사업화 지원', icon: Rocket }
      ],
      metrics: {
        'PROJECTS': '500+',
        'FUNDING': '200억원+',
        'PATENTS': '1,200+',
        'SUCCESS_RATE': '85%'
      },
      stack: ['AI/ML', 'Blockchain', 'IoT', 'Quantum', 'Biotech', 'Fintech']
    },
    {
      id: 'investment',
      icon: TrendingUp,
      title: 'INVESTMENT_ENGINE',
      subtitle: '투자 유치 지원',
      description: '투자자 매칭부터 IR 피칭까지 성공적인 펀딩을 위한 전방위적 지원 시스템',
      process: [
        { step: 'PREPARE', description: '투자 준비 및 전략', icon: Terminal },
        { step: 'MATCH', description: '투자자 매칭', icon: Network },
        { step: 'PITCH', description: 'IR 피칭 지원', icon: Target },
        { step: 'CLOSE', description: '투자 유치 완료', icon: CheckCircle }
      ],
      metrics: {
        'COMPANIES': '300+',
        'TOTAL_FUNDING': '800억원+',
        'INVESTORS': '500+',
        'SUCCESS_RATE': '75%'
      },
      stack: ['Series A', 'Series B', 'Bridge', 'IPO', 'M&A', 'Strategic']
    },
    {
      id: 'networking',
      icon: Network,
      title: 'NETWORK_PROTOCOL',
      subtitle: '네트워킹 지원',
      description: '업계 최고 전문가들과의 연결을 통해 비즈니스 기회 확장 및 협업 촉진',
      process: [
        { step: 'SCAN', description: '네트워크 분석', icon: BarChart3 },
        { step: 'CONNECT', description: '전문가 매칭', icon: Users },
        { step: 'SYNC', description: '관계 구축', icon: Network },
        { step: 'SCALE', description: '협업 확장', icon: TrendingUp }
      ],
      metrics: {
        'EVENTS': '200+',
        'EXPERTS': '1,000+',
        'PARTNERSHIPS': '500+',
        'SATISFACTION': '95%'
      },
      stack: ['CEO Network', 'Tech Leaders', 'VCs', 'Mentors', 'Advisors', 'Alumni']
    }
  ]

  const systemStats = [
    { 
      icon: Database, 
      label: 'DATA_PROCESSED', 
      value: '2,500+', 
      unit: 'companies',
      description: '지원 기업 데이터'
    },
    { 
      icon: Cpu, 
      label: 'COMPUTE_POWER', 
      value: '1,200억+', 
      unit: 'KRW',
      description: '총 투자 유치액'
    },
    { 
      icon: Network, 
      label: 'NETWORK_NODES', 
      value: '95%', 
      unit: 'success',
      description: '평균 성공률'
    },
    { 
      icon: Globe, 
      label: 'GLOBAL_REACH', 
      value: '35+', 
      unit: 'countries',
      description: '글로벌 진출'
    }
  ]

  return (
    <SectionTransition id="services" className="py-32 pb-[1500px] bg-muted/20 relative">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tech Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.foreground)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.foreground)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 mt-96 relative z-10"
        >
          
          <motion.h2 
            className="text-6xl lg:text-8xl font-bold mb-8 leading-[0.9] tracking-tight"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="block text-foreground font-mono">
              SERVICE
            </span>
            <span className="block text-accent font-mono">
              ARCHITECTURE
            </span>
          </motion.h2>
          
          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="bg-card p-6 rounded border border-border font-mono text-sm">
              <div className="text-muted-foreground mb-2">{`// 전방위적 지원 시스템`}</div>
              <div className="text-foreground">
                <span className="text-accent">function</span> accelerateSuccess(startup) {'{'}
                <br />
                &nbsp;&nbsp;<span className="text-accent">return</span> comprehensive_support.map(service =&gt;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;service.execute(startup.growth_stage)
                <br />
                &nbsp;&nbsp;).reduce((success, support) =&gt; success + support)
                <br />
                {'}'}
              </div>
            </div>
          </motion.div>

          {/* System Stats Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {systemStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group"
                >
                  <Card className="p-4 text-center bg-card border-border hover:border-accent/50 transition-all duration-300">
                    <div className="text-xs font-mono text-muted-foreground mb-2 opacity-60">
                      {stat.label}
                    </div>
                    <Icon className="w-6 h-6 mx-auto mb-2 text-foreground group-hover:text-accent transition-colors duration-300" />
                    <div className="text-xl font-bold text-foreground font-mono">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {stat.unit}
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Service Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mb-20 relative z-10"
        >
          {/* Service Selector */}
          <div className="flex justify-center mb-12">
            <Card className="p-2 bg-card border-border">
              <div className="flex flex-wrap gap-2">
                {services.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <motion.button
                      key={service.id}
                      onClick={() => setActiveService(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded transition-all duration-300 font-mono text-sm ${
                        activeService === index 
                          ? 'bg-foreground text-background' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{service.title}</span>
                    </motion.button>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Active Service Detail */}
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {services.map((service, index) => {
              if (index !== activeService) return null
              const Icon = service.icon
              
              return (
                <Card key={service.id} className="p-8 lg:p-12 bg-card border-border relative overflow-hidden">
                  {/* Tech Grid Pattern */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.foreground)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.foreground)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  </div>

                  <div className="relative z-10">
                    <div className="grid lg:grid-cols-3 gap-12">
                      {/* Service Info */}
                      <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center">
                            <div className="w-16 h-16 bg-foreground rounded flex items-center justify-center mr-4">
                              <Icon className="w-8 h-8 text-background" />
                            </div>
                            <div>
                              <div className="text-xs font-mono text-muted-foreground mb-1">{service.title}</div>
                              <h3 className="text-3xl font-bold text-foreground font-mono">{service.subtitle}</h3>
                            </div>
                          </div>
                          <Badge variant="outline" className="font-mono text-xs bg-accent/10 border-accent/30 text-foreground">
                            ACTIVE
                          </Badge>
                        </div>
                        
                        <div className="bg-muted/30 p-6 rounded border border-border mb-8">
                          <div className="text-xs font-mono text-muted-foreground mb-2">DESCRIPTION:</div>
                          <p className="text-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        {/* Process Pipeline */}
                        <div className="mb-8">
                          <h4 className="text-xl font-bold mb-6 text-foreground font-mono">PROCESS_PIPELINE:</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {service.process.map((step, stepIndex) => {
                              const StepIcon = step.icon
                              return (
                                <motion.div
                                  key={stepIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: stepIndex * 0.1 }}
                                  className="flex items-center space-x-4 p-4 bg-muted/20 rounded border border-border/50"
                                >
                                  <div className="w-10 h-10 bg-foreground rounded flex items-center justify-center flex-shrink-0">
                                    <StepIcon className="w-5 h-5 text-background" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-mono text-sm font-bold text-foreground">{step.step}</div>
                                    <div className="text-xs text-muted-foreground">{step.description}</div>
                                  </div>
                                  <div className="text-xs font-mono text-muted-foreground">
                                    {String(stepIndex + 1).padStart(2, '0')}
                                  </div>
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-8">
                          <h4 className="text-lg font-bold mb-4 text-foreground font-mono">TECH_STACK:</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.stack.map((tech, techIndex) => (
                              <motion.div
                                key={techIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + techIndex * 0.05 }}
                                className="px-3 py-1 bg-muted/50 border border-border rounded font-mono text-xs text-foreground hover:bg-accent/10 hover:border-accent/30 transition-colors duration-200"
                              >
                                {tech}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Metrics Dashboard */}
                      <div>
                        <Card className="p-6 bg-muted/10 border-border">
                          <div className="flex items-center mb-6">
                            <Terminal className="w-5 h-5 mr-2 text-foreground" />
                            <h4 className="text-lg font-bold text-foreground font-mono">METRICS_DASHBOARD</h4>
                          </div>
                          
                          <div className="space-y-4">
                            {Object.entries(service.metrics).map(([key, value], statIndex) => (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + statIndex * 0.1 }}
                                className="flex justify-between items-center p-3 bg-background/50 rounded border border-border/30"
                              >
                                <span className="text-xs font-mono text-muted-foreground">{key}:</span>
                                <span className="font-mono font-bold text-foreground">{value}</span>
                              </motion.div>
                            ))}
                          </div>

                          <div className="mt-6 pt-4 border-t border-border/50">
                            <div className="text-xs font-mono text-muted-foreground mb-2">STATUS:</div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
                              <span className="text-xs font-mono text-foreground">OPERATIONAL</span>
                            </div>
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

      </div>
    </SectionTransition>
  )
}
