import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { db, auth } from '../firebase.ts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import WeightSimulator from './WeightSimulator.tsx';
import EuroLinksPreview from './EuroLinksPreview.tsx';
import { getActiveMasterData, SEARCH_WEIGHT_THRESHOLD } from '../data/activeData.ts';
import { PUZZLES } from '../data/linksgameData.ts';
import { getActiveRefrainData } from '../data/activeData.ts';
import { getDailyIndex, normalize, isLetter } from '../utils/daily.ts';
import { MasterSong, ConnectionsGroup } from '../data/types.ts';
import { generateRandomEuroLinksPuzzle } from '../utils/linksGenerator.ts';
import { BingoAdminPanel } from './BingoAdminPanel.tsx';
import { DataImportPanel } from './DataImportPanel.tsx';
import { GrantConfettiPanel } from './GrantConfettiPanel.tsx';

const ADMIN_EMAILS = ['justusmhellman@gmail.com', 'justus.jo.li@gmail.com', 'douzepointsgame@gmail.com'];

interface DailyStats { date: string; totalPlayed: number; gameType: string; distribution: Record<string, number>; }
interface SupportClick { date: string; count: number; sources?: Record<string, number>; }
interface ShareClick { date: string; count: number; sources?: Record<string, number>; }
interface LanguageStats { date: string; total: number; languages: Record<string, number>; }
interface CompletionStats { date: string; totalCompleted: number; distribution: Record<string, number>; }
interface DiscoveryStats { date: string; count: number; sources?: Record<string, number>; }
interface InfiniteDailyStats { date: string; gameId: string; difficulty: string; totalStarts: number; totalCompletions?: number; totalLosses?: number; totalScore?: number; totalStreak?: number; }
interface InfiniteRun { id: string; timestamp: { toDate: () => Date } | null; gameId: string; difficulty: string; score: number; streak: number; wasCompleted: boolean; }
interface PlaytimeStats { date: string; totalSeconds?: number; dailySeconds?: number; infiniteSeconds?: number; navigationSeconds?: number; [key: string]: string | number | boolean | undefined | null | object; }

const getDailyAnswer = (gameType: string, dateStr: string) => {
  try {
    const activeData = getActiveMasterData();
    const weightedData = activeData.filter(s => (s.weight || 0) >= SEARCH_WEIGHT_THRESHOLD);
    const pool = weightedData.length > 0 ? weightedData : activeData;

    if (gameType === 'WORD_GAME') { const validPool = pool.filter(song => normalize(song.title).split('').some(char => isLetter(char))); return validPool[getDailyIndex(validPool, "DAILY-V3-WORD_GAME-eurosong-SALT-VERIFIED", dateStr)]; }
    if (gameType === 'ARTIST_WORD_GAME') { const validPool = pool.filter(song => normalize(song.artist).split('').some(char => isLetter(char))); return validPool[getDailyIndex(validPool, "DAILY-V3-ARTIST_WORD_GAME-euroartist-SALT-VERIFIED", dateStr)]; }
    if (gameType === 'LINKS_GAME') { return PUZZLES[getDailyIndex(PUZZLES, "eurolinks", dateStr)]; }
    if (gameType === 'GUESSER') { return pool[getDailyIndex(pool, "euroguess", dateStr)]; }
    if (gameType === 'ARENA') { return pool[getDailyIndex(pool, "euroarena", dateStr)]; }
    if (gameType === 'REFRAIN_GAME') {
      const seedStr = dateStr + "eurorefrain-salt-v1"; let hash = 0;
      for (let i = 0; i < seedStr.length; i++) { hash = (hash << 5) - hash + seedStr.charCodeAt(i); hash |= 0; }
      const seed = Math.abs(hash);
      const refrainPool = getActiveRefrainData();
      const pools = { easy: refrainPool.filter(s => s.tier === 'easy'), medium: refrainPool.filter(s => s.tier === 'medium'), hard: refrainPool.filter(s => s.tier === 'hard'), expert: refrainPool.filter(s => s.tier === 'expert') };
      const usedWords = new Set<string>(); const usedTitles = new Set<string>();
      const pick = (pool: { words: string[], title: string }[], salt: number) => { let a = 0; while (a < pool.length) { const idx = (seed + salt + a) % pool.length; const c = pool[idx]; if (!c.words.some((w: string) => usedWords.has(w.toUpperCase())) && !usedTitles.has(c.title)) { c.words.forEach((w: string) => usedWords.add(w.toUpperCase())); usedTitles.add(c.title); return c; } a++; } return pool[0]; };
      return { easy: pick(pools.easy, 1), medium: pick(pools.medium, 2), hard: pick(pools.hard, 3), expert: pick(pools.expert, 4) };
    }
  } catch (e) { console.error(e); return null; }
  return null;
};

