import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { GlobalStats, DetailedStats } from '../data/types';
import { getStoredStats, sanitizeDetailedStats } from '../utils/stats';
import { extractEuroCollectionData } from '../utils/cards';
import { User } from 'firebase/auth';

const mergeDetailedStats = (local: DetailedStats, remote: DetailedStats): DetailedStats => {
  const localPlayed = Number(local.played) || 0;
  const remotePlayed = Number(remote.played) || 0;

  if (localPlayed > remotePlayed) return local;
  if (remotePlayed > localPlayed) return remote;

  const wins = Math.max(Number(local.wins) || 0, Number(remote.wins) || 0);
  const perfectGames = Math.max(Number(local.perfectGames) || 0, Number(remote.perfectGames) || 0);
  const maxStreak = Math.max(Number(local.maxStreak) || 0, Number(remote.maxStreak) || 0);
  const currentStreak = Math.max(Number(local.currentStreak) || 0, Number(remote.currentStreak) || 0);

  const localDist = Array.isArray(local.distribution) ? local.distribution : [0,0,0,0,0,0];
  const remoteDist = Array.isArray(remote.distribution) ? remote.distribution : [0,0,0,0,0,0];
  const mergedDist = localDist.map((val, idx) => Math.max(Number(val) || 0, Number(remoteDist[idx]) || 0));

  return {
    played: localPlayed,
    wins,
    perfectGames,
    currentStreak,
    maxStreak,
    distribution: mergedDist,
    lastPlayed: local.lastPlayed || remote.lastPlayed || "",
    dailyCompletion: local.dailyCompletion || remote.dailyCompletion
  };
};

const mergeGlobalStats = (local: GlobalStats, remote: GlobalStats): GlobalStats => {
  return {
    word_game: mergeDetailedStats(local.word_game, remote.word_game),
    artists: mergeDetailedStats(local.artists, remote.artists),
    links: mergeDetailedStats(local.links, remote.links),
    guesser: mergeDetailedStats(local.guesser, remote.guesser),
    arena: mergeDetailedStats(local.arena, remote.arena),
    refrain: mergeDetailedStats(local.refrain, remote.refrain),
    totalPoints: Math.max(Number(local.totalPoints) || 0, Number(remote.totalPoints) || 0),
    totalDouzePoints: Math.max(Number(local.totalDouzePoints) || 0, Number(remote.totalDouzePoints) || 0)
  };
};

