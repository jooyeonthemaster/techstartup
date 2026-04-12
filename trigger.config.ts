import { defineConfig } from '@trigger.dev/sdk'
import { syncEnvVars } from '@trigger.dev/build/extensions/core'
import type { BuildExtension } from '@trigger.dev/build/extensions'

/**
 * Trigger.dev config for KTVSA AI Evaluation.
 *
 * 핵심 과제: Debian bookworm apt에 `libreoffice-h2orestart`가 없어서 아래 전략 사용:
 *   1) 커스텀 단일 RUN 레이어 하나에
 *      - LibreOffice + 한국어 폰트 + curl + ca-certificates 전부 apt-get install
 *      - GitHub에서 H2Orestart.oxt 다운로드
 *      - `unopkg add --shared`로 LibreOffice 시스템 전역에 설치
 *      - apt 캐시 정리
 *   2) 이렇게 하면 레이어 하나 안에서 순서 보장 + 캐시 효율
 *
 * 왜 aptGet 확장을 쓰지 않나:
 *   - aptGet 확장은 커스텀 확장보다 **나중**에 실행되어, 커스텀 RUN에서 curl/unopkg가 없는 상태가 됨
 *   - 단일 RUN으로 합치면 순서 문제 원천 해결
 */

const H2ORESTART_VERSION = 'v0.7.10'
const H2ORESTART_URL = `https://github.com/ebandal/H2Orestart/releases/download/${H2ORESTART_VERSION}/H2Orestart.oxt`

const libreOfficeWithHwpExtension: BuildExtension = {
  name: 'libreoffice-hwp-setup',
  onBuildComplete: async (context) => {
    context.addLayer({
      id: 'libreoffice-hwp',
      image: {
        instructions: [
          [
            'RUN set -eux',
            '  && apt-get update',
            '  && apt-get install -y --no-install-recommends',
            '     libreoffice libreoffice-writer libreoffice-java-common',
            '     default-jre-headless',
            '     curl ca-certificates',
            '     fonts-nanum fonts-nanum-coding fonts-noto-cjk fonts-dejavu',
            `  && curl -fsSL -o /tmp/H2Orestart.oxt ${H2ORESTART_URL}`,
            '  && unopkg add --shared /tmp/H2Orestart.oxt',
            '  && rm /tmp/H2Orestart.oxt',
            '  && apt-get clean',
            '  && rm -rf /var/lib/apt/lists/*',
          ].join(' \\\n    '),
        ],
      },
    })
  },
}

export default defineConfig({
  project: 'proj_ljrcjmwjpznvwzmaunlu',

  dirs: ['./src/trigger'],

  // 기본 최대 실행 시간: 15분 (Claude 7 에이전트 병렬 + 변환 여유)
  maxDuration: 900,

  retries: {
    enabledInDev: false,
    default: {
      maxAttempts: 2,
      minTimeoutInMs: 2000,
      maxTimeoutInMs: 20000,
      factor: 2,
      randomize: true,
    },
  },

  build: {
    extensions: [
      libreOfficeWithHwpExtension,
      // 로컬 .env.local의 ANTHROPIC_API_KEY / FIREBASE_SERVICE_ACCOUNT_KEY / Firebase
      // 설정값을 Trigger.dev Cloud 환경변수로 자동 동기화 (deploy 시점에 push)
      syncEnvVars(async () => ({
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
        FIREBASE_SERVICE_ACCOUNT_KEY: process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '',
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
          process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
      })),
    ],
  },
})
