import { doc, setDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { GameType } from '../data/types.ts';

export const reportGameScore = async (gameType: GameType, points: number) => {
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
    
    console.log(`Reported ${points} points for ${gameType} on ${date}`);
  } catch (error) {
    // Fail silently for the user, but log for the developer
    console.error('Failed to report score to Firebase:', error instanceof Error ? error.message : String(error));
  }
};

export const reportSupportClick = async () => {
  const date = new Date().toISOString().split('T')[0];

  try {
    const docRef = doc(db, 'support_clicks', date);
    
    await setDoc(docRef, {
      date,
      count: increment(1),
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    console.log(`Reported support click on ${date}`);
  } catch (error) {
    console.error('Failed to report support click to Firebase:', error instanceof Error ? error.message : String(error));
  }
};
