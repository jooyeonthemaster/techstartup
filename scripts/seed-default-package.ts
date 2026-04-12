/**
 * 기본 에이전트 패키지(7명)를 Firestore `evaluationPackages`에 일회성 시드.
 *
 * 인증 방법 (둘 중 하나):
 *   1. .env.local의 FIREBASE_SERVICE_ACCOUNT_KEY (JSON을 한 줄 문자열로)
 *   2. `gcloud auth application-default login` (Application Default Credentials)
 *
 * 실행:
 *   npm run seed:package
 *   또는
 *   npx tsx scripts/seed-default-package.ts
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { initializeApp, cert, applicationDefault, getApps, type App } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { config as loadEnv } from 'dotenv'

import { DEFAULT_PACKAGE_SEED } from '../src/lib/ai-evaluation/default-agents'

// ─── 환경 로드 ────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
loadEnv({ path: path.join(projectRoot, '.env.local') })

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
if (!PROJECT_ID) {
  console.error('❌ NEXT_PUBLIC_FIREBASE_PROJECT_ID가 설정되지 않았습니다 (.env.local 확인)')
  process.exit(1)
}

// ─── Firebase Admin 초기화 ────────────────────────────
function initAdmin(): App {
  if (getApps().length > 0) return getApps()[0]

  const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  if (rawKey) {
    try {
      const serviceAccount = JSON.parse(rawKey)
      console.log('🔑 인증: FIREBASE_SERVICE_ACCOUNT_KEY')
      return initializeApp({
        credential: cert(serviceAccount),
        projectId: PROJECT_ID,
      })
    } catch (err) {
      console.error('❌ FIREBASE_SERVICE_ACCOUNT_KEY JSON 파싱 실패:', (err as Error).message)
      process.exit(1)
    }
  }

  console.log('🔑 인증: Application Default Credentials (gcloud)')
  try {
    return initializeApp({
      credential: applicationDefault(),
      projectId: PROJECT_ID,
    })
  } catch (err) {
    console.error(
      '❌ ADC 초기화 실패. 다음 중 하나를 하세요:\n' +
        '   (a) .env.local에 FIREBASE_SERVICE_ACCOUNT_KEY=... 추가\n' +
        '   (b) gcloud auth application-default login 실행'
    )
    console.error('   상세:', (err as Error).message)
    process.exit(1)
  }
}

const app = initAdmin()
const db = getFirestore(app)

// ─── 시드 실행 ────────────────────────────────────────
async function main() {
  console.log(`\n🔥 KTVSA AI 평가 — 기본 패키지 시드 (project: ${PROJECT_ID})\n`)

  const seed = DEFAULT_PACKAGE_SEED
  console.log(`📦 패키지: "${seed.name}" (${seed.agents.length}명 에이전트)`)
  seed.agents.forEach((a, i) => {
    console.log(`   ${i + 1}. ${a.role} (weight: ${a.weight}%, id: ${a.id})`)
  })

  // 이미 활성 패키지가 있는지 확인
  const activeSnap = await db
    .collection('evaluationPackages')
    .where('isActive', '==', true)
    .limit(1)
    .get()

  if (!activeSnap.empty) {
    console.log(`\n⚠️  이미 활성 패키지가 ${activeSnap.size}개 존재합니다:`)
    activeSnap.forEach((doc) => {
      const d = doc.data()
      console.log(`   - ${d.name} (v${d.version}, id: ${doc.id})`)
    })
    console.log('\n중복 생성을 원하지 않으면 여기서 중단됩니다.')
    console.log('(강제 시드를 원하면 기존 패키지를 삭제/비활성화 후 재실행)')
    process.exit(0)
  }

  // 트랜잭션: isDefault=true 기존 해제 + 새 문서 생성
  const now = new Date().toISOString()
  const docRef = db.collection('evaluationPackages').doc()

  await db.runTransaction(async (tx) => {
    const defaultSnap = await tx.get(
      db.collection('evaluationPackages').where('isDefault', '==', true)
    )
    defaultSnap.forEach((d) => {
      tx.update(d.ref, { isDefault: false, updatedAt: now })
    })

    tx.set(docRef, {
      id: docRef.id,
      name: seed.name,
      description: seed.description,
      sharedPreamble: seed.sharedPreamble,
      synthesisPrompt: seed.synthesisPrompt,
      agents: seed.agents,
      outputSchemaVersion: 'v2',
      version: 1,
      parentId: null,
      isActive: true,
      isDefault: true,
      createdBy: 'seed-script',
      createdByEmail: 'seed@ktvsa.org',
      createdAt: now,
      updatedAt: now,
    })
  })

  console.log(`\n✅ 시드 완료: packageId = ${docRef.id}`)
  console.log(
    `🌐 Firebase Console: https://console.firebase.google.com/project/${PROJECT_ID}/firestore/data/evaluationPackages/${docRef.id}\n`
  )
}

main().catch((err) => {
  console.error('❌ 시드 실패:', err)
  process.exit(1)
})
