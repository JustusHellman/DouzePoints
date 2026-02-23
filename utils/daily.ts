export const getDayString = () => {
  // Use UTC date to ensure everyone gets the same puzzle at the same time
  return new Date().toISOString().split('T')[0];
};

const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};

/**
 * Returns a stable index for a given day and game salt.
 * Implements a 70/30 weighting for 'golden' vs 'cult' tiers if metadata is present.
 */
export const getDailyIndex = (data: any[], salt: string) => {
  const seed = hashCode(getDayString() + salt);
  
  if (!data || data.length === 0) return 0;

  // Tiered weighting logic for MasterSong data
  if (data.length > 0 && typeof data[0] === 'object' && 'tier' in data[0]) {
    const golden = data.filter(s => s.tier === 'golden');
    const cult = data.filter(s => s.tier === 'cult');

    // Only apply weighting if both pools are available
    if (golden.length > 0 && cult.length > 0) {
      const tierRoll = seed % 10;
      const targetTier = tierRoll < 7 ? 'golden' : 'cult'; // 0-6: Golden (70%), 7-9: Cult (30%)
      const pool = targetTier === 'golden' ? golden : cult;
      
      const selectedItem = pool[seed % pool.length];
      return data.indexOf(selectedItem);
    }
  }

  // Fallback for simple flat lists (e.g. EuroLinks puzzles)
  return seed % data.length;
};

/**
 * Returns the time remaining until the next day starts in UTC.
 */
export const getTimeUntilNext = () => {
  const now = new Date();
  
  // Calculate milliseconds until next midnight UTC
  const nextMidnightUtc = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0, 0, 0, 0
  ));
  
  const diff = nextMidnightUtc.getTime() - now.getTime();
  
  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);
  
  return {
    hours: h.toString().padStart(2, '0'),
    minutes: m.toString().padStart(2, '0'),
    seconds: s.toString().padStart(2, '0')
  };
};
