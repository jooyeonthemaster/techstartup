import type { Metadata } from 'next'
import AdminGuard from './components/AdminGuard'
import AdminSidebar from './components/AdminSidebar'

export const metadata: Metadata = {
  title: '관리자 - 기술벤처스타트업협회',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // AuthProvider는 전역 RootLayout에 있음 — 여기서 중복 래핑하지 않음
  return (
    <AdminGuard>
      <div className="fixed inset-0 z-[9999] bg-gray-50 flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  )
}
