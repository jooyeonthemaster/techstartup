'use client'

import { useState, useEffect } from 'react'
import { 
  Rocket,
  BookOpen,
  Brain,
  Target,
  Building2,
  HandshakeIcon,
  ArrowUpRight
} from 'lucide-react'


const establishmentPurposes = [
  {
    number: '하나',
    icon: Rocket,
    title: '스타트업 액셀러레이팅',
    description: '혁신적인 기술스타트업의 발굴 및 교육, 직접투자 등 액셀러레이팅 및 이를 위한 개인투자조합 운영',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: '둘',
    icon: BookOpen,
    title: '학술적 가치 재고',
    description: '대학교와 연계하여 기술벤처스타트업의 실증연구 및 사례분석을 통한 기술창업학의 학술적 가치 재고',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    number: '셋',
    icon: Brain,
    title: 'AI/DX 솔루션 도출',
    description: '기술벤처기업에 인공지능 전환(AX) 및 디지털전환(DX)을 위한 솔루션 도출 및 정부과제 연계',
    color: 'from-green-500 to-emerald-500'
  },
  {
    number: '넷',
    icon: Building2,
    title: '지·산·학 협력 활동',
    description: '기술벤처분야 생태계 활성화을 위한 지역사회, 산업계, 대학교의 지·산·학 협력 활동',
    color: 'from-orange-500 to-red-500'
  },
  {
    number: '다섯',
    icon: HandshakeIcon,
    title: '상생비즈니스 모델 창출',
    description: '기술벤처기업과 기술스타트업의 상호교류 활성화 및 협업을 통한 상생비즈니스 모델 창출',
    color: 'from-pink-500 to-rose-500'
  },
  {
    number: '여섯',
    icon: Target,
    title: '지원사업 운영',
    description: '기술벤처스타트업의 성장 발전을 위한 기술이전, 일자리 매칭 등의 지원사업 운영',
    color: 'from-teal-500 to-cyan-500'
  }
]

