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
    title: '(사)기술벤처스타트업협회, 외국인 유학생 대상 \'AI 마케팅 역량 강화 및 인턴십 연계 프로그램\' 교육생 모집',
    summary: '서울시와 협력하여 외국인 유학생을 대상으로 생성형 AI 기반 마케팅 실무 역량을 전수하는 프로그램 운영',
    date: '2025-04-03',
    media: '파이낸스투데이',
    url: 'https://www.fntoday.co.kr/news/articleView.html?idxno=348741',
    views: 5234
  },
  {
    id: 2,
    title: '기술벤처스타트업협회, 유학생 대상 AI 마케팅 교육 프로그램 성료',
    summary: '외국인 유학생 대상 인공지능(AI) 마케팅 역량 강화 및 인턴십 연계 프로그램의 수료식 개최',
    date: '2025-06-26',
    media: '머니투데이',
    url: 'https://www.mt.co.kr/future/2025/06/26/2025062618222495457',
    views: 3456
  },
  {
    id: 3,
    title: '기술벤처스타트업협회, AICEO 투자조합 설명회 성공적 개최',
    summary: '코맥스벤처러스가 주관한 AICEO 투자조합 설명회를 성황리에 개최하여 스타트업 관계자 및 투자자 등 약 30여 명이 참석',
    date: '2025-07-07',
    media: '한국일보',
    url: 'https://www.hankookilbo.com/News/Read/A2025070713310002218',
    views: 2890
  },
  {
    id: 4,
    title: '"스타트업 성장 돕겠다"…기술벤처스타트업협회 창립 총회',
    summary: '서울 중구 명동에서 창립총회를 개최하여 기술 스타트업 부문 내 협력과 성장을 약속',
    date: '2025-01-22',
    media: '머니투데이',
    url: 'https://www.mt.co.kr/future/2025/01/22/2025012216325723187',
    views: 3234
  }
]

