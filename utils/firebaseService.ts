import { doc, setDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { GameType } from '../data/types.ts';

export const reportInfiniteStart = async (gameId: string, difficulty: string) => {
  if (import.meta.env.DEV) {
    console.log(`[DEV MODE] Would have reported infinite start for ${gameId} (${difficulty})`);
    return;
  }

  const date = new Date().toISOString().split('T')[0];
  const statsId = `${date}_${gameId}_${difficulty}`;

  try {
    const docRef = doc(db, 'infinite_daily_stats', statsId);
    await setDoc(docRef, {
      date,
      gameId,
      difficulty,
      totalStarts: increment(1),
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    // Also report discovery if this is their first game ever
    reportNewPlayerDiscovery();
  } catch (error) {
    console.error('Failed to report infinite start:', error);
  }
};

export const reportInfiniteRun = async (gameId: string, difficulty: string, score: number, streak: number, wasCompleted: boolean) => {
  if (import.meta.env.DEV) {
    console.log(`[DEV MODE] Would have reported infinite run for ${gameId} (${difficulty}): score=${score}, streak=${streak}, completed=${wasCompleted}`);
    return;
  }

  const date = new Date().toISOString().split('T')[0];
  const statsId = `${date}_${gameId}_${difficulty}`;

  try {
    // 1. Update Aggregated Stats
    const statsRef = doc(db, 'infinite_daily_stats', statsId);
    await setDoc(statsRef, {
      date,
      gameId,
      difficulty,
      totalCompletions: wasCompleted ? increment(1) : increment(0),
      totalLosses: !wasCompleted ? increment(1) : increment(0),
      totalScore: increment(score),
      totalStreak: increment(streak),
      lastUpdated: serverTimestamp()
    }, { merge: true });

    // 2. Log Individual Run
    const runId = `${date}_${gameId}_${difficulty}_${Math.random().toString(36).substring(2, 9)}`;
    const runRef = doc(db, 'infinite_runs', runId);
    await setDoc(runRef, {
      gameId,
      difficulty,
      score,
      streak,
      wasCompleted,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Failed to report infinite run:', error);
  }
};

export const reportGameScore = async (gameType: GameType, points: number) => {
  if (import.meta.env.DEV) {
    console.log(`[DEV MODE] Would have reported ${points} points for ${gameType}`);
    return;
  }

  const date = new Date().toISOString().split('T')[0];
  const statsId = `${date}_${gameType}`;

  try {
    const docRef = doc(db, 'game_stats', statsId);
    
    // We use setDoc with merge: true and increment to atomically update the daily totals
    await setDoc(docRef, {
      gameType,
      date,
      distribution: {
        [points.toString()]: increment(1)
      },
      totalPlayed: increment(1),
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    if (import.meta.env.DEV) {
      console.log(`Reported ${points} points for ${gameType} on ${date}`);
    }
  } catch (error) {
    // Fail silently for the user, but log for the developer
    console.error('Failed to report score to Firebase:', error instanceof Error ? error.message : String(error));
  }
};

export const reportSupportClick = async (source: string = 'unknown') => {
  if (import.meta.env.DEV) {
    console.log(`[DEV MODE] Would have reported support click from ${source}`);
    return;
  }

  const date = new Date().toISOString().split('T')[0];

  try {
    const docRef = doc(db, 'support_clicks', date);
    
    await setDoc(docRef, {
      date,
      count: increment(1),
      sources: {
        [source]: increment(1)
      },
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    if (import.meta.env.DEV) {
      console.log(`Reported support click on ${date} from ${source}`);
    }
  } catch (error) {
    console.error('Failed to report support click to Firebase:', error instanceof Error ? error.message : String(error));
  }
};

export const reportShareClick = async (source: string = 'unknown') => {
  if (import.meta.env.DEV) {
    console.log(`[DEV MODE] Would have reported share click from ${source}`);
    return;
  }

  const date = new Date().toISOString().split('T')[0];

  try {
    const docRef = doc(db, 'share_clicks', date);
    
    await setDoc(docRef, {
      date,
      count: increment(1),
      sources: {
        [source]: increment(1)
      },
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    if (import.meta.env.DEV) {
      console.log(`Reported share click on ${date} from ${source}`);
    }
  } catch (error) {
    console.error('Failed to report share click to Firebase:', error instanceof Error ? error.message : String(error));
  }
};

export const reportDailyLanguage = async (language: string) => {
  if (import.meta.env.DEV) {
    console.log(`[DEV MODE] Would have reported daily language: ${language}`);
    return;
  }

  const date = new Date().toISOString().split('T')[0];
  const storageKey = 'last_language_reported_date';
  
  if (localStorage.getItem(storageKey) === date) {
    return;
  }

  try {
    const docRef = doc(db, 'language_stats', date);
    await setDoc(docRef, {
      date,
      total: increment(1),
      languages: {
        [language]: increment(1)
      },
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    localStorage.setItem(storageKey, date);
    if (import.meta.env.DEV) {
      console.log(`Reported language ${language} on ${date}`);
    }
  } catch (error) {
    console.error('Failed to report language to Firebase:', error instanceof Error ? error.message : String(error));
  }
};

export const reportDailyCompletion = async (totalScore: number) => {
  if (import.meta.env.DEV) {
    console.log(`[DEV MODE] Would have reported daily completion with score: ${totalScore}`);
    return;
  }

  const date = new Date().toISOString().split('T')[0];
  const storageKey = 'last_completion_reported_date';
  
  if (localStorage.getItem(storageKey) === date) {
    return;
  }

  try {
    const docRef = doc(db, 'completion_stats', date);
    await setDoc(docRef, {
      date,
      totalCompleted: increment(1),
      distribution: {
        [totalScore.toString()]: increment(1)
      },
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    localStorage.setItem(storageKey, date);
    if (import.meta.env.DEV) {
      console.log(`Reported daily completion with score ${totalScore} on ${date}`);
    }
  } catch (error) {
    console.error('Failed to report completion to Firebase:', error instanceof Error ? error.message : String(error));
  }
};

export const reportNewPlayerDiscovery = async () => {
  if (import.meta.env.DEV) {
    console.log(`[DEV MODE] Would have reported new player discovery`);
    return;
  }

  const date = new Date().toISOString().split('T')[0];
  const storageKey = 'new_player_reported';
  
  if (localStorage.getItem(storageKey)) {
    return;
  }

  try {
    const docRef = doc(db, 'discoveries', date);
    await setDoc(docRef, {
      date,
      count: increment(1),
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    localStorage.setItem(storageKey, 'true');
    if (import.meta.env.DEV) {
      console.log(`Reported new player discovery on ${date}`);
    }
  } catch (error) {
    console.error('Failed to report discovery to Firebase:', error instanceof Error ? error.message : String(error));
  }
};
