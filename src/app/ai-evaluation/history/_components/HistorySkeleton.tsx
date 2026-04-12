'use client'

export default function HistorySkeleton({ view = 'grid' }: { view?: 'grid' | 'table' }) {
  if (view === 'table') {
    return (
      <div className="border border-[#E5E5E5] bg-white">
        <table className="w-full">
          <thead className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
            <tr>
              {['점수', '문서', '프롬프트', '상태', '날짜', ''].map((h, i) => (
                <th
                  key={i}
                  className="py-3 px-5 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A3A3A3]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-[#E5E5E5]">
                <td className="py-5 px-5">
                  <div className="h-6 w-16 bg-[#E5E5E5] animate-pulse" />
                </td>
                <td className="py-5 px-5">
                  <div className="h-4 w-64 bg-[#E5E5E5] animate-pulse mb-2" />
                  <div className="h-3 w-20 bg-[#F5F5F5] animate-pulse" />
                </td>
                <td className="py-5 px-5">
                  <div className="h-4 w-32 bg-[#E5E5E5] animate-pulse" />
                </td>
                <td className="py-5 px-5">
                  <div className="h-6 w-20 bg-[#E5E5E5] animate-pulse" />
                </td>
                <td className="py-5 px-5">
                  <div className="h-3 w-20 bg-[#E5E5E5] animate-pulse" />
                </td>
                <td className="py-5 px-5">
                  <div className="h-4 w-4 bg-[#E5E5E5] animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-[#E5E5E5] p-6">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-baseline gap-2">
              <div className="h-10 w-20 bg-[#E5E5E5] animate-pulse" />
              <div className="h-3 w-8 bg-[#F5F5F5] animate-pulse" />
            </div>
            <div className="h-6 w-10 bg-[#E5E5E5] animate-pulse" />
          </div>

          <div className="h-[3px] w-full bg-[#F5F5F5] mb-5 animate-pulse" />

          <div className="h-4 w-full bg-[#E5E5E5] animate-pulse mb-2" />
          <div className="h-4 w-3/4 bg-[#E5E5E5] animate-pulse mb-3" />
          <div className="h-3 w-1/2 bg-[#F5F5F5] animate-pulse mb-6" />

          <div className="pt-4 border-t border-[#F5F5F5] flex items-center justify-between">
            <div className="h-3 w-24 bg-[#F5F5F5] animate-pulse" />
            <div className="h-3 w-12 bg-[#F5F5F5] animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}
