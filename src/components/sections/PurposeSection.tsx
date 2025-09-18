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
    <section className="relative pt-0 pb-24 overflow-hidden">
      {/* Subtle background with soft vignette and grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,_hsl(var(--foreground)/0.06),_transparent_60%)] dark:bg-[radial-gradient(1200px_600px_at_50%_-10%,_hsl(var(--foreground)/0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-gray-100/40 dark:bg-grid-gray-800/30 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,.8),transparent_75%)]" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full border border-white/30 bg-white/60 dark:bg-white/10 backdrop-blur-md text-foreground/90 dark:text-foreground/85 text-base md:text-2xl font-bold shadow-sm">
            <Target className="w-5 h-5 md:w-6 md:h-6" />
            <span className="tracking-wide">협회의 6대 목적</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
            기술벤처 생태계를 위한 핵심 미션
          </p>
          <p className="mt-2 text-sm md:text-base text-muted-foreground/90 max-w-3xl mx-auto">
            혁신의 본질에 집중하는 정제된 목표로, 지속가능한 성장을 지원합니다.
          </p>
        </div>

        {/* Purpose Grid (Glassmorphism cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {purposes.map((purpose, index) => {
            const Icon = purpose.icon
            const isVisible = visibleItems.includes(index)

            return (
              <div
                key={index}
                data-index={index}
                data-purpose-item
                className={`group relative transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative rounded-2xl p-7 md:p-8 border border-white/20 hover:border-white/30 bg-white/55 dark:bg-white/[0.04] backdrop-blur-xl shadow-[0_1px_0_0_hsl(0_0%_100%/_0.25)_inset,0_6px_24px_-8px_hsl(0_0%_0%/_0.18)] transition-all group-hover:-translate-y-0.5">
                  {/* Top glossy highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/40 to-transparent" />
                  {/* Bottom soft shadow gradient */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 to-transparent" />
                  {/* Light sweep on hover */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute -inset-y-4 -left-1/2 w-2/3 bg-gradient-to-r from-white/0 via-white/30 to-white/0 rotate-12 translate-x-[-140%] group-hover:translate-x-[220%] transition-transform duration-700 ease-out" />
                  </div>
                  {/* Top-right number chip */}
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full grid place-items-center text-xs font-semibold text-foreground/80 bg-white/60 dark:bg-white/10 border border-white/30">
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon with subtle radial glow */}
                  <div className="relative mb-5">
                    <div className="absolute -z-10 -top-2 left-0 w-20 h-20 rounded-full bg-primary/20 blur-2xl" />
                    <div className="w-14 h-14 rounded-xl grid place-items-center border border-white/30 bg-white/60 dark:bg-white/10 backdrop-blur-md">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-semibold tracking-[-0.01em] text-foreground mb-2">
                    {purpose.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {purpose.description}
                  </p>

                  {/* Subtle corner mark */}
                  <div className="pointer-events-none absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl border border-white/10" />
                </div>
              </div>
            )
          })}
        </div>

        
      </div>
    </section>
  )
}