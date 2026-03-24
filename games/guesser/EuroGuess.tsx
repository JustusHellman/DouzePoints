import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { getDailyIndex, getDayString } from '../../utils/daily.ts';
import { updateGameStats } from '../../utils/stats.ts';
import { GameType, MasterSong, InfiniteDifficulty, InfinitePlacement, InfiniteYear } from '../../data/types.ts';
import { getFuzzyScore } from '../../utils/fuzzy.ts';
import { getMemberLabel, getPlacingLabel } from '../../data/constants.tsx';
import { GameScoreCard } from '../../components/GameScoreCard.tsx';
import { useTranslation } from '../../context/LanguageContext.tsx';
import { useLocation } from 'react-router-dom';
import { HowToPlayModal } from '../../components/HowToPlayModal.tsx';
import { CategoryMasteredScreen } from '../../components/CategoryMasteredScreen.tsx';
import { reportInfiniteRun } from '../../utils/firebaseService.ts';
import { 
  getInfiniteGameState, 
  saveInfiniteGameState, 
  startNewInfiniteGame, 
  getInfiniteDifficultyPool,
  advanceInfiniteGame,
  saveInfiniteRecord,
  clearInfiniteGameState,
  serializeDifficulty
} from '../../utils/infinite.ts';

interface EuroGuessProps {
  onReturn: () => void;
  data: MasterSong[];
  bonusSong?: MasterSong;
  mode?: 'daily' | 'infinite';
  gameId?: string;
}

const MAX_ATTEMPTS = 6;

interface HintBoxProps {
  hint: { label: string; value: string | number };
  attempt?: string;
  idx: number;
  isActive?: boolean;
  songTitle: string;
  isGameOver?: boolean;
}

