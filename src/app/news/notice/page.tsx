'use client'

import { FileText } from 'lucide-react'

export default function NoticePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Clean Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-950/50" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-bold tracking-[0.4em] text-gray-400 dark:text-gray-600 uppercase mb-4">
                Notice Board
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#005bac] mb-4">
                공지사항
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                협회의 중요한 소식과 안내사항
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Empty Notice List */}
      <section className="py-16 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Empty State */}
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-16">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 mb-6">
                  <FileText className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  등록된 공지사항이 없습니다
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  새로운 공지사항이 등록되면 이곳에 표시됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