const CustomSupportTooltip = ({ active, payload, label }: { active?: boolean, payload?: { payload: { supportSources?: Record<string, number>, supportClicks?: number } }[], label?: string }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload; const sources = data.supportSources || {};
  return (
    <div className="bg-[#1a1a2e] border border-white/20 p-4 rounded-xl shadow-xl">
      <p className="text-white font-bold mb-2">{label}</p>
      <p className="text-[#FFDD00] font-black text-lg mb-2">Total Clicks: {data.supportClicks}</p>
      {Object.keys(sources).length > 0 && (
        <div className="space-y-1 border-t border-white/10 pt-2">
          {Object.entries(sources).map(([s, c]) => (
            <div key={s} className="flex justify-between text-xs"><span className="text-gray-400 mr-4">{s}</span><span className="text-white font-bold">{c as number}</span></div>
          ))}
        </div>
      )}
    </div>
  );
};

const CustomShareTooltip = ({ active, payload, label }: { active?: boolean, payload?: { payload: { shareSources?: Record<string, number>, shareClicks?: number } }[], label?: string }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload; const sources = data.shareSources || {};
  return (
    <div className="bg-[#1a1a2e] border border-white/20 p-4 rounded-xl shadow-xl">
      <p className="text-white font-bold mb-2">{label}</p>
      <p className="text-[#00FF00] font-black text-lg mb-2">Total Shares: {data.shareClicks}</p>
      {Object.keys(sources).length > 0 && (
        <div className="space-y-1 border-t border-white/10 pt-2">
          {Object.entries(sources).map(([s, c]) => (
            <div key={s} className="flex justify-between text-xs"><span className="text-gray-400 mr-4">{s}</span><span className="text-white font-bold">{c as number}</span></div>
          ))}
        </div>
      )}
    </div>
  );
};

const CustomDiscoveryTooltip = ({ active, payload, label }: { active?: boolean, payload?: { payload: { discoverySources?: Record<string, number>, discoveries?: number } }[], label?: string }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload; const sources = data.discoverySources || {};
  return (
    <div className="bg-[#1a1a2e] border border-white/20 p-4 rounded-xl shadow-xl">
      <p className="text-white font-bold mb-2">{label}</p>
      <p className="text-[#06B6D4] font-black text-lg mb-2">New Players: {data.discoveries}</p>
      {Object.keys(sources).length > 0 && (
        <div className="space-y-1 border-t border-white/10 pt-2">
          {Object.entries(sources).map(([s, c]) => (
            <div key={s} className="flex justify-between text-xs"><span className="text-gray-400 mr-4">{s}</span><span className="text-white font-bold">{c as number}</span></div>
          ))}
        </div>
      )}
    </div>
  );
};

