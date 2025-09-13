'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Rocket,
  TrendingUp,
  Briefcase,
  Brain,
  HandshakeIcon,
  BookOpen,
  Building2,
  Globe,
  Users,
  Target,
  Zap,
  ArrowRight,
  ChevronRight,
  Sparkles,
  CheckCircle,
  Clock,
  DollarSign,
  Award,
  BarChart,
  Shield,
  Calendar,
  MessageCircle,
  FileText,
  Lightbulb,
  Network,
  Trophy
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const programs = [
  {
    id: 'accelerating',
    icon: TrendingUp,
    title: '엑셀러레이팅',
    subtitle: '3-6개월 집중 성장 프로그램',
    description: '초기 스타트업을 위한 집중 성장 프로그램으로, 비즈니스 모델 검증부터 시장 진출까지 체계적으로 지원합니다.',
    features: [
      '전문 멘토링 (주 2회)',
      '사무 공간 무료 제공',
      '최대 1억원 시드 투자',
      'Demo Day 참가 기회',
      '글로벌 네트워킹 지원'
    ],
    stats: { companies: '150+', successRate: '87%', funding: '200억원+' },
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    darkBgColor: 'from-blue-950/20 to-cyan-950/20'
  },
  {
    id: 'investment',
    icon: Briefcase,
    title: '투자 연계',
    subtitle: 'VC & 엔젤 투자자 매칭',
    description: '검증된 투자자 네트워크를 통해 스타트업과 투자자를 연결하고, 성공적인 투자 유치를 지원합니다.',
    features: [
      'IR 자료 작성 지원',
      '투자자 1:1 매칭',
      'Pitch Day 개최',
      '투자 계약서 검토',
      'Post-투자 관리'
    ],
    stats: { investors: '300+', deals: '500+', totalFunding: '2000억원+' },
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    darkBgColor: 'from-purple-950/20 to-pink-950/20'
  },
  {
    id: 'mentoring',
    icon: Brain,
    title: '멘토링',
    subtitle: '1:1 전문가 멘토링',
    description: '각 분야 전문가들의 실무 경험과 노하우를 바탕으로 맞춤형 멘토링을 제공합니다.',
    features: [
      '분야별 전문 멘토 500+',
      '주 1회 정기 멘토링',
      '온/오프라인 선택 가능',
      '멘토링 리포트 제공',
      '후속 지원 프로그램'
    ],
    stats: { mentors: '500+', sessions: '10,000+', satisfaction: '95%' },
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
    darkBgColor: 'from-green-950/20 to-emerald-950/20'
  },
  {
    id: 'networking',
    icon: HandshakeIcon,
    title: '네트워킹',
    subtitle: '스타트업 커뮤니티 구축',
    description: '다양한 네트워킹 이벤트를 통해 스타트업 간 협업 기회를 창출하고 시너지를 만들어갑니다.',
    features: [
      '월간 네트워킹 데이',
      '분야별 밋업 행사',
      '글로벌 컨퍼런스',
      '온라인 커뮤니티',
      '비즈니스 매칭'
    ],
    stats: { events: '100+/년', participants: '5,000+', partnerships: '300+' },
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-50 to-red-50',
    darkBgColor: 'from-orange-950/20 to-red-950/20'
  },
  {
    id: 'education',
    icon: BookOpen,
    title: '교육 프로그램',
    subtitle: '창업 역량 강화 교육',
    description: '창업부터 성장까지 단계별로 필요한 실무 교육을 제공하여 스타트업의 역량을 강화합니다.',
    features: [
      '창업 기초 과정',
      '성장 전략 워크샵',
      '글로벌 진출 교육',
      '기술 트렌드 세미나',
      '온라인 강의 플랫폼'
    ],
    stats: { courses: '50+', students: '3,000+/년', completion: '92%' },
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'from-indigo-50 to-blue-50',
    darkBgColor: 'from-indigo-950/20 to-blue-950/20'
  },
  {
    id: 'space',
    icon: Building2,
    title: '공간 지원',
    subtitle: '사무 공간 & 인프라',
    description: '스타트업의 성장 단계에 맞는 업무 공간과 필수 인프라를 제공합니다.',
    features: [
      '코워킹 스페이스',
      '전용 오피스',
      '회의실 & 세미나실',
      'IT 인프라 지원',
      '24시간 이용 가능'
    ],
    stats: { spaces: '10개 지점', seats: '1,000+', facilities: '50+' },
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'from-teal-50 to-cyan-50',
    darkBgColor: 'from-teal-950/20 to-cyan-950/20'
  }
]

