import { GlobalStats, DetailedStats, GameType } from '../data/types.ts';
import { getDayString } from './daily.ts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDailyGameState = (config: any, today: string) => {
  const saved = localStorage.getItem(`${config.storageKey}-${today}`);
  let dailyData = null;
  if (saved) {
    try {
      dailyData = JSON.parse(saved);
    } catch { /* ignore */ }
  }

  let done = false;
  let points = 0;

  if (dailyData && dailyData.isGameOver) {
    done = true;
    if (dailyData.won) {
      let metrics: { attempts?: number; mistakes?: number } = {};
      if (config.id === 'eurosong' || config.id === 'euroartist' || config.id === 'euroarena') {
        metrics = { attempts: dailyData.guesses?.length || dailyData.attempts?.length || 0 };
      } else if (config.id === 'eurolinks' || config.id === 'eurorefrain') {
        metrics = { mistakes: dailyData.mistakes };
      } else if (config.id === 'euroguess') {
        metrics = { attempts: dailyData.attempts?.length || 0 };
      }

      const result = calculatePoints(config.type, metrics);
      points = result.points;
    }
  }

  return { done, points };
};

export const RANK_TIERS = [
  { threshold: 0, title: "First-Time Voter" },
  { threshold: 24, title: "Backing Vocalist" },
  { threshold: 60, title: "National Finalist" },
  { threshold: 120, title: "Semi-Final Qualifier" },
  { threshold: 250, title: "Grand Finalist" },
  { threshold: 500, title: "Top 10 Contender" },
  { threshold: 1000, title: "Podium Finish" },
  { threshold: 2500, title: "Winner" },
  { threshold: 5000, title: "Multi-Winner" },
  { threshold: 8500, title: "Hall of Famer" },
  { threshold: 12000, title: "Eurovision Legend" }
];

const emptyStats = (): DetailedStats => ({ 
  played: 0, 
  wins: 0, 
  perfectGames: 0, 
  currentStreak: 0, 
  maxStreak: 0, 
  distribution: [0, 0, 0, 0, 0, 0], 
  lastPlayed: "" 
});

export const initialGlobalStats: GlobalStats = { 
  word_game: emptyStats(), 
  artists: emptyStats(),
  links: emptyStats(), 
  guesser: emptyStats(), 
  arena: emptyStats(),
  refrain: emptyStats(),
  totalPoints: 0, 
  totalDouzePoints: 0 
};

