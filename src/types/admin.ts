// ============================================================
// Firebase Admin Types - Production Grade
// ============================================================

/** 팝업 관리 */
export interface Popup {
  id: string
  title: string
  description: string | null
  image_url: string | null
  link_url: string | null
  link_text: string | null
  is_active: boolean
  start_date: string // ISO 8601
  end_date: string | null // ISO 8601
  display_order: number
  image_aspect_ratio: '1/1' | '4/5' | '3/4' | '16/9' | '9/16'
  created_at: string
  updated_at: string
}

/** 팝업 생성/수정 DTO */
export type PopupInput = Omit<Popup, 'id' | 'created_at' | 'updated_at'>

/** 배너 관리 (히어로 슬라이드) */
export interface Banner {
  id: string
  title: string
  subtitle: string | null
  image_url: string
  mobile_image_url: string | null
  link_url: string | null
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

/** 배너 생성/수정 DTO */
export type BannerInput = Omit<Banner, 'id' | 'created_at' | 'updated_at'>

/** 뉴스 카테고리 */
export type NewsCategory = 'press' | 'notice' | 'event'

/** 뉴스 기사 */
export interface NewsArticle {
  id: string
  title: string
  content: string // Rich HTML from Tiptap editor
  summary: string
  category: NewsCategory
  image_url: string | null
  source_name: string | null // 보도자료: 언론사명
  source_url: string | null // 보도자료: 외부 링크
  is_published: boolean
  published_at: string | null // ISO 8601
  created_at: string
  updated_at: string
}

/** 뉴스 생성/수정 DTO */
export type NewsArticleInput = Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>

/** 카테고리 라벨 매핑 */
export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  press: '보도자료',
  notice: '공지사항',
  event: '이벤트',
}

/** 카테고리 색상 매핑 */
export const NEWS_CATEGORY_COLORS: Record<NewsCategory, string> = {
  press: 'bg-blue-100 text-blue-700',
  notice: 'bg-orange-100 text-orange-700',
  event: 'bg-green-100 text-green-700',
}

/** 이미지 비율 옵션 */
export const ASPECT_RATIO_OPTIONS = [
  { label: '1:1 (정사각형)', value: '1/1' },
  { label: '4:5 (세로)', value: '4/5' },
  { label: '3:4 (세로)', value: '3/4' },
  { label: '16:9 (가로)', value: '16/9' },
  { label: '9:16 (세로)', value: '9/16' },
] as const
