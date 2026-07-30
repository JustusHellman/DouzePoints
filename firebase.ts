import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';
import localConfig from './firebase-applet-config.json';

// Use Vite environment variables if provided, otherwise fallback to local config
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || localConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || localConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || localConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || localConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || localConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || localConfig.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || (localConfig as any).measurementId,
  firestoreDatabaseId: import.meta.env.VITE_FIRESTORE_DATABASE_ID || localConfig.firestoreDatabaseId || "(default)"
};

// Initialize Firebase
const app = initializeApp(config);

// Initialize Analytics
export const analytics = (async () => {
  try {
    if (!config.measurementId) {
      return null;
    }
    const yes = await isSupported();
    if (yes) {
      return getAnalytics(app);
    }
  } catch {
    // Fail silently if network/analytics is blocked or unavailable
  }
  return null;
})();

// Initialize Firestore
export const db = getFirestore(app, config.firestoreDatabaseId);

// Initialize Auth
export const auth = getAuth();

// Connection test
async function testConnection() {
  try {
    // Attempt to fetch a non-existent doc just to check connectivity
    await getDocFromServer(doc(db, '_internal', 'connection_test'));
    if (import.meta.env.DEV) {
      console.log("Firebase connection verified.");
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Firebase is offline. Please check your configuration.");
    }
  }
}
testConnection();
