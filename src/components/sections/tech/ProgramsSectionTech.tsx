'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SectionTransition from '@/components/ui/section-transition'
import { 
  Terminal,
  Code,
  Database,
  Cpu,
  Clock,
  Users,
  CheckCircle,
  Play,
  BarChart3,
  Target
} from 'lucide-react'

export default function ProgramsSectionTech() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '2000px' })
  const [activeProgram, setActiveProgram] = useState(0)
  
  const programs = [
    {
      id: 'startup-bootcamp',
      icon: Code,
      title: 'STARTUP_BOOTCAMP',
      subtitle: '기술 창업 집중 과정',
      version: 'v2.5.0',
      level: 'BEGINNER_TO_INTERMEDIATE',
      duration: '4_WEEKS',
      participants: '20_MAX',
      price: 'FREE',
      status: 'RECRUITING',
      statusCode: 200,
      description: '4주간의 집중적인 기술 창업 교육 파이프라인. 아이디어 검증부터 MVP 개발까지 전체 프로세스를 실전 중심으로 학습',
      modules: [
        { week: 1, module: 'IDEA_VALIDATION', tasks: ['market_analysis()', 'customer_interview()', 'competitor_scan()'] },
        { week: 2, module: 'MVP_ARCHITECTURE', tasks: ['tech_stack_selection()', 'ui_ux_design()', 'dev_planning()'] },
        { week: 3, module: 'PROTOTYPE_BUILD', tasks: ['implementation()', 'user_testing()', 'feedback_integration()'] },
        { week: 4, module: 'PITCH_DEPLOY', tasks: ['business_plan()', 'ir_deck()', 'investor_presentation()'] }
      ],
      output: {
        completion_rate: '95%',
        funding_success: '65%',
        employment_rate: '85%',
        satisfaction_score: '4.8/5.0'
      },
      requirements: ['JavaScript', 'React', 'Node.js', 'Business Acumen'],
      startDate: '2025.03.15'
    },
    {
      id: 'investment-protocol',
      icon: Database,
      title: 'INVESTMENT_PROTOCOL',
      subtitle: '투자 유치 준비 시스템',
      version: 'v3.1.2',
      level: 'INTERMEDIATE_TO_ADVANCED',
      duration: '6_WEEKS',
      participants: '15_MAX',
      price: '500,000_KRW',
      status: 'IN_PROGRESS',
      statusCode: 102,
      description: '투자 유치를 위한 체계적인 준비 프로토콜. 실제 투자자와의 연결부터 협상까지 실무 중심 교육',
      modules: [
        { week: 1, module: 'MARKET_ANALYSIS', tasks: ['investment_ecosystem()', 'vc_mapping()', 'trend_analysis()'] },
        { week: 2, module: 'BP_GENERATION', tasks: ['business_plan()', 'financial_modeling()', 'market_strategy()'] },
        { week: 3, module: 'IR_OPTIMIZATION', tasks: ['presentation_craft()', 'storytelling()', 'qa_preparation()'] },
        { week: 4, module: 'FINANCIAL_MODEL', tasks: ['valuation()', 'revenue_model()', 'growth_planning()'] },
        { week: 5, module: 'LEGAL_FRAMEWORK', tasks: ['investment_terms()', 'equity_structure()', 'governance()'] },
        { week: 6, module: 'LIVE_PITCH', tasks: ['investor_meeting()', 'negotiation()', 'closing()'] }
      ],
      output: {
        completion_rate: '88%',
        funding_success: '75%',
        avg_funding: '15억원',
        satisfaction_score: '4.9/5.0'
      },
      requirements: ['Financial Modeling', 'Pitch Deck', 'Legal Knowledge', 'Negotiation'],
      startDate: '2025.02.20'
    },
    {
      id: 'leadership-framework',
      icon: Cpu,
      title: 'LEADERSHIP_FRAMEWORK',
      subtitle: '스타트업 리더십 시스템',
      version: 'v4.0.1',
      level: 'ADVANCED',
      duration: '8_WEEKS',
      participants: '12_MAX',
      price: '1,000,000_KRW',
      status: 'PENDING',
      statusCode: 202,
      description: 'CEO와 핵심 임원을 위한 리더십 개발 프레임워크. 조직 관리와 전략적 사고력 최적화',
      modules: [
        { week: 1, module: 'LEADERSHIP_CORE', tasks: ['leadership_types()', 'self_assessment()', 'goal_setting()'] },
        { week: 2, module: 'ORG_MANAGEMENT', tasks: ['team_building()', 'performance_mgmt()', 'communication()'] },
        { week: 3, module: 'STRATEGIC_THINKING', tasks: ['business_strategy()', 'decision_making()', 'prioritization()'] },
        { week: 4, module: 'CULTURE_DESIGN', tasks: ['culture_framework()', 'value_definition()', 'change_mgmt()'] },
        { week: 5, module: 'CRISIS_PROTOCOL', tasks: ['risk_management()', 'crisis_response()', 'recovery_strategy()'] },
        { week: 6, module: 'GROWTH_STRATEGY', tasks: ['scale_up()', 'globalization()', 'sustainability()'] },
        { week: 7, module: 'INVESTOR_RELATIONS', tasks: ['ir_management()', 'governance()', 'stakeholder_mgmt()'] },
        { week: 8, module: 'EXECUTION_PLAN', tasks: ['action_planning()', 'monitoring()', 'feedback_loop()'] }
      ],
      output: {
        completion_rate: '92%',
        promotion_rate: '60%',
        retention_rate: '95%',
        satisfaction_score: '4.7/5.0'
      },
      requirements: ['Management Experience', 'Strategic Thinking', 'Team Leadership', 'Business Acumen'],
      startDate: '2025.04.10'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RECRUITING': return 'bg-accent/10 text-foreground border-accent/30'
      case 'IN_PROGRESS': return 'bg-muted/50 text-foreground border-border'
      case 'PENDING': return 'bg-muted/30 text-muted-foreground border-border'
      default: return 'bg-muted/30 text-muted-foreground border-border'
    }
  }

  const getStatusCode = (code: number) => {
    switch (code) {
      case 200: return 'SUCCESS'
      case 102: return 'PROCESSING'
      case 202: return 'ACCEPTED'
      default: return 'UNKNOWN'
    }
  }

  return (
    <SectionTransition id="programs" className="py-32 pb-[800px] bg-background relative">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tech Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.foreground)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.foreground)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 mt-[10px] relative z-10"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block mb-8"
          >
            <Badge variant="outline" className="px-6 py-3 text-sm font-mono bg-card border-border">
              <Terminal className="w-4 h-4 mr-2" />
              EDUCATION_PROGRAMS.framework
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-6xl lg:text-8xl font-bold mb-8 leading-[0.9] tracking-tight"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="block text-foreground font-mono">
              PROGRAM
            </span>
            <span className="block text-accent font-mono">
              FRAMEWORK
            </span>
          </motion.h2>
          
          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="bg-muted/30 p-6 rounded border border-border font-mono text-sm">
              <div className="text-muted-foreground mb-2">{`// 체계적 교육 시스템`}</div>
              <div className="text-foreground">
                <span className="text-accent">class</span> EducationFramework {'{'}
                <br />
                &nbsp;&nbsp;<span className="text-accent">constructor</span>(growth_stage, business_needs) {'{'}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;this.programs = this.matchPrograms(growth_stage)
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;this.mentors = this.assignMentors(business_needs)
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;this.success = this.accelerateGrowth()
                <br />
                &nbsp;&nbsp;{'}'}
                <br />
                {'}'}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Program Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20 relative z-10"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground font-mono">PROGRAM_MATRIX.2025</h3>
            <div className="bg-muted/30 p-4 rounded border border-border max-w-2xl mx-auto">
              <code className="text-sm text-muted-foreground font-mono">
{`// 연간 교육 로드맵 및 실시간 상태 모니터링`}
              </code>
            </div>
          </div>

          {/* Program Selector */}
          <div className="flex justify-center mb-12">
            <Card className="p-2 bg-card border-border">
              <div className="flex flex-wrap gap-2">
                {programs.map((program, index) => {
                  const Icon = program.icon
                  return (
                    <motion.button
                      key={program.id}
                      onClick={() => setActiveProgram(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded transition-all duration-300 font-mono text-sm ${
                        activeProgram === index 
                          ? 'bg-foreground text-background' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{program.title}</span>
                    </motion.button>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Active Program Detail */}
          <motion.div
            key={activeProgram}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {programs.map((program, index) => {
              if (index !== activeProgram) return null
              const Icon = program.icon
              
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="group"
                >
                  <Card className="p-8 bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-sm relative overflow-hidden">
                    {/* Tech Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.01] group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.foreground)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.foreground)_1px,transparent_1px)] bg-[size:25px_25px]" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="grid lg:grid-cols-4 gap-8">
                        {/* Program Header */}
                        <div className="lg:col-span-3">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-foreground rounded flex items-center justify-center mr-4">
                                <Icon className="w-6 h-6 text-background" />
                              </div>
                              <div>
                                <div className="text-xs font-mono text-muted-foreground mb-1">
                                  {program.title} {program.version}
                                </div>
                                <h4 className="text-xl font-bold text-foreground font-mono">
                                  {program.subtitle}
                                </h4>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline" className={`${getStatusColor(program.status)} font-mono text-xs`}>
                                {program.status}
                              </Badge>
                              <div className="text-xs font-mono text-muted-foreground">
                                HTTP {program.statusCode} {getStatusCode(program.statusCode)}
                              </div>
                            </div>
                          </div>

                          <div className="bg-muted/20 p-4 rounded border border-border/50 mb-6">
                            <div className="text-xs font-mono text-muted-foreground mb-2">DESCRIPTION:</div>
                            <p className="text-sm text-foreground">{program.description}</p>
                          </div>

                          {/* System Specs */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-muted/20 p-3 rounded border border-border/30 text-center">
                              <Clock className="w-4 h-4 mx-auto mb-1 text-foreground" />
                              <div className="text-xs font-mono text-muted-foreground">DURATION</div>
                              <div className="text-sm font-mono text-foreground font-bold">{program.duration}</div>
                            </div>
                            <div className="bg-muted/20 p-3 rounded border border-border/30 text-center">
                              <Users className="w-4 h-4 mx-auto mb-1 text-foreground" />
                              <div className="text-xs font-mono text-muted-foreground">CAPACITY</div>
                              <div className="text-sm font-mono text-foreground font-bold">{program.participants}</div>
                            </div>
                            <div className="bg-muted/20 p-3 rounded border border-border/30 text-center">
                              <BarChart3 className="w-4 h-4 mx-auto mb-1 text-foreground" />
                              <div className="text-xs font-mono text-muted-foreground">LEVEL</div>
                              <div className="text-sm font-mono text-foreground font-bold">{program.level}</div>
                            </div>
                            <div className="bg-muted/20 p-3 rounded border border-border/30 text-center">
                              <Target className="w-4 h-4 mx-auto mb-1 text-foreground" />
                              <div className="text-xs font-mono text-muted-foreground">PRICE</div>
                              <div className="text-sm font-mono text-foreground font-bold">{program.price}</div>
                            </div>
                          </div>

                          {/* Module Architecture */}
                          <div>
                            <h5 className="text-lg font-bold mb-4 text-foreground font-mono">MODULE_ARCHITECTURE:</h5>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                              {program.modules.map((module, moduleIndex) => (
                                <motion.div
                                  key={moduleIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: moduleIndex * 0.1 }}
                                  className="bg-muted/10 p-4 rounded border border-border/30"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center">
                                      <div className="w-6 h-6 bg-foreground rounded flex items-center justify-center text-background font-mono text-xs font-bold mr-3">
                                        {module.week}
                                      </div>
                                      <span className="font-mono text-sm font-bold text-foreground">{module.module}</span>
                                    </div>
                                  </div>
                                  <div className="ml-9 space-y-1">
                                    {module.tasks.map((task, taskIndex) => (
                                      <div key={taskIndex} className="text-xs font-mono text-muted-foreground">
                                        <span className="text-accent">→</span> {task}
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* System Monitor */}
                        <div>
                          <Card className="p-6 bg-muted/10 border-border h-fit">
                            <div className="flex items-center mb-4">
                              <BarChart3 className="w-5 h-5 mr-2 text-foreground" />
                              <h5 className="text-sm font-bold text-foreground font-mono">SYSTEM_MONITOR</h5>
                            </div>
                            
                            <div className="space-y-3">
                              {Object.entries(program.output).map(([key, value], statIndex) => (
                                <motion.div
                                  key={key}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 + statIndex * 0.1 }}
                                  className="flex justify-between items-center p-2 bg-background/50 rounded border border-border/20"
                                >
                                  <span className="text-xs font-mono text-muted-foreground">{key.toUpperCase()}:</span>
                                  <span className="font-mono text-xs font-bold text-foreground">{value}</span>
                                </motion.div>
                              ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-border/50">
                              <div className="text-xs font-mono text-muted-foreground mb-2">REQUIREMENTS:</div>
                              <div className="space-y-1">
                                {program.requirements.map((req, reqIndex) => (
                                  <div key={reqIndex} className="text-xs font-mono text-foreground flex items-center">
                                    <CheckCircle className="w-3 h-3 mr-2 text-accent" />
                                    {req}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border/50">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-xs font-mono text-muted-foreground">START_DATE:</div>
                                  <div className="text-sm font-mono text-foreground font-bold">{program.startDate}</div>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
                                  <span className="text-xs font-mono text-foreground">LIVE</span>
                                </div>
                              </div>
                            </div>

                            <Button className="w-full mt-6 bg-foreground text-background hover:bg-foreground/90 font-mono text-sm">
                              <Play className="w-4 h-4 mr-2" />
                              EXECUTE_APPLICATION()
                            </Button>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

      </div>
    </SectionTransition>
  )
}
