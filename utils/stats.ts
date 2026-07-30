import { GlobalStats, DetailedStats, GameType } from '../data/types.ts';
import { getDayString } from './daily.ts';
import { auth, db } from '../firebase';
import { doc, deleteField } from 'firebase/firestore';
import { reportGameScore, reportNewPlayerDiscovery } from './firebaseService.ts';
import { syncGameResultToFirestore, safeUpdateUserDoc } from './syncService.ts';

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
  { threshold: 12, title: "Greenroom Guest" },
  { threshold: 24, title: "Backing Vocalist" },
  { threshold: 42, title: "Jury Member" },
  { threshold: 60, title: "National Finalist" },
  { threshold: 80, title: "Televote Favorite" },
  { threshold: 100, title: "National Representative" },
  { threshold: 120, title: "Semi-Final Qualifier" },
  { threshold: 180, title: "Press Center Darling" },
  { threshold: 250, title: "Grand Finalist" },
  { threshold: 375, title: "Fan Favorite" },
  { threshold: 500, title: "Top 10 Contender" },
  { threshold: 750, title: "Dark Horse" },
  { threshold: 1000, title: "Podium Finish" },
  { threshold: 1750, title: "Chart Topper" },
  { threshold: 2500, title: "Silver Medalist" },
  { threshold: 3750, title: "Winner" },
  { threshold: 5500, title: "Double Winner" },
  { threshold: 7500, title: "Multi-Winner" },
  { threshold: 9500, title: "Hall of Famer" },
  { threshold: 11500, title: "Iconic Entry" },
  { threshold: 14000, title: "Eurovision Legend" }
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sanitizeDetailedStats = (raw: any): DetailedStats => {
  const base = emptyStats();
  if (!raw || typeof raw !== 'object') return base;
  return {
    played: Number(raw.played) || 0,
    wins: Number(raw.wins) || 0,
    perfectGames: Number(raw.perfectGames) || 0,
    currentStreak: Number(raw.currentStreak) || 0,
    maxStreak: Number(raw.maxStreak) || 0,
    distribution: Array.isArray(raw.distribution) && raw.distribution.length === 6 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? raw.distribution.map((n: any) => Number(n) || 0)
      : [0, 0, 0, 0, 0, 0],
    lastPlayed: typeof raw.lastPlayed === 'string' ? raw.lastPlayed : "",
    dailyCompletion: raw.dailyCompletion ? {
      won: Boolean(raw.dailyCompletion.won),
      points: Number(raw.dailyCompletion.points) || 0,
      isPerfect: Boolean(raw.dailyCompletion.isPerfect),
      guesses: Array.isArray(raw.dailyCompletion.guesses) ? raw.dailyCompletion.guesses : [],
      mistakes: Number(raw.dailyCompletion.mistakes) || 0
    } : undefined
  };
};

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
      word_game: sanitizeDetailedStats(parsed.word_game || parsed.wordle),
      artists: sanitizeDetailedStats(parsed.artists),
      links: sanitizeDetailedStats(parsed.links || parsed.linksgame),
      guesser: sanitizeDetailedStats(parsed.guesser),
      arena: sanitizeDetailedStats(parsed.arena),
      refrain: sanitizeDetailedStats(parsed.refrain),
      totalPoints: Number(parsed.totalPoints) || 0,
      totalDouzePoints: Number(parsed.totalDouzePoints) || 0,
    };
  } catch {
    return initialGlobalStats;
  }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculatePoints = (gameType: GameType, performanceMetrics: any): { points: number; isPerfect: boolean } => {
  let pointsEarned = 0;
  let isPerfect = false;
  const metrics = performanceMetrics || {};

  if (gameType === GameType.WORD_GAME || gameType === GameType.ARTIST_WORD_GAME) {
    const attempts = Number(metrics.attempts ?? metrics.guesses?.length) || 1;
    const pointsMap = [12, 10, 8, 6, 4, 2];
    pointsEarned = pointsMap[attempts - 1] || 2;
    if (attempts === 1) isPerfect = true;
  } 
  else if (gameType === GameType.LINKS_GAME || gameType === GameType.REFRAIN_GAME) {
    const mistakes = Number(metrics.mistakes) || 0;
    const pointsMap = [12, 10, 8, 6, 4, 2];
    pointsEarned = pointsMap[mistakes] || 2;
    if (mistakes === 0) isPerfect = true;
  }
  else if (gameType === GameType.GUESSER) {
    const attemptsCount = Number(metrics.attempts ?? metrics.guesses?.length) || 1;
    const pointsMap = [12, 10, 8, 6, 4, 2];
    pointsEarned = pointsMap[attemptsCount - 1] || 2;
    if (attemptsCount === 1) isPerfect = true;
  }
  else if (gameType === GameType.ARENA) {
    const attemptsCount = Number(metrics.attempts ?? metrics.guesses?.length) || 1;
    const pointsMap = [12, 10, 8, 6, 4, 2];
    pointsEarned = pointsMap[attemptsCount - 1] || 2;
    if (attemptsCount === 1) isPerfect = true;
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
    default: console.error("Invalid gameType:", gameType); return stats;
  }
  
  if (stats[gameKey].lastPlayed === today && stats[gameKey].dailyCompletion) return stats;

  stats[gameKey].played = (Number(stats[gameKey].played) || 0) + 1;
  stats[gameKey].lastPlayed = today;
  
  // pack will be awarded during syncGameResultToFirestore

  const { points: pointsEarned, isPerfect } = won 
    ? calculatePoints(gameType, performanceMetrics)
    : { points: 0, isPerfect: false };

  if (won) {
    stats[gameKey].wins = (Number(stats[gameKey].wins) || 0) + 1;
    stats[gameKey].currentStreak = (Number(stats[gameKey].currentStreak) || 0) + 1;
    stats[gameKey].maxStreak = Math.max((Number(stats[gameKey].maxStreak) || 0), stats[gameKey].currentStreak);

    if (gameType === GameType.WORD_GAME || gameType === GameType.ARTIST_WORD_GAME || gameType === GameType.GUESSER || gameType === GameType.ARENA) {
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
  } else {
    stats[gameKey].currentStreak = 0;
  }
  
  // Set dailyCompletion
  let guesses = [];
  if (gameType === GameType.WORD_GAME || gameType === GameType.ARTIST_WORD_GAME || gameType === GameType.GUESSER || gameType === GameType.ARENA) {
      guesses = performanceMetrics.guesses || [];
  }
  let mistakes = 0;
  if (gameType === GameType.LINKS_GAME || gameType === GameType.REFRAIN_GAME) {
      mistakes = performanceMetrics.mistakes || 0;
  }
  
  stats[gameKey].dailyCompletion = {
    won,
    points: pointsEarned,
    isPerfect,
    guesses,
    mistakes
  };
  
  if (isPerfect) {
    stats[gameKey].perfectGames = (Number(stats[gameKey].perfectGames) || 0) + 1;
  }
  
  stats.totalPoints = (Number(stats.totalPoints) || 0) + pointsEarned;
  if (isPerfect) {
    stats.totalDouzePoints = (Number(stats.totalDouzePoints) || 0) + 1;
  }

  // Report to Firebase (one write per day per game type per device)
  reportGameScore(gameType, pointsEarned);

  const totalPlayedBefore = Object.values(stats).reduce((sum, s) => {
    if (typeof s === 'object' && s !== null && 'played' in s) {
      return sum + (s.played);
    }
    return sum;
  }, 0);

  if (totalPlayedBefore === 1) {
    reportNewPlayerDiscovery(`daily_${gameKey}`);
  }

  try {
    localStorage.setItem('euro-stats-v2', JSON.stringify(stats));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('euro-stats-updated'));
    }
  } catch (err) {
    console.error("Failed to save stats", err);
  }
  
  syncGameResultToFirestore(stats, true).catch(err => console.error("Failed to sync stats with pack reward", err));
  return stats;
};

