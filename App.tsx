import { PartyPopper } from 'lucide-react';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { REDDIT_URL, DISCORD_URL, BUY_ME_A_COFFEE_URL } from './data/constants.tsx';
import EuroWordGame from './games/wordGame/EuroWordGame.tsx';
import EuroLinks from './games/linksgame/EuroLinks.tsx';
import EuroRefrain from './games/refrain/EuroRefrain.tsx';
import EuroGuess from './games/guesser/EuroGuess.tsx';
import EuroArena from './games/arena/EuroArena.tsx';
import { EuroBingo } from './games/bingo/EuroBingo.tsx';
import EuroCollectionGame from './components/EuroCollectionGame.tsx';
import { GameType, GlobalStats } from './data/types.ts';
import { getActiveMasterData } from './data/activeData.ts';
import { getStoredStats, getCurrentRank, getDailyGameState } from './utils/stats.ts';
import { reportSupportClick } from './utils/firebaseService.ts';
import { logAnalyticsEvent, setAnalyticsUserProperty } from './utils/analytics.ts';
import { StatsModal } from './components/StatsModal.tsx';
import { DailyShareModal } from './components/DailyShareModal.tsx';
import { RankUpCelebration } from './components/RankUpCelebration.tsx';
import { getDayString } from './utils/daily.ts';
import { useAuth } from './hooks/useAuth.ts';
import { useUserData } from './hooks/useUserData.ts';
import { useTranslation, SUPPORTED_LANGUAGES } from './context/LanguageContext.tsx';
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx';
import TermsOfService from './components/TermsOfService.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import Admin from './components/Admin.tsx';
import PatchNotes from './components/PatchNotes.tsx';
import { CountdownTimer } from './components/CountdownTimer.tsx';
import { EurovisionCountdown } from './components/EurovisionCountdown.tsx';
import { InfiniteArena } from './components/InfiniteArena.tsx';
import { EUROVISION_SCHEDULE } from './config/eurovisionSchedule.ts';
import { soundManager } from './utils/sounds.ts';

const isWindows = typeof navigator !== 'undefined' && /Win/i.test(navigator.userAgent);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AVATARS = [
  { id: 'default', emoji: '👤', name: 'Fan', color: 'from-slate-300 to-slate-500 shadow-slate-400/30' },
  { id: 'singer', emoji: '🎤', name: 'Euro Star', color: 'from-fuchsia-500 to-indigo-500 shadow-fuchsia-500/30' },
  { id: 'diva', emoji: '👩‍🎤', name: 'Glam Diva', color: 'from-pink-500 to-rose-500 shadow-pink-500/30' },
  { id: 'retro', emoji: '🪩', name: 'Disco King', color: 'from-cyan-500 to-blue-500 shadow-cyan-500/30' },
  { id: 'sax', emoji: '🎷', name: 'Epic Sax', color: 'from-amber-500 to-orange-500 shadow-amber-500/30' },
  { id: 'rock', emoji: '🎸', name: 'Metal Lord', color: 'from-slate-700 to-slate-900 shadow-slate-800/30' },
];

interface SettingsOverlayProps {
  onClose: () => void;
  avatarId: string;
  setAvatarId: (id: string) => void;
  soundMuted: boolean;
  setSoundMuted: (muted: boolean) => void;
  userId?: string;
}

