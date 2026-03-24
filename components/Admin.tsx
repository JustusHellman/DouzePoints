import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../firebase.ts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import WeightSimulator from './WeightSimulator.tsx';
import { getActiveMasterData, SEARCH_WEIGHT_THRESHOLD } from '../data/activeData.ts';
import { PUZZLES } from '../data/linksgameData.ts';
import { REFRAIN_POOL } from '../data/refrainData.ts';
import { getDailyIndex, normalize, isLetter } from '../utils/daily.ts';
import { MasterSong } from '../data/types.ts';

const ADMIN_EMAILS = ['justusmhellman@gmail.com', 'justus.jo.li@gmail.com', 'douzepointsgame@gmail.com'];

interface DailyStats { date: string; totalPlayed: number; gameType: string; distribution: Record<string, number>; }
interface SupportClick { date: string; count: number; sources?: Record<string, number>; }
interface ShareClick { date: string; count: number; sources?: Record<string, number>; }
interface LanguageStats { date: string; total: number; languages: Record<string, number>; }
interface CompletionStats { date: string; totalCompleted: number; distribution: Record<string, number>; }
interface DiscoveryStats { date: string; count: number; }
interface InfiniteDailyStats { date: string; gameId: string; difficulty: string; totalStarts: number; totalCompletions?: number; totalLosses?: number; totalScore?: number; totalStreak?: number; }
interface InfiniteRun { id: string; timestamp: { toDate: () => Date } | null; gameId: string; difficulty: string; score: number; streak: number; wasCompleted: boolean; }

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
      const pools = { easy: REFRAIN_POOL.filter(s => s.tier === 'easy'), medium: REFRAIN_POOL.filter(s => s.tier === 'medium'), hard: REFRAIN_POOL.filter(s => s.tier === 'hard'), expert: REFRAIN_POOL.filter(s => s.tier === 'expert') };
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

