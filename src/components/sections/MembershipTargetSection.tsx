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
    <section id="membership" className="relative pt-0 pb-20 overflow-hidden">

      <div className="container mx-auto px-4 relative">
        {/* CTA moved to top */}
        <div className="text-center mb-10">
          <div className="inline-flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/membership/apply"
              className="px-7 py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)] hover:from-blue-700 hover:via-cyan-600 hover:to-purple-700 transition-all"
            >
              협회 가입 신청하기
            </a>
            <a
              href="/membership/fees"
              className="px-7 py-3 rounded-xl text-base font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 bg-white/60 dark:bg-white/10 backdrop-blur-md transition-all"
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
                <div className="relative rounded-2xl p-8 border border-white/20 hover:border-white/30 bg-white/55 dark:bg-white/[0.04] backdrop-blur-xl shadow-[0_1px_0_0_hsl(0_0%_100%/_0.25)_inset,0_6px_24px_-8px_hsl(0_0%_0%/_0.18)] transition-all group-hover:-translate-y-0.5 h-full">
                  {/* Top glossy highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/40 to-transparent" />
                  {/* Bottom soft shadow gradient */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 to-transparent" />
                  {/* Light sweep on hover */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute -inset-y-4 -left-1/2 w-2/3 bg-gradient-to-r from-white/0 via-white/30 to-white/0 rotate-12 translate-x-[-140%] group-hover:translate-x-[220%] transition-transform duration-700 ease-out" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon with subtle radial glow */}
                    <div className="relative mb-6">
                      <div className="absolute -z-10 -top-2 left-0 w-24 h-24 rounded-full bg-primary/20 blur-2xl" />
                      <div className="w-16 h-16 rounded-xl grid place-items-center border border-white/30 bg-white/60 dark:bg-white/10 backdrop-blur-md">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {target.title}
                    </h3>

                    {/* Subtitle */}
                    <div className="text-sm font-semibold text-muted-foreground mb-4">
                      {target.subtitle}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                      {target.description}
                    </p>

                    {/* Decorative Element */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 opacity-10">
                      <Icon className="w-full h-full text-foreground/10" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Benefits Section - glass & subtle */}
        <div className="rounded-3xl p-8 md:p-12 text-center border border-white/20 bg-white/55 dark:bg-white/[0.04] backdrop-blur-xl shadow-[0_1px_0_0_hsl(0_0%_100%/_0.25)_inset,0_6px_24px_-8px_hsl(0_0%_0%/_0.18)]">
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">회원 혜택</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-white/30 bg-white/60 dark:bg-white/10 backdrop-blur-md flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">전문 네트워킹</h4>
              <p className="text-muted-foreground">산·학·연 전문가들과의 네트워킹 기회 제공</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-white/30 bg-white/60 dark:bg-white/10 backdrop-blur-md flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">투자 기회</h4>
              <p className="text-muted-foreground">개인투자조합을 통한 투자 참여 기회</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-white/30 bg-white/60 dark:bg-white/10 backdrop-blur-md flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">학술 활동</h4>
              <p className="text-muted-foreground">기술창업 관련 학술세미나 및 연구 참여</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA removed - moved to top */}
      </div>

      
    </section>
  )
}