const SettingsOverlay: React.FC<SettingsOverlayProps> = ({ onClose, avatarId, setAvatarId, soundMuted, setSoundMuted, userId }) => {
  const { language, setLanguage, t } = useTranslation();
  
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyId = () => {
    if (userId) {
      navigator.clipboard.writeText(userId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sortedLangs = useMemo(() => {
    return [...SUPPORTED_LANGUAGES].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const handleToggleSound = () => {
    const nextMuted = !soundMuted;
    setSoundMuted(nextMuted);
    soundManager.setMuted(nextMuted);
    if (!nextMuted) {
      soundManager.play('click');
    }
  };

  const handleSelectAvatar = (id: string) => {
    setAvatarId(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('douze_points_avatar', id);
    }
    soundManager.play('click');
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 top-12 md:top-16 z-[500] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto overflow-x-hidden"
    >
      <div className="bg-[#0b0b18] border border-white/10 rounded-[2.5rem] p-6 md:p-8 max-w-xl w-full relative shadow-[0_0_50px_rgba(0,0,0,0.5)] border-t-pink-500/30 overflow-y-auto overflow-x-hidden max-h-[85vh] scrollbar-hide my-auto">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2 z-10 hover:bg-white/5 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div className="mb-6 md:mb-8 border-b border-white/5 pb-6">
          <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.4em] mb-1.5 block">Douze Points</span>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-tight">
            {t('settings.title')}
          </h2>
          {userId && (
            <div className="mt-2 flex items-center gap-2 flex-wrap min-w-0">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest shrink-0">{t('settings.userId')}:</span>
              <span className="text-[10px] font-mono text-slate-400 opacity-80 break-all min-w-0">{userId}</span>
              <button 
                onClick={handleCopyId}
                className="p-1 hover:bg-white/10 rounded transition-colors group cursor-copy shrink-0"
              >
                {copied ? (
                  <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                ) : (
                  <svg className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Section 1: Choose Avatar */}
        <div className="mb-6 md:mb-8 border-b border-white/5 pb-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            {t('settings.selectAvatar')}
          </h3>
          <div className="grid grid-cols-6 gap-1.5 md:gap-3">
            {AVATARS.map((av) => (
              <button
                key={av.id}
                onClick={() => handleSelectAvatar(av.id)}
                className={`aspect-square rounded-full flex items-center justify-center relative transition-all active:scale-95 ${
                  avatarId === av.id
                    ? 'ring-4 ring-pink-500 ring-offset-2 ring-offset-[#0b0b18] scale-105'
                    : 'hover:scale-105'
                }`}
              >
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br opacity-80 ${av.color}`}></div>
                <span className="text-2xl md:text-3xl relative z-10">{av.emoji}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Sound Settings */}
        <div className="mb-6 md:mb-8 border-b border-white/5 pb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
                {t('settings.soundEffects')}
              </h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed">
                {t('settings.soundEffectsDesc')}
              </p>
            </div>
            
            <button
              onClick={handleToggleSound}
              className={`w-20 h-10 rounded-full p-1 flex items-center justify-between transition-all duration-300 relative select-none shrink-0 ${
                !soundMuted 
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-500/25 border border-pink-400/30' 
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none text-[10px] font-black uppercase tracking-widest text-white/40">
                <span className={`transition-all duration-200 ${!soundMuted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>{t('settings.on')}</span>
                <span className={`transition-all duration-200 ${soundMuted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>{t('settings.off')}</span>
              </div>
              <div
                className={`w-8 h-8 rounded-full bg-white flex items-center justify-center transition-all duration-300 shadow-md relative z-10 ${
                  !soundMuted ? 'translate-x-10' : 'translate-x-0'
                }`}
              >
                {!soundMuted ? (
                  <span className="text-sm">🔊</span>
                ) : (
                  <span className="text-sm">🔇</span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Section 3: Select Language */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            {t('common.languages')}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {sortedLangs.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  soundManager.play('click');
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all active:scale-95 relative ${
                  language === lang.code 
                    ? 'bg-white border-white text-black shadow-xl' 
                    : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
                }`}
              >
                {isWindows ? (
                  <img 
                    src={`https://flagcdn.com/w80/${lang.flagCode}.png`}
                    alt={lang.name}
                    className="w-10 h-6 object-cover rounded shadow-sm mb-2"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-3xl mb-1" role="img" aria-label={lang.name}>{lang.flag}</span>
                )}
                <span className="font-black uppercase tracking-tighter text-[9px] text-center leading-none opacity-60">
                  {lang.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-full font-black uppercase text-[10px] tracking-widest transition-all shadow-lg"
        >
          {t('settings.saveAndClose')}
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
        {t('scorecard.signalLostDesc')}
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

const Dashboard: React.FC<{ stats: GlobalStats; onShareDaily: (games: GameInstance[]) => void; availablePacks: number }> = ({ stats, onShareDaily, availablePacks }) => {
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

  const bingoGame = useMemo(() => {
    const config = { id: 'eurobingo', storageKey: 'eurobingo', path: '/euro-bingo', title: t('bingo.title'), desc: t('bingo.subtitle'), type: GameType.BINGO_GAME, styles: {
      bg: "from-pink-600/20 to-purple-900/40 border-pink-500/30",
      text: "text-pink-200",
      glow: "bg-pink-500"
    }};
    const { done, points } = getDailyGameState(config, today);
    return { ...config, done, points };
  }, [t, today]);

  const isHypeWeek = useMemo(() => {
    const now = new Date();
    const sf1Start = new Date(EUROVISION_SCHEDULE[0].startTime);
    const finalEnd = new Date(EUROVISION_SCHEDULE[2].endTime);
    const finalEndPlusBuffer = new Date(finalEnd.getTime() + 6 * 60 * 60 * 1000); // 6 hours after
    const hypeWeekStart = new Date(sf1Start.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days before
    
    return now >= hypeWeekStart && now <= finalEndPlusBuffer;
  }, []);

  const games = useMemo(() => gameConfigs.map(config => {
    const { done, points } = getDailyGameState(config, today);

    // Map stats
    const statsMap: Record<string, number> = {
      eurosong: stats?.word_game?.perfectGames || 0,
      euroartist: stats?.artists?.perfectGames || 0,
      eurolinks: stats?.links?.perfectGames || 0,
      eurorefrain: stats?.refrain?.perfectGames || 0,
      euroguess: stats?.guesser?.perfectGames || 0,
      euroarena: stats?.arena?.perfectGames || 0,
      eurocards: availablePacks || 0
    };
    const stat = statsMap[config.id] || 0;

    return { ...config, stat, done, points };
  }), [stats, today, gameConfigs, availablePacks]);

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
      {/* EuroBingo Wide Card (Hype Week) */}
      {isHypeWeek && (
        <div className="px-2 md:px-6 mb-4 md:mb-6">
          <Link onClick={() => soundManager.play('click')} 
            to={bingoGame.path}
            className={`
              group relative flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-6 rounded-[1.25rem] md:rounded-[1.5rem] 
              bg-gradient-to-br ${bingoGame.styles.bg} border-2 border-pink-500/30 transition-all duration-300 
              hover:scale-[1.01] active:scale-95 shadow-lg overflow-hidden
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-500/20
            `}
          >
            <div className={`absolute -top-12 -right-12 w-48 h-48 ${bingoGame.styles.glow} rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-pink-500/20 text-pink-400 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-pink-500/30">
                  {t('common.liveCompanion')}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white leading-tight mb-1">
                {bingoGame.title}
              </h2>
              <p className={`${bingoGame.styles.text} text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-relaxed opacity-60 max-w-md`}>
                {bingoGame.desc}
              </p>
            </div>

            <div className="mt-4 md:mt-0 md:ml-8 relative z-10 flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 shrink-0">
              <div className="w-full sm:w-auto md:min-w-[140px]">
                <EurovisionCountdown />
              </div>
              <div className="w-full sm:w-auto px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white group-hover:bg-white/10 transition-colors text-center">
                {t('common.play')}
              </div>
            </div>
          </Link>
        </div>
      )}

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

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 px-2 md:px-6">
        {games.map((game) => (
          <Link onClick={() => soundManager.play('click')} 
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

      {/* EuroCollection Wide Card (Below Daily Games) */}
      <div className="mt-4 sm:mt-6 px-2 md:px-6">
        <Link onClick={() => soundManager.play('click')} 
          to="/euro-collection"
          state={{ tab: availablePacks > 0 ? 'packs' : 'gallery' }}
          className={`
            group relative flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-6 rounded-[1.25rem] md:rounded-[1.5rem] 
            bg-gradient-to-br from-indigo-600/20 to-indigo-900/40 border-2 border-indigo-500/30 transition-all duration-300 
            hover:scale-[1.01] active:scale-95 shadow-lg overflow-hidden
            focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20
          `}
        >
          <div className={`absolute -top-12 -right-12 w-48 h-48 bg-indigo-500 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity`}></div>
          
          <div className="relative z-10 flex-1">
            <h2 className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-white leading-tight mb-1">
              {t('eurocollection.title')}
            </h2>
            <p className="text-indigo-200 text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-relaxed opacity-60 max-w-md">
              {t('eurocollection.subtitle')}
            </p>
          </div>

          <div className="mt-4 md:mt-0 md:ml-8 relative z-10 flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 shrink-0">
            <div className="w-full sm:w-auto px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white group-hover:bg-white/10 transition-colors text-center relative flex items-center justify-center gap-2">
              <span>{availablePacks > 0 ? t('eurocollection.openPacks').toUpperCase() : t('eurocollection.viewGallery').toUpperCase()}</span>
              {availablePacks > 0 && (
                <span className="flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-pink-500 text-white text-[8px] font-black">{availablePacks}</span>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Infinite Mode Entrance (Encore) */}
      <div className="mt-4 sm:mt-6 px-2 md:px-6">
        <Link
          onClick={() => soundManager.play('click')}
          to="/infinite"
          id="encore-section"
          className="group relative flex items-center justify-between p-4 sm:p-6 rounded-[1.25rem] md:rounded-[1.5rem] bg-gradient-to-br from-amber-600/20 to-amber-900/40 border-2 border-amber-500/30 hover:scale-[1.01] active:scale-95 transition-all duration-300 shadow-lg overflow-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/20 w-full"
        >
          <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-1 block">
              {t('infinite.infiniteMode')}
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

      {/* EuroBingo Small Card (Off-season) */}
      {!isHypeWeek && (
        <div className="mt-4 sm:mt-6 px-2 md:px-6">
          <Link onClick={() => soundManager.play('click')} 
            to={bingoGame.path}
            className={`
              group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-[1.25rem] md:rounded-[1.5rem] 
              bg-gradient-to-br ${bingoGame.styles.bg} border-2 border-pink-500/30 transition-all duration-300 
              hover:scale-[1.01] active:scale-95 shadow-lg overflow-hidden
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-500/20
            `}
          >
            <div className={`absolute -top-12 -right-12 w-48 h-48 ${bingoGame.styles.glow} rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            
            <div className="relative z-10 flex-1 pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-pink-500/20 text-pink-400 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-pink-500/30">
                  {t('common.liveCompanion')}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white leading-tight mb-1">
                {bingoGame.title}
              </h2>
              <p className={`${bingoGame.styles.text} text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-relaxed opacity-60 max-w-md`}>
                {bingoGame.desc}
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0 mt-4 sm:mt-0">
              <div className="w-full sm:w-auto scale-90 origin-left sm:origin-right">
                <EurovisionCountdown />
              </div>
              <div className="w-full sm:w-auto px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white group-hover:bg-white/10 transition-colors text-center">
                {t('common.play')}
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Support Section */}
      {completedCount > 0 && (
        <div className="mt-4 sm:mt-6 px-2 md:px-6">
          <a
            href={BUY_ME_A_COFFEE_URL}
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
                {t('support.title')} <span className="opacity-70 hidden sm:inline">— {t('support.subtitle')}</span>
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
              href={REDDIT_URL}
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
              href={DISCORD_URL}
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
            {t('greenroom.howToPlayP3') && <p>{t('greenroom.howToPlayP3')}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { usePlaytimeTracker } from './hooks/usePlaytimeTracker.ts';

import { frozenConfettiValue } from './utils/confettiState';

const App: React.FC = () => {
  usePlaytimeTracker();
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const { t, language } = useTranslation();
  
  const [localFrozenConfetti, setLocalFrozenConfetti] = useState<number | null>(frozenConfettiValue);

  useEffect(() => {
    const handleFrozenConfettiChanged = () => {
      setLocalFrozenConfetti(frozenConfettiValue);
    };
    window.addEventListener('frozenConfettiChanged', handleFrozenConfettiChanged);
    return () => window.removeEventListener('frozenConfettiChanged', handleFrozenConfettiChanged);
  }, []);
  
  useEffect(() => {
    import('./utils/firebaseService.ts').then(m => m.reportDailyLanguage(language));
    setAnalyticsUserProperty({ preferred_language: language });
  }, [language]);

  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [avatarId, setAvatarId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('douze_points_avatar') || 'default';
    }
    return 'singer';
  });
  const [soundMuted, setSoundMuted] = useState(() => {
    return soundManager.getIsMuted();
  });
  const [showDailyShare, setShowDailyShare] = useState(false);
  const [dailyShareGames, setDailyShareGames] = useState<GameInstance[]>([]);
  const { user } = useAuth();
  const { stats, setStats, collectionData } = useUserData(user);
  const [rankUpData, setRankUpData] = useState<{ title: string; threshold: number } | null>(null);
  const lastGreenroomRankThresholdRef = useRef<number | null>(null);

  const isLobby = useMemo(() => {
    return location.pathname === '/' || location.pathname === '' || location.pathname.endsWith('index.html');
  }, [location.pathname]);

  useEffect(() => {
    if (stats?.totalPoints !== undefined) {
      const currentRank = getCurrentRank(stats.totalPoints);
      
      if (lastGreenroomRankThresholdRef.current === null) {
        lastGreenroomRankThresholdRef.current = currentRank.threshold;
        return;
      }

      if (isLobby && currentRank.threshold > lastGreenroomRankThresholdRef.current) {
        logAnalyticsEvent('level_up', {
          level: currentRank.threshold,
          character: currentRank.title
        });
        setRankUpData(currentRank);
        lastGreenroomRankThresholdRef.current = currentRank.threshold;
      }
    }
  }, [stats?.totalPoints, isLobby]);

  // Handle cross-page scrolling to Encore
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo === 'encore') {
      setTimeout(() => {
        const el = document.getElementById('encore-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            el.classList.add('ring-4', 'ring-amber-500', 'ring-offset-4', 'ring-offset-[#0b0b18]', 'scale-[1.02]', 'transition-all', 'duration-500');
            setTimeout(() => {
              el.classList.remove('ring-4', 'ring-amber-500', 'ring-offset-4', 'ring-offset-[#0b0b18]', 'scale-[1.02]');
            }, 2000);
          }, 600); // Wait for smooth scroll to finish before highlighting
        }
      }, 300); // Wait for page transition to finish before scrolling
      
      // Clear the state so it doesn't re-trigger on subsequent renders
      navigate('/', { replace: true, state: {} });
    }
  }, [location, navigate]);

  // SEO: Dynamic Page Titles and Descriptions based on Route
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': t('seo.home'),
      '/euro-song': t('seo.eurosong'),
      '/euro-artist': t('seo.euroartist'),
      '/euro-refrain': t('seo.eurorefrain'),
      '/euro-links': t('seo.eurolinks'),
      '/euro-guess': t('seo.euroguess'),
      '/euro-arena': t('seo.euroarena'),
      '/euro-bingo': t('seo.eurobingo'),
      '/infinite': t('seo.infinite'),
      '/infinite/euro-song': t('seo.eurosong'),
      '/infinite/euro-artist': t('seo.euroartist'),
      '/infinite/euro-guess': t('seo.euroguess'),
      '/infinite/euro-arena': t('seo.euroarena'),
      '/patch-notes': t('seo.patchNotes'),
      '/privacy': t('seo.privacy'),
      '/terms': t('seo.terms'),
      '/about': t('seo.about'),
      '/contact': t('seo.contact')
    };

    const keywords: Record<string, string> = {
      '/': 'Eurovision, ESC, Song Contest, Games, Trivia, Music Games, Fan Games, Douze Points, Wordle-style, Connections-like, EuroRefrain, daily puzzle, quiz, music challenge, bingo, EuroBingo',
      '/euro-song': 'EuroSong, Eurovision Wordle, ESC song guess, daily music puzzle',
      '/euro-artist': 'EuroArtist, Eurovision artist trivia, ESC singer guess, daily artist game',
      '/euro-refrain': 'EuroRefrain, Eurovision lyrics, ESC hook puzzle, daily lyric challenge',
      '/euro-links': 'EuroLinks, Eurovision connections, ESC categories, daily link puzzle',
      '/euro-guess': 'EuroGuess, Eurovision trivia, ESC mystery song, music quiz',
      '/euro-arena': 'EuroArena, Eurovision stats, ESC history battle, competitive trivia',
      '/euro-bingo': 'EuroBingo, Eurovision bingo, ESC live show, companion game, bingo card',
      '/infinite': 'Eurovision infinite mode, ESC endless games, Eurovision practice',
      '/patch-notes': 'Douze Points updates, Eurovision game changes, ESC game news'
    };

    // Generate a rich description using getActiveMasterData() for the home page
    const getRichDescription = () => {
      const activeData = getActiveMasterData();
      const goldenSongs = activeData.filter(s => s.tier === 'golden');
      const featured = goldenSongs.sort(() => 0.5 - Math.random()).slice(0, 3);
      const songList = featured.map(s => `${s.artist} ("${s.title}")`).join(', ');
      
      if (language === 'en') {
        return `Play Douze Points, the ultimate Eurovision fan hub. Daily challenges featuring classics like ${songList}, and the latest entries. Test your ESC knowledge!`;
      }
      return t('greenroom.description');
    };

    const descriptions: Record<string, string> = {
      '/': getRichDescription(),
      '/euro-song': t('games.eurosong.desc'),
      '/euro-artist': t('games.euroartist.desc'),
      '/euro-refrain': t('games.eurorefrain.desc'),
      '/euro-links': t('games.eurolinks.desc'),
      '/euro-guess': t('games.euroguess.desc'),
      '/euro-arena': t('games.euroarena.desc'),
      '/euro-bingo': t('bingo.subtitle'),
      '/infinite': t('infinite.description'),
      '/patch-notes': t('common.patchNotesDesc'),
      '/privacy': t('seo.privacy'),
      '/terms': t('seo.terms'),
      '/about': t('seo.about'),
      '/contact': t('seo.contact')
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

  }, [location.pathname, language, t]);

  useEffect(() => {
    const wasInGame = prevPathRef.current !== '/' && !prevPathRef.current.endsWith('index.html');
    if (wasInGame && isLobby) {
      const refreshedStats = getStoredStats();
      setStats(refreshedStats);
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname, isLobby, setStats]);

  const currentRank = useMemo(() => getCurrentRank(stats?.totalPoints || 0), [stats?.totalPoints]);
  const handleReturn = () => {
    soundManager.play('click');
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 1) {
      navigate('/' + pathParts.slice(0, -1).join('/'));
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[100dvh] relative flex flex-col">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[1000] focus:px-6 focus:py-3 focus:bg-pink-500 focus:text-white focus:font-black focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-500/50 uppercase text-xs tracking-widest"
      >
        Skip to content
      </a>
      <ScrollToTop />
      
      <header className="px-4 md:px-8 border-b border-white/10 backdrop-blur-md sticky top-0 z-[600] flex items-center justify-between bg-black/40 h-12 md:h-16 transition-all duration-300" role="banner">
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
           <Link onClick={() => soundManager.play('click')} to="/" className="text-sm md:text-xl font-black tracking-tighter uppercase italic pr-[0.2em] hover:opacity-80 transition-opacity whitespace-nowrap">
             <span className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Douze Points</span>
           </Link>
        </div>
        
        <div className="flex items-center gap-1.5 md:gap-3">
          {location.pathname !== '/euro-collection' ? (
            <button 
              onClick={() => { setStats(getStoredStats()); setShowStats(true); soundManager.play('click'); }} 
              className="flex items-center gap-1.5 px-2.5 md:px-4 py-1.5 md:py-2 hover:bg-white/10 rounded-full transition-all text-white bg-white/5 border border-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            >
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]"></div>
              <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                {t('greenroom.statsButton')}
              </span>
            </button>
          ) : (
            /* Confetti Display */
            collectionData && (
              <div 
                className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-pink-950/40 to-indigo-950/40 border border-pink-500/30 rounded-full shadow-lg shadow-pink-500/10 cursor-pointer transition-all hover:scale-105 hover:border-pink-500/50 hover:shadow-pink-500/20 active:scale-95 group animate-in fade-in zoom-in-95 duration-200"
                onClick={() => {
                  if (location.pathname !== '/euro-collection') {
                    navigate('/euro-collection', { state: { tab: (collectionData?.availablePacks || 0) > 0 ? 'packs' : 'gallery' } });
                  }
                }}
              >
                <PartyPopper className="w-4 h-4 md:w-5 md:h-5 text-pink-400 transform group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] md:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-300 tracking-widest">
                  {localFrozenConfetti !== null ? localFrozenConfetti : (collectionData.confetti || 0)}
                </span>
              </div>
            )
          )}

          {/* Profile Picture Settings Button */}
          <button 
            onClick={() => { setShowSettings(true); soundManager.play('click'); }}
            className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/15 hover:border-white/30 transition-all active:scale-95 relative group cursor-pointer shadow-lg overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            aria-label="Settings"
          >
            {(() => {
              const activeAv = AVATARS.find(a => a.id === avatarId) || AVATARS[0];
              return (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-90 group-hover:opacity-100 transition-opacity ${activeAv.color}`}></div>
                  <span className="text-base md:text-lg relative z-10 transform group-hover:scale-110 transition-transform duration-300">{activeAv.emoji}</span>
                </>
              );
            })()}
          </button>
        </div>
      </header>

      <ErrorBoundary>
        <main id="main-content" className="flex-1 w-full max-w-4xl mx-auto pb-4 px-2 md:px-4 page-fade" role="main">
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
            <Route path="/" element={<Dashboard stats={stats} availablePacks={collectionData?.availablePacks || 0} onShareDaily={(games) => { setDailyShareGames(games); setShowDailyShare(true); }} />} />
            <Route path="/euro-song" element={<EuroWordGame onReturn={handleReturn} data={getActiveMasterData()} gameType={GameType.WORD_GAME} gameId="eurosong" title={t('games.eurosong.title')} />} />
            <Route path="/euro-artist" element={<EuroWordGame onReturn={handleReturn} data={getActiveMasterData()} gameType={GameType.ARTIST_WORD_GAME} gameId="euroartist" title={t('games.euroartist.title')} />} />
            <Route path="/euro-refrain" element={<EuroRefrain onReturn={handleReturn} />} />
            <Route path="/euro-links" element={<EuroLinks onReturn={handleReturn} />} />
            <Route path="/euro-guess" element={<EuroGuess onReturn={handleReturn} data={getActiveMasterData()} />} />
            <Route path="/euro-arena" element={<EuroArena onReturn={handleReturn} data={getActiveMasterData()} />} />
            <Route path="/euro-bingo" element={<EuroBingo onReturn={handleReturn} />} />
            <Route path="/euro-collection" element={<EuroCollectionGame onReturn={handleReturn} />} />
            
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
      {showSettings && (
        <SettingsOverlay 
          onClose={() => setShowSettings(false)} 
          avatarId={avatarId}
          setAvatarId={setAvatarId}
          soundMuted={soundMuted}
          setSoundMuted={setSoundMuted}
          userId={user?.uid}
        />
      )}
      
      <footer className="pt-12 pb-24 text-center border-t border-white/5 px-6" role="contentinfo">
        <div className="flex flex-col items-center gap-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="font-black text-[10px] tracking-[0.5em] uppercase text-gray-500">{t('common.fanProject')}</p>
            <p className="text-[9px] font-bold text-gray-600 leading-relaxed uppercase tracking-widest px-4">
              {t('common.fanProjectDesc')}
            </p>
            <a 
              href={BUY_ME_A_COFFEE_URL} 
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
            <a href={REDDIT_URL} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#FF4500] transition-colors" aria-label="Reddit">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.04.21.06.427.06.646 0 2.834-3.334 5.132-7.447 5.132-4.113 0-7.447-2.298-7.447-5.132 0-.215.021-.435.06-.646-.621-.264-1.056-.881-1.056-1.597 0-.968.786-1.754 1.754-1.754.463 0 .89.182 1.207.491 1.207-.856 2.843-1.427 4.674-1.488l.8-3.747 2.597.547c-.012.068-.02.137-.02.208 0 .688.562 1.25 1.25 1.25zM8.507 11.2c-.792 0-1.434.642-1.434 1.434s.642 1.434 1.434 1.434c.792 0 1.434-.642 1.434-1.434s-.642-1.434-1.434-1.434zm6.986 0c-.792 0-1.434.642-1.434 1.434s.642 1.434 1.434 1.434c.792 0 1.434-.642 1.434-1.434s-.642-1.434-1.434-1.434zm-1.145 4.852a5.412 5.412 0 0 1-2.348.513 5.412 5.412 0 0 1-2.348-.513.437.437 0 0 1-.223-.574.437.437 0 0 1 .574-.223c.651.285 1.326.429 1.997.429s1.346-.144 1.997-.429a.437.437 0 0 1 .574.223.437.437 0 0 1-.223.574z"/>
              </svg>
            </a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#5865F2] transition-colors" aria-label="Discord">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.666 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[9px] font-black uppercase tracking-widest text-gray-500">
            <Link onClick={() => soundManager.play('click')} to="/patch-notes" className="hover:text-white transition-colors">{t('common.patchNotes')}</Link>
            <Link onClick={() => soundManager.play('click')} to="/privacy" className="hover:text-white transition-colors">{t('privacy.title')}</Link>
            <Link onClick={() => soundManager.play('click')} to="/about" className="hover:text-white transition-colors">{t('about.title')}</Link>
            <Link onClick={() => soundManager.play('click')} to="/contact" className="hover:text-white transition-colors">{t('contact.title')}</Link>
            <Link onClick={() => soundManager.play('click')} to="/terms" className="hover:text-white transition-colors">{t('terms.title')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;