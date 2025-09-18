'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export interface LatestItem {
  id: string
  title: string
  href: string
  date?: string
  highlight?: boolean
}

interface LatestListCompactProps {
  title: string
  items: LatestItem[]
  moreHref: string
}

export default function LatestListCompact({ title, items, moreHref }: LatestListCompactProps) {
  const [primary, ...rest] = items

  return (
    <section className="group relative rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-br from-white/80 via-white/60 to-gray-50/40 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-950/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-xl">
      {/* Enhanced Header with better visibility */}
      <div className="relative p-6 pb-0 bg-gradient-to-b from-white/50 to-transparent dark:from-black/30">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <h3 className="text-xl font-bold inline-block px-2 py-1 rounded-md text-white dark:text-white bg-black dark:bg-black">
              {title}
            </h3>
            <div className="absolute -bottom-3 left-0 w-12 h-1 bg-gradient-to-r from-gray-900 via-gray-600 to-transparent dark:from-gray-100 dark:via-gray-400 rounded-full" />
          </div>
          <Link 
            href={moreHref} 
            className="group/link inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300"
          >
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">더보기</span>
            <ArrowRight className="w-3 h-3 text-gray-400 dark:text-gray-600 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Primary Item */}
        {primary && (
          <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-900">
            <Link href={primary.href} className="group block">
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors line-clamp-2 mb-1">
                {primary.title}
              </h4>
              {primary.date && (
                <p className="text-xs text-gray-400 dark:text-gray-600">{primary.date}</p>
              )}
            </Link>
          </div>
        )}

        {/* Secondary Items */}
        <ul className="space-y-3">
          {rest.slice(0, 2).map((item) => (
            <li key={item.id}>
              <Link 
                href={item.href} 
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors line-clamp-1 block"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}