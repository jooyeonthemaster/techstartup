'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  Target, 
  Users, 
  Award,
  TrendingUp,
  Globe,
  Shield,
  Heart,
  Zap,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Calendar,
  CheckCircle,
  Briefcase,
  Rocket,
  Brain,
  HandshakeIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const stats = [
  { label: '회원사', value: '500+', icon: Building2, suffix: '개사' },
  { label: '누적 투자 연계', value: '2000', icon: TrendingUp, suffix: '억원' },
  { label: '설립 연도', value: '2019', icon: Calendar, suffix: '년' },
  { label: '지원 프로그램', value: '50+', icon: Rocket, suffix: '개' },
]

const values = [
  {
    icon: Target,
    title: '혁신',
    description: '끊임없는 기술 혁신을 통한 미래 창조',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: HandshakeIcon,
    title: '협력',
    description: '스타트업 간 상생 협력 생태계 구축',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Shield,
    title: '신뢰',
    description: '투명하고 신뢰할 수 있는 협회 운영',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Heart,
    title: '성장',
    description: '회원사와 함께 성장하는 동반자',
    color: 'from-orange-500 to-red-500'
  }
]

const milestones = [
  { year: '2019', title: '협회 설립', description: '기술벤처스타트업협회 공식 출범' },
  { year: '2020', title: '100개 회원사 돌파', description: '첫 해 100개 스타트업 회원 가입' },
  { year: '2021', title: '정부 지원사업 시작', description: '중소벤처기업부 협력 사업 개시' },
  { year: '2022', title: '글로벌 네트워크 구축', description: '해외 액셀러레이터와 MOU 체결' },
  { year: '2023', title: '500개 회원사 달성', description: '대한민국 대표 스타트업 협회로 성장' },
  { year: '2024', title: '유니콘 기업 배출', description: '회원사 중 첫 유니콘 기업 탄생' },
]

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-purple-600/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              Since 2019
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              기술벤처스타트업협회
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              대한민국 기술 스타트업의 성장을 이끄는 든든한 파트너<br />
              혁신적인 아이디어를 현실로 만드는 여정을 함께합니다
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                회원사 가입하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                브로슈어 다운로드
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50">
                  <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                  <span className="text-lg font-normal text-gray-500 dark:text-gray-400">{stat.suffix}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Tabs */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                우리의 미션과 비전
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                기술 스타트업 생태계의 미래를 함께 만들어갑니다
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-900">
                {['mission', 'vision', 'goals'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {tab === 'mission' ? '미션' : tab === 'vision' ? '비전' : '목표'}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8"
              >
                {activeTab === 'mission' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">우리의 미션</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      기술벤처스타트업협회는 대한민국 기술 스타트업의 성장과 혁신을 지원하여, 
                      글로벌 시장에서 경쟁력을 갖춘 유니콘 기업을 육성하는 것을 미션으로 합니다.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        '스타트업 성장 단계별 맞춤 지원',
                        '투자자와 스타트업 간 연결 고리 역할',
                        '정부 정책과 스타트업 현장의 가교 역할',
                        '글로벌 네트워크를 통한 해외 진출 지원'
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'vision' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">우리의 비전</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      2030년까지 아시아를 대표하는 스타트업 협회로 성장하여, 
                      대한민국을 글로벌 스타트업 허브로 만드는 핵심 역할을 수행합니다.
                    </p>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1,000+</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">회원사 목표</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">10개</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">유니콘 기업 육성</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">50개국</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">글로벌 네트워크</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'goals' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2024년 주요 목표</h3>
                    <div className="space-y-4">
                      {[
                        { title: '투자 연계 확대', desc: '년간 500억원 규모 투자 연계 달성', progress: 75 },
                        { title: '교육 프로그램 강화', desc: '100개 이상 교육 프로그램 운영', progress: 60 },
                        { title: '글로벌 진출 지원', desc: '50개사 해외 진출 성공', progress: 45 },
                        { title: '정부 지원사업 확대', desc: '10개 신규 정부 사업 유치', progress: 80 }
                      ].map((goal, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{goal.progress}%</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{goal.desc}</p>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              핵심 가치
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              우리가 추구하는 네 가지 핵심 가치
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              협회 연혁
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              2019년부터 현재까지의 성장 여정
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-cyan-600 to-purple-600" />
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center mb-8"
                >
                  <div className="absolute left-8 w-4 h-4 bg-white dark:bg-gray-800 border-4 border-blue-600 rounded-full -translate-x-1/2" />
                  <div className="ml-20 flex-1">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-2">
                          <Badge variant="outline" className="mr-3">{milestone.year}</Badge>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              함께 성장하는 파트너가 되어주세요
            </h2>
            <p className="text-xl text-white/90 mb-8">
              기술벤처스타트업협회와 함께 대한민국 스타트업 생태계의 미래를 만들어갑시다
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
                회원사 가입 신청
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                파트너십 문의
                <HandshakeIcon className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}