import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
  type FirestoreDataConverter,
  type QueryConstraint,
} from 'firebase/firestore'
import { db } from './config'
import type { Popup, Banner, NewsArticle } from '@/types/admin'
import type {
  EvaluationPackage,
  EvaluationDoc,
  EvaluationChatMessage,
} from '@/types/ai-evaluation'

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

// ============================================================
// AI Evaluation v2 — Packages (multi-agent) & Evaluations
// ============================================================

const evaluationPackageConverter = createConverter<EvaluationPackage>()
const evaluationConverter = createConverter<EvaluationDoc>()
const evaluationChatConverter = createConverter<EvaluationChatMessage>()

/**
 * Firestore 컬렉션 이름: `evaluationPackages` (v2).
 * v1의 `evaluationPrompts`를 대체. 시드 데이터가 없었으므로 충돌 없이 교체.
 */
export const evaluationPackagesCollection = collection(db, 'evaluationPackages').withConverter(
  evaluationPackageConverter
)
export const evaluationPackageDoc = (id: string) =>
  doc(db, 'evaluationPackages', id).withConverter(evaluationPackageConverter)

export const evaluationsCollection = collection(db, 'evaluations').withConverter(
  evaluationConverter
)
export const evaluationDoc = (id: string) =>
  doc(db, 'evaluations', id).withConverter(evaluationConverter)

export const evaluationChatsCollection = (evalId: string) =>
  collection(db, 'evaluations', evalId, 'chats').withConverter(evaluationChatConverter)

/**
 * 활성 패키지 목록 (일반 사용자 /new 플로우).
 *
 * Composite index required:
 *   Collection: evaluationPackages
 *   Fields: isActive (==), createdAt (desc)
 */
export const activePackagesQuery = () =>
  query(
    evaluationPackagesCollection,
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  )

/** 모든 패키지 (관리자용) */
export const allPackagesQuery = () =>
  query(evaluationPackagesCollection, orderBy('createdAt', 'desc'))

/** 특정 패키지의 버전 체인 */
export const packageVersionChainQuery = (rootId: string) =>
  query(
    evaluationPackagesCollection,
    where('parentId', '==', rootId),
    orderBy('version', 'desc')
  )

/**
 * 사용자 본인 평가 히스토리 (아카이브 제외, 최신순, 페이지네이션).
 *
 * Composite index required:
 *   Collection: evaluations
 *   Fields: createdBy (asc), isArchived (asc), createdAt (desc)
 */
export const userEvaluationsQuery = (
  uid: string,
  cursor?: QueryDocumentSnapshot,
  pageSize = 20
) => {
  const constraints: QueryConstraint[] = [
    where('createdBy', '==', uid),
    where('isArchived', '==', false),
    orderBy('createdAt', 'desc'),
    limit(pageSize),
  ]
  if (cursor) {
    constraints.splice(3, 0, startAfter(cursor))
  }
  return query(evaluationsCollection, ...constraints)
}

/**
 * 관리자 전체 평가 조회 (패키지/상태 필터 옵션).
 *
 * Composite indexes required (상황별):
 *   - packageId (==), createdAt (desc)
 *   - status (==), createdAt (desc)
 */
export const adminEvaluationsQuery = (
  filters: { packageId?: string; status?: string } = {},
  cursor?: QueryDocumentSnapshot,
  pageSize = 30
) => {
  const constraints: QueryConstraint[] = []
  if (filters.packageId) constraints.push(where('packageId', '==', filters.packageId))
  if (filters.status) constraints.push(where('status', '==', filters.status))
  constraints.push(orderBy('createdAt', 'desc'), limit(pageSize))
  if (cursor) {
    constraints.splice(constraints.length - 1, 0, startAfter(cursor))
  }
  return query(evaluationsCollection, ...constraints)
}

/** 평가별 챗 로그 (최근 순 로드, 클라이언트에서 reverse) */
export const evaluationChatsQuery = (evalId: string, maxItems = 50) =>
  query(evaluationChatsCollection(evalId), orderBy('createdAt', 'asc'), limit(maxItems))
