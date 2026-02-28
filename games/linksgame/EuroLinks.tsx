import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { getDailyIndex, getDayString } from '../../utils/daily.ts';
import { updateGameStats } from '../../utils/stats.ts';
import { GameType, ConnectionsGroup } from '../../data/types.ts';
import { PUZZLES } from '../../data/linksgameData.ts';
import { GameScoreCard } from '../../components/GameScoreCard.tsx';
import { useTranslation } from '../../context/LanguageContext.tsx';
import { HowToPlayModal } from '../../components/HowToPlayModal.tsx';

interface Tile {
  id: string;
  text: string;
  category: string;
  difficulty: string;
}

interface EuroLinksProps {
  onReturn: () => void;
}

const EuroLinks: React.FC<EuroLinksProps> = ({ onReturn }) => {
  const { t } = useTranslation();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const dailyData = useMemo(() => {
    const idx = getDailyIndex(PUZZLES, "eurolinks");
    return PUZZLES[idx];
  }, []);

  // Create unique tile objects for the entire board
  const allTiles = useMemo(() => {
    return dailyData.flatMap((group, gIdx) => 
      group.items.map((item, iIdx) => ({
        id: `tile-${gIdx}-${iIdx}`,
        text: item,
        category: group.category,
        difficulty: group.difficulty
      }))
    );
  }, [dailyData]);

  const [displayTiles, setDisplayTiles] = useState<Tile[]>(() => [...allTiles].sort(() => Math.random() - 0.5));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [completedGroups, setCompletedGroups] = useState<ConnectionsGroup[]>([]);
  const [guessHistory, setGuessHistory] = useState<string[][]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const [showWrongFlash, setShowWrongFlash] = useState(false);
  const [showModal, setShowModal] = useState(false);

  /*
  useLayoutEffect(() => {
    if (isGameOver) return;
    const timer = requestAnimationFrame(() => {
      window.scrollTo(0, 60);
    });
    return () => cancelAnimationFrame(timer);
  }, [isGameOver]);
  */

  useEffect(() => {
    const seenKey = 'hasSeenRules-eurolinks';
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

  useEffect(() => {
    const saved = localStorage.getItem(`eurolinks-${getDayString()}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setTimeout(() => {
          if (data.completedGroups) setCompletedGroups(data.completedGroups);
          if (data.guessHistory) setGuessHistory(data.guessHistory);
          if (data.mistakes !== undefined) setMistakes(data.mistakes);
          if (data.isGameOver !== undefined) setIsGameOver(Boolean(data.isGameOver));
          if (data.won !== undefined) setWon(Boolean(data.won));
          if (data.isGameOver) setShowModal(true);
          
          if (data.completedGroups) {
            const completedCategories = data.completedGroups.map((g: { category: string }) => g.category);
            setDisplayTiles(prev => prev.filter(tile => !completedCategories.includes(tile.category)));
          }
        }, 0);
      } catch (err) {
        console.error("Failed to load saved links state", err);
      }
    }
  }, []);

  useEffect(() => {
    if (completedGroups.length === 0 && mistakes === 0 && !isGameOver) return;
    localStorage.setItem(`eurolinks-${getDayString()}`, JSON.stringify({ completedGroups, guessHistory, mistakes, isGameOver, won }));
    if (isGameOver) {
      updateGameStats(GameType.LINKS_GAME, won, { mistakes });
      if (won) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [completedGroups, guessHistory, mistakes, isGameOver, won]);

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
    
    // Get groups that haven't been found yet
    const remaining = dailyData.filter(g => !completedGroups.some(cg => cg.category === g.category));
    
    for (const group of remaining) {
      // Find the tiles for this group that are still on the board
      const groupTiles = allTiles.filter(t => t.category === group.category);
      
      // Select them one by one
      for (const tile of groupTiles) {
        setSelectedIds(prev => [...prev, tile.id]);
        await new Promise(r => setTimeout(r, 250));
      }
      
      // Short pause before collapsing
      await new Promise(r => setTimeout(r, 300));
      
      // Collapse into category
      setCompletedGroups(prev => [...prev, group]);
      setDisplayTiles(prev => prev.filter(tile => tile.category !== group.category));
      setSelectedIds([]);
      
      // Pause before next group
      await new Promise(r => setTimeout(r, 500));
    }
    
    // Final wait before scorecard
    await new Promise(r => setTimeout(r, 1000));
    setShowModal(true);
  }, [dailyData, completedGroups, allTiles, t, setIsGameOver, setSelectedIds, setCompletedGroups, setDisplayTiles, setShowModal]);

  const submit = () => {
    if (selectedIds.length !== 4) return;
    
    const selectedTiles = selectedIds.map(id => allTiles.find(t => t.id === id)!);
    const attemptDiffs = selectedTiles.map(t => t.difficulty);
    setGuessHistory(prev => [...prev, attemptDiffs]);

    // Check if all selected tiles belong to the same category
    const firstCategory = selectedTiles[0].category;
    const isCorrect = selectedTiles.every(t => t.category === firstCategory);

    if (isCorrect) {
      const foundGroup = dailyData.find(g => g.category === firstCategory);
      if (foundGroup) {
        const newCompleted = [...completedGroups, foundGroup];
        setCompletedGroups(newCompleted);
        setDisplayTiles(prev => prev.filter(tile => !selectedIds.includes(tile.id)));
        setSelectedIds([]);
        if (newCompleted.length === 4) { 
          setWon(true); 
          setIsGameOver(true); 
          setShowModal(true); 
        }
      }
    } else {
      // One away logic: check if any group has 3 matches in the selection
      let oneAway = false;
      dailyData.forEach(group => {
        const matches = selectedTiles.filter(t => t.category === group.category).length;
        if (matches === 3) oneAway = true;
      });

      setShaking(true);
      setShowWrongFlash(true);
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      
      if (oneAway && newMistakes < 6) { 
        setMessage(t('links.oneAway')); 
        setTimeout(() => setMessage(null), 1200); 
      }
      
      if (newMistakes >= 6) { 
        setIsGameOver(true);
        setWon(false);
        setTimeout(() => { 
          revealRemainingGroups();
        }, 800); 
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
      case 'medium': return 'bg-blue-600';
      case 'hard': return 'bg-pink-600';
      case 'expert': return 'bg-purple-700';
      default: return 'bg-gray-700';
    }
  };

  const historyEmoji = useMemo(() => {
    const diffToEmoji: Record<string, string> = { easy: '🟨', medium: '🟦', hard: '🟥', expert: '🟪' };
    return guessHistory.map(row => row.map(d => diffToEmoji[d] || '⬜').join('')).join('\n');
  }, [guessHistory]);

  const handleShare = () => {
    const shareText = `${won ? '🏆' : '❌'} EuroLinks • ${getDayString()}\n${t('scorecard.score')}: ${getPointsInfo.points} ${t('common.pointsShort')}\n\n${historyEmoji}\n\nhttps://www.douzepoints.net/euro-links`;
    navigator.clipboard.writeText(shareText);
  };

  return (
    <div className="flex flex-col items-center pt-4 pb-12 px-1 sm:px-4 w-full max-w-lg mx-auto">
      {message && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[600] p-4">
          <div className="bg-white/80 backdrop-blur-xl text-black font-black uppercase text-[12px] md:text-[16px] tracking-[0.2em] px-5 py-2.5 rounded-xl shadow-3xl border-[2px] border-white/40 animate-fade-in-out text-center">
            {message}
          </div>
        </div>
      )}

      {(!isGameOver || !showModal) && (
        <>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent italic pr-[0.1em] uppercase tracking-tighter">EuroLinks</h1>
            <button 
              onClick={() => setShowHowToPlay(true)} 
              className="w-5 h-5 rounded-full border border-white/20 text-[9px] flex items-center justify-center font-bold text-gray-500 hover:text-white transition-all active:scale-90" 
              aria-label="How to play"
            >
              ?
            </button>
          </div>

          <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} title="EuroLinks" rules={t('games.eurolinks.rulesShort')} />
          
          <div className="mb-4 flex gap-1 h-5 items-center">
            <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest mr-2">{t('links.mistakesRemaining')}</span>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full border border-white/20 transition-all duration-500 ${i < (6 - mistakes) ? 'bg-white shadow-[0_0_8px_white]' : 'bg-transparent scale-75 opacity-20'}`}></div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-1 sm:gap-1.5 w-full mb-6">
            {completedGroups.map((g, idx) => (
              <div key={idx} className={`${getDiffColor(g.difficulty)} col-span-4 min-h-[50px] flex flex-col items-center justify-center px-3 py-1.5 rounded-xl text-center shadow-lg animate-in zoom-in-95 duration-500 overflow-hidden`}>
                <p className="font-black text-[9px] sm:text-[12px] uppercase tracking-tighter text-black/60 leading-none mb-0.5">{g.category}</p>
                <p className="font-bold text-[8px] sm:text-[10px] text-white/95 leading-tight uppercase line-clamp-2">{g.items.join(", ")}</p>
              </div>
            ))}
            {displayTiles.map(tile => {
              const isSelected = selectedIds.includes(tile.id);
              return (
                <button
                  key={tile.id} onClick={() => handleSelect(tile.id)}
                  className={`min-h-[50px] sm:min-h-[70px] flex flex-col items-center justify-center rounded-xl font-black transition-all duration-200 border-2 uppercase tracking-tight overflow-hidden ${
                    isSelected && showWrongFlash ? 'bg-red-500/10 border-red-500/40 text-white scale-105' : 
                    isSelected ? 'bg-gray-400 text-black border-white scale-95 shadow-inner' : 
                    'bg-gray-900 border-white/5 text-white hover:border-white/20'
                  } ${isSelected && shaking ? 'animate-shake' : ''}`}
                >
                  <span className={`text-center w-full px-1 leading-tight flex items-center justify-center break-words hyphens-auto ${
                    tile.text.length > 18 ? 'text-[6px] sm:text-[8px]' :
                    tile.text.length > 14 ? 'text-[7px] sm:text-[9px]' :
                    tile.text.length > 10 ? 'text-[8px] sm:text-[11px]' : 
                    tile.text.length > 7 ? 'text-[9px] sm:text-[12px]' :
                    'text-[10px] sm:text-[14px]'
                  }`}>
                    {tile.text}
                  </span>
                </button>
              );
            })}
          </div>

          {!isGameOver && (
            <div className="flex flex-col items-center gap-4 w-full">
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
        </>
      )}

      {/* How to Play Section */}
      <div className="mt-16 pt-12 border-t border-white/5 w-full max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white mb-6 text-center">
          {t('common.howToPlay')}
        </h2>
        <div className="bg-white/5 rounded-2xl p-6 md:p-8">
          <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed whitespace-pre-wrap">
            {t('games.eurolinks.rulesLong')}
          </p>
        </div>
      </div>

      {isGameOver && showModal && (
        <GameScoreCard 
          won={won} points={getPointsInfo.points} pointsLabel={getPointsInfo.label} pointsColor={getPointsInfo.color}
          historyEmoji={historyEmoji} gameTitle="EuroLinks" attempts={mistakes} maxAttempts={6}
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
        .animate-fade-in-out { animation: fade-in-out 1.2s ease-in-out forwards; }
        @keyframes fade-in-out { 0% { opacity: 0; transform: translateY(10px); } 15% { opacity: 1; transform: translateY(0); } 85% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } }
        .animate-shake { animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-5px); } 40% { transform: translateX(5px); } 60% { transform: translateX(-5px); } 80% { transform: translateX(5px); } }
      `}</style>
    </div>
  );
};

export default EuroLinks;