const process = [
  { step: '01', title: '신청 & 접수', desc: '온라인 신청서 작성 및 서류 제출', icon: FileText },
  { step: '02', title: '심사 & 평가', desc: '전문가 심사 및 인터뷰 진행', icon: Target },
  { step: '03', title: '선정 & 협약', desc: '최종 선정 및 지원 협약 체결', icon: Award },
  { step: '04', title: '프로그램 참여', desc: '맞춤형 지원 프로그램 시작', icon: Rocket },
  { step: '05', title: '성과 관리', desc: '지속적인 모니터링 및 후속 지원', icon: BarChart }
]

const testimonials = [
  {
    company: '테크스타트',
    ceo: '김대표',
    content: '협회의 엑셀러레이팅 프로그램을 통해 시리즈 A 투자를 성공적으로 유치했습니다.',
    result: '50억원 투자 유치'
  },
  {
    company: '이노베이션랩',
    ceo: '이대표',
    content: '멘토링 프로그램이 사업 방향을 재정립하는데 큰 도움이 되었습니다.',
    result: '매출 300% 성장'
  },
  {
    company: '퓨처테크',
    ceo: '박대표',
    content: '글로벌 네트워킹을 통해 해외 파트너십을 성공적으로 구축했습니다.',
    result: '5개국 진출 성공'
  }
]

export default function StartupPage() {
  const [selectedProgram, setSelectedProgram] = useState(programs[0])
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-600/5 to-purple-600/5" />
          <div className="absolute top-40 -left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              스타트업 성장 파트너
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              스타트업 지원 프로그램
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              아이디어부터 유니콘까지, 모든 성장 단계를 지원합니다<br />
              500개 이상의 스타트업이 선택한 검증된 프로그램
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                지원 프로그램 신청
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                상담 예약
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {[
              { icon: Rocket, label: '지원 스타트업', value: '500+' },
              { icon: DollarSign, label: '누적 투자 연계', value: '2000억+' },
              { icon: Users, label: '전문 멘토', value: '500+' },
              { icon: Trophy, label: '성공률', value: '87%' }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              지원 프로그램
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              스타트업의 성장 단계에 맞는 맞춤형 프로그램을 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProgram(program)}
                className="cursor-pointer"
              >
                <Card className={`h-full hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group ${
                  selectedProgram.id === program.id ? 'ring-2 ring-blue-600' : ''
                }`}>
                  <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} group-hover:scale-110 transition-transform duration-300`}>
                        <program.icon className="h-7 w-7 text-white" />
                      </div>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-all duration-300 ${
                        selectedProgram.id === program.id ? 'rotate-90 text-blue-600' : 'group-hover:translate-x-1'
                      }`} />
                    </div>
                    <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{program.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {program.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {Object.entries(program.stats)[0][0]}: {Object.entries(program.stats)[0][1]}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {Object.entries(program.stats)[1][0]}: {Object.entries(program.stats)[1][1]}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Selected Program Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProgram.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-12"
            >
              <Card className="overflow-hidden border-0 shadow-2xl">
                <div className={`h-3 bg-gradient-to-r ${selectedProgram.color}`} />
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${selectedProgram.color}`}>
                          <selectedProgram.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {selectedProgram.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {selectedProgram.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {selectedProgram.description}
                      </p>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">주요 혜택</h4>
                        {selectedProgram.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="lg:w-80">
                      <div className={`bg-gradient-to-br ${selectedProgram.bgColor} dark:${selectedProgram.darkBgColor} rounded-xl p-6`}>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">프로그램 성과</h4>
                        <div className="space-y-4">
                          {Object.entries(selectedProgram.stats).map(([key, value]) => (
                            <div key={key}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                  {value}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 space-y-3">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                            프로그램 신청
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          <Button variant="outline" className="w-full">
                            자세히 알아보기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              지원 프로세스
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              간단한 5단계로 프로그램에 참여하실 수 있습니다
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold mb-4">
                        {item.step}
                      </div>
                      <item.icon className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </CardContent>
                  </Card>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              성공 사례
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              협회 프로그램을 통해 성장한 스타트업들의 이야기
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        {testimonial.result}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold">
                        {testimonial.ceo[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.ceo}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl text-white/90 mb-8">
              여러분의 아이디어가 현실이 되는 순간,<br />
              기술벤처스타트업협회가 함께합니다
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
                프로그램 신청하기
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                무료 상담 예약
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}