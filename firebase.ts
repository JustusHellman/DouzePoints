import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'firebase/analytics';
import { getAnalytics, isSupported } from 'firebase/analytics';
import firebaseConfig from './firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only if supported in the current environment)
// We use a promise to handle the async nature of isSupported()
export const analytics = isSupported().then(yes => {
  if (yes) {
    return getAnalytics(app);
  }
  return null;
}).catch(err => {
  console.error("Analytics initialization failed:", err);
  return null;
});

// Initialize Firestore with the specific database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

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
    // Other errors (like 403) are expected if rules are tight, but "offline" is the critical one
  }
}

testConnection();
