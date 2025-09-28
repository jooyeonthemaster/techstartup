'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

const menuItems = [
  {
    title: '홈',
    href: '/',
    submenu: []
  },
  {
    title: '협회소개',
    href: '/about',
    submenu: [
      { title: '설립목적', href: '/about' },
      { title: '조직도', href: '/about/organization' },
      { title: '협회장 인사', href: '/about/greeting' },
    ]
  },
  {
    title: '사업안내',
    href: '/business',
    submenu: [
      { title: '채용지원', href: '/business/employment' },
      { title: '투자조합', href: '/business/investment' },
      { title: '산학협력', href: '/business/cooperation' },
    ]
  },
  {
    title: '협회소식',
    href: '/news',
    submenu: [
      { title: '공지사항', href: '/news/notice' },
      { title: '언론보도', href: '/news/press' },
    ]
  },
  {
    title: '회원가입',
    href: '/membership',
    submenu: [
      { title: '모집대상', href: '/membership' },
      { title: '협회비', href: '/membership/fees' },
    ]
  }
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <>
      {/* Main Header - Traditional style but with original logo */}
      <header className="bg-white border-b-4 border-[#005bac] sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Original Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative w-40 h-12">
                <Image 
                  src="/images/logo.png" 
                  alt="KTVSA Logo" 
                  fill 
                  className="object-contain" 
                  priority 
                />
              </div>
            </Link>

            {/* Desktop Navigation - Traditional horizontal menu */}
            <nav className="hidden lg:block">
              <ul className="flex items-center">
                {menuItems.map((item) => (
                  <li 
                    key={item.href} 
                    className="relative"
                    onMouseEnter={() => setActiveSubmenu(item.href)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    <Link
                      href={item.href}
                      className={`
                        block px-6 py-3 text-lg font-bold
                        ${pathname === item.href 
                          ? 'text-[#005bac] border-b-2 border-[#005bac]' 
                          : 'text-[#333] hover:text-[#005bac]'
                        }
                      `}
                    >
                      {item.title}
                      {item.submenu.length > 0 && (
                        <ChevronDown className="inline w-3 h-3 ml-1" />
                      )}
                    </Link>
                    
                    {/* Dropdown Menu - Traditional style */}
                    {item.submenu.length > 0 && activeSubmenu === item.href && (
                      <ul className="absolute top-full left-0 w-48 bg-white border border-[#ddd] shadow-md z-50">
                        {item.submenu.map((subitem) => (
                          <li key={subitem.href}>
                            <Link
                              href={subitem.href}
                              className="block px-4 py-2 text-base text-[#333] hover:bg-[#f5f5f5] hover:text-[#005bac] border-b border-[#eee] last:border-0"
                            >
                              {subitem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#333]" />
              ) : (
                <Menu className="w-6 h-6 text-[#333]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Traditional style */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#ddd]">
            <nav className="container mx-auto px-4 py-4">
              <ul>
                {menuItems.map((item) => (
                  <li key={item.href} className="border-b border-[#eee] last:border-0">
                    <Link
                      href={item.href}
                      className={`
                        block py-3 text-lg font-bold
                        ${pathname === item.href 
                          ? 'text-[#005bac]' 
                          : 'text-[#333]'
                        }
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                    
                    {/* Mobile Submenu */}
                    {item.submenu.length > 0 && (
                      <ul className="pl-4 pb-2">
                        {item.submenu.map((subitem) => (
                          <li key={subitem.href}>
                            <Link
                              href={subitem.href}
                              className="block py-2 text-base text-[#666] hover:text-[#005bac]"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              - {subitem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