const HintBox: React.FC<HintBoxProps> = ({ hint, attempt, idx, isActive, songTitle, isGameOver }) => {
  const isCorrect = attempt?.toLowerCase() === songTitle.toLowerCase();
  const displayIdx = idx + 1;
  
  return (
    <div 
      className={`rounded-xl md:rounded-[1.5rem] bg-gray-900/50 border-l-[4px] md:border-l-[6px] p-2 sm:p-3 md:p-4 shadow-xl relative overflow-hidden transition-all duration-[1500ms] ${
        isActive 
          ? 'border-cyan-500 animate-in fade-in slide-in-from-top-12' 
          : attempt 
            ? 'border-white/10 animate-in fade-in slide-in-from-top-8'
            : 'border-white/5 opacity-50 animate-in fade-in slide-in-from-top-8'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-0.5 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-white/30 font-black uppercase text-[6px] md:text-[8px] tracking-[0.3em] block">
            {hint.label}
          </span>
          <span className="text-[6px] md:text-[8px] font-black text-cyan-500/40 uppercase tracking-widest">
            {displayIdx} / {MAX_ATTEMPTS}
          </span>
        </div>
        {attempt ? (
          <div className="flex items-center gap-1 bg-black/20 px-1.5 py-0.5 rounded-full border border-white/5">
            <span className="text-[6px] md:text-[8px] font-black text-gray-500 uppercase tracking-widest truncate max-w-[60px] sm:max-w-[100px] md:max-w-[180px]">
              {attempt}
            </span>
            <div className={`shrink-0 w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full flex items-center justify-center text-[5px] md:text-[7px] font-black text-white ${
              isCorrect ? 'bg-green-600' : 'bg-red-600'
            }`}>
              {isCorrect ? '✓' : '✕'}
            </div>
          </div>
        ) : isActive ? (
          <span className="text-[6px] md:text-[8px] font-black text-cyan-500 animate-pulse uppercase tracking-widest">
            Active Hint
          </span>
        ) : isGameOver ? (
          <span className="text-[6px] md:text-[8px] font-black text-gray-500 uppercase tracking-widest">
            Unused
          </span>
        ) : null}
      </div>

      <span className="text-sm sm:text-base md:text-xl font-black tracking-tight text-white/90 break-words relative z-10 leading-tight block">
        {hint.value}
      </span>
    </div>
  );
};

import { SEARCH_WEIGHT_THRESHOLD } from '../../data/activeData.ts';

const EuroGuess: React.FC<EuroGuessProps> = ({ onReturn, data, bonusSong, mode = 'daily', gameId = 'euroguess' }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isInfinite = mode === 'infinite';
  
  const difficulty = useMemo(() => {
    return (location.state?.difficulty as InfiniteDifficulty) || { placement: InfinitePlacement.TOP10, year: InfiniteYear.Y2000 };
  }, [location.state]);

  // Infinite State
  const [infiniteState, setInfiniteState] = useState(() => {
    if (!isInfinite) return null;
    const saved = getInfiniteGameState(gameId, difficulty);
    if (saved) return saved;
    const pool = getInfiniteDifficultyPool(difficulty);
    return startNewInfiniteGame(gameId, difficulty, pool);
  });

  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const song = useMemo(() => {
    if (isInfinite && infiniteState) {
      const songId = infiniteState.shuffledIds[infiniteState.currentIndex];
      return data.find(s => s.id === songId) || data[0];
    }
    if (bonusSong) return bonusSong;
    const validPool = data.filter(s => (s.weight || 0) >= SEARCH_WEIGHT_THRESHOLD);
    const poolToUse = validPool.length > 0 ? validPool : data;
    const idx = getDailyIndex(poolToUse, "euroguess");
    return poolToUse[idx];
  }, [data, bonusSong, isInfinite, infiniteState]);

  const [query, setQuery] = useState("");
  const [attempts, setAttempts] = useState<string[]>(() => {
    if (isInfinite && infiniteState) return infiniteState.guesses || [];
    return [];
  });
  const [isGameOver, setIsGameOver] = useState(() => {
    if (isInfinite && infiniteState) return infiniteState.isGameOver;
    return false;
  });
  const [revealedHints, setRevealedHints] = useState(() => {
    if (isInfinite && infiniteState) return (infiniteState.guesses?.length || 0) + 1;
    return 1;
  });
  const [won, setWon] = useState(() => {
    if (isInfinite && infiniteState) return infiniteState.lastResult?.won || false;
    return false;
  });
  const [showModal, setShowModal] = useState(() => {
    if (isInfinite && infiniteState) return infiniteState.isGameOver;
    return false;
  });
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync local state with infiniteState
  useEffect(() => {
    if (isInfinite && infiniteState) {
      setTimeout(() => {
        if (infiniteState.isGameOver) {
          setWon(infiniteState.lastResult?.won || false);
        }
        setAttempts(infiniteState.guesses || []);
        setIsGameOver(infiniteState.isGameOver);
        setRevealedHints(Math.min((infiniteState.guesses?.length || 0) + 1, 6));
      }, 0);
    }
  }, [isInfinite, infiniteState]);

  useEffect(() => {
    if (isGameOver && !showModal) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showModal, isGameOver]);

  useEffect(() => {
    const isPC = window.matchMedia('(pointer: fine)').matches;
    if (!isGameOver && inputRef.current && isPC) {
      inputRef.current.focus();
    }
  }, [isGameOver, attempts.length]);


  useEffect(() => {
    const seenKey = 'hasSeenRules-euroguess';
    const hasSeen = localStorage.getItem(seenKey);
    if (!hasSeen) {
      setTimeout(() => setShowHowToPlay(true), 0);
      localStorage.setItem(seenKey, 'true');
    }
  }, [setShowHowToPlay]);

  useEffect(() => {
    if (isInfinite) return;
    const saved = localStorage.getItem(`euroguess-${getDayString()}`);
    if (saved) {
      try {
        const d = JSON.parse(saved);
        setTimeout(() => {
          setAttempts(d.attempts || []);
          setIsGameOver(Boolean(d.isGameOver));
          setRevealedHints(d.revealedHints || 1);
          setWon(Boolean(d.won));
          if (d.isGameOver) setShowModal(true);
        }, 0);
      } catch (e) {
        console.error("Failed to load saved guesser state", e);
      }
    }
  }, [isInfinite, setAttempts, setIsGameOver, setRevealedHints, setWon, setShowModal]);

  const getPointsInfo = useMemo(() => {
    if (!won) return { points: 0, label: t('common.nulPoints'), color: "text-red-500" };
    const pointsMap = [12, 10, 8, 6, 4, 2];
    const pts = pointsMap[attempts.length - 1] || 2;
    
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
  }, [won, attempts, t]);

  useEffect(() => {
    if (isInfinite) return;
    if (attempts.length === 0 && !isGameOver) return;
    localStorage.setItem(`euroguess-${getDayString()}`, JSON.stringify({ attempts, isGameOver, revealedHints, won }));
    if (isGameOver && won) {
      const pts = getPointsInfo.points;
      confetti({
        particleCount: pts === 12 ? 300 : 150,
        spread: pts === 12 ? 100 : 70,
        origin: { y: 0.6 },
        colors: pts === 12 ? ['#fbbf24', '#f59e0b', '#fff'] : ['#ec4899', '#a855f7', '#3b82f6']
      });
    }
  }, [attempts, isGameOver, revealedHints, won, getPointsInfo, isInfinite]);

  const validPoolIds = useMemo(() => {
    if (!isInfinite) return null;
    return new Set(getInfiniteDifficultyPool(difficulty).map(s => s.id));
  }, [isInfinite, difficulty]);

  const filteredSongs = useMemo(() => {
    if (!query || query.length < 1) return [];

    return data
      .filter(s => {
        if (isInfinite) {
          return validPoolIds!.has(s.id);
        }
        return (s.weight || 0) >= SEARCH_WEIGHT_THRESHOLD || s.id === song.id;
      })
      .map(s => {
        const titleScore = getFuzzyScore(query, s.title);
        const artistScore = getFuzzyScore(query, s.artist);
        const countryScore = getFuzzyScore(query, s.country);
        return { song: s, score: Math.max(titleScore, artistScore, countryScore) };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 100)
      .map(item => item.song);
  }, [query, data, song, isInfinite, validPoolIds]);

  const submitGuess = useCallback((selectedTitle: string) => {
    const isCorrect = selectedTitle.toLowerCase() === song.title.toLowerCase();
    const newAttempts = [...attempts, selectedTitle];
    setAttempts(newAttempts); 
    
    if (isCorrect) {
      setWon(true); 
      setIsGameOver(true); 
      
      const pointsMap = [12, 10, 8, 6, 4, 2];
      const pts = pointsMap[newAttempts.length - 1] || 2;

      if (!isInfinite) {
        if (!bonusSong) {
          updateGameStats(GameType.GUESSER, true, { attempts: newAttempts.length });
        }
        localStorage.setItem(`euroguess-${getDayString()}`, JSON.stringify({ attempts: newAttempts, isGameOver: true, revealedHints, won: true }));
      } else if (infiniteState) {
        const nextState = { ...infiniteState, guesses: newAttempts, isGameOver: true, lastResult: { won: true, points: pts } };
        setInfiniteState(nextState);
        saveInfiniteGameState(gameId, difficulty, nextState);
        saveInfiniteRecord(gameId, difficulty, infiniteState.currentScore + pts, infiniteState.currentStreak + 1);
        const isExhausted = infiniteState.currentIndex + 1 >= infiniteState.shuffledIds.length;
        if (isExhausted) {
          reportInfiniteRun(gameId, serializeDifficulty(difficulty), infiniteState.currentScore + pts, infiniteState.currentStreak + 1, true);
        }
      }
      
      confetti({
        particleCount: pts === 12 ? 300 : 150,
        spread: pts === 12 ? 100 : 70,
        origin: { y: 0.6 },
        colors: pts === 12 ? ['#fbbf24', '#f59e0b', '#fff'] : ['#ec4899', '#a855f7', '#3b82f6']
      });
      setTimeout(() => setShowModal(true), 1500);
    } else {
      setRevealedHints(Math.min(newAttempts.length + 1, 6));
      if (newAttempts.length >= 6) { 
        setIsGameOver(true); 
        setWon(false);
        setRevealedHints(6);
        if (!isInfinite) {
          if (!bonusSong) {
            updateGameStats(GameType.GUESSER, false, { attempts: newAttempts.length });
          }
          localStorage.setItem(`euroguess-${getDayString()}`, JSON.stringify({ attempts: newAttempts, isGameOver: true, revealedHints: 6, won: false }));
        } else if (infiniteState) {
          const nextState = { ...infiniteState, guesses: newAttempts, isGameOver: true, lastResult: { won: false, points: 0 } };
          saveInfiniteRecord(gameId, difficulty, infiniteState.currentScore, infiniteState.currentStreak);
          clearInfiniteGameState(gameId, difficulty);
          setInfiniteState(nextState);
          reportInfiniteRun(gameId, serializeDifficulty(difficulty), infiniteState.currentScore, infiniteState.currentStreak, false);
        }
        setTimeout(() => setShowModal(true), 1500);
      } else if (isInfinite && infiniteState) {
        const newState = { ...infiniteState, guesses: newAttempts };
        setInfiniteState(newState);
        saveInfiniteGameState(gameId, difficulty, newState);
      }
      setQuery("");
    }
  }, [song, attempts, isInfinite, bonusSong, infiniteState, difficulty, gameId, revealedHints]);

  const handleSelectSong = (selected: MasterSong) => {
    setQuery(selected.title);
    setShowResults(false);
    submitGuess(selected.title);
  };

  const handleContinue = useCallback(() => {
    if (isInfinite && won && infiniteState) {
      const points = Math.max(2, 14 - (attempts.length * 2));
      const nextState = advanceInfiniteGame(gameId, difficulty, infiniteState, points, true);
      setInfiniteState(nextState);
      saveInfiniteGameState(gameId, difficulty, nextState);
      saveInfiniteRecord(gameId, difficulty, nextState.currentScore, nextState.currentStreak);
      
      setShowModal(false);
      setIsGameOver(false);
      setWon(false);
      setAttempts([]);
      setRevealedHints(1);
      setQuery("");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onReturn();
    }
  }, [isInfinite, won, infiniteState, onReturn, attempts.length, difficulty, gameId]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isGameOver && showModal && e.key === 'Enter' && won && isInfinite) {
        handleContinue();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isGameOver, showModal, won, isInfinite, handleContinue]);

  const handleTryAgain = useCallback(() => {
    if (!isInfinite) return;
    if (infiniteState) {
      saveInfiniteRecord(gameId, difficulty, infiniteState.currentScore, infiniteState.currentStreak);
    }
    const pool = getInfiniteDifficultyPool(difficulty);
    const newState = startNewInfiniteGame(gameId, difficulty, pool);
    setInfiniteState(newState);
    saveInfiniteGameState(gameId, difficulty, newState);
    setAttempts([]);
    setRevealedHints(1);
    setWon(false);
    setIsGameOver(false);
    setShowModal(false);
    setQuery("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isInfinite, difficulty, infiniteState, gameId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredSongs.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < filteredSongs.length) {
        handleSelectSong(filteredSongs[selectedIndex]);
      } else if (filteredSongs.length > 0) {
        handleSelectSong(filteredSongs[0]);
      }
    }
  };

  const handleShare = useCallback(() => {
    let shareText = '';
    if (isInfinite && infiniteState) {
      const placementLabel = t(`infinite.placements.${difficulty.placement}`);
      const yearLabel = t(`infinite.years.${difficulty.year}`);
      const diffLabel = `${placementLabel} • ${yearLabel}`;
      shareText = `🏆 EuroGuess Infinite • ${diffLabel}\n${t('scorecard.streak')}: ${infiniteState.currentStreak}\n${t('scorecard.score')}: ${infiniteState.currentScore}\n\n${window.location.origin}/euro-guess`;
    } else {
      shareText = `${won ? '🏆' : '❌'} EuroGuess • ${getDayString()}\n${t('scorecard.attempts')}: ${won ? attempts.length : 'X'}/${MAX_ATTEMPTS}\n\n${window.location.origin}/euro-guess`;
    }
    navigator.clipboard.writeText(shareText);
  }, [isInfinite, infiniteState, t, difficulty, won, attempts.length]);

  const hints = useMemo(() => [
    { label: t('guesser.hintLabels.year'), value: song.year },
    { label: t('guesser.hintLabels.placing'), value: getPlacingLabel(song.placing, t) },
    { label: t('guesser.hintLabels.genre'), value: song.genre.split(' / ').map(g => t(`metadata.genres.${g}`) || g).join(' / ') },
    { label: t('guesser.hintLabels.artist'), value: getMemberLabel(song.members) },
    { label: t('guesser.hintLabels.country'), value: t(`metadata.countries.${song.country}`) },
    { label: t('guesser.hintLabels.fact'), value: song.fact }
  ], [t, song]);

  const activeHintIndex = Math.min(attempts.length, 5);

  const historyEmoji = useMemo(() => {
    return attempts.map((a) => (
      a.toLowerCase() === song.title.toLowerCase() ? '🟩' : '⬛'
    )).join(' ');
  }, [attempts, song]);

  const isPoolExhausted = isInfinite && infiniteState ? infiniteState.currentIndex >= infiniteState.shuffledIds.length : false;
  
  if (isPoolExhausted) {
    return (
      <CategoryMasteredScreen 
        styles={{
          bg: "bg-cyan-600/20",
          text: "text-cyan-200",
          glow: "bg-cyan-500"
        }}
        onPlayAgain={handleTryAgain}
        onReturn={onReturn}
      />
    );
  }

  return (
    <div className="flex flex-col items-center pt-2 sm:pt-6 pb-24 md:pb-32 px-1 sm:px-4 w-full max-w-2xl mx-auto">
      {isGameOver && showModal ? (
        <GameScoreCard 
          won={won} points={getPointsInfo.points} pointsLabel={getPointsInfo.label} pointsColor={getPointsInfo.color}
          historyEmoji={historyEmoji} gameTitle="EuroGuess" song={song} attempts={attempts.length} maxAttempts={6}
          onClose={() => setShowModal(false)} onReturn={onReturn} gameType={GameType.GUESSER}
          mode={mode} streak={infiniteState?.currentStreak} onContinue={handleContinue} onTryAgain={handleTryAgain}
          onShare={handleShare}
          runScore={infiniteState ? (infiniteState.currentScore + (won ? getPointsInfo.points : 0)) : undefined}
          runStreak={infiniteState ? (infiniteState.currentStreak + (won ? 1 : 0)) : undefined}
        />
      ) : (
        <>
          <div className="flex items-center gap-3 mb-2 sm:mb-4">
            <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent italic pr-[0.1em] uppercase tracking-tighter">EuroGuess</h1>
            <button 
              onClick={() => setShowHowToPlay(true)}
              className="w-5 h-5 md:w-7 md:h-7 rounded-full border border-white/20 text-[9px] md:text-xs flex items-center justify-center font-bold text-gray-500 hover:text-white hover:border-white transition-all active:scale-90"
              aria-label="How to play"
            >
              ?
            </button>
          </div>

          <HowToPlayModal 
            isOpen={showHowToPlay} 
            onClose={() => setShowHowToPlay(false)} 
            title="EuroGuess" 
            rules={t('games.euroguess.rulesShort')} 
          />

          {!isGameOver && (
            <div className="w-full flex flex-col gap-4 relative mb-6 z-[150]" ref={searchRef}>
              <input 
                ref={inputRef}
                type="text" value={query}
                onChange={(e) => { setQuery(e.target.value); setShowResults(true); setSelectedIndex(-1); }}
                onKeyDown={handleKeyDown}
                placeholder={t('guesser.searchPlaceholder')}
                className="w-full bg-gray-950 border-2 border-white/5 rounded-xl px-4 py-3 md:py-4 font-bold focus:border-cyan-500 outline-none text-center text-base md:text-xl shadow-inner text-white transition-all duration-300"
              />
              {showResults && query.length >= 1 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#111122] border border-white/10 rounded-xl shadow-3xl overflow-hidden z-[160] backdrop-blur-xl max-h-48 md:max-h-64 overflow-y-auto">
                  {filteredSongs.length > 0 ? filteredSongs.map((s, idx) => (
                    <button 
                      key={s.id} 
                      onClick={() => handleSelectSong(s)} 
                      className={`w-full text-left px-4 py-3 md:py-4 transition-colors flex justify-between items-center border-b border-white/5 last:border-0 ${idx === selectedIndex ? 'bg-cyan-500/40' : 'hover:bg-cyan-500/20'}`}
                    >
                      <div className="flex flex-col">
                        <span className="font-black text-[10px] md:text-xs uppercase tracking-tight text-white">{s.title}</span>
                        <span className="text-[8px] md:text-[10px] font-bold opacity-30 uppercase tracking-widest text-gray-400">{s.artist} • {t(`metadata.countries.${s.country}`)}</span>
                      </div>
                    </button>
                  )) : <div className="px-4 py-4 text-[9px] font-black text-gray-600 uppercase tracking-widest text-center italic">{t('guesser.noResults')}</div>}
                </div>
              )}
            </div>
          )}

          <div className="w-full space-y-3 md:space-y-4">
            {!isGameOver && (
              <HintBox key={`active-${activeHintIndex}`} hint={hints[activeHintIndex]} idx={activeHintIndex} isActive={true} songTitle={song.title} />
            )}
            {isGameOver && hints.slice(attempts.length).map((hint, idx) => (
              <HintBox key={`unused-${attempts.length + idx}`} hint={hint} idx={attempts.length + idx} songTitle={song.title} isGameOver={true} />
            )).reverse()}
            {attempts.map((attempt, idx) => (
              <HintBox key={idx} hint={hints[idx]} attempt={attempt} idx={idx} songTitle={song.title} isGameOver={isGameOver} />
            )).reverse()}
          </div>
          
          {isGameOver && !showModal && (
            <div className="w-full flex justify-center mt-12">
               <button 
                 onClick={() => setShowModal(true)}
                 className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
               >
                 {t('scorecard.viewScorecard')}
               </button>
            </div>
          )}

          {/* How to Play Section */}
          <div className="mt-16 pt-12 border-t border-white/5 w-full max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white mb-6 text-center">
              {t('common.howToPlay')}
            </h2>
            <div className="bg-white/5 rounded-2xl p-6 md:p-8">
              <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed whitespace-pre-wrap">
                {t('games.euroguess.rulesLong')}
              </p>
            </div>
          </div>
        </>
      )}

      <style>{`
        .animate-in.fade-in { animation: fade-in 1500ms cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes slide-in-from-top-12 { 0% { transform: translateY(-4rem); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes slide-in-from-top-8 { 0% { transform: translateY(-2rem); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .slide-in-from-top-12 { animation: slide-in-from-top-12 1500ms cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .slide-in-from-top-8 { animation: slide-in-from-top-8 1500ms cubic-bezier(0.19, 1, 0.22, 1) forwards; }
      `}</style>
    </div>
  );
};

export default EuroGuess;