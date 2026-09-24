import { useState, useEffect } from 'react';
import { UserCollection, OpenedCard, CardRarity } from '../data/types';
import { doc, onSnapshot, increment, DocumentData } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import { extractEuroCollectionData, awardDailyPack } from '../utils/cards';
import { safeUpdateUserDoc, canSyncToCloud } from '../utils/syncService';

const DAILY_PACK_LIMIT = 10;

export const SCRAP_VALUES: Record<string, number> = {
  [CardRarity.COMMON]: 1,
  [CardRarity.UNCOMMON]: 5,
  [CardRarity.RARE]: 25,
  [CardRarity.LEGENDARY]: 100,
};

export const CRAFT_VALUES: Record<string, number> = {
  [CardRarity.COMMON]: 5,
  [CardRarity.UNCOMMON]: 25,
  [CardRarity.RARE]: 100,
  [CardRarity.LEGENDARY]: 400,
};

export const useEuroCards = () => {
  const [collection, setCollection] = useState<UserCollection>(() => {
    const cached = localStorage.getItem('douzepoints_eurocards_collection');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Failed to parse cached eurocards collection", e);
      }
    }
    return {
      cards: {},
      availablePacks: 0,
      packsOpened: 0,
      lastDailyReset: Date.now(),
      dailyPacksEarned: 0,
      confetti: 0,
    };
  });

  // Listen to local storage updates (e.g. from packs awarded, game resets, or logout)
  useEffect(() => {
    const handleLocalUpdate = () => {
      const cached = localStorage.getItem('douzepoints_eurocards_collection');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setCollection({
            cards: parsed.cards || {},
            availablePacks: Number(parsed.availablePacks || 0),
            packsOpened: Number(parsed.packsOpened || 0),
            lastDailyReset: Number(parsed.lastDailyReset || Date.now()),
            dailyPacksEarned: Number(parsed.dailyPacksEarned || 0),
            confetti: Number(parsed.confetti || 0),
          });
        } catch { /* ignore */ }
      } else {
        // Reset to clean guest slate on logout or storage clear
        setCollection({
          cards: {},
          availablePacks: 0,
          packsOpened: 0,
          lastDailyReset: Date.now(),
          dailyPacksEarned: 0,
          confetti: 0,
        });
      }
    };
    window.addEventListener('euro-collection-updated', handleLocalUpdate);
    return () => window.removeEventListener('euro-collection-updated', handleLocalUpdate);
  }, []);

  // Real-time Firestore sync ONLY for authenticated Google users
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = undefined;
      }

      if (!user || user.isAnonymous) {
        const cached = typeof window !== 'undefined' ? localStorage.getItem('douzepoints_eurocards_collection') : null;
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            setCollection({
              cards: parsed.cards || {},
              availablePacks: Number(parsed.availablePacks || 0),
              packsOpened: Number(parsed.packsOpened || 0),
              lastDailyReset: Number(parsed.lastDailyReset || Date.now()),
              dailyPacksEarned: Number(parsed.dailyPacksEarned || 0),
              confetti: Number(parsed.confetti || 0),
            });
          } catch { /* ignore */ }
        } else {
          setCollection({
            cards: {},
            availablePacks: 0,
            packsOpened: 0,
            lastDailyReset: Date.now(),
            dailyPacksEarned: 0,
            confetti: 0,
          });
        }
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const extracted = extractEuroCollectionData(data);
          
          let dailyPacksEarned = extracted.dailyPacksEarned;
          const lastDailyReset = extracted.lastDailyReset;
          const now = new Date();
          const lastReset = new Date(lastDailyReset);
          
          if (now.getUTCFullYear() !== lastReset.getUTCFullYear() ||
              now.getUTCMonth() !== lastReset.getUTCMonth() ||
              now.getUTCDate() !== lastReset.getUTCDate()) {
            dailyPacksEarned = 0;
          }

          setCollection({
            cards: extracted.cards,
            availablePacks: extracted.availablePacks,
            packsOpened: extracted.packsOpened,
            lastDailyReset,
            dailyPacksEarned,
            confetti: extracted.confetti,
          });

          // Update the localStorage to match the database (one-way sync: DB -> LocalStorage)
          const cardsPayload = {
            availablePacks: extracted.availablePacks,
            packsOpened: extracted.packsOpened,
            dailyPacksEarned,
            lastDailyReset,
            confetti: extracted.confetti,
            cards: extracted.cards
          };
          localStorage.setItem('douzepoints_eurocards_collection', JSON.stringify(cardsPayload));
        }
      });
    });
    return () => {
      if (unsubscribe) unsubscribe();
      unsubAuth();
    };
  }, []);

  const addPack = async () => {
    await awardDailyPack();
  };

  const addCardsToCollection = async (newCards: OpenedCard[], earnedConfetti: number = 0, packCount: number = 1) => {
    if (collection.availablePacks < packCount) {
      throw new Error("Not enough packs available");
    }

    // 1. Update local collection and localStorage (works for both guests and logged-in users)
    const updatedCards = { ...(collection.cards || {}) };
    newCards.forEach(card => {
      updatedCards[card.songId] = { obtainedAt: Date.now() };
    });

    const nextCollection: UserCollection = {
      ...collection,
      availablePacks: Math.max(0, collection.availablePacks - packCount),
      packsOpened: (collection.packsOpened || 0) + packCount,
      confetti: (collection.confetti || 0) + earnedConfetti,
      cards: updatedCards
    };

    setCollection(nextCollection);
    localStorage.setItem('douzepoints_eurocards_collection', JSON.stringify(nextCollection));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('euro-collection-updated'));
    }

    // 2. If logged in with Google, also sync to Firestore
    if (canSyncToCloud() && auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const updates: DocumentData = {
        'collection.availablePacks': increment(-packCount),
        'collection.packsOpened': increment(packCount),
      };

      if (earnedConfetti > 0) {
        updates['collection.confetti'] = increment(earnedConfetti);
      }

      newCards.forEach(card => {
        updates[`collection.cards.${card.songId}.obtainedAt`] = Date.now();
      });

      await safeUpdateUserDoc(userRef, updates);
    }
  };

  const craftCard = async (songId: string, cost: number) => {
    if (collection.confetti < cost) {
      throw new Error("Not enough confetti");
    }

    // 1. Update local collection and localStorage
    const updatedCards = { ...(collection.cards || {}) };
    updatedCards[songId] = { obtainedAt: Date.now() };

    const nextCollection: UserCollection = {
      ...collection,
      confetti: Math.max(0, collection.confetti - cost),
      cards: updatedCards
    };

    setCollection(nextCollection);
    localStorage.setItem('douzepoints_eurocards_collection', JSON.stringify(nextCollection));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('euro-collection-updated'));
    }

    // 2. If logged in with Google, sync to Firestore
    if (canSyncToCloud() && auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const updates: DocumentData = {
        'collection.confetti': increment(-cost),
        [`collection.cards.${songId}.obtainedAt`]: Date.now()
      };

      await safeUpdateUserDoc(userRef, updates);
    }
  };

  return {
    collection,
    addPack,
    addCardsToCollection,
    craftCard,
  };
};
