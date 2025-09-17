'use client'

import { GraduationCap, Brain, Building2, BookOpen, TrendingUp, Users } from 'lucide-react'
import { useState, useEffect } from 'react'

const targets = [
  {
    icon: GraduationCap,
    title: '동국대학교 일반대학원 기술창업학과',
    subtitle: '석·박사 동문',
    description: '기술창업학의 이론과 실무를 겸비한 전문 인력',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: Brain,
    title: '서울대학교 인공지능 최고경영자과정',
    subtitle: '(AICEO) 동문',
    description: 'AI 기술과 경영 능력을 겸비한 최고경영진',
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    icon: Building2,
    title: '기술벤처 스타트업',
    subtitle: '대표자 및 임원',
    description: '혁신적인 기술을 보유한 벤처기업 경영진',
    color: 'green',
    gradient: 'from-green-500 to-green-600'
  },
  {
    icon: BookOpen,
    title: '기술창업 전문가',
    subtitle: '(대학 교수 등)',
    description: '기술창업 분야의 학술적 전문성을 갖춘 연구자',
    color: 'orange',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    icon: TrendingUp,
    title: '개인투자자, 액셀러레이터',
    subtitle: 'VC, PE',
    description: '기술 기반 스타트업 투자 전문 기관 및 개인',
    color: 'red',
    gradient: 'from-red-500 to-red-600'
  }
]

export default function MembershipTargetSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])

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

    const elements = document.querySelectorAll('[data-member-item]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="membership" className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-transparent to-purple-50 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20" />
        <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            회원 모집 대상
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            함께 성장할 동반자를 찾습니다
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            기술 혁신과 창업 생태계 발전에 기여할 수 있는 전문가들을 모집합니다.
            다양한 배경과 전문성을 가진 분들의 참여를 환영합니다.
          </p>
        </div>

        {/* Target Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {targets.map((target, index) => {
            const Icon = target.icon
            const isVisible = visibleItems.includes(index)
            
            return (
              <div
                key={index}
                data-index={index}
                data-member-item
                className={`group relative transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent overflow-hidden group-hover:-translate-y-2 h-full">
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${target.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                  <div className="absolute inset-[1px] bg-white dark:bg-gray-800 rounded-2xl" />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${target.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {target.title}
                    </h3>

                    {/* Subtitle */}
                    <div className={`text-sm font-semibold text-${target.color}-600 dark:text-${target.color}-400 mb-4`}>
                      {target.subtitle}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                      {target.description}
                    </p>

                    {/* Decorative Element */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <Icon className="w-full h-full text-gray-400" />
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${target.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            회원 혜택
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">전문 네트워킹</h4>
              <p className="text-white/80">산·학·연 전문가들과의 네트워킹 기회 제공</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">투자 기회</h4>
              <p className="text-white/80">개인투자조합을 통한 투자 참여 기회</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">학술 활동</h4>
              <p className="text-white/80">기술창업 관련 학술세미나 및 연구 참여</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            지금 바로 참여하세요
          </h3>
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/membership"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              회원가입 신청하기
            </a>
            <a
              href="/membership/fees"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              협회비 안내 보기
            </a>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-ping" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
    </section>
  )
}