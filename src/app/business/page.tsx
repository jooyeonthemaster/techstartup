import Image from 'next/image'
import Link from 'next/link'

export default function BusinessOverviewPage() {
  const items = [
    { id: 'ai', title: 'AI 마케팅 역량강화 연계과정 (외국인 유학생 대상)', image: '/images/business/employment-cover.png', href: '/business/employment' },
    { id: 'fund', title: '개인투자조합 운영 (코맥스벤처러스 GP)', image: '/images/business/investment-cover.png', href: '/business/investment' },
    { id: 'rnd', title: '산학연 Collabo R&D 지원', image: '/images/business/cooperation-1.png', href: '/business/cooperation' },
  ]

  return (
    <>
      <section className="relative pt-32 pb-16 bg-gray-50/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#005bac]">사업 안내</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">실제 진행 예정인 3가지 핵심 사업을 소개합니다.</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {items.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-[#005bac] bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="relative aspect-[4/3]">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 bg-white">
                  <h3 className="text-lg font-bold text-[#005bac] group-hover:text-[#ff6600] transition-colors">{item.title}</h3>
                </div>
                <Link href={item.href} className="absolute inset-0" aria-label={`${item.title} 바로가기`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}


