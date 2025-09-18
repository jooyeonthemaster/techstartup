'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

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
    <section className="relative mb-12">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 dark:text-gray-400 uppercase mb-3">
            {title}
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100">
            {subtitle}
          </h2>
          <div className="w-20 h-[1px] bg-gray-300 dark:bg-gray-700 mx-auto mt-6" />
        </div>

        {/* Minimal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((item) => (
            <Link 
              key={item.id} 
              href={item.href}
              className="group relative block"
            >
              <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-500 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-950">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={false}
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Minimal arrow icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>

                {/* Enhanced CTA Title */}
                <div className="relative p-5 bg-white dark:bg-gray-900">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-gray-500 transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                  {/* Progress bar effect on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-900 dark:bg-gray-100 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}