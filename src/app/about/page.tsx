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
      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Minimal Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Floating Orbs - Very Subtle */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/[0.03] rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Minimal Badge */}
            <div className="inline-block mb-8">
              <p className="text-xs font-bold tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 uppercase">
                Established 2025
              </p>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin text-gray-900 dark:text-white mb-6">
              <span className="block text-lg md:text-xl text-gray-500 dark:text-gray-400 font-light mb-4 tracking-wide">
                사단법인
              </span>
              기술벤처<span className="font-normal">스타트업</span>협회
            </h1>
            
            {/* Divider */}
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto mb-8" />
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-3xl mx-auto mb-12">
              대한민국 기술 스타트업의 성장을 이끄는 든든한 파트너<br />
              혁신적인 아이디어를 <span className="font-normal text-gray-900 dark:text-white">현실로</span> 만드는 여정
            </p>
            
            {/* CTA */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/20 backdrop-blur-md hover:bg-white/50 dark:hover:bg-black/30 transition-all duration-300 group cursor-pointer">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                협회 소개 자세히 보기
              </span>
              <ArrowUpRight className="w-4 h-4 text-gray-500 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>
        </div>
      </section>


      {/* Establishment Overview - Premium Design */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 uppercase mb-4">
                OVERVIEW
              </p>
              <h2 className="text-3xl md:text-4xl font-extralight text-gray-900 dark:text-gray-100">
                설립 <span className="font-normal">개요</span>
              </h2>
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gray-900 dark:via-gray-100 to-transparent mx-auto mt-8" />
            </div>

            {/* Main Content Card */}
            <div className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1">
              {/* Blue border glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-50 blur-xl" />
              
              {/* Main card with glassmorphism */}
              <div className="relative rounded-3xl border border-white/20 dark:border-gray-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-10 md:p-14">
                {/* Multiple gradient overlays for depth */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/[0.02] opacity-60" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent to-white/30 dark:to-white/[0.01]" />
                
                <div className="relative z-10">
                  {/* Date Badge */}
                  <div className="flex justify-center mb-10">
                    <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/30 backdrop-blur-md">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Since 2025. 3</span>
                    </div>
                  </div>
                  
                  {/* Main Text */}
                  <p className="text-lg md:text-xl leading-loose text-gray-700 dark:text-gray-300 mb-12 text-center">
                    <span className="font-bold text-gray-900 dark:text-white">(사) 기술벤처스타트업협회</span>는 
                    급변하는 글로벌 기술혁신 및 디지털전환(DX) 환경 속에서<br />
                    대한민국의 기술벤처기업의 성장발전과 기술스타트업의 발굴육성을 위해<br />
                    <span className="font-semibold text-blue-600 dark:text-blue-400">2025년 3월</span> 서울시를 주무관청으로 출범했습니다.
                  </p>

                  {/* Core Values Grid */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="group relative rounded-2xl border border-white/10 dark:border-gray-800/30 bg-white/40 dark:bg-black/20 backdrop-blur-md p-6 transition-all duration-500 hover:bg-white/60 dark:hover:bg-black/30 hover:-translate-y-0.5">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent dark:from-white/[0.02] opacity-50" />
                      <div className="relative text-center">
                        <div className="text-4xl font-thin text-gray-300 dark:text-gray-700 mb-4">01</div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">혁신 기술</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">AI/DX 솔루션 제공</p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                    
                    <div className="group relative rounded-2xl border border-white/10 dark:border-gray-800/30 bg-white/40 dark:bg-black/20 backdrop-blur-md p-6 transition-all duration-500 hover:bg-white/60 dark:hover:bg-black/30 hover:-translate-y-0.5">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent dark:from-white/[0.02] opacity-50" />
                      <div className="relative text-center">
                        <div className="text-4xl font-thin text-gray-300 dark:text-gray-700 mb-4">02</div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">지·산·학 협력</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">생태계 활성화 추진</p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                    
                    <div className="group relative rounded-2xl border border-white/10 dark:border-gray-800/30 bg-white/40 dark:bg-black/20 backdrop-blur-md p-6 transition-all duration-500 hover:bg-white/60 dark:hover:bg-black/30 hover:-translate-y-0.5">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent dark:from-white/[0.02] opacity-50" />
                      <div className="relative text-center">
                        <div className="text-4xl font-thin text-gray-300 dark:text-gray-700 mb-4">03</div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">스타트업 육성</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">발굴 & 액셀러레이팅</p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Establishment Purposes - Ultra Modern */}
      <section className="relative py-28 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900" />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="text-xs font-bold tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-200 uppercase mb-4">
              OUR PURPOSES
            </p>
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 dark:text-white mb-4">
              설립 <span className="font-normal">목적</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
              기술벤처스타트업협회의 6가지 핵심 목적과 활동 분야
            </p>
          </div>

          {/* Premium Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {establishmentPurposes.map((purpose, index) => {
              const Icon = purpose.icon
              return (
                <div
                  key={purpose.number}
                  className="group relative transform transition-all duration-700 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden rounded-2xl transition-all duration-500">
                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                    
                    {/* Main card */}
                    <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm p-8 h-full">
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-black/30 rounded-2xl opacity-50" />
                      
                      {/* Content */}
                      <div className="relative">
                        {/* Number */}
                        <div className="flex items-start justify-between mb-6">
                          <span className="text-5xl font-thin text-gray-200 dark:text-gray-800">
                            0{index + 1}
                          </span>
                          <div className="w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>

                        {/* Korean Number Badge */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/40 backdrop-blur-sm mb-4">
                          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                            {purpose.number}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {purpose.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {purpose.description}
                        </p>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Call to action */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-black/30 backdrop-blur-md">
              <span className="text-gray-700 dark:text-gray-300 font-medium">이 모든 목적을 통해</span>
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm">
                기술벤처 생태계 발전에 기여
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - Minimal Elegant Design */}
      <section className="relative py-24 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50" />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="text-xs font-bold tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-200 uppercase mb-4">
              TIMELINE
            </p>
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 dark:text-white mb-4">
              협회 <span className="font-normal">연혁</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              2025년 주요 활동 및 성과
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="group relative flex items-start gap-8 transform transition-all duration-700 hover:-translate-x-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Timeline Node */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors duration-300">
                        <span className="text-2xl font-thin text-gray-400 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      {/* Connecting dot */}
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-blue-500 transition-colors" />
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm p-8 group-hover:border-gray-300 dark:group-hover:border-gray-700 transition-all duration-300">
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-black/30 rounded-2xl opacity-50" />
                      
                      <div className="relative">
                        {/* Date */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 mb-4">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            2025. {milestone.year.split('. ')[1]}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {milestone.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                      
                      {/* Hover accent */}
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Summary */}
            <div className="mt-20 text-center">
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-black/30 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  지속적인 성장과 혁신을 통한 기술벤처 생태계 발전
                </span>
                <div className="w-2 h-2 rounded-full bg-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}