import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../firebase.ts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

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

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [supportClicks, setSupportClicks] = useState<SupportClick[]>([]);
  const [daysSpan, setDaysSpan] = useState(30);
  const [selectedGameType, setSelectedGameType] = useState<string>('all');

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
  }, [user, daysSpan]);

  const fetchData = async () => {
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
    }
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white page-fade px-6">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8">Admin Access</h1>
        <button 
          onClick={handleLogin}
          className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold uppercase tracking-widest transition-colors"
        >
          Sign in with Google
        </button>
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
    const dayData: any = { date };
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

  const scoreChartData = Object.keys(scoreDistribution)
    .sort((a, b) => Number(b) - Number(a)) // Sort scores descending (12, 10, 8...)
    .map(score => ({
      score: `${score} pts`,
      count: scoreDistribution[score]
    }));

  const COLORS = ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-8 page-fade">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white glow-text leading-none">
            Admin Dashboard
          </h1>
          <div className="h-1.5 w-32 bg-gradient-to-r from-pink-500 to-purple-600 mt-4 rounded-full"></div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Time Span:</span>
          <select 
            value={daysSpan} 
            onChange={(e) => setDaysSpan(Number(e.target.value))}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm font-bold outline-none focus:border-pink-500"
          >
            <option value={7}>Last 7 Days</option>
            <option value={14}>Last 14 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>
        </div>
      </header>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl mb-8">
          {error}
        </div>
      )}

      <div className="space-y-12">
        {/* Total Games Played Chart */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Total Games Played & Support Clicks</h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                <XAxis dataKey="date" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                <YAxis yAxisId="left" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#FFDD00" tick={{ fill: '#FFDD00', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar yAxisId="left" dataKey="totalGames" name="Total Games" fill="#EC4899" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="supportClicks" name="Support Clicks" stroke="#FFDD00" strokeWidth={3} dot={{ r: 4, fill: '#FFDD00' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

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
                  <Bar key={type} dataKey={type} stackId="a" fill={COLORS[index % COLORS.length]} />
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
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-pink-500"
              >
                <option value="all">All Games</option>
                {gameTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
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
      </div>
    </div>
  );
};

export default Admin;
