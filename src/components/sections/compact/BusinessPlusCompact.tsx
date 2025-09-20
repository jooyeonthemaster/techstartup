'use client'

import Image from 'next/image'
import Link from 'next/link'

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
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Traditional Header - No gradients */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#005bac' }}>
            {title}
          </h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>

        {/* Traditional Cards Grid - Simple box design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-[#ddd] overflow-hidden hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="text-base font-bold mb-3" style={{ color: '#333' }}>
                  {item.title}
                </h3>
                <Link 
                  href={item.href}
                  className="inline-block px-6 py-2 text-sm font-medium text-white hover:bg-[#004890] transition-colors"
                  style={{ backgroundColor: '#005bac' }}
                >
                  자세히 보기 →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
