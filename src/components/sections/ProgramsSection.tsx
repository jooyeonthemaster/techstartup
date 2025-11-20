'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { programCategories, testimonials, upcomingEvents } from '@/data/programs'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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
  const [activeTab, setActiveTab] = useState('accelerator')
  const [currentSlide, setCurrentSlide] = useState(0)
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
    <section id="programs" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-[#004094] text-white border-0 px-4 py-1.5 hover:bg-[#00337a]">
            PROGRAMS & INITIATIVES
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            성장을 가속화하는{' '}
            <span className="text-[#004094]">체계적인 프로그램</span>
          </h2>
          <p className="text-xl text-gray-600">
            스타트업의 성장 단계에 맞춘 맞춤형 지원 프로그램을 제공합니다
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {Object.entries(programCategories).map(([key, category]) => {
            const Icon = category.icon
            const isActive = activeTab === key
            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#004094] text-white border-[#004094] shadow-lg'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#004094] hover:text-[#004094]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'currentColor'}`} />
                <span>{category.title}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Active Category Content */}
        <div className="mb-24">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-10">
              <p className="text-lg text-gray-600 bg-gray-50 inline-block px-6 py-2 rounded-lg">
                {programCategories[activeTab as keyof typeof programCategories].description}
              </p>
            </div>

            {/* Program Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programCategories[activeTab as keyof typeof programCategories].programs.map((program, index) => {
                const Icon = (program as any).icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-8">
                      {/* Status Badge */}
                      {(program as any).status && (
                        <div className="flex justify-end mb-4">
                          <Badge variant="secondary" className={`px-3 py-1 font-medium ${
                            (program as any).status === 'recruiting' 
                              ? 'bg-green-100 text-green-700' 
                              : (program as any).status === 'ongoing'
                              ? 'bg-blue-100 text-blue-700'
                              : (program as any).status === 'upcoming'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {(program as any).status === 'recruiting' ? '모집중' 
                              : (program as any).status === 'ongoing' ? '진행중'
                              : (program as any).status === 'upcoming' ? '예정'
                              : '상시'}
                          </Badge>
                        </div>
                      )}

                      {/* Icon */}
                      <div className="mb-6 inline-block p-3 rounded-lg bg-blue-50 group-hover:bg-[#004094] transition-colors duration-300">
                        <Icon className="w-8 h-8 text-[#004094] group-hover:text-white transition-colors duration-300" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-[#004094] transition-colors">
                        {(program as any).title}
                      </h3>

                      {/* Meta Info */}
                      <div className="space-y-3 mb-6 border-b border-gray-100 pb-6">
                        {'duration' in program && (program as any).duration && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            {(program as any).duration}
                          </div>
                        )}
                        {'participants' in program && (program as any).participants && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="w-4 h-4 mr-2 text-gray-400" />
                            {(program as any).participants}
                          </div>
                        )}
                        {'funding' in program && (program as any).funding && (
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                            {(program as any).funding}
                          </div>
                        )}
                        {'prize' in program && (program as any).prize && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Trophy className="w-4 h-4 mr-2 text-gray-400" />
                            {(program as any).prize}
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {(program as any).features.slice(0, 3).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ff6b00] mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {(program as any).tags.map((tag: string, idx: number) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Testimonials Section - Light Theme */}
        <div className="mb-24 bg-slate-50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#004094] to-[#005bac]" />
          
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
            참가자들의 생생한 후기
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-xl text-gray-700 mb-8 italic font-light leading-relaxed">
                        "{(testimonial as any).content}"
                      </p>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {(testimonial as any).name}
                        </h4>
                        <p className="text-sm text-[#004094] font-medium mt-1">
                          {(testimonial as any).company} | {(testimonial as any).program}
                        </p>
                      </div>
                      
                      <div className="flex justify-center gap-2 mt-6">
                        {(testimonial as any).investment && (
                          <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                            투자 유치: {(testimonial as any).investment}
                          </span>
                        )}
                        {(testimonial as any).achievement && (
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
                            {(testimonial as any).achievement}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center items-center gap-6 mt-8">
              <button
                onClick={() => {
                  setAutoPlay(false)
                  setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                }}
                className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setAutoPlay(false)
                      setCurrentSlide(index)
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === index ? 'w-8 h-2 bg-[#004094]' : 'w-2 h-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  setAutoPlay(false)
                  setCurrentSlide((prev) => (prev + 1) % testimonials.length)
                }}
                className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Events - Card Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">
            다가오는 주요 일정
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#004094] transition-colors duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full mb-4">
                    {event.type}
                  </span>
                  
                  <h4 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-[#004094] transition-colors">
                    {event.title}
                  </h4>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-[#ff6b00]" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-[#ff6b00]" />
                      {event.location}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-white border-2 border-[#004094] text-[#004094] hover:bg-[#004094] hover:text-white font-bold transition-all duration-300">
                    상세 일정 확인
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
