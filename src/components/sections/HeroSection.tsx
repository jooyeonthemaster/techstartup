'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown, Sparkles, TrendingUp, Users, Globe, Code, Zap, Rocket } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentWord, setCurrentWord] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Counter animation states
  const [counters, setCounters] = useState({
    members: 0,
    investment: 0,
    years: 0
  })

  const words = ['성장 파트너', '혁신 동반자', '성공 가이드']

  useEffect(() => {
    setIsLoaded(true)
    
    // Start counter animation after component loads
    const timer = setTimeout(() => {
      animateCounters()
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  // Mouse move effect
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

  // Typing animation
  useEffect(() => {
    const word = words[currentWord]
    
    if (isTyping) {
      if (displayText.length < word.length) {
        const timer = setTimeout(() => {
          setDisplayText(word.slice(0, displayText.length + 1))
        }, 100)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timer)
      }
    } else {
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timer)
      } else {
        setCurrentWord((prev) => (prev + 1) % words.length)
        setIsTyping(true)
      }
    }
  }, [displayText, isTyping, currentWord])

  // Number counter animation
  const animateCounters = () => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    
    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      
      setCounters({
        members: Math.floor(200 * progress),
        investment: Math.floor(50 * progress),
        years: Math.floor(10 * progress)
      })
      
      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, interval)
  }

  const stats = [
    { icon: Users, value: `${counters.members}+`, label: '회원사', delay: 0.2, gradient: 'from-blue-400 to-cyan-400' },
    { icon: TrendingUp, value: `₩${counters.investment}억`, label: '누적 투자유치', delay: 0.4, gradient: 'from-purple-400 to-pink-400' },
    { icon: Globe, value: `${counters.years}년`, label: '역사와 전통', delay: 0.6, gradient: 'from-orange-400 to-red-400' }
  ]

  const floatingIcons = [
    { Icon: Code, delay: 0, duration: 20 },
    { Icon: Rocket, delay: 5, duration: 25 },
    { Icon: Zap, delay: 10, duration: 22 },
    { Icon: Globe, delay: 15, duration: 28 }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Professional Background with Image and Dynamic Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=60")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Professional Gradient Overlay */}
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `
              radial-gradient(
                circle at ${mousePosition.x}% ${mousePosition.y}%,
                rgba(37, 99, 235, 0.25) 0%,
                transparent 50%
              ),
              linear-gradient(
                135deg,
                rgba(15, 23, 42, 0.75) 0%,
                rgba(30, 58, 138, 0.6) 50%,
                rgba(15, 23, 42, 0.75) 100%
              )
            `
          }}
        />
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-cyan-600/20 animate-gradient" />
        </div>
        
        {/* Grid Pattern with animation */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid 20s linear infinite'
          }}
        />
      </div>

      {/* Floating 3D Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, index) => {
          const { Icon, delay, duration } = item
          return (
            <div
              key={index}
              className="absolute opacity-20"
              style={{
                animation: `float ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`
              }}
            >
              <Icon className="w-20 h-20 text-white/20" />
            </div>
          )
        })}
      </div>

      
      {/* Floating Gradient Orbs with blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center text-white px-4">
        <div className="max-w-5xl mx-auto">
          {/* Animated Top Badge */}
          <div 
            className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 text-white text-sm font-medium mb-8 transform transition-all duration-1000 hover:scale-105 ${
              isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
          >
            <Sparkles className="w-4 h-4 mr-2 text-blue-400 animate-pulse" />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
              2025년 대한민국 No.1 기술 벤처 지원 기관
            </span>
          </div>

          {/* Main Title with Typing Animation */}
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transform transition-all duration-1000 delay-200 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="block mb-4">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                기술벤처스타트업의
              </span>
            </span>
            <span className="relative inline-block min-h-[1.2em]">
              <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent font-extrabold text-6xl md:text-7xl lg:text-8xl">
                {displayText}
                <span className="animate-blink">|</span>
              </span>
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <div 
            className={`text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-400 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="mb-2">
              혁신적인 기술과 창의적인 아이디어로 세상을 변화시킬
            </p>
            <p>
              스타트업의 성공을 위한{' '}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 blur-lg opacity-75"></span>
                <span className="relative font-semibold text-white">모든 지원</span>
              </span>
              을 제공합니다
            </p>
          </div>

          {/* 3D Style CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transform transition-all duration-1000 delay-600 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Button 
              size="lg"
              className="group relative h-14 min-w-[18rem] rounded-2xl px-8 text-lg font-semibold overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300 group-hover:from-blue-500 group-hover:to-cyan-500"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <span className="relative flex items-center justify-center gap-3 text-white">
                협회 가입하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="group h-14 min-w-[18rem] rounded-2xl px-8 text-lg gap-3 text-white border-white/30 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              프로그램 살펴보기
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>

          {/* 3D Animated Stats Cards */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto perspective-1000">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div 
                  key={index}
                  className={`group transform transition-all duration-1000 hover:scale-105 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${800 + stat.delay * 1000}ms`,
                    transform: 'rotateX(0deg) rotateY(0deg)',
                    transformStyle: 'preserve-3d'
                  }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget
                    card.style.transform = 'rotateX(-10deg) rotateY(10deg)'
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget
                    card.style.transform = 'rotateX(0deg) rotateY(0deg)'
                  }}
                >
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                    {/* Gradient background animation */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-300`} />
                    
                    <Icon className="w-10 h-10 mx-auto mb-3 text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 group cursor-pointer z-20">
        <div className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors">
          <span className="text-xs mb-2 tracking-wider uppercase font-medium">Scroll</span>
          <div className="relative w-6 h-10 border-2 border-white/30 rounded-full group-hover:border-white/50 transition-colors">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-white/60 rounded-full animate-scroll" />
          </div>
        </div>
      </div>


      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { 
            background-position: 0% 50%;
            background-size: 200% 200%;
          }
          50% { 
            background-position: 100% 50%;
            background-size: 200% 200%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(100px, -100px) rotate(90deg);
          }
          50% {
            transform: translate(-100px, -200px) rotate(180deg);
          }
          75% {
            transform: translate(-200px, -100px) rotate(270deg);
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
            opacity: 0.2;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.3;
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
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
          }
        }
        
        @keyframes grid {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        
        .animate-gradient {
          animation: gradient 8s ease infinite;
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
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}