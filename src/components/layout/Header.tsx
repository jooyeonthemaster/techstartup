'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronDown,
  Menu,
  X,
  Zap,
  Users,
  Briefcase,
  Newspaper,
  Mail,
  Home,
  Award,
  BookOpen,
  Rocket,
  Shield,
  TrendingUp,
  Calendar,
  Bell,
  MessageCircle,
  Building2,
  HandshakeIcon,
  Brain,
  Heart,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    title: '협회소개',
    href: '/about',
    icon: Building2,
    submenu: [
      { title: '협회 소개', href: '/about', icon: Home, description: '기술벤처스타트업협회를 소개합니다' },
      { title: '임원진', href: '/#executives', icon: Award, description: '협회 임원진을 소개합니다' },
    ]
  },
  {
    title: '스타트업 지원',
    href: '/startup',
    icon: Rocket,
    submenu: [
      { title: '엑셀러레이팅', href: '/#programs?tab=accelerator', icon: TrendingUp, description: '스타트업 성장 가속화 프로그램' },
      { title: '투자 연계', href: '/#services', icon: Briefcase, description: '투자자와 스타트업을 연결합니다' },
      { title: '멘토링', href: '/#programs?tab=mentoring', icon: Brain, description: '전문가 1:1 멘토링 프로그램' },
      { title: '네트워킹', href: '/#programs?tab=networking', icon: HandshakeIcon, description: '스타트업 간 교류 프로그램' },
      { title: '교육 프로그램', href: '/#programs?tab=education', icon: BookOpen, description: '창업 역량 강화 교육' },
      { title: '공간 지원', href: '/startup/space', icon: Building2, description: '사무 공간 및 인프라 지원' },
    ]
  },
  {
    title: '협회소식',
    href: '/news',
    icon: Newspaper,
    submenu: [
      { title: '공지사항', href: '/news/notice', icon: Bell, description: '협회 공지사항을 확인하세요' },
      { title: '보도자료', href: '/news/press', icon: Newspaper, description: '언론 보도 자료' },
      { title: '이벤트', href: '/news/events', icon: Calendar, description: '협회 주최 이벤트 정보' },
      { title: '성공사례', href: '/news/success', icon: Award, description: '회원사 성공 스토리' },
      { title: '뉴스레터', href: '/news/newsletter', icon: Mail, description: '정기 뉴스레터 구독' },
    ]
  },
  {
    title: '회원사',
    href: '/members',
    icon: Shield,
    submenu: [
      { title: '회원사 소개', href: '/members', icon: Building2, description: '협회 회원사를 소개합니다' },
      { title: '회원 혜택', href: '/members#benefits', icon: Heart, description: '회원사 전용 혜택 안내' },
      { title: '가입 안내', href: '/members#join', icon: Sparkles, description: '회원 가입 절차 안내' },
    ]
  },
  {
    title: '문의하기',
    href: '/contact',
    icon: MessageCircle,
    submenu: []
  }
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 10)
      
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollableHeight = documentHeight - windowHeight
      const progress = (scrollY / scrollableHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled 
        ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50" 
        : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
    )}>
      {/* Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-xl">T</span>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  기술벤처스타트업협회
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Tech Venture Startup Association
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.submenu.length > 0 ? (
                    <>
                      <NavigationMenuTrigger className={cn(
                        "bg-transparent hover:bg-transparent focus:bg-transparent",
                        pathname.startsWith(item.href) && "text-blue-600 dark:text-blue-400"
                      )}>
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[500px] gap-3 p-6 md:w-[600px] md:grid-cols-2">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subitem.href}
                                  className={cn(
                                    "group block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-950/50 dark:hover:to-cyan-950/50 hover:shadow-md",
                                    pathname === subitem.href && "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50"
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 group-hover:from-blue-200 group-hover:to-cyan-200 dark:group-hover:from-blue-800/50 dark:group-hover:to-cyan-800/50">
                                      <subitem.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-sm font-semibold leading-none text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        {subitem.title}
                                      </div>
                                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                                        {subitem.description}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          pathname === item.href && "text-blue-600 dark:text-blue-400"
                        )}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>


          {/* Mobile Menu Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="p-6 border-b bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">T</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">기술벤처스타트업협회</h2>
                      <p className="text-xs text-muted-foreground">Tech Venture Startup Association</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Items */}
                <nav className="flex-1 overflow-y-auto">
                  <div className="py-4">
                    {menuItems.map((item) => (
                      <div key={item.href} className="mb-2">
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-6 py-3 text-sm font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-950/50 dark:hover:to-cyan-950/50 transition-all",
                            pathname.startsWith(item.href) && "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 text-blue-600 dark:text-blue-400"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5" />
                            {item.title}
                          </div>
                          {item.submenu.length > 0 && <ChevronDown className="h-4 w-4" />}
                        </Link>
                        
                        {/* Submenu Items */}
                        {item.submenu.length > 0 && pathname.startsWith(item.href) && (
                          <div className="bg-gray-50 dark:bg-gray-900/50">
                            {item.submenu.map((subitem) => (
                              <Link
                                key={subitem.href}
                                href={subitem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "flex items-center gap-3 px-12 py-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                                  pathname === subitem.href && "text-blue-600 dark:text-blue-400"
                                )}
                              >
                                <subitem.icon className="h-4 w-4" />
                                {subitem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}