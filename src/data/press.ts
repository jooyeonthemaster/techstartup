export interface PressRelease {
  id: number
  title: string
  summary: string
  date: string
  media: string
  url: string
  views?: number
}

export const pressReleases: PressRelease[] = [
  {
    id: 1,
    title: '기술벤처스타트업협회, 2025년 유니콘 기업 5개사 배출',
    summary: '협회 지원을 받은 스타트업 중 5개사가 유니콘 기업으로 성장',
    date: '2025-04-03',
    media: '벤처투데이',
    url: 'https://www.fntoday.co.kr/news/articleView.html?idxno=348741',
    views: 5234
  },
  {
    id: 2,
    title: '정부와 함께하는 글로벌 스타트업 진출 프로그램 론칭',
    summary: '중소벤처기업부와 협력하여 국내 스타트업의 해외 진출 지원',
    date: '2025-06-26',
    media: '머니투데이',
    url: 'https://www.mt.co.kr/future/2025/06/26/2025062618222495457',
    views: 3456
  },
  {
    id: 3,
    title: 'AI 기반 스타트업 투자 매칭 플랫폼 정식 오픈',
    summary: 'AI 기술을 활용한 투자자-스타트업 최적 매칭 서비스',
    date: '2025-07-07',
    media: '한국일보',
    url: 'https://www.hankookilbo.com/News/Read/A2025070713310002218',
    views: 2890
  },
  {
    id: 4,
    title: '제3회 K-스타트업 데모데이 성황리 개최',
    summary: '100개 스타트업이 참가한 데모데이에서 총 300억원 규모의 투자',
    date: '2025-01-22',
    media: '머니투데이',
    url: 'https://www.mt.co.kr/future/2025/01/22/2025012216325723187',
    views: 3234
  }
]

