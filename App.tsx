import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import EuroWordGame from './games/wordGame/EuroWordGame.tsx';
import EuroLinks from './games/linksgame/EuroLinks.tsx';
import EuroRefrain from './games/refrain/EuroRefrain.tsx';
import EuroGuess from './games/guesser/EuroGuess.tsx';
import EuroArena from './games/arena/EuroArena.tsx';
import { GameType, GlobalStats } from './data/types.ts';
import { getActiveMasterData } from './data/activeData.ts';
import { getStoredStats, getCurrentRank, getDailyGameState } from './utils/stats.ts';
import { reportSupportClick } from './utils/firebaseService.ts';
import { logAnalyticsEvent, setAnalyticsUserProperty } from './utils/analytics.ts';
import { StatsModal } from './components/StatsModal.tsx';
import { DailyShareModal } from './components/DailyShareModal.tsx';
import { RankUpCelebration } from './components/RankUpCelebration.tsx';
import { getDayString } from './utils/daily.ts';
import { useTranslation } from './context/LanguageContext.tsx';
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx';
import TermsOfService from './components/TermsOfService.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import Admin from './components/Admin.tsx';
import PatchNotes from './components/PatchNotes.tsx';
import { CountdownTimer } from './components/CountdownTimer.tsx';
import { InfiniteArena } from './components/InfiniteArena.tsx';

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

  useEffect(() => {
    if (isQualified) {
      import('./utils/firebaseService.ts').then(m => m.reportDailyCompletion(totalDailyPoints));
    }
  }, [isQualified, totalDailyPoints]);

  return (
    <div className="max-w-4xl mx-auto pb-8">
      {/* Daily Progress Bar */}
      <div className="px-2 md:px-6 mb-4 md:mb-6">
        <div className="bg-[#0b0b18]/60 backdrop-blur-xl border border-white/10 rounded-[1.25rem] md:rounded-[1.5rem] p-4 md:p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl -mr-24 -mt-24 transition-opacity group-hover:opacity-20"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[8px] font-black text-pink-500 uppercase tracking-[0.3em]">{t('greenroom.dailyProgress')}</span>
                {isQualified && (
                  <span className="bg-green-500/20 text-green-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.1em] border border-green-500/30 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                    {t('greenroom.qualified')}
                  </span>
                )}
              </div>
              <div className="flex items-end gap-3 md:gap-5 mb-2.5">
                <div className="flex items-end gap-1.5">
                  <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter text-white leading-none">
                    {completedCount}<span className="text-white/20 mx-0.5">/</span>{games.length}
                  </h2>
                  <span className="text-[7px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest pb-0.5">{t('greenroom.finishedToday')}</span>
                </div>
                <div className="flex items-end gap-1.5 border-l border-white/10 pl-3 md:pl-5">
                  <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter text-yellow-500 leading-none">
                    {totalDailyPoints}
                  </h2>
                  <span className="text-[7px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest pb-0.5">{t('greenroom.todayScore')}</span>
                </div>
              </div>
              
              <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(completedCount / games.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {import.meta.env.DEV && (
                <button 
                  onClick={() => {
                    import('./utils/stats.ts').then(m => m.resetDailyProgressForDev());
                  }}
                  className="flex items-center gap-2 px-5 py-3 bg-red-500/20 text-red-400 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-lg border border-red-500/30"
                >
                  DEV RESET
                </button>
              )}
              {completedCount > 0 && (
                <button 
                  onClick={() => onShareDaily(games)}
                  className="flex items-center gap-2 px-5 py-3 bg-white text-black rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-pink-500 hover:text-white transition-all active:scale-95 shadow-lg"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                  </svg>
                  {t('common.shareDaily')}
                </button>
              )}

              {isQualified && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
                  <CountdownTimer label={t('scorecard.nextGame')} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {completedCount > 0 && (
        <div className="px-2 md:px-6 mb-6">
          <div className="flex justify-center">
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 px-2 md:px-6">
        {games.map((game) => (
          <Link 
            key={game.path}
            to={game.path}
            aria-label={`${t('common.play')} ${game.title}`}
            className={`
              group relative flex flex-col min-h-[120px] sm:min-h-[140px] md:min-h-[160px] p-3 sm:p-4 md:p-5 rounded-[1rem] md:rounded-[1.5rem] 
              bg-gradient-to-br ${game.styles.bg} border-2 transition-all duration-300 
              hover:scale-[1.02] active:scale-95 shadow-lg overflow-hidden
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20
              ${game.done ? 'border-green-500/30' : 'border-white/5'}
            `}
          >
            <div className={`absolute -top-8 -right-8 w-24 h-24 md:w-32 md:h-32 ${game.styles.glow} rounded-full blur-[40px] md:blur-[60px] ${game.done ? 'opacity-5 grayscale' : 'opacity-10 group-hover:opacity-20'} transition-opacity`}></div>
            
            <div className="mb-1.5 relative z-10">
               <h3 className="text-xs sm:text-sm md:text-lg font-black italic uppercase tracking-tighter leading-tight pr-2">
                 {game.title}
               </h3>
            </div>
            
            <p className={`${game.styles.text} text-[7px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-widest leading-relaxed mb-4 opacity-60 relative z-10 flex-1`}>
              {game.desc}
            </p>
            
            <div className="mt-auto flex items-center justify-between gap-2 relative z-10 pt-1.5 border-t border-white/5">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className={`px-2 py-0.5 rounded-full border text-[7px] sm:text-[8px] font-black uppercase tracking-widest transition-all truncate ${game.done ? 'bg-green-500 text-black border-green-400' : 'bg-white/5 border-white/10 text-white group-hover:bg-white/10'}`}>
                  {game.done ? t('common.qualified') : t('common.play')}
                </div>
                {game.done && game.points > 0 && (
                  <span className="text-[9px] font-black text-yellow-500 shrink-0">+{game.points}</span>
                )}
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[6px] sm:text-[7px] font-black text-white/20 uppercase tracking-widest">{t('common.perfect')}</span>
                <span className="text-xs sm:text-sm font-black leading-none">{game.stat}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Infinite Mode Entrance */}
      <div className="mt-8 px-2 md:px-6">
        <Link
          to="/infinite"
          className="group relative flex items-center justify-between p-4 sm:p-6 rounded-[1rem] md:rounded-[1.5rem] bg-gradient-to-br from-amber-600/20 to-amber-900/40 border-2 border-amber-500/30 hover:scale-[1.01] active:scale-95 transition-all duration-300 shadow-lg overflow-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/20 w-full"
        >
          <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-1 block">
              Infinite Mode
            </span>
            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white leading-none">
              {t('infinite.title')}
            </h2>
          </div>
          
          <div className="relative z-10 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest text-amber-100 group-hover:bg-amber-500/30 transition-colors">
            {t('common.play')}
          </div>
        </Link>
      </div>

      {/* Support Section */}
      {completedCount > 0 && (
        <div className="mt-6 px-2 md:px-6">
          <a
            href="https://buymeacoffee.com/DouzePointsGame"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => reportSupportClick('App_GamesList')}
            className="group flex flex-col sm:flex-row items-center justify-between px-5 py-3 md:py-4 rounded-xl transition-colors duration-300 bg-white/5 hover:bg-white/10"
          >
            <div className="flex items-center gap-3 mb-3 sm:mb-0 text-center sm:text-left">
              <svg className="w-4 h-4 text-[#FFDD00] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/>
              </svg>
              <span className="text-xs md:text-sm font-medium text-gray-300">
                {t('support.title')} <span className="opacity-70 hidden sm:inline">— Support the project</span>
              </span>
            </div>
            <div className={`text-[10px] font-bold uppercase tracking-widest transition-colors px-4 py-1.5 rounded-full sm:ml-4 whitespace-nowrap ${
              completedCount === games.length
                ? 'bg-[#FFDD00]/20 text-white group-hover:bg-[#FFDD00]/30'
                : 'bg-[#FFDD00]/10 text-white group-hover:bg-[#FFDD00]/20'
            }`}>
              {t('support.button')}
            </div>
          </a>
        </div>
      )}

      {/* Socials Section */}
      <div className="mt-10 mb-6">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{t('common.joinCommunity')}</span>
          <div className="flex gap-4">
            <a
              href="https://www.reddit.com/r/douzepoints"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#FF4500]/10 border border-[#FF4500]/20 hover:bg-[#FF4500]/20 transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#FF4500]">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.04.21.06.427.06.646 0 2.834-3.334 5.132-7.447 5.132-4.113 0-7.447-2.298-7.447-5.132 0-.215.021-.435.06-.646-.621-.264-1.056-.881-1.056-1.597 0-.968.786-1.754 1.754-1.754.463 0 .89.182 1.207.491 1.207-.856 2.843-1.427 4.674-1.488l.8-3.747 2.597.547c-.012.068-.02.137-.02.208 0 .688.562 1.25 1.25 1.25zM8.507 11.2c-.792 0-1.434.642-1.434 1.434s.642 1.434 1.434 1.434c.792 0 1.434-.642 1.434-1.434s-.642-1.434-1.434-1.434zm6.986 0c-.792 0-1.434.642-1.434 1.434s.642 1.434 1.434 1.434c.792 0 1.434-.642 1.434-1.434s-.642-1.434-1.434-1.434zm-1.145 4.852a5.412 5.412 0 0 1-2.348.513 5.412 5.412 0 0 1-2.348-.513.437.437 0 0 1-.223-.574.437.437 0 0 1 .574-.223c.651.285 1.326.429 1.997.429s1.346-.144 1.997-.429a.437.437 0 0 1 .574.223.437.437 0 0 1-.223.574z"/>
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-100/70 group-hover:text-white transition-colors">r/douzepoints</span>
            </a>
            <a
              href="https://discord.gg/kn6ETJpWc"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/20 hover:bg-[#5865F2]/20 transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#5865F2]">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.666 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-100/70 group-hover:text-white transition-colors">Discord</span>
            </a>
          </div>
        </div>
      </div>

      {/* How to Play General Section */}
      <div className="mt-12 px-2 md:px-6">
        <div className="bg-white/5 border border-white/5 rounded-[1.5rem] p-6 md:p-10 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500"></div>
          <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-white mb-6 pr-[0.1em]">
            {t('greenroom.howToPlayTitle')}
          </h2>
          <div className="space-y-4 text-gray-400 text-xs md:text-sm font-medium leading-relaxed max-w-3xl">
            <p>{t('greenroom.howToPlayP1')}</p>
            <p>{t('greenroom.howToPlayP2')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { usePlaytimeTracker } from './hooks/usePlaytimeTracker.ts';

const App: React.FC = () => {
  usePlaytimeTracker();
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const { t, language } = useTranslation();
  
  useEffect(() => {
    import('./utils/firebaseService.ts').then(m => m.reportDailyLanguage(language));
    setAnalyticsUserProperty({ preferred_language: language });
  }, [language]);

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
      '/infinite': 'Infinite Mode | Douze Points Eurovision Games',
      '/infinite/euro-song': 'Infinite EuroSong | Eurovision Word Game',
      '/infinite/euro-artist': 'Infinite EuroArtist | ESC Artist Guessing',
      '/infinite/euro-guess': 'Infinite EuroGuess | Eurovision Song Quiz',
      '/infinite/euro-arena': 'Infinite EuroArena | ESC Stats Battle',
      '/patch-notes': 'Patch Notes | Douze Points Updates',
      '/privacy': 'Privacy Policy | Douze Points',
      '/terms': 'Terms of Service | Douze Points',
      '/about': 'About Douze Points | Eurovision Fan Project',
      '/contact': 'Contact Us | Douze Points'
    };

    const keywords: Record<string, string> = {
      '/': 'Eurovision, ESC, Song Contest, Games, Trivia, Music Games, Fan Games, Douze Points, Wordle-style, Connections-like, EuroRefrain, daily puzzle, quiz, music challenge',
      '/euro-song': 'EuroSong, Eurovision Wordle, ESC song guess, daily music puzzle',
      '/euro-artist': 'EuroArtist, Eurovision artist trivia, ESC singer guess, daily artist game',
      '/euro-refrain': 'EuroRefrain, Eurovision lyrics, ESC hook puzzle, daily lyric challenge',
      '/euro-links': 'EuroLinks, Eurovision connections, ESC categories, daily link puzzle',
      '/euro-guess': 'EuroGuess, Eurovision trivia, ESC mystery song, music quiz',
      '/euro-arena': 'EuroArena, Eurovision stats, ESC history battle, competitive trivia',
      '/infinite': 'Eurovision infinite mode, ESC endless games, Eurovision practice',
      '/patch-notes': 'Douze Points updates, Eurovision game changes, ESC game news'
    };

    // Generate a rich description using getActiveMasterData() for the home page
    const getRichDescription = () => {
      const activeData = getActiveMasterData();
      const goldenSongs = activeData.filter(s => s.tier === 'golden');
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
      '/infinite': 'Play Eurovision games without limits. Practice your skills in EuroSong, EuroArtist, EuroGuess, and EuroArena in our endless mode.',
      '/patch-notes': 'Stay up to date with the latest changes, new features, and bug fixes in Douze Points.',
      '/privacy': 'Read the Douze Points privacy policy and how we handle your data.',
      '/terms': 'Read our terms of service for using the Douze Points platform.',
      '/about': 'Learn more about Douze Points, a fan-made Eurovision song contest game project.',
      '/contact': 'Get in touch with the Douze Points team for feedback or inquiries.'
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
    if (ogUrl) ogUrl.setAttribute('content', `${window.location.origin}${location.pathname}`);
    
    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', `${window.location.origin}${location.pathname}`);

    const canonicalUrl = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) canonicalUrl.setAttribute('href', `https://www.douzepoints.net${location.pathname}`);

    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', currentTitle);

    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', currentDesc);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', `${window.location.origin}/og-image.png`);

    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', `${window.location.origin}/og-image.png`);

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
    canonical.setAttribute('href', `${window.location.origin}${location.pathname}`);

    // Update HTML lang attribute
    document.documentElement.lang = language;

    // Manual Page View Tracking for GA4 (important for HashRouter)
    logAnalyticsEvent('page_view', {
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href
    });

    // Dynamic JSON-LD for Structured Data
    const existingScript = document.getElementById('dynamic-json-ld');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'dynamic-json-ld';
    script.type = 'application/ld+json';
    
    const structuredData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      "name": currentTitle,
      "description": currentDesc,
      "url": `${window.location.origin}${location.pathname}`,
      "genre": ["Puzzle Game", "Music Game"],
      "author": { "@type": "Person", "name": "Justus Hellman" }
    };

    // Add Breadcrumbs
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      structuredData.breadcrumb = {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin
          },
          ...pathParts.map((part, index) => ({
            "@type": "ListItem",
            "position": index + 2,
            "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
            "item": `${window.location.origin}/${pathParts.slice(0, index + 1).join('/')}`
          }))
        ]
      };
    }

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
      const oldPoints = stats?.totalPoints || 0;
      const newPoints = refreshedStats.totalPoints || 0;
      
      const oldRank = getCurrentRank(oldPoints);
      const newRank = getCurrentRank(newPoints);
      
      if (newRank.threshold > oldRank.threshold) {
        logAnalyticsEvent('level_up', {
          level: newRank.threshold,
          character: newRank.title
        });
        setTimeout(() => setRankUpData(newRank), 0);
      }
      
      // Only update if points actually changed to avoid unnecessary re-renders
      if (newPoints !== oldPoints) {
        setTimeout(() => setStats(refreshedStats), 0);
      }
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname, isLobby, stats?.totalPoints]); // Added stats?.totalPoints to dependencies

  const currentRank = useMemo(() => getCurrentRank(stats?.totalPoints || 0), [stats?.totalPoints]);
  const handleReturn = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 1) {
      navigate('/' + pathParts.slice(0, -1).join('/'));
    } else {
      navigate('/');
    }
  };

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
           <Link to="/" className="text-sm md:text-xl font-black tracking-tighter uppercase italic pr-[0.2em] hover:opacity-80 transition-opacity whitespace-nowrap">
             <span className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Douze Points</span>
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

      <ErrorBoundary>
        <main id="main-content" className="flex-1 w-full max-w-4xl mx-auto pb-4 px-2 md:px-4 page-fade" key={location.pathname} role="main">
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
            <Route path="/euro-song" element={<EuroWordGame onReturn={handleReturn} data={getActiveMasterData()} gameType={GameType.WORD_GAME} gameId="eurosong" title={t('games.eurosong.title')} />} />
            <Route path="/euro-artist" element={<EuroWordGame onReturn={handleReturn} data={getActiveMasterData()} gameType={GameType.ARTIST_WORD_GAME} gameId="euroartist" title={t('games.euroartist.title')} />} />
            <Route path="/euro-refrain" element={<EuroRefrain onReturn={handleReturn} />} />
            <Route path="/euro-links" element={<EuroLinks onReturn={handleReturn} />} />
            <Route path="/euro-guess" element={<EuroGuess onReturn={handleReturn} data={getActiveMasterData()} />} />
            <Route path="/euro-arena" element={<EuroArena onReturn={handleReturn} data={getActiveMasterData()} />} />
            
            {/* Infinite Mode Routes */}
            <Route path="/infinite" element={<InfiniteArena />} />
            <Route path="/infinite/euro-song" element={<EuroWordGame onReturn={() => navigate('/infinite')} mode="infinite" gameId="eurosong" title={t('games.eurosong.title')} gameType={GameType.WORD_GAME} />} />
            <Route path="/infinite/euro-artist" element={<EuroWordGame onReturn={() => navigate('/infinite')} mode="infinite" gameId="euroartist" title={t('games.euroartist.title')} gameType={GameType.ARTIST_WORD_GAME} />} />
            <Route path="/infinite/euro-guess" element={<EuroGuess onReturn={() => navigate('/infinite')} mode="infinite" gameId="euroguess" data={getActiveMasterData()} />} />
            <Route path="/infinite/euro-arena" element={<EuroArena onReturn={() => navigate('/infinite')} mode="infinite" gameId="euroarena" data={getActiveMasterData()} />} />

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/patch-notes" element={<PatchNotes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </ErrorBoundary>

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
            <a 
              href="https://buymeacoffee.com/DouzePointsGame" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => reportSupportClick('App_Footer')}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FFDD00]/70 hover:text-[#FFDD00] transition-colors mt-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/></svg>
              {t('support.button')}
            </a>
          </div>
          <div className="flex justify-center gap-6 border-t border-white/5 w-full max-w-xs mx-auto">
            <a href="https://www.reddit.com/r/douzepoints" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#FF4500] transition-colors" aria-label="Reddit">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.04.21.06.427.06.646 0 2.834-3.334 5.132-7.447 5.132-4.113 0-7.447-2.298-7.447-5.132 0-.215.021-.435.06-.646-.621-.264-1.056-.881-1.056-1.597 0-.968.786-1.754 1.754-1.754.463 0 .89.182 1.207.491 1.207-.856 2.843-1.427 4.674-1.488l.8-3.747 2.597.547c-.012.068-.02.137-.02.208 0 .688.562 1.25 1.25 1.25zM8.507 11.2c-.792 0-1.434.642-1.434 1.434s.642 1.434 1.434 1.434c.792 0 1.434-.642 1.434-1.434s-.642-1.434-1.434-1.434zm6.986 0c-.792 0-1.434.642-1.434 1.434s.642 1.434 1.434 1.434c.792 0 1.434-.642 1.434-1.434s-.642-1.434-1.434-1.434zm-1.145 4.852a5.412 5.412 0 0 1-2.348.513 5.412 5.412 0 0 1-2.348-.513.437.437 0 0 1-.223-.574.437.437 0 0 1 .574-.223c.651.285 1.326.429 1.997.429s1.346-.144 1.997-.429a.437.437 0 0 1 .574.223.437.437 0 0 1-.223.574z"/>
              </svg>
            </a>
            <a href="https://discord.gg/kn6ETJpWc" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#5865F2] transition-colors" aria-label="Discord">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.666 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[9px] font-black uppercase tracking-widest text-gray-500">
            <Link to="/patch-notes" className="hover:text-white transition-colors">Patch Notes</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">{t('privacy.title')}</Link>
            <Link to="/about" className="hover:text-white transition-colors">{t('about.title')}</Link>
            <Link to="/contact" className="hover:text-white transition-colors">{t('contact.title')}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t('terms.title')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;