'use client'

import Link from 'next/link'

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
  return (
    <div className="bg-white border border-[#ddd]">
      {/* Traditional Header - Like bulletin board */}
      <div className="bg-[#f5f5f5] px-4 py-2 border-b border-[#ddd] flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#333]">{title}</h3>
        <Link 
          href={moreHref} 
          className="text-xs text-[#666] hover:text-[#ff6600]"
        >
          더보기
        </Link>
      </div>

      {/* Traditional List - Simple and clean */}
      <ul className="p-4">
        {items.map((item, index) => (
          <li key={item.id} className="py-2 border-b border-[#eee] last:border-0">
            <Link href={item.href} className="flex justify-between items-center group">
              <span className="text-sm text-[#333] group-hover:text-[#005bac] truncate pr-2">
                {item.title}
              </span>
              {item.date && (
                <span className="text-xs text-[#999] whitespace-nowrap">
                  {item.date}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
