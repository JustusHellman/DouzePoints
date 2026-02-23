import React, { useState } from 'react';
import { MasterSong } from '../data/types.ts';
import { useTranslation } from '../context/LanguageContext.tsx';
import { getDayString } from '../utils/daily.ts';
import { CountdownTimer } from './CountdownTimer.tsx';

interface GameScoreCardProps {
  won: boolean;
  points: number;
  pointsLabel: string;
  pointsColor: string;
  historyEmoji: string;
  gameTitle: string;
  song?: MasterSong;
  attempts: number;
  maxAttempts: number;
  onClose: () => void;
  onReturn: () => void;
  onShare?: () => void;
  extraInfo?: React.ReactNode;
}

const PerformanceLogRenderer: React.FC<{ 
  history: string; 
  title: string; 
  attempts: number; 
  maxAttempts: number; 
  won: boolean 
}> = ({ history, title, attempts, maxAttempts, won }) => {
  const { t } = useTranslation();
  const isArena = title.toLowerCase().includes('arena');
  const isGuess = title.toLowerCase().includes('guess');

  if (isArena) {
    const rows = history.trim().split('\n');
    const headers = ['Y', 'R', 'C', 'G', 'S', 'X']; 
    return (
      <div className="flex flex-col items-center gap-1.5 w-full max-w-[150px] mx-auto">
        <div className="grid grid-cols-6 gap-1.5 w-full border-b border-white/10 pb-1 px-1">
          {headers.map((h, i) => (
            <div key={i} className="text-[7px] font-black text-gray-500 text-center tracking-tighter uppercase">{h}</div>
          ))}
        </div>
        <div className="flex flex-col gap-1 w-full px-1">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-6 gap-1.5 items-center">
              {Array.from(row).map((emoji, j) => (
                <span key={j} className="text-[12px] sm:text-[13px] leading-none text-center filter drop-shadow-sm grayscale-[0.2]">{emoji}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isGuess) {
    return (
      <div className="flex flex-col items-center py-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {[...Array(6)].map((_, i) => {
            const stepNum = i + 1;
            const isTarget = stepNum === attempts && won;
            const isIncorrect = stepNum <= attempts && (!won || stepNum < attempts);
            
            return (
              <React.Fragment key={i}>
                <div className={`
                  w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 transition-all duration-700 relative
                  ${isTarget ? 'bg-green-500 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)] z-10 scale-110' : 
                    isIncorrect ? 'bg-red-500/20 border-red-500/40 opacity-80' : 
                    'bg-gray-950 border-white/5 opacity-40'}
                `}>
                  {isTarget && (
                    <>
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                      <span className="text-[8px] font-black text-black">✓</span>
                    </>
                  )}
                  {isIncorrect && <span className="text-[8px] font-black text-red-500/60">✕</span>}
                  {!isTarget && !isIncorrect && <span className="text-[6px] font-black text-gray-700">{stepNum}</span>}
                </div>
                {i < 5 && (
                  <div className={`h-[1px] w-2 sm:w-3 ${stepNum < attempts ? 'bg-red-500/20' : 'bg-white/5'}`}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <p className="mt-3 text-[6px] font-black text-gray-600 uppercase tracking-widest italic">
          {won ? `${t('scorecard.breakthrough')} ${attempts}` : t('scorecard.signalLost')}
        </p>
      </div>
    );
  }

  return (
    <div className="font-mono text-lg sm:text-xl tracking-[0.2em] whitespace-pre-line leading-tight text-center px-4">
      {history}
    </div>
  );
};

export const GameScoreCard: React.FC<GameScoreCardProps> = ({
  won,
  points,
  pointsLabel,
  pointsColor,
  historyEmoji,
  gameTitle,
  song,
  attempts,
  maxAttempts,
  onClose,
  onReturn,
  onShare,
  extraInfo
}) => {
  const { t } = useTranslation();
  const [showCopied, setShowCopied] = useState(false);

  const displayHistory = historyEmoji || [...Array(maxAttempts)].map((_, i) => (
    i < attempts ? (won && i === attempts - 1 ? '🟩' : '⬛') : '⬜'
  )).join(' ');

  const handleShare = () => {
    if (onShare) {
      onShare();
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
      return;
    }

    let headline = "";
    if (!won) headline = t('scorecard.headlines.nulPoints');
    else if (points === 12) headline = t('scorecard.headlines.douzePoints');
    else if (points >= 8) headline = t('scorecard.headlines.greatPerformance');
    else headline = t('scorecard.headlines.qualified');

    const shareText = `✨ DOUZE POINTS ✨\n${headline}\n\n${gameTitle} • ${getDayString()}\n${t('scorecard.score')}: ${points} ${t('common.pointsShort')} • ${attempts}/${maxAttempts} ${t('common.steps')}\n\n${displayHistory}\n\ndouzepoints.net`;
    
    navigator.clipboard.writeText(shareText).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const theme = (() => {
    if (points === 12) return {
      card: "shadow-[0_0_40px_rgba(251,191,36,0.1)] border-t-yellow-500/40",
      header: "from-yellow-500/10 via-yellow-600/5 to-transparent",
      badge: "bg-yellow-500 text-black"
    };
    if (points >= 8) return {
      card: "shadow-[0_0_40px_rgba(236,72,153,0.1)] border-t-pink-500/40",
      header: "from-pink-500/10 via-pink-600/5 to-transparent",
      badge: "bg-pink-500 text-white"
    };
    return {
      card: "shadow-[0_0_40px_rgba(59,130,246,0.1)] border-t-blue-500/40",
      header: "from-blue-500/10 via-blue-600/5 to-transparent",
      badge: "bg-blue-500 text-white"
    };
  })();

  // Simplified to always use search query for maximum reliability
  const getWatchUrl = (s: MasterSong) => {
    const query = encodeURIComponent(`Eurovision ${s.year} ${s.country} ${s.artist} ${s.title} Live`);
    return `https://www.youtube.com/results?search_query=${query}`;
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out py-1">
      <div className={`bg-[#0b0b18] border border-white/10 rounded-[2rem] w-full relative flex flex-col overflow-hidden ${theme.card}`}>
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2 z-[20] hover:bg-white/5 rounded-full"
          aria-label={t('common.close')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div className={`px-6 pt-6 pb-4 text-center border-b border-white/5 bg-gradient-to-b ${theme.header}`}>
          <div className="flex justify-center mb-1.5">
            <span className={`px-2 py-0.5 rounded-full text-[6px] font-black uppercase tracking-[0.2em] ${theme.badge}`}>
              {t('scorecard.performanceVerdict')}
            </span>
          </div>
          <h3 className={`text-3xl sm:text-4xl font-black italic uppercase tracking-tighter mb-0.5 ${pointsColor} leading-tight`}>
            {pointsLabel}
          </h3>
          <p className="text-[6px] font-black uppercase tracking-[0.4em] text-gray-500">
            {gameTitle} • {t('scorecard.dailyResult')}
          </p>
        </div>

        <div className="px-5 sm:px-8 py-5 space-y-5">
          {song && (
            <div className="bg-white/[0.02] p-5 rounded-3xl border border-white/5 relative z-10 overflow-hidden shadow-lg">
               <div className="flex flex-col gap-0.5 mb-3">
                 <p className="text-[5px] text-pink-500 font-black uppercase tracking-[0.4em]">{t('scorecard.revealedEntry')}</p>
                 <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                       <h4 className="text-lg sm:text-xl font-black text-white uppercase tracking-tighter leading-none">{song.title}</h4>
                       <p className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-tight">{song.artist}</p>
                    </div>
                    <a 
                      href={getWatchUrl(song)} 
                      target="_blank" rel="noopener noreferrer" 
                      className="bg-[#ff0000] px-2.5 py-1.5 rounded-lg text-[6px] font-black text-white transition-all hover:bg-[#cc0000] flex flex-col items-center gap-0.5 shadow-lg shadow-red-600/10"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                      {t('scorecard.watch')}
                    </a>
                 </div>
               </div>

               <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3 mb-3">
                  <div className="flex flex-col">
                    <span className="text-[5px] font-black text-gray-600 uppercase tracking-widest">{t('scorecard.origin')}</span>
                    <span className="text-[9px] font-black text-white uppercase truncate">{t(`metadata.countries.${song.country}`)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[5px] font-black text-gray-600 uppercase tracking-widest">{t('scorecard.year')}</span>
                    <span className="text-[9px] font-black text-white uppercase">{song.year}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[5px] font-black text-gray-600 uppercase tracking-widest">{t('scorecard.placing')}</span>
                    <span className="text-[9px] font-black text-yellow-500 uppercase flex items-center gap-1">
                      {song.placing === 1 ? '🏆' : '#'} {song.placing}
                    </span>
                  </div>
               </div>

               <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[5px] font-black text-gray-600 uppercase tracking-[0.3em] block mb-0.5">{t('scorecard.greenroomGossip')}</span>
                  <p className="text-[8.5px] font-bold text-gray-300 leading-tight italic">"{song.fact}"</p>
               </div>
            </div>
          )}

          <div className="text-center">
            <p className="text-[6px] text-gray-600 font-black uppercase tracking-[0.4em] mb-2">{t('scorecard.performanceLog')}</p>
            <div className="bg-black/40 p-3 rounded-2xl border border-white/10 inline-block mx-auto min-w-[160px] shadow-inner text-white mb-3">
              <PerformanceLogRenderer 
                history={displayHistory} 
                title={gameTitle} 
                attempts={attempts} 
                maxAttempts={maxAttempts} 
                won={won} 
              />
            </div>
            
            <button 
              onClick={handleShare} 
              className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/90 py-3 rounded-xl font-black uppercase text-[8px] tracking-[0.15em] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              {showCopied ? t('scorecard.resultsCopied') : t('scorecard.shareResult')}
            </button>
          </div>

          {extraInfo && (
             <div className="animate-in fade-in duration-700 pt-1">
                {extraInfo}
             </div>
          )}

          <div className="pt-4 border-t border-white/5 flex flex-col items-center gap-2">
             <CountdownTimer label={t('scorecard.nextGame')} />
          </div>
        </div>

        <div className="p-5 border-t border-white/5 bg-black/40 flex flex-col gap-2">
           <button 
             onClick={onReturn} 
             className="w-full bg-white text-black py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:scale-[1.01] active:scale-[0.98] transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2"
           >
             {t('common.returnToGreenroom')}
           </button>
           
           <button 
             onClick={onClose} 
             className="w-full bg-white/5 border border-white/10 text-white/50 py-3 rounded-full font-black uppercase text-[7px] tracking-[0.2em] hover:text-white transition-all"
           >
             {t('scorecard.reviewBoard')}
           </button>
        </div>
      </div>
    </div>
  );
};