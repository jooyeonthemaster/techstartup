/**
 * 하드코딩된 보도자료 데이터를 Firebase Firestore로 마이그레이션하는 일회성 스크립트
 * 실행: node scripts/seed-press.mjs
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDcaWel0UtM4IJrD54X3Sb5S6fnvx7Is7E',
  authDomain: 'techventure-ff194.firebaseapp.com',
  projectId: 'techventure-ff194',
  storageBucket: 'techventure-ff194.firebasestorage.app',
  messagingSenderId: '118362630618',
  appId: '1:118362630618:web:c5b615dfa3e4021785b8e3',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const pressReleases = [
  {
    title: "(사)기술벤처스타트업협회, 외국인 유학생 대상 'AI 마케팅 역량 강화 및 인턴십 연계 프로그램' 교육생 모집",
    summary: '서울시와 협력하여 외국인 유학생을 대상으로 생성형 AI 기반 마케팅 실무 역량을 전수하는 프로그램 운영',
    category: 'press',
    source_name: '파이낸스투데이',
    source_url: 'https://www.fntoday.co.kr/news/articleView.html?idxno=348741',
    published_at: '2025-04-03T00:00:00.000Z',
    is_published: true,
    image_url: null,
    content: '',
  },
  {
    title: '기술벤처스타트업협회, 유학생 대상 AI 마케팅 교육 프로그램 성료',
    summary: '외국인 유학생 대상 인공지능(AI) 마케팅 역량 강화 및 인턴십 연계 프로그램의 수료식 개최',
    category: 'press',
    source_name: '머니투데이',
    source_url: 'https://www.mt.co.kr/future/2025/06/26/2025062618222495457',
    published_at: '2025-06-26T00:00:00.000Z',
    is_published: true,
    image_url: null,
    content: '',
  },
  {
    title: '기술벤처스타트업협회, AICEO 투자조합 설명회 성공적 개최',
    summary: '코맥스벤처러스가 주관한 AICEO 투자조합 설명회를 성황리에 개최하여 스타트업 관계자 및 투자자 등 약 30여 명이 참석',
    category: 'press',
    source_name: '한국일보',
    source_url: 'https://www.hankookilbo.com/News/Read/A2025070713310002218',
    published_at: '2025-07-07T00:00:00.000Z',
    is_published: true,
    image_url: null,
    content: '',
  },
  {
    title: '"스타트업 성장 돕겠다"…기술벤처스타트업협회 창립 총회',
    summary: '서울 중구 명동에서 창립총회를 개최하여 기술 스타트업 부문 내 협력과 성장을 약속',
    category: 'press',
    source_name: '머니투데이',
    source_url: 'https://www.mt.co.kr/future/2025/01/22/2025012216325723187',
    published_at: '2025-01-22T00:00:00.000Z',
    is_published: true,
    image_url: null,
    content: '',
  },
]

async function seed() {
  console.log('🔥 보도자료 데이터 마이그레이션 시작...\n')

  // 이미 데이터가 있는지 확인
  const existing = await getDocs(collection(db, 'news'))
  const existingPress = existing.docs
    .map(d => d.data())
    .filter(d => d.category === 'press' && d.is_published)

  if (existingPress.length >= 4) {
    console.log(`⚠️ 이미 ${existingPress.length}개의 보도자료가 있습니다. 스킵합니다.`)
    process.exit(0)
  }

  const now = new Date().toISOString()

  for (const release of pressReleases) {
    const docData = {
      ...release,
      created_at: now,
      updated_at: now,
    }

    const docRef = await addDoc(collection(db, 'news'), docData)
    console.log(`✅ "${release.title.slice(0, 40)}..." → ${docRef.id}`)
  }

  console.log(`\n🎉 ${pressReleases.length}개 보도자료 마이그레이션 완료!`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ 마이그레이션 실패:', err)
  process.exit(1)
})
