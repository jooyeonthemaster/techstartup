'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

const HIDE_CHROME_PREFIXES = ['/ku-eval', '/ai-evaluation']

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideChrome = HIDE_CHROME_PREFIXES.some((p) => pathname.startsWith(p))

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!hideChrome && <Header />}
      <main>{children}</main>
      {!hideChrome && <Footer />}
    </div>
  )
}
