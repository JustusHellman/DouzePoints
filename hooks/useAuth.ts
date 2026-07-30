import { useState, useEffect } from 'react';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import { migrateUserToFirestore } from '../utils/syncService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        // Attempt migration (if not already migrated)
        try {
          await migrateUserToFirestore(currentUser.uid);
        } catch (e) {
          console.error("Migration error:", e);
        }
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error("Error signing in anonymously", error);
        });
      }
    });
    return unsubscribe;
  }, []);

  return { user, loading };
};
