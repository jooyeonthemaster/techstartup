import { SectionBackground } from '@/components/ui/section-transition'
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
      <SectionBackground preset="hero" className="py-0">
        <section className="relative min-h-[36vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-600/10" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">사업 안내</h1>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">실제 진행 예정인 3가지 핵심 사업을 소개합니다.</p>
          </div>
        </section>
      </SectionBackground>

      <SectionBackground preset="business">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {items.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-white/20 hover:border-white/30 bg-white/55 dark:bg-white/[0.04] backdrop-blur-xl shadow-[0_1px_0_0_hsl(0_0%_100%/_0.25)_inset,0_6px_24px_-8px_hsl(0_0%_0%/_0.18)] transition-all hover:-translate-y-0.5">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/40 to-transparent" />
                <div className="relative aspect-[4/3]">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04] group-hover:rotate-[0.2deg]" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                </div>
                <Link href={item.href} className="absolute inset-0" aria-label={`${item.title} 바로가기`} />
              </div>
            ))}
          </div>
        </div>
      </SectionBackground>
    </>
  )
}


