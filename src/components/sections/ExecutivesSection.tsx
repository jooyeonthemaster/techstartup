'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Linkedin, Mail } from 'lucide-react'

export default function ExecutivesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

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

  const executives = [
    {
      role: '자문위원',
      name: '전병훈',
      title: '위원',
      position: '동국대학교 교수 재직',
      image: '/images/executives/jeon.png',
      expertise: ['기술창업', '벤처투자', '스타트업 전략']
    },
    {
      role: '자문위원',
      name: '유병준',
      title: '위원',
      position: '서울대학교 교수 재직',
      image: '/images/executives/yoo.png',
      expertise: ['AI/빅데이터', '기술사업화', '글로벌 진출']
    },
    {
      role: '고문',
      name: '김요섭',
      title: '',
      position: '(주)디자인파크 회장',
      image: '/images/executives/kim.png',
      expertise: ['경영전략', '디자인 혁신', '브랜드 전략']
    },
    {
      role: '부회장',
      name: '변우석',
      title: '',
      position: '(주) 코맥스 대표',
      image: '/images/executives/byun.png',
      expertise: ['IoT/스마트홈', '제조혁신', '글로벌 비즈니스']
    }
  ]

  return (
    <section id="executives" ref={sectionRef} className="relative py-24 overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333EA' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              협회 임원진
            </span>
          </h2>
          <p className="text-xl text-gray-700">
            기술과 벤처를 잇는 날까지
          </p>
        </div>

        {/* Executives Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executives.map((executive, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="group relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                
                {/* Role Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full shadow-lg">
                    {executive.role}
                  </span>
                </div>

                {/* Executive Image */}
                <div className="h-64 bg-gradient-to-br from-blue-100 via-purple-50 to-blue-100 relative overflow-hidden">
                  <img 
                    src={executive.image} 
                    alt={executive.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                    {executive.name} {executive.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {executive.position}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {executive.expertise.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 text-xs rounded-full border border-purple-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Contact Icons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center hover:from-blue-200 hover:to-purple-200 transition-all group">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="w-8 h-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center hover:from-purple-200 hover:to-blue-200 transition-all group">
                      <Linkedin className="w-4 h-4 text-purple-600" />
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}