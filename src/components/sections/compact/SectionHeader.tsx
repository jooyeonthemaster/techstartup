'use client'

import Link from 'next/link'

interface SectionHeaderProps {
  title: string
  href?: string
  moreText?: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({ title, href, moreText = '더보기', subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-end justify-between gap-4 mb-4 ${className}`}>
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          aria-label={`${title} ${moreText}`}
        >
          {moreText}
        </Link>
      )}
    </div>
  )
}


