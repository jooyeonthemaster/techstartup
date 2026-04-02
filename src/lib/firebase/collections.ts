import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
  type FirestoreDataConverter,
  type QueryConstraint,
} from 'firebase/firestore'
import { db } from './config'
import type { Popup, Banner, NewsArticle } from '@/types/admin'

// ============================================================
// Firestore Converters (type-safe read/write)
// ============================================================

function createConverter<T extends { id: string }>(): FirestoreDataConverter<T> {
  return {
    toFirestore(data: T): DocumentData {
      const { id, ...rest } = data
      return rest
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): T {
      const data = snapshot.data()
      return { id: snapshot.id, ...data } as T
    },
  }
}

const popupConverter = createConverter<Popup>()
const bannerConverter = createConverter<Banner>()
const newsConverter = createConverter<NewsArticle>()

// ============================================================
// Collection References
// ============================================================

export const popupsCollection = collection(db, 'popups').withConverter(popupConverter)
export const bannersCollection = collection(db, 'banners').withConverter(bannerConverter)
export const newsCollection = collection(db, 'news').withConverter(newsConverter)

// ============================================================
// Document References
// ============================================================

export const popupDoc = (id: string) => doc(db, 'popups', id).withConverter(popupConverter)
export const bannerDoc = (id: string) => doc(db, 'banners', id).withConverter(bannerConverter)
export const newsDoc = (id: string) => doc(db, 'news', id).withConverter(newsConverter)

// ============================================================
// Pre-built Queries
// ============================================================

/**
 * 활성 팝업 (날짜 범위 내, 정렬)
 *
 * NOTE: This compound query requires a Firestore composite index:
 *   Collection: popups
 *   Fields: is_active (==), start_date (<=, asc), display_order (asc)
 *
 * Create via the Firebase Console or by following the link in the
 * Firestore error message when the query first runs without the index.
 */
export const activePopupsQuery = () => {
  const now = new Date().toISOString()
  return query(
    popupsCollection,
    where('is_active', '==', true),
    where('start_date', '<=', now),
    orderBy('start_date', 'asc'),
    orderBy('display_order', 'asc')
  )
}

/** 모든 팝업 (관리자용) */
export const allPopupsQuery = () =>
  query(popupsCollection, orderBy('display_order', 'asc'))

/**
 * 활성 배너 (정렬)
 *
 * NOTE: This compound query requires a Firestore composite index:
 *   Collection: banners | Fields: is_active (==), display_order (asc)
 */
export const activeBannersQuery = () =>
  query(
    bannersCollection,
    where('is_active', '==', true),
    orderBy('display_order', 'asc')
  )

/** 모든 배너 (관리자용) */
export const allBannersQuery = () =>
  query(bannersCollection, orderBy('display_order', 'asc'))

/**
 * 게시된 뉴스 (카테고리 필터 옵션)
 *
 * NOTE: This compound query requires Firestore composite indexes:
 *   1) Collection: news | Fields: is_published (==), published_at (desc)
 *   2) Collection: news | Fields: category (==), is_published (==), published_at (desc)
 */
export const publishedNewsQuery = (category?: string, maxItems?: number) => {
  const constraints: QueryConstraint[] = [
    where('is_published', '==', true),
    orderBy('published_at', 'desc'),
  ]
  if (category) {
    constraints.splice(0, 0, where('category', '==', category))
  }
  if (maxItems) {
    constraints.push(limit(maxItems))
  }
  return query(newsCollection, ...constraints)
}

/** 모든 뉴스 (관리자용) */
export const allNewsQuery = (category?: string) => {
  if (category) {
    return query(
      newsCollection,
      where('category', '==', category),
      orderBy('created_at', 'desc')
    )
  }
  return query(newsCollection, orderBy('created_at', 'desc'))
}
