import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { GlobalStats } from '../data/types';
import { getStoredStats, sanitizeDetailedStats, mergeGlobalStats } from '../utils/stats';
import { getDayString } from '../utils/daily';
import { extractEuroCollectionData } from '../utils/cards';
import { User } from 'firebase/auth';

export const useUserData = (user: User | null) => {
  const [stats, setStats] = useState<GlobalStats>(getStoredStats());

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
  const [loading, setLoading] = useState(!!(user && !user.isAnonymous));

  // Listen to local events so guest progress and packs immediately update the UI
  useEffect(() => {
    const handleStatsUpdate = () => {
      setStats(getStoredStats());
    };

    const handleCollectionUpdate = () => {
      const cached = localStorage.getItem('douzepoints_eurocards_collection');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setCollectionData({
            availablePacks: Number(parsed.availablePacks || 0),
            packsOpened: Number(parsed.packsOpened || 0),
            dailyPacksEarned: Number(parsed.dailyPacksEarned || 0),
            lastDailyReset: Number(parsed.lastDailyReset || Date.now()),
            confetti: Number(parsed.confetti || 0)
          });
          if (parsed.cards) {
            setCards(parsed.cards);
          } else {
            setCards({});
          }
        } catch {
          // ignore
        }
      } else {
        // Reset to pristine clean slate on logout
        setCollectionData({
          availablePacks: 0,
          packsOpened: 0,
          dailyPacksEarned: 0,
          lastDailyReset: Date.now(),
          confetti: 0
        });
        setCards({});
      }
    };

    window.addEventListener('euro-stats-updated', handleStatsUpdate);
    window.addEventListener('euro-collection-updated', handleCollectionUpdate);

    return () => {
      window.removeEventListener('euro-stats-updated', handleStatsUpdate);
      window.removeEventListener('euro-collection-updated', handleCollectionUpdate);
    };
  }, []);

  useEffect(() => {
    if (!user || user.isAnonymous) {
      setLoading(false);
      setStats(getStoredStats());
      const cached = typeof window !== 'undefined' ? localStorage.getItem('douzepoints_eurocards_collection') : null;
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setCollectionData({
            availablePacks: Number(parsed.availablePacks || 0),
            packsOpened: Number(parsed.packsOpened || 0),
            dailyPacksEarned: Number(parsed.dailyPacksEarned || 0),
            lastDailyReset: Number(parsed.lastDailyReset || Date.now()),
            confetti: Number(parsed.confetti || 0)
          });
          setCards(parsed.cards || {});
        } catch { /* ignore */ }
      } else {
        setCollectionData({
          availablePacks: 0,
          packsOpened: 0,
          dailyPacksEarned: 0,
          lastDailyReset: Date.now(),
          confetti: 0
        });
        setCards({});
      }
      return;
    }
    const userRef = doc(db, 'users', user.uid);
    
    // Listen to changes in the user document
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.avatarId && typeof window !== 'undefined') {
          const currentLocalAvatar = localStorage.getItem('douze_points_avatar');
          if (currentLocalAvatar !== data.avatarId) {
            localStorage.setItem('douze_points_avatar', data.avatarId);
            window.dispatchEvent(new Event('euro-avatar-updated'));
          }
        }

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
          setStats(remoteStats);
          localStorage.setItem('euro-stats-v2', JSON.stringify(remoteStats)); // Keep local cache updated

          // Reconcile daily games completed on other devices/cloud
          if (typeof window !== 'undefined') {
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
              const gameStats = remoteStats[key];
              const storageKey = `${prefix}-${today}`;
              if (gameStats?.lastPlayed === today && gameStats?.dailyCompletion) {
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
              }
            });
          }
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
