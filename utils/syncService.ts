import { doc, getDoc, setDoc, updateDoc, writeBatch, serverTimestamp, increment, DocumentData, DocumentReference } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { getStoredStats, initialGlobalStats, sanitizeDetailedStats, mergeGlobalStats } from './stats';
import { getDayString } from './daily';
import { GlobalStats } from '../data/types';
import { extractEuroCollectionData } from './cards';

export const clearAllUserDataOnLogout = () => {
  if (typeof window === 'undefined') return;

  // Preserve user device preferences (language and audio mute)
  const preservedLang = localStorage.getItem('euro-lang');
  const preservedMuted = localStorage.getItem('douze_points_muted');

  // Clear all localStorage so no lingering account stats, packs, cards, streaks, or puzzles remain
  localStorage.clear();

  // Restore user device preferences
  if (preservedLang) {
    localStorage.setItem('euro-lang', preservedLang);
  }
  if (preservedMuted) {
    localStorage.setItem('douze_points_muted', preservedMuted);
  }

  // Reset avatar to clean default
  localStorage.setItem('douze_points_avatar', 'avatar_1');
};

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

export const canSyncToCloud = (): boolean => {
  return !!(auth.currentUser && !auth.currentUser.isAnonymous);
};

export const safeUpdateUserDoc = async (userRef: DocumentReference, updates: DocumentData) => {
  if (!canSyncToCloud()) return;
  try {
    const cleanedUpdates = removeUndefined(updates);
    await updateDoc(userRef, { ...cleanedUpdates, lastUpdated: serverTimestamp() });
  } catch (e: unknown) {
    const err = e as { code?: string; message?: string };
    if (err?.code === 'not-found' || err?.message?.includes('No document to update')) {
      if (auth.currentUser) {
        await migrateUserToFirestore(auth.currentUser.uid);
      }
    } else {
      console.error("Failed to update user document in Firestore:", e);
    }
  }
};

const migrationInFlight = new Map<string, Promise<void>>();

export const migrateUserToFirestore = async (userId: string): Promise<void> => {
  if (!userId || !canSyncToCloud()) return;
  const existing = migrationInFlight.get(userId);
  if (existing) {
    return existing;
  }

  const promise = (async () => {
    try {
      await performMigrateUserToFirestore(userId);
    } finally {
      migrationInFlight.delete(userId);
    }
  })();

  migrationInFlight.set(userId, promise);
  return promise;
};

