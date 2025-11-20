'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Briefcase, Rocket, GraduationCap } from 'lucide-react'

const businessPlans = [
  {
    number: '01',
    title: '기술벤처 산학협력',
    subtitle: 'R&D 예산 420억 증가',
    description: '2025년 산학연 예산 전년 대비 420억 증가로 동국대, 서울대와 산학협력 연계 강화',
    icon: Users
  },
  {
    number: '02',
    title: '회원기업 채용지원',
    subtitle: '서울시 일자리 사업',
    description: '서울시 일자리 사업 수주로 2달 동안 풀타임 직무교육, 매칭 후 3개월 인건비 전액 지원',
    icon: Briefcase
  },
  {
    number: '03',
    title: '기술스타트업 육성',
    subtitle: '개인투자조합 3.2억원',
    description: '창업교육 프로그램 운영과 코맥스벤처러스가 GP인 개인투자조합 결성으로 스타트업 직접 투자',
    icon: Rocket
  },
  {
    number: '04',
    title: '학술세미나 & 네트워킹',
    subtitle: '지속적인 지식 교류',
    description: '기술특강 또는 논문 세미나를 기술창업대학원 주관으로 서울대AICEO와 동국대 석·박사 교류',
    icon: GraduationCap
  }
]

export default function BusinessPlan2025Section() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-[#004094] text-sm font-bold mb-4">
            2025 Business Plan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            2025년 주요 사업계획
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            기술벤처 생태계 활성화를 위한 4대 핵심 활동을 추진합니다.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {businessPlans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top Highlight Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-200 group-hover:from-[#004094] group-hover:to-[#005bac] transition-all duration-500 rounded-t-xl" />
                
                {/* Icon & Number */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-lg bg-blue-50 text-[#004094] group-hover:bg-[#004094] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-bold text-gray-100 group-hover:text-blue-50 transition-colors duration-300">
                    {plan.number}
                  </span>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#004094] transition-colors">
                  {plan.title}
                </h3>
                
                <p className="text-sm font-semibold text-[#ff6b00] mb-4">
                  {plan.subtitle}
                </p>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            href="/business"
            className="inline-flex items-center px-8 py-3 bg-[#004094] text-white font-bold rounded-sm hover:bg-[#00337a] transition-all duration-300 group"
          >
            사업 자세히 보기 
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
