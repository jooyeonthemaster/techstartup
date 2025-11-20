'use client'

import { Sparkles, TrendingUp, Users, Globe, Rocket, Target, Shield, BookOpen, Brain, Building2, HandshakeIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  // 설립 개요 - 3가지 핵심 가치
  const overviewValues = [
    {
      number: '01',
      title: '혁신 기술',
      description: 'AI/DX 솔루션 제공',
      icon: Brain,
      color: 'text-[#005bac]',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      number: '02',
      title: '지·산·학 협력',
      description: '생태계 활성화 추진',
      icon: Building2,
      color: 'text-[#ff6600]',
      bg: 'bg-orange-50',
      border: 'border-orange-200'
    },
    {
      number: '03',
      title: '스타트업 육성',
      description: '발굴 & 액셀러레이팅',
      icon: Rocket,
      color: 'text-[#005bac]',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    }
  ]

  // 설립 목적 - 6가지
  const establishmentPurposes = [
    {
      number: '하나',
      icon: Rocket,
      title: '스타트업 액셀러레이팅',
      description: '혁신적인 기술스타트업의 발굴 및 교육, 직접투자 등 액셀러레이팅 및 이를 위한 개인투자조합 운영'
    },
    {
      number: '둘',
      icon: BookOpen,
      title: '학술적 가치 재고',
      description: '대학교와 연계하여 기술벤처스타트업의 실증연구 및 사례분석을 통한 기술창업학의 학술적 가치 재고'
    },
    {
      number: '셋',
      icon: Brain,
      title: 'AI/DX 솔루션 도출',
      description: '기술벤처기업에 인공지능 전환(AX) 및 디지털전환(DX)을 위한 솔루션 도출 및 정부과제 연계'
    },
    {
      number: '넷',
      icon: Building2,
      title: '지·산·학 협력 활동',
      description: '기술벤처분야 생태계 활성화을 위한 지역사회, 산업계, 대학교의 지·산·학 협력 활동'
    },
    {
      number: '다섯',
      icon: HandshakeIcon,
      title: '상생비즈니스 모델 창출',
      description: '기술벤처기업과 기술스타트업의 상호교류 활성화 및 협업을 통한 상생비즈니스 모델 창출'
    },
    {
      number: '여섯',
      icon: Target,
      title: '지원사업 운영',
      description: '기술벤처스타트업의 성장 발전을 위한 기술이전, 일자리 매칭 등의 지원사업 운영'
    }
  ]

  // 협회 연혁
  const timeline = [
    { 
      date: '2025. 1', 
      title: '(사)기술벤처스타트업협회 창립총회', 
      description: '기술벤처스타트업협회 창립총회 개최',
      isFirst: true 
    },
    { 
      date: '2025. 4', 
      title: '사단법인 설립 및 정기총회', 
      description: '사단법인 기술벤처스타트업협회 정식 설립',
    },
    { 
      date: '2025. 4', 
      title: '서울시 민간기업맞춤형 매력일자리 사업', 
      description: '서울시 민간기업맞춤형 매력일자리 사업 수주 및 운영',
    },
    { 
      date: '2025. 5', 
      title: '서울대 인공지능 연구원 및 동국대학교 업무협약', 
      description: '주요 대학교와 산학협력 업무협약 체결',
    },
    { 
      date: '2025. 6', 
      title: '개인투자조합 출범', 
      description: '개인투자조합 공식 출범',
    },
    { 
      date: '2025. 8', 
      title: '외국인 유학생 창업 지원 교육프로그램 운영', 
      description: '외국인 유학생 대상 창업 지원 교육프로그램 시작',
    },
    { 
      date: '2025. 9', 
      title: '개인투자조합 결성 총회 및 투자대회 개최', 
      description: '개인투자조합 결성 총회 및 스타트업 투자대회 개최',
      isCurrent: true 
    }
  ]

  return (
    <section id="about" className="bg-white overflow-hidden">
      
      {/* 1. Intro Section - Enhanced Design */}
      <div className="relative h-[85vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/network-connection.png"
            alt="Background Pattern"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Gradient Overlay for smooth transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-10"
            >
              <div className="px-6 py-2 border border-[#004094]/30 bg-white/50 backdrop-blur-sm rounded-full shadow-sm">
                <span className="text-[#004094] font-bold tracking-[0.2em] uppercase text-sm">Established 2025</span>
              </div>
            </motion.div>
            
            {/* Main Title */}
            <h2 className="mb-10 leading-tight">
              <span className="block text-2xl md:text-3xl text-gray-500 font-medium mb-4 tracking-wide">사단법인</span>
              <span className="text-5xl md:text-7xl font-bold text-[#004094] tracking-tight drop-shadow-sm">
                기술벤처스타트업협회
              </span>
            </h2>
            
            {/* Divider with decorative elements */}
            <div className="flex items-center justify-center gap-4 mb-14">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#004094]" />
              <div className="w-2 h-2 rounded-full bg-[#004094]" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#004094]" />
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-2xl md:text-4xl font-medium text-gray-900 leading-normal">
                대한민국 기술 스타트업의 성장을 이끄는 든든한 파트너
              </p>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                혁신적인 아이디어를 <span className="text-[#004094] font-bold relative inline-block">
                  현실로
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-[#004094]/10 -z-10 transform -rotate-2" />
                </span> 만드는 여정
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-[#004094]/20 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-[#004094]/40 rounded-full" />
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pb-32">
        {/* 2. 설립 개요 (Overview) */}
        <div className="mb-40">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">설립 개요</h3>
            <div className="w-16 h-1.5 bg-[#ff6b00] mx-auto mb-8" />
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-[#004094] font-bold mb-8">
              Since 2025. 3
            </div>
            <p className="text-lg text-gray-700 leading-loose max-w-4xl mx-auto">
              <span className="font-bold text-[#004094]">(사) 기술벤처스타트업협회</span>는 급변하는 글로벌 기술혁신 및 디지털전환(DX) 환경 속에서<br className="hidden md:block" />
              대한민국의 기술벤처기업의 성장발전과 기술스타트업의 발굴육성을 위해<br className="hidden md:block" />
              2025년 3월 서울시를 주무관청으로 출범했습니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {overviewValues.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`group relative p-8 rounded-2xl border-2 ${value.border} ${value.bg} hover:shadow-lg transition-all duration-300 text-center`}
                >
                  <div className={`text-4xl font-bold ${value.color} mb-4 opacity-20`}>{value.number}</div>
                  <div className={`w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${value.color}`} />
                  </div>
                  <h4 className={`text-2xl font-bold ${value.color} mb-2`}>{value.title}</h4>
                  <p className="text-gray-600 font-medium">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* 3. 설립 목적 (Purposes) */}
        <div className="mb-40 bg-gray-50 -mx-4 px-4 py-24 relative">
          {/* Background Pattern for Purposes */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#004094_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-bold text-gray-900 mb-4">설립 목적</h3>
              <div className="w-16 h-1.5 bg-[#ff6b00] mx-auto mb-6" />
              <p className="text-xl text-gray-600">기술벤처스타트업협회의 6가지 핵심 목적과 활동 분야</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {establishmentPurposes.map((purpose, index) => {
                const Icon = purpose.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#004094] transition-colors duration-300">
                        <span className="font-bold text-[#004094] group-hover:text-white">{index + 1}</span>
                      </div>
                      <Icon className="w-8 h-8 text-gray-300 group-hover:text-[#ff6b00] transition-colors duration-300" />
                    </div>
                    <div className="mb-4">
                      <span className="text-xs font-bold text-[#ff6b00] bg-orange-50 px-2 py-1 rounded">{purpose.number}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#004094] transition-colors">
                      {purpose.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {purpose.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-md border border-gray-100">
                <span className="text-gray-500">이 모든 목적을 통해</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="text-[#004094] font-bold text-lg">기술벤처 생태계 발전에 기여</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. 협회 연혁 (Timeline) */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
             <h3 className="text-4xl font-bold text-gray-900 mb-4">협회 연혁</h3>
             <div className="w-16 h-1.5 bg-[#ff6b00] mx-auto mb-6" />
             <p className="text-xl text-gray-600">2025년 주요 활동 및 성과</p>
          </motion.div>

          <div className="relative border-l-2 border-blue-100 ml-6 md:ml-0 md:border-l-0">
            {/* Center Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-blue-100 -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 0, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`md:flex items-center justify-between ${isLeft ? 'flex-row-reverse' : ''} group`}
                  >
                    {/* Empty Space */}
                    <div className="hidden md:block w-5/12" />

                    {/* Center Node */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-blue-100 rounded-full z-10 flex items-center justify-center group-hover:border-[#ff6b00] group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <span className="text-xs font-bold text-[#004094]">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    {/* Content */}
                    <div className={`pl-20 md:pl-0 md:w-5/12 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                      <div className={`inline-block px-3 py-1 rounded bg-blue-50 text-[#004094] font-bold text-sm mb-2 ${isLeft ? 'md:ml-auto' : ''}`}>
                        {item.date}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#004094] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Bottom Summary */}
            <div className="text-center mt-24">
              <p className="text-xl font-medium text-[#004094]">
                지속적인 성장과 혁신을 통한 기술벤처 생태계 발전
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
