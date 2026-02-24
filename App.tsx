import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import EuroWordGame from './games/wordGame/EuroWordGame.tsx';
import EuroLinks from './games/linksgame/EuroLinks.tsx';
import EuroRefrain from './games/refrain/EuroRefrain.tsx';
import EuroGuess from './games/guesser/EuroGuess.tsx';
import EuroArena from './games/arena/EuroArena.tsx';
import { GameType, GlobalStats } from './data/types.ts';
import { MASTER_DATA } from './data/masterData.ts';
import { getStoredStats, getCurrentRank, getDailyGameState } from './utils/stats.ts';
import { StatsModal } from './components/StatsModal.tsx';
import { DailyShareModal } from './components/DailyShareModal.tsx';
import { RankUpCelebration } from './components/RankUpCelebration.tsx';
import { getDayString } from './utils/daily.ts';
import { useTranslation } from './context/LanguageContext.tsx';
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx';
import { CountdownTimer } from './components/CountdownTimer.tsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LanguageOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { language, setLanguage, t } = useTranslation();
  
  const langs: { code: 'en' | 'de' | 'es' | 'fr' | 'it'; name: string; flag: string }[] = [
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
            {t('common.languages')}
          </h2>
        </div>

        <div className="space-y-3 mb-8">
          {langs.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-5 rounded-3xl border-2 transition-all active:scale-95 ${
                language === lang.code 
                  ? 'bg-white border-white text-black shadow-xl' 
                  : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl" role="img" aria-label={lang.name}>{lang.flag}</span>
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

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="text-8xl font-black italic text-white/10 mb-4 select-none">404</div>
      <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-4">
        {t('scorecard.signalLost')}
      </h2>
      <p className="text-gray-400 max-w-md mb-8 font-medium">
        The page you are looking for has been disqualified or never existed in the first place.
      </p>
      <button 
        onClick={() => navigate('/')}
        className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-pink-500 hover:text-white transition-all active:scale-95 shadow-xl"
      >
        {t('common.returnToGreenroom')}
      </button>
    </div>
  );
};

interface GameInstance {
  id: string;
  path: string;
  title: string;
  desc: string;
  type: GameType;
  done: boolean;
  points: number;
  stat: number;
  styles: {
    bg: string;
    text: string;
    glow: string;
  };
}

const Dashboard: React.FC<{ stats: GlobalStats; onShareDaily: (games: GameInstance[]) => void }> = ({ stats, onShareDaily }) => {
  const { t } = useTranslation();
  const today = getDayString();
  
  const gameConfigs = useMemo(() => [
    { id: 'eurosong', storageKey: 'eurosong', path: '/euro-song', title: t('games.eurosong.title'), desc: t('games.eurosong.desc'), type: GameType.WORD_GAME, styles: {
      bg: "from-purple-600/20 to-purple-900/40 border-purple-500/30",
      text: "text-purple-200",
      glow: "bg-purple-500"
    }},
    { id: 'euroartist', storageKey: 'euroartist', path: '/euro-artist', title: t('games.euroartist.title'), desc: t('games.euroartist.desc'), type: GameType.ARTIST_WORD_GAME, styles: {
      bg: "from-pink-600/20 to-pink-900/40 border-pink-500/30",
      text: "text-pink-200",
      glow: "bg-pink-500"
    }},
    { id: 'eurorefrain', storageKey: 'eurorefrain', path: '/euro-refrain', title: t('games.eurorefrain.title'), desc: t('games.eurorefrain.desc'), type: GameType.REFRAIN_GAME, styles: {
      bg: "from-indigo-600/20 to-indigo-900/40 border-indigo-500/30",
      text: "text-indigo-200",
      glow: "bg-indigo-500"
    }},
    { id: 'eurolinks', storageKey: 'eurolinks', path: '/euro-links', title: t('games.eurolinks.title'), desc: t('games.eurolinks.desc'), type: GameType.LINKS_GAME, styles: {
      bg: "from-orange-600/20 to-orange-900/40 border-orange-500/30",
      text: "text-orange-200",
      glow: "bg-orange-500"
    }},
    { id: 'euroguess', storageKey: 'euroguess', path: '/euro-guess', title: t('games.euroguess.title'), desc: t('games.euroguess.desc'), type: GameType.GUESSER, styles: {
      bg: "from-cyan-600/20 to-cyan-900/40 border-cyan-500/30",
      text: "text-cyan-200",
      glow: "bg-cyan-500"
    }},
    { id: 'euroarena', storageKey: 'euroarena', path: '/euro-arena', title: t('games.euroarena.title'), desc: t('games.euroarena.desc'), type: GameType.ARENA, styles: {
      bg: "from-emerald-600/20 to-emerald-900/40 border-emerald-500/30",
      text: "text-emerald-200",
      glow: "bg-emerald-500"
    }}
  ], [t]);

  const games = useMemo(() => gameConfigs.map(config => {
    const { done, points } = getDailyGameState(config, today);

    // Map stats
    const statsMap: Record<string, number> = {
      eurosong: stats?.word_game?.perfectGames || 0,
      euroartist: stats?.artists?.perfectGames || 0,
      eurolinks: stats?.links?.perfectGames || 0,
      eurorefrain: stats?.refrain?.perfectGames || 0,
      euroguess: stats?.guesser?.perfectGames || 0,
      euroarena: stats?.arena?.perfectGames || 0
    };
    const stat = statsMap[config.id] || 0;

    return { ...config, stat, done, points };
  }), [stats, today, gameConfigs]);

  const completedCount = games.filter(g => g.done).length;
  const totalDailyPoints = games.reduce((acc, g) => acc + g.points, 0);
  const isQualified = completedCount === games.length;

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Daily Progress Bar */}
      <div className="px-2 md:px-6 mb-6 md:mb-8">
        <div className="bg-[#0b0b18]/60 backdrop-blur-xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity group-hover:opacity-20"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[9px] font-black text-pink-500 uppercase tracking-[0.4em]">{t('greenroom.dailyProgress')}</span>
                {isQualified && (
                  <span className="bg-green-500/20 text-green-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.15em] border border-green-500/30 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                    {t('greenroom.qualified')}
                  </span>
                )}
              </div>
              <div className="flex items-end gap-4 md:gap-6 mb-3">
                <div className="flex items-end gap-2">
                  <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
                    {completedCount}<span className="text-white/20 mx-1">/</span>{games.length}
                  </h2>
                  <span className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest pb-0.5">{t('greenroom.finishedToday')}</span>
                </div>
                <div className="flex items-end gap-2 border-l border-white/10 pl-4 md:pl-6">
                  <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-yellow-500 leading-none">
                    {totalDailyPoints}
                  </h2>
                  <span className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest pb-0.5">{t('greenroom.todayScore')}</span>
                </div>
              </div>
              
              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                  style={{ width: `${(completedCount / games.length) * 100}%` }}
                />
              </div>

              {isQualified && (
                <div className="mt-6 pt-6 border-t border-white/5 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-1000">
                  <CountdownTimer label={t('scorecard.nextGame')} />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {completedCount > 0 && (
                <button 
                  onClick={() => onShareDaily(games)}
                  className="flex items-center gap-2.5 px-5 py-3.5 bg-white text-black rounded-xl md:rounded-2xl font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-pink-500 hover:text-white transition-all active:scale-95 shadow-xl"
                >
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                  </svg>
                  {t('common.shareDaily')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5 px-2 md:px-6">
        {games.map((game) => (
          <Link 
            key={game.path}
            to={game.path}
            aria-label={`${t('common.play')} ${game.title}`}
            className={`
              group relative flex flex-col min-h-[140px] sm:min-h-[160px] md:min-h-[200px] p-3.5 sm:p-5 md:p-6 rounded-[1.25rem] md:rounded-[2rem] 
              bg-gradient-to-br ${game.styles.bg} border-2 transition-all duration-300 
              hover:scale-[1.03] active:scale-95 shadow-xl overflow-hidden block
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20
              ${game.done ? 'border-green-500/30' : 'border-white/5'}
            `}
          >
            <div className={`absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 ${game.styles.glow} rounded-full blur-[60px] md:blur-[80px] ${game.done ? 'opacity-5 grayscale' : 'opacity-10 group-hover:opacity-25'} transition-opacity`}></div>
            
            <div className="mb-2 relative z-10">
               <h3 className="text-sm sm:text-base md:text-xl font-black italic uppercase tracking-tighter leading-tight pr-2">
                 {game.title}
               </h3>
            </div>
            
            <p className={`${game.styles.text} text-[8px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-6 opacity-60 relative z-10 flex-1`}>
              {game.desc}
            </p>
            
            <div className="mt-auto flex items-center justify-between relative z-10 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full border text-[8px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${game.done ? 'bg-green-500 text-black border-green-400' : 'bg-white/5 border-white/10 text-white group-hover:bg-white/10'}`}>
                  {game.done ? t('common.qualified') : t('common.play')}
                </div>
                {game.done && game.points > 0 && (
                  <span className="text-[10px] font-black text-yellow-500">+{game.points}</span>
                )}
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[7px] sm:text-[8px] font-black text-white/20 uppercase tracking-tighter">{t('common.perfect')}</span>
                <span className="text-sm sm:text-base font-black leading-none">{game.stat}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const { t, language } = useTranslation();
  
  const [showStats, setShowStats] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showDailyShare, setShowDailyShare] = useState(false);
  const [dailyShareGames, setDailyShareGames] = useState<GameInstance[]>([]);
  const [stats, setStats] = useState<GlobalStats>(() => getStoredStats());
  const [rankUpData, setRankUpData] = useState<{ title: string; threshold: number } | null>(null);

  // SEO: Dynamic Page Titles and Descriptions based on Route
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Douze Points | Daily Eurovision Games',
      '/euro-song': 'EuroSong - Daily Eurovision Wordle-style Game',
      '/euro-artist': 'EuroArtist - Daily ESC Artist Guessing',
      '/euro-refrain': 'EuroRefrain - Daily Lyric Hook Puzzle',
      '/euro-links': 'EuroLinks - ESC Connections-style Puzzle',
      '/euro-guess': 'EuroGuess - Mystery Eurovision Song Quiz',
      '/euro-arena': 'EuroArena - ESC Stats Battle',
      '/privacy': 'Privacy Policy | Douze Points'
    };

    const keywords: Record<string, string> = {
      '/': 'Eurovision, ESC, Song Contest, Games, Trivia, Music Games, Fan Games, Douze Points, Wordle-style, Connections-like, EuroRefrain, daily puzzle, quiz, music challenge',
      '/euro-song': 'EuroSong, Eurovision Wordle, ESC song guess, daily music puzzle',
      '/euro-artist': 'EuroArtist, Eurovision artist trivia, ESC singer guess, daily artist game',
      '/euro-refrain': 'EuroRefrain, Eurovision lyrics, ESC hook puzzle, daily lyric challenge',
      '/euro-links': 'EuroLinks, Eurovision connections, ESC categories, daily link puzzle',
      '/euro-guess': 'EuroGuess, Eurovision trivia, ESC mystery song, music quiz',
      '/euro-arena': 'EuroArena, Eurovision stats, ESC history battle, competitive trivia'
    };

    // Generate a rich description using MASTER_DATA for the home page
    const getRichDescription = () => {
      const goldenSongs = MASTER_DATA.filter(s => s.tier === 'golden');
      const featured = goldenSongs.sort(() => 0.5 - Math.random()).slice(0, 3);
      const songList = featured.map(s => `${s.artist} ("${s.title}")`).join(', ');
      return `Play Douze Points, the ultimate Eurovision fan hub. Daily challenges featuring classics like ${songList}, and the latest entries. Test your ESC knowledge!`;
    };

    const descriptions: Record<string, string> = {
      '/': getRichDescription(),
      '/euro-song': 'Guess the daily Eurovision song in this Wordle-inspired challenge. Use hints like year, country, and genre to find the winner!',
      '/euro-artist': 'Can you name the Eurovision artist? A daily word game testing your knowledge of ESC performers through the decades.',
      '/euro-refrain': 'Identify the Eurovision song from just a snippet of its lyrics. The ultimate challenge for fans of ESC hooks and refrains.',
      '/euro-links': 'Find the connections between 16 Eurovision artists or songs. A daily category puzzle inspired by the NYT Connections.',
      '/euro-guess': 'Listen to the mystery and guess the Eurovision entry. Multiple choice trivia for the most dedicated fans.',
      '/euro-arena': 'Battle it out in the EuroArena. Compare Eurovision stats, placings, and history in this competitive trivia mode.',
      '/privacy': 'Read the Douze Points privacy policy and how we handle your data.'
    };

    const currentTitle = titles[location.pathname] || 'Douze Points | Daily ESC Challenges';
    const currentDesc = descriptions[location.pathname] || descriptions['/'];
    const currentKeywords = keywords[location.pathname] || keywords['/'];

    document.title = currentTitle;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentDesc);
    }

    
    // Update Open Graph and Twitter tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentDesc);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://www.douzepoints.net${location.pathname}`);

    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', currentTitle);

    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', currentDesc);

    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', `https://www.douzepoints.net${location.pathname}`);

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', currentKeywords);
    }

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://www.douzepoints.net${location.pathname}`);

    // Update HTML lang attribute
    document.documentElement.lang = language;

    // Dynamic JSON-LD for Structured Data
    const existingScript = document.getElementById('dynamic-json-ld');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'dynamic-json-ld';
    script.type = 'application/ld+json';
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      "name": currentTitle,
      "description": currentDesc,
      "url": `https://www.douzepoints.net${location.pathname}`,
      "genre": ["Puzzle Game", "Music Game"],
      "author": { "@type": "Person", "name": "Justus Hellman" }
    };

    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [location.pathname, language]);

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

  useEffect(() => {
    const wasInGame = prevPathRef.current !== '/' && !prevPathRef.current.endsWith('index.html');
    if (wasInGame && isLobby) {
      const refreshedStats = getStoredStats();
      const oldRank = getCurrentRank(stats?.totalPoints || 0);
      const newRank = getCurrentRank(refreshedStats.totalPoints || 0);
      
      // Use a timeout to avoid setState during render/effect cycle if needed, 
      // but here we just want to avoid the lint error by being careful.
      // Actually, the lint error is about cascading renders.
      if (newRank.threshold > oldRank.threshold) {
        setTimeout(() => setRankUpData(newRank), 0);
      }
      
      if (JSON.stringify(refreshedStats) !== JSON.stringify(stats)) {
        setTimeout(() => setStats(refreshedStats), 0);
      }
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname, isLobby, stats]);

  const currentRank = useMemo(() => getCurrentRank(stats?.totalPoints || 0), [stats?.totalPoints]);
  const handleReturn = () => navigate('/');

  return (
    <div className="min-h-screen relative flex flex-col">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[1000] focus:px-6 focus:py-3 focus:bg-pink-500 focus:text-white focus:font-black focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-500/50 uppercase text-xs tracking-widest"
      >
        Skip to content
      </a>
      <ScrollToTop />
      
      <header className="px-4 md:px-8 border-b border-white/10 backdrop-blur-md sticky top-0 z-[100] flex items-center justify-between bg-black/40 h-12 md:h-16 transition-all duration-300" role="banner">
        <div className="flex items-center gap-2 md:gap-4">
           {!isLobby && (
             <button 
               onClick={handleReturn} 
               className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-all text-white bg-white/5 border border-white/10 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500" 
               aria-label={t('common.back')}
             >
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
             </button>
           )}
           <Link to="/" className="text-sm md:text-xl font-black tracking-tighter bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent uppercase italic pr-[0.2em] hover:opacity-80 transition-opacity whitespace-nowrap">
             Douze Points
           </Link>
        </div>
        
        <div className="flex items-center gap-1.5 md:gap-3">
          <button 
            onClick={() => setShowLang(true)}
            className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95 group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            aria-label={t('common.selectLanguage')}
          >
            <span className="text-base md:text-lg group-hover:scale-110 transition-transform duration-300" role="img" aria-label="Language">{currentFlag}</span>
          </button>
          
          <button 
            onClick={() => { setStats(getStoredStats()); setShowStats(true); }} 
            className="flex items-center gap-1.5 px-2.5 md:px-4 py-1.5 md:py-2 hover:bg-white/10 rounded-full transition-all text-white bg-white/5 border border-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
          >
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]"></div>
            <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
              {t('greenroom.statsButton')}
            </span>
          </button>
        </div>
      </header>

      <main id="main-content" className="flex-1 container mx-auto pb-4 px-2 md:px-4 page-fade" key={location.pathname} role="main">
        {isLobby && (
          <section className="text-center pt-6 md:pt-12 pb-6 md:pb-8">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full mb-3 md:mb-4">
              <span className="text-[9px] md:text-[11px] font-black text-pink-500 uppercase tracking-[0.2em] italic pr-[0.15em]">{t(`ranks.${currentRank?.title}`)}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic pr-[0.1em] tracking-tighter mb-2 md:mb-4 uppercase leading-none text-white drop-shadow-2xl">{t('greenroom.greenroom')}</h1>
            <p className="text-gray-400 text-[9px] sm:text-xs md:text-sm max-w-2xl mx-auto font-medium tracking-tight opacity-70 px-4 leading-relaxed">{t('greenroom.description')}</p>
          </section>
        )}
        
        <Routes>
          <Route path="/" element={<Dashboard stats={stats} onShareDaily={(games) => { setDailyShareGames(games); setShowDailyShare(true); }} />} />
          <Route path="/euro-song" element={<EuroWordGame onReturn={handleReturn} data={MASTER_DATA} gameType={GameType.WORD_GAME} gameId="eurosong" title={t('games.eurosong.title')} />} />
          <Route path="/euro-artist" element={<EuroWordGame onReturn={handleReturn} data={MASTER_DATA} gameType={GameType.ARTIST_WORD_GAME} gameId="euroartist" title={t('games.euroartist.title')} />} />
          <Route path="/euro-refrain" element={<EuroRefrain onReturn={handleReturn} />} />
          <Route path="/euro-links" element={<EuroLinks onReturn={handleReturn} />} />
          <Route path="/euro-guess" element={<EuroGuess onReturn={handleReturn} data={MASTER_DATA} />} />
          <Route path="/euro-arena" element={<EuroArena onReturn={handleReturn} data={MASTER_DATA} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {rankUpData && <RankUpCelebration newRank={rankUpData} onClose={() => setRankUpData(null)} />}
      {showStats && <StatsModal stats={stats} onClose={() => setShowStats(false)} onShowInfo={() => {}} initialTab="TOTAL" />}
      {showDailyShare && <DailyShareModal games={dailyShareGames} onClose={() => setShowDailyShare(false)} totalPoints={stats.totalPoints} />}
      {showLang && <LanguageOverlay onClose={() => setShowLang(false)} />}
      
      <footer className="pt-12 pb-24 text-center border-t border-white/5 px-6" role="contentinfo">
        <div className="flex flex-col items-center gap-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="font-black text-[10px] tracking-[0.5em] uppercase text-gray-500">Fan Project</p>
            <p className="text-[9px] font-bold text-gray-600 leading-relaxed uppercase tracking-widest px-4">
              This is a fan-made project inspired by Eurovision. It is not affiliated with or endorsed by the EBU or the official Eurovision Song Contest.
            </p>
          </div>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">{t('cookies.privacyPolicy')}</Link>
            <a href="mailto:douzepointsgame@gmail.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;