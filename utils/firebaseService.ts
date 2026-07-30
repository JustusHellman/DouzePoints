import { doc, setDoc, increment, serverTimestamp, DocumentData } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { GameType } from '../data/types.ts';
import { logAnalyticsEvent } from './analytics';

export const reportInfiniteStart = async (gameId: string, difficulty: string) => {
  const [placement, era] = difficulty.split('_');

  logAnalyticsEvent('level_start', {
    level_name: `${gameId}_infinite`,
    game_id: gameId,
    placement: placement,
    era: era
  });

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
    
    reportNewPlayerDiscovery(`infinite_${gameId}_${difficulty}`);
  } catch (error) {
    console.error('Failed to report infinite start:', error);
  }
};

export const reportInfiniteRun = async (gameId: string, difficulty: string, score: number, streak: number, wasCompleted: boolean) => {
  const [placement, era] = difficulty.split('_');

  logAnalyticsEvent('level_end', {
    level_name: `${gameId}_infinite`,
    success: wasCompleted,
    score: score,
    streak: streak,
    placement: placement,
    era: era
  });

  const date = new Date().toISOString().split('T')[0];
  const statsId = `${date}_${gameId}_${difficulty}`;

  try {
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
  } catch (error) {
    console.error('Failed to report infinite run:', error);
  }
};

export const reportGameScore = async (gameType: GameType, points: number) => {
  logAnalyticsEvent('post_score', {
    score: points,
    level_name: gameType
  });

  const date = new Date().toISOString().split('T')[0];
  const statsId = `${date}_${gameType}`;

  try {
    const docRef = doc(db, 'game_stats', statsId);
    await setDoc(docRef, {
      gameType,
      date,
      [`distribution.${points}`]: increment(1),
      totalPlayed: increment(1),
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    if (import.meta.env.DEV) {
      console.log(`Reported ${points} points for ${gameType} on ${date}`);
    }
  } catch (error) {
    console.error('Failed to report score to Firebase:', error instanceof Error ? error.message : String(error));
  }
};

export const reportSupportClick = async (source: string = 'unknown') => {
  logAnalyticsEvent('select_content', {
    content_type: 'support_link',
    item_id: source
  });

  const date = new Date().toISOString().split('T')[0];

  try {
    const docRef = doc(db, 'support_clicks', date);
    await setDoc(docRef, {
      date,
      count: increment(1),
      [`sources.${source}`]: increment(1),
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
  logAnalyticsEvent('share', {
    method: 'web_share',
    content_type: 'game_result',
    item_id: source
  });

  const date = new Date().toISOString().split('T')[0];

  try {
    const docRef = doc(db, 'share_clicks', date);
    await setDoc(docRef, {
      date,
      count: increment(1),
      [`sources.${source}`]: increment(1),
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
  const date = new Date().toISOString().split('T')[0];
  const storageKey = `last_language_reported_${date}_${language}`;
  
  if (localStorage.getItem(storageKey) === 'true') {
    return;
  }

  try {
    const docRef = doc(db, 'language_stats', date);
    await setDoc(docRef, {
      date,
      total: increment(1),
      [`languages.${language}`]: increment(1),
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    localStorage.setItem(storageKey, 'true');
    if (import.meta.env.DEV) {
      console.log(`Reported language ${language} on ${date}`);
    }
  } catch (error) {
    console.error('Failed to report language to Firebase:', error instanceof Error ? error.message : String(error));
  }
};

export const reportDailyCompletion = async (totalScore: number) => {
  logAnalyticsEvent('level_end', {
    level_name: 'daily_challenges',
    success: true,
    score: totalScore
  });

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
      [`distribution.${totalScore}`]: increment(1),
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

export const reportPlaytime = async (counters: Record<string, number>) => {
  const date = new Date().toISOString().split('T')[0];

  try {
    const docRef = doc(db, 'playtime_stats', date);

    let totalSeconds = 0;
    let dailySeconds = 0;
    let infiniteSeconds = 0;
    let navigationSeconds = 0;

    const atomicUpdates: DocumentData = {
      date,
      lastUpdated: serverTimestamp()
    };

    for (const [key, seconds] of Object.entries(counters)) {
      if (seconds <= 0) continue;
      atomicUpdates[key] = increment(seconds);
      totalSeconds += seconds;
      
      if (key.endsWith('_daily')) {
        dailySeconds += seconds;
      } else if (key.endsWith('_infinite')) {
        infiniteSeconds += seconds;
      } else {
        navigationSeconds += seconds;
      }
    }

    if (totalSeconds === 0) return;

    atomicUpdates['totalSeconds'] = increment(totalSeconds);
    atomicUpdates['dailySeconds'] = increment(dailySeconds);
    atomicUpdates['infiniteSeconds'] = increment(infiniteSeconds);
    atomicUpdates['navigationSeconds'] = increment(navigationSeconds);

    await setDoc(docRef, atomicUpdates, { merge: true });
  } catch (error) {
    console.error('Failed to report playtime:', error);
  }
};

export const reportNewPlayerDiscovery = async (source: string = 'unknown') => {
  const date = new Date().toISOString().split('T')[0];
  const storageKey = 'new_player_reported';
  
  if (localStorage.getItem(storageKey)) {
    return;
  }

  try {
    localStorage.setItem(storageKey, 'true');
    const docRef = doc(db, 'discoveries', date);
    await setDoc(docRef, {
      date,
      count: increment(1),
      [`sources.${source}`]: increment(1),
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    if (import.meta.env.DEV) {
      console.log(`Reported new player discovery on ${date} from ${source}`);
    }
  } catch (error) {
    console.error('Failed to report discovery to Firebase:', error instanceof Error ? error.message : String(error));
  }
};
