'use client'

import { BookOpen, Users, TrendingUp, MessageCircle, Building2, Target, Lightbulb, HandHeart, GraduationCap, Brain } from 'lucide-react'
import { useState, useEffect } from 'react'

const businessPlans = [
  {
    icon: BookOpen,
    title: '기술벤처 산학협력',
    subtitle: 'R&D 예산 420억 증가',
    description: '2025년 산학연 예산 전년 대비 420억 증가로 동국대, 서울대와 산학협력 연계 강화',
    highlights: ['동국대학교 기술창업학과 연계', '서울대 AI연구원 협력', '실증연구 프로젝트 확대'],
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: Users,
    title: '회원기업 채용지원',
    subtitle: '서울시 일자리 사업',
    description: '서울시 일자리 사업 수주로 2달 동안 풀타임 직무교육, 매칭 후 3개월 인건비 전액 지원',
    highlights: ['디지털 마케팅 분야', '영상제작 분야', '풀타임 직무교육 제공'],
    color: 'green',
    gradient: 'from-green-500 to-green-600'
  },
  {
    icon: TrendingUp,
    title: '기술스타트업 육성',
    subtitle: '개인투자조합 3.2억원',
    description: '창업교육 프로그램 운영과 코맥스벤처러스가 GP인 개인투자조합 결성으로 스타트업 직접 투자',
    highlights: ['개인투자조합 결성금액 3.2억원', '코맥스벤처러스 GP', '창업교육 프로그램 운영'],
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    icon: MessageCircle,
    title: '학술세미나 & 네트워킹',
    subtitle: '지속적인 지식 교류',
    description: '기술특강 또는 논문 세미나를 기술창업대학원 주관으로 서울대AICEO와 동국대 석·박사 교류',
    highlights: ['기술창업대학원 주관', '서울대AICEO 교류', '후배기수 지속 유입'],
    color: 'orange',
    gradient: 'from-orange-500 to-orange-600'
  }
]

const visionItems = [
  {
    icon: Target,
    title: '지·산·학 협력',
    description: '지역사회, 산업계, 대학교의 협력을 통한 기술벤처기업 성장지원'
  },
  {
    icon: Lightbulb,
    title: '기술스타트업 발굴육성',
    description: '혁신적인 기술스타트업 발굴과 체계적인 육성 프로그램 운영'
  },
  {
    icon: BookOpen,
    title: '기술창업 연구활동',
    description: '학술적 연구를 통한 기술창업 생태계 발전 기여'
  }
]

export default function BusinessPlan2025Section() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleItems(prev => [...prev, index])
          }
        })
      },
      { threshold: 0.2 }
    )

    const elements = document.querySelectorAll('[data-business-item]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="business" className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-gray-200 dark:bg-grid-gray-700 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <Building2 className="w-4 h-4 mr-2" />
            2025년 사업계획
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            4대 핵심 활동으로 미래를 설계합니다
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            지·산·학 협력을 통해 기술벤처기업 성장지원, 기술스타트업 발굴육성, 기술창업 연구활동을 추진합니다.
          </p>
        </div>

        {/* Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {visionItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
              </div>
            )
          })}
        </div>

        {/* Business Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {businessPlans.map((plan, index) => {
            const Icon = plan.icon
            const isVisible = visibleItems.includes(index)
            
            return (
              <div
                key={index}
                data-index={index}
                data-business-item
                className={`group relative transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent overflow-hidden group-hover:-translate-y-2 h-full">
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`} />
                  <div className="absolute inset-[1px] bg-white dark:bg-gray-800 rounded-3xl" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${plan.color}-100 text-${plan.color}-600 dark:bg-${plan.color}-900/30 dark:text-${plan.color}-400`}>
                        {index + 1}번째 핵심 활동
                      </div>
                    </div>

                    {/* Title and Subtitle */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {plan.title}
                    </h3>
                    <div className={`text-lg font-semibold text-${plan.color}-600 dark:text-${plan.color}-400 mb-4`}>
                      {plan.subtitle}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {plan.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">주요 특징</h4>
                      {plan.highlights.map((highlight, hIndex) => (
                        <div key={hIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <div className={`w-2 h-2 rounded-full bg-${plan.color}-500 mr-3`} />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {/* Decorative Element */}
                    <div className="absolute bottom-4 right-4 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <Icon className="w-full h-full text-gray-400" />
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Collaboration Partners */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              주요 협력 기관
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              산·학·연 협력을 통한 시너지 창출
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">동국대학교</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">기술창업학과 산학협력</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">서울대학교</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">AI연구원 및 AICEO 과정</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HandHeart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">서울시</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">민간기업맞춤형 매력일자리</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/business"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              사업안내 자세히 보기
            </a>
            <a
              href="/membership"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              함께 참여하기
            </a>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  )
}