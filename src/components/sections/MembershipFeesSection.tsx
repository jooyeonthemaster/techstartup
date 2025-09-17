'use client'

import { Crown, Shield, Users, CreditCard, Check, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

const membershipTiers = [
  {
    icon: Crown,
    tier: '협회장',
    price: '500만원',
    color: 'gold',
    gradient: 'from-yellow-400 to-yellow-600',
    bgGradient: 'from-yellow-50 to-orange-50',
    darkBgGradient: 'from-yellow-900/20 to-orange-900/20',
    features: [
      '협회 최고 의사결정권',
      '모든 사업 우선 참여권',
      '개인투자조합 GP 자격',
      '대외 활동 대표권',
      '전략적 파트너십 주도권'
    ],
    popular: false
  },
  {
    icon: Shield,
    tier: '이사',
    price: '100만원',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-cyan-50',
    darkBgGradient: 'from-blue-900/20 to-cyan-900/20',
    features: [
      '이사회 의결권',
      '주요 사업 기획 참여',
      '투자 의사결정 참여',
      '멘토링 프로그램 주도',
      '학술세미나 발표 기회'
    ],
    popular: true
  },
  {
    icon: Users,
    tier: '정회원',
    price: '30만원',
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-50 to-emerald-50',
    darkBgGradient: 'from-green-900/20 to-emerald-900/20',
    features: [
      '모든 협회 활동 참여',
      '네트워킹 이벤트 참석',
      '교육 프로그램 수강',
      '투자 정보 공유',
      '취업 지원 서비스'
    ],
    popular: false
  }
]

const bankInfo = {
  bank: '국민은행',
  account: '037601-04-143175',
  holder: '(사)기술벤처스타트업협회'
}

export default function MembershipFeesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [selectedTier, setSelectedTier] = useState(1)

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

    const elements = document.querySelectorAll('[data-fee-item]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <section className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-green-900/20" />
        <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
            <CreditCard className="w-4 h-4 mr-2" />
            협회비 안내
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            투명하고 합리적인 협회비
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            회원 등급에 따른 차별화된 혜택과 함께 
            기술벤처 생태계 발전에 기여하는 의미있는 투자입니다.
          </p>
        </div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {membershipTiers.map((tier, index) => {
            const Icon = tier.icon
            const isVisible = visibleItems.includes(index)
            const isSelected = selectedTier === index
            
            return (
              <div
                key={index}
                data-index={index}
                data-fee-item
                className={`group relative transform transition-all duration-700 cursor-pointer ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedTier(index)}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      추천
                    </div>
                  </div>
                )}

                <div className={`relative bg-gradient-to-br ${tier.bgGradient} dark:${tier.darkBgGradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${isSelected ? `border-${tier.color}-500` : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'} overflow-hidden h-full`}>
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-3xl`} />
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Tier Name */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {tier.tier}
                    </h3>

                    {/* Price */}
                    <div className={`text-4xl font-bold text-${tier.color}-600 dark:text-${tier.color}-400 mb-8`}>
                      {tier.price}
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                          <Check className={`w-5 h-5 text-${tier.color}-500 mr-3 flex-shrink-0`} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button 
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        isSelected 
                          ? `bg-gradient-to-r ${tier.gradient} text-white shadow-lg` 
                          : `border-2 border-${tier.color}-500 text-${tier.color}-600 dark:text-${tier.color}-400 hover:bg-${tier.color}-500 hover:text-white`
                      }`}
                    >
                      {isSelected ? '선택됨' : '선택하기'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bank Information */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                입금 계좌 정보
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                아래 계좌로 협회비를 입금해 주시면 됩니다.
              </p>
            </div>

            <div className="space-y-6">
              {/* Bank Name */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <span className="font-medium text-gray-700 dark:text-gray-300">은행명</span>
                <span className="font-bold text-gray-900 dark:text-white">{bankInfo.bank}</span>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <span className="font-medium text-gray-700 dark:text-gray-300">계좌번호</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900 dark:text-white font-mono">{bankInfo.account}</span>
                  <button
                    onClick={() => copyToClipboard(bankInfo.account)}
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    복사
                  </button>
                </div>
              </div>

              {/* Account Holder */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <span className="font-medium text-gray-700 dark:text-gray-300">예금주</span>
                <span className="font-bold text-gray-900 dark:text-white">{bankInfo.holder}</span>
              </div>
            </div>

            {/* Notice */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">입금 시 유의사항</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• 입금자명을 반드시 실명으로 기재해 주세요</li>
                    <li>• 입금 후 협회 사무국(02-000-0000)으로 연락 주시기 바랍니다</li>
                    <li>• 회원가입 승인 후 회원증이 발송됩니다</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/membership"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              회원가입 신청하기
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              문의하기
            </a>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-ping" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
    </section>
  )
}