import { doc, getDoc, increment, DocumentData } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { getActiveMasterData } from '../data/activeData';
import { MasterSong, CardRarity, OpenedCard, EuroCard } from '../data/types';
import { safeUpdateUserDoc } from './syncService';

export interface ExtractedEuroCollection {
  availablePacks: number;
  packsOpened: number;
  dailyPacksEarned: number;
  lastDailyReset: number;
  confetti: number;
  cards: Record<string, EuroCard>;
}

export const extractEuroCollectionData = (data: DocumentData | null | undefined): ExtractedEuroCollection => {
  if (!data || !data.collection || typeof data.collection !== 'object') {
    return {
      availablePacks: 0,
      packsOpened: 0,
      dailyPacksEarned: 0,
      lastDailyReset: Date.now(),
      confetti: 0,
      cards: {},
    };
  }

  const col = data.collection as Record<string, unknown>;
  return {
    availablePacks: Number(col.availablePacks || 0),
    packsOpened: Number(col.packsOpened || 0),
    dailyPacksEarned: Number(col.dailyPacksEarned || 0),
    lastDailyReset: Number(col.lastDailyReset || Date.now()),
    confetti: Number(col.confetti || 0),
    cards: (col.cards || {}) as Record<string, EuroCard>,
  };
};

export const getSongRarity = (song: MasterSong): CardRarity => song.rarity || CardRarity.COMMON;

// Memoize pools to avoid recalculating on every pack open, while supporting active data swaps
let cachedMasterDataRef: MasterSong[] | null = null;
let cachedRarityPools: Record<CardRarity, MasterSong[]> | null = null;

const getRarityPools = () => {
  const activeData = getActiveMasterData();
  if (cachedMasterDataRef === activeData && cachedRarityPools) {
    return cachedRarityPools;
  }
  
  const pools: Record<CardRarity, MasterSong[]> = {
    [CardRarity.LEGENDARY]: [],
    [CardRarity.RARE]: [],
    [CardRarity.UNCOMMON]: [],
    [CardRarity.COMMON]: [],
  };

  activeData.forEach((song) => {
    pools[song.rarity || CardRarity.COMMON].push(song);
  });

  cachedMasterDataRef = activeData;
  cachedRarityPools = pools;
  
  return pools;
};

export const openPack = (): OpenedCard[] => {
  const cards: OpenedCard[] = [];
  const packSize = 6;
  const pools = getRarityPools();

  for (let i = 0; i < packSize; i++) {
    const rand = Math.random();
    let rarity: CardRarity;
    
    if (rand < 0.60) {
      rarity = CardRarity.COMMON;
    } else if (rand < 0.88) {
      rarity = CardRarity.UNCOMMON;
    } else if (rand < 0.98) {
      rarity = CardRarity.RARE;
    } else {
      rarity = CardRarity.LEGENDARY;
    }
    
    const pool = pools[rarity];
    const selectedSong = pool[Math.floor(Math.random() * pool.length)];
    
    cards.push({
      songId: selectedSong.id,
      obtainedAt: Date.now() + i,
    });
  }
  
  return cards;
};

export const openMultiplePacks = (count: number = 1): OpenedCard[] => {
  const allCards: OpenedCard[] = [];
  for (let i = 0; i < count; i++) {
    allCards.push(...openPack());
  }
  return allCards;
};

export const awardDailyPack = async (): Promise<boolean> => {
  const DAILY_PACK_LIMIT = 10;
  
  const cachedStr = localStorage.getItem('douzepoints_eurocards_collection');
  let localCol = {
    availablePacks: 0,
    packsOpened: 0,
    dailyPacksEarned: 0,
    lastDailyReset: Date.now(),
    confetti: 0,
    cards: {}
  };

  if (cachedStr) {
    try {
      const parsed = JSON.parse(cachedStr);
      localCol = { ...localCol, ...parsed };
    } catch {
      // ignore JSON parse errors
    }
  }

  const now = new Date();
  const lastReset = new Date(localCol.lastDailyReset || 0);
  const isDifferentDay = now.getUTCFullYear() !== lastReset.getUTCFullYear() ||
                         now.getUTCMonth() !== lastReset.getUTCMonth() ||
                         now.getUTCDate() !== lastReset.getUTCDate();

  if (isDifferentDay) {
    localCol.dailyPacksEarned = 0;
    localCol.lastDailyReset = Date.now();
  }

  if (localCol.dailyPacksEarned >= DAILY_PACK_LIMIT) {
    if (isDifferentDay) {
      localStorage.setItem('douzepoints_eurocards_collection', JSON.stringify(localCol));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('euro-collection-updated'));
      }
    }
    return false;
  }

  localCol.availablePacks = (localCol.availablePacks || 0) + 1;
  localCol.dailyPacksEarned = (localCol.dailyPacksEarned || 0) + 1;
  localCol.lastDailyReset = Date.now();

  localStorage.setItem('douzepoints_eurocards_collection', JSON.stringify(localCol));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('euro-collection-updated'));
  }

  if (auth.currentUser) {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    try {
      await safeUpdateUserDoc(userRef, {
        'collection.availablePacks': increment(1),
        'collection.dailyPacksEarned': localCol.dailyPacksEarned,
        'collection.lastDailyReset': localCol.lastDailyReset
      });
    } catch (error) {
      console.error("Failed to sync awarded pack to Firestore:", error);
    }
  }

  return true;
};

export const getDailyPacksEarned = (): number => {
  const cachedStr = localStorage.getItem('douzepoints_eurocards_collection');
  if (!cachedStr) return 0;
  try {
    const localCol = JSON.parse(cachedStr);
    const now = new Date();
    const lastReset = new Date(localCol.lastDailyReset || 0);
    const isDifferentDay = now.getUTCFullYear() !== lastReset.getUTCFullYear() ||
                           now.getUTCMonth() !== lastReset.getUTCMonth() ||
                           now.getUTCDate() !== lastReset.getUTCDate();
    if (isDifferentDay) return 0;
    return Number(localCol.dailyPacksEarned || 0);
  } catch {
    return 0;
  }
};

export const isDailyPackCapReached = (): boolean => {
  return getDailyPacksEarned() >= 10;
};
