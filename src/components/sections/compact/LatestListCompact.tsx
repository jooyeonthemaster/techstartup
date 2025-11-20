'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

export interface LatestItem {
  id: string
  title: string
  href: string
  date?: string
  highlight?: boolean
}

interface LatestListCompactProps {
  title: string
  items?: LatestItem[]
  moreHref: string
}

export default function LatestListCompact({ title, items, moreHref }: LatestListCompactProps) {
  return (
    <motion.div 
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <span className="w-1.5 h-5 bg-[#004094] rounded-full mr-3" />
          {title}
        </h3>
        <Link 
          href={moreHref} 
          className="group flex items-center text-xs font-medium text-gray-500 hover:text-[#004094] transition-colors"
        >
          더보기
          <Plus className="w-3 h-3 ml-1 group-hover:rotate-90 transition-transform duration-300" />
        </Link>
      </div>

      {/* List */}
      {items && items.length > 0 ? (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className="group block">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-sm text-gray-700 group-hover:text-[#004094] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </span>
                  {item.date && (
                    <div className="flex items-center text-xs text-gray-400 whitespace-nowrap mt-0.5">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date}
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-gray-400">등록된 내용이 없습니다.</p>
        </div>
      )}
    </motion.div>
  )
}