const LANG_COLORS = ['#EC4899','#8B5CF6','#3B82F6','#10B981','#F59E0B','#EF4444','#06B6D4','#F97316','#84CC16','#A855F7','#14B8A6','#E11D48','#6366F1','#D946EF','#0EA5E9','#22C55E','#FBBF24','#FB7185','#2DD4BF','#C084FC','#38BDF8','#4ADE80','#FACC15','#F87171','#818CF8','#E879F9','#7DD3FC','#86EFAC','#FDE047','#FCA5A5'];
const COLORS = ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
const ALL_GAME_TYPES = ['WORD_GAME', 'ARTIST_WORD_GAME', 'LINKS_GAME', 'GUESSER', 'ARENA', 'REFRAIN_GAME'];
const GAME_COLORS: Record<string, string> = {
  'WORD_GAME': '#EF4444',        // EuroSong (Red)
  'ARTIST_WORD_GAME': '#8B5CF6', // EuroArtist (Purple)
  'GUESSER': '#3B82F6',          // EuroGuess (Blue)
  'LINKS_GAME': '#10B981',       // EuroLinks (Green)
  'REFRAIN_GAME': '#EAB308',     // EuroRefrain (Yellow)
  'ARENA': '#EC4899'             // EuroArena (Pink)
};

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [supportClicks, setSupportClicks] = useState<SupportClick[]>([]);
  const [shareClicks, setShareClicks] = useState<ShareClick[]>([]);
  const [completionStats, setCompletionStats] = useState<CompletionStats[]>([]);
  const [discoveryStats, setDiscoveryStats] = useState<DiscoveryStats[]>([]);
  const [infiniteStats, setInfiniteStats] = useState<InfiniteDailyStats[]>([]);
  const [daysSpan, setDaysSpan] = useState(30);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'grant-confetti' | 'weights' | 'links-preview' | 'bingo-admin' | 'data-import'>('stats');
  const [linksPuzzle, setLinksPuzzle] = useState<ConnectionsGroup[]>([]);
  const [completionMode, setCompletionMode] = useState<'period' | 'day'>('day');
  const [completionDate, setCompletionDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [devBypass, setDevBypass] = useState<boolean>(false);
  const [infiniteMode, setInfiniteMode] = useState<'period' | 'day'>('day');
  const [infiniteDate, setInfiniteDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [gameScoreGame, setGameScoreGame] = useState<string>('ALL');
  const [gameScoreMode, setGameScoreMode] = useState<'period' | 'day'>('day');
  const [gameScoreDate, setGameScoreDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const gameNameMap: Record<string, string> = { 'WORD_GAME': 'EuroSong', 'ARTIST_WORD_GAME': 'EuroArtist', 'LINKS_GAME': 'EuroLinks', 'GUESSER': 'EuroGuess', 'ARENA': 'EuroArena', 'REFRAIN_GAME': 'EuroRefrain' };
  const getGameName = (type: string) => gameNameMap[type] || type;

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const startDate = new Date(); startDate.setDate(startDate.getDate() - daysSpan);
      const s = startDate.toISOString().split('T')[0];

      const safeFetch = async <T,>(col: string): Promise<T[]> => {
        try {
          const snap = await getDocs(query(collection(db, col), where('date', '>=', s), orderBy('date', 'asc')));
          const d: T[] = [];
          snap.forEach(doc => d.push(doc.data() as T));
          return d;
        } catch (e) {
          console.warn(`Failed to fetch ${col}:`, e);
          return [];
        }
      };
      const [gs, sc, sh, cs, ds, is] = await Promise.all([
        safeFetch<DailyStats>('game_stats'),
        safeFetch<SupportClick>('support_clicks'),
        safeFetch<ShareClick>('share_clicks'),
        safeFetch<CompletionStats>('completion_stats'),
        safeFetch<DiscoveryStats>('discoveries'),
        safeFetch<InfiniteDailyStats>('infinite_daily_stats')
      ]);

      const normalizeDistribution = (item: any) => {
        if (!item) return item;
        const normalized = { ...item };
        normalized.distribution = normalized.distribution || {};
        
        Object.keys(normalized).forEach(key => {
          if (key.startsWith('distribution.')) {
            const score = key.split('.')[1];
            normalized.distribution[score] = normalized[key];
          }
        });
        return normalized;
      };

      setStats(gs.map(normalizeDistribution));
      setSupportClicks(sc);
      setShareClicks(sh);
      setCompletionStats(cs.map(normalizeDistribution));
      setDiscoveryStats(ds);
      setInfiniteStats(is);

      setLastRefreshed(new Date());
    } catch (err) {
      console.error('Error in fetchData:', err);
      setError('Failed to load some data. Check console for details or ensure Firebase rules are deployed.');
    }
    finally { setRefreshing(false); }
  }, [daysSpan]);

  useEffect(() => {
    getRedirectResult(auth).catch((e) => console.error("Redirect auth error:", e));
    const u = onAuthStateChanged(auth, (cu) => { setUser(cu); setLoading(false); });
    return () => u();
  }, []);
  useEffect(() => { if (devBypass || (user && ADMIN_EMAILS.includes(user.email || ''))) fetchData(); }, [user, devBypass, fetchData]);

  const handleGenerateLinks = () => {
    setLinksPuzzle(generateRandomEuroLinksPuzzle());
  };

  useEffect(() => {
    if (activeTab === 'links-preview' && linksPuzzle.length === 0) {
      handleGenerateLinks();
    }
  }, [activeTab, linksPuzzle.length]);
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (e: any) {
      console.error("Popup sign-in error:", e);
      if (e?.code === 'auth/unauthorized-domain') {
        alert("Domain Not Authorized!\n\nPlease add your production domain to Firebase Console:\nFirebase Console -> Authentication -> Settings -> Authorized Domains.");
      } else {
        // Fallback to redirect if popup is blocked or closed by browser security
        try {
          await signInWithRedirect(auth, provider);
        } catch (err: any) {
          console.error("Redirect sign-in error:", err);
          alert(`Sign-in failed: ${err?.message || err}`);
        }
      }
    }
  };

  const handleRedirectLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithRedirect(auth, provider);
    } catch (e: any) {
      console.error("Redirect sign-in error:", e);
      alert(`Sign-in error: ${e?.message || e}`);
    }
  };

  const handleLogout = async () => {
    try { await signOut(auth); } catch (e) { console.error("Error signing out", e); }
  };

  const gameTypes = Array.from(new Set(stats.map(s => s.gameType)));
  const dailyTotals = stats.reduce((acc, c) => { if (!acc[c.date]) acc[c.date] = 0; acc[c.date] += c.totalPlayed; return acc; }, {} as Record<string, number>);

  const chartData = Object.keys(dailyTotals).map(date => {
    const sup = supportClicks.find(c => c.date === date);
    const sh = shareClicks.find(c => c.date === date);
    const disc = discoveryStats.find(c => c.date === date);
    return {
      date,
      totalGames: dailyTotals[date],
      supportClicks: sup?.count || 0,
      supportSources: sup?.sources || {},
      shareClicks: sh?.count || 0,
      shareSources: sh?.sources || {},
      discoveries: disc?.count || 0,
      discoverySources: disc?.sources || {}
    };
  });

  const gameData = Object.keys(dailyTotals).map(date => {
    const d: Record<string, string | number> = { date };
    gameTypes.forEach(type => { const stat = stats.find(s => s.date === date && s.gameType === type); d[type] = stat ? stat.totalPlayed : 0; });
    return d;
  });

  const completionSource = completionMode === 'day'
    ? completionStats.filter(c => c.date === completionDate)
    : completionStats;

  const completionDistribution = useMemo(() => {
    return completionSource.reduce((acc, c) => {
      if (c.distribution) {
        Object.entries(c.distribution).forEach(([sc, ct]) => {
          acc[sc] = (acc[sc] || 0) + Number(ct);
        });
      }
      return acc;
    }, {} as Record<string, number>);
  }, [completionSource]);

  const completionChartData = useMemo(() => {
    return Object.entries(completionDistribution)
      .map(([sc, count]) => ({
        score: Number(sc),
        count
      }))
      .filter(item => !isNaN(item.score))
      .sort((a, b) => a.score - b.score);
  }, [completionDistribution]);

  const gameScoreSource = useMemo(() => {
    return stats.filter(s => {
      const matchDate = gameScoreMode === 'day' ? s.date === gameScoreDate : true;
      const matchGame = gameScoreGame === 'ALL' ? true : s.gameType === gameScoreGame;
      return matchDate && matchGame;
    });
  }, [stats, gameScoreMode, gameScoreDate, gameScoreGame]);

  const gameScoreSummary = useMemo(() => {
    let totalPlayedSum = 0;
    let totalWithDistribution = 0;

    // scoreMap: score -> gameType -> count
    const scoreMap: Record<number, Record<string, number>> = {};
    const standardScores = [12, 10, 8, 6, 4, 2, 0];
    standardScores.forEach(sc => {
      scoreMap[sc] = {};
    });

    gameScoreSource.forEach(s => {
      totalPlayedSum += s.totalPlayed || 0;
      if (s.distribution && Object.keys(s.distribution).length > 0) {
        Object.entries(s.distribution).forEach(([ptsStr, count]) => {
          const numPts = Number(ptsStr);
          const numCount = Number(count);
          if (!isNaN(numPts) && !isNaN(numCount) && numCount > 0) {
            if (!scoreMap[numPts]) {
              scoreMap[numPts] = {};
            }
            scoreMap[numPts][s.gameType] = (scoreMap[numPts][s.gameType] || 0) + numCount;
            totalWithDistribution += numCount;
          }
        });
      }
    });

    const activeGameTypes = gameScoreGame === 'ALL'
      ? ALL_GAME_TYPES
      : [gameScoreGame];

    const chartData = Object.keys(scoreMap)
      .map(Number)
      .sort((a, b) => b - a) // Left to right: 12 down to 0
      .map(score => {
        const row: Record<string, any> = { score };
        let totalForScore = 0;
        activeGameTypes.forEach(gType => {
          const cnt = scoreMap[score]?.[gType] || 0;
          row[gType] = cnt;
          totalForScore += cnt;
        });
        row.totalPlays = totalForScore;
        return row;
      });

    return { chartData, totalPlayedSum, totalWithDistribution, activeGameTypes };
  }, [gameScoreSource, gameScoreGame]);

  const CustomGameScoreTooltip = ({ active, payload, label }: { active?: boolean, payload?: any[], label?: string }) => {
    if (!active || !payload?.length) return null;
    const data = payload[0]?.payload;
    const scoreVal = data?.score !== undefined ? data.score : label;
    const nonZeroPayload = payload.filter(e => (e.value || 0) > 0);
    const total = payload.reduce((sum: number, e: any) => sum + (e.value || 0), 0);

    return (
      <div className="bg-[#1a1a2e] border border-white/20 rounded-lg p-3 shadow-xl min-w-[160px]">
        <p className="text-white font-bold mb-2 border-b border-white/10 pb-1">{scoreVal} pts</p>
        {nonZeroPayload.length > 0 ? (
          nonZeroPayload.map((e: any, i: number) => (
            <div key={i} className="flex items-center justify-between gap-4 text-sm mb-1">
              <span style={{ color: e.color }} className="font-bold">{e.name}:</span>
              <span className="text-white font-bold">{e.value} play{e.value !== 1 ? 's' : ''}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-xs italic">No plays recorded</p>
        )}
        <div className="flex items-center justify-between gap-4 text-sm mt-2 pt-2 border-t border-white/10">
          <span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Total:</span>
          <span className="text-white font-black">{total} play{total !== 1 ? 's' : ''}</span>
        </div>
      </div>
    );
  };

  const CustomGamesTooltip = ({ active, payload, label }: { active?: boolean, payload?: { color?: string, name?: string, value?: number }[], label?: string }) => {
    if (!active || !payload?.length) return null;
    const total = payload.reduce((sum: number, e: { value?: number }) => sum + (e.value || 0), 0);
    return (
      <div className="bg-[#1a1a2e] border border-white/20 rounded-lg p-3 shadow-xl min-w-[150px]">
        <p className="text-white font-bold mb-2 border-b border-white/10 pb-1">{label}</p>
        {payload.map((e: { color?: string, name?: string, value?: number }, i: number) => (<div key={i} className="flex items-center justify-between gap-4 text-sm mb-1"><span style={{ color: e.color }} className="font-bold">{e.name}:</span><span className="text-white font-bold">{e.value}</span></div>))}
        <div className="flex items-center justify-between gap-4 text-sm mt-2 pt-2 border-t border-white/10"><span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Total:</span><span className="text-white font-black">{total}</span></div>
      </div>
    );
  };

  // Infinite mode computed data
  const infiniteVolumeChartData = useMemo(() => {
    const source = infiniteMode === 'day'
      ? infiniteStats.filter(s => s.date === infiniteDate)
      : infiniteStats;

    if (infiniteMode === 'period') {
      const grouped: Record<string, { name: string; starts: number; completions: number; losses: number }> = {};
      source.forEach(s => {
        if (!grouped[s.date]) grouped[s.date] = { name: s.date, starts: 0, completions: 0, losses: 0 };
        grouped[s.date].starts += s.totalStarts || 0;
        grouped[s.date].completions += s.totalCompletions || 0;
        grouped[s.date].losses += s.totalLosses || 0;
      });
      return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name));
    } else {
      const grouped: Record<string, { name: string; starts: number; completions: number; losses: number }> = {};
      source.forEach(s => {
        const label = s.gameId.replace('euro', '').charAt(0).toUpperCase() + s.gameId.replace('euro', '').slice(1);
        if (!grouped[label]) grouped[label] = { name: label, starts: 0, completions: 0, losses: 0 };
        grouped[label].starts += s.totalStarts || 0;
        grouped[label].completions += s.totalCompletions || 0;
        grouped[label].losses += s.totalLosses || 0;
      });
      return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [infiniteStats, infiniteMode, infiniteDate]);

  const infiniteTotals = useMemo(() => {
    const t = { starts: 0, completions: 0, losses: 0 };
    infiniteVolumeChartData.forEach(d => {
      t.starts += d.starts;
      t.completions += d.completions;
      t.losses += d.losses;
    });
    return t;
  }, [infiniteVolumeChartData]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-[#050510]">Loading...</div>;

  if (!devBypass && (!user || !ADMIN_EMAILS.includes(user.email || ''))) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#050510] page-fade px-6">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
            <div className="text-6xl mb-2">🔒</div>
            <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter glow-text">Backstage</h1>
            <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed">
              {user?.email 
                ? `Signed in as ${user.email}, which is not authorized for backstage access.`
                : "You've reached the restricted area. This section is reserved for the production crew."}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => {
                setDevBypass(true);
                fetchData();
              }} 
              className="w-full px-8 py-4 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-2xl font-bold uppercase tracking-widest text-xs text-amber-300 transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              ⚡ Bypass Auth (Dev / Preview Mode)
            </button>
            <button onClick={() => navigate('/')} className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-pink-500/20 text-sm">
              Return to Greenroom
            </button>
            <button onClick={handleLogin} className="w-full px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs text-gray-400 hover:text-white transition-all">
              {user?.email ? "Switch Google Account" : "Admin Login with Google"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-8 page-fade">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white glow-text leading-none">Admin Dashboard</h1>
            <span className="text-xs bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono px-3 py-1 rounded-full">
              {user?.email || 'Dev Mode'}
            </span>
            <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-white underline font-semibold">
              Sign Out
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            <button onClick={() => setActiveTab('stats')} className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'stats' ? 'bg-white text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}>Stats</button>
            <button onClick={() => setActiveTab('grant-confetti')} className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'grant-confetti' ? 'bg-white text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}>Grant Confetti 🎉</button>
            <button onClick={() => setActiveTab('weights')} className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'weights' ? 'bg-white text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}>Weight Simulator</button>
            <button onClick={() => setActiveTab('links-preview')} className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'links-preview' ? 'bg-white text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}>Links Preview</button>
            <button onClick={() => setActiveTab('bingo-admin')} className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'bingo-admin' ? 'bg-white text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}>Bingo Admin</button>
            <button onClick={() => setActiveTab('data-import')} className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'data-import' ? 'bg-white text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}>Data Import</button>
          </div>
        </div>
        {activeTab === 'stats' && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <button onClick={() => fetchData()} disabled={refreshing} className={`flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-300 transition-all ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <svg className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              {lastRefreshed && <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">Last refreshed: {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Time Span:</span>
              <select value={daysSpan} onChange={(e) => setDaysSpan(Number(e.target.value))} className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm font-bold outline-none focus:border-pink-500 appearance-none cursor-pointer">
                <option value={7} className="bg-[#1a1a2e] text-white">Last 7 Days</option>
                <option value={14} className="bg-[#1a1a2e] text-white">Last 14 Days</option>
                <option value={30} className="bg-[#1a1a2e] text-white">Last 30 Days</option>
                <option value={90} className="bg-[#1a1a2e] text-white">Last 90 Days</option>
              </select>
            </div>
          </div>
        )}
      </header>

      {error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl mb-8">{error}</div>}

      {activeTab === 'stats' ? (
        <div className="space-y-12">
          {/* 1. Games Breakdown */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Games Breakdown</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gameData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                  <XAxis dataKey="date" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <Tooltip content={<CustomGamesTooltip />} cursor={{ fill: '#ffffff10' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  {gameTypes.map((type, index) => (<Bar key={type} dataKey={type} name={getGameName(type)} stackId="a" fill={GAME_COLORS[type] || COLORS[index % COLORS.length]} />))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Per-Game Score Distribution */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
              <h2 className="text-xl font-black uppercase tracking-widest text-white mb-2 lg:mb-0">Per-Game Score Distribution</h2>
              <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Game:</span>
                  <select value={gameScoreGame} onChange={(e) => setGameScoreGame(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500 appearance-none cursor-pointer">
                    <option value="ALL" className="bg-[#1a1a2e] text-white">All Games</option>
                    <option value="WORD_GAME" className="bg-[#1a1a2e] text-white">EuroSong</option>
                    <option value="ARTIST_WORD_GAME" className="bg-[#1a1a2e] text-white">EuroArtist</option>
                    <option value="LINKS_GAME" className="bg-[#1a1a2e] text-white">EuroLinks</option>
                    <option value="GUESSER" className="bg-[#1a1a2e] text-white">EuroGuess</option>
                    <option value="ARENA" className="bg-[#1a1a2e] text-white">EuroArena</option>
                    <option value="REFRAIN_GAME" className="bg-[#1a1a2e] text-white">EuroRefrain</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">View:</span>
                  <select value={gameScoreMode} onChange={(e) => setGameScoreMode(e.target.value as 'period' | 'day')} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500 appearance-none cursor-pointer">
                    <option value="day" className="bg-[#1a1a2e] text-white">Specific Day</option>
                    <option value="period" className="bg-[#1a1a2e] text-white">Entire Period</option>
                  </select>
                </div>
                {gameScoreMode === 'day' && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Date:</span>
                    <input type="date" value={gameScoreDate} onChange={(e) => setGameScoreDate(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500 text-white" />
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">
              {gameScoreMode === 'period'
                ? `Score breakdown across ${gameScoreGame === 'ALL' ? 'all games' : getGameName(gameScoreGame)} over period — ${gameScoreSummary.totalWithDistribution} score entries logged (${gameScoreSummary.totalPlayedSum} total plays)`
                : `Score breakdown for ${gameScoreGame === 'ALL' ? 'all games' : getGameName(gameScoreGame)} on ${gameScoreDate} — ${gameScoreSummary.totalWithDistribution} score entries logged (${gameScoreSummary.totalPlayedSum} total plays)`}
            </p>
            <div className="h-[400px] w-full">
              {gameScoreSummary.chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gameScoreSummary.chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                    <XAxis
                      dataKey="score"
                      stroke="#ffffff60"
                      tick={{ fill: '#ffffff60', fontSize: 11 }}
                      tickFormatter={(v: number) => `${v} pts`}
                    />
                    <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                    <Tooltip content={<CustomGameScoreTooltip />} cursor={{ fill: '#ffffff10' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    {gameScoreSummary.activeGameTypes.map((type) => (
                      <Bar
                        key={type}
                        dataKey={type}
                        name={getGameName(type)}
                        stackId="a"
                        fill={GAME_COLORS[type] || '#EC4899'}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 italic">No per-game score distribution data available for this selection</div>
              )}
            </div>
          </section>

          {/* 2. Daily Completion Scores */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Daily Completion Scores</h2>
              <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">View:</span>
                  <select value={completionMode} onChange={(e) => setCompletionMode(e.target.value as 'period' | 'day')} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500 appearance-none cursor-pointer">
                    <option value="day" className="bg-[#1a1a2e] text-white">Specific Day</option>
                    <option value="period" className="bg-[#1a1a2e] text-white">Entire Period</option>
                  </select>
                </div>
                {completionMode === 'day' && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Date:</span>
                    <input type="date" value={completionDate} onChange={(e) => setCompletionDate(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500" />
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">
              {completionMode === 'period'
                ? `Aggregate over selected time period — ${completionChartData.reduce((sum, d) => sum + d.count, 0)} players total`
                : `Showing data for ${completionDate} — ${completionChartData.reduce((sum, d) => sum + d.count, 0)} players total`}
            </p>
            <div className="h-[400px] w-full">
              {completionChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={completionChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                    <XAxis
                      dataKey="score"
                      stroke="#ffffff60"
                      tick={{ fill: '#ffffff60', fontSize: 11 }}
                      tickFormatter={(v: number) => `${v} pts`}
                    />
                    <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#1a1a2e] border border-white/20 p-4 rounded-xl shadow-xl min-w-[120px]">
                            <p className="text-white font-bold mb-1">{data.score} pts</p>
                            <p className="text-[#F59E0B] font-black text-lg">{data.count} player{data.count !== 1 ? 's' : ''}</p>
                          </div>
                        );
                      }}
                      cursor={{ fill: '#ffffff10' }}
                    />
                    <Bar dataKey="count" name="Number of Players" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 italic">No completion data available</div>
              )}
            </div>
          </section>

          {/* 3. Infinite Mode Stats */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            {/* Header + Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-xl font-black uppercase tracking-widest text-white">Infinite Mode</h2>
              <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">View:</span>
                  <select value={infiniteMode} onChange={(e) => setInfiniteMode(e.target.value as 'period' | 'day')} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500 appearance-none cursor-pointer">
                    <option value="day" className="bg-[#1a1a2e] text-white">Specific Day</option>
                    <option value="period" className="bg-[#1a1a2e] text-white">Entire Period</option>
                  </select>
                </div>
                {infiniteMode === 'day' && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Date:</span>
                    <input type="date" value={infiniteDate} onChange={(e) => setInfiniteDate(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500" />
                  </div>
                )}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Starts</div>
                <div className="text-3xl font-black text-blue-400">{infiniteTotals.starts}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Losses</div>
                <div className="text-3xl font-black text-red-400">{infiniteTotals.losses}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Wins</div>
                <div className="text-3xl font-black text-green-400">{infiniteTotals.completions}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Win Rate</div>
                <div className="text-3xl font-black text-purple-400">
                  {(infiniteTotals.completions + infiniteTotals.losses) > 0
                    ? `${((infiniteTotals.completions / (infiniteTotals.completions + infiniteTotals.losses)) * 100).toFixed(1)}%`
                    : '—'}
                </div>
              </div>
            </div>

            {/* Panel 1: Volume Chart */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">
                {infiniteMode === 'period' ? 'Daily Volume' : `Volume by Game — ${infiniteDate}`}
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                {infiniteMode === 'period'
                  ? 'Stacked wins & losses per day, with starts as overlay line'
                  : 'Grouped bars per game'}
              </p>
              <div className="h-[350px] w-full">
                {infiniteVolumeChartData.length > 0 ? (
                  infiniteMode === 'period' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={infiniteVolumeChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                        <XAxis dataKey="name" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 11 }} />
                        <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (!active || !payload?.length) return null;
                            const d = payload[0]?.payload;
                            const finished = (d.completions || 0) + (d.losses || 0);
                            const abandoned = (d.starts || 0) - finished;
                            return (
                              <div className="bg-[#1a1a2e] border border-white/20 p-4 rounded-xl shadow-xl min-w-[160px]">
                                <p className="text-white font-bold mb-2">{label}</p>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between gap-4"><span className="text-blue-400">Starts</span><span className="text-white font-bold">{d.starts}</span></div>
                                  <div className="flex justify-between gap-4"><span className="text-red-400">Losses</span><span className="text-white font-bold">{d.losses}</span></div>
                                  <div className="flex justify-between gap-4"><span className="text-green-400">Wins</span><span className="text-white font-bold">{d.completions}</span></div>
                                  {abandoned > 0 && (
                                    <div className="flex justify-between gap-4 border-t border-white/10 pt-1 mt-1">
                                      <span className="text-gray-400">Abandoned</span>
                                      <span className="text-white font-bold">{abandoned}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }}
                          cursor={{ fill: '#ffffff10' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="losses" name="Losses" stackId="outcome" fill="#EF4444" />
                        <Bar dataKey="completions" name="Wins" stackId="outcome" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={infiniteVolumeChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                        <XAxis dataKey="name" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                        <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (!active || !payload?.length) return null;
                            const d = payload[0]?.payload;
                            const finished = (d.completions || 0) + (d.losses || 0);
                            const winRate = finished > 0 ? ((d.completions / finished) * 100).toFixed(1) : '0.0';
                            return (
                              <div className="bg-[#1a1a2e] border border-white/20 p-4 rounded-xl shadow-xl min-w-[160px]">
                                <p className="text-white font-bold mb-2">{label}</p>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between gap-4"><span className="text-blue-400">Starts</span><span className="text-white font-bold">{d.starts}</span></div>
                                  <div className="flex justify-between gap-4"><span className="text-red-400">Losses</span><span className="text-white font-bold">{d.losses}</span></div>
                                  <div className="flex justify-between gap-4"><span className="text-green-400">Wins</span><span className="text-white font-bold">{d.completions}</span></div>
                                  <div className="flex justify-between gap-4 border-t border-white/10 pt-1 mt-1">
                                    <span className="text-purple-400">Win Rate</span>
                                    <span className="text-white font-bold">{winRate}%</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }}
                          cursor={{ fill: '#ffffff10' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="starts" name="Starts" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="losses" name="Losses" fill="#EF4444" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="completions" name="Wins" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 italic">No infinite mode data available</div>
                )}
              </div>
            </div>
          </section>

          {/* 4. New Players Discovery */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">New Players Discovery</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                  <XAxis dataKey="date" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <Tooltip content={<CustomDiscoveryTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="discoveries" name="New Players" stroke="#06B6D4" strokeWidth={3} dot={{ r: 6, fill: '#06B6D4', strokeWidth: 2, stroke: '#000' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 5. Share Clicks */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Share Clicks</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                  <XAxis dataKey="date" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <Tooltip content={<CustomShareTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="shareClicks" name="Share Clicks" stroke="#00FF00" strokeWidth={3} dot={{ r: 6, fill: '#00FF00', strokeWidth: 2, stroke: '#000' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 6. Support Clicks */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Support Clicks</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                  <XAxis dataKey="date" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <Tooltip content={<CustomSupportTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="supportClicks" name="Support Clicks" stroke="#FFDD00" strokeWidth={3} dot={{ r: 6, fill: '#FFDD00', strokeWidth: 2, stroke: '#000' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      ) : activeTab === 'grant-confetti' ? (
        <GrantConfettiPanel />
      ) : activeTab === 'weights' ? (
        <WeightSimulator />
      ) : activeTab === 'bingo-admin' ? (
        <BingoAdminPanel />
      ) : activeTab === 'data-import' ? (
        <DataImportPanel onImportComplete={() => fetchData()} />
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-6">
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest text-white">EuroLinks Random Generator</h2>
              <p className="text-gray-400 text-xs mt-1">Test the new AI-generated data structure. This generator is not seed-dependent.</p>
            </div>
            <button 
              onClick={handleGenerateLinks}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-orange-500/20"
            >
              Generate New Game
            </button>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {linksPuzzle.length > 0 ? (
              <EuroLinksPreview 
                key={linksPuzzle.map(g => g.category).join('-')} 
                puzzleData={linksPuzzle} 
              />
            ) : (
              <div className="py-20 text-center text-gray-500 italic">Click generate to start</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;