'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { programCategories, testimonials, upcomingEvents } from '@/data/programs'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Calendar,
  Clock,
  DollarSign,
  GraduationCap,
  MapPin,
  Sparkles,
  Trophy,
  Users
} from 'lucide-react'

export default function ProgramsSection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('accelerator')
  const [hoveredProgram, setHoveredProgram] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef(null)
  const [autoPlay, setAutoPlay] = useState(true)

  // Initialize tab from URL parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam && programCategories[tabParam as keyof typeof programCategories]) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  // Handle tab change with URL update
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab)
    const url = new URL(window.location.href)
    url.searchParams.set('tab', newTab)
    router.replace(url.pathname + url.search, { scroll: false })
  }

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

  // Auto-play carousel
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [autoPlay])

  return (
    <section id="programs" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Dynamic gradient background - changed to blue tones */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234C9BDF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-4xl mx-auto mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            PROGRAMS & INITIATIVES
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            성장을 가속화하는
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 mt-2">
              프로그램
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            스타트업의 성장 단계에 맞춘 체계적인 지원 프로그램을 제공합니다
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {Object.entries(programCategories).map(([key, category]) => {
            const Icon = category.icon
            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`group relative px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-white text-gray-900 shadow-2xl scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${
                    activeTab === key ? 'text-purple-600' : 'text-white'
                  }`} />
                  <span>{category.title}</span>
                  {activeTab === key && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Category Content */}
        <div className={`mb-16 transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center mb-8">
            <p className="text-lg text-gray-300">
              {programCategories[activeTab as keyof typeof programCategories].description}
            </p>
          </div>

          {/* Program Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programCategories[activeTab as keyof typeof programCategories].programs.map((program, index) => {
              const Icon = (program as any).icon
              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setHoveredProgram(index)}
                  onMouseLeave={() => setHoveredProgram(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <Card className="relative bg-white/95 backdrop-blur-sm border-0 p-8 h-full hover:transform hover:scale-105 transition-all duration-300 shadow-2xl">
                    {/* Status Badge */}
                    {(program as any).status && (
                      <div className="absolute -top-3 right-6">
                        <Badge className={`px-3 py-1 ${
                          (program as any).status === 'recruiting' 
                            ? 'bg-green-500 text-white' 
                            : (program as any).status === 'ongoing'
                            ? 'bg-blue-500 text-white'
                            : (program as any).status === 'upcoming'
                            ? 'bg-orange-500 text-white'
                            : 'bg-purple-500 text-white'
                        }`}>
                          {(program as any).status === 'recruiting' ? '모집중' 
                            : (program as any).status === 'ongoing' ? '진행중'
                            : (program as any).status === 'upcoming' ? '예정'
                            : '상시'}
                        </Badge>
                      </div>
                    )}

                    {/* Icon with gradient */}
                    <div className="mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${(program as any).gradient} rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      {(program as any).title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {'duration' in program && (program as any).duration && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {(program as any).duration}
                        </div>
                      )}
                      {'participants' in program && (program as any).participants && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {(program as any).participants}
                        </div>
                      )}
                      {'funding' in program && (program as any).funding && (
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {(program as any).funding}
                        </div>
                      )}
                      {'prize' in program && (program as any).prize && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Trophy className="w-4 h-4 mr-1" />
                          {(program as any).prize}
                        </div>
                      )}
                      {'sessions' in program && (program as any).sessions && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {(program as any).sessions}
                        </div>
                      )}
                      {'type' in program && (program as any).type && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {(program as any).type}
                        </div>
                      )}
                      {'level' in program && (program as any).level && (
                        <div className="flex items-center text-sm text-gray-600">
                          <GraduationCap className="w-4 h-4 mr-1" />
                          {(program as any).level}
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(program as any).tags.map((tag: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {(program as any).features.slice(0, 3).map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Deadline and CTA removed */}
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className={`mb-16 transform transition-all duration-1000 delay-400 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h3 className="text-3xl font-bold text-center mb-10 text-white">
            참가자 후기
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-sm p-8 md:p-12 shadow-2xl border-0">
              <div className="relative overflow-hidden">
                <div className="flex transition-transform duration-500" 
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-6" />
                        <p className="text-xl text-gray-700 mb-6 italic">
                          "{(testimonial as any).content}"
                        </p>
                        <h4 className="text-lg font-bold text-gray-900">
                          {(testimonial as any).name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {(testimonial as any).company} | {(testimonial as any).program}
                        </p>
                        {(testimonial as any).investment && (
                          <Badge className="mt-4 bg-green-100 text-green-700">
                            투자 유치: {(testimonial as any).investment}
                          </Badge>
                        )}
                        {(testimonial as any).achievement && (
                          <Badge className="mt-4 bg-blue-100 text-blue-700">
                            {(testimonial as any).achievement}
                          </Badge>
                        )}
                        {(testimonial as any).recognition && (
                          <Badge className="mt-4 bg-purple-100 text-purple-700">
                            {(testimonial as any).recognition}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentSlide === index ? 'w-8 bg-purple-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className={`transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h3 className="text-3xl font-bold text-center mb-10 text-white">
            다가오는 이벤트
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-sm p-6 hover:shadow-2xl transition-all duration-300 border-0 group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className="mb-2 bg-purple-100 text-purple-700">
                      {event.type}
                    </Badge>
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {event.title}
                    </h4>
                  </div>
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  일정 등록
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section removed */}
      </div>
    </section>
  )
}