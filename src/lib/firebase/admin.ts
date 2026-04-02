import { initializeApp, getApps, cert, type App } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import { getAuth } from 'firebase-admin/auth'

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0]
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

  if (serviceAccountKey) {
    const serviceAccount = JSON.parse(serviceAccountKey)
    return initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    })
  }

  // Fallback: use application default credentials (for local dev with gcloud CLI)
  return initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  })
}

const adminApp = getAdminApp()

export const adminDb = getFirestore(adminApp)
export const adminStorage = getStorage(adminApp)
export const adminAuth = getAuth(adminApp)
export default adminApp
