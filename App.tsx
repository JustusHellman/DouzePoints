import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import EuroWordGame from './games/wordGame/EuroWordGame.tsx';
import EuroLinks from './games/linksgame/EuroLinks.tsx';
import EuroGuess from './games/guesser/EuroGuess.tsx';
import EuroArena from './games/arena/EuroArena.tsx';
import { GameType, GlobalStats } from './data/types.ts';
import { MASTER_DATA } from './data/masterData.ts';
import { initialGlobalStats, getStoredStats, getCurrentRank } from './utils/stats.ts';
import { StatsModal } from './components/StatsModal.tsx';
import { RankUpCelebration } from './components/RankUpCelebration.tsx';
import { getDayString } from './utils/daily.ts';
import { useTranslation } from './context/LanguageContext.tsx';
import { CookieBanner } from './components/CookieBanner.tsx';
import { AdSlot } from './components/AdSlot.tsx';
import { StickyAd } from './components/StickyAd.tsx';
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx';
import { CookiePolicy } from './components/CookiePolicy.tsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LanguageOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { language, setLanguage, t } = useTranslation();
  
  const langs = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-[#0b0b18] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full relative shadow-[0_0_50px_rgba(0,0,0,0.5)] border-t-pink-500/30 overflow-y-auto max-h-[85vh] scrollbar-hide">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2 z-10 hover:bg-white/5 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div className="mb-8">
          <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.4em] mb-1.5 block">{t('common.selectLanguage')}</span>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-tight">
            {language === 'en' ? 'Languages' : 
             language === 'de' ? 'Sprachen' : 
             language === 'es' ? 'Idiomas' : 
             language === 'fr' ? 'Langues' : 
             'Lingue'}
          </h2>
        </div>

        <div className="space-y-3 mb-8">
          {langs.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as any);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-5 rounded-3xl border-2 transition-all active:scale-95 ${
                language === lang.code 
                  ? 'bg-white border-white text-black shadow-xl' 
                  : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-black uppercase tracking-widest text-[11px]">{lang.name}</span>
              </div>
              {language === lang.code && (
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
              )}
            </button>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-white/5 text-gray-400 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:text-white transition-all mb-12 md:mb-0"
        >
          {t('common.close')}
        </button>
      </div>
    </div>
  );
};

