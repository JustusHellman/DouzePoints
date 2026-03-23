import { MasterSong, InfinitePlacement, InfiniteYear, InfiniteDifficulty, InfiniteGameState, InfiniteRecords, LyricSnippet } from '../data/types.ts';
import { getActiveMasterData } from '../data/activeData.ts';

const INFINITE_STATE_KEY_PREFIX = 'euro-infinite-state-';
const INFINITE_RECORDS_KEY = 'euro-infinite-records';

export const serializeDifficulty = (difficulty: InfiniteDifficulty): string => {
  return `${difficulty.placement}_${difficulty.year}`;
};

const filterByPlacement = (songs: MasterSong[], placement: InfinitePlacement): MasterSong[] => {
  switch (placement) {
    case InfinitePlacement.WINNERS:
      return songs.filter(s => s.placing === 1);
    case InfinitePlacement.TOP3:
      return songs.filter(s => s.placing <= 3);
    case InfinitePlacement.TOP5:
      return songs.filter(s => s.placing <= 5);
    case InfinitePlacement.TOP10:
      return songs.filter(s => s.placing <= 10);
    case InfinitePlacement.TOP15:
      return songs.filter(s => s.placing <= 15);
    case InfinitePlacement.FINALISTS:
      // Finalists are defined as entries with a placement of 99 or lower.
      return songs.filter(s => s.placing <= 99);
    case InfinitePlacement.ALL:
    default:
      return songs;
  }
};

const filterByYear = (songs: MasterSong[], year: InfiniteYear): MasterSong[] => {
  switch (year) {
    case InfiniteYear.Y2021:
      return songs.filter(s => s.year >= 2021);
    case InfiniteYear.Y2010:
      return songs.filter(s => s.year >= 2010);
    case InfiniteYear.Y2000:
      return songs.filter(s => s.year >= 2000);
    case InfiniteYear.Y1956:
      return songs.filter(s => s.year >= 1956 && s.year <= 1999);
    case InfiniteYear.ALL:
    default:
      return songs;
  }
};

export const getInfiniteDifficultyPool = (difficulty: InfiniteDifficulty): MasterSong[] => {
  let pool = getActiveMasterData();
  pool = filterByPlacement(pool, difficulty.placement);
  pool = filterByYear(pool, difficulty.year);
  return pool;
};

export const filterLyricPoolByDifficulty = (pool: LyricSnippet[], difficulty: InfiniteDifficulty): LyricSnippet[] => {
  const allData = getActiveMasterData();
  const songPool = getInfiniteDifficultyPool(difficulty);
  const songIds = new Set(songPool.map(s => s.id));
  
  return pool.filter(item => {
    const song = allData.find(s => s.title === item.title && s.artist === item.artist);
    return song && songIds.has(song.id);
  });
};

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const getInfiniteGameState = (gameId: string, difficulty: InfiniteDifficulty): InfiniteGameState | null => {
  const key = `${INFINITE_STATE_KEY_PREFIX}${gameId}-${serializeDifficulty(difficulty)}`;
  const saved = localStorage.getItem(key);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as InfiniteGameState;
  } catch {
    return null;
  }
};

export const saveInfiniteGameState = (gameId: string, difficulty: InfiniteDifficulty, state: InfiniteGameState) => {
  const key = `${INFINITE_STATE_KEY_PREFIX}${gameId}-${serializeDifficulty(difficulty)}`;
  localStorage.setItem(key, JSON.stringify(state));
};

export const clearInfiniteGameState = (gameId: string, difficulty: InfiniteDifficulty) => {
  const key = `${INFINITE_STATE_KEY_PREFIX}${gameId}-${serializeDifficulty(difficulty)}`;
  localStorage.removeItem(key);
};

export const getInfiniteRecords = (): InfiniteRecords => {
  const saved = localStorage.getItem(INFINITE_RECORDS_KEY);
  if (!saved) return {};
  try {
    return JSON.parse(saved) as InfiniteRecords;
  } catch {
    return {};
  }
};

export const saveInfiniteRecord = (gameId: string, difficulty: InfiniteDifficulty, score: number, streak: number, mastered: boolean = false) => {
  const records = getInfiniteRecords();
  const key = `${gameId}_${serializeDifficulty(difficulty)}`;
  const current = records[key] || { bestScore: 0, bestStreak: 0, mastered: false };
  
  records[key] = {
    bestScore: Math.max(current.bestScore, score),
    bestStreak: Math.max(current.bestStreak, streak),
    mastered: current.mastered || mastered
  };
  
  localStorage.setItem(INFINITE_RECORDS_KEY, JSON.stringify(records));
};

export const clearAllInfiniteData = () => {
  // Remove all infinite related keys (state, records, settings)
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('euro-infinite-')) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

export const startNewInfiniteGame = (gameId: string, difficulty: InfiniteDifficulty, customPool?: { id: string }[]): InfiniteGameState => {
  const pool = customPool || getInfiniteDifficultyPool(difficulty);
  // Force a re-shuffle by using a more robust approach if needed, 
  // but the existing shuffleArray is actually Fisher-Yates.
  // Let's ensure we are not accidentally using a cached pool.
  const shuffledIds = shuffleArray(pool.map(s => s.id));
  
  const newState: InfiniteGameState = {
    currentScore: 0,
    currentStreak: 0,
    shuffledIds,
    currentIndex: 0,
    isGameOver: false,
    guesses: []
  };
  
  saveInfiniteGameState(gameId, difficulty, newState);
  return newState;
};

export const getNextInfiniteSongId = (state: InfiniteGameState): string | null => {
  if (state.currentIndex >= state.shuffledIds.length) return null;
  return state.shuffledIds[state.currentIndex];
};

/**
 * Advances the infinite game state to the next item.
 * @param gameId The ID of the game (e.g., 'eurosong', 'euroarena')
 * @param difficulty The selected difficulty
 * @param state The current infinite game state
 * @param points Points earned in this round
 * @param won Whether the round was won
 */
export const isInfinitePoolExhausted = (state: InfiniteGameState): boolean => {
  if (!state || !state.shuffledIds) return false;
  return state.currentIndex >= state.shuffledIds.length;
};

export const advanceInfiniteGame = (
  gameId: string, 
  difficulty: InfiniteDifficulty, 
  state: InfiniteGameState, 
  points: number,
  won: boolean
): InfiniteGameState => {
  if (state.currentIndex >= state.shuffledIds.length) {
    return state;
  }

  const nextIndex = state.currentIndex + 1;
  const newScore = state.currentScore + points;
  const newStreak = won ? state.currentStreak + 1 : 0;
  
  const newState: InfiniteGameState = {
    ...state,
    currentScore: newScore,
    currentStreak: newStreak,
    currentIndex: nextIndex,
    guesses: [], // Reset guesses for next round
    lastResult: { won, points },
    isGameOver: false
  };

  if (!won || nextIndex >= state.shuffledIds.length) {
    // Finished all items in the pool or lost!
    newState.isGameOver = true;
    const isMastered = nextIndex >= state.shuffledIds.length && won;
    saveInfiniteRecord(gameId, difficulty, newScore, newStreak, isMastered);
  }

  saveInfiniteGameState(gameId, difficulty, newState);
  return newState;
};
