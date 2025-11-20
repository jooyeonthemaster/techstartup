'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

type BusinessItem = {
  id: string
  title: string
  imageSrc: string
  href: string
}

interface BusinessPlusCompactProps {
  title?: string
  subtitle?: string
  items?: BusinessItem[]
}

export default function BusinessPlusCompact({
  title = 'CORE BUSINESS',
  subtitle = '핵심 사업 미리보기',
  items = [
    { id: 'ai', title: 'AI 마케팅 역량강화 연계과정', imageSrc: '/images/business/employment-cover.png', href: '/business/employment' },
    { id: 'fund', title: '개인투자조합 운영', imageSrc: '/images/business/investment-cover.png', href: '/business/investment' },
    { id: 'rnd', title: '산학연 Collabo R&D 지원', imageSrc: '/images/business/cooperation-1.png', href: '/business/cooperation' },
  ],
}: BusinessPlusCompactProps) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-[#004094] text-xs font-bold mb-3">
            <Zap className="w-3 h-3 mr-1" />
            <span>CORE BUSINESS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            핵심 사업 미리보기
          </h2>
          <p className="text-gray-500">
            기술벤처 생태계를 선도하는 주요 사업을 소개합니다
          </p>
        </motion.div>

        {/* Modern Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={item.href} className="group block h-full">
                <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    
                    {/* Floating Arrow Button */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-[#004094]" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#004094] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center text-sm font-medium text-[#004094] group-hover:translate-x-1 transition-transform duration-300">
                      자세히 보기
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
