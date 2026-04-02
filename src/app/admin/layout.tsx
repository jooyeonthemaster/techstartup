import type { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext'
import AdminGuard from './components/AdminGuard'
import AdminSidebar from './components/AdminSidebar'

export const metadata: Metadata = {
  title: '관리자 - 기술벤처스타트업협회',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}
