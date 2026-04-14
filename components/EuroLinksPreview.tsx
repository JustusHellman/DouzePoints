import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ConnectionsGroup } from '../data/types.ts';

interface Tile {
  id: string;
  text: string;
  category: string;
  difficulty: string;
}

interface EuroLinksPreviewProps {
  puzzleData: ConnectionsGroup[];
}

const EuroLinksPreview: React.FC<EuroLinksPreviewProps> = ({ puzzleData }) => {
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

  // Create unique tile objects for the entire board
  const allTiles = useMemo(() => {
    return puzzleData.flatMap((group, gIdx) => 
      group.items.map((item, iIdx) => ({
        id: `tile-${gIdx}-${iIdx}`,
        text: item,
        category: group.category,
        difficulty: group.difficulty
      }))
    );
  }, [puzzleData]);

  const [completedGroups, setCompletedGroups] = useState<ConnectionsGroup[]>([]);
  const [displayTiles, setDisplayTiles] = useState<Tile[]>(() => [...allTiles].sort(() => Math.random() - 0.5));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [guessHistory, setGuessHistory] = useState<string[][]>([]);
  
  const historyEmoji = useMemo(() => {
    const diffToEmoji: Record<string, string> = { easy: '🟨', medium: '🟦', hard: '🟥', expert: '🟪' };
    return guessHistory.map(row => row.map(d => diffToEmoji[d] || '⬜').join('')).join('\n');
  }, [guessHistory]);
  const [mistakes, setMistakes] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const [showWrongFlash, setShowWrongFlash] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Removed useEffect reset in favor of key reset in parent

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
    setMessage("Better luck next time!");
    await new Promise(r => setTimeout(r, 1500));
    setMessage(null);
    
    const remaining = puzzleData.filter(g => !completedGroups.some(cg => cg.category === g.category));
    
    for (const group of remaining) {
      const groupTiles = allTiles.filter(t => t.category === group.category);
      for (const tile of groupTiles) {
        setSelectedIds(prev => [...prev, tile.id]);
        await new Promise(r => setTimeout(r, 250));
      }
      await new Promise(r => setTimeout(r, 300));
      setCompletedGroups(prev => [...prev, group]);
      setDisplayTiles(prev => prev.filter(tile => tile.category !== group.category));
      setSelectedIds([]);
      await new Promise(r => setTimeout(r, 500));
    }
    
    await new Promise(r => setTimeout(r, 1000));
    setShowModal(true);
  }, [puzzleData, completedGroups, allTiles]);

  const submit = useCallback(() => {
    if (selectedIds.length !== 4) return;
    
    const selectedTiles = selectedIds.map(id => allTiles.find(t => t.id === id)!);
    const attemptDiffs = selectedTiles.map(t => t.difficulty);
    setGuessHistory(prev => [...prev, attemptDiffs]);

    const firstCategory = selectedTiles[0].category;
    const isCorrect = selectedTiles.every(t => t.category === firstCategory);

    if (isCorrect) {
      const foundGroup = puzzleData.find(g => g.category === firstCategory);
      if (foundGroup) {
        const newCompleted = [...completedGroups, foundGroup];
        setCompletedGroups(newCompleted);
        setDisplayTiles(prev => prev.filter(tile => !selectedIds.includes(tile.id)));
        setSelectedIds([]);
        if (newCompleted.length === 4) { 
          setWon(true); 
          setIsGameOver(true); 
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
          setShowModal(true); 
        }
      }
    } else {
      let oneAway = false;
      puzzleData.forEach(group => {
        const matches = selectedTiles.filter(t => t.category === group.category).length;
        if (matches === 3) oneAway = true;
      });

      setShaking(true);
      setShowWrongFlash(true);
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      
      if (oneAway && newMistakes < 6) { 
        setMessage("One away..."); 
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
  }, [selectedIds, allTiles, puzzleData, completedGroups, mistakes, revealRemainingGroups]);

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

  return (
    <div className="flex flex-col items-center pt-4 pb-24 px-4 w-full max-w-3xl mx-auto relative">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent italic pr-[0.1em] uppercase tracking-tighter">EuroLinks Preview</h1>
      </div>
      
      <div className="mb-4 flex gap-1 h-5 items-center">
        <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest mr-2">Mistakes Remaining</span>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full border border-white/20 transition-all duration-500 ${i < (6 - mistakes) ? 'bg-white shadow-[0_0_8px_white]' : 'bg-transparent scale-75 opacity-20'}`}></div>
        ))}
      </div>

      <div ref={containerRef} className="grid grid-cols-4 gap-1.5 w-full mb-6">
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
                isSelected ? 'bg-gray-400 text-black border-white scale-95 shadow-inner' : 
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
            Submit
          </button>
          <div className="flex gap-2">
            <button onClick={shuffle} className="border border-white/10 px-4 py-2 rounded-full font-black hover:bg-white/5 text-[8px] tracking-widest uppercase transition-colors">Shuffle</button>
            <button onClick={() => setSelectedIds([])} className="border border-white/10 px-4 py-2 rounded-full font-black hover:bg-white/5 text-[8px] tracking-widest uppercase transition-colors">Deselect All</button>
          </div>
        </div>
      )}
      
      {isGameOver && showModal && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-full max-w-md text-center animate-in zoom-in-95 duration-300">
          <h2 className={`text-4xl font-black uppercase italic mb-2 ${won ? 'text-yellow-500' : 'text-red-500'}`}>
            {won ? 'DOUZE POINTS!' : 'NUL POINTS'}
          </h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">
            {won ? 'You found all categories!' : 'Game Over'}
          </p>
          
          <div className="mb-8 font-mono text-lg leading-tight whitespace-pre flex justify-center">
            {historyEmoji}
          </div>
          
          <div className="space-y-4 text-left">
            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] text-center mb-1">Categories</p>
            {completedGroups.map((g, i) => (
              <div key={i} className={`flex flex-col gap-1 p-4 rounded-2xl border border-white/5 ${getDiffBg(g.difficulty)}`}>
                 <div className="flex items-center gap-3">
                   <div className={`w-3 h-3 rounded-full ${getDiffColor(g.difficulty)}`}></div>
                   <span className="text-xs font-black uppercase tracking-tight text-white/90">{g.category}</span>
                 </div>
                 <span className="text-[10px] font-bold text-white/50 uppercase ml-6">{g.items.join(", ")}</span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => setShowModal(false)}
            className="mt-8 w-full py-4 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs"
          >
            Close
          </button>
        </div>
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

export default EuroLinksPreview;
