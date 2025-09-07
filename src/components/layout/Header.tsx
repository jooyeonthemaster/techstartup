'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#about', label: '협회소개' },
    { href: '#services', label: '사업안내' },
    { href: '#programs', label: '프로그램' },
    { href: '#news', label: '소식' },
    { href: '#contact', label: '연락처' }
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">T</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">
                기술벤처스타트업협회
              </h1>
              <p className="text-xs text-muted-foreground">Tech Venture Startup Association</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              로그인
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">
                협회 가입
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center space-x-2 pb-4 border-b border-border">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">T</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground">기술벤처스타트업협회</h2>
                    <p className="text-xs text-muted-foreground">Tech Venture Startup</p>
                  </div>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className="text-foreground/80 hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                  <Button variant="outline" className="w-full">
                    로그인
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-primary to-primary/80">
                    협회 가입
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
