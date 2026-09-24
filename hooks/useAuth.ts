import { useState, useEffect, useCallback } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { auth } from '../firebase';
import { migrateUserToFirestore, clearAllUserDataOnLogout } from '../utils/syncService';

export const ADMIN_EMAILS = ['justusmhellman@gmail.com', 'justus.jo.li@gmail.com', 'douzepointsgame@gmail.com'];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (currentUser.isAnonymous) {
          // Gracefully and silently disconnect legacy anonymous auth sessions
          try {
            await signOut(auth);
          } catch (e) {
            console.error("Error signing out legacy anonymous session:", e);
          }
          setUser(null);
          setLoading(false);
          return;
        }

        // Authenticated user (Google)
        setUser(currentUser);
        setLoading(false);
        try {
          await migrateUserToFirestore(currentUser.uid);
        } catch (e) {
          console.error("Migration error:", e);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const userCred = await signInWithPopup(auth, provider);
      await migrateUserToFirestore(userCred.user.uid);
      return { success: true };
    } catch (err: any) {
      console.error("Google sign in error:", err);
      let msg = 'Failed to sign in with Google. Please try again.';
      if (err?.code === 'auth/popup-blocked') {
        msg = 'Sign-in popup was blocked by your browser. Please allow popups for this site.';
      } else if (err?.code === 'auth/unauthorized-domain') {
        msg = 'This domain is not authorized in Firebase Authentication.';
      } else if (err?.code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'Popup closed' };
      } else if (err?.message) {
        msg = err.message;
      }
      setAuthError(msg);
      return { success: false, error: msg };
    }
  }, []);

  const signOutUser = useCallback(async () => {
    try {
      // Clear game and user collection cache from localStorage so that 
      // the public PC / next guest session has a clean slate
      clearAllUserDataOnLogout();

      await signOut(auth);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('euro-stats-updated'));
        window.dispatchEvent(new Event('euro-collection-updated'));
        window.dispatchEvent(new Event('euro-avatar-updated'));
      }
    } catch (err) {
      console.error("Error signing out:", err);
    }
  }, []);

  const isGuest = !user || user.isAnonymous;
  const isAdmin = !!(user && user.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));

  return { 
    user, 
    loading, 
    isGuest, 
    isAdmin, 
    signInWithGoogle, 
    signOutUser, 
    authError, 
    setAuthError 
  };
};


