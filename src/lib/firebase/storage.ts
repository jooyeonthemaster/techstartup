import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './config'
import Compressor from 'compressorjs'

type StorageFolder = 'banners' | 'popups' | 'news'

/**
 * 이미지를 압축한다 (compressorjs)
 */
function compressImage(file: File, quality = 0.8, maxWidth = 1920): Promise<File | Blob> {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality,
      maxWidth,
      maxHeight: maxWidth,
      mimeType: 'image/webp',
      convertSize: 500000, // 500KB 이상이면 webp로 변환
      success: resolve,
      error: reject,
    })
  })
}

/**
 * 고유 파일명 생성
 */
function generateFileName(originalName: string): string {
  const ext = originalName.split('.').pop()?.toLowerCase() || 'webp'
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${timestamp}_${random}.${ext}`
}

/**
 * Firebase Storage에 이미지 업로드
 * - 자동 압축 (compressorjs)
 * - webp 변환
 * - 고유 파일명 생성
 * @returns 다운로드 URL
 */
export async function uploadImage(
  file: File,
  folder: StorageFolder,
  options?: { quality?: number; maxWidth?: number; skipCompression?: boolean }
): Promise<string> {
  const { quality = 0.8, maxWidth = 1920, skipCompression = false } = options || {}

  // 이미지 압축 (GIF는 제외)
  let processedFile: File | Blob = file
  if (!skipCompression && !file.type.includes('gif')) {
    processedFile = await compressImage(file, quality, maxWidth)
  }

  // Firebase Storage 업로드
  const fileName = generateFileName(file.name)
  const storageRef = ref(storage, `${folder}/${fileName}`)

  const metadata = {
    contentType: processedFile instanceof File ? processedFile.type : 'image/webp',
    cacheControl: 'public, max-age=31536000', // 1년 캐시
  }

  const snapshot = await uploadBytes(storageRef, processedFile, metadata)
  return getDownloadURL(snapshot.ref)
}

/**
 * Firebase Storage에서 이미지 삭제
 * @param url - 삭제할 이미지의 Firebase Storage URL
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    // Firebase Storage URL에서 경로 추출
    // 두 가지 URL 형식을 모두 지원:
    // 1) firebasestorage.googleapis.com/v0/b/BUCKET/o/ENCODED_PATH?token=...
    // 2) BUCKET.firebasestorage.app/PLAIN_PATH (newer format)
    const decodedUrl = decodeURIComponent(url)

    // Format 1: legacy googleapis.com URL
    const legacyMatch = decodedUrl.match(/\/o\/(.+?)\?/)
    if (legacyMatch) {
      const filePath = legacyMatch[1]
      const storageRef = ref(storage, filePath)
      await deleteObject(storageRef)
      return
    }

    // Format 2: *.firebasestorage.app URL
    const appMatch = decodedUrl.match(/\.firebasestorage\.app\/(.+?)(?:\?|$)/)
    if (appMatch) {
      const filePath = appMatch[1]
      const storageRef = ref(storage, filePath)
      await deleteObject(storageRef)
      return
    }

    // Unknown URL format - skip silently
    console.warn('이미지 삭제 건너뜀: 알 수 없는 URL 형식', url)
  } catch (error) {
    // 이미 삭제된 파일이거나 URL이 유효하지 않은 경우 무시
    console.warn('이미지 삭제 실패 (무시됨):', error)
  }
}
