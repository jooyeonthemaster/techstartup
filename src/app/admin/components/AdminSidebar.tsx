'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Megaphone,
  ImageIcon,
  Newspaper,
  LogOut,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin', icon: LayoutDashboard, label: '대시보드' },
  { href: '/admin/popups', icon: Megaphone, label: '팝업 관리' },
  { href: '/admin/banners', icon: ImageIcon, label: '배너 관리' },
  { href: '/admin/news', icon: Newspaper, label: '뉴스 관리' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0f172a] z-[10000] flex flex-col">
      {/* Logo Header */}
      <div className="px-6 py-5 border-b border-white/10">
        <p className="text-white font-black text-lg tracking-wider">TVS</p>
        <p className="text-white/40 text-[11px] mt-0.5">관리자 패널</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200',
                active
                  ? 'bg-white/15 text-white'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80'
              )}
            >
              <item.icon className={cn('w-[18px] h-[18px] shrink-0', active ? 'text-white' : 'text-white/40')} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User & Logout */}
      <div className="border-t border-white/10 p-3 shrink-0">
        {user && (
          <div className="px-4 py-2 mb-1">
            <p className="text-[11px] text-white/30 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={signOut}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-[13px] text-white/40 hover:bg-white/5 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  )
}