const LANG_COLORS = ['#EC4899','#8B5CF6','#3B82F6','#10B981','#F59E0B','#EF4444','#06B6D4','#F97316','#84CC16','#A855F7','#14B8A6','#E11D48','#6366F1','#D946EF','#0EA5E9','#22C55E','#FBBF24','#FB7185','#2DD4BF','#C084FC','#38BDF8','#4ADE80','#FACC15','#F87171','#818CF8','#E879F9','#7DD3FC','#86EFAC','#FDE047','#FCA5A5'];
const COLORS = ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [supportClicks, setSupportClicks] = useState<SupportClick[]>([]);
  const [shareClicks, setShareClicks] = useState<ShareClick[]>([]);
  const [languageStats, setLanguageStats] = useState<LanguageStats[]>([]);
  const [completionStats, setCompletionStats] = useState<CompletionStats[]>([]);
  const [discoveryStats, setDiscoveryStats] = useState<DiscoveryStats[]>([]);
  const [infiniteStats, setInfiniteStats] = useState<InfiniteDailyStats[]>([]);
  const [infiniteRuns, setInfiniteRuns] = useState<InfiniteRun[]>([]);
  const [daysSpan, setDaysSpan] = useState(30);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'weights'>('stats');
  const [detailDate, setDetailDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [detailMode, setDetailMode] = useState<'day' | 'period'>('day');
  const [detailGame, setDetailGame] = useState<string>('ALL');
  const [completionMode, setCompletionMode] = useState<'period' | 'day'>('day');
  const [completionDate, setCompletionDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [infiniteMode, setInfiniteMode] = useState<'period' | 'day'>('day');
  const [infiniteDate, setInfiniteDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const dailyAnswer = useMemo(() => {
    if (detailGame === 'ALL') return null;
    return getDailyAnswer(detailGame, detailDate);
  }, [detailGame, detailDate]);

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
      const [gs, sc, sh, ls, cs, ds, is, irSnap] = await Promise.all([
        safeFetch<DailyStats>('game_stats'),
        safeFetch<SupportClick>('support_clicks'),
        safeFetch<ShareClick>('share_clicks'),
        safeFetch<LanguageStats>('language_stats'),
        safeFetch<CompletionStats>('completion_stats'),
        safeFetch<DiscoveryStats>('discoveries'),
        safeFetch<InfiniteDailyStats>('infinite_daily_stats'),
        getDocs(query(collection(db, 'infinite_runs'), where('timestamp', '>=', startDate), orderBy('timestamp', 'desc'))).catch(e => { console.warn('Failed to fetch infinite_runs:', e); return { docs: [] }; })
      ]);
      setStats(gs);
      setSupportClicks(sc);
      setShareClicks(sh);
      setLanguageStats(ls);
      setCompletionStats(cs);
      setDiscoveryStats(ds);
      setInfiniteStats(is);

      const ir: InfiniteRun[] = [];
      irSnap.docs.forEach((doc) => ir.push(doc.data() as InfiniteRun));
      setInfiniteRuns(ir);

      setLastRefreshed(new Date());
    } catch (err) {
      console.error('Error in fetchData:', err);
      setError('Failed to load some data. Check console for details or ensure Firebase rules are deployed.');
    }
    finally { setRefreshing(false); }
  }, [daysSpan]);

  useEffect(() => { const u = onAuthStateChanged(auth, (cu) => { setUser(cu); setLoading(false); }); return () => u(); }, []);
  useEffect(() => { if (user && ADMIN_EMAILS.includes(user.email || '')) fetchData(); }, [user, fetchData]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider(); provider.setCustomParameters({ prompt: 'select_account' });
    try { await signInWithPopup(auth, provider); } catch (e) { console.error("Error signing in", e); alert("If the login window didn't open, please check if your browser is blocking popups."); }
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
      newPlayers: disc?.count || 0
    };
  });

  const gameData = Object.keys(dailyTotals).map(date => {
    const d: Record<string, string | number> = { date };
    gameTypes.forEach(type => { const stat = stats.find(s => s.date === date && s.gameType === type); d[type] = stat ? stat.totalPlayed : 0; });
    return d;
  });

  const possibleScores = ['12', '10', '8', '6', '4', '2', '0'];

  const allLanguages = Array.from(new Set(languageStats.flatMap(ls => Object.keys(ls.languages || {}))));
  const languageLineData = languageStats.map(ls => {
    const total = Object.values(ls.languages || {}).reduce((sum, count) => sum + count, 0);
    const point: Record<string, string | number> = { date: ls.date, _total: total };
    allLanguages.forEach(lang => {
      const count = ls.languages?.[lang] || 0;
      point[lang] = total > 0 ? Math.round((count / total) * 1000) / 10 : 0;
      point[`_raw_${lang}`] = count;
    });
    return point;
  });

  const completionSource = completionMode === 'day'
    ? completionStats.filter(c => c.date === completionDate)
    : completionStats;
  const completionDistribution = completionSource.reduce((acc, c) => {
    if (c.distribution) Object.entries(c.distribution).forEach(([sc, ct]) => { acc[sc] = (acc[sc] || 0) + ct; });
    return acc;
  }, {} as Record<string, number>);
  const completionChartData = (() => {
    const maxScore = 72;
    const data: { score: number; count: number }[] = [];
    for (let i = 0; i <= maxScore; i += 2) {
      data.push({ score: i, count: completionDistribution[String(i)] || 0 });
    }
    return data;
  })();

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

  const dailyDetailSourceStats = (() => {
    if (detailMode === 'day') {
      if (detailGame === 'ALL') return stats.filter(s => s.date === detailDate);
      return stats.filter(s => s.date === detailDate && s.gameType === detailGame);
    } else {
      if (detailGame === 'ALL') return stats;
      return stats.filter(s => s.gameType === detailGame);
    }
  })();
  const dailyDetailTotalPlayed = dailyDetailSourceStats.reduce((sum, s) => sum + s.totalPlayed, 0);
  const dailyDetailDistribution = (() => {
    if (detailGame === 'ALL') {
      return possibleScores.map(score => {
        const row: Record<string, string | number> = { score: `${score} pts` };
        gameTypes.forEach(type => {
          const relevantStats = detailMode === 'day'
            ? stats.filter(s => s.date === detailDate && s.gameType === type)
            : stats.filter(s => s.gameType === type);
          const total = relevantStats.reduce((sum, s) => sum + (s.distribution?.[score] || 0), 0);
          row[type] = total;
        });
        return row;
      });
    } else {
      const relevantStats = detailMode === 'day'
        ? stats.filter(s => s.date === detailDate && s.gameType === detailGame)
        : stats.filter(s => s.gameType === detailGame);
      const aggregated = relevantStats.reduce((acc, s) => {
        if (s.distribution) Object.entries(s.distribution).forEach(([sc, ct]) => { acc[sc] = (acc[sc] || 0) + ct; });
        return acc;
      }, {} as Record<string, number>);
      return possibleScores.map(score => ({ score: `${score} pts`, count: aggregated[score] || 0 }));
    }
  })();

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

  const infiniteScoreHistogram = useMemo(() => {
    const source = infiniteMode === 'day'
      ? infiniteRuns.filter(r => r.timestamp?.toDate && r.timestamp.toDate().toISOString().split('T')[0] === infiniteDate)
      : infiniteRuns;

    const buckets = [
      { label: '0', min: 0, max: 0 },
      { label: '1–5', min: 1, max: 5 },
      { label: '6–10', min: 6, max: 10 },
      { label: '11–20', min: 11, max: 20 },
      { label: '21–30', min: 21, max: 30 },
      { label: '31–50', min: 31, max: 50 },
      { label: '51+', min: 51, max: Infinity },
    ];

    return buckets.map(b => {
      const inBucket = source.filter(r => r.score >= b.min && r.score <= b.max);
      const wins = inBucket.filter(r => r.wasCompleted);
      const losses = inBucket.filter(r => !r.wasCompleted);
      const breakdown: Record<string, number> = {};
      inBucket.forEach(r => {
        const key = `${r.gameId.replace('euro', '')} (${r.difficulty})`;
        breakdown[key] = (breakdown[key] || 0) + 1;
      });
      return { bucket: b.label, wins: wins.length, losses: losses.length, total: inBucket.length, breakdown };
    });
  }, [infiniteRuns, infiniteMode, infiniteDate]);

  const infiniteStreakHistogram = useMemo(() => {
    const source = infiniteMode === 'day'
      ? infiniteRuns.filter(r => r.timestamp?.toDate && r.timestamp.toDate().toISOString().split('T')[0] === infiniteDate)
      : infiniteRuns;

    const maxStreak = source.reduce((max, r) => Math.max(max, r.streak), 0);
    const cap = Math.max(8, maxStreak);

    const data: { streak: string; wins: number; losses: number; total: number; breakdown: Record<string, number> }[] = [];
    for (let i = 0; i <= cap; i++) {
      const label = i === cap && cap >= 8 ? `${i}+` : `${i}`;
      const inBucket = i === cap && cap >= 8
        ? source.filter(r => r.streak >= i)
        : source.filter(r => r.streak === i);
      const wins = inBucket.filter(r => r.wasCompleted);
      const losses = inBucket.filter(r => !r.wasCompleted);
      const breakdown: Record<string, number> = {};
      inBucket.forEach(r => {
        const key = `${r.gameId.replace('euro', '')} (${r.difficulty})`;
        breakdown[key] = (breakdown[key] || 0) + 1;
      });
      data.push({ streak: label, wins: wins.length, losses: losses.length, total: inBucket.length, breakdown });
    }
    return data;
  }, [infiniteRuns, infiniteMode, infiniteDate]);

  const infiniteMedianScore = useMemo(() => {
    const scores = infiniteRuns.map(r => r.score).sort((a, b) => a - b);
    if (scores.length === 0) return 0;
    const mid = Math.floor(scores.length / 2);
    return scores.length % 2 !== 0 ? scores[mid] : (scores[mid - 1] + scores[mid]) / 2;
  }, [infiniteRuns]);

  const infiniteMedianStreak = useMemo(() => {
    const streaks = infiniteRuns.map(r => r.streak).sort((a, b) => a - b);
    if (streaks.length === 0) return 0;
    const mid = Math.floor(streaks.length / 2);
    return streaks.length % 2 !== 0 ? streaks[mid] : (streaks[mid - 1] + streaks[mid]) / 2;
  }, [infiniteRuns]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-[#050510]">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#050510] page-fade px-6">
        <div className="max-w-md w-full text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter glow-text">Backstage</h1>
            <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed">You've reached the restricted area. This section is reserved for the production crew.</p>
          </div>
          <div className="flex flex-col gap-4">
            <button onClick={() => navigate('/')} className="w-full px-8 py-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-pink-500/20">Return to Greenroom</button>
            <button onClick={handleLogin} className="w-full px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs text-gray-400 transition-all">Admin Login</button>
          </div>
        </div>
      </div>
    );
  }

  if (!ADMIN_EMAILS.includes(user.email || '')) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white page-fade px-6 text-center">
        <div className="text-6xl mb-6">🚫</div>
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-pink-500">Whoops!</h1>
        <p className="text-gray-400 font-medium mb-8 max-w-md">Looks like you wandered into the restricted backstage area. This section is for authorized personnel only!</p>
        <button onClick={() => navigate('/')} className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform">Return to Greenroom</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-8 page-fade">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white glow-text leading-none">Admin Dashboard</h1>
          <div className="flex gap-4 mt-6">
            <button onClick={() => setActiveTab('stats')} className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'stats' ? 'bg-white text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}>Stats</button>
            <button onClick={() => setActiveTab('weights')} className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'weights' ? 'bg-white text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}>Weight Simulator</button>
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
                <BarChart data={gameData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} onClick={(state) => { if (state?.activeLabel) setDetailDate(String(state.activeLabel)); }} className="cursor-pointer">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                  <XAxis dataKey="date" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <Tooltip content={<CustomGamesTooltip />} cursor={{ fill: '#ffffff10' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  {gameTypes.map((type, index) => (<Bar key={type} dataKey={type} name={getGameName(type)} stackId="a" fill={COLORS[index % COLORS.length]} />))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 2. Score Distribution / Daily Game Details */}
          <section id="daily-details" className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Score Distribution</h2>
            <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">View:</span>
                <select value={detailMode} onChange={(e) => setDetailMode(e.target.value as 'day' | 'period')} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500 appearance-none cursor-pointer">
                  <option value="day" className="bg-[#1a1a2e] text-white">Specific Day</option>
                  <option value="period" className="bg-[#1a1a2e] text-white">Entire Period</option>
                </select>
              </div>
              {detailMode === 'day' && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Date:</span>
                  <input type="date" value={detailDate} onChange={(e) => setDetailDate(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500" />
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Game:</span>
                <select value={detailGame} onChange={(e) => setDetailGame(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500 appearance-none cursor-pointer">
                  <option value="ALL" className="bg-[#1a1a2e] text-white">All Games</option>
                  {Object.keys(gameNameMap).map(type => (<option key={type} value={type} className="bg-[#1a1a2e] text-white">{getGameName(type)}</option>))}
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">
              {detailMode === 'day' ? `Showing ${detailDate}` : `Aggregate over last ${daysSpan} days`} — {detailGame === 'ALL' ? 'All Games' : getGameName(detailGame)} — {dailyDetailTotalPlayed} plays
            </p>
            {detailGame === 'ALL' ? (
              <div>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyDetailDistribution} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                      <XAxis dataKey="score" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                      <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                      <Tooltip content={<CustomGamesTooltip />} cursor={{ fill: '#ffffff10' }} />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      {gameTypes.map((type, index) => (<Bar key={type} dataKey={type} name={getGameName(type)} stackId="a" fill={COLORS[index % COLORS.length]} />))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {detailMode === 'day' && (
                  <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Correct Answer</h3>
                    {dailyAnswer ? (
                      <div className="space-y-4">
                        {detailGame === 'REFRAIN_GAME' ? (
                          <div className="space-y-2">
                            {['easy', 'medium', 'hard', 'expert'].map(tier => (
                              <div key={tier} className="bg-white/5 p-3 rounded-lg">
                                <div className="text-[10px] font-bold uppercase text-gray-400 mb-1">{tier}</div>
                                <div className="text-sm font-bold text-white">{(dailyAnswer as unknown as Record<string, { title: string, artist?: string }>)[tier]?.title}</div>
                                <div className="text-xs text-gray-400">{(dailyAnswer as unknown as Record<string, { title: string, artist?: string }>)[tier]?.artist}</div>
                              </div>
                            ))}
                          </div>
                        ) : detailGame === 'LINKS_GAME' ? (
                          <div className="space-y-2">
                            {(dailyAnswer as { difficulty: string, category: string, items: string[] }[]).map((g, i: number) => (
                              <div key={i} className="bg-white/5 p-3 rounded-lg">
                                <div className="text-[10px] font-bold uppercase text-gray-400 mb-1">{g.difficulty}</div>
                                <div className="text-sm font-bold text-white mb-1">{g.category}</div>
                                <div className="text-xs text-gray-400">{g.items.join(', ')}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            <div>
                              <div className="text-2xl font-black text-white">{(dailyAnswer as MasterSong).title}</div>
                              <div className="text-sm font-bold text-gray-400">{(dailyAnswer as MasterSong).artist}</div>
                              <div className="text-xs text-gray-500 mt-1">{(dailyAnswer as MasterSong).country} {(dailyAnswer as MasterSong).year}</div>
                            </div>
                            <div className="pt-4 border-t border-white/10">
                              <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">Weight Score</div>
                              <div className="text-xl font-black text-pink-400">{(dailyAnswer as MasterSong).weight || 0}</div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-500 italic">No answer data available</div>
                    )}
                  </div>
                )}
                <div className={detailMode === 'day' ? 'lg:col-span-2' : 'lg:col-span-3'}>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dailyDetailDistribution} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                        <XAxis dataKey="score" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                        <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20', borderRadius: '8px' }} itemStyle={{ color: '#fff', fontWeight: 'bold' }} />
                        <Bar dataKey="count" name="Number of Players" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 3. Daily Completion Scores */}
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
                      type="number"
                      domain={[0, 72]}
                      ticks={Array.from({ length: 13 }, (_, i) => i * 6)}
                      stroke="#ffffff60"
                      tick={{ fill: '#ffffff60', fontSize: 11 }}
                      tickFormatter={(v: number) => `${v}`}
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

          {/* 4. Infinite Mode Stats */}
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
            <div className="mb-12">
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

            {/* Panel 2: Score Distribution */}
            <div className="mb-12">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Score Distribution</h3>
                <span className="text-xs text-gray-500">
                  Median: <span className="text-yellow-400 font-bold">{infiniteMedianScore}</span>
                  {' · '}{infiniteRuns.length} runs
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-6">Final score of each run — green = completed, red = lost</p>
              <div className="h-[300px] w-full">
                {infiniteScoreHistogram.some(d => d.total > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={infiniteScoreHistogram} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                      <XAxis dataKey="bucket" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                      <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0]?.payload;
                          const breakdown = d.breakdown || {};
                          return (
                            <div className="bg-[#1a1a2e] border border-white/20 p-4 rounded-xl shadow-xl min-w-[180px] max-h-[300px] overflow-y-auto">
                              <p className="text-white font-bold mb-2">Score: {label}</p>
                              <div className="space-y-1 text-sm mb-2">
                                <div className="flex justify-between gap-4"><span className="text-white">Total</span><span className="text-white font-bold">{d.total}</span></div>
                                <div className="flex justify-between gap-4"><span className="text-red-400">Losses</span><span className="text-white font-bold">{d.losses}</span></div>
                                <div className="flex justify-between gap-4"><span className="text-green-400">Wins</span><span className="text-white font-bold">{d.wins}</span></div>
                              </div>
                              {Object.keys(breakdown).length > 0 && (
                                <div className="border-t border-white/10 pt-2 space-y-1">
                                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Breakdown</div>
                                  {Object.entries(breakdown)
                                    .sort(([, a], [, b]) => (b as number) - (a as number))
                                    .map(([key, count]) => (
                                      <div key={key} className="flex justify-between text-xs gap-4">
                                        <span className="text-gray-400">{key}</span>
                                        <span className="text-white font-bold">{count as number}</span>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          );
                        }}
                        cursor={{ fill: '#ffffff10' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="losses" name="Losses" stackId="a" fill="#EF4444" />
                      <Bar dataKey="wins" name="Wins" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 italic">No run data available</div>
                )}
              </div>
            </div>

            {/* Panel 3: Streak Distribution */}
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Streak Distribution</h3>
                <span className="text-xs text-gray-500">
                  Median: <span className="text-purple-400 font-bold">{infiniteMedianStreak}</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-6">Final streak when each run ended — where do players die?</p>
              <div className="h-[300px] w-full">
                {infiniteStreakHistogram.some(d => d.total > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={infiniteStreakHistogram} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                      <XAxis dataKey="streak" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                      <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0]?.payload;
                          const breakdown = d.breakdown || {};
                          return (
                            <div className="bg-[#1a1a2e] border border-white/20 p-4 rounded-xl shadow-xl min-w-[180px] max-h-[300px] overflow-y-auto">
                              <p className="text-white font-bold mb-2">Streak: {label}</p>
                              <div className="space-y-1 text-sm mb-2">
                                <div className="flex justify-between gap-4"><span className="text-white">Total</span><span className="text-white font-bold">{d.total}</span></div>
                                <div className="flex justify-between gap-4"><span className="text-red-400">Losses</span><span className="text-white font-bold">{d.losses}</span></div>
                                <div className="flex justify-between gap-4"><span className="text-green-400">Wins</span><span className="text-white font-bold">{d.wins}</span></div>
                              </div>
                              {Object.keys(breakdown).length > 0 && (
                                <div className="border-t border-white/10 pt-2 space-y-1">
                                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Breakdown</div>
                                  {Object.entries(breakdown)
                                    .sort(([, a], [, b]) => (b as number) - (a as number))
                                    .map(([key, count]) => (
                                      <div key={key} className="flex justify-between text-xs gap-4">
                                        <span className="text-gray-400">{key}</span>
                                        <span className="text-white font-bold">{count as number}</span>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          );
                        }}
                        cursor={{ fill: '#ffffff10' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="losses" name="Losses" stackId="a" fill="#EF4444" />
                      <Bar dataKey="wins" name="Wins" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 italic">No run data available</div>
                )}
              </div>
            </div>
          </section>

          {/* 5. New Players Discovery */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">New Players Discovery</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                  <XAxis dataKey="date" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#1a1a2e] border border-white/20 p-4 rounded-xl shadow-xl">
                          <p className="text-white font-bold mb-1">{label}</p>
                          <p className="text-pink-500 font-black text-lg">{data.newPlayers} New Players</p>
                        </div>
                      );
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="newPlayers" name="New Players" stroke="#EC4899" strokeWidth={3} dot={{ r: 6, fill: '#EC4899', strokeWidth: 2, stroke: '#000' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 6. Active Users by Language */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-white mb-2">Active Users by Language</h2>
            <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">One line per language over the selected period</p>
            <div className="h-[400px] w-full">
              {languageLineData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={languageLineData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                    <XAxis dataKey="date" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                    <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} tickFormatter={(v: number) => `${v}%`} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload?.length) return null;
                        const data = payload[0]?.payload;
                        const totalUsers = data?._total || 0;
                        const sorted = [...payload].sort((a, b) => ((b.value as number) || 0) - ((a.value as number) || 0));
                        return (
                          <div className="bg-[#1a1a2e] border border-white/20 p-4 rounded-xl shadow-xl max-h-[300px] overflow-y-auto">
                            <p className="text-white font-bold mb-1">{label}</p>
                            <p className="text-gray-400 text-xs mb-2">Total: {totalUsers} users</p>
                            <div className="space-y-1 border-t border-white/10 pt-2">
                              {sorted.map((entry: { dataKey?: string | number | ((obj: unknown) => unknown), color?: string, name?: string | number, value?: unknown }, i: number) => {
                                const rawCount = data?.[`_raw_${entry.dataKey as string}`] || 0;
                                return (
                                  <div key={i} className="flex items-center justify-between gap-4 text-xs">
                                    <span style={{ color: entry.color }} className="font-bold">{entry.name}</span>
                                    <span className="text-white font-bold">{entry.value as number}% <span className="text-gray-400 font-normal">({rawCount})</span></span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    {allLanguages.map((lang, index) => (
                      <Line key={lang} type="monotone" dataKey={lang} name={lang} stroke={LANG_COLORS[index % LANG_COLORS.length]} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 italic">No language data available</div>
              )}
            </div>
          </section>

          {/* 7. Share Clicks */}
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

          {/* 8. Support Clicks */}
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
      ) : (
        <WeightSimulator />
      )}
    </div>
  );
};

export default Admin;
