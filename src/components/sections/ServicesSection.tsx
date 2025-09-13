'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Globe, 
  HeadphonesIcon,
  CheckCircle,
  Zap
} from 'lucide-react'

export default function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<{ [key: number]: HTMLElement | null }>({})

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

  // Individual card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCards((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    Object.values(cardsRef.current).forEach((el) => {
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

  const services = [
    {
      icon: Briefcase,
      title: '전략 컨설팅',
      description: '비즈니스 모델 설계부터 시장 진입 전략까지 맞춤형 컨설팅',
      features: ['경영 전략 수립', '시장 분석', '비즈니스 모델 개발', '성과 측정 지표'],
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      stats: { clients: '200+', satisfaction: '98%' },
      highlight: true
    },
    {
      icon: TrendingUp,
      title: '투자 유치 지원',
      description: '시드부터 시리즈 C까지 단계별 투자 유치 전략 및 실행',
      features: ['IR 자료 제작', '투자자 매칭', '실사 대응', '계약 협상 지원'],
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      stats: { raised: '₩2.5조', success: '87%' }
    },
    {
      icon: Users,
      title: '네트워킹 플랫폼',
      description: '업계 리더, 투자자, 파트너사와의 전략적 연결',
      features: ['정기 모임', '비즈니스 매칭', '멘토링', '글로벌 네트워크'],
      gradient: 'from-green-500 to-teal-500',
      bgGradient: 'from-green-500/20 to-teal-500/20',
      stats: { events: '50+/년', connections: '1,000+' }
    },
    {
      icon: BookOpen,
      title: '교육 프로그램',
      description: '실무 중심의 체계적인 창업 교육 및 역량 강화',
      features: ['창업 부트캠프', '리더십 교육', '전문 기술 교육', '온라인 강의'],
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      stats: { courses: '30+', graduates: '3,000+' }
    },
    {
      icon: Globe,
      title: '글로벌 진출',
      description: '해외 시장 진출을 위한 원스톱 솔루션',
      features: ['시장 조사', '현지 파트너 연결', '법률 지원', '마케팅 현지화'],
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-500/20 to-purple-500/20',
      stats: { countries: '15+', partners: '50+' }
    },
    {
      icon: HeadphonesIcon,
      title: '전담 지원',
      description: '1:1 전담 매니저를 통한 맞춤형 성장 지원',
      features: ['전담 매니저', '24/7 지원', '정기 컨설팅', '성과 리뷰'],
      gradient: 'from-yellow-500 to-amber-500',
      bgGradient: 'from-yellow-500/20 to-amber-500/20',
      stats: { response: '< 2시간', managers: '50+' }
    }
  ]

  return (
    <section id="services" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Lighter gradient background with strong blue tones */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient - light with stronger blue accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-white" />
        
        {/* Subtle animated gradient overlay */}
        <div 
          className="absolute inset-0 transition-all duration-2000"
          style={{
            background: `
              radial-gradient(
                circle at ${mousePosition.x}% ${mousePosition.y}%,
                rgba(6, 182, 212, 0.1) 0%,
                transparent 60%
              )
            `,
            transform: `translateY(${scrollProgress * 15}px)`
          }}
        />
        
        {/* Soft mesh pattern with blue tones */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/40 via-blue-100/40 to-purple-100/40 animate-gradient-slow" />
        </div>
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translateY(${scrollProgress * -20}px)`
          }}
        />
        
        {/* Floating soft gradient orbs with parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-3xl"
            style={{ transform: `translate(${scrollProgress * 30}px, ${scrollProgress * -40}px)` }}
          />
          <div 
            className="absolute bottom-1/3 -right-48 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-3xl"
            style={{ transform: `translate(${scrollProgress * -30}px, ${scrollProgress * 40}px)` }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-300/10 rounded-full blur-3xl" />
        </div>
        
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Enhanced with scroll animation */}
        <div 
          className={`text-center max-w-5xl mx-auto mb-24 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          style={{
            transform: `translateY(${isVisible ? scrollProgress * -8 : 20}px)`
          }}
        >
          {/* Top Badge - adjusted for light background */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 backdrop-blur-sm border border-cyan-300/50 text-gray-700 text-sm font-medium mb-8 shadow-lg shadow-cyan-500/10">
            <Zap className="w-4 h-4 mr-2 text-cyan-600 animate-pulse" />
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-semibold">
              Comprehensive Support Services
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
                성공을 위한
              </span>
            </span>
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-extrabold">
              토탈 솔루션
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            스타트업의 성장 단계별{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-40"></span>
              <span className="relative font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                맞춤형 지원
              </span>
            </span>
            으로
          </p>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            빠른 성장과 지속가능한 성공을 만들어갑니다
          </p>
        </div>

        {/* Services Grid - with staggered scroll animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon
            const isHovered = hoveredCard === index
            const isSelected = selectedService === index
            const isCardVisible = visibleCards.has(index)
            
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                data-index={index}
                className={`transform transition-all duration-1000 ${
                  isCardVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  transform: `translateY(${
                    isCardVisible 
                      ? isHovered ? -10 : scrollProgress * -3
                      : 20
                  }px) scale(${isHovered ? 1.02 : 1})`
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedService(isSelected ? null : index)}
              >
                <div className={`group relative h-full cursor-pointer ${
                  service.highlight ? 'scale-105' : ''
                }`}>
                  
                  {/* Main card - adjusted for light background */}
                  <div className={`relative h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl border transition-all duration-300 overflow-hidden ${
                    isHovered || isSelected
                      ? 'border-cyan-200' 
                      : 'border-gray-100'
                  }`}>
                    {/* Subtle gradient overlay on hover */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} transition-opacity duration-300`}
                      style={{ opacity: isHovered || isSelected ? 0.05 : 0 }}
                    />
                    
                    
                    {/* Content */}
                    <div className="relative p-8">
                      {/* Icon with gradient */}
                      <div className="relative mb-6">
                        <div className={`relative w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      {/* Title with gradient animation */}
                      <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Features List - adjusted for light background */}
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                            <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${service.gradient} p-0.5 mr-3 mt-0.5 flex-shrink-0`}>
                              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                <CheckCircle className={`w-3 h-3 text-transparent bg-gradient-to-r ${service.gradient} bg-clip-text`} />
                              </div>
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Stats - adjusted for light background */}
                      {service.stats && (
                        <div className="flex gap-4 pt-6 border-t border-gray-200 mb-6">
                          {Object.entries(service.stats).map(([key, value], idx) => (
                            <div key={idx} className="flex-1">
                              <div className={`text-2xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                                {value}
                              </div>
                              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{key}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                    </div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
      
      {/* Custom animations */}
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
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }
        
        @keyframes float-reverse {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, 30px) scale(1.1);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.15;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.25;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
        
        @keyframes particle {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx, 100px), var(--ty, -100vh));
            opacity: 0;
          }
        }
        
        @keyframes grid {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(30px, 30px);
          }
        }
        
        .animate-gradient-slow {
          animation: gradient-slow 15s ease infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}