import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext.tsx';
import { InfiniteDifficulty, InfinitePlacement, InfiniteYear, GameType } from '../data/types.ts';
import { getInfiniteRecords, getInfiniteGameState, serializeDifficulty, clearAllInfiniteData } from '../utils/infinite.ts';

import { reportSupportClick, reportInfiniteStart } from '../utils/firebaseService.ts';

interface InfiniteGameCardProps {
  id: string;
  title: string;
  difficulty: InfiniteDifficulty;
  styles: {
    bg: string;
    text: string;
    glow: string;
  };
  onPlay: (id: string) => void;
}

const InfiniteGameCard: React.FC<InfiniteGameCardProps> = ({ id, title, difficulty, styles, onPlay }) => {
  const { t } = useTranslation();
  const records = getInfiniteRecords();
  const gameState = getInfiniteGameState(id, difficulty);
  
  const diffKey = serializeDifficulty(difficulty);
  const best = records[`${id}_${diffKey}`] || { bestScore: 0, bestStreak: 0, mastered: false };
  const current = gameState;
  
  // Only add lastResult if we haven't advanced to the next index yet
  // (i.e., round is over but run hasn't continued)
  const isRoundOverButNotAdvanced = current && current.isGameOver && current.currentIndex < current.shuffledIds.length;
  const displayScore = current ? (current.currentScore + (isRoundOverButNotAdvanced ? (current.lastResult?.points || 0) : 0)) : 0;
  const displayStreak = current ? (current.currentStreak + (isRoundOverButNotAdvanced && current.lastResult?.won ? 1 : 0)) : 0;
  const isExhausted = best.mastered || (current && current.currentIndex >= current.shuffledIds.length);

  // Extract base color name from glow class (e.g., "bg-emerald-500" -> "emerald")
  const colorName = styles.glow.replace('bg-', '').split('-')[0];

  return (
    <button
      onClick={() => onPlay(id)}
      className={`
        group relative flex flex-col min-h-[120px] sm:min-h-[140px] md:min-h-[160px] p-3 sm:p-4 md:p-5 rounded-[1rem] md:rounded-[1.5rem] 
        bg-gradient-to-br ${styles.bg} border-2 transition-all duration-300 
        hover:scale-[1.02] active:scale-95 shadow-lg overflow-hidden text-left
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20
        ${isExhausted ? 'border-transparent' : 'border-white/5'} w-full
      `}
    >
      {isExhausted && (
        <div className="absolute inset-[-2px] rounded-[1rem] md:rounded-[1.5rem] overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square animate-[spin_8s_linear_infinite] opacity-40 blur-xl"
            style={{
              background: `conic-gradient(from 0deg, 
                var(--color-${colorName}-400), 
                var(--color-amber-400), 
                var(--color-${colorName}-600), 
                var(--color-pink-500), 
                var(--color-${colorName}-500), 
                var(--color-blue-500), 
                var(--color-${colorName}-400))`
            }}
          ></div>
          <div className={`absolute inset-[2px] rounded-[calc(1rem-2px)] md:rounded-[calc(1.5rem-2px)] bg-gradient-to-br ${styles.bg}`}></div>
        </div>
      )}
      <div className={`absolute -top-8 -right-8 w-24 h-24 md:w-32 md:h-32 ${styles.glow} rounded-full blur-[40px] md:blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity`}></div>
      
      <div className="mb-1.5 relative z-10 flex justify-between items-start">
         <h3 className="text-xs sm:text-sm md:text-lg font-black italic uppercase tracking-tighter leading-tight pr-2">
           {title}
         </h3>
         <div className="px-2 py-0.5 rounded-full border text-[7px] sm:text-[8px] font-black uppercase tracking-widest transition-all bg-white/5 border-white/10 text-white group-hover:bg-white/10 shrink-0">
           {t('common.play')}
         </div>
      </div>
      
      <div className="mt-auto relative z-10 pt-3 w-full flex flex-col gap-1.5">
        <div className="flex items-center justify-between bg-black/20 border border-white/5 rounded-lg px-2.5 py-1.5">
          <span className="text-[8px] sm:text-[9px] font-black text-white/50 uppercase tracking-widest">{t('infinite.score')}</span>
          <div className="flex items-baseline gap-3">
            <span className="text-sm sm:text-base font-black text-white">{displayScore}</span>
            <div className="flex items-baseline gap-1 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
              <span className="text-[7px] font-bold uppercase tracking-wider opacity-80">{t('infinite.best')}</span>
              <span className="text-xs sm:text-sm font-black">{best.bestScore}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-black/20 border border-white/5 rounded-lg px-2.5 py-1.5">
          <span className="text-[8px] sm:text-[9px] font-black text-white/50 uppercase tracking-widest">{t('infinite.streak')}</span>
          <div className="flex items-baseline gap-3">
            <span className="text-sm sm:text-base font-black text-white">{displayStreak}</span>
            <div className="flex items-baseline gap-1 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
              <span className="text-[7px] font-bold uppercase tracking-wider opacity-80">{t('infinite.best')}</span>
              <span className="text-xs sm:text-sm font-black">{best.bestStreak}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export const InfiniteArena: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [difficulty, setDifficulty] = useState<InfiniteDifficulty>(() => {
    const saved = localStorage.getItem('euro-infinite-settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Ignore errors
      }
    }
    return { placement: InfinitePlacement.TOP10, year: InfiniteYear.Y2000 };
  });

  const updateDifficulty = (updates: Partial<InfiniteDifficulty>) => {
    const newDiff = { ...difficulty, ...updates };
    setDifficulty(newDiff);
    localStorage.setItem('euro-infinite-settings', JSON.stringify(newDiff));
  };

  const placementOptions = useMemo(() => [
    { id: InfinitePlacement.ALL, label: t('infinite.placements.all') },
    { id: InfinitePlacement.WINNERS, label: t('infinite.placements.winners') },
    { id: InfinitePlacement.TOP3, label: t('infinite.placements.top3') },
    { id: InfinitePlacement.TOP5, label: t('infinite.placements.top5') },
    { id: InfinitePlacement.TOP10, label: t('infinite.placements.top10') },
    { id: InfinitePlacement.TOP15, label: t('infinite.placements.top15') },
    { id: InfinitePlacement.FINALISTS, label: t('infinite.placements.finalists') }
  ], [t]);

  const yearOptions = useMemo(() => [
    { id: InfiniteYear.ALL, label: t('infinite.years.all') },
    { id: InfiniteYear.Y2021, label: t('infinite.years.2021') },
    { id: InfiniteYear.Y2010, label: t('infinite.years.2010') },
    { id: InfiniteYear.Y2000, label: t('infinite.years.2000') },
    { id: InfiniteYear.Y1956, label: t('infinite.years.1956') }
  ], [t]);

  const gameConfigs = useMemo(() => [
    { id: 'eurosong', storageKey: 'eurosong', path: '/infinite/euro-song', title: t('games.eurosong.title'), type: GameType.WORD_GAME, styles: {
      bg: "from-purple-600/20 to-purple-900/40 border-purple-500/30",
      text: "text-purple-200",
      glow: "bg-purple-500"
    }},
    { id: 'euroartist', storageKey: 'euroartist', path: '/infinite/euro-artist', title: t('games.euroartist.title'), type: GameType.ARTIST_WORD_GAME, styles: {
      bg: "from-pink-600/20 to-pink-900/40 border-pink-500/30",
      text: "text-pink-200",
      glow: "bg-pink-500"
    }},
    { id: 'euroguess', storageKey: 'euroguess', path: '/infinite/euro-guess', title: t('games.euroguess.title'), type: GameType.GUESSER, styles: {
      bg: "from-cyan-600/20 to-cyan-900/40 border-cyan-500/30",
      text: "text-cyan-200",
      glow: "bg-cyan-500"
    }},
    { id: 'euroarena', storageKey: 'euroarena', path: '/infinite/euro-arena', title: t('games.euroarena.title'), type: GameType.ARENA, styles: {
      bg: "from-emerald-600/20 to-emerald-900/40 border-emerald-500/30",
      text: "text-emerald-200",
      glow: "bg-emerald-500"
    }}
  ], [t]);

  const handlePlay = (id: string) => {
    const config = gameConfigs.find(c => c.id === id);
    if (config) {
      reportInfiniteStart(id, serializeDifficulty(difficulty));
      navigate(config.path, { state: { difficulty } });
    }
  };

  const handleDevReset = () => {
    clearAllInfiniteData();
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 px-2 md:px-4 mt-4">
      {import.meta.env.MODE !== 'production' && (
        <div className="fixed bottom-4 right-4 z-[100]">
          <button 
            onClick={handleDevReset}
            className="bg-red-500/20 hover:bg-red-500/40 text-red-500 text-[8px] font-black uppercase tracking-widest px-3 py-2 rounded-full border border-red-500/30 transition-all"
          >
            DEV RESET INFINITE
          </button>
        </div>
      )}
      <section className="text-center pt-8 pb-10">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-4">
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] italic pr-[0.15em]">{t('infinite.infiniteMode')}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black italic pr-[0.1em] tracking-tighter mb-4 uppercase leading-none text-white drop-shadow-2xl">
          {t('infinite.title')}
        </h1>
        <p className="text-amber-200/60 text-xs md:text-sm max-w-2xl mx-auto font-medium tracking-tight opacity-70 leading-relaxed">
          {t('infinite.description')}
        </p>
      </section>

      {/* Difficulty Selectors */}
      <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">{t('infinite.placement')}</span>
          <select 
            value={difficulty.placement}
            onChange={(e) => updateDifficulty({ placement: e.target.value as InfinitePlacement })}
            className="w-full sm:w-48 bg-black/40 border-2 border-amber-500/20 text-amber-100 font-black uppercase text-[10px] tracking-widest px-4 py-3 rounded-2xl outline-none focus:border-amber-500/50 transition-all appearance-none text-center"
          >
            {placementOptions.map(opt => (
              <option key={opt.id} value={opt.id} className="bg-[#1a1a2e]">{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">{t('infinite.era')}</span>
          <select 
            value={difficulty.year}
            onChange={(e) => updateDifficulty({ year: e.target.value as InfiniteYear })}
            className="w-full sm:w-48 bg-black/40 border-2 border-amber-500/20 text-amber-100 font-black uppercase text-[10px] tracking-widest px-4 py-3 rounded-2xl outline-none focus:border-amber-500/50 transition-all appearance-none text-center"
          >
            {yearOptions.map(opt => (
              <option key={opt.id} value={opt.id} className="bg-[#1a1a2e]">{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        {gameConfigs.map((game) => (
          <InfiniteGameCard
            key={game.id}
            {...game}
            difficulty={difficulty}
            onPlay={handlePlay}
          />
        ))}
      </div>
      {/* Support Section */}
      <div className="mt-8">
        <a
          href="https://buymeacoffee.com/DouzePointsGame"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => reportSupportClick('Infinite_Arena')}
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
          <div className="text-[10px] font-bold uppercase tracking-widest transition-colors px-4 py-1.5 rounded-full sm:ml-4 whitespace-nowrap bg-[#FFDD00]/10 text-white group-hover:bg-[#FFDD00]/20">
            {t('support.button')}
          </div>
        </a>
      </div>

      {/* Socials Section */}
      <div className="mt-10">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">{t('common.joinCommunity')}</span>
          <div className="flex gap-4">
            <a
              href="https://www.reddit.com/r/DouzePointsGame"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#FF4500]/10 border border-[#FF4500]/20 hover:bg-[#FF4500]/20 transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#FF4500]">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.04.21.06.427.06.646 0 2.834-3.334 5.132-7.447 5.132-4.113 0-7.447-2.298-7.447-5.132 0-.215.021-.435.06-.646-.621-.264-1.056-.881-1.056-1.597 0-.968.786-1.754 1.754-1.754.463 0 .89.182 1.207.491 1.207-.856 2.843-1.427 4.674-1.488l.8-3.747 2.597.547c-.012.068-.02.137-.02.208 0 .688.562 1.25 1.25 1.25zM8.507 11.2c-.792 0-1.434.642-1.434 1.434s.642 1.434 1.434 1.434c.792 0 1.434-.642 1.434-1.434s-.642-1.434-1.434-1.434zm6.986 0c-.792 0-1.434.642-1.434 1.434s.642 1.434 1.434 1.434c.792 0 1.434-.642 1.434-1.434s-.642-1.434-1.434-1.434zm-1.145 4.852a5.412 5.412 0 0 1-2.348.513 5.412 5.412 0 0 1-2.348-.513.437.437 0 0 1-.223-.574.437.437 0 0 1 .574-.223c.651.285 1.326.429 1.997.429s1.346-.144 1.997-.429a.437.437 0 0 1 .574.223.437.437 0 0 1-.223.574z"/>
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-100/70 group-hover:text-white transition-colors">Reddit</span>
            </a>
            <a
              href="https://discord.gg/douzepoints"
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
    </div>
  );
};
