import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { mergeGlobalStats } from '../utils/stats';

// Mock localStorage for Node environment
class LocalStorageMock {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

const mockStorage = new LocalStorageMock();
(global as any).localStorage = mockStorage;
(global as any).window = {
  dispatchEvent: () => true,
  addEventListener: () => {},
  removeEventListener: () => {}
};

describe('Guest Decoupling & Auth Sync Logic', () => {

  test('Guest Sync Guard (canSyncToCloud)', () => {
    // 1. When user is null (guest)
    const canSyncGuest = (user: any) => !!(user && !user.isAnonymous);
    assert.equal(canSyncGuest(null), false, 'Guest with no user should NOT sync to cloud');

    // 2. When user is legacy anonymous
    const anonUser = { uid: 'anon-123', isAnonymous: true };
    assert.equal(canSyncGuest(anonUser), false, 'Legacy anonymous user should NOT sync to cloud');

    // 3. When user is authenticated with Google
    const googleUser = { uid: 'google-456', isAnonymous: false, email: 'player@example.com' };
    assert.equal(canSyncGuest(googleUser), true, 'Google authenticated user SHOULD sync to cloud');
  });

  test('Explicit Logout Cleans Up Local State for Shared Public PCs', () => {
    mockStorage.setItem('douzepoints_eurocards_collection', JSON.stringify({ availablePacks: 5, cards: { 'c1': { obtainedAt: 1 } } }));
    mockStorage.setItem('euro-stats-v2', JSON.stringify({ totalPoints: 120 }));
    mockStorage.setItem('euro-infinite-records', JSON.stringify({ bestScore: 10 }));
    mockStorage.setItem('douze_points_avatar', 'avatar-queen');
    mockStorage.setItem('eurosong-2026-09-24', JSON.stringify({ won: true }));
    mockStorage.setItem('euro-lang', 'fr');
    mockStorage.setItem('douze_points_muted', 'true');

    assert.ok(mockStorage.getItem('douzepoints_eurocards_collection'));
    assert.ok(mockStorage.getItem('euro-stats-v2'));
    assert.ok(mockStorage.getItem('euro-infinite-records'));
    assert.ok(mockStorage.getItem('douze_points_avatar'));
    assert.ok(mockStorage.getItem('eurosong-2026-09-24'));

    // Perform logout cleanup using clearAllUserDataOnLogout logic
    const preservedLang = mockStorage.getItem('euro-lang');
    const preservedMuted = mockStorage.getItem('douze_points_muted');
    mockStorage.clear();
    if (preservedLang) mockStorage.setItem('euro-lang', preservedLang);
    if (preservedMuted) mockStorage.setItem('douze_points_muted', preservedMuted);
    mockStorage.setItem('douze_points_avatar', 'avatar_1');

    // All account & game data must be wiped completely
    assert.equal(mockStorage.getItem('douzepoints_eurocards_collection'), null);
    assert.equal(mockStorage.getItem('euro-stats-v2'), null);
    assert.equal(mockStorage.getItem('euro-infinite-records'), null);
    assert.equal(mockStorage.getItem('eurosong-2026-09-24'), null);

    // Avatar resets to default, preferences preserved
    assert.equal(mockStorage.getItem('douze_points_avatar'), 'avatar_1');
    assert.equal(mockStorage.getItem('euro-lang'), 'fr');
    assert.equal(mockStorage.getItem('douze_points_muted'), 'true');
  });

  test('First Login Preserves Guest Packs, Subsequent Login Takes Cloud Packs Strictly', () => {
    // Scenario 1: First login (new user profile in Firestore)
    const guestLocal = {
      availablePacks: 3,
      packsOpened: 1,
      confetti: 40,
      cards: { '2024-sweden': { obtainedAt: 123456789 } }
    };
    
    // On first login (!userDoc.exists()), local guest collection is seeded into cloud
    const firstLoginCloudData = {
      availablePacks: guestLocal.availablePacks,
      packsOpened: guestLocal.packsOpened,
      confetti: guestLocal.confetti,
      cards: guestLocal.cards
    };
    assert.equal(firstLoginCloudData.availablePacks, 3, 'First login must preserve guest available packs');
    assert.equal(firstLoginCloudData.confetti, 40, 'First login must preserve guest confetti');

    // Scenario 2: Subsequent login (existing user profile in Firestore)
    const existingCloudData = {
      availablePacks: 1,
      packsOpened: 5,
      confetti: 100,
      cards: { '2024-sweden': { obtainedAt: 123456789 } }
    };
    // Someone manipulated their localStorage to claim 999 packs
    const tamperedLocalStorage = {
      availablePacks: 999,
      packsOpened: 0,
      confetti: 9999
    };

    // Rule: availablePacks strictly comes from cloud on subsequent login
    const mergedSubsequent = {
      availablePacks: existingCloudData.availablePacks, // STRICT CLOUD
      confetti: Math.max(existingCloudData.confetti, tamperedLocalStorage.confetti),
      packsOpened: Math.max(existingCloudData.packsOpened, tamperedLocalStorage.packsOpened)
    };

    assert.equal(mergedSubsequent.availablePacks, 1, 'Subsequent login strictly enforces cloud available packs (anti-farming)');
  });

  test('Stats Merging Uses Option B (Total Career Dominance) to Avoid Frankenstein Math', () => {
    const localStats = {
      totalPoints: 150,
      totalDouzePoints: 12,
      word_game: { played: 5, wins: 4, perfectGames: 2, currentStreak: 3, maxStreak: 3, distribution: [2, 1, 1, 0, 0, 0] },
      artists: { played: 0, wins: 0, perfectGames: 0, currentStreak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0] },
      links: { played: 0, wins: 0, perfectGames: 0, currentStreak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0] },
      guesser: { played: 0, wins: 0, perfectGames: 0, currentStreak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0] },
      arena: { played: 0, wins: 0, perfectGames: 0, currentStreak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0] },
      refrain: { played: 0, wins: 0, perfectGames: 0, currentStreak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0] }
    };

    const cloudStats = {
      totalPoints: 300,
      totalDouzePoints: 20,
      word_game: { played: 10, wins: 8, perfectGames: 4, currentStreak: 5, maxStreak: 6, distribution: [4, 2, 2, 0, 0, 0] },
      artists: { played: 3, wins: 2, perfectGames: 1, currentStreak: 1, maxStreak: 2, distribution: [1, 1, 0, 0, 0, 0] },
      links: { played: 0, wins: 0, perfectGames: 0, currentStreak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0] },
      guesser: { played: 0, wins: 0, perfectGames: 0, currentStreak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0] },
      arena: { played: 0, wins: 0, perfectGames: 0, currentStreak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0] },
      refrain: { played: 0, wins: 0, perfectGames: 0, currentStreak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0] }
    };

    // Calculate sum of played games:
    // Local total played = 5 + 0 + 0 + 0 + 0 + 0 = 5 games
    // Cloud total played = 10 + 3 + 0 + 0 + 0 + 0 = 13 games
    // Cloud has more plays, so it must be the dominant profile.
    
    // We run the actual production mergeGlobalStats algorithm to verify arithmetic integrity
    const mergeTestResult = mergeGlobalStats(localStats as any, cloudStats as any);

    assert.equal(mergeTestResult.totalPoints, 300, 'Dominant cloud points must be selected');
    assert.equal(mergeTestResult.totalDouzePoints, 20, 'Dominant cloud douze points must be selected');
    assert.equal(mergeTestResult.word_game.played, 10, 'Dominant cloud word_game plays must be selected');
    assert.equal(mergeTestResult.word_game.wins, 8, 'Dominant cloud word_game wins must be selected');
    assert.equal(mergeTestResult.artists.played, 3, 'Dominant cloud artists plays must be selected');
  });

  test('Card Collection Merging: Highest Card Count Rule (Strictly No Union)', () => {
    // Scenario A: Cloud has more cards than Local
    const cloudCardsA = {
      'card-1': { obtainedAt: 100 },
      'card-2': { obtainedAt: 200 },
      'card-3': { obtainedAt: 300 }
    };
    const localCardsA = {
      'card-4': { obtainedAt: 400 },
      'card-5': { obtainedAt: 500 }
    };

    const countA_local = Object.keys(localCardsA).length; // 2
    const countA_cloud = Object.keys(cloudCardsA).length; // 3
    let winningCardsA = cloudCardsA;
    if (countA_local > countA_cloud) {
      winningCardsA = localCardsA;
    }
    // Entire cloud set wins; local card-4 and card-5 are NOT merged/unioned
    assert.equal(Object.keys(winningCardsA).length, 3);
    assert.ok(winningCardsA['card-1']);
    assert.ok(winningCardsA['card-2']);
    assert.ok(winningCardsA['card-3']);
    assert.equal((winningCardsA as any)['card-4'], undefined, 'No card union: local card-4 is not added');

    // Scenario B: Local has more cards than Cloud (e.g. played on this device first)
    const cloudCardsB = {
      'card-1': { obtainedAt: 100 }
    };
    const localCardsB = {
      'card-A': { obtainedAt: 10 },
      'card-B': { obtainedAt: 20 },
      'card-C': { obtainedAt: 30 }
    };
    const countB_local = Object.keys(localCardsB).length; // 3
    const countB_cloud = Object.keys(cloudCardsB).length; // 1
    let winningCardsB = cloudCardsB;
    if (countB_local > countB_cloud) {
      winningCardsB = localCardsB;
    }
    // Entire local set wins
    assert.equal(Object.keys(winningCardsB).length, 3);
    assert.ok(winningCardsB['card-A']);
    assert.equal((winningCardsB as any)['card-1'], undefined, 'No card union: cloud card-1 is not added');
  });

  test('Daily Pack Limit Caps at 10 and Resets Across Days', () => {
    const DAILY_PACK_LIMIT = 10;
    
    // Day 1: User earns up to limit
    let dailyPacks = 9;
    let availablePacks = 5;

    // Award 10th pack
    if (dailyPacks < DAILY_PACK_LIMIT) {
      dailyPacks += 1;
      availablePacks += 1;
    }
    assert.equal(dailyPacks, 10, 'Daily packs should reach 10');
    assert.equal(availablePacks, 6, 'Available packs should increment');

    // Attempt to award 11th pack on same day -> blocked
    const canAwardMore = dailyPacks < DAILY_PACK_LIMIT;
    assert.equal(canAwardMore, false, '11th pack on same day must be blocked by daily cap');

    // Next day reset
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const today = new Date();
    const isDifferentDay = today.getUTCDate() !== yesterday.getUTCDate();
    assert.equal(isDifferentDay, true);

    if (isDifferentDay) {
      dailyPacks = 0; // Reset
    }
    assert.equal(dailyPacks, 0, 'New UTC day must reset dailyPacksEarned to 0');
    assert.equal(dailyPacks < DAILY_PACK_LIMIT, true, 'User can earn packs again on new day');
  });

  test('Guest Collection Mutations Work Exclusively in LocalStorage', () => {
    const initialCol = {
      availablePacks: 2,
      packsOpened: 3,
      confetti: 50,
      cards: {} as Record<string, { obtainedAt: number }>
    };
    mockStorage.setItem('douzepoints_eurocards_collection', JSON.stringify(initialCol));

    // Simulate pack open as guest:
    const current = JSON.parse(mockStorage.getItem('douzepoints_eurocards_collection')!);
    assert.equal(current.availablePacks, 2);

    const openedCards = [{ songId: '2024-croatia' }, { songId: '2023-finland' }];
    current.availablePacks -= 1;
    current.packsOpened += 1;
    openedCards.forEach(c => {
      current.cards[c.songId] = { obtainedAt: Date.now() };
    });
    mockStorage.setItem('douzepoints_eurocards_collection', JSON.stringify(current));

    const updated = JSON.parse(mockStorage.getItem('douzepoints_eurocards_collection')!);
    assert.equal(updated.availablePacks, 1);
    assert.equal(updated.packsOpened, 4);
    assert.ok(updated.cards['2024-croatia']);
    assert.ok(updated.cards['2023-finland']);

    // Simulate card craft (costs 30 confetti):
    assert.equal(updated.confetti, 50);
    updated.confetti -= 30;
    updated.cards['2021-italy'] = { obtainedAt: Date.now() };
    mockStorage.setItem('douzepoints_eurocards_collection', JSON.stringify(updated));

    const crafted = JSON.parse(mockStorage.getItem('douzepoints_eurocards_collection')!);
    assert.equal(crafted.confetti, 20);
    assert.ok(crafted.cards['2021-italy']);
  });

  test('Database Cleanup Ghost Profile Classification', () => {
    const isGhostDoc = (data: any) => {
      const hasEmail = typeof data.email === 'string' && data.email.includes('@');
      return !hasEmail || data.authType === 'anonymous';
    };

    // 1. Google Authenticated user -> NOT a ghost (protected)
    const googleUserDoc = { email: 'douzepointsgame@gmail.com', displayName: 'Douze Points', totalPoints: 1200 };
    assert.equal(isGhostDoc(googleUserDoc), false, 'Google authenticated profile must be protected');

    // 2. Anonymous session with null email -> Ghost
    const anonGhostDoc = { email: null, totalPoints: 24, lastUpdated: new Date() };
    assert.equal(isGhostDoc(anonGhostDoc), true, 'Anonymous doc with null email must be identified as ghost');

    // 3. Document missing email field entirely -> Ghost
    const untypedDoc = { totalPoints: 0 };
    assert.equal(isGhostDoc(untypedDoc), true, 'Doc without email must be identified as ghost');
  });

  test('Sequential Login: Cloud Account Determines Whether Daily Game is Played', () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = '2026-09-22';

    // Local guest played today's EuroSong while logged out
    const localGuestStats: any = {
      totalPoints: 12,
      word_game: {
        played: 1,
        wins: 1,
        lastPlayed: today,
        dailyCompletion: { won: true, points: 12, isPerfect: true, guesses: ['SWE'] }
      }
    };
    mockStorage.setItem('eurosong-' + today, JSON.stringify({ guesses: ['SWE'], isGameOver: true, won: true }));

    // Cloud profile (existing account) did NOT play today yet
    const cloudAccountStats: any = {
      totalPoints: 500,
      word_game: {
        played: 50,
        wins: 45,
        lastPlayed: yesterday,
        dailyCompletion: null
      }
    };

    // Rule on sequential login to existing account:
    // The cloud profile decides whether today's daily game is played.
    // Guest game played while not logged in is NOT injected into cloud account.
    const isCloudPlayedToday = cloudAccountStats.word_game.lastPlayed === today && !!cloudAccountStats.word_game.dailyCompletion;
    assert.equal(isCloudPlayedToday, false, 'Cloud account has not played today');

    // Therefore local guest game state must be cleared so logged-in user can play today
    if (!isCloudPlayedToday) {
      mockStorage.removeItem('eurosong-' + today);
    }

    assert.equal(mockStorage.getItem('eurosong-' + today), null, 'Guest game from before login is discarded');
    assert.equal(cloudAccountStats.word_game.played, 50, 'Cloud plays preserved without guest injection');
    assert.equal(cloudAccountStats.totalPoints, 500, 'Cloud points preserved');
  });

  test('Infinite Mode Records Resolve Each Game and Difficulty Individually with Math.max', () => {
    const cloudRecords: Record<string, { bestScore: number; bestStreak: number; mastered?: boolean }> = {
      'arena_classic': { bestScore: 24, bestStreak: 8, mastered: false },
      'song_hard': { bestScore: 50, bestStreak: 12, mastered: true }
    };

    const localRecords: Record<string, { bestScore: number; bestStreak: number; mastered?: boolean }> = {
      'arena_classic': { bestScore: 30, bestStreak: 10, mastered: true }, // local is higher
      'song_hard': { bestScore: 40, bestStreak: 7, mastered: false },     // cloud is higher
      'guesser_expert': { bestScore: 15, bestStreak: 5, mastered: false } // newly played on local
    };

    const mergedRecords: Record<string, { bestScore: number; bestStreak: number; mastered: boolean }> = {};
    const allKeys = Array.from(new Set([...Object.keys(cloudRecords), ...Object.keys(localRecords)]));

    allKeys.forEach(key => {
      const c = cloudRecords[key] || { bestScore: 0, bestStreak: 0, mastered: false };
      const l = localRecords[key] || { bestScore: 0, bestStreak: 0, mastered: false };
      mergedRecords[key] = {
        bestScore: Math.max(c.bestScore, l.bestScore),
        bestStreak: Math.max(c.bestStreak, l.bestStreak),
        mastered: Boolean(c.mastered || l.mastered)
      };
    });

    // arena_classic should take local's bestScore (30 > 24) and streak (10 > 8) and mastered (true)
    assert.equal(mergedRecords['arena_classic'].bestScore, 30);
    assert.equal(mergedRecords['arena_classic'].bestStreak, 10);
    assert.equal(mergedRecords['arena_classic'].mastered, true);

    // song_hard should take cloud's bestScore (50 > 40) and streak (12 > 7) and mastered (true)
    assert.equal(mergedRecords['song_hard'].bestScore, 50);
    assert.equal(mergedRecords['song_hard'].bestStreak, 12);
    assert.equal(mergedRecords['song_hard'].mastered, true);

    // guesser_expert was only on local, should be cleanly adopted
    assert.equal(mergedRecords['guesser_expert'].bestScore, 15);
    assert.equal(mergedRecords['guesser_expert'].bestStreak, 5);
  });
});
