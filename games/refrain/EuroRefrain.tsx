import React, { useState, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { getDayString } from '../../utils/daily.ts';
import { updateGameStats } from '../../utils/stats.ts';
import { GameType, LyricSnippet } from '../../data/types.ts';
import { REFRAIN_POOL } from '../../data/refrainData.ts';
import { GameScoreCard } from '../../components/GameScoreCard.tsx';
import { useTranslation } from '../../context/LanguageContext.tsx';
import { HowToPlayModal } from '../../components/HowToPlayModal.tsx';

interface Tile {
  id: string;
  text: string;
  difficulty: string;
}

interface CompletedGroup {
  category: string;
  items: string[];
  difficulty: string;
}

interface EuroRefrainProps {
  onReturn: () => void;
}

const EuroRefrain: React.FC<EuroRefrainProps> = ({ onReturn }) => {
  const { t } = useTranslation();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Instant scroll on mount
  useLayoutEffect(() => {
    const timer = requestAnimationFrame(() => {
      window.scrollTo(0, 60);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // Determinstic Board Generation from Seed
  const { boardGroups, allTiles } = useMemo(() => {
    const seedStr = getDayString() + "eurorefrain-salt-v1";
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = (hash << 5) - hash + seedStr.charCodeAt(i);
      hash |= 0;
    }
    const seed = Math.abs(hash);

    const easyPool = REFRAIN_POOL.filter(s => s.tier === 'easy');
    const mediumPool = REFRAIN_POOL.filter(s => s.tier === 'medium');
    const hardPool = REFRAIN_POOL.filter(s => s.tier === 'hard');
    const expertPool = REFRAIN_POOL.filter(s => s.tier === 'expert');

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

    const groups = selection.map(s => ({
      category: `${s.title} (${s.artist})`,
      items: s.words.map(w => w.toUpperCase()),
      difficulty: s.tier
    }));

    const tiles: Tile[] = groups.flatMap((g, gIdx) => 
      g.items.map((text, i) => ({
        id: `tile-${gIdx}-${i}`,
        text,
        difficulty: g.difficulty
      }))
    );

    return { boardGroups: groups, allTiles: tiles };
  }, []);

  const [displayTiles, setDisplayTiles] = useState<Tile[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [completedGroups, setCompletedGroups] = useState<CompletedGroup[]>([]);
  const [guessHistory, setGuessHistory] = useState<string[][]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const [showWrongFlash, setShowWrongFlash] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const seenKey = 'hasSeenRules-refrain';
    const hasSeen = localStorage.getItem(seenKey);
    if (!hasSeen) {
      setShowHowToPlay(true);
      localStorage.setItem(seenKey, 'true');
    }
  }, []);

  useEffect(() => {
    setDisplayTiles([...allTiles].sort(() => Math.random() - 0.5));
  }, [allTiles]);

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
    const saved = localStorage.getItem(`eurorefrain-${getDayString()}`);
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
          const completedTileIds = new Set(data.completedGroups.flatMap((g: any) => {
              // Find the source group to recover original IDs
              const source = boardGroups.find(bg => bg.category === g.category);
              if (!source) return [];
              const groupIdx = boardGroups.indexOf(source);
              return source.items.map((_, i) => `tile-${groupIdx}-${i}`);
          }));
          setDisplayTiles(prev => prev.filter(tile => !completedTileIds.has(tile.id)));
        }
      } catch (e) {}
    }
  }, [boardGroups]);

  useEffect(() => {
    if (completedGroups.length === 0 && mistakes === 0 && !isGameOver) return;
    localStorage.setItem(`eurorefrain-${getDayString()}`, JSON.stringify({ completedGroups, guessHistory, mistakes, isGameOver, won }));
    if (isGameOver) {
      updateGameStats(GameType.REFRAIN_GAME, won, { mistakes });
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

  const submit = () => {
    if (selectedIds.length !== 4) return;
    const selectedTiles = selectedIds.map(id => allTiles.find(t => t.id === id)!);
    const attemptDiffs = selectedTiles.map(t => t.difficulty);
    setGuessHistory(prev => [...prev, attemptDiffs]);

    const foundGroup = boardGroups.find(bg => 
      selectedTiles.every(st => bg.items.includes(st.text)) && 
      bg.items.every(text => selectedTiles.some(st => st.text === text))
    );

    if (foundGroup) {
      const newCompleted = [...completedGroups, foundGroup];
      setCompletedGroups(newCompleted);
      setDisplayTiles(prev => prev.filter(tile => !selectedIds.includes(tile.id)));
      setSelectedIds([]);
      if (newCompleted.length === 4) { setWon(true); setIsGameOver(true); setShowModal(true); }
    } else {
      let oneAway = false;
      boardGroups.forEach(bg => {
        const matches = selectedTiles.filter(st => bg.items.includes(st.text)).length;
        if (matches === 3) oneAway = true;
      });
      setShaking(true);
      setShowWrongFlash(true);
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (oneAway && newMistakes < 6) { setMessage(t('links.oneAway')); setTimeout(() => setMessage(null), 1200); }
      if (newMistakes >= 6) { setTimeout(() => { setIsGameOver(true); setWon(false); setShowModal(true); }, 1200); }
      setTimeout(() => { setShaking(false); setShowWrongFlash(false); }, 800);
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
    const shareText = `${won ? '🏆' : '❌'} EuroRefrain • ${getDayString()}\n${t('scorecard.score')}: ${getPointsInfo.points} ${t('common.pointsShort')}\n\n${historyEmoji}\n\ndouzepoints.net`;
    navigator.clipboard.writeText(shareText);
  };

  return (
    <div className="flex flex-col items-center pt-4 pb-12 px-4 w-full max-w-xl mx-auto">
      {message && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[600] p-4">
          <div className="bg-white/80 backdrop-blur-xl text-black font-black uppercase text-[14px] md:text-[18px] tracking-[0.2em] px-10 py-6 rounded-3xl shadow-3xl border-[3px] border-white/40 animate-fade-in-out text-center">
            {message}
          </div>
        </div>
      )}

      {(!isGameOver || !showModal) && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent italic pr-[0.1em] uppercase tracking-tighter">EuroRefrain</h1>
            <button onClick={() => setShowHowToPlay(true)} className="w-6 h-6 rounded-full border border-white/20 text-[10px] flex items-center justify-center font-bold text-gray-500 hover:text-white transition-all active:scale-90" aria-label="How to play">?</button>
          </div>

          <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} title="EuroRefrain" rules={t('games.eurorefrain.rules')} />
          
          <div className="mb-6 flex gap-1.5 h-6 items-center">
            <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest mr-2">{t('links.mistakesRemaining')}</span>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full border border-white/20 transition-all duration-500 ${i < (6 - mistakes) ? 'bg-white shadow-[0_0_10px_white]' : 'bg-transparent scale-75 opacity-20'}`}></div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2 w-full mb-8">
            {completedGroups.map((g, idx) => (
              <div key={idx} className={`${getDiffColor(g.difficulty)} col-span-4 min-h-[60px] flex flex-col items-center justify-center px-4 py-2 rounded-2xl text-center shadow-lg animate-in zoom-in-95 duration-500 overflow-hidden`}>
                <p className="font-black text-[10px] sm:text-[14px] uppercase tracking-tighter text-black/60 leading-none mb-1">{g.category}</p>
                <p className="font-bold text-[9px] sm:text-[11px] text-white/95 leading-tight uppercase line-clamp-2">{g.items.join(", ")}</p>
              </div>
            ))}
            {displayTiles.map(tile => {
              const isSelected = selectedIds.includes(tile.id);
              return (
                <button
                  key={tile.id} onClick={() => handleSelect(tile.id)}
                  className={`min-h-[60px] sm:min-h-[80px] flex flex-col items-center justify-center rounded-2xl font-black transition-all duration-200 border-2 uppercase tracking-tight overflow-hidden ${
                    isSelected && showWrongFlash ? 'bg-red-500/10 border-red-500/40 text-white scale-105' : 
                    isSelected ? 'bg-indigo-500 text-white border-indigo-400 scale-95 shadow-inner' : 
                    'bg-gray-900 border-white/5 text-white hover:border-white/20'
                  } ${isSelected && shaking ? 'animate-shake' : ''}`}
                >
                  <span className={`text-center w-full px-0.5 leading-none ${
                    tile.text.length > 12 ? 'text-[7px] sm:text-[9px]' : 
                    tile.text.length > 10 ? 'text-[8px] text-[10px]' : 
                    tile.text.length > 8 ? 'text-[9px] text-[11px]' : 
                    'text-[10px] text-[12px]'
                  }`}>
                    {tile.text.includes(' ') ? tile.text.split(' ').map((word, i) => <React.Fragment key={i}>{word}{i < tile.text.split(' ').length - 1 && <br/>}</React.Fragment>) : tile.text}
                  </span>
                </button>
              );
            })}
          </div>

          {!isGameOver && (
            <div className="flex flex-col items-center gap-6 w-full">
              <button 
                onClick={submit} disabled={selectedIds.length !== 4 || showWrongFlash} 
                className={`w-full max-w-xs py-5 rounded-full font-black shadow-xl transition-all text-sm tracking-widest uppercase ${selectedIds.length === 4 && !showWrongFlash ? 'bg-white text-black scale-105 active:scale-95' : 'bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'}`}
              >
                {t('common.submit')}
              </button>
              <div className="flex gap-3">
                <button onClick={shuffle} className="border-2 border-white/10 px-6 py-3 rounded-full font-black hover:bg-white/5 text-[9px] tracking-widest uppercase transition-colors">{t('links.shuffle')}</button>
                <button onClick={() => setSelectedIds([])} className="border-2 border-white/10 px-6 py-3 rounded-full font-black hover:bg-white/5 text-[9px] tracking-widest uppercase transition-colors">{t('links.deselectAll')}</button>
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

      {isGameOver && showModal && (
        <GameScoreCard 
          won={won} points={getPointsInfo.points} pointsLabel={getPointsInfo.label} pointsColor={getPointsInfo.color}
          historyEmoji={historyEmoji} gameTitle="EuroRefrain" attempts={mistakes} maxAttempts={6}
          onClose={() => setShowModal(false)} onReturn={onReturn} onShare={handleShare}
          extraInfo={
            <div className="space-y-4">
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] text-center mb-1">{t('links.lyricsDiscovered')}</p>
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

export default EuroRefrain;