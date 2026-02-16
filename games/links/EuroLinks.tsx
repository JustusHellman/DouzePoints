
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { getDailyIndex, getDayString } from '../../utils/daily.ts';
import { updateGameStats } from '../../utils/stats.ts';
import { GameType } from '../../data/types.ts';
import { PUZZLES } from '../../data/connectionsData.ts';
import { GameScoreCard } from '../../components/GameScoreCard.tsx';

interface EuroLinksProps {
  onReturn: () => void;
}

const EuroLinks: React.FC<EuroLinksProps> = ({ onReturn }) => {
  const dailyData = useMemo(() => {
    // Fix: getDailyIndex expects an array as the first argument, not a number (length)
    const idx = getDailyIndex(PUZZLES, "connections");
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
  const [showModal, setShowModal] = useState(false);

  const getItemDifficulty = useCallback((item: string) => {
    const group = dailyData.find(g => g.items.includes(item));
    return group ? group.difficulty : 'unknown';
  }, [dailyData]);

  useEffect(() => {
    const all = dailyData.flatMap(g => g.items);
    setDisplayItems([...all].sort(() => Math.random() - 0.5));
  }, [dailyData]);

  const getPointsInfo = useMemo(() => {
    if (!won) return { points: 0, label: "NUL POINTS", color: "text-red-500" };
    const pointsMap = [12, 10, 8, 6, 4, 2];
    const pts = pointsMap[mistakes] || 2;
    
    if (pts === 12) return { points: 12, label: "DOUZE POINTS!", color: "text-yellow-500" };
    if (pts === 10) return { points: 10, label: "10 POINTS!", color: "text-pink-400" };
    if (pts === 8) return { points: 8, label: "8 POINTS!", color: "text-purple-400" };
    if (pts === 6) return { points: 6, label: "6 POINTS!", color: "text-blue-400" };
    if (pts === 4) return { points: 4, label: "4 POINTS!", color: "text-cyan-400" };
    return { points: 2, label: "2 POINTS!", color: "text-indigo-400" };
  }, [won, mistakes]);

  useEffect(() => {
    const saved = localStorage.getItem(`links-${getDayString()}`);
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
    localStorage.setItem(`links-${getDayString()}`, JSON.stringify({ completedGroups, guessHistory, mistakes, isGameOver, won }));
    
    if (isGameOver) {
      // Corrected GameType property from CONNECTIONS to LINKS_GAME
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
    if (isGameOver) return;
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
    } else if (selected.length < 4) {
      setSelected([...selected, item]);
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2000);
  };

  const shuffle = () => {
    setDisplayItems(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const submit = () => {
    if (selected.length !== 4) return;
    
    const attemptDiffs = selected.map(item => getItemDifficulty(item));
    setGuessHistory(prev => [...prev, attemptDiffs]);

    const foundGroup = dailyData.find(g => 
      selected.every(item => g.items.includes(item))
    );

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
      setTimeout(() => setShaking(false), 500);

      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      
      if (oneAway && newMistakes < 6) {
        showMessage("One away...");
      } else if (newMistakes >= 6) {
        setIsGameOver(true);
        setWon(false);
        setShowModal(true);
      } else {
        showMessage("Not a connection");
      }
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
    let headline = "";
    const pts = getPointsInfo.points;
    if (!won) headline = "❌ NUL POINTS... The dreaded zero. Better luck next year!";
    else if (pts === 12) headline = "🏆 DOUZE POINTS! A historical victory!";
    else if (pts === 10) headline = "🥈 10 POINTS! A podium finish!";
    else if (pts === 8) headline = "🥉 8 POINTS! Solidly on the left side of the scoreboard!";
    else if (pts === 6) headline = "🎤 6 POINTS! Safely through the Semi-Finals!";
    else if (pts === 4) headline = "⭐ 4 POINTS! Qualifying run complete!";
    else headline = "🗳️ 2 POINTS! Just barely qualified!";

    const shareText = `${headline}\nEuroLinks • ${getDayString()}\nScore: ${getPointsInfo.points} pts • ${6 - mistakes} votes left\n\n${historyEmoji}\n\n#SongContestGames #Eurovision`;
    
    navigator.clipboard.writeText(shareText);
    alert("EuroLinks results copied! Spread the news!");
  };

  const remainingAttempts = 6 - mistakes;

  const getTileFontSize = (text: string) => {
    const cleanText = text.trim().toUpperCase();
    if (cleanText.length > 10) return "text-[8px] sm:text-[11px]";
    if (cleanText.length > 7) return "text-[10px] sm:text-[13px]";
    return "text-[12px] sm:text-[15px]";
  };

  return (
    <div className="flex flex-col items-center py-6 px-4 w-full max-w-xl mx-auto overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent italic pr-[0.2em] uppercase tracking-tighter">EuroLinks</h2>
      
      <div className="mb-6 flex flex-col items-center gap-2">
         <div className="flex gap-1.5 h-6 items-center">
            {message ? (
              <span className="text-[10px] text-white font-black uppercase tracking-widest animate-pulse">{message}</span>
            ) : (
              <>
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest mr-2">Mistakes Remaining</span>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full border border-white/20 transition-all duration-500 ${i < remainingAttempts ? 'bg-white shadow-[0_0_10px_white]' : 'bg-transparent scale-75 opacity-20'}`}></div>
                ))}
              </>
            )}
         </div>
      </div>

      <div className="grid grid-cols-4 gap-2 w-full mb-6">
        {completedGroups.map((g, idx) => (
          <div 
            key={idx} 
            className={`${getDiffColor(g.difficulty)} col-span-4 h-20 sm:h-24 flex flex-col items-center justify-center px-4 py-2 rounded-2xl text-center shadow-lg animate-in zoom-in-95 duration-500`}
          >
            <p className="font-black text-[11px] sm:text-[18px] uppercase tracking-tighter text-black/60 leading-none mb-0.5">{g.category}</p>
            <p className="font-bold text-[9px] sm:text-[12px] text-white/95 leading-tight uppercase w-full max-w-full overflow-hidden whitespace-normal line-clamp-2">
              {g.items.join(", ")}
            </p>
          </div>
        ))}

        {!isGameOver && (
          <>
            {displayItems.map(item => (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className={`h-20 sm:h-24 flex flex-col items-center justify-center px-1 py-2 rounded-2xl font-black transition-all duration-200 border-2 uppercase tracking-tight overflow-hidden ${
                  selected.includes(item) ? 'bg-gray-400 text-black border-white scale-95 shadow-inner' : 'bg-gray-900 border-white/5 text-white hover:border-white/20'
                } ${shaking ? 'animate-shake' : ''}`}
              >
                <span className={`text-center block ${getTileFontSize(item)} whitespace-normal leading-[1.05] tracking-tight`}>
                  {item}
                </span>
              </button>
            ))}
          </>
        )}
      </div>

      {!isGameOver && (
        <div className="flex flex-col items-center gap-6 w-full mt-4">
           <button 
            onClick={submit} 
            disabled={selected.length !== 4} 
            className={`w-full max-w-xs py-5 rounded-full font-black shadow-xl transition-all text-sm tracking-widest uppercase ${selected.length === 4 ? 'bg-white text-black scale-105 active:scale-95' : 'bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'}`}
          >
            Submit Link
          </button>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={shuffle} className="border-2 border-white/10 px-6 py-3 rounded-full font-black hover:bg-white/5 text-[9px] tracking-widest uppercase transition-colors">Shuffle Grid</button>
            <button onClick={() => setSelected([])} className="border-2 border-white/10 px-6 py-3 rounded-full font-black hover:bg-white/5 text-[9px] tracking-widest uppercase transition-colors">Deselect All</button>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="flex flex-col gap-4 items-center">
          {!showModal && (
             <button 
               onClick={() => setShowModal(true)}
               className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all"
             >
               View Result Card
             </button>
          )}

          {showModal && (
            <GameScoreCard 
              won={won}
              points={getPointsInfo.points}
              pointsLabel={getPointsInfo.label}
              pointsColor={getPointsInfo.color}
              historyEmoji={historyEmoji}
              gameTitle="EuroLinks"
              attempts={remainingAttempts}
              maxAttempts={6}
              onClose={() => setShowModal(false)}
              onReturn={onReturn}
              onShare={handleShare}
              extraInfo={
                <div className="space-y-2">
                  <p className="text-[8px] text-gray-600 font-black uppercase tracking-[0.4em] text-center mb-1">Categories Discovered</p>
                  {completedGroups.map((g, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 ${getDiffColor(g.difficulty)}/20`}>
                       <div className={`w-2 h-2 rounded-full ${getDiffColor(g.difficulty)}`}></div>
                       <span className="text-[10px] font-black uppercase tracking-tight flex-1 text-white/90">{g.category}</span>
                    </div>
                  ))}
                  {!won && dailyData.filter(g => !completedGroups.find(cg => cg.category === g.category)).map((g, i) => (
                    <div key={`missed-${i}`} className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-white/10 opacity-40">
                       <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                       <span className="text-[10px] font-black uppercase tracking-tight flex-1 text-gray-400">???</span>
                    </div>
                  ))}
                </div>
              }
            />
          )}
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default EuroLinks;