export const getStoredStats = (): GlobalStats => {
  try {
    const saved = localStorage.getItem('euro-stats-v2');
    if (!saved) return initialGlobalStats;
    const parsed = JSON.parse(saved);
    
    return {
      ...initialGlobalStats,
      ...parsed,
      word_game: parsed.word_game || parsed.wordle ? { ...emptyStats(), ...(parsed.word_game || parsed.wordle) } : emptyStats(),
      artists: parsed.artists ? { ...emptyStats(), ...parsed.artists } : emptyStats(),
      links: parsed.links || parsed.linksgame ? { ...emptyStats(), ...(parsed.links || parsed.linksgame) } : emptyStats(),
      guesser: parsed.guesser ? { ...emptyStats(), ...parsed.guesser } : emptyStats(),
      arena: parsed.arena ? { ...emptyStats(), ...parsed.arena } : emptyStats(),
      refrain: parsed.refrain ? { ...emptyStats(), ...parsed.refrain } : emptyStats(),
    };
  } catch {
    return initialGlobalStats;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculatePoints = (gameType: GameType, performanceMetrics: any): { points: number; isPerfect: boolean } => {
  let pointsEarned = 0;
  let isPerfect = false;

  if (gameType === GameType.WORD_GAME || gameType === GameType.ARTIST_WORD_GAME) {
    const attempts = performanceMetrics.attempts;
    const pointsMap = [12, 10, 8, 6, 4, 2];
    pointsEarned = pointsMap[attempts - 1] || 0;
    if (attempts === 1) isPerfect = true;
  } 
  else if (gameType === GameType.LINKS_GAME || gameType === GameType.REFRAIN_GAME) {
    const mistakes = performanceMetrics.mistakes;
    const pointsMap = [12, 10, 8, 6, 4, 2];
    pointsEarned = pointsMap[mistakes] || 0;
    if (mistakes === 0) isPerfect = true;
  }
  else if (gameType === GameType.GUESSER) {
    const attemptsCount = performanceMetrics.attempts;
    const pointsMap = [12, 10, 8, 6, 4, 2];
    pointsEarned = pointsMap[attemptsCount - 1] || 0;
    if (attemptsCount === 1) isPerfect = true;
  }
  else if (gameType === GameType.ARENA) {
    const attemptsCount = performanceMetrics.attempts;
    const pointsMap = [12, 12, 10, 8, 6, 4, 2];
    pointsEarned = pointsMap[attemptsCount - 1] || 0;
    if (attemptsCount === 1 || attemptsCount === 2) isPerfect = true;
  }

  return { points: pointsEarned, isPerfect };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateGameStats = (gameType: GameType, won: boolean, performanceMetrics: any) => {
  const stats = getStoredStats();
  const today = getDayString();
  
  let gameKey: 'word_game' | 'artists' | 'links' | 'guesser' | 'arena' | 'refrain';
  switch(gameType) {
    case GameType.WORD_GAME: gameKey = 'word_game'; break;
    case GameType.ARTIST_WORD_GAME: gameKey = 'artists'; break;
    case GameType.LINKS_GAME: gameKey = 'links'; break;
    case GameType.GUESSER: gameKey = 'guesser'; break;
    case GameType.ARENA: gameKey = 'arena'; break;
    case GameType.REFRAIN_GAME: gameKey = 'refrain'; break;
    default: return stats;
  }
  
  if (stats[gameKey].lastPlayed === today) return stats;

  stats[gameKey].played += 1;
  stats[gameKey].lastPlayed = today;

  if (won) {
    stats[gameKey].wins += 1;
    stats[gameKey].currentStreak += 1;
    stats[gameKey].maxStreak = Math.max(stats[gameKey].maxStreak, stats[gameKey].currentStreak);

    const { points: pointsEarned, isPerfect } = calculatePoints(gameType, performanceMetrics);

    if (gameType === GameType.WORD_GAME || gameType === GameType.ARTIST_WORD_GAME) {
      const attempts = performanceMetrics.attempts;
      if (stats[gameKey].distribution) {
        stats[gameKey].distribution[attempts - 1] = (stats[gameKey].distribution[attempts - 1] || 0) + 1;
      }
    } 
    else if (gameType === GameType.LINKS_GAME || gameType === GameType.REFRAIN_GAME) {
      const mistakes = performanceMetrics.mistakes;
      if (stats[gameKey].distribution) {
        stats[gameKey].distribution[mistakes] = (stats[gameKey].distribution[mistakes] || 0) + 1;
      }
    }
    else if (gameType === GameType.GUESSER) {
      const attemptsCount = performanceMetrics.attempts;
      if (stats[gameKey].distribution) {
        stats[gameKey].distribution[attemptsCount - 1] = (stats[gameKey].distribution[attemptsCount - 1] || 0) + 1;
      }
    }
    else if (gameType === GameType.ARENA) {
      const attemptsCount = performanceMetrics.attempts;
      let bucketIdx = 0;
      if (attemptsCount === 1 || attemptsCount === 2) {
        bucketIdx = 0; // 12 pts
      } else {
        bucketIdx = attemptsCount - 2; // 3->1 (10pt), 4->2 (8pt), etc.
      }

      if (stats[gameKey].distribution) {
        stats[gameKey].distribution[bucketIdx] = (stats[gameKey].distribution[bucketIdx] || 0) + 1;
      }
    }

    stats.totalPoints += pointsEarned;
    if (isPerfect) {
      stats[gameKey].perfectGames += 1;
      stats.totalDouzePoints += 1;
    }
  } else {
    stats[gameKey].currentStreak = 0;
  }

  try {
    localStorage.setItem('euro-stats-v2', JSON.stringify(stats));
  } catch (err) {
    console.error("Failed to save stats", err);
  }
  return stats;
};

export const getCurrentRank = (points: number) => {
  return [...RANK_TIERS].reverse().find(tier => points >= tier.threshold) || RANK_TIERS[0];
};

export const getNextRank = (points: number) => {
  return RANK_TIERS.find(tier => tier.threshold > points);
};