import { useState, useEffect } from 'react';
import { UserCollection, OpenedCard, CardRarity } from '../data/types';
import { doc, onSnapshot, increment, DocumentData } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import { extractEuroCollectionData } from '../utils/cards';
import { safeUpdateUserDoc } from '../utils/syncService';

const DAILY_PACK_LIMIT = 6;

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

  useEffect(() => {
    let unsubscribe: () => void;
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const userRef = doc(db, 'users', user.uid);
      if (unsubscribe) unsubscribe();
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
    if (!auth.currentUser) return;
    if (collection.dailyPacksEarned >= DAILY_PACK_LIMIT) return;
    
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await safeUpdateUserDoc(userRef, {
      'collection.availablePacks': increment(1),
      'collection.dailyPacksEarned': increment(1),
      'collection.lastDailyReset': Date.now()
    });
  };

  const addCardsToCollection = async (newCards: OpenedCard[], earnedConfetti: number = 0, packCount: number = 1) => {
    if (!auth.currentUser) return;
    if (collection.availablePacks < packCount) {
      throw new Error("Not enough packs available");
    }

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
  };

  const craftCard = async (songId: string, cost: number) => {
    if (!auth.currentUser) return;
    if (collection.confetti < cost) {
      throw new Error("Not enough confetti");
    }

    const userRef = doc(db, 'users', auth.currentUser.uid);
    const updates: DocumentData = {
      'collection.confetti': increment(-cost),
      [`collection.cards.${songId}.obtainedAt`]: Date.now()
    };

    await safeUpdateUserDoc(userRef, updates);
  };

  return {
    collection,
    addPack,
    addCardsToCollection,
    craftCard,
  };
};
