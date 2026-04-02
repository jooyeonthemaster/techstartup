import HeroSection from '@/components/sections/HeroSection'
import ContactSection from '@/components/sections/ContactSection'
import GoogleMapEmbed from '@/components/ui/google-map-embed'
import LatestListCompact from '@/components/sections/compact/LatestListCompact'
import BusinessPlan2025Section from '@/components/sections/BusinessPlan2025Section'
import BusinessPlusCompact from '@/components/sections/compact/BusinessPlusCompact'
import PopupModal from '@/components/home/PopupModal'
import { pressReleases } from '@/data/press'
import {
  getActivePopups,
  getActiveBanners,
  getLatestPress,
  getLatestNotices,
} from '@/lib/firebase/queries'
import type { NewsArticle } from '@/types/admin'

export const dynamic = 'force-dynamic'

/** Map a NewsArticle to the LatestItem shape used by LatestListCompact */
function mapNewsToLatestItem(article: NewsArticle) {
  // For press articles with an external source_url, link externally.
  // For notices / articles without source_url, link to internal detail page.
  const href =
    article.source_url ||
    `/news/${article.category}/${article.id}`

  const prefix =
    article.source_name ? `[${article.source_name}] ` : ''

  return {
    id: article.id,
    title: `${prefix}${article.title}`,
    href,
    date: article.published_at
      ? article.published_at.slice(0, 10)
      : (article.created_at ?? '').slice(0, 10),
  }
}

export default async function Home() {
  // Fetch all Firebase data in parallel
  const [popups, banners, firebasePress, firebaseNotices] = await Promise.all([
    getActivePopups(),
    getActiveBanners(),
    getLatestPress(3),
    getLatestNotices(3),
  ])

  // Map Firebase news to LatestItem format, fall back to hardcoded data
  const pressItems =
    firebasePress.length > 0
      ? firebasePress.map(mapNewsToLatestItem)
      : pressReleases.slice(0, 3).map((release) => ({
          id: `p${release.id}`,
          title: `[${release.media}] ${release.title}`,
          href: release.url,
          date: release.date,
        }))

  const noticeItems =
    firebaseNotices.length > 0
      ? firebaseNotices.map(mapNewsToLatestItem)
      : undefined // undefined triggers the "등록된 내용이 없습니다" empty state

  return (
    <>
      {/* Popup Modal - client component */}
      <PopupModal popups={popups} />

      <HeroSection banners={banners.length > 0 ? banners : undefined} />

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
              items={noticeItems}
            />
            <LatestListCompact
              title="보도자료"
              moreHref="/news/press"
              items={pressItems}
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
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              서울시 중구 퇴계로 36길 2, 충무로관 신관 B103호
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <GoogleMapEmbed
              srcOrQuery={'서울특별시 중구 퇴계로 36길 2'}
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
