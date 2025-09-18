'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const words = ['AI/DX 솔루션', '스타트업 액셀러레이터', '지·산·학 협력']

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentWord, setCurrentWord] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    setIsLoaded(true)
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with image and minimal overlay */}
      <div className="absolute inset-0">
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
        
        {/* Minimal gradient overlay - mostly white/black for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/85 dark:from-black/85 dark:via-black/80 dark:to-black/85" />
        
        {/* Subtle gradient orbs - extremely muted */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(120, 119, 198, 0.02) 0%, transparent 70%)
            `,
          }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Very subtle floating orbs */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gray-200/10 dark:bg-gray-800/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gray-200/10 dark:bg-gray-800/10 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-200/5 dark:bg-gray-800/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Minimal top badge */}
          <div 
            className={`inline-block mb-12 transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
          >
            <span className="text-[11px] font-medium tracking-[0.3em] text-gray-400 dark:text-gray-600 uppercase">
              Est. 2025 · Seoul · Non-profit Organization
            </span>
          </div>

          {/* Main Title with minimal styling */}
          <h1 
            className={`transform transition-all duration-1000 delay-200 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="block text-lg md:text-xl text-gray-500 dark:text-gray-400 font-light mb-4 tracking-wide">
              사단법인
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-tight bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(59,130,246,0.25)]">
              기술벤처<span className="font-normal">스타트업</span>협회
            </span>
          </h1>

          {/* Divider */}
          <div 
            className={`w-32 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mx-auto my-10 transform transition-all duration-1000 delay-300 ${
              isLoaded ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
          />

          {/* Typing Animation - Simplified */}
          <div 
            className={`mb-10 transform transition-all duration-1000 delay-400 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-light">
              {displayText}
              <span className="animate-blink text-gray-400 dark:text-gray-600">|</span>
            </span>
          </div>

          {/* Subtitle - Minimal */}
          <p 
            className={`text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-3xl mx-auto mb-12 transform transition-all duration-1000 delay-500 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            AI/디지털 전환부터 스타트업 육성, 산학 협력까지<br />
            기술 혁신 생태계의 <span className="font-normal text-gray-900 dark:text-gray-100">종합 파트너</span>
          </p>

          {/* CTA Buttons - Ultra Minimal */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 delay-600 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Button 
              size="lg"
              className="group h-14 min-w-[16rem] rounded-xl px-8 text-base font-medium text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-700 hover:via-cyan-600 hover:to-purple-700 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)] dark:text-white"
              asChild
            >
              <Link href="/membership/apply">
                <span className="flex items-center gap-3">
                  협회 가입하기
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Link href="/about">
              <Button 
                size="lg"
                variant="outline"
                className="group h-14 min-w-[16rem] rounded-xl px-8 text-base font-medium border-2 border-transparent text-blue-700 dark:text-cyan-300 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.35),0_6px_20px_-8px_rgba(59,130,246,0.45)]"
              >
                협회 소개
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator removed as requested */}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -20px) scale(1.05);
          }
        }
        
        @keyframes float-reverse {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, 20px) scale(1.05);
          }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 20s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  )
}