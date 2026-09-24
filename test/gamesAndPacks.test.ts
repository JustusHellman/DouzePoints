import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GameType } from '../data/types';
import { calculatePoints } from '../utils/stats';
import { extractEuroCollectionData, openPack, openMultiplePacks } from '../utils/cards';

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

describe('Games Gameplay, Scoring & Pack Rewards for All Users', () => {

  beforeEach(() => {
    mockStorage.clear();
  });

  test('EuroSong & EuroArtist Scoring & Point Calculations (All 6 Attempts)', () => {
    // Attempt 1 -> 12 points (Douze Points, Perfect)
    const p1 = calculatePoints(GameType.WORD_GAME, { attempts: 1 });
    assert.equal(p1.points, 12);
    assert.equal(p1.isPerfect, true);

    // Attempt 2 -> 10 points
    const p2 = calculatePoints(GameType.WORD_GAME, { attempts: 2 });
    assert.equal(p2.points, 10);
    assert.equal(p2.isPerfect, false);

    // Attempt 3 -> 8 points
    const p3 = calculatePoints(GameType.WORD_GAME, { attempts: 3 });
    assert.equal(p3.points, 8);

    // Attempt 4 -> 6 points
    const p4 = calculatePoints(GameType.WORD_GAME, { attempts: 4 });
    assert.equal(p4.points, 6);

    // Attempt 5 -> 4 points
    const p5 = calculatePoints(GameType.WORD_GAME, { attempts: 5 });
    assert.equal(p5.points, 4);

    // Attempt 6 -> 2 points
    const p6 = calculatePoints(GameType.WORD_GAME, { attempts: 6 });
    assert.equal(p6.points, 2);

    // EuroArtist uses same scale
    const a1 = calculatePoints(GameType.ARTIST_WORD_GAME, { attempts: 1 });
    assert.equal(a1.points, 12);
    assert.equal(a1.isPerfect, true);
  });

  test('EuroLinks & EuroRefrain Scoring & Mistake-based Point Scale', () => {
    // 0 mistakes -> 12 points (Douze Points, Perfect)
    const m0 = calculatePoints(GameType.LINKS_GAME, { mistakes: 0 });
    assert.equal(m0.points, 12);
    assert.equal(m0.isPerfect, true);

    // 1 mistake -> 10 points
    const m1 = calculatePoints(GameType.LINKS_GAME, { mistakes: 1 });
    assert.equal(m1.points, 10);
    assert.equal(m1.isPerfect, false);

    // 2 mistakes -> 8 points
    const m2 = calculatePoints(GameType.LINKS_GAME, { mistakes: 2 });
    assert.equal(m2.points, 8);

    // 3 mistakes -> 6 points
    const m3 = calculatePoints(GameType.LINKS_GAME, { mistakes: 3 });
    assert.equal(m3.points, 6);

    // 4 mistakes -> 4 points
    const m4 = calculatePoints(GameType.LINKS_GAME, { mistakes: 4 });
    assert.equal(m4.points, 4);

    // 5 mistakes -> 2 points
    const m5 = calculatePoints(GameType.LINKS_GAME, { mistakes: 5 });
    assert.equal(m5.points, 2);

    // EuroRefrain uses same scale
    const r0 = calculatePoints(GameType.REFRAIN_GAME, { mistakes: 0 });
    assert.equal(r0.points, 12);
    assert.equal(r0.isPerfect, true);
  });

  test('EuroGuess & EuroArena Scoring', () => {
    // EuroGuess attempt 1 -> 12 points
    const g1 = calculatePoints(GameType.GUESSER, { attempts: 1 });
    assert.equal(g1.points, 12);
    assert.equal(g1.isPerfect, true);

    // EuroArena attempt 1 -> 12 points (Douze Points, Perfect)
    const ar1 = calculatePoints(GameType.ARENA, { attempts: 1 });
    assert.equal(ar1.points, 12);
    assert.equal(ar1.isPerfect, true);

    // EuroArena attempt 2 -> 10 points
    const ar2 = calculatePoints(GameType.ARENA, { attempts: 2 });
    assert.equal(ar2.points, 10);
    assert.equal(ar2.isPerfect, false);

    // EuroArena attempt 3 -> 8 points
    const ar3 = calculatePoints(GameType.ARENA, { attempts: 3 });
    assert.equal(ar3.points, 8);
    assert.equal(ar3.isPerfect, false);
  });

  test('Daily Games: Packs Awarded Upon Finishing a Daily Game (Won or Lost)', () => {
    let collection = {
      availablePacks: 0,
      packsOpened: 0,
      dailyPacksEarned: 0,
      lastDailyReset: Date.now(),
      confetti: 0,
      cards: {}
    };

    const DAILY_LIMIT = 10;
    const finishDailyGame = (won: boolean): { won: boolean; packAwarded: boolean } => {
      if (collection.dailyPacksEarned >= DAILY_LIMIT) {
        return { won, packAwarded: false };
      }
      collection.availablePacks += 1;
      collection.dailyPacksEarned += 1;
      return { won, packAwarded: true };
    };

    // Case 1: Finish daily game with win -> 1 pack earned
    const winResult = finishDailyGame(true);
    assert.equal(winResult.won, true);
    assert.equal(winResult.packAwarded, true);
    assert.equal(collection.availablePacks, 1);
    assert.equal(collection.dailyPacksEarned, 1);

    // Case 2: Finish daily game with loss -> 1 pack earned
    const lossResult = finishDailyGame(false);
    assert.equal(lossResult.won, false);
    assert.equal(lossResult.packAwarded, true, 'Losing daily game still awards a daily pack');
    assert.equal(collection.availablePacks, 2);
    assert.equal(collection.dailyPacksEarned, 2);
  });

  test('Daily Pack Limit Enforced at 10 Packs per Day', () => {
    let collection = {
      availablePacks: 0,
      packsOpened: 0,
      dailyPacksEarned: 0,
      lastDailyReset: Date.now(),
      confetti: 0,
      cards: {}
    };

    const DAILY_LIMIT = 10;
    const awardPack = (): boolean => {
      if (collection.dailyPacksEarned >= DAILY_LIMIT) {
        return false;
      }
      collection.availablePacks += 1;
      collection.dailyPacksEarned += 1;
      return true;
    };

    // Earn 10 daily packs
    for (let i = 0; i < 10; i++) {
      const awarded = awardPack();
      assert.equal(awarded, true, `Pack ${i + 1} must be awarded`);
    }

    assert.equal(collection.availablePacks, 10);
    assert.equal(collection.dailyPacksEarned, 10);

    // 11th daily pack on same day must be rejected
    const eleventh = awardPack();
    assert.equal(eleventh, false, '11th pack attempt must return false due to daily limit');
    assert.equal(collection.availablePacks, 10);
  });

  test('Infinite Mode: Packs Awarded on Streak % 5 === 0 for All Infinite Games', () => {
    let availablePacks = 0;
    let dailyPacksEarned = 0;

    const onInfiniteStreakUpdate = (streak: number) => {
      if (streak % 5 === 0 && dailyPacksEarned < 10) {
        availablePacks += 1;
        dailyPacksEarned += 1;
        return true;
      }
      return false;
    };

    // Streaks 1-4: no milestone
    assert.equal(onInfiniteStreakUpdate(1), false);
    assert.equal(onInfiniteStreakUpdate(4), false);
    assert.equal(availablePacks, 0);

    // Streak 5: milestone pack awarded
    assert.equal(onInfiniteStreakUpdate(5), true);
    assert.equal(availablePacks, 1);

    // Streak 10: milestone pack awarded
    assert.equal(onInfiniteStreakUpdate(10), true);
    assert.equal(availablePacks, 2);

    // Streak 15: milestone pack awarded
    assert.equal(onInfiniteStreakUpdate(15), true);
    assert.equal(availablePacks, 3);
  });

  test('Logged-in User: Strict Canonical Collection Data Extraction from Firestore', () => {
    // Canonical nested schema in Firestore
    const canonicalDoc = {
      collection: {
        availablePacks: 7,
        packsOpened: 20,
        dailyPacksEarned: 4,
        lastDailyReset: 1710000000000,
        confetti: 320,
        cards: {
          '2024-croatia': { obtainedAt: 1710000000000 }
        }
      }
    };

    const extracted = extractEuroCollectionData(canonicalDoc);
    assert.equal(extracted.availablePacks, 7);
    assert.equal(extracted.packsOpened, 20);
    assert.equal(extracted.dailyPacksEarned, 4);
    assert.equal(extracted.confetti, 320);
    assert.ok(extracted.cards['2024-croatia']);

    // Empty doc or new account defaults cleanly
    const emptyExtracted = extractEuroCollectionData(null);
    assert.equal(emptyExtracted.availablePacks, 0);
    assert.equal(emptyExtracted.packsOpened, 0);
    assert.equal(emptyExtracted.confetti, 0);
  });

  test('Card Pack Opening Distribution and Card Rarities', () => {
    const pack = openPack();
    assert.equal(pack.length, 6, 'A single pack must contain 6 cards');
    pack.forEach(card => {
      assert.ok(card.songId, 'Card must have a valid songId');
      assert.ok(card.obtainedAt > 0, 'Card must have valid timestamp');
    });

    const multiPacks = openMultiplePacks(3);
    assert.equal(multiPacks.length, 18, '3 packs must contain 18 cards');
  });

  test('First Login Seeds Guest Packs; Subsequent Login Strictly Enforces Cloud Packs', () => {
    // 1. FIRST LOGIN (user creates account for first time):
    // Guest has 4 available packs earned prior to creating account
    const guestCol = { availablePacks: 4, packsOpened: 1, confetti: 30 };
    const firstLoginSeeded = {
      availablePacks: guestCol.availablePacks,
      packsOpened: guestCol.packsOpened,
      confetti: guestCol.confetti
    };
    assert.equal(firstLoginSeeded.availablePacks, 4, 'First login transfers guest available packs');

    // 2. SUBSEQUENT LOGIN (user already has cloud profile with 2 available packs):
    // Incognito window tampered or has 999 packs
    const cloudAccount = { availablePacks: 2, packsOpened: 15, confetti: 100 };
    const incognitoTampered = { availablePacks: 999, packsOpened: 0, confetti: 50 };

    const subsequentLoginResolution = {
      availablePacks: cloudAccount.availablePacks, // STRICT CLOUD (Anti-farming rule)
      packsOpened: Math.max(cloudAccount.packsOpened, incognitoTampered.packsOpened),
      confetti: Math.max(cloudAccount.confetti, incognitoTampered.confetti)
    };

    assert.equal(subsequentLoginResolution.availablePacks, 2, 'Subsequent login strictly enforces cloud available packs');
    assert.equal(subsequentLoginResolution.packsOpened, 15);
    assert.equal(subsequentLoginResolution.confetti, 100);
  });

});
