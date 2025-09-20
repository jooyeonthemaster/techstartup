'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const words = ['AI/DX 솔루션', '스타트업 액셀러레이터', '지·산·학 협력']

export default function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  // Simple typing animation
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
    <>
      {/* Traditional Banner Slider - No fancy effects */}
      <section className="relative bg-[#f8f8f8]" style={{ height: '450px' }}>
        {/* Simple background with solid color overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-[#005bac] opacity-80" />
        </div>
        
        {/* Content - Traditional centered text */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <p className="text-lg mb-3">사단법인</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 border-none text-white">
              기술벤처스타트업협회
            </h1>
            
            {/* Typing animation - simplified */}
            <div className="mb-6">
              <span className="text-2xl font-normal">
                {displayText}
                <span className="opacity-50">|</span>
              </span>
            </div>
            
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              AI/디지털 전환부터 스타트업 육성, 산학 협력까지<br />
              기술 혁신 생태계의 종합 파트너
            </p>
            
            {/* Traditional CTA buttons */}
            <div className="flex gap-4 justify-center">
              <Link 
                href="/membership"
                className="inline-block px-8 py-3 bg-[#ff6600] hover:bg-[#ff8533] text-white font-bold text-sm"
              >
                협회 가입하기 <ArrowRight className="inline w-4 h-4 ml-1" />
              </Link>
              <Link 
                href="/about"
                className="inline-block px-8 py-3 bg-white text-[#005bac] font-bold text-sm hover:bg-[#f5f5f5]"
              >
                협회 소개
              </Link>
            </div>
          </div>
        </div>
        
        {/* Traditional slider dots removed */}
      </section>
    </>
  )
}
