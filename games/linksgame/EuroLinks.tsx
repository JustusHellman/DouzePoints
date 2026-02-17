
import React, { useState, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { getDailyIndex, getDayString } from '../../utils/daily.ts';
import { updateGameStats } from '../../utils/stats.ts';
import { GameType } from '../../data/types.ts';
import { PUZZLES } from '../../data/linksgameData.ts';
import { GameScoreCard } from '../../components/GameScoreCard.tsx';
import { useTranslation } from '../../context/LanguageContext.tsx';
import { HowToPlayModal } from '../../components/HowToPlayModal.tsx';

interface EuroLinksProps {
  onReturn: () => void;
}

const EuroLinks: React.FC<EuroLinksProps> = ({ onReturn }) => {
  const { t } = useTranslation();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Automated scroll nudge (Instant scroll)
  useLayoutEffect(() => {
    const timer = requestAnimationFrame(() => {
      window.scrollTo(0, 60);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const dailyData = useMemo(() => {
    const idx = getDailyIndex(PUZZLES, "linksgame");
    return PUZZLES[idx];
  }, []);

  const [displayItems, setDisplayItems] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [completedGroups, setCompletedGroups] = useState<any[]>([]);
  const [guessHistory, setGuessHistory] = useState<string[][]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const [showWrongFlash, setShowWrongFlash] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getItemDifficulty = useCallback((item: string) => {
    const group = dailyData.find(g => g.items.includes(item));
    return group ? group.difficulty : 'unknown';
  }, [dailyData]);

  useEffect(() => {
    const seenKey = 'hasSeenRules-linksgame';
    const hasSeen = localStorage.getItem(seenKey);
    if (!hasSeen) {
      setShowHowToPlay(true);
      localStorage.setItem(seenKey, 'true');
    }
  }, []);

  useEffect(() => {
    const all = dailyData.flatMap(g => g.items);
    setDisplayItems([...all].sort(() => Math.random() - 0.5));
  }, [dailyData]);

  const getPointsInfo = useMemo(() => {
    if (!won) return { points: 0, label: t('common.nulPoints'), color: "text-red-500" };
    const pointsMap = [12, 10, 8, 6, 4, 2];
    const pts = pointsMap[mistakes] || 2;
    
    if (pts === 12) return { points: 12, label: t('common.douzePoints'), color: "text-yellow-500" };
    
    const colorMap: Record<number, string> = {
      10: "text-pink-400",
      8: "text-purple-400",
      6: "text-blue-400",
      4: "text-cyan-400",
      2: "text-indigo-400"
    };

    return { 
      points: pts, 
      label: `${pts} ${t('common.points').toUpperCase()}!`, 
      color: colorMap[pts] || "text-gray-400" 
    };
  }, [won, mistakes, t]);

  useEffect(() => {
    const saved = localStorage.getItem(`linksgame-${getDayString()}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedGroups(data.completedGroups || []);
        setGuessHistory(data.guessHistory || []);
        setMistakes(data.mistakes || 0);
        setIsGameOver(!!data.isGameOver);
        setWon(!!data.won);
        if (!!data.isGameOver) setShowModal(true);
        
        if (data.completedGroups) {
          const completedItems = data.completedGroups.flatMap((g: any) => g.items);
          setDisplayItems(prev => prev.filter(item => !completedItems.includes(item)));
        }
      } catch (e) {
        console.error("Failed to load saved links state", e);
      }
    }
  }, []);

  useEffect(() => {
    if (completedGroups.length === 0 && mistakes === 0 && !isGameOver) return;
    localStorage.setItem(`linksgame-${getDayString()}`, JSON.stringify({ completedGroups, guessHistory, mistakes, isGameOver, won }));
    
    if (isGameOver) {
      updateGameStats(GameType.LINKS_GAME, won, { mistakes });
      if (won) {
        const pts = getPointsInfo.points;
        confetti({
          particleCount: pts === 12 ? 300 : 150,
          spread: pts === 12 ? 100 : 70,
          origin: { y: 0.6 },
          colors: pts === 12 ? ['#fbbf24', '#f59e0b', '#fff'] : ['#ec4899', '#a855f7', '#3b82f6']
        });
      }
    }
  }, [completedGroups, guessHistory, mistakes, isGameOver, won, getPointsInfo]);

  const handleSelect = (item: string) => {
    if (isGameOver || showWrongFlash) return;
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
    } else if (selected.length < 4) {
      setSelected([...selected, item]);
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 1200);
  };

  const shuffle = () => {
    setDisplayItems(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const submit = () => {
    if (selected.length !== 4) return;
    const attemptDiffs = selected.map(item => getItemDifficulty(item));
    setGuessHistory(prev => [...prev, attemptDiffs]);
    const foundGroup = dailyData.find(g => selected.every(item => g.items.includes(item)));

    if (foundGroup) {
      const newCompleted = [...completedGroups, foundGroup];
      setCompletedGroups(newCompleted);
      setDisplayItems(prev => prev.filter(item => !selected.includes(item)));
      setSelected([]);
      if (newCompleted.length === 4) {
        setWon(true);
        setIsGameOver(true);
        setShowModal(true);
      }
    } else {
      let oneAway = false;
      dailyData.forEach(g => {
        const matches = selected.filter(item => g.items.includes(item)).length;
        if (matches === 3) oneAway = true;
      });

      setShaking(true);
      setShowWrongFlash(true);

      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);

      if (oneAway && newMistakes < 6) {
        showMessage(t('links.oneAway'));
      }
      
      if (newMistakes >= 6) {
        setTimeout(() => {
           setIsGameOver(true); 
           setWon(false); 
           setShowModal(true);
        }, 1200);
      }

      setTimeout(() => {
        setShaking(false);
        setShowWrongFlash(false);
      }, 800);
    }
  };

  const getDiffColor = (diff: string) => {
    switch(diff) {
      case 'easy': return 'bg-yellow-500';
      case 'medium': return 'bg-green-500';
      case 'hard': return 'bg-blue-500';
      case 'expert': return 'bg-purple-600';
      default: return 'bg-gray-700';
    }
  };

  const historyEmoji = useMemo(() => {
    const diffToEmoji: Record<string, string> = { easy: '🟨', medium: '🟩', hard: '🟦', expert: '🟪' };
    return guessHistory.map(row => row.map(d => diffToEmoji[d] || '⬜').join('')).join('\n');
  }, [guessHistory]);

  const handleShare = () => {
    const shareText = `${won ? '🏆' : '❌'} EuroLinks • ${getDayString()}\n${t('scorecard.score')}: ${getPointsInfo.points} ${t('common.pointsShort')} • ${6 - mistakes} ${t('common.mistakesLeft').toLowerCase()}\n\n${historyEmoji}\n\ndouzepoints.net`;
    navigator.clipboard.writeText(shareText);
    alert(t('common.copied'));
  };

  const getTileStyles = (item: string) => {
    const clean = item.trim();
    const hasSpace = clean.includes(' ');
    const len = clean.length;
    
    if (!hasSpace) {
      let fontSize = "text-[11px] sm:text-[13px]";
      if (len >= 13) fontSize = "text-[6px] sm:text-[7.5px]"; 
      else if (len >= 11) fontSize = "text-[7px] sm:text-[8.5px]"; 
      else if (len >= 10) fontSize = "text-[8px] sm:text-[9.5px]"; 
      else if (len >= 8) fontSize = "text-[9px] sm:text-[11px]";
      
      return `${fontSize} whitespace-nowrap px-0.5`;
    } 
    
    let fontSize = "text-[10px] sm:text-[12px]";
    if (len > 18) fontSize = "text-[7.5px] sm:text-[9px]";
    else if (len > 14) fontSize = "text-[8.5px] sm:text-[10.5px]";
    return `${fontSize} whitespace-normal break-words px-1`;
  };

  const remainingAttempts = 6 - mistakes;

  return (
    <div className="flex flex-col items-center pt-4 pb-12 px-4 w-full max-w-xl mx-auto">
      {message && (
        <div className="fixed inset-0 md:absolute flex items-center justify-center pointer-events-none z-[600] p-4">
          <div className="bg-white/80 backdrop-blur-xl text-black font-black uppercase text-[14px] md:text-[18px] tracking-[0.2em] px-10 py-6 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-[3px] border-white/40 animate-fade-in-out max-w-[90vw] text-center">
            {message}
          </div>
        </div>
      )}

      {(!isGameOver || !showModal) && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent italic pr-[0.1em] uppercase tracking-tighter">EuroLinks</h2>
            <button 
              onClick={() => setShowHowToPlay(true)}
              className="w-6 h-6 rounded-full border border-white/20 text-[10px] flex items-center justify-center font-bold text-gray-500 hover:text-white hover:border-white transition-all active:scale-90"
              aria-label="How to play"
            >
              ?
            </button>
          </div>

          <HowToPlayModal 
            isOpen={showHowToPlay} 
            onClose={() => setShowHowToPlay(false)} 
            title="EuroLinks" 
            rules={t('games.eurolinks.rules')} 
          />
          
          <div className="mb-6 flex flex-col items-center gap-2">
             <div className="flex gap-1.5 h-6 items-center">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest mr-2">{t('links.mistakesRemaining')}</span>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full border border-white/20 transition-all duration-500 ${i < remainingAttempts ? 'bg-white shadow-[0_0_10px_white]' : 'bg-transparent scale-75 opacity-20'}`}></div>
                ))}
             </div>
          </div>

          <div className="relative w-full mb-6">
            <div className="grid grid-cols-4 gap-2 w-full">
              {completedGroups.map((g, idx) => (
                <div key={idx} className={`${getDiffColor(g.difficulty)} col-span-4 h-20 sm:h-24 flex flex-col items-center justify-center px-4 py-2 rounded-2xl text-center shadow-lg animate-in zoom-in-95 duration-500 overflow-hidden`}>
                  <p className="font-black text-[11px] sm:text-[16px] uppercase tracking-tighter text-black/60 leading-none mb-1 break-words line-clamp-1 w-full">{g.category}</p>
                  <p className="font-bold text-[9px] sm:text-[11px] text-white/95 leading-tight uppercase w-full max-w-full break-words overflow-hidden line-clamp-2 hyphens-none">
                    {g.items.join(", ")}
                  </p>
                </div>
              ))}
              {displayItems.map(item => {
                const isSelected = selected.includes(item);
                const isWrong = isSelected && showWrongFlash;
                return (
                  <button
                    key={item} onClick={() => handleSelect(item)}
                    className={`h-20 sm:h-24 flex flex-col items-center justify-center rounded-2xl font-black transition-all duration-200 border-2 uppercase tracking-tight overflow-hidden ${
                      isWrong 
                        ? 'bg-red-500/10 border-red-500/40 text-white scale-105 shadow-[0_0_20px_rgba(239,68,68,0.2)] z-10' 
                        : isSelected 
                          ? 'bg-gray-400 text-black border-white scale-95 shadow-inner' 
                          : 'bg-gray-900 border-white/5 text-white hover:border-white/20'
                    } ${isSelected && shaking ? 'animate-shake' : ''}`}
                  >
                    <span className={`text-center w-full leading-[1.05] break-normal hyphens-none ${getTileStyles(item)}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {!isGameOver && (
            <div className="flex flex-col items-center gap-6 w-full mt-4">
               <button 
                onClick={submit} disabled={selected.length !== 4 || showWrongFlash} 
                className={`w-full max-w-xs py-5 rounded-full font-black shadow-xl transition-all text-sm tracking-widest uppercase ${selected.length === 4 && !showWrongFlash ? 'bg-white text-black scale-105 active:scale-95' : 'bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'}`}
              >
                {t('common.submit')}
              </button>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={shuffle} className="border-2 border-white/10 px-6 py-3 rounded-full font-black hover:bg-white/5 text-[9px] tracking-widest uppercase transition-colors">{t('links.shuffle')}</button>
                <button onClick={() => setSelected([])} className="border-2 border-white/10 px-6 py-3 rounded-full font-black hover:bg-white/5 text-[9px] tracking-widest uppercase transition-colors">{t('links.deselectAll')}</button>
              </div>
            </div>
          )}
          
          {isGameOver && !showModal && (
            <div className="w-full flex justify-center mt-8">
               <button 
                 onClick={() => setShowModal(true)}
                 className="bg-white text-black px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest shadow-xl animate-bounce"
               >
                 {t('scorecard.viewScorecard')}
               </button>
            </div>
          )}
        </>
      )}

      {isGameOver && showModal && (
        <GameScoreCard 
          won={won} points={getPointsInfo.points} pointsLabel={getPointsInfo.label} pointsColor={getPointsInfo.color}
          historyEmoji={historyEmoji} gameTitle={t('games.eurolinks.title')} attempts={remainingAttempts} maxAttempts={6}
          onClose={() => setShowModal(false)} onReturn={onReturn} onShare={handleShare}
          extraInfo={
            <div className="space-y-4">
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] text-center mb-1">{t('links.categoriesDiscovered')}</p>
              {completedGroups.map((g, i) => (
                <div key={i} className={`flex flex-col gap-1 p-5 rounded-3xl border border-white/5 ${getDiffColor(g.difficulty)}/20 backdrop-blur-sm animate-in zoom-in-95 duration-500`}>
                   <div className="flex items-center gap-3">
                     <div className={`w-3 h-3 rounded-full ${getDiffColor(g.difficulty)} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}></div>
                     <span className="text-xs font-black uppercase tracking-tight text-white/90">{g.category}</span>
                   </div>
                   <span className="text-[10px] font-bold text-white/50 uppercase ml-6">{g.items.join(", ")}</span>
                </div>
              ))}
            </div>
          }
        />
      )}

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.9) translateY(10px); }
          15% { opacity: 1; transform: scale(1) translateY(0); }
          85% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.9) translateY(-10px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 1.2s ease-in-out forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        .hyphens-none {
          hyphens: none !important;
          -webkit-hyphens: none !important;
        }
      `}</style>
    </div>
  );
};

export default EuroLinks;
