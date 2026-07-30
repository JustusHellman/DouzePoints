import { doc, getDoc, setDoc, updateDoc, writeBatch, serverTimestamp, increment, DocumentData, DocumentReference } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { getStoredStats, initialGlobalStats } from './stats';
import { GlobalStats } from '../data/types';
import { extractEuroCollectionData } from './cards';

export const removeUndefined = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(removeUndefined) as unknown as T;
  }
  if (Object.prototype.toString.call(obj) === '[object Object]' && (!obj.constructor || obj.constructor.name === 'Object')) {
    const cleaned: Record<string, unknown> = {};
    for (const key of Object.keys(obj)) {
      const val = (obj as Record<string, unknown>)[key];
      if (val !== undefined) {
        cleaned[key] = removeUndefined(val);
      }
    }
    return cleaned as T;
  }
  return obj;
};

export const safeUpdateUserDoc = async (userRef: DocumentReference, updates: DocumentData) => {
  try {
    const cleanedUpdates = removeUndefined(updates);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      const globalStats = getStoredStats();
      const userData = removeUndefined({
        totalPoints: globalStats.totalPoints || 0,
        totalDouzePoints: globalStats.totalDouzePoints || 0,
        stats: {
          word_game: globalStats.word_game || initialGlobalStats.word_game,
          artists: globalStats.artists || initialGlobalStats.artists,
          links: globalStats.links || initialGlobalStats.links,
          guesser: globalStats.guesser || initialGlobalStats.guesser,
          arena: globalStats.arena || initialGlobalStats.arena,
          refrain: globalStats.refrain || initialGlobalStats.refrain,
        },
        infinite_records: {},
        collection: {
          availablePacks: 0,
          packsOpened: 0,
          lastDailyReset: Date.now(),
          dailyPacksEarned: 0,
          confetti: 0,
          cards: {}
        },
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      });
      await setDoc(userRef, userData);
    }
    await updateDoc(userRef, cleanedUpdates);
  } catch (e) {
    console.error("Failed to update user document in Firestore:", e);
  }
};

export const migrateUserToFirestore = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return; // Already migrated or has existing data
  }

  const batch = writeBatch(db);
  
  // 1. Global Stats
  const globalStats = getStoredStats();

  // 2. Infinite Records
  const infiniteRecordsData = localStorage.getItem('euro-infinite-records');
  let infiniteRecords = {};
  if (infiniteRecordsData) {
    try {
      infiniteRecords = JSON.parse(infiniteRecordsData);
    } catch (e) {
      console.error(e);
    }
  }

  // 3. Collection Data - New accounts start with an empty card collection
  const collectionData = {
    availablePacks: 0,
    packsOpened: 0,
    lastDailyReset: Date.now(),
    dailyPacksEarned: 0,
    confetti: 0,
    cards: {}
  };

  // Format schema properly with full baseline maps
  const userData = removeUndefined({
    totalPoints: globalStats.totalPoints || 0,
    totalDouzePoints: globalStats.totalDouzePoints || 0,
    stats: {
      word_game: globalStats.word_game || initialGlobalStats.word_game,
      artists: globalStats.artists || initialGlobalStats.artists,
      links: globalStats.links || initialGlobalStats.links,
      guesser: globalStats.guesser || initialGlobalStats.guesser,
      arena: globalStats.arena || initialGlobalStats.arena,
      refrain: globalStats.refrain || initialGlobalStats.refrain,
    },
    infinite_records: infiniteRecords,
    collection: collectionData,
    createdAt: serverTimestamp(),
    lastUpdated: serverTimestamp()
  });
  batch.set(userRef, userData);
  await batch.commit();
  console.log('Migration to Firestore complete');
};

export const syncStatsToFirestore = async (newStats: GlobalStats) => {
  if (!auth.currentUser) return;
  const userRef = doc(db, 'users', auth.currentUser.uid);
  const updates: DocumentData = { 
    totalPoints: newStats.totalPoints,
    totalDouzePoints: newStats.totalDouzePoints,
    'stats.word_game': newStats.word_game,
    'stats.artists': newStats.artists,
    'stats.links': newStats.links,
    'stats.guesser': newStats.guesser,
    'stats.arena': newStats.arena,
    'stats.refrain': newStats.refrain,
    lastUpdated: serverTimestamp() 
  };
  await safeUpdateUserDoc(userRef, updates);
};

export const syncDailyStateToFirestore = async (...args: unknown[]) => {
  if (args.length > 0) {
    // Intentionally left blank - daily progress can be cached locally or is handled in stats
  }
};

export const syncInfiniteRecordsToFirestore = async (records: Record<string, { bestScore: number; bestStreak: number; mastered?: boolean }>) => {
  if (!auth.currentUser) return;
  const userRef = doc(db, 'users', auth.currentUser.uid);
  const updates: DocumentData = {
    lastUpdated: serverTimestamp()
  };
  Object.keys(records).forEach(key => {
     updates[`infinite_records.${key}`] = {
       bestScore: records[key].bestScore,
       bestStreak: records[key].bestStreak,
       mastered: records[key].mastered
     };
  });
  await safeUpdateUserDoc(userRef, updates);
};

export const syncGameResultToFirestore = async (newStats: GlobalStats, shouldAwardPack: boolean) => {
  if (!auth.currentUser) return;
  const userRef = doc(db, 'users', auth.currentUser.uid);

  const updates: DocumentData = {
    totalPoints: newStats.totalPoints,
    totalDouzePoints: newStats.totalDouzePoints,
    'stats.word_game': newStats.word_game,
    'stats.artists': newStats.artists,
    'stats.links': newStats.links,
    'stats.guesser': newStats.guesser,
    'stats.arena': newStats.arena,
    'stats.refrain': newStats.refrain,
    lastUpdated: serverTimestamp() 
  };
  
  if (shouldAwardPack) {
    try {
      const userDoc = await getDoc(userRef);
      let dailyPacksEarned = 0;
      let lastDailyReset = 0;
      
      if (userDoc.exists()) {
        const extracted = extractEuroCollectionData(userDoc.data());
        dailyPacksEarned = extracted.dailyPacksEarned;
        lastDailyReset = extracted.lastDailyReset;
      }
      
      const now = new Date();
      const lastReset = new Date(lastDailyReset);
      
      if (now.getUTCFullYear() !== lastReset.getUTCFullYear() ||
          now.getUTCMonth() !== lastReset.getUTCMonth() ||
          now.getUTCDate() !== lastReset.getUTCDate()) {
        dailyPacksEarned = 0;
      }
      
      if (dailyPacksEarned < 6) {
        updates['collection.availablePacks'] = increment(1);
        updates['collection.dailyPacksEarned'] = dailyPacksEarned + 1;
        updates['collection.lastDailyReset'] = Date.now();
      }
    } catch (e) {
      console.error("Error fetching user doc for pack reward:", e);
    }
  }

  await safeUpdateUserDoc(userRef, updates);
};
