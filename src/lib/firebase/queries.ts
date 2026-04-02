import { getDocs, getDoc, doc, collection, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from './config'
import type { Popup, Banner, NewsArticle } from '@/types/admin'

// ============================================================
// Public Query Functions
// ============================================================
// 복합 인덱스 없이 동작하도록 단순 쿼리 + JS 필터링 방식 사용.
// popups, banners는 소량 데이터이므로 성능 문제 없음.
// ============================================================

/**
 * 활성 팝업 조회
 * - Firestore: 전체 팝업 fetch
 * - JS: is_active + 날짜 범위 필터 + display_order 정렬
 */
export async function getActivePopups(): Promise<Popup[]> {
  try {
    const snapshot = await getDocs(collection(db, 'popups'))
    const now = new Date().toISOString()

    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() } as Popup))
      .filter((popup) => {
        if (!popup.is_active) return false
        if (popup.start_date > now) return false
        if (popup.end_date && popup.end_date < now) return false
        return true
      })
      .sort((a, b) => a.display_order - b.display_order)
  } catch (error) {
    console.error('[getActivePopups] Firestore query failed:', error)
    return []
  }
}

/**
 * 활성 배너 조회
 */
export async function getActiveBanners(): Promise<Banner[]> {
  try {
    const snapshot = await getDocs(collection(db, 'banners'))

    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() } as Banner))
      .filter((banner) => banner.is_active)
      .sort((a, b) => a.display_order - b.display_order)
  } catch (error) {
    console.error('[getActiveBanners] Firestore query failed:', error)
    return []
  }
}

/**
 * 게시된 뉴스 조회
 */
export async function getPublishedNews(
  category?: string,
  maxItems?: number
): Promise<NewsArticle[]> {
  try {
    const snapshot = await getDocs(collection(db, 'news'))

    let articles = snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() } as NewsArticle))
      .filter((article) => {
        if (!article.is_published) return false
        if (category && article.category !== category) return false
        return true
      })
      .sort((a, b) => {
        const dateA = a.published_at || a.created_at || ''
        const dateB = b.published_at || b.created_at || ''
        return dateB.localeCompare(dateA) // desc
      })

    if (maxItems) {
      articles = articles.slice(0, maxItems)
    }

    return articles
  } catch (error) {
    console.error('[getPublishedNews] Firestore query failed:', error)
    return []
  }
}

/**
 * 뉴스 단건 조회
 */
export async function getNewsById(id: string): Promise<NewsArticle | null> {
  try {
    const docRef = doc(db, 'news', id)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) return null
    return { id: snapshot.id, ...snapshot.data() } as NewsArticle
  } catch (error) {
    console.error('[getNewsById] Firestore query failed:', error)
    return null
  }
}

/**
 * 최신 보도자료 조회
 */
export async function getLatestPress(maxItems: number = 3): Promise<NewsArticle[]> {
  return getPublishedNews('press', maxItems)
}

/**
 * 최신 공지사항 조회
 */
export async function getLatestNotices(maxItems: number = 3): Promise<NewsArticle[]> {
  return getPublishedNews('notice', maxItems)
}
