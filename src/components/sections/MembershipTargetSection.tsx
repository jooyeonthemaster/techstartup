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
    <section id="membership" className="pt-0 pb-20">
      <div className="container mx-auto px-4">
        {/* CTA Buttons */}
        <div className="text-center mb-10">
          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/membership/apply"
              className="px-8 py-3 bg-[#ff6600] text-white font-bold hover:bg-[#ff6600]/90 transition-all duration-300 rounded"
            >
              협회 가입 신청하기
            </a>
            <a
              href="/membership/fees"
              className="px-8 py-3 bg-white text-[#005bac] font-bold border-2 border-[#005bac] hover:bg-blue-50 transition-all duration-300 rounded"
            >
              협회비 안내 보기
            </a>
          </div>
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
                <div className={`
                  bg-white rounded-lg p-8 h-full
                  border-2 shadow-sm hover:shadow-lg
                  transition-all duration-300 group-hover:-translate-y-1
                  ${
                    index === 0 ? 'border-blue-200 hover:border-[#005bac]/50' :
                    index === 1 ? 'border-orange-200 hover:border-[#ff6600]/50' :
                    index === 2 ? 'border-green-200 hover:border-green-500/50' :
                    index === 3 ? 'border-purple-200 hover:border-purple-500/50' :
                    'border-blue-200 hover:border-[#005bac]/50'
                  }
                `}>
                  
                  {/* Content */}
                  <div className="h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center
                        ${
                          index === 0 ? 'bg-blue-50 text-[#005bac]' :
                          index === 1 ? 'bg-orange-50 text-[#ff6600]' :
                          index === 2 ? 'bg-green-50 text-green-600' :
                          index === 3 ? 'bg-purple-50 text-purple-600' :
                          'bg-blue-50 text-[#005bac]'
                        }
                      `}>
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`
                      text-lg font-bold mb-2 transition-colors
                      ${
                        index === 0 ? 'text-[#005bac]' :
                        index === 1 ? 'text-[#ff6600]' :
                        index === 2 ? 'text-green-600' :
                        index === 3 ? 'text-purple-600' :
                        'text-[#005bac]'
                      }
                    `}>
                      {target.title}
                    </h3>

                    {/* Subtitle */}
                    <div className="text-sm font-semibold text-gray-500 mb-4">
                      {target.subtitle}
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed flex-grow">
                      {target.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Benefits Section - Traditional Design */}
        <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center border-2 border-[#005bac] shadow-sm">
          <h3 className="text-2xl md:text-3xl font-bold text-[#005bac] mb-8">회원 혜택</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 border-2 border-blue-200">
                <Brain className="w-8 h-8 text-[#005bac]" />
              </div>
              <h4 className="text-lg font-bold text-[#005bac] mb-2">전문 네트워킹</h4>
              <p className="text-gray-600">산·학·연 전문가들과의 네트워킹 기회 제공</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4 border-2 border-orange-200">
                <TrendingUp className="w-8 h-8 text-[#ff6600]" />
              </div>
              <h4 className="text-lg font-bold text-[#ff6600] mb-2">투자 기회</h4>
              <p className="text-gray-600">개인투자조합을 통한 투자 참여 기회</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4 border-2 border-green-200">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-green-600 mb-2">학술 활동</h4>
              <p className="text-gray-600">기술창업 관련 학술세미나 및 연구 참여</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA removed - moved to top */}
      </div>

      
    </section>
  )
}