export const getCurrentRank = (points: number) => {
  return [...RANK_TIERS].reverse().find(tier => points >= tier.threshold) || RANK_TIERS[0];
};

export const getNextRank = (points: number) => {
  return RANK_TIERS.find(tier => tier.threshold > points);
};

export const resetDailyProgressForDev = async () => {
  if (!import.meta.env.DEV) return;
  
  const today = getDayString();
  const games = [
    { id: 'eurosong' },
    { id: 'euroartist' },
    { id: 'eurolinks' },
    { id: 'euroguess' },
    { id: 'euroarena' },
    { id: 'eurorefrain' },
    { id: 'eurobingo' }
  ];

  // Remove daily game progress for today from local storage
  games.forEach(game => {
    localStorage.removeItem(`${game.id}-${today}`);
  });

  // Revert today's score additions from global stats
  const stats = getStoredStats();
  let pointsToDeduct = 0;
  let douzePointsToDeduct = 0;
  const statsUpdates: Record<string, DetailedStats> = {};

  ['word_game', 'artists', 'links', 'guesser', 'arena', 'refrain'].forEach(gameKey => {
    const stat = stats[gameKey as keyof GlobalStats] as DetailedStats;
    if (stat && stat.dailyCompletion) {
      pointsToDeduct += stat.dailyCompletion.points || 0;
      if (stat.dailyCompletion.isPerfect) {
        douzePointsToDeduct += 1;
        stat.perfectGames = Math.max(0, stat.perfectGames - 1);
      }
      
      stat.played = Math.max(0, stat.played - 1);
      if (stat.dailyCompletion.won) {
        stat.wins = Math.max(0, stat.wins - 1);
        stat.currentStreak = Math.max(0, stat.currentStreak - 1);
        
        // Revert max streak if it was just increased
        if (stat.maxStreak > 0 && stat.maxStreak === stat.currentStreak + 1) {
          stat.maxStreak = stat.currentStreak;
        }

        // Revert distribution (point history)
        if (['word_game', 'artists', 'guesser', 'arena'].includes(gameKey)) {
          const attempts = stat.dailyCompletion.guesses?.length;
          if (attempts && stat.distribution && stat.distribution[attempts - 1] > 0) {
            stat.distribution[attempts - 1] -= 1;
          }
        } else if (['links', 'refrain'].includes(gameKey)) {
          const mistakes = stat.dailyCompletion.mistakes ?? 0;
          if (stat.distribution && stat.distribution[mistakes] > 0) {
            stat.distribution[mistakes] -= 1;
          }
        }
      }
      
      // Clear lastPlayed if it was today so they can play again
      if (stat.lastPlayed === today) {
        stat.lastPlayed = "";
      }
      
      delete stat.dailyCompletion;
      statsUpdates[`stats.${gameKey}`] = stat;
    }
  });

  stats.totalPoints = Math.max(0, stats.totalPoints - pointsToDeduct);
  stats.totalDouzePoints = Math.max(0, stats.totalDouzePoints - douzePointsToDeduct);
  
  localStorage.setItem('euro-stats-v2', JSON.stringify(stats));

  // Reset dailyPacksEarned inside collection in localStorage (preserving availablePacks)
  const cachedCollectionStr = localStorage.getItem('douzepoints_eurocards_collection');
  let collectionToSave = {
    cards: {},
    availablePacks: 0,
    packsOpened: 0,
    dailyPacksEarned: 0,
    lastDailyReset: Date.now(),
    confetti: 0
  };
  if (cachedCollectionStr) {
    try {
      const parsed = JSON.parse(cachedCollectionStr);
      collectionToSave = {
        ...parsed,
        dailyPacksEarned: 0,
        lastDailyReset: Date.now()
      };
    } catch {
      // fallback
    }
  }
  localStorage.setItem('douzepoints_eurocards_collection', JSON.stringify(collectionToSave));

  if (auth.currentUser) {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const updates = {
      'collection.dailyPacksEarned': 0,
      'collection.lastDailyReset': Date.now(),
      cards: deleteField(), // remove legacy top-level cards field if present
      dailyState: {}, // reset daily state for today
      totalPoints: stats.totalPoints,
      totalDouzePoints: stats.totalDouzePoints,
      ...statsUpdates
    };

    try {
      await safeUpdateUserDoc(userRef, updates);
    } catch (e) {
      console.warn("safeUpdateUserDoc failed during dev reset:", e);
    }
    window.location.reload();
  } else {
    window.location.reload();
  }
};