const milestones = [
  { year: '25. 1', title: '(사)기술벤처스타트업협회 창립총회', description: '기술벤처스타트업협회 창립총회 개최' },
  { year: '25. 4', title: '사단법인 설립 및 정기총회', description: '사단법인 기술벤처스타트업협회 정식 설립' },
  { year: '25. 4', title: '서울시 민간기업맞춤형 매력일자리 사업', description: '서울시 민간기업맞춤형 매력일자리 사업 수주 및 운영' },
  { year: '25. 5', title: '서울대 인공지능 연구원 및 동국대학교 업무협약', description: '주요 대학교와 산학협력 업무협약 체결' },
  { year: '25. 6', title: '개인투자조합 출범', description: '개인투자조합 공식 출범' },
  { year: '25. 8', title: '외국인 유학생 창업 지원 교육프로그램 운영', description: '외국인 유학생 대상 창업 지원 교육프로그램 시작' },
  { year: '25. 9', title: '개인투자조합 결성 총회 및 투자대회 개최', description: '개인투자조합 결성 총회 및 스타트업 투자대회 개최' },
]

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section - Traditional Design */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-blue-50/30 to-white">

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-block mb-8">
              <p className="text-sm font-bold text-[#005bac] uppercase">
                Established 2025
              </p>
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-[#005bac] mb-6">
              <span className="block text-lg text-gray-600 font-normal mb-2">
                사단법인
              </span>
              기술벤처스타트업협회
            </h1>
            
            {/* Divider */}
            <div className="w-32 h-1 bg-[#005bac] mx-auto mb-8" />
            
            {/* Subtitle */}
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
              대한민국 기술 스타트업의 성장을 이끄는 든든한 파트너<br />
              혁신적인 아이디어를 <span className="font-bold text-[#005bac]">현실로</span> 만드는 여정
            </p>
            
          </div>
        </div>
      </section>


      {/* Establishment Overview - Traditional Design */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#005bac] mb-4">
                설립 개요
              </h2>
              <div className="w-24 h-1 bg-[#005bac] mx-auto" />
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-lg border-2 border-blue-200 shadow-sm hover:shadow-lg hover:border-[#005bac]/50 transition-all duration-300 p-10 md:p-14">
                
                <div>
                  {/* Date Badge */}
                  <div className="flex justify-center mb-10">
                    <div className="inline-flex items-center px-4 py-2 rounded bg-blue-50 border border-blue-200">
                      <span className="text-sm font-bold text-[#005bac]">Since 2025. 3</span>
                    </div>
                  </div>
                  
                  {/* Main Text */}
                  <p className="text-lg leading-loose text-gray-700 mb-12 text-center">
                    <span className="font-bold text-[#005bac]">(사) 기술벤처스타트업협회</span>는 
                    급변하는 글로벌 기술혁신 및 디지털전환(DX) 환경 속에서<br />
                    대한민국의 기술벤처기업의 성장발전과 기술스타트업의 발굴육성을 위해<br />
                    <span className="font-bold text-[#ff6600]">2025년 3월</span> 서울시를 주무관청으로 출범했습니다.
                  </p>

                  {/* Core Values Grid */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#005bac] mb-4">01</div>
                        <h4 className="font-bold text-[#005bac] mb-2">혁신 기술</h4>
                        <p className="text-sm text-gray-600">AI/DX 솔루션 제공</p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#ff6600] mb-4">02</div>
                        <h4 className="font-bold text-[#ff6600] mb-2">지·산·학 협력</h4>
                        <p className="text-sm text-gray-600">생태계 활성화 추진</p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-4">03</div>
                        <h4 className="font-bold text-green-600 mb-2">스타트업 육성</h4>
                        <p className="text-sm text-gray-600">발굴 & 액셀러레이팅</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>


      {/* Establishment Purposes - Traditional Design */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
        
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#005bac] mb-4">
              설립 목적
            </h2>
            <p className="text-gray-600">
              기술벤처스타트업협회의 6가지 핵심 목적과 활동 분야
            </p>
          </div>

          {/* Premium Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {establishmentPurposes.map((purpose, index) => {
              const Icon = purpose.icon
              const colors = [
                { border: 'border-blue-200', bg: 'bg-blue-50', hover: 'hover:border-[#005bac]/50', text: 'text-[#005bac]', icon: 'text-[#005bac]' },
                { border: 'border-orange-200', bg: 'bg-orange-50', hover: 'hover:border-[#ff6600]/50', text: 'text-[#ff6600]', icon: 'text-[#ff6600]' },
                { border: 'border-green-200', bg: 'bg-green-50', hover: 'hover:border-green-500/50', text: 'text-green-600', icon: 'text-green-600' },
                { border: 'border-purple-200', bg: 'bg-purple-50', hover: 'hover:border-purple-500/50', text: 'text-purple-600', icon: 'text-purple-600' },
                { border: 'border-blue-200', bg: 'bg-blue-50', hover: 'hover:border-[#005bac]/50', text: 'text-[#005bac]', icon: 'text-[#005bac]' },
                { border: 'border-orange-200', bg: 'bg-orange-50', hover: 'hover:border-[#ff6600]/50', text: 'text-[#ff6600]', icon: 'text-[#ff6600]' }
              ]
              const colorScheme = colors[index]
              return (
                <div
                  key={purpose.number}
                  className="group transform transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`${colorScheme.bg} rounded-lg border-2 ${colorScheme.border} ${colorScheme.hover} shadow-sm hover:shadow-lg transition-all duration-300 p-8 h-full`}>
                    {/* Content */}
                    <div>
                      {/* Icon and Number */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center ${colorScheme.text} font-bold text-2xl border-2 ${colorScheme.border}`}>
                          {index + 1}
                        </div>
                        <Icon className={`w-6 h-6 ${colorScheme.icon}`} />
                      </div>

                      {/* Korean Number Badge */}
                      <div className="inline-flex items-center px-3 py-1 rounded bg-white border border-gray-200 mb-4">
                        <span className={`text-xs font-bold ${colorScheme.text}`}>
                          {purpose.number}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className={`text-xl font-bold mb-3 ${colorScheme.text}`}>
                        {purpose.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {purpose.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-lg border-2 border-[#005bac] shadow-sm">
              <span className="text-gray-700 font-medium">이 모든 목적을 통해</span>
              <div className="px-4 py-2 bg-[#005bac] text-white font-bold text-sm rounded">
                기술벤처 생태계 발전에 기여
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - Traditional Design */}
      <section className="py-24 bg-gray-50/50">
        
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#005bac] mb-4">
              협회 연혁
            </h2>
            <p className="text-gray-600">
              2025년 주요 활동 및 성과
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#005bac] to-[#ff6600]" />
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const colors = [
                    { border: 'border-blue-200', text: 'text-[#005bac]', bg: 'bg-blue-50', dot: 'bg-[#005bac]' },
                    { border: 'border-orange-200', text: 'text-[#ff6600]', bg: 'bg-orange-50', dot: 'bg-[#ff6600]' },
                    { border: 'border-green-200', text: 'text-green-600', bg: 'bg-green-50', dot: 'bg-green-600' },
                    { border: 'border-purple-200', text: 'text-purple-600', bg: 'bg-purple-50', dot: 'bg-purple-600' },
                  ]
                  const colorScheme = colors[index % 4]
                  
                  return (
                    <div
                      key={index}
                      className="group relative flex items-start gap-8 transition-all duration-300 hover:-translate-x-1"
                    >
                      {/* Timeline Node */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-16 h-16 rounded-full ${colorScheme.bg} border-2 ${colorScheme.border} flex items-center justify-center hover:${colorScheme.border.replace('200', '300')} transition-colors duration-300`}>
                          <span className={`text-xl font-bold ${colorScheme.text}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        {/* Connecting dot */}
                        <div className={`absolute left-1/2 -translate-x-1/2 -bottom-6 w-4 h-4 ${colorScheme.dot} rounded-full border-4 border-white`} />
                      </div>

                      {/* Content Card */}
                      <div className={`flex-1 bg-white rounded-lg border-2 ${colorScheme.border} hover:${colorScheme.border.replace('200', '300')}/50 shadow-sm hover:shadow-lg transition-all duration-300 p-8`}>
                        <div>
                          {/* Date */}
                          <div className={`inline-flex items-center px-3 py-1 rounded ${colorScheme.bg} mb-4`}>
                            <span className={`text-xs font-bold ${colorScheme.text}`}>
                              2025. {milestone.year.split('. ')[1]}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h3 className={`text-xl font-bold mb-3 ${colorScheme.text}`}>
                            {milestone.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Summary */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-lg border-2 border-[#005bac] shadow-sm">
                <div className="w-3 h-3 rounded-full bg-[#005bac]" />
                <span className="text-gray-700 font-bold">
                  지속적인 성장과 혁신을 통한 기술벤처 생태계 발전
                </span>
                <div className="w-3 h-3 rounded-full bg-[#ff6600]" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}