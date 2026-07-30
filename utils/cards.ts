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
  if (!auth.currentUser) return false;
  
  const userRef = doc(db, 'users', auth.currentUser.uid);
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
  
  if (dailyPacksEarned >= DAILY_PACK_LIMIT) {
    return false;
  }
  
  try {
    const updates: DocumentData = {
      'collection.availablePacks': increment(1),
      'collection.dailyPacksEarned': dailyPacksEarned + 1,
      'collection.lastDailyReset': Date.now()
    };
    await safeUpdateUserDoc(userRef, updates);
    return true;
  } catch (error) {
    console.error("Failed to award pack:", error);
    return false;
  }
};
