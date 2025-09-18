'use client'

import { ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const businessPlans = [
  {
    number: '01',
    title: '기술벤처 산학협력',
    subtitle: 'R&D 예산 420억 증가',
    description: '2025년 산학연 예산 전년 대비 420억 증가로 동국대, 서울대와 산학협력 연계 강화',
    highlights: ['동국대학교 기술창업학과 연계', '서울대 AI연구원 협력', '실증연구 프로젝트 확대']
  },
  {
    number: '02',
    title: '회원기업 채용지원',
    subtitle: '서울시 일자리 사업',
    description: '서울시 일자리 사업 수주로 2달 동안 풀타임 직무교육, 매칭 후 3개월 인건비 전액 지원',
    highlights: ['디지털 마케팅 분야', '영상제작 분야', '풀타임 직무교육 제공']
  },
  {
    number: '03',
    title: '기술스타트업 육성',
    subtitle: '개인투자조합 3.2억원',
    description: '창업교육 프로그램 운영과 코맥스벤처러스가 GP인 개인투자조합 결성으로 스타트업 직접 투자',
    highlights: ['개인투자조합 결성금액 3.2억원', '코맥스벤처러스 GP', '창업교육 프로그램 운영']
  },
  {
    number: '04',
    title: '학술세미나 & 네트워킹',
    subtitle: '지속적인 지식 교류',
    description: '기술특강 또는 논문 세미나를 기술창업대학원 주관으로 서울대AICEO와 동국대 석·박사 교류',
    highlights: ['기술창업대학원 주관', '서울대AICEO 교류', '후배기수 지속 유입']
  }
]

const visionItems = [
  {
    title: '지·산·학 협력',
    description: '지역사회, 산업계, 대학교의 협력을 통한 기술벤처기업 성장지원'
  },
  {
    title: '기술스타트업 발굴육성',
    description: '혁신적인 기술스타트업 발굴과 체계적인 육성 프로그램 운영'
  },
  {
    title: '기술창업 연구활동',
    description: '학술적 연구를 통한 기술창업 생태계 발전 기여'
  }
]

export default function BusinessPlan2025Section() {
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

    const elements = document.querySelectorAll('[data-business-item]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="business" className="relative py-20">
      <div className="container mx-auto px-4">
        
        {/* Enhanced Header with Better Readability */}
        <div className="text-center mb-20">
          <p className="text-xs font-bold tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-200 uppercase mb-4">
            BUSINESS PLAN 2025
          </p>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 dark:text-white mb-4">
            4대 <span className="font-normal">핵심 활동</span>
          </h2>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto" />
        </div>

        {/* Enhanced Vision Cards with Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
          {visionItems.map((item, index) => (
            <div 
              key={index} 
              className="group relative rounded-xl border border-white/10 dark:border-gray-800/30 bg-white/40 dark:bg-black/20 backdrop-blur-md p-6 transition-all duration-500 hover:bg-white/60 dark:hover:bg-black/30 hover:-translate-y-0.5"
            >
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent dark:from-white/[0.02] opacity-50" />
              
              <div className="relative">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              {/* Blue accent line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Enhanced Glassmorphism Business Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {businessPlans.map((plan, index) => {
            const isVisible = visibleItems.includes(index)
            
            return (
              <div
                key={index}
                data-index={index}
                data-business-item
                className={`group relative transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl transition-all duration-500 group-hover:-translate-y-1">
                  {/* Blue border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  
                  {/* Main card with glassmorphism */}
                  <div className="relative rounded-2xl border border-white/20 dark:border-gray-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-8 m-[1px]">
                    {/* Multiple gradient overlays for depth */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/[0.02] opacity-60" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent to-white/30 dark:to-white/[0.01]" />
                    
                    {/* Light sweep effect on hover */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="absolute -inset-y-4 -left-1/2 w-2/3 bg-gradient-to-r from-white/0 via-white/20 to-white/0 rotate-12 translate-x-[-140%] group-hover:translate-x-[220%] transition-transform duration-700 ease-out" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Number with better contrast */}
                      <div className="flex items-start justify-between mb-6">
                        <span className="text-5xl font-thin text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-600 dark:to-gray-800">
                          {plan.number}
                        </span>
                        <div className="w-10 h-10 rounded-full border border-white/30 dark:border-gray-700/50 bg-white/70 dark:bg-black/50 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-12">
                          <ArrowUpRight className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                        </div>
                      </div>

                      {/* Title with strong contrast */}
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                        {plan.title}
                      </h3>
                      <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 mb-5">
                        {plan.subtitle}
                      </p>

                      {/* Description with better readability */}
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        {plan.description}
                      </p>

                      {/* Enhanced Highlights */}
                      <div className="space-y-2.5 pt-5 border-t border-white/20 dark:border-gray-800/50">
                        {plan.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} className="flex items-center text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mr-3 opacity-60" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Premium Collaboration Partners Section - Enhanced Design */}
        <div className="mt-32 relative">
          {/* Multiple background layers for depth */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent blur-3xl" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-3/4 h-48 bg-gradient-to-b from-blue-500/[0.03] to-transparent blur-3xl" />
          </div>
          
          <div className="relative">
            {/* Enhanced Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700" />
                <p className="text-xs font-bold tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 uppercase">
                  STRATEGIC PARTNERSHIPS
                </p>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-700" />
              </div>
              <h3 className="text-3xl md:text-4xl font-thin text-gray-900 dark:text-white tracking-wide mb-4">
                주요 <span className="font-normal bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">협력 기관</span>
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
                산학협력과 기술 혁신을 통한 생태계 발전을 위해 함께하는 파트너십
              </p>
            </div>
            
            {/* Premium Partner Cards Grid - 2x2 Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Row 1 */}
              {/* 동국대학교 */}
              <div className="group relative">
                {/* Animated glow effect */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-75 blur-md transition-all duration-500" />
                
                {/* Main card */}
                <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/50 backdrop-blur-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  {/* Premium glass overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-transparent dark:from-white/[0.03] dark:via-white/[0.01]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 dark:via-white/[0.005] dark:to-white/[0.02]" />
                  
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_25%,rgba(59,130,246,0.1)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.1)_75%)] bg-[length:20px_20px]" />
                  </div>
                  
                  <div className="relative p-10">
                    {/* Partner Type Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-2 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 backdrop-blur-sm">
                        <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 tracking-wide">UNIVERSITY</span>
                      </div>
                    </div>
                    
                    {/* Number with animation */}
                    <div className="mb-6">
                      <span className="text-5xl font-thin text-transparent bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-500 bg-clip-text">01</span>
                    </div>
                    
                    {/* Logo placeholder removed */}
                    
                    {/* Institution Info */}
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      동국대학교
                    </h4>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                      기술창업학과
                    </p>
                    
                    {/* Description with icon */}
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                      <div className="w-1 h-1 rounded-full bg-blue-500" />
                      <span>산학협력 연계 강화</span>
                      <div className="w-1 h-1 rounded-full bg-purple-500" />
                    </div>
                    
                    {/* Progress bar animation on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  </div>
                </div>
              </div>
              
              {/* 서울대학교 */}
              <div className="group relative">
                {/* Animated glow effect */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-75 blur-md transition-all duration-500" />
                
                {/* Main card */}
                <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/50 backdrop-blur-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  {/* Premium glass overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-transparent dark:from-white/[0.03] dark:via-white/[0.01]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 dark:via-white/[0.005] dark:to-white/[0.02]" />
                  
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.1)_25%,rgba(147,51,234,0.1)_50%,transparent_50%,transparent_75%,rgba(147,51,234,0.1)_75%)] bg-[length:20px_20px]" />
                  </div>
                  
                  <div className="relative p-10">
                    {/* Partner Type Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-2 py-1 rounded-full bg-purple-500/10 dark:bg-purple-400/10 backdrop-blur-sm">
                        <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 tracking-wide">AI RESEARCH</span>
                      </div>
                    </div>
                    
                    {/* Number with animation */}
                    <div className="mb-6">
                      <span className="text-5xl font-thin text-transparent bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-500 bg-clip-text">02</span>
                    </div>
                    
                    {/* Logo placeholder removed */}
                    
                    {/* Institution Info */}
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                      서울대학교
                    </h4>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                      AI연구원
                    </p>
                    
                    {/* Description with icon */}
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                      <div className="w-1 h-1 rounded-full bg-purple-500" />
                      <span>AICEO 과정 교류</span>
                      <div className="w-1 h-1 rounded-full bg-pink-500" />
                    </div>
                    
                    {/* Progress bar animation on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  </div>
                </div>
              </div>
              
              {/* 서울시 */}
              <div className="group relative">
                {/* Animated glow effect */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-75 blur-md transition-all duration-500" />
                
                {/* Main card */}
                <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/50 backdrop-blur-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  {/* Premium glass overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-transparent dark:from-white/[0.03] dark:via-white/[0.01]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 dark:via-white/[0.005] dark:to-white/[0.02]" />
                  
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(34,197,94,0.1)_25%,rgba(34,197,94,0.1)_50%,transparent_50%,transparent_75%,rgba(34,197,94,0.1)_75%)] bg-[length:20px_20px]" />
                  </div>
                  
                  <div className="relative p-10">
                    {/* Partner Type Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-2 py-1 rounded-full bg-green-500/10 dark:bg-green-400/10 backdrop-blur-sm">
                        <span className="text-[10px] font-semibold text-green-600 dark:text-green-400 tracking-wide">GOVERNMENT</span>
                      </div>
                    </div>
                    
                    {/* Number with animation */}
                    <div className="mb-6">
                      <span className="text-5xl font-thin text-transparent bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-500 bg-clip-text">03</span>
                    </div>
                    
                    {/* Logo placeholder removed */}
                    
                    {/* Institution Info */}
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 group-hover:bg-clip-text transition-all duration-300">
                      서울시
                    </h4>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                      일자리사업
                    </p>
                    
                    {/* Description with icon */}
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                      <div className="w-1 h-1 rounded-full bg-green-500" />
                      <span>민간기업 매칭 지원</span>
                      <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    </div>
                    
                    {/* Progress bar animation on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  </div>
                </div>
              </div>
              
              {/* Row 2 */}
              {/* 코맥스벤처러스 */}
              <div className="group relative">
                {/* Animated glow effect */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-75 blur-md transition-all duration-500" />
                
                {/* Main card */}
                <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/50 backdrop-blur-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  {/* Premium glass overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-transparent dark:from-white/[0.03] dark:via-white/[0.01]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 dark:via-white/[0.005] dark:to-white/[0.02]" />
                  
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(249,115,22,0.1)_25%,rgba(249,115,22,0.1)_50%,transparent_50%,transparent_75%,rgba(249,115,22,0.1)_75%)] bg-[length:20px_20px]" />
                  </div>
                  
                  <div className="relative p-10">
                    {/* Partner Type Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-2 py-1 rounded-full bg-orange-500/10 dark:bg-orange-400/10 backdrop-blur-sm">
                        <span className="text-[10px] font-semibold text-orange-600 dark:text-orange-400 tracking-wide">INVESTMENT</span>
                      </div>
                    </div>
                    
                    {/* Number with animation */}
                    <div className="mb-6">
                      <span className="text-5xl font-thin text-transparent bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-500 bg-clip-text">04</span>
                    </div>
                    
                    {/* Logo placeholder removed */}
                    
                    {/* Institution Info */}
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 group-hover:bg-clip-text transition-all duration-300">
                      코맥스벤처러스
                    </h4>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                      개인투자조합 GP
                    </p>
                    
                    {/* Description with icon */}
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                      <div className="w-1 h-1 rounded-full bg-orange-500" />
                      <span>스타트업 직접투자</span>
                      <div className="w-1 h-1 rounded-full bg-red-500" />
                    </div>
                    
                    {/* Progress bar animation on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  </div>
                </div>
              </div>
              
              
            </div>
            
            {/* Interactive Connection Network (decorative) */}
            <div className="hidden lg:block absolute inset-0 -z-10">
              {/* Horizontal connection lines */}
              <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200/20 dark:via-gray-800/20 to-transparent" />
              <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200/20 dark:via-gray-800/20 to-transparent" />
              
              {/* Vertical connection lines */}
              <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-gradient-to-b from-transparent via-gray-200/20 dark:via-gray-800/20 to-transparent" />
              <div className="absolute top-0 bottom-0 left-2/3 w-[1px] bg-gradient-to-b from-transparent via-gray-200/20 dark:via-gray-800/20 to-transparent" />
            </div>
            
            {/* Partnership Stats Summary removed as requested */}
          </div>
        </div>

        {/* CTA removed as requested */}
      </div>
    </section>
  )
}