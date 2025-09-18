'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

interface MatchingItem {
  id: string
  title: string
  company: string
  category?: string
  href: string
  imageSrc: string
}

interface MatchingGalleryCompactProps {
  title: string
  items: MatchingItem[]
  moreHref: string
}

export default function MatchingGalleryCompact({ title, items, moreHref }: MatchingGalleryCompactProps) {
  return (
    <section className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm p-6 transition-all duration-500 hover:border-gray-300 dark:hover:border-gray-700">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-gray-900 to-gray-400 dark:from-gray-100 dark:to-gray-600" />
        </div>
        <Link 
          href={moreHref} 
          className="group text-xs font-semibold text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 flex items-center gap-1.5"
        >
          <span>더보기</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.slice(0, 3).map((item) => (
          <Link 
            key={item.id} 
            href={item.href} 
            className="group block"
          >
            <div className="relative rounded-lg overflow-hidden border border-gray-100 dark:border-gray-900 bg-white dark:bg-black transition-all duration-500 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-lg">
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden bg-gray-50 dark:bg-gray-950">
                <Image 
                  src={item.imageSrc} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {/* Enhanced overlay with icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-black/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <ArrowUpRight className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                  </div>
                </div>
              </div>
              
              {/* Enhanced Content */}
              <div className="p-4 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-1.5">
                  {item.company}
                </p>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors mb-2">
                  {item.title}
                </h4>
                {item.category && (
                  <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold rounded-md bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300">
                    {item.category}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}