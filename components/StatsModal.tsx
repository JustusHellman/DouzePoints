import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameType, GlobalStats, DetailedStats } from '../data/types.ts';
import { getCurrentRank, getNextRank } from '../utils/stats.ts';
import { useTranslation } from '../context/LanguageContext.tsx';

interface StatsModalProps {
  stats: GlobalStats;
  onClose: () => void;
  onShowInfo: () => void;
  initialTab?: GameType | 'TOTAL';
}

const StatBox = ({ label, value, color = "white", icon }: any) => (
  <div className="bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col items-center group relative overflow-hidden transition-all hover:bg-white/10">
    <div className="flex items-baseline gap-1">
      <span className={`text-2xl font-black mb-1 text-${color}`}>{value}</span>
      {icon && <span>{icon}</span>}
    </div>
    <span className="text-[8px] text-gray-500 uppercase font-black tracking-widest">{label}</span>
  </div>
);

const PointsDistribution = ({ distribution }: { distribution: number[] }) => {
  const { t } = useTranslation();
  const max = Math.max(...distribution, 1);
  const labels = ["12 pts", "10 pts", "8 pts", "6 pts", "4 pts", "2 pts"];
  
  const colors = [
    "bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)]", 
    "bg-gradient-to-r from-pink-600 to-pink-400 shadow-[0_0_15px_rgba(219,39,119,0.2)]",   
    "bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.2)]", 
    "bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.2)]",   
    "bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(8,145,178,0.2)]",   
    "bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.2)]" 
  ];

  const textColors = [
    "text-yellow-500",
    "text-pink-400",
    "text-purple-400",
    "text-blue-400",
    "text-cyan-400",
    "text-indigo-400"
  ];
  
  return (
    <div className="mt-8 pt-6 border-t border-white/5">
      <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] mb-6 text-center">{t('stats.scoreHistory')}</p>
      <div className="space-y-3">
        {distribution.map((count, i) => (
          <div key={i} className="flex items-center gap-3 group">
            <span className={`text-[9px] font-black w-12 text-right transition-colors ${textColors[i]}`}>
              {labels[i]}
            </span>
            <div className="flex-1 bg-white/5 h-6 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className={`h-full transition-all duration-1000 ease-out flex items-center justify-end px-3 rounded-full ${colors[i]}`}
                style={{ width: `${Math.max((count / max) * 100, count > 0 ? 8 : 0)}%` }}
              >
                {count > 0 && <span className="text-[10px] font-black text-white">{count}</span>}
              </div>
              {count === 0 && <div className="absolute inset-0 flex items-center justify-center opacity-10"><span className="text-[8px] font-bold">0</span></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StatsModal: React.FC<StatsModalProps> = ({ stats, onClose, onShowInfo, initialTab = 'TOTAL' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<GameType | 'TOTAL'>(initialTab);
  const [showCopied, setShowCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const rankInfo = useMemo(() => {
    const current = getCurrentRank(stats.totalPoints);
    const next = getNextRank(stats.totalPoints);
    let progress = 100;
    if (next) {
      const range = next.threshold - current.threshold;
      const relativePoints = stats.totalPoints - current.threshold;
      progress = Math.min(100, (relativePoints / range) * 100);
    }
    return { current, next, progress };
  }, [stats.totalPoints]);

  const activeGameStats = useMemo(() => {
    if (activeTab === 'TOTAL') return null;
    let key: string;
    if (activeTab === GameType.WORD_GAME) key = 'word_game';
    else if (activeTab === GameType.ARTIST_WORD_GAME) key = 'artists';
    else if (activeTab === GameType.LINKS_GAME) key = 'links';
    else if (activeTab === GameType.REFRAIN_GAME) key = 'refrain';
    else if (activeTab === GameType.GUESSER) key = 'guesser';
    else key = 'arena';
    
    return (stats as any)[key] as DetailedStats;
  }, [activeTab, stats]);

  const handleShareStats = useCallback(() => {
    let text = "✨ DOUZE POINTS ✨\n";
    if (activeTab === 'TOTAL') {
      const wins = stats.word_game.wins + stats.artists.wins + stats.links.wins + stats.refrain.wins + stats.guesser.wins + stats.arena.wins;
      text += `Grand Final Record | Hall of Fame\n-------------------------\n`;
      text += `Rank: ${t(`ranks.${rankInfo.current.title}`)}\n`;
      text += `Total Points: ${stats.totalPoints}\n`;
      text += `Total Wins: ${wins}\n`;
      text += `Douze Points: ${stats.totalDouzePoints} 🏆\n\n`;
      text += `Come and join the jury at Douze Points!\ndouzepoints.net`;
    } else {
      const gameLabel = activeTab === GameType.WORD_GAME ? "Song" : 
                        activeTab === GameType.ARTIST_WORD_GAME ? "Artist" : 
                        activeTab === GameType.REFRAIN_GAME ? "Refrain" :
                        activeTab.replace('_GAME', '').charAt(0) + activeTab.replace('_GAME', '').slice(1).toLowerCase();
      
      const emoji = activeTab === GameType.WORD_GAME ? "🎵" : 
                    activeTab === GameType.ARTIST_WORD_GAME ? "🎤" : 
                    activeTab === GameType.REFRAIN_GAME ? "🎼" :
                    activeTab === GameType.LINKS_GAME ? "🔗" : 
                    activeTab === GameType.GUESSER ? "🔎" : "⚔️";

      const winRate = activeGameStats && activeGameStats.played > 0 
                      ? Math.round((activeGameStats.wins / activeGameStats.played) * 100) 
                      : 0;

      text += `${emoji} Euro${gameLabel} Career Stats\n-------------------------\n`;
      text += `Played: ${activeGameStats?.played} | Wins: ${activeGameStats?.wins}\n`;
      text += `Win Rate: ${winRate}%\n`;
      text += `Douze Points: ${activeGameStats?.perfectGames} 🏆\n`;
      text += `Best Streak: ${activeGameStats?.maxStreak} 🔥\n`;
      text += `Current Streak: ${activeGameStats?.currentStreak}\n\n`;
      text += `Rank: ${t(`ranks.${rankInfo.current.title}`)}\ndouzepoints.net`;
    }

    navigator.clipboard.writeText(text).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  }, [activeTab, rankInfo, stats, activeGameStats, t]);

  const handlePlayNow = () => {
    onClose();
    if (activeTab === 'TOTAL') {
      navigate('/');
    } else {
      const paths: Record<string, string> = {
        [GameType.WORD_GAME]: '/euro-song',
        [GameType.ARTIST_WORD_GAME]: '/euro-artist',
        [GameType.REFRAIN_GAME]: '/euro-refrain',
        [GameType.LINKS_GAME]: '/euro-links',
        [GameType.GUESSER]: '/euro-guess',
        [GameType.ARENA]: '/euro-arena'
      };
      navigate(paths[activeTab] || '/');
    }
  };

  const getCleanTabLabel = (tab: string) => {
    if (tab === 'TOTAL') return 'Hall of Fame';
    if (tab === GameType.WORD_GAME) return 'Song';
    if (tab === GameType.ARTIST_WORD_GAME) return 'Artist';
    if (tab === GameType.REFRAIN_GAME) return 'Refrain';
    return tab.replace('_GAME', '').charAt(0) + tab.replace('_GAME', '').slice(1).toLowerCase();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-2xl z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#0a0a1a] border border-white/10 rounded-[2.5rem] p-8 max-w-md md:max-w-4xl w-full relative shadow-3xl overflow-hidden border-t-purple-500/50 max-h-[90vh] overflow-y-auto scrollbar-hide transition-all">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2 z-10 hover:bg-white/5 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div className="flex flex-wrap items-center gap-2 mb-8 pr-12">
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight">
            {activeTab === 'TOTAL' ? t('stats.totalRecord') : t('stats.voterBreakdown')}
          </h2>
          <button 
            onClick={() => setShowHelp(!showHelp)} 
            className={`w-6 h-6 shrink-0 rounded-full border text-[10px] flex items-center justify-center font-bold transition-colors ${showHelp ? 'bg-white text-black border-white' : 'border-white/20 text-gray-500 hover:text-white hover:border-white'}`}
            title="Help"
          >
            ?
          </button>
        </div>

        {showHelp && (
          <div className="mb-8 p-6 bg-purple-500/10 border border-purple-500/20 rounded-3xl animate-in slide-in-from-top-4 duration-300">
            <h3 className="text-xs font-black uppercase tracking-widest text-purple-400 mb-3">{t('stats.howToWin')}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-white uppercase mb-1">{t('stats.earnPoints')}</p>
                <p className="text-[9px] text-gray-400 leading-relaxed uppercase font-bold tracking-tight">{t('stats.earnPointsDesc')}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-yellow-500 uppercase mb-1">{t('stats.claimDouze')}</p>
                <p className="text-[9px] text-gray-400 leading-relaxed uppercase font-bold tracking-tight">{t('stats.claimDouzeDesc')}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-1 bg-white/5 p-1 rounded-2xl mb-8 overflow-x-auto scrollbar-hide">
          {['TOTAL', GameType.WORD_GAME, GameType.ARTIST_WORD_GAME, GameType.REFRAIN_GAME, GameType.LINKS_GAME, GameType.GUESSER, GameType.ARENA].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-3 px-4 rounded-xl text-[10px] md:text-[12px] font-black uppercase tracking-tighter transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {getCleanTabLabel(tab)}
            </button>
          ))}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {activeTab === 'TOTAL' ? (
            <div className="space-y-8">
              <div className="text-center p-8 bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] border border-white/5">
                <span className="text-[11px] font-black text-pink-500 uppercase tracking-[0.3em] block mb-2">{t(`ranks.${rankInfo.current.title}`)}</span>
                <div className="relative h-2.5 w-full bg-white/5 rounded-full mb-3 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-1000" style={{ width: `${rankInfo.progress}%` }}></div>
                </div>
                {rankInfo.next && (
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{rankInfo.next.threshold - stats.totalPoints} {t('stats.pointsNeeded')} {t(`ranks.${rankInfo.next.title}`)}</p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatBox label="Rank Points" value={stats.totalPoints} />
                <StatBox label="Douze Points" value={stats.totalDouzePoints} color="yellow-500" icon="🏆" />
                <StatBox label={t('stats.wins')} value={stats.word_game.wins + stats.artists.wins + stats.links.wins + stats.refrain.wins + stats.guesser.wins + stats.arena.wins} color="green-400" />
                <StatBox label={t('stats.winRate')} value={(() => {
                  const total = stats.word_game.played + stats.artists.played + stats.links.played + stats.refrain.played + stats.guesser.played + stats.arena.played;
                  const wins = stats.word_game.wins + stats.artists.wins + stats.links.wins + stats.refrain.wins + stats.guesser.wins + stats.arena.wins;
                  return total > 0 ? Math.round((wins/total)*100)+'%' : '0%';
                })()} />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activeGameStats && (
                  <>
                    <StatBox label={t('stats.played')} value={activeGameStats.played} />
                    <StatBox label={t('stats.wins')} value={activeGameStats.wins} color="green-400" />
                    <StatBox label="Douze Points" value={activeGameStats.perfectGames} color="yellow-500" icon="🏆" />
                    <StatBox label={t('stats.streak')} value={activeGameStats.currentStreak} color="pink-400" />
                  </>
                )}
              </div>

              {activeGameStats && (
                <PointsDistribution distribution={activeGameStats.distribution} />
              )}
            </div>
          )}
        </div>

        <div className="mt-12 pb-28 flex flex-col md:flex-row gap-4">
            <button 
                onClick={handleShareStats}
                className="flex-1 bg-white/5 border border-white/10 text-white/70 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
            >
                {showCopied ? t('common.copied') : (activeTab === 'TOTAL' ? t('common.shareHallOfFame') : t('common.shareCareer'))}
            </button>
            <button 
                onClick={handlePlayNow}
                className="flex-1 bg-white text-black py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/10"
            >
                {t('stats.gotIt')}
            </button>
        </div>
      </div>
    </div>
  );
};