const DailyProgressBar: React.FC<{ games: any[] }> = ({ games }) => {
  const { t } = useTranslation();
  const [showCopied, setShowCopied] = useState(false);
  
  const completedCount = games.filter(g => g.done).length;
  const isAllDone = completedCount === 5;

  const totalTodayPoints = useMemo(() => {
    return games.reduce((acc, g) => acc + (g.todayPoints || 0), 0);
  }, [games]);

  const handleShareDaily = useCallback(() => {
    const today = getDayString();
    const scoreText = `${totalTodayPoints}/60 pts`;
    const emojis = ['🎵', '🎤', '🔗', '🔎', '⚔️'];
    
    const progressText = games.map((g, i) => {
        const emoji = g.done ? '🟩' : '⬛';
        const pts = g.done ? `${g.todayPoints} pts` : 'pending';
        return `${emojis[i]} ${g.title}: ${emoji} (${pts})`;
    }).join('\n');

    const status = totalTodayPoints >= 50 ? "Douze Points Performance! 🏆" : 
                   totalTodayPoints >= 30 ? "Grand Final Qualified! ✨" : 
                   "On the scoreboard! 🗳️";

    const shareString = `✨ DOUZE POINTS ✨\nGrand Final Entry • ${today}\n\nTotal Score: ${scoreText}\n${status}\n\n${progressText}\n\n#DouzePoints #Eurovision`;
    
    navigator.clipboard.writeText(shareString).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  }, [games, totalTodayPoints]);

  return (
    <div className="max-w-md mx-auto mb-12 px-6">
      <div className="flex justify-between items-end mb-3">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{t('greenroom.dailyProgress')}</span>
          {completedCount > 0 && (
            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-1">
              {t('greenroom.todayScore')}: {totalTodayPoints}
            </span>
          )}
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${isAllDone ? 'text-yellow-500 animate-pulse' : 'text-white'}`}>
          {isAllDone ? t('greenroom.qualified') : `${completedCount} / 5 ${t('common.finished')}`}
        </span>
      </div>
      
      <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10 flex gap-1 p-0.5 mb-6">
        {games.map((game, i) => (
          <div 
            key={i} 
            className={`flex-1 rounded-full transition-all duration-700 ${game.done ? `bg-gradient-to-r ${game.styles.bg.replace('/20', '').replace('/40', '')} shadow-[0_0_10px_rgba(255,255,255,0.2)]` : 'bg-transparent'}`}
          />
        ))}
      </div>

      {completedCount > 0 && (
        <div className="flex justify-center relative">
          <button 
            onClick={handleShareDaily}
            className="group relative flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-full transition-all active:scale-95"
          >
            <svg className="w-3 h-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
              {showCopied ? t('common.copied') : t('common.shareDaily')}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

const Dashboard: React.FC<{ stats: GlobalStats }> = ({ stats }) => {
  const { t } = useTranslation();
  const today = getDayString();
  
  const gameConfigs = useMemo(() => [
    { id: 'songGame', path: '/euro-song', title: t('games.eurosong.title'), desc: t('games.eurosong.desc'), color: 'purple', styles: {
      bg: "from-purple-600/20 to-purple-900/40 border-purple-500/30",
      text: "text-purple-200",
      glow: "bg-purple-500"
    }},
    { id: 'artistGame', path: '/euro-artist', title: t('games.euroartist.title'), desc: t('games.euroartist.desc'), color: 'pink', styles: {
      bg: "from-pink-600/20 to-pink-900/40 border-pink-500/30",
      text: "text-pink-200",
      glow: "bg-pink-500"
    }},
    { id: 'linksgame', path: '/euro-links', title: t('games.eurolinks.title'), desc: t('games.eurolinks.desc'), color: 'orange', styles: {
      bg: "from-orange-600/20 to-orange-900/40 border-orange-500/30",
      text: "text-orange-200",
      glow: "bg-orange-500"
    }},
    { id: 'guesser', path: '/euro-guess', title: t('games.euroguess.title'), desc: t('games.euroguess.desc'), color: 'cyan', styles: {
      bg: "from-cyan-600/20 to-cyan-900/40 border-cyan-500/30",
      text: "text-cyan-200",
      glow: "bg-cyan-500"
    }},
    { id: 'arena', path: '/euro-arena', title: t('games.euroarena.title'), desc: t('games.euroarena.desc'), color: 'emerald', styles: {
      bg: "from-emerald-600/20 to-emerald-900/40 border-emerald-500/30",
      text: "text-emerald-200",
      glow: "bg-emerald-500"
    }}
  ], [t]);

  const games = useMemo(() => gameConfigs.map(config => {
    let stat = 0;
    let done = false;
    let todayPoints = 0;

    const getDailyPoints = (gameId: string) => {
        const saved = localStorage.getItem(`${gameId}-${today}`);
        if (!saved) return 0;
        try {
            const data = JSON.parse(saved);
            if (!data.isGameOver) return 0;
            const pointsMap = [12, 10, 8, 6, 4, 2];
            
            if (gameId === 'linksgame') {
                return data.won ? (pointsMap[data.mistakes] || 2) : 0;
            } else if (gameId === 'arena') {
                const arenaPointsMap = [12, 12, 10, 8, 6, 4, 2];
                return data.won ? (arenaPointsMap[data.guesses.length - 1] || 2) : 0;
            } else if (gameId === 'guesser') {
                return data.won ? (pointsMap[data.attempts.length - 1] || 2) : 0;
            } else {
                return data.won ? (pointsMap[data.guesses.length - 1] || 2) : 0;
            }
        } catch (e) { return 0; }
    };
    
    if (config.id === 'songGame') { stat = stats?.word_game?.perfectGames || 0; done = stats?.word_game?.lastPlayed === today; todayPoints = getDailyPoints('songGame'); }
    if (config.id === 'artistGame') { stat = stats?.artists?.perfectGames || 0; done = stats?.artists?.lastPlayed === today; todayPoints = getDailyPoints('artistGame'); }
    if (config.id === 'linksgame') { stat = stats?.links?.perfectGames || 0; done = stats?.links?.lastPlayed === today; todayPoints = getDailyPoints('linksgame'); }
    if (config.id === 'guesser') { stat = stats?.guesser?.perfectGames || 0; done = stats?.guesser?.lastPlayed === today; todayPoints = getDailyPoints('guesser'); }
    if (config.id === 'arena') { stat = stats?.arena?.perfectGames || 0; done = stats?.arena?.lastPlayed === today; todayPoints = getDailyPoints('arena'); }

    return { ...config, stat, done, todayPoints };
  }), [stats, today, gameConfigs]);

  return (
    <>
      <DailyProgressBar games={games} />
      
      <div className="max-w-4xl mx-auto px-6 mb-8 text-center min-h-[90px]">
        <AdSlot adSlot="1234567890" adFormat="fluid" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 p-4 md:p-6 max-w-[1400px] mx-auto">
        {games.map((game, index) => (
          <Link 
            key={game.path}
            to={game.path}
            className={`
              group relative flex flex-col min-h-[160px] md:min-h-[200px] p-5 md:p-7 rounded-[2rem] md:rounded-[2.5rem] 
              bg-gradient-to-br ${game.styles.bg} border-2 transition-all duration-300 
              hover:scale-[1.03] active:scale-95 shadow-2xl overflow-hidden block
              ${index === 4 ? 'col-span-2 lg:col-span-1' : ''}
              ${game.done ? 'border-green-500/40' : ''}
            `}
          >
            <div className={`absolute -top-10 -right-10 w-40 h-40 ${game.styles.glow} rounded-full blur-[80px] ${game.done ? 'opacity-10 grayscale' : 'opacity-20 group-hover:opacity-40'} transition-opacity`}></div>
            <div className="flex justify-between items-start mb-1 relative z-10">
               <h3 className="text-xl md:text-2xl font-black italic pr-[0.2em] uppercase tracking-tighter leading-none">{game.title}</h3>
            </div>
            <p className={`${game.styles.text} text-[8px] md:text-[9px] font-bold uppercase tracking-widest leading-tight mb-2 md:mb-3 opacity-60 relative z-10`}>{game.desc}</p>
            <div className="mt-auto flex items-center justify-between relative z-10 pt-2">
              <div className={`px-3 md:px-4 py-1.5 rounded-full border text-[7px] md:text-[8px] font-black uppercase tracking-widest transition-all ${game.done ? 'bg-green-500 text-black border-green-400' : 'bg-white/10 border-white/20 text-white group-hover:bg-white/20'}`}>
                {game.done ? 'Qualified' : t('common.play')}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[7px] font-black text-white/30 uppercase">{t('common.perfect')}</span>
                <span className="text-base md:text-lg font-black">{game.stat}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const { t, language } = useTranslation();
  
  const [showStats, setShowStats] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [stats, setStats] = useState<GlobalStats>(() => getStoredStats());
  const [rankUpData, setRankUpData] = useState<{ title: string; threshold: number } | null>(null);

  const currentFlag = useMemo(() => {
    switch (language) {
      case 'es': return '🇪🇸';
      case 'fr': return '🇫🇷';
      case 'it': return '🇮🇹';
      case 'de': return '🇩🇪';
      default: return '🇬🇧';
    }
  }, [language]);

  const isLobby = useMemo(() => {
    return location.pathname === '/' || location.pathname === '' || location.pathname.endsWith('index.html');
  }, [location.pathname]);

  const currentGameType = useMemo(() => {
    if (location.pathname.includes('euro-song')) return GameType.WORD_GAME;
    if (location.pathname.includes('euro-artist')) return GameType.ARTIST_WORD_GAME;
    if (location.pathname.includes('euro-links')) return GameType.LINKS_GAME;
    if (location.pathname.includes('euro-guess')) return GameType.GUESSER;
    if (location.pathname.includes('euro-arena')) return GameType.ARENA;
    return 'TOTAL';
  }, [location.pathname]);

  useEffect(() => {
    const wasInGame = prevPathRef.current !== '/' && !prevPathRef.current.endsWith('index.html');
    if (wasInGame && isLobby) {
      const refreshedStats = getStoredStats();
      const oldRank = getCurrentRank(stats?.totalPoints || 0);
      const newRank = getCurrentRank(refreshedStats.totalPoints || 0);
      if (newRank.threshold > oldRank.threshold) setRankUpData(newRank);
      setStats(refreshedStats);
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname, isLobby, stats?.totalPoints]);

  const currentRank = useMemo(() => getCurrentRank(stats?.totalPoints || 0), [stats?.totalPoints]);
  const handleReturn = () => navigate('/');

  return (
    <div className="min-h-screen relative flex flex-col">
      <ScrollToTop />
      <header className="px-4 md:px-8 py-2 border-b border-white/5 backdrop-blur-xl sticky top-0 z-[100] flex items-center justify-between bg-black/60 h-14 md:h-20">
        <div className="flex items-center gap-3 md:gap-6">
           {!isLobby && (
             <button onClick={handleReturn} className="p-1.5 md:p-2.5 hover:bg-white/10 rounded-xl transition-all text-white bg-white/5 border border-white/10 active:scale-90">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
             </button>
           )}
           <Link to="/" className="text-base md:text-2xl font-black tracking-tighter bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent uppercase italic pr-[0.2em] hover:opacity-80 transition-opacity whitespace-nowrap">
             Douze Points
           </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setShowLang(true)}
            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all active:scale-95 group overflow-hidden"
          >
            <span className="text-xl md:text-2xl group-hover:scale-125 transition-transform duration-300">{currentFlag}</span>
          </button>
          
          <button onClick={() => { setStats(getStoredStats()); setShowStats(true); }} className="flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2.5 hover:bg-white/10 rounded-full transition-all text-white bg-white/5 border border-white/10 active:scale-95 outline-none">
            <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]"></div>
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">
              {currentGameType === 'TOTAL' ? t('greenroom.statsButton') : t('greenroom.careerStats')}
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto pb-4 px-4 page-fade" key={location.pathname}>
        {isLobby && (
          <section className="text-center pt-16 md:pt-24 pb-8">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 px-4 py-1.5 rounded-full mb-6">
              <span className="text-[10px] md:text-[12px] font-black text-pink-500 uppercase tracking-[0.2em] italic pr-[0.15em]">{t(`ranks.${currentRank?.title}`)}</span>
            </div>
            <h1 className="text-5xl md:text-9xl font-black italic pr-[0.2em] tracking-tighter mb-4 uppercase leading-none text-white drop-shadow-2xl">{t('greenroom.greenroom')}</h1>
            <p className="text-gray-400 text-xs md:text-lg max-w-2xl mx-auto font-medium tracking-tight opacity-70 px-4 leading-relaxed">{t('greenroom.description')}</p>
          </section>
        )}
        <Routes>
          <Route path="/" element={<Dashboard stats={stats} />} />
          <Route path="/euro-song" element={<EuroWordGame onReturn={handleReturn} data={MASTER_DATA} gameType={GameType.WORD_GAME} gameId="songGame" title={t('games.eurosong.title')} />} />
          <Route path="/euro-artist" element={<EuroWordGame onReturn={handleReturn} data={MASTER_DATA} gameType={GameType.ARTIST_WORD_GAME} gameId="artistGame" title={t('games.euroartist.title')} />} />
          <Route path="/euro-links" element={<EuroLinks onReturn={handleReturn} />} />
          <Route path="/euro-guess" element={<EuroGuess onReturn={handleReturn} data={MASTER_DATA} />} />
          <Route path="/euro-arena" element={<EuroArena onReturn={handleReturn} data={MASTER_DATA} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
        </Routes>
      </main>

      {rankUpData && <RankUpCelebration newRank={rankUpData} onClose={() => setRankUpData(null)} />}
      {showStats && <StatsModal stats={stats} onClose={() => setShowStats(false)} onShowInfo={() => {}} initialTab={currentGameType} />}
      {showLang && <LanguageOverlay onClose={() => setShowLang(false)} />}
      
      <footer className="pt-12 pb-40 md:pb-24 text-center border-t border-white/5 px-6">
        <div className="flex flex-col items-center gap-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="font-black text-[10px] tracking-[0.5em] uppercase text-gray-500">Fan Project</p>
            <p className="text-[9px] font-bold text-gray-600 leading-relaxed uppercase tracking-widest">
              This is a fan-made project inspired by Eurovision. It is not affiliated with or endorsed by the European Broadcasting Union (EBU) or the official Eurovision Song Contest.
            </p>
          </div>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">{t('cookies.privacyPolicy')}</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">{t('cookies.cookiePolicy')}</Link>
          </div>
        </div>
      </footer>
      <CookieBanner />
      <StickyAd />
    </div>
  );
};

export default App;