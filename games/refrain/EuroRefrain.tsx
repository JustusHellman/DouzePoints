import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { getDayString } from '../../utils/daily.ts';
import { updateGameStats } from '../../utils/stats.ts';
import { GameType, LyricSnippet } from '../../data/types.ts';
import { getActiveRefrainData } from '../../data/activeData.ts';
import { GameScoreCard } from '../../components/GameScoreCard.tsx';
import { useTranslation } from '../../context/LanguageContext.tsx';
import { HowToPlayModal } from '../../components/HowToPlayModal.tsx';

interface Tile {
  id: string;
  text: string;
  groupIdx: number;
  difficulty: string;
}

interface CompletedGroup {
  category: string;
  items: string[];
  groupIdx: number;
  difficulty: string;
}

interface EuroRefrainProps {
  onReturn: () => void;
}

const EuroRefrain: React.FC<EuroRefrainProps> = ({ onReturn }) => {
  const { t } = useTranslation();
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: window.innerHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const tileStyle = useMemo(() => {
    if (dimensions.width === 0) return { minHeight: '60px' };
    
    const isMobile = window.innerWidth < 640;
    const reservedHeight = isMobile ? 300 : 420;
    const availableHeight = Math.max(240, dimensions.height - reservedHeight);
    const calculatedHeight = Math.floor(availableHeight / 4);
    
    const finalHeight = Math.min(isMobile ? 110 : 160, Math.max(isMobile ? 55 : 75, calculatedHeight));
    
    return {
      height: `${finalHeight}px`
    };
  }, [dimensions]);

  // Determinstic Board Generation from Seed
  const { boardGroups, allTiles } = useMemo(() => {
    let seed = 0;
    
    const seedStr = getDayString() + "eurorefrain-salt-v1";
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = (hash << 5) - hash + seedStr.charCodeAt(i);
      hash |= 0;
    }
    seed = Math.abs(hash);

    const refrainPool = getActiveRefrainData();
    const easyPool = refrainPool.filter(s => s.tier === 'easy');
    const mediumPool = refrainPool.filter(s => s.tier === 'medium');
    const hardPool = refrainPool.filter(s => s.tier === 'hard');
    const expertPool = refrainPool.filter(s => s.tier === 'expert');

    const selection: LyricSnippet[] = [];
    const usedWords = new Set<string>();
    const usedTitles = new Set<string>();

    const pickSnippet = (pool: LyricSnippet[], salt: number) => {
      let attempts = 0;
      while (attempts < pool.length) {
        const idx = (seed + salt + attempts) % pool.length;
        const candidate = pool[idx];
        const wordCollision = candidate.words.some(w => usedWords.has(w.toUpperCase()));
        const titleCollision = usedTitles.has(candidate.title);

        if (!wordCollision && !titleCollision) {
          candidate.words.forEach(w => usedWords.add(w.toUpperCase()));
          usedTitles.add(candidate.title);
          return candidate;
        }
        attempts++;
      }
      return pool[0];
    };

    selection.push(pickSnippet(easyPool, 1));
    selection.push(pickSnippet(mediumPool, 2));
    selection.push(pickSnippet(hardPool, 3));
    selection.push(pickSnippet(expertPool, 4));

    const groups = selection.map((s, idx) => ({
      category: `${s.title} (${s.artist})`,
      items: s.words.map(w => w.toUpperCase()),
      groupIdx: idx,
      difficulty: s.tier
    }));

    const tiles: Tile[] = groups.flatMap((g, gIdx) => 
      g.items.map((text, i) => ({
        id: `tile-${gIdx}-${i}`,
        text,
        groupIdx: gIdx,
        difficulty: g.difficulty
      }))
    );

    return { boardGroups: groups, allTiles: tiles };
  }, []);

  const [completedGroups, setCompletedGroups] = useState<CompletedGroup[]>(() => {
    const saved = localStorage.getItem(`eurorefrain-${getDayString()}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.completedGroups || [];
      } catch { return []; }
    }
    return [];
  });

  const [displayTiles, setDisplayTiles] = useState<Tile[]>(() => {
    const saved = localStorage.getItem(`eurorefrain-${getDayString()}`);
    const baseTiles = [...allTiles].sort(() => Math.random() - 0.5);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.completedGroups) {
          const completedGroupIndices = new Set(data.completedGroups.map((g: { groupIdx: number }) => g.groupIdx));
          return baseTiles.filter(tile => !completedGroupIndices.has(tile.groupIdx));
        }
      } catch { /* ignore */ }
    }
    return baseTiles;
  });

  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`eurorefrain-${getDayString()}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.selectedIds || [];
      } catch { return []; }
    }
    return [];
  });

  const [guessHistory, setGuessHistory] = useState<string[][]>(() => {
    const saved = localStorage.getItem(`eurorefrain-${getDayString()}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.guessHistory || [];
      } catch { return []; }
    }
    return [];
  });

  const [mistakes, setMistakes] = useState(() => {
    const saved = localStorage.getItem(`eurorefrain-${getDayString()}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.mistakes || 0;
      } catch { return 0; }
    }
    return 0;
  });

  const [isGameOver, setIsGameOver] = useState(() => {
    const saved = localStorage.getItem(`eurorefrain-${getDayString()}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.isGameOver || false;
      } catch { return false; }
    }
    return false;
  });

  const [won, setWon] = useState(() => {
    const saved = localStorage.getItem(`eurorefrain-${getDayString()}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.won || false;
      } catch { return false; }
    }
    return false;
  });

  const [message, setMessage] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const [showWrongFlash, setShowWrongFlash] = useState(false);
  const [showModal, setShowModal] = useState(() => {
    const saved = localStorage.getItem(`eurorefrain-${getDayString()}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.isGameOver || false;
      } catch { return false; }
    }
    return false;
  });

  // Initialize display tiles when allTiles changes
  // (Now handled by lazy initializers in useState)

  useEffect(() => {
    const seenKey = 'hasSeenRules-refrain';
    const hasSeen = localStorage.getItem(seenKey);
    if (!hasSeen) {
      setTimeout(() => setShowHowToPlay(true), 0);
      localStorage.setItem(seenKey, 'true');
    }
  }, []);

  const getPointsInfo = useMemo(() => {
    if (!won) return { points: 0, label: t('common.nulPoints'), color: "text-red-500" };
    const pointsMap = [12, 10, 8, 6, 4, 2];
    const pts = pointsMap[mistakes] || 2;
    return { 
      points: pts, 
      label: pts === 12 ? t('common.douzePoints') : `${pts} ${t('common.points').toUpperCase()}!`, 
      color: pts === 12 ? "text-yellow-500" : "text-pink-400" 
    };
  }, [won, mistakes, t]);

  // Daily state loading
  // (Now handled by lazy initializers in useState)

  // Daily state saving
  useEffect(() => {
    if (completedGroups.length === 0 && mistakes === 0 && selectedIds.length === 0 && !isGameOver) return;
    localStorage.setItem(`eurorefrain-${getDayString()}`, JSON.stringify({ completedGroups, guessHistory, mistakes, isGameOver, won, selectedIds }));
    if (isGameOver) {
      if (won) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [completedGroups, guessHistory, mistakes, isGameOver, won, selectedIds]);

  const handleSelect = (id: string) => {
    if (isGameOver || showWrongFlash) return;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const shuffle = () => {
    setDisplayTiles(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const revealRemainingGroups = useCallback(async () => {
    setIsGameOver(true);
    setSelectedIds([]);
    setMessage(t('links.betterLuck'));
    await new Promise(r => setTimeout(r, 1500));
    setMessage(null);
    
    const remaining = boardGroups.filter(g => !completedGroups.some(cg => cg.category === g.category));
    
    for (const group of remaining) {
      const groupTiles = allTiles.filter(t => t.groupIdx === group.groupIdx);
      for (const tile of groupTiles) {
        setSelectedIds(prev => [...prev, tile.id]);
        await new Promise(r => setTimeout(r, 250));
      }
      await new Promise(r => setTimeout(r, 300));
      setCompletedGroups(prev => [...prev, group]);
      setDisplayTiles(prev => prev.filter(tile => tile.groupIdx !== group.groupIdx));
      setSelectedIds([]);
      await new Promise(r => setTimeout(r, 500));
    }
    
    await new Promise(r => setTimeout(r, 1000));
    updateGameStats(GameType.REFRAIN_GAME, false, { mistakes: 6 });
    setShowModal(true);
  }, [boardGroups, completedGroups, allTiles, t]);

  const submit = useCallback(() => {
    if (selectedIds.length !== 4) return;
    const selectedTiles = selectedIds.map(id => allTiles.find(t => t.id === id)!);
    const attemptDiffs = selectedTiles.map(t => t.difficulty);
    setGuessHistory(prev => [...prev, attemptDiffs]);

    const firstGroupIdx = selectedTiles[0].groupIdx;
    const isCorrect = selectedTiles.every(t => t.groupIdx === firstGroupIdx);

    if (isCorrect) {
      const foundGroup = boardGroups[firstGroupIdx];
      const newCompleted = [...completedGroups, foundGroup];
      setCompletedGroups(newCompleted);
      setDisplayTiles(prev => prev.filter(tile => !selectedIds.includes(tile.id)));
      setSelectedIds([]);
      if (newCompleted.length === 4) { 
        setWon(true); 
        setIsGameOver(true); 
        
        updateGameStats(GameType.REFRAIN_GAME, true, { mistakes });
        
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        setShowModal(true); 
      }
    } else {
      let oneAway = false;
      boardGroups.forEach(bg => {
        const matches = selectedTiles.filter(t => t.groupIdx === bg.groupIdx).length;
        if (matches === 3) oneAway = true;
      });
      setShaking(true);
      setShowWrongFlash(true);
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (oneAway && newMistakes < 6) { setMessage(t('links.oneAway')); setTimeout(() => setMessage(null), 1200); }
      if (newMistakes >= 6) { 
        setIsGameOver(true);
        setWon(false);
        setTimeout(() => { 
          revealRemainingGroups();
        }, 800); 
      }
      setTimeout(() => { setShaking(false); setShowWrongFlash(false); }, 800);
    }
  }, [selectedIds, allTiles, boardGroups, completedGroups, mistakes, t, revealRemainingGroups]);

  const handleContinue = useCallback(() => {
    onReturn();
  }, [onReturn]);

  const handleTryAgain = useCallback(() => {
    // Not applicable for daily mode
  }, []);

  const getDiffColor = (diff: string) => {
    switch(diff) {
      case 'easy': return 'bg-yellow-500';
      case 'medium': return 'bg-blue-600';
      case 'hard': return 'bg-pink-500';
      case 'expert': return 'bg-purple-700';
      default: return 'bg-gray-700';
    }
  };

  const getDiffBg = (diff: string) => {
    switch(diff) {
      case 'easy': return 'bg-yellow-500/20';
      case 'medium': return 'bg-blue-600/20';
      case 'hard': return 'bg-pink-500/20';
      case 'expert': return 'bg-purple-700/20';
      default: return 'bg-gray-700/20';
    }
  };

  const historyEmoji = useMemo(() => {
    const diffToEmoji: Record<string, string> = { easy: '🟨', medium: '🟦', hard: '🟥', expert: '🟪' };
    return guessHistory.map(row => row.map(d => diffToEmoji[d] || '⬜').join('')).join('\n');
  }, [guessHistory]);

  const handleShare = useCallback(() => {
    const shareText = `${won ? '🏆' : '❌'} EuroRefrain • ${getDayString()}\n${t('scorecard.score')}: ${getPointsInfo.points} ${t('common.pointsShort')}\n\n${historyEmoji}\n\n${window.location.origin}/euro-refrain`;
    navigator.clipboard.writeText(shareText);
  }, [t, won, getPointsInfo.points, historyEmoji]);

  return (
    <div className="flex flex-col items-center pt-1 sm:pt-4 pb-24 md:pb-32 px-0.5 sm:px-4 w-full max-w-3xl mx-auto relative">
      {isGameOver && showModal ? (
        <GameScoreCard 
          won={won} points={getPointsInfo.points} pointsLabel={getPointsInfo.label} pointsColor={getPointsInfo.color}
          historyEmoji={historyEmoji} gameTitle="EuroRefrain" attempts={mistakes} maxAttempts={6}
          onClose={() => setShowModal(false)} onReturn={onReturn} onShare={handleShare} gameType={GameType.REFRAIN_GAME}
          onContinue={handleContinue} onTryAgain={handleTryAgain}
          extraInfo={
            <div className="space-y-4">
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] text-center mb-1">{t('links.lyricsDiscovered')}</p>
              {completedGroups.map((g, i) => (
                <div key={i} className={`flex flex-col gap-1 p-5 rounded-3xl border border-white/5 ${getDiffBg(g.difficulty)} backdrop-blur-sm animate-in zoom-in-95 duration-500`}>
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
      ) : (
        <>
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent italic pr-[0.1em] uppercase tracking-tighter">EuroRefrain</h1>
            <button 
              onClick={() => setShowHowToPlay(true)} 
              className="w-5 h-5 rounded-full border border-white/20 text-[9px] flex items-center justify-center font-bold text-gray-500 hover:text-white transition-all active:scale-90" 
              aria-label="How to play"
            >
              ?
            </button>
          </div>

          <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} title="EuroRefrain" rules={t('games.eurorefrain.rulesShort')} />
          
          <div className="mb-2 sm:mb-4 flex gap-1 h-5 items-center">
            <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest mr-2">{t('links.mistakesRemaining')}</span>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full border border-white/20 transition-all duration-500 ${i < (6 - mistakes) ? 'bg-white shadow-[0_0_8px_white]' : 'bg-transparent scale-75 opacity-20'}`}></div>
            ))}
          </div>



          <div ref={containerRef} className="grid grid-cols-4 gap-1 sm:gap-1.5 w-full mb-4 sm:mb-6">
            {completedGroups.map((g, idx) => (
              <div 
                key={idx} 
                style={tileStyle}
                className={`${getDiffColor(g.difficulty)} col-span-4 flex flex-col items-center justify-center px-3 py-1.5 rounded-xl text-center shadow-lg animate-in zoom-in-95 duration-500 overflow-hidden`}
              >
                <p className="font-black text-[9px] sm:text-[12px] uppercase tracking-tighter text-black/60 leading-none mb-1">{g.category}</p>
                <p className="font-bold text-[8px] sm:text-[11px] text-white/95 leading-tight uppercase line-clamp-3">{g.items.join(", ")}</p>
              </div>
            ))}
            {displayTiles.map(tile => {
              const isSelected = selectedIds.includes(tile.id);
              return (
                <button
                  key={tile.id} 
                  onClick={() => handleSelect(tile.id)}
                  style={tileStyle}
                  className={`flex flex-col items-center justify-center rounded-xl font-black transition-all duration-200 border-2 uppercase tracking-tight overflow-hidden ${
                    isSelected && showWrongFlash ? 'bg-red-500/10 border-red-500/40 text-white scale-105' : 
                    isSelected ? 'bg-indigo-500 text-white border-indigo-400 scale-95 shadow-inner' : 
                    'bg-gray-900 border-white/5 text-white hover:border-white/20'
                  } ${isSelected && shaking ? 'animate-shake' : ''}`}
                >
                  <span className={`text-center w-full px-1.5 leading-tight flex items-center justify-center break-words hyphens-auto ${
                    tile.text.length > 18 ? 'text-[7px] sm:text-[10px]' :
                    tile.text.length > 14 ? 'text-[8px] sm:text-[11px]' :
                    tile.text.length > 10 ? 'text-[9px] sm:text-[13px]' : 
                    tile.text.length > 7 ? 'text-[10px] sm:text-[15px]' :
                    'text-[11px] sm:text-[17px]'
                  }`}>
                    {tile.text}
                  </span>
                </button>
              );
            })}
          </div>

          {!isGameOver && (
            <div className="flex flex-col items-center gap-4 w-full relative">
              {message && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none z-[600] w-full flex justify-center px-4">
                  <div className="bg-white/95 backdrop-blur-xl text-black font-black uppercase text-[10px] md:text-[13px] tracking-[0.2em] px-5 py-2.5 rounded-xl shadow-2xl border-[2px] border-white/50 animate-fade-in-out text-center whitespace-nowrap">
                    {message}
                  </div>
                </div>
              )}
              <button 
                onClick={submit} disabled={selectedIds.length !== 4 || showWrongFlash} 
                className={`w-full max-w-xs py-4 rounded-full font-black shadow-xl transition-all text-xs tracking-widest uppercase ${selectedIds.length === 4 && !showWrongFlash ? 'bg-white text-black scale-105 active:scale-95' : 'bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'}`}
              >
                {t('common.submit')}
              </button>
              <div className="flex gap-2">
                <button onClick={shuffle} className="border border-white/10 px-4 py-2 rounded-full font-black hover:bg-white/5 text-[8px] tracking-widest uppercase transition-colors">{t('links.shuffle')}</button>
                <button onClick={() => setSelectedIds([])} className="border border-white/10 px-4 py-2 rounded-full font-black hover:bg-white/5 text-[8px] tracking-widest uppercase transition-colors">{t('links.deselectAll')}</button>
              </div>
            </div>
          )}
          
          {isGameOver && !showModal && (
            <button onClick={() => setShowModal(true)} className="w-full bg-white text-black py-5 rounded-full font-black uppercase text-xs tracking-widest shadow-xl animate-bounce">
              {t('scorecard.viewScorecard')}
            </button>
          )}

          {/* How to Play Section */}
          <div className="mt-16 pt-12 border-t border-white/5 w-full max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white mb-6 text-center">
              {t('common.howToPlay')}
            </h2>
            <div className="bg-white/5 rounded-2xl p-6 md:p-8">
              <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed whitespace-pre-wrap">
                {t('games.eurorefrain.rulesLong')}
              </p>
            </div>
          </div>
        </>
      )}
      <style>{`
        .animate-fade-in-out { animation: fade-in-out 1.2s ease-in-out forwards; }
        @keyframes fade-in-out { 0% { opacity: 0; transform: translateY(10px); } 15% { opacity: 1; transform: translateY(0); } 85% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } }
        .animate-shake { animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-5px); } 40% { transform: translateX(5px); } 60% { transform: translateX(-5px); } 80% { transform: translateX(5px); } }
      `}</style>
    </div>
  );
};

export default EuroRefrain;