'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
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
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Header style based on state
  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || !isHome || mobileMenuOpen
      ? 'bg-white shadow-md py-3' 
      : 'bg-transparent py-5'
  }`

  const textClass = isScrolled || !isHome || mobileMenuOpen
    ? 'text-gray-900' 
    : 'text-white'

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50 relative">
            <div className="relative w-40 h-12">
              {/* Note: You might need a white version of logo for transparent header */}
              <Image 
                src="/images/logo.png" 
                alt="KTVSA Logo" 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {menuItems.map((item) => (
                <li 
                  key={item.href} 
                  className="relative group"
                  onMouseEnter={() => setActiveSubmenu(item.href)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`
                      flex items-center text-lg font-medium transition-colors py-2
                      ${textClass} hover:text-[#004094]
                    `}
                  >
                    {item.title}
                    {item.submenu.length > 0 && (
                      <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.submenu.length > 0 && activeSubmenu === item.href && (
                      <motion.ul 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-sm py-2 border-t-2 border-[#004094]"
                      >
                        {item.submenu.map((subitem) => (
                          <li key={subitem.href}>
                            <Link
                              href={subitem.href}
                              className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#004094] transition-colors"
                            >
                              {subitem.title}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/contact"
              className={`text-sm font-medium px-4 py-2 rounded-sm border ${
                isScrolled || !isHome 
                  ? 'border-[#004094] text-[#004094] hover:bg-[#004094] hover:text-white' 
                  : 'border-white text-white hover:bg-white hover:text-[#004094]'
              } transition-all duration-300`}
            >
              문의하기
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7 text-gray-900" />
            ) : (
              <Menu className={`w-7 h-7 ${textClass}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {menuItems.map((item) => (
                <div key={item.href} className="border-b border-gray-100 pb-4">
                  <Link
                    href={item.href}
                    className="text-2xl font-bold text-gray-900 block mb-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                  {item.submenu.length > 0 && (
                    <ul className="pl-2 flex flex-col gap-2">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.href}>
                          <Link
                            href={subitem.href}
                            className="text-gray-500 hover:text-[#004094] py-1 block text-base"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subitem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className="mt-4">
                <Link 
                  href="/contact"
                  className="block w-full text-center py-3 bg-[#004094] text-white font-bold rounded-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  문의하기
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