export const useUserData = (user: User | null) => {
  const [stats, setStats] = useState<GlobalStats>(getStoredStats());

  useEffect(() => {
    const handleStatsUpdated = () => {
      const freshLocal = getStoredStats();
      setStats(prev => mergeGlobalStats(prev, freshLocal));
    };
    const handleCollectionUpdated = () => {
      const cached = localStorage.getItem('douzepoints_eurocards_collection');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setCollectionData({
            availablePacks: parsed.availablePacks || 0,
            packsOpened: parsed.packsOpened || 0,
            dailyPacksEarned: parsed.dailyPacksEarned || 0,
            lastDailyReset: parsed.lastDailyReset || Date.now(),
            confetti: parsed.confetti || 0
          });
          if (parsed.cards) {
            setCards(parsed.cards);
          }
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('euro-stats-updated', handleStatsUpdated);
    window.addEventListener('euro-collection-updated', handleCollectionUpdated);
    return () => {
      window.removeEventListener('euro-stats-updated', handleStatsUpdated);
      window.removeEventListener('euro-collection-updated', handleCollectionUpdated);
    };
  }, []);

  const [collectionData, setCollectionData] = useState<{availablePacks: number, packsOpened: number, dailyPacksEarned: number, lastDailyReset: number, confetti: number}>(() => {
    const cached = localStorage.getItem('douzepoints_eurocards_collection');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return {
          availablePacks: parsed.availablePacks || 0,
          packsOpened: parsed.packsOpened || 0,
          dailyPacksEarned: parsed.dailyPacksEarned || 0,
          lastDailyReset: parsed.lastDailyReset || Date.now(),
          confetti: parsed.confetti || 0
        };
      } catch {
        // ignore
      }
    }
    return { availablePacks: 0, packsOpened: 0, dailyPacksEarned: 0, lastDailyReset: Date.now(), confetti: 0 };
  });
  const [cards, setCards] = useState<Record<string, { obtainedAt: number }>>(() => {
    const cached = localStorage.getItem('douzepoints_eurocards_collection');
    if (cached) {
      try {
        return JSON.parse(cached).cards || {};
      } catch {
        // ignore
      }
    }
    return {};
  });
  const [loading, setLoading] = useState(!!user);

  useEffect(() => {
    if (!user) {
      return;
    }
    const userRef = doc(db, 'users', user.uid);
    
    // Listen to changes in the user document
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.stats) {
          const remoteStats: GlobalStats = {
            word_game: sanitizeDetailedStats(data.stats.word_game || data.stats.wordle),
            artists: sanitizeDetailedStats(data.stats.artists),
            links: sanitizeDetailedStats(data.stats.links || data.stats.linksgame),
            guesser: sanitizeDetailedStats(data.stats.guesser),
            arena: sanitizeDetailedStats(data.stats.arena),
            refrain: sanitizeDetailedStats(data.stats.refrain),
            totalPoints: Number(data.totalPoints) || 0,
            totalDouzePoints: Number(data.totalDouzePoints) || 0
          };
          const currentLocal = getStoredStats();
          const mergedStats = mergeGlobalStats(currentLocal, remoteStats);
          setStats(mergedStats);
          localStorage.setItem('euro-stats-v2', JSON.stringify(mergedStats)); // Keep local cache updated
        }
        
        if (data.infinite_records) {
           const localRecordsStr = localStorage.getItem('euro-infinite-records');
           let localRecords: Record<string, { currentStreak?: number; currentScore?: number }> = {};
           if (localRecordsStr) {
             try { localRecords = JSON.parse(localRecordsStr); } catch { console.warn("Failed to parse local records"); }
           }
           
           // Merge, preserving currentStreak and currentScore from local storage
           const mergedRecords = { ...data.infinite_records };
           Object.keys(mergedRecords).forEach(key => {
             if (localRecords[key]) {
               mergedRecords[key].currentStreak = localRecords[key].currentStreak || 0;
               mergedRecords[key].currentScore = localRecords[key].currentScore || 0;
             }
           });
           
           localStorage.setItem('euro-infinite-records', JSON.stringify(mergedRecords));
        }

        if (data.dailyState && data.dailyState.date) {
           const today = new Date().toISOString().split('T')[0];
           if (data.dailyState.date === today) {
             Object.entries(data.dailyState.games || {}).forEach(([gameId, state]) => {
                localStorage.setItem(`${gameId}-${today}`, JSON.stringify(state));
             });
           }
        }
        
        const extracted = extractEuroCollectionData(data);
        setCollectionData({
          availablePacks: extracted.availablePacks,
          packsOpened: extracted.packsOpened,
          dailyPacksEarned: extracted.dailyPacksEarned,
          lastDailyReset: extracted.lastDailyReset,
          confetti: extracted.confetti
        });
        setCards(extracted.cards);

        // Update the localStorage to match the database (one-way sync: DB -> LocalStorage)
        const cardsPayload = {
          availablePacks: extracted.availablePacks,
          packsOpened: extracted.packsOpened,
          dailyPacksEarned: extracted.dailyPacksEarned,
          lastDailyReset: extracted.lastDailyReset,
          confetti: extracted.confetti,
          cards: extracted.cards
        };
        localStorage.setItem('douzepoints_eurocards_collection', JSON.stringify(cardsPayload));
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  return { stats, setStats, collectionData, cards, loading };
};
