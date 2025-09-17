'use client'

import { Target, Lightbulb, Users, BookOpen, Briefcase, Building2 } from 'lucide-react'
import { useState, useEffect } from 'react'

const purposes = [
  {
    icon: Target,
    title: '인공지능 전환(AX) 및 디지털전환(DX) 솔루션',
    description: '기술벤처기업에 AI·DX 솔루션 도출 및 정부과제 연계',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Lightbulb,
    title: '기술스타트업 발굴 및 액셀러레이팅',
    description: '혁신적인 기술스타트업의 발굴, 교육, 직접투자 등 액셀러레이팅 및 개인투자조합 운영',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Users,
    title: '상호교류 활성화 및 상생비즈니스 모델',
    description: '기술벤처기업과 기술스타트업의 상호교류 활성화 및 협업을 통한 상생비즈니스 모델 창출',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: BookOpen,
    title: '기술창업학의 학술적 가치 재고',
    description: '대학교와 연계하여 기술벤처스타트업의 실증연구 및 사례분석을 통한 기술창업학의 학술적 가치 재고',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Briefcase,
    title: '기술이전 및 일자리 매칭 지원사업',
    description: '기술벤처스타트업의 성장 발전을 위한 기술이전, 일자리 매칭 등의 지원사업 운영',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Building2,
    title: '지·산·학 협력 활동',
    description: '기술벤처분야 생태계 활성화를 위한 지역사회, 산업계, 대학교의 지·산·학 협력 활동',
    gradient: 'from-teal-500 to-blue-500'
  }
]

export default function PurposeSection() {
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
      { threshold: 0.3 }
    )

    const elements = document.querySelectorAll('[data-purpose-item]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-gray-100/50 dark:bg-grid-gray-800/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <Target className="w-4 h-4 mr-2" />
            협회의 6대 목적
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            급변하는 글로벌 기술혁신 환경 속에서
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            (사)기술벤처스타트업협회는 대한민국의 기술벤처기업 성장 발전과 
            기술스타트업의 발굴 육성을 위해 2025년 3월 서울시를 주무관청으로 출범했습니다.
          </p>
        </div>

        {/* Purpose Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {purposes.map((purpose, index) => {
            const Icon = purpose.icon
            const isVisible = visibleItems.includes(index)
            
            return (
              <div
                key={index}
                data-index={index}
                data-purpose-item
                className={`group relative transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card Background */}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent overflow-hidden group-hover:-translate-y-2">
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${purpose.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                  <div className="absolute inset-[1px] bg-white dark:bg-gray-800 rounded-2xl" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${purpose.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Number Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${purpose.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                        {index + 1}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {purpose.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {purpose.description}
                    </p>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <Icon className="w-full h-full text-gray-400" />
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${purpose.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/about"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              협회소개 자세히 보기
            </a>
            <a
              href="/membership"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              회원가입 안내
            </a>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  )
}