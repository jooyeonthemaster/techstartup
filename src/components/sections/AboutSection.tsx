'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, TrendingUp, Users, Globe, Rocket, Target, Shield } from 'lucide-react'

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [activeValue, setActiveValue] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  // Main section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Individual element animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    )

    Object.values(elementsRef.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-rotate active value
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // 성과 카드 섹션 삭제

  // 사업범위 섹션 삭제

  const coreValues = [
    {
      icon: Users,
      title: '연결합니다',
      description: '기술벤처스타트업협회는 스타트업과 투자자, 창업자와 전문가, 기업과 유관기관을 연결하는 플랫폼입니다.',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      backgroundImage: '/images/network-connection.png',
      stats: { value: '500+', label: '파트너십' }
    },
    {
      icon: Rocket,
      title: '성장시킵니다',
      description: '창업자에게 기술창업 교육, 실전 IR 준비, 사업계획 컨설팅을 제공합니다. 지원사업 연계, 멘토링, 스케일업까지 전주기적 지원을 수행합니다.',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      backgroundImage: '/images/growth-platform.png',
      stats: { value: '98%', label: '성장률' }
    },
    {
      icon: Shield,
      title: '함께합니다',
      description: '지원이 끝난 이후에도 언제든지 다시 찾아와 소통할 수 있는 창업자들의 커뮤니티, 성장을 멈추지 않도록 끝까지 함께하는 협회입니다.',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      backgroundImage: '/images/team-collaboration.png',
      stats: { value: '24/7', label: '상시 지원' }
    }
  ]

  const timeline = [
    { 
      year: '2010', 
      title: '협회 설립', 
      description: '기술벤처스타트업협회 공식 출범',
      icon: Sparkles,
      gradient: 'from-gray-400 to-gray-500',
      isFirst: true 
    },
    { 
      year: '2015', 
      title: '100개 회원사', 
      description: '첫 100개 회원사 달성 및 투자유치 500억',
      icon: TrendingUp,
      gradient: 'from-blue-400 to-blue-500'
    },
    { 
      year: '2020', 
      title: '글로벌 진출', 
      description: '해외 파트너십 체결 및 글로벌 프로그램 시작',
      icon: Globe,
      gradient: 'from-purple-400 to-purple-500'
    },
    { 
      year: '2025', 
      title: '현재', 
      description: '500+ 회원사와 함께 새로운 도약',
      icon: Target,
      gradient: 'from-blue-600 to-cyan-600',
      isCurrent: true 
    }
  ]

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Lighter gradient background with blue tones */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient - light with blue accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-cyan-50" />
        
        {/* Subtle animated gradient overlay */}
        <div 
          className="absolute inset-0 transition-all duration-2000"
          style={{
            background: `
              radial-gradient(
                circle at ${mousePosition.x}% ${mousePosition.y}%,
                rgba(59, 130, 246, 0.08) 0%,
                transparent 60%
              )
            `,
            transform: `translateY(${scrollProgress * 20}px)`
          }}
        />
        
        {/* Soft mesh pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-purple-100/30 to-cyan-100/30 animate-gradient-slow" />
        </div>
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: `translateY(${scrollProgress * -30}px)`
          }}
        />
        
        {/* Floating soft gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollProgress * -50}px)` }}
          />
          <div 
            className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollProgress * 50}px)` }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-300/5 rounded-full blur-3xl" />
        </div>
        
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Enhanced with scroll animation */}
        <div 
          ref={(el) => { elementsRef.current['header'] = el; }}
          id="header"
          className={`text-center max-w-5xl mx-auto mb-24 transform transition-all duration-1000 ${
            visibleElements.has('header') ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          style={{
            transform: `translateY(${visibleElements.has('header') ? scrollProgress * -10 : 20}px)`
          }}
        >
          {/* Top Badge - adjusted for light background */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/50 text-gray-700 text-sm font-medium mb-8 shadow-lg shadow-blue-500/10">
            <Sparkles className="w-4 h-4 mr-2 text-blue-500 animate-pulse" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              About Our Mission
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
                기술창업과 스타트업
              </span>
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-extrabold">
              성장을 위해
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            기술벤처스타트업협회는{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-40"></span>
              <span className="relative font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                연결합니다, 성장시킵니다, 함께합니다
              </span>
            </span>
          </p>
        </div>

        {/* Achievement Stats - removed */}

        {/* Business Scope Section - removed */}

        {/* Core Values Section - with staggered animations */}
        <div className="mb-32">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              const elementId = `value-${index}`
              const isElementVisible = visibleElements.has(elementId)
              
              return (
                <div
                  key={index}
                  ref={(el) => { elementsRef.current[elementId] = el; }}
                  id={elementId}
                  className={`group relative transform transition-all duration-1000 ${
                    isElementVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                    transform: `translateY(${
                      isElementVisible 
                        ? hoveredCard === index ? -10 : scrollProgress * -5 
                        : 20
                    }px)`
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card with enhanced shadow and gradient */}
                  <div className="relative h-full">
                    {/* Gradient shadow */}
                    <div 
                      className={`absolute -inset-2 bg-gradient-to-br ${value.gradient} rounded-3xl blur-2xl transition-opacity duration-300`}
                      style={{ opacity: hoveredCard === index ? 0.15 : 0 }}
                    />
                    
                    {/* Main card - with background image */}
                    <div 
                      className="relative h-full rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border overflow-hidden bg-white/10 border-white/40"
                      style={{
                        backgroundImage: `url(${value.backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      {/* Background overlay for text readability */}
                      <div className="absolute inset-0 bg-white/30 ring-1 ring-inset ring-white/50 z-0" />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/40 pointer-events-none z-0" />
                      
                      {/* Content container - positioned above overlay */}
                      <div className="relative z-10">
                        {/* Icon container with gradient */}
                        <div className="mb-6">
                          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.gradient} shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        
                        {/* Number badge */}
                        <div className="absolute top-0 right-0 z-20 pointer-events-none">
                          <span className={`text-6xl font-extrabold bg-gradient-to-br ${value.gradient} bg-clip-text text-transparent opacity-40 drop-shadow-md`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${value.gradient} bg-clip-text text-transparent`}>
                          {value.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-800 leading-relaxed mb-6 relative px-4 py-3 rounded-xl bg-white/50 backdrop-blur-xl ring-1 ring-inset ring-white/60">
                          {value.description}
                        </p>
                        
                        {/* Stats */}
                        <div className="pt-6 border-t border-gray-300/50">
                          <div className="flex items-center justify-between">
                            <span className={`text-3xl font-bold bg-gradient-to-r ${value.gradient} bg-clip-text text-transparent`}>
                              {value.stats.value}
                            </span>
                            <span className="text-sm text-gray-600">{value.stats.label}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none z-0" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Timeline Section - Compact Professional Design */}
        <div 
          ref={(el) => { elementsRef.current['timeline'] = el; }}
          id="timeline"
          className={`transform transition-all duration-1000 ${
            visibleElements.has('timeline') ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          {/* Compact Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-purple-200/30 text-gray-600 text-xs font-medium mb-6 shadow-lg">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2 animate-pulse" />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                Company Timeline
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-3 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
                우리의 여정
              </span>
            </h3>
            
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              혁신과 성장의 15년 기록
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Slim Timeline Line */}
            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-400 via-purple-500 to-orange-400 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-400 via-purple-500 to-orange-400 rounded-full blur-sm opacity-30" />
              </div>
            </div>
            
            {/* Compact Timeline Items */}
            <div className="space-y-8 md:space-y-6">
              {timeline.map((item, index) => {
                const Icon = item.icon
                const isLeft = index % 2 === 0
                const elementId = `timeline-${index}`
                const isVisible = visibleElements.has(elementId)
                
                const colors = [
                  { gradient: 'from-slate-500 to-gray-600', accent: 'slate-500' },
                  { gradient: 'from-blue-500 to-cyan-600', accent: 'blue-500' },
                  { gradient: 'from-purple-500 to-pink-600', accent: 'purple-500' },
                  { gradient: 'from-orange-500 to-red-600', accent: 'orange-500' }
                ]
                
                const color = colors[index] || colors[0]
                
                return (
                  <div
                    key={index}
                    ref={(el) => { elementsRef.current[elementId] = el; }}
                    id={elementId}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Compact Content Card */}
                    <div className={`flex-1 ml-16 md:ml-0 ${
                      isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}>
                      <div 
                        className={`group relative transform transition-all duration-700 ${
                          isVisible 
                            ? 'translate-y-0 opacity-100' 
                            : `${isLeft ? 'translate-x-10' : '-translate-x-10'} opacity-0`
                        }`}
                        style={{ transitionDelay: `${index * 150}ms` }}
                      >
                        {/* Compact Glass Card */}
                        <div className={`relative backdrop-blur-sm bg-white/90 border border-gray-200/50 rounded-2xl p-5 shadow-lg ${
                          item.isCurrent 
                            ? 'bg-gradient-to-br from-blue-50/50 to-purple-50/50' 
                            : 'hover:shadow-xl hover:bg-white'
                        } transition-all duration-300 group-hover:scale-[1.02]`}>
                          
                          {/* Inline Year & Icon */}
                          <div className={`flex items-center gap-3 mb-3 ${
                            isLeft ? 'flex-row-reverse' : 'flex-row'
                          }`}>
                            <div className={`bg-gradient-to-r ${color.gradient} text-white px-3 py-1 rounded-lg shadow-sm ${
                              item.isCurrent ? 'animate-pulse' : ''
                            }`}>
                              <span className="text-xs font-bold">{item.year}</span>
                            </div>
                            <div className={`inline-flex p-2 rounded-xl bg-gradient-to-r ${color.gradient} shadow-md`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div>
                            <h4 className={`text-lg font-bold mb-2 bg-gradient-to-r ${color.gradient} bg-clip-text text-transparent ${
                              isLeft ? 'text-right' : 'text-left'
                            }`}>
                              {item.title}
                            </h4>
                            
                            <p className={`text-gray-600 text-sm leading-relaxed ${
                              isLeft ? 'text-right' : 'text-left'
                            }`}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Compact Milestone Node */}
                    <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-20">
                      <div 
                        className={`relative transform transition-all duration-700 ${
                          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                        }`}
                        style={{ transitionDelay: `${index * 150 + 200}ms` }}
                      >
                        {/* Compact Node */}
                        <div className={`relative w-12 h-12 rounded-full bg-gradient-to-r ${color.gradient} p-0.5 shadow-lg transform hover:scale-110 transition-all duration-300`}>
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <Icon className={`w-5 h-5 text-transparent bg-gradient-to-r ${color.gradient} bg-clip-text`} />
                          </div>
                        </div>
                        
                        {/* Current Indicator */}
                        {item.isCurrent && (
                          <>
                            <div className={`absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r ${color.gradient} animate-ping opacity-30`} />
                            <div className={`absolute inset-0 w-12 h-12 rounded-full border-2 border-${color.accent} animate-spin-slow opacity-60`} />
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Spacer */}
                    <div className="hidden md:block flex-1" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Custom Animations */}
      <style jsx>{`
        @keyframes gradient-slow {
          0%, 100% { 
            background-position: 0% 50%;
            background-size: 200% 200%;
          }
          50% { 
            background-position: 100% 50%;
            background-size: 200% 200%;
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
            background-size: 300% 300%;
          }
          50% {
            background-position: 100% 50%;
            background-size: 300% 300%;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(200%);
            opacity: 0;
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(30px, -20px) scale(1.05) rotate(2deg);
          }
          66% {
            transform: translate(-20px, 30px) scale(0.95) rotate(-2deg);
          }
        }
        
        @keyframes progress-fill {
          0% {
            width: 0%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 75%;
            opacity: 1;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes float-1 {
          0%, 100% {
            transform: translate(15px, 10px) scale(1);
          }
          50% {
            transform: translate(25px, -15px) scale(1.2);
          }
        }
        
        @keyframes float-2 {
          0%, 100% {
            transform: translate(-10px, 15px) scale(1);
          }
          50% {
            transform: translate(-20px, -10px) scale(1.1);
          }
        }
        
        @keyframes float-3 {
          0%, 100% {
            transform: translate(20px, -10px) scale(1);
          }
          50% {
            transform: translate(10px, 20px) scale(1.3);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
          }
        }
        
        .animate-gradient-slow {
          animation: gradient-slow 15s ease infinite;
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        
        .animate-progress-fill {
          animation: progress-fill 2s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-float-1 {
          animation: float-1 4s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 5s ease-in-out infinite 0.5s;
        }
        
        .animate-float-3 {
          animation: float-3 3s ease-in-out infinite 1s;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        /* Glassmorphism utilities */
        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
        }
        
        /* Enhanced shadow utilities */
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  )
}