'use client'

import { Target, Lightbulb, Users, BookOpen, Briefcase, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'

const purposes = [
  {
    icon: Target,
    title: '인공지능 전환(AX) 및 디지털전환(DX) 솔루션',
    description: '기술벤처기업에 AI·DX 솔루션 도출 및 정부과제 연계',
  },
  {
    icon: Lightbulb,
    title: '기술스타트업 발굴 및 액셀러레이팅',
    description: '혁신적인 기술스타트업의 발굴, 교육, 직접투자 등 액셀러레이팅 및 개인투자조합 운영',
  },
  {
    icon: Users,
    title: '상호교류 활성화 및 상생비즈니스 모델',
    description: '기술벤처기업과 기술스타트업의 상호교류 활성화 및 협업을 통한 상생비즈니스 모델 창출',
  },
  {
    icon: BookOpen,
    title: '기술창업학의 학술적 가치 재고',
    description: '대학교와 연계하여 기술벤처스타트업의 실증연구 및 사례분석을 통한 기술창업학의 학술적 가치 재고',
  },
  {
    icon: Briefcase,
    title: '기술이전 및 일자리 매칭 지원사업',
    description: '기술벤처스타트업의 성장 발전을 위한 기술이전, 일자리 매칭 등의 지원사업 운영',
  },
  {
    icon: Building2,
    title: '지·산·학 협력 활동',
    description: '기술벤처분야 생태계 활성화를 위한 지역사회, 산업계, 대학교의 지·산·학 협력 활동',
  }
]

export default function PurposeSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#004094_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-white shadow-sm border border-gray-100">
            <Target className="w-5 h-5 text-[#ff6b00] mr-2" />
            <span className="text-sm font-bold text-gray-700">MISSION & PURPOSE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            협회의 6대 설립 목적
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            기술벤처 생태계를 위한 핵심 미션을 수행하며, 지속가능한 성장을 지원합니다.
          </p>
        </motion.div>

        {/* Purpose Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {purposes.map((purpose, index) => {
            const Icon = purpose.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300"
              >
                <div className="mb-6 inline-block p-4 rounded-xl bg-blue-50 text-[#004094] group-hover:bg-[#004094] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#004094] transition-colors">
                  {purpose.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                  {purpose.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
