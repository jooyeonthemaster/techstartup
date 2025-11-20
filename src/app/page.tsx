import HeroSection from '@/components/sections/HeroSection'
import ContactSection from '@/components/sections/ContactSection'
import GoogleMapEmbed from '@/components/ui/google-map-embed'
import LatestListCompact from '@/components/sections/compact/LatestListCompact'
import BusinessPlan2025Section from '@/components/sections/BusinessPlan2025Section'
import BusinessPlusCompact from '@/components/sections/compact/BusinessPlusCompact'


export default function Home() {
  return (
    <>
      <HeroSection />
      
      {/* CORE BUSINESS 섹션 - 히어로 섹션 바로 아래 배치 */}
      <BusinessPlusCompact />
      
      {/* Main Content Section - Ultra Minimal */}
      <section className="py-24 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4">
          {/* 2025 사업계획 섹션 */}
          <div className="mb-16">
            <BusinessPlan2025Section />
          </div>
          
          {/* 공지사항, 보도자료 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <LatestListCompact
              title="공지사항"
              moreHref="/news/notice"
            />
            <LatestListCompact
              title="보도자료"
              moreHref="/news/press"
              items={[
                { id: 'p1', title: "[중소기업신문] 한국강소기업협회·중소기업신문 MOU 체결", href: '/news/press', date: '2024-07-02' },
                { id: 'p2', title: "[중앙일보] '제6회 2024 대한민국 강소기업 대상' 성료", href: '/news/press' },
                { id: 'p3', title: "[중소기업신문] 상생협력 실천하는 '강소기업 협회'", href: '/news/press' },
              ]}
            />
          </div>
        </div>
      </section>

      <ContactSection />

      {/* 찾아오시는 길 */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#005bac]">
              찾아오시는 길
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">서울시 중구 퇴계로 36길 2, 충무로관 신관 B103호</p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <GoogleMapEmbed
              srcOrQuery={"서울특별시 중구 퇴계로 36길 2"}
              height={450}
              className="w-full"
              title="찾아오시는 길"
            />
          </div>
        </div>
      </section>
    </>
  )
}