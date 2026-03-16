import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../firebase.ts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import WeightSimulator from './WeightSimulator.tsx';
import { MASTER_DATA } from '../data/masterData.ts';
import { PUZZLES } from '../data/linksgameData.ts';
import { REFRAIN_POOL } from '../data/refrainData.ts';
import { getDailyIndex, normalize, isLetter } from '../utils/daily.ts';

const ADMIN_EMAILS = ['justusmhellman@gmail.com', 'justus.jo.li@gmail.com', 'douzepointsgame@gmail.com'];

interface DailyStats {
  date: string;
  totalPlayed: number;
  gameType: string;
  distribution: Record<string, number>;
}

interface SupportClick {
  date: string;
  count: number;
}

const getDailyAnswer = (gameType: string, dateStr: string) => {
  try {
    if (gameType === 'WORD_GAME') {
      const validPool = MASTER_DATA.filter(song => normalize(song.title).split('').some(char => isLetter(char)));
      const idx = getDailyIndex(validPool, "DAILY-V3-WORD_GAME-eurosong-SALT-VERIFIED", dateStr);
      return validPool[idx];
    }
    if (gameType === 'ARTIST_WORD_GAME') {
      const validPool = MASTER_DATA.filter(song => normalize(song.artist).split('').some(char => isLetter(char)));
      const idx = getDailyIndex(validPool, "DAILY-V3-ARTIST_WORD_GAME-euroartist-SALT-VERIFIED", dateStr);
      return validPool[idx];
    }
    if (gameType === 'LINKS_GAME') {
      const idx = getDailyIndex(PUZZLES, "eurolinks", dateStr);
      return PUZZLES[idx];
    }
    if (gameType === 'GUESSER') {
      const idx = getDailyIndex(MASTER_DATA, "euroguess", dateStr);
      return MASTER_DATA[idx];
    }
    if (gameType === 'ARENA') {
      const idx = getDailyIndex(MASTER_DATA, "euroarena", dateStr);
      return MASTER_DATA[idx];
    }
    if (gameType === 'REFRAIN_GAME') {
      const seedStr = dateStr + "eurorefrain-salt-v1";
      let hash = 0;
      for (let i = 0; i < seedStr.length; i++) {
        hash = (hash << 5) - hash + seedStr.charCodeAt(i);
        hash |= 0;
      }
      const seed = Math.abs(hash);

      const easyPool = REFRAIN_POOL.filter(s => s.tier === 'easy');
      const mediumPool = REFRAIN_POOL.filter(s => s.tier === 'medium');
      const hardPool = REFRAIN_POOL.filter(s => s.tier === 'hard');
      const expertPool = REFRAIN_POOL.filter(s => s.tier === 'expert');

      const usedWords = new Set<string>();
      const usedTitles = new Set<string>();

      const pickSnippet = (pool: any[], salt: number) => {
        let attempts = 0;
        while (attempts < pool.length) {
          const idx = (seed + salt + attempts) % pool.length;
          const candidate = pool[idx];
          const wordCollision = candidate.words.some((w: string) => usedWords.has(w.toUpperCase()));
          const titleCollision = usedTitles.has(candidate.title);

          if (!wordCollision && !titleCollision) {
            candidate.words.forEach((w: string) => usedWords.add(w.toUpperCase()));
            usedTitles.add(candidate.title);
            return candidate;
          }
          attempts++;
        }
        return pool[0];
      };
      
      return {
        easy: pickSnippet(easyPool, 1),
        medium: pickSnippet(mediumPool, 2),
        hard: pickSnippet(hardPool, 3),
        expert: pickSnippet(expertPool, 4)
      };
    }
  } catch (e) {
    console.error(e);
    return null;
  }
  return null;
};

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [supportClicks, setSupportClicks] = useState<SupportClick[]>([]);
  const [daysSpan, setDaysSpan] = useState(30);
  const [selectedGameType, setSelectedGameType] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'weights'>('stats');

  const [detailDate, setDetailDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [detailGame, setDetailGame] = useState<string>('WORD_GAME');

  // Daily Details (Moved to top level to satisfy Rules of Hooks)
  const dailyAnswer = useMemo(() => getDailyAnswer(detailGame, detailDate), [detailGame, detailDate]);

  const gameNameMap: Record<string, string> = {
    'WORD_GAME': 'EuroSong',
    'ARTIST_WORD_GAME': 'EuroArtist',
    'LINKS_GAME': 'EuroLinks',
    'GUESSER': 'EuroGuess',
    'ARENA': 'EuroArena',
    'REFRAIN_GAME': 'EuroRefrain'
  };

  const getGameName = (type: string) => gameNameMap[type] || type;

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysSpan);
      const startDateStr = startDate.toISOString().split('T')[0];

      // Fetch Game Stats
      const statsQuery = query(
        collection(db, 'game_stats'),
        where('date', '>=', startDateStr),
        orderBy('date', 'asc')
      );
      const statsSnapshot = await getDocs(statsQuery);
      const statsData: DailyStats[] = [];
      statsSnapshot.forEach((doc) => {
        statsData.push(doc.data() as DailyStats);
      });
      setStats(statsData);

      // Fetch Support Clicks
      const clicksQuery = query(
        collection(db, 'support_clicks'),
        where('date', '>=', startDateStr),
        orderBy('date', 'asc')
      );
      const clicksSnapshot = await getDocs(clicksQuery);
      const clicksData: SupportClick[] = [];
      clicksSnapshot.forEach((doc) => {
        clicksData.push(doc.data() as SupportClick);
      });
      setSupportClicks(clicksData);

    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError('Failed to load data. Make sure you have admin permissions.');
    } finally {
      setRefreshing(false);
    }
  }, [daysSpan]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && ADMIN_EMAILS.includes(user.email || '')) {
      fetchData();
    }
  }, [user, fetchData]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    // Force select account to help with mobile issues and ensure fresh login
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in", error);
      // Fallback for mobile if popup is blocked
      alert("If the login window didn't open, please check if your browser is blocking popups.");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white bg-[#050510]">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#050510] page-fade px-6">
        <div className="max-w-md w-full text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter glow-text">Backstage</h1>
            <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed">
              You've reached the restricted area. This section is reserved for the production crew.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => navigate('/')}
              className="w-full px-8 py-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-pink-500/20"
            >
              Return to Greenroom
            </button>
            
            <button 
              onClick={handleLogin}
              className="w-full px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs text-gray-400 transition-all"
            >
              Admin Login
            </button>
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
        <p className="text-gray-400 font-medium mb-8 max-w-md">
          Looks like you wandered into the restricted backstage area. This section is for authorized personnel only!
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Return to Greenroom
        </button>
      </div>
    );
  }

  // Process data for charts
  const dailyTotals = stats.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = 0;
    acc[curr.date] += curr.totalPlayed;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(dailyTotals).map(date => ({
    date,
    totalGames: dailyTotals[date],
    supportClicks: supportClicks.find(c => c.date === date)?.count || 0
  }));

  // Process game specific data
  const gameTypes = Array.from(new Set(stats.map(s => s.gameType)));
  const gameData = Object.keys(dailyTotals).map(date => {
    const dayData: Record<string, string | number> = { date };
    gameTypes.forEach(type => {
      const stat = stats.find(s => s.date === date && s.gameType === type);
      dayData[type] = stat ? stat.totalPlayed : 0;
    });
    return dayData;
  });

  // Process score distribution
  const scoreDistribution = stats
    .filter(s => selectedGameType === 'all' || s.gameType === selectedGameType)
    .reduce((acc, curr) => {
      if (curr.distribution) {
        Object.entries(curr.distribution).forEach(([score, count]) => {
          if (!acc[score]) acc[score] = 0;
          acc[score] += count;
        });
      }
      return acc;
    }, {} as Record<string, number>);

  // Ensure all possible scores are present (12, 10, 8, 6, 4, 2, 0)
  const possibleScores = ['12', '10', '8', '6', '4', '2', '0'];
  const scoreChartData = possibleScores.map(score => ({
    score: `${score} pts`,
    count: scoreDistribution[score] || 0
  }));

  const COLORS = ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  // Daily Details
  const dailyDetailStat = stats.find(s => s.date === detailDate && s.gameType === detailGame);
  const dailyDetailDistribution = possibleScores.map(score => ({
    score: `${score} pts`,
    count: dailyDetailStat?.distribution?.[score] || 0
  }));

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-8 page-fade">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white glow-text leading-none">
            Admin Dashboard
          </h1>
          <div className="flex gap-4 mt-6">
            <button 
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === 'stats' 
                  ? 'bg-white text-black' 
                  : 'bg-white/5 text-gray-500 hover:text-white'
              }`}
            >
              Stats
            </button>
            <button 
              onClick={() => setActiveTab('weights')}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === 'weights' 
                  ? 'bg-white text-black' 
                  : 'bg-white/5 text-gray-500 hover:text-white'
              }`}
            >
              Weight Simulator
            </button>
          </div>
        </div>
        
        {activeTab === 'stats' && (
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => fetchData()}
              disabled={refreshing}
              className={`flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-300 transition-all ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <svg 
                className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>

            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Time Span:</span>
              <select 
                value={daysSpan} 
                onChange={(e) => setDaysSpan(Number(e.target.value))}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm font-bold outline-none focus:border-pink-500 appearance-none cursor-pointer"
              >
                <option value={7} className="bg-[#1a1a2e] text-white">Last 7 Days</option>
                <option value={14} className="bg-[#1a1a2e] text-white">Last 14 Days</option>
                <option value={30} className="bg-[#1a1a2e] text-white">Last 30 Days</option>
                <option value={90} className="bg-[#1a1a2e] text-white">Last 90 Days</option>
              </select>
            </div>
          </div>
        )}
      </header>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl mb-8">
          {error}
        </div>
      )}

      {activeTab === 'stats' ? (
        <div className="space-y-12">
          {/* Games Breakdown Chart */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Games Breakdown</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gameData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                  <XAxis dataKey="date" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  {gameTypes.map((type, index) => (
                    <Bar 
                      key={type} 
                      dataKey={type} 
                      name={getGameName(type)}
                      stackId="a" 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Score Distribution Chart */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-black uppercase tracking-widest text-white">Score Distribution</h2>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Filter Game:</span>
                <select 
                  value={selectedGameType} 
                  onChange={(e) => setSelectedGameType(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500 appearance-none cursor-pointer"
                >
                  <option value="all" className="bg-[#1a1a2e] text-white">All Games</option>
                  {gameTypes.map(type => (
                    <option key={type} value={type} className="bg-[#1a1a2e] text-white">{getGameName(type)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                  <XAxis dataKey="score" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="count" name="Number of Players" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Daily Game Details */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Daily Game Details</h2>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Date:</span>
                <input 
                  type="date" 
                  value={detailDate}
                  onChange={(e) => setDetailDate(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Game:</span>
                <select 
                  value={detailGame} 
                  onChange={(e) => setDetailGame(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500 appearance-none cursor-pointer"
                >
                  {Object.keys(gameNameMap).map(type => (
                    <option key={type} value={type} className="bg-[#1a1a2e] text-white">{getGameName(type)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Correct Answer</h3>
                {dailyAnswer ? (
                  <div className="space-y-4">
                    {detailGame === 'REFRAIN_GAME' ? (
                      <div className="space-y-2">
                        {['easy', 'medium', 'hard', 'expert'].map(tier => (
                          <div key={tier} className="bg-white/5 p-3 rounded-lg">
                            <div className="text-[10px] font-bold uppercase text-gray-400 mb-1">{tier}</div>
                            <div className="text-sm font-bold text-white">{(dailyAnswer as any)[tier]?.title}</div>
                            <div className="text-xs text-gray-400">{(dailyAnswer as any)[tier]?.artist}</div>
                          </div>
                        ))}
                      </div>
                    ) : detailGame === 'LINKS_GAME' ? (
                      <div className="space-y-2">
                        <div className="text-lg font-black text-white">{(dailyAnswer as any).title}</div>
                        <div className="text-sm text-gray-400">{(dailyAnswer as any).groups?.map((g: any) => g.category).join(' • ')}</div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <div className="text-2xl font-black text-white">{(dailyAnswer as any).title}</div>
                          <div className="text-sm font-bold text-gray-400">{(dailyAnswer as any).artist}</div>
                          <div className="text-xs text-gray-500 mt-1">{(dailyAnswer as any).country} {(dailyAnswer as any).year}</div>
                        </div>
                        <div className="pt-4 border-t border-white/10">
                          <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">Weight Score</div>
                          <div className="text-xl font-black text-pink-400">{(dailyAnswer as any).weight || 0}</div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 italic">No answer data available</div>
                )}
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Score Distribution ({dailyDetailStat?.totalPlayed || 0} plays)</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyDetailDistribution} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                      <XAxis dataKey="score" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                      <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="count" name="Number of Players" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          {/* Support Clicks Chart */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Support Clicks</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                  <XAxis dataKey="date" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
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
