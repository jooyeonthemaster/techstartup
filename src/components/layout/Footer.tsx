'use client'

import { useState, useEffect } from 'react'
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Mail, Phone, MapPin, ChevronUp, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    협회소개: [
      { label: '협회 개요', href: '#', badge: null },
      { label: '임원진 소개', href: '#', badge: null },
      { label: '조직도', href: '#', badge: null },
      { label: '연혁', href: '#', badge: null }
    ],
    서비스: [
      { label: '컨설팅', href: '#', badge: 'HOT' },
      { label: '투자 유치', href: '#', badge: null },
      { label: '교육 프로그램', href: '#', badge: 'NEW' },
      { label: '네트워킹', href: '#', badge: null }
    ],
    자료실: [
      { label: '공지사항', href: '#', badge: null },
      { label: '보도자료', href: '#', badge: null },
      { label: '연구자료', href: '#', badge: null },
      { label: '뉴스레터', href: '#', badge: null }
    ],
    지원: [
      { label: '자주 묻는 질문', href: '#', badge: null },
      { label: '이용약관', href: '#', badge: null },
      { label: '개인정보처리방침', href: '#', badge: null },
      { label: '사이트맵', href: '#', badge: null }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-600' }
  ]

  // recentPosts and newsletter removed

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Animated Wave SVG */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg className="relative block w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path 
            fill="rgba(37, 99, 235, 0.1)" 
            d="M0,20 C480,80 960,80 1440,20 L1440,0 L0,0 Z"
            className="animate-wave"
          />
          <path 
            fill="rgba(8, 145, 178, 0.1)" 
            d="M0,40 C480,100 960,100 1440,40 L1440,0 L0,0 Z"
            className="animate-wave-slow"
          />
        </svg>
      </div>

      

      {/* Newsletter Section removed */}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group cursor-pointer">
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <span className="text-white font-bold text-2xl">T</span>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  기술벤처스타트업협회
                </h3>
                <p className="text-xs text-gray-500">
                  Tech Venture Startup Association
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              대한민국 기술 벤처 생태계의 성장과 발전을 위해 
              2025년 새롭게 출범한 비영리 사단법인입니다. 
              혁신적인 기술 스타트업의 성공을 지원합니다.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>010-3721-0204</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>info@techventure.or.kr</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>서울시 중구 퇴계로 36길 2, 충무로관 신관 B103호</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-10 h-10 bg-white/10 hover:bg-white/20 ${social.color} rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/10`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                {title}
                <div className="h-px flex-1 bg-gradient-to-r from-blue-600/50 to-transparent" />
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="group flex items-center justify-between text-gray-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <Badge className="ml-2 text-xs bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
                          {link.badge}
                        </Badge>
                      )}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Recent Posts removed */}
      </div>

      {/* Bottom Footer removed */}

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform transition-all duration-300 ${
          showBackToTop 
            ? 'translate-y-0 opacity-100 hover:scale-110' 
            : 'translate-y-16 opacity-0 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-6 h-6 text-white" />
      </button>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-50px); }
        }
        
        @keyframes wave-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(50px); }
        }
        
        @keyframes float-up {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
        
        .animate-wave {
          animation: wave 10s ease-in-out infinite;
        }
        
        .animate-wave-slow {
          animation: wave-slow 15s ease-in-out infinite;
        }
        
        .animate-float-up {
          animation: float-up linear infinite;
        }
      `}</style>
    </footer>
  )
}

// Add Check icon import if not already imported
const Check = ({ className }: { className?: string }) => (
  <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)