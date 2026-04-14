import { LINKS_CATEGORIES, LinkSubCategory } from '../data/linksCategories.ts';
import { ConnectionsGroup } from '../data/types.ts';
import { FEATURE_FLAGS } from '../config/featureFlags.ts';
import { PUZZLES as LEGACY_PUZZLES } from '../data/linksgameData.ts';
import { getDailyIndex, getDayString } from './daily.ts';

// Simple seedable random number generator
class SeededRandom {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed;
  }
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i);
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
}

const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};

export const generateEuroLinksPuzzleFromData = (rng: SeededRandom, isLegacyFallback: boolean = true): ConnectionsGroup[] => {
  // 1. Pick a main category
  const mainIdx = rng.nextInt(0, LINKS_CATEGORIES.length - 1);
  const mainCat = LINKS_CATEGORIES[mainIdx];

  // 2. Filter sub-categories that have at least 4 items
  const validSubs = mainCat.subs.filter((s: LinkSubCategory) => s.items.length >= 4);

  if (validSubs.length < 4) {
    if (isLegacyFallback) {
      const idx = rng.nextInt(0, LEGACY_PUZZLES.length - 1);
      return LEGACY_PUZZLES[idx];
    }
    return [];
  }

  // 3. Pick 4 sub-categories
  const shuffledSubs = rng.shuffle(validSubs);
  const selectedSubs: LinkSubCategory[] = [];
  const usedItems = new Set<string>();

  for (const sub of shuffledSubs) {
    const subItems = new Set(sub.items.map(i => i.toUpperCase()));
    let hasOverlap = false;
    for (const item of subItems) {
      if (usedItems.has(item)) {
        hasOverlap = true;
        break;
      }
    }

    if (!hasOverlap) {
      selectedSubs.push(sub);
      subItems.forEach(item => usedItems.add(item));
    }

    if (selectedSubs.length === 4) break;
  }

  if (selectedSubs.length < 4) {
    if (isLegacyFallback) {
      const idx = rng.nextInt(0, LEGACY_PUZZLES.length - 1);
      return LEGACY_PUZZLES[idx];
    }
    return [];
  }

  // 4. Randomly pick 4 items from each sub-category and assign difficulty
  const difficulties: ('easy' | 'medium' | 'hard' | 'expert')[] = ['easy', 'medium', 'hard', 'expert'];
  
  return selectedSubs.map((sub, idx) => {
    const shuffledItems = rng.shuffle(sub.items);
    return {
      category: sub.name,
      items: shuffledItems.slice(0, 4).map(i => i.toUpperCase()),
      difficulty: difficulties[idx]
    };
  });
};

export const getEuroLinksPuzzle = (dateStr?: string): ConnectionsGroup[] => {
  const currentDayStr = dateStr || getDayString();
  const now = new Date().getTime();
  
  // Check feature flag
  if (now < FEATURE_FLAGS.NEW_LINKS_DATA_SWAP_TIMESTAMP) {
    const idx = getDailyIndex(LEGACY_PUZZLES, "eurolinks", currentDayStr);
    return LEGACY_PUZZLES[idx];
  }

  const seed = hashCode(currentDayStr + "eurolinks-v2");
  const rng = new SeededRandom(seed);

  // 1. Pick a main category, ensuring it's not the same as yesterday
  const yesterday = new Date(new Date(currentDayStr).getTime() - 86400000);
  const yesterdayStr = getDayString(yesterday);
  const yesterdaySeed = hashCode(yesterdayStr + "eurolinks-v2");
  const yesterdayRng = new SeededRandom(yesterdaySeed);
  const yesterdayMainIdx = yesterdayRng.nextInt(0, LINKS_CATEGORIES.length - 1);

  let mainIdx = rng.nextInt(0, LINKS_CATEGORIES.length - 1);
  if (LINKS_CATEGORIES.length > 1 && mainIdx === yesterdayMainIdx) {
    mainIdx = (mainIdx + 1) % LINKS_CATEGORIES.length;
  }
  
  // We can't easily use generateEuroLinksPuzzleFromData here because of the yesterdayMainIdx check
  // So we'll keep the logic mostly as is but maybe refactor the core selection
  
  const mainCat = LINKS_CATEGORIES[mainIdx];
  const validSubs = mainCat.subs.filter((s: LinkSubCategory) => s.items.length >= 4);

  if (validSubs.length < 4) {
    const idx = getDailyIndex(LEGACY_PUZZLES, "eurolinks", currentDayStr);
    return LEGACY_PUZZLES[idx];
  }

  const shuffledSubs = rng.shuffle(validSubs);
  const selectedSubs: LinkSubCategory[] = [];
  const usedItems = new Set<string>();

  for (const sub of shuffledSubs) {
    const subItems = new Set(sub.items.map(i => i.toUpperCase()));
    let hasOverlap = false;
    for (const item of subItems) {
      if (usedItems.has(item)) {
        hasOverlap = true;
        break;
      }
    }

    if (!hasOverlap) {
      selectedSubs.push(sub);
      subItems.forEach(item => usedItems.add(item));
    }

    if (selectedSubs.length === 4) break;
  }

  if (selectedSubs.length < 4) {
    const idx = getDailyIndex(LEGACY_PUZZLES, "eurolinks", currentDayStr);
    return LEGACY_PUZZLES[idx];
  }

  const difficulties: ('easy' | 'medium' | 'hard' | 'expert')[] = ['easy', 'medium', 'hard', 'expert'];
  
  return selectedSubs.map((sub, idx) => {
    const shuffledItems = rng.shuffle(sub.items);
    return {
      category: sub.name,
      items: shuffledItems.slice(0, 4).map(i => i.toUpperCase()),
      difficulty: difficulties[idx]
    };
  });
};

export const generateRandomEuroLinksPuzzle = (): ConnectionsGroup[] => {
  const seed = Math.floor(Math.random() * 1000000);
  const rng = new SeededRandom(seed);
  return generateEuroLinksPuzzleFromData(rng);
};
