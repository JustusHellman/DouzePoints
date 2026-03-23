import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GameType } from '../data/types.ts';
import { useTranslation } from '../context/LanguageContext.tsx';

const BonusDashboard: React.FC = () => {
  const { t } = useTranslation();

  const gameConfigs = useMemo(() => [
    { id: 'eurosong', path: '/bonus/euro-song', title: t('games.eurosong.title'), desc: t('games.eurosong.desc'), type: GameType.WORD_GAME, styles: {
      bg: "from-purple-600/20 to-purple-900/40 border-purple-500/30",
      text: "text-purple-200",
      glow: "bg-purple-500"
    }},
    { id: 'euroartist', path: '/bonus/euro-artist', title: t('games.euroartist.title'), desc: t('games.euroartist.desc'), type: GameType.ARTIST_WORD_GAME, styles: {
      bg: "from-pink-600/20 to-pink-900/40 border-pink-500/30",
      text: "text-pink-200",
      glow: "bg-pink-500"
    }},
    { id: 'euroguess', path: '/bonus/euro-guess', title: t('games.euroguess.title'), desc: t('games.euroguess.desc'), type: GameType.GUESSER, styles: {
      bg: "from-cyan-600/20 to-cyan-900/40 border-cyan-500/30",
      text: "text-cyan-200",
      glow: "bg-cyan-500"
    }},
    { id: 'euroarena', path: '/bonus/euro-arena', title: t('games.euroarena.title'), desc: t('games.euroarena.desc'), type: GameType.ARENA, styles: {
      bg: "from-emerald-600/20 to-emerald-900/40 border-emerald-500/30",
      text: "text-emerald-200",
      glow: "bg-emerald-500"
    }}
  ], [t]);

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <section className="text-center pt-6 md:pt-12 pb-6 md:pb-8">
        <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full mb-3 md:mb-4">
          <span className="text-[9px] md:text-[11px] font-black text-pink-500 uppercase tracking-[0.2em] italic pr-[0.15em]">Bonus Round</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic pr-[0.1em] tracking-tighter mb-2 md:mb-4 uppercase leading-none text-white drop-shadow-2xl">The Vault</h1>
        <p className="text-gray-400 text-[9px] sm:text-xs md:text-sm max-w-2xl mx-auto font-medium tracking-tight opacity-70 px-4 leading-relaxed">
          Welcome to the Bonus Round. These entries are deeper cuts from the Eurovision archives. 
          Play for fun and discover hidden gems. Bonus games do not affect your daily rank.
        </p>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 px-2 md:px-6">
        {gameConfigs.map((game) => (
          <Link 
            key={game.path}
            to={game.path}
            className={`
              group relative flex flex-col min-h-[120px] sm:min-h-[140px] md:min-h-[160px] p-3 sm:p-4 md:p-5 rounded-[1rem] md:rounded-[1.5rem] 
              bg-gradient-to-br ${game.styles.bg} border-2 border-white/5 transition-all duration-300 
              hover:scale-[1.02] active:scale-95 shadow-lg overflow-hidden
            `}
          >
            <div className={`absolute -top-8 -right-8 w-24 h-24 md:w-32 md:h-32 ${game.styles.glow} rounded-full blur-[40px] md:blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            
            <div className="mb-1.5 relative z-10">
               <h3 className="text-xs sm:text-sm md:text-lg font-black italic uppercase tracking-tighter leading-tight pr-2">
                 {game.title}
               </h3>
            </div>
            
            <p className={`${game.styles.text} text-[7px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-widest leading-relaxed mb-4 opacity-60 relative z-10 flex-1`}>
              {game.desc}
            </p>
            
            <div className="mt-auto flex items-center justify-between relative z-10 pt-1.5 border-t border-white/5">
              <div className="px-2 py-0.5 rounded-full border bg-white/5 border-white/10 text-white text-[7px] sm:text-[8px] font-black uppercase tracking-widest group-hover:bg-white/10">
                {t('common.play')}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 px-2 md:px-6 text-center">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Greenroom
        </Link>
      </div>
    </div>
  );
};

export default BonusDashboard;
