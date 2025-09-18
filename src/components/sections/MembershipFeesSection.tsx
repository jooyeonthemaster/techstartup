'use client'

import { Check, CheckCircle2, Circle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface MembershipTier {
  tier: string
  price: string
  features: string[]
  highlight?: boolean
  label?: string
}

const membershipTiers: MembershipTier[] = [
  {
    tier: '협회장',
    price: '500만원',
    features: [
      '협회 최고 의사결정권',
      '모든 사업 우선 참여권',
      '개인투자조합 GP 자격',
      '대외 활동 대표권',
      '전략적 파트너십 주도권'
    ]
  },
  {
    tier: '이사',
    price: '100만원',
    features: [
      '이사회 의결권',
      '주요 사업 기획 참여',
      '투자 의사결정 참여',
      '멘토링 프로그램 주도',
      '학술세미나 발표 기회'
    ],
    highlight: true,
    label: 'RECOMMENDED'
  },
  {
    tier: '정회원',
    price: '30만원',
    features: [
      '모든 협회 활동 참여',
      '네트워킹 이벤트 참석',
      '교육 프로그램 수강',
      '투자 정보 공유',
      '취업 지원 서비스'
    ]
  }
]

// Payment info removed as requested

export default function MembershipFeesSection({ showHeader = true }: { showHeader?: boolean }) {
  const [selectedTier, setSelectedTier] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Auto-select recommended tier
    const recommendedIndex = membershipTiers.findIndex(t => t.highlight)
    if (recommendedIndex !== -1) {
      setSelectedTier(recommendedIndex)
    }
  }, [])

  // Clipboard helper removed with payment section

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Ultra minimal background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950/50 dark:to-black" />
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
                             radial-gradient(circle at 40% 20%, rgba(120, 119, 198, 0.02) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Minimal Header */}
        {showHeader && (
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-sm font-medium text-gray-400 dark:text-gray-600 tracking-widest mb-4">MEMBERSHIP</p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
              협회 가입 안내
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mx-auto" />
          </div>
        )}

        {/* Revolutionary Grid Layout */}
        <div className="max-w-7xl mx-auto">
          {/* Membership Tiers - Horizontal Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {membershipTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Label */}
                {tier.label && (
                  <div className="absolute -top-3 left-8 z-10">
                    <span className="text-[10px] font-medium tracking-widest text-gray-400 dark:text-gray-600 bg-white dark:bg-black px-3 py-1">
                      {tier.label}
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setSelectedTier(index)}
                  className={`group w-full text-left transition-all duration-500 ${
                    selectedTier === index ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                  }`}
                >
                  <div className={`relative p-8 rounded-2xl border transition-all duration-500 ${
                    selectedTier === index 
                      ? 'bg-white/80 dark:bg-white/[0.03] border-gray-800/20 dark:border-white/20 shadow-2xl' 
                      : 'bg-white/40 dark:bg-white/[0.01] border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  } backdrop-blur-xl`}>
                    
                    {/* Selection Indicator */}
                    <div className="absolute top-8 right-8">
                      {selectedTier === index ? (
                        <CheckCircle2 className="w-5 h-5 text-gray-900 dark:text-white" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 dark:text-gray-700" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      {/* Tier & Price */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {tier.tier}
                        </h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-light text-gray-900 dark:text-white">
                            {tier.price.replace('만원', '')}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">만원</span>
                        </div>
                      </div>

                      {/* Features - Ultra minimal */}
                      <ul className="space-y-3">
                        {tier.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-3 text-sm">
                            <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <span className="text-gray-600 dark:text-gray-400 leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Payment/Instructions section removed */}
        </div>
      </div>
    </section>
  )
}