const performMigrateUserToFirestore = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    // Sequential login to an existing profile:
    // - Avatar: The CLOUD profile avatar is authoritative across devices and syncs to local.
    // - Cards: We take the union of cards (max unique cards preserved so guest unlocks aren't lost).
    // - Confetti & Packs Opened: Math.max(cloud, local).
    // - Available Packs: Authoritatively from the cloud (never farmed/duplicated from incognito sessions).
    // - Stats & Infinite Records: Math.max resolution across all metrics.
    const data = userDoc.data();
    const updates: DocumentData = {};
    let needsUpdate = false;

    // 1. Sync Avatar:
    // On a second device, the cloud profile avatar is chosen and updates the local device!
    if (data.avatarId) {
      if (typeof window !== 'undefined') {
        const currentLocal = localStorage.getItem('douze_points_avatar');
        if (currentLocal !== data.avatarId) {
          localStorage.setItem('douze_points_avatar', data.avatarId);
          window.dispatchEvent(new Event('euro-avatar-updated'));
        }
      }
    } else {
      // If cloud account had no avatar set yet, adopt the local avatar
      const localAvatar = typeof window !== 'undefined' ? localStorage.getItem('douze_points_avatar') : null;
      if (localAvatar) {
        updates.avatarId = localAvatar;
        needsUpdate = true;
      }
    }

    // 2. Sync email and displayName if available from auth
    if (auth.currentUser?.email && data.email !== auth.currentUser.email) {
      updates.email = auth.currentUser.email;
      needsUpdate = true;
    }
    if (auth.currentUser?.displayName && data.displayName !== auth.currentUser.displayName) {
      updates.displayName = auth.currentUser.displayName;
      needsUpdate = true;
    }

    // 3. Stats ("Dominant Career Bundle" rule based on total gamesPlayed)
    const currentLocalStats = getStoredStats();
    const cloudStats: GlobalStats = {
      word_game: sanitizeDetailedStats(data.stats?.word_game || data.stats?.wordle),
      artists: sanitizeDetailedStats(data.stats?.artists),
      links: sanitizeDetailedStats(data.stats?.links || data.stats?.linksgame),
      guesser: sanitizeDetailedStats(data.stats?.guesser),
      arena: sanitizeDetailedStats(data.stats?.arena),
      refrain: sanitizeDetailedStats(data.stats?.refrain),
      totalPoints: Number(data.totalPoints) || 0,
      totalDouzePoints: Number(data.totalDouzePoints) || 0
    };
    const dominantStats = mergeGlobalStats(currentLocalStats, cloudStats);

    if (
      dominantStats.totalPoints > cloudStats.totalPoints ||
      dominantStats.totalDouzePoints > cloudStats.totalDouzePoints ||
      JSON.stringify(dominantStats) !== JSON.stringify(cloudStats)
    ) {
      updates.totalPoints = dominantStats.totalPoints;
      updates.totalDouzePoints = dominantStats.totalDouzePoints;
      updates['stats.word_game'] = dominantStats.word_game;
      updates['stats.artists'] = dominantStats.artists;
      updates['stats.links'] = dominantStats.links;
      updates['stats.guesser'] = dominantStats.guesser;
      updates['stats.arena'] = dominantStats.arena;
      updates['stats.refrain'] = dominantStats.refrain;
      needsUpdate = true;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('euro-stats-v2', JSON.stringify(dominantStats));
      window.dispatchEvent(new Event('euro-stats-updated'));

      // Reconcile daily game storage keys:
      // The dominant stats determine whether today's games have been played!
      const today = getDayString();
      const dailyGameConfigs = [
        { key: 'word_game' as const, prefix: 'eurosong' },
        { key: 'artists' as const, prefix: 'euroartist' },
        { key: 'links' as const, prefix: 'eurolinks' },
        { key: 'guesser' as const, prefix: 'euroguess' },
        { key: 'arena' as const, prefix: 'euroarena' },
        { key: 'refrain' as const, prefix: 'eurorefrain' },
      ];

      dailyGameConfigs.forEach(({ key, prefix }) => {
        const gameStats = dominantStats[key];
        const storageKey = `${prefix}-${today}`;
        if (gameStats?.lastPlayed === today && gameStats?.dailyCompletion) {
          // Dominant profile HAS played today: Ensure local storage reflects this completion
          const comp = gameStats.dailyCompletion;
          let payload: any = { isGameOver: true, won: comp.won };
          if (prefix === 'eurosong' || prefix === 'euroartist') {
            payload.guesses = comp.guesses || [];
          } else if (prefix === 'eurolinks' || prefix === 'eurorefrain') {
            payload.mistakes = comp.mistakes || 0;
            payload.completedGroups = comp.won ? [0, 1, 2, 3] : [];
          } else if (prefix === 'euroguess') {
            payload.attempts = comp.guesses || [];
            payload.revealedHints = 6;
          } else if (prefix === 'euroarena') {
            payload.guesses = comp.guesses || [];
          }
          localStorage.setItem(storageKey, JSON.stringify(payload));
        } else {
          // Dominant profile has NOT played today: Remove any secondary game state
          localStorage.removeItem(storageKey);
        }
      });
    }

    // 4. Infinite Records ("Max" resolution rule)
    const localRecordsStr = typeof window !== 'undefined' ? localStorage.getItem('euro-infinite-records') : null;
    let localRecords: Record<string, { bestScore?: number; bestStreak?: number; mastered?: boolean }> = {};
    if (localRecordsStr) {
      try { localRecords = JSON.parse(localRecordsStr); } catch { /* ignore */ }
    }
    const cloudRecords = (data.infinite_records || {}) as Record<string, { bestScore?: number; bestStreak?: number; mastered?: boolean }>;
    const mergedRecords: Record<string, { bestScore: number; bestStreak: number; mastered?: boolean }> = { ...cloudRecords } as any;
    let recordsNeedUpdate = false;

    const allInfiniteKeys = Array.from(new Set([...Object.keys(cloudRecords), ...Object.keys(localRecords)]));

    allInfiniteKeys.forEach(key => {
      const localRec = localRecords[key] || {};
      const cloudRec = cloudRecords[key] || {};
      const bestScore = Math.max(Number(localRec.bestScore) || 0, Number(cloudRec.bestScore) || 0);
      const bestStreak = Math.max(Number(localRec.bestStreak) || 0, Number(cloudRec.bestStreak) || 0);
      const mastered = Boolean(localRec.mastered || cloudRec.mastered);

      if (
        bestScore > (Number(cloudRec.bestScore) || 0) || 
        bestStreak > (Number(cloudRec.bestStreak) || 0) || 
        (mastered && !cloudRec.mastered)
      ) {
        recordsNeedUpdate = true;
      }
      mergedRecords[key] = { bestScore, bestStreak, mastered };
    });

    if (recordsNeedUpdate) {
      Object.keys(mergedRecords).forEach(key => {
        updates[`infinite_records.${key}`] = mergedRecords[key];
      });
      needsUpdate = true;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('euro-infinite-records', JSON.stringify(mergedRecords));
    }

    // 5. CARDS & COLLECTION ("Dominant Collection" Rule):
    // Count total unique cards in each environment:
    // - If local has MORE cards than cloud (e.g. guest played extensively on this device before linking),
    //   local cards take dominance and update the cloud.
    // - If cloud has >= local cards (e.g. incognito window or second device with fewer cards),
    //   cloud cards take dominance and override local, strictly preventing card farming!
    const cloudCol = extractEuroCollectionData(data);
    let localCol = {
      availablePacks: 0,
      packsOpened: 0,
      lastDailyReset: Date.now(),
      dailyPacksEarned: 0,
      confetti: 0,
      cards: {} as Record<string, any>
    };
    const cachedColStr = typeof window !== 'undefined' ? localStorage.getItem('douzepoints_eurocards_collection') : null;
    if (cachedColStr) {
      try { localCol = JSON.parse(cachedColStr); } catch { /* ignore */ }
    }

    const localCardCount = Object.keys(localCol.cards || {}).length;
    const cloudCardCount = Object.keys(cloudCol.cards || {}).length;

    let dominantCards = cloudCol.cards || {};
    if (localCardCount > cloudCardCount) {
      dominantCards = localCol.cards;
      updates['collection.cards'] = localCol.cards;
      needsUpdate = true;
    }

    const mergedConfetti = Math.max(cloudCol.confetti || 0, localCol.confetti || 0);
    if (mergedConfetti > (cloudCol.confetti || 0)) {
      updates['collection.confetti'] = mergedConfetti;
      needsUpdate = true;
    }

    const mergedPacksOpened = Math.max(cloudCol.packsOpened || 0, localCol.packsOpened || 0);
    if (mergedPacksOpened > (cloudCol.packsOpened || 0)) {
      updates['collection.packsOpened'] = mergedPacksOpened;
      needsUpdate = true;
    }

    // Available packs on sequential login strictly match cloud (no pack farming)
    const finalCollection = {
      availablePacks: cloudCol.availablePacks,
      packsOpened: mergedPacksOpened,
      dailyPacksEarned: cloudCol.dailyPacksEarned,
      lastDailyReset: cloudCol.lastDailyReset,
      confetti: mergedConfetti,
      cards: dominantCards
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('douzepoints_eurocards_collection', JSON.stringify(finalCollection));
      window.dispatchEvent(new Event('euro-collection-updated'));
    }

    if (needsUpdate) {
      updates.lastUpdated = serverTimestamp();
      await updateDoc(userRef, updates);
    }
    return;
  }

  // First-time profile creation:
  // Players keep the packs, cards, and stats they earned as a guest prior to creating their account!
  const batch = writeBatch(db);
  
  // 1. Global Stats
  const globalStats = getStoredStats();

  // 2. Infinite Records
  const infiniteRecordsData = typeof window !== 'undefined' ? localStorage.getItem('euro-infinite-records') : null;
  let infiniteRecords = {};
  if (infiniteRecordsData) {
    try {
      infiniteRecords = JSON.parse(infiniteRecordsData);
    } catch (e) {
      console.error(e);
    }
  }

  // 3. Collection Data - New accounts keep their guest collection and packs on first creation
  let collectionData = {
    availablePacks: 0,
    packsOpened: 0,
    lastDailyReset: Date.now(),
    dailyPacksEarned: 0,
    confetti: 0,
    cards: {}
  };
  const cachedCollection = typeof window !== 'undefined' ? localStorage.getItem('douzepoints_eurocards_collection') : null;
  if (cachedCollection) {
    try {
      const parsed = JSON.parse(cachedCollection);
      collectionData = {
        availablePacks: Number(parsed.availablePacks) || 0,
        packsOpened: Number(parsed.packsOpened) || 0,
        lastDailyReset: Number(parsed.lastDailyReset) || Date.now(),
        dailyPacksEarned: Number(parsed.dailyPacksEarned) || 0,
        confetti: Number(parsed.confetti) || 0,
        cards: parsed.cards || {}
      };
    } catch (e) {
      console.error("Failed to parse cached collection for initial profile:", e);
    }
  }

  const localAvatar = typeof window !== 'undefined' ? (localStorage.getItem('douze_points_avatar') || 'avatar_1') : 'avatar_1';

  // Format schema properly with full baseline maps
  const userData = removeUndefined({
    email: auth.currentUser?.email || null,
    displayName: auth.currentUser?.displayName || null,
    avatarId: localAvatar,
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

export const syncAvatarToFirestore = async (avatarId: string) => {
  if (!canSyncToCloud()) return;
  const userRef = doc(db, 'users', auth.currentUser!.uid);
  await safeUpdateUserDoc(userRef, { avatarId });
};

export const syncStatsToFirestore = async (newStats: GlobalStats) => {
  if (!canSyncToCloud()) return;
  const userRef = doc(db, 'users', auth.currentUser!.uid);
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
  if (!canSyncToCloud()) return;
  const userRef = doc(db, 'users', auth.currentUser!.uid);
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
  if (!canSyncToCloud()) return;
  const userRef = doc(db, 'users', auth.currentUser!.uid);

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
      
      if (dailyPacksEarned < 10) {
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
