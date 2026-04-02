'use client'

import { Megaphone, ImageIcon, Newspaper } from 'lucide-react'
import Link from 'next/link'

const QUICK_LINKS = [
  {
    href: '/admin/popups',
    icon: Megaphone,
    label: '팝업 관리',
    description: '메인 페이지 팝업을 생성하고 관리합니다',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    href: '/admin/banners',
    icon: ImageIcon,
    label: '배너 관리',
    description: '히어로 섹션 배너 이미지를 관리합니다',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    href: '/admin/news',
    icon: Newspaper,
    label: '뉴스 관리',
    description: '보도자료, 공지사항, 이벤트를 등록합니다',
    color: 'bg-green-50 text-green-600',
  },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
        <p className="text-sm text-gray-500 mt-1">기술벤처스타트업협회 웹사이트 콘텐츠를 관리합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#004094]/30 hover:shadow-lg transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <link.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{link.label}</h3>
            <p className="text-sm text-gray